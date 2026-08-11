# 0110. Compact Rating Projection Semantics

> Identity note: ADR 0235 supersedes the former A11/V2 separation question by
> making A11 Rating canonical and deprecating V2 Star Rating without an alias.

Status: Accepted

Date: 2026-07-14

## Context

ADR 0064 established A11 Rating Stars as a passive display primitive with a
required accessible label, optional localized review-count text and
adapter-owned rating-to-star projection. The implementation nevertheless put
`role="img"` on the whole root, so the optional count was inside the image's
semantic boundary. Its full and empty text stars also used the same solid glyph
and depended mainly on color, the count lacked a complete semantic typography
mapping, and the Shopify adapter assumed English and a five-point scale.

The registry separately contains V2 Star Rating, a richer passive review-family
display with numeric and size APIs. Whether A11 and V2 remain distinct or are
consolidated is an explicit owner architecture question. Correcting A11's
existing semantics and target mapping does not require answering it.

## Decision

- A11 remains a compact passive projection for the purpose of this refinement.
  This decision does not settle its long-term identity relative to V2.
- `.rating` is an ordinary inline layout root. It has no image, widget, group,
  status, live-region or interactive semantics.
- `.rating__stars` is the single `role="img"` owner. Its required localized
  accessible label contains the resolved rating value and scale.
- Every `.rating__star` is decorative. Full, half and empty states use solid,
  partial-fill and outline form in addition to color so they remain distinct in
  monochrome and forced colors.
- Optional `.rating__count` is complete localized ordinary text outside the
  image boundary, uses `dir="auto"`, and is omitted when not supplied. A review
  destination composes a separate Link rather than making Rating interactive.
- The public semantic API remains exactly `accessibleLabel` and `reviewCount`.
  Neutral source accepts no number, formatter, scale, increment, rounding rule,
  event, controlled state or runtime behavior.
- Each target owns raw records, normalization, truthful star sequence, count,
  omission, structured data and dynamic announcements. Shopify reads the
  platform Rating object and chooses a nearest-half visual projection because
  this compact adapter has only full, half and empty anatomy.
- Existing accent, supporting-text and body typography tokens remain public
  references. Star geometry, gaps, partial-fill width, wrapping and bidi
  composition remain private implementation details.
- Exhibit and Studio use one `RatingStudio` renderer and initial 3.5/5 fixture.
  Fixture values are evidence, not defaults or a numeric component API.
- Rating remains `pilot`; automated evidence does not imply visual approval or
  promotion to `stable`.

## Performance

Rating adds no listener, observer, timer, formatter, request, animation, layout
read or asset. Deterministic level-9 gzip measures:

- Primitives CSS: `10,543 B` against the provisional `10.3 KiB` ceiling,
  leaving `4 B`.
- Neutral Web component CSS: `64,799 B` against `64 KiB`, leaving `737 B`.
- Shared neutral runtime: `10,171 B` against the provisional `8 KiB` ceiling,
  retaining its existing `1,979 B` exception and adding `0 B` for Rating.

Relative to the Batch 25 baseline, Primitives and complete Web component CSS add
`74 B` and `80 B` respectively. The bounded CSS delta covers shape-distinct
states, semantic count typography, logical wrapping and forced colors.

## Consequences

- Assistive technology receives one rating image followed by independently
  readable count text instead of one image that absorbs both properties.
- Full, half and empty meaning survives monochrome presentation without adding
  an icon dependency or neutral JavaScript.
- Shopify uses official value/scale data, translated labels/counts and ID-free
  half-star SVG composition while provider policy remains outside the source.
- React, Angular, Figma and native targets can map the same two-property passive
  contract while resolving their own visual sequence.
- A11 is not ready for human stability review until the owner chooses whether
  to retain the compact/richer split or consolidate A11 with V2 and migrate all
  consumers deliberately.
