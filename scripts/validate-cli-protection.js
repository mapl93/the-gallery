import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const root = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'gallery-cli-protection-')));
const upstream = path.join(root, 'upstream');
let checks = 0;
function read(dir, file) { return fs.readFileSync(path.join(dir, file), 'utf8'); }
function write(dir, file, value) { fs.mkdirSync(path.dirname(path.join(dir, file)), { recursive: true }); fs.writeFileSync(path.join(dir, file), value); }
function snapshot(dir) {
  return JSON.stringify(fs.readdirSync(dir, { recursive: true }).sort().filter((file) => fs.lstatSync(path.join(dir, file)).isFile()).map((file) => [file, read(dir, file)]));
}
function run(dir, args, status = 0) {
  const result = spawnSync(process.execPath, [path.join(upstream, 'cli/index.js'), ...args], { cwd: dir, encoding: 'utf8', input: '' });
  assert.equal(result.status, status, `${args.join(' ')}: ${result.stdout}\n${result.stderr}`);
  return result.stdout;
}
function fixture(name) { const dir = path.join(root, name); fs.mkdirSync(dir); return dir; }

try {
  for (const entry of ['cli', 'package.json', 'registry.json', 'platforms/web']) {
    fs.cpSync(path.join(repo, entry), path.join(upstream, entry), { recursive: true });
  }
  const fresh = fixture('fresh');
  run(fresh, ['add', 'button', '--dry-run']);
  assert.deepEqual(fs.readdirSync(fresh), []); checks++;
  run(fresh, ['add', 'button']);
  assert.equal(read(fresh, 'styles/tokens/tokens.css'), read(upstream, 'platforms/web/tokens.css'));
  assert.deepEqual(fs.readdirSync(path.join(fresh, 'styles/tokens')), ['tokens.css']); checks++;
  const first = snapshot(fresh);
  run(fresh, ['add', 'button']);
  assert.equal(snapshot(fresh), first); checks++;
  const customCss = read(fresh, 'styles/the-gallery/primitives.css') + '\n/* my brand button */\n';
  const customTokens = read(fresh, 'styles/tokens/tokens.css') + '\n:root { --color-text-primary: purple; }\n';
  write(fresh, 'styles/the-gallery/primitives.css', customCss);
  write(fresh, 'styles/tokens/tokens.css', customTokens);
  const baseline = read(fresh, 'tg.install.json');
  run(fresh, ['add', 'input']);
  assert.equal(read(fresh, 'styles/the-gallery/primitives.css'), customCss);
  assert.equal(read(fresh, 'styles/tokens/tokens.css'), customTokens);
  assert.equal(read(fresh, 'tg.install.json'), baseline); checks++;
  const beforeDiff = snapshot(fresh);
  const diff = run(fresh, ['diff']);
  assert.ok(diff.includes('my brand button') && diff.includes('purple') && diff.includes('preserved local changes'));
  assert.equal(snapshot(fresh), beforeDiff); checks++;
  const upstreamReset = read(upstream, 'platforms/web/components/reset.css') + '\n/* upstream reset update */\n';
  write(upstream, 'platforms/web/components/reset.css', upstreamReset);
  run(fresh, ['add', 'badge']);
  assert.equal(read(fresh, 'styles/the-gallery/reset.css'), upstreamReset); checks++;
  write(upstream, 'platforms/web/components/primitives.css', read(upstream, 'platforms/web/components/primitives.css') + '\n/* upstream new selectors */\n');
  const beforeConflict = snapshot(fresh);
  run(fresh, ['add', 'date-picker', '--dry-run'], 1);
  run(fresh, ['add', 'date-picker'], 1);
  assert.equal(snapshot(fresh), beforeConflict); checks++;
  run(fresh, ['add', 'date-picker', '--keep-local', 'styles/the-gallery/primitives.css', '--dry-run']);
  assert.equal(snapshot(fresh), beforeConflict); checks++;
  run(fresh, ['add', 'date-picker', '--keep-local', 'styles/the-gallery/primitives.css']);
  assert.equal(read(fresh, 'styles/the-gallery/primitives.css'), customCss);
  assert.equal(read(fresh, 'styles/tokens/tokens.css'), customTokens);
  assert.ok(read(fresh, 'scripts/the-gallery/runtime.js').includes('date-picker.js')); checks++;
  const resolvedSnapshot = snapshot(fresh);
  run(fresh, ['add', 'button']);
  assert.equal(snapshot(fresh), resolvedSnapshot); checks++;
  run(fresh, ['add', 'button', '--keep-local', 'typo.css'], 1);
  assert.equal(snapshot(fresh), resolvedSnapshot); checks++;
  const legacy = fixture('legacy');
  write(legacy, 'tg.config.json', JSON.stringify({ cssDir: './styles/the-gallery', tokensDir: './styles/tokens', components: ['button'] }));
  write(legacy, 'styles/the-gallery/primitives.css', '/* untracked customization */');
  write(legacy, 'styles/tokens/Light_tokens.json', '{"legacy":"brand"}');
  const old = snapshot(legacy);
  run(legacy, ['add', 'input'], 1);
  assert.equal(snapshot(legacy), old); checks++;
  write(legacy, 'styles/the-gallery/primitives.css', read(upstream, 'platforms/web/components/primitives.css'));
  run(legacy, ['add', 'input']);
  assert.equal(read(legacy, 'styles/tokens/Light_tokens.json'), '{"legacy":"brand"}');
  assert.ok(JSON.parse(read(legacy, 'tg.install.json')).files['styles/the-gallery/primitives.css']); checks++;
  const runtime = fixture('runtime');
  run(runtime, ['add', 'checkbox']);
  write(runtime, 'scripts/the-gallery/core.js', read(runtime, 'scripts/the-gallery/core.js') + '\n/* owned runtime */\n');
  run(runtime, ['add', 'radio']);
  assert.ok(read(runtime, 'scripts/the-gallery/core.js').includes('owned runtime')); checks++;
  write(runtime, 'scripts/the-gallery/runtime.js', read(runtime, 'scripts/the-gallery/runtime.js') + '\n// owned entry\n');
  const customRuntime = snapshot(runtime);
  run(runtime, ['add', 'date-picker'], 1);
  assert.equal(snapshot(runtime), customRuntime);
  assert.ok(run(runtime, ['diff']).includes('owned entry')); checks++;
  fs.unlinkSync(path.join(legacy, 'styles/the-gallery/reset.css'));
  const removed = snapshot(legacy);
  run(legacy, ['add', 'button'], 1);
  assert.equal(snapshot(legacy), removed); checks++;
  const linked = fixture('symlink');
  fs.symlinkSync(path.join(fresh, 'styles'), path.join(linked, 'styles'));
  const beforeLink = snapshot(fresh);
  run(linked, ['add', 'button'], 1);
  assert.equal(snapshot(fresh), beforeLink);
  assert.deepEqual(fs.readdirSync(linked), ['styles']); checks++;
  const invalid = fixture('invalid-provenance');
  write(invalid, 'tg.install.json', '{"version":2,"files":{}}');
  const beforeInvalid = snapshot(invalid);
  run(invalid, ['add', 'button'], 1);
  assert.equal(snapshot(invalid), beforeInvalid); checks++;
  const initConfig = read(fresh, 'tg.config.json');
  run(fresh, ['init']);
  assert.equal(read(fresh, 'tg.config.json'), initConfig); checks++;
  run(fresh, ['add', 'button', '--force'], 1);
  assert.equal(read(fresh, 'tg.config.json'), initConfig); checks++;
  console.log(`Validated ${checks} copy-and-own scenarios: dry run, canonical tokens, idempotence, local CSS/tokens/runtime preservation, upstream-only updates, conflicts without writes, legacy adoption, deletion and link protection, provenance, and read-only diff.`);
} finally {
  fs.rmSync(root, { recursive: true, force: true });
}
