import fs from 'node:fs';
import path from 'node:path';
import { componentCompositionCss } from './lib/component-composition-css.js';

const rootDir = process.cwd();
const contractsDir = path.join(rootDir, 'components', 'contracts');
const schemaPath = path.join(contractsDir, 'contract.schema.json');
const registryPath = path.join(rootDir, 'registry.json');
const webTokensPath = path.join(rootDir, 'platforms', 'web', 'tokens.css');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
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

function hasScalarArray(value) {
  return Array.isArray(value)
    && value.length > 0
    && value.every((item) => (
      typeof item === 'string'
      || typeof item === 'boolean'
      || (typeof item === 'number' && Number.isFinite(item))
    ))
    && new Set(value.map((item) => JSON.stringify(item))).size === value.length;
}

function relative(filePath) {
  return path.relative(rootDir, filePath);
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function cssClassExists(css, className) {
  const normalized = className.startsWith('.') ? className.slice(1) : className;
  return new RegExp(`\\.${escapeRegex(normalized)}(?![a-zA-Z0-9_-])`).test(css);
}

function cssVariableRefs(css) {
  return new Set([...css.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)].map((match) => match[1]));
}

function cssVariableDefinitions(css) {
  return new Set([...css.matchAll(/^\s*(--[a-zA-Z0-9_-]+)\s*:/gm)].map((match) => match[1]));
}


function flattenPublicTokens(contract) {
  return Object.values(contract.tokens?.public ?? {}).flat();
}

function validateRequired(errors, contract, label, keys) {
  for (const key of keys) {
    if (!(key in contract)) {
      errors.push(`${label} is missing required key "${key}"`);
    }
  }
}

function validateOptionList(errors, contract, key) {
  const options = contract[key];

  if (!Array.isArray(options) || options.length === 0) {
    errors.push(`${contract.slug}.${key} must be a non-empty array`);
    return;
  }

  const names = options.map((option) => option?.name);
  if (!hasStringArray(names)) {
    errors.push(`${contract.slug}.${key} names must be unique non-empty strings`);
  }

  const defaults = options.filter((option) => option?.default === true);
  if (defaults.length !== 1) {
    errors.push(`${contract.slug}.${key} must define exactly one default option`);
  }
}

function validateBehaviorList(errors, contract, css) {
  if (!('behavior' in contract)) {
    return;
  }

  if (!Array.isArray(contract.behavior)) {
    errors.push(`${contract.slug}.behavior must be an array when present`);
    return;
  }

  const names = contract.behavior.map((behavior) => behavior?.name);
  if (!hasStringArray(names)) {
    errors.push(`${contract.slug}.behavior names must be unique non-empty strings`);
  }

  for (const behavior of contract.behavior) {
    if (!hasString(behavior?.description)) {
      errors.push(`${contract.slug}.behavior.${behavior?.name ?? 'unknown'} must include a description`);
    }

    for (const key of ['selectors', 'attributes', 'events']) {
      if (key in behavior && !hasStringArray(behavior[key])) {
        errors.push(`${contract.slug}.behavior.${behavior?.name ?? 'unknown'}.${key} must be a unique string array`);
      }
    }

    for (const selector of behavior.selectors ?? []) {
      if (!css.includes(selector)) {
        errors.push(`${contract.slug}.behavior.${behavior.name} selector ${selector} not found in CSS`);
      }
    }
  }
}

function validatePropertyList(errors, contract, css) {
  if (!('properties' in contract)) {
    return;
  }

  if (!Array.isArray(contract.properties) || contract.properties.length === 0) {
    errors.push(`${contract.slug}.properties must be a non-empty array when present`);
    return;
  }

  const names = contract.properties.map((property) => property?.name);
  if (!hasStringArray(names)) {
    errors.push(`${contract.slug}.properties names must be unique non-empty strings`);
  }

  const propertyTypes = new Set(['string', 'string-list', 'boolean', 'number', 'enum', 'slot']);
  const mappingKinds = new Set(['content', 'optionClass', 'class', 'attribute', 'slot', 'collection']);

  for (const property of contract.properties) {
    const propertyName = property?.name ?? 'unknown';

    if (!/^[a-z][a-zA-Z0-9]*$/.test(String(property?.name ?? ''))) {
      errors.push(`${contract.slug}.properties.${propertyName}.name must be camelCase`);
    }
    if (!propertyTypes.has(property?.type)) {
      errors.push(`${contract.slug}.properties.${propertyName}.type is not supported`);
    }
    if (typeof property?.required !== 'boolean') {
      errors.push(`${contract.slug}.properties.${propertyName}.required must be a boolean`);
    }
    if (!hasString(property?.description)) {
      errors.push(`${contract.slug}.properties.${propertyName} must include a description`);
    }
    if ('unsetBehavior' in property && !hasString(property.unsetBehavior)) {
      errors.push(`${contract.slug}.properties.${propertyName}.unsetBehavior must be a non-empty string`);
    }

    if (property.type === 'number') {
      for (const key of ['minimum', 'maximum', 'step']) {
        if (key in property && (typeof property[key] !== 'number' || !Number.isFinite(property[key]))) {
          errors.push(`${contract.slug}.properties.${propertyName}.${key} must be a finite number`);
        }
      }
      if ('step' in property && property.step <= 0) {
        errors.push(`${contract.slug}.properties.${propertyName}.step must be greater than zero`);
      }
      if ('minimum' in property && 'maximum' in property && property.maximum < property.minimum) {
        errors.push(`${contract.slug}.properties.${propertyName}.maximum must be greater than or equal to minimum`);
      }
    } else {
      for (const key of ['minimum', 'maximum', 'step']) {
        if (key in property) {
          errors.push(`${contract.slug}.properties.${propertyName}.${key} is supported only by number properties`);
        }
      }
    }

    const hasValues = 'values' in property;
    const hasValuesFrom = 'valuesFrom' in property;
    let enumValues = [];

    if (property.type === 'enum') {
      if (hasValues === hasValuesFrom) {
        errors.push(`${contract.slug}.properties.${propertyName} must define exactly one of values or valuesFrom`);
      } else if (hasValues) {
        if (!hasStringArray(property.values) || property.values.length === 0) {
          errors.push(`${contract.slug}.properties.${propertyName}.values must be a unique non-empty string array`);
        } else {
          enumValues = property.values;
        }
      } else if (!['variants', 'sizes'].includes(property.valuesFrom)) {
        errors.push(`${contract.slug}.properties.${propertyName}.valuesFrom must be variants or sizes`);
      } else {
        enumValues = (contract[property.valuesFrom] ?? []).map((option) => option.name);
      }
    }

    if ('defaultValue' in property) {
      if (property.type === 'boolean' && typeof property.defaultValue !== 'boolean') {
        errors.push(`${contract.slug}.properties.${propertyName}.defaultValue must be a boolean`);
      }
      if (property.type === 'string' && typeof property.defaultValue !== 'string') {
        errors.push(`${contract.slug}.properties.${propertyName}.defaultValue must be a string`);
      }
      if (property.type === 'number') {
        if (typeof property.defaultValue !== 'number' || !Number.isFinite(property.defaultValue)) {
          errors.push(`${contract.slug}.properties.${propertyName}.defaultValue must be a finite number`);
        } else {
          if ('minimum' in property && property.defaultValue < property.minimum) {
            errors.push(`${contract.slug}.properties.${propertyName}.defaultValue must be at least minimum`);
          }
          if ('maximum' in property && property.defaultValue > property.maximum) {
            errors.push(`${contract.slug}.properties.${propertyName}.defaultValue must be at most maximum`);
          }
          if ('step' in property) {
            const base = property.minimum ?? 0;
            const steps = (property.defaultValue - base) / property.step;
            if (Math.abs(steps - Math.round(steps)) > Number.EPSILON * 10) {
              errors.push(`${contract.slug}.properties.${propertyName}.defaultValue must align to step`);
            }
          }
        }
      }
      if (property.type === 'enum' && !enumValues.includes(property.defaultValue)) {
        errors.push(`${contract.slug}.properties.${propertyName}.defaultValue must be one of its enum values`);
      }
      if (property.type === 'slot') {
        errors.push(`${contract.slug}.properties.${propertyName} slot properties cannot define defaultValue`);
      }
    }

    if (!isObject(property?.targetMappings) || Object.keys(property.targetMappings).length === 0) {
      errors.push(`${contract.slug}.properties.${propertyName}.targetMappings must be a non-empty object`);
      continue;
    }

    for (const [target, mappings] of Object.entries(property.targetMappings)) {
      if (!isObject(contract.adapters?.[target])) {
        errors.push(`${contract.slug}.properties.${propertyName} maps unknown target ${target}`);
      }
      if (!Array.isArray(mappings) || mappings.length === 0) {
        errors.push(`${contract.slug}.properties.${propertyName}.targetMappings.${target} must be a non-empty array`);
        continue;
      }

      for (const [index, mapping] of mappings.entries()) {
        const mappingLabel = `${contract.slug}.properties.${propertyName}.targetMappings.${target}[${index}]`;

        if (!isObject(mapping) || !mappingKinds.has(mapping.kind)) {
          errors.push(`${mappingLabel}.kind is not supported`);
          continue;
        }
        if (!hasString(mapping.selector)) {
          errors.push(`${mappingLabel}.selector must be a non-empty string`);
        } else if (target === 'web' && !css.includes(mapping.selector)) {
          errors.push(`${mappingLabel}.selector ${mapping.selector} not found in CSS`);
        }
        if ('elements' in mapping && !hasStringArray(mapping.elements)) {
          errors.push(`${mappingLabel}.elements must be a unique non-empty string array`);
        }

        if (mapping.kind === 'content' && property.type !== 'string') {
          errors.push(`${mappingLabel} content mappings require a string property`);
        }

        if (mapping.kind === 'collection' && property.type !== 'string-list') {
          errors.push(`${mappingLabel} collection mappings require a string-list property`);
        }

        if (mapping.kind === 'optionClass') {
          if (property.type !== 'enum' || !['variants', 'sizes'].includes(mapping.source)) {
            errors.push(`${mappingLabel} optionClass mappings require an enum property and variants or sizes source`);
          }
          if (property.valuesFrom !== mapping.source) {
            errors.push(`${mappingLabel}.source must match ${propertyName}.valuesFrom`);
          }
        }

        if (mapping.kind === 'class' || mapping.kind === 'slot') {
          if (!hasStringArray(mapping.classNames) || mapping.classNames.length === 0) {
            errors.push(`${mappingLabel}.classNames must be a unique non-empty string array`);
          } else if (target === 'web') {
            for (const className of mapping.classNames) {
              if (!cssClassExists(css, className)) {
                errors.push(`${mappingLabel} class ${className} not found in CSS`);
              }
            }
          }
          if (mapping.kind === 'class' && property.type !== 'boolean') {
            errors.push(`${mappingLabel} class mappings require a boolean property`);
          }
          if (mapping.kind === 'slot' && property.type !== 'slot') {
            errors.push(`${mappingLabel} slot mappings require a slot property`);
          }
        }

        if (mapping.kind === 'attribute') {
          if (!hasString(mapping.attribute)) {
            errors.push(`${mappingLabel}.attribute must be a non-empty string`);
          }
          const hasMappedValues = 'values' in mapping;
          const hasRemoveWhen = 'removeWhen' in mapping;
          const hasValueFrom = 'valueFrom' in mapping;
          const mappingModes = [hasMappedValues, hasRemoveWhen, hasValueFrom]
            .filter(Boolean).length;

          if (mappingModes !== 1) {
            errors.push(`${mappingLabel} must define exactly one of values, removeWhen, or valueFrom`);
          } else if (hasValueFrom) {
            if (mapping.valueFrom !== 'property') {
              errors.push(`${mappingLabel}.valueFrom must be property`);
            }
            if (!['string', 'number'].includes(property.type)) {
              errors.push(`${mappingLabel}.valueFrom requires a string or number property`);
            }
          } else if (hasMappedValues && (!isObject(mapping.values) || Object.keys(mapping.values).length === 0)) {
            errors.push(`${mappingLabel}.values must be a non-empty object`);
          } else if (hasMappedValues) {
            const expectedValues = property.type === 'boolean' ? ['true', 'false'] : enumValues;
            for (const expectedValue of expectedValues) {
              if (!(expectedValue in mapping.values)) {
                errors.push(`${mappingLabel}.values is missing ${expectedValue}`);
              }
            }
          } else if (!hasScalarArray(mapping.removeWhen)) {
            errors.push(`${mappingLabel}.removeWhen must be a unique non-empty string or boolean array`);
          } else {
            const propertyValues = property.type === 'boolean'
              ? [true, false]
              : property.type === 'number'
                ? mapping.removeWhen
                : enumValues;
            for (const removeValue of mapping.removeWhen) {
              if (!propertyValues.includes(removeValue)) {
                errors.push(`${mappingLabel}.removeWhen contains unknown property value ${removeValue}`);
              }
            }
          }
        }
      }
    }
  }
}

function registryOptions(registryComponent, key) {
  const options = registryComponent[key] ?? [];

  if (options.length === 0 && (key === 'sizes' || key === 'variants')) {
    return ['default'];
  }

  return options;
}

function registryTokenCovered(registryToken, contractTokens) {
  if (registryToken.endsWith('*')) {
    const prefix = registryToken.slice(0, -1);
    return contractTokens.some((token) => token.startsWith(prefix));
  }

  return contractTokens.includes(registryToken);
}

function validateContract(contractPath, context) {
  const contract = readJson(contractPath);
  const label = relative(contractPath);
  const errors = [];

  validateRequired(errors, contract, label, [
    '$schema',
    'contractVersion',
    'slug',
    'name',
    'registryId',
    'category',
    'status',
    'summary',
    'dependencies',
    'source',
    'anatomy',
    'variants',
    'sizes',
    'states',
    'tokens',
    'accessibility',
    'adapters'
  ]);

  if (contract.$schema !== './contract.schema.json') {
    errors.push(`${contract.slug ?? label}.$schema must be "./contract.schema.json"`);
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(contract.slug ?? ''))) {
    errors.push(`${label}.slug must be a kebab-case slug`);
  }

  const registryComponent = context.registry.components?.[contract.slug];
  if (!registryComponent) {
    errors.push(`${contract.slug}: missing registry component`);
    return errors;
  }

  if (contract.name !== registryComponent.name) {
    errors.push(`${contract.slug}.name must match registry name "${registryComponent.name}"`);
  }

  if (contract.registryId !== registryComponent.id) {
    errors.push(`${contract.slug}.registryId must match registry id "${registryComponent.id}"`);
  }

  if (contract.category !== registryComponent.category) {
    errors.push(`${contract.slug}.category must match registry category "${registryComponent.category}"`);
  }

  const contractDependencies = contract.dependencies ?? [];
  const registryDependencies = registryComponent.dependencies ?? [];
  if (registryDependencies.join('|') !== contractDependencies.join('|')) {
    errors.push(`${contract.slug}.dependencies must match registry dependencies: ${registryDependencies.join(', ')}`);
  }

  if (contract.source?.css?.file !== registryComponent.file) {
    errors.push(`${contract.slug}.source.css.file must match registry file "${registryComponent.file}"`);
  }

  if (contract.source?.css?.selector !== registryComponent.selector) {
    errors.push(`${contract.slug}.source.css.selector must match registry selector "${registryComponent.selector}"`);
  }

  const docsPath = path.join(rootDir, contract.source?.docs ?? '');
  if (!fs.existsSync(docsPath)) {
    errors.push(`${contract.slug}.source.docs points to missing file: ${contract.source?.docs}`);
  }

  const cssPath = path.join(rootDir, contract.source?.css?.file ?? '');
  if (!fs.existsSync(cssPath)) {
    errors.push(`${contract.slug}.source.css.file points to missing file: ${contract.source?.css?.file}`);
    return errors;
  }

  const css = componentCompositionCss(contract.slug, context);
  const docs = fs.existsSync(docsPath) ? read(docsPath) : '';
  const cssRefs = cssVariableRefs(css);
  const webDefinitions = context.webDefinitions;

  validateOptionList(errors, contract, 'variants');
  validateOptionList(errors, contract, 'sizes');

  const contractVariants = contract.variants?.map((variant) => variant.name) ?? [];
  const registryVariants = registryOptions(registryComponent, 'variants');
  if (registryVariants.join('|') !== contractVariants.join('|')) {
    errors.push(`${contract.slug}.variants must match registry variants: ${registryVariants.join(', ')}`);
  }

  const contractSizes = contract.sizes?.map((size) => size.name) ?? [];
  const registrySizes = registryOptions(registryComponent, 'sizes');
  if (registrySizes.join('|') !== contractSizes.join('|')) {
    errors.push(`${contract.slug}.sizes must match registry sizes: ${registrySizes.join(', ')}`);
  }

  for (const anatomyPart of contract.anatomy ?? []) {
    if (!hasString(anatomyPart.name)) {
      errors.push(`${contract.slug}.anatomy contains a part without a name`);
    }
    if (anatomyPart.className && !cssClassExists(css, anatomyPart.className)) {
      errors.push(`${contract.slug}.anatomy.${anatomyPart.name} class ${anatomyPart.className} not found in CSS`);
    }
    if (anatomyPart.selector && !css.includes(anatomyPart.selector)) {
      errors.push(`${contract.slug}.anatomy.${anatomyPart.name} selector ${anatomyPart.selector} not found in CSS`);
    }
  }

  for (const option of [...(contract.variants ?? []), ...(contract.sizes ?? [])]) {
    if (option.className) {
      if (!cssClassExists(css, option.className)) {
        errors.push(`${contract.slug}.${option.name} class ${option.className} not found in CSS`);
      }
      if (!docs.includes(option.className.slice(1))) {
        errors.push(`${contract.slug}.${option.name} class ${option.className} not referenced in docs`);
      }
    }
  }

  for (const state of contract.states ?? []) {
    if (!hasString(state.name)) {
      errors.push(`${contract.slug}.states contains a state without a name`);
    }
    for (const variant of contract.variants ?? []) {
      const suffix = state.name?.startsWith(variant.name) ? state.name.slice(variant.name.length) : '';
      if (/^(Hover|FocusVisible|FocusWithin|Open|Closed|Active|Pressed|Disabled|Selected)$/.test(suffix)) {
        errors.push(`${contract.slug}.states.${state.name} combines variant ${variant.name} with ${suffix}; use independent axes (ADR 0274).`);
      }
    }
    if (!hasStringArray(state.selectors)) {
      errors.push(`${contract.slug}.states.${state.name} selectors must be unique non-empty strings`);
      continue;
    }
    for (const selector of state.selectors) {
      if (!css.includes(selector)) {
        errors.push(`${contract.slug}.states.${state.name} selector ${selector} not found in CSS`);
      }
    }
  }

  validateBehaviorList(errors, contract, css);
  validatePropertyList(errors, contract, css);

  if (!isObject(contract.tokens?.public)) {
    errors.push(`${contract.slug}.tokens.public must be an object`);
  } else {
    for (const [category, tokens] of Object.entries(contract.tokens.public)) {
      if (!hasStringArray(tokens)) {
        errors.push(`${contract.slug}.tokens.public.${category} must be a unique string array`);
      }
    }
  }

  const publicTokens = flattenPublicTokens(contract);
  for (const token of publicTokens) {
    if (!cssRefs.has(token)) {
      errors.push(`${contract.slug} public token ${token} is not referenced by ${contract.source.css.file} or its declared dependencies`);
    }
    if (!webDefinitions.has(token)) {
      errors.push(`${contract.slug} public token ${token} is not defined by platforms/web/tokens.css`);
    }
  }

  for (const [category, registryTokens] of Object.entries(registryComponent.tokens ?? {})) {
    const contractTokens = contract.tokens?.public?.[category] ?? [];
    for (const registryToken of registryTokens) {
      if (!registryTokenCovered(registryToken, contractTokens)) {
        errors.push(`${contract.slug}.tokens.public.${category} does not cover registry token ${registryToken}`);
      }
    }
  }

  if (!Array.isArray(contract.accessibility) || contract.accessibility.length === 0) {
    errors.push(`${contract.slug}.accessibility must be a non-empty array`);
  }

  if (!isObject(contract.adapters) || Object.keys(contract.adapters).length === 0) {
    errors.push(`${contract.slug}.adapters must be a non-empty object`);
  }

  return errors;
}

function main() {
  const errors = [];

  if (!fs.existsSync(schemaPath)) {
    errors.push('components/contracts/contract.schema.json is missing');
  }

  if (!fs.existsSync(webTokensPath)) {
    errors.push('platforms/web/tokens.css is missing. Run npm run build:tokens:web first.');
  }

  const contractFiles = fs
    .readdirSync(contractsDir)
    .filter((fileName) => fileName.endsWith('.contract.json'))
    .sort();

  if (contractFiles.length === 0) {
    errors.push('components/contracts has no *.contract.json files');
  }

  const context = {
    rootDir,
    registry: readJson(registryPath),
    webDefinitions: fs.existsSync(webTokensPath) ? cssVariableDefinitions(read(webTokensPath)) : new Set(),
    compositionCss: new Map()
  };

  for (const fileName of contractFiles) {
    errors.push(...validateContract(path.join(contractsDir, fileName), context));
  }

  if (errors.length > 0) {
    console.error('Component contract errors:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${contractFiles.length} component contract(s).`);
}

main();
