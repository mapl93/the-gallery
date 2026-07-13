# Field Validation Coverage

Status: Active certification inventory

Date: 2026-07-12

## Rule

ADRs 0049 and 0050 require every value-entry field to expose `default`, `error`,
`success`, and `warning` before its neutral-web contract can become `stable`.
Selected, checked, filled, on, and active are value or interaction states and
do not replace validation.

This inventory records current contract facts. It does not infer support from a
shared selector or visually similar component.

## Current Coverage

| Component | Contract variants | Current evidence | Certification action |
| --- | --- | --- | --- |
| Input | `default`, `error`, `success`, `warning` | Implemented and browser-reviewed | Keep as the reference hierarchy |
| Select | `default`, `error`, `success`, `warning` | Implemented and browser-reviewed in the current cycle | Await owner review before `stable` |
| Textarea | `default`, `error`, `success`, `warning` | Implemented and browser-reviewed in the current cycle; composition is recorded in ADR 0052 | Await owner review before `stable` |
| Combobox | `default` | Validation variants are absent from the contract | Review in its component cycle |
| Date Picker | `default` | Validation variants are absent from the contract | Review in its component cycle |
| Color Picker | `default` | Validation variants are absent from the contract | Review in its component cycle |
| File Upload | `default` | Validation variants are absent from the contract | Review in its component cycle |
| Pin Input | `default` | Validation variants are absent from the contract | Review in its component cycle |
| Tags Input | `default` | Validation variants are absent from the contract | Review in its component cycle |
| Password Input | `default` | Validation variants are absent from the contract | Review in its component cycle |
| Number Input | `default` | Validation variants are absent from the contract | Review in its component cycle |

## Boundary

Checkbox, Radio, Switch, Slider, Segmented Control, and other choice controls are
not silently assigned field-validation variants by this inventory. Their
validation ownership and message composition must be reviewed with their actual
anatomy, often together with Field Wrapper, during their certification cycle.

Checkbox has now completed that review: it exposes `default`, `error`,
`success`, and `warning`, while Field Wrapper owns associated feedback content
as recorded in ADR 0056. Radio has also completed its individual review with the
same validation ownership boundary and native named-group semantics recorded in
ADR 0057. The remaining choice controls are still pending individual review.

No component listed with a gap may be promoted to `stable` until the gap is
resolved or an accepted ADR documents a component-specific exemption.
