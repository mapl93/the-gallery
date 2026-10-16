import { readGLB, writeGLB } from './lossless-glb.js';

// Delivery-only projection of the material substitutions in nonwoven-material.js
// and kiln-finish.js. Editable/reference GLBs retain their portable PBR maps.
// Run before Meshopt compression; preserve every retained binary view verbatim.
export function pruneGalleryTextures(input, key) {
  if (!['shop', 'services'].includes(key)) return { output: input, removedImages: [], removedImageBytes: 0 };
  const { json, binary } = readGLB(input);
  if (json.buffers.length !== 1 || json.buffers[0].uri || json.extensionsUsed?.includes('EXT_meshopt_compression')) {
    throw new Error('PRUNE_BEFORE_COMPRESSION');
  }
  // batchModel clones materials per top-level kiln group. Keep original brick
  // maps if any occurrence belongs to ControlBox, where the V2 finish is skipped.
  const controllerMaterials = new Set();
  function visitNode(index) {
    const node = json.nodes[index];
    if (node.mesh !== undefined) for (const p of json.meshes[node.mesh].primitives) controllerMaterials.add(p.material);
    for (const child of node.children || []) visitNode(child);
  }
  json.nodes?.forEach((node, i) => { if (node.name === 'ControlBox') visitNode(i); });
  for (const [index, material] of (json.materials || []).entries()) {
    const pbr = material.pbrMetallicRoughness;
    if (key === 'shop') {
      const name = material.name || '';
      if (!/^Bag V[567] /.test(name) || !/thermally compressed|fibrous film|doubled hem/.test(name)) continue;
      delete material.normalTexture;
      if (pbr) {
        delete pbr.metallicRoughnessTexture;
        if (!name.includes('printed fibrous film')) delete pbr.baseColorTexture;
      }
    } else {
      const finish = material.extras?.galleryKilnFinish;
      if (!finish || finish.variant !== 'v2' || (finish.role === 'brick' && controllerMaterials.has(index))) continue;
      if (finish.textures.normalMap !== undefined) delete material.normalTexture;
      if (finish.textures.map !== undefined && pbr) delete pbr.baseColorTexture;
      if (finish.role === 'paint' && finish.textures.normalMap !== undefined) {
        delete material.extensions?.KHR_materials_clearcoat?.clearcoatNormalTexture;
      }
      // metallicRoughnessTexture still supplies metalnessMap after roughnessMap
      // is replaced. Occlusion also survives the V2 finish. Keep both intact.
    }
  }
  const textureReferences = [];
  function materialReferences(object) {
    for (const [name, value] of Object.entries(object || {})) {
      if (name === 'extras') continue;
      if (name.endsWith('Texture') && value && Number.isInteger(value.index)) textureReferences.push([value, 'index']);
      else if (value && typeof value === 'object') materialReferences(value);
    }
  }
  for (const material of json.materials || []) {
    materialReferences(material);
    // These private references are deliberately outside the glTF PBR schema.
    const slots = material.extras?.galleryKilnFinish?.textures;
    for (const slot of Object.keys(slots || {})) textureReferences.push([slots, slot]);
  }
  const usedTextures = new Set(textureReferences.map(([object, field]) => object[field]));
  const textures = [], textureMap = new Map(), usedImages = new Set();
  for (const index of [...usedTextures].sort((a, b) => a - b)) {
    const texture = json.textures?.[index];
    if (!texture || texture.extensions || !Number.isInteger(texture.source)) throw new Error('UNSUPPORTED_GALLERY_TEXTURE');
    textureMap.set(index, textures.length); textures.push(texture); usedImages.add(texture.source);
  }
  for (const [object, field] of textureReferences) object[field] = textureMap.get(object[field]);
  const images = [], imageMap = new Map(), removedImages = [], removedViews = new Set();
  for (const [index, image] of (json.images || []).entries()) {
    if (!Number.isInteger(image.bufferView) || image.uri) throw new Error('EXPECTED_EMBEDDED_IMAGE');
    if (usedImages.has(index)) { imageMap.set(index, images.length); images.push(image); }
    else removedImages.push({ index, name: image.name, bytes: json.bufferViews[image.bufferView].byteLength });
  }
  if ([...usedImages].some(i => !imageMap.has(i))) throw new Error('MISSING_GALLERY_IMAGE');
  const keptImageViews = new Set(images.map(image => image.bufferView));
  for (const [i, image] of (json.images || []).entries()) if (!usedImages.has(i) && !keptImageViews.has(image.bufferView)) removedViews.add(image.bufferView);
  for (const texture of textures) texture.source = imageMap.get(texture.source);
  json.textures = textures; json.images = images;
  const views = [], viewMap = new Map(), parts = [];
  let length = 0;
  for (const [index, view] of json.bufferViews.entries()) {
    if (removedViews.has(index)) continue;
    if (view.buffer !== 0 || view.extensions) throw new Error('UNSUPPORTED_GALLERY_BUFFER_VIEW');
    const start = view.byteOffset || 0, data = binary.subarray(start, start + view.byteLength);
    if (data.length !== view.byteLength) throw new Error('INVALID_GALLERY_BUFFER_VIEW');
    const padded = Buffer.alloc(Math.ceil(data.length / 4) * 4); data.copy(padded);
    viewMap.set(index, views.length); views.push({ ...view, byteOffset: length }); parts.push(padded); length += padded.length;
  }
  function remapViews(object) {
    for (const [field, value] of Object.entries(object || {})) {
      if (field === 'bufferViews') continue;
      if (field === 'bufferView') {
        if (!viewMap.has(value)) throw new Error('REMOVED_IMAGE_VIEW_STILL_REFERENCED');
        object[field] = viewMap.get(value);
      } else if (value && typeof value === 'object') remapViews(value);
    }
  }
  remapViews(json); json.bufferViews = views; json.buffers[0].byteLength = length;
  return { output: writeGLB(json, Buffer.concat(parts)), removedImages,
    removedImageBytes: removedImages.reduce((sum, image) => sum + image.bytes, 0) };
}
