# Component Dossier: Field Wrapper

Status: `human-review-ready`

Target reviewed: Neutral Web field composition primitive

Contract: `components/contracts/field-wrapper.contract.json`

## Recommendation

Define Field Wrapper as composition, not a value owner: a visible label, one
canonical control slot, optional helper text, and at most one current feedback
message in predictable order. The composed control owns value, `required`,
`aria-invalid`, focus, events, and controlled/uncontrolled behavior. Field
Wrapper owns layout and association guidance only, with no external bottom
margin and no runtime.

## Purpose And Limits

- Gives one form control a visible label and nearby instructions/feedback.
- Composes canonical Input, Select, Textarea, Combobox, Date Picker, or another
  field without copying their DOM or behavior.
- It is not a generic stack, validation engine, live-region manager, form state
  store, or submission controller.
- Error, success, and warning presentation do not change the native state of the
  composed control.
- Required presentation must remain synchronized with native/target semantics.

## Pre-Refinement Gallery Baseline

- Registry `H10`; contract `0.3.0`, `pilot`: eight anatomy parts, four feedback
  variants, one size, five states, three behaviors, four properties, and six
  public token references.
- The contract omits the required control slot and configurable feedback
  content even though those are the component's central composition boundaries.
- `.field` imposes a hardcoded external bottom margin, making layout depend on
  where the wrapper is consumed. Label/message sizes are hardcoded calculations
  despite accepted field typography aliases.
- Exhibit is Success while Studio defaults to no feedback; their fixtures are
  not byte-identical. Studio always references a feedback id even when the node
  is absent.
- Long/localized labels and messages, empty optional content, forced colors, and
  wrapper/control association are not certified.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WAI form labels](https://www.w3.org/WAI/tutorials/forms/labels/) | Visible labels should be explicitly or implicitly associated with controls. | Keep label/control identity target-authored and test exact associations. |
| [WAI user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/) | Inline errors should identify the field, explain the problem in text, and be associated using `aria-describedby`. | Keep helper and current feedback ids on the control; do not make the wrapper a validation owner. |
| [React Aria useField](https://react-aria.adobe.com/useField) | A field associates a control with Label, Description, and Error Message, generating the relevant ids/ARIA. | The anatomy matches; id generation belongs to adapters, while the base contract documents the relationships. |
| [React Aria RadioGroup](https://reactspectrum.blob.core.windows.net/reactspectrum/c96f9bc935f4fce0cd63dd27cbb1718c872df20f/docs/react-aria/RadioGroup.html) | Mature fields compose Label, control(s), description, and FieldError; descriptions/errors are linked with `aria-describedby`. | Keep feedback slots reusable across direct fields and groups. |
| [Polaris Choice List](https://polaris-site-prod-kit.shopify.prod.shopifyapps.com/components/selection-and-input/choice-list) | Polaris combines a visible title, choices, optional error, disabled state, and name. | Target adapters may package the parts, but Gallery's wrapper stays control-agnostic. |

## Recommended Ownership And API Direction

- Required anatomy: root, visible label, and one canonical control slot.
- Optional anatomy: visual required indicator, helper description, and one
  feedback node whose Error/Success/Warning class follows `variant`.
- Public concepts: `label`, required `control` slot, `description`, validation
  `variant`, `feedback`, and visual `required` marker.
- The consumer/adaptor owns matching label/control ids and the ordered
  `aria-describedby` references for helper and current feedback nodes.
- The composed control owns all value, validity, event, reset, disabled, and
  controlled/uncontrolled behavior.
- Field Wrapper owns only internal flow; parent layout owns exterior spacing.

## Alternatives And Non-Decisions

1. Generating ids in base JavaScript would add runtime and a hidden source of
   target-specific identity; adapters should generate or author ids.
2. Making Error/Success/Warning simultaneous public slots can produce
   contradictory state; expose one current feedback message and variant.
3. Embedding Input markup would duplicate canonical components and is rejected.
4. Label placement modes, floating labels, optional-text copy, and validation
   timing are product decisions and are not introduced.

## Implemented Result

- Contract `0.3.0` now defines 10 anatomy parts, 4 feedback variants, 1 size,
  7 states, 4 behaviors, 6 semantic properties, and 10 existing public token
  references. The required canonical control and optional current-feedback
  slots are explicit.
- Canonical CSS owns full-width internal flow, accepted field typography,
  long-content wrapping, validation-family presentation, and forced-colors
  fallback. The former external bottom margin is removed.
- Exhibit and Studio use one success fixture and one renderer. Studio locks the
  required control slot, composes canonical Input, creates only existing
  `aria-describedby` references, and updates fixture feedback coherently when
  the validation variant changes.
- Field Wrapper adds no value, validity, id-generation, live-region, or other
  runtime ownership.

## Browser, Content, And Performance Evidence

- Exhibit and Studio stage markup is byte-identical at 543 characters. Eight
  canonical after captures cover Mobile through XL; dark Error and extreme RTL
  captures supplement two desktop before baselines.
- The label `for` and input id match, the required canonical slot is present and
  locked, the textbox has the visible accessible name, and every helper/feedback
  reference resolves. Error adds `aria-invalid=true`; Default removes both the
  feedback node and its id reference.
- A `326px` RTL fixture with long localized label, helper, error, and input value
  has zero root/stage overflow. Error text measures `8.05:1` in light and
  `10.03:1` in dark; forced colors maps label, feedback, and control boundary to
  system colors.
- Component runtime remains `0 B`; composed Input behavior is already certified.
  ADR 0096 records the shared Forms CSS delta. No asset, observer, id generator,
  or request is introduced.

## Cross-Target Translation

- Web and Shopify author matching ids and compose canonical target controls.
  Shopify Liquid/schema/data/editor mapping remains target-native work.
- React/Angular adapters may generate ids while leaving state and events on the
  composed control. Figma maps slots, ordering, feedback variant, and visual
  tokens only. Native mobile targets use their platform field/helper/error
  composition without importing Web DOM.

## Current Risks And Human Questions

1. Human review is needed for label/message scale, required marker, feedback
   hierarchy, and spacing after removal of external margin.
2. No Field Wrapper-specific visual reference is registered.
3. The generated asterisk remains a visual convention; native/target required
   semantics are still mandatory and authoritative.

## Readiness Decision

Ready for explicit human visual and semantic review. Composition, associations,
shared rendering, responsive/content, contrast, special-media, generated
adapters, and performance evidence are complete. The contract remains `pilot`;
no `stable` promotion is implied.
