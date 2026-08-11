# 0169. Controlled Countdown Projection And Expiration Deferral

Status: Accepted

Date: 2026-07-16

Follow-up: the owner selected the deadline-owning `G7-B` direction, retained
zero expiry and the target-reaction boundary. ADR 0225 supersedes this open
choice and records the implemented shared deadline runtime.

## Context

G7 Countdown Timer entered refinement as a CSS-only collection of target-
supplied value/unit segments in Default, Inline and Cards presentations. Its
contract says that calculation, time zone, cadence, synchronization and
expiration remain outside the source, but it does not expose a complete
accessible value, controlled lifecycle, expiry state or valid-composition rule.

The fixed Exhibit and Studio fixtures render `02 Days`, `14 Hours`,
`38 Minutes` and claim `role="timer"` despite never updating. WAI-ARIA defines a
timer as a numerical elapsed/remaining counter whose current text changes at
fixed intervals except while paused or at its endpoint. WCAG also places
requirements on auto-updating information and content-imposed time limits.
Shopify separately prohibits fictitious countdowns and fake urgency in Theme
Store themes.

ADR 0081 and `docs/OPEN-QUESTIONS.md` deliberately leave target-time ownership,
time zone, tick cadence, clock correction, server/client synchronization and
expiration behavior open. Choosing a neutral clock service, a controlled
projection or a static Duration identity would materially change the public
contract and every target adapter. This is an owner architecture/product
decision, not a CSS-only refinement.

## Decision

- G7 remains `pilot` at contract version `0.2.0` until the owner selects its
  source model and expiration semantics.
- No contract, registry, canonical CSS, renderer, Studio metadata, Shopify
  adapter or generated target output changes in this decision.
- The recommended direction is a controlled remaining-time projection. The
  neutral component would receive current ordered segments, one complete
  localized accessible value and an explicit lifecycle projection from the
  target.
- Under that direction, the target owns the authoritative deadline, current
  time, parsing, time zone, locale, date math, cadence, drift correction,
  background resumption, server/client synchronization and expiration side
  effects.
- The neutral component has no uncontrolled clock and no fallback calculation.
  A deadline-oriented target convenience API must map into the same controlled
  projection rather than create a second source of truth.
- `role="timer"` is valid only for a real current counter, including a genuinely
  paused value. Static documentation/design examples must use ordinary static
  content semantics until a deterministic test clock drives updates.
- A functional composition must satisfy WCAG auto-update/time-limit obligations
  or document an applicable essential/real-time exception. Any Pause/Hide/
  frequency control composes canonical Button and resumes from authoritative
  current time; G7 does not duplicate control behavior.
- The owner must select what renders at expiration: explicit target replacement
  content, retained zero, or complete omission. CSS never infers expiry, values
  never go negative and no action is disabled/redirected implicitly.
- A static Duration/Time Remaining Display remains a supported alternative, but
  requires an identity/versioning decision and removal of timer lifecycle
  claims.
- Existing Mobile/Desktop Exhibit and Studio captures remain before-only
  evidence. No evidence server or browser is needed for this decision-only
  batch.
- No `stable` promotion or visual approval is implied.

## External Evidence

- WAI-ARIA 1.2 defines `timer` as a live-region counter whose text is the
  current elapsed/remaining measurement, normally updated at fixed intervals;
  its implicit `aria-live` is `off`.
- APG publishes no dedicated Countdown interaction pattern.
- HTML `time` can encode a machine-readable global date-time or duration, but
  does not calculate, tick, localize or expire a countdown.
- WCAG 2.2.2 requires a pause/stop/hide or update-frequency mechanism for
  non-essential auto-updating information shown alongside other content, with
  no five-second exception. Real-time information should resume at the current
  value rather than replay stale updates.
- WCAG 2.2.1 requires adjustment/extension/turn-off for content-imposed time
  limits unless an accepted exception applies.
- Open UI, Radix and the current Polaris catalogues contain no generic Countdown
  primitive that resolves target-time ownership or expiration.
- Shopify Theme Store requirements reject fictitious countdown timers and fake
  urgency; its theme guidance recommends minimal native JavaScript only where
  HTML/CSS cannot provide the behavior.

These sources constrain semantics and conformance but do not select The
Gallery's public product/runtime boundary.

## Recommended API Boundary After Approval

The candidate neutral surface is deliberately small:

- `variant`: only the owner-approved Default, Inline or Cards presentation;
- `segments`: required controlled ordered value/unit composition;
- `accessibleValue`: required complete localized current measurement;
- `status`: controlled Running/Paused/Expired only if that lifecycle is
  accepted; and
- `expiredContent`: according to the selected explicit expiration policy.

Tick milliseconds, clock source, time zone implementation, server offset,
drift tolerance, visibility events, polling, hydration, zero padding, columns,
gap, minimum widths, label case, typography internals, breakpoint and analytics
remain target/runtime facts or private composition.

## Performance

G7's current CSS slice is `1,592 B` raw / `618 B` deterministic gzip. Marketing
is `19,819 B` raw / `4,134 B` gzip against its permanent `4,198 B` ceiling,
leaving `64 B`. Generated Neutral Web component CSS is `67,741 B` gzip against
`65,536 B`, retaining an existing `2,205 B` program gap. Shared runtime is
`10,501 B` gzip against `8,192 B`, retaining an existing `2,309 B` gap.

G7 adds `0 B` neutral runtime today. The recommended controlled projection must
preserve that boundary and refine CSS through replacement, not a family-budget
increase. A deadline-owning neutral component cannot proceed without explicit
shared-runtime authorization and a budget recovery plan.

## Open Owner Choice

Choose one source model:

1. controlled remaining-time projection — recommended;
2. deadline-owning neutral runtime;
3. controlled projection plus non-calculating deadline metadata; or
4. renamed static Duration/Time Remaining Display.

Then select:

- explicit expiry replacement, retained zero or root omission;
- allowed unit/zero/seconds policy and the retained presentation variants;
- whether a machine-readable global deadline belongs in the neutral API/DOM;
  and
- whether G7 composes an update control or every functional context must provide
  it externally.

Final label case, geometry, typography, separators, density and G7-specific
Figma evidence remain separate human visual decisions.

## Target Boundary

- Neutral Web receives a controlled semantic projection and adds no clock
  service under the recommended option.
- Shopify requires truthful target data, explicit editor/runtime/expiry policy
  and a small lifecycle-scoped native script before it can become target-ready.
- React and Angular may expose adapter conveniences, but current values still
  have one target owner.
- Webflow and Framer remain static unless connected to an accepted authoritative
  runtime/data source.
- Figma exposes static named examples only and never implies a functioning
  deadline.
- SwiftUI and Compose use native lifecycle/background facilities while
  preserving the same semantic projection; they do not copy DOM/JS mechanics.

## Consequences

- The explicit architecture boundary remains visible instead of being hidden
  inside a local interval, compatibility property or misleading fixture.
- G7 cannot be reported ready for human stability review yet.
- The dossier and audit provide an implementation and certification register
  that can be executed immediately after owner input.
- Work can continue to later components without repeating this research or
  blocking the overall refinement program.

## Evidence Considered

- <https://www.w3.org/TR/wai-aria-1.2/#timer>
- <https://www.w3.org/WAI/ARIA/apg/patterns/>
- <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element>
- <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- <https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html>
- <https://open-ui.org/>
- <https://www.radix-ui.com/primitives/docs/overview/introduction>
- <https://shopify.dev/docs/storefronts/themes/store/requirements>
- <https://shopify.dev/docs/storefronts/themes/best-practices/performance/index>
