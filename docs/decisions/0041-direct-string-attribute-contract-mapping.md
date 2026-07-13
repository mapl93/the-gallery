# 0041. Direct String Attribute Contract Mapping

Status: Accepted

Date: 2026-07-12

## Context

The component contract schema could map string content, discrete enum and boolean
attributes, classes, and slots. It could not express that a free-form string
property such as Input `value` or `placeholder` maps directly to a native web
attribute without enumerating possible values.

Input Studio needs those properties to remain semantic contract data rather than
site-only fixture controls. The same requirement will recur across the form
component family.

## Decision

- Attribute target mappings may declare `"valueFrom": "property"`.
- This mapping is valid only for string properties.
- An attribute mapping defines exactly one mapping mode: `values`, `removeWhen`,
  or `valueFrom`.
- Existing discrete mappings remain unchanged and backward compatible.
- Target renderers decide whether their native platform applies the value as an
  attribute or equivalent live property while preserving the contract meaning.

## Consequences

- Input can own `value` and `placeholder` as reviewed semantic properties.
- Studio can render those properties without copying component semantics into
  presentation metadata.
- Future form contracts can reuse the same narrow mapping instead of introducing
  target-specific schema fields.
