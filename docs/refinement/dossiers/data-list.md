# Component Dossier: Data List / Description List

Status: `human-review-ready`

Target reviewed: Neutral Web description-list primitive

Contract: `components/contracts/data-list.contract.json`

## Recommendation

Retain native `dl`/`dt`/`dd` semantics and the existing vertical/horizontal
presentation choice. Make both layouts resilient with logical alignment and
wrapping, and let the vertical variant stack each pair below a `20rem` component
container. Do not add properties for target-owned repeated data.

## Purpose And Limits

- Presents related terms and descriptions such as material, technique, or order
  metadata.
- Vertical is a sequence of bordered pairs; horizontal is a wrapping set of
  compact metadata groups.
- It is not a two-dimensional comparison table, navigation list, form, editable
  property grid, data formatter, or schema for consumer records.

## Current Gallery Result

- Registry `A26`, primitive, no dependencies; contract `0.3.0`, still `pilot`.
- Required root/item/term/value anatomy preserves `dl`, `dt`, and `dd` in source
  order for every layout.
- Body type resolves to the semantic `16/24px` pair.
- At `390px`, an unbroken extreme term/value previously expanded the document to
  `1177px`; root, items, and document now remain `326/326px` and `390px`.
- A `280px` vertical container switches pair direction from row to column with a
  `2px` gap and logical-start value alignment.
- At the same `280px` width, horizontal + RTL + extreme content remains
  `280/280px`; every item keeps its compact column anatomy and logical alignment.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML description-list standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element) | `dl` contains groups of terms and descriptions; `dt` and `dd` retain name/value association. | Preserve native semantics and adjacent source order regardless of layout. |
| [WAI Tables tutorial](https://www.w3.org/WAI/tutorials/tables/) | Tables are for row/column relationships, not generic visual alignment. | Route two-dimensional comparison to Data Table instead of stretching Data List. |
| [Polaris Description List](https://polaris-react.shopify.com/components/lists/description-list) | The historical mature API models consumer-owned terms/descriptions and scan-friendly presentation. | Use it as composition evidence only; Polaris React is not copied into the canonical source. |

Open UI, Radix Primitives, and current Shopify web components do not define a
standalone cross-target description-list widget with stronger consensus. Native
HTML remains the primary evidence.

## Anatomy, States, API, And Ownership

- Required root, repeated item, term/key, and description/value.
- Presentation states: vertical default, narrow vertical stack, and horizontal
  wrapping groups. There is no selection, hover action, or validation state.
- Public API contains only `variant=vertical|horizontal`.
- Targets own item count, term/value strings, localization, formatting, empty
  data policy, links inside descriptions, and record refresh.
- No controlled/uncontrolled state.

## Tokens, Runtime, And Content

- Public tokens: subtle row border, primary/secondary text, and body size/leading.
- `8px` row padding, `16px` pair gap, horizontal `16px 24px` gap, `2px` stacked
  gap, weights, and `20rem` threshold remain private composition.
- Long, localized, empty, and unbroken content is target-owned; the CSS contains
  it without silently truncating meaning.
- CSS/HTML-only: `0 B` component JS and no listener, observer, timer, request,
  asset, or formatter.

## Findings And Direction

| Finding | Severity | Direction |
| --- | --- | --- |
| Key used `flex-shrink: 0`; both parts could exceed the page. | resolved | Bounded flex parts with `overflow-wrap:anywhere`. |
| Values used physical right/left alignment. | resolved | Logical end/start alignment in both variants. |
| No component-responsive behavior existed. | resolved | Vertical pairs stack below a `20rem` container. |
| Type exposed size but inherited fractional leading. | resolved | Semantic body size/line-height pair. |
| Forced colors could soften row association. | resolved | Row rules map to CanvasText. |
| Repeated content could be mistaken for component defaults. | resolved | Contract and docs keep all pairs target-owned. |

## Cross-Target Translation

Web and Shopify render `dl` with adjacent `dt`/`dd` groups. React/Angular accept
consumer item rendering without owning a record schema. Figma maps vertical,
narrow-stack, and horizontal layouts. SwiftUI/Compose expose equivalent grouped
label/value accessibility and mirror logical alignment in RTL. Every target owns
content and formatting.

## Readiness Decision

Ready for human review; remains `pilot`. Semantics, both variants, container
response, logical RTL alignment, extreme content, forced colors, semantic type,
four viewports, byte-identical parity, and adapters pass. Human review must
approve the `20rem` threshold, row rule, gaps, weights, and horizontal group
density before any `stable` promotion.
