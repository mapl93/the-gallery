# 0073. Remaining Layout Semantic Studios

Status: Accepted

Date: 2026-07-12

## Context

Command Palette, Steps, Carousel, Scroll Area, and Lightbox completed the
registered Layout and Overlays category but lacked reviewed Studio surfaces.
Several Exhibit examples also depended on remote placeholder images or inline
layout styles.

## Decision

- Command Palette exposes `open` and `query`. Command inventory, filtering,
  shortcut registration, highlight coordination, and execution remain target
  behavior or consumer data.
- Steps exposes only `orientation` through the canonical variants. Step labels,
  count, and per-item progress state remain consumer-owned ordered content.
- Carousel exposes `current` for an individual pagination dot and `disabled`
  for an individual navigation control. Slide models and current index remain
  target coordination concerns.
- Carousel Studio uses the canonical native scroll track and updates its
  position through navigation controls rather than replacing native scrolling.
- Scroll Area exposes only an optional accessible `label`. Bounds and content
  remain layout and composition decisions.
- Lightbox exposes `open`, required image `alt`, and optional `caption`.
  Gallery data, current index, focus trapping, dismissal, and navigation
  coordination remain target behavior.
- Overlay Studios start visible and reveal a trigger after close. They are
  contained by the Studio stage without changing canonical fixed positioning.
- Exhibit media fixtures are local and network-independent. They do not become
  canonical component assets or defaults.
- No new public component tokens are introduced.

## Consequences

- All 17 Layout and Overlays components now have Studio definitions.
- Layout contracts remain small and avoid freezing fixture collections into
  target-agnostic API.
- The entire category remains `pilot` except components separately approved by
  the owner after human review.
