#!/usr/bin/env node

/**
 * The Gallery CLI
 *
 * Install components into your project, shadcn-style.
 *
 * Usage:
 *   npx the-gallery init          — Configure your project
 *   npx the-gallery add button    — Add a component (+ deps)
 *   npx the-gallery add -a        — Add all components
 *   npx the-gallery list          — List available components
 *   npx the-gallery diff          — Show what's changed upstream
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';
import { INSTALL_FILE, hash, inspectFile, loadInstallState, planInstall, contentDiff } from './install-plan.js';

// ── Paths ────────────────────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url));
const PACKAGE_ROOT = resolve(__dirname, '..');
const REGISTRY_PATH = resolve(PACKAGE_ROOT, 'registry.json');
const WEB_MANIFEST_PATH = resolve(PACKAGE_ROOT, 'platforms/web/adapter.manifest.json');
const CWD = process.cwd();

// ── Helpers ──────────────────────────────────────────────────
const registry = JSON.parse(readFileSync(REGISTRY_PATH, 'utf-8'));
const webManifest = JSON.parse(readFileSync(WEB_MANIFEST_PATH, 'utf-8'));

const CONFIG_FILE = 'tg.config.json';
const packageVersion = JSON.parse(readFileSync(resolve(PACKAGE_ROOT, 'package.json'), 'utf8')).version;
const defaultConfig = () => ({
  $schema: 'https://the-gallery.dev/schema/config.json',
  cssDir: './styles/the-gallery', tokensDir: './styles/tokens',
  jsDir: './scripts/the-gallery', components: [],
});

const COLORS = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
  dim: '\x1b[2m',
  bold: '\x1b[1m',
};

function log(msg) { console.log(msg); }
function success(msg) { log(`${COLORS.green}✓${COLORS.reset} ${msg}`); }
function warn(msg) { log(`${COLORS.yellow}⚠${COLORS.reset} ${msg}`); }
function error(msg) { log(`${COLORS.red}✗${COLORS.reset} ${msg}`); }
function info(msg) { log(`${COLORS.cyan}→${COLORS.reset} ${msg}`); }

function ask(question) {
  const rl = createInterface({ input: process.stdin, output: process.stdout });
  return new Promise((res) => {
    rl.question(`${COLORS.cyan}?${COLORS.reset} ${question} `, (answer) => {
      rl.close();
      res(answer.trim());
    });
  });
}

// ── Config ───────────────────────────────────────────────────
function loadConfig() {
  const configPath = resolve(CWD, CONFIG_FILE);
  const content = inspectFile(configPath, CWD);
  if (content === null) return null;
  const config = JSON.parse(content);
  if (!Array.isArray(config.components) || typeof config.cssDir !== 'string' || typeof config.tokensDir !== 'string') {
    throw new Error(`${CONFIG_FILE} requires components[], cssDir and tokensDir.`);
  }
  return config;
}

function saveConfig(config) {
  writeFileSync(resolve(CWD, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n');
}

// ── Dependency resolution ────────────────────────────────────

/** Resolve a component + all transitive dependencies (topological). */
function resolveDeps(componentId, resolved = new Set(), order = [], visiting = new Set()) {
  if (resolved.has(componentId)) return order;
  if (visiting.has(componentId)) throw new Error(`Circular component dependency: ${componentId}`);
  visiting.add(componentId);

  const entry = registry.components[componentId];
  if (!entry) {
    error(`Unknown component: ${componentId}`);
    process.exit(1);
  }

  // Resolve dependencies first (depth-first)
  for (const dep of entry.dependencies || []) {
    resolveDeps(dep, resolved, order, visiting);
  }

  resolved.add(componentId);
  visiting.delete(componentId);
  order.push(componentId);
  return order;
}

/** Get the CSS file(s) needed for a list of components. Returns unique file paths in order. */
function getRequiredFiles(componentIds) {
  const outputs = [];
  const seen = new Set();
  for (const id of componentIds) {
    const component = webManifest.components.find((entry) => entry.slug === id);
    for (const file of component?.install?.css ?? []) {
      if (seen.has(file)) continue;
      seen.add(file);
      outputs.push(resolve(PACKAGE_ROOT, file));
    }
  }
  return outputs;
}

/** Get the dependency-closed progressive-enhancement modules for installed components. */
function getRequiredRuntimeFiles(componentIds) {
  const outputs = [];
  const seen = new Set();
  for (const id of componentIds) {
    const component = webManifest.components.find((entry) => entry.slug === id);
    for (const file of component?.install?.runtime ?? []) {
      if (seen.has(file)) continue;
      seen.add(file);
      outputs.push(resolve(PACKAGE_ROOT, file));
    }
  }
  return outputs;
}

/** Get all token categories used by a set of components. */
function getRequiredTokens(componentIds) {
  const categories = new Set();
  for (const id of componentIds) {
    const entry = registry.components[id];
    if (entry?.tokens) {
      for (const cat of Object.keys(entry.tokens)) {
        categories.add(cat);
      }
    }
  }
  return [...categories].sort();
}

// ── Commands ─────────────────────────────────────────────────

async function cmdInit() {
  if (inspectFile(resolve(CWD, CONFIG_FILE), CWD) !== null) {
    info(`${CONFIG_FILE} already exists; edit it directly to change install paths.`);
    return;
  }
  log('');
  log(`${COLORS.bold}The Gallery${COLORS.reset} — Design System Setup`);
  log('');

  const cssDir = await ask('Where should components be installed? (default: ./styles/the-gallery)');
  const tokensDir = await ask('Where should tokens be placed? (default: ./styles/tokens)');

  const config = {
    $schema: 'https://the-gallery.dev/schema/config.json',
    cssDir: cssDir || './styles/the-gallery',
    tokensDir: tokensDir || './styles/tokens',
    jsDir: './scripts/the-gallery',
    components: [],
  };

  writeFileSync(resolve(CWD, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n', { flag: 'wx' });
  log('');
  success(`Created ${CONFIG_FILE}`);
  info(`Run ${COLORS.bold}npx the-gallery add button${COLORS.reset} to add your first component.`);
  log('');
}

async function cmdAdd(args) {
  const dryRun = args.includes('--dry-run');
  const keepLocal = [];
  args = args.filter((arg, index) => {
    if (arg === '--keep-local') {
      const file = args[index + 1];
      if (!file || file.startsWith('-')) throw new Error('--keep-local requires one exact destination path.');
      keepLocal.push(relative(CWD, resolve(CWD, file)));
      return false;
    }
    return args[index - 1] !== '--keep-local';
  });
  const unknownFlags = args.filter((arg) => arg.startsWith('-') && !['-a', '--all', '--dry-run'].includes(arg));
  if (unknownFlags.length) throw new Error(`Unknown add option: ${unknownFlags.join(', ')}`);
  let config = loadConfig();
  if (!config && dryRun) config = defaultConfig();
  if (!config) {
    info(`No ${CONFIG_FILE} found; using default paths. Run init first to choose other paths.`);
    config = defaultConfig();
  }

  const addAll = args.includes('-a') || args.includes('--all');
  const requestedIds = addAll
    ? Object.keys(registry.components)
    : args.filter((a) => !a.startsWith('-'));

  if (requestedIds.length === 0) {
    error('Please specify component name(s) or use --all');
    log(`\n  Example: npx the-gallery add button input badge`);
    log(`  Example: npx the-gallery add --all\n`);
    process.exit(1);
  }

  // Validate component names
  for (const id of requestedIds) {
    if (!registry.components[id]) {
      error(`Unknown component: "${id}"`);
      const suggestions = Object.keys(registry.components)
        .filter((k) => k.includes(id) || id.includes(k))
        .slice(0, 5);
      if (suggestions.length > 0) {
        info(`Did you mean: ${suggestions.join(', ')}?`);
      }
      process.exit(1);
    }
  }

  // Resolve all dependencies
  const allComponents = [];
  for (const id of requestedIds) {
    for (const dep of resolveDeps(id)) {
      if (!allComponents.includes(dep)) {
        allComponents.push(dep);
      }
    }
  }

  // Show what will be installed
  const newComponents = allComponents.filter((id) => !config.components.includes(id));
  const deps = newComponents.filter((id) => !requestedIds.includes(id));

  log('');
  if (newComponents.length === 0) info('Checking the installed component files.');

  log(`${COLORS.bold}Components to install:${COLORS.reset}`);
  for (const id of newComponents) {
    const entry = registry.components[id];
    const isDep = deps.includes(id);
    const tag = isDep ? `${COLORS.dim}(dependency)${COLORS.reset}` : '';
    log(`  ${COLORS.green}+${COLORS.reset} ${entry.name} ${COLORS.dim}[${entry.id}]${COLORS.reset} ${tag}`);
  }
  log('');

  const mergedComponents = [...new Set([...config.components, ...allComponents])];
  const state = loadInstallState(CWD);
  const plan = createInstallPlan(config, mergedComponents, state);
  for (const key of keepLocal) {
    const file = plan.find((entry) => entry.key === key);
    if (!file || !['conflict', 'untracked', 'preserve'].includes(file.status)) {
      throw new Error(`--keep-local needs an existing differing file in this plan: ${key}`);
    }
    file.status = 'keep';
    file.conflict = false;
    file.provenance = { source: file.source, upstreamHash: hash(file.content), packageVersion, resolution: 'kept-local', acceptedLocalHash: file.localHash };
  }
  printPlan(plan);
  if (plan.some((file) => file.conflict)) {
    error('Installation stopped before writing any component, token, runtime or config file.');
    info('Run diff to inspect local/upstream content. Back up and reconcile conflicts, then retry add with --keep-local <exact-path> for each reviewed file. No force overwrite is performed.');
    process.exitCode = 1;
    return;
  }
  if (dryRun) {
    info('Dry run: no files or directories written.');
    return;
  }

  // Preflight metadata and every file before the first write. A changed file
  // between planning and installation is a conflict, not an overwrite request.
  inspectFile(resolve(CWD, CONFIG_FILE), CWD);
  inspectFile(resolve(CWD, INSTALL_FILE), CWD);
  for (const file of plan) {
    const current = inspectFile(file.destination, CWD);
    if ((current === null ? null : hash(current)) !== file.localHash) {
      throw new Error(`File changed while planning: ${file.key}; retry to review it.`);
    }
  }
  for (const file of plan) {
    if (['new', 'update'].includes(file.status)) {
      mkdirSync(dirname(file.destination), { recursive: true });
      writeFileSync(file.destination, file.content, file.status === 'new' ? { flag: 'wx' } : undefined);
    }
    state.files[file.key] = file.provenance;
  }
  config.components = mergedComponents;
  config.tokenCategories = getRequiredTokens(mergedComponents);
  saveConfig(config);
  writeFileSync(resolve(CWD, INSTALL_FILE), JSON.stringify(state, null, 2) + '\n');
  success(`Installed dependency slice; provenance recorded in ${INSTALL_FILE}.`);
  log('');
  log('Import these styles in order, then load the runtime as a module when present:');
  for (const file of plan) {
    if (file.destination.endsWith('.css')) log(`  ${file.key}`);
  }
  const runtime = plan.find((file) => file.source === 'generated:runtime-entry');
  if (runtime) log(`  <script type="module" src="${runtime.key}"></script>`);
  info('Keep brand overrides in a separate stylesheet loaded after tokens.css. Existing legacy JSON files are preserved; their custom values are not converted automatically.');
  log('');
}

function createInstallPlan(config, componentIds, state) {
  const resolved = [...new Set(componentIds.flatMap((id) => resolveDeps(id)))];
  for (const id of resolved) {
    if (!webManifest.components.some((component) => component.slug === id && component.install?.tokens && component.install?.css?.length)) {
      throw new Error(`Missing Web install manifest for ${id}. Rebuild the adapter before distribution.`);
    }
  }
  const files = [];
  const addSource = (source, directory) => files.push({
    source: relative(PACKAGE_ROOT, source),
    destination: resolve(CWD, directory, basename(source)),
    content: readFileSync(source),
  });
  const tokens = [...new Set(resolved.map((id) => webManifest.components.find((component) => component.slug === id).install.tokens))];
  for (const source of tokens) addSource(resolve(PACKAGE_ROOT, source), config.tokensDir);
  for (const source of getRequiredFiles(resolved)) addSource(source, config.cssDir);
  const runtimeFiles = getRequiredRuntimeFiles(resolved);
  const jsDir = config.jsDir || './scripts/the-gallery';
  for (const source of runtimeFiles) addSource(source, jsDir);
  if (runtimeFiles.length) {
    files.push({
      source: 'generated:runtime-entry',
      destination: resolve(CWD, jsDir, 'runtime.js'),
      content: Buffer.from([
        '/** The Gallery dependency-closed runtime entry. */',
        ...runtimeFiles.map((file) => basename(file)).filter((file) => file !== 'core.js').map((file) => `import './${file}';`),
        '',
      ].join('\n')),
    });
  }
  return planInstall({ cwd: CWD, files, state, packageVersion });
}

const statusLabels = {
  new: 'new file', unchanged: 'matches upstream', update: 'upstream update; local unchanged',
  preserve: 'preserved local changes; upstream unchanged',
  keep: 'keep local file by explicit choice; accept current upstream baseline',
  conflict: 'CONFLICT: local and upstream both changed',
  untracked: 'CONFLICT: existing file differs; no matching baseline',
  removed: 'CONFLICT: previously installed file was removed locally',
};
function printPlan(plan) {
  for (const file of plan) log(`  ${file.key} — ${statusLabels[file.status]}`);
}

function cmdList() {
  log('');
  log(`${COLORS.bold}The Gallery${COLORS.reset} — Available Components`);
  log('');

  const config = loadConfig();
  const installed = config?.components || [];

  // Group by category
  const byCategory = {};
  for (const [id, entry] of Object.entries(registry.components)) {
    const cat = entry.category;
    if (!byCategory[cat]) byCategory[cat] = [];
    byCategory[cat].push({ key: id, ...entry });
  }

  for (const [catId, catMeta] of Object.entries(registry.categories)) {
    const components = byCategory[catId];
    if (!components) continue;

    log(`${COLORS.bold}${catMeta.name}${COLORS.reset} ${COLORS.dim}(${catMeta.description})${COLORS.reset}`);

    for (const comp of components) {
      const isInstalled = installed.includes(comp.key);
      const marker = isInstalled
        ? `${COLORS.green}●${COLORS.reset}`
        : `${COLORS.dim}○${COLORS.reset}`;
      const deps = comp.dependencies?.length
        ? `${COLORS.dim}→ ${comp.dependencies.join(', ')}${COLORS.reset}`
        : '';
      log(`  ${marker} ${comp.name} ${COLORS.dim}(${comp.id})${COLORS.reset} ${deps}`);
    }
    log('');
  }

  log(`${COLORS.dim}${COLORS.green}●${COLORS.reset}${COLORS.dim} = installed  ○ = available${COLORS.reset}`);
  log('');
}

function cmdDiff() {
  const config = loadConfig();
  if (!config) throw new Error(`No ${CONFIG_FILE} found. Run init first.`);
  const plan = createInstallPlan(config, config.components || [], loadInstallState(CWD));
  printPlan(plan);
  for (const file of plan) {
    if (file.status !== 'unchanged') log(contentDiff(file.local, file.content, file.key));
  }
  if (plan.every((file) => file.status === 'unchanged')) success('All installed files match upstream.');
  info('Comparison only; no files written. Baselines identify the last accepted upstream bytes, not package-version guesses.');
}

function cmdHelp() {
  log('');
  log(`${COLORS.bold}The Gallery${COLORS.reset} — Platform-agnostic design system`);
  log('');
  log('Commands:');
  log(`  ${COLORS.cyan}init${COLORS.reset}               Configure your project`);
  log(`  ${COLORS.cyan}add${COLORS.reset} <name...>       Add component(s) with dependencies`);
  log(`  ${COLORS.cyan}add${COLORS.reset} --all           Add all components`);
  log(`  ${COLORS.cyan}add${COLORS.reset} <name> --dry-run Preview all writes and conflicts`);
  log(`  ${COLORS.cyan}add${COLORS.reset} <name> --keep-local <path> Keep one reviewed conflicting file`);
  log(`  ${COLORS.cyan}list${COLORS.reset}               List all available components`);
  log(`  ${COLORS.cyan}diff${COLORS.reset}               Compare local files with upstream`);
  log('');
  log('Examples:');
  log(`  npx the-gallery init`);
  log(`  npx the-gallery add button input badge`);
  log(`  npx the-gallery add product-card    ${COLORS.dim}# also installs badge, button${COLORS.reset}`);
  log(`  npx the-gallery list`);
  log('');
}

// ── Main ─────────────────────────────────────────────────────
const [, , command, ...args] = process.argv;

try {
switch (command) {
  case 'init':
    await cmdInit();
    break;
  case 'add':
    await cmdAdd(args);
    break;
  case 'list':
    cmdList();
    break;
  case 'diff':
    cmdDiff();
    break;
  case 'help':
  case '--help':
  case '-h':
    cmdHelp();
    break;
  default:
    if (command) {
      error(`Unknown command: ${command}`);
    }
    cmdHelp();
    break;
}

} catch (cause) {
  error(cause.message);
  process.exitCode = 1;
}
