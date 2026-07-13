import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const componentCssDir = path.join(repoRoot, 'components', 'css');
const webTokensPath = path.join(repoRoot, 'platforms', 'web', 'tokens.css');

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function cssFiles(dir) {
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const filePath = path.join(dir, entry.name);

      if (entry.isDirectory()) {
        return cssFiles(filePath);
      }

      return entry.isFile() && entry.name.endsWith('.css') ? [filePath] : [];
    })
    .sort();
}

function cssVariableRefs(css) {
  return [...css.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)].map((match) => match[1]);
}

function cssVariableDefinitions(css) {
  return [...css.matchAll(/^\s*(--[a-zA-Z0-9_-]+)\s*:/gm)].map((match) => match[1]);
}

assert(fs.existsSync(componentCssDir), 'components/css does not exist');
assert(fs.existsSync(webTokensPath), 'platforms/web/tokens.css does not exist. Run npm run build:tokens:web first.');

const componentRefs = new Set();

for (const filePath of cssFiles(componentCssDir)) {
  const css = fs.readFileSync(filePath, 'utf8');

  for (const ref of cssVariableRefs(css)) {
    if (!ref.startsWith('--_')) {
      componentRefs.add(ref);
    }
  }
}

const webTokens = fs.readFileSync(webTokensPath, 'utf8');
const definedTokens = new Set(cssVariableDefinitions(webTokens));
const missing = [...componentRefs].filter((ref) => !definedTokens.has(ref)).sort();

assert(
  missing.length === 0,
  [
    'platforms/web/tokens.css does not define every public CSS token used by components/css.',
    'Missing tokens:',
    ...missing.map((token) => `- ${token}`)
  ].join('\n')
);

console.log(`Validated web/component token compatibility: ${componentRefs.size} public refs defined.`);
