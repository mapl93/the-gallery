# ADR 0377: Reading Navigation and Author Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 to three editorial components with 21 source roles:

- Reading Progress: height aliases dimension.3; track aliases color.transparent.
  Public inventory 3. The bounded value is still a behavior property; the private
  transform scale is runtime state, never an exported design token.
- Table of Contents: 9 roles expose borders, padding, title/item/nesting gaps,
  indentation and current accent mixing. Inventory 27. ADR 0270's earlier
  private indentation boundary is refined for visual tokens; target header
  offsets, safe areas, sticky viewport bounds and controlled heading state
  remain integration/behavior concerns.
- Author Card: 10 roles expose information wrapping basis, independent full/
  compact padding and avatar/content/link gaps. Inventory 25. Card, Avatar and
  Link remain canonical dependencies; authored identity and destinations stay
  target-owned. Optional DOM omission and compact semantics remain.

Spacing multipliers preserve existing responsive stack values; pixel borders
and zero padding reference system primitives. TOC/Author explicitly consume
body family/weight roles. Initial geometry and typography are preserved.
Studio/Exhibit derive their controls from the same public metadata. Web/Shopify
outputs regenerate; no runtime implementation, deployment or maturity change.

## Evidence

`docs/reports/2026-09-12-reading-navigation-values-checkpoint.md`.
