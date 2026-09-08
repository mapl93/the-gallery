# 0090. Product Card Canonical Card and Single Navigation

Status: Accepted

Superseded in part by ADR 0276: Quick Add becomes persistent Quick Look and
Product Card suppresses inherited Card hover elevation/shadow growth.

Date: 2026-07-13

## Context

The Product Card contract listed Badge, Button, and Price dependencies, while its
canonical CSS declared Card-like private values without applying the shell.
Studio recreated surface, border, radius, shadow, and overflow, and Shopify
already rendered `card product-card`. Documentation also mixed a media link with
a title link whose pseudo-element stretched across the full card. Quick add was
hidden on pointer devices without hover.

## Decision

- Product Card composes the canonical Card root on the same `article` and lists
  Card as a dependency alongside Badge, Button, and Price.
- Card owns surface, border, radius, shadow, clipping, and lift. Product Card
  owns product media, content, commerce slots, and interaction layering.
- The product title is the single product-detail link. Its hit area may stretch
  over passive card content; media is not a second link.
- Quick add and any other interactive descendants remain above the stretched
  title link, retain their canonical component semantics, and include contextual
  accessible names when repeated.
- Quick add is revealed by fine-pointer hover or keyboard focus and remains
  visible when hover is unavailable or the primary pointer is coarse.
- The title link produces a visible card-sized focus indicator. Decorative
  Product Card transitions stop under reduced motion.
- Product Card does not choose a new media aspect ratio in this decision. That
  remains an owner-facing aesthetic and product-density decision.

## Consequences

- Studio preview classes may size Product Card but may not recreate Card visuals.
- Exhibit, Studio, documentation fixtures, and target adapters must render both
  `card` and `product-card` on the root.
- Shopify alternate hover imagery uses empty alternative text, its quick-add
  Button uses canonical classes, and undeclared Rating composition is removed
  from the base snippet.
- A future primary-media semantic property still requires a target-agnostic
  media contract; this decision does not introduce a Web URL property.

## Follow-up

ADR 0221 resolves the media-ratio question left open here. It adds the bounded
`square | portrait` property with `square` as the default; all other boundaries
in this decision remain in force.
