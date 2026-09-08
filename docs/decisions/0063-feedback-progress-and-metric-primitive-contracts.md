# 0063. Feedback, Progress, And Metric Primitive Contracts

Status: Accepted

Superseded in part by ADR 0277: Stat no longer exposes `zero` as a switch.

Date: 2026-07-12

## Decision

- Alert variants express semantic severity and are not duplicated as states.
- Static Alert is not a live region. `announcement` explicitly selects None,
  Polite, or Assertive semantics for dynamically inserted feedback.
- Alert dismissal composes Close Button; the consumer owns removal and focus.
- Progress separates Bar/Circle structure from the orthogonal Indeterminate bar
  state. Targets own range calculations and localized value text.
- Determinate Progress exposes progressbar range semantics. Indeterminate omits a
  false current value and remains unavailable for Circle.
- Spinner graphics are decorative. Loading regions or visible status text own
  announcements; Spinner exposes size and optional overlay label.
- Progress and Spinner stop animation under reduced motion.
- ADR 0234 later separates optional compact visible `displayValue` from the
  complete localized `valueText` exposed through `aria-valuetext`; neither is an
  implicit fallback for the other.
- Stat receives target-formatted strings. Direction is explicit metadata on the
  change element, while business meaning remains target-owned.
- Stat value and change use the body family (Inter in the base system) and expose
  the same independent OpenType switches and defaults as Price: `ss01`, `zero`,
  `tnum`, `calt`, and `frac`.
- Studio fixtures are examples, not semantic defaults.

## Consequences

- Feedback severity, announcement urgency, motion, and metric direction no longer
  rely on duplicated states or implicit markup.
- The four contracts remain `pilot` until owner review completes stable gates.
