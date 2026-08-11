# 0118. Finite Product List Carousel Composition

Status: Accepted

Date: 2026-07-14

## Context

Product Slider had product-specific CSS and a four-card Studio example, but it
duplicated part of Carousel without declaring the dependency. Its track was an
unnamed `div`, breakpoint density followed the viewport, controls used physical
fractional scrolling, direct scrolling did not synchronize bounds, and the XL
fixture could not demonstrate overflow. Shopify rendered an inert related-
products section from recommendation data that it never requested.

WAI-ARIA carousel guidance establishes named regions, native previous/next
Buttons, focus behavior, and the additional duties introduced by autoplay.
Product Slider differs from a one-slide-at-a-time media carousel: multiple
complete products remain visible and the collection is most useful as a native
list. CSS Scroll Snap and native overflow already provide touch, wheel,
trackpad, scrollbar, and keyboard scrolling without an engine or a second arrow-
key model. Shopify Product Recommendations supplies target data through a
locale-aware Section Rendering request rather than a neutral product service.

ADR 0104 already accepts Carousel as a finite, user-controlled native scroll-
snap primitive with no implicit autoplay or loop. Product Card and Icon Button
remain the canonical content and control dependencies.

## Decision

- Product Slider is a short, finite, user-controlled product list for related,
  recommended, complementary, or recently viewed products. It is not a hero,
  infinite feed, collection grid, or recommendation provider.
- The root composes `.carousel.product-slider`; the native focusable `ul`
  composes `.carousel__track.product-slider__track`; each `li` composes
  `.carousel__slide.product-slider__item` and contains one canonical Product
  Card. Product Slider does not duplicate Card, Price, Badge, or quick-add
  anatomy.
- The visible heading names both the section and native list. Multi-card product
  collections preserve `ul`/`li` semantics instead of adding per-slide group
  roles, roledescription, hidden-slide state, or a second composite keyboard
  model.
- Optional previous/next controls are canonical round Icon Buttons with localized
  names, `aria-controls`, and native finite `disabled` state. They target exact
  adjacent item elements through logical `scrollIntoView`, never physical track
  fractions.
- Direct touch, wheel, scrollbar, trackpad, or keyboard scrolling derives the
  same nearest logical-start item and first/middle/last bounds as explicit
  controls. RTL is resolved from geometry and logical edges, not the sign or
  magnitude of `scrollLeft`.
- Focus remains on an activated navigation Button while another adjacent item is
  reachable. If activation makes that Button natively disabled at a finite
  bound, focus moves to the already named and focusable track before the browser
  can fall back to the document.
- Product density is intrinsic to the component container: two cards by default,
  three at `48rem`, and four at `64rem`. Card count is private layout geometry,
  not a public semantic property or token.
- v1 has no autoplay, loop, dots, drag physics, page-size property, lazy-loading
  policy, virtualization, analytics, persistence, network client, or neutral
  carousel engine. Those require explicit future product or architecture
  decisions.
- The base source adds no neutral JavaScript. Target controllers own supplied
  data and finite state. Frameworks may later expose controlled/uncontrolled
  current identifiers only after package demand establishes stable names and
  events.
- Exhibit and Studio use the same ProductStudio branch, six-item fixture, and
  extracted Product Card artwork. Site-only styles may bound the stage but may
  not implement Product Slider layout or behavior.
- Shopify owns the async recommendation lifecycle. Its dedicated section uses
  the locale-aware recommendations endpoint, omits empty/error output, composes
  canonical Product Card snippets and CSS classes, localizes storefront/editor
  labels, and installs one bounded controller with cleanup.
- The contract remains `pilot`. Automated and target evidence prepares the
  candidate for human review but never promotes it to `stable`.

## Performance

The neutral shared runtime remains unchanged. Deterministic level-9 gzip after
refinement measures:

- Product CSS: `5,322 B / 5.2 KiB`, leaving `2 B` of whole-byte headroom.
- Neutral Web component CSS: `65,452 B / 64 KiB`, leaving `84 B`.
- Shared neutral runtime: `10,492 B / 8 KiB`, the existing explicit cumulative
  `2,300 B` exception; Product Slider adds `0 B`.

No ceiling is reset. Later Product-family CSS must simplify existing source
before adding presentation.

## Consequences

- Product Slider inherits one tested Carousel interaction model and one Product
  Card implementation rather than accumulating target-specific copies.
- Native list order and all ordinary scroll paths remain available without
  JavaScript; target controls progressively add exact finite navigation.
- The focus-boundary rule prevents a disabled control from dropping keyboard
  users at the document root while preserving native disabled semantics.
- Shopify becomes a target-ready recommendation section without making Liquid,
  Section Rendering, or a product endpoint part of the neutral contract.
- Human review still must approve card density/crop, heading-control balance,
  gap, control surface/shadow, overall rhythm, and the inherited Product Card
  visual candidate. Future engine, autoplay, loop, pagination, persistence,
  controlled API, and merchandising policies remain explicit open questions.
