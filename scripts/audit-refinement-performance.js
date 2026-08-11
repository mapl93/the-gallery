import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const budgetPath = path.join(repoRoot, 'docs', 'refinement', 'performance-budgets.json');
const jsonReportPath = path.join(repoRoot, 'docs', 'reports', 'component-refinement-performance.json');
const markdownReportPath = path.join(repoRoot, 'docs', 'reports', 'component-refinement-performance.md');
const shouldWrite = process.argv.includes('--write');
const allowGaps = process.argv.includes('--allow-gaps');
const webManifestPath = path.join(repoRoot, 'platforms', 'web', 'adapter.manifest.json');
const webManifest = fs.existsSync(webManifestPath) ? JSON.parse(fs.readFileSync(webManifestPath, 'utf8')) : null;

const budget = JSON.parse(fs.readFileSync(budgetPath, 'utf8'));
const errors = [];
const seenIds = new Set();

function gzipBytes(files) {
  const absoluteFiles = files.map((file) => path.join(repoRoot, file));
  const missing = absoluteFiles.filter((file) => !fs.existsSync(file));
  if (missing.length > 0) {
    throw new Error(`missing source file(s): ${missing.map((file) => path.relative(repoRoot, file)).join(', ')}`);
  }

  if (absoluteFiles.length === 1) {
    const result = spawnSync('gzip', ['-9', '-c', absoluteFiles[0]], {
      cwd: repoRoot,
      encoding: null,
      maxBuffer: 20 * 1024 * 1024,
    });
    if (result.status !== 0) {
      throw new Error(result.stderr?.toString().trim() || 'gzip failed');
    }
    return result.stdout.length;
  }

  const source = Buffer.concat(
    absoluteFiles.flatMap((file) => [fs.readFileSync(file), Buffer.from('\n')]),
  );
  const result = spawnSync('gzip', ['-9', '-c'], {
    cwd: repoRoot,
    input: source,
    encoding: null,
    maxBuffer: 20 * 1024 * 1024,
  });
  if (result.status !== 0) {
    throw new Error(result.stderr?.toString().trim() || 'gzip failed');
  }
  return result.stdout.length;
}

function measureSurface(surface) {
  if (surface.kind === 'install-family') {
    if (!webManifest) throw new Error('platforms/web/adapter.manifest.json is required for install-family budgets');
    const candidates = webManifest.components.filter((component) => component.category === surface.category);
    if (candidates.length === 0) throw new Error(`no web components found for category ${surface.category}`);
    return candidates
      .map((component) => {
        const files = [...new Set([...(component.install?.css ?? []), ...(component.install?.runtime ?? [])])];
        return { actualBytes: gzipBytes(files), files, measuredComponent: component.slug };
      })
      .sort((a, b) => b.actualBytes - a.actualBytes)[0];
  }
  if (surface.kind === 'runtime-module-set') {
    if (!webManifest) throw new Error('platforms/web/adapter.manifest.json is required for runtime-module-set budgets');
    const candidates = webManifest.outputs?.runtimeModules ?? [];
    if (candidates.length === 0) throw new Error('web manifest has no runtime modules');
    return candidates
      .map((file) => ({ actualBytes: gzipBytes([file]), files: [file], measuredComponent: path.basename(file, '.js') }))
      .sort((a, b) => b.actualBytes - a.actualBytes)[0];
  }
  return { actualBytes: gzipBytes(surface.files ?? []), files: surface.files ?? [], measuredComponent: null };
}

const surfaces = budget.surfaces.map((surface) => {
  if (seenIds.has(surface.id)) errors.push(`duplicate budget id ${surface.id}`);
  seenIds.add(surface.id);
  if (!Number.isInteger(surface.ceilingBytes) || surface.ceilingBytes <= 0) {
    errors.push(`${surface.id}: ceilingBytes must be a positive integer`);
  }
  if (!['install-family', 'runtime-module-set'].includes(surface.kind)
      && (!Array.isArray(surface.files) || surface.files.length === 0)) {
    errors.push(`${surface.id}: files must be a non-empty array`);
  }
  if (surface.kind === 'install-family' && (typeof surface.category !== 'string' || surface.category.length === 0)) {
    errors.push(`${surface.id}: install-family budgets require category`);
  }
  if (!['required', 'diagnostic'].includes(surface.enforcement ?? 'required')) {
    errors.push(`${surface.id}: enforcement must be required or diagnostic`);
  }
  if (surface.gapEvidence !== undefined && !Array.isArray(surface.gapEvidence)) {
    errors.push(`${surface.id}: gapEvidence must be an array when present`);
  }
  for (const evidencePath of surface.gapEvidence ?? []) {
    if (typeof evidencePath !== 'string' || evidencePath.length === 0) {
      errors.push(`${surface.id}: gapEvidence entries must be non-empty paths`);
    } else if (!fs.existsSync(path.join(repoRoot, evidencePath))) {
      errors.push(`${surface.id}: gap evidence does not exist: ${evidencePath}`);
    }
  }

  let measurement = { actualBytes: 0, files: surface.files ?? [], measuredComponent: null };
  try {
    measurement = measureSurface(surface);
  } catch (error) {
    errors.push(`${surface.id}: ${error.message}`);
  }
  const source = Buffer.concat(
    measurement.files.map((file) => fs.existsSync(path.join(repoRoot, file))
      ? fs.readFileSync(path.join(repoRoot, file))
      : Buffer.alloc(0)),
  );
  const actualBytes = measurement.actualBytes;
  const deltaBytes = surface.ceilingBytes - actualBytes;
  const enforcement = surface.enforcement ?? 'required';
  return {
    ...surface,
    enforcement,
    files: measurement.files,
    measuredComponent: measurement.measuredComponent,
    actualBytes,
    deltaBytes,
    status: deltaBytes >= 0 ? 'pass' : enforcement === 'diagnostic' ? 'diagnostic-overage' : 'gap',
    sha256: crypto.createHash('sha256').update(source).digest('hex'),
  };
});

const gaps = surfaces.filter((surface) => surface.status === 'gap');
const diagnosticOverages = surfaces.filter((surface) => surface.status === 'diagnostic-overage');
const documentedGaps = gaps.filter((surface) => (surface.gapEvidence ?? []).length > 0);
const undocumentedGaps = gaps.filter((surface) => (surface.gapEvidence ?? []).length === 0);
for (const gap of undocumentedGaps) {
  errors.push(`${gap.id}: current budget gap has no gapEvidence`);
}
const report = {
  reportVersion: '0.1.0',
  generatedAt: new Date().toISOString(),
  budgetVersion: budget.budgetVersion,
  compression: budget.compression,
  summary: {
    surfaces: surfaces.length,
    pass: surfaces.filter((surface) => surface.status === 'pass').length,
    gaps: gaps.length,
    documentedGaps: documentedGaps.length,
    undocumentedGaps: undocumentedGaps.length,
    globalGaps: gaps.filter((surface) => surface.kind === 'global').length,
    familyGaps: gaps.filter((surface) => surface.kind === 'family').length,
    installFamilyGaps: gaps.filter((surface) => surface.kind === 'install-family').length,
    diagnosticOverages: diagnosticOverages.length,
  },
  surfaces,
};

const markdown = `# Component Refinement Performance Audit

Generated from \`docs/refinement/performance-budgets.json\` using
\`${budget.compression}\`. A gap is not an implicit budget increase; the fixed
v1.0.0 release gates apply to dependency-closed install slices and modular
runtime outputs. Complete aggregate bundles remain visible as diagnostic
compatibility measurements and do not redefine what a consumer installs.

## Summary

| Metric | Count |
| --- | ---: |
| Surfaces | ${report.summary.surfaces} |
| Passing | ${report.summary.pass} |
| Gaps | ${report.summary.gaps} |
| Documented gaps | ${report.summary.documentedGaps} |
| Undocumented gaps | ${report.summary.undocumentedGaps} |
| Global gaps | ${report.summary.globalGaps} |
| Family gaps | ${report.summary.familyGaps} |
| Install-family gaps | ${report.summary.installFamilyGaps} |
| Diagnostic overages | ${report.summary.diagnosticOverages} |

## Current Measurements

| Surface | Kind | Enforcement | Worst component/module | Gzip bytes | Ceiling | Headroom / overage | Result | Gap evidence |
| --- | --- | --- | --- | ---: | ---: | ---: | --- | --- |
${surfaces.map((surface) => `| ${surface.label} | ${surface.kind} | ${surface.enforcement} | ${surface.measuredComponent ?? '—'} | ${surface.actualBytes} | ${surface.ceilingBytes} | ${surface.deltaBytes} | ${surface.status} | ${(surface.gapEvidence ?? []).map((item) => `\`${item}\``).join('<br>') || '—'} |`).join('\n')}

Positive headroom is available budget. A negative value is the exact current
overage. Component-owned assets and passive-component runtime remain separate
zero-tolerance policy gates in \`docs/COMPONENT-REFINEMENT.md\`.
`;

if (shouldWrite) {
  fs.mkdirSync(path.dirname(jsonReportPath), { recursive: true });
  fs.writeFileSync(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(markdownReportPath, markdown);
}

console.log(
  `Component refinement performance: ${surfaces.length} surfaces, ${report.summary.pass} pass, ${report.summary.gaps} required gap(s), ${report.summary.diagnosticOverages} diagnostic overage(s).`,
);
for (const gap of gaps) {
  console.log(`- ${gap.id}: ${gap.actualBytes}/${gap.ceilingBytes} B (${Math.abs(gap.deltaBytes)} B over)`);
}
for (const item of diagnosticOverages) {
  console.log(`- ${item.id}: diagnostic ${item.actualBytes}/${item.ceilingBytes} B (${Math.abs(item.deltaBytes)} B over)`);
}

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}

if (gaps.length > 0 && !allowGaps) process.exit(1);
