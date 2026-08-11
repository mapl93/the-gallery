# Refinement Batch 91 — Cart Note

Status: Ready for human review; remains `pilot`

Date: 2026-07-17

Component: Cart Note (`K10`, dependency order `104`)

## Outcome

Batch 91 replaces K10's custom Button/manual-hidden approximation with native
`details/summary` and one complete canonical Textarea. The field is never
unmounted on collapse, neutral runtime stays zero, and target persistence stays
outside the component.

Exhibit and Studio now use the same `CartNoteArtwork`, `TextareaArtwork`,
renderer, and fixture. Shopify adds an opt-in localized native cart-form
implementation without silently changing a merchant storefront.

## Delivered

- Permanent K10 dossier, detailed audit, and ADR 0182.
- Contract `0.2.0`, registry, Studio metadata, MDX, and Cart CSS reconciliation.
- Required native Summary and canonical Textarea composition, invalid omission,
  preserved live field/node/value, native form mapping, and target-owned status.
- Shared Textarea artwork reused by standalone Textarea and Cart Note Studio.
- Contrast correction from `3.56:1` accent text to `17.93:1` link-action text,
  while preserving native marker, underline, and `2px`/`2px` focus.
- Target-ready Shopify snippet/Main Cart settings/locales with official Liquid
  validation; Ajax Cart Drawer persistence remains explicit future target work.
- Mobile/Tablet/Desktop/XL per mode plus closed, focus, dark, forced colors,
  reduced motion, RTL/200px, and effective 200 percent evidence.
- Regenerated Neutral Web, Webflow, and Shopify adapters; `site/dist` untouched.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate; the static preview audit reports zero errors.
- Exhibit and Studio normalize to one exact `468`-character K10 subtree with
  one Details/Summary pair and one complete Textarea.
- Enter/Space, collapse/reopen node/value preservation, closed/open focus order,
  associated label, FormData `note`, blank-label omission, and no internal live
  region pass.
- Four viewports, `200px` localized RTL, effective scale `2`, light/dark
  contrast, focus, forced colors, and reduced motion pass without overflow.
- Shopify Liquid validation passes and the generated adapter reports K10
  `implemented`, `ready:true`; the global target-ready count rises to 79.
- Browser evidence used one headless session, one tab, and one managed server.
  The only console error is the basal `/favicon.ico` 404; final cleanup leaves
  port 4173 free.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| K10 CSS slice | `326 B` | `329 B` | component observation | `+3 B`; native disclosure and contrast-safe action text |
| Cart CSS | `3,064 B` | `3,057 B` | `3,072 B` | pass; `15 B` headroom |
| Neutral Web component CSS | `67,996 B` | `67,991 B` | `65,536 B` | existing program gap `2,455 B`; batch delta `-5 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; K10 delta `0 B` |
| Shopify K10 runtime | `0 B` added | `0 B` added | target observation | native cart-form submission only |

Cart CSS SHA-256 is
`348b82115f04bc9bfda221cca782a0381542b4f8b88c3d504f1d2e4b1e3ea855`;
K10 slice SHA-256 is
`eb851ebee18e1c3cbf3b8e56a374ec862a544fa957a34aeeeb2c2e02f3c7d8bc`.

## Risks And Open Questions

- Human review must approve native marker, toggle/underline prominence, field
  measure, spacing, cart placement, and the neutral candidate without
  component-specific Figma artwork.
- Merchant/product policy must choose availability, default expansion, maximum
  length, accepted content, and whether Cart Drawer parity is required.
- Each target must choose submit, blur, debounced input, or explicit save and
  own errors, retry, status, focus, stale cart refresh, and analytics.
- Shopify Cart Page is target-ready; Ajax Cart Drawer note persistence has not
  been implemented or certified by this batch.

## Readiness Decision

`human-review-ready`. Safe semantic, canonical, responsive, target-native, and
evidence work is complete. K10 remains `pilot` until the owner explicitly
reviews the final visuals and stability; no automatic promotion was made.
