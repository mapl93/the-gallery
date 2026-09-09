# 0319. Avatar Token Customization

Status: Accepted

Date: 2026-09-09

## Owner clarification

The owner answered the Avatar checkpoint decision: customization must be through
tokens. This supersedes ADR 0237's prohibition on independent diameter and initials
size controls. Preserve the original four pairs as defaults, not restrictions.

## Decision

Expose four source-backed diameters: Small 32px, Default 40px, Large 56px and
Extra Large 80px. Reuse Avatar's already-public Caption, Body Small, Body Default
and Body Large size roles rather than duplicating the semantic type scale.
Expose both dimensions through Studio for the selected preset; Exhibit derives
its complete reference from the same metadata. Family, weight, colors and radius
retain their existing roles. Avatar now has thirteen public visual roles.

The only semantic property remains `size`, selecting a preset. Token overrides
are independent visual decisions; changing initials size does not silently change
diameter or vice versa. A consumer can scope shared type overrides to its Avatar
root or change those roles across a brand. Source changes retain their mode-aware
semantic references and follow the ordinary generated Web/Shopify pipeline.

Explicit image or pre-derived initials, truthful contextual naming, passive
interaction, and target-owned image delivery/fallback remain unchanged. Square
geometry, flex containment, centered image cover, glyph line-height/clipping and
the forced-color boundary stay implementation mechanics. No new runtime, platform,
semantic property, source format, Figma task, or automatic stability promotion.

## Acceptance

Verify default parity across the existing theme/viewport matrices, all four
independent diameter/type pairs through Studio and an installed consumer, reset
and size switching, source inheritance in Author Card and Comment Section, native
image crop, contextual naming, RTL, forced colors and narrow flex containment.
Retain pilot status. Copy-and-own consumers adopt generated CSS/tokens explicitly;
regeneration does not upload a hosted Shopify theme.
