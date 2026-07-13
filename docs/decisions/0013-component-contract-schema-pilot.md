# 0013. Component Contract Schema Pilot

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

The Gallery's target architecture needs two internal source languages:

- Tokens for values.
- Component contracts for target-agnostic component definition.

Before this decision, components were represented by implementation facts spread across:

```text
registry.json
components/css/*.css
site/src/content/components/*.mdx
platforms/* target files
```

That is useful, but it does not provide a formal source layer for anatomy, variants, states, accessibility, public tokens, or adapter status.

## Decision

Create a `components/contracts/` source layer:

```text
components/contracts/contract.schema.json
components/contracts/*.contract.json
```

The v1 contract shape includes:

- Identity: slug, name, registry id, category, status.
- Source links: registry entry, canonical CSS file/selector, docs page.
- Anatomy: root, elements, optional generated parts.
- Variants and sizes.
- States.
- Public customization tokens.
- Accessibility requirements.
- Adapter status by target.

## Button Pilot

Button is the first contract:

```text
components/contracts/button.contract.json
```

It captures the current Button implementation:

- Root `.btn`.
- Optional `.btn__icon`.
- Generated busy indicator through `[aria-busy="true"]`.
- Variants: primary, secondary, outline, link, danger.
- Sizes: sm, default, lg.
- States: default, hover, active, focus-visible, disabled, busy.
- Public button token API.
- Implemented web and Shopify adapters, with React/Figma/native marked as planned.

## Validation

Contracts are validated with:

```sh
npm run validate:contracts
```

The validator compares each contract against:

- `registry.json`.
- Canonical CSS under `components/css/`.
- Component docs under `site/src/content/components/`.
- Public token definitions in `platforms/web/tokens.css`.

`npm run validate:docs` now runs contract validation as part of the docs/source consistency gate.

## Consequences

- Component contracts are now executable source files, not only architecture documentation.
- The first contract is intentionally grounded in the existing CSS, registry, and docs.
- Existing CSS remains the web adapter while contracts become the target-agnostic component source layer.
- Future adapters can use contracts to generate or validate target-specific implementations.

## Follow-Up Work

- Add the Input contract as the next pilot because it has richer anatomy and validation states.
- Add contract-driven docs UI once more contracts exist.
- Add target adapter validation for Shopify snippets/sections against contracts.
- Decide when contracts should generate implementation files versus validate hand-authored adapters.
