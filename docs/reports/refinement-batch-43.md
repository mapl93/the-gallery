# Component Refinement Batch 43

Status: Artist Index refined and ready for human review

Date: 2026-07-14

Components: Artist Index Grid

## Outcome

Artist Index's dossier, standards research, passive/native/container decision,
contract, canonical CSS, shared Exhibit/Studio renderer, Studio metadata, MDX,
generated adapters, browser evidence, filter boundary and individual audit are
reconciled. The contract remains `pilot`; no component was promoted to
`stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- A heading-labelled section and native `ul`/`li` replace the generic result
  container without adding composite grid/listbox keyboard behavior.
- One private container algorithm resolves one/two/three tracks from actual
  component width; docs-only padding and column authorities are removed.
- The shared default omits filters and removes incomplete local pressed state
  that never synchronized results.
- Optional target filter hooks keep touch, hover, focus, selected, disabled,
  forced-color and reduced-motion presentation without choosing semantics.
- Target-authored result order and record composition remain authoritative; no
  Artist Card dependency is inferred.
- Fictional repository media is decorative rather than falsely labelled as the
  named artists' portraits.
- Exhibit and Studio share one renderer, fixture, initial state and exact markup.
- Neutral Web and Shopify consume the exact canonical CSS. Shopify stays
  `css-ready` until owner/target decisions define artist data and filtering.
- ADR 0080's filter/dependency decisions remain open; ADR 0128 records the safe
  passive implementation.

## Browser Evidence Summary

- Exact Exhibit/Studio initial `outerHTML` parity holds in Mobile, Tablet,
  Desktop and XL; clean Artist Index markup is `1,771` characters.
- Standard roots are `310/688/532/536px` in Exhibit and
  `310/688/644/704px` in Studio, with `1/2/2/2` tracks, three native items, no
  default filters and no overflow.
- Isolated `260/580/900px` roots resolve `1/2/3` tracks and preserve source order.
- Native section/list/item semantics, decorative fixture media and zero default
  focusable descendants are confirmed.
- A synthetic target-filter specimen passes selected/default/disabled/long
  presentation, wrapping, focus and native Enter without changing neutral API.
- Long Arabic RTL/unbroken content and the `310px` narrow candidate have zero
  overflow. Light/dark contrast, forced colors and reduced motion pass.
- Four before, eight viewport-after and seven special-state images live under
  `output/playwright/refinement-batch-43/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Storytelling CSS | `4,571 B` | `4.2 KiB` | exception (`271 B` over; `+195 B` from Batch 42) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | existing exception (`2,300 B` over; no Artist Index runtime) |
| Neutral Web components CSS | `66,419 B` | `64 KiB` | gap (`883 B` over; `+128 B` from Batch 42) |

All ceilings remain unchanged. The overages are explicit program gaps for
shared-bundle optimization or owner decision; native semantics, special-mode
clarity and container behavior were not removed to manufacture a pass.

## Human Review Queue

Review `27rem`/`44rem` thresholds, maximum three tracks, gap, inset, heading
rhythm, result-card direction, filter density/radius/selected/focus treatment
and the filter-off default. Decide separately filter semantics/lifecycle, formal
Artist Card dependency and the Shopify artist data/editor model. Confirm that
layout and behavior internals remain outside the v1 public API.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web, Shopify and
Webflow outputs, mandatory Shopify docs/official validation, structural/static/
parity audits, browser states/preferences/reflow, source/generated identity,
deterministic gzip, global refinement audit, temporary site build outside
`site/dist`, diff checks, component-console inspection and `site/dist`
cleanliness form the final gate.

## Program Progress

After regeneration the program contains 183 components, 108 dependency edges,
84 dossiers and 73 components ready for human review. Artist Index Grid is
`human-review-ready`; it remains `pilot` and human review is pending. Artist Card
(`F6a`) is the next dependency-order candidate.
