# Component Refinement Batch 37

Status: Pagination refined and ready for human review

Date: 2026-07-14

Components: Pagination

## Outcome

Pagination's dossier, standards research, native listed-navigation decision,
contract, canonical CSS, shared Exhibit/Studio renderer, Studio metadata, MDX,
Shopify Liquid/locales, generated adapters, browser evidence, open questions and
individual audit are reconciled. The contract remains `pilot`; no component was
promoted to `stable`.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- The Web source uses one specifically named `nav > ul > li` hierarchy.
- Every available destination composes canonical Link with a real `href`.
- Exactly one current page is non-interactive text with `aria-current="page"`.
- Boundary directions are omitted; dead `aria-disabled` focus stops are gone.
- Passive ellipses are hidden from assistive technology and never interactive.
- Studio demonstrates a coherent target-owned ten-page window without adding a
  neutral algorithm or runtime.
- The list wraps intrinsically in narrow containers; CSS neither hides nor
  reorders destinations.
- Shopify uses its native `paginate` object, localized page names and the same
  anatomy and now reports implemented/ready.
- Registry, contract `0.2.0`, Studio, MDX, ADR and adapters agree on Link as the
  one dependency and on nine Pagination-owned public tokens.

## Browser Evidence Summary

- Exact Exhibit/Studio initial outerHTML parity is `1,791` characters in Mobile,
  Tablet, Desktop and XL.
- All eight default views have one named navigation/list, nine DOM items, six
  real links, one non-focusable current span, two hidden ellipses and no overflow.
- Mobile wraps the full target window to two rows; Tablet/Desktop/XL remain one
  row. The target token resolves to `44px` narrow and `40px` wide controls.
- First/middle/last boundary omission, page-window updates, input clamping, hrefs,
  no `aria-disabled`, exact Tab order and accessible-tree ellipsis removal pass.
- Long French directions, mixed Spanish/CJK naming and page `25000` wrap in a
  `311px` root without overflow.
- Light/dark default, hover and current contrast pass; forced-color focus,
  reduced-motion `0s`, RTL icon mirroring and console cleanliness pass.
- Four before, eight viewport-after and seven special-state images live under
  `output/playwright/refinement-batch-37/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Collection CSS | `2,253 B` | `2.5 KiB` | pass (`307 B` headroom; `-4 B` from Batch 36) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | existing exception (`2,300 B` over; no Pagination runtime) |
| Neutral Web components CSS | `65,527 B` | `64 KiB` | pass (`9 B` headroom; `-4 B` from Batch 36) |

## Human Review Queue

Review the current-page surface, page/ellipsis rhythm, `4px` gap, `40/44px`
density, directional icon recognizability and RTL, the full-window two-row Mobile
candidate, and whether v1 needs a compact page-window mode. Any compact, cursor,
load-more, infinite-scroll, visible-direction-label, self-linked-current or
client section-refresh policy remains target/product work.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web and Shopify
adapters, Shopify Liquid, structural/static/parity audits, browser states and
preferences, source/generated identity, deterministic gzip, global refinement
audit, temporary site build, diff checks, console cleanliness and `site/dist`
cleanliness form the final gate.

## Program Progress

After regeneration the program should contain 183 components, 107 dependency
edges, 78 dossiers and 67 components ready for human review. Pagination is
`human-review-ready`; it remains `pilot` and human review is still pending.
