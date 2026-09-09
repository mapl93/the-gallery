import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'platforms/figma/pilot/config.json')));
const output = path.join(root, 'output/figma');
const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
const hash = (s) => crypto.createHash('sha256').update(s).digest('hex');
const sources = {};
const sourceJson = (p) => { const raw = read(p); sources[p] = hash(raw); return JSON.parse(raw); };
const cssName = (p) => '--tg-' + p.replaceAll('.', '-').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const flatten = (obj, prefix = '', out = {}, file = '') => {
  for (const [k, v] of Object.entries(obj)) {
    if (k.startsWith('$')) continue;
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && '$value' in v) out[p] = { ...v, file };
    else if (v && typeof v === 'object') flatten(v, p, out, file);
  }
  return out;
};
const base = {};
for (const layer of ['primitives', 'semantics', 'components']) {
  for (const name of fs.readdirSync(path.join(root, 'tokens/source', layer)).filter(n => n.endsWith('.tokens.json')).sort()) {
    const p = `tokens/source/${layer}/${name}`;
    Object.assign(base, flatten(sourceJson(p), '', {}, p));
  }
}
const matrices = {};
for (const theme of config.themes) {
  const m = { ...base };
  for (const p of [`tokens/source/modes/theme.${theme}.tokens.json`, `tokens/source/modes/viewport.${config.viewport}.tokens.json`]) {
    Object.assign(m, flatten(sourceJson(p), '', {}, p));
  }
  matrices[theme] = m;
}
const ref = (v) => typeof v === 'string' && /^\{[^{}]+\}$/.test(v) ? v.slice(1, -1) : null;
const resolve = (p, matrix, chain = []) => {
  assert(!chain.includes(p), `Circular alias: ${[...chain, p]}`);
  assert(matrix[p], `Missing token: ${p}`);
  const v = matrix[p].$value;
  return ref(v) ? resolve(ref(v), matrix, [...chain, p]) : v;
};
const css = read('platforms/web/tokens.css');
sources['platforms/web/tokens.css'] = hash(css);
const declarations = {};
for (const [, k, v] of css.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)) declarations[k] ??= v.trim();
const sourceByCss = Object.fromEntries(Object.keys(base).map(p => [cssName(p), p]));
const contracts = config.components.map(n => sourceJson(`components/contracts/${n}.contract.json`));
const publicNames = new Set(contracts.flatMap(c => Object.values(c.tokens.public).flat()));
const chosen = new Set();
function include(p) {
  if (chosen.has(p)) return;
  assert(base[p], `Unknown canonical path ${p}`);
  chosen.add(p);
  for (const matrix of Object.values(matrices)) if (ref(matrix[p].$value)) include(ref(matrix[p].$value));
}
function refsInCss(name, seen = []) {
  assert(!seen.includes(name), `Circular CSS alias: ${name}`);
  if (sourceByCss[name]) { include(sourceByCss[name]); return; }
  assert(declarations[name] !== undefined, `Missing public alias: ${name}`);
  for (const [, target] of declarations[name].matchAll(/var\((--[\w-]+)/g)) refsInCss(target, [...seen, name]);
}
for (const name of publicNames) refsInCss(name);
// Specimen typography uses the same interface body roles as the docs consumer.
for (const p of ['font.family.sans', 'font.weight.regular', 'typography.body.default.size', 'typography.body.default.lineHeight']) include(p);
const variableType = { color: 'COLOR', dimension: 'FLOAT', number: 'FLOAT', fontWeight: 'FLOAT', fontFamily: 'STRING' };
function scopes(p, type, primitive) {
  if (primitive) return [];
  if (type === 'fontFamily') return ['FONT_FAMILY'];
  if (type === 'fontWeight') return ['FONT_WEIGHT'];
  if (type === 'color') {
    if (p.includes('shadow.')) return ['EFFECT_COLOR'];
    if (/text|field.required/.test(p)) return ['TEXT_FILL', 'SHAPE_FILL', 'STROKE_COLOR'];
    if (/border/.test(p)) return ['STROKE_COLOR'];
    return ['FRAME_FILL', 'SHAPE_FILL', 'TEXT_FILL', 'STROKE_COLOR'];
  }
  if (/opacity/i.test(p)) return ['OPACITY'];
  if (/lineHeight/.test(p)) return ['LINE_HEIGHT'];
  if (/typography.*size|fontSize/.test(p)) return ['FONT_SIZE'];
  if (/shadow\./.test(p)) return ['EFFECT_FLOAT'];
  if (/radius/.test(p)) return ['CORNER_RADIUS'];
  if (/borderWidth|focusRingWidth|spinnerWidth|panelBorderWidth/.test(p)) return ['STROKE_FLOAT'];
  return ['GAP', 'WIDTH_HEIGHT'];
}
function color(v) {
  if (v === 'transparent') return { r: 0, g: 0, b: 0, a: 0 };
  const rgba = v.match(/^rgba?\(\s*([\d.]+),\s*([\d.]+),\s*([\d.]+)(?:,\s*([\d.]+))?\s*\)$/);
  if (rgba) return { r: +rgba[1] / 255, g: +rgba[2] / 255, b: +rgba[3] / 255, a: +(rgba[4] ?? 1) };
  assert(/^#[0-9a-f]{6}([0-9a-f]{2})?$/i.test(v), `Unsupported color ${v}`);
  return { r: parseInt(v.slice(1, 3), 16) / 255, g: parseInt(v.slice(3, 5), 16) / 255, b: parseInt(v.slice(5, 7), 16) / 255, a: v.length === 9 ? parseInt(v.slice(7), 16) / 255 : 1 };
}
function convert(v, type) {
  if (type === 'color') return color(v);
  if (type === 'fontFamily') return v.split(',')[0].trim().replace(/^['"]|['"]$/g, '');
  if (type === 'dimension') {
    const d = typeof v === 'object' ? v : (() => { const m = v.match(/^(-?[\d.]+)(px|rem)$/); assert(m, `Unsupported dimension ${v}`); return { value: +m[1], unit: m[2] }; })();
    assert(['px', 'rem'].includes(d.unit));
    return d.value * (d.unit === 'rem' ? config.rootFontSizePx : 1);
  }
  assert(Number.isFinite(+v), `Unsupported numeric value ${v}`);
  return +v;
}
const variables = [], omitted = [];
const viewportMatrices = {};
for (const theme of config.themes) for (const viewport of ['mobile', 'tablet', 'desktop', 'xl']) {
  const m = { ...base };
  for (const p of [`tokens/source/modes/theme.${theme}.tokens.json`, `tokens/source/modes/viewport.${viewport}.tokens.json`]) Object.assign(m, flatten(sourceJson(p), '', {}, p));
  viewportMatrices[`${theme}.${viewport}`] = m;
}
for (const p of chosen) for (const m of Object.values(viewportMatrices)) if (ref(m[p].$value)) include(ref(m[p].$value));
for (const p of [...chosen].sort()) {
  const token = base[p], type = token.$type;
  if (!variableType[type] || /^zIndex\./.test(p)) { omitted.push({ path: p, type, reason: 'Runtime or non-variable value; retained in source.' }); continue; }
  const primitive = token.file.includes('/primitives/');
  const values = {}, resolved = {};
  for (const theme of config.themes) {
    const raw = matrices[theme][p].$value;
    values[theme] = ref(raw) ? { alias: ref(raw) } : convert(raw, type);
    resolved[theme] = convert(resolve(p, matrices[theme]), type);
  }
  if (primitive) assert.deepEqual(values.light, values.dark, `Primitive changes with theme: ${p}`);
  const modes = {};
  if (primitive) modes.Default = values.light;
  else if (type === 'color') {
    modes.Light = values.light; modes.Dark = values.dark;
    for (const [key, m] of Object.entries(viewportMatrices)) assert.deepEqual(convert(resolve(p, m), type), resolved[key.split('.')[0]], `Viewport-dependent color: ${p}`);
  } else {
    for (const viewport of ['mobile', 'tablet', 'desktop', 'xl']) {
      const m = viewportMatrices[`light.${viewport}`];
      const raw = m[p].$value;
      modes[viewport === 'xl' ? 'XL' : viewport[0].toUpperCase() + viewport.slice(1)] = ref(raw) ? { alias: ref(raw) } : convert(raw, type);
      assert.deepEqual(convert(resolve(p, m), type), convert(resolve(p, viewportMatrices[`dark.${viewport}`]), type), `Theme-dependent metric: ${p}`);
    }
  }
  variables.push({ path: p, name: p.replaceAll('.', '/'), collection: primitive ? 'Primitives' : type === 'color' ? 'Colors' : 'Metrics', type: variableType[type], sourceType: type, sourceFile: token.file, css: cssName(p), scopes: scopes(p, type, primitive), description: token.$description ?? '', values, modes, resolved });
}
const ids = new Set(variables.map(v => v.path));
// Figma FLOAT bindings for opacity use percentages; CSS uses a 0–1 fraction.
// Keep source aliases intact while converting numeric leaves at this boundary.
for (const v of variables.filter(v => /^(opacity\.|motion\.opacity\.)/.test(v.path))) {
  for (const group of ['values', 'modes', 'resolved']) for (const key of Object.keys(v[group])) if (typeof v[group][key] === 'number') v[group][key] *= 100;
  v.description += ' Figma opacity binding: 0–100 percent; canonical CSS source remains a 0–1 fraction.';
  v.transform = 'opacity-fraction-to-percent';
}
for (const v of variables) for (const value of Object.values(v.modes)) if (value?.alias) assert(ids.has(value.alias), `Alias omitted: ${value.alias}`);
const cssCapturePath = path.join(output, 'pilot.css.json');
assert(fs.existsSync(cssCapturePath), 'Missing browser capture. Run scripts/capture-figma-pilot-css.js in a bounded evidence phase first.');
if (fs.existsSync(cssCapturePath)) {
  const capture = JSON.parse(fs.readFileSync(cssCapturePath));
  for (const p of ['components/css/primitives.css', 'platforms/web/tokens.css']) assert.equal(capture.sourceHashes?.[p], hash(read(p)), `Stale CSS capture: ${p}; run the bounded browser capture again.`);
  for (const [p, expression] of Object.entries(capture.expressions)) {
    variables.push({ path: p, name: p.replaceAll('.', '/'), collection: 'Colors', type: 'COLOR', sourceType: 'color', sourceFile: 'components/css/primitives.css + platforms/web/tokens.css', derived: true, cssExpression: expression, scopes: ['STROKE_COLOR', 'TEXT_FILL', 'SHAPE_FILL', 'EFFECT_COLOR'], description: 'Derived CSS color, measured in Chromium sRGB. Re-sync after source color changes; not a public token.', modes: { Light: capture.themes.light[p].rgba, Dark: capture.themes.dark[p].rgba } });
  }
  sources['components/css/primitives.css'] = hash(read('components/css/primitives.css'));
  sources['output/figma/pilot.css.json'] = hash(fs.readFileSync(cssCapturePath));
}
for (const [p, expression, formula, scope] of [
  ['adapter.button.lineHeightPx', 'calc(var(--typo-button-size) * var(--typo-button-line-height))', m => convert(resolve('component.button.fontSize',m),'dimension') * resolve('component.button.lineHeight',m), 'LINE_HEIGHT'],
  ['adapter.button.focusOuterSpread', 'calc(var(--border-button-focus-ring-width) + var(--border-button-focus-ring-offset))', m => convert(resolve('component.button.focusRingWidth',m),'dimension') + convert(resolve('component.button.focusRingOffset',m),'dimension'), 'EFFECT_FLOAT'],
  ['adapter.input.focusOuterSpread', 'calc(var(--border-input-focus-ring-width) + var(--border-input-focus-ring-offset))', m => convert(resolve('component.input.focusRingWidth',m),'dimension') + convert(resolve('component.input.focusRingOffset',m),'dimension'), 'EFFECT_FLOAT'],
  ['adapter.button.opticalSlotSize', 'calc(var(--space-button-icon-size) - var(--space-button-icon-edge-offset))', m => convert(resolve('component.button.iconSize',m),'dimension') - Math.min(Math.max(0,convert(resolve('component.button.iconEdgeOffset',m),'dimension')),Math.max(0,convert(resolve('component.button.padding.x',m),'dimension')),Math.max(0,convert(resolve('component.button.iconSize',m),'dimension')/2-convert(resolve('component.button.spinnerWidth',m),'dimension'))), 'WIDTH_HEIGHT']
]) {
  variables.push({ path: p, name: p.replaceAll('.', '/'), collection: 'Metrics', type: 'FLOAT', sourceType: 'dimension', sourceFile: 'components/css/primitives.css', derived: true, cssExpression: expression, scopes: [scope], description: 'Figma adapter calculation; regenerated from public tokens. Not a new public token.', modes: Object.fromEntries(['mobile','tablet','desktop','xl'].map(v => [v === 'xl' ? 'XL' : v[0].toUpperCase()+v.slice(1), formula(viewportMatrices[`light.${v}`])])) });
}
const payload = { schemaVersion: 1, config, sourceHashes: sources, variables, omitted, publicAliases: Object.fromEntries([...publicNames].sort().map(n => [n, declarations[n]])), components: contracts.map(c => ({ slug: c.slug, name: c.name, contractVersion: c.contractVersion, variants: c.variants.map(v => v.name), states: c.states.map(s => s.name), properties: c.properties.map(p => ({ name: p.name, type: p.type, defaultValue: p.defaultValue })) })) };
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'pilot.tokens.json'), JSON.stringify(payload, null, 2) + '\n');
console.log(JSON.stringify({ output: 'output/figma/pilot.tokens.json', variables: variables.length, collections: Object.fromEntries(['Primitives','Colors','Metrics'].map(k => [k, variables.filter(v => v.collection === k).length])), omitted, sourceFiles: Object.keys(sources).length }, null, 2));
