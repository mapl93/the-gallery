# ADR 0378: Filter Bar and Blog Sidebar Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 without changing native choice or complementary-content ownership.
Filter Bar adds four visual roles for Multiple option gap, logical insets and
border width. Its public inventory is 17. Single retains canonical Segmented
Control; Multiple retains canonical Checkbox. Both legend modes use the already
accepted Input label gap and weight from ADR 0312. Fieldset grid gap did not
separate the Multiple legend; margin makes the existing 4px field gap real.
The old ineffective root grid gap is structural zero; options keep their gap.

Blog Sidebar adds nine roles for section/topic gaps, title spacing/tracking,
independent title/row borders, and topic insets. Inventory 26. Spacing factors
use shared system bases; borders/insets alias dimensions. Body family/weight
are consumed explicitly. Current values, native named aside/lists/Links, final
row rule omission and temporary tag-cloud migration aliases remain.

This refines the visual-private boundary in ADRs 0198/0229, without adding
semantic layout properties, modules, provider defaults, runtime or token layers.
Studio/Exhibit share metadata; Web and Shopify outputs regenerate. Target query,
records, lifecycle and live certification remain separate from local evidence.

## Evidence

`docs/reports/2026-09-12-filter-sidebar-values-checkpoint.md`.
