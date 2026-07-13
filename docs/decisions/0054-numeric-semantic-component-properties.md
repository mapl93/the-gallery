# 0054. Numeric Semantic Component Properties

Status: Accepted

Date: 2026-07-12

## Context

The component contract supported strings, booleans, enums, and slots but could
not describe numeric component APIs. Textarea line bounds are the first reviewed
property that must remain numeric across contracts, Studio, and target mappings.
Representing line counts as strings would hide their constraints and encourage
target-specific parsing rules.

## Decision

- Component contracts support semantic properties with `type: "number"`.
- Numeric properties may declare `minimum`, `maximum`, and positive `step`
  constraints.
- A numeric `defaultValue` must be finite and respect declared bounds.
- Direct attribute mappings with `valueFrom: "property"` accept string or number
  properties.
- Studio supports `kind: "number"` controls backed by native numeric inputs.
- An optional numeric property is represented as `null` in Studio when its input
  is empty.
- Number controls read their minimum, maximum, and step directly from the
  component contract; Studio metadata does not duplicate these constraints.

## Consequences

- Future reviewed quantities can retain numeric semantics without inventing
  string conventions.
- Contract and Studio validators reject invalid numeric defaults, bounds, steps,
  control bindings, and visibility comparisons.
- Numeric support does not imply that every measurable style becomes a semantic
  property; tokens continue to own design values and contracts own component API.
