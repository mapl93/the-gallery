# Refinement Batch 87 — Cart Upsell

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Cart Upsell (`K6`, dependency order `100`)

## Outcome

Batch 87 makes K6 the named target-controlled recommendation-list composition
for Web. One required semantic items slot can mix navigation-only and directly
actionable products while each item composes canonical Link, Price and Button.
The obsolete collection-wide add properties, raw price, generic collection/item
elements, internal optimistic state and K6 live region are removed.

Exhibit and Studio share one renderer and fixture. K6 remains independent of
Shopify, React, Figma and future targets; those targets retain recommendation,
product, variant, cart mutation, status and analytics truth.

## Delivered

- Permanent K6 dossier, detailed audit and ADR 0178.
- Contract `0.2.0`, registry, Studio metadata, MDX and canonical Cart CSS
  reconciliation.
- Shared `CartUpsellArtwork` consumed by Exhibit and Studio with native named
  section/list semantics and canonical Link/Price/Button composition.
- Per-item capability boundary; global `addLabel`/`addDisabled` removed without
  pilot aliases and direct add made optional.
- Four viewports per mode plus localized RTL 200px, navigation-only 200px,
  multiple items, dark, reduced motion, forced colors, effective 200% zoom and
  focus-visible evidence.
- Regenerated Neutral Web, Webflow and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate; Exhibit and Studio remain structurally shared across all 183.
- Exact `958`-character K6 subtree parity, named `section`, `ul > li`,
  decorative repeated media, canonical dependencies, contextual action name,
  Link → Button order, focus retention, external status and blank-title omission
  are confirmed.
- Mobile/Tablet/Desktop/XL and stress compositions have equal client/scroll
  widths. Default title/link contrast is `17.93:1`, Button contrast `10.37:1`;
  dark, reduced motion, forced colors and effective 200% behavior pass.
- Shopify remains planned and no Liquid was invented because cart recommendation
  source/context, placement, variant/add policy and editor/live behavior are
  unresolved owner/target decisions.
- Canonical, Webflow and Shopify Cart CSS copies are byte-identical.
- Browser/server evidence is closed: port 4173 is free and no owned Playwright
  session or Gallery server remains.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K6 CSS slice | `391 B` | `524 B` | component slice observation | `+133 B`; native semantics and intrinsic resilience |
| Cart CSS | `3,005 B` | `3,072 B` | `3,072 B` | pass; exactly at ceiling |
| Neutral Web component CSS | `67,838 B` | `67,914 B` | `65,536 B` | existing gap `2,378 B`; batch delta `+76 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K6 delta `0 B` |
| Shopify K6 runtime/Liquid | `0 B` | `0 B` | target observation | planned boundary; no target policy inferred |

Cart CSS SHA-256 is
`5190b191c0afb6fbb6017a14b5153b3cf4ebe9b6b3e35515fe9a674545776a2a`;
K6 slice SHA-256 is
`197816bdf4563a9988f95e2eb6115e6a5755e11b76d27d767202f06d53676715`.

## Risks And Open Questions

- Blocking neutral technical decisions: none.
- Human review must approve surface, heading/Price hierarchy, media scale,
  Button emphasis, density, narrow wrapping and navigation-only balance.
- Recommendation source/intent, truthful wording, cart placement, item limit,
  tracking, variant/add policy, availability/pending/results, status/focus,
  analytics and refresh remain target/product decisions.
- Shopify remains planned until its data source/request context, editor schema,
  cart lifecycle and live-store behavior are selected and proven.
- Existing total Web CSS/runtime gaps remain program gaps. Cart has no remaining
  family headroom; subsequent Cart work must first recover budget.

## Readiness Decision

`human-review-ready`. Research, native/canonical composition, cross-target
boundary, special-mode evidence and component-scoped gates are complete.
Contract stays `pilot`; no stability promotion was made.
