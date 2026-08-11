# Component Dossier: Number Input

Status: `human-review-ready`

Target under review: Neutral Web generic numeric field with explicit step
actions

Contract: `components/contracts/number-input.contract.json`

## Recommendation

Keep Number Input separate from the commerce-oriented Quantity Selector as
required by ADR 0060, but reconcile both around the same native stepping model:
one editable `input[type="number"]` owns value, constraints, validity, events,
form data, and reset; named buttons call the native `stepDown()`/`stepUp()`
algorithm and derive their availability. Number Input remains generic numeric
entry and must not acquire inventory, price, currency, or unit policy.

## Purpose And Limits

- Collects a real numeric measurement, threshold, count, ratio, or other value
  that can be edited directly or stepped.
- It is not appropriate for digit strings such as postal codes, card numbers,
  identifiers, or one-time codes; those require text semantics.
- It is not Money Field, Slider, unit converter, locale-number parser, formula
  input, or commerce persistence control.
- Field Wrapper owns visible label/help/feedback. The numeric control owns its
  compact boundary, native field, and explicit step actions.

## Pre-Refinement Gallery Baseline

- Registry `H14`; contract `0.3.0`, `pilot`: five anatomy parts, four variants,
  one size, five states, three behaviors, and seven properties.
- The contract omits `name`, `required`, `readOnly`, accessible action names,
  and explicit native event/reset/value ownership. Fixture `0`/`10` bounds are
  incorrectly encoded as component defaults rather than example data.
- Buttons and field are `36px`, physical separators are not RTL-safe, direct
  entry is clamped on every Studio change, and an empty intermediate value
  becomes zero.
- Neutral Web has no Number Input enhancement even though Quantity Selector
  already implements native stepping, boundary synchronization, reset, and
  event dispatch.
- CSS lacks disabled/readonly root treatment, disabled-safe hover, special
  media, responsive containment, and extreme-value handling. Exhibit and
  Studio markup/behavior diverge.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML number state](https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)) | Native number input owns value sanitization, min/max/step validity, `valueAsNumber`, stepping, form data, and events. | Delegate numeric algorithms and keep one native owner. |
| [APG Spinbutton pattern](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) | Editable spinbuttons support direct text entry and Up/Down while preserving standard text editing; custom implementations need value semantics. | Native input supplies the spinbutton semantics; buttons are additive. |
| [Open UI Input Number research](https://open-ui.org/components/inputnumber.research/) | Ecosystem research identifies field, increment, decrement, bounds, and step, but does not establish a finalized standard API. | Reuse the anatomy without claiming an Open UI consensus. |
| [Shopify Number field](https://shopify.dev/docs/api/app-home-ui-extension/latest/web-components/forms/number-field) | Polaris' current target API distinguishes value/default value, min/max/step, name, required, readonly, input mode, label/help/error, and optional prefix/suffix. | Retain native field semantics; leave prefix/suffix and formatting for later product review. |
| [Base UI Number Field](https://base-ui.com/react/components/number-field) | A mature compositional API separates root, group, decrement, input, and increment and supports controlled/uncontrolled use. | Document parts and ownership without adopting framework-only props. |
| [React Aria useNumberField](https://react-spectrum.adobe.com/react-aria/useNumberField.html) | Locale formatting and validation require a coordinated field state and adapter behavior. | Treat locale formatting as an advanced target concern, not implicit base behavior. |
| [WAI form validation](https://www.w3.org/WAI/tutorials/forms/validation/) | Numeric input is suitable for actual numbers, while server validation remains necessary. | Document correct content scope and native/client/server boundaries. |

## Recommended Anatomy, States, And API

- Required: root, decrement button, native field, increment button. Browser
  spin-button pseudo-elements remain generated/private and hidden because
  explicit actions are visible.
- Independent states: default, hover, focus-within, button hover, boundary
  disabled, field disabled, readonly, empty/invalid intermediate value, and the
  three semantic validation families with matched focus.
- Preserve `variant`, optional initial `value`, optional `min`/`max`, positive
  `step`, `disabled`, and `describedBy`; add `name`, `required`, `readOnly`, and
  explicit accessible labels for the field and both actions.
- Remove fixture bounds/value from semantic defaults. `step=1` remains the HTML
  default/fallback; Studio supplies `value=1`, `min=0`, `max=10` only as sample
  content.
- Static HTML `value` establishes the initial value. Native Web owns subsequent
  edits, including empty/invalid intermediates. Framework adapters may be
  controlled or uncontrolled but must not coerce `""` to zero during typing.

## Behavior And Accessibility Direction

- Shared progressive enhancement should support both `.qty` and
  `.number-input` without merging their contracts or selectors. It calls native
  stepping, dispatches bubbling `input` then `change` only when the value
  changes, observes constraints, and resynchronizes after reset.
- Direct typing is not auto-clamped. Native validity reports range/step errors;
  the consumer decides validation timing. Step actions respect boundaries and
  native step-base alignment.
- Keep explicit buttons in normal tab order with `type="button"`, clear names,
  `aria-controls`, and the semantic button minimum-height token (`40px` at the
  reviewed fine-pointer desktop mode and `44px` at mobile/coarse mode). The
  native field retains Arrow Up/Down and text-editing behavior.
- Disabled is unavailable and omitted from form data. Readonly remains focusable
  and submittable while both step actions are unavailable.
- Use logical separators, bounded inline sizing, private geometry, accepted
  focus/validation colors, reduced motion, and forced-colors system boundaries.

## Relationship To Quantity Selector

- Shared: native number ownership, min/max/step, button stepping, events, reset,
  disabled/readonly behavior, boundary derivation, and accessibility names.
- Number Input: generic form data with no inventory/cart semantics and future
  potential for domain-specific formatting only after explicit review.
- Quantity Selector: commerce quantity context and target-owned inventory/cart
  persistence.
- ADR 0060 forbids treating reconciliation as a merge or deprecation. A shared
  internal enhancer reduces duplication without changing either public class or
  component identity.

## Alternatives And Non-Decisions

1. Reusing Quantity Selector markup/classes would collapse two accepted public
   components and is therefore out of scope.
2. A fully custom ARIA spinbutton would duplicate native semantics and require
   more keyboard/assistive-technology code.
3. Clamping every keystroke prevents empty and partial decimal entry; native
   constraint validation is the safer base behavior.
4. Prefix/suffix, unit formatting, localized parsing, wheel policy, scrubbing,
   and compact/large sizes are plausible but need product/cross-target review.
5. Hiding the visible step buttons or removing them from tab order is not
   recommended for the base; they remain explicit operable actions.

## Implemented Result

- Contract `0.4.0` now defines 5 anatomy parts, 4 validation variants, 1 size,
  11 states, 6 behaviors, 13 semantic properties, and 30 existing public token
  references. Fixture bounds are no longer semantic defaults; native form,
  reset, value, constraint, event, disabled, and readonly ownership are explicit.
- The existing Quantity Selector enhancer now also supports `.number-input`
  through component-specific selectors. It calls native `stepUp()`/`stepDown()`,
  emits `input` then `change` only after a real value change, derives action
  availability, and resynchronizes on form reset/constraint mutations without
  merging either public component.
- Direct editing remains nullable and is never clamped by the renderer. A
  browser-found deferred React event read that unmounted the empty fixture was
  corrected by capturing the native value before the state update.
- Canonical CSS provides logical separators, accepted validation/focus families,
  responsive action sizing, forced-colors/reduced-motion behavior, and LTR
  numeric glyph ordering inside an RTL surrounding interface. No new public
  token was introduced.

## Certification Evidence

- A `1→2` step emitted exactly `input:2` then `change:2`. Empty direct editing
  remained `""`/`NaN` without unmounting. A detached real form with `min=1`,
  `max=5`, `step=2`, and initial `2` stepped natively to `3`, remained valid,
  submitted `count=3`, reset to `2`, excluded a disabled value, and retained a
  readonly value while disabling both actions.
- Exhibit and Studio markup is byte-identical at 700 characters. Eight canonical
  images cover both surfaces at Mobile/Tablet/Desktop/XL; warning-focus,
  readonly, dark, extreme RTL, and forced-colors captures supplement the labeled
  reconstructed desktop baseline.
- The desktop root is `170×42px`, both actions are `40px`, and the numeric
  viewport is `88px`; mobile/coarse mode expands actions to `44px`. The `300px`
  RTL fixture has no overflow and renders `-123456` in correct signed order while
  preserving logical action order.
- Sampled light contrast is `17.93:1` for the value, `3.07:1` for the boundary,
  and `7.81:1` for action text. Dark equivalents are `17.18:1`, `5.19:1`, and
  `12.09:1`; warning feedback text is `5.36:1`.
- Reduced-motion transitions are `0s`; forced colors restores system boundaries
  and focus. The shared behavior adds `65 B` gzip for Batch 12, below the `1 KiB`
  behavior-delta ceiling, with no polling, hidden value, parser, asset, or
  network work.

## Current Risks And Human Questions

1. Human review must approve action density, numeric viewport width, separators,
   radius, icons, validation colors, and focus hierarchy.
2. The generic/commerce distinction is semantic rather than strongly visual;
   later architecture review may revisit whether two public components remain
   worthwhile, but this batch will not merge them.
3. No Number Input-specific owner reference is registered beyond the generic
   Studio frame.
4. Locale-aware formatting and assistive-technology behavior need target-level
   testing if introduced later.

## Readiness Decision

Ready for explicit human review with the contract still `pilot`. Readiness does
not imply visual approval or promotion to `stable`.
