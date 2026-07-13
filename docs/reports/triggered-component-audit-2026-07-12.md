# Triggered Component Audit - 2026-07-12

## Scope

This audit covers primary Exhibit previews that use a button to reveal a
floating, overlay, or viewport-edge surface. It verifies the site-owned preview
composition, not consumer implementation behavior such as focus trapping or
collision detection.

## Accepted Preview Families

- Anchored: Combobox, Date Picker, Dropdown Menu, Popover, and Context Menu.
  The trigger remains visible because it establishes the surface position.
- Overlay: Modal, Drawer, Command Palette, Lightbox, Mega Menu, Popup, Search
  Overlay, and Size Chart. The surface starts visible and the trigger remains
  hidden until dismissal.
- Viewport edge: Toast, Social Proof, Sticky Add-to-Cart, and Cookie Consent.
  The surface starts visible in a bounded stage position and the trigger remains
  hidden until dismissal.

## Checks

- Desktop viewport: all 17 audited surfaces remain inside the Exhibit stage.
- Mobile viewport at 390 x 844: all 17 surfaces remain inside the stage and the
  documentation page has no horizontal overflow.
- Overlay and viewport-edge launchers are hidden while their surface is active.
- Anchored launchers remain visible and preserve their geometric relationship.
- Dismissal synchronizes `aria-expanded`, reveals the launcher, and supports
  reopening the surface.
- Toast uses border-box sizing and allows long titles or messages to wrap
  without reducing the content column to an unusable width.

## Ongoing Rule

New triggered Exhibit previews must use one of the three accepted families in
ADR 0069. Do not place a fixed or edge-aligned component inside a shrink-to-fit
trigger wrapper. The shared renderer's `[hidden]` rule is authoritative over
the Button component's display declaration.
