# Component Refinement Batch 41

Status: Collection Story refined and ready for human review

Date: 2026-07-14

Components: Collection Story

## Outcome

Collection Story's dossier, standards research, passive named-section and
intrinsic-layout decision, contract, canonical CSS, shared Exhibit/Studio
renderer, Studio metadata, MDX, Shopify Liquid/locales, generated adapters,
browser evidence, open boundary and individual audit are reconciled. The
contract remains `pilot`; no component was promoted to `stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- One thematic native section is named by its visible contextual heading.
- A required inner layout and explicit media-present modifier prevent empty
  tracks and respond to the component's own inline size.
- Wide reversal changes visual placement only; DOM and accessibility order stay
  media then narrative.
- Target-owned media preserves contextual alt/decorative intent, crop, focal
  point and loading instead of deriving meaning from the title.
- Native quotation and ordinary action-group semantics replace host-dependent
  margins and a redundant navigation landmark.
- Complete semantic typography, logical geometry, source-strength host
  isolation, containment, forced colors and extreme reflow live in canonical
  CSS.
- Exhibit and Studio share one renderer, fixture and exact initial markup.
- Shopify localizes its section, omits absent anatomy, preserves image metadata,
  composes a canonical Button only with a destination and reports ready.
- No formal Button dependency is inferred; ADR 0080 keeps that owner/product
  decision open.

## Browser Evidence Summary

- Exact Exhibit/Studio initial `outerHTML` parity holds in Mobile, Tablet,
  Desktop and XL; clean component markup is `1,128` characters.
- Standard roots are `310/688/532/536px` in Exhibit and
  `310/688/644/704px` in Studio, with intrinsic one-column layout and no page
  overflow.
- A `900px` isolated host uses two `341.84px` columns; visual reversal computes
  `2/0` while source order remains unchanged. A `640px` host stays one column.
- No-media and independent optional omission leave no empty public wrappers.
- The named section exposes one image, heading, native quotation and link, and
  no nested navigation. Native Enter activation and visible keyboard focus pass.
- Long RTL/unbroken content, isolated 200% reflow, light/dark contrast, forced
  colors and reduced motion pass. The final component produces no console errors
  or warnings; a fresh session records the existing shell-level `/favicon.ico`
  404.
- Four before, eight viewport-after and eight special-state images live under
  `output/playwright/refinement-batch-41/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Storytelling CSS | `4,374 B` | `4.2 KiB` | exception (`74 B` over; `+154 B` from baseline) |
| Shared neutral runtime | `10,501 B` | `8 KiB` | existing exception (`2,309 B` over; no Collection Story runtime) |
| Neutral Web components CSS | `66,238 B` | `64 KiB` | gap (`702 B` over; `+213 B` from Batch 40) |

Both CSS ceilings remain unchanged. The overages are explicit program gaps for
shared-bundle optimization or owner decision; semantic typography, responsive
ownership, target boundaries and extreme-content containment were not removed
to manufacture a pass.

## Human Review Queue

Review the `4:3` media candidate, crop, large radius, equal columns, private
threshold, section inset, narrative measure, title/body/label hierarchy,
vertical rhythm, quotation rule/accent pairing, and primary Web versus outline
Shopify action emphasis. Decide separately whether Button becomes a formal
dependency. Confirm that columns, breakpoint, ratio/position, alignment,
surface, density, heading rank and action style stay outside the v1 public API.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web, Shopify and
Webflow outputs, mandatory Shopify docs/official validation, structural/static/
parity audits, browser states/preferences/reflow, source/generated identity,
deterministic gzip, global refinement audit, temporary site build, diff checks,
component-console inspection and `site/dist` cleanliness form the final gate.

## Program Progress

After regeneration the program should contain 183 components, 108 dependency
edges, 82 dossiers and 71 components ready for human review. Collection Story
is `human-review-ready`; it remains `pilot` and human review is still pending.
Masonry Gallery (`F5`) is the next dependency-order candidate.
