# 0028. Neutral Web Adapter Manifest And Bundle

Status: Accepted Initial Implementation

Date: 2026-05-25

Current delivery note: ADR 0273 supersedes the complete CSS/runtime bundles as
the primary consumer unit. They remain generated compatibility outputs alongside
dependency-closed CSS and runtime modules.

## Context

The Gallery now has complete component contract coverage across the registry. The next architecture step is target adapter work.

The neutral web target already existed for tokens:

```text
tokens/source/
  -> platforms/web/tokens.css
```

The component side still depended on `components/css/` as the strongest implementation fact, but there was no explicit web adapter output that connected registry components, contracts, CSS, and progressive enhancement.

## Decision

Create a first executable neutral web adapter.

The adapter generates:

```text
platforms/web/index.css
platforms/web/components.css
platforms/web/theme.js
platforms/web/adapter.manifest.json
platforms/web/adapter.summary.json
```

The generated bundle follows this source path:

```text
registry.json
components/contracts/*.contract.json
components/css/*.css
components/js/theme.js
platforms/web/tokens.css
  -> scripts/build-web-adapter.js
  -> platforms/web/*
```

The current implementation policy is:

- `components/css/` remains hand-authored web adapter source.
- Component contracts validate and describe the adapter.
- Contracts do not generate component CSS yet.
- `platforms/web/adapter.manifest.json` is the machine-readable target manifest that maps every registry component to its contract, CSS source, docs page, selector, options, states, behavior, tokens, and web adapter status.
- `platforms/web/adapter.summary.json` is a lightweight manifest summary for documentation and quick inspection.
- `platforms/web/index.css` is the complete stylesheet entry for consumers that want the neutral web target.
- `platforms/web/theme.js` is copied from `components/js/theme.js` as progressive enhancement.

## Commands

Build and validate the neutral web adapter with:

```sh
npm run build:adapter:web
```

Validate an existing adapter output with:

```sh
npm run validate:adapter:web
```

`npm run build` now also regenerates and validates the neutral web adapter after Shopify tokens are built.

## Validation

The web adapter validator checks that:

- Required output files exist.
- `index.css` loads `tokens.css` before `components.css`.
- `components.css` contains every source file imported by `components/css/index.css`.
- `theme.js` matches `components/js/theme.js`.
- The manifest covers every registry component.
- Every component contract marks the web adapter as implemented.
- Manifest component metadata matches registry and contract facts.
- Every manifest source path points to an existing source file.

## Consequences

- Web is now the first explicit component adapter boundary, not just a token target.
- Future adapters can follow the same pattern: manifest, build script, validation script, and documented ownership boundaries.
- The docs site can show adapter coverage directly from the generated manifest.
- The neutral web adapter is still a hand-authored CSS adapter. Contract-driven CSS generation remains a separate future decision.

## Follow-Up Work

- Add Shopify adapter validation against snippets, sections, assets, and contracts.
- Decide whether Webflow should wrap the neutral web adapter or receive its own target bundle.
- Add target-aware CLI install behavior using adapter manifests.
- Refine generated pilot contracts before using them for stricter code generation.
