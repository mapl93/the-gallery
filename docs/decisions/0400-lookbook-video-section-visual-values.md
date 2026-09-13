# ADR 0400: Lookbook and Video Section Visual Values

Status: Accepted

Date: 2026-09-13

Lookbook exposes fourteen roles for header inset, responsive column counts, row
geometry, grid gap, tall/wide spans and caption padding/palette. Defaults remain:
one/two/four columns at existing boundaries, two-unit spans and a 0.6 translucent
caption surface. Caption tint aliases primary text and caption foreground aliases
inverse text, preserving the existing paired Light/Dark treatment. These are
component roles, not a change to the global semantic palette.

The wide-cell span is bounded by the active count to avoid implicit columns.
Counts/spans have a CSS minimum of one and no invented neutral upper ceiling.
Remove the unused Lookbook public focus-color reference; target-owned complete
interactive compositions still own visible native focus and activation.

Video Section exposes the existing 16:9 wrapper ratio and full-width zero-radius
as two roles. Its padded variant retains the shared radius. A configurable radius
does not change edge-to-edge width. Media/player behavior remains target-owned.

Contracts, Studio/Exhibit and generated Web/Shopify remain aligned. No service,
player, hotspot implementation, source format, target certification or automatic
consumer-copy upgrade is added.
