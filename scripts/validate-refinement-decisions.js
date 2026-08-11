import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(repoRoot, 'registry.json');
const progressPath = path.join(repoRoot, 'docs', 'refinement', 'progress-overrides.json');
const coveragePath = path.join(repoRoot, 'docs', 'refinement', 'decision-coverage.json');
const decisionCodePattern = /^[A-Z][A-Z0-9]*-[A-Z]$/;
const packetStatuses = new Set(['owner-input-required', 'owner-decisions-recorded']);
const acceptedResponseStatuses = new Set(['accepted', 'accepted-for-removal']);

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const registry = readJson(registryPath);
const progress = readJson(progressPath);
const coverage = readJson(coveragePath);
const registrySlugs = new Set(Object.keys(registry.components));
const pendingSlugs = new Set(
  Object.keys(registry.components).filter(
    (slug) => progress.components[slug]?.readyForHumanReview !== true,
  ),
);
const coveredSlugs = new Map();
const errors = [];

if (!/^\d+\.\d+\.\d+$/.test(coverage.manifestVersion ?? '')) {
  errors.push('decision coverage: manifestVersion must be semantic x.y.z');
}

if (!/^\d{4}-\d{2}-\d{2}$/.test(coverage.snapshot ?? '')) {
  errors.push('decision coverage: snapshot must use YYYY-MM-DD');
}

if (
  typeof coverage.resolutionPath !== 'string'
  || !coverage.resolutionPath.startsWith('docs/refinement/')
) {
  errors.push('decision coverage: resolutionPath must point into docs/refinement');
}

let resolutionBody = '';
if (typeof coverage.resolutionPath === 'string') {
  const resolutionFilePath = path.join(repoRoot, coverage.resolutionPath);
  if (!fs.existsSync(resolutionFilePath)) {
    errors.push(`decision coverage: missing resolution ledger ${coverage.resolutionPath}`);
  } else {
    resolutionBody = fs.readFileSync(resolutionFilePath, 'utf8');
  }
}

if (!coverage.packets || typeof coverage.packets !== 'object' || Array.isArray(coverage.packets)) {
  errors.push('decision coverage: packets must be an object');
}

for (const [packetId, packet] of Object.entries(coverage.packets ?? {})) {
  if (!packetStatuses.has(packet.status)) {
    errors.push(`packet ${packetId}: unsupported status ${packet.status}`);
  }

  if (typeof packet.path !== 'string' || !packet.path.startsWith('docs/reports/')) {
    errors.push(`packet ${packetId}: path must point into docs/reports`);
    continue;
  }

  const packetPath = path.join(repoRoot, packet.path);
  if (!fs.existsSync(packetPath)) {
    errors.push(`packet ${packetId}: missing ${packet.path}`);
    continue;
  }

  const packetBody = fs.readFileSync(packetPath, 'utf8');
  if (!packetBody.includes(`Status: \`${packet.status}\``)) {
    errors.push(`packet ${packetId}: document status does not match the manifest`);
  }

  const sharedCodes = packet.sharedDecisionCodes ?? [];
  if (!Array.isArray(sharedCodes)) {
    errors.push(`packet ${packetId}: sharedDecisionCodes must be an array`);
  } else {
    for (const code of sharedCodes) {
      if (!decisionCodePattern.test(code)) {
        errors.push(`packet ${packetId}: invalid shared decision code ${code}`);
      } else if (!packetBody.includes(`\`${code}\``)) {
        errors.push(`packet ${packetId}: shared decision ${code} is absent from ${packet.path}`);
      }
    }
  }

  if (
    !packet.componentDecisions
    || typeof packet.componentDecisions !== 'object'
    || Array.isArray(packet.componentDecisions)
  ) {
    errors.push(`packet ${packetId}: componentDecisions must be an object`);
    continue;
  }

  for (const [slug, decisionCode] of Object.entries(packet.componentDecisions)) {
    if (!registrySlugs.has(slug)) {
      errors.push(`packet ${packetId}: unknown registry component ${slug}`);
    }
    if (!decisionCodePattern.test(decisionCode)) {
      errors.push(`packet ${packetId}: invalid decision code ${decisionCode} for ${slug}`);
    } else if (!packetBody.includes(`\`${decisionCode}\``)) {
      errors.push(`packet ${packetId}: decision ${decisionCode} for ${slug} is absent from ${packet.path}`);
    }
    if (coveredSlugs.has(slug)) {
      errors.push(`component ${slug}: assigned to packets ${coveredSlugs.get(slug).packetId} and ${packetId}`);
    } else {
      coveredSlugs.set(slug, { packetId, decisionCode, packetStatus: packet.status });
    }
  }
}

const packetList = Object.values(coverage.packets ?? {});
const recordedPackets = packetList.filter((packet) => packet.status === 'owner-decisions-recorded');

if (recordedPackets.length > 0) {
  if (recordedPackets.length !== packetList.length) {
    errors.push('decision coverage: packet resolution must be atomic; mixed pending/recorded status is unsupported');
  }
  if (!resolutionBody.includes('Status: `owner-decisions-recorded`')) {
    errors.push('decision coverage: resolution ledger status must be owner-decisions-recorded');
  }
  if (/clarification-required|remaining clarification/i.test(resolutionBody)) {
    errors.push('decision coverage: resolution ledger still contains an unresolved clarification marker');
  }

  const responseHeadings = [...resolutionBody.matchAll(/^### (.+)$/gm)];
  if (responseHeadings.length === 0) {
    errors.push('decision coverage: resolution ledger has no response records');
  }
  for (const [index, headingMatch] of responseHeadings.entries()) {
    const start = headingMatch.index ?? 0;
    const end = responseHeadings[index + 1]?.index ?? resolutionBody.length;
    const section = resolutionBody.slice(start, end);
    const heading = headingMatch[1] ?? 'unknown response';
    const status = section.match(/^- Status: `([^`]+)`$/m)?.[1];
    if (!acceptedResponseStatuses.has(status)) {
      errors.push(`decision coverage: ${heading} has unresolved status ${status ?? 'missing'}`);
    }
  }
}

for (const slug of pendingSlugs) {
  if (!coveredSlugs.has(slug)) {
    errors.push(`component ${slug}: not ready for human review and missing from decision coverage`);
  }
}

for (const [slug, assignment] of coveredSlugs) {
  if (!pendingSlugs.has(slug) && assignment.packetStatus !== 'owner-decisions-recorded') {
    errors.push(
      `component ${slug}: packet ${assignment.packetId} assigns ${assignment.decisionCode}, but the progress matrix already marks it ready`,
    );
  }
}

const packetCounts = Object.fromEntries(
  Object.entries(coverage.packets ?? {}).map(([packetId, packet]) => [
    packetId,
    Object.keys(packet.componentDecisions ?? {}).length,
  ]),
);

const coverageState = recordedPackets.length === packetList.length
  ? 'resolved component decision(s)'
  : 'pending component decision(s)';
console.log(
  `Validated refinement decision coverage: ${coveredSlugs.size} ${coverageState} across ${Object.keys(packetCounts).length} packet(s) (${Object.entries(packetCounts).map(([id, count]) => `${id}:${count}`).join(', ')}).`,
);

if (errors.length > 0) {
  console.error(errors.join('\n'));
  process.exit(1);
}
