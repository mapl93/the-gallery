import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'the-gallery-cli-'));
const errors = [];

function assert(condition, message) {
  if (!condition) errors.push(message);
}

try {
  fs.writeFileSync(path.join(fixture, 'tg.config.json'), `${JSON.stringify({
    $schema: 'https://the-gallery.dev/schema/config.json',
    cssDir: './styles/the-gallery',
    tokensDir: './styles/tokens',
    jsDir: './scripts/the-gallery',
    components: [],
  }, null, 2)}\n`);

  const result = spawnSync(process.execPath, [path.join(repoRoot, 'cli', 'index.js'), 'add', 'product-gallery', 'filter-panel'], {
    cwd: fixture,
    encoding: 'utf8',
  });
  assert(result.status === 0, `CLI exited ${result.status}: ${result.stderr || result.stdout}`);

  const cssDir = path.join(fixture, 'styles', 'the-gallery');
  const runtimeDir = path.join(fixture, 'scripts', 'the-gallery');
  for (const file of ['reset.css', 'foundations.css', 'utilities.css', 'primitives.css', 'layout.css', 'product.css', 'collection.css']) {
    assert(fs.existsSync(path.join(cssDir, file)), `CLI install is missing CSS dependency ${file}`);
  }
  for (const file of ['core.js', 'product-gallery.js', 'checkbox.js', 'filter-panel.js', 'runtime.js']) {
    assert(fs.existsSync(path.join(runtimeDir, file)), `CLI install is missing runtime dependency ${file}`);
  }
  for (const file of ['date-picker.js', 'countdown.js', 'marquee.js']) {
    assert(!fs.existsSync(path.join(runtimeDir, file)), `CLI copied unrelated runtime module ${file}`);
  }

  const runtimeEntry = fs.existsSync(path.join(runtimeDir, 'runtime.js'))
    ? fs.readFileSync(path.join(runtimeDir, 'runtime.js'), 'utf8')
    : '';
  assert(runtimeEntry.includes("import './product-gallery.js';"), 'runtime entry must import Product Gallery');
  assert(runtimeEntry.includes("import './checkbox.js';"), 'runtime entry must import dependency-owned Checkbox behavior');
  assert(runtimeEntry.includes("import './filter-panel.js';"), 'runtime entry must import Filter Panel');
  assert(!runtimeEntry.includes('date-picker.js'), 'runtime entry must not import unrelated Date Picker behavior');

  const config = JSON.parse(fs.readFileSync(path.join(fixture, 'tg.config.json'), 'utf8'));
  assert(config.components.includes('product-gallery'), 'CLI config must record Product Gallery');
  assert(config.components.includes('filter-panel'), 'CLI config must record Filter Panel');
  assert(config.components.includes('checkbox'), 'CLI config must record transitive Checkbox dependency');

  // Family CSS order must not depend on component request or installation order.
  // Product Info encounters product.css before Slider discovers layout.css;
  // loading that union in encounter order makes Carousel override Slider's grid.
  const manifest = JSON.parse(fs.readFileSync(path.join(repoRoot, 'platforms/web/adapter.manifest.json'), 'utf8'));
  const cases = [
    [['product-info', 'product-slider']],
    [['product-slider', 'product-info']],
    [['product-info'], ['product-slider']],
    [['-a']],
  ];
  for (const [index, batches] of cases.entries()) {
    const destination = path.join(fixture, `css-order-${index}`);
    fs.mkdirSync(destination);
    fs.writeFileSync(path.join(destination, 'tg.config.json'), JSON.stringify({
      cssDir: './styles/the-gallery', tokensDir: './styles/tokens',
      jsDir: './scripts/the-gallery', components: [],
    }));
    for (const requested of batches) {
      const installed = spawnSync(process.execPath, [path.join(repoRoot, 'cli/index.js'), 'add', ...requested], {
        cwd: destination, encoding: 'utf8',
      });
      assert(installed.status === 0, `CSS order case ${index} failed: ${installed.stderr || installed.stdout}`);
      const output = installed.stdout.split('Import these styles in order, then load the runtime as a module when present:')[1] ?? '';
      const imports = output.split('\n').map((line) => line.trim()).filter((line) => /^styles\/.*\.css$/.test(line));
      const expected = ['styles/tokens/tokens.css', ...manifest.sources.cssFiles
        .filter((file) => fs.existsSync(path.join(destination, 'styles/the-gallery', path.basename(file.output))))
        .map((file) => `styles/the-gallery/${path.basename(file.output)}`)];
      assert(JSON.stringify(imports) === JSON.stringify(expected),
        `CSS order case ${index} (${requested.join(', ')}): ${imports.join(', ')} must preserve canonical cascade ${expected.join(', ')}`);
      assert(imports.indexOf('styles/the-gallery/layout.css') < imports.indexOf('styles/the-gallery/product.css') || !requested.includes('product-slider'),
        'Slider must load its product rules after Carousel layout rules');
    }
  }
} finally {
  fs.rmSync(fixture, { recursive: true, force: true });
}

if (errors.length > 0) {
  console.error('CLI install validation errors:');
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log('Validated CLI dependency-closed install: canonical CSS cascade across request orders, incremental/all installs, selected runtime, and no unrelated enhancers.');
