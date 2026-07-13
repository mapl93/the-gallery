# ADR 0027: Full Component Contract Coverage

Date: 2026-05-24

## Status

Accepted

## Context

The contract source layer had grown from primitive and commerce pilots into cart, global, page, review, and account components. The remaining registry families still needed contract coverage before The Gallery could move cleanly into adapter work:

- Storytelling
- Marketing
- Blog
- Sections
- Ceramics

These families are broad and mostly follow established BEM anatomy in canonical CSS. The immediate goal is complete, validated contract coverage across the registry so adapters can depend on a consistent source layer.

## Decision

All `registry.json` components now have a matching `components/contracts/*.contract.json` source file.

The final expansion brings contract coverage to:

```text
183 registry components
183 component contracts
15 registry categories
```

Global, pages, reviews, and account components received hand-authored contracts and MDX alignment. The remaining storytelling, marketing, blog, sections, and ceramics contracts were mechanically generated from current source facts:

- `registry.json` for names, ids, categories, dependencies, variants, sizes, CSS files, selectors, and descriptions.
- Canonical CSS for BEM anatomy, states, and public token references.
- Existing MDX file paths for documentation linkage.

The generated contracts are accepted as pilot-quality source contracts. They are not final adapter implementations. They establish a validated baseline that agents and future adapter work can refine.

## Consequences

- The component source layer now covers every registry component.
- Adapter work can start from a uniform contract surface instead of mixing contract-backed and registry-only components.
- Some generated contracts are intentionally conservative: they describe existing anatomy and target data mapping, but may need richer behavior and accessibility details before a target adapter generates implementation from them.
- `npm run validate:contracts` is now a complete registry-to-contract coverage gate.

## Follow-Up

- Start adapter boundary work, beginning with the neutral web/CSS adapter and Shopify validation.
- Add contract-depth review for generated families before using them for code generation.
- Decide which contract fields become required for stable contracts beyond pilot status.
- Decide whether contracts remain validation/documentation metadata, become generation input, or become a hybrid source.
