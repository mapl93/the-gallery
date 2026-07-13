# 0069. Triggered Exhibit Preview Layouts

Status: Accepted

Date: 2026-07-12

## Context

Seventeen component previews include a trigger. Several placed the trigger and
the component inside a shrink-to-fit wrapper, which allowed the trigger to
constrain overlays, notifications, and edge-aligned bars. Closed initial states
also meant Exhibit sometimes presented only a button instead of the component
being documented.

## Decision

- Triggered previews are classified as anchored surfaces, overlay surfaces, or
  viewport-edge surfaces.
- Anchored surfaces such as Combobox, Dropdown Menu, Popover, and Context Menu
  preserve their geometric relationship with the trigger. They start open in
  Exhibit and reserve stable space for the surfaced content.
- Overlay surfaces use the full-width site-owned overlay preview layout. The
  trigger and surfaced component are siblings, and the trigger does not own
  overlay geometry.
- Toasts, banners, social proof, and sticky bars use explicit site-owned edge
  placement helpers with bounded responsive widths.
- Primary Exhibit previews start visible so the documented component is the
  artwork shown on first load. For non-anchored surfaces, the trigger is hidden
  while active and appears after dismissal.
- The shared preview renderer enforces the trigger's `hidden` state regardless
  of wrapper depth. This rule must outrank component-level button display rules
  so a launcher cannot reappear behind an active surface.
- Secondary behavior demonstrations may start closed when the hidden state is
  the behavior under examination, as with FAB visibility.
- These helpers belong to the docs site. They do not change component defaults,
  target contracts, or consumer positioning requirements.

## Consequences

- Trigger buttons no longer compress overlays or notifications.
- Open, close, and reopen flows remain available without replacing the initial
  component view with a launcher.
- Future triggered previews choose one of the established layout families
  instead of adding one-off positioning wrappers.
