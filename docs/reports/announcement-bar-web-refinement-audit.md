# Announcement Bar Web Refinement Audit

Status: `human-review-ready`

Component: C2 Announcement Bar (`announcement-bar`, review order `31`)

Date: 2026-07-20

## Outcome

The owner-selected merged Announcement architecture is implemented in canonical
source. C2 now owns exclusive Static, Countdown and Rotating modes plus
orthogonal controlled dismissal. G11 is deprecated and forwards to the same
renderer, fixture, CSS and runtime. The former fixed-height blank-frame loop and
duplicated dismissal styling were removed.

Neutral Web behavior and final browser evidence pass. Shopify remains truthful
as a Static profile; its first dynamic merchant surface is intentionally open.
The contract stays `pilot` because human visual review is still pending.

## Certification Rubric

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Compact non-critical announcement; campaign, placement, persistence, analytics and commercial effects remain target-owned. |
| Anatomy/composition | pass | Canonical Link, Countdown, Carousel, Icon Button and Close Button are composed without duplicate markup/behavior. |
| Modes/states | pass | Exclusive Static/Countdown/Rotating, controlled visibility/dismissal, Off/Playing/Paused and reduced-motion projection. |
| Public API | pass | Sixteen semantic inputs plus three neutral output events; internal geometry and campaign records remain private. |
| Controlled ownership | pass | Target reconciles visibility and persistence; neutral runtime owns rotation only; Countdown owns its deadline. |
| Tokens/CSS | pass with documented program gaps | Existing semantic tokens, private composition variables, intrinsic logical layout and container response; no new token layer. |
| Accessibility | pass | Passive static content, intentional named rotating region, named slide groups/actions, visible counter, quiet/polite status and explicit pause. |
| Keyboard/motion | pass | Native Link/Button/track behavior, durable focus/manual pause, temporary hover/hidden pause, explicit Play, reduced-motion autoplay suppression. |
| Runtime/cleanup | pass | Shared Carousel service, bounded per-root timeout, shared visibility/reduced-motion listeners and disconnected-root cleanup. |
| Exhibit/Studio parity | pass | One `GlobalStudio`, `AnnouncementArtwork` and fixture; equal normalized DOM. |
| Responsive/content evidence | pass | Eight-view matrix, modes, lifecycle, themes, forced colors, component RTL/reduced motion and mobile 200% reflow. |
| Target translation | pass as documented | Neutral Web implemented, Shopify Static implemented, dynamic/future targets planned truthfully. |
| Human review | pending | No stable promotion. |

## Source Reconciliation

- `components/contracts/announcement-bar.contract.json` -> `0.4.0`, sixteen
  semantic properties, three events and implemented Web behavior.
- `components/contracts/announcement-extended.contract.json` -> deprecated
  migration record forwarding to C2.
- `registry.json` -> C2 canonical dependencies/modes and G11 deprecation.
- `components/css/global.css` -> intrinsic modes, controls, counter, dismissal
  and narrow-container layout.
- `components/css/marketing.css` -> old G11 height/transforms/keyframes/dismiss
  treatment removed.
- `components/js/theme.js` -> shared Hero/Announcement Carousel rotation service.
- `site/src/components/studio/AnnouncementArtwork.tsx` and `GlobalStudio.tsx` ->
  one renderer/fixture and controlled Studio lifecycle.
- both Studio metadata files and MDX pages -> full semantic API plus migration.
- ADR 0227 -> accepted identity, modes, state ownership and target boundaries.

## Certified Runtime Assertions

1. Autoplay is off by default and exposes Pause/Play whenever enabled.
2. A 6000 ms autoplay fixture advanced through real slides and emitted
   `announcementchange` with `manual=false`.
3. Pointer hover paused temporarily and leaving resumed; hidden/reduced-motion
   conditions suppress playback.
4. Next, direct/manual navigation and focus create `userPaused=true`; leaving or
   blurring does not restart. Only explicit Play clears that durable choice.
5. `aria-live` is `off` while playing and `polite` while user-controlled.
6. Reduced motion reports playback Off while retaining manual controls.
7. Dismiss emits exactly one `announcementdismissrequest`; the target removes
   the root and restores focus to its own launcher.
8. Dismissal changed no resource count, local/session storage or cookies.
9. Removing roots clears their timeout, animation frame and scroll-release work.

## Browser Evidence

Artifacts: `output/playwright/refinement-global/announcement-bar-0227/`.

- Final matrix: `exhibit-{mobile,tablet,desktop,xl}.png` and
  `studio-{mobile,tablet,desktop,xl}.png`.
- Modes/lifecycle: `studio-countdown.png`,
  `studio-rotating-autoplay.png`, `studio-paused.png` and `studio-closed.png`.
- Special modes: `studio-dark.png`, `studio-forced-colors.png`,
  `studio-rtl-reduced-motion.png` and `studio-text-200-mobile.png`.
- Migration: `deprecated-exhibit-desktop.png` and
  `deprecated-studio-desktop.png`.
- Historical before evidence remains under `output/playwright/parity/marketing/`
  and `output/playwright/refinement-batch-15/before/`.

All eight Exhibit/Studio viewport combinations had zero document/component
overflow. Static normalized markup was exactly equal for C2 Exhibit, C2 Studio,
G11 Exhibit and G11 Studio (`318` characters each). The run used one tab and
reported zero console errors and zero warnings. The final cleanup left port
`4173` free, the managed server stopped and `gallery-refinement` closed.

## Performance Snapshot

| Surface | Current gzip | Fixed ceiling | Result |
| --- | ---: | ---: | --- |
| Shared runtime | `16,079 B` | `8,192 B` | documented program gap; `+631 B` from the post-Consent baseline |
| Global CSS | `4,856 B` | `3,789 B` | documented program gap; `+496 B` |
| Neutral component CSS | `69,477 B` | `65,536 B` | documented program gap; `+76 B` |
| Marketing CSS | `4,782 B` | `4,198 B` | documented program gap; `-380 B` after deleting old G11 CSS |

Ceilings were not raised. The shared runtime increase replaces an otherwise
duplicated Announcement autoplay implementation. No request, asset, storage,
polling loop or perpetual CSS animation is introduced.

## Target Translation

| Target | Result |
| --- | --- |
| Neutral Web | All three modes, controlled dismissal request and shared progressive rotation implemented. |
| Shopify storefront | Static C2 section remains implemented; dynamic schema, persistence and Header section-group placement are planned. |
| React / Angular | Thin controlled props/callbacks over the same DOM/runtime contract; no second state store. |
| Figma | Static mode/state representations only; no simulated clock or persistence. |
| SwiftUI / Compose | Native controls/scheduling preserving exclusive modes and target ownership. |

## Remaining Human Review

- Approve/revise statement surface, typography, density and maximum useful copy.
- Review Inline Countdown hierarchy and Rotating message/control relationship.
- Review logical RTL arrows, narrow two-row layout, pause state and dismiss
  placement across Mobile, Tablet, Desktop and XL.
- Confirm the G11 deprecated name/migration wording.
- Select the first dynamic Shopify surface separately.

No `stable` promotion is authorized. `site/dist` remains untouched.
