import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const registryPath = path.join(rootDir, 'registry.json');
const schemaPath = path.join(rootDir, 'registry.schema.json');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function hasStringArray(value) {
  return Array.isArray(value) && value.every(hasString) && new Set(value).size === value.length;
}

function pathExists(relativePath) {
  return fs.existsSync(path.join(rootDir, relativePath));
}

function validateRequiredObject(errors, object, pathLabel, requiredKeys) {
  if (!isObject(object)) {
    errors.push(`${pathLabel} must be an object`);
    return false;
  }

  for (const key of requiredKeys) {
    if (!(key in object)) {
      errors.push(`${pathLabel} is missing required key "${key}"`);
    }
  }

  return true;
}

function validateRegistry(registry) {
  const errors = [];
  const warnings = [];

  if (!pathExists('registry.schema.json')) {
    errors.push('registry.schema.json is missing');
  }

  validateRequiredObject(errors, registry, 'registry', [
    '$schema',
    'name',
    'version',
    'description',
    'tokens',
    'base',
    'components',
    'categories',
    'targets',
  ]);

  if (registry.$schema !== './registry.schema.json') {
    errors.push('registry.$schema must be "./registry.schema.json"');
  }

  if (!/^[0-9]+\.[0-9]+\.[0-9]+(?:-[0-9A-Za-z.-]+)?$/.test(String(registry.version ?? ''))) {
    errors.push('registry.version must be a semver-like string');
  }

  const tokenCategories = new Set(registry.tokens?.categories ?? []);
  if (!hasStringArray(registry.tokens?.categories)) {
    errors.push('registry.tokens.categories must be a unique string array');
  }

  if (!isObject(registry.tokens?.files)) {
    errors.push('registry.tokens.files must be an object');
  } else {
    for (const [key, file] of Object.entries(registry.tokens.files)) {
      if (!hasString(file)) {
        errors.push(`registry.tokens.files.${key} must be a non-empty string`);
        continue;
      }
      if (!pathExists(file)) {
        errors.push(`registry.tokens.files.${key} points to missing file: ${file}`);
      }
    }
  }

  if (!isObject(registry.base)) {
    errors.push('registry.base must be an object');
  } else {
    for (const [key, entry] of Object.entries(registry.base)) {
      validateRequiredObject(errors, entry, `registry.base.${key}`, ['file', 'description', 'dependencies']);
      if (hasString(entry?.file) && !pathExists(entry.file)) {
        errors.push(`registry.base.${key}.file points to missing file: ${entry.file}`);
      }
      if (!hasString(entry?.description)) {
        errors.push(`registry.base.${key}.description must be a non-empty string`);
      }
      if (!hasStringArray(entry?.dependencies)) {
        errors.push(`registry.base.${key}.dependencies must be a unique string array`);
      }
    }
  }

  const categoryKeys = new Set(Object.keys(registry.categories ?? {}));
  if (!isObject(registry.categories)) {
    errors.push('registry.categories must be an object');
  } else {
    for (const [key, category] of Object.entries(registry.categories)) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(key)) {
        errors.push(`registry.categories key "${key}" must be a kebab-case slug`);
      }
      validateRequiredObject(errors, category, `registry.categories.${key}`, ['name', 'description', 'file', 'count']);
      if (!hasString(category?.name)) {
        errors.push(`registry.categories.${key}.name must be a non-empty string`);
      }
      if (!hasString(category?.description)) {
        errors.push(`registry.categories.${key}.description must be a non-empty string`);
      }
      if (category?.file !== null && !hasString(category?.file)) {
        errors.push(`registry.categories.${key}.file must be a string or null`);
      } else if (hasString(category?.file) && !pathExists(category.file)) {
        errors.push(`registry.categories.${key}.file points to missing file: ${category.file}`);
      }
      if (!Number.isInteger(category?.count) || category.count < 0) {
        errors.push(`registry.categories.${key}.count must be a non-negative integer`);
      }
    }
  }

  const componentIds = new Map();
  if (!isObject(registry.components)) {
    errors.push('registry.components must be an object');
  } else {
    for (const [slug, component] of Object.entries(registry.components)) {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
        errors.push(`registry.components key "${slug}" must be a kebab-case slug`);
      }

      validateRequiredObject(errors, component, `registry.components.${slug}`, [
        'name',
        'id',
        'category',
        'file',
        'selector',
        'description',
        'dependencies',
      ]);

      if (!hasString(component?.name)) {
        errors.push(`${slug}.name must be a non-empty string`);
      }
      if (!/^[A-Z][0-9]+[a-z]?$/.test(String(component?.id ?? ''))) {
        errors.push(`${slug}.id must look like "A1" or "F6a"`);
      } else if (componentIds.has(component.id)) {
        errors.push(`${slug}.id duplicates ${componentIds.get(component.id)}: ${component.id}`);
      } else {
        componentIds.set(component.id, slug);
      }
      if (!categoryKeys.has(component?.category)) {
        errors.push(`${slug}.category references unknown category: ${component?.category}`);
      }
      if (hasString(component?.file) && !pathExists(component.file)) {
        errors.push(`${slug}.file points to missing file: ${component.file}`);
      }
      if (!hasString(component?.selector) || !component.selector.includes('.')) {
        errors.push(`${slug}.selector must include at least one CSS class selector`);
      }
      if (!hasString(component?.description)) {
        errors.push(`${slug}.description must be a non-empty string`);
      }
      if (!hasStringArray(component?.dependencies)) {
        errors.push(`${slug}.dependencies must be a unique string array`);
      }
      if ('variants' in component && !hasStringArray(component.variants)) {
        errors.push(`${slug}.variants must be a unique string array`);
      }
      if ('sizes' in component && !hasStringArray(component.sizes)) {
        errors.push(`${slug}.sizes must be a unique string array`);
      }

      if ('tokens' in component) {
        if (!isObject(component.tokens)) {
          errors.push(`${slug}.tokens must be an object`);
        } else {
          for (const [tokenCategory, tokens] of Object.entries(component.tokens)) {
            if (!tokenCategories.has(tokenCategory)) {
              errors.push(`${slug}.tokens.${tokenCategory} references unknown token category`);
            }
            if (!hasStringArray(tokens)) {
              errors.push(`${slug}.tokens.${tokenCategory} must be a unique string array`);
            }
          }
        }
      }
    }

    const componentKeys = new Set(Object.keys(registry.components));
    for (const [slug, component] of Object.entries(registry.components)) {
      for (const dep of component.dependencies ?? []) {
        if (dep === slug) {
          errors.push(`${slug}.dependencies cannot reference itself`);
        }
        if (!componentKeys.has(dep) && !registry.base?.[dep]) {
          errors.push(`${slug}.dependencies references unknown dependency: ${dep}`);
        }
      }
    }

    for (const [key, category] of Object.entries(registry.categories ?? {})) {
      const actualCount = Object.values(registry.components).filter((component) => component.category === key).length;
      if (category.count !== actualCount) {
        errors.push(`registry.categories.${key}.count is ${category.count}, expected ${actualCount}`);
      }
    }
  }

  if (!isObject(registry.targets)) {
    errors.push('registry.targets must be an object');
  } else {
    const allowedStatuses = new Set(['active', 'planned', 'experimental', 'deprecated']);
    for (const [key, target] of Object.entries(registry.targets)) {
      validateRequiredObject(errors, target, `registry.targets.${key}`, ['status', 'path', 'description']);
      if (!allowedStatuses.has(target?.status)) {
        errors.push(`registry.targets.${key}.status must be active, planned, experimental, or deprecated`);
      }
      if (!hasString(target?.path)) {
        errors.push(`registry.targets.${key}.path must be a non-empty string`);
      } else if (target.status === 'active' && !pathExists(target.path)) {
        errors.push(`registry.targets.${key}.path points to missing active target path: ${target.path}`);
      }
      if (!hasString(target?.description)) {
        errors.push(`registry.targets.${key}.description must be a non-empty string`);
      }
    }
  }

  return { errors, warnings };
}

const registry = readJson(registryPath);
readJson(schemaPath);
const { errors, warnings } = validateRegistry(registry);

if (warnings.length > 0) {
  console.warn('Registry warnings:');
  for (const warning of warnings) {
    console.warn(`- ${warning}`);
  }
}

if (errors.length > 0) {
  console.error('Registry errors:');
  for (const error of errors) {
    console.error(`- ${error}`);
  }
  process.exit(1);
}

console.log(`Validated registry schema shape: ${Object.keys(registry.components).length} components, ${Object.keys(registry.categories).length} categories, ${Object.keys(registry.targets).length} targets.`);
