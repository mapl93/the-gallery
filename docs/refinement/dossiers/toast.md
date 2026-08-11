# Component Dossier: Toast

Status: `human-review-ready`

Target under review: Neutral Web transient, non-blocking notification surface

Contract: `components/contracts/toast.contract.json`

## Recommendation

Keep Toast as one passive notification item with independent visual variant,
announcement priority, visibility, optional safe action, and optional canonical
dismiss action. Move live semantics to the content region so interactive controls
are not part of the announced string. Remove global viewport placement from the
item surface: target-owned queue/viewport services own stacking, corner/edge,
duration, pause, duplicate policy, and lifecycle. Default announcement remains
None; Error does not automatically become assertive.

## Purpose And Limits

- Provides short, non-blocking outcome/status feedback while the user continues
  the current task; it never moves focus on appearance.
- May include one action that is safe to ignore (for example Undo, Retry, or View)
  and an explicit dismiss action when persistent or interactive.
- It is not an Alert Dialog, required confirmation, validation replacement,
  durable audit/history feed, banner, tooltip, or network/error state owner.
- Toast owns the item surface/content hierarchy. A target service owns creation,
  insertion/removal, queue order, placement, timing, pause/resume, and persistence.

## Pre-Refinement Gallery Baseline

- Registry `B4`; contract `0.2.0`, `pilot`: 6 anatomy parts, 4 variants, 1 size,
  4 states, 3 behaviors, 8 properties, and 21 public token references.
- Root is globally `position: fixed` at physical `bottom/right: 24px`, owns
  z-index, and uses `100vw` for width, although ADR 0069 says edge placement is
  site/target-owned. No viewport/queue separation is documented.
- Hidden state uses only opacity/transform/pointer-events, so hidden content can
  remain exposed to the accessibility tree. The root live region contains the
  optional interactive dismiss button and lacks explicit atomic semantics.
- Close styling duplicates canonical Close Button at `28px`; no canonical
  dependency is registered. There is no optional safe action slot despite
  convergence in Radix and Shopify.
- Message size uses hardcoded token arithmetic; gap, padding, position, width,
  entrance distance, and title spacing are hardcoded. No forced-colors or
  reduced-motion rule exists for Toast itself.
- Shared Exhibit/Studio rendering starts visible and dismisses/reopens, but no
  timer/queue/pause policy exists, and the static initial polite fixture may be
  announced without an originating user event.
- Two real desktop before captures preserve the current Exhibit/Studio baseline
  under `output/playwright/refinement-batch-13/before/`.

## External Evidence

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA 1.2 status/alert roles](https://www.w3.org/TR/wai-aria/) | Status is a polite live region; Alert is assertive/atomic and should not require focus or dismissal. | Keep announcement independent from visual tone and do not move focus. |
| [APG Alert pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/) | Dynamic alerts announce without focus; automatic disappearance and frequent interruption create timing/usability risk. | Default to non-live/static and leave safe lifecycle/pause to targets. |
| [Open UI Popup research](https://open-ui.org/components/popup.research/) | Toast differs from Popup/Dialog: non-critical, corner-like, usually timeout, no immediate focus, and may not be live. | Keep Toast passive and separate target viewport/lifecycle from item semantics. |
| [Radix Toast](https://www.radix-ui.com/primitives/docs/components/toast) | Mature anatomy separates Provider, Viewport, Root, Title, Description, Action, Close; timing pauses on hover/focus/window blur; actions must be safe to ignore. | Keep queue/viewport/timer target-owned, add one optional safe action, and compose Close Button. |
| [Shopify Toast API](https://shopify.dev/docs/api/app-home/apis/user-interface-and-interactions/toast-api) | Host API owns show/duration/dismiss and supports one action callback for undo/retry/navigation. | Map item content/action semantics while Shopify owns lifecycle and placement. |

## Recommended Anatomy, States, And API

- Required: root, content/announcement region, and message. Optional: decorative
  icon, concise title, one safe action, and one canonical dismiss action.
- Preserve Info/Success/Error/Warning as independent visual variants. Preserve
  announcement `none|polite|assertive`, default None, and visible state.
- Add optional `action` slot plus required alternative/action description when
  present. Register Button and Close Button dependencies. Keep `dismissLabel`
  required when dismiss action exists.
- Move role/live/atomic mapping from `.toast` to `.toast__content`, outside the
  action controls. `polite` maps to status semantics; `assertive` maps to alert;
  `none` omits live attributes.
- Hidden state must be absent or semantically hidden, not merely transparent.
  Visible state may animate without delaying announcement or focus access.
- Do not expose duration, queue size, screen edge, swipe threshold/direction,
  portal container, or z-index as item properties in v1.

## Behavior And Accessibility Direction

- Insertion never steals focus. Live announcement is selected by event urgency,
  not visual variant; routine success/error outcomes can still be polite.
- A toast must not be the only durable location for critical instructions,
  recovery, validation, or required action. An action must remain safe to ignore
  and have a persistent alternative if the target may time out the item.
- Persistent/interactive toasts provide a named dismiss action. If a target
  auto-dismisses, it pauses on hover, focus, and window blur and gives enough
  time for message/action content; Escape behavior belongs to its viewport.
- Multiple announcements require a target queue/duplicate strategy; avoid
  concurrent assertive notifications and stale queued polite messages.
- Decorative icons are hidden from assistive technology; text communicates the
  full meaning. Actions and dismiss controls remain outside the live string.

## Responsive, Tokens, And Performance

- The item should be flow-sized with `max-inline-size: 100%`, logical layout,
  wrapping title/message/action, and no physical screen placement. The docs
  stage/target viewport owns its edge and stack.
- Toast owns surface, default/feedback border, text, radius, shadow, transition,
  stable body-small type, and semantic spacing. Canonical Button/Close Button
  own control hover/focus; `z-toast` leaves the item because placement is no
  longer canonical.
- Batch 13 starts with Layout CSS at `4,390 B` gzip (`525 B` family headroom),
  shared runtime at `10,335 B`, and Web component CSS at `60,456 B`. The item
  must add `0 B` neutral runtime; target services are outside the base bundle.

## Cross-Target Direction

- Web: render one semantic item; an application/provider owns insertion,
  announcer, viewport, timing, queue, pause, and removal.
- Shopify: map directly to host Toast API where available; theme targets supply
  their own queue/announcer and canonical item surface if needed.
- React/Angular: providers/services are adapter architecture; the neutral API is
  message/title/variant/announcement/safe-action/dismiss semantics.
- Figma: map item anatomy/variants/content/visible states and tokens only; no
  timer, queue, or announcement engine.
- SwiftUI/Compose: use native transient notification/snackbar facilities while
  preserving message, urgency, safe action, and dismissal boundaries.

## Alternatives And Non-Decisions

1. Keeping fixed position on every Toast item prevents coherent multi-item
   stacking and embeds physical Web viewport policy; placement moves to targets.
2. A canonical Toast Provider/queue would decide service architecture and add
   runtime. It remains open until framework/host distribution is designed.
3. Swipe-to-dismiss is useful on touch but needs direction, motion, threshold,
   input-conflict, and accessibility decisions; it is not added in v1.
4. A required response belongs in Alert Dialog, not a persistent Toast styled to
   look passive.

## Certification Evidence

- Exhibit and Studio share byte-identical canonical inner markup (`1,032`
  characters), one fixture, four variants, and canonical Button/Close Button.
- Browser evidence proves None/Polite/Assertive mappings, Error/Polite
  independence, content-only live semantics, focus preservation on show,
  focus-safe action/dismiss removal, and minimal optional omission.
- Eight canonical images cover both views at Mobile/Tablet/Desktop/XL; a 256px
  localized Error item, RTL, dark, forced colors/reduced motion, and minimal
  composition supplement two real before captures.
- Text/focus contrast, decorative accent ratios, zero overflow, container-driven
  action wrapping, `0 B` neutral runtime, and adapter evidence are recorded in
  `docs/reports/toast-web-refinement-audit.md`.

## Current Risks And Human Questions

1. Human review must approve border emphasis, feedback icon/color, title/message
   hierarchy, action/dismiss layout, shadow/radius, width, and target edge placement.
2. No Toast-specific owner visual reference is registered.
3. Real assistive-technology testing is required for dynamically inserted live
   content and multiple queued messages in each target.
4. Duration, queue/duplicate policy, placement, swipe, and provider architecture
   remain target decisions rather than v1 item API.

## Readiness Decision

Human-review-ready. The contract remains `pilot`; explicit visual, semantic,
and production-target approval is still required before any `stable` promotion.
