# Component Dossier: Close Button

Status: `human-review-ready`

Target reviewed: Neutral Web and containing-surface composition

Contract: `components/contracts/close-button.contract.json`

## Recommendation

Retain the accepted contextual dismiss action: native `button type="button"`,
required accessible label and decorative icon, native disabled, and no surface
state ownership. Add reduced-motion handling, use atomic inline-flex layout, and
stop masking empty required Studio values. Keep Escape, exit animation, removal,
and focus restoration in the containing overlay or dismissible surface.

## Purpose And Limits

- Requests dismissal of a dialog, drawer, toast, alert, or owned surface.
- Its accessible name identifies the action and, when useful, the surface.
- It is not Delete, Back, Cancel workflow logic, or a generic Icon Button variant.
- It does not own open state, Escape, animation completion, DOM removal, return
  focus, announcement, or persistence.

## Current Gallery Baseline

- Registry identity: `A18`, primitive, no registered dependencies.
- Contract: `0.3.0`, `pilot`; two anatomy parts, one variant, one size, four
  states, three behavior rules, three properties, and nine public tokens.
- ADR 0062 accepts `accessibleLabel`, required `icon`, and native `disabled`, and
  explicitly assigns Escape/removal/focus restoration to the parent surface.
- Canonical target is `32 x 32px` with a `20 x 20px` icon and meets WCAG 2.2's
  `24 x 24px` minimum.
- CSS has hover, focus-visible, disabled, reduced-motion fallback, and atomic
  inline-flex layout; no distinct active treatment has been accepted.
- Studio renders the required accessible label verbatim, including an invalid
  empty value.
- Modern HTML defines `command="close"` and `command="request-close"`, but those
  are optional web-target wiring rather than an accepted cross-target property.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Closing a dialog typically returns focus to its opener unless the resulting context requires another target. | Containing surface owns focus restoration; Close Button only activates. |
| [HTML button element](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) | Native `type="button"`, disabled activation suppression, and optional dialog close/request-close commands are defined. | Preserve native button and allow target wiring without making Web command attributes universal API. |
| [APG names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Every focusable interactive control needs a useful accessible name. | Contextual `Close dialog` or `Dismiss alert` is required; the X icon alone is insufficient. |
| [WCAG 2.2 target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | AA requires a target capable of containing `24 x 24px`. | The existing `32px` target passes; surrounding compositions must not clip it. |
| [Shopify Polaris Button](https://shopify.dev/docs/api/app-home/web-components/actions/button) | Icon-only actions require an accessibility label; command wiring belongs to the target component. | Gallery remains target-agnostic and does not import Shopify command or icon names. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | native `button type="button"` | Close Button | Emits native activation/dismiss request. |
| Icon | yes | decorative SVG/image | Close Button slot | Hidden from AT; visual meaning must remain dismissal. |
| Owned surface | external | dialog/drawer/toast/etc. | parent component | Owns state, Escape, motion, removal, and focus. |

## Variant, State, And Mode Matrix

- One classless variant and one `32px` size.
- States: default, hover, focus-visible, disabled.
- Native activation: click, Space, Enter.
- Modes: light/dark, forced colors, reduced motion, fine/coarse pointer, LTR/RTL,
  inside/outside a form, available/disabled, short/contextual/localized names.
- No controlled/uncontrolled state on the button itself.

## Public API And Ownership

The accepted three properties remain complete. `icon` stays a target-agnostic
slot even though Studio uses curated Lucide artwork. Web consumers may use
`commandfor`/`command` directly where supported; exposing those as cross-target
properties would require a new architecture decision and fallback contract.

## Token And Value Audit

- Colors: secondary/primary text, secondary hover surface, focus.
- Radius: small.
- Motion: fast/default easing.
- Disabled opacity.
- `32px` target and `20px` icon are private geometry.
- Component runtime, asset, observer, timer, and request cost should remain zero.

## Accessibility And Interaction

Test name, decorative icon exclusion, native Space/Enter/click, disabled
suppression, form non-submission, focus-visible, forced colors, and containing
surface focus ownership. Escape must not be bound on the button. Reduced motion
removes decorative hover transitions without changing dismissal.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native named button; consumer handler or optional native command wiring. | Reduced-motion and expanded evidence pending. |
| Shopify | Liquid/native button plus section/snippet-owned dismiss behavior. | CSS/JS class contract implemented; surface evidence pending. |
| React / Angular | Native button emitting target-owned callback/event. | Contract-ready; no certified adapter. |
| Figma | One visual state family plus contextual name annotation. | Component-specific reference absent. |
| SwiftUI / Compose | Native dismiss button/action with accessibility label. | Conceptual mapping only. |

## Findings And Direction

| Finding | Severity | Direction | Owner |
| --- | --- | --- | --- |
| Color/background transitions continued under reduced motion. | resolved | Transition resolves to `0s` / `none` without changing dismissal. | implementation |
| Studio invented `Close` for an empty required label. | resolved | Supplied value renders verbatim and empty remains visibly invalid. | implementation |
| Block-level `display:flex` broke surrounding inline composition. | resolved | `inline-flex` keeps before/control/after on one line in the reproduced fixture. | implementation |
| Active has native behavior but no distinct visual treatment. | review input | Review existing family behavior or accept a compact-action active treatment across components. | owner / aesthetic |
| No component-specific visual reference exists. | review input | Approve repository render or supply reference. | owner |

## Readiness Decision

Ready for human review; remains `pilot`. Reduced motion, invalid configuration,
inline composition, native activation/disabled, contrast, forced colors,
Exhibit/Studio parity, four viewports, performance, and Web/Shopify validation
are recorded in `docs/reports/close-button-web-refinement-audit.md`. Human visual
approval and the optional active-treatment decision remain pending.
