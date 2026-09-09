# 0307. Popup Field Visual Customization

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with Combobox and Date Picker. Add 39 public visual decisions
in the existing component token layer: 14 for Combobox and 25 for Date Picker.
Keep shared Input padding, border/focus geometry, 46px control minimum height,
typography, state colors, radius, shadow, opacity, z-index and timing roles.

Combobox exposes its preferred width, popup width/height/inset/gap/padding/border,
option dimensions, check icon, selected weight and empty-message padding. The
owner chose to remove the Studio-only search icon instead of adding an icon slot
to the canonical component. The field now displays its canonical symmetric
padding. Its optional selected-option check remains existing anatomy.

Date Picker exposes its preferred width, trigger geometry, calendar surface
geometry, header/navigation spacing, compact measures, weekday spacing, day
geometry and emphasized weights. Trigger clearance is derived from its inline
inset, size and text gap; vertical centering is private. The defaults preserve
the previous 48px trailing field padding and the 32px trigger. A calendar's seven
columns and six weeks remain behavior, not token values. The 300px compact
container threshold remains a structural policy; its resulting measures are
editable. Minimum day size, padding and gaps must fit the chosen calendar width.

Field Wrapper supplies labels and feedback. Its 100% control width becomes a
zero-specificity fallback, so a canonical component's own width wins regardless
of stylesheet order. Margin removal and containment remain wrapper-owned.
Studio-only width and icon overrides are removed. Canonical Date Picker CSS now
owns its navigation SVG size, previously styled only in Studio.

The existing 4px closed-popup translation remains implementation. Both native
enhancers remove closed popups from layout with `hidden`; a standalone distance
control would imply an animation lifecycle the current adapters do not promise.
Public timing/curve controls still affect visible field, option and day feedback.
Private 60% default and 70% validation border mixes retain their public inputs.
Forced-colors system outlines remain accommodations; token overrides do not
certify accessibility.

## Behavior corrections within the existing contract

- Combobox ignores selection/navigation keys while an IME composition is active,
  both in the shared enhancer and the Studio renderer. This applies ADR 0094;
  no new search, remote-data or selection policy is introduced.
- Hidden authored options remain `display:none` despite the option flex layout.
- Selecting a date in Studio restores focus to the input. Readonly prevents an
  open calendar, including inspector-driven opening.

Native free text, local ISO dates, bounds, keyboard behavior and form ownership
remain as defined in ADR 0094. No new range, locale, time or filtering feature is
added. Contracts remain pilot. Web and Shopify outputs are generated from source;
hosted Shopify verification remains a later delivery gate.
