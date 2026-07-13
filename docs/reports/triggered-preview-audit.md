# Triggered Preview Audit

Date: 2026-07-12

This report records the documentation-site trigger rules established by ADRs
0067, 0069, 0070, 0072, and 0073. It is an implementation inventory, not a new
component contract.

## Preview Families

### Anchored

The trigger remains visible because it defines the surface position. The open
surface must begin immediately after its anchor and the preview reserves space
without changing that position.

- Combobox
- Context Menu
- Dropdown Menu
- Popover

### Overlay Or Viewport Edge

The component starts visible as the Exhibit artwork. The trigger is a sibling,
is removed from layout while the component is open, and appears only after the
component is dismissed.

- Command Palette
- Cookie Consent
- Drawer
- Lightbox
- Mega Menu
- Modal
- Popup
- Search Overlay
- Size Chart
- Social Proof
- Sticky Add-to-Cart
- Toast

### Local Visibility Control

- FAB is explicitly marked as static artwork in the primary preview and starts
  hidden when its visibility behavior is the subject of the secondary example.

## Site-Owned Geometry Rules

- Full-screen surfaces are bounded by the preview stage and never by the trigger.
- Edge notifications use responsive stage insets and a maximum readable width.
- Large menus are allowed to scroll inside the stage instead of overflowing it.
- Anchored listboxes and menus reserve room below the anchor without using that
  reserved room as part of the positioning reference.
- Date Picker declares the input trigger and selected-day close action directly,
  so its initially open anchored preview remains testable.
- Studio switches to a vertical workspace before the inspector can compress the
  preview stage below a readable component width.
- These rules live in `ComponentPreview` and the site-owned Studio layout; they
  do not change consumer defaults, canonical component positioning, or target
  contracts.

## Verification

Every triggered primary preview is checked at desktop and mobile widths for:

- initial component visibility;
- correct trigger visibility for its family;
- stage containment and horizontal overflow;
- close and reopen behavior;
- readable surface width and stable trigger-to-surface placement.
