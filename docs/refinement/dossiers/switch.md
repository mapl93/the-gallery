# Component Dossier: Switch

Status: `human-review-ready`

Target reviewed: Neutral Web immediate binary switch

Contract: `components/contracts/switch.contract.json`

## Recommendation

Keep one native checkbox with `role="switch"` inside a wrapping visible label.
Use Switch only for an immediate binary setting, keep its accessible label
stable, and expose no mixed state. Preserve Small, Default, and Large visual
sizes plus the four validation families. Persistence, pending treatment, retry,
rollback, and side effects remain target-owned.

## Purpose And Limits

- Changes one on/off setting whose effect is applied immediately.
- It is not Checkbox for deferred form choices, Radio for exclusive sets,
  Toggle Button for pressed commands, or a tri-state control.
- Required is appropriate only when off is genuinely invalid; it must not be
  used to coerce optional consent.
- Swipe/drag, loading, icons/text inside the track, and asynchronous failure
  recovery remain outside this contract.

## Current Gallery Result

- Registry `H1`; contract `0.3.0`, still `pilot`: five anatomy parts, four
  variants, three sizes, nine states, six behaviors, nine properties, and
  twenty-five public token references.
- Web requires native checkbox plus `role="switch"`, stable visible label,
  `name`, submitted `value`, checked, required, disabled, and described-by.
- Default off boundary uses the private `60%` neutral mix. Semantic off and on
  treatments use `70%` boundary/fill and `55%` label mixes, preserving validation
  family independently from checkedness.
- Disabled state fades the complete root, uses unavailable cursor, and cannot
  receive hover. Thumb placement uses logical inset and mirrors in RTL.
- Root/label contain long text; reduced motion stops track/thumb transitions;
  forced colors supplies system track, thumb, checked, focus, and disabled colors.
- The shared Advanced Control renderer now exposes every semantic property and
  state. The default fixture is off and the On toggle synchronizes the inspector
  state, so its label never contradicts the preview.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Checkbox standard](https://html.spec.whatwg.org/multipage/input.html#checkbox-state-(type=checkbox)) | Native checkbox owns checkedness, required validity, form value, events, and reset. | Keep a real native input as sole state owner. |
| [APG Switch](https://www.w3.org/WAI/ARIA/apg/patterns/switch/) | Switch is binary, has a stable label, exposes switch state, and toggles with Space. | Require role switch and do not change the accessible name. |
| [Open UI Switch explainer](https://open-ui.org/components/switch.explainer/) | Switch has no indeterminate state and commonly implies immediate effect. | Keep a firm boundary from Checkbox and target-own side effects. |
| [Radix Switch](https://www.radix-ui.com/primitives/docs/components/switch) | Mature API exposes checked/defaultChecked, change, disabled, required, name/value, root, and thumb. | Document controlled/uncontrolled translation without copying framework anatomy. |
| [Shopify Switch](https://shopify.dev/docs/api/app-home/web-components/forms/switch) | Polaris uses Switch for immediate settings and exposes label/details/error, checked, name/value, required, disabled, input/change. | Match semantics and compose external Field Wrapper feedback. |

## Anatomy, States, API, And Ownership

- Required anatomy: wrapping label root, native input, visual track, visual
  thumb, and stable visible label.
- States: off/default, hover, on/checked, focus-visible, disabled,
  required-invalid, and Error/Success/Warning focus.
- Public properties: `label`, `size`, `variant`, `checked`, `disabled`,
  `required`, `name`, `value`, and `describedBy`.
- Static `checked` establishes default checkedness; native Web owns later Space,
  click, `input`/`change`, validity, FormData, and reset. Framework adapters bind
  `checked` or `defaultChecked` on the same input without a mirror checkbox.
- The checked switch submits `name=value`; off submits nothing. Native default
  value remains `on` unless authored otherwise.
- Static validation feedback is described text, not an alert. Only dynamically
  inserted feedback may opt into live-region behavior.

## Browser And Visual Evidence

- Space toggled off to on, kept the stable label, produced one `input` and one
  `change`, passed required validity, and submitted `available=yes`.
- Form reset restored off, failed required validity, and removed the value.
  Label activation toggled on; disabled activation did not change state and the
  field was omitted from FormData.
- Checked RTL thumb resolved to physical `left: 2px; right: 22px`, proving
  logical mirroring from the LTR baseline. Disabled root resolved to opacity
  `0.5` and `not-allowed`; no independent faded track/active label remains.
- Default off / checked contrast is `3.07:1` / `10.37:1` light and `5.19:1` /
  `17.93:1` dark. Semantic track/thumb minima are `3.86:1` light and `8.64:1`
  dark; semantic label minima are `5.36:1` and `10.06:1`.
- Track sizes are `36×20`, `44×24`, and `52×28px`. Long unbroken RTL labels in a
  `280px` fixture had `0px` overflow and kept the thumb mirrored.
- Forced colors resolved checked track to system Highlight, thumb to Canvas,
  focus to a `4px` system outline; track/thumb reduced-motion durations are `0s`.
- Eight canonical screenshots plus variants/sizes, RTL, and special media cover
  all four viewports. Exhibit/Studio markup is normalized-identical at `319`
  characters.

## Tokens, Runtime, Performance, And Targets

- Public tokens remain existing field/primary/surface/text, body type, icon gap,
  radius, shadow, motion, and opacity semantics. Width/height/thumb travel,
  `2px` inset, focus geometry, and contrast mixes remain private composition.
- Switch-specific runtime is `0 B`; the native input owns all activation and
  form behavior. Pending/persistence code is intentionally absent.
- Forms CSS is `6,155 B` gzip against `6.4 KiB`; shared runtime is `5,263 B`
  against `8 KiB`; Neutral Web component CSS is `57,952 B` against `64 KiB`.
- Web and Shopify render native checkbox switches with canonical classes.
  React/Angular map checked/defaultChecked and native events. Figma maps three
  visual sizes/states without form effects. SwiftUI/Compose use native Switch/
  Toggle equivalents and target-owned persistence.

## Remaining Risks And Human Questions

1. Approve three track/thumb proportions, `8px` gap, first-line alignment,
   neutral boundary, semantic checked fills, thumb shadow, and focus hierarchy.
2. Approve the repository render or provide a Switch-specific owner reference;
   the registered Studio frame is shared calibration evidence only.
3. Confirm no checked/unchecked inner labels or pending state are desired for
   v1; either would expand anatomy and target behavior.

## Readiness Decision

Ready for human review; remains `pilot`. Native role/Space/click/form/reset,
immediate-setting boundary, controlled/uncontrolled translation, value/required/
disabled behavior, label stability, contrast, RTL, long content, reduced motion,
forced colors, four viewports, shared Exhibit/Studio rendering, budgets, and
adapters pass. Human visual approval is required before `stable` promotion.
