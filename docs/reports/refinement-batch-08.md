# Component Refinement Batch 08

Status: Complete; components are ready for human review, not automatically stable

Date: 2026-07-13

Components: Radio, Quantity Selector, Switch

## Outcome

The dependency-ordered field/control sequence now has Radio, Quantity Selector,
and Switch ready for explicit human stability review. Each component has a
research dossier, reconciled contract/API, canonical source refinement, shared
Exhibit/Studio renderer and fixture, Web/Shopify translation, real-browser
interaction/accessibility/responsive evidence, and a component audit.

No contract status changed to `stable`. Only Button retains historical human
approval. `site/dist` was not rebuilt or modified.

## Research And Decisions

- HTML and WAI-ARIA APG establish native group, spinbutton, and switch behavior.
- Open UI evidence keeps Radio group semantics and immediate Switch boundaries
  narrow; there is no mature Open UI Quantity contract to copy.
- Radix provides useful controlled/uncontrolled comparison for Radio/Switch but
  no Quantity primitive. Shopify confirms group/immediate-form distinctions;
  Carbon supplies a mature editable number-input comparison.
- ADR 0093 records native state ownership, Radio central-dot presentation,
  Quantity native stepping, Switch immediate binary semantics, logical geometry,
  and special-media policy.
- A measurement during this batch found default unfocused field boundaries at
  only `1.26:1` light and `1.73:1` dark. ADR 0092/0093 now apply a private `60%`
  neutral-boundary/text mix. Radio, Quantity, Switch, Input, Select, and Checkbox
  now measure at least `3.07:1` light and `5.19:1` dark without changing public
  token values or introducing a component-token layer.

## Implementation Summary

### Radio

- Native named-group ownership and group-level adapter control documented.
- Hollow selected ring replaced with central dot; first-line alignment,
  containment, contrast, disabled hover, reduced motion, and forced colors pass.

### Quantity Selector

- Added native name/required/read-only surface and explicit value ownership.
- Replaced duplicate arithmetic with `stepUp()`/`stepDown()` in source and
  Studio. Read-only/boundary availability, events, reset, logical separators,
  contrast, reduced motion, and forced colors pass.

### Switch

- Clarified immediate setting versus Checkbox/Toggle; required role, stable
  label, value/events, and no mixed state are explicit.
- Logical RTL travel, complete disabled state, semantic checked fills, content
  containment, reduced motion, forced colors, and Studio state synchronization
  pass across three sizes.

## Browser Evidence Summary

- Native Radio Arrow/Space, events, required validity, FormData, and reset pass.
- Quantity regression proof: baseline `2 → 4` remained step-mismatched;
  refined native stepping produces valid `2 → 3`, with one event pair.
- Switch Space/label/disabled activation, required validity, name/value,
  FormData/reset, and stable label pass.
- Default boundaries are `3.07:1` light / `5.19:1` dark. Semantic non-text
  minima are `3.86:1` light / `8.64:1` dark; semantic text minima are
  `5.36:1` / `10.06:1`.
- A shared `280px` RTL/unbroken fixture has zero Radio/Switch/host overflow;
  Switch checked travel mirrors to physical left.
- Forced-colors and reduced-motion computed styles pass for all three.
- Exhibit/Studio stage markup is identical: Radio `199`, Quantity `1001`,
  Switch `319` normalized characters.
- Twenty-four canonical after screenshots cover three components × two modes ×
  four viewports. Before images plus variant/state/size, RTL, and special-media
  screenshots supplement them under `output/playwright/refinement-batch-08/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Primitives CSS | 10,378 B | 10.3 KiB | pass |
| Forms CSS | 6,155 B | 6.4 KiB | pass |
| Shared theme runtime | 5,263 B | 8 KiB | pass |
| Neutral Web components CSS | 57,952 B | 64 KiB | pass |

Radio and Switch add no component runtime. Quantity retains bounded event/
observer enhancement and no network, polling, hidden value, or layout loop.

## Validation

- Registry/docs, DTCG source, all 183 contracts, and all 183 Studio definitions.
- Neutral Web build/validation and Shopify build/validation.
- Structural component certification, global refinement audit, Exhibit/Studio
  parity, and static preview validation.
- Full docs production build to a temporary `/tmp` target only.
- Git diff checks and explicit verification that tracked `site/dist` is unchanged.

## Remaining Human Risks

1. Radio needs approval of central-dot geometry, size/gap, neutral strength,
   semantic mixes, and focus hierarchy.
2. Quantity needs approval of responsive density, fixed numeric viewport,
   separators/icons/radius, and whether visible label anatomy remains external.
3. Switch needs approval of three proportions, track/thumb treatments, gap,
   shadow, semantic fill, and focus hierarchy.
4. All three need component-specific owner visual approval or acceptance of the
   repository render. Shared calibration frames are traceability, not approval.

## Program Progress

After regenerating the global matrix, the program records 183 components, 94
dependency edges, 24 dossiers, and 22 components ready for human review. Only
Button is human-approved. The next dependency-ordered control batch is Slider,
Combobox, and Date Picker.
