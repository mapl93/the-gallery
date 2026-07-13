import fs from 'node:fs';
import path from 'node:path';

const rootDir = process.cwd();
const registryPath = path.join(rootDir, 'registry.json');
const mdxDir = path.join(rootDir, 'site', 'src', 'content', 'components');
const cssDir = path.join(rootDir, 'components', 'css');
const legacyExamplesPath = path.join(rootDir, 'site', 'src', 'lib', 'examples.ts');

const allowedStateClasses = new Set([
  'is-active',
  'is-current',
  'is-filled',
  'is-half',
  'is-open',
  'is-selected',
  'is-visible',
]);

const allowedDocsClassPrefixes = [
  'tg-preview-',
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function collectCssClasses() {
  const cssClasses = new Set();

  for (const fileName of fs.readdirSync(cssDir)) {
    if (!fileName.endsWith('.css')) continue;

    const css = fs.readFileSync(path.join(cssDir, fileName), 'utf8');
    for (const match of css.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)) {
      cssClasses.add(match[1]);
    }
  }

  return cssClasses;
}

function collectClassesFromSource(source) {
  const classes = [];

  for (const match of source.matchAll(/class=(?:\\?"([^"\\]+)\\?"|'([^']+)')/g)) {
    const raw = match[1] ?? match[2] ?? '';
    for (const className of raw.split(/\s+/).filter(Boolean)) {
      classes.push(className);
    }
  }

  return classes;
}

function collectRegistrySelectorClasses(registry) {
  const selectorClasses = [];

  for (const [slug, component] of Object.entries(registry.components)) {
    const selectors = String(component.selector ?? '');
    const classes = [...selectors.matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map((match) => match[1]);
    selectorClasses.push({ slug, classes });
  }

  return selectorClasses;
}

function main() {
  const registry = readJson(registryPath);
  const cssClasses = collectCssClasses();
  const mdxFiles = fs.readdirSync(mdxDir).filter((fileName) => fileName.endsWith('.mdx')).sort();
  const registrySlugs = Object.keys(registry.components).sort();
  const mdxSlugs = mdxFiles.map((fileName) => fileName.replace(/\.mdx$/, '')).sort();

  const errors = [];
  const warnings = [];

  const missingMdx = registrySlugs.filter((slug) => !mdxSlugs.includes(slug));
  const orphanMdx = mdxSlugs.filter((slug) => !registrySlugs.includes(slug));

  if (missingMdx.length > 0) {
    errors.push(`Missing MDX pages for registry components: ${missingMdx.join(', ')}`);
  }

  if (orphanMdx.length > 0) {
    errors.push(`MDX pages without registry entries: ${orphanMdx.join(', ')}`);
  }

  for (const { slug, classes } of collectRegistrySelectorClasses(registry)) {
    const missingClasses = classes.filter((className) => !cssClasses.has(className));
    if (missingClasses.length > 0) {
      errors.push(`Registry selector mismatch for ${slug}: missing CSS classes ${missingClasses.join(', ')}`);
    }
  }

  for (const fileName of mdxFiles) {
    const filePath = path.join(mdxDir, fileName);
    const source = fs.readFileSync(filePath, 'utf8');
    const usedClasses = collectClassesFromSource(source);
    const missingClasses = [...new Set(
      usedClasses.filter((className) => {
        if (cssClasses.has(className) || allowedStateClasses.has(className)) {
          return false;
        }

        return !allowedDocsClassPrefixes.some((prefix) => className.startsWith(prefix));
      })
    )].sort();

    if (missingClasses.length > 0) {
      errors.push(`${fileName}: preview/docs reference classes not found in source CSS: ${missingClasses.join(', ')}`);
    }

    const inlineStyleCount = (source.match(/style=(?:\\?"|\{\{)/g) || []).length;
    if (inlineStyleCount > 0) {
      warnings.push(`${fileName}: ${inlineStyleCount} inline style usage(s)`);
    }

    const externalAssetCount = (source.match(/https:\/\//g) || []).length;
    if (externalAssetCount > 0) {
      warnings.push(`${fileName}: ${externalAssetCount} external asset reference(s)`);
    }
  }

  for (const [slug, component] of Object.entries(registry.components)) {
    const dependencies = [...(component.dependencies ?? [])];
    const invalidDependencies = dependencies.filter((dep) => !registry.components[dep] && !registry.base?.[dep]);
    if (invalidDependencies.length > 0) {
      errors.push(`${slug}: invalid dependencies ${invalidDependencies.join(', ')}`);
    }
  }

  if (fs.existsSync(legacyExamplesPath)) {
    warnings.push('Legacy examples source still exists at site/src/lib/examples.ts');
  }

  if (warnings.length > 0) {
    console.warn('Warnings:');
    for (const warning of warnings) {
      console.warn(`- ${warning}`);
    }
  }

  if (errors.length > 0) {
    console.error('Errors:');
    for (const error of errors) {
      console.error(`- ${error}`);
    }
    process.exit(1);
  }

  console.log(`Validated ${registrySlugs.length} registry components against ${mdxFiles.length} MDX pages and source CSS.`);
}

main();