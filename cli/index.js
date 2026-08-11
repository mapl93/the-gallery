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

import { readFileSync, writeFileSync, existsSync, mkdirSync, cpSync } from 'node:fs';
import { resolve, dirname, join, relative, basename } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createInterface } from 'node:readline';

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
  if (!existsSync(configPath)) return null;
  return JSON.parse(readFileSync(configPath, 'utf-8'));
}

function saveConfig(config) {
  writeFileSync(resolve(CWD, CONFIG_FILE), JSON.stringify(config, null, 2) + '\n');
}

// ── Dependency resolution ────────────────────────────────────

/** Resolve a component + all transitive dependencies (topological). */
function resolveDeps(componentId, resolved = new Set(), order = []) {
  if (resolved.has(componentId)) return order;

  const entry = registry.components[componentId];
  if (!entry) {
    error(`Unknown component: ${componentId}`);
    process.exit(1);
  }

  // Resolve dependencies first (depth-first)
  for (const dep of entry.dependencies || []) {
    resolveDeps(dep, resolved, order);
  }

  resolved.add(componentId);
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

  saveConfig(config);
  log('');
  success(`Created ${CONFIG_FILE}`);
  info(`Run ${COLORS.bold}npx the-gallery add button${COLORS.reset} to add your first component.`);
  log('');
}

async function cmdAdd(args) {
  let config = loadConfig();
  if (!config) {
    warn(`No ${CONFIG_FILE} found. Running init first...\n`);
    await cmdInit();
    config = loadConfig();
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
  if (newComponents.length === 0) {
    info('All requested components are already installed.');
    log('');
    return;
  }

  log(`${COLORS.bold}Components to install:${COLORS.reset}`);
  for (const id of newComponents) {
    const entry = registry.components[id];
    const isDep = deps.includes(id);
    const tag = isDep ? `${COLORS.dim}(dependency)${COLORS.reset}` : '';
    log(`  ${COLORS.green}+${COLORS.reset} ${entry.name} ${COLORS.dim}[${entry.id}]${COLORS.reset} ${tag}`);
  }
  log('');

  // Get required files
  const mergedComponents = [...new Set([...config.components, ...allComponents])];
  const resolvedAll = [];
  for (const id of mergedComponents) {
    for (const dep of resolveDeps(id)) {
      if (!resolvedAll.includes(dep)) resolvedAll.push(dep);
    }
  }

  const files = getRequiredFiles(resolvedAll);
  const runtimeFiles = getRequiredRuntimeFiles(resolvedAll);
  const tokenCategories = getRequiredTokens(resolvedAll);

  // Create target directories
  const cssDir = resolve(CWD, config.cssDir);
  const tokensDir = resolve(CWD, config.tokensDir);
  const jsDir = resolve(CWD, config.jsDir || './scripts/the-gallery');
  mkdirSync(cssDir, { recursive: true });
  mkdirSync(tokensDir, { recursive: true });

  // Copy CSS files
  let copied = 0;
  for (const srcPath of files) {
    const fileName = basename(srcPath);
    const destPath = resolve(cssDir, fileName);
    cpSync(srcPath, destPath);
    copied++;
  }
  success(`Copied ${copied} CSS file(s) → ${relative(CWD, cssDir)}/`);

  if (runtimeFiles.length > 0) {
    mkdirSync(jsDir, { recursive: true });
    for (const srcPath of runtimeFiles) {
      cpSync(srcPath, resolve(jsDir, basename(srcPath)));
    }
    const moduleFiles = runtimeFiles
      .map((file) => basename(file))
      .filter((file) => file !== 'core.js');
    const entry = [
      '/** The Gallery dependency-closed runtime entry. */',
      ...moduleFiles.map((file) => `import './${file}';`),
      '',
    ].join('\n');
    writeFileSync(resolve(jsDir, 'runtime.js'), entry);
    success(`Copied ${runtimeFiles.length} runtime module(s) → ${relative(CWD, jsDir)}/`);
  }

  // Copy token source files
  let tokensCopied = 0;
  for (const [name, file] of Object.entries(registry.tokens.files)) {
    const srcPath = resolve(PACKAGE_ROOT, file);
    const destPath = resolve(tokensDir, basename(file));
    if (existsSync(srcPath)) {
      cpSync(srcPath, destPath);
      tokensCopied++;
    }
  }
  success(`Copied ${tokensCopied} token file(s) → ${relative(CWD, tokensDir)}/`);

  // Update config
  config.components = mergedComponents;
  config.tokenCategories = tokenCategories;
  saveConfig(config);
  success(`Updated ${CONFIG_FILE}`);

  // Show next steps
  log('');
  log(`${COLORS.bold}Next steps:${COLORS.reset}`);
  log(`  1. Create a ${COLORS.cyan}tokens.css${COLORS.reset} with your brand values (or use Style Dictionary)`);
  log(`  2. Import tokens.css + component CSS in your project`);
  if (runtimeFiles.length > 0) {
    log(`  3. Load ${COLORS.cyan}${relative(CWD, resolve(jsDir, 'runtime.js'))}${COLORS.reset} with a module script`);
    log(`  4. Use the HTML/class patterns from the docs`);
  } else {
    log(`  3. Use the HTML/class patterns from the docs`);
  }
  log('');
  log(`${COLORS.dim}Tokens needed: ${tokenCategories.join(', ')}${COLORS.reset}`);
  log('');
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
  if (!config) {
    error(`No ${CONFIG_FILE} found. Run ${COLORS.bold}npx the-gallery init${COLORS.reset} first.`);
    process.exit(1);
  }

  const cssDir = resolve(CWD, config.cssDir);
  let diffs = 0;

  for (const id of config.components || []) {
    const entry = registry.components[id];
    if (!entry) continue;

    const srcPath = resolve(PACKAGE_ROOT, entry.file);
    const fileName = basename(entry.file);
    const localPath = resolve(cssDir, fileName);

    if (!existsSync(localPath)) {
      warn(`${fileName} — missing locally (run add to restore)`);
      diffs++;
      continue;
    }

    const src = readFileSync(srcPath, 'utf-8');
    const local = readFileSync(localPath, 'utf-8');

    if (src !== local) {
      info(`${fileName} — local changes detected`);
      diffs++;
    }
  }

  if (diffs === 0) {
    success('All components match upstream. No changes detected.');
  } else {
    log(`\n${COLORS.dim}${diffs} file(s) differ from upstream.${COLORS.reset}`);
    log(`${COLORS.dim}This is expected if you customized components for your target.${COLORS.reset}\n`);
  }
}

function cmdHelp() {
  log('');
  log(`${COLORS.bold}The Gallery${COLORS.reset} — Platform-agnostic design system`);
  log('');
  log('Commands:');
  log(`  ${COLORS.cyan}init${COLORS.reset}               Configure your project`);
  log(`  ${COLORS.cyan}add${COLORS.reset} <name...>       Add component(s) with dependencies`);
  log(`  ${COLORS.cyan}add${COLORS.reset} --all           Add all components`);
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

switch (command) {
  case 'init':
    cmdInit();
    break;
  case 'add':
    cmdAdd(args);
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
