import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import StyleDictionary from 'style-dictionary';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokenSourceDir = path.join(repoRoot, 'tokens', 'source');
const buildDir = path.join(tokenSourceDir, 'build');

const themes = ['light', 'dark'];
const viewports = ['mobile', 'tablet', 'desktop', 'xl'];

function readFlag(name) {
  const args = process.argv.slice(2);
  const inline = args.find((arg) => arg.startsWith(`--${name}=`));

  if (inline) {
    return inline.slice(name.length + 3);
  }

  const index = args.indexOf(`--${name}`);
  if (index !== -1) {
    return args[index + 1];
  }

  return undefined;
}

function assertKnown(value, allowed, label) {
  if (value && !allowed.includes(value)) {
    throw new Error(`Unknown ${label} "${value}". Expected one of: ${allowed.join(', ')}`);
  }
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isToken(value) {
  return isObject(value) && Object.prototype.hasOwnProperty.call(value, '$value');
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function tokenFiles(layer) {
  const dir = path.join(tokenSourceDir, layer);
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.tokens.json'))
    .sort()
    .map((file) => path.join(dir, file));
}

function mergeTokens(target, source) {
  for (const [key, value] of Object.entries(source)) {
    if (key.startsWith('$')) {
      continue;
    }

    if (isToken(value)) {
      target[key] = clone(value);
      continue;
    }

    if (isObject(value)) {
      if (!isObject(target[key]) || isToken(target[key])) {
        target[key] = {};
      }

      mergeTokens(target[key], value);
      continue;
    }

    target[key] = clone(value);
  }

  return target;
}

function buildMatrixTokens(theme, viewport) {
  const files = [
    ...tokenFiles('primitives'),
    ...tokenFiles('semantics'),
    ...tokenFiles('components'),
    path.join(tokenSourceDir, 'modes', `theme.${theme}.tokens.json`),
    path.join(tokenSourceDir, 'modes', `viewport.${viewport}.tokens.json`)
  ];

  return {
    files,
    tokens: files.reduce((merged, file) => mergeTokens(merged, readJson(file)), {})
  };
}

function matrixConfig(theme, viewport, tokens) {
  const destinationBase = `${theme}.${viewport}`;

  return {
    usesDtcg: true,
    tokens,
    platforms: {
      css: {
        transformGroup: 'css',
        prefix: 'tg',
        buildPath: path.join(buildDir, 'css') + path.sep,
        files: [
          {
            destination: `${destinationBase}.css`,
            format: 'css/variables',
            options: {
              outputReferences: true
            }
          }
        ]
      },
      json: {
        transformGroup: 'js',
        buildPath: path.join(buildDir, 'json') + path.sep,
        files: [
          {
            destination: `${destinationBase}.resolved.json`,
            format: 'json/nested'
          }
        ]
      }
    }
  };
}

async function buildMatrix(theme, viewport) {
  const { files, tokens } = buildMatrixTokens(theme, viewport);
  const sd = new StyleDictionary(matrixConfig(theme, viewport, tokens), { warnings: 'error' });

  await sd.buildAllPlatforms();

  return {
    theme,
    viewport,
    sources: files.map((file) => path.relative(repoRoot, file)),
    outputs: {
      css: path.relative(repoRoot, path.join(buildDir, 'css', `${theme}.${viewport}.css`)),
      json: path.relative(repoRoot, path.join(buildDir, 'json', `${theme}.${viewport}.resolved.json`))
    }
  };
}

const selectedTheme = readFlag('theme');
const selectedViewport = readFlag('viewport');

assertKnown(selectedTheme, themes, 'theme');
assertKnown(selectedViewport, viewports, 'viewport');

const selectedThemes = selectedTheme ? [selectedTheme] : themes;
const selectedViewports = selectedViewport ? [selectedViewport] : viewports;
const matrices = [];

for (const theme of selectedThemes) {
  for (const viewport of selectedViewports) {
    matrices.push(await buildMatrix(theme, viewport));
  }
}

fs.mkdirSync(buildDir, { recursive: true });
fs.writeFileSync(
  path.join(buildDir, 'manifest.json'),
  `${JSON.stringify(
    {
      source: 'tokens/source',
      themes: selectedThemes,
      viewports: selectedViewports,
      matrices
    },
    null,
    2
  )}\n`
);

console.log(`Built token source matrices: ${matrices.map((matrix) => `${matrix.theme}/${matrix.viewport}`).join(', ')}`);
