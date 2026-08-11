# Component Refinement Batch 42

Status: Masonry Gallery refined and ready for human review

Date: 2026-07-14

Components: Masonry Gallery

## Outcome

Masonry Gallery's dossier, standards research, passive/native/intrinsic decision,
contract, canonical CSS, shared Exhibit/Studio renderer, Studio metadata, MDX,
Shopify Liquid/locales, generated adapters, browser evidence, activation
boundary and individual audit are reconciled. The contract remains `pilot`; no
component was promoted to `stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- Native list/figure/caption anatomy replaces manual role duplication.
- Authoritative source order and natural media proportions remain target-owned;
  no dense packing, viewport breakpoint or runtime measurement is used.
- One private intrinsic algorithm resolves one to a maximum of three columns
  from the actual component width.
- Passive captions remain visible on all inputs, while passive figures expose no
  pointer or keyboard affordance.
- Only native target-interactive roots may pair fine-pointer hover with
  focus-visible disclosure and reduced-motion-aware scale.
- Neutral caption tokens and complete typography replace unrelated Button
  tokens and literal type values.
- Exhibit and Studio share one renderer, accurate fixture and exact markup.
- Shopify provides localized reorderable artwork blocks and image metadata,
  reports ready, and adds no destination or Lightbox behavior.
- ADR 0080's activation decision remains explicitly open; no dependency or
  property was inferred.

## Browser Evidence Summary

- Exact Exhibit/Studio initial `outerHTML` parity holds in Mobile, Tablet,
  Desktop and XL; clean gallery markup is `1,989` characters.
- Standard roots are `310/688/532/536px` in Exhibit and
  `310/688/644/704px` in Studio, with one track on Mobile and two elsewhere,
  passive caption opacity `1` and no page overflow.
- Isolated `260/580/900px` roots resolve `1/2/3` tracks, preserve source order
  and retain natural portrait/landscape dimensions.
- Optional caption/title/price omission, long RTL/unbroken content and isolated
  200% reflow pass without overflow.
- Passive cursor/tabindex absence and a synthetic native-link hover/focus/Enter
  path pass. Light/dark contrast, forced colors and reduced motion pass.
- Four before, eight viewport-after and eleven special-state images live under
  `output/playwright/refinement-batch-42/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Storytelling CSS | `4,376 B` | `4.2 KiB` | exception (`76 B` over; `+2 B` from Batch 41) |
| Shared neutral runtime | `10,501 B` | `8 KiB` | existing exception (`2,309 B` over; no Masonry Gallery runtime) |
| Neutral Web components CSS | `66,291 B` | `64 KiB` | gap (`755 B` over; `+53 B` from Batch 41) |

All ceilings remain unchanged. The overages are explicit program gaps for
shared-bundle optimization or owner decision; semantics, intrinsic layout,
target boundaries and extreme-content containment were not removed to
manufacture a pass.

## Human Review Queue

Review the private `13rem` minimum column width, maximum three columns, gap,
source-flow visual order, natural ratios, medium radius, opaque caption surface,
caption placement, title/price hierarchy, padding and optional interactive
scale. Decide separately whether pieces remain passive, link to artwork, open a
Lightbox or support target-specific modes. Confirm that layout, ratio, crop,
caption and activation controls stay outside the v1 public API.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web, Shopify and
Webflow outputs, mandatory Shopify docs/official validation, structural/static/
parity audits, browser states/preferences/reflow, source/generated identity,
deterministic gzip, global refinement audit, temporary site build outside
`site/dist`, diff checks, component-console inspection and `site/dist`
cleanliness form the final gate.

## Program Progress

After regeneration the program contains 183 components, 108 dependency edges,
83 dossiers and 72 components ready for human review. Masonry Gallery is
`human-review-ready`; it remains `pilot` and human review is pending. Artist
Index Grid (`F6`) is the next dependency-order candidate.
