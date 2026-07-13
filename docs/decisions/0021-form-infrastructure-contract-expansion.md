# 0021. Form Infrastructure Contract Expansion

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

After advanced form controls, the remaining form infrastructure needed contracts so the form family had a target-agnostic foundation for labels, grouped controls, validation feedback, password entry, OTP entry, and full form layout.

The registry also had an implementation mismatch: Field Wrapper was listed with selector `.field-wrapper`, while the actual CSS adapter and examples use `.field`.

## Decision

Add six more validated component contracts:

```text
components/contracts/pin-input.contract.json
components/contracts/field-wrapper.contract.json
components/contracts/fieldset.contract.json
components/contracts/inline-error.contract.json
components/contracts/password-input.contract.json
components/contracts/form.contract.json
```

Also align registry token metadata and MDX API references for these components.

Field Wrapper keeps the `field-wrapper` slug because that is the product/documentation name, but its canonical web selector is `.field`.

## Contract Notes

Pin Input captures:

- Individual one-time-code cells.
- Focus and filled states.
- Native input attributes such as `maxlength`, `inputmode`, and `autocomplete="one-time-code"`.
- Target-owned focus movement, paste distribution, and completion behavior.

Field Wrapper captures:

- Label, description, error, success, and generated required indicator anatomy.
- Label association, message association, required state, and validation accessibility requirements.
- The corrected `.field` web selector.

Fieldset captures:

- Native fieldset and legend anatomy.
- Optional group description.
- Group-level helper text and disabled grouping semantics.

Inline Error captures:

- Field-level error message anatomy with optional icon.
- Error association, polite announcement, and decorative icon semantics.

Password Input captures:

- Input dependency.
- Password field modifier, visibility toggle, and optional strength meter.
- Weak, fair, good, and strong strength states.
- Target-owned visibility and strength calculation behavior.

Form captures:

- Form sections, section titles, responsive rows, actions, and error summary anatomy.
- Native submission, field composition, responsive row, action, and error-summary behavior.
- Dependencies on Field Wrapper and Button.

## Consequences

- The contract layer now validates thirty-seven components.
- The form family now has target-agnostic coverage from primitive fields through form-level layout and validation feedback.
- The registry no longer points Field Wrapper at the nonexistent `.field-wrapper` selector.
- Form-oriented adapters can now use contracts to reason about labels, validation, grouping, submission, and target-owned interaction logic before framework or platform implementations are built.

## Follow-Up Work

- Continue contract expansion into product and commerce components.
- Start target-specific adapter guidance that uses contract metadata, especially for Shopify and React.
- Decide whether contracts remain hand-authored validation metadata, become generation source, or become a hybrid.
