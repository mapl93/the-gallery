import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildDir = path.join(repoRoot, 'tokens', 'source', 'build');
const legacyDir = path.join(repoRoot, 'tokens');
const migrationMapPath = path.join(repoRoot, 'tokens', 'source', 'migration-map.json');

const themes = ['light', 'dark'];
const viewports = ['mobile', 'tablet', 'desktop', 'xl'];

const themeFiles = {
  light: 'Light_tokens.json',
  dark: 'Dark_tokens.json'
};

const viewportFiles = {
  mobile: 'Mobile_tokens.json',
  tablet: 'Tablet_tokens.json',
  desktop: 'Desktop_tokens.json',
  xl: 'XL_tokens.json'
};

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isLegacyToken(value) {
  return isObject(value) && Object.prototype.hasOwnProperty.call(value, 'value');
}

function collectLegacyTokens(node, prefix = [], out = {}) {
  if (!isObject(node)) {
    return out;
  }

  if (isLegacyToken(node)) {
    out[prefix.join('.')] = node.value;
    return out;
  }

  Object.entries(node).forEach(([key, value]) => {
    collectLegacyTokens(value, [...prefix, key], out);
  });

  return out;
}

function collectLegacyPaths() {
  return fs
    .readdirSync(legacyDir)
    .filter((fileName) => fileName.endsWith('_tokens.json'))
    .flatMap((fileName) => {
      return Object.keys(collectLegacyTokens(readJson(path.join(legacyDir, fileName))));
    });
}

function getByPath(node, tokenPath) {
  return tokenPath.split('.').reduce((current, segment) => {
    if (current === undefined || current === null) {
      return undefined;
    }

    return current[segment];
  }, node);
}

function legacyMap(theme, viewport) {
  return [
    'Primitives_tokens.json',
    themeFiles[theme],
    viewportFiles[viewport]
  ].reduce((tokens, fileName) => {
    return {
      ...tokens,
      ...collectLegacyTokens(readJson(path.join(legacyDir, fileName)))
    };
  }, {});
}

function resolveLegacyValue(tokens, tokenPath, seen = new Set()) {
  assert(Object.prototype.hasOwnProperty.call(tokens, tokenPath), `Missing legacy token ${tokenPath}`);

  if (seen.has(tokenPath)) {
    throw new Error(`Circular legacy token reference at ${tokenPath}`);
  }

  seen.add(tokenPath);

  const value = tokens[tokenPath];
  const alias = typeof value === 'string' && value.match(/^\{([^{}]+)\}$/);

  if (!alias) {
    return value;
  }

  return resolveLegacyValue(tokens, alias[1], seen);
}

function normalize(value, type) {
  if (type === 'color' && typeof value === 'string') {
    const lower = value.toLowerCase().replace(/\s+/g, '');

    if (lower === 'transparent' || lower === '#00000000' || lower === 'rgba(0,0,0,0)' || lower === 'rgba(0,0,0,0.0)') {
      return 'transparent';
    }

    const hex = lower.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/);
    if (hex) {
      const raw = hex[1].length === 3
        ? hex[1].split('').map((part) => `${part}${part}`).join('')
        : hex[1];
      const red = Number.parseInt(raw.slice(0, 2), 16);
      const green = Number.parseInt(raw.slice(2, 4), 16);
      const blue = Number.parseInt(raw.slice(4, 6), 16);
      const alpha = raw.length === 8 ? Number.parseInt(raw.slice(6, 8), 16) / 255 : 1;

      return `${red},${green},${blue},${Math.round(alpha * 100) / 100}`;
    }

    const rgba = lower.match(/^rgba?\((\d+),(\d+),(\d+)(?:,([0-9.]+))?\)$/);
    if (rgba) {
      const alpha = rgba[4] === undefined ? 1 : Number(rgba[4]);
      return `${Number(rgba[1])},${Number(rgba[2])},${Number(rgba[3])},${Math.round(alpha * 100) / 100}`;
    }

    return lower;
  }

  if (type === 'dimension' && typeof value === 'string' && /^-?\d+(\.\d+)?$/.test(value)) {
    return `${value}px`;
  }

  if (type === 'duration' && typeof value === 'string' && /^\d+(\.\d+)?$/.test(value)) {
    return `${value}ms`;
  }

  if (type === 'number') {
    return Number(value);
  }

  if (type === 'fontWeight') {
    return String(value);
  }

  return value;
}

function expandMigrationMap(map) {
  const entries = [];

  for (const group of map.groups ?? []) {
    const groupStatus = group.status ?? 'mapped';

    for (const legacy of group.same ?? []) {
      entries.push({
        group: group.name,
        legacy,
        source: legacy,
        type: group.type,
        status: groupStatus,
        reason: group.reason
      });
    }

    for (const [legacy, source] of Object.entries(group.renames ?? {})) {
      entries.push({
        group: group.name,
        legacy,
        source,
        type: group.type,
        status: groupStatus,
        reason: group.reason
      });
    }

    for (const pending of group.pending ?? []) {
      entries.push({
        group: group.name,
        legacy: pending.legacy,
        source: pending.source,
        type: pending.type ?? group.type,
        status: 'pending',
        reason: pending.reason ?? group.reason
      });
    }
  }

  return entries;
}

function assertCssIncludes(filePath, expected) {
  const css = read(filePath);
  assert(css.includes(expected), `${path.relative(repoRoot, filePath)} missing "${expected}"`);
}

const manifestPath = path.join(buildDir, 'manifest.json');
assert(fs.existsSync(manifestPath), 'tokens/source/build/manifest.json was not generated');
assert(fs.existsSync(migrationMapPath), 'tokens/source/migration-map.json does not exist');

const manifest = readJson(manifestPath);
const migrationMap = readJson(migrationMapPath);
const mapEntries = expandMigrationMap(migrationMap);
const supportedStatuses = new Set(['mapped', 'format-change', 'pending']);

assert(manifest.source === 'tokens/source', 'build manifest should identify tokens/source');
assert(manifest.matrices.length === themes.length * viewports.length, 'build manifest should include every theme/viewport matrix');
assert(mapEntries.length > 0, 'migration map has no entries');

const duplicateLegacyPaths = mapEntries
  .map((entry) => entry.legacy)
  .filter((legacy, index, all) => all.indexOf(legacy) !== index);

assert(duplicateLegacyPaths.length === 0, `migration map has duplicate legacy paths: ${[...new Set(duplicateLegacyPaths)].join(', ')}`);

for (const entry of mapEntries) {
  assert(supportedStatuses.has(entry.status), `migration map entry ${entry.legacy} has unsupported status "${entry.status}"`);
  assert(entry.legacy, `migration map entry in ${entry.group} is missing legacy path`);

  if (entry.status !== 'pending') {
    assert(entry.source, `migration map entry ${entry.legacy} is missing source path`);
  }
}

const legacyPaths = [...new Set(collectLegacyPaths())].sort();
const mappedLegacyPaths = new Set(mapEntries.map((entry) => entry.legacy));
const missingLegacyPaths = legacyPaths.filter((legacy) => !mappedLegacyPaths.has(legacy));
const unknownLegacyPaths = [...mappedLegacyPaths].filter((legacy) => !legacyPaths.includes(legacy));

assert(missingLegacyPaths.length === 0, `migration map is missing legacy paths: ${missingLegacyPaths.join(', ')}`);
assert(unknownLegacyPaths.length === 0, `migration map references unknown legacy paths: ${unknownLegacyPaths.join(', ')}`);

for (const theme of themes) {
  for (const viewport of viewports) {
    const basename = `${theme}.${viewport}`;
    const cssPath = path.join(buildDir, 'css', `${basename}.css`);
    const jsonPath = path.join(buildDir, 'json', `${basename}.resolved.json`);

    assert(fs.existsSync(cssPath), `${path.relative(repoRoot, cssPath)} was not generated`);
    assert(fs.existsSync(jsonPath), `${path.relative(repoRoot, jsonPath)} was not generated`);

    assertCssIncludes(cssPath, '--tg-color-gray-900: #171717;');
    assertCssIncludes(cssPath, '--tg-component-button-padding-x:');
    assertCssIncludes(cssPath, '--tg-component-button-min-height:');
    assertCssIncludes(cssPath, '--tg-component-button-icon-size:');
    assertCssIncludes(cssPath, '--tg-size-container-max-width:');
  }
}

let comparisonCount = 0;
let mappedCount = 0;
let formatChangeCount = 0;
let pendingCount = 0;

for (const entry of mapEntries) {
  if (entry.status === 'pending') {
    pendingCount += 1;
    continue;
  }

  for (const theme of themes) {
    for (const viewport of viewports) {
      const source = readJson(path.join(buildDir, 'json', `${theme}.${viewport}.resolved.json`));
      const legacyTokens = legacyMap(theme, viewport);
      const expectedValue = resolveLegacyValue(legacyTokens, entry.legacy);
      const sourceValue = getByPath(source, entry.source);

      assert(
        sourceValue !== undefined,
        `${theme}/${viewport} migration source path ${entry.source} for legacy ${entry.legacy} does not exist`
      );

      if (entry.status === 'format-change') {
        continue;
      }

      comparisonCount += 1;

      assert(
        normalize(sourceValue, entry.type) === normalize(expectedValue, entry.type),
        `${theme}/${viewport} ${entry.source} expected ${normalize(expectedValue, entry.type)} from legacy ${entry.legacy}, got ${normalize(sourceValue, entry.type)}`
      );
    }
  }

  if (entry.status === 'format-change') {
    formatChangeCount += 1;
  } else {
    mappedCount += 1;
  }
}

console.log(
  `Validated token source build: 8 CSS files, 8 resolved JSON files, ${mappedCount} mapped legacy tokens, ${comparisonCount} parity comparisons, ${formatChangeCount} format changes, ${pendingCount} pending.`
);
