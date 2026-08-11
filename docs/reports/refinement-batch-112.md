# Refinement Batch 112 — Authored Size Chart Reference

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-20

Component: Size Chart (`D7`, review order `73`)

Accepted decision: D7-A / ADR 0242

## Outcome

Batch 112 closes Size Chart's data, conversion, modality and target-authoring
questions. A chart presents one complete target-authored table at a time and
never converts, rounds, recommends fit, persists a unit preference or derives
values from Dimensions. Web always uses the same centered Modal; it does not
change into a Sheet on narrow viewports.

An optional canonical Segmented Control replaces the entire displayed table
with another complete authored presentation. Very large or structurally
different matrices are outside this compact product-reference profile and need
a dedicated target presentation.

## Delivered

- Accepted ADR 0242 and reconciled ADR 0213/open-question wording.
- Size Chart contract `0.3.0`, registry and MDX target boundary.
- Shared Exhibit/Studio renderer over canonical Modal, Close Button, Segmented
  Control and Data Table.
- Shopify Product block, bounded `custom.size_chart` metaobject mapping,
  localized Liquid and target-only native-dialog controller.
- Operational Shopify custom-data guide in definition, mutation and retrieval
  order.
- Renewed human-review-ready dossier and certification audit.
- Deterministic Web and styled Shopify evidence manifest.
- Regenerated Neutral Web and Shopify adapters; Shopify target-ready count is
  `88`; `site/dist` remains untouched.

## Verification Summary

- Exact Exhibit/Studio normalized DOM hash: `026a6f84`.
- Eight Mobile/Tablet/Desktop/XL captures settle with zero dialog/document
  overflow and zero horizontal or vertical center delta.
- ArrowRight changes CM to IN through one same-name radio group and replaces
  all six values with a second independently authored table.
- One named Modal, one Close Button, one fieldset, one caption, three column
  headers and three row headers; zero grid roles and zero live regions.
- RTL and effective 200 percent text retain zero overflow and a
  keyboard-reachable named table scroller.
- Forced colors retains readable selection, `2px` selected boundary, `3px`
  focus boundary and visible table borders. Reduced motion leaves zero active
  transitions on the inspected parts.
- Shopify opens a real top-layer `:modal`, focuses the static title, locks and
  restores root scroll, switches complete panels, and restores the invoker
  after Escape or backdrop dismissal.
- Browser console and page errors are zero. Cleanup confirms port 4173 free,
  the managed server stopped and the stable Playwright session closed.
- Contracts, Studio, docs, decisions and Web/Shopify adapter validators pass.
  Theme Check reports no Size Chart/Main Product/locales finding.
- Structural certification remains `183/183`; refinement readiness advances to
  `140` components after the final audit.

## Budgets

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Size Chart CSS slice | `448 B` | Product family | bounded composition only |
| Product CSS | `4,837 B` | `5,324 B` | pass; `487 B` headroom |
| Neutral component CSS | `71,037 B` | `65,536 B` | documented `5,501 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | documented `13,441 B` gap; D7 delta zero |
| Shopify Size Chart controller | `1,004 B` | target evidence | target-only |
| Shopify Size Chart Liquid | `1,693 B` | target evidence | bounded target rendering |

The performance audit reports 18 surfaces, 10 passing and 8 documented gaps,
with zero undocumented gaps. No ceiling was raised.

## Evidence

Manifest:
`output/playwright/refinement-product/size-chart-0242/manifest.json`.

The Shopify proof uses generated Web tokens and canonical CSS in a deterministic
local native-dialog harness. It proves target behavior and presentation, but it
does not replace live merchant definition provisioning or Theme Editor proof.

## Risks And Open Questions

- Approve trigger, Modal width/chrome, selector placement, caption/table
  density, notes hierarchy and narrow visual balance.
- Supply or approve D7-specific Figma artwork.
- Provision the documented definitions in a live Shopify store and verify
  Product association, translations, Theme Editor add/remove/reorder and
  storefront behavior.
- Design a separate target presentation if a merchant needs more than three
  columns, more than twenty rows or a structurally different matrix.
- Reduce or explicitly accept existing neutral CSS/runtime distribution gaps
  before v1 packaging.

## Readiness Decision

Size Chart is `human-review-ready`. Complete authored-table replacement,
centered Web modality, canonical composition, D7-A accessibility, responsive
behavior, Shopify custom-data/lifecycle translation and Exhibit/Studio parity
are reconciled. Human visual review remains pending; no `stable` promotion is
authorized.
