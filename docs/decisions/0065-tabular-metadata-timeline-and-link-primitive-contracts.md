# 0065. Tabular, Metadata, Timeline, And Link Primitive Contracts

Status: Accepted

Date: 2026-07-12

## Context

Table, Data List, Timeline, and Link had canonical CSS and MDX examples but no
reviewed Studio surfaces. Their sources already established native semantic
elements and several presentation hooks, while data values, repeated items, and
target-side behavior remained consumer-owned.

## Decision

- Table preserves native table structure and its responsive overflow wrapper.
  Striped rows, row hover, and sortable-header anatomy are independent boolean
  capabilities because their canonical classes and markup can be composed.
- Table sorting uses a native button inside the header. `aria-sort` belongs to
  the owning `th`; targets own comparison, locale rules, ordering, pagination,
  and remote data updates.
- Data List preserves native `dl`, `dt`, and `dd` semantics. Its vertical and
  horizontal variants change layout only and never own the repeated values.
- Timeline preserves ordered-list semantics when chronology matters. `current`
  applies the active marker and `aria-current="step"` to at most one
  consumer-selected entry.
- Link always renders a native anchor with `href`. It exposes native `target`,
  `rel`, and current-page semantics, has no disabled state, and does not replace
  Button for local actions.
- No new component-scoped tokens are introduced. Studio exposes only public
  semantic tokens already used by canonical CSS.
- Table rows, Data List pairs, Timeline entries, and Link sample copy or
  destinations in Studio are fixtures rather than component defaults.

## Consequences

- The four primitives now have conservative semantic property surfaces,
  five-section Exhibit documentation, and metadata-driven Studios.
- Table presentation can be exercised in realistic combinations instead of an
  exclusive variant picker.
- All four contracts remain `pilot` until owner review and browser evidence
  satisfy every neutral-web stable gate.
