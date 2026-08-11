# Refinement Batch 88 — Cart Empty

Status: Human-review-ready; no stability promotion

Date: 2026-07-17

Component: Cart Empty (`K7`, dependency order `101`)

## Outcome

Batch 88 converts K7 from a parallel empty-state implementation into the cart
profile of canonical Empty State. The profile keeps only cart-specific content
and one coherent recovery destination; Empty State and Button own all visible
anatomy, resilience, focus presentation and composition.

Exhibit and Studio share `CartEmptyArtwork`, which consumes the same
`EmptyStateArtwork` now used by A13. K7 remains target-agnostic while Shopify
gets a dedicated translation snippet that delegates to its canonical Empty
State snippet and uses authoritative cart, locale and route facts.

## Delivered

- Permanent K7 dossier, detailed audit and ADR 0179.
- Contract `0.2.0`, registry, Studio metadata, MDX and Cart CSS reconciliation.
- Shared `EmptyStateArtwork` plus `CartEmptyArtwork`; exact Exhibit/Studio
  renderer and fixture parity.
- Coherent optional action pair, blank-title omission and complete removal of
  obsolete `.cart-empty__*` child API without pilot compatibility aliases.
- Target-native Shopify snippet, localized main-cart branch and locale-safe
  recovery route, all validated through the Shopify Liquid workflow.
- Mobile/Tablet/Desktop/XL per mode plus 200px localized/unbroken, title-only,
  dark, forced colors, reduced motion, focus-visible and effective 200% evidence.
- Regenerated Neutral Web, Webflow and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate; static preview audit reports zero errors.
- Exact `1,009`-character K7 subtree parity, passive root, one H2, decorative
  icon, native recovery Link, zero legacy parts, zero local live/focus/widget
  semantics, coherent action omission and blank-title omission are confirmed.
- All four viewports have equal local/global client and scroll widths. A real
  200px parent contains Arabic RTL and unbroken extremes at exact widths.
- Title-only leaves one H2 and zero focusables. Focus is a visible 2px/2px
  outline; Enter preserves target URL/focus. Light/dark contrast, forced colors,
  reduced motion and effective 200% layout pass.
- Shopify reports K7 `implemented`, `ready`, `snippet-adapter`; target-ready
  inventory rises to 78. The inherited Empty State fixed-H3 and live Ajax/drawer
  transition remain documented gaps.
- Canonical, Webflow and Shopify Cart CSS copies are byte-identical.
- Both browser phases were bounded to one headless session/server/tab and ended
  with port 4173 free and no owned process.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K7 CSS slice | `321 B` | `89 B` | component slice observation | `-232 B`; only context containment remains |
| Cart CSS | `3,072 B` | `3,007 B` | `3,072 B` | pass; `65 B` recovered headroom |
| Neutral Web component CSS | `67,914 B` | `67,861 B` | `65,536 B` | existing gap `2,325 B`; batch delta `-53 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K7 delta `0 B` |
| Shopify K7 runtime | `0 B` | `0 B` | target observation | dedicated Liquid composition; no script |

Cart CSS SHA-256 is
`ec6fe1f7732aa4c939a3a669f06ec8fa0669652ccbec901cce06a47a69a43f6a`;
K7 slice SHA-256 is
`d18a2d170156e78a5795a6a701dc279f20bb86d462985909f9d0ef8c985d4773`.

## Risks And Open Questions

- Blocking neutral technical decisions: none.
- Human review must approve icon choice/tone/scale, title/message hierarchy,
  centered rhythm, title-only whitespace, Button emphasis and 200px wrapping.
- A13 heading rank remains an inherited architecture decision; K7 adds no
  competing property. Shopify H3 therefore remains a known cross-context gap.
- Exact final-removal replacement, live Status, focus recovery and drawer/Ajax
  behavior remain target integration work, not neutral K7 runtime.
- Product owners choose final localized copy/destination and any recommendation
  adjacency. Generic Figma nodes do not constitute K7 visual approval.
- Existing total Web CSS/runtime gaps remain program gaps; this batch reduces
  CSS but does not resolve them.

## Readiness Decision

`human-review-ready`. Research, canonical composition, semantic API, shared
renderer, Shopify translation, special-mode evidence, performance and scoped
gates are complete. Contract stays `pilot`; no stability promotion was made.
