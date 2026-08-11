# Refinement Batch 111 — Native Product Purchase Boundary

Status: Human-review-ready; contract remains `pilot`

Date: 2026-07-20

Component: Product Form (`D5`, review order `71`)

Accepted decision: D5-A / ADR 0241

## Outcome

Batch 111 closes Product Form's purchase-lifecycle, scope and Quantity-policy
questions. One complete native form/FormData path is required without
JavaScript. A capable target may optionally intercept that same valid path for
Ajax and then owns its entire asynchronous lifecycle; it cannot construct a
second purchase model.

The existing Shopify product coordinator now counts as Product Form behavior
because its bounded server-rendered replacement synchronizes merchandise id,
quantity rules and submit availability atomically. Shopify merchants may omit
the canonical Quantity Selector when product policy fixes one unit.

## Delivered

- Accepted ADR 0241 and reconciled ADR 0117/open-question wording.
- Product Form contract `0.3.0`, registry and MDX target boundary.
- Implemented Web/React presentation and Shopify adapter status.
- Shopify `show_quantity` block setting with a true default.
- Renewed human-review-ready dossier and certification audit.
- Deterministic Product Form/Shopify coordinator evidence manifest.
- Regenerated Neutral Web and Shopify adapters; Shopify target-ready count is
  `87`; `site/dist` untouched.

## Verification Summary

- Exhibit/Studio form outerHTML is exactly equal (`4,404` characters).
- Eight Mobile/Tablet/Desktop/XL captures plus unavailable, pending,
  Quantity-omitted, localized RTL, dark, forced-colors/reduced-motion and 200%
  zoom evidence.
- Default FormData is `glaze=celadon`, `size=M`, `quantity=1`,
  `merchandise=celadon-m`, `intent=add`; changed and reset data stay coherent.
- One valid activation emits one submit. Required invalid groups block a second
  `requestSubmit()`.
- Unavailable merchandise is disabled and absent from FormData; pending preserves
  the label, sets Button busy/disabled and removes spinner motion when requested.
- Omitting Quantity leaves one valid native form, merchandise field and
  submitter. Product Form contains zero Price and zero live regions.
- Long Spanish RTL and effective 200% roots have equal client/scroll widths.
  Keyboard focus has a visible `2px` outline and the action remains `52px` tall.
- Shopify proof updates `id=222`, Quantity `2..6 step 2`, native FormData,
  submit availability and one status from one response; unresolved data omits
  Quantity/merchandise and disables submit.
- Browser page errors and warnings are zero; the one favicon 404 is recorded as
  unrelated docs baseline.
- One managed fixed-port server, one headless Playwright session and one tab were
  used. Cleanup reports port 4173 free, server stopped and session closed.
- Contracts, Studio, docs, decisions, Web/Shopify adapter and syntax validators
  pass. Theme Check has no finding in modified Product Form files.
- Structural certification remains `183/183`; refinement readiness advances to
  `139` components after the final audit.

## Budgets

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | documented `5,449 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | documented `13,441 B` gap |
| Shopify product coordinator | `2,133 B` | target evidence | target-only; no neutral delta |

The performance audit reports 18 surfaces, 10 pass and 8 documented gaps, with
zero undocumented gaps. No ceiling was raised.

## Evidence

Manifest:
`output/playwright/refinement-product/product-form-0241/manifest.json`.

The Shopify proof uses deterministic local Section Rendering responses. It is
behavioral adapter evidence, not a substitute for live native/Ajax submission or
a merchant catalogue.

## Risks And Open Questions

- Approve form rhythm, Quantity/action relationship, action geometry, feedback,
  disabled/pending treatment and narrow layout.
- Run live Shopify native submission, high-variant replacement, Quantity
  omission, app-block and theme-editor integration before target release.
- Require a separate complete lifecycle decision/evidence batch before adding
  any Ajax Cart Drawer enhancement.
- Selling plans, personalization, uploads, gifts, preorder and accelerated
  checkout need separate canonical compositions if introduced.
- Reduce or explicitly accept existing neutral CSS/runtime distribution gaps
  before v1 packaging.

## Readiness Decision

Product Form is `human-review-ready`. Native submission, FormData and validity,
canonical composition, D5-A progressive enhancement, accessibility, responsive
layout, target translation and Exhibit/Studio parity are reconciled. Human
visual review remains pending; no `stable` promotion is authorized.
