# Fieldset Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Fieldset is now a native grouped-field composition with one visible first legend,
optional group description, one required canonical content slot, native disabled
propagation, resilient container flow, and no copied child-control behavior.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Related-control grouping only; decorative box, generic section, and validation engine are excluded. |
| Anatomy and composition | pass | Native root, first legend, optional description, and required canonical content slot. |
| Variants, sizes, states | pass | One semantic presentation with default/disabled plus content/description states. |
| Public API and ownership | pass | Five properties; descendants retain names, values, validity, events, and reset. |
| Tokens and visual system | pass | Ten existing public references; external margin removed and internal geometry remains private. |
| Accessibility and motion | pass | Native named group, first-legend exception, disabled propagation/form exclusion, and forced colors. |
| Responsive/content resilience | pass | Four viewports plus long localized RTL legend/description/options without overflow. |
| Runtime and assets | pass | `0 B`; no JavaScript, observer, asset, request, or copied Radio behavior. |
| Cross-target translation | pass | Native Web/Shopify and semantic native-mobile group mappings are documented. |
| Documentation and verification | pass | Dossier, ADR 0096, shared renderer, 10 after captures, browser probes, adapters, and this report. |

## Contract And Ownership

- Contract `0.3.0`: 4 anatomy parts, 1 variant, 1 size, 3 states,
  3 behaviors, 5 properties, and 10 public token references.
- Native fieldset/first legend owns group semantics; native disabled propagation
  disables and excludes descendants except content in the first legend.
- The required content slot composes canonical Radio in the fixture but stays
  generic, so Fieldset neither depends on nor copies Radio markup/behavior.

## Browser And Visual Evidence

- The fixture exposes one group named `Delivery preference`, three same-name
  canonical radios, and one visible description. Required content is locked in
  Studio.
- Choosing `pickup` emits `input:pickup` then `change:pickup`, submits that value,
  and reset restores `standard`. Disabled propagation matches `:disabled` on all
  descendant inputs, excludes the value, and preserves the first-legend exception.
- Long localized RTL legend/description/options at `326px` have zero root/stage
  overflow. Legend text is `17.93:1` light/`17.18:1` dark; description text is
  `7.81:1` light/`12.09:1` dark; forced colors preserves boundary and legend.
- Exhibit and Studio markup is byte-identical at 737 characters. Eight canonical
  captures cover Mobile/Tablet/Desktop/XL; dark disabled and extreme RTL
  supplement two desktop before baselines.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native fieldset/first legend with canonical child controls. | Implemented and browser-evidenced. |
| Shopify | Same native structure/classes in Liquid compositions. | Generated adapter validates; Liquid/schema/editor review remains. |
| React / Angular | Forward native disabled and compose child controls. | Strategy documented; adapter not yet certified. |
| Figma | Legend/content/description slots and disabled presentation. | Metadata validates; no descendant state owner. |
| SwiftUI / Compose | Native semantic group/section with owned child controls. | Conceptual mapping only. |

## Performance And Risks

- Component runtime: `0 B`, pass. ADR 0096 records shared CSS totals; no asset or
  request is introduced.
- Human review must approve border strength, padding, legend interruption,
  description spacing, disabled opacity, and narrow flow.
- No component-specific owner reference exists. Consumers must intentionally
  account for HTML's first-legend disabled exception.

## Validation

Contracts, Studio, registry/docs, public token compatibility, Neutral Web,
Shopify, certification/parity/static-preview/refinement audits, native browser
group/form/disabled/RTL/contrast/special-media probes, four-viewport evidence,
temporary docs build, performance, syntax, diff, and `site/dist` checks are
included in Batch 11.
