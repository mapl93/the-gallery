# Component Dossier: FAB / Back-to-Top

Status: `human-review-ready`

Target reviewed: Neutral Web and target-owned viewport composition

Contract: `components/contracts/fab.contract.json`

## Recommendation

Retain FAB as one high-emphasis, icon-only native page action whose visibility is
explicitly controlled by the target. Keep Hidden as the source default, the
`48px` circular target, required name/icon, native disabled, and existing reduced
motion. Expose empty required labels, verify hidden focus exclusion and all
states, and leave scroll thresholds, smooth/instant scrolling, safe-area/other
fixed-chrome collision, action result, and persistence to the consuming target.

## Purpose And Limits

- Surfaces one high-value page-level action when context or scroll position makes
  it useful; Back-to-Top is the canonical fixture, not the only action.
- `visible` maps target decision to presentation; the component does not observe
  scroll, choose a threshold, or perform scrolling.
- It is not a speed dial, multi-action menu, navigation landmark, sticky bar,
  tooltip owner, or substitute for the primary in-flow route to critical work.

## Current Gallery Baseline

- Registry identity: `A20`, primitive, no registered dependencies.
- Contract: `0.3.0`, `pilot`; two anatomy parts, one variant/size, five states,
  four behavior rules, four properties, and 13 public tokens.
- ADR 0062 accepts `accessibleLabel`, required `icon`, `visible`, native
  `disabled`, Hidden source default, target-owned visibility/action, and reduced
  motion.
- Canonical target is `48 x 48px` with a `24 x 24px` decorative icon.
- After the `200ms` exit transition, `visibility:hidden` prevents programmatic
  focus; visible Enter/Space activation is native and disabled suppresses it.
- Reduced motion already resolves transition duration to `0s`.
- Studio renders an empty supplied accessible label verbatim so invalid
  composition remains observable.
- Source placement is physical `bottom/right: 24px`; Studio deliberately uses a
  bounded site-owned absolute stage per ADR 0069.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Button pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/) | Native actions need a name and activate on Space/Enter; result focus depends on the action. | Keep native named action and target-owned result/focus behavior. |
| [WCAG 2.2 Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum) | AA target minimum is `24 x 24` CSS pixels subject to exceptions. | Existing `48px` target exceeds the minimum. |
| [Android/Material FAB guidance](https://developer.android.com/develop/ui/compose/components/fab) | FAB promotes one primary action and is typically anchored at the bottom-right; extended and multiple size variants exist. | Gallery intentionally keeps one circular size and no text/extended API. |
| [CSSOM View](https://www.w3.org/TR/cssom-view/) | `scrollTo` and smooth scrolling are target APIs. | Back-to-Top behavior is not embedded in the target-agnostic primitive. |
| [Media Queries 5](https://www.w3.org/TR/mediaqueries-5/#prefers-reduced-motion) | Reduced motion represents a request to minimize non-essential motion. | Existing visibility transform/opacity transition must remain disabled in reduce mode; target smooth scrolling must also honor it. |

Open UI and APG do not define an independent FAB widget beyond Button semantics.

## Anatomy, State, And API

| Part | Required | Semantic element | Owner |
| --- | --- | --- | --- |
| Root | yes | native `button type="button"` | FAB presentation/activation |
| Icon | yes | decorative SVG/image | Consumer slot; Studio-only Lucide fixture |

- Properties: `accessibleLabel`, `icon`, `visible`, `disabled` only.
- States: hidden, visible, hover, focus-visible, visible-disabled.
- No internal controlled/uncontrolled model: `visible` is a controlled input from
  target context; activation is a native event whose effect stays external.

## Token And Value Audit

- Public: primary/secondary surfaces, primary text, subtle border, focus,
  full radius, large shadow, base/fast motion, default/out easing, sticky z-index,
  and disabled opacity.
- `48px`, `24px`, `24px` edge offsets, and `8px` entry displacement are private
  geometry. Safe-area and collision offsets are target composition concerns.
- Component runtime: zero listeners, observers, timers, requests, or assets.
  Scroll listeners, when needed, belong to the target and should be passive/
  throttled or observer-based as appropriate.

## Responsive, Direction, And Placement Boundary

Test Mobile/Tablet/Desktop/XL, light/dark, forced colors, reduce/no-preference,
hidden/visible/disabled, LTR/RTL, zoom, and collision with bottom navigation or
cookie surfaces. Material examples use logical end; Gallery currently uses
physical right. Physical right, logical end, safe-area inset, and collision
avoidance are visible target-placement decisions and should be approved rather
than silently generalized in the base contract.

## Findings And Direction

| Finding | Severity | Direction | Owner |
| --- | --- | --- | --- |
| Studio masked an empty required accessible name. | resolved | Supplied empty value renders as `aria-label=""`. | implementation |
| Hidden focus exclusion needed timing evidence. | resolved | After exit completes, `visibility:hidden; opacity:0` and focus cannot move to the button. | implementation |
| Physical right vs logical end has no owner decision. | review input | Present repository placement and logical-end alternative in human review. | owner / aesthetic |
| Safe-area/fixed-chrome collision is target-specific. | target risk | Document adapter responsibility; do not add universal offsets. | target adapters |
| No FAB-specific owner visual reference exists. | review input | Approve repository render or supply reference. | owner |

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Native fixed button; target toggles visible class and performs action. | Label, native activation, hidden focus, motion, contrast, and four-viewport evidence complete. |
| Shopify | Liquid/native button plus target JS for scroll/context. | CSS implemented; behavior composition evidence pending. |
| React / Angular | Controlled `visible` plus native action callback and icon child. | Contract-ready; no certified adapter. |
| Figma | Hidden/visible/hover/focus/disabled with icon instance. | Component-specific reference absent. |
| SwiftUI / Compose | Scaffold/overlay FAB with target-owned visibility/action. | Conceptual mapping only. |

## Refinement Evidence

- Exhibit/Studio root markup is byte-identical (`412` tested bytes).
- Eight canonical screenshots cover four viewports in both docs modes.
- `48px` target / `24px` icon, two native keyboard activations, disabled
  suppression, empty-name visibility, hidden focus exclusion, reduced motion,
  dark hover, and forced-colors focus pass.
- Icon contrast is `17.93:1` light and `8.36:1` dark.
- Full report: `docs/reports/fab-web-refinement-audit.md`.

## Readiness Decision

Ready for human review; remains `pilot`. Visual approval and the physical-right
versus logical-end target-placement choice remain pending. No `stable` promotion
is authorized.
