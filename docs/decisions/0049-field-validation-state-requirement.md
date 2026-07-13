# 0049. Field Validation State Requirement

Status: Accepted

Date: 2026-07-12

Amended by: ADR 0050 for the Warning validation variant and ADR 0051 for
validation-aware hover behavior.

## Context

Input established symmetrical Error, Success, and Warning treatments across its label,
field border, associated message, icon, and focus ring. Other value-entry field
contracts were created conservatively and often expose only a default variant.
That makes validation coverage inconsistent and leaves the meaning of a field's
status dependent on which component happens to collect the value.

Selected, checked, filled, and active states belong to value or interaction
semantics. They do not communicate whether an entered value is valid.

## Decision

- Every value-entry field must expose `default`, `error`, `success`, and `warning`
  validation variants before its neutral-web contract can become `stable`.
- A field may omit a validation variant only when an accepted ADR records the
  component-specific reason and its accessible alternative.
- Error, Success, and Warning cover the same anatomy wherever that anatomy
  exists: label, control border, associated message, fixed indicator or icon,
  and focused outer ring.
- Error sets `aria-invalid="true"`; Success and Warning do not. All three
  associate their feedback through `aria-describedby` or an equivalent native
  relationship.
- Validation cannot rely on color alone. Associated text remains required, and a
  fixed indicator or icon is included when the component owns one.
- Choice semantics such as selected, checked, on, or active do not substitute
  for validation variants.
- Components reuse the accepted Input feedback and focus token families unless
  their own reviewed anatomy requires a documented component-level token.

## Consequences

- Input and Select implement the requirement in their current certification
  cycles.
- Textarea and the remaining value-entry field pilots must reconcile their
  contracts, canonical CSS, Studio metadata, documentation, and browser evidence
  before promotion to `stable`.
- This requirement is a human-reviewed certification gate. Passing structural
  automation alone cannot prove that a field's validation treatment is complete.
- Existing pilot contracts may remain conservative while they wait for their
  component cycle; the missing variants are tracked gaps rather than inferred
  implementation facts.
