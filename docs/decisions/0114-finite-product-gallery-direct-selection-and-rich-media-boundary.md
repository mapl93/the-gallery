# 0114. Finite Product Gallery Direct Selection And Rich Media Boundary

Status: Accepted

Date: 2026-07-14

> Partially superseded by ADR 0238. Stable-id direct selection, ordinary Button
> groups, semantic touch targets and container layout remain accepted. The
> image-only boundary, private inline hover zoom and deferred rich-media,
> Lightbox, loop and swipe decisions are replaced by the owner-selected D2-C
> rich-media scope.

## Context

Product Gallery had an image-only visual implementation but three incompatible
semantic/runtime projections. Studio used plain Buttons with unsupported
`aria-selected`; Shopify combined incomplete listbox and tablist roles without
their focus, relationship or keyboard models; and the shared neutral runtime did
not respond to the authored data attributes at all. On small screens 8px dots
were also 8px hit targets. A page-viewport breakpoint forced side thumbnails in
embedded galleries narrower than the breakpoint.

ADR 0104 already establishes finite, manual Carousel and Lightbox boundaries and
requires higher product media surfaces to compose those primitives rather than
duplicate them. It does not decide whether Product Gallery v1 requires
Lightbox, zoom/pan, gestures or rich Shopify media.

## Decision

- Product Gallery v1 is finite and manually controlled. It never autoplays or
  loops in the neutral image-only mapping.
- The featured frame is required. Thumbnail and compact pagination groups are
  optional; one media item omits them.
- Direct selectors are native `button type="button"` controls inside named
  ordinary groups. Exactly one control in each rendered group uses
  `aria-current="true"`. Product Gallery does not claim Tabs or Listbox without
  their full semantics and keyboard models.
- Current informative image alt, source and current state synchronize together.
  Thumbnail images are null-alt inside already named controls.
- The neutral Web adapter provides bounded uncontrolled progressive enhancement
  only for authored `data-product-gallery` markup. It adds one delegated click
  listener per opt-in root and synchronizes authored data attributes. Framework
  adapters may own controlled state and omit the marker.
- Media collection, item id/type/source, current index, change events, variant
  synchronization, analytics, loading/error, responsive source generation and
  localization remain target/consumer state rather than neutral scalar
  properties.
- Compact pagination controls use the existing 44px semantic touch-target token
  around a private 8px visual bullet.
- The existing 768px responsive threshold becomes the equivalent 48rem query on
  a Product Gallery container. A required internal layout part allows the root
  to establish that container.
- Existing center `scale(2)` magnification is supplementary, applies only to a
  wide gallery with a fine hover pointer, and has no transform under reduced
  motion. Its origin, scale and cursor treatment remain private.
- Product video, external video, 3D, AR and click-to-Lightbox are explicit
  target-native maturity gaps. The image-only adapter must not simulate them.
- Exhibit and Studio use the same renderer, fixture, canonical classes, current
  state and semantic properties. Site CSS owns fixture art and containment only.
- Product Gallery remains `pilot`. Automated evidence cannot promote it to
  `stable` without owner decisions and explicit human review.

## Performance

Deterministic level-9 gzip without file metadata measures:

- Product CSS: `5,050 B` against the permanent `5.2 KiB` family ceiling,
  leaving `274 B`; Batch 29 adds `156 B` from the `4,894 B` baseline.
- Neutral Web component CSS: `64,930 B` against `64 KiB`, leaving `606 B`;
  Batch 29 adds `122 B` from the Batch 28 baseline.
- Shared neutral runtime: `10,492 B` against `8 KiB`, a `2,300 B` exception;
  Batch 29 adds `321 B` from the Batch 28 baseline.

The runtime delta is the bounded direct-selection behavior required to make
authored neutral Web and Shopify image galleries functional. It adds no global
listener, provider, observer, timer, request, drag engine, preload system, zoom
engine or asset; each explicit root receives one delegated click listener.

## Consequences

- Neutral Web and Shopify share source/current synchronization without importing
  React or Shopify data models into canonical source.
- Ordinary Button keyboard behavior remains predictable and all direct controls
  remain in the page tab order.
- Embedded galleries respond to available component width rather than page
  width; 48rem preserves the existing numeric mode threshold.
- The Shopify image-only snippet now has localized group/action names, responsive
  source data, variant-featured initial current state and decorative thumbnail
  images. Full `product.media` support remains separate work.
- Human review must decide whether mobile retains both selector groups and which
  rich-media/Lightbox capabilities are v1 requirements.

## Open Decisions

- Required versus optional Lightbox and the scope of zoom/pan, swipe, loop and
  full-screen behavior.
- Thumbnail-only, dot-only or deliberately duplicated mobile controls.
- Image-only v1 versus required video/external-video/model/AR parity.
- Controlled and uncontrolled public API names/events for framework adapters.
