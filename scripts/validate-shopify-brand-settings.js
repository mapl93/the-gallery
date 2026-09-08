import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const theme = path.join(root, 'platforms/shopify');
const read = (file) => fs.readFileSync(path.join(theme, file), 'utf8');
const schema = JSON.parse(read('config/settings_schema.json'));
const settings = schema.flatMap((group) => group.settings ?? []);
const snippet = read('snippets/theme-brand-settings.liquid');
const bindings = [...snippet.matchAll(/(--tg-[\w-]+):\s*{{\s*settings\.(color_\w+)\s*}};/g)]
  .map(([, variable, id]) => ({ variable, id }));
const colors = settings.filter((setting) => setting.type === 'color');
assert.equal(new Set(bindings.map(({ id }) => id)).size, colors.length,
  'Every color setting needs exactly one direct, live-preview-compatible binding.');
assert.equal(bindings.length, colors.length, 'Do not duplicate color bindings.');
assert(snippet.includes(':root:not([data-theme="dark"]),\n  [data-theme="light"]'),
  'The light palette must not replace the existing dark palette.');

function flatten(value, prefix = [], output = {}) {
  for (const [key, child] of Object.entries(value)) {
    const parts = [...prefix, key];
    if (child && typeof child === 'object') flatten(child, parts, output);
    else output[`--tg-${parts.join('-').replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()}`] = child;
  }
  return output;
}

let comparisons = 0;
for (const viewport of ['mobile', 'tablet', 'desktop', 'xl']) {
  const file = path.join(root, `tokens/source/build/json/light.${viewport}.resolved.json`);
  assert(fs.existsSync(file), 'Run npm run build:tokens:source before checking Shopify brand settings.');
  const canonical = flatten(JSON.parse(fs.readFileSync(file, 'utf8')));
  for (const { variable, id } of bindings) {
    const setting = colors.find((candidate) => candidate.id === id);
    assert(setting, `Unknown setting ${id}.`);
    assert.match(variable, /^--tg-(color-|component-button-)/, `${id} must bind a semantic or public component decision.`);
    assert.equal(setting.default?.toLowerCase(), canonical[variable]?.toLowerCase(),
      `${id}: schema default drifted from ${variable} in ${viewport}.`);
    assert(snippet.includes(`{% if settings.${id} != blank %}`), `${id}: cleared settings must retain the canonical fallback.`);
    comparisons += 1;
  }
}

for (const file of ['layout/theme.liquid', 'layout/password.liquid', 'templates/gift_card.liquid']) {
  const liquid = read(file);
  const call = "{% render 'theme-brand-settings' %}";
  assert.equal(liquid.split(call).length - 1, 1, `${file} must render the shared brand snippet exactly once.`);
  assert(liquid.indexOf(call) > liquid.lastIndexOf('| stylesheet_tag'), `${file}: brand overrides must follow stylesheets.`);
  assert(!liquid.includes('font_face:') && !liquid.includes('--font-family-'), `${file}: typography must stay in the shared snippet.`);
}
for (const role of ['body', 'heading', 'accent']) {
  assert(snippet.includes(`--font-family-${role}: var(--tg-font-family-sans);`), `${role} must retain interface typography.`);
}
assert(snippet.includes('--font-family-article: var(--tg-font-family-serif);'), 'Editorial type must remain separate.');
for (const id of ['font_body', 'font_heading']) {
  assert.equal(settings.find((setting) => setting.id === id)?.type, 'font_picker');
  assert(snippet.includes(`settings.${id} | font_face:`), `${id}: load the selected Shopify font.`);
  assert(snippet.includes(`{{ settings.${id}.family }}, {{ settings.${id}.fallback_families }}`),
    `${id}: Shopify already quotes multiword family names; preserve its CSS-ready font stack without JSON encoding.`);
}
for (const locale of ['en.default.schema.json', 'es.schema.json']) {
  const strings = JSON.parse(read(`locales/${locale}`));
  const localizedGroups = schema.filter((group) => group.name.startsWith('t:brand.'));
  for (const group of localizedGroups) {
    const references = [group.name, ...group.settings.flatMap((setting) => [setting.label, setting.info, setting.content])]
      .filter((value) => value?.startsWith('t:'));
    for (const reference of references) {
      const value = reference.slice(2).split('.').reduce((object, key) => object?.[key], strings);
      assert.equal(typeof value, 'string', `${locale}: missing ${reference}.`);
    }
  }
}
console.log(`Validated Shopify brand settings: ${colors.length} color bindings, ${comparisons} canonical default comparisons, 2 font pickers, 3 layouts, 2 locales.`);
