# 0237. Explicit Avatar Composition And Semantic Initials Scale

Status: Accepted

Date: 2026-07-20

## Context

ADR 0113 established Avatar as a passive, runtime-free identity thumbnail but
deferred two owner decisions: whether neutral source owns an image/fallback
lifecycle and whether initials typography changes across its 32, 40, 56 and
80px sizes. The owner accepted decision A15-A in the commerce-core packet.

## Decision

- A target explicitly renders either contextual native image markup or
  pre-derived one/two-grapheme initials. The neutral Avatar does not keep hidden
  fallback content or observe image loading and errors.
- Image source selection, responsive markup, CDN transformation, focal point,
  loading/failure policy, name parsing, initials derivation and the choice to
  replace an image with initials remain target responsibilities.
- `size` remains Avatar's only semantic property. It couples each accepted
  diameter to one existing semantic initials step:
  - Small, 32px: Caption.
  - Default, 40px: Body Small.
  - Large, 56px: Body Default.
  - Extra Large, 80px: Body Large.
- The type mapping is not an independent property or Studio control. Consumers
  cannot combine a diameter with an incoherent initials size through public API.
- Native images are unaffected by initials typography. Existing contextual
  alternative-text, passive-interaction, fixed-geometry, crop and forced-color
  rules from ADR 0113 continue to apply.
- Web and Shopify use the same canonical CSS mapping. Future framework and
  native adapters may implement target-owned image fallback without changing
  the neutral contract, provided they render only one resolved composition.
- Avatar remains `pilot`; this decision makes it eligible for human stability
  review but does not grant visual approval or promotion to `stable`.

## Consequences

- Initials no longer inherit an arbitrary surrounding font size and remain
  proportionate across the 2.5x diameter range.
- No public image URL, content-mode enum, fallback slot, loading state, event,
  parser or neutral runtime is introduced.
- Targets remain responsible for truthful identity data and localized grapheme
  derivation, while consumers receive one stable cross-target size API.
- Exact circle, crop, border, neutral colors and artwork still require explicit
  human visual review.
