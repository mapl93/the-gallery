# ADR 0231: Progressive Marquee Motion And Control Ownership

- Status: Accepted
- Date: 2026-07-20
- Decision owner: The Gallery owner
- Applies to: S18 Marquee and S12 Logo Bar composition
- Supersedes: the open Marquee boundary in ADR 0082

## Context

The existing Marquee translated one unduplicated track indefinitely, paused
only while hovered or focused, and was disabled by site-only Studio CSS. It did
not provide a seamless loop, persistent user control, distance-normalized pace,
or functional Exhibit/Studio parity. Logo Bar also carried a separate incomplete
animation recipe.

The owner selected `S18-A`: one canonical, target-agnostic Marquee enhancement
that Logo Bar may compose.

## Decision

1. Marquee exposes `auto | static` presentations and defaults to `auto` when
   progressive enhancement succeeds.
2. Consumers author one ordered native list. The implementation may create at
   most one visual copy for continuity. The copy is `aria-hidden`, inert,
   non-interactive, and never a second semantic data source.
3. Auto mode composes canonical Button for a persistent Pause/Resume action.
   Hover pauses temporarily. Focus entering the component creates a durable
   pause and motion resumes only after the explicit Resume action.
4. Reduced motion, missing JavaScript, invalid markup, insufficient items, or
   failed enhancement produce the readable static list and no usable motion
   control.
5. Public motion configuration is limited to logical `forward | reverse` and
   semantic `slow | default | fast`. Raw duration, velocity, gap, clone count,
   travel distance, easing, and iteration remain private.
6. Semantic pace maps to distance-normalized velocity. Neutral Web may perform
   bounded initialization and resize measurements, but uses CSS transforms for
   animation and no polling, per-frame JavaScript, network requests, or
   component assets.
7. The component emits playback-state evidence without announcing animation
   frames or loop boundaries. Framework adapters may expose controlled state
   around the same owner; they must not introduce a second hidden state machine.
8. Exhibit and Studio use one renderer and fixture. Documentation CSS may style
   their stage but may not disable canonical motion.
9. Logo Bar defaults to static. Its optional marquee presentation composes S18
   rather than maintaining separate motion, duplication, control, or reduced-
   motion behavior.

## Consequences

- Marquee depends on canonical Button.
- The neutral runtime owns one bounded enhancement entry per live root and one
  shared resize observer.
- Static and no-enhancement output remains useful source-ordered HTML.
- Linked Logo Bar marks may appear in the authoritative group; copied links are
  inert and never become additional focus stops.
- Final typography, density, separators, private velocities, control placement,
  and Logo Bar artwork remain subject to human visual review.
- Contracts remain `pilot`; this decision does not promote either component to
  `stable`.
