# 0045. Field Focus Ring Hierarchy

Status: Accepted

Date: 2026-07-12

## Context

Default Input focus used the same strong primary color for both the field border
and its outer outline. Error and Success used a strong semantic inner border with
a lighter outer ring. Fields also reserved a `2px` gap through `outline-offset`,
which visually separated the two layers.

The owner selected the Error treatment as the shared field-focus aesthetic:
strong inner border, lighter outer ring from the same state family, and no gap.

## Decision

- The global focus color remains the theme primary through
  `--color-border-focus`.
- `--color-border-focus-subtle` mixes that primary focus color at `15%` against
  transparency for field outer rings.
- Default fields use the strong primary focus color for their inner border and
  the subtle primary focus color for their outer ring.
- Error and Success retain strong semantic inner borders with their corresponding
  light feedback backgrounds as outer rings.
- Field focus outlines are `4px` wide and use `outline-offset: 0` so the inner
  and outer layers meet while the subtle ring remains visually present.
- Input, inherited Textarea and Password Input fields, native Select, Pin Input,
  Tags Input, Number Input, and Studio's field controls follow this hierarchy.

## Consequences

- Every field state has the same visual depth, thickness, and spacing while
  retaining its semantic color family.
- Non-field controls may continue using the strong global focus token and their
  own documented offsets until their certification cycle reviews them.
- The pattern remains theme-aware because both strong and subtle default focus
  colors derive from the theme primary.
