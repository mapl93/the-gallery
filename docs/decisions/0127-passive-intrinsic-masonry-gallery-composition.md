# 0127. Passive Intrinsic Masonry Gallery Composition

Status: Accepted

Date: 2026-07-14

## Context

ADR 0080 established Masonry Gallery as an ordered artwork slot while leaving
piece activation intentionally unresolved: a target may eventually choose
passive content, artwork links, Lightbox triggers or more than one target mode.
The initial implementation violated the safe passive boundary. A fine-pointer
media query hid every caption, including captions inside passive figures that
could never receive focus, and applied hover scale to passive artwork. The root
also used page viewport breakpoints while Studio supplied a second set of
container-based column overrides and artificial item ratios.

HTML and WAI guidance support native list and figure/caption composition with
target-authored image alternatives. CSS multi-column layout retains source flow
and provides fragmentation controls, while the experimental CSS Grid masonry
draft still documents reading-order concerns. Open UI records divergent Card
and overlay patterns rather than a settled gallery API. Radix exposes generic
Grid/Aspect Ratio primitives, and Shopify exposes responsive image metadata plus
merchant-reorderable section blocks.

The registered Figma reference remains the generic Button Studio prototype and
contains no Masonry Gallery artwork, column, ratio or caption evidence. The
repository implementation is therefore a candidate for owner-led visual review,
not a derivation from that frame.

## Decision

- The canonical candidate is a passive native `ul` containing ordered `li`
  records and passive `figure`/`figcaption` artwork composition.
- The accepted public API remains one required `items` slot. The target owns
  records, contextual group naming, image sources/dimensions/loading, alt or
  decorative intent, title, formatted price and localization.
- Source order is authoritative. Dense packing, CSS `order`, explicit visual
  reordering and runtime repacking are not allowed.
- CSS multi-column layout uses a private minimum column width and maximum of
  three columns so the gallery responds to its own content box. Page viewport
  media queries and docs-only column overrides are removed.
- Images keep target-provided natural proportions. The component does not apply
  nth-child aspect ratios or one shared crop.
- Passive captions remain visibly persistent on coarse and fine pointers.
  Passive figures have no pointer cursor, focusability, activation or hover-only
  affordance.
- Only a target that supplies semantically valid native interactive composition
  may opt into paired fine-pointer hover and focus-visible caption disclosure
  and subtle media scale. Reduced motion removes that scale/transition.
- Caption presentation uses neutral surface/text tokens, complete typography
  pairs and existing semantic weights. It does not consume Button tokens.
- Canonical CSS owns list/figure resets, intrinsic columns, fragmentation,
  natural image containment, caption presentation, focus, forced colors and
  reduced motion. Studio retains target-owned fixture assets only.
- Shopify maps the same passive anatomy to one localized, merchant-addable
  section. Each artwork is one reorderable block with image, decorative intent,
  optional title and optional formatted price, plus editor attributes.
- Missing Shopify images do not emit incomplete gallery records. The platform's
  `image_tag` owns CDN dimensions and responsive candidates; Shopify's default
  section-position policy owns lazy loading.
- The neutral component adds no JavaScript, controlled/uncontrolled state,
  listener, observer, timer, request, live region or focus-management model.
- No Link, Lightbox, Price or Card dependency and no activation property are
  added. ADR 0080's product boundary remains open.
- The contract remains `pilot`; automated and visual evidence can make it ready
  for human review but cannot promote it to `stable`.

## Open Human Boundary

This decision intentionally does not approve:

- passive versus link versus Lightbox activation or a target-selectable mode;
- the private minimum column width, maximum three columns or source-flow visual
  reading model;
- natural ratio treatment, medium radius, caption surface/placement, type
  hierarchy, padding or optional interactive scale; or
- public column, ratio, crop, overlay, density, group-name or activation
  properties.

Those choices require explicit owner/product review. Their absence does not
block a truthful passive, accessible, intrinsic and target-native candidate.

## Consequences

- Neutral Web, Exhibit, Studio and Shopify share one passive source-ordered
  anatomy, intrinsic responsive authority and persistent caption behavior.
- Embedded galleries no longer derive columns from page width or require site
  corrections; target media dimensions create the visual rhythm directly.
- Mouse, touch and keyboard users receive equivalent passive metadata, while a
  future interactive target has an explicit native focus/hover path.
- Shopify merchants can add, remove and reorder complete artwork records without
  receiving an invented destination or Lightbox lifecycle.
- Existing consumers relying on viewport column breakpoints, nth-child fixture
  ratios or hover-hidden passive captions receive the corrected canonical
  behavior when they regenerate copied targets.
- Owner review is still required before `stable`, before activation becomes
  public API, or before any formal dependency is added.
