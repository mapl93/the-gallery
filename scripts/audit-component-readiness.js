import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const registryPath = path.join(repoRoot, 'registry.json');
const contractsDir = path.join(repoRoot, 'components', 'contracts');
const componentTokensDir = path.join(repoRoot, 'tokens', 'source', 'components');
const studioDir = path.join(repoRoot, 'site', 'src', 'content', 'studio');
const studioRendererRegistryPath = path.join(repoRoot, 'site', 'src', 'components', 'studio', 'index.ts');
const webManifestPath = path.join(repoRoot, 'platforms', 'web', 'adapter.manifest.json');
const webTokensPath = path.join(repoRoot, 'platforms', 'web', 'tokens.css');
const reportsDir = path.join(repoRoot, 'docs', 'reports');
const jsonReportPath = path.join(reportsDir, 'component-web-certification.json');
const markdownReportPath = path.join(reportsDir, 'component-web-certification.md');

function read(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

function readJson(filePath) {
  return JSON.parse(read(filePath));
}

function sameArray(left = [], right = []) {
  return left.length === right.length && left.every((value, index) => value === right[index]);
}

function sorted(values = []) {
  return [...values].sort();
}

function flattenPublicTokens(contract) {
  return sorted(Object.values(contract?.tokens?.public ?? {}).flat());
}

function cssVariableRefs(css) {
  return new Set([...css.matchAll(/var\(\s*(--[a-zA-Z0-9_-]+)/g)].map((match) => match[1]));
}

function cssVariableDefinitions(css) {
  return new Set([...css.matchAll(/^\s*(--[a-zA-Z0-9_-]+)\s*:/gm)].map((match) => match[1]));
}

function kebabCase(value) {
  return value
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .replace(/[^a-zA-Z0-9]+/g, '-')
    .toLowerCase();
}

function sourceTokenVariables(value, pathSegments = []) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return [];
  if ('$value' in value) return [`--tg-${pathSegments.map(kebabCase).join('-')}`];

  return Object.entries(value)
    .filter(([key]) => !key.startsWith('$'))
    .flatMap(([key, child]) => sourceTokenVariables(child, [...pathSegments, key]));
}

function componentAliasTargets(css) {
  const targets = new Map();
  const pattern = /^\s*(--[a-zA-Z0-9_-]+)\s*:\s*var\(\s*(--tg-component-[a-zA-Z0-9_-]+)\s*\)\s*;/gm;

  for (const match of css.matchAll(pattern)) {
    const [, alias, target] = match;
    if (alias.startsWith('--tg-')) continue;
    if (!targets.has(target)) targets.set(target, new Set());
    targets.get(target).add(alias);
  }

  return targets;
}

function selectorExists(css, selector) {
  const classes = [...String(selector).matchAll(/\.([a-zA-Z][a-zA-Z0-9_-]*)/g)].map((match) => match[1]);

  if (classes.length === 0) {
    return css.includes(String(selector));
  }

  return classes.every((className) => (
    new RegExp(`\\.${className.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![a-zA-Z0-9_-])`).test(css)
  ));
}

function expectedOptions(registryComponent, key) {
  const values = registryComponent[key] ?? [];
  return values.length > 0 ? values : ['default'];
}

function normalizeOptions(options = []) {
  return options.map((option) => ({
    name: option.name,
    className: option.className ?? null,
    default: option.default === true,
  }));
}

function normalizeStates(states = []) {
  return states.map((state) => ({
    name: state.name,
    selectors: state.selectors ?? [],
  }));
}

function manifestMatches({ manifestEntry, contract, registryComponent }) {
  if (!manifestEntry || !contract) return false;

  return manifestEntry.slug === contract.slug
    && manifestEntry.name === registryComponent.name
    && manifestEntry.registryId === registryComponent.id
    && manifestEntry.category === registryComponent.category
    && manifestEntry.status === contract.status
    && manifestEntry.selector === registryComponent.selector
    && sameArray(manifestEntry.dependencies ?? [], registryComponent.dependencies ?? [])
    && JSON.stringify(manifestEntry.variants ?? []) === JSON.stringify(normalizeOptions(contract.variants))
    && JSON.stringify(manifestEntry.sizes ?? []) === JSON.stringify(normalizeOptions(contract.sizes))
    && JSON.stringify(manifestEntry.states ?? []) === JSON.stringify(normalizeStates(contract.states))
    && sameArray(sorted(manifestEntry.publicTokens ?? []), flattenPublicTokens(contract))
    && manifestEntry.adapter?.status === contract.adapters?.web?.status
    && manifestEntry.adapter?.kind === contract.adapters?.web?.kind;
}

function identityMatches(contract, registryComponent) {
  if (!contract) return false;

  return contract.name === registryComponent.name
    && contract.registryId === registryComponent.id
    && contract.category === registryComponent.category
    && sameArray(contract.dependencies ?? [], registryComponent.dependencies ?? [])
    && contract.source?.css?.file === registryComponent.file
    && contract.source?.css?.selector === registryComponent.selector;
}

function optionsMatch(contract, registryComponent) {
  if (!contract) return false;

  return sameArray(contract.variants?.map((option) => option.name) ?? [], expectedOptions(registryComponent, 'variants'))
    && sameArray(contract.sizes?.map((option) => option.name) ?? [], expectedOptions(registryComponent, 'sizes'));
}

function docsCoverOptions(contract, docs) {
  if (!contract) return false;

  return [...(contract.variants ?? []), ...(contract.sizes ?? [])]
    .filter((option) => option.className)
    .every((option) => docs.includes(option.className.slice(1)));
}

function count(source, pattern) {
  return (source.match(pattern) ?? []).length;
}

function extractPreviewBlocks(source) {
  const blocks = [];
  const previewPattern = /<Preview\b/g;
  let match;

  while ((match = previewPattern.exec(source))) {
    const start = match.index;
    let quote = null;
    let escaped = false;
    let braceDepth = 0;

    for (let index = previewPattern.lastIndex; index < source.length; index += 1) {
      const char = source[index];
      const next = source[index + 1];

      if (quote) {
        if (escaped) {
          escaped = false;
        } else if (char === '\\') {
          escaped = true;
        } else if (char === quote) {
          quote = null;
        }
        continue;
      }

      if (char === '"' || char === "'") {
        quote = char;
        continue;
      }

      if (char === '{') {
        braceDepth += 1;
        continue;
      }

      if (char === '}') {
        braceDepth = Math.max(0, braceDepth - 1);
        continue;
      }

      if (braceDepth === 0 && char === '/' && next === '>') {
        blocks.push(source.slice(start, index + 2));
        previewPattern.lastIndex = index + 2;
        break;
      }
    }
  }

  return blocks;
}

function studioRendererExists(source, slug) {
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`^\\s*(?:['"]${escapedSlug}['"]|${escapedSlug})\\s*:`, 'm').test(source);
}

function statusCounts(components) {
  return components.reduce((counts, component) => {
    const status = component.contractStatus ?? 'missing';
    counts[status] = (counts[status] ?? 0) + 1;
    return counts;
  }, {});
}

function markdownCell(value) {
  return String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
}

function toMarkdown(report) {
  const lines = [
    '# Component Web Certification Matrix',
    '',
    'Generated by `npm run audit:components` from current repository facts.',
    '',
    '> A passing automated gate is not a `stable` certification. Human review is required by ADR 0034.',
    '',
    '## Summary',
    '',
    '| Metric | Count |',
    '| --- | ---: |',
    `| Registry components | ${report.summary.components} |`,
    `| Automated gate pass | ${report.summary.automatedPass} |`,
    `| Structural gaps | ${report.summary.structuralGaps} |`,
    `| Contracts marked stable | ${report.summary.stableContracts} |`,
    `| Components requiring human review | ${report.summary.manualReviewRequired} |`,
    `| Web manifest drift | ${report.summary.webManifestDrift} |`,
    `| Preview blocks | ${report.summary.previews} |`,
    `| Interactive Exhibit preview evidence | ${report.summary.interactivePreviews} |`,
    `| Interactive Studio renderer evidence | ${report.summary.interactiveStudios} |`,
    `| Interactive evidence surfaces | ${report.summary.interactiveEvidence} |`,
    `| Reviewed semantic property definitions | ${report.summary.semanticProperties} |`,
    `| Studio presentation definitions | ${report.summary.studioDefinitions} |`,
    `| Studio semantic property bindings | ${report.summary.studioPropertyBindings} |`,
    '',
    '## Automated Gates',
    '',
    '- Canonical files and registry identity agree.',
    '- Registry variants and sizes agree with the contract.',
    '- Registry selectors exist in canonical CSS.',
    '- Source component tokens reach public aliases consumed by the contract and CSS.',
    '- Public contract tokens are referenced by CSS and defined by the web token target.',
    '- Variant and size classes appear in canonical docs.',
    '- Components with reviewed semantic properties have Studio presentation metadata covering each property exactly once.',
    '- The contract marks the web adapter implemented.',
    '- The generated web manifest is present and matches current source facts.',
    '',
    '## Matrix',
    '',
    '| ID | Component | Category | Contract | Auto gate | Anatomy | Props | Studio | V / S / St | Tokens | Previews | Interactive | Review flags |',
    '| --- | --- | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- |',
  ];

  for (const component of report.components) {
    const cells = [
      markdownCell(component.registryId),
      markdownCell(component.name),
      markdownCell(component.category),
      markdownCell(component.contractStatus ?? 'missing'),
      component.automatedGate,
      component.counts.anatomy,
      component.counts.properties,
      component.studio.present ? `${component.studio.groups} / ${component.studio.controls}` : '—',
      `${component.counts.variants} / ${component.counts.sizes} / ${component.counts.states}`,
      component.counts.publicTokens,
      component.docs.previews,
      component.interactionEvidence,
      markdownCell(component.reviewFlags.join(', ') || 'none'),
    ];
    lines.push(`| ${cells.join(' | ')} |`);
  }

  const gaps = report.components.filter((component) => component.structuralFailures.length > 0);
  lines.push('', '## Structural Gaps', '');

  if (gaps.length === 0) {
    lines.push('_None detected by this audit._');
  } else {
    lines.push('| Component | Failed checks |', '| --- | --- |');
    for (const component of gaps) {
      lines.push(`| ${markdownCell(component.slug)} | ${markdownCell(component.structuralFailures.join(', '))} |`);
    }
  }

  return `${lines.join('\n')}\n`;
}

function main() {
  const registry = readJson(registryPath);
  const webManifest = fs.existsSync(webManifestPath) ? readJson(webManifestPath) : { components: [] };
  const manifestBySlug = Object.fromEntries((webManifest.components ?? []).map((component) => [component.slug, component]));
  const studioRendererRegistry = fs.existsSync(studioRendererRegistryPath)
    ? read(studioRendererRegistryPath)
    : '';
  const webTokenDefinitions = fs.existsSync(webTokensPath)
    ? cssVariableDefinitions(read(webTokensPath))
    : new Set();
  const webTokenAliases = fs.existsSync(webTokensPath)
    ? componentAliasTargets(read(webTokensPath))
    : new Map();

  const components = Object.entries(registry.components).map(([slug, registryComponent]) => {
    const contractPath = path.join(contractsDir, `${slug}.contract.json`);
    const contract = fs.existsSync(contractPath) ? readJson(contractPath) : null;
    const studioPath = path.join(studioDir, `${slug}.studio.json`);
    const studio = fs.existsSync(studioPath) ? readJson(studioPath) : null;
    const docsRelativePath = contract?.source?.docs ?? `site/src/content/components/${slug}.mdx`;
    const docsPath = path.join(repoRoot, docsRelativePath);
    const cssRelativePath = contract?.source?.css?.file ?? registryComponent.file;
    const cssPath = path.join(repoRoot, cssRelativePath);
    const docs = fs.existsSync(docsPath) ? read(docsPath) : '';
    const css = fs.existsSync(cssPath) ? read(cssPath) : '';
    const publicTokens = flattenPublicTokens(contract);
    const cssRefs = cssVariableRefs(css);
    const manifestEntry = manifestBySlug[slug];
    const componentTokensPath = path.join(componentTokensDir, `${slug}.tokens.json`);
    const sourceComponentTokens = fs.existsSync(componentTokensPath)
      ? sourceTokenVariables(readJson(componentTokensPath))
      : [];
    const unconnectedSourceTokens = sourceComponentTokens.filter((token) => {
      const aliases = [...(webTokenAliases.get(token) ?? [])];
      return !aliases.some((alias) => publicTokens.includes(alias) && cssRefs.has(alias));
    });

    const checks = {
      contractExists: Boolean(contract),
      docsExists: fs.existsSync(docsPath),
      cssExists: fs.existsSync(cssPath),
      registryIdentityAligned: identityMatches(contract, registryComponent),
      registryOptionsAligned: optionsMatch(contract, registryComponent),
      selectorInCss: selectorExists(css, registryComponent.selector),
      componentSourceTokensConnected: unconnectedSourceTokens.length === 0,
      publicTokensReferenced: publicTokens.every((token) => cssRefs.has(token)),
      publicTokensDefined: publicTokens.every((token) => webTokenDefinitions.has(token)),
      docsCoverVariantClasses: docsCoverOptions(contract, docs),
      webContractImplemented: contract?.adapters?.web?.status === 'implemented',
      webManifestPresent: Boolean(manifestEntry),
      webManifestAligned: manifestMatches({ manifestEntry, contract, registryComponent }),
    };

    const structuralFailures = Object.entries(checks)
      .filter(([, passed]) => !passed)
      .map(([name]) => name);

    const previewBlocks = extractPreviewBlocks(docs);
    const previews = previewBlocks.length;
    const interactivePreviews = previewBlocks.filter((block) => (
      /\binteraction\s*=/.test(block) || /data-preview-selector=/.test(block)
    )).length;
    const inlineStyles = count(docs, /\bstyle\s*=/g);
    const externalAssets = count(docs, /https:\/\//g);
    const anatomyCount = contract?.anatomy?.length ?? 0;
    const variantCount = contract?.variants?.length ?? 0;
    const sizeCount = contract?.sizes?.length ?? 0;
    const stateCount = contract?.states?.length ?? 0;
    const behaviorCount = contract?.behavior?.length ?? 0;
    const propertyCount = contract?.properties?.length ?? 0;
    const studioControls = (studio?.groups ?? []).flatMap((group) => group.controls ?? []);
    const studioProperties = studioControls.flatMap((control) => control.properties ?? []);
    const contractProperties = (contract?.properties ?? []).map((property) => property.name);
    const studioPropertiesCovered = propertyCount === 0 || (
      sameArray(sorted(studioProperties), sorted(contractProperties))
      && new Set(studioProperties).size === studioProperties.length
    );
    const studioDesignReferencePresent = !studio || Boolean(
      studio.designReference?.fileKey
      && studio.designReference?.frameNodeId
      && studio.designReference?.inspectorNodeId
    );
    const studioRendererPresent = !studio || studioRendererExists(studioRendererRegistry, slug);
    const interactiveStudio = Boolean(studio && studioRendererPresent);
    const interactionEvidence = interactivePreviews + Number(interactiveStudio);
    checks.studioMetadataPresent = propertyCount === 0 || Boolean(studio);
    checks.studioPropertiesCovered = studioPropertiesCovered;
    // ADR 0303: optional historical provenance, never a readiness gate.
    checks.studioDesignReferencePresent = studioDesignReferencePresent;
    checks.studioRendererPresent = studioRendererPresent;

    const studioFailures = [
      ['studioMetadataPresent', checks.studioMetadataPresent],
      ['studioPropertiesCovered', checks.studioPropertiesCovered],
      ['studioRendererPresent', checks.studioRendererPresent],
    ].filter(([, passed]) => !passed).map(([name]) => name);
    structuralFailures.push(...studioFailures);
    const reviewFlags = [];

    if (contract?.status !== 'stable') reviewFlags.push(`status-${contract?.status ?? 'missing'}`);
    if (anatomyCount === 1) reviewFlags.push('confirm-single-anatomy');
    if (variantCount === 1 && contract?.variants?.[0]?.name === 'default') reviewFlags.push('confirm-default-only-variants');
    if (sizeCount === 1 && contract?.sizes?.[0]?.name === 'default') reviewFlags.push('confirm-default-only-sizes');
    if (stateCount === 1 && contract?.states?.[0]?.name === 'default') reviewFlags.push('confirm-default-only-states');
    if (publicTokens.length === 0) reviewFlags.push('confirm-no-public-tokens');
    if (behaviorCount > 0 && interactionEvidence === 0) reviewFlags.push('behavior-not-demonstrated-interactively');
    if (previews === 0) reviewFlags.push('no-canonical-preview');
    if (inlineStyles > 0) reviewFlags.push(`docs-inline-styles:${inlineStyles}`);
    if (externalAssets > 0) reviewFlags.push(`docs-external-assets:${externalAssets}`);
    if (!checks.webManifestAligned) reviewFlags.push('web-manifest-drift');
    if (propertyCount > 0 && !studio) reviewFlags.push('studio-metadata-missing');
    if (unconnectedSourceTokens.length > 0) {
      reviewFlags.push(`source-component-tokens-unconnected:${unconnectedSourceTokens.length}`);
    }

    return {
      slug,
      registryId: registryComponent.id,
      name: registryComponent.name,
      category: registryComponent.category,
      contractStatus: contract?.status ?? null,
      automatedGate: structuralFailures.length === 0 ? 'pass' : 'gap',
      manualReviewRequired: contract?.status !== 'stable' || reviewFlags.length > 0,
      interactionEvidence,
      source: {
        contract: path.relative(repoRoot, contractPath),
        css: cssRelativePath,
        docs: docsRelativePath,
        studio: path.relative(repoRoot, studioPath),
      },
      counts: {
        anatomy: anatomyCount,
        variants: variantCount,
        sizes: sizeCount,
        states: stateCount,
        behavior: behaviorCount,
        properties: propertyCount,
        publicTokens: publicTokens.length,
      },
      sourceComponentTokens: {
        declared: sourceComponentTokens.length,
        connected: sourceComponentTokens.length - unconnectedSourceTokens.length,
        unconnected: unconnectedSourceTokens,
      },
      docs: {
        previews,
        interactivePreviews,
        inlineStyles,
        externalAssets,
      },
      studio: {
        present: Boolean(studio),
        groups: studio?.groups?.length ?? 0,
        controls: studioControls.length,
        propertyBindings: studioProperties.length,
        tokenControls: studioControls.filter((control) => control.tokens).length,
        rendererPresent: studioRendererPresent,
        interactive: interactiveStudio,
      },
      checks,
      structuralFailures,
      reviewFlags,
    };
  });

  const report = {
    reportVersion: '0.5.0',
    target: 'web',
    registryVersion: registry.version,
    policy: {
      certificationDoc: 'docs/COMPONENT-CERTIFICATION.md',
      decision: 'docs/decisions/0034-web-component-certification-and-docs-dogfooding.md',
      automaticPromotion: false,
    },
    summary: {
      components: components.length,
      automatedPass: components.filter((component) => component.automatedGate === 'pass').length,
      structuralGaps: components.filter((component) => component.automatedGate === 'gap').length,
      stableContracts: components.filter((component) => component.contractStatus === 'stable').length,
      manualReviewRequired: components.filter((component) => component.manualReviewRequired).length,
      webManifestDrift: components.filter((component) => !component.checks.webManifestAligned).length,
      previews: components.reduce((total, component) => total + component.docs.previews, 0),
      interactivePreviews: components.reduce((total, component) => total + component.docs.interactivePreviews, 0),
      interactiveStudios: components.filter((component) => component.studio.interactive).length,
      interactiveEvidence: components.reduce((total, component) => total + component.interactionEvidence, 0),
      semanticProperties: components.reduce((total, component) => total + component.counts.properties, 0),
      studioDefinitions: components.filter((component) => component.studio.present).length,
      studioPropertyBindings: components.reduce((total, component) => total + component.studio.propertyBindings, 0),
      contractStatuses: statusCounts(components),
    },
    components,
  };

  if (process.argv.includes('--write')) {
    fs.mkdirSync(reportsDir, { recursive: true });
    fs.writeFileSync(jsonReportPath, `${JSON.stringify(report, null, 2)}\n`);
    fs.writeFileSync(markdownReportPath, toMarkdown(report));
  }

  console.log(JSON.stringify(report.summary, null, 2));
}

main();
