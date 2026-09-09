import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import test from 'node:test';
import { createPerformanceReport, renderMarkdown, validatePolicy } from './audit-refinement-performance.js';

function fixture(t) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'gallery-performance-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const write = (file, content) => {
    fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true });
    fs.writeFileSync(path.join(root, file), content);
  };
  write('platforms/web/tokens.css', 'a'.repeat(2048));
  return { root, write };
}

function policy(surface = {}) {
  return {
    budgetVersion: '3.0.0', compression: 'gzip-level-9-no-name',
    targets: { web: { scope: 'Test Web target', unverified: ['Page load not measured.'] } },
    surfaces: [{ id: 'tokens', label: 'Test tokens', target: 'web', kind: 'global', files: ['platforms/web/tokens.css'], ...surface }],
  };
}

function rule(overrides = {}) {
  return {
    classification: 'tool-guideline', enforcement: 'advisory', metric: 'rawBytes', ceilingBytes: 1000,
    applicability: 'Synthetic local fixture; not a production limit.',
    source: { url: 'https://example.org/test-rule', checkedOn: '2026-09-09', authority: 'Test fixture' },
    ...overrides,
  };
}

test('retired ceilings cannot block or masquerade as a performance pass', (t) => {
  const { root } = fixture(t);
  const report = createPerformanceReport(policy({ historicalReference: { ceilingBytes: 1 } }), root);
  assert.equal(report.surfaces[0].status, 'observed');
  assert.equal(report.summary.requiredPass, 0);
  assert.equal(report.summary.requiredGaps, 0);
  assert.deepEqual(report.errors, []);
  assert.match(renderMarkdown(report), /Page load not measured/);
});

test('every measurement belongs to one configured target', () => {
  assert.ok(validatePolicy(policy({ target: undefined })).length);
  assert.ok(validatePolicy(policy({ files: ['platforms/shopify/assets/tokens.css'] })).length);
  assert.ok(validatePolicy(policy({ files: ['platforms/web/../../tokens/source.json'] })).length);
});

test('malformed policy remains a reportable error', () => {
  for (const config of [null, { ...policy(), surfaces: {} }, policy({ files: {} }), policy({ rule: null }), { ...policy(), targets: { web: null } }]) {
    const report = createPerformanceReport(config);
    assert.ok(report.summary.errors > 0);
    assert.equal(report.summary.requiredPass, 0);
    assert.match(renderMarkdown(report), /## Errors/);
  }
});

test('old global enforcement and unsourced required rules are rejected', () => {
  assert.ok(validatePolicy(policy({ ceilingBytes: 65536, enforcement: 'required' })).length);
  assert.ok(validatePolicy(policy({ rule: { ceilingBytes: 1000, enforcement: 'required' } })).length);
  assert.ok(validatePolicy(policy({ rule: rule({ source: undefined }) })).length);
  assert.ok(validatePolicy(policy({ rule: rule({ metric: 'bytes' }) })).length);
});

test('a configurable tool guideline cannot silently become a platform requirement', () => {
  assert.match(validatePolicy(policy({ rule: rule({ enforcement: 'required' }) })).join('\n'), /guideline cannot become/);
});

test('raw guidance uses raw size even when gzip falls below its threshold', (t) => {
  const { root } = fixture(t);
  const report = createPerformanceReport(policy({ rule: rule() }), root);
  assert.equal(report.surfaces[0].rawBytes, 2048);
  assert.ok(report.surfaces[0].gzipBytes < 1000);
  assert.equal(report.surfaces[0].status, 'advisory-overage');
  assert.equal(report.summary.requiredGaps, 0);
});

test('required sourced fixture limits fail above their threshold and pass exactly at it', (t) => {
  const { root } = fixture(t);
  const required = rule({ classification: 'platform-requirement', enforcement: 'required' });
  assert.equal(createPerformanceReport(policy({ rule: required }), root).summary.requiredGaps, 1);
  const boundary = createPerformanceReport(policy({ rule: { ...required, ceilingBytes: 2048 } }), root);
  assert.equal(boundary.summary.requiredPass, 1);
});

test('missing assets yield unavailable evidence, never a zero-byte pass', (t) => {
  const { root } = fixture(t);
  const report = createPerformanceReport(policy({ files: ['platforms/web/missing.css'], rule: rule() }), root);
  assert.equal(report.summary.errors, 1);
  assert.equal(report.surfaces[0].status, 'measurement-error');
  assert.equal(report.surfaces[0].rawBytes, null);
  assert.equal(report.surfaces[0].gzipBytes, null);
  assert.match(renderMarkdown(report), /unavailable/);
});

test('asset inventory measures all matching files and reports every overage', (t) => {
  const { root, write } = fixture(t);
  write('platforms/web/assets/small.css', 'a');
  write('platforms/web/assets/large.css', 'b'.repeat(4000));
  write('platforms/web/assets/medium.css', 'c'.repeat(2000));
  write('platforms/web/assets/ignored.js', 'd'.repeat(9000));
  const report = createPerformanceReport(policy({ kind: 'asset-set', files: undefined, directory: 'platforms/web/assets', extension: '.css', rule: rule() }), root);
  assert.deepEqual(report.errors, []);
  const surface = report.surfaces[0];
  assert.equal(surface.candidatesMeasured, 3);
  assert.equal(surface.measuredComponent, 'large.css');
  assert.equal(surface.assetMeasurements.filter((item) => item.status === 'advisory-overage').length, 2);
  assert.match(renderMarkdown(report), /medium.css/);
});

test('empty asset selections are errors', (t) => {
  const { root } = fixture(t);
  fs.mkdirSync(path.join(root, 'platforms/web/assets'));
  const report = createPerformanceReport(policy({ kind: 'asset-set', files: undefined, directory: 'platforms/web/assets', extension: '.js' }), root);
  assert.equal(report.summary.measurementErrors, 1);
});

test('gzip measurements are independent of filenames', (t) => {
  const { root, write } = fixture(t);
  write('platforms/web/a-longer-name.css', 'a'.repeat(2048));
  const a = createPerformanceReport(policy(), root).surfaces[0];
  const b = createPerformanceReport(policy({ files: ['platforms/web/a-longer-name.css'] }), root).surfaces[0];
  assert.equal(a.gzipBytes, b.gzipBytes);
  assert.equal(a.sha256, b.sha256);
});

test('install-family measures the declared dependency closure and rejects empty installs', (t) => {
  const { root, write } = fixture(t);
  write('platforms/web/runtime.js', 'console.log(1);');
  const manifest = { components: [{ slug: 'field', category: 'forms', install: { css: ['platforms/web/tokens.css'], runtime: ['platforms/web/runtime.js'] } }] };
  write('platforms/web/adapter.manifest.json', JSON.stringify(manifest));
  const config = policy({ kind: 'install-family', files: undefined, category: 'forms' });
  const report = createPerformanceReport(config, root);
  assert.equal(report.surfaces[0].rawBytes, 2048 + Buffer.byteLength('console.log(1);'));
  manifest.components[0].install = {};
  write('platforms/web/adapter.manifest.json', JSON.stringify(manifest));
  assert.equal(createPerformanceReport(config, root).summary.measurementErrors, 1);
});

test('CLI preserves failures, writes honest reports and does not allow a gap bypass', (t) => {
  const { root, write } = fixture(t);
  write('package.json', '{"type":"module"}');
  write('scripts/audit-refinement-performance.js', fs.readFileSync(fileURLToPath(new URL('./audit-refinement-performance.js', import.meta.url))));
  fs.mkdirSync(path.join(root, 'docs/reports'), { recursive: true });
  const run = (config, args = ['--write']) => {
    write('docs/refinement/performance-budgets.json', JSON.stringify(config));
    return spawnSync(process.execPath, ['scripts/audit-refinement-performance.js', ...args], { cwd: root, encoding: 'utf8' });
  };
  assert.equal(run(policy({ rule: rule() })).status, 0);
  assert.equal(run(policy({ rule: rule({ classification: 'platform-requirement', enforcement: 'required' }) })).status, 1);
  const report = JSON.parse(fs.readFileSync(path.join(root, 'docs/reports/component-refinement-performance.json')));
  assert.equal(report.summary.requiredGaps, 1);
  assert.equal(run(policy({ files: ['platforms/web/missing.css'] })).status, 1);
  assert.equal(run(policy(), ['--allow-gaps']).status, 1);
});
