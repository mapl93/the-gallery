# Component Dossier: Table

Status: `human-review-ready`

Target reviewed: Neutral Web native data table

Contract: `components/contracts/data-table.contract.json`

## Recommendation

Retain native table markup rather than an ARIA grid, add an optional native
caption, keep sorting inside native header buttons, and make the responsive
overflow wrapper a named keyboard focus owner. Preserve readable intrinsic
column width through horizontal scrolling instead of silently changing the data
into cards. Target-specific adaptive tables remain a separate composition.

## Purpose And Limits

- Presents data whose cells must be compared across consistent rows and columns.
- Supports independent striped, pointer-hover, and sortable-header capabilities.
- It is not a layout table, spreadsheet, treegrid, virtualizer, paginator, query
  client, formatter, or target-specific mobile list.
- Targets own rows, columns, comparison, locale rules, ordering, pagination,
  remote requests, loading, selection, editing, and announcement policy.

## Current Gallery Result

- Registry `A25`, primitive, no dependencies; contract `0.3.0`, still `pilot`.
- Required native `table`; optional wrapper, caption, sort button, and decorative
  sort icon.
- Studio caption copy is fixture content. Clearing it removes the caption without
  replacing it with a public default.
- The wrapper has `tabindex="0"`, a contextual accessible name, visible focus,
  and native horizontal arrow-key scrolling. At `390px`, client/scroll widths are
  `324/359px`, the document stays `390px`, and Arrow Right moves `0 -> 27px`.
- The sort trigger is `32px` high, has a `2px` focus outline, and synchronizes
  `none -> ascending -> descending` with the visible first row.
- Cell type resolves to `16/24px`; header type resolves to `14/20px` from the
  stable semantic body scale.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WAI Tables tutorial](https://www.w3.org/WAI/tutorials/tables/) | Native structure, headers, and captions expose row/column relationships. | Preserve `table`, `caption`, section, cell, and header semantics. |
| [APG Table pattern](https://www.w3.org/WAI/ARIA/apg/patterns/table/) | A static table is not an interactive grid and has no table-wide keyboard model. | Keep only actual controls in the tab order; do not add `grid` semantics. |
| [APG sortable table example](https://www.w3.org/WAI/ARIA/apg/patterns/table/examples/sortable-table/) | Sorting uses a native button in the header and `aria-sort` on the owning header; icons are decorative. | Match native activation, visible focus, one synchronized sort owner, and hidden icon semantics. |
| [Open UI Table research](https://open-ui.org/components/table/) | Static tables and data grids have different interaction and API boundaries. | Keep editing, cell navigation, and selection outside this primitive. |
| [Radix Themes Table](https://www.radix-ui.com/themes/docs/components/table) | Mature composition exposes native table parts plus density/layout choices. | Use the native part model as evidence; do not add unreviewed Gallery sizes or surfaces. |
| [Shopify Table](https://shopify.dev/docs/api/app-home/web-components/layout-and-structure/table) | Shopify may transform target data into a mobile list through target-owned slots. | Do not make that target-specific representation the base cross-target contract. |

## Anatomy, States, API, And Ownership

- Anatomy: optional scroll wrapper and caption; required table; native head/body,
  rows, headers, and data cells; optional sort button/icon.
- States: default, striped, row hover, unsorted, ascending, descending, scroll
  focus, and sort focus.
- Public properties: optional `caption`; independent `striped`, `rowHover`, and
  `sortable` booleans.
- No controlled table state. A framework adapter may control ordering while
  keeping `aria-sort` synchronized on exactly one header.

## Tokens, Runtime, And Content

- Public tokens cover border/focus, primary text, secondary surface, radius,
  motion, body type, and body-small header type.
- `10px 16px` cells, `32px` sort target, `14px` icon, weights, and intrinsic
  table width remain private composition.
- CSS/HTML-only base. The Studio fixture adds React state only to demonstrate
  consumer-owned sorting; base runtime adds `0 B`, no observer, timer, request,
  data model, or asset.

## Findings And Direction

| Finding | Severity | Direction |
| --- | --- | --- |
| No dataset-name property. | resolved | Optional native caption property and fixture. |
| Overflow wrapper was unreachable by keyboard and had no component focus style. | resolved | Named `tabindex=0` owner with focus ring and native scrolling. |
| Sort button relied on browser focus and was below the reviewed target height. | resolved | `32px` target and tokenized `2px` focus outline. |
| Header type used fractional `calc()`. | resolved | Body-small size/line-height pair. |
| Mobile columns compressed fixture labels. | resolved | Intrinsic width plus contained inline scrolling. |
| Row-hover motion continued under reduced motion. | resolved | Transition becomes `none`. |
| Adaptive card/list representation varies by target. | explicit boundary | Keep it out of the base contract. |

## Cross-Target Translation

Web and Shopify preserve native table/caption/header/cell semantics and a focusable
overflow owner. React/Angular bind ordering while keeping one `aria-sort` owner.
Figma maps caption, header, row, cell, striped, hover, and sort visuals without
inventing runtime behavior. SwiftUI/Compose use their table or accessible
collection equivalents and expose scrolling through platform conventions.

## Readiness Decision

Ready for human review; remains `pilot`. Native semantics, caption, keyboard
scrolling, sorting, focus, reduced motion, forced colors, extreme width, four
viewports, byte-identical Exhibit/Studio parity, and adapters pass. Human review
must approve density, the intrinsic-scroll presentation, header surface, focus
appearance, and whether a future target-specific adaptive table is desirable
before any `stable` promotion.
