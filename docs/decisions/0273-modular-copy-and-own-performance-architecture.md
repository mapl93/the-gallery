# 0273. Modular Copy-And-Own Performance Architecture

Status: Accepted

Date: 2026-08-11

Numeric ceiling policy superseded on 2026-09-09 by
[ADR 0310](0310-target-specific-performance-evidence.md). The delivery architecture,
module boundaries and copy-and-own contracts below remain accepted; the recorded
v2 ceiling outcomes are historical, not current release gates.

Owner confirmation: v1 performance architecture option 3

Supersedes ADR 0028 only where that decision treated `components.css` and
`theme.js` as the primary consumer delivery units. Their source-of-truth,
compatibility, and complete-adapter roles remain in force.

## Context

The 183 component candidates completed their individual refinement work, but
the fixed v1 audit still failed on the complete CSS bundle, the complete shared
runtime, and five broad CSS family files. Those measurements described the docs
and all-components aggregate, not the shadcn-style copy-and-own payload of one
installed component and its dependencies.

The shared runtime contains seventeen independent progressive-enhancement
areas. No individual enhancer exceeds 5 KiB gzip, while the combined
compatibility file is about 22.8 KiB gzip. Registry dependencies already define
the component graph, but the CLI previously copied family CSS and no behavior.
Shopify likewise loaded the complete runtime on every page.

The owner selected option 3 from
`docs/reports/v1-performance-architecture-options.md`: make the installed
dependency slice the release unit and retain aggregate totals as diagnostics.

## Decision

- The primary performance unit is the dependency-closed install slice declared
  for each component in the Web and Shopify adapter manifests.
- Every slice records its topological component closure, exact CSS outputs,
  required progressive-enhancement modules, and the selective loader when
  runtime exists.
- Canonical CSS remains hand-authored in `components/css/`. The Web adapter
  copies each base/family source to `platforms/web/components/` and continues to
  generate `components.css` as a complete compatibility and docs bundle.
- Canonical shared behavior remains target-independent in
  `components/js/theme.js`. `components/js/runtime-modules.json` defines stable
  enhancer boundaries, selectors, owning components, and source headings. The
  adapter build deterministically extracts those blocks into seventeen ES
  modules plus one small shared observation core.
- `platforms/web/runtime-loader.js` scans rendered markup and imports only
  matching modules. `platforms/web/theme.js` remains source-identical to the
  canonical aggregate for existing consumers, diagnostics, and migration; a
  page must not load both runtime paths.
- Shopify generates equivalent `tg-runtime-*.js` assets and loads
  `runtime-loader.js` as a module in its layouts instead of loading the complete
  `theme.js` aggregate. Target-only scripts such as product coordination and
  gift-wrap behavior keep their existing ownership.
- The CLI reads the generated Web manifest, installs base and family CSS in
  dependency order, copies only required runtime modules, and writes one local
  `runtime.js` entry for the installed graph. Consumers continue to copy and own
  every delivered file.
- Passive components still have a zero component-runtime requirement. A
  dependency may legitimately introduce runtime, and that fact must remain
  visible in the manifest closure.
- The v2 performance budget enforces the Web token target, selective loader,
  shared core, a 5 KiB ceiling for every individual enhancer, and the largest
  real install slice in each component family. Family ceilings include shared
  foundations and dependency runtime, but exclude the separately measured token
  target.
- Complete `components.css` and `theme.js` totals keep their original v1
  ceilings as diagnostic measurements. An overage remains visible in generated
  reports but does not fail the copy-and-own release gate.
- Initial install-family ceilings are the observed post-refinement worst case
  plus approximately ten percent rounded to 1 KiB. They are growth guards, not
  permission to increase each component to the ceiling.
- Web and Shopify validators must prove generated-module source identity,
  manifest coverage, dependency closure, exact copied CSS, and selective layout
  loading.
- This architecture does not change component semantics, public properties,
  visual direction, target maturity, or human stability status.

## Generated Shape

```text
components/css/*.css
components/js/theme.js
components/js/runtime-modules.json
registry.json
  -> platforms/web/components/*.css
  -> platforms/web/runtime/{core,*.js}
  -> platforms/web/runtime-loader.js
  -> platforms/shopify/assets/tg-runtime-*.js
  -> platforms/shopify/assets/runtime-loader.js
  -> adapter manifests with component.install slices
  -> CLI-owned local CSS/runtime slice
```

`platforms/web/components.css`, `platforms/web/theme.js`, and
`platforms/shopify/assets/theme.js` remain generated compatibility aggregates.
They are not the default performance unit after this decision.

## Consequences

- One component no longer pays the JavaScript cost of all seventeen enhancers.
- Dynamic markup remains supported: the loader detects newly inserted component
  roots, while the shared core re-applies only modules already loaded.
- Component dependencies now affect both styling and behavior delivery in a
  machine-readable way across Web, Shopify, and CLI.
- The complete system cost stays auditable; modularization cannot hide growth in
  the all-components artifacts.
- Broad CSS families remain an intentional source-authoring unit. A later ADR
  may introduce component-level CSS extraction if family slices become the next
  material bottleneck.
- The v1 performance blocker is resolved only when all required v2 surfaces pass
  and the aggregate diagnostic values remain reported.
- No component is promoted to `stable`; explicit human review remains required.
