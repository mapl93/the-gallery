import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const studioDir = path.join(rootDir, 'site', 'src', 'content', 'studio');
const iconCataloguesDir = path.join(studioDir, 'catalogues');
const contractsDir = path.join(rootDir, 'components', 'contracts');
const schemaPath = path.join(studioDir, 'studio.schema.json');
const iconCatalogueSchemaPath = path.join(iconCataloguesDir, 'icon-catalogue.schema.json');
const sitePackagePath = path.join(rootDir, 'site', 'package.json');
const siteLockPath = path.join(rootDir, 'site', 'package-lock.json');

const propertyKinds = new Set(['text', 'collection', 'number', 'select', 'segmented', 'state', 'icon', 'slot-composition', 'toggle']);
const tokenKinds = new Set(['token', 'token-pair', 'token-swatch']);
const allKinds = new Set([...propertyKinds, ...tokenKinds]);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function hasString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function uniqueStrings(value) {
  return Array.isArray(value)
    && value.length > 0
    && value.every(hasString)
    && new Set(value).size === value.length;
}

function optionValues(contract, property) {
  if (property.valuesFrom === 'variants' || property.valuesFrom === 'sizes') {
    return (contract[property.valuesFrom] ?? []).map((option) => option.name);
  }

  return property.values ?? [];
}

function assertKnownKeys(errors, value, label, allowed) {
  if (!isObject(value)) return;

  for (const key of Object.keys(value)) {
    if (!allowed.has(key)) errors.push(`${label} contains unsupported key "${key}"`);
  }
}

function validateIconCatalogues() {
  const errors = [];
  const catalogues = {};
  let iconCount = 0;

  if (!fs.existsSync(iconCatalogueSchemaPath)) {
    errors.push('Missing site/src/content/studio/catalogues/icon-catalogue.schema.json');
    return { errors, catalogues, iconCount };
  }

  const sitePackage = readJson(sitePackagePath);
  const siteLock = readJson(siteLockPath);
  const files = fs.readdirSync(iconCataloguesDir)
    .filter((fileName) => fileName.endsWith('.icon-catalogue.json'))
    .sort();

  for (const fileName of files) {
    const filePath = path.join(iconCataloguesDir, fileName);
    const label = path.relative(rootDir, filePath);
    const catalogue = readJson(filePath);

    assertKnownKeys(
      errors,
      catalogue,
      label,
      new Set(['$schema', 'id', 'package', 'packageVersion', 'icons'])
    );

    if (catalogue.$schema !== './icon-catalogue.schema.json') {
      errors.push(`${label}.$schema must be "./icon-catalogue.schema.json"`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(catalogue.id ?? ''))) {
      errors.push(`${label}.id must be a kebab-case slug`);
    }

    const expectedId = path.basename(fileName, '.icon-catalogue.json');
    if (catalogue.id !== expectedId) errors.push(`${label}.id must match filename ${expectedId}`);
    if (!hasString(catalogue.package)) errors.push(`${label}.package must be a non-empty string`);
    if (!/^\d+\.\d+\.\d+$/.test(String(catalogue.packageVersion ?? ''))) {
      errors.push(`${label}.packageVersion must be semantic version text`);
    }

    const declaredVersion = sitePackage.dependencies?.[catalogue.package];
    const installedVersion = siteLock.packages?.[`node_modules/${catalogue.package}`]?.version;
    if (!declaredVersion) errors.push(`${label}.package is not a site dependency: ${catalogue.package}`);
    if (installedVersion !== catalogue.packageVersion) {
      errors.push(
        `${label}.packageVersion ${catalogue.packageVersion} does not match installed ${catalogue.package} ${installedVersion ?? 'missing'}`
      );
    }

    if (!Array.isArray(catalogue.icons) || catalogue.icons.length === 0) {
      errors.push(`${label}.icons must be a non-empty array`);
      continue;
    }

    const names = [];
    for (const [index, icon] of catalogue.icons.entries()) {
      const iconLabel = `${label}.icons[${index}]`;
      assertKnownKeys(errors, icon, iconLabel, new Set(['name', 'label']));
      if (!isObject(icon)
          || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(icon.name ?? ''))
          || !hasString(icon.label)) {
        errors.push(`${iconLabel} must define a kebab-case name and non-empty label`);
        continue;
      }
      names.push(icon.name);
    }

    if (new Set(names).size !== names.length) errors.push(`${label}.icons names must be unique`);
    if (catalogue.id in catalogues) errors.push(`${label}.id duplicates catalogue ${catalogue.id}`);
    catalogues[catalogue.id] = catalogue;
    iconCount += new Set(names).size;
  }

  return { errors, catalogues, iconCount };
}

function validateIconCatalogueSource(errors, control, catalogues, label) {
  if (!('iconCatalogue' in control)) return;

  const source = control.iconCatalogue;
  assertKnownKeys(
    errors,
    source,
    `${label}.iconCatalogue`,
    new Set(['source', 'defaultLeading', 'defaultTrailing'])
  );
  if (!['icon', 'slot-composition'].includes(control.kind)) {
    errors.push(`${label}.iconCatalogue is supported only by icon and slot-composition controls`);
  }
  if (!isObject(source)
      || !hasString(source.source)
      || !hasString(source.defaultLeading)
      || !hasString(source.defaultTrailing)) {
    errors.push(`${label}.iconCatalogue must define source, defaultLeading, and defaultTrailing`);
    return;
  }

  const catalogue = catalogues[source.source];
  if (!catalogue) {
    errors.push(`${label}.iconCatalogue references unknown catalogue ${source.source}`);
    return;
  }

  const iconNames = new Set(catalogue.icons.map((icon) => icon.name));
  for (const key of ['defaultLeading', 'defaultTrailing']) {
    if (!iconNames.has(source[key])) {
      errors.push(`${label}.iconCatalogue.${key} is not in ${source.source}: ${source[key]}`);
    }
  }
}

function validateOptionLabels(errors, control, expectedValues, label) {
  if (!('optionLabels' in control)) return;
  if (!isObject(control.optionLabels) || Object.keys(control.optionLabels).length === 0) {
    errors.push(`${label}.optionLabels must be a non-empty object`);
    return;
  }

  const keys = Object.keys(control.optionLabels);
  const unknown = keys.filter((key) => !expectedValues.includes(key));
  const missing = expectedValues.filter((value) => !(value in control.optionLabels));

  if (unknown.length > 0) errors.push(`${label}.optionLabels contains unknown options: ${unknown.join(', ')}`);
  if (missing.length > 0) errors.push(`${label}.optionLabels is missing options: ${missing.join(', ')}`);
  for (const [key, value] of Object.entries(control.optionLabels)) {
    if (!hasString(value)) errors.push(`${label}.optionLabels.${key} must be a non-empty string`);
  }
}

function validateVisibility(errors, control, contract, propertiesByName, label) {
  if (!('visibleWhen' in control)) return;

  const rule = control.visibleWhen;
  assertKnownKeys(errors, rule, `${label}.visibleWhen`, new Set(['property', 'equals']));
  if (!isObject(rule) || !hasString(rule.property) || !('equals' in rule)) {
    errors.push(`${label}.visibleWhen must define property and equals`);
    return;
  }

  const property = propertiesByName[rule.property];
  if (!property) {
    errors.push(`${label}.visibleWhen references unknown property ${rule.property}`);
    return;
  }

  if ((property.type === 'boolean' || property.type === 'slot')
      && typeof rule.equals !== 'boolean') {
    errors.push(`${label}.visibleWhen.equals must be boolean for ${rule.property}`);
  }
  if (property.type === 'string' && typeof rule.equals !== 'string') {
    errors.push(`${label}.visibleWhen.equals must be a string for ${rule.property}`);
  }
  if (property.type === 'number' && typeof rule.equals !== 'number') {
    errors.push(`${label}.visibleWhen.equals must be a number for ${rule.property}`);
  }
  if (property.type === 'enum' && !optionValues(contract, property).includes(rule.equals)) {
    errors.push(`${label}.visibleWhen.equals is not a declared value of ${rule.property}`);
  }
}

function resolveTokens(errors, control, contract, label) {
  const source = control.tokens;
  assertKnownKeys(errors, source, `${label}.tokens`, new Set(['category', 'names', 'match']));

  if (!isObject(source) || !hasString(source.category)) {
    errors.push(`${label}.tokens must define a category`);
    return [];
  }

  const categoryTokens = contract.tokens?.public?.[source.category];
  if (!Array.isArray(categoryTokens)) {
    errors.push(`${label}.tokens references unknown public token category ${source.category}`);
    return [];
  }

  const hasNames = 'names' in source;
  const hasMatch = 'match' in source;
  if (hasNames === hasMatch) {
    errors.push(`${label}.tokens must define exactly one of names or match`);
    return [];
  }

  if (hasNames) {
    if (!uniqueStrings(source.names)) {
      errors.push(`${label}.tokens.names must be a unique non-empty string array`);
      return [];
    }

    const unknown = source.names.filter((token) => !categoryTokens.includes(token));
    if (unknown.length > 0) errors.push(`${label}.tokens.names contains non-public tokens: ${unknown.join(', ')}`);
    return source.names.filter((token) => categoryTokens.includes(token));
  }

  if (!hasString(source.match)) {
    errors.push(`${label}.tokens.match must be a non-empty regular expression`);
    return [];
  }

  let pattern;
  try {
    pattern = new RegExp(source.match);
  } catch (error) {
    errors.push(`${label}.tokens.match is invalid: ${error.message}`);
    return [];
  }

  const matches = categoryTokens.filter((token) => pattern.test(token));
  if (matches.length === 0) errors.push(`${label}.tokens.match resolves to no public tokens`);
  return matches;
}

function validatePropertyControl(errors, control, contract, propertiesByName, label) {
  if (!uniqueStrings(control.properties)) {
    errors.push(`${label}.properties must be a unique non-empty string array`);
    return [];
  }

  const properties = control.properties.map((name) => propertiesByName[name]).filter(Boolean);
  const unknown = control.properties.filter((name) => !propertiesByName[name]);
  if (unknown.length > 0) errors.push(`${label}.properties contains unknown contract properties: ${unknown.join(', ')}`);

  if (control.kind === 'text' && (properties.length !== 1 || properties[0].type !== 'string')) {
    errors.push(`${label} text controls require exactly one string property`);
  }
  if (control.kind === 'collection'
      && (properties.length !== 1 || properties[0].type !== 'string-list')) {
    errors.push(`${label} collection controls require exactly one string-list property`);
  }
  if (control.kind === 'number' && (properties.length !== 1 || properties[0].type !== 'number')) {
    errors.push(`${label} number controls require exactly one number property`);
  }
  if ((control.kind === 'select' || control.kind === 'segmented')
      && (properties.length !== 1 || properties[0].type !== 'enum')) {
    errors.push(`${label} ${control.kind} controls require exactly one enum property`);
  }
  if (control.kind === 'toggle'
      && (properties.length !== 1 || !['boolean', 'slot'].includes(properties[0].type))) {
    errors.push(`${label} toggle controls require exactly one boolean or slot property`);
  }
  if (control.kind === 'icon'
      && (properties.length !== 1 || properties[0].type !== 'slot')) {
    errors.push(`${label} icon controls require exactly one slot property`);
  }
  if (control.kind === 'slot-composition'
      && (properties.length === 0 || !properties.some((property) => property.type === 'slot')
        || properties.some((property) => !['slot', 'boolean'].includes(property.type)))) {
    errors.push(`${label} slot-composition controls require slot properties and may compose boolean properties`);
  }
  if (control.kind === 'state') {
    if (control.source !== 'states') errors.push(`${label} state controls must use source "states"`);
    if (properties.length === 0 || properties.some((property) => property.type !== 'boolean')) {
      errors.push(`${label} state controls may bind only boolean semantic properties`);
    }
  } else if ('source' in control) {
    errors.push(`${label}.source is supported only by state controls`);
  }

  if (control.kind === 'state') {
    validateOptionLabels(errors, control, (contract.states ?? []).map((state) => state.name), label);
  } else if (properties.length === 1 && properties[0].type === 'enum') {
    validateOptionLabels(errors, control, optionValues(contract, properties[0]), label);
  } else if ('optionLabels' in control) {
    errors.push(`${label}.optionLabels requires an enum or state control`);
  }

  return control.properties.filter((name) => propertiesByName[name]);
}

function validateStudioDefinition(filePath, iconCatalogues) {
  const definition = readJson(filePath);
  const label = path.relative(rootDir, filePath);
  const errors = [];

  assertKnownKeys(
    errors,
    definition,
    label,
    new Set(['$schema', 'studioVersion', 'slug', 'designReference', 'groups'])
  );

  if (definition.$schema !== './studio.schema.json') errors.push(`${label}.$schema must be "./studio.schema.json"`);
  if (!/^\d+\.\d+\.\d+$/.test(String(definition.studioVersion ?? ''))) {
    errors.push(`${label}.studioVersion must be semantic version text`);
  }
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(definition.slug ?? ''))) {
    errors.push(`${label}.slug must be a kebab-case slug`);
  }

  const expectedSlug = path.basename(filePath, '.studio.json');
  if (definition.slug !== expectedSlug) errors.push(`${label}.slug must match filename ${expectedSlug}`);

  const contractPath = path.join(contractsDir, `${definition.slug}.contract.json`);
  if (!fs.existsSync(contractPath)) {
    errors.push(`${label} has no component contract for ${definition.slug}`);
    return { errors, propertyCount: 0, tokenCount: 0 };
  }

  const contract = readJson(contractPath);
  const propertiesByName = Object.fromEntries((contract.properties ?? []).map((property) => [property.name, property]));

  if (definition.designReference !== undefined) {
    assertKnownKeys(
      errors,
      definition.designReference,
      `${label}.designReference`,
      new Set(['fileKey', 'frameNodeId', 'inspectorNodeId'])
    );
    const reference = definition.designReference;
    if (!isObject(reference) || !hasString(reference.fileKey)) {
      errors.push(`${label}.designReference must define fileKey, frameNodeId, and inspectorNodeId`);
    } else {
      for (const key of ['frameNodeId', 'inspectorNodeId']) {
        if (!/^\d+:\d+$/.test(String(reference[key] ?? ''))) {
          errors.push(`${label}.designReference.${key} must be a Figma node id`);
        }
      }
    }
  }

  if (!Array.isArray(definition.groups) || definition.groups.length === 0) {
    errors.push(`${label}.groups must be a non-empty array`);
    return { errors, propertyCount: 0, tokenCount: 0 };
  }

  const groupIds = definition.groups.map((group) => group?.id);
  if (!uniqueStrings(groupIds)) errors.push(`${label}.groups ids must be unique non-empty strings`);

  const controlIds = [];
  const propertyReferences = [];
  const tokenReferences = [];

  for (const [groupIndex, group] of definition.groups.entries()) {
    const groupLabel = `${label}.groups[${groupIndex}]`;
    assertKnownKeys(errors, group, groupLabel, new Set(['id', 'label', 'controls']));
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(group?.id ?? ''))) {
      errors.push(`${groupLabel}.id must be a kebab-case slug`);
    }
    if (!hasString(group?.label)) errors.push(`${groupLabel}.label must be a non-empty string`);
    if (!Array.isArray(group?.controls) || group.controls.length === 0) {
      errors.push(`${groupLabel}.controls must be a non-empty array`);
      continue;
    }

    for (const [controlIndex, control] of group.controls.entries()) {
      const controlLabel = `${groupLabel}.controls[${controlIndex}]`;
      assertKnownKeys(
        errors,
        control,
        controlLabel,
        new Set([
          'id',
          'label',
          'kind',
          'properties',
          'source',
          'optionLabels',
          'iconCatalogue',
          'visibleWhen',
          'tokens',
        ])
      );

      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(control?.id ?? ''))) {
        errors.push(`${controlLabel}.id must be a kebab-case slug`);
      }
      if (!hasString(control?.label)) errors.push(`${controlLabel}.label must be a non-empty string`);
      if (!allKinds.has(control?.kind)) errors.push(`${controlLabel}.kind is not supported`);
      controlIds.push(control?.id);

      const hasProperties = 'properties' in control;
      const hasTokens = 'tokens' in control;
      const isUnboundState = control.kind === 'state' && !hasProperties && !hasTokens;
      if (isUnboundState) {
        if (control.source !== 'states') {
          errors.push(`${controlLabel} state controls must use source "states"`);
        }
        validateOptionLabels(
          errors,
          control,
          (contract.states ?? []).map((state) => state.name),
          controlLabel
        );
      } else if (hasProperties === hasTokens) {
        errors.push(`${controlLabel} must define exactly one of properties or tokens`);
      } else if (hasProperties) {
        if (!propertyKinds.has(control.kind)) errors.push(`${controlLabel}.${control.kind} cannot bind semantic properties`);
        propertyReferences.push(...validatePropertyControl(errors, control, contract, propertiesByName, controlLabel));
      } else {
        if (!tokenKinds.has(control.kind)) errors.push(`${controlLabel}.${control.kind} cannot bind public tokens`);
        if ('source' in control) errors.push(`${controlLabel}.source is supported only by state controls`);
        if ('optionLabels' in control) errors.push(`${controlLabel}.optionLabels requires an enum or state control`);

        const resolvedTokens = resolveTokens(errors, control, contract, controlLabel);
        if (control.kind === 'token' && resolvedTokens.length !== 1) {
          errors.push(`${controlLabel} token controls must resolve exactly one public token`);
        }
        if (control.kind === 'token-pair' && resolvedTokens.length !== 2) {
          errors.push(`${controlLabel} token-pair controls must resolve exactly two public tokens`);
        }
        tokenReferences.push(...resolvedTokens);
      }

      validateVisibility(errors, control, contract, propertiesByName, controlLabel);
      validateIconCatalogueSource(errors, control, iconCatalogues, controlLabel);
    }
  }

  if (new Set(controlIds).size !== controlIds.length) errors.push(`${label} control ids must be globally unique`);

  const duplicateProperties = [...new Set(propertyReferences.filter(
    (name, index) => propertyReferences.indexOf(name) !== index
  ))];
  if (duplicateProperties.length > 0) {
    errors.push(`${label} references semantic properties more than once: ${duplicateProperties.join(', ')}`);
  }

  const missingProperties = Object.keys(propertiesByName).filter((name) => !propertyReferences.includes(name));
  if (missingProperties.length > 0) {
    errors.push(`${label} omits contract semantic properties: ${missingProperties.join(', ')}`);
  }

  const duplicateTokens = [...new Set(tokenReferences.filter(
    (name, index) => tokenReferences.indexOf(name) !== index
  ))];
  if (duplicateTokens.length > 0) {
    errors.push(`${label} exposes public tokens more than once: ${duplicateTokens.join(', ')}`);
  }

  return {
    errors,
    propertyCount: new Set(propertyReferences).size,
    tokenCount: new Set(tokenReferences).size,
  };
}

if (!fs.existsSync(schemaPath)) {
  console.error('Missing site/src/content/studio/studio.schema.json');
  process.exit(1);
}

const studioFiles = fs.readdirSync(studioDir)
  .filter((fileName) => fileName.endsWith('.studio.json'))
  .map((fileName) => path.join(studioDir, fileName))
  .sort();

const totals = { properties: 0, tokens: 0 };
const iconCatalogueResult = validateIconCatalogues();
const errors = [...iconCatalogueResult.errors];

for (const filePath of studioFiles) {
  try {
    const result = validateStudioDefinition(filePath, iconCatalogueResult.catalogues);
    errors.push(...result.errors);
    totals.properties += result.propertyCount;
    totals.tokens += result.tokenCount;
  } catch (error) {
    errors.push(`${path.relative(rootDir, filePath)} could not be parsed: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error(`Studio metadata validation failed with ${errors.length} error(s):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(
  `Validated ${studioFiles.length} Studio definition(s): ${totals.properties} semantic properties, ${totals.tokens} public token references, and ${iconCatalogueResult.iconCount} icon choices.`
);
