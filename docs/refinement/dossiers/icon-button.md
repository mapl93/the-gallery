# Component Dossier: Icon Button

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/icon-button.contract.json`

## Recommendation

Retain Icon Button as an icon-only native action with required accessible name
and icon, Default/Filled presentation, three accepted sizes, independent Round,
and native disabled. Add reduced-motion handling, test every composable state and
target size, and stop masking empty required Studio values. Do not add toggle,
busy, tooltip, menu, or navigation semantics; those belong to other contracts or
the owning composition.

## Purpose And Limits

- Provides a compact action where a familiar symbol is unambiguous in context.
- The icon is visual/decorative; the accessible label names the action.
- Filled changes emphasis and Round changes shape independently.
- Icon Button does not own pressed state, selection, popup relationships,
  loading, destination, tooltip content, analytics, or result focus management.

## Current Gallery Baseline

- Registry identity: `A17`, primitive, no registered dependencies.
- Contract: `0.3.0`, `pilot`; two anatomy parts, two variants, three sizes, five
  states, three behavior rules, six properties, and 11 public tokens.
- ADR 0062 explicitly accepts `accessibleLabel`, required `icon`, `variant`,
  `size`, independent `round`, and native `disabled`.
- Canonical targets measure `32px`, `40px`, and `48px`; icons measure `16px`,
  `20px`, and `24px`.
- CSS has hover, focus-visible, disabled, Filled hover, and a reduced-motion
  fallback; no distinct active visual state has been accepted.
- Studio simulates pseudo states with presentation-only inline styles and renders
  the required accessible label verbatim, including an invalid empty value.
- Lucide is Studio-only; the target-agnostic contract exposes an icon slot.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Button](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Buttons need an accessible label and activate with Space/Enter; action result owns subsequent focus. | Preserve native `button`, required action name, and target-owned result focus. |
| [APG names and descriptions](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Interactive controls without persistent visible text still require a useful name; visible labels are preferable when ambiguity remains. | Icon Button is only appropriate when context/icon are clear and `accessibleLabel` supplies the name. |
| [HTML button element](https://html.spec.whatwg.org/multipage/form-elements.html#the-button-element) | `type="button"` avoids form submission; native disabled suppresses activation. | Keep direct native mappings rather than synthetic keyboard handlers. |
| [WCAG 2.2 target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | AA minimum is `24 x 24` CSS pixels subject to exceptions. | All three accepted sizes exceed the minimum; the size matrix still needs browser measurement. |
| [Shopify Polaris Button](https://shopify.dev/docs/api/app-home/web-components/actions/button) | Icon-only toolbar actions use an accessibility label and a fixed minimum touch target. | Gallery's compact named-button boundary aligns without importing Polaris icon names or runtime. |

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | native `button type="button"` | Icon Button | Owns name, native disabled, presentation, and activation. |
| Icon | yes | decorative SVG/image | Icon Button slot / consumer artwork | Hidden from AT when the root is named. |

Missing label or icon is invalid. A hidden tooltip may supplement context but
must not replace the root's accessible name.

## Variant, Size, State, And Mode Matrix

- Variants: Default, Filled.
- Sizes: Small `32`, Default `40`, Large `48`.
- Shape: default radius or independent Round.
- States: default, hover, focus-visible, disabled, Filled hover.
- Required tests: native active behavior, though a distinct active visual is not
  currently accepted; light/dark, forced colors, reduced motion, normal/coarse
  pointer, all size/shape/variant combinations.
- No controlled/uncontrolled value.

## Public API And Ownership

The six accepted properties remain coherent and cross-target. `icon` is a slot,
not a Lucide name. Toggle uses `aria-pressed`; Menu Button owns popup semantics;
Button owns visible-label and busy patterns. Icon Button should not absorb those
APIs by convenience.

## Token And Value Audit

- Colors: secondary/primary text, secondary surface, subtle border, focus.
- Radius: medium and full.
- Motion: fast/default easing.
- Disabled opacity.
- `32/40/48px` target and `16/20/24px` icon dimensions are private contract
  geometry, not public arbitrary-number controls.
- No component JS or owned assets/network requests.

## Accessibility, Content, And Performance

Test computed accessible name, decorative icon exclusion, form non-submission,
Space/Enter/click, disabled activation suppression, focus-visible in forced
colors, and `24px` target compliance. Empty/long/localized names affect the
accessibility tree, not visible geometry. Transition motion is decorative and
must resolve to `0s` under reduced motion.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native named button plus decorative icon slot/classes. | Reduced-motion and expanded evidence pending. |
| Shopify | Liquid/native button and copied CSS. | CSS implemented; target visual evidence pending. |
| React / Angular | Native button wrapper with consumer icon child. | Contract-ready; no certified adapter. |
| Figma | Variant, size, shape, icon instance, and state. | Component-specific reference absent. |
| SwiftUI / Compose | Native action button with accessibility label and image. | Conceptual mapping only. |

## Findings And Direction

| Finding | Severity | Direction | Owner |
| --- | --- | --- | --- |
| Color/background transitions continued under reduced motion. | resolved | Transition resolves to `0s` / `none` without changing state semantics. | implementation |
| Studio invented a label for empty required input. | resolved | Supplied value renders verbatim and empty remains visibly invalid. | implementation |
| Active has native behavior but no distinct visual state. | review input | Recommended: human-review existing behavior first; alternatively accept a separate active token/treatment across compact actions. | owner / aesthetic |
| Every size/shape/variant combination lacked expanded evidence. | resolved | Target/icon geometry, focus, contrast, disabled, dark, and special modes are recorded. | implementation |
| No component-specific visual reference exists. | review input | Approve repository render or supply reference. | owner |

## Readiness Decision

Ready for human review; remains `pilot`. Reduced motion, invalid configuration,
native activation/disabled, all target/icon sizes, contrast, forced colors,
Exhibit/Studio parity, four viewports, performance, and Web/Shopify validation
are recorded in `docs/reports/icon-button-web-refinement-audit.md`. Human visual
approval and the optional active-treatment decision remain pending.
