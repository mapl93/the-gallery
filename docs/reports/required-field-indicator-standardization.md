# Required Field Indicator Standardization

Status: Implemented and visually validated

Date: 2026-08-12

## Scope

ADR 0275 standardizes the centered decorative required marker across all 20
current contracts that expose a `required` property. This is a cross-component
consistency correction requested during the Select human-review turn; it does
not change dependency order or certify any component as `stable`.

## Coverage

| Ownership profile | Components | Marker owner |
| --- | --- | --- |
| Component-owned label | Input, Textarea, Select, Checkbox, Switch | The component's visible label |
| Component-owned group legend | Color Picker, Segmented Control, Star Input, Subscription Option, Variant Selector | One group legend, never each option |
| Primary instruction | File Upload | The primary upload instruction |
| Field Wrapper composition | Combobox, Date Picker, Field Wrapper, Number Input, Password Input, Pin Input, Quantity Selector, Tags Input | The composing visible label |
| Radio group composition | Radio | The composing Fieldset legend |

## Source Reconciliation

- Canonical family CSS uses one optical treatment: current text color, `0.25em`
  inline gap, unit line height, and a small downward optical adjustment.
- Contracts map `required` to the native or ARIA authority and document the
  appropriate visible marker owner.
- Studio renderers project the modifier on owned labels and legends. Composite
  fixtures use Field Wrapper or Fieldset composition so the marker appears at
  the correct semantic level.
- Contact, commission, and review fixtures and the Shopify contact locale no
  longer hard-code `(required)` into visible text.
- Generated Web and Shopify CSS must be rebuilt from canonical family sources;
  `site/dist` is outside this change.

## Human Review Boundary

Representative Light and Dark evidence must cover an ordinary labelled field,
a single-choice label, a group legend, a composite Field Wrapper field, and a
commerce option group. The individual component review remains the authority
for final visual approval. Select remains the current component under review.

## Validation Result

- All 20 required-capable Studio pages passed in Light and Dark: 40 of 40
  component-theme checks.
- Every check toggled Required on and off, confirmed a corresponding native
  `required` or `aria-required="true"` authority, and verified that the marker
  appeared only while Required was active.
- Every marker inherited the exact label or legend color, resolved the accepted
  optical translation, and remained absent from the element's text content.
- Choice-group checks confirmed one legend marker while native requiredness
  remained on the appropriate group inputs.
- Evidence screenshots:
  `output/playwright/required-standard/select-light-required.png` and
  `output/playwright/required-standard/select-dark-required.png`.
- Contracts, Studio metadata, docs, decision coverage, Web adapter, Shopify
  adapter, component audit, refinement audit, Exhibit/Studio parity, and a site
  build outside `site/dist` all pass. The performance audit retains two
  diagnostic aggregate overages and reports no required gap.
- The owner explicitly accepted the Select required presentation and requested
  this library-wide rollout. The marker convention did not itself promote any
  component; Select was subsequently and separately approved as `stable`, while
  every other affected component retains its prior status.
