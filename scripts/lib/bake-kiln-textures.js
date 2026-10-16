import { deflateSync } from 'node:zlib';
import { createHash } from 'node:crypto';
import { readGLB, writeGLB } from './lossless-glb.js';

const roles = { steel: 'Brushed metal', brick: 'Refractory ivory', paint: 'Painted controller red' };
const crcTable = Uint32Array.from({ length: 256 }, (_, n) => {
  for (let k = 0; k < 8; k++) n = n & 1 ? 0xedb88320 ^ (n >>> 1) : n >>> 1;
  return n >>> 0;
});
function chunk(type, data) {
  const name = Buffer.from(type), body = Buffer.concat([name, data]);
  let crc = 0xffffffff;
  for (const byte of body) crc = crcTable[(crc ^ byte) & 255] ^ (crc >>> 8);
  const header = Buffer.alloc(4), footer = Buffer.alloc(4);
  header.writeUInt32BE(data.length); footer.writeUInt32BE((crc ^ 0xffffffff) >>> 0);
  return Buffer.concat([header, body, footer]);
}

// Lossless RGBA PNG. Sub filtering preserves every channel while reducing the
// size of the smooth normal/roughness maps; there is no palette or quantization.
export function encodeTexturePNG({ data, width, height }) {
  if (data.length !== width * height * 4) throw new Error('INVALID_RGBA_TEXTURE');
  const stride = width * 4, rows = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    const row = y * (stride + 1); rows[row] = 1;
    for (let x = 0; x < stride; x++) rows[row + 1 + x] = (data[y * stride + x] - (x < 4 ? 0 : data[y * stride + x - 4])) & 255;
  }
  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0); header.writeUInt32BE(height, 4); header[8] = 8; header[9] = 6;
  return Buffer.concat([Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), chunk('IHDR', header),
    chunk('IDAT', deflateSync(rows, { level: 9 })), chunk('IEND', Buffer.alloc(0))]);
}

export function bakeKilnTextures(input, { three: T, applyKilnFinish }) {
  const { json, binary } = readGLB(input);
  if (json.buffers.length !== 1 || json.extensionsUsed?.includes('EXT_meshopt_compression')) throw new Error('BAKE_BEFORE_COMPRESSION');
  const root = new T.Group(), samples = new Map();
  for (const [role, prefix] of Object.entries(roles)) {
    const material = new T.MeshPhysicalMaterial(); material.name = prefix;
    const mesh = new T.Mesh(new T.BufferGeometry(), material); root.add(mesh); samples.set(role, mesh);
  }
  // The reference authoring function runs only here, never in the storefront.
  applyKilnFinish(root, 'v2', 1);
  const parts = [binary], textures = {}, report = [];
  let length = binary.length;
  json.images ??= []; json.textures ??= []; json.samplers ??= [];
  const sampler = json.samplers.length;
  json.samplers.push({ magFilter: 9729, minFilter: 9987, wrapS: 10497, wrapT: 10497 });
  for (const [role, mesh] of samples) {
    textures[role] = {};
    for (const name of ['map', 'normalMap', 'roughnessMap']) {
      const texture = mesh.material[name]; if (!texture) continue;
      const png = encodeTexturePNG(texture.image), padding = (4 - length % 4) % 4;
      if (padding) { parts.push(Buffer.alloc(padding)); length += padding; }
      const bufferView = json.bufferViews.length;
      json.bufferViews.push({ buffer: 0, byteOffset: length, byteLength: png.length });
      parts.push(png); length += png.length;
      const source = json.images.length;
      json.images.push({ bufferView, mimeType: 'image/png', name: `Kiln V2 ${role} ${name}` });
      textures[role][name] = json.textures.length;
      json.textures.push({ source, sampler });
      report.push({ role, name, width: texture.image.width, height: texture.image.height, pngBytes: png.length,
        rgbaSHA256: createHash('sha256').update(texture.image.data).digest('hex') });
      texture.dispose();
    }
    mesh.geometry.dispose(); mesh.material.dispose();
  }
  for (const material of json.materials) {
    const role = Object.keys(roles).find(key => material.name?.startsWith(roles[key]));
    if (role) material.extras = { ...material.extras, galleryKilnFinish: { variant: 'v2', role, textures: textures[role] } };
  }
  // Keep original PBR maps, including the original metallic/AO channels. The
  // runtime replaces exactly the same slots as the reference material study.
  json.buffers[0].byteLength = length;
  return { output: writeGLB(json, Buffer.concat(parts)), textures: report };
}
