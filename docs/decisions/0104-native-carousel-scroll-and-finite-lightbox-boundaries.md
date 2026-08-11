# 0104. Native Carousel, Scroll Region, And Finite Lightbox Boundaries

Status: Accepted

Date: 2026-07-14

> Lightbox's finite-only boundary is extended by ADR 0238: it now exposes
> opt-in loop plus direct swipe and bounded zoom/pan so Product Gallery can
> compose one canonical image-detail renderer. Its Modal, focus, naming,
> synchronized figure, fallback and private on-scrim decisions remain accepted.

## Context

Batch 19 refines the final dependency-safe Layout interaction primitives before
moving into deeper product composition. Carousel had native scroll snap but
duplicated Icon Button presentation, used physical offset arithmetic, captured
arrow keys at the root, exposed 8px pointer targets, and did not synchronize
direct scrolling. Scroll Area preserved native overflow but lacked a visible
focus boundary, conditional landmark guidance, coarse-pointer treatment, and a
forced-colors fallback. Lightbox declared Modal as a dependency while
duplicating its overlay lifecycle, using an optional changing caption as the
dialog name, wrapping navigation implicitly, and depending on site-only CSS for
legible controls on a fixed black media canvas.

Existing decisions keep the semantic property surface intentionally narrow:
Carousel owns item `current` and `disabled`, Scroll Area owns optional `label`,
and Lightbox owns `open`, required current-image `alt`, and optional current-image
`caption`. Collection/index state, target services, and richer product behavior
must not become neutral scalar properties by accident.

## Decision

- Carousel v1 is a finite, user-controlled native horizontal scroll-snap
  collection. It does not autoplay or loop. A future rotating carousel requires
  a separate accepted pause/focus/hover/reduced-motion lifecycle.
- Carousel uses a named region, one focusable native scroll viewport, named slide
  groups, canonical round Icon Button previous/next controls, large-target dot
  Buttons with private visual bullets, one current dot, and an optional stable
  polite status.
- Carousel does not capture ArrowLeft/ArrowRight at the root. Native touch, wheel,
  scrollbar, and keyboard scrolling remain available. The target synchronizes
  nearest slide, current dot, bounded controls, and status after direct or
  explicit navigation.
- Explicit Carousel navigation targets slide elements with logical
  `scrollIntoView()` rather than multiplying physical `scrollLeft`; placement,
  icon direction, and state synchronization remain correct across gaps,
  variable widths, responsive containers, and RTL offset models.
- Carousel retains only item-level `current` and `disabled`. Slide collection,
  current index, grouping, visible-page calculation, lazy loading,
  virtualization, analytics, and any controlled/uncontrolled adapter events are
  target/consumer state.
- Scroll Area is exactly one native overflow node. CSS Scrollbars properties are
  the standards-based presentation path; WebKit pseudo-elements are progressive
  enhancement. The base adds no wrapper geometry, custom drag controller,
  observer, listener, timer, or asset.
- Scroll Area maps optional `label` to `role="region"`, `tabindex="0"`, and an
  accessible name together only when users must focus the root to reach
  overflow. Consumers omit the redundant landmark/focus stop when descendant
  controls already expose all content.
- Scroll Area provides a focus-visible boundary, uses platform auto-width
  scrollbars for coarse pointers, and restores system scrollbar colors in forced
  colors. Axis, viewport size, scrollbar position, and content remain layout or
  target concerns, not public component properties.
- Lightbox v1 is a finite Modal composition containing a stable title, a figure
  with current informative image and optional figcaption, canonical Close
  Button, canonical round Icon Button navigation, visible counter, optional
  stable polite status, and a named media-error fallback.
- Lightbox focus enters Close, stays within enabled controls, and returns to the
  invoker. Escape, the documented backdrop policy, and visible Close dismiss it.
  Logical arrow keys and controls update source, alt, caption, counter, status,
  and disabled bounds together. Previous is disabled first and next is disabled
  last; v1 does not wrap.
- Lightbox retains only `open`, `alt`, and `caption`. Stable title, collection,
  sources, current index, fallback/loading data, status localization, portal,
  inertness, scroll lock, preload, zoom/pan, gestures, thumbnails, downloads,
  and commerce actions remain target/composition responsibilities.
- The Lightbox media canvas is deliberately fixed black rather than theme-
  dependent. Until an owner accepts a semantic on-media-scrim token, black,
  white, and control foreground literals remain documented private variables;
  they are not promoted to public API and forced colors replaces them with
  system colors.
- Exhibit and Studio use the same renderer, fixture, properties, and canonical
  implementation for all three components. Site CSS may provide only fixture
  dimensions/media art and preview containment.
- All three contracts remain `pilot`. Automated readiness does not promote a
  component to `stable` without explicit human review.

## Performance

Batch 19 adds no neutral JavaScript, provider, observer, timer, request, bundled
asset, drag engine, or zoom engine. The Studio renderer demonstrates target-local
state synchronization and modal behavior without changing `components/js`.
Deterministic level-9 gzip without file metadata measures:

- Layout CSS: `6,822 B` against the permanent `4.8 KiB` family ceiling, a
  documented `1,907 B` exception.
- Shared neutral runtime: `10,321 B` against the permanent `8 KiB` ceiling,
  unchanged and covered by the existing runtime exception.
- Neutral Web component CSS: `63,507 B` against the `64 KiB` ceiling, leaving
  `2,029 B` headroom.

Relative to the Batch 19 baseline, Layout adds `465 B`, the complete Web
component bundle adds `614 B`, and neutral runtime source adds `0 B`. The Layout
exception records logical native scrolling, canonical-control composition,
focus/special-media behavior, safe modal media geometry, finite bounds, and
fallback presentation. It does not reset the permanent ceiling.

## Consequences

- Neutral Web and copied targets receive target-agnostic CSS; Web, Shopify,
  React, Angular, SwiftUI, and Compose adapters retain target-native collection,
  scroll, modal, focus, and state coordination.
- Shopify may use host media/modal surfaces when available or render Liquid
  collections with native overflow and bounded target JavaScript. Dedicated
  Carousel and Lightbox adapters remain planned; Scroll Area maps directly to
  the shared class contract.
- Figma maps anatomy, open/current/bound states, first/middle/last examples,
  native-scroll affordance, fallback media, and existing tokens. It does not own
  DOM roles, focus, scroll offsets, portal/inertness, or collection runtime.
- Product Gallery, Product Slider, and other composed media surfaces consume
  these primitives rather than duplicating control, scroll, or modal behavior.
- Exact slide peek/density, dot geometry, scrollbar weight, media bounds, scrim,
  control placement, caption hierarchy, and private on-scrim token debt remain
  visible human-review items rather than inferred product decisions.
