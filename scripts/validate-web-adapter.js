import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(repoRoot, 'registry.json');
const contractsDir = path.join(repoRoot, 'components', 'contracts');
const manifestPath = path.join(repoRoot, 'platforms', 'web', 'adapter.manifest.json');
const summaryPath = path.join(repoRoot, 'platforms', 'web', 'adapter.summary.json');
const componentsCssPath = path.join(repoRoot, 'platforms', 'web', 'components.css');
const entryCssPath = path.join(repoRoot, 'platforms', 'web', 'index.css');
const tokensCssPath = path.join(repoRoot, 'platforms', 'web', 'tokens.css');
const themeJsPath = path.join(repoRoot, 'platforms', 'web', 'theme.js');
const sourceThemeJsPath = path.join(repoRoot, 'components', 'js', 'theme.js');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function relative(filePath) {
  return path.relative(repoRoot, filePath);
}

function assert(errors, condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function pathExists(errors, filePath) {
  assert(errors, fs.existsSync(filePath), `${relative(filePath)} is missing`);
}

function flattenPublicTokens(contract) {
  return [...new Set(Object.values(contract.tokens?.public ?? {}).flat())].sort();
}

function readContracts(errors) {
  const contracts = new Map();

  pathExists(errors, contractsDir);
  if (!fs.existsSync(contractsDir)) {
    return contracts;
  }

  const files = fs.readdirSync(contractsDir).filter((fileName) => fileName.endsWith('.contract.json')).sort();

  for (const fileName of files) {
    const contract = readJson(path.join(contractsDir, fileName));
    contracts.set(contract.slug, contract);
  }

  return contracts;
}

function validateOutputFiles(errors, manifest) {
  for (const [key, filePath] of Object.entries({
    entry: entryCssPath,
    tokens: tokensCssPath,
    components: componentsCssPath,
    javascript: themeJsPath,
    manifest: manifestPath,
    summary: summaryPath
  })) {
    pathExists(errors, filePath);
    assert(errors, manifest.outputs?.[key] === relative(filePath), `manifest.outputs.${key} must be ${relative(filePath)}`);
  }
}

function validateSummary(errors, manifest) {
  pathExists(errors, summaryPath);

  if (!fs.existsSync(summaryPath)) {
    return;
  }

  const summary = readJson(summaryPath);

  assert(errors, summary.$schema === 'https://the-gallery.dev/schema/web-adapter-summary.json', 'summary.$schema is not the expected web adapter summary schema URL');
  assert(errors, summary.summaryVersion === '0.1.0', 'summary.summaryVersion must be 0.1.0');
  assert(errors, summary.target?.id === manifest.target?.id, 'summary.target.id must match manifest');
  assert(errors, JSON.stringify(summary.outputs) === JSON.stringify(manifest.outputs), 'summary.outputs must match manifest.outputs');
  assert(errors, JSON.stringify(summary.loadOrder) === JSON.stringify(manifest.loadOrder), 'summary.loadOrder must match manifest.loadOrder');
  assert(errors, JSON.stringify(summary.policy) === JSON.stringify(manifest.policy), 'summary.policy must match manifest.policy');
  assert(errors, JSON.stringify(summary.stats) === JSON.stringify(manifest.stats), 'summary.stats must match manifest.stats');
  assert(errors, Array.isArray(summary.categoryCoverage) && summary.categoryCoverage.length > 0, 'summary.categoryCoverage must be a non-empty array');
  assert(errors, Array.isArray(summary.sampleComponents) && summary.sampleComponents.length > 0, 'summary.sampleComponents must be a non-empty array');
}

function validateLoadOrder(errors) {
  if (!fs.existsSync(entryCssPath)) {
    return;
  }

  const entryCss = read(entryCssPath);
  const tokensIndex = entryCss.indexOf("@import './tokens.css';");
  const componentsIndex = entryCss.indexOf("@import './components.css';");

  assert(errors, tokensIndex >= 0, 'platforms/web/index.css must import tokens.css');
  assert(errors, componentsIndex >= 0, 'platforms/web/index.css must import components.css');
  assert(errors, tokensIndex >= 0 && componentsIndex > tokensIndex, 'platforms/web/index.css must import tokens.css before components.css');
}

function validateConcatenatedCss(errors, manifest) {
  if (!fs.existsSync(componentsCssPath)) {
    return;
  }

  const outputCss = read(componentsCssPath);
  const cssFiles = manifest.sources?.cssFiles ?? [];

  assert(errors, Array.isArray(cssFiles) && cssFiles.length > 0, 'manifest.sources.cssFiles must be a non-empty array');

  for (const item of cssFiles) {
    const sourcePath = path.join(repoRoot, item.source ?? '');
    pathExists(errors, sourcePath);

    if (!fs.existsSync(sourcePath)) {
      continue;
    }

    const sourceCss = read(sourcePath).trimEnd();
    assert(errors, outputCss.includes(`/* Source: ${item.source} */`), `platforms/web/components.css is missing source marker for ${item.source}`);
    assert(errors, outputCss.includes(sourceCss), `platforms/web/components.css does not include ${item.source}`);
  }
}

function validateJavascript(errors) {
  if (!fs.existsSync(themeJsPath) || !fs.existsSync(sourceThemeJsPath)) {
    return;
  }

  assert(errors, read(themeJsPath) === read(sourceThemeJsPath), 'platforms/web/theme.js must match components/js/theme.js');
}

function validateComponents(errors, registry, contracts, manifest) {
  const registrySlugs = Object.keys(registry.components).sort();
  const manifestComponents = manifest.components ?? [];
  const manifestSlugs = manifestComponents.map((component) => component.slug).sort();

  assert(errors, manifest.stats?.components === registrySlugs.length, `manifest.stats.components must be ${registrySlugs.length}`);
  assert(errors, manifestComponents.length === registrySlugs.length, `manifest.components must contain ${registrySlugs.length} components`);

  const missing = registrySlugs.filter((slug) => !manifestSlugs.includes(slug));
  const extra = manifestSlugs.filter((slug) => !registrySlugs.includes(slug));

  assert(errors, missing.length === 0, `manifest.components missing registry components: ${missing.join(', ')}`);
  assert(errors, extra.length === 0, `manifest.components has extra components: ${extra.join(', ')}`);

  for (const manifestComponent of manifestComponents) {
    const slug = manifestComponent.slug;
    const registryComponent = registry.components[slug];
    const contract = contracts.get(slug);

    if (!registryComponent || !contract) {
      continue;
    }

    assert(errors, contract.adapters?.web?.status === 'implemented', `${slug} contract must mark web adapter as implemented`);
    assert(errors, manifestComponent.adapter?.status === 'implemented', `${slug} manifest adapter status must be implemented`);
    assert(errors, manifestComponent.name === contract.name, `${slug} manifest name must match contract`);
    assert(errors, manifestComponent.registryId === registryComponent.id, `${slug} manifest registryId must match registry`);
    assert(errors, manifestComponent.category === registryComponent.category, `${slug} manifest category must match registry`);
    assert(errors, manifestComponent.selector === registryComponent.selector, `${slug} manifest selector must match registry`);
    assert(errors, manifestComponent.source?.css === registryComponent.file, `${slug} manifest source.css must match registry`);
    assert(errors, manifestComponent.source?.contract === `components/contracts/${slug}.contract.json`, `${slug} manifest source.contract must point to contract`);
    assert(errors, manifestComponent.source?.docs === contract.source.docs, `${slug} manifest source.docs must match contract`);

    const sourceCssPath = path.join(repoRoot, registryComponent.file);
    pathExists(errors, sourceCssPath);

    if (fs.existsSync(sourceCssPath)) {
      assert(errors, read(sourceCssPath).includes(registryComponent.selector), `${slug} selector ${registryComponent.selector} not found in ${registryComponent.file}`);
    }

    for (const token of flattenPublicTokens(contract)) {
      assert(errors, manifestComponent.publicTokens?.includes(token), `${slug} manifest publicTokens missing ${token}`);
    }
  }
}

function main() {
  const errors = [];

  pathExists(errors, manifestPath);
  pathExists(errors, registryPath);

  const contracts = readContracts(errors);

  if (!fs.existsSync(manifestPath) || !fs.existsSync(registryPath)) {
    console.error('Web adapter errors:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  const registry = readJson(registryPath);
  const manifest = readJson(manifestPath);

  assert(errors, manifest.$schema === 'https://the-gallery.dev/schema/web-adapter-manifest.json', 'manifest.$schema is not the expected web adapter schema URL');
  assert(errors, manifest.manifestVersion === '0.1.0', 'manifest.manifestVersion must be 0.1.0');
  assert(errors, manifest.target?.id === 'web', 'manifest.target.id must be web');
  assert(errors, manifest.target?.kind === 'css', 'manifest.target.kind must be css');
  assert(errors, manifest.generatedBy === 'scripts/build-web-adapter.js', 'manifest.generatedBy must be scripts/build-web-adapter.js');

  validateOutputFiles(errors, manifest);
  validateLoadOrder(errors);
  validateConcatenatedCss(errors, manifest);
  validateJavascript(errors);
  validateComponents(errors, registry, contracts, manifest);
  validateSummary(errors, manifest);

  if (errors.length > 0) {
    console.error('Web adapter errors:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validated neutral web adapter: ${manifest.stats.components} components, ${manifest.stats.cssFiles} CSS source files.`);
}

main();
