# Component Dossier: Password Input

Status: `human-review-ready`

Target under review: Neutral Web password entry with optional visibility and
strength feedback

Contract: `components/contracts/password-input.contract.json`

## Recommendation

Keep one native `input[type="password"]` as the sole value, validity, form,
autofill, and reset owner. A named `type="button"` may reveal the same input by
changing only its `type`, pressed state, icon, and accessible name. Keep strength
feedback optional and text-backed, intended for new-password creation rather
than current-password entry. Per ADR 0074, Password Input retains its own CSS
surface aligned to Input's public semantic tokens; it must not depend on Input's
private custom properties.

## Purpose And Limits

- Captures a current password, new password, API secret, or similar sensitive
  single-line value while obscuring characters by default.
- Supports verification through an optional reveal action without copying the
  value to a second field or hidden mirror.
- May present authored strength guidance for new passwords, but does not own
  password policy, entropy scoring, breach lookup, account recovery, or
  server-side validation.
- A composing Field Wrapper owns the visible label, description, and validation
  feedback. Password Input owns the field surface, visibility action, and
  optional strength presentation.
- Paste, password managers, and browser autofill must remain available.

## Pre-Refinement Gallery Baseline

- Registry `H13`; contract `0.2.0`, `pilot`: six anatomy parts, four validation
  variants, one size, nine states, three behaviors, and nine properties.
- The native field owns the value, but the public contract omits `name` and
  `readOnly`. The visibility button is only `32px`, has no `aria-controls`, and
  uses physical positioning that does not adapt to RTL.
- The strength fixture combines `autocomplete="current-password"` with a
  permanently visible strength meter. Its live region contains only bars while
  the visible text sits outside the associated region.
- Field hover/focus/disabled styles duplicate the accepted Input semantics, but
  lack the contrast mixes, special-media handling, and logical properties now
  used by certified value-entry fields.
- Exhibit and Studio render equivalent ideas through separate markup. The
  Exhibit toggle is static and neither surface demonstrates native submission,
  reset, readonly, empty content, or localized extremes.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [HTML password state](https://html.spec.whatwg.org/multipage/input.html#password-state-(type=password)) | The password state is a single-line text control whose user agent obscures its value and retains native attributes, events, and form behavior. | Keep one native input as the only secret owner. |
| [WCAG Accessible Authentication](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum) | Password managers, autofill, and paste reduce cognitive burden; reveal-password support can help verification. | Never block paste/autofill and make reveal additive. |
| [GOV.UK Password input](https://design-system.service.gov.uk/components/password-input/) | Hide by default; use a non-submit show/hide button with a unique relationship, preserve password-manager behavior, and distinguish current/new autocomplete purposes. | Require `type="button"`, `aria-controls`, synchronized naming, and purposeful autocomplete. |
| [Shopify Password field](https://shopify.dev/docs/api/app-home/web-components/forms/password-field) | Polaris' current target API exposes native value/default value, name, autocomplete, required, disabled, events, label/help/error; show/hide and strength remain explicit additions. | Retain stable field semantics while keeping reveal and strength independent. |
| [Radix primitives catalogue](https://www.radix-ui.com/primitives/docs/overview/introduction) | Radix does not publish a password-specific primitive; native text-entry composition remains consumer-owned. | Do not shape the base API around a React-only abstraction. |
| Open UI catalogue | No mature password-field proposal establishes a cross-browser custom-element contract. | Prefer HTML semantics and document the standards gap. |

## Recommended Anatomy, States, And API

- Required: root, native field, and visibility button. The root reserves action
  space without making the button a value owner.
- Optional: strength wrapper, four decorative bars, and required text whenever
  strength is shown. Bars are never the only communication.
- Independent axes: validation (`default`, `error`, `success`, `warning`),
  visibility (`hidden`, `visible`), strength (`none`, `weak`, `fair`, `good`,
  `strong`), disabled, readonly, required, hover, and focus.
- Preserve `variant`, initial/static `value`, `placeholder`, `visible`,
  `disabled`, `required`, `autocomplete`, and `describedBy`; add stable native
  `name` and `readOnly`, plus explicit strength text rather than deriving a
  consumer-facing phrase from the enum.
- `strength="none"` is the component default. Documentation may use
  `autocomplete="new-password"` with authored strength as a fixture.
- Static HTML uses `value` only as the initial value; native Web owns later
  edits. Framework adapters may expose controlled `value` and uncontrolled
  `defaultValue` while continuing to bind the same native input.

## Behavior And Accessibility Direction

- The reveal action changes the existing input between `password` and `text`;
  it never replaces the node, mirrors the secret, submits the form, or blocks
  paste. The button's `aria-pressed`, name, icon, and `aria-controls` remain in
  sync.
- Disabled makes field and action unavailable and omits the value from form
  data. Readonly keeps the value focusable and submittable while making the
  reveal action unavailable only if the adapter cannot safely expose it.
- Strength text is associated through `aria-describedby`. It is not a live
  region by default; dynamic announcement timing and scoring remain target
  policy, avoiding a chatty announcement on every keystroke.
- Submission/reset must leave the secret owned by the native field and return
  the reveal state to obscured where the target lifecycle supports it.
- Use logical action placement, the semantic button minimum-height token (`40px`
  at the reviewed fine-pointer desktop mode and `44px` at the reviewed mobile/
  coarse mode), accepted field focus hierarchy, reduced motion, forced-colors
  boundaries, and resilient wrapping for localized strength text.

## Alternatives And Non-Decisions

1. Composing `.input` classes would reuse more CSS, but ADR 0074 explicitly
   assigns Password Input a complete field surface so it does not depend on
   Input's private variables.
2. Replacing the password input with a text input on reveal risks losing
   selection, autofill, form ownership, and assistive-technology continuity.
3. A built-in entropy algorithm would turn one target's policy into canonical
   product behavior; scoring and password rules stay target-owned.
4. Always-live strength feedback can become noisy. Announcement lifecycle is
   deliberately not inferred from visual presence.
5. Minimum/maximum length and policy checklists remain open to later product
   review; they are not introduced solely because mature systems expose them.

## Implemented Result

- Contract `0.3.0` now defines 6 anatomy parts, 4 validation variants, 1 size,
  12 states, 4 behaviors, 12 semantic properties, and 44 existing public token
  references. `name`, `readOnly`, optional strength text, and same-node reveal
  ownership are explicit; the status remains `pilot`.
- Canonical CSS now owns logical action placement, disabled-safe hover, accepted
  validation/focus families, forced-colors and reduced-motion behavior, and a
  full-width text-backed strength presentation. No new public token was added.
- Exhibit and Studio call the same renderer and fixture. The example is a named
  `new-password` field with optional Good strength; setting strength to None
  removes both the meter and its description reference.
- Reveal uses the same native node, preserves the secret and selection owner,
  synchronizes icon/name/pressed/controlled state, and never prevents paste.

## Certification Evidence

- Browser probes preserve the same input node and value while changing
  `password` to `text`; `aria-pressed`, `aria-controls`, icon, and accessible
  name synchronize. Paste is not cancelled. Disabled disables both controls;
  readonly keeps the native value focusable/submittable and allows deliberate
  visual verification.
- Exhibit and Studio canonical markup is byte-identical at 1,360 characters.
  Eight canonical captures cover both surfaces at Mobile/Tablet/Desktop/XL;
  visible, error-focus, dark, extreme RTL, and forced-colors captures extend the
  evidence. The reconstructed desktop baseline is labeled as such.
- At desktop, the field is `356×46px`, the action is `40×40px`, and the strength
  region is `356×29px`; the mobile/coarse token expands the action minimum to
  `44px`. The `300px` RTL fixture has equal client and scroll width.
- Sampled light contrast is `17.93:1` for the value, `3.59:1` for the field
  boundary, and `7.81:1` for strength text. Dark equivalents are `17.18:1`,
  `17.62:1`, and `12.09:1`. Bars are supplemental, never the only message.
- Reduced-motion transition duration is `0s`; forced colors exposes system
  boundary/focus colors. No secret mirror, observer, timer, asset, request, or
  component scoring runtime was introduced.

## Current Risks And Human Questions

1. Human review must approve the responsive `40px`/`44px` reveal target, icon
   geometry, action padding, strength bars/text, focus treatment, and semantic
   colors.
2. The registered Figma reference is shared generic Studio evidence; no
   Password-specific owner screenshot is available for visual comparison.
3. Target screen-reader/password-manager combinations still require manual
   certification after structural browser probes.
4. Password policy, strength algorithm, live-announcement timing, and account
   security remain target responsibilities rather than v1 base API.

## Readiness Decision

Ready for explicit human review with the contract still `pilot`. Readiness does
not imply visual approval or promotion to `stable`.
