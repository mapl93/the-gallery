import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const tokenSourceDir = path.join(repoRoot, 'tokens', 'source');

const allowedTypes = new Set([
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
  'typography',
  'shadow',
  'gradient',
  'border',
  'transition'
]);

const requiredDirs = ['primitives', 'semantics', 'components', 'modes'];
const errors = [];
const tokens = new Map();
const references = [];
let tokenCount = 0;

function addError(file, tokenPath, message) {
  const rel = file ? path.relative(repoRoot, file) : 'tokens/source';
  errors.push(`${rel}${tokenPath ? `:${tokenPath}` : ''} - ${message}`);
}

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath);
    }

    return [fullPath];
  });
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function isTokenObject(value) {
  return isObject(value) && Object.prototype.hasOwnProperty.call(value, '$value');
}

function isAliasOnly(value) {
  return typeof value === 'string' && /^\{[A-Za-z0-9_.-]+\}$/.test(value);
}

function collectReferences(value, file, tokenPath) {
  if (typeof value === 'string') {
    for (const match of value.matchAll(/\{([^{}]+)\}/g)) {
      references.push({
        file,
        tokenPath,
        reference: match[1]
      });
    }
    return;
  }

  if (Array.isArray(value)) {
    value.forEach((item) => collectReferences(item, file, tokenPath));
    return;
  }

  if (isObject(value)) {
    Object.values(value).forEach((item) => collectReferences(item, file, tokenPath));
  }
}

function validateTokenValue(file, tokenPath, type, value) {
  if (isAliasOnly(value)) {
    return;
  }

  if (type === 'dimension') {
    if (typeof value !== 'string' || !/^-?\d+(\.\d+)?(px|rem|em|%|vh|vw|vmin|vmax|ch|ex)$/.test(value)) {
      addError(file, tokenPath, 'dimension tokens must use an explicit unit or an alias');
    }
    return;
  }

  if (type === 'duration') {
    if (typeof value !== 'string' || !/^\d+(\.\d+)?(ms|s)$/.test(value)) {
      addError(file, tokenPath, 'duration tokens must use ms/s units or an alias');
    }
    return;
  }

  if (type === 'number') {
    if (typeof value !== 'number') {
      addError(file, tokenPath, 'number tokens must use a JSON number or an alias');
    }
    return;
  }

  if (type === 'color') {
    const isColorString =
      typeof value === 'string' &&
      (/^#(?:[0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$/.test(value) ||
        /^rgba?\(/.test(value) ||
        /^hsla?\(/.test(value) ||
        value === 'transparent');

    if (!isColorString) {
      addError(file, tokenPath, 'color tokens must use a color literal or an alias');
    }
    return;
  }

  if (type === 'cubicBezier') {
    const isCubicBezier =
      Array.isArray(value) &&
      value.length === 4 &&
      value.every((item) => typeof item === 'number');

    if (!isCubicBezier) {
      addError(file, tokenPath, 'cubicBezier tokens must use four numeric values or an alias');
    }
    return;
  }

  if (type === 'transition') {
    if (!isObject(value)) {
      addError(file, tokenPath, 'transition tokens must use an object value');
      return;
    }

    ['duration', 'delay', 'timingFunction'].forEach((property) => {
      if (!Object.prototype.hasOwnProperty.call(value, property)) {
        addError(file, tokenPath, `transition tokens must include ${property}`);
      }
    });

    const isDurationValue = (item) =>
      isAliasOnly(item) || (typeof item === 'string' && /^\d+(\.\d+)?(ms|s)$/.test(item));
    const isTimingFunctionValue = (item) =>
      isAliasOnly(item) ||
      (Array.isArray(item) && item.length === 4 && item.every((entry) => typeof entry === 'number'));

    if (Object.prototype.hasOwnProperty.call(value, 'duration') && !isDurationValue(value.duration)) {
      addError(file, tokenPath, 'transition duration must be a duration value or alias');
    }

    if (Object.prototype.hasOwnProperty.call(value, 'delay') && !isDurationValue(value.delay)) {
      addError(file, tokenPath, 'transition delay must be a duration value or alias');
    }

    if (
      Object.prototype.hasOwnProperty.call(value, 'timingFunction') &&
      !isTimingFunctionValue(value.timingFunction)
    ) {
      addError(file, tokenPath, 'transition timingFunction must be a cubicBezier value or alias');
    }

    return;
  }

  if (type === 'fontFamily') {
    if (typeof value !== 'string') {
      addError(file, tokenPath, 'fontFamily tokens must use a string or an alias');
    }
    return;
  }

  if (type === 'fontWeight') {
    const isFontWeight =
      typeof value === 'number' ||
      (typeof value === 'string' && /^(normal|bold|[1-9]00)$/.test(value));

    if (!isFontWeight) {
      addError(file, tokenPath, 'fontWeight tokens must use a font-weight value or an alias');
    }
  }
}

function validatePathSegments(file, pathParts) {
  pathParts.forEach((segment) => {
    if (!/^(?:[a-z][a-zA-Z0-9-]*|[0-9][a-zA-Z0-9-]*)$/.test(segment)) {
      addError(file, pathParts.join('.'), `invalid token path segment "${segment}"`);
    }
  });
}

function visitNode(node, file, pathParts = []) {
  if (!isObject(node)) {
    return;
  }

  const tokenPath = pathParts.join('.');

  if (Object.prototype.hasOwnProperty.call(node, 'value') || Object.prototype.hasOwnProperty.call(node, 'type')) {
    addError(file, tokenPath, 'legacy value/type keys are not allowed in tokens/source');
  }

  if (isTokenObject(node)) {
    tokenCount += 1;
    validatePathSegments(file, pathParts);

    if (!Object.prototype.hasOwnProperty.call(node, '$type')) {
      addError(file, tokenPath, 'token is missing $type');
    } else if (!allowedTypes.has(node.$type)) {
      addError(file, tokenPath, `unsupported $type "${node.$type}"`);
    }

    validateTokenValue(file, tokenPath, node.$type, node.$value);
    collectReferences(node.$value, file, tokenPath);

    const entries = tokens.get(tokenPath) ?? [];
    entries.push({
      file,
      isMode: path.relative(tokenSourceDir, file).split(path.sep).includes('modes')
    });
    tokens.set(tokenPath, entries);
    return;
  }

  Object.entries(node).forEach(([key, value]) => {
    if (key.startsWith('$')) {
      return;
    }

    visitNode(value, file, [...pathParts, key]);
  });
}

if (!fs.existsSync(tokenSourceDir)) {
  addError(null, '', 'tokens/source does not exist');
} else {
  requiredDirs.forEach((dirName) => {
    const dirPath = path.join(tokenSourceDir, dirName);
    if (!fs.existsSync(dirPath) || !fs.statSync(dirPath).isDirectory()) {
      addError(null, '', `missing ${path.join('tokens/source', dirName)}`);
    }
  });
}

const files = walk(tokenSourceDir).filter((file) => file.endsWith('.tokens.json'));

if (files.length === 0) {
  addError(null, '', 'no .tokens.json files found');
}

files.forEach((file) => {
  try {
    const source = JSON.parse(fs.readFileSync(file, 'utf8'));
    visitNode(source, file);
  } catch (error) {
    addError(file, '', `invalid JSON: ${error.message}`);
  }
});

for (const [tokenPath, entries] of tokens.entries()) {
  if (entries.length <= 1) {
    continue;
  }

  const baseEntries = entries.filter((entry) => !entry.isMode);
  if (baseEntries.length > 1) {
    addError(
      baseEntries[1].file,
      tokenPath,
      'duplicate token path outside modes; only mode files may override paths'
    );
  }
}

references.forEach(({ file, tokenPath, reference }) => {
  if (!tokens.has(reference)) {
    addError(file, tokenPath, `missing token reference {${reference}}`);
  }
});

if (errors.length > 0) {
  console.error(`Token source validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exitCode = 1;
} else {
  const overrideCount = [...tokens.values()].reduce((count, entries) => count + Math.max(entries.length - 1, 0), 0);
  console.log(`Validated token source: ${tokenCount} tokens across ${files.length} files (${overrideCount} mode overrides).`);
}
