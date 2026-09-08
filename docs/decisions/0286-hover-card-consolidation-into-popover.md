# 0286. Hover Card Consolidation Into Popover

Status: Accepted

Date: 2026-08-25

## Context

During Card-family review, the owner identified Hover Card and Popover as two
names for the same floating-surface need. Maintaining both identities created
duplicated surface, sizing, motion, positioning, documentation, and target
adapter work while Popover already provided the more general trigger-owned
non-modal contract and included optional arrow anatomy.

The visible “pico” that relates the surface to its trigger still needs an
explicit, reusable customization.

## Decision

- Remove Hover Card (`B10`) from the current registry, contracts, canonical
  CSS, Exhibit, Studio, dossiers, reports, and generated adapters.
- Popover (`B9`) is the single canonical trigger-owned non-modal floating
  surface for this family.
- Add `showArrow: boolean` to Popover. It defaults to `true` to preserve the
  current presentation. `false` omits or natively hides `.popover__arrow`.
- The arrow is decorative, receives `aria-hidden="true"`, and does not change
  Popover activation, semantics, focus, dismissal, positioning, or collision
  responsibilities.
- Passive destination-preview content may still be composed inside Popover,
  but targets must preserve complete information through an accessible path and
  choose an activation model appropriate to pointer, keyboard, and touch input.
- The consolidation reduces the active component inventory from 183 to 182.
  It is not a deprecation alias and does not create a second compatibility
  implementation before v1.
- Popover remains `pilot`; this decision does not approve its final visual
  treatment or promote it to `stable`.

## Consequences

- One contract and one CSS surface own floating-panel shape, shadow, arrow, open
  state, and target positioning boundaries.
- Studio exposes `Open` and `Show arrow` as independent Popover controls.
- ADRs 0019, 0072, and 0102 remain historical evidence for the former Hover
  Card boundary but are superseded where they define Hover Card as an active
  component or state that Popover owns only `open`.
- Consumers that had not yet shipped v1 migrate directly to Popover rather than
  receiving a permanent Hover Card alias.
