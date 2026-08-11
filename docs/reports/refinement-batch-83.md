# Refinement Batch 83 — Cart Line Item

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Cart Line Item (`K2`, dependency order `94`)

## Outcome

Batch 83 makes K2 the one canonical target-controlled line composition for Cart
Page, Cart Drawer and Order Detail. It composes canonical Price, Quantity
Selector and Button, uses native list semantics, supports read-only omission,
responds to its named container and leaves all commerce truth/mutation policy to
the target.

Cart Drawer no longer maintains `.cart-item` markup or CSS. Exhibit and Studio
share one renderer and fixture; Shopify Main Cart and Cart Drawer share one
target-native Liquid snippet.

## Delivered

- Permanent K2 dossier, detailed audit and ADR 0174; ADR 0109 amended only for
  canonical line ownership.
- Contract `0.2.0`, registry, Studio metadata, MDX and canonical Cart CSS
  reconciliation.
- Shared `CartLineItemArtwork` consumed by K2, Cart Page, Cart Drawer and Order
  Detail; Price and Quantity dependency ownership retained.
- Shared `cart-line-item.liquid` with line properties, discounts, selling plan,
  unit/current/original Price and native quantity/removal mapping.
- Four-viewports-per-mode evidence plus localized read-only omission,
  interactions, dark/reduced-motion, forced colors and Cart Drawer regression.
- Regenerated Neutral Web, Webflow and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate; Exhibit and Studio remain shared across all 183.
- Native list/listitem structure, single optional title destination, decorative
  adjacent media, Price labels, contextual quantity/actions and optional-part
  omission are confirmed in the accessibility tree.
- Quantity increments once; save/remove expose target-owned result/status states;
  read-only localized content removes every optional interactive descendant.
- Official Shopify Liquid validation passes the shared line snippet, Cart Drawer,
  Main Cart, Price and Quantity Selector files.
- Canonical/Webflow/Shopify Cart and Global CSS copies are byte-identical.
- The browser/server evidence phase is closed: port 4173 is free and no owned
  Playwright session or Gallery server remains.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K2 CSS slice | `740 B` | `997 B` | component slice observation | `+257 B`; passive semantics/composition only |
| Cart CSS | `2,638 B` | `3,021 B` | `3,072 B` | pass; `51 B` remaining |
| Global CSS | prior Drawer `4,668 B` | `4,351 B` | `3,789 B` | existing family gap `562 B`; consolidation `-317 B` |
| Neutral Web component CSS | `67,810 B` | `67,755 B` | `65,536 B` | existing gap `2,219 B`; batch delta `-55 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K2 delta `0 B` |

Cart CSS SHA-256 is
`4b23f71e78e9ca16f8c7eee4ca58105769e928311fc0aac760c958e635a98855`;
Global CSS SHA-256 is
`71f4839f22f9e78f3ba90701655587454313d9b4cf46e340d74ffdf19cfcb025`.

## Risks And Open Questions

- Blocking technical implementation decisions: none.
- Human review must approve media/crop, density, title/Price hierarchy,
  separator/action treatment, wide balance, compact threshold and inherited
  dependency visuals.
- Mutation confirmation, pending/errors/rollback, status cadence, post-removal
  focus and save-for-later persistence remain target/product choices.
- Shopify remains planned until a real form or Ajax/Section Rendering lifecycle,
  errors/status and editor/live-store behavior are proven.
- Existing total Web CSS/runtime gaps remain program gaps; K2 reduces total CSS
  and adds no neutral runtime.

## Readiness Decision

`human-review-ready`. Research, canonical composition, consumer migration,
target translation, evidence and component-scoped gates are complete. Contract
stays `pilot`; no stability promotion was made.
