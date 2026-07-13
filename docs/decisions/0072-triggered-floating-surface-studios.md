# 0072. Triggered Floating Surface Studios

Status: Accepted

Date: 2026-07-12

## Context

Popover, Hover Card, Dropdown Menu, and Context Menu had canonical floating
surface CSS, but their docs relied on trigger fixtures and, in some cases,
inline positioning that made the surface appear contained by or overlapping
its trigger. They also lacked reviewed Studio property surfaces.

## Decision

- Popover exposes only `open`. Content, title, arrow inclusion, trigger markup,
  positioning, dismissal, and focus restoration remain composition or target
  behavior.
- Hover Card adds no semantic property. Its trigger and supplemental content
  are consumer-owned composition, and canonical visibility remains hover or
  focus-within.
- Studio uses a site-only inspection class to keep Hover Card visible while
  preserving the canonical hover and focus behavior outside Studio.
- Dropdown Menu exposes `open` for the group and `itemVariant` for an
  individual command. Item labels, icons, shortcuts, command models, and
  keyboard coordination remain consumer or target concerns.
- Context Menu exposes only `open`. Invocation coordinates, viewport clamping,
  focus restoration, and dismissal remain target behavior.
- Studio starts click-triggered surfaces open, places the trigger and surface
  as separate visual regions, and leaves the trigger available after close.
- Studio fixtures use Lucide icons without adding icon dependencies to the
  target-agnostic contracts.
- No new public component tokens or positioning properties are introduced.

## Consequences

- Four additional Layout components have inspectable, responsive Studios.
- Trigger buttons no longer visually contain or sit behind the floating
  surfaces in Studio.
- The contracts describe semantic state without claiming that neutral CSS owns
  focus management, invocation coordinates, or collision handling.
- All four contracts remain `pilot` pending owner review.
