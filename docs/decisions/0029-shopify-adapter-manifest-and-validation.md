# 0029. Shopify Adapter Manifest And Validation

Current delivery note: ADR 0273 supersedes layout loading of the complete
`theme.js` aggregate. Shopify now loads the generated selective runtime while
retaining `theme.js` as compatibility output.

Status: Accepted Initial Implementation

Date: 2026-05-25

## Context

The neutral web adapter established the first explicit target boundary. Shopify is the first commercial target, but its current implementation mixed several concerns:

- `tokens.css` is generated from the neutral web token target.
- Component CSS assets are copied from `components/css/`.
- Liquid snippets and sections are hand-authored adapter source.
- `base.css` still contained legacy token values, which could override the new `tokens.css` wrapper.
- Component contracts had partial Shopify status metadata, but there was no executable inventory connecting contracts to Liquid/assets.

## Decision

Create a Shopify adapter build and validation layer.

The adapter generates or refreshes:

```text
platforms/shopify/assets/base.css
platforms/shopify/assets/*.css
platforms/shopify/assets/theme.js
platforms/shopify/adapter.manifest.json
platforms/shopify/adapter.summary.json
```

The source path is:

```text
registry.json
components/contracts/*.contract.json
components/css/*.css
components/js/theme.js
platforms/shopify/**/*.liquid
platforms/shopify/assets/tokens.css
  -> scripts/build-shopify-adapter.js
  -> platforms/shopify/*
```

`base.css` is now generated from:

```text
components/css/reset.css
components/css/foundations.css
components/css/utilities.css
```

It must not define token values. Token values come from `platforms/shopify/assets/tokens.css`.

The Shopify layout load order is explicit:

```text
tokens.css
base.css
component category CSS
theme.js
```

## Commands

Build and validate the Shopify adapter with:

```sh
npm run build:adapter:shopify
```

Validate an existing Shopify adapter output with:

```sh
npm run validate:adapter:shopify
```

`npm run build` now runs the Shopify adapter build instead of only building Shopify tokens.

## Validation

The Shopify adapter validator checks that:

- Layouts load CSS in manifest-defined order.
- `base.css` is generated from base CSS sources.
- `base.css` does not define token values.
- Component CSS assets match `components/css/`.
- `theme.js` matches `components/js/theme.js`.
- The manifest covers every registry component.
- Manifest component metadata matches registry and contract facts.
- Liquid files referenced by selector inventory exist.
- The summary matches the manifest stats.

## Maturity Warnings

The validator emits warnings rather than failing when Shopify contract maturity does not match Liquid evidence.

Current warning classes are defined by the Shopify maturity model in `docs/decisions/0030-shopify-adapter-maturity-model.md`:

- A dedicated Liquid template exists, but the contract still marks Shopify as `planned`.
- Contract marks Shopify as `implemented`, but a required dedicated Liquid template is missing.

These warnings are useful backlog, not build blockers. Embedded class contracts can be target-ready without a dedicated Liquid root, while several real Shopify sections/snippets need their contract adapter status reviewed.

## Consequences

- Shopify now has an executable adapter inventory.
- Legacy token values no longer live in Shopify `base.css`.
- Theme layouts load the full CSS stack needed by current Shopify templates.
- Future Shopify work can tighten contract status and Liquid validation component by component.
- Shopify maturity started across CSS, Liquid, and behavior layers and now extends into schema, data, template-composition, and editor-preview layers through `shopify-maturity-v1`.

## Follow-Up Work

- Reconcile Shopify contract statuses for components with existing Liquid implementations.
- Add stricter validation for required Liquid snippets/sections once contract status is reconciled.
- Add Theme Check or Shopify CLI validation as a separate gate.
- Continue toward target-aware CLI install from adapter manifests.
