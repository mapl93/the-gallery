import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from '../site/node_modules/typescript/lib/typescript.js';

// Exercise the actual site resolver against independently compiled matrices.
// Run build:tokens:source first; no generated outputs are written by this check.
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sources = {};
for (const layer of ['primitives', 'semantics', 'components', 'modes']) {
  const directory = path.join(root, 'tokens/source', layer);
  for (const name of fs.readdirSync(directory).filter((entry) => entry.endsWith('.tokens.json'))) {
    sources[`../../../tokens/source/${layer}/${name}`] = JSON.parse(fs.readFileSync(path.join(directory, name), 'utf8'));
  }
}
const source = fs.readFileSync(path.join(root, 'site/src/lib/tokens.ts'), 'utf8');
const glob = 'import.meta.glob<Record<string, unknown>>';
assert(source.includes(glob), 'Catalogue Vite loader changed; update this test adapter.');
const injected = `const __sources = ${JSON.stringify(sources)};\n${source.replace(glob, '(() => __sources)')}`;
const { outputText } = ts.transpileModule(injected, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext },
});
const { getTokens } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`);

function colorBytes(value) {
  if (value === 'transparent') return [0, 0, 0, 0];
  if (/^#[\da-f]{6}([\da-f]{2})?$/i.test(value)) {
    const bytes = value.slice(1).match(/../g).map((pair) => parseInt(pair, 16));
    return bytes.length === 3 ? [...bytes, 255] : bytes;
  }
  const rgba = value.match(/^rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\s*\)$/);
  assert(rgba, `Unsupported comparison color: ${value}`);
  return [...rgba.slice(1, 4).map(Number), Math.round(Number(rgba[4] ?? 1) * 255)];
}
let comparisons = 0;
let baselinePaths;
for (const theme of ['light', 'dark']) {
  for (const viewport of ['mobile', 'tablet', 'desktop', 'xl']) {
    const compiled = JSON.parse(fs.readFileSync(path.join(root, `tokens/source/build/json/${theme}.${viewport}.resolved.json`), 'utf8'));
    const tokens = getTokens(theme, viewport);
    const paths = tokens.map((token) => token.path);
    baselinePaths ??= paths;
    assert.deepEqual(paths, baselinePaths, `Mode changes the catalogue inventory: ${theme}/${viewport}`);
    for (const token of tokens) {
      const target = token.path.split('.').reduce((object, key) => object?.[key], compiled);
      assert.notEqual(target, undefined, `Missing compiled token: ${token.path}`);
      assert.deepEqual(
        token.type === 'color' ? colorBytes(token.resolved) : token.resolved,
        token.type === 'color' ? colorBytes(target) : target,
        `${theme}/${viewport}: ${token.path}`,
      );
      assert(fs.existsSync(path.join(root, token.source)), `Missing source provenance: ${token.source}`);
      comparisons += 1;
    }
  }
}
console.log(`Validated canonical catalogue: ${baselinePaths.length} paths, ${comparisons} compiler comparisons across eight matrices.`);
