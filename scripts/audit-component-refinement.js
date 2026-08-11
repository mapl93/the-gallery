import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(repoRoot, 'registry.json');
const certificationPath = path.join(repoRoot, 'docs', 'reports', 'component-web-certification.json');
const overridesPath = path.join(repoRoot, 'docs', 'refinement', 'progress-overrides.json');
const decisionCoveragePath = path.join(repoRoot, 'docs', 'refinement', 'decision-coverage.json');
const dossiersDir = path.join(repoRoot, 'docs', 'refinement', 'dossiers');
const reportsDir = path.join(repoRoot, 'docs', 'reports');
const jsonReportPath = path.join(reportsDir, 'component-refinement-program.json');
const markdownReportPath = path.join(reportsDir, 'component-refinement-program.md');
const dotReportPath = path.join(reportsDir, 'component-dependency-graph.dot');
const shouldWrite = process.argv.includes('--write');

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const registry = readJson(registryPath);
const certification = readJson(certificationPath);
const overrides = readJson(overridesPath);
const decisionCoverage = readJson(decisionCoveragePath);
const registryEntries = Object.entries(registry.components);
const registryIndex = new Map(registryEntries.map(([slug], index) => [slug, index]));
const componentsBySlug = new Map(registryEntries);
const certificationBySlug = new Map(certification.components.map((component) => [component.slug, component]));
const decisionBySlug = new Map(
  Object.entries(decisionCoverage.packets).flatMap(([packetId, packet]) =>
    Object.entries(packet.componentDecisions).map(([slug, code]) => [
      slug,
      {
        packetId,
        proposalCode: code,
        packetStatus: packet.status,
        packetPath: packet.path,
        resolutionPath: decisionCoverage.resolutionPath,
      },
    ]),
  ),
);

const phaseDefinitions = [
  { id: 1, name: 'Foundations and tokens' },
  { id: 2, name: 'Primitives' },
  { id: 3, name: 'Fields and controls' },
  { id: 4, name: 'Navigation, overlays, and interaction' },
  { id: 5, name: 'Commerce primitives' },
  { id: 6, name: 'Composed components' },
  { id: 7, name: 'Sections and pages' },
];

const fieldControls = new Set([
  'input', 'select', 'textarea', 'checkbox', 'radio', 'quantity-selector',
]);
const commercePrimitives = new Set([
  'badge', 'tag', 'price', 'rating', 'skeleton', 'empty-state', 'avatar',
]);

function phaseFor(slug, component) {
  if (fieldControls.has(slug) || component.category === 'forms') return phaseDefinitions[2];
  if (commercePrimitives.has(slug)) return phaseDefinitions[4];
  if (component.category === 'primitives' || slug === 'card' || slug === 'divider') return phaseDefinitions[1];
  if (component.category === 'layout' || component.category === 'global') return phaseDefinitions[3];
  if (component.category === 'sections' || component.category === 'pages' || slug === 'coming-soon') return phaseDefinitions[6];
  return phaseDefinitions[5];
}

function compareReadySlugs(left, right) {
  const leftComponent = componentsBySlug.get(left);
  const rightComponent = componentsBySlug.get(right);
  const phaseDifference = phaseFor(left, leftComponent).id - phaseFor(right, rightComponent).id;
  return phaseDifference || registryIndex.get(left) - registryIndex.get(right);
}

const missingDependencies = [];
const dependents = new Map(registryEntries.map(([slug]) => [slug, []]));
const indegree = new Map(registryEntries.map(([slug]) => [slug, 0]));

for (const [slug, component] of registryEntries) {
  for (const dependency of component.dependencies ?? []) {
    if (!componentsBySlug.has(dependency)) {
      missingDependencies.push({ slug, dependency });
      continue;
    }
    dependents.get(dependency).push(slug);
    indegree.set(slug, indegree.get(slug) + 1);
  }
}

let ready = registryEntries
  .map(([slug]) => slug)
  .filter((slug) => indegree.get(slug) === 0)
  .sort(compareReadySlugs);
const topologicalOrder = [];

while (ready.length > 0) {
  const slug = ready.shift();
  topologicalOrder.push(slug);
  for (const dependent of dependents.get(slug)) {
    indegree.set(dependent, indegree.get(dependent) - 1);
    if (indegree.get(dependent) === 0) {
      ready.push(dependent);
      ready.sort(compareReadySlugs);
    }
  }
}

const cycles = registryEntries
  .map(([slug]) => slug)
  .filter((slug) => !topologicalOrder.includes(slug));

function dependencyDepth(slug, visiting = new Set(), memo = new Map()) {
  if (memo.has(slug)) return memo.get(slug);
  if (visiting.has(slug)) return null;
  visiting.add(slug);
  const dependencies = componentsBySlug.get(slug)?.dependencies ?? [];
  const depths = dependencies.map((dependency) => dependencyDepth(dependency, visiting, memo));
  visiting.delete(slug);
  if (depths.some((value) => value === null)) return null;
  const depth = dependencies.length === 0 ? 0 : Math.max(...depths) + 1;
  memo.set(slug, depth);
  return depth;
}

const calibration = ['button', 'select', 'product-card'];
const reviewOrder = [
  ...calibration,
  ...topologicalOrder.filter((slug) => !calibration.includes(slug)),
];

const unknownOverrideSlugs = Object.keys(overrides.components).filter((slug) => !componentsBySlug.has(slug));
const components = reviewOrder.map((slug, index) => {
  const registryComponent = componentsBySlug.get(slug);
  const certificationComponent = certificationBySlug.get(slug);
  const override = overrides.components[slug] ?? {};
  const dossierRelativePath = `docs/refinement/dossiers/${slug}.md`;
  const dossierPresent = fs.existsSync(path.join(repoRoot, dossierRelativePath));
  const reportPresent = override.report ? fs.existsSync(path.join(repoRoot, override.report)) : false;
  const phase = phaseFor(slug, registryComponent);

  return {
    reviewOrder: index + 1,
    batch: calibration.includes(slug) ? 'calibration' : `phase-${phase.id}`,
    phase,
    dependencyDepth: dependencyDepth(slug),
    slug,
    registryId: registryComponent.id,
    name: registryComponent.name,
    category: registryComponent.category,
    dependencies: registryComponent.dependencies ?? [],
    contractStatus: certificationComponent?.contractStatus ?? 'missing',
    automatedGate: certificationComponent?.automatedGate ?? 'missing',
    dossier: {
      path: dossierRelativePath,
      present: dossierPresent,
      status: override.dossierStatus ?? (dossierPresent ? 'present' : 'not-started'),
    },
    implementationStatus: override.implementationStatus ?? 'baseline-only',
    evidenceStatus: override.evidenceStatus ?? 'mobile-desktop-baseline',
    humanReview: override.humanReview ?? 'pending',
    readyForHumanReview: override.readyForHumanReview === true,
    ownerDecision: decisionBySlug.get(slug) ?? null,
    report: override.report ?? null,
    reportPresent,
    note: override.note ?? '',
  };
});

const overrideErrors = components.flatMap((component) => {
  const override = overrides.components[component.slug];
  if (!override) return [];
  const errors = [];
  if (override.dossierStatus !== 'not-started' && !component.dossier.present) {
    errors.push(`${component.slug}: dossier status is ${override.dossierStatus} but ${component.dossier.path} is missing`);
  }
  if (override.report && !component.reportPresent) {
    errors.push(`${component.slug}: report ${override.report} is missing`);
  }
  return errors;
});

const summary = {
  registryComponents: registryEntries.length,
  phases: phaseDefinitions.length,
  dependencyEdges: registryEntries.reduce((sum, [, component]) => sum + (component.dependencies?.length ?? 0), 0),
  dependencyDepth: Math.max(...components.map((component) => component.dependencyDepth ?? 0)),
  missingDependencies: missingDependencies.length,
  cycles: cycles.length,
  dossiersPresent: components.filter((component) => component.dossier.present).length,
  researched: components.filter((component) => !['not-started', 'present', 'baseline'].includes(component.dossier.status)).length,
  humanReviewReady: components.filter((component) => component.readyForHumanReview).length,
  ownerDecisionCovered: components.filter(
    (component) => !component.readyForHumanReview && component.ownerDecision,
  ).length,
  ownerDecisionsRecorded: components.filter(
    (component) => component.ownerDecision?.packetStatus === 'owner-decisions-recorded',
  ).length,
  acceptedDirectionImplementationPending: components.filter(
    (component) => (
      !component.readyForHumanReview
      && component.ownerDecision?.packetStatus === 'owner-decisions-recorded'
    ),
  ).length,
  humanApproved: components.filter((component) => component.humanReview.startsWith('approved')).length,
  automatedGatePass: components.filter((component) => component.automatedGate === 'pass').length,
};

const report = {
  reportVersion: '0.2.0',
  generatedAt: new Date().toISOString(),
  registryVersion: registry.version,
  programVersion: overrides.programVersion,
  policy: {
    source: 'docs/COMPONENT-REFINEMENT.md',
    foundationsBaseline: 'docs/reports/foundations-token-refinement-baseline.md',
    stableRequiresHumanApproval: true,
    decisionCoverage: 'docs/refinement/decision-coverage.json',
    calibration,
    ordering: 'Calibration first, then dependency-safe Kahn ordering with owner-requested phase priority.',
  },
  phases: phaseDefinitions,
  summary,
  integrity: {
    missingDependencies,
    cycles,
    unknownOverrideSlugs,
    overrideErrors,
  },
  components,
};

function markdownCell(value) {
  return String(value ?? '').replaceAll('|', '\\|').replaceAll('\n', ' ');
}

const phaseCounts = phaseDefinitions.map((phase) => ({
  ...phase,
  count: components.filter((component) => component.phase.id === phase.id).length,
}));

const markdown = `# Component Refinement Program\n\nGenerated from \`registry.json\`, the web certification report, dossier presence, and the small progress override file. Identity and dependencies are not duplicated here.\n\n> A component marked ready is prepared for human review, not automatically stable.\n\n## Summary\n\n| Metric | Count |\n| --- | ---: |\n| Registry components | ${summary.registryComponents} |\n| Dependency edges | ${summary.dependencyEdges} |\n| Maximum registry dependency depth | ${summary.dependencyDepth} |\n| Missing dependencies | ${summary.missingDependencies} |\n| Dependency cycles | ${summary.cycles} |\n| Automated web gate pass | ${summary.automatedGatePass} |\n| Dossiers present | ${summary.dossiersPresent} |\n| Researched dossiers | ${summary.researched} |\n| Human-review-ready | ${summary.humanReviewReady} |\n| Human approved | ${summary.humanApproved} |\n\n## Review phases\n\nThe calibration batch (Button, Select, Product Card) is intentionally first. The production sequence after calibration is topological; phase priority chooses only among components whose registered dependencies are already available.\n\n\`\`\`mermaid\nflowchart LR\n  F["1. Foundations and tokens"] --> P["2. Primitives"]\n  P --> C["3. Fields and controls"]\n  C --> I["4. Navigation, overlays, interaction"]\n  I --> M["5. Commerce primitives"]\n  M --> O["6. Composed components"]\n  O --> S["7. Sections and pages"]\n\`\`\`\n\n| Phase | Components |\n| --- | ---: |\n${phaseCounts.map((phase) => `| ${phase.id}. ${phase.name} | ${phase.count} |`).join('\n')}\n\nPhase 1 is a prerequisite source layer and therefore has no registry component rows.\n\n## Component matrix\n\n| Order | Batch | Phase | Depth | ID | Component | Category | Dependencies | Auto gate | Dossier | Implementation | Evidence | Human | Ready |\n| ---: | --- | ---: | ---: | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n${components.map((component) => `| ${component.reviewOrder} | ${component.batch} | ${component.phase.id} | ${component.dependencyDepth ?? 'cycle'} | ${component.registryId} | ${markdownCell(component.name)} | ${component.category} | ${component.dependencies.length ? component.dependencies.join(', ') : 'none'} | ${component.automatedGate} | ${component.dossier.status} | ${component.implementationStatus} | ${component.evidenceStatus} | ${component.humanReview} | ${component.readyForHumanReview ? 'yes' : 'no'} |`).join('\n')}\n\n## Graph integrity\n\n- Missing registry dependencies: ${missingDependencies.length ? missingDependencies.map(({ slug, dependency }) => `${slug} -> ${dependency}`).join(', ') : 'none'}.\n- Cycles: ${cycles.length ? cycles.join(', ') : 'none'}.\n- Unknown progress overrides: ${unknownOverrideSlugs.length ? unknownOverrideSlugs.join(', ') : 'none'}.\n- Progress integrity errors: ${overrideErrors.length ? overrideErrors.join('; ') : 'none'}.\n- The complete machine-readable adjacency list and review order live in the JSON companion. The Graphviz source is \`docs/reports/component-dependency-graph.dot\`.\n\n## Interpretation\n\n- A zero-dependency registry entry is a source fact, not proof that the component has no semantic composition. Each dossier must reconcile canonical dependency use before human review.\n- \`mobile-desktop-baseline\` records the existing Exhibit/Studio sweep. The expanded rubric additionally requires Tablet and XL.\n- Open target-owned services may remain deferred when their boundary is explicit. Open product, aesthetic, commercial, or architecture choices remain blocking.\n- No report generator may change a contract status.\n`;

let matrixRowIndex = 0;
const markdownWithDecisions = markdown
  .replace(
    `| Human-review-ready | ${summary.humanReviewReady} |\n| Human approved |`,
    `| Human-review-ready | ${summary.humanReviewReady} |\n| Owner decisions recorded | ${summary.ownerDecisionsRecorded} |\n| Human approved |`,
  )
  .replace(
    '| Implementation | Evidence | Human | Ready |',
    '| Implementation | Evidence | Owner decision | Human | Ready |',
  )
  .replace(
    '| --- | --- | --- | --- | --- | --- |',
    '| --- | --- | --- | --- | --- | --- | --- |',
  )
  .split('\n')
  .map((line) => {
    if (!/^\| \d+ \|/.test(line)) return line;
    const component = components[matrixRowIndex];
    matrixRowIndex += 1;
    const decision = component.ownerDecision
      ? `${component.ownerDecision.packetId}/${component.ownerDecision.packetStatus}`
      : 'none';
    const tail = `| ${component.humanReview} | ${component.readyForHumanReview ? 'yes' : 'no'} |`;
    return line.replace(tail, `| ${decision} ${tail}`);
  })
  .join('\n')
  .replace(
    `- Progress integrity errors: ${overrideErrors.length ? overrideErrors.join('; ') : 'none'}.\n`,
    `- Progress integrity errors: ${overrideErrors.length ? overrideErrors.join('; ') : 'none'}.\n- Owner decisions recorded: ${summary.ownerDecisionsRecorded} of ${decisionBySlug.size} covered components. ${summary.acceptedDirectionImplementationPending} remain outside the human-review queue while their accepted direction is reconciled. Packet proposal codes remain historical; accepted directions live in \`${decisionCoverage.resolutionPath}\`.\n`,
  );

const markdownWithFoundations = markdownWithDecisions.replace(
  'Phase 1 is a prerequisite source layer and therefore has no registry component rows.',
  'Phase 1 is a prerequisite source layer and therefore has no registry component rows. Its validated gate is `docs/reports/foundations-token-refinement-baseline.md`.'
);

function dotEscape(value) {
  return String(value).replaceAll('\\', '\\\\').replaceAll('"', '\\"');
}

const dot = `digraph TheGalleryComponents {\n  rankdir=LR;\n  graph [label="The Gallery component dependencies", labelloc=t, fontsize=20];\n  node [shape=box, style="rounded", fontname="Helvetica"];\n${registryEntries.map(([slug, component]) => `  "${dotEscape(slug)}" [label="${dotEscape(`${component.id} ${component.name}`)}"];`).join('\n')}\n${registryEntries.flatMap(([slug, component]) => (component.dependencies ?? []).map((dependency) => `  "${dotEscape(dependency)}" -> "${dotEscape(slug)}";`)).join('\n')}\n}\n`;

const integrityErrors = [
  ...missingDependencies.map(({ slug, dependency }) => `${slug}: missing dependency ${dependency}`),
  ...cycles.map((slug) => `${slug}: dependency cycle`),
  ...unknownOverrideSlugs.map((slug) => `${slug}: unknown progress override`),
  ...overrideErrors,
];

if (shouldWrite) {
  fs.mkdirSync(reportsDir, { recursive: true });
  fs.writeFileSync(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
  fs.writeFileSync(markdownReportPath, markdownWithFoundations);
  fs.writeFileSync(dotReportPath, dot);
}

console.log(`Component refinement audit: ${summary.registryComponents} components, ${summary.dependencyEdges} edges, ${summary.dossiersPresent} dossiers, ${summary.humanReviewReady} ready for human review.`);
if (shouldWrite) {
  console.log(`Wrote ${path.relative(repoRoot, markdownReportPath)}, ${path.relative(repoRoot, jsonReportPath)}, and ${path.relative(repoRoot, dotReportPath)}.`);
}

if (integrityErrors.length > 0) {
  console.error(integrityErrors.join('\n'));
  process.exit(1);
}
