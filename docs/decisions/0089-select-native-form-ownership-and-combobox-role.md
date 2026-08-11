# 0089. Select Native Form Ownership and Combobox Role

Status: Accepted

Date: 2026-07-13

## Context

ADRs 0047 and 0048 established a progressively enhanced Select whose native
`select` remains the form owner while a custom trigger and listbox provide the
reviewed presentation. The calibration dossier found that the trigger exposed
the popup relationships but not the select-only `combobox` role. Native
`required` changes were also not reflected to the enhanced focus owner, and the
contract did not expose stable `name` and `required` form properties.

## Decision

- The generated Select trigger uses `role="combobox"` with
  `aria-haspopup="listbox"`, `aria-expanded`, `aria-controls`, and
  `aria-activedescendant`.
- Native `required` remains on the `select` and is reflected as
  `aria-required="true"` on the enhanced trigger.
- `name` and `required` are target-agnostic semantic contract properties mapped
  to the native select.
- The native select is the only owner of selected value, constraint validation,
  reset behavior, and successful form submission.
- The custom popup is limited to a flat, single-choice select. `multiple`, a
  `size` greater than one, or `<optgroup>` content keeps the styled native
  control instead of flattening selection or grouping semantics.
- Framework adapters may implement controlled use by updating the native value
  owner and consuming native `input` and `change` events. The generated trigger
  and listbox must not become a second authoritative state store.
- Search, filtering, asynchronous options, free-form input, and alternate sizes
  remain outside Select and are not introduced by this decision.

## Consequences

- Exhibit, Studio, and composed Studio fixtures must expose identical combobox
  and required semantics.
- The shared enhancer observes `required` mutations in addition to existing
  option, disabled, invalid, and description changes.
- The contract gains stable form API without introducing a Web-only `value`
  attribute mapping or framework-specific controlled/uncontrolled properties.
- Grouped and multiple choices remain functional native controls until a
  separate cross-target anatomy is explicitly accepted.
