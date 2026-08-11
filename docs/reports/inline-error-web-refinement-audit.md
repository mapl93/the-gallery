# Inline Error Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Inline Error is now a text-first field error with a required message node,
optional passive icon, and explicit None/Polite/Assertive announcement modes.
Static content defaults to no live region; targets own association and timing.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One field error; summaries, toasts, dialogs, validation, focus, and success/warning paths are excluded. |
| Anatomy and composition | pass | Root, required visible message, and optional accessibility-hidden icon. |
| Variants, sizes, states | pass | Error presentation with None/Polite/Assertive announcement states. |
| Public API and ownership | pass | Message, icon, and announcement only; invalid control owns state/association. |
| Tokens and visual system | pass | Six existing public references; wrapping/alignment remain private. |
| Accessibility and motion | pass | Text-first identification, conditional status/alert mapping, passive icon, and forced colors. |
| Responsive/content resilience | pass | Four viewports plus a three-line localized RTL message without overflow. |
| Runtime and assets | pass | `0 B`; no validation, focus, timer, observer, asset, or request. |
| Cross-target translation | pass | Timing/association and platform announcement mappings are documented. |
| Documentation and verification | pass | Dossier, ADR 0096, shared renderer, 11 after captures, browser probes, adapters, and this report. |

## Contract And Ownership

- Contract `0.3.0`: 3 anatomy parts, 1 variant, 1 size, 3 states,
  3 behaviors, 3 properties, and 6 public token references.
- Default `none` emits no live attributes. Polite maps to status/polite/atomic;
  Assertive maps to alert/assertive/atomic. The consuming target creates/updates
  the region according to validation timing.
- The invalid control owns `aria-invalid` and the message-id relationship;
  Inline Error does not mutate controls or generate messages.

## Browser And Visual Evidence

- Default has no role, `aria-live`, or `aria-atomic`. Polite resolves to
  `status/polite/true`; Assertive to `alert/assertive/true`; returning to None
  removes all three. The optional icon is accessibility-hidden.
- A `326px` Arabic message wraps to three lines with `overflow-wrap:anywhere`
  and no root/stage overflow. Error text is `7.26:1` on the light error surface
  and `10.03:1` dark; forced colors maps text/icon to system colors.
- Exhibit and Studio markup is byte-identical at 513 characters. Eight canonical
  captures cover Mobile/Tablet/Desktop/XL; dark, Polite, and extreme RTL
  supplement two desktop before baselines.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Associated message id plus timing-selected live semantics. | Implemented and browser-evidenced. |
| Shopify | Liquid-authored message/association in target validation flow. | Generated adapter validates; validation/editor review remains. |
| React / Angular | Adapter-generated ids and conditional live semantics. | Strategy documented; adapter not yet certified. |
| Figma | Visible message/icon/announcement state for review. | Metadata validates; no live behavior ownership. |
| SwiftUI / Compose | Platform error text and announcement APIs according to timing. | Conceptual mapping only. |

## Performance And Risks

- Component runtime: `0 B`, pass. ADR 0096 records shared CSS totals; no asset,
  timer, observer, or request is introduced.
- Human review must approve surface, text/icon contrast, padding, alignment, and
  long-message wrapping. Dynamic screen-reader testing remains target work.
- No component-specific owner reference exists; error-summary/focus and message
  generation remain outside v1.

## Validation

Contracts, Studio, registry/docs, public token compatibility, Neutral Web,
Shopify, certification/parity/static-preview/refinement audits, browser live-
attribute/RTL/contrast/special-media probes, four-viewport evidence, temporary
docs build, performance, syntax, diff, and `site/dist` checks are included in
Batch 11.
