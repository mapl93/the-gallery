# Slider / Range Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Slider now has native single- and dual-handle value ownership, synchronized
visible values and fill, ordered lower/upper handles, native form/reset events,
logical RTL progress, complete focus/special-media treatment, and one canonical
implementation consumed by Exhibit and Studio. The accepted v1 boundary remains
horizontal, one visual size, and Default/Error/Success/Warning presentation.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One relative numeric value or bounded lower/upper pair; direct numeric entry remains Number Input/Quantity ownership. |
| Anatomy and composition | pass | Eleven contract parts; every handle is a native `input[type="range"]`; generated engine track/thumb parts remain private. |
| Variants, sizes, states | pass | Single/range, one size, disabled/focus, ordered fill, and four validation families are explicit. |
| Public API and ownership | pass | Twelve properties map label/mode/value/bounds/step/names/disabled/description; native inputs own value, events, FormData, validity, and reset. |
| Tokens and visual system | pass | Twenty-three existing public token references; `4px` track, `20px` thumb, `44px` control, progress math, and contrast mixes remain private. |
| Accessibility and motion | pass | Native keyboard/touch semantics, visible focus, forced colors, reduced motion, names/descriptions, and disabled behavior are preserved. |
| Responsive/content resilience | pass | Container-bound width, long label wrapping, negative/decimal/boundary probes, RTL, and four viewports pass. |
| Runtime and assets | exception accepted | Shared bounded enhancer; no network, timer, polling, continuous layout loop, or bundled asset. ADR 0094 records the family/runtime budget exception. |
| Cross-target translation | pass | Web/Shopify share native owners and hooks; framework/Figma/native-mobile boundaries are documented. |
| Documentation and verification | pass | Shared canonical renderer/fixture, 8 after captures, browser probes, validators, generated adapters, and this report. |

## Contract, State, And Runtime

- Contract `0.3.0`: 11 anatomy parts, 2 modes, 1 size, 9 states,
  6 behaviors, 12 properties, and 23 public token references.
- Single mode derives `--_slider-progress` and visible output from its native
  value. Range mode derives logical start/end from stable lower and upper native
  owners; crossing clamps rather than swapping semantic ownership.
- Track pointer activation performs one bounded geometry read, selects the
  nearest enabled owner, updates it through native value semantics, and focuses
  it. Idle sliders perform no layout work.
- Static `value` attributes establish uncontrolled defaults. Controlled adapters
  update the same native owners and consume `input`/`change`; no hidden mirror
  value exists.

## Browser And Visual Evidence

- Single value synchronization reached `10`; the visible output and active fill
  reached the same value. A range lower value crossing its upper bound clamped to
  `4`, preserving the named lower/upper owners and `4–4` output.
- `input` then `change` fired for each committed native owner, FormData contained
  the authored single/lower/upper names, and form reset restored `3`, `-2`, and
  `4` plus their derived output/fill.
- Native RTL keyboard behavior is preserved: focused `ArrowRight` moved `60` to
  `59`; root and page overflow remained `0px` at 390px.
- Text contrast samples are `17.93:1` for the primary label and `7.81:1` for the
  value. Forced colors exposes system track/thumb boundaries and a `4px`
  Highlight focus outline; reduced-motion thumb transition resolves to `0s`.
- Eight canonical after screenshots cover Exhibit and Studio at `390x844`,
  `768x1024`, `1280x800`, and `1600x1000`. Two desktop before images preserve
  the unsynchronized baseline under `output/playwright/refinement-batch-09/`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | One or two native range inputs plus canonical CSS and bounded enhancer. | Implemented and browser-evidenced. |
| Shopify | Native range inputs, names, bounds, values, and copied CSS/runtime hooks. | Generated adapter validates; dedicated Liquid/editor review remains target work. |
| React / Angular | `value`/`defaultValue` or explicit lower/upper values with native events. | Strategy documented; adapter not yet certified. |
| Figma | Mode, value positions, validation, disabled, and focus presentation. | Metadata validates; shared owner frame is not visual approval. |
| SwiftUI / Compose | Native horizontal Slider plus explicit paired-owner composition for range. | Conceptual mapping only. |

## Performance

- Canonical Forms CSS: `7,314 B` gzip versus `6.4 KiB` ceiling — accepted
  documented exception.
- Shared runtime: `9,754 B` gzip versus `8 KiB` ceiling — accepted documented
  exception for all three Batch 09 behaviors.
- Neutral component CSS: `58,405 B` gzip versus `64 KiB` ceiling — pass.

## Remaining Human Risks

1. Approve `20px` thumb, `4px` track, `44px` control, fill strength, shadow,
   label/value spacing, validation mixes, and focus hierarchy.
2. Accept the repository render as Slider-specific visual evidence or provide an
   owner reference; the registered Studio frame remains shared calibration.
3. Vertical orientation, marks, tooltips, scale transforms, units, and Number
   Input composition remain separate product/API decisions.

## Validation

Contracts, Studio, registry/docs, Neutral Web, Shopify, structural certification,
Exhibit/Studio parity, preview audit, real-browser interaction/RTL/special-media,
four-viewport evidence, temporary docs build, and diff checks are included in
Batch 09 validation.
