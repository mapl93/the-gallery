# 0280. Product Card Unified Content Inset

Status: Accepted

Date: 2026-08-12

## Context

During final live Product Card review, the owner observed that the `New` Badge
used a compact `12px` media inset while the text, Price, and Quick Look columns
used the substantially wider `--space-layout-element-gap` value. Although Quick
Look, title, and Price aligned with one another, the card did not align as one
composition with its Badge and carried excessive side and bottom whitespace.

## Decision

- Product Card owns one private `--_product-card-content-inset` value of `12px`.
- The Badge stack uses that value at logical inline start and block start.
- Body, required Price, optional footer actions, and Quick Look use the same
  logical inline inset.
- Quick Look and the final Price or optional footer use the same value at the
  lower edge of their respective regions.
- Existing vertical hierarchy remains unchanged: artist and title stay closely
  paired, while description and Price retain their separate `12px` tiers.
- The former Product Card declaration of `--space-layout-element-gap` is removed
  from its public token inventory because it no longer controls this layout.
  No new public spacing token is introduced for this internal composition rule.

## Consequences

- Badge, Quick Look, artist/title/description, Price, and optional footer action
  align to one compact column in both left-to-right and right-to-left layouts.
- Product Card becomes denser without changing its properties, slots, states,
  variants, target behavior, or canonical renderer.
- The Product Card contract advances to `0.7.0` to keep its public-token inventory
  truthful and remains `pilot` pending the owner's explicit final approval.
