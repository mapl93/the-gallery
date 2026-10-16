import { readFile, writeFile, copyFile, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { createHash } from 'node:crypto';
import { compressGLBLosslessly } from './lib/lossless-glb.js';
import { bakeKilnTextures } from './lib/bake-kiln-textures.js';
import { pruneGalleryTextures } from './lib/prune-gallery-textures.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const kilnArgument = process.argv.indexOf('--kiln-root');
if (kilnArgument < 0) throw new Error('Supply --kiln-root with the approved kiln checkout.');
const kiln = resolve(process.argv[kilnArgument + 1]);
const models = resolve(root, 'platforms/shopify/models/gallery-objects');
const assets = resolve(root, 'platforms/shopify/assets');
const source = resolve(root, 'platforms/shopify/src/home-gallery');
const { build } = await import(pathToFileURL(resolve(kiln, 'node_modules/esbuild/lib/main.js')));
const three = JSON.parse(await readFile(resolve(kiln, 'node_modules/three/package.json'), 'utf8'));
if (three.version !== '0.180.0') throw new Error('The approved materials require Three.js 0.180.0.');
const sha256 = bytes => createHash('sha256').update(bytes).digest('hex');
const referenceSources = {};
const modelsOnly = process.argv.includes('--models-only');
await mkdir(resolve(models, 'generated/reference'), { recursive: true });
for (const name of ['studio-environment.js', 'kiln-material-study.js', 'model-geometry.js', 'render-quality.js', 'piece-geometry.js', 'wall-motion.js', 'load-motion.js', 'ceramic-profiles.js', 'lcd.js', 'lcd-frame.js', 'lcd-brand.js', 'short-logo.svg', 'wordmark.svg']) {
  if (!modelsOnly) await copyFile(resolve(kiln, 'platforms/shopify/src/kiln-visualizer', name), resolve(models, 'generated/reference', name));
  referenceSources[name] = sha256(await readFile(resolve(models, 'generated/reference', name)));
}
for (const [entry, output] of modelsOnly ? [] : [['controller.js', 'home-gallery.js'], ['renderer.js', 'home-gallery-3d.js']]) {
  await build({ entryPoints: [resolve(source, entry)], outfile: resolve(assets, output), bundle: true,
    format: 'esm', platform: 'browser', target: 'es2022', minify: true, loader: { '.svg': 'text' }, nodePaths: [resolve(kiln, 'node_modules')] });
}
if (!modelsOnly) {
  await copyFile(resolve(source, 'services.css'), resolve(assets, 'home-services.css'));
  await copyFile(resolve(source, 'paper.css'), resolve(assets, 'home-paper.css'));
  await copyFile(resolve(source, 'shop.css'), resolve(assets, 'home-shop.css'));
}
const files = {};
const materialTool = await build({ entryPoints: [resolve(models, 'generated/reference/kiln-material-study.js')],
  bundle: true, write: false, format: 'esm', platform: 'node', nodePaths: [resolve(kiln, 'node_modules')] });
const { applyKilnFinish } = await import('data:text/javascript;base64,' + Buffer.from(materialTool.outputFiles[0].contents).toString('base64'));
const T = await import(pathToFileURL(resolve(kiln, 'node_modules/three/build/three.module.js')));
let kilnTextures;
for (const key of ['shop', 'services', 'journal', 'archive']) {
  // The owner-approved black Lora journal is the storefront model. V4 remains
  // a separate editable source; subsequent builds must not restore it silently.
  const modelFile = key === 'journal' ? 'journal-black' : key;
  const from = key === 'services' ? resolve(kiln, 'platforms/shopify/assets/kiln-provisional.glb') : resolve(models, 'generated', modelFile + '.glb');
  const to = resolve(assets, 'home-' + key + '.glb');
  const original = await readFile(from);
  const prepared = key === 'services' ? bakeKilnTextures(original, { three: T, applyKilnFinish }) : { output: original };
  if (prepared.textures) kilnTextures = prepared.textures;
  const pruned = pruneGalleryTextures(prepared.output, key);
  const { output: bytes, compressedViews } = await compressGLBLosslessly(pruned.output);
  await writeFile(to, bytes);
  files[key] = { bytes: bytes.length, sha256: sha256(bytes), sourceBytes: original.length, sourceSha256: sha256(original), compressedViews, lossless: true,
    texturePruning: { removedImages: pruned.removedImages, removedImageBytes: pruned.removedImageBytes } };
}
const reflectionSources = {};
for (const [reference, adapter] of [['sheet-reflections.js', 'kiln-reflections.js'], ['reflection-filter.js', 'kiln-reflection-filter.js']]) {
  reflectionSources[adapter] = {
    reference: sha256(await readFile(resolve(kiln, 'platforms/shopify/src/kiln-visualizer', reference))),
    adapter: sha256(await readFile(resolve(models, adapter)))
  };
}
// Collection frames use the current parametric source and retain glass and board materials.
const output = resolve(root, 'output/shopify-home'); await mkdir(output, { recursive: true });
await writeFile(resolve(output, 'build.json'), JSON.stringify({ three: three.version, createdAt: new Date().toISOString(), files, kilnTextures, referenceSources, reflectionSources }, null, 2) + '\n');
console.log(JSON.stringify({ models: files, controller: 'assets/home-gallery.js', renderer: 'assets/home-gallery-3d.js' }));
