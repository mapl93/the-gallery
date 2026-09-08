# 0277. Interface Numerals And Editorial Serif Boundary

Status: Accepted

Date: 2026-08-12

## Context

During Product Card review, the owner rejected the slashed zero used by prices
and other numeric displays and asked that UI and editorial typography not be
mixed. Price and Stat were the only canonical components exposing the OpenType
`zero` feature as a public switch, while Product Card used the heading family
inside a catalog interaction surface.

## Decision

- Interface numerals use an ordinary zero. Canonical numeric presentations fix
  the OpenType `zero` feature off and do not expose a slashed-zero property,
  Studio control, data attribute, or target adapter parameter.
- Price and Stat retain `ss01`, `tnum`, `calt`, and `frac` as independent
  capabilities. This decision supersedes only the slashed-zero portions of ADRs
  0061, 0063, and 0108.
- Catalog, control, commerce, and other interface components use the body/UI
  family for their local text hierarchy. Serif is reserved for explicitly
  editorial article/prose composition rather than mixed into an interactive
  card.
- The typography boundary is applied to Product Card now. Other pilot
  components are reconciled during their own human-review turn so this systemic
  decision does not bypass one-component-at-a-time review.

## Consequences

- `slashedZero` is removed from Price and Stat contracts and Studio metadata;
  their contracts advance without changing `pilot` status.
- Neutral Web, Shopify, MDX fixtures, and shared renderers omit the obsolete
  attributes. CSS explicitly sets `"zero" 0` for Price and Stat numeric text.
- No typography token values or source-token architecture changes are required.

