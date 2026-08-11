# Component Dossier: Quantity Selector

Status: `human-review-ready`

Target reviewed: Neutral Web editable quantity spinbutton

Contract: `components/contracts/quantity-selector.contract.json`

## Recommendation

Keep one editable native `input[type="number"]` as the sole value, constraint,
validity, form, and reset owner, flanked by named decrement/increment buttons.
Progressive enhancement must call native `stepDown()`/`stepUp()` and derive
button availability. Inventory, pricing, cart persistence, pending state, and
server recovery remain target-owned commerce behavior.

## Purpose And Limits

- Edits a discrete quantity through typing, Arrow Up/Down, or named step actions.
- It is not Slider, a generic Number Input anatomy, inventory service, cart
  mutation client, unit converter, or price calculator.
- Consumers own visible Field Wrapper label/feedback, inventory constraints,
  asynchronous persistence, and locale-specific business formatting.
- One reviewed responsive density remains; alternate sizes are not inferred.

## Current Gallery Result

- Registry `A10`; contract `0.3.0`, still `pilot`: four anatomy parts, four
  variants, one size, eleven states, six behaviors, thirteen properties, and
  twenty-seven public token references.
- Added `name`, `required`, and `readOnly`; documented static/default versus
  live controlled ownership, native events, reset, and positive-step fallback.
- Shared enhancement now calls the native stepping algorithm. It emits `input`
  and `change` only when the value changes, disables both actions for disabled
  or read-only fields, and observes `readonly` with other constraints.
- Canonical CSS uses logical separators, bounded inline sizing, disabled-safe
  hover, default `60%` and semantic `70%` contrast mixes, reduced motion, and
  forced-colors system boundaries.
- Studio uses the same native stepping operation and nullable editable value as
  the canonical enhancer; Exhibit and Studio share one renderer/fixture.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Number state](https://html.spec.whatwg.org/multipage/input.html#number-state-(type=number)) | Native number inputs own numeric value, constraints, validity, readonly/required, events, and stepping. | Delegate step-base alignment and keep one native owner. |
| [APG Spinbutton](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/) | Editable spinbuttons support direct text entry, Up/Down, and named increase/decrease actions. | Buttons are additive; do not replace direct editing. |
| Open UI catalogue | No mature Quantity Stepper contract is published. | Do not invent an emerging custom-element API. |
| Radix catalogue | No Quantity/Number primitive exists in the reviewed set. | Absence supports a native-first boundary rather than a framework-shaped API. |
| [Carbon Number Input](https://carbondesignsystem.com/components/number-input/usage/) | Mature anatomy distinguishes label, helper/error, editable value, boundaries, read-only, and step actions. | Reuse semantic distinctions while retaining Gallery's external Field Wrapper and one size. |

## Anatomy, States, API, And Ownership

- Required anatomy: inline root, decrement button, native number input, increment
  button. Decorative plus/minus SVG geometry is adapter-private.
- States: default, hover, focus-within, button hover/boundary, disabled,
  read-only, three semantic-focus states, empty/invalid value, and hidden native
  WebKit spinners.
- Public properties: `value`, `min`, `max`, `step`, `variant`, `disabled`,
  `name`, `required`, `readOnly`, three accessible labels, and `describedBy`.
- Static `value` establishes the initial value; native Web owns later edits.
  Framework adapters use `value` or `defaultValue` on the same input.
- `readOnly` remains focusable and submittable while disabling both buttons;
  `disabled` is unavailable and omitted from successful form submission.
- The schema cannot express mathematical `step > 0`; an absent, invalid, or
  non-positive value falls back to one without adding a new property.

## Browser And Visual Evidence

- Baseline manual arithmetic changed `2` with `min=1, step=2` to `4` while
  preserving `stepMismatch=true`. Native stepping now resolves `2 → 3`, clears
  mismatch, and emits exactly one bubbling `input` and `change`.
- Decrement reached `1` and disabled only the lower action. Read-only disabled
  both actions but submitted `quantity=1`; disabled omitted the field.
- Authored `step=0` fell back through native behavior from `3 → 4` with valid
  alignment. Form reset restored the initial authored value and resynchronized
  button availability.
- Default/semantic boundary contrast is `3.07:1`–`6.21:1` light and
  `5.19:1`–`12.30:1` dark. The focused inner boundary remains the high-contrast
  component of the accepted inner-boundary/outer-halo hierarchy.
- Action size is `44px` at Mobile/Tablet and `40px` at Desktop/XL; root height is
  `46px` and `42px` respectively. The numeric viewport stays bounded for extreme
  values instead of growing the component.
- A `280px` RTL extreme fixture had `0px` overflow; root stayed within `238px`.
  Forced-colors boundaries/separators resolved to system `ButtonText`, focus to
  a `4px` system outline, and reduced-motion transition duration to `0s`.
- Eight canonical screenshots plus variant/special-mode evidence cover all four
  viewports. Exhibit/Studio markup is normalized-identical at `1001` characters.

## Tokens, Runtime, Performance, And Targets

- Public tokens remain existing field surface/boundary/focus, button hover,
  text/icon, spacing, radius, typography, motion, and opacity semantics. The
  `48px` numeric viewport, `16px` icon, separators, padding, mixes, and centered
  alignment are private Web composition.
- One enhanced root owns two click, input, change, and optional reset listeners
  plus one attribute observer; there is no polling, layout loop, network work,
  hidden value, or inventory client.
- Shared runtime is `5,263 B` gzip against `8 KiB`; Primitives is `10,378 B`
  against `10.3 KiB`; Neutral Web component CSS is `57,952 B` against `64 KiB`.
- Web and Shopify share native input/classes/enhancement while Shopify owns cart
  mutation. React/Angular bind the live native value/events. Figma maps visual
  anatomy only. SwiftUI/Compose use native numeric entry plus step actions.

## Remaining Risks And Human Questions

1. Approve responsive `44/40px` action density, `48px` numeric viewport,
   separators, icon geometry, radius, semantic colors, and focus hierarchy.
2. Decide whether a visible label must become required anatomy rather than an
   external Field Wrapper composition; this is an architecture decision.
3. Approve the repository render or provide Quantity-specific owner evidence.
4. Locale-aware formatted values and inventory/pending behavior stay outside
   this primitive and require target-specific certification.

## Readiness Decision

Ready for human review; remains `pilot`. Native editing/stepping, events,
constraints, form/reset, read-only/disabled behavior, controlled/uncontrolled
translation, contrast, responsive density, extreme RTL content, special media,
four viewports, parity, budgets, and adapters pass. Human visual and architecture
review is required before any `stable` promotion.
