import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const policyFile = 'docs/refinement/performance-budgets.json';
const reportBase = 'docs/reports/component-refinement-performance';
const hasText = (value) => typeof value === 'string' && value.trim().length > 0;
const isRecord = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

export function validatePolicy(policy) {
  if (!isRecord(policy)) return ['policy must be an object'];
  const errors = [];
  const ids = new Set();
  if (policy.budgetVersion !== '3.0.0') errors.push('budgetVersion must be 3.0.0');
  if (policy.compression !== 'gzip-level-9-no-name') errors.push('unsupported compression method');
  if (!Array.isArray(policy.surfaces) || !policy.surfaces.length) errors.push('surfaces must be non-empty');
  if (!isRecord(policy.targets) || !Object.keys(policy.targets).length) errors.push('targets must be configured');
  for (const [target, context] of Object.entries(policy.targets ?? {})) {
    if (!['web', 'shopify'].includes(target)) errors.push(`unsupported target ${target}`);
    if (!hasText(context?.scope) || !Array.isArray(context?.unverified) || !context.unverified.every(hasText)) errors.push(`${target}: scope and unverified evidence boundaries are required`);
  }
  for (const surface of Array.isArray(policy.surfaces) ? policy.surfaces : []) {
    if (!isRecord(surface)) { errors.push('surface must be an object'); continue; }
    const fail = (message) => errors.push(`${surface.id}: ${message}`);
    if (!hasText(surface.id) || ids.has(surface.id)) fail('missing or duplicate surface id');
    ids.add(surface.id);
    if (!policy.targets?.[surface.target]) fail('explicit configured target is required');
    if (!['global', 'runtime', 'install-family', 'runtime-module-set', 'asset-set'].includes(surface.kind)) fail('unsupported kind');
    if (surface.kind === 'install-family' && !hasText(surface.category)) fail('install-family requires category');
    if (['global', 'runtime'].includes(surface.kind) && (!Array.isArray(surface.files) || !surface.files.length)) fail('files must be non-empty');
    if (surface.kind === 'asset-set' && (!hasText(surface.directory) || !['.css', '.js'].includes(surface.extension))) fail('asset-set requires directory and .css/.js extension');
    if (surface.files !== undefined && !Array.isArray(surface.files)) fail('files must be an array');
    for (const file of [...(Array.isArray(surface.files) ? surface.files : []), ...(surface.directory ? [surface.directory] : [])]) {
      if (typeof file !== 'string' || !file.startsWith(`platforms/${surface.target}/`) || path.normalize(file) !== file) fail('measurement paths must belong to the declared target');
    }
    if ('ceilingBytes' in surface || 'enforcement' in surface) fail('global ceilings are retired; a target rule with provenance is required');
    const rule = surface.rule;
    if (rule === undefined) continue;
    if (!isRecord(rule)) { fail('rule must be an object'); continue; }
    if (!['tool-guideline', 'platform-requirement'].includes(rule.classification)) fail('rule classification must identify its external basis');
    if (!['advisory', 'required'].includes(rule.enforcement)) fail('rule enforcement must be advisory or required');
    if (rule.enforcement === 'required' && rule.classification !== 'platform-requirement') fail('a tool guideline cannot become a required platform limit');
    if (!['rawBytes', 'gzipBytes'].includes(rule.metric)) fail('rule metric must specify rawBytes or gzipBytes');
    if (!Number.isInteger(rule.ceilingBytes) || rule.ceilingBytes <= 0) fail('rule ceilingBytes must be a positive integer');
    if (!hasText(rule.applicability) || !hasText(rule.source?.authority)) fail('rule applicability and source authority are required');
    if (!/^https:\/\/[^\s]+$/.test(rule.source?.url ?? '') || !/^\d{4}-\d{2}-\d{2}$/.test(rule.source?.checkedOn ?? '')) fail('rule requires a primary-source URL and verification date');
  }
  return errors;
}

function measureFiles(root, files) {
  if (!files.length) throw new Error('empty file selection cannot be measured');
  const buffers = files.map((file) => fs.readFileSync(path.join(root, file)));
  // Retain the historical concatenated-slice model; this is not HTTP transfer size.
  const payload = Buffer.concat(buffers.length === 1 ? buffers : buffers.flatMap((buffer) => [buffer, Buffer.from('\n')]));
  const result = spawnSync('gzip', ['-9', '-n', '-c'], { input: payload, maxBuffer: 20 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(result.error?.message || result.stderr?.toString().trim() || 'gzip failed');
  return {
    files,
    rawBytes: buffers.reduce((total, buffer) => total + buffer.length, 0),
    gzipBytes: result.stdout.length,
    sha256: crypto.createHash('sha256').update(payload).digest('hex'),
  };
}

function resultStatus(rule, measurement) {
  if (!rule) return 'observed';
  const exceeded = measurement[rule.metric] > rule.ceilingBytes;
  return rule.enforcement === 'required'
    ? (exceeded ? 'gap' : 'pass')
    : (exceeded ? 'advisory-overage' : 'within-guideline');
}

export function createPerformanceReport(policy, root = repoRoot) {
  const errors = validatePolicy(policy);
  const surfaces = [];
  const cache = new Map();
  const measure = (files) => {
    const key = JSON.stringify(files);
    if (!cache.has(key)) cache.set(key, measureFiles(root, files));
    return cache.get(key);
  };
  if (!errors.length) for (const surface of policy.surfaces) {
    try {
      let candidates;
      if (['install-family', 'runtime-module-set'].includes(surface.kind)) {
        const manifest = JSON.parse(fs.readFileSync(path.join(root, 'platforms', surface.target, 'adapter.manifest.json'), 'utf8'));
        candidates = surface.kind === 'install-family'
          ? manifest.components.filter((component) => component.category === surface.category).map((component) => ({
            files: [...new Set([...(component.install?.css ?? []), ...(component.install?.runtime ?? [])])],
            measuredComponent: component.slug,
          }))
          : (manifest.outputs?.runtimeModules ?? []).map((file) => ({ files: [file], measuredComponent: path.basename(file, '.js') }));
      } else if (surface.kind === 'asset-set') {
        candidates = fs.readdirSync(path.join(root, surface.directory), { withFileTypes: true })
          .filter((entry) => entry.isFile() && entry.name.endsWith(surface.extension))
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((entry) => ({ files: [`${surface.directory}/${entry.name}`], measuredComponent: entry.name }));
      } else {
        candidates = [{ files: surface.files, measuredComponent: null }];
      }
      if (!candidates.length) throw new Error('no matching assets/components; evidence is unavailable');
      const metric = surface.rule?.metric ?? 'gzipBytes';
      const measurements = candidates.map((candidate) => {
        for (const file of candidate.files) {
          if (!file.startsWith(`platforms/${surface.target}/`) || path.normalize(file) !== file) throw new Error(`asset is outside declared target: ${file}`);
        }
        const measured = { ...measure(candidate.files), measuredComponent: candidate.measuredComponent };
        return { ...measured, status: resultStatus(surface.rule, measured) };
      }).sort((a, b) => b[metric] - a[metric]);
      surfaces.push({
        ...surface, ...measurements[0], rankedBy: metric, candidatesMeasured: measurements.length,
        ...(surface.kind === 'asset-set' ? { assetMeasurements: measurements } : {}),
      });
    } catch (error) {
      errors.push(`${surface.id}: ${error.message}`);
      surfaces.push({ ...surface, status: 'measurement-error', rawBytes: null, gzipBytes: null, sha256: null, error: error.message });
    }
  }
  const count = (status) => surfaces.filter((surface) => surface.status === status).length;
  return {
    reportVersion: '0.2.0', generatedAt: new Date().toISOString(), budgetVersion: policy?.budgetVersion,
    compression: policy?.compression, targets: policy?.targets,
    summary: {
      surfaces: surfaces.length, observed: count('observed'), requiredPass: count('pass'), requiredGaps: count('gap'),
      withinGuideline: count('within-guideline'), advisoryOverages: count('advisory-overage'),
      measurementErrors: count('measurement-error'), errors: errors.length,
    },
    surfaces, errors,
  };
}

export function renderMarkdown(report) {
  const lines = [
    '# Component Refinement Performance Audit', '',
    `Policy v${report.budgetVersion}; generated from \`${policyFile}\`. See ADR 0310.`, '',
    'Sizes are observations unless a sourced target rule is attached. Advisory overages do not block component batches.',
    'Only applicable platform requirements may be required byte gates. A successful inventory is not performance certification.', '',
    `Summary: ${report.summary.observed} observations, ${report.summary.requiredPass} required passes, ${report.summary.requiredGaps} required gaps, ${report.summary.withinGuideline} within guidelines, ${report.summary.advisoryOverages} advisory overages, ${report.summary.errors} errors.`, '',
    `Compression: \`${report.compression}\` (local gzip -9 -n -c, no filename or timestamp). Raw bytes sum file contents.`,
    'Install slices are dependency-closed CSS/runtime concatenations separated by newlines, with tokens measured separately.',
    'Neither concatenated gzip nor the complete asset inventory represents actual page transfer, CDN minification, request count or execution cost.', '',
  ];
  for (const [target, context] of Object.entries(report.targets ?? {})) {
    if (!isRecord(context) || !Array.isArray(context.unverified)) continue;
    lines.push(`## ${target}`, '', context.scope, '',
      '| Surface | Largest component/asset | Raw bytes | Gzip bytes | Target rule | Result |',
      '| --- | --- | ---: | ---: | --- | --- |');
    for (const surface of report.surfaces.filter((item) => item.target === target)) {
      const rule = surface.rule;
      lines.push(`| ${surface.label} | ${surface.measuredComponent ?? '—'} | ${surface.rawBytes ?? 'unavailable'} | ${surface.gzipBytes ?? 'unavailable'} | ${rule ? `${rule.ceilingBytes} ${rule.metric}; ${rule.enforcement}` : 'None'} | ${surface.status} |`);
    }
    lines.push('', 'Unverified by this report:', '', ...context.unverified.map((item) => `- ${item}`), '');
    for (const surface of report.surfaces.filter((item) => item.target === target && item.rule)) {
      const { rule } = surface;
      lines.push(`### ${surface.id}`, '', rule.applicability, '',
        `[${rule.source.authority}](${rule.source.url}), checked ${rule.source.checkedOn}.`, '', rule.source.note ?? '', '');
      for (const url of rule.source.implementationUrls ?? []) lines.push(`- [Implementation evidence](${url})`);
      const overages = (surface.assetMeasurements ?? []).filter((item) => item.status === 'advisory-overage' || item.status === 'gap');
      if (overages.length) lines.push('', 'Assets above this reference:', '', ...overages.map((item) => `- \`${item.files[0]}\`: ${item.rawBytes} raw bytes, ${item.gzipBytes} gzip bytes.`), '');
    }
  }
  lines.push('## Historical references and limits of evidence', '',
    'The former 64 KiB token ceiling, family ceilings and runtime ceilings remain in JSON as historicalReference only.',
    'They are retired internal policy, not external standards. Historical reports retain their original measurements and outcomes.',
    'The old single-file gzip method included a filename header; current measurements omit it. This method change is not an asset optimization.',
    'Passive-component behavior and component-asset ownership remain architectural contracts under docs/COMPONENT-REFINEMENT.md.', '');
  if (report.errors.length) lines.push('## Errors', '', ...report.errors.map((error) => `- ${error}`), '');
  return lines.join('\n');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.includes('--allow-gaps')) throw new Error('--allow-gaps is retired; required target failures cannot be waived by this audit');
  const report = createPerformanceReport(JSON.parse(fs.readFileSync(path.join(repoRoot, policyFile), 'utf8')));
  if (process.argv.includes('--write')) {
    fs.writeFileSync(path.join(repoRoot, `${reportBase}.json`), `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(path.join(repoRoot, `${reportBase}.md`), renderMarkdown(report));
  }
  console.log(`Target performance inventory: ${report.summary.surfaces} surfaces, ${report.summary.observed} observed, ${report.summary.requiredGaps} required gaps, ${report.summary.advisoryOverages} advisory overages, ${report.summary.errors} errors. Not target certification.`);
  for (const surface of report.surfaces.filter((item) => ['advisory-overage', 'gap'].includes(item.status))) console.log(`- ${surface.target}/${surface.id}: ${surface[surface.rule.metric]}/${surface.rule.ceilingBytes} ${surface.rule.metric} (${surface.status})`);
  if (report.errors.length) console.error(report.errors.join('\n'));
  if (report.errors.length || report.summary.requiredGaps) process.exitCode = 1;
}
