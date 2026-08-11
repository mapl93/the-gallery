# Component Dossier: Slider / Range

Status: `human-review-ready`

Target reviewed: Neutral Web native horizontal range control

Contract: `components/contracts/slider.contract.json`

## Recommendation

Keep every Slider handle as a native `input[type="range"]`. A single-value
slider has one native value owner; range mode has two explicitly named native
owners whose values cannot cross. The visible value and active fill are derived
presentation synchronized from those inputs. Preserve horizontal orientation,
one accepted size, and the four existing validation families. Do not introduce
a custom ARIA slider, vertical orientation, marks, tooltips, or number-input
composition without a separate accepted decision.

## Purpose And Limits

- Selects one numeric value, or a bounded lower/upper pair, from a known range.
- It is appropriate when relative position is useful and exact free-form entry
  is not the only way to complete the task.
- Quantity Selector and Number Input own directly editable numeric entry.
- Slider does not own units, formatting policy, scale transforms, tick data,
  vertical orientation, or range presets.
- Validation presentation is independent from single/range mode and native
  constraint attributes.

## Current Gallery Result

- Registry `H2`; contract `0.3.0`, still `pilot`: eleven anatomy parts, two
  modes, one size, nine states, six behaviors, twelve properties, and
  twenty-three public token references.
- Single and range native owners synchronize visible values and logical fill.
  Stable lower/upper owners clamp without crossing or swapping form meaning.
- WebKit/Firefox track, thumb, focus, disabled, validation, forced-colors, and
  reduced-motion presentation are explicit in canonical Forms CSS.
- Shared Web behavior owns bounded synchronization, mutations, native reset,
  and nearest-handle track activation without polling or idle layout work.
- Exhibit and Studio consume the same canonical anatomy, fixture, CSS, contract,
  and progressive behavior boundary.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML Range state](https://html.spec.whatwg.org/multipage/input.html#range-state-(type=range)) | Native range owns min, max, step, value, keyboard, events, form submission, and reset. | Keep each handle native and derive presentation from its current value. |
| [APG Slider](https://www.w3.org/WAI/ARIA/apg/patterns/slider/) | Sliders require an accessible name, min/max/current value, optional value text, and Arrow/Home/End behavior. Touch AT support is a stated risk for custom widgets. | Prefer native range semantics and test coarse/touch behavior. |
| [Open UI Slider research](https://open-ui.org/components/slider.research/) | Label, active fill, handle, track, value, marks, range, controlled use, and orientation recur across systems. | Current label/fill/handle/value anatomy is sound; expose only the accepted horizontal subset. |
| [Radix Slider](https://www.radix-ui.com/primitives/docs/components/slider) | Mature adapters expose controlled/uncontrolled arrays, form names, multiple thumbs, minimum spacing, RTL, and orientation. | Framework adapters can translate native values to arrays; the base contract should keep explicit native owners. |
| [Carbon Slider](https://carbondesignsystem.com/components/slider/usage/) | Single and range anatomy pair visible labels/limits/value entry with handle states and warn against unsuitable imprecise ranges. | Document selection guidance; do not silently add a Number Input dependency. |

## Recommended Ownership And API Direction

- Required single anatomy: root, visible label, current value, track wrapper,
  native range input, generated track/thumb parts.
- Range mode: one shared visible label/value summary, track, active fill, lower
  native input, and upper native input.
- Public cross-target concepts: `label`, `mode`, validation `variant`, `value`,
  `upperValue`, `min`, `max`, `step`, `name`, `upperName`, `disabled`, and
  `describedBy`.
- Static HTML values establish uncontrolled defaults. Native `input`, `change`,
  FormData, and reset remain authoritative. Framework adapters control the same
  native owners rather than a hidden mirrored value.
- For range mode, lower is clamped at or below upper and upper at or above lower.
  Crossing does not swap semantic owners.
- Exact unit formatting and `aria-valuetext` remain consumer-authored content
  until a cross-target formatter contract is accepted.

## Alternatives And Non-Decisions

1. A fully custom `role="slider"` could provide identical visuals across engines,
   but would replace native keyboard/touch/form behavior and is not recommended.
2. A framework-style value array is attractive for React but is not a stable HTML,
   Shopify, or form mapping; explicit lower/upper owners are recommended.
3. Vertical orientation, inversion, marks, tooltips, and editable Number Input
   composition are useful mature-system features but remain product decisions.

## Browser, Content, And Performance Evidence

- Single/range values, ordered clamping, output/fill, native event pairs,
  FormData names, negative values, and form reset pass in a neutral harness.
- RTL keeps logical progress and native keyboard direction (`60` to `59` on
  Arrow Right); 390px roots and the document have zero overflow.
- Primary/value text measures `17.93:1`/`7.81:1`. Forced colors exposes system
  track/thumb boundaries and Highlight focus; reduced-motion duration is `0s`.
- Eight after captures cover Exhibit/Studio across Mobile, Tablet, Desktop, and
  XL; two before captures preserve the prior static baseline.
- Forms CSS is `7,314 B` gzip and shared runtime `9,754 B`, documented as the
  bounded ADR 0094 exception; total neutral CSS remains within `64 KiB`.

## Current Risks And Human Questions

1. Human visual approval will be needed for the existing `20px` thumb, `4px`
   track, fill treatment, label/value row, and validation treatment.
2. No Slider-specific owner visual reference is registered; the Studio metadata
   points to the shared Button pilot frame.
3. Vertical orientation, marks, and coupled Number Input fields remain explicit
   future product choices and do not block horizontal v1 review.

## Readiness Decision

Ready for human review; remains `pilot`. Native ownership, ordered range state,
events/FormData/reset, browser-engine presentation, RTL, special media, content,
four viewports, shared Exhibit/Studio consumption, and adapters pass. Human
visual approval is required before any `stable` promotion.
