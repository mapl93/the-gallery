# 0196. Native Table Of Contents Hierarchy And Target Reading State

Status: Accepted; data, current-state API, and placement default superseded in
part by ADR 0270

Date: 2026-07-17

ADR 0270 preserves this decision's native hierarchy, canonical Link,
`aria-current="location"`, and zero-L5-runtime boundaries while replacing the
classless in-flow default with target-supplied structured records, controlled
`currentSectionId`, and safely degrading sticky-by-default placement.

## Context

Table of Contents exposed default/sticky presentation, optional accessible
label/title and a required target item slot, but its H3/H4 classes expressed
hierarchy only through physical left padding in one flat list. Its visual active
class had no current-location semantics, links duplicated the canonical Link
primitive, hardcoded geometry included an assumed `80px` sticky header offset,
and Exhibit/Studio depended on local BlogStudio markup rather than a dedicated
fail-closed renderer.

HTML defines `nav` for links to page parts. WAI G64 describes a table of contents
as a hierarchical link list whose labels, order and destinations match the
document. Native ordered/nested lists expose that structure. WAI-ARIA defines
`aria-current="location"` for one current location in a related set. APG defines
no custom TOC widget; native Link behavior remains sufficient. USWDS demonstrates
heading extraction, observer tracking and smooth scrolling, but those behaviors
depend on a selected page root, heading inventory, offsets, focus/history policy
and runtime lifecycle that are not universal neutral-component decisions.

Shopify Article content exposes formatted HTML but no Liquid heading-index and
unique-id relationship. The repo cannot choose a menu, metafield, manual blocks,
HTML parser, build preprocessing or browser extraction as an incidental adapter
implementation.

## Decision

- L5 is one passive same-document navigation landmark. A non-empty localized
  `label` and non-empty `items` slot are required; missing either omits the
  complete component instead of emitting an empty or unnamed nav.
- The optional visible title is neutral text in the shared renderer because its
  heading rank is contextual. A target owning a stable title id and document
  rank may use a heading plus `aria-labelledby`.
- Items use one native ordered list, native list items and actual nested ordered
  lists for subsections. Finite H3/H4 indentation classes are removed; target
  text, nesting and order match the included document headings.
- Every item composes canonical Link in its navigation presentation and uses a
  real fragment that resolves to one unique heading. L5 depends on Link and no
  longer duplicates its hover, focus, wrapping, transition or reduced-motion
  rules.
- A target with verified current-section synchronization may mark exactly one
  anchor with `aria-current="location"`. The attribute drives an additional
  logical-start border and stronger weight so state is not color-only. Static
  targets omit current state; active-only classes, `aria-current="page"`,
  `aria-selected` and live scroll announcements are not used.
- Default remains in flow and ADR 0079's sticky presentation option remains.
  The host page/container owns the real header/safe-area offset, available block
  size, tall-list behavior, target-section scroll padding/margins, collision and
  focus-not-obscured policy. The base fallback is not page integration proof.
- Heading extraction, generated ids, scrollspy, observer thresholds, smooth
  scrolling, focus relocation, URL/history behavior and any shared state with
  Reading Progress remain target-owned. L5 has no controlled/uncontrolled state,
  parser, listener, observer, timer, request, asset or neutral JavaScript.
- Canonical CSS uses logical dimensions, one named inline-size container,
  existing semantic spacing/body-small/weight tokens, complete wrapping and
  forced-color current-state treatment. No new public token is introduced.
- `TableOfContentsArtwork` and `TableOfContentsFixture` become the shared
  Exhibit/Studio implementation and specimen. Site CSS only constrains preview
  width. Empty required composition renders nothing.
- Shopify remains planned until an article/template owner defines heading data,
  unique ids, editor/runtime lifecycle, placement and optional current tracking.
  Copied CSS alone is not target readiness.
- Contract and Studio metadata advance to `0.2.0`, remain `pilot`, and cannot
  become `stable` without target architecture, final visuals and human review.

## Consequences

- L5 now exposes real document hierarchy, native navigation and canonical Link
  behavior without importing a menu/tree widget or a neutral reading-state
  service.
- Exhibit and Studio can prove one DOM, fixture, current-location state and CSS
  implementation across responsive and accessibility modes.
- Targets remain free to author items manually, derive them at build time or add
  a bounded progressive observer, but each must prove accurate text/order/ids,
  native no-JS navigation, cleanup, reduced motion, focus and sticky offsets.
- Shopify maturity remains honestly incomplete rather than claiming that an
  unstructured rich-text string or generic menu is a certified article index.
- Final surface, marker visibility, indentation, active treatment, sticky
  behavior, automatic tracking, Shopify source and L5-specific Figma evidence
  remain explicit owner/target decisions.

## References

- <https://html.spec.whatwg.org/dev/sections.html#the-nav-element>
- <https://www.w3.org/WAI/WCAG22/Techniques/general/G64>
- <https://www.w3.org/WAI/tutorials/page-structure/>
- <https://www.w3.org/WAI/tutorials/page-structure/content/>
- <https://www.w3.org/WAI/tutorials/page-structure/sections/#labeling-regions>
- <https://www.w3.org/TR/wai-aria-1.2/#aria-current>
- <https://www.w3.org/WAI/ARIA/apg/patterns/link/>
- <https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>
- <https://designsystem.digital.gov/components/in-page-navigation/>
- <https://open-ui.org/components/>
- <https://www.radix-ui.com/primitives/docs/components/navigation-menu>
- <https://polaris-react.shopify.com/components/navigation/navigation>
- <https://shopify.dev/docs/api/storefront/latest/queries/articles>
