# ADR 0228: Decorative Reading Progress With Controlled And Automatic Sources

- Status: Accepted
- Date: 2026-07-20
- Supersedes the unresolved Reading Progress recommendation in ADR 0079
- Related: ADR 0197 and `docs/refinement/owner-decision-responses.md`

## Context

L4 Reading Progress was a fixed physical-top bar with an opaque required
`indicator` slot, a layout-affecting width transition and no measurement
contract. Exhibit and Studio reconstructed different static values and visuals.
The name also left an important semantic ambiguity: HTML `progress` and ARIA
`progressbar` represent progress toward completing a task, while article scroll
position does not prove that content was read or completed.

The owner selected a supplemental decorative article-position cue. The owner
also accepted two mutually exclusive state sources: Controlled for targets that
already own a normalized value, and Automatic for capable targets that can
associate and measure an explicit article. Placement remains the host's
responsibility.

## Decision

- Reading Progress is always decorative: `aria-hidden="true"`, non-focusable,
  non-live and pointer-transparent. It has no `progressbar`, `scrollbar`, meter
  or status semantics and makes no completion claim.
- `mode` is exclusively `controlled | automatic`. Controlled is the portable
  default and consumes a finite bounded `value` from `0` through `100`.
- Automatic requires one explicit `targetId`. Neutral Web may also receive an
  explicit containing `scrollRootId`; omission selects the document viewport.
- Automatic normalizes the article range so `0` is the article block-start at
  scrollport block-start and `100` is the article block-end at scrollport
  block-end. Values are clamped.
- Missing, disconnected, invalid, short or non-scrollable ranges hide the cue
  and expose `unavailable` or `invalid` only as private diagnostic state. Stale
  progress is never displayed.
- The host owns fixed, sticky or in-flow placement, safe-area and Header
  offsets, stacking, collision and omission policy. Those are not component
  variants or public tokens.
- The fill uses one private logical-start transform scale. There is no width
  interpolation or extra reduced-motion animation.
- Exhibit and Studio consume the same `ReadingProgressArtwork`, fixture,
  canonical CSS and neutral runtime. The contract remains `pilot`; this ADR
  does not authorize visual approval or promotion to `stable`.

## Public Contract

The public semantic properties are `mode`, conditional `value`, conditional
`targetId`, and optional Automatic `scrollRootId`. Runtime outputs are
`data-reading-state="controlled|automatic|unavailable|invalid"` and a bounded
`data-value` only while available. The component emits no event because it does
not initiate or own reading state.

Article selectors, generic query selectors, scroll thresholds, cadence,
placement, z-index, animation duration, analytics, persistence and any claim of
completion remain outside the public API.

## Runtime And Cleanup

Neutral Web attaches work only for connected Automatic instances. It groups
passive scroll listeners by source, uses one shared window-resize listener,
coalesces measurements through one animation frame, and observes only the
associated article and embedded scroll root. Reconfiguration and removal detach
source listeners, unobserve geometry, cancel the last pending frame, disconnect
the last observer and clear retained roots. There is no interval, polling,
request, storage, cookie or analytics work.

Controlled mode performs one bounded projection and attaches no scroll, resize
or observation work. Targets without safe geometry measurement use Controlled.

## Accessibility

The article's headings, landmarks, browser scrolling and optional Table of
Contents remain the accessible reading and navigation model. Reading Progress
does not intercept keyboard or pointer input and is not announced continuously.
The fill originates at logical inline start, including RTL, and maps to the
system highlight color in forced-colors mode.

## Performance

After generated-adapter reconciliation:

- Blog CSS is `5,610 B` gzip, `+107 B` from the pre-L4 baseline and `81 B`
  above its unchanged `5,529 B` ceiling.
- Shared runtime is `17,569 B` gzip, `+1,490 B` from the post-Announcement
  baseline and `9,377 B` above its unchanged `8,192 B` ceiling.
- Neutral component CSS is `69,690 B` gzip, `+213 B`, and `4,154 B` above its
  unchanged `65,536 B` ceiling.

Ceilings are not raised. The Blog, runtime and total gaps remain explicit v1
risks. The runtime cost buys one shared bounded service instead of independent
Article, Table of Contents or framework observers; later consumers must reuse
the service or demonstrate why they cannot.

## Target Translation

- Neutral Web implements Controlled and Automatic with explicit source
  association and complete lifecycle cleanup.
- Shopify currently receives canonical presentation/runtime, but remains
  planned until a specific article/template owner and Theme Editor lifecycle
  choose source association and placement. Controlled is the safe fallback.
- React and Angular expose thin controlled values or explicit element-reference
  adapters without creating a second reading store.
- Figma represents static Controlled values only.
- SwiftUI and Compose use native geometry or supplied controlled values while
  preserving the decorative identity and host placement boundary.

## Consequences

- Reading Progress no longer duplicates task Progress semantics or owns a
  global fixed layer.
- Its source and failure behavior are deterministic across document and nested
  scrollports.
- Automatic mode adds measured runtime cost and therefore remains subject to
  profiling and future consolidation with other article-position consumers.
- Final thickness, color, placement composition and target-specific article
  integration remain explicit human/target review items.

## Evidence Considered

- <https://html.spec.whatwg.org/multipage/form-elements.html#the-progress-element>
- <https://www.w3.org/TR/wai-aria-1.2/#progressbar>
- <https://www.w3.org/TR/scroll-animations-1/>
- <https://www.radix-ui.com/primitives/docs/components/progress>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/feedback-and-status-indicators/progress>
