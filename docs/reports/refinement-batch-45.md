# Component Refinement Batch 45

Status: Exhibition Landing Page refined and ready for human review

Date: 2026-07-14

Component: Exhibition Landing Page

## Outcome

Exhibition Page's dossier, standards research, passive composition decision,
contract, canonical CSS, media/no-media hero, semantic grouping, shared
Exhibit/Studio renderer, Studio metadata, MDX, generated adapters, browser
evidence and individual audit are reconciled. The contract remains `pilot`; no
component was promoted to `stable`.

Product Card and Artist Card composition remains an explicit open boundary.
Shopify remains `css-ready` until exhibition, work and artist template/data/
editor architecture is accepted.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- The shared candidate is a passive article labelled by its contextual title;
  a target page owns the surrounding main landmark and heading rank.
- Optional hero media now has an explicit modifier, target media and decorative
  scrim. Without media the hero uses a legible statement surface and primary
  text rather than inverse text over transparency.
- Untitled information is neutral instead of a hardcoded English landmark;
  metadata uses native description-list markup.
- Works and artists use visible-heading sections and native lists while their
  record content, dependencies and any interaction stay target-owned.
- Fictional artist fixture photography is decorative. Informative hero/work
  fixture media retains truthful descriptions.
- Container queries and intrinsic Grid replace the viewport breakpoint and all
  docs-only responsive column repairs.
- Complete typography, logical spacing, robust wrapping, semantic tokens,
  forced-color treatment and zero authored motion/runtime are canonical.
- Studio exposes nine semantic values/slots and token presentation without
  promoting internal hero/grid/crop/scrim decisions to public API.
- Neutral Web and Shopify consume generated canonical CSS. Shopify's copy is
  byte-identical and passes official validation; no target data model was
  invented.
- ADR 0130 records the safe implementation and preserved open boundaries.

## Browser Evidence Summary

- Exact Exhibit/Studio initial `outerHTML` parity holds in Mobile, Tablet,
  Desktop and XL, with zero neutral focus stops and no overflow.
- The shared tree is one labelled article, two visible-heading sections, two
  native lists and one description list in stable source order.
- Media-off and minimal modes omit media, overlay and every absent optional
  region without empty wrappers.
- Isolated `260/320/520/900px` hosts resolve `1/1/2/3` record tracks from their
  own width. Information becomes `2:1` only at the wide container.
- Long localized/unbroken RTL content fits `320px` without an overflowing
  descendant or source-order change.
- No-media hero contrast is `16.89:1` light and `7.00:1` dark; primary and
  secondary text pass in both themes. Worst-case scrim text is `5.74:1`.
- Forced colors uses Canvas/CanvasText and a system boundary. Reduced motion has
  zero animations and `0s` transitions.
- Eight before, eight final viewport and special-mode images live under
  `output/playwright/refinement-batch-45/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Storytelling CSS | `4,752 B` | `4.2 KiB` | exception (`451 B` over; `+168 B` from Batch 44) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | existing exception (`2,300 B` over; no Exhibition Page runtime) |
| Neutral Web components CSS | `66,702 B` | `64 KiB` | gap (`1,166 B` over; `+233 B` from Batch 44) |

All ceilings remain unchanged. The Storytelling/global/runtime overages stay
explicit program gaps; truthful optional states, semantics and intrinsic
reflow were not removed to manufacture a pass.

## Human Review Queue

Review hero bounds/container caps/crop/scrim/title measure, no-media statement
surface, information ratio and rhythm, record grid density and compact artist
treatment. Decide separately formal Product Card/Artist Card composition, any
record interaction mode, structured dates/media architecture and Shopify page/
record/editor/route ownership. Confirm that internal visual geometry and target
data/events remain outside the v1 neutral API.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web, Shopify and
copied CSS, mandatory Shopify docs/official validation, structural/static/
parity/refinement audits, browser semantics/states/preferences/reflow, source/
generated identity, deterministic gzip, temporary site build outside
`site/dist`, diff checks, zero-error component console and `site/dist`
cleanliness form the final gate.

## Program Progress

After regeneration the program contains 183 components, 109 dependency edges,
86 dossiers and 75 components ready for human review. Exhibition Landing Page
is `human-review-ready`; it remains `pilot` and human review is pending. Artist
Statement Section (`F8`) is the next dependency-order candidate.
