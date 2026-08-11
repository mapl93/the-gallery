# ADR 0234: Progress Visible And Accessible Value Separation

- Status: Accepted
- Date: 2026-07-20
- Decision owner: The Gallery owner
- Applies to: A22 Progress Bar / Circle and canonical consumers
- Depends on: ADR 0063 and ADR 0177

## Context

Progress used one `valueText` property for both visible copy and
`aria-valuetext`. That worked for a compact percentage but made a fixed Circle
render full localized descriptions inside a `48px` artwork. Truncating,
auto-scaling or hiding the text would obscure meaning and couple accessibility
copy to visual geometry.

The owner selected `A22-A`: visible and accessible value content are separate
semantic decisions.

## Decision

1. Determinate Bar and Circle may expose optional compact `displayValue` as
   visible content.
2. Determinate Bar and Circle independently expose optional `valueText`, mapped
   only to `aria-valuetext`.
3. Neither property falls back to, copies, truncates, scales or derives from the
   other. Targets localize and validate each intentionally.
4. Circle's fixed interior accepts intentionally compact visible content such
   as `72%`. Full contextual meaning belongs in `valueText` without being forced
   into the artwork.
5. Indeterminate remains Bar-only and omits `aria-valuenow`, `aria-valuetext`,
   `displayValue` and all other determinate value presentation.
6. A non-empty localized operation label remains required. Invalid required
   composition emits no Progress root; no fabricated fallback name is added.
7. Range, target calculation, update cadence, busy-region lifecycle,
   announcement cadence, cancellation, errors and persistence remain
   target-owned.
8. Exhibit and Studio use one shared Progress renderer and fixture. Canonical
   consumers such as Free Shipping Bar pass localized `valueText` without
   exposing it visually unless they separately supply `displayValue`.

## Consequences

- `valueText` is no longer visible content.
- `displayValue` becomes the only visible value property for both shapes.
- The site-only `valueTextVisible` switch is removed because the semantic API
  now expresses the distinction directly.
- Long localized accessible descriptions no longer overflow Circle artwork.
- Final Bar/Circle proportions, label hierarchy, fill treatment and compact
  value typography remain human visual review work.
- The contract remains `pilot`; this decision does not authorize promotion to
  `stable`.
