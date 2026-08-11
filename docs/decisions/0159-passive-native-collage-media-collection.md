# 0159. Passive Native Collage Media Collection

Status: Accepted

Date: 2026-07-16

## Context

S19 Collage Section is intended to present an ordered, art-directed collection
of target-supplied media with an optional heading and item-level feature span.
Its initial shared renderer emitted an unnamed section, a generic grid, five
actionless `div[tabindex="0"]` items, generic captions hidden until hover/focus,
and a site-only fixed row height. CSS duplicated viewport and container rules,
animated passive images, and relied on focus to disclose non-interactive text.

ADR 0082 already establishes that Collage items are target-owned slots and that
the neutral contract must not guess whether they are passive, links, Lightbox
triggers or commerce surfaces. HTML grouping semantics, WAI grouped-image
guidance, WCAG meaningful/focus sequence, CSS Grid accessibility requirements,
Open UI's lack of a Collage widget pattern, Polaris Grid, Radix composition and
Shopify image/section primitives establish a complete passive base without
resolving those target product choices.

The registered Figma nodes show Button and cannot approve S19 aesthetics.

## Decision

- Collage Section is a passive finite ordered media collection. It owns grouping,
  item geometry, one item-level feature modifier and section rhythm; it does not
  own navigation, Lightbox, selection, commerce, analytics or media delivery.
- A non-empty visible heading creates and names native `section.collage-section`
  through `aria-labelledby` and a target-unique id. Without a heading, targets
  render generic `div.collage-section`.
- One or more valid media records are required. Missing/empty required records
  omit the complete component.
- The collection uses native `ul`/`li` source order. Each item contains a native
  `figure`, target-owned media and an optional always-visible `figcaption`.
- Passive items receive no `tabindex`, click handler, pointer role, hover-only
  disclosure or focus style. A target may wrap a figure in a native anchor only
  when it owns a real destination, or compose another separately accepted
  native control.
- Feature is item metadata, not component state. It changes span only, never DOM
  order, accessibility order, activation, priority, selection or announcements.
  One clear feature item is recommended; target validation owns conflicting
  author requests.
- Captions remain visible without hover, focus, touch or motion. S19 owns no
  transition or animation, including image scaling.
- Responsive tracks and feature collapse are driven by component container
  width. Viewport rules and site-only row geometry are removed.
- The public neutral API remains optional `heading` and required ordered `items`.
  Media/caption/feature/destination remain target item composition. Columns,
  rows, row height, gap, crop, ratio, radius, caption surface, alignment,
  breakpoint, loading and focal point remain private or target-owned.
- S19 has a `0 B` neutral runtime and asset budget.
- Exhibit and Studio use one renderer, fixture, omission rule, native DOM and
  canonical CSS. No documentation-only component geometry is allowed.
- Shopify receives a target-native localized section with validated image
  blocks, explicit alternative-text intent, optional caption/destination/
  feature, editor attributes, responsive images, strict omission and zero JS.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  may prepare human review but cannot approve visual values or promote stable.

## Performance

S19 adds no neutral state, event, listener, observer, request, timer, layout read,
hydration or asset. The permanent Sections gzip ceiling remains `6,861 B` and
is not raised. Motion/duplicate responsive rules are removed to fund semantic
anatomy and container behavior.

## Target Translation

- Neutral Web uses conditional native root, list items, figures/captions,
  optional native links, container CSS and zero runtime.
- Webflow consumes source-identical CSS and maps CMS records into the item slot.
- Shopify maps merchant blocks into validated native figures and optional real
  links without turning editor fields into universal neutral properties.
- React/Angular remain thin native wrappers; Figma is a visual target; SwiftUI
  and Compose use native grid/image/text/link semantics in authored order.

## Open Human Boundary

This decision does not approve final track thresholds, row height, feature
ratio, crop, gap, radius, caption surface/inset/type, heading rhythm, focus
geometry, fixture, more than one feature item, target activation policy,
Shopify editor defaults, corrected Figma evidence or stability.

## Consequences

- Passive media no longer pollutes keyboard order or hides context behind focus.
- DOM, speech, focus and collapsed order remain authored and meaningful while
  feature spans create visual emphasis only.
- Target destinations and overlays use native/separately accepted semantics
  rather than generic focusable containers.
- The component remains target-agnostic, zero-runtime and suitable for exact
  Exhibit/Studio and cross-target review.
