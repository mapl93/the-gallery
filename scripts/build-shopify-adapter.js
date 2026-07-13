import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(repoRoot, 'registry.json');
const contractsDir = path.join(repoRoot, 'components', 'contracts');
const cssDir = path.join(repoRoot, 'components', 'css');
const jsSourcePath = path.join(repoRoot, 'components', 'js', 'theme.js');
const shopifyDir = path.join(repoRoot, 'platforms', 'shopify');
const assetsDir = path.join(shopifyDir, 'assets');

const outputPaths = {
  tokens: path.join(assetsDir, 'tokens.css'),
  base: path.join(assetsDir, 'base.css'),
  javascript: path.join(assetsDir, 'theme.js'),
  manifest: path.join(shopifyDir, 'adapter.manifest.json'),
  summary: path.join(shopifyDir, 'adapter.summary.json')
};

const baseCssSources = ['reset.css', 'foundations.css', 'utilities.css'];

const componentCssAssets = [
  { source: 'primitives.css', output: 'primitives.css' },
  { source: 'layout.css', output: 'layout-primitives.css' },
  { source: 'forms.css', output: 'forms.css' },
  { source: 'global.css', output: 'global.css' },
  { source: 'product.css', output: 'product.css' },
  { source: 'collection.css', output: 'collection.css' },
  { source: 'storytelling.css', output: 'storytelling.css' },
  { source: 'marketing.css', output: 'marketing.css' },
  { source: 'cart.css', output: 'cart.css' },
  { source: 'account.css', output: 'account.css' },
  { source: 'blog.css', output: 'blog.css' },
  { source: 'sections.css', output: 'sections.css' },
  { source: 'ceramics.css', output: 'ceramics.css' },
  { source: 'coming-soon.css', output: 'coming-soon.css' },
  { source: 'reviews.css', output: 'reviews.css' },
  { source: 'pages.css', output: 'pages.css' }
];

const themeLayoutCss = [
  'tokens.css',
  'base.css',
  'primitives.css',
  'layout-primitives.css',
  'forms.css',
  'global.css',
  'product.css',
  'collection.css',
  'storytelling.css',
  'marketing.css',
  'cart.css',
  'account.css',
  'blog.css',
  'sections.css',
  'ceramics.css',
  'coming-soon.css',
  'reviews.css',
  'pages.css'
];

const passwordLayoutCss = [
  'tokens.css',
  'base.css',
  'primitives.css',
  'forms.css',
  'coming-soon.css'
];

const embeddedClassCategories = new Set(['primitives', 'layout', 'forms']);
const maturityModel = 'shopify-maturity-v1';
const liquidSourceDirs = ['layout', 'sections', 'blocks', 'snippets', 'templates'];
const templateCompositionKinds = new Set(['layout', 'template']);

const shopifyDataObjects = [
  'article',
  'blog',
  'cart',
  'collection',
  'customer',
  'linklists',
  'localization',
  'page',
  'product',
  'recommendations',
  'request',
  'routes',
  'search',
  'shop',
  'template'
];

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

function write(filePath, content) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content);
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function contractFiles() {
  return fs.readdirSync(contractsDir).filter((fileName) => fileName.endsWith('.contract.json')).sort();
}

function readContracts() {
  const contracts = new Map();

  for (const fileName of contractFiles()) {
    const contract = readJson(path.join(contractsDir, fileName));
    contracts.set(contract.slug, contract);
  }

  return contracts;
}

function walkFiles(dir, predicate) {
  const results = [];

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const filePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      results.push(...walkFiles(filePath, predicate));
    } else if (predicate(filePath)) {
      results.push(filePath);
    }
  }

  return results.sort();
}

function liquidFiles() {
  return liquidSourceDirs.flatMap((dirName) => {
    const dirPath = path.join(shopifyDir, dirName);

    if (!fs.existsSync(dirPath)) {
      return [];
    }

    return walkFiles(dirPath, (filePath) => filePath.endsWith('.liquid'));
  }).sort();
}

function templateJsonFiles() {
  const templatesDir = path.join(shopifyDir, 'templates');

  if (!fs.existsSync(templatesDir)) {
    return [];
  }

  return walkFiles(templatesDir, (filePath) => filePath.endsWith('.json'));
}

function liquidKindForPath(filePath) {
  const relativePath = relative(filePath);
  const [, folder] = relativePath.match(/^platforms\/shopify\/([^/]+)\//) ?? [];

  if (folder === 'layout') return 'layout';
  if (folder === 'sections') return 'section';
  if (folder === 'blocks') return 'block';
  if (folder === 'snippets') return 'snippet';
  if (folder === 'templates') return 'template';
  return 'unknown';
}

function sourceNameForPath(filePath) {
  return path.basename(filePath, path.extname(filePath));
}

function classSetForLiquid(liquid) {
  const classes = new Set();

  for (const match of liquid.matchAll(/class\s*=\s*(?:"([^"]*)"|'([^']*)')/g)) {
    const raw = match[1] ?? match[2] ?? '';

    for (const token of raw.split(/\s+/)) {
      const normalized = token.replace(/[{}%]/g, '').trim();

      if (/^[a-zA-Z][a-zA-Z0-9_-]*$/.test(normalized)) {
        classes.add(normalized);
      }
    }
  }

  return classes;
}

function stripLiquidComments(liquid) {
  return liquid.replace(/{%-?\s*comment\s*-?%}[\s\S]*?{%-?\s*endcomment\s*-?%}/g, '');
}

function uniqueSorted(values) {
  return [...new Set(values.filter(Boolean))].sort();
}

function collectMatches(source, pattern, groupIndex = 1) {
  return uniqueSorted([...source.matchAll(pattern)].map((match) => match[groupIndex]));
}

function flattenSettings(settings = []) {
  return settings
    .filter((setting) => setting && typeof setting === 'object' && typeof setting.id === 'string')
    .map((setting) => setting.id);
}

function summarizeSchemaObject(schemaObject) {
  const settings = Array.isArray(schemaObject.settings) ? schemaObject.settings : [];
  const blocks = Array.isArray(schemaObject.blocks) ? schemaObject.blocks : [];
  const presets = Array.isArray(schemaObject.presets) ? schemaObject.presets : [];
  const blockSettingEntries = blocks.flatMap((block) => {
    if (!block || typeof block !== 'object') {
      return [];
    }

    return flattenSettings(block.settings).map((settingId) => `${block.type ?? 'block'}.${settingId}`);
  });

  return {
    name: typeof schemaObject.name === 'string' ? schemaObject.name : null,
    settingIds: uniqueSorted(flattenSettings(settings)),
    blockTypes: uniqueSorted(blocks.map((block) => block?.type)),
    blockSettingIds: uniqueSorted(blockSettingEntries),
    hasPresets: presets.length > 0,
    presetNames: uniqueSorted(presets.map((preset) => preset?.name))
  };
}

function schemaForLiquid(liquid, kind) {
  const schemaRequired = kind === 'section' || kind === 'block';
  const matches = [...liquid.matchAll(/{%-?\s*schema\s*-?%}([\s\S]*?){%-?\s*endschema\s*-?%}/g)];

  if (!schemaRequired) {
    return {
      required: false,
      count: matches.length,
      status: 'not-required',
      settingIds: [],
      blockTypes: [],
      blockSettingIds: [],
      hasPresets: false,
      presetNames: [],
      errors: []
    };
  }

  if (matches.length === 0) {
    return {
      required: true,
      count: 0,
      status: 'missing',
      settingIds: [],
      blockTypes: [],
      blockSettingIds: [],
      hasPresets: false,
      presetNames: [],
      errors: ['Missing {% schema %} block.']
    };
  }

  const rawSchema = matches[0][1].trim();

  try {
    const parsed = JSON.parse(rawSchema);
    const summary = summarizeSchemaObject(parsed);

    return {
      required: true,
      count: matches.length,
      status: matches.length === 1 ? 'ready' : 'duplicate',
      ...summary,
      errors: matches.length === 1 ? [] : ['Multiple {% schema %} blocks were found.']
    };
  } catch (error) {
    return {
      required: true,
      count: matches.length,
      status: 'invalid',
      settingIds: [],
      blockTypes: [],
      blockSettingIds: [],
      hasPresets: false,
      presetNames: [],
      errors: [error instanceof Error ? error.message : String(error)]
    };
  }
}

function settingsReferencesForLiquid(liquid) {
  const source = stripLiquidComments(liquid);
  const section = collectMatches(source, /\bsection\.settings\.([a-zA-Z0-9_]+)/g);
  const block = collectMatches(source, /\bblock\.settings\.([a-zA-Z0-9_]+)/g);
  const global = [];

  for (const match of source.matchAll(/\bsettings\.([a-zA-Z0-9_]+)/g)) {
    if (source[match.index - 1] !== '.') {
      global.push(match[1]);
    }
  }

  return {
    section,
    block,
    global: uniqueSorted(global)
  };
}

function dataReferencesForLiquid(liquid) {
  const source = stripLiquidComments(liquid);

  return shopifyDataObjects.filter((objectName) => {
    const pattern = new RegExp(`\\b${objectName}\\b\\s*(?=\\.|\\[|\\|)`, 'g');
    return pattern.test(source);
  });
}

function renderCallsForLiquid(liquid) {
  const source = stripLiquidComments(liquid);

  return [...source.matchAll(/{%-?\s*render\s+['"]([^'"]+)['"]([\s\S]*?)-?%}/g)].map((match) => {
    const parameterNames = collectMatches(match[2] ?? '', /\b([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g);

    return {
      name: match[1],
      parameters: parameterNames
    };
  });
}

function sectionCallsForLiquid(liquid) {
  return collectMatches(stripLiquidComments(liquid), /{%-?\s*section\s+['"]([^'"]+)['"]\s*-?%}/g);
}

function designModeForLiquid(liquid) {
  return /\brequest\.design_mode\b|\bShopify\.designMode\b/.test(stripLiquidComments(liquid));
}

function addToMapSet(map, key, value) {
  if (!map.has(key)) {
    map.set(key, new Set());
  }

  map.get(key).add(value);
}

function objectFromSetMap(map) {
  return Object.fromEntries([...map.entries()].map(([key, value]) => [key, [...value].sort()]).sort(([a], [b]) => a.localeCompare(b)));
}

function buildTemplateInventory() {
  const templates = [];
  const sectionTypesByTemplate = {};
  const sectionTypeReferences = new Map();

  for (const filePath of templateJsonFiles()) {
    const templatePath = relative(filePath);

    try {
      const template = readJson(filePath);
      const sectionTypes = uniqueSorted(Object.values(template.sections ?? {}).map((section) => section?.type));
      sectionTypesByTemplate[templatePath] = sectionTypes;

      for (const sectionType of sectionTypes) {
        addToMapSet(sectionTypeReferences, sectionType, templatePath);
      }

      templates.push({
        path: templatePath,
        status: 'ready',
        sectionTypes,
        errors: []
      });
    } catch (error) {
      templates.push({
        path: templatePath,
        status: 'invalid',
        sectionTypes: [],
        errors: [error instanceof Error ? error.message : String(error)]
      });
    }
  }

  return {
    files: templates,
    sectionTypesByTemplate,
    sectionTypeReferences: objectFromSetMap(sectionTypeReferences)
  };
}

function buildCompositionInventory(liquidInventory, templateInventory) {
  const layoutSectionReferences = new Map();

  for (const file of liquidInventory) {
    if (!templateCompositionKinds.has(file.kind)) {
      continue;
    }

    for (const sectionName of file.sectionCalls) {
      addToMapSet(layoutSectionReferences, sectionName, file.path);
    }
  }

  return {
    templates: templateInventory.sectionTypeReferences,
    layoutSections: objectFromSetMap(layoutSectionReferences)
  };
}

function renderApiInventory(liquidInventory) {
  const renderApis = new Map();

  for (const file of liquidInventory) {
    for (const renderCall of file.renderCalls) {
      if (!renderApis.has(renderCall.name)) {
        renderApis.set(renderCall.name, new Set());
      }

      for (const parameter of renderCall.parameters) {
        renderApis.get(renderCall.name).add(parameter);
      }
    }
  }

  return objectFromSetMap(renderApis);
}

function selectorClass(selector) {
  return String(selector ?? '').match(/\.([a-zA-Z][a-zA-Z0-9_-]*)/)?.[1] ?? null;
}

function flattenPublicTokens(contract) {
  return [...new Set(Object.values(contract.tokens?.public ?? {}).flat())].sort();
}

function cssOutputExists(cssOutput) {
  return typeof cssOutput === 'string' && fs.existsSync(path.join(repoRoot, cssOutput));
}

function usesEmbeddedClassStrategy(component, shopifyAdapter) {
  return shopifyAdapter.kind === 'liquid-css-class' || embeddedClassCategories.has(component.category);
}

function strategyForKind(kind) {
  if (kind === 'section') return 'section-adapter';
  if (kind === 'block') return 'theme-block-adapter';
  if (kind === 'snippet') return 'snippet-adapter';
  if (kind === 'template') return 'template-adapter';
  if (kind === 'layout') return 'layout-adapter';
  return null;
}

function inferShopifyStrategy(registryComponent, contract, shopifyAdapter, liquidHits) {
  if (usesEmbeddedClassStrategy(registryComponent, shopifyAdapter)) {
    return 'embedded-class-contract';
  }

  const exactHit = liquidHits.find((file) => file.name === contract.slug);

  if (exactHit) {
    return strategyForKind(exactHit.kind) ?? 'dedicated-liquid-template';
  }

  const kinds = new Set(liquidHits.map((file) => file.kind));

  if (kinds.has('section')) return strategyForKind('section');
  if (kinds.has('block')) return strategyForKind('block');
  if (kinds.has('snippet')) return strategyForKind('snippet');
  if (kinds.has('template')) return strategyForKind('template');
  if (kinds.has('layout')) return strategyForKind('layout');

  return 'dedicated-liquid-template';
}

function schemaEntriesForStrategy(strategy, liquidHits) {
  if (strategy === 'section-adapter') {
    return liquidHits.filter((file) => file.kind === 'section');
  }

  if (strategy === 'theme-block-adapter') {
    return liquidHits.filter((file) => file.kind === 'block');
  }

  return [];
}

function unionSettingReferences(liquidHits) {
  return {
    section: uniqueSorted(liquidHits.flatMap((file) => file.settingsReferences.section)),
    block: uniqueSorted(liquidHits.flatMap((file) => file.settingsReferences.block)),
    global: uniqueSorted(liquidHits.flatMap((file) => file.settingsReferences.global))
  };
}

function buildSchemaLayer(strategy, liquidHits) {
  const required = strategy === 'section-adapter' || strategy === 'theme-block-adapter';
  const entries = schemaEntriesForStrategy(strategy, liquidHits);
  const files = entries.map((file) => ({
    path: file.path,
    kind: file.kind,
    name: file.name,
    status: file.schema.status,
    count: file.schema.count,
    settingIds: file.schema.settingIds,
    blockTypes: file.schema.blockTypes,
    blockSettingIds: file.schema.blockSettingIds,
    hasPresets: file.schema.hasPresets,
    presetNames: file.schema.presetNames,
    errors: file.schema.errors
  }));

  if (!required) {
    return {
      required: false,
      status: 'not-required',
      files,
      settingIds: [],
      blockTypes: [],
      blockSettingIds: [],
      hasPresets: false,
      presetNames: [],
      deadSettings: [],
      undeclaredSettings: [],
      errors: []
    };
  }

  const settingIds = uniqueSorted(entries.flatMap((file) => file.schema.settingIds));
  const blockSettingIds = uniqueSorted(entries.flatMap((file) => file.schema.blockSettingIds));
  const sectionReferences = uniqueSorted(entries.flatMap((file) => file.settingsReferences.section));
  const blockReferences = uniqueSorted(entries.flatMap((file) => file.settingsReferences.block.map((settingId) => settingId)));
  const deadSettings = settingIds.filter((settingId) => !sectionReferences.includes(settingId));
  const deadBlockSettings = blockSettingIds.filter((settingId) => {
    const [, blockSettingId] = settingId.split('.');
    return !blockReferences.includes(blockSettingId);
  });
  const undeclaredSettings = sectionReferences.filter((settingId) => !settingIds.includes(settingId));
  const invalidEntries = entries.filter((file) => file.schema.status === 'invalid' || file.schema.status === 'duplicate');
  const missingEntries = entries.filter((file) => file.schema.status === 'missing');
  const status = entries.length === 0
    ? 'missing'
    : invalidEntries.length > 0
      ? 'invalid'
      : missingEntries.length > 0
        ? 'missing'
        : 'ready';

  return {
    required,
    status,
    files,
    settingIds,
    blockTypes: uniqueSorted(entries.flatMap((file) => file.schema.blockTypes)),
    blockSettingIds,
    hasPresets: entries.some((file) => file.schema.hasPresets),
    presetNames: uniqueSorted(entries.flatMap((file) => file.schema.presetNames)),
    deadSettings: uniqueSorted([...deadSettings, ...deadBlockSettings]),
    undeclaredSettings,
    errors: files.flatMap((file) => file.errors)
  };
}

function buildDataLayer(strategy, liquidHits, renderApis) {
  const required = strategy !== 'embedded-class-contract';
  const settingRefs = unionSettingReferences(liquidHits);
  const renderCalls = uniqueSorted(liquidHits.flatMap((file) => file.renderCalls.map((renderCall) => renderCall.name)));
  const sectionCalls = uniqueSorted(liquidHits.flatMap((file) => file.sectionCalls));
  const dataObjects = uniqueSorted(liquidHits.flatMap((file) => file.dataReferences));
  const renderParameters = uniqueSorted(liquidHits.flatMap((file) => renderApis[file.name] ?? []));
  const schemaSettingIds = uniqueSorted(liquidHits.flatMap((file) => file.schema.settingIds));
  const hasMappingEvidence = dataObjects.length > 0
    || settingRefs.section.length > 0
    || settingRefs.block.length > 0
    || settingRefs.global.length > 0
    || renderCalls.length > 0
    || sectionCalls.length > 0
    || renderParameters.length > 0
    || schemaSettingIds.length > 0;

  if (!required) {
    return {
      required: false,
      status: 'not-required',
      dataObjects,
      settingRefs,
      renderCalls,
      sectionCalls,
      renderParameters
    };
  }

  return {
    required,
    status: liquidHits.length === 0 ? 'missing' : hasMappingEvidence ? 'ready' : 'needs-target-work',
    dataObjects,
    settingRefs,
    renderCalls,
    sectionCalls,
    renderParameters
  };
}

function buildTemplateCompositionLayer(strategy, liquidHits, compositionInventory) {
  const required = strategy === 'section-adapter';
  const sectionHits = liquidHits.filter((file) => file.kind === 'section');
  const sections = sectionHits.map((file) => {
    const templates = compositionInventory.templates[file.name] ?? [];
    const layouts = compositionInventory.layoutSections[file.name] ?? [];
    const addableByPreset = file.schema.hasPresets;

    return {
      name: file.name,
      file: file.path,
      templates,
      layouts,
      addableByPreset,
      ready: templates.length > 0 || layouts.length > 0 || addableByPreset
    };
  });

  if (!required) {
    return {
      required: false,
      status: 'not-required',
      sections
    };
  }

  return {
    required,
    status: sectionHits.length === 0 ? 'missing' : sections.every((section) => section.ready) ? 'ready' : 'missing',
    sections
  };
}

function buildEditorPreviewLayer(strategy, schemaLayer, liquidHits) {
  const required = strategy === 'section-adapter' || strategy === 'theme-block-adapter';
  const entries = schemaEntriesForStrategy(strategy, liquidHits);
  const designModeAware = entries.some((file) => file.designMode);

  if (!required) {
    return {
      required: false,
      status: 'not-required',
      designModeAware,
      deadSettings: []
    };
  }

  if (entries.length === 0) {
    return {
      required,
      status: 'missing',
      designModeAware,
      deadSettings: []
    };
  }

  if (schemaLayer.status !== 'ready') {
    return {
      required,
      status: 'blocked',
      designModeAware,
      deadSettings: schemaLayer.deadSettings
    };
  }

  return {
    required,
    status: schemaLayer.deadSettings.length > 0 || schemaLayer.undeclaredSettings.length > 0 ? 'needs-target-work' : 'ready',
    designModeAware,
    deadSettings: schemaLayer.deadSettings,
    undeclaredSettings: schemaLayer.undeclaredSettings
  };
}

function layerIsReady(layer) {
  return !layer.required || layer.status === 'ready' || layer.status === 'accepted' || layer.status === 'not-required';
}

function buildMaturity({ registryComponent, contract, shopifyAdapter, liquidHits, cssOutput, compositionInventory, renderApis }) {
  const embeddedClass = usesEmbeddedClassStrategy(registryComponent, shopifyAdapter);
  const strategy = inferShopifyStrategy(registryComponent, contract, shopifyAdapter, liquidHits);
  const liquidRequired = !embeddedClass;
  const behaviorCount = contract.behavior?.length ?? 0;
  const behaviorRequired = behaviorCount > 0;
  const cssStatus = cssOutputExists(cssOutput) ? 'ready' : 'missing';
  const liquidStatus = liquidRequired
    ? liquidHits.length > 0 ? 'ready' : 'missing'
    : 'not-required';
  const schemaLayer = buildSchemaLayer(strategy, liquidHits);
  const dataLayer = buildDataLayer(strategy, liquidHits, renderApis);
  const templateCompositionLayer = buildTemplateCompositionLayer(strategy, liquidHits, compositionInventory);
  const editorPreviewLayer = buildEditorPreviewLayer(strategy, schemaLayer, liquidHits);
  const behaviorStatus = behaviorRequired
    ? shopifyAdapter.status === 'implemented' ? 'accepted' : 'needs-target-work'
    : 'not-required';
  const ready = shopifyAdapter.status === 'implemented'
    && cssStatus === 'ready'
    && liquidStatus !== 'missing'
    && layerIsReady(schemaLayer)
    && layerIsReady(dataLayer)
    && behaviorStatus !== 'needs-target-work'
    && layerIsReady(templateCompositionLayer)
    && layerIsReady(editorPreviewLayer);
  const level = ready
    ? 'implemented'
    : editorPreviewLayer.required && editorPreviewLayer.status === 'ready'
      ? 'editor-ready'
      : schemaLayer.required && schemaLayer.status === 'ready'
        ? 'schema-ready'
        : liquidRequired && liquidHits.length > 0
          ? 'template-detected'
          : cssStatus === 'ready'
            ? 'css-ready'
            : 'planned';

  return {
    model: maturityModel,
    level,
    ready,
    strategy,
    layers: {
      css: {
        required: true,
        status: cssStatus,
        source: registryComponent.file,
        output: cssOutput
      },
      liquid: {
        required: liquidRequired,
        status: liquidStatus,
        files: liquidHits.map((file) => file.path)
      },
      schema: schemaLayer,
      data: dataLayer,
      behavior: {
        required: behaviorRequired,
        status: behaviorStatus,
        contractItems: behaviorCount,
        owner: behaviorRequired ? 'shopify-adapter' : 'none'
      },
      templateComposition: templateCompositionLayer,
      editorPreview: editorPreviewLayer
    }
  };
}

function buildBaseCss() {
  const sections = [
    '/* ============================================================',
    '   The Gallery - Shopify Base Layer',
    '   Generated by scripts/build-shopify-adapter.js from components/css/.',
    '   Do not edit this file directly; change components/css/ instead.',
    '   Token values come from assets/tokens.css.',
    '   ============================================================ */',
    ''
  ];

  for (const source of baseCssSources) {
    const sourcePath = path.join(cssDir, source);
    assert(fs.existsSync(sourcePath), `${relative(sourcePath)} does not exist`);
    sections.push(`/* Source: components/css/${source} */`, read(sourcePath).trimEnd(), '');
  }

  write(outputPaths.base, `${sections.join('\n').trimEnd()}\n`);
}

function copyComponentCssAssets() {
  for (const asset of componentCssAssets) {
    const sourcePath = path.join(cssDir, asset.source);
    const destinationPath = path.join(assetsDir, asset.output);

    assert(fs.existsSync(sourcePath), `${relative(sourcePath)} does not exist`);
    write(destinationPath, read(sourcePath));
  }
}

function copyThemeJs() {
  assert(fs.existsSync(jsSourcePath), `${relative(jsSourcePath)} does not exist`);
  write(outputPaths.javascript, read(jsSourcePath));
}

function buildLiquidInventory() {
  return liquidFiles().map((filePath) => {
    const liquid = read(filePath);
    const kind = liquidKindForPath(filePath);

    return {
      path: relative(filePath),
      kind,
      name: sourceNameForPath(filePath),
      classes: [...classSetForLiquid(liquid)].sort(),
      schema: schemaForLiquid(liquid, kind),
      settingsReferences: settingsReferencesForLiquid(liquid),
      dataReferences: dataReferencesForLiquid(liquid),
      renderCalls: renderCallsForLiquid(liquid),
      sectionCalls: sectionCallsForLiquid(liquid),
      designMode: designModeForLiquid(liquid)
    };
  });
}

function liquidHitsForClass(liquidInventory, className) {
  if (!className) {
    return [];
  }

  return liquidInventory
    .filter((file) => file.classes.includes(className));
}

function cssOutputForSource(sourceFile) {
  if (baseCssSources.map((fileName) => `components/css/${fileName}`).includes(sourceFile)) {
    return relative(outputPaths.base);
  }

  const asset = componentCssAssets.find((item) => `components/css/${item.source}` === sourceFile);
  return asset ? `platforms/shopify/assets/${asset.output}` : null;
}

function buildManifest(registry, contracts) {
  const liquidInventory = buildLiquidInventory();
  const templateInventory = buildTemplateInventory();
  const compositionInventory = buildCompositionInventory(liquidInventory, templateInventory);
  const renderApis = renderApiInventory(liquidInventory);
  const components = [];
  let contractImplemented = 0;
  let contractPlanned = 0;
  let liquidMatched = 0;
  let plannedWithLiquid = 0;
  let implementedMissingRequiredLiquid = 0;
  let cssReady = 0;
  let classLevelComponents = 0;
  let dedicatedTemplateComponents = 0;
  let dedicatedLiquidReady = 0;
  let dedicatedLiquidMissing = 0;
  let behaviorRequired = 0;
  let behaviorAccepted = 0;
  let targetReady = 0;
  let sectionAdapters = 0;
  let snippetAdapters = 0;
  let themeBlockAdapters = 0;
  let schemaRequired = 0;
  let schemaReady = 0;
  let schemaMissing = 0;
  let schemaInvalid = 0;
  let dataRequired = 0;
  let dataReady = 0;
  let dataMissing = 0;
  let templateCompositionRequired = 0;
  let templateCompositionReady = 0;
  let editorPreviewRequired = 0;
  let editorPreviewReady = 0;

  for (const [slug, registryComponent] of Object.entries(registry.components)) {
    const contract = contracts.get(slug);
    assert(contract, `${slug} is missing a component contract`);

    const className = selectorClass(registryComponent.selector);
    const liquidHits = liquidHitsForClass(liquidInventory, className);
    const shopifyAdapter = contract.adapters?.shopify ?? { status: 'planned', kind: 'liquid-css' };
    const cssOutput = cssOutputForSource(registryComponent.file);
    const maturity = buildMaturity({ registryComponent, contract, shopifyAdapter, liquidHits, cssOutput, compositionInventory, renderApis });

    if (shopifyAdapter.status === 'implemented') {
      contractImplemented += 1;
    } else if (shopifyAdapter.status === 'planned') {
      contractPlanned += 1;
    }

    if (liquidHits.length > 0) {
      liquidMatched += 1;
    }

    if (maturity.layers.css.status === 'ready') {
      cssReady += 1;
    }

    if (maturity.strategy === 'embedded-class-contract') {
      classLevelComponents += 1;
    } else {
      dedicatedTemplateComponents += 1;
    }

    if (maturity.strategy === 'section-adapter') {
      sectionAdapters += 1;
    }

    if (maturity.strategy === 'snippet-adapter') {
      snippetAdapters += 1;
    }

    if (maturity.strategy === 'theme-block-adapter') {
      themeBlockAdapters += 1;
    }

    if (maturity.layers.liquid.required && maturity.layers.liquid.status === 'ready') {
      dedicatedLiquidReady += 1;
    }

    if (maturity.layers.liquid.required && maturity.layers.liquid.status === 'missing') {
      dedicatedLiquidMissing += 1;
    }

    if (maturity.layers.behavior.required) {
      behaviorRequired += 1;
    }

    if (maturity.layers.behavior.status === 'accepted') {
      behaviorAccepted += 1;
    }

    if (maturity.layers.schema.required) {
      schemaRequired += 1;
      if (maturity.layers.schema.status === 'ready') schemaReady += 1;
      if (maturity.layers.schema.status === 'missing') schemaMissing += 1;
      if (maturity.layers.schema.status === 'invalid') schemaInvalid += 1;
    }

    if (maturity.layers.data.required) {
      dataRequired += 1;
      if (maturity.layers.data.status === 'ready') dataReady += 1;
      if (maturity.layers.data.status === 'missing') dataMissing += 1;
    }

    if (maturity.layers.templateComposition.required) {
      templateCompositionRequired += 1;
      if (maturity.layers.templateComposition.status === 'ready') templateCompositionReady += 1;
    }

    if (maturity.layers.editorPreview.required) {
      editorPreviewRequired += 1;
      if (maturity.layers.editorPreview.status === 'ready') editorPreviewReady += 1;
    }

    if (maturity.ready) {
      targetReady += 1;
    }

    if (shopifyAdapter.status === 'planned' && maturity.layers.liquid.required && liquidHits.length > 0) {
      plannedWithLiquid += 1;
    }

    if (shopifyAdapter.status === 'implemented' && maturity.layers.liquid.required && liquidHits.length === 0) {
      implementedMissingRequiredLiquid += 1;
    }

    components.push({
      slug,
      name: contract.name,
      registryId: contract.registryId,
      category: contract.category,
      selector: registryComponent.selector,
      selectorClass: className,
      source: {
        contract: `components/contracts/${slug}.contract.json`,
        css: registryComponent.file,
        cssOutput,
        docs: contract.source.docs
      },
      dependencies: registryComponent.dependencies ?? [],
      publicTokens: flattenPublicTokens(contract),
      contractAdapter: shopifyAdapter,
      maturity,
      liquid: {
        status: liquidHits.length > 0 ? 'present' : 'not-detected',
        files: liquidHits.map((file) => file.path),
        entries: liquidHits.map((file) => ({
          path: file.path,
          kind: file.kind,
          name: file.name,
          schema: file.schema,
          settingsReferences: file.settingsReferences,
          dataReferences: file.dataReferences,
          renderCalls: file.renderCalls,
          sectionCalls: file.sectionCalls,
          designMode: file.designMode
        }))
      }
    });
  }

  const outputs = {
    tokens: relative(outputPaths.tokens),
    base: relative(outputPaths.base),
    javascript: relative(outputPaths.javascript),
    manifest: relative(outputPaths.manifest),
    summary: relative(outputPaths.summary),
    cssAssets: componentCssAssets.map((asset) => `platforms/shopify/assets/${asset.output}`)
  };

  const cssAssets = [
    ...baseCssSources.map((source) => ({
      source: `components/css/${source}`,
      output: relative(outputPaths.base),
      role: 'base'
    })),
    ...componentCssAssets.map((asset) => ({
      source: `components/css/${asset.source}`,
      output: `platforms/shopify/assets/${asset.output}`,
      role: asset.source.replace(/\.css$/, '')
    }))
  ];

  const stats = {
    components: components.length,
    contractImplemented,
    contractPlanned,
    targetReady,
    cssReady,
    classLevelComponents,
    dedicatedTemplateComponents,
    dedicatedLiquidReady,
    dedicatedLiquidMissing,
    sectionAdapters,
    snippetAdapters,
    themeBlockAdapters,
    schemaRequired,
    schemaReady,
    schemaMissing,
    schemaInvalid,
    dataRequired,
    dataReady,
    dataMissing,
    templateCompositionRequired,
    templateCompositionReady,
    editorPreviewRequired,
    editorPreviewReady,
    behaviorRequired,
    behaviorAccepted,
    liquidMatched,
    plannedWithLiquid,
    implementedMissingRequiredLiquid,
    cssAssets: componentCssAssets.length + 1,
    liquidFiles: liquidInventory.length,
    templateJsonFiles: templateInventory.files.length
  };

  const categoryCoverage = Object.entries(
    components.reduce((acc, component) => {
      const current = acc[component.category] ?? {
        total: 0,
        cssReady: 0,
        liquidMatched: 0,
        dedicatedLiquidReady: 0,
        schemaReady: 0,
        dataReady: 0,
        templateCompositionReady: 0,
        editorPreviewReady: 0,
        contractImplemented: 0,
        targetReady: 0
      };
      current.total += 1;
      if (component.maturity.layers.css.status === 'ready') current.cssReady += 1;
      if (component.liquid.status === 'present') current.liquidMatched += 1;
      if (component.maturity.layers.liquid.required && component.maturity.layers.liquid.status === 'ready') current.dedicatedLiquidReady += 1;
      if (component.maturity.layers.schema.required && component.maturity.layers.schema.status === 'ready') current.schemaReady += 1;
      if (component.maturity.layers.data.required && component.maturity.layers.data.status === 'ready') current.dataReady += 1;
      if (component.maturity.layers.templateComposition.required && component.maturity.layers.templateComposition.status === 'ready') current.templateCompositionReady += 1;
      if (component.maturity.layers.editorPreview.required && component.maturity.layers.editorPreview.status === 'ready') current.editorPreviewReady += 1;
      if (component.contractAdapter.status === 'implemented') current.contractImplemented += 1;
      if (component.maturity.ready) current.targetReady += 1;
      acc[component.category] = current;
      return acc;
    }, {})
  )
    .map(([category, value]) => ({ category, ...value }))
    .sort((a, b) => a.category.localeCompare(b.category));

  const warnings = [
    ...components
      .filter((component) => component.contractAdapter.status === 'planned' && component.maturity.layers.liquid.required && component.liquid.status === 'present')
      .map((component) => ({
        type: 'planned-contract-with-liquid-template',
        slug: component.slug,
        message: 'A dedicated Shopify adapter exists, but the contract still marks Shopify as planned.'
      })),
    ...components
      .filter((component) => component.contractAdapter.status === 'implemented' && component.maturity.layers.liquid.required && component.liquid.status === 'not-detected')
      .map((component) => ({
        type: 'implemented-contract-missing-required-liquid',
        slug: component.slug,
        message: 'The contract marks Shopify as implemented, but its dedicated Liquid template is missing.'
      })),
    ...components
      .filter((component) => component.maturity.layers.schema.required && component.maturity.layers.schema.status !== 'ready')
      .map((component) => ({
        type: 'section-schema-not-ready',
        slug: component.slug,
        message: `The Shopify ${component.maturity.strategy} needs a ready schema layer; current status is ${component.maturity.layers.schema.status}.`
      })),
    ...components
      .filter((component) => component.maturity.layers.data.required && component.liquid.status === 'present' && component.maturity.layers.data.status !== 'ready')
      .map((component) => ({
        type: 'data-mapping-not-ready',
        slug: component.slug,
        message: `The Shopify ${component.maturity.strategy} needs explicit data/settings/render mapping; current status is ${component.maturity.layers.data.status}.`
      })),
    ...components
      .filter((component) => component.maturity.layers.templateComposition.required && component.maturity.layers.templateComposition.status !== 'ready')
      .map((component) => ({
        type: 'template-composition-not-ready',
        slug: component.slug,
        message: 'The Shopify section adapter is not referenced by a JSON template, layout section call, or addable preset.'
      })),
    ...components
      .filter((component) => component.maturity.layers.editorPreview.required && component.maturity.layers.editorPreview.status !== 'ready')
      .map((component) => ({
        type: 'editor-preview-not-ready',
        slug: component.slug,
        message: `The Shopify editor-preview layer is ${component.maturity.layers.editorPreview.status}. Dead settings: ${(component.maturity.layers.editorPreview.deadSettings ?? []).join(', ') || 'none'}.`
      }))
  ];

  const manifest = {
    $schema: 'https://the-gallery.dev/schema/shopify-adapter-manifest.json',
    manifestVersion: '0.1.0',
    target: {
      id: 'shopify',
      name: 'Shopify',
      kind: 'liquid-css-js',
      status: 'active',
      description: 'Shopify theme adapter using Liquid templates, generated token wrapper, copied CSS assets, and shared progressive-enhancement JavaScript.'
    },
    generatedBy: 'scripts/build-shopify-adapter.js',
    source: {
      registry: 'registry.json',
      contracts: 'components/contracts',
      tokens: 'platforms/shopify/assets/tokens.css',
      css: 'components/css',
      javascript: 'components/js/theme.js',
      liquid: [
        'platforms/shopify/layout',
        'platforms/shopify/blocks',
        'platforms/shopify/sections',
        'platforms/shopify/snippets',
        'platforms/shopify/templates'
      ],
      templates: 'platforms/shopify/templates/*.json',
      config: 'platforms/shopify/config',
      locales: 'platforms/shopify/locales'
    },
    outputs,
    loadOrder: {
      theme: themeLayoutCss,
      password: passwordLayoutCss
    },
    policy: {
      tokenOwnership: 'tokens.css is generated from platforms/web/tokens.css and should not be edited directly.',
      baseOwnership: 'base.css is generated from reset, foundations, and utilities source CSS; it must not define token values.',
      componentCssOwnership: 'Component CSS assets are copied from components/css and should be regenerated from source.',
      liquidOwnership: 'Liquid files are Shopify adapter source and may map Shopify objects/settings into component contracts.',
      maturityOwnership: 'Shopify maturity is computed from contract status, CSS output, Liquid evidence, section/block schema, data mapping, template composition, editor-preview readiness, and behavior requirements. Class-level contracts do not require dedicated Liquid roots.',
      distribution: 'Consumer Shopify themes copy and own the generated adapter files locally.'
    },
    maturityModel: {
      id: maturityModel,
      levels: ['planned', 'css-ready', 'template-detected', 'schema-ready', 'editor-ready', 'implemented'],
      strategies: {
        'embedded-class-contract': 'Reusable CSS/anatomy contract applied inside any Liquid context; no dedicated Liquid root is required.',
        'dedicated-liquid-template': 'Shopify-specific markup is expected but has not been detected yet.',
        'section-adapter': 'Merchant-editable Shopify section with Liquid, schema/settings, data mapping, template composition, and editor preview support.',
        'theme-block-adapter': 'Future merchant-editable Shopify theme block with its own Liquid and schema.',
        'snippet-adapter': 'Reusable Liquid snippet rendered by sections/templates with explicit data/render parameters.',
        'template-adapter': 'Shopify template-level Liquid adapter.',
        'layout-adapter': 'Shopify layout-level adapter for global shells and sections.'
      },
      layers: {
        css: 'Required for every component and satisfied by generated/copied Shopify CSS assets.',
        liquid: 'Required for dedicated Shopify adapters; embedded class contracts may be implemented without a detected Liquid root.',
        schema: 'Required for section and theme-block adapters; validates that target-native editor settings exist in Liquid schema.',
        data: 'Required for dedicated Shopify adapters; tracks Shopify objects, settings, render calls, section calls, and snippet render parameters.',
        behavior: 'Required when the contract defines behavior; accepted only when the Shopify adapter status is implemented.',
        templateComposition: 'Required for section adapters; satisfied by JSON templates, layout section calls, or addable section presets.',
        editorPreview: 'Required for section and theme-block adapters; checks that schema controls are wired into rendered Liquid instead of becoming dead editor controls.'
      }
    },
    cssAssets,
    shopifyInventory: {
      liquidFiles: liquidInventory,
      templates: templateInventory.files,
      composition: compositionInventory,
      renderApis
    },
    liquidFiles: liquidInventory.map((file) => file.path),
    templateJsonFiles: templateInventory.files.map((file) => file.path),
    stats,
    warningCount: warnings.length,
    warnings,
    components
  };

  const summary = {
    $schema: 'https://the-gallery.dev/schema/shopify-adapter-summary.json',
    summaryVersion: '0.1.0',
    target: manifest.target,
    outputs,
    loadOrder: manifest.loadOrder,
    policy: manifest.policy,
    maturityModel: manifest.maturityModel,
    shopifyInventory: {
      liquidFiles: liquidInventory.map((file) => ({
        path: file.path,
        kind: file.kind,
        name: file.name,
        schema: {
          required: file.schema.required,
          status: file.schema.status,
          settingIds: file.schema.settingIds,
          blockTypes: file.schema.blockTypes,
          hasPresets: file.schema.hasPresets
        },
        dataReferences: file.dataReferences,
        renderCalls: file.renderCalls.map((renderCall) => renderCall.name),
        sectionCalls: file.sectionCalls
      })),
      templates: templateInventory.files,
      composition: compositionInventory
    },
    stats,
    categoryCoverage,
    warningCount: warnings.length,
    warningLimit: 20,
    warnings: warnings.slice(0, 20),
    sampleComponents: components
      .filter((component) => component.liquid.status === 'present')
      .slice(0, 20)
      .map((component) => ({
        slug: component.slug,
        name: component.name,
        category: component.category,
        selector: component.selector,
        source: component.source,
        contractAdapter: component.contractAdapter,
        maturity: component.maturity,
        liquid: component.liquid
      }))
  };

  write(outputPaths.manifest, `${JSON.stringify(manifest, null, 2)}\n`);
  write(outputPaths.summary, `${JSON.stringify(summary, null, 2)}\n`);
}

function main() {
  assert(fs.existsSync(outputPaths.tokens), `${relative(outputPaths.tokens)} does not exist. Run npm run build:tokens:shopify first.`);

  const registry = readJson(registryPath);
  const contracts = readContracts();

  buildBaseCss();
  copyComponentCssAssets();
  copyThemeJs();
  buildManifest(registry, contracts);

  console.log(`Built Shopify adapter: ${relative(outputPaths.base)}, ${relative(outputPaths.javascript)}, ${relative(outputPaths.manifest)}, ${relative(outputPaths.summary)}.`);
}

main();
