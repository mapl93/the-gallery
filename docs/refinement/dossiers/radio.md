# Component Dossier: Radio

Status: `human-review-ready`

Target reviewed: Neutral Web native radio choice

Contract: `components/contracts/radio.contract.json`

## Recommendation

Keep Radio as one native `input[type="radio"]` inside its visible wrapping
label. A canonical Fieldset/Legend owns the named group question and Field
Wrapper owns associated feedback. Preserve one `20px` control centered in the
first `24px` body line, four validation families, native mutual exclusion, and
the central-dot selection treatment. Do not add a custom Radio Group runtime or
an item-level boolean model that can produce multiple selected members.

## Purpose And Limits

- Selects exactly one value from a small, visible, mutually exclusive set.
- It is not Checkbox, Switch, Select, Toggle Group, or a complete group wrapper.
- The form owns validation timing and submitted meaning; Fieldset/Legend owns
  the group name; Radio owns only one option and its native selection state.
- Horizontal layout, orientation, roving focus for a custom widget, and a
  first-class Radio Group API remain separate future decisions.

## Current Gallery Result

- Registry `A6`; contract `0.3.0`, still `pilot`: four anatomy parts, four
  variants, one size, nine states, seven behaviors, eight properties, and
  twenty-three public token references.
- The default, Error, Success, and Warning boundaries now preserve their family
  across hover/focus. The default neutral boundary uses the accepted private
  `60%` boundary/text mix; semantic boundaries use `70%` and labels use `55%`.
- Checked presentation is a filled boundary with a `4px` surface inset, reading
  as a central dot rather than the baseline hollow ring.
- Root and label are inline-bounded, wrap unbroken content, and align the
  `20px` control `2px` into the first `24px` line.
- No Radio JavaScript exists or is required. Exhibit and Studio use the same
  `RadioStudio` renderer, fixture, contract, and canonical CSS.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Radio Button standard](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)) | Same-form radios sharing a name own mutual exclusion, form value, required validity, events, and reset. | Keep one native input per option and one shared group name. |
| [APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | A set has one accessible group name; Space selects and arrows move/check. | Preserve native keyboard behavior and use Fieldset/Legend. |
| [Open UI Radio Button research](https://open-ui.org/components/radio-button.research/) | The group is the meaningful single-selection unit across systems. | Keep the item primitive narrow and document external group composition. |
| [Radix Radio Group](https://www.radix-ui.com/primitives/docs/components/radio-group) | Mature adapters expose value/defaultValue, name, required, direction, items, and indicators. | Framework adapters control one group value, not independent booleans. |
| [Shopify Choice List](https://shopify.dev/docs/api/app-home/web-components/forms/choice-list) | Target-native single choice owns group label/help/error and selected value. | Shopify may compose native Gallery radios within its group surface. |

## Anatomy, States, API, And Ownership

- Required anatomy: wrapping label, native control, visible option label;
  checked indicator is state-generated private presentation.
- States: default, hover, focus-visible, checked, disabled, required-invalid,
  and Error/Success/Warning focus. Validation remains independent of selection.
- Public properties: `label`, `name`, `value`, `variant`, `checked`, `disabled`,
  `required`, and `describedBy`.
- In static HTML, `checked` establishes default checkedness; the native named
  group owns later checkedness, `input`/`change`, validity, FormData, and reset.
- Framework adapters expose one group `value`/`defaultValue` and native change;
  they must not add a mirrored hidden field or independently controlled items.
- Native required-invalid state is semantic and does not imply Error styling
  until the consumer selects the Error variant.

## Browser And Visual Evidence

- Arrow Right moved checkedness and focus from `pickup` to `courier`, emitting
  one `input` and one `change`; Space selected `freight` and emitted the second
  event pair. FormData followed the selected value.
- Form reset restored default `pickup`; clearing the required group failed
  native validity and produced no submitted value.
- Checked computed presentation resolved to the same active background/border
  plus a `4px` inset surface shadow.
- Boundary/dot contrast: light Default `3.07:1` / `10.37:1`, semantic minimum
  `3.86:1`; dark Default `5.19:1` / `17.93:1`, semantic minimum `8.64:1`.
  Semantic label minima are `5.36:1` light and `10.06:1` dark.
- A `280px` RTL fixture with unbroken Arabic content had `0px` root/host
  overflow. Forced colors restored native appearance; reduced-motion
  transition duration resolved to `0s`.
- Eight canonical screenshots cover Exhibit/Studio at Mobile, Tablet, Desktop,
  and XL; the shared state/variant matrix and before image show the dot change.
- Exhibit/Studio stage markup is normalized-identical at `199` characters.

## Tokens, Runtime, Performance, And Targets

- Public tokens remain existing field, surface, primary, body, spacing, radius,
  motion, and opacity semantics. The `1.5px` boundary, `4px` inset/ring,
  first-line offset, and contrast mixes remain private composition.
- Radio-specific runtime is `0 B`. It adds no listener, observer, timer, request,
  formatter, layout read, or asset.
- The shared Primitives family is `10,378 B` gzip against the `10.3 KiB`
  ceiling; Neutral Web component CSS is `57,952 B` against `64 KiB`.
- Web and Shopify use native named radios and canonical classes. React/Angular
  translate group value/defaultValue. Figma maps visual group anatomy without
  form semantics. SwiftUI/Compose use their native single-choice controls.

## Remaining Risks And Human Questions

1. Approve `20px` control, `24px` leading, `8px` gap, central-dot/inset geometry,
   neutral boundary strength, semantic mixes, and focus hierarchy.
2. Approve the repository render as Radio visual evidence or provide a
   Radio-specific owner reference; the registered Studio frame is shared.
3. Decide separately whether The Gallery needs a first-class Radio Group with
   orientation and adapter-level controlled value.

## Readiness Decision

Ready for human review; remains `pilot`. Native group keyboard/form/reset,
controlled/uncontrolled translation, required validity, semantic contrast,
first-line alignment, extreme RTL content, reduced motion, forced colors,
four viewports, shared Exhibit/Studio rendering, and adapters pass. Human visual
approval is required before any `stable` promotion.
