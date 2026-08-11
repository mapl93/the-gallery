# FAB / Back-to-Top Neutral Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-13

Contract: `components/contracts/fab.contract.json` (`0.3.0`)

## Result

FAB remains a single named, icon-only native page action with target-controlled
visibility. Hidden stays the source default; Visible, hover, focus, and native
disabled are presentational states. The component still owns no scroll threshold,
observer, scrolling effect, persistence, collision policy, or focus result.
Studio now exposes an empty required accessible name instead of substituting
`Page action`; the existing motion and hidden-focus behavior are verified.

## Geometry, Activation, And Visibility

- Canonical target: `48 x 48px`; decorative icon: `24 x 24px`.
- The target doubles WCAG 2.2's `24px` minimum in each dimension.
- Enter and Space produced two native click events. Native disabled suppressed
  further activation and retained the count at two.
- Clearing `accessibleLabel` rendered `aria-label=""`, exposing invalid input.
- After removing `.fab--visible` and waiting beyond the `200ms` exit, computed
  state was `visibility:hidden; opacity:0`; programmatic focus did not move to
  the hidden button.
- Under reduced motion, transition property is `none` and duration is `0s`.
- Forced colors plus keyboard focus retains a `2px solid` outline with `2px`
  offset through the shared compact-action treatment.

`visible` is a controlled target input, not an internal controlled/uncontrolled
model. The target decides when relevance changes and owns the action effect and
resulting focus.

## Placement Boundary

Canonical CSS uses fixed `bottom:24px; right:24px`; the docs renderer deliberately
uses a site-owned bounded absolute stage so both Exhibit and Studio can show the
same fixture without escaping the documentation canvas. This separation is
accepted by ADR 0069.

Physical right versus logical end, safe-area insets, bottom-navigation/cookie
surface collision, and action-specific scroll behavior remain target-visible
decisions. They were documented rather than silently generalized into the base
API. A target can wrap or override placement while preserving the same named
native action and state classes.

## Contrast And Visual States

Measured icon contrast against the effective FAB surface:

| Theme | Rest icon |
| --- | ---: |
| Light | `17.93:1` |
| Dark | `8.36:1` |

The subtle border is intentionally low-emphasis (`1.26:1` light, `1.19:1` dark)
while the circular surface, shadow, position, and high-contrast icon define the
control. No aesthetic border change was inferred. Disabled remains an unavailable
native state using the public opacity token.

## Exhibit And Studio Parity

Both modes render byte-identical root markup (`412` bytes in the tested fixture),
including the same Arrow Up fixture, name, visible class, and native attributes.
Eight canonical screenshots cover Mobile, Tablet, Desktop, and XL in Exhibit and
Studio. Dark hover, forced-colors/reduced-motion focus, and hidden timing evidence
supplement the matrix under `output/playwright/refinement-batch-04/`.

## Tokens, Runtime, And Targets

- Public tokens remain primary/secondary surfaces, primary text, subtle border,
  focus, full radius, large shadow, base/fast motion, default/out easing, sticky
  layer, and disabled opacity.
- `48px` target, `24px` icon/edge offsets, and `8px` entry displacement remain
  private composition.
- Component JS, requests, observers, timers, assets, and background work: zero.
  Target scroll detection must remain passive/throttled or observer-based and
  perform no work while the action is irrelevant.
- Shopify and Web use the same native button/CSS; target behavior supplies
  scroll or context. Framework adapters map controlled visibility plus action
  callback; Figma and native-app adapters map the reviewed states, not DOM.

## Human Review Input

Approve the repository render or provide a FAB-specific reference for target/icon
ratio, border, shadow, hover surface, entry motion, and stage placement. Choose
physical right (current) or logical end for bidirectional targets, and define
target-specific safe-area/fixed-chrome collision only where those surfaces exist.
Recommended: retain one circular size for v1; Extended FAB or speed-dial behavior
requires a separately specified component.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify:components`
- `npm run audit:components`
- `npm run audit:refinement`
- `git diff --check`

`site/dist` was not rebuilt.
