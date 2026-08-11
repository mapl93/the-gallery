# ADR 0227: Canonical Announcement Bar Modes And G11 Deprecation

- Status: Accepted
- Date: 2026-07-20
- Supersedes the unresolved recommendation in ADR 0173
- Related: ADRs 0100, 0104, 0225 and `docs/refinement/owner-decision-responses.md`

## Context

C2 Announcement Bar was static-only while G11 Announcement Extended separately
claimed Countdown, Rotating and Dismissible variants. G11 had no coherent mode
property, real Countdown, message collection, current index, manual navigation,
pause/restart control or controlled visibility. Its fixed-height CSS translated
one authored row through three positions on an infinite eight-second loop, so
the surface became blank and could clip localized or zoomed content. Dismissal
duplicated Close Button and existed only in a site-local fixture.

The owner selected one canonical Announcement Bar with exclusive Static,
Countdown and Rotating modes, plus orthogonal controlled dismissal. Canonical
Countdown now owns a truthful absolute-deadline runtime, and Hero established an
accepted Carousel rotation lifecycle that can be shared rather than copied.

## Decision

- C2 **Announcement Bar** is the only public implementation. G11 becomes a
  deprecated pre-v1 migration record and owns no independent CSS, renderer,
  fixture, runtime or target adapter. No permanent compatibility alias is added.
- `mode` is the exclusive `static | countdown | rotating` content discriminator.
  Static requires one stable message with optional canonical Link; Countdown
  requires canonical G7 in Inline presentation; Rotating requires at least two
  real canonical Carousel slides. Countdown and Rotating never coexist.
- `dismissible` is orthogonal to every mode. It renders canonical Close Button
  and emits `announcementdismissrequest`. The target owns `visible`, eligibility,
  persistence, reappearance, focus after removal and every campaign policy.
- Rotating mode always exposes previous/next canonical Icon Buttons and one
  visible localized current/total counter. It exposes pause/play only when
  autoplay is enabled. Dots and timing/progress bars are not rendered.
- Autoplay is opt-in, defaults off and uses a validated 6000 ms default within
  the accepted 3000–12000 ms range. It pauses for hover and hidden documents.
  Focus, direct scrolling, previous/next, or another manual selection creates a
  durable user pause; only explicit Play resumes. Reduced motion suppresses
  rotation and smooth scrolling.
- Direct touch scrolling and focused-track native keyboard scrolling remain
  available. The root installs no Arrow-key handler. Real slides are never
  cloned and Announcement rotation wraps through their logical indices.
- Static page-load content remains ordinary content. Rotating mode requires a
  named Carousel region and named slide groups. The position status is quiet
  while autoplay runs and polite while selection is user-controlled.
- All modes use intrinsic logical layout. Narrow containers may create
  additional rows; units/messages are never hidden, scaled or clipped to hold a
  fixed bar height.
- C2 and deprecated G11 use the same `GlobalStudio`, `AnnouncementArtwork`,
  fixture and neutral runtime. The contract remains `pilot`; this ADR does not
  authorize visual approval or promotion to `stable`.

## Public Contract

Stable content/composition inputs are `mode`, optional `label`, conditional
`message`, `countdown` and `messages`, and controlled `visible`. Dismissal uses
`dismissible` and required localized `dismissLabel`. Rotation uses opt-in
`autoplay`, bounded `autoplayInterval`, localized `previousLabel`, `nextLabel`,
`pauseLabel`, `playLabel`, `counterTemplate` and `statusTemplate`.

The neutral output events are `announcementdismissrequest`,
`announcementchange` and `announcementplaybackchange`. Campaign identifiers,
schedules, audience, persistence keys, storage, analytics, placement, Header
ordering, navigation and content records remain target facts.

## Canonical Dependencies

- Link owns native navigation and focus treatment in Static content.
- Countdown owns deadline validation, clock projection, units, retained zero,
  cadence, expiry state and `countdownexpire`.
- Carousel supplies scroll-snap track/slide structure and the shared rotation
  service used by both Announcement Bar and Hero.
- Icon Button owns previous, next and conditional pause/play controls.
- Close Button owns the named native dismissal action.

Announcement Bar owns only the compact relationship among those dependencies.

## Runtime And Cleanup

`components/js/theme.js` contains one generic Carousel rotation service used by
Hero and Announcement. Every root owns at most one timeout; hidden-document and
reduced-motion state are distributed through one shared listener each. A
MutationObserver prunes disconnected roots and clears their timer, animation
frame and scroll-release timeout. No CSS infinite animation, provider, storage,
network request or polling loop remains.

## Performance

After generated-adapter reconciliation:

- Shared runtime is `16,079 B` gzip, `+631 B` from the post-Consent baseline,
  against the unchanged `8,192 B` program ceiling.
- Global CSS is `4,856 B` gzip, `+496 B`, against the unchanged `3,789 B`
  ceiling.
- Marketing CSS falls from `5,162 B` to `4,782 B` gzip because the old G11
  loop and duplicated dismiss treatment were deleted.
- Neutral component CSS is `69,477 B` gzip, `+76 B`, against the unchanged
  `65,536 B` ceiling.

Ceilings are not raised. The accepted shared service replaces duplicate future
runtimes, but runtime and Global bundle distribution remain explicit v1 risks.

## Target Translation

- Neutral Web implements all three modes, controlled dismissal requests and the
  shared progressive rotation service.
- Shopify's existing Announcement section remains a truthful static C2 profile.
  Countdown, rotation, dismissal persistence, merchant schema and Header
  section-group placement remain explicit target maturity work rather than
  being inferred from copied CSS/runtime.
- React and Angular expose thin controlled props and event callbacks over the
  same DOM contract and must not create a second rotation or countdown store.
- Figma represents static visual states, including wrapped, paused and
  dismissible examples, without simulating clocks or persistence.
- SwiftUI and Compose use native controls and scheduling while preserving the
  exclusive modes, explicit Play requirement and target ownership boundary.

## Consequences

- The duplicate G11 identity and continuous blank-frame animation are removed.
- Countdown and Carousel responsibilities remain canonical and testable.
- Autoplay is possible without making it a default or hiding its control.
- The first dynamic Shopify surface and final compact visual hierarchy remain
  explicit target/human review decisions.

## Evidence Considered

- <https://www.w3.org/WAI/ARIA/apg/patterns/carousel/>
- <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- <https://open-ui.org/components/carousel.research/>
- <https://shopify.dev/docs/storefronts/themes/store/test-theme/checklist>
