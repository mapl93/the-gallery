import test from 'node:test';
import assert from 'node:assert/strict';
import { pruneGalleryTextures } from './lib/prune-gallery-textures.js';
import { readGLB, writeGLB } from './lib/lossless-glb.js';

function fixture(materials, nodes = []) {
  const binary = Buffer.from(Array.from({ length: 32 }, (_, i) => i));
  return writeGLB({ asset: { version: '2.0' }, buffers: [{ byteLength: 32 }],
    bufferViews: Array.from({ length: 8 }, (_, i) => ({ buffer: 0, byteOffset: i * 4, byteLength: 4 })),
    accessors: [{ bufferView: 7, componentType: 5121, count: 4, type: 'SCALAR' }],
    images: Array.from({ length: 7 }, (_, i) => ({ name: `image-${i}`, bufferView: i, mimeType: 'image/png' })),
    textures: Array.from({ length: 7 }, (_, i) => ({ source: i })), materials, nodes,
    meshes: [{ primitives: [{ material: 0, attributes: { POSITION: 0 } }] }] }, binary);
}
test('bag keeps print UV channel and exact surviving binary data, including geometry', () => {
  const input = fixture([{ name: 'Bag V7 printed fibrous film', normalTexture: { index: 0 },
    pbrMetallicRoughness: { baseColorTexture: { index: 3, texCoord: 1 }, metallicRoughnessTexture: { index: 2 } } }]);
  const result = pruneGalleryTextures(input, 'shop'), { json, binary } = readGLB(result.output);
  assert.equal(result.removedImages.length, 6);
  assert.deepEqual(json.materials[0].pbrMetallicRoughness.baseColorTexture, { index: 0, texCoord: 1 });
  assert.equal(json.materials[0].normalTexture, undefined);
  assert.deepEqual(binary, Buffer.from([12, 13, 14, 15, 28, 29, 30, 31]));
  assert.equal(json.accessors[0].bufferView, 1);
  assert.deepEqual(pruneGalleryTextures(result.output, 'shop').output, result.output);
});
test('kiln preserves packed metalness and AO plus extras-only V2 references', () => {
  const input = fixture([{ name: 'Painted controller red', normalTexture: { index: 0 },
    occlusionTexture: { index: 2 }, pbrMetallicRoughness: { metallicRoughnessTexture: { index: 1 } },
    extensions: { KHR_materials_clearcoat: { clearcoatNormalTexture: { index: 0 } } },
    extras: { galleryKilnFinish: { variant: 'v2', role: 'paint', textures: { normalMap: 5, roughnessMap: 6 } } } }]);
  const { json } = readGLB(pruneGalleryTextures(input, 'services').output);
  assert.deepEqual(json.images.map(i => i.name), ['image-1', 'image-2', 'image-5', 'image-6']);
  assert.deepEqual(json.materials[0].extras.galleryKilnFinish.textures, { normalMap: 2, roughnessMap: 3 });
  assert.equal(json.materials[0].pbrMetallicRoughness.metallicRoughnessTexture.index, 0);
  assert.equal(json.materials[0].occlusionTexture.index, 1);
});
test('brick under ControlBox retains maps even when its finish metadata has replacements', () => {
  const input = fixture([{ normalTexture: { index: 0 }, pbrMetallicRoughness: { baseColorTexture: { index: 1 } },
    extras: { galleryKilnFinish: { variant: 'v2', role: 'brick', textures: { normalMap: 5, map: 6 } } } }],
  [{ name: 'ControlBox', children: [1] }, { mesh: 0 }]);
  const { json } = readGLB(pruneGalleryTextures(input, 'services').output);
  assert.deepEqual(json.images.map(i => i.name), ['image-0', 'image-1', 'image-5', 'image-6']);
});
test('a map shared by an unaffected material remains available', () => {
  const input = fixture([{ name: 'Bag V7 milky fibrous film', normalTexture: { index: 0 } },
    { name: 'Unrelated', normalTexture: { index: 0 } }]);
  const { json } = readGLB(pruneGalleryTextures(input, 'shop').output);
  assert.equal(json.images[0].name, 'image-0');
  assert.equal(json.materials[1].normalTexture.index, 0);
});
test('other models are byte-identical and unsupported compressed input fails closed', () => {
  const input = fixture([]);
  assert.equal(pruneGalleryTextures(input, 'journal').output, input);
  const { json, binary } = readGLB(input); json.extensionsUsed = ['EXT_meshopt_compression'];
  assert.throws(() => pruneGalleryTextures(writeGLB(json, binary), 'shop'), /PRUNE_BEFORE_COMPRESSION/);
});
test('cannot drop an image buffer view also referenced by geometry', () => {
  const { json, binary } = readGLB(fixture([]));
  json.accessors[0].bufferView = 0;
  assert.throws(() => pruneGalleryTextures(writeGLB(json, binary), 'shop'), /STILL_REFERENCED/);
});
test('unrecognized texture extensions are rejected instead of losing their source', () => {
  const { json, binary } = readGLB(fixture([{ name: 'Unrelated', normalTexture: { index: 0 } }]));
  json.textures[0].extensions = { EXT_texture_webp: { source: 1 } };
  assert.throws(() => pruneGalleryTextures(writeGLB(json, binary), 'shop'), /UNSUPPORTED_GALLERY_TEXTURE/);
});
