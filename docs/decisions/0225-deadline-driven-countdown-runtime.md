# ADR 0225: Deadline-Driven Countdown Runtime

- Status: Accepted
- Date: 2026-07-20
- Supersedes the open choice in ADR 0169
- Related: ADR 0220 and `docs/refinement/owner-decision-responses.md`

## Context

G7 was a static visual projection labelled as a timer even though no clock,
deadline, cadence, expiry state or target event existed. ADR 0169 recommended a
controlled target projection while retaining deadline ownership as an open
choice. The owner instead selected G7-B: Countdown must genuinely count toward
one specific absolute future date.

WAI-ARIA defines `timer` as a changing elapsed/remaining counter and gives it an
implicit `aria-live=off`. HTML `time[datetime]` can preserve the machine-readable
absolute deadline but supplies no calculation. WCAG constrains auto-updating
information and time limits, while Shopify prohibits fictitious countdowns and
false scarcity. These standards constrain implementation; they do not define
what a launch, offer or other domain event must do at expiry.

## Decision

- G7 becomes a deadline-driven neutral Web component. It accepts one absolute
  ISO date-time containing `Z` or an explicit numeric UTC offset. Date-only,
  floating local, impossible and malformed values do not become timers.
- The runtime always derives remaining time from `deadline - Date.now()`. It
  never decrements stored display values, so delayed tasks and resumed documents
  recompute rather than replaying missed ticks.
- All connected Countdown roots share one scheduler. It targets the next
  boundary required by the smallest configured unit, clears its timeout while
  the document is hidden, recomputes on visibility/page-show/focus recovery, and
  prunes disconnected roots.
- Units are a non-empty canonical-order selection of days, hours, minutes and
  seconds. All four are default. Selected unit wrappers remain stable, never
  collapse automatically and display explicit zero values.
- The component derives only `running | expired` for valid deadlines. At expiry
  it clamps every selected value to zero and remains visible by default.
- The first running-to-expired transition emits one bubbling
  `countdownexpire` event. Optional localized neutral completion copy may be
  announced once; no default expired message is invented.
- Consumers own all commercial and application reactions, including hiding,
  replacement, redirect, price or purchase changes, persistence, scheduling,
  analytics and campaign meaning. Those are not Countdown properties.
- A valid enhanced root receives `role=timer` and one complete localized name.
  Visual segments are `aria-hidden`; ordinary ticks retain implicit
  `aria-live=off`. Invalid/no-script rendering remains a native `time` plus
  visible localized fallback.
- Default, Inline and Cards remain the three presentation candidates. Layout is
  intrinsic and wraps at its actual available width; no viewport breakpoint or
  passive touch-target sizing is retained.
- G7 remains `pilot`. This decision authorizes an implementation candidate and
  human review, not visual approval or stability promotion.

## Public Contract

The semantic input surface is deliberately limited to:

- `variant`: `default | inline | cards`;
- `deadline`: required absolute date-time with zone;
- `units`: validated non-empty ordered preset;
- `fallbackText`: required localized no-script/invalid statement; and
- `expiredAnnouncement`: optional localized one-shot neutral completion phrase.

Derived state, current values, localized labels, scheduling cadence and the
expiry event are outputs or implementation details, not consumer inputs. Timer
IDs, intervals, padding, minimum digits, separator geometry, formatter objects,
visibility listeners and internal timestamps remain private.

## Performance And Lifecycle

The implementation adds no per-instance interval, observer or listener. One
shared timeout and three global recovery listeners serve every instance; hidden
documents retain no Countdown timeout. Updates write text/attributes only and
perform no layout reads.

At the implementation snapshot, shared runtime rises from `13,078 B` to
`15,448 B` deterministic gzip and Marketing CSS from `4,930 B` to `5,073 B`.
Both pre-existing program gaps remain explicit and their fixed ceilings are not
raised. The additional runtime responsibility is authorized by the owner's
G7-B choice; later distribution work should split/lazy-load component enhancers
if the shared bundle cannot be reduced below budget.

## Target Translation

- Neutral Web uses canonical markup/CSS plus `components/js/theme.js`.
- Shopify receives the copied runtime but remains `planned` until a truthful
  merchant/data surface and placement are selected. A fake per-visitor deadline
  or speculative Liquid surface is not added.
- React and Angular map props and `countdownexpire` into the same DOM contract;
  they do not own a second interval or remaining-time store.
- Figma publishes static Running, Expired and Invalid examples only.
- SwiftUI and Compose use native lifecycle scheduling while preserving the same
  deadline, units, zero, state and expiry-reaction boundary.

## Consequences

- Countdown now has a truthful semantic identity and real progressive behavior.
- Announcement Bar and future Coming Soon compositions may consume canonical G7
  without copying its clock/runtime.
- Invalid deadlines fail safe as ordinary static time content.
- Human review still decides typography, spacing, separator treatment, Cards
  surfaces, narrow wrapping and the visible retained-zero presentation.

## Evidence Considered

- <https://www.w3.org/TR/wai-aria-1.2/#timer>
- <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>
- <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html>
- <https://shopify.dev/docs/storefronts/themes/store/requirements>
- <https://shopify.dev/docs/storefronts/themes/best-practices/performance>
