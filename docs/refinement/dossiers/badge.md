# Component Dossier: Badge

Status: `human-review-ready`

Target reviewed: Neutral Web

Contract: `components/contracts/badge.contract.json`

## Recommendation

Keep Badge as a passive, compact, text-first status or metadata label. A static
Badge is ordinary inline content and must not acquire a widget role. Only an
instance whose visible content is updated to report a result may opt into
`role="status"`; that opt-in remains explicit so ordinary pages do not become
unnecessarily chatty for screen-reader users.

Retain the accepted `label`, `variant`, and `announceChanges` properties. Keep
the four semantic variants (`info`, `success`, `warning`, and `error`) rather
than exposing arbitrary color, radius, weight, capitalization, icon, or size
controls. Allow exceptional long/localized labels to wrap instead of creating
page overflow or inaccessible truncation, while continuing to recommend one or
two scannable words.

## Purpose And Limits

- Communicates a concise state, classification, or completed outcome adjacent
  to the object it describes.
- Supports system-authored status vocabulary whose semantic color remains
  consistent in a product.
- Not an action, filter, selection control, counter overlay, notification,
  progress control, dismissible Tag, or substitute for explanatory copy.
- Does not own polling, state transitions, localization, status vocabulary,
  placement, announcements, or the object whose state is described.
- Color reinforces the visible label; it never carries the status alone.

## Gallery Baseline Before This Batch

- Registry `A7`, Primitives, no dependencies; contract `0.2.0`, `pilot`.
- Canonical CSS renders one uppercase full-radius pill with semantic feedback
  surfaces, mixed foreground colors, body-derived `0.75` type, fixed private
  padding, and `white-space: nowrap`.
- The root declares an unused gap and a private alias for an already public
  radius. Typography uses calculations and numeric line height instead of the
  accepted caption role.
- Long, localized, and unbroken labels can force horizontal overflow because
  wrapping and inline containment are absent.
- There is no explicit forced-colors mapping. Variant differences can collapse
  to the same system colors, although the visible status text remains present.
- The Studio renderer correctly omits a role for static content and maps
  `announceChanges` to `role="status"`; Exhibit and Studio already share that
  renderer and fixture.
- Studio's file/frame reference is the shared Gallery frame rather than a
  component-specific approved visual. It supports the restrained pill
  direction, not approval of casing, density, radius, or palette.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WCAG 2.2 status messages](https://www.w3.org/WAI/WCAG22/Understanding/status-messages) | A visible result/status that appears without moving focus must be programmatically exposed, but the criterion does not require authors to create new status messages and warns against overly chatty live regions. | Keep live announcement opt-in and do not put `role="status"` on every static Badge. |
| [WAI-ARIA 1.2 status role](https://www.w3.org/TR/wai-aria-1.2/#status) | `status` is a live-region role with implicit polite and atomic behavior and should not receive focus. | Map the explicit dynamic mode directly to `role="status"`; do not add focus or redundant live attributes. |
| [Open UI Badge research](https://open-ui.org/components/badge.research/) | Prior art spans labels, counts, dots, icons, colors, sizes, and dynamic/ribbon placement; it records vocabulary rather than a standardized interoperable element. | Keep Gallery's scope narrower: inline text status only. Counts, dots, overlays, and ribbons remain separate patterns. |
| [Radix Themes Badge](https://www.radix-ui.com/themes/docs/components/badge) | Uses a `span` and offers size, visual variant, color, contrast, and radius presentation APIs. | Native passive anatomy matches. Gallery deliberately exposes semantic status variants instead of a broad theme styling API. |
| [Shopify Polaris Badge](https://shopify.dev/docs/api/app-home/web-components/feedback-and-status-indicators/badge) | Treats badges as static system-generated status indicators, recommends concise labels and consistent tones, and separates user-created/removable labels into Chip. | Confirms passive status purpose and the Badge/Tag boundary. Gallery preserves full text by wrapping exceptional content rather than adopting inaccessible ellipsis. |

## Matches, Differences, And Direction

- Gallery already matches the passive `span`, concise label, semantic tone, and
  system-status direction used by mature systems.
- Unlike Radix, arbitrary color, radius, high contrast, and size are not useful
  cross-target semantics for Gallery and remain token/theme decisions.
- Unlike current Polaris, Gallery should not silently truncate a long label
  without a full-name affordance. Concise authoring remains guidance, while
  robust wrapping is the failure-safe behavior.
- Open UI shows broad market ambiguity around badge/count/tag naming but no
  platform primitive that requires Gallery to broaden its contract.
- Direction: semantic caption typography, bounded wrapping, explicit system-
  color fallback, zero interaction, and no public API expansion.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `span`; optional `status` role | Badge/target | Ordinary inline content by default. |
| Label | yes | text content | target | Must be non-empty, concise, localized, and sufficient without color. |

Icons, dots, counters, progress glyphs, remove controls, links, and nested slots
are outside the v1 Badge anatomy.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant | Info default, success, warning, error. |
| Size | One compact semantic size. |
| Interaction state | None; Badge never gains hover, focus, pressed, selected, or disabled behavior. |
| Announcement mode | Static ordinary text by default; explicit dynamic polite status mode. |
| Content | Short, two-word, localized, long, and unbroken labels; empty label is invalid. |
| Container | Intrinsic pill until constrained, then wraps without page overflow. |
| RTL | Inherits text direction; no directional anatomy. |
| Forced colors | Text and boundary remain perceptible even when semantic colors collapse. |
| Reduced motion | No animation or transition. |

## Public API And State Ownership

- `label` — required non-empty visible text.
- `variant` — semantic status family: `info`, `success`, `warning`, or `error`.
- `announceChanges` — default `false`; when true, the target maps the Badge root
  to `role="status"` before its label changes.
- The target owns content updates, announcement timing, status vocabulary,
  localization, and deduplication. Badge emits no event and has no controlled or
  uncontrolled internal state.

## Token And Value Audit

- Public surface and default feedback tokens already cover four semantic color
  families; text remains a private `color-mix` composition with primary text.
- Use accepted caption family/size/line-height tokens rather than multiplying
  the body size or storing a raw line height.
- `--radius-full` remains a public theme decision. Local padding, weight,
  capitalization, tracking, and the 1px forced-color boundary remain private
  visual composition pending human approval.
- Remove the unused gap and unnecessary radius alias. Do not expose private
  spacing or casing controls.

## Visual And Content Audit

- Preserve the quiet filled pill, compact density, centered label, uppercase
  treatment, and semantic color families as the human-review candidate.
- Verify all variants in light/dark themes and forced colors, including their
  text/background contrast.
- Long words and localized strings must stay inside their container. Wrapping is
  an exceptional resilience path, not encouragement to write sentence badges.
- Empty label, icon-only status, decorative use, and color-only meaning are
  invalid compositions.

## Accessibility And Interaction

- Static Badge has no widget role, accessible name override, focusability, or
  keyboard behavior.
- Dynamic Badge uses only `role="status"`; it does not receive focus or add an
  explicit `aria-live`/`aria-atomic` duplicate.
- Visible text communicates the status independent of hue. Forced-colors mode
  preserves a boundary and readable system text.
- Consumer tests should create the status container before changing its text so
  assistive technology can observe the update.

## Responsive And Performance

- Capture Exhibit/Studio at 390/768/1280/1600 plus all four variants, long and
  unbroken content, localization/RTL, dark, forced colors, and 200% zoom/narrow
  containment.
- Neutral component runtime budget is `0 B`: no listener, observer, timer,
  request, animation, or measurement ships in `components/js`.
- Batch 21 starts at Primitives `10,268 B`, Web component CSS `63,981 B`, and
  shared runtime `10,321 B` deterministic gzip. Primitives retains only `279 B`
  before its permanent `10.3 KiB` ceiling, so cleanup should fund refinement.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Passive `span`; optional pre-existing `role="status"`; semantic class. | CSS, semantics, contrast and resilience evidenced. |
| Shopify | Passive Liquid text element with semantic class; dynamic regions only when target behavior updates it. | Canonical copied CSS validated; status vocabulary remains theme data. |
| React / Angular | Stateless label + semantic variant; optional status role. | Planned; no framework runtime required. |
| Figma | One compact component with four semantic variants and long-label evidence. | Studio metadata exists; human visual approval pending. |
| SwiftUI / Compose | Native text capsule/status treatment; accessibility live-region mapping remains adapter-specific. | Conceptual. |

## Exhibit And Studio Parity

`LabelPrimitiveStudio` and one fixture serve both modes with the same canonical
label, variant and announcement mapping. No Exhibit-only component markup or
neutral behavior was added.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Long labels can create page overflow. | high | Add intrinsic containment and exceptional wrapping. | implementation |
| Static/live semantics are accepted but not fully tested. | high | Prove default absence and explicit `status` role/update behavior. | implementation |
| Typography bypasses accepted semantic roles. | medium | Map to caption size and line height. | implementation |
| Forced-colors boundary is unspecified. | medium | Add a system-color text/boundary fallback. | implementation |
| Casing, density, radius, and tone values need visual approval. | human review | Preserve as candidate; do not promote. | owner |

## Risks And Open Questions

1. Uppercase, tracking, compact padding, full radius, and mixed foreground
   strength require human visual approval.
2. The product vocabulary and which application transitions deserve a live
   announcement remain consumer decisions.
3. Icons, progress, numeric counts, arbitrary colors, and larger sizes should
   become separate proposals only if a concrete cross-target need appears.

## Implementation And Verification

- Contract `0.3.0`, registry, MDX, Studio `0.2.0`, canonical Primitives CSS and
  one shared renderer/fixture now describe the same passive/live boundary.
- Caption typography, bounded wrapping and Canvas/CanvasText forced-color
  treatment replace derived type, nowrap overflow and unspecified system color.
- Default role/tabindex are absent; explicit announcement mode resolves to
  `role="status"`. All four light-theme variants pass small-text contrast at
  `4.80:1` or better. Batch 44's Artist Card dependency audit found that the
  former 55% semantic-text mix did not preserve AA contrast in dark mode; the
  canonical mix now uses 10% semantic feedback color with primary text and all
  four dark variants resolve to `4.58:1` or better.
- A 46-character unbroken label at 320px wraps to `256×36px` with equal client/
  scroll width and zero page overflow. Arabic RTL, dark and forced colors remain
  bounded and readable.
- Eight canonical after images cover Exhibit/Studio × 390/768/1280/1600; four
  special-mode images and two before images provide comparison evidence.
- Neutral runtime delta is `0 B`. Final deterministic gzip is Primitives
  `10,356 B`, Web component CSS `64,070 B`, and shared runtime `10,321 B`.

## Readiness Decision

Implementation, documentation, evidence, automated validation, and target
translation are complete for explicit human review. Visual approval remains
pending. The contract stays `pilot`.
