# Component Dossier: Checkbox

Status: `human-review-ready`

Target reviewed: Neutral Web native binary/mixed checkbox

Contract: `components/contracts/checkbox.contract.json`

## Recommendation

Keep a native checkbox inside a wrapping visible label, with checkedness as the
submitted binary value and indeterminate as an independent group-summary visual
state. Preserve one `20px` visual size centered in a `24px` first-line target,
all four validation variants, native form semantics, and Field Wrapper-owned
feedback. Do not infer alternate sizes, custom indicators, or a third submitted
value.

## Purpose And Limits

- Represents an independent binary choice or one choice in a multi-select set.
- May summarize a partially selected group through native indeterminate state.
- It is not Radio (exclusive choice), Switch (immediate setting), Toggle Button,
  a tri-state submitted data model, or a selection-group controller by itself.
- Consumers own groups/legends, select-all relationships, feedback content,
  validation timing, and any controlled collection state.

## Current Gallery Result

- Registry `A5`, primitive, no formal dependency; contract `0.3.0`, still
  `pilot`. Optional validation feedback composes Field Wrapper externally.
- Five anatomy parts, four variants, one size, nine states, eight behaviors,
  nine properties, and twenty-three public token references.
- A native form probe confirmed checked and indeterminate are independent,
  FormData follows checkedness, change clears the initialization marker, and
  reset restores default checkedness without restoring a consumed mixed marker.
- Real Space activation preserved focus and toggled unchecked to checked.
- The `20px` control is centered `2px` inside a `24px` first label line; a
  two-line RTL label produced a `48px` wrapping activation area.
- At `280px`, an unbroken RTL label stayed inside the component with no page or
  host overflow.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Checkbox standard](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)) | Native checkedness owns submission/required validity; indeterminate is independent and only obscures visual selection. | Keep native input and separate checked submission from mixed presentation. |
| [APG Checkbox pattern](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) | Space toggles; mixed is the third presented state for tri-state patterns. | Preserve native Space behavior and avoid a custom role where HTML suffices. |
| [APG mixed-checkbox example](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/examples/checkbox-mixed/) | Mixed usually summarizes a related group, and high-contrast/focus/visible labeling need explicit care. | Document group ownership and keep forced-colors native appearance. |
| [Open UI Checkbox](https://open-ui.org/components/checkbox/) | Binary checked plus independent indeterminate, click/Space activation, disabled behavior, focus, and label activation are the common model. | Match the native model rather than inventing custom state. |
| [Radix Checkbox](https://www.radix-ui.com/primitives/docs/components/checkbox) | Mature API distinguishes `checked`/`defaultChecked`, supports indeterminate, native form props, and controlled/uncontrolled use. | Document adapter ownership while retaining a real native input in the base. |
| [Shopify Checkbox](https://shopify.dev/docs/api/app-home/web-components/forms/checkbox) | Polaris separates checked/defaultChecked and indeterminate/defaultIndeterminate; mixed wins visually while submission follows checked. | Same ownership boundary; Field Wrapper remains Gallery's feedback composition. |

## Anatomy, States, API, And Ownership

- Required wrapping label, native control, and text label; generated checked and
  indeterminate indicators are optional state anatomy.
- Default, hover, focus-visible, checked, indeterminate, disabled, and three
  semantic-focus states. Validation is independent from selection.
- Public properties: `label`, `name`, `value`, `variant`, `checked`,
  `indeterminate`, `disabled`, `required`, and `describedBy`.
- Static `checked` is default checkedness; native interaction then owns live
  state. `data-indeterminate` initializes the live property and is consumed on
  change. Framework adapters may control both live properties and native events.
- Field Wrapper owns helper/error/success/warning message content so clicking
  feedback does not unexpectedly toggle the checkbox.

## Tokens, Runtime, And Content

- Public tokens reuse Input semantic boundaries/labels/focus, primary selected
  fill, primary text, stable body size/line height, icon-size/gap, radius,
  transition/easing, and disabled opacity.
- Border width, `60%` default and `70%` semantic boundary mixes, `55%` label
  mix, first-line centering, and SVG geometry remain private composition.
- Selected semantic indicators use a private encoded `#171717` stroke because a
  data URL cannot consume a CSS custom property. This explicit literal is an
  asset implementation risk, not public API.
- Shared enhancement scans canonical checkboxes and adds one change listener per
  enhanced control so it can consume an initial mixed marker; without the marker
  the handler is inert. It performs no polling or layout read.

## Findings And Direction

| Finding | Severity | Direction |
| --- | --- | --- |
| Controlled/uncontrolled and mixed-state ownership was underdocumented. | resolved | Static/default and live adapter strategies are explicit. |
| Validation-focus selectors described two separate selectors rather than their conjunction. | resolved | Contract selectors now match the actual semantic root plus focused control. |
| Label line height was only `20px`, shrinking the target and misaligning wrapped text. | resolved | Stable `24px` body leading and `2px` first-line centering. |
| Default unfocused boundary was only `1.26:1` light and `1.73:1` dark. | resolved | Private neutral mix; result is `3.07:1` and `5.19:1`. |
| Raw Success/Warning label/boundary colors failed in light mode. | resolved | Private mixes; worst text `5.34:1`, worst boundary `3.83:1`. |
| White indicators failed against bright semantic fills in both themes. | resolved | Dark private semantic indicator; worst measured contrast `4.76:1`. |
| Long unbroken labels lacked explicit containment. | resolved | Bounded root/label and anywhere wrapping. |
| Encoded indicator color cannot follow arbitrary theme overrides automatically. | explicit risk | Keep documented until inline/slot indicator anatomy is separately accepted. |
| No Checkbox-specific owner visual reference is registered. | human input | Approve repository render or provide component-specific evidence. |

## Cross-Target Translation

Web and Shopify preserve native input, name/value/checked/required/disabled,
mixed initialization, wrapping label, variants, and external feedback reference.
React/Angular map checked/defaultChecked and live indeterminate without a mirror
input. Figma maps box, check/minus, label, validation, hover/focus/disabled, and
one size without form semantics. SwiftUI/Compose use native toggle/checkbox
controls, platform mixed-state equivalents where available, and visible group
context.

## Readiness Decision

Ready for human review; remains `pilot`. Native label/keyboard/form behavior,
checked/mixed independence, controlled/uncontrolled translation, validation
composition, target geometry, contrast, RTL/extreme content, reduced motion,
forced colors, four viewports, shared Exhibit/Studio rendering, and adapters
pass. Human review must approve control size, gap, first-line alignment,
semantic fills/mixes, indicators, and visual reference before any `stable`
promotion.
