# 0014. Input Component Contract Pilot

Status: Accepted Initial Implementation

Date: 2026-05-23

Amended by: ADR 0050 adds Warning after the original three-variant pilot.

## Context

Button proved the first component contract shape for a compact primitive. Input is a better second pilot because it has richer anatomy and validation states:

- Root wrapper.
- Label.
- Native field.
- Optional message.
- Optional icon.
- Default, error, and success variants.
- Hover, focus-visible, disabled, and error focus states.

## Decision

Add Input as the second component contract:

```text
components/contracts/input.contract.json
```

The contract captures:

- Anatomy: `.input`, `.input__label`, `.input__field`, `.input__message`, `.input__icon`.
- Variants: default, error, success.
- Size: default only.
- States: default, hover, focus-visible, disabled, and error focus-visible.
- Public input token API.
- Accessibility requirements around labels, descriptions, invalid state, disabled state, and non-color-only validation.

## Validator Adjustment

Some components do not have named sizes in `registry.json`. The contract schema still requires a `sizes` list so the component has an explicit size model.

For registry components without a `sizes` field, `npm run validate:contracts` now treats the registry size model as:

```text
default
```

This keeps contracts explicit without forcing every registry component to add a redundant size entry.

## Metadata Correction

The Input registry/docs description previously said "4 types x 4 states", while the registry only exposed three variants: default, error, and success. The description now reflects the actual contract:

```text
Text input with label, message, optional icon, validation variants, and interaction states.
```

The registry typography token metadata was also narrowed to `--font-family-body`, because input sizing is currently expressed through the public `--space-input-*` API.

## Consequences

- The contract schema now covers a component with nested anatomy and validation states.
- Contracts can represent components with only a default size.
- Input gives future adapters a clearer accessibility contract than CSS alone.

## Follow-Up Work

- Add Select or Textarea next to test shared form-control anatomy.
- Add Card next to test non-form layout anatomy.
- Consider adding an explicit `behaviors` field before interactive components such as Modal, Drawer, or Combobox.
