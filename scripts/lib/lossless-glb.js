import { MeshoptEncoder } from 'meshoptimizer/encoder';
import { MeshoptDecoder } from 'meshoptimizer/decoder';

const extension = 'EXT_meshopt_compression';
const components = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4, MAT2: 4, MAT3: 9, MAT4: 16 };
const bytes = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 };

export function readGLB(input) {
  const file = Buffer.from(input);
  if (file.readUInt32LE(0) !== 0x46546c67 || file.readUInt32LE(4) !== 2 || file.readUInt32LE(8) !== file.length) throw new Error('INVALID_GLB');
  let json, binary;
  for (let offset = 12; offset < file.length;) {
    const size = file.readUInt32LE(offset), type = file.readUInt32LE(offset + 4);
    const chunk = file.subarray(offset + 8, offset + 8 + size);
    if (type === 0x4e4f534a) json = JSON.parse(chunk.toString());
    else if (type === 0x004e4942) binary = chunk;
    else throw new Error('UNSUPPORTED_GLB_CHUNK');
    offset += 8 + size;
  }
  if (!json || !binary) throw new Error('INCOMPLETE_GLB');
  return { json, binary };
}

export function writeGLB(json, binary) {
  const data = Buffer.from(JSON.stringify(json));
  const jsonSize = Math.ceil(data.length / 4) * 4, binSize = Math.ceil(binary.length / 4) * 4;
  const output = Buffer.alloc(28 + jsonSize + binSize);
  output.writeUInt32LE(0x46546c67, 0); output.writeUInt32LE(2, 4); output.writeUInt32LE(output.length, 8);
  output.writeUInt32LE(jsonSize, 12); output.writeUInt32LE(0x4e4f534a, 16);
  output.fill(0x20, 20, 20 + jsonSize); data.copy(output, 20);
  output.writeUInt32LE(binSize, 20 + jsonSize); output.writeUInt32LE(0x004e4942, 24 + jsonSize);
  binary.copy(output, 28 + jsonSize);
  return output;
}

export async function compressGLBLosslessly(input) {
  await Promise.all([MeshoptEncoder.ready, MeshoptDecoder.ready]);
  const { json, binary } = readGLB(input);
  if (json.buffers.length !== 1 || json.buffers[0].uri || json.extensionsUsed?.includes(extension)) throw new Error('EXPECTED_UNCOMPRESSED_EMBEDDED_GLB');
  const indexAccessors = new Set(json.meshes.flatMap(mesh => mesh.primitives.map(p => p.indices)));
  const imageViews = new Set((json.images || []).map(image => image.bufferView));
  const chunks = [];
  let length = 0, compressedViews = 0;
  const append = data => {
    const offset = length, size = Math.ceil(data.length / 4) * 4, padded = Buffer.alloc(size);
    Buffer.from(data).copy(padded); chunks.push(padded); length += size;
    return offset;
  };
  for (const [index, view] of json.bufferViews.entries()) {
    const raw = binary.subarray(view.byteOffset || 0, (view.byteOffset || 0) + view.byteLength);
    const accessors = json.accessors.map((a, i) => ({ ...a, index: i })).filter(a => a.bufferView === index);
    const indices = accessors.length > 0 && accessors.every(a => indexAccessors.has(a.index));
    const stride = view.byteStride || (accessors[0] && bytes[accessors[0].componentType] * components[accessors[0].type]);
    const mode = indices ? 'INDICES' : 'ATTRIBUTES';
    const valid = !imageViews.has(index) && accessors.length && !view.extensions && stride && raw.length % stride === 0 &&
      (indices ? [2, 4].includes(stride) : stride % 4 === 0 && stride <= 256);
    if (valid) {
      const count = raw.length / stride;
      // No quantization, filtering, simplification, vertex reordering or triangle rotation.
      const encoded = MeshoptEncoder.encodeGltfBuffer(raw, count, stride, mode, 0);
      if (encoded.length < raw.length) {
        const decoded = new Uint8Array(raw.length);
        MeshoptDecoder.decodeGltfBuffer(decoded, count, stride, encoded, mode, 'NONE');
        if (!Buffer.from(decoded).equals(raw)) throw new Error(`NON_LOSSLESS_BUFFER_VIEW_${index}`);
        view.extensions = { [extension]: { buffer: 0, byteOffset: append(encoded), byteLength: encoded.length, byteStride: stride, count, mode, filter: 'NONE' } };
        view.buffer = 1; compressedViews++;
        continue;
      }
    }
    view.buffer = 0; view.byteOffset = append(raw);
  }
  json.buffers = [{ byteLength: length }, { byteLength: binary.length, extensions: { [extension]: { fallback: true } } }];
  json.extensionsUsed = [...new Set([...(json.extensionsUsed || []), extension])];
  json.extensionsRequired = [...new Set([...(json.extensionsRequired || []), extension])];
  const output = writeGLB(json, Buffer.concat(chunks));
  return { output, compressedViews, sourceBytes: input.length, bytes: output.length };
}
