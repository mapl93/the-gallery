# Password Input Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

## Outcome

Password Input now has one native secret owner, same-node visibility control,
optional text-backed strength, complete disabled/readonly/form semantics, logical
RTL placement, and accepted field focus/validation behavior. Password policy,
scoring, breach checks, and live-announcement timing remain target-owned.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Secure single-line entry/reveal is explicit; policy, recovery, scoring, and validation services are excluded. |
| Anatomy and composition | pass | Root, sole native field, reveal action, and optional meter/bars/text are reconciled. |
| Variants, sizes, states | pass | Four validation families, hidden/visible, none/four strength levels, required, disabled, readonly, hover, and focus. |
| Public API and ownership | pass | Twelve semantic properties; the same native field owns secret, form, autofill, events, validity, and reset. |
| Tokens and visual system | pass | Forty-four existing public references; complete Password CSS surface and private geometry preserve ADR 0074. |
| Accessibility and motion | pass | Named non-submit action, pressed/controlled sync, described strength text, paste/autofill, dual focus, forced colors, reduced motion. |
| Responsive/content resilience | pass | Four viewports plus long localized RTL with logical action placement and zero sampled overflow. |
| Runtime and assets | pass | Reveal is target binding around one field; no mirror, scorer, observer, timer, asset, request, or network client. |
| Cross-target translation | pass | Web/Shopify/framework/Figma/native-mobile ownership is documented. |
| Documentation and verification | pass | Dossier, ADR 0097, shared renderer, 13 after captures, browser probes, adapters, and this report. |

## Contract And Ownership

- Contract `0.3.0`: 6 anatomy parts, 4 variants, 1 size, 12 states,
  4 behaviors, 12 properties, and 44 public token references.
- Reveal changes the same node between password/text and synchronizes its
  non-submit action. `strength=none` removes the presentation and description;
  visible text is required whenever strength is present.
- Static `value` is the uncontrolled default on Web. Framework targets may
  control that same field; none may create a second secret owner.

## Browser And Visual Evidence

- Reveal preserved DOM identity and `Gallery2026!`, changed `type` to text,
  synchronized `aria-pressed=true`, `aria-controls=password-demo`, accessible
  name, and EyeOff icon. Paste was not cancelled.
- Disabled made field/action unavailable. Readonly preserved the submittable
  focusable secret; strength None removed the meter and `aria-describedby`.
- Desktop dimensions are `356×46px` field, `40×40px` action, and `356×29px`
  strength region; mobile/coarse mode expands the action token to `44px`.
- Light value/boundary/strength-text contrast is `17.93:1`/`3.59:1`/`7.81:1`;
  dark is `17.18:1`/`17.62:1`/`12.09:1`. Reduced motion is `0s`; forced colors
  restores system boundaries and focus.
- Exhibit and Studio markup is byte-identical at 1,360 characters. Eight
  canonical captures cover both views at Mobile/Tablet/Desktop/XL; visible,
  error-focus, dark, extreme-RTL, and forced-colors images supplement two
  reconstructed desktop baselines clearly labeled as reconstructions.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | One native password input and same-node reveal with canonical CSS. | Implemented and browser-evidenced. |
| Shopify | Same CSS/native owner with Liquid-authored name, autocomplete, policy, and feedback. | Generated adapter validates; dedicated schema/editor review remains. |
| React / Angular | One controlled or uncontrolled field; synchronized reveal action. | Strategy documented; adapter not yet certified. |
| Figma | Visibility, validation, strength/content, focus/disabled, and tokens. | Metadata validates; no secret or policy ownership. |
| SwiftUI / Compose | Nearest native secure-entry owner and optional target strength presentation. | Conceptual mapping only. |

## Performance And Risks

- No component runtime, mirror, scoring algorithm, asset, observer, timer, or
  request is introduced. ADR 0097 records shared CSS totals.
- Human review must approve responsive action density, icon geometry, bars/text,
  validation colors, and focus treatment.
- No Password-specific owner visual reference exists. Password-manager and
  screen-reader combinations still require target/device testing.

## Validation

Contracts, Studio, registry/docs, public-token compatibility, Neutral Web,
Shopify, certification/parity/static-preview/refinement audits, native browser
identity/reveal/paste/form/RTL/contrast/special-media probes, four-viewport
evidence, temporary docs build, performance, syntax, diff, and `site/dist`
checks are included in Batch 12.
