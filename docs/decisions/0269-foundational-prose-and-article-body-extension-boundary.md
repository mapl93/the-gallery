# ADR 0269: Foundational Prose And Article Body Extension Boundary

- Status: Accepted
- Date: 2026-08-10
- Owners: The Gallery
- Scope: Foundations Prose ownership, L3 Article Body composition, commerce
  islands, full-bleed ownership, callout semantics, and migration aliases
- Refines: ADR 0195

## Context

The repository contained two generic `.prose` implementations: one in
Foundations and another inside the Blog family for L3 Article Body. The overlap
made source ownership ambiguous, spent family budget twice, and allowed a
copied target to receive different generic rich-text behavior depending on the
selected files. L3 also retained a bespoke product embed and a contained
full-bleed hook even though Product Card, Price, and host layout already own
those concerns.

HTML already supplies the stable semantics for authored long-form content:
headings, paragraphs, lists, links, quotations, figures, code, and tables. APG
defines no Prose widget or replacement focus model. Mature typography systems
also converge on a styled content root plus explicit exclusion boundaries for
canonical child components rather than a property for every authored node.

The owner selected direction L3-B.

## Decision

- Foundations is the sole owner of the public `.prose` style contract. Prose is
  reusable foundation infrastructure, not an additional registry component.
- L3 remains Article Body and explicitly consumes `.prose` through
  `.article-body.prose`. Blog CSS owns only Article Body-specific extensions.
- Article Body keeps one required non-empty `content` slot and optional
  `dropCap`. It adds no rich-block schema, parser, editor, heading inference,
  sanitizer, highlighter, observer, or neutral runtime.
- Article-specific parts use BEM selectors: pull quote and attribution,
  passive callout and icon, image pair/grid, local-overflow marker, and
  commerce-island wrapper.
- Product content inside the flow uses
  `.prose-excluded.article-body__commerce-island` and canonical Product Card
  and Price. Prose descendant rules must not restyle that island.
- Genuinely full-bleed content belongs to host layout outside `.prose`.
  Foundations and L3 expose no viewport-breakout or page-layout API.
- Static authored callouts remain ordinary content. A target composes canonical
  Alert only when timing or importance truthfully requires alert/status
  semantics.
- Legacy `.pull-quote`, `.pull-quote__attribution`, `.callout`,
  `.callout__icon`, and callout-variant aliases remain for one pre-v1 migration
  cycle. New markup uses Article Body BEM parts, and those aliases must be
  removed before the public v1 contract freezes.
- Exhibit and Studio consume one renderer and fixture. Target adapters preserve
  native authored semantics and canonical child ownership rather than copying
  React, Shopify, Figma, or CMS concerns into neutral source.
- L3 remains `pilot`; explicit human review is required before `stable`.

## Consequences

- Generic rich-text presentation now has one source owner and one reusable
  target contract without increasing the 183-component registry inventory.
- Blog CSS no longer duplicates Foundations Prose or bespoke commerce markup.
- Article Body can compose real commerce content while Product Card and Price
  retain their own markup, styling, semantics, and future target behavior.
- Host layouts must place actual full-bleed siblings deliberately; arbitrary
  CMS HTML cannot escape the readable Prose measure by applying an L3 class.
- Existing pre-v1 pull-quote and callout markup has a bounded migration path,
  not a permanent second public API.

## Not Approved

This decision does not approve:

- a separate Prose registry component or a second `.prose` implementation;
- public controls for measure, rhythm, heading styles, callout colors, media
  tracks, overflow widths, or other private composition details;
- duplicated mini Product Card or Price markup inside Article Body;
- viewport breakout, negative-margin full bleed, or page-layout ownership in
  Foundations or L3;
- automatic Alert semantics for static authored callouts;
- parsing, sanitizing, rewriting, or inferring structure from target HTML;
- permanent legacy aliases beyond the pre-v1 migration window;
- promotion from `pilot` to `stable` without explicit human review.

## References

- <https://html.spec.whatwg.org/multipage/grouping-content.html>
- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-blockquote-element>
- <https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element>
- <https://html.spec.whatwg.org/multipage/tables.html#the-table-element>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://www.w3.org/WAI/WCAG21/Understanding/reflow>
- <https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html>
- <https://github.com/tailwindlabs/tailwindcss-typography>
- <https://www.radix-ui.com/themes/docs/theme/typography>
- <https://shopify.dev/docs/api/liquid/objects/article>
