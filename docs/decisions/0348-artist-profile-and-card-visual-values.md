# 0348. Artist Profile And Artist Card Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Seventeen scoped source roles complete 32 Artist Profile and 27 Artist Card
public values under the owner's broad token-customization direction. This
supersedes the earlier private-candidate treatment of these visual values in
ADRs 0123/0129, without adding semantic interaction or media-data properties.

Artist Profile exposes portrait ratio, label tracking, biography paragraph gap,
quotation border, accent share, quotation inset and action gap. The portrait
ratio starts at 0.75 (width/height), tracking at 0.1em and paragraph gap at 1em.
Relative units retain the local label/article type relationship. The 3px quote
border aliases dimension.3; inset and action factors retain the shared Element
gap. Accent share 0.7 weights the existing accent/primary color mix and is not
text opacity. Its valid 0–1 range follows the existing percentage mixture.
Body family is explicit; name, biography, quotation and actions retain their
accepted editorial roles. The old transparent MDX placeholder gets empty alt
instead of a claim about a person it does not depict.

Artist Card exposes its independent portrait ratio, media gap, separate logical
Badge insets, name/medium/count rhythm, focus width/offset and optional native-
root portrait scale. Defaults preserve 3:4, the existing space divisors, 2px
focus and scale 1.03. No new general ratio or spacing scale is invented for
these component decisions. Card still owns the flat shell under ADR 0285;
Badge owns its appearance. Passive roots have no interactive affordance,
optional enabled native roots can emphasize the portrait, disabled roots do
not, and reduced motion suppresses transforms even after customization.

Artist Card previously omitted token metadata from registry.json despite its
contract inventory. Reconcile that inventory using the existing `transition`
and `transform` categories instead of introducing a registry `motion` category.
Update contract and Studio category references; public CSS names stay stable.
There are no new source modes, runtime code, artist data model or target adapter.
Both components remain pilot.

## Acceptance

Compare portrait/no-portrait layouts across widths/themes; exercise ratio,
relative units, spacing, logical insets, palette mix and focus geometry.
Check named profile, portrait-derived split, optional metadata, passive/native/
disabled Card boundaries, forced focus, RTL and reduced motion. Verify Studio
editing/reset and Exhibit, source/catalogue, contracts, registry, CLI and both
adapters. Close the one browser session and verify process cleanup after each
phase; preserve personal Chrome and pre-existing servers.
