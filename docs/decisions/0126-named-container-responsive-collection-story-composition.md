# 0126. Named Container Responsive Collection Story Composition

Status: Accepted

Date: 2026-07-14

## Context

ADR 0080 established Collection Story as a passive editorial composition whose
`reversed` boolean changes wide visual placement without changing source order.
The initial implementation did not fully encode that boundary: the root grid
responded to the page viewport, the docs site supplied a second container rule,
Shopify emitted an empty media track and replaced merchant image metadata, and
the shared renderer exposed one ordinary action as an English-labelled
navigation landmark.

HTML defines a thematic section with a contextual heading, native quotation
markup and contextual image alternatives. Open UI has no settled compound Card
anatomy, while Radix and Polaris demonstrate explicit composition of media,
content and actions rather than an implicit whole-surface interaction model.
Shopify `image_picker` data includes merchant-authored alt and focal-point
information that the adapter should preserve.

The registered Figma reference remains the generic Button Studio prototype and
contains no Collection Story visual evidence. The repository implementation is
therefore the candidate for owner-led visual review, not a derivation from that
frame.

## Decision

- Collection Story is a passive native section associated with its visible
  contextual heading through a target-unique `aria-labelledby`/`id` pair.
- The accepted public API remains `reversed`, `media`, `label`, `title`, `body`,
  `inspiration`, and `actions`. Title and body are required; other content is
  omitted completely when absent.
- A required `.collection-story__layout` wrapper owns composition. The optional
  `.collection-story__layout--with-media` modifier is present only with media.
- The root establishes the named `collection-story` inline-size container. The
  inner layout becomes two columns only with media and sufficient component
  width; media absence never reserves an empty column.
- Media stays before narrative in source order. `.collection-story--reversed`
  changes only wide visual placement and remains a boolean layout property, not
  a state or registry variant.
- The private media ratio remains `4:3`; crop, focal point, loading, alternative
  text and decorative intent remain target responsibilities.
- `inspiration` uses native `blockquote` only for text quoted from another
  source. Attribution or citation content stays separate and target-authored.
- `.collection-story__actions` is an ordinary action group, not an automatic
  navigation landmark or composite widget. Composed native controls retain
  their own destination, activation and focus behavior.
- Canonical CSS owns full typography, logical quotation geometry, rich-text
  rhythm, content containment, surface, spacing and forced-color behavior.
  Docs-site Collection Story presentation overrides are removed.
- Shopify maps localized editor settings to the same anatomy, preserves merchant
  image alt/focal point, supports decorative intent, omits absent anatomy and
  composes one canonical Button link only when a real destination exists.
- The neutral component adds no JavaScript, controlled/uncontrolled state,
  listener, observer, timer, request, live region or motion.
- No Button dependency is added. The actions slot may compose Button in a target
  fixture, but ADR 0080 requires explicit human/product review before formal
  dependency additions.
- The contract remains `pilot`; automated and visual evidence can make it ready
  for human review but cannot promote it to `stable`.

## Open Human Boundary

This decision intentionally does not approve:

- the `4:3` ratio, crop treatment, large media radius, equal columns or private
  intrinsic threshold;
- section inset, narrative measure, type hierarchy, vertical rhythm, quote rule
  or accent pairing;
- primary versus outline action emphasis or a future formal Button dependency;
  or
- public layout, media-position, alignment, surface, density, heading-rank or
  action-style properties.

Those choices require explicit owner review. Their absence does not block a
truthful semantic, responsive and target-native implementation.

## Consequences

- Neutral Web, Exhibit, Studio and Shopify share one explicit source-order-safe
  anatomy and component-width-responsive composition.
- Narrow embedded instances no longer inherit a wide page layout, and media-free
  instances no longer retain empty columns or wrappers.
- Native document semantics remain understandable without CSS, media or
  JavaScript; target actions stay ordinary links/buttons.
- Shopify merchants retain image alt/focal-point data and localized editor
  controls without a target-specific runtime.
- Consumers adding media must add the explicit layout modifier; consumers using
  the previous root-as-grid markup should migrate content into the inner layout.
- Owner review is still required before `stable` or before adding a formal
  dependency or new aesthetic/layout properties.
