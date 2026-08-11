# ADR 0232: Logo Bar Native Collection And Canonical Marquee Composition

- Status: Accepted
- Date: 2026-07-20
- Decision owner: The Gallery owner
- Applies to: S12 Logo Bar / Trust Bar
- Depends on: ADR 0231

## Context

Logo Bar advertised static and marquee variants, but its source used a generic
flex container and a second incomplete CSS animation. It lacked native list
semantics, representative mark meanings, persistent control, bounded visual
duplication and functional Exhibit/Studio motion parity.

The owner selected `S12-B`: retain both presentations and compose the accepted
canonical S18 Marquee behavior.

## Decision

1. Logo Bar exposes `static | marquee` and defaults to `static`.
2. Consumers provide one ordered native list of target-owned marks. Each record
   is classified by the target as informative, decorative or a real native
   link with an accessible destination name.
3. The optional visible label names a section; its final heading rank belongs to
   the surrounding target document rather than a fixed cross-target property.
4. Marquee presentation composes S18. Logo Bar does not implement separate
   cloning, timing, direction, playback, focus, visibility or reduced-motion
   behavior.
5. Public motion configuration is limited to S18's logical `forward | reverse`,
   semantic `slow | default | fast`, and localized Pause/Resume labels.
6. Empty collections omit the root. A one-item marquee request falls back to the
   readable static source list. Generated copies are bounded, `aria-hidden`,
   inert and non-interactive.
7. Assets, alternative text, destinations, claims, ordering, analytics and
   brand-use permission remain target-owned.
8. Mark dimensions, gap, muted/color treatment, borders and wrapping geometry
   remain private implementation details pending human visual review.
9. Exhibit and Studio render one shared fixture through one shared renderer.

## Consequences

- Logo Bar depends on canonical Marquee and inherits Button transitively.
- The incomplete `logo-marquee` animation and generic `.logo-bar__logos`
  contract are removed from the canonical implementation.
- Static mode has no component runtime work or playback control.
- Marquee mode consumes the existing bounded runtime and produces no additional
  state owner.
- The contract remains `pilot`; this decision does not approve artwork or
  promote the component to `stable`.
