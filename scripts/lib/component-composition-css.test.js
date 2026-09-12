import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { componentCompositionCss } from './component-composition-css.js';

function fixture(t) {
  const rootDir = fs.mkdtempSync(path.join(os.tmpdir(), 'gallery-composition-'));
  t.after(() => fs.rmSync(rootDir, { recursive: true, force: true }));
  fs.mkdirSync(path.join(rootDir, 'components/contracts'), { recursive: true });
  fs.writeFileSync(path.join(rootDir, 'base.css'), '.unrelated { color: var(--unrelated); }\n/* Public Prose contract */\n.prose { color: var(--prose-only); }\n/* End public Prose contract. */');
  fs.writeFileSync(path.join(rootDir, 'body.css'), '.article-body { color: var(--body-only); }');
  fs.writeFileSync(path.join(rootDir, 'other.css'), '.other { color: var(--other-only); }');
  return { rootDir, compositionCss: new Map(), registry: { base: { foundations: { file: 'base.css' } }, components: { body: { file: 'body.css' }, other: { file: 'other.css' } } } };
}

test('only declared required Prose composition receives its bounded foundation source', t => {
  const ctx = fixture(t);
  fs.writeFileSync(path.join(ctx.rootDir, 'components/contracts/body.contract.json'), JSON.stringify({ anatomy: [{ required: true, className: '.prose' }] }));
  const body = componentCompositionCss('body', ctx);
  assert.match(body, /--prose-only/);
  assert.doesNotMatch(body, /--unrelated/);
  assert.doesNotMatch(componentCompositionCss('other', ctx), /--prose-only/);
  ctx.registry.components.other.dependencies = ['body']; ctx.compositionCss.clear();
  assert.match(componentCompositionCss('other', ctx), /--prose-only/);
});

test('optional anatomy cannot silently authorize a foundational token dependency', t => {
  const ctx = fixture(t);
  fs.writeFileSync(path.join(ctx.rootDir, 'components/contracts/body.contract.json'), JSON.stringify({ anatomy: [{ required: false, className: '.prose' }] }));
  assert.doesNotMatch(componentCompositionCss('body', ctx), /--prose-only/);
});

test('missing source boundary fails instead of weakening validation', t => {
  const ctx = fixture(t);
  fs.writeFileSync(path.join(ctx.rootDir, 'components/contracts/body.contract.json'), JSON.stringify({ anatomy: [{ required: true, className: '.prose' }] }));
  fs.writeFileSync(path.join(ctx.rootDir, 'base.css'), '.prose {}');
  assert.throws(() => componentCompositionCss('body', ctx), /source boundary/);
});
