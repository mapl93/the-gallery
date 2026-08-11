# Color Picker / Swatch Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Color Picker is now a native fieldset-and-radio Swatch Group with a visible group
question, visible option names, stable submitted values, required-group validity,
minimum 44px activation targets, and a selected boundary independent from authored
fill color. It is explicitly not a free-form color editor.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Chooses one authored visual option; free-form color authoring, product availability, and recomputation remain outside the primitive. |
| Anatomy and composition | pass | Native `fieldset`, visible `legend`, option container, wrapping labels, native radios, fill, optional passive check, and required visible option names. |
| Variants, sizes, states | pass | Default/Error/Success/Warning, `24/32/40px` fills, default/hover/selected/focus/disabled/required-invalid states. |
| Public API and ownership | pass | Ten semantic properties cover group/option labels, name/value, size, validation, checked default, required, disabled, and description. |
| Tokens and visual system | pass | Twenty-five existing public references; target, ring, geometry, wrapping, and contrast formulas remain private. |
| Accessibility and motion | pass | Native radio group, visible names, non-color selection, 44px targets, focus, required validity, reduced motion, and forced colors pass. |
| Responsive/content resilience | pass | Four viewports plus `326px` RTL/localized/unbroken stress fixture produce zero root/page overflow. |
| Runtime and assets | pass | `0 B` component runtime; no enhancer, observer, asset, request, or hidden owner. |
| Cross-target translation | pass | Web/Shopify native radio mapping plus framework/Figma/native-mobile ownership are documented. |
| Documentation and verification | pass | Dossier, ADR 0095, exact shared renderer/fixture, 8 canonical captures, browser probes, generated adapters, and this report. |

## Contract And Ownership

- Contract `0.3.0`: 8 anatomy parts, 4 variants, 3 sizes, 7 states,
  4 behaviors, 10 properties, and 25 public token references.
- Static `checked` establishes the uncontrolled default. Same-name radios own the
  live group value, one Tab stop, Arrow/Space, native events, required validity,
  FormData, and reset.
- Framework adapters control one group value rather than independent checked
  booleans. No mirrored hidden input or JavaScript state owner exists.
- Fill color/image is authored data. The double selected boundary and visible name
  preserve meaning independently from fill; the check is optional and passive.

## Browser And Visual Evidence

- Native `ArrowRight` moved focus/selection from `celadon` to `ash`, emitted
  `input:ash` then `change:ash`, and submitted `ash`. Native reset restored
  `celadon`; clearing a required group produced `valueMissing` on the named group.
- All visible options measure at least `44px` wide and `68px` tall with labels;
  the `24/32/40px` fill sizes remain visual presentation only.
- Light text is `7.81:1`; passive boundary `3.09:1`; selected boundary
  `17.93:1`. Dark text is `12.09:1`; passive boundary `5.22:1`; selected boundary
  `17.93:1`.
- Reduced-motion fill/check transitions resolve to `0s`. Forced colors restores
  system boundaries and Highlight selected/focus treatment even when UA policy
  suppresses authored box shadows.
- At `390px`, an RTL Spanish legend, localized labels, and a long unbroken color
  name keep root/options/document overflow at `0px`.
- Exhibit and Studio stage markup is byte-identical at 2,277 characters. Eight
  canonical after screenshots cover both views at `390x844`, `768x1024`,
  `1440x1000`, and `1920x1200`; keyboard-selected, dark, and extreme RTL images
  supplement six Batch 10 before captures.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Fieldset/legend, named native radios, wrapping labels, canonical CSS. | Implemented and browser-evidenced. |
| Shopify | Product-option radios and color/image swatch data using copied CSS classes. | Generated adapter validates; dedicated Liquid/data/editor review remains target work. |
| React / Angular | One group `value`/`defaultValue` and native events; option fills remain children/data. | Strategy documented; adapter not yet certified. |
| Figma | Group label, option labels/fills, size, validation, selected, disabled, and focus. | Metadata validates; shared owner frame is not visual approval. |
| SwiftUI / Compose | Native single-choice owner with target-provided swatch visual. | Conceptual mapping only. |

## Performance

- Component runtime: `0 B`, pass.
- Batch CSS/runtime totals are recorded in ADR 0095 and the Batch 10 report.
- No component asset or network request is introduced.

## Remaining Human Risks

1. Approve `24/32/40px` fills inside 44px targets, option gap, label hierarchy,
   selected double ring/check, validation mixes, and focus hierarchy.
2. Accept the repository render as component-specific visual evidence or provide
   a Color Picker reference; the registered Studio frame is shared calibration.
3. Image swatch cropping and unavailable/sold-out presentation remain future
   commerce/product decisions.

## Validation

Contracts, Studio, registry/docs, public token compatibility, Neutral Web,
Shopify, structural certification, parity, static previews, real-browser native
form/keyboard/RTL/special-media checks, four-viewport evidence, temporary docs
build, performance, syntax, and diff checks are included in Batch 10.
