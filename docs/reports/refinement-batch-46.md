# Component Refinement Batch 46

Status: Artist Statement Section refined and ready for human review

Date: 2026-07-15

Component: Artist Statement Section

## Outcome

Artist Statement's dossier, standards research, passive composition decision,
contract, canonical CSS, optional portrait, quotation/body/signature semantics,
shared Exhibit/Studio renderer, Studio metadata, MDX, target-native Shopify
section, generated adapters, browser evidence and individual audit are
reconciled. The contract remains `pilot`; no component was promoted to `stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- The shared candidate is a passive native section labelled by the required
  contextual artist-name heading.
- An explicit portrait modifier removes the stale empty column and enables the
  `1:2` split only from the component's own wide content box.
- Portrait then narrative remains source order. Sticky presentation is limited
  to wide split mode; narrow and medium media is static.
- Optional eyebrow, quote, portrait and signature disappear without empty
  wrappers. Name and rich body remain required.
- Quotation, image purpose and signature semantics are truthful and passive; no
  authenticity meaning, ARIA widget, interaction or framework state is inferred.
- Canonical CSS owns typography, logical spacing, crop, quote rule, signature,
  wrapping, container response and forced-color presentation. Studio no longer
  repairs canonical layout.
- Studio exposes six semantic values/slots and curated public-token controls,
  not internal threshold, ratio, crop, sticky behavior or target mechanics.
- Neutral Web and Shopify consume generated canonical CSS. Shopify adds a
  localized, responsive, merchant-configurable section and passes official
  validation with no component JavaScript.
- ADR 0131 records the safe implementation and preserved human-review boundary.

## Browser Evidence Summary

- Exact Exhibit/Studio initial `outerHTML` parity holds in Mobile, Tablet,
  Desktop and XL, with zero neutral focus stops and no overflow.
- The shared tree is one heading-labelled `SECTION`, one optional portrait, one
  genuine quotation and portrait-then-content source order.
- No-portrait and minimal modes omit every absent optional region.
- Isolated `260/320/520px` hosts stay stacked/static; `720/900px` hosts resolve
  the `1:2` split/sticky portrait from their own width.
- Long localized/unbroken RTL content fits `320px` without an overflowing
  descendant or source-order change; signature image fits its private cap.
- Primary/secondary contrast is `17.93:1 / 7.81:1` light and
  `17.18:1 / 12.09:1` dark. Forced colors uses system text/rule colors.
- Reduced motion has zero animations and `0s` transitions.
- Eight before, eight final viewport and twelve special-mode images live under
  `output/playwright/refinement-batch-46/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Storytelling CSS | `4,805 B` | `4.2 KiB` | exception (`504 B` over; `+53 B` from Batch 45) |
| Shared neutral runtime | `10,580 B` | `8 KiB` | existing exception (`2,388 B` over; Artist Statement adds `0 B`) |
| Neutral Web components CSS | `67,780 B` | `64 KiB` | current gap (`2,244 B` over; `+1,078 B` from Batch 45) |

All ceilings remain unchanged. The Storytelling/global/runtime overages stay
explicit program gaps; semantics and intrinsic reflow were not removed to
manufacture a pass.

## Human Review Queue

Review portrait crop/radius/sticky behavior, split ratio/threshold, content
measure/inset, type hierarchy, rhythm, quote rule and signature treatment.
Confirm that those visual decisions plus heading rank, media mechanics and target
events remain outside the v1 neutral API. Decide separately any future Shopify
artist record/metaobject mapping and produce component-specific Figma artwork.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web, Shopify and
copied CSS, mandatory Shopify docs/official validation, structural/static/
parity/refinement audits, browser semantics/states/preferences/reflow,
source/generated identity, deterministic gzip, temporary site build outside
`site/dist`, diff checks, zero-error component console and `site/dist`
cleanliness form the final gate.

## Program Progress

After regeneration the program contains 183 components, 109 dependency edges,
87 dossiers and 76 components ready for human review. Artist Statement Section
is `human-review-ready`; it remains `pilot` and human review is pending. Review
Summary (`V1`) is the next dependency-order candidate.
