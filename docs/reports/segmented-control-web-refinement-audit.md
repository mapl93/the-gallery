# Segmented Control Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Segmented Control is now a native radio-backed single-choice field with a visible
group label, stable submitted values, explicit required/group/per-option disabled
semantics, `44px` targets, container-aware stacking, and no custom runtime. It is
explicitly not Tabs, navigation, multi-select toggles, or an action group.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Small mutually exclusive field; action, navigation, tabs, and multi-select boundaries are explicit. |
| Anatomy and composition | pass | Native fieldset, visible legend, options, repeated wrapping item, native radio, and visible label. |
| Variants, sizes, states | pass | Default/Error/Success/Warning, one accepted size, selected/hover/focus/required-invalid/group-disabled/option-disabled. |
| Public API and ownership | pass | Ten semantic properties; one native group value owns events, validity, FormData, and reset. |
| Tokens and visual system | pass | Thirty-one existing public references; target geometry and contrast mixes remain private. |
| Accessibility and motion | pass | Native group name/keyboard, 44px targets, dual focus hierarchy, reduced motion, and forced colors. |
| Responsive/content resilience | pass | Four viewports plus `286px` localized RTL stacking with no root/stage overflow. |
| Runtime and assets | pass | `0 B` component runtime; no observer, timer, asset, request, or hidden owner. |
| Cross-target translation | pass | Web/Shopify/framework/Figma/native-mobile ownership is documented. |
| Documentation and verification | pass | Dossier, ADR 0096, shared renderer, 11 after captures, browser probes, adapters, and this report. |

## Contract And Ownership

- Contract `0.3.0`: 6 anatomy parts, 4 variants, 1 size, 7 states,
  5 behaviors, 10 properties, and 31 public token references.
- Same-name radios own selection, Arrow/Space, input/change, required validity,
  FormData, and reset. Static checkedness is the uncontrolled default; framework
  targets control one group value.
- Whole-group disabled maps to the fieldset and per-option disabled maps to the
  radio. Required-invalid does not infer Error presentation.

## Browser And Visual Evidence

- `ArrowRight` moved focus/selection from `grid` to `list`, emitted `input:list`
  then `change:list`, and submitted `gallery-view=list`. Reset restored `grid`;
  a cleared required group was invalid; disabled propagation excluded the value.
- Three normal targets measure `44px`. A `286px` localized RTL fixture stacks
  vertically, preserves all `44px` targets, and has no root/stage overflow.
- Selected text is `17.93:1` light and `17.18:1` dark. Focus exposes distinct
  2px inner and 4px outer boundaries. Reduced-motion transitions are `0s`.
  Forced colors keeps selected text on `Canvas`/`CanvasText` and uses a 2px
  `Highlight` boundary; the Size Chart consumer audit corrected the former
  filled Highlight treatment after Chromium emulation visibly occluded its
  selected label.
- Exhibit and Studio markup is byte-identical at 626 characters. Eight canonical
  captures cover both views at Mobile/Tablet/Desktop/XL; dark-focus, disabled,
  and extreme-RTL captures supplement two desktop before baselines.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native fieldset/legend and named radios with canonical CSS. | Implemented and browser-evidenced. |
| Shopify | Same CSS and native radios with target-authored values/data. | Generated adapter validates; Liquid/schema/editor review remains. |
| React / Angular | One group value/default value and native events. | Strategy documented; adapter not yet certified. |
| Figma | Group/option content, validation, selected/disabled/focus, and tokens. | Metadata validates; no form ownership. |
| SwiftUI / Compose | Nearest native single-choice owner with target presentation. | Conceptual mapping only. |

## Performance And Risks

- Component runtime: `0 B`, pass. ADR 0096 records the shared Forms CSS delta;
  no asset or network request is introduced.
- Human review must approve the visible legend, target density, selected surface,
  focus hierarchy, validation mixes, and narrow stacking.
- No component-specific owner reference exists; the repository render still
  needs explicit acceptance or replacement evidence.

## Validation

Contracts, Studio, registry/docs, public token compatibility, Neutral Web,
Shopify, certification/parity/static-preview/refinement audits, native browser
interaction/form/RTL/special-media probes, four-viewport evidence, temporary docs
build, performance, syntax, diff, and `site/dist` checks are included in Batch 11.
