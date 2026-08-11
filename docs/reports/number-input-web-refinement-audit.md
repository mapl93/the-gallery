# Number Input Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Number Input is now a generic native numeric field with one value/validity/form
owner, explicit native step actions, nullable direct editing, synchronized
boundaries/reset/readonly/disabled behavior, logical RTL layout, and no custom
numeric parser. It remains distinct from commerce Quantity Selector.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Real-number entry is explicit; digit strings, units, money, inventory, locale formatting, and persistence are excluded. |
| Anatomy and composition | pass | Root, decrement, sole native field, increment, and private browser spin parts are reconciled. |
| Variants, sizes, states | pass | Four validation families, hover/focus/bounds/empty/invalid/disabled/readonly and one accepted responsive density. |
| Public API and ownership | pass | Thirteen semantic properties; native field owns value, constraints, events, form data, reset, and keyboard editing. |
| Tokens and visual system | pass | Thirty existing public references; target geometry and logical separators remain private. |
| Accessibility and motion | pass | Native spinbutton semantics, named actions, control relationships, responsive targets, forced colors, and reduced motion. |
| Responsive/content resilience | pass | Four viewports plus signed extreme RTL content with no sampled overflow or sign reversal. |
| Runtime and assets | pass | Existing delegated enhancer is generalized; no hidden owner, parser, polling, timer, asset, or network request. |
| Cross-target translation | pass | Web/Shopify/framework/Figma/native-mobile ownership and Quantity distinction are documented. |
| Documentation and verification | pass | Dossier, ADR 0097, shared renderer, 13 after captures, native-form probes, adapters, and this report. |

## Contract And Ownership

- Contract `0.4.0`: 5 anatomy parts, 4 variants, 1 size, 11 states,
  6 behaviors, 13 properties, and 30 public token references.
- The native number input owns value/validity/form/reset/Arrow editing. Buttons
  invoke native stepping and only emit input/change after a real value change.
- Fixture `1/0/10` values are presentation data, not semantic defaults. Empty
  direct editing remains empty rather than becoming zero.

## Browser And Visual Evidence

- Increment changed `1→2` and emitted exactly `input:2`, then `change:2`. Empty
  typing remained `""` with `valueAsNumber=NaN` and the renderer stayed mounted.
- In a detached form, initial `2`, `min=1`, `max=5`, `step=2` stepped to `3`
  without mismatch, submitted `count=3`, reset to `2`, excluded disabled data,
  and kept readonly data while disabling both actions.
- Desktop root/action/field widths are `170px`/`40px`/`88px`; mobile/coarse
  actions expand to `44px`. A `300px` RTL fixture preserves `-123456`, logical
  action order, and equal client/scroll width.
- Light value/boundary/action contrast is `17.93:1`/`3.07:1`/`7.81:1`; dark is
  `17.18:1`/`5.19:1`/`12.09:1`. Warning feedback is `5.36:1`; reduced motion is
  `0s` and forced colors restores system boundaries/focus.
- Exhibit and Studio markup is byte-identical at 700 characters. Eight canonical
  captures cover both views at Mobile/Tablet/Desktop/XL; warning-focus,
  readonly, dark, extreme-RTL, and forced-colors images supplement two
  reconstructed desktop baselines clearly labeled as reconstructions.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native number input plus named native-stepping actions and canonical CSS/JS. | Implemented and browser-evidenced. |
| Shopify | Same CSS/runtime with Liquid-authored constraints/name and target validation. | Generated adapter validates; dedicated schema/editor review remains. |
| React / Angular | Nullable controlled/uncontrolled value around one native owner. | Strategy documented; adapter not yet certified. |
| Figma | Value/bounds/step labels, validation/focus/disabled/readonly, and tokens. | Metadata validates; no numeric or form ownership. |
| SwiftUI / Compose | Nearest native numeric owner and explicit target step actions. | Conceptual mapping only. |

## Performance And Risks

- Shared runtime adds `65 B` gzip in Batch 12, below the `1 KiB` reviewed-
  behavior ceiling. It reuses one delegated lifecycle and mutation observer;
  no second observer, parser, timer, asset, or request is introduced.
- Human review must approve density, numeric viewport, separators, radius,
  action icons, validation colors, and focus hierarchy.
- Locale parsing/formatting and assistive-technology/device combinations remain
  target concerns if later introduced. The semantic distinction from Quantity
  Selector remains accepted but may deserve later information-architecture review.

## Validation

Contracts, Studio, registry/docs, public-token compatibility, Neutral Web,
Shopify, certification/parity/static-preview/refinement audits, native browser
step/event/form/reset/validity/empty/RTL/contrast/special-media probes, four-
viewport evidence, temporary docs build, performance, syntax, diff, and
`site/dist` checks are included in Batch 12.
