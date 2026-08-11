# Component Dossier: Color Picker / Swatch

Status: `human-review-ready`

Target reviewed: Neutral Web single-choice visual swatch group

Contract: `components/contracts/color-picker.contract.json`

## Recommendation

Define this component as a native radio-backed Swatch Group, not as an arbitrary
color-authoring picker. A group label names the product/filter option; every
swatch has a stable submitted value and a human-readable option name; checked,
focus, unavailable, and validation states remain perceivable without relying on
the fill color. Preserve the accepted `sm`, default, and `lg` visual swatch sizes
inside a minimum 44px interaction target. Keep image/hex swatch content as
authored option data, not as a new public token or color parser.

## Purpose And Limits

- Selects exactly one named visual option such as glaze, color, or finish.
- It is a specialized radio group for product options and storefront filters.
- It is not HTML `input[type="color"]`, a free-form color editor, palette builder,
  eyedropper, gradient editor, or design-token authoring surface.
- Visual fill may be a color or target-provided image, but the accessible option
  name and submitted value remain required independently from appearance.
- Variant availability and product recomputation remain commerce/target-owned.

## Pre-Refinement Gallery Baseline

- Registry `H5`; contract `0.2.0`, `pilot`: six anatomy parts, four validation
  variants, three sizes, five states, three behaviors, seven properties, and
  eighteen public token references.
- Native radio checkedness provides mutual exclusion, but the contract has no
  group-label, submitted option value, required state, or group-level ownership.
- The `24px`, `32px`, and `40px` labels are also the hit targets, below the 44px
  storefront target. Disabled, required-invalid, reset, forced colors, reduced
  motion, and logical extreme-content states are not certified.
- The selected selector changes `border-color` on `.color-swatch__fill`, which
  currently has no border. The optional check is absent from the Exhibit fixture,
  so selection can still depend on color/border alone.
- Exhibit and Studio render different option names/fills and do not currently
  prove one canonical fixture.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Radio Button state](https://html.spec.whatwg.org/multipage/input.html#radio-button-state-(type=radio)) | Same-name radios own mutual exclusion, native `input`/`change`, required validity, form value, and reset. | Keep one native radio per swatch and one group name/value owner. |
| [APG Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | A radio set has a group name, Space selection, and directional navigation. | Preserve native radio keyboard behavior and expose a visible group label. |
| [WAI grouping controls](https://www.w3.org/WAI/tutorials/forms/grouping/) | Related radios should use `fieldset` and `legend` where practical. | Document Fieldset/Legend composition rather than hard-code an unlabeled div. |
| [HTML Color state](https://html.spec.whatwg.org/multipage/input.html#color-state-(type=color)) | `type=color` owns an arbitrary CSS color value and opens a system picker. | Keep free-form color authoring explicitly outside this Swatch Group. |
| [Shopify theme requirements](https://shopify.dev/docs/storefronts/themes/store/requirements) | Product-option swatches must support color or image data and remain keyboard/focus accessible. | Treat fill content as target data and keep name/value semantics independent. |
| [Shopify accessibility guidance](https://shopify.dev/docs/storefronts/themes/best-practices/accessibility) | Product option targets should be 44×44px; color cannot be the only indicator. | Preserve visual sizes inside a 44px target and add a non-color selected cue. |

## Recommended Ownership And API Direction

- Required group anatomy: externally composable Fieldset/Legend or labelled root;
  repeated native radio, visual fill, and accessible option name.
- Optional anatomy: visible option label and decorative selected check.
- Public concepts: `groupLabel`, validation `variant`, `size`, option `label`,
  option `value`, shared `name`, `checked`, `disabled`, `required`, and
  `describedBy`. Options/fills remain authored children/data.
- Static checkedness establishes the uncontrolled default. The native named group
  owns selection, events, validity, FormData, and reset. Frameworks control one
  group value rather than independent booleans.
- Required-invalid is semantic and does not automatically imply Error styling.

## Alternatives And Non-Decisions

1. Replacing swatches with `input[type="color"]` would change the purpose from
   choosing an authored option to authoring arbitrary color and is rejected.
2. A custom ARIA radiogroup would make visuals easier but would duplicate native
   keyboard/form behavior and is not recommended.
3. Exact image cropping, unavailable-product affordance, price/media updates, and
   color-name derivation remain target/product choices.

## Implemented And Verified Result

- Contract `0.3.0`: eight anatomy parts, four variants, three sizes, seven
  states, four behaviors, ten semantic properties, and twenty-five public token
  references. Required `groupLabel`, visible option `label`, submitted `value`,
  shared `name`, `required`, and group description ownership are explicit.
- The canonical root is a native `fieldset`/`legend`; wrapping named radios own
  Arrow/Space, `input` then `change`, validity, FormData, and reset. A browser
  probe moved `celadon` to `ash`, submitted `ash`, restored `celadon`, and
  reported required value-missing without a hidden or JavaScript value owner.
- Every size sits in a minimum `44px` option target. A selected double boundary
  remains independent from fill color and the optional passive check. Disabled,
  validation, focus, reduced-motion, and forced-color states are explicit.
- The default light passive boundary measures `3.09:1`; selected is `17.93:1`.
  Dark passive is `5.22:1`; selected is `17.93:1`. Label/legend text measures
  `7.81:1` light and `12.09:1` dark.
- A `326px` RTL localized/extreme fixture has zero root, option, and document
  overflow. Required empty names are rejected by contract rather than rendered
  as unexplained blank choices.
- Exhibit and Studio use byte-identical canonical stage markup (`2,277`
  characters) and the same four-option fixture. Eight captures cover both
  surfaces at Mobile, Tablet, Desktop, and XL; dark, keyboard-selected, and
  extreme RTL evidence supplement them.
- Runtime remains `0 B`; no enhancer, observer, asset, request, or duplicated
  state is introduced.

## Current Risks And Human Questions

1. Human visual approval is needed for target versus fill size, selection ring/
   check treatment, three sizes, spacing, labels, validation, and focus.
2. No Color Picker-specific owner visual reference is registered.
3. Image swatch cropping and unavailable/sold-out presentation remain later
   product/commerce decisions and do not block the generic radio-backed group.

## Readiness Decision

Ready for explicit human review. The contract remains `pilot`; no visual
approval or `stable` promotion is implied.
