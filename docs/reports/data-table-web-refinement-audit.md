# Table Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/data-table.contract.json` (`0.3.0`)

## Result

Table remains a native data table rather than an interactive ARIA grid. It now
has optional caption content, a named keyboard-focusable overflow owner, explicit
wrapper/sort focus, semantic cell/header type, intrinsic readable columns,
reduced-motion handling, and forced-colors boundaries.

## Semantics, API, And Interaction

- Required `table` structure preserves head/body, scoped headers, rows, and cells.
- Optional `caption` is a semantic string; Studio's “Available gallery objects”
  is fixture content and may be cleared.
- The wrapper has `tabindex="0"`, a contextual accessible name, and visible focus.
  At Mobile it scrolls `0 -> 27px` with Arrow Right.
- Sortable anatomy uses a native `button` and decorative icon. Enter changed
  `aria-sort` from `none` to `ascending`; Space changed it to `descending` while
  the first row changed from Celadon Vase to Tea Caddy.
- Targets own comparison, formatting, ordering, pagination, requests, loading,
  selection, editing, and announcements. No controlled base state is introduced.

## Typography, Responsive Width, And Special Modes

At `390px`, the wrapper/table resolve to `324/359px` and `359/359px` client/scroll
widths while the document remains `390px`. The table scrolls rather than breaking
reasonable cell labels across narrow columns. Cell type is semantic body and
header type is semantic body-small. The sort target is `32px` high with a `2px`
focus outline.

Row-hover transition resolves to `none`/`0s` under reduced motion. Forced colors
map borders to CanvasText, header surface to Canvas, and direction icons to full
opacity. The focused scroll and sort owners retain system focus visibility.

## Evidence, Runtime, And Targets

- Exhibit/Studio initial wrapper HTML is byte-identical: `558` tested characters.
- Eight canonical screenshots cover Mobile `390x844`, Tablet `768x1024`, Desktop
  `1280x800`, and XL `1600x1000` in both modes.
- Supplemental evidence covers before state, wrapper focus/scroll, sortable focus
  and ordering, forced colors, and reduced motion.
- Base adds `0 B` JS, listener, observer, timer, request, formatter, data model, or
  asset. Studio state demonstrates consumer-owned sorting only.
- Web/Shopify preserve native table/caption/scroll semantics; framework and native
  targets translate order ownership without copying the Studio data fixture.

## Before / After Evidence

The paired evidence is preserved under
`output/playwright/refinement-batch-06/`:

- `before/data-table-exhibit-mobile.png` records the unnamed, non-focusable
  overflow baseline;
- `after/data-table-scroll-focus-mobile.png` records the named focusable wrapper
  and contained horizontal scroll;
- `before/data-table-sort-focus-mobile.png` and
  `after/data-table-sort-focus-mobile.png` record the repaired sort-control focus
  treatment.

The eight files under `canonical/` are the final Exhibit/Studio candidate at
Mobile, Tablet, Desktop and XL. The DOM, keyboard and forced-color measurements
above explain the semantic changes that screenshots alone cannot prove.

## Human Review Input

Approve cell density, header surface, intrinsic horizontal scrolling, focus
appearance, sort target/icon, and whether a future target-specific adaptive table
should be specified separately. No `stable` promotion is authorized.

Evidence lives under `output/playwright/refinement-batch-06/`; `site/dist` was not
rebuilt.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run validate:tokens:web-components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run audit:refinement`
- `git diff --check`
