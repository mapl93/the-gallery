# ADR 0270: Controlled Table Of Contents Records And Placement

- Status: Accepted
- Date: 2026-07-19
- Owners: The Gallery
- Scope: L5 Table of Contents neutral API, shared renderer, Web presentation,
  Shopify boundary, and future target translation
- Supersedes in part: ADR 0196's unresolved record/current-state API and
  classless in-flow placement default; all other native semantic boundaries are
  retained

## Context

ADR 0196 established native named navigation, nested ordered lists, canonical
Links, optional truthful `aria-current="location"`, and zero L5-owned runtime.
It intentionally left the data source, default placement, current-state API,
Shopify boundary, and shared Reading Progress relationship for owner input.

The owner selected target-supplied structured heading records instead of neutral
HTML parsing. The owner also selected both flow and sticky placement with sticky
as the preference, plus optional controlled current-section state. Those choices
must remain truthful across Web, Shopify, React, native, and future targets
without turning target measurement or CMS internals into public L5 properties.

## Decision

- `items` represents target-supplied ordered nested heading records. Every
  record requires a stable unique `id`, complete localized `label`, and optional
  `children`. Invalid, blank, or duplicate required records fail the complete
  renderer closed.
- Adapters map the records to native ordered/nested lists and canonical Links.
  Each encoded fragment resolves to exactly one same-document heading whose id
  is supplied by the same target source.
- Neutral L5 never parses rich HTML, extracts headings, generates or mutates ids,
  repairs duplicates, rewrites stored content, or infers important heading ranks.
- Add optional controlled `currentSectionId`. A matching record projects
  `aria-current="location"` to exactly one Link. Blank or unmatched values mark
  none; L5 has no uncontrolled selection or current-section mode.
- Capable targets derive `currentSectionId` from the same bounded reading-state
  service used by Reading Progress. L5 creates no second observer, scroll
  listener, polling loop, heading parser, or competing state store.
- Replace generic `variant` with semantic `placement: "sticky" | "flow"`,
  defaulting to `"sticky"`. Both values preserve identical content, DOM,
  semantics, source order, and controlled state.
- Sticky is a preference, not permission to obscure content. Neutral Web bounds
  sticky content to the available dynamic viewport and applies it only in
  sufficiently wide and tall viewports. Narrow, zoomed, short, or incapable
  contexts degrade to normal flow.
- The target adapter owns the real fixed-header and safe-area offset, containing
  layout, collision boundary, long-list behavior, section scroll margins, zoom,
  and focus-not-obscured evidence. These remain private integration facts, not
  public breakpoint, offset, height, or overflow properties.
- Shopify exposes L5 only when an article source supplies the records and
  matching ids, or verified preprocessing emits both atomically. Arbitrary
  merchant HTML is never parsed by neutral L5 and a Shopify navigation menu is
  not a substitute for article structure.
- Exhibit and Studio use the same `TableOfContentsArtwork`, fixture records,
  property values, canonical CSS, and Link implementation.
- Contract and Studio metadata advance to `0.3.0` and remain `pilot`. Passing
  automation makes L5 ready for explicit human review but never `stable`.

## Accessibility And Responsive Requirements

- Root navigation is always named; lists and Links preserve document order and
  hierarchy without menu, tree, selected, expanded, or roving-focus semantics.
- Current state uses `aria-current="location"`, stronger weight, and a
  logical-start border so it is not color-only. At most one Link is current.
- Flow and sticky have the same Tab order and native fragment behavior. Every
  focused Link in a bounded sticky surface remains visible and reachable.
- Long localized and unbroken labels reflow without clipping at narrow
  containers, effective 200 percent text, user text-spacing overrides, and RTL.
- Forced colors preserve current and focus cues; L5 adds no motion or live
  announcement.

## Consequences

- The API exposes stable cross-target decisions without exposing observer
  thresholds, heading selectors, breakpoints, offsets, indentation levels, or
  internal layout variables.
- A static target can omit `currentSectionId` and retain complete useful native
  navigation. An enhanced target can project shared reading state without
  altering L5's markup contract.
- Shopify remains honestly `planned` until its first article source can prove
  structured heading/id data. This is a concrete data-availability gate, not an
  unresolved neutral architecture choice.
- Final aesthetics and stability still require explicit human review.

## Not Approved

This decision does not approve:

- parsing arbitrary article HTML in neutral source or Liquid;
- an independent L5 observer, global scroll listener, polling loop, or store;
- public observer threshold, selector, offset, breakpoint, max-height,
  indentation, or scrollbar properties;
- menu, tree, tab, disclosure, or live-region semantics;
- smooth scrolling, focus relocation, or history mutation by default;
- Shopify target readiness without structured records and matching ids;
- L5-specific Figma artwork by inference; or
- promotion from `pilot` to `stable`.

## References

- `docs/refinement/owner-decision-responses.md`, decision 49
- `docs/decisions/0196-native-table-of-contents-hierarchy-and-target-reading-state.md`
- `docs/decisions/0228-decorative-reading-progress-controlled-and-automatic-sources.md`
- `docs/decisions/0254-cart-page-configurable-safe-summary-placement.md`
- <https://html.spec.whatwg.org/dev/sections.html#the-nav-element>
- <https://www.w3.org/WAI/WCAG22/Techniques/general/G64>
- <https://www.w3.org/TR/wai-aria-1.2/#aria-current>
- <https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/reflow.html>
