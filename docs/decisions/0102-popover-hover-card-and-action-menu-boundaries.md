# 0102. Popover, Hover Card, And Action Menu Boundaries

Status: Accepted

Date: 2026-07-14

## Context

Batch 17 refined the next dependency-safe floating surfaces after the global
navigation batch. Popover forced dialog semantics onto passive content and did
not document the native HTML Popover mapping. Hover Card depended on site-only
typography, lacked a dismissible interest cycle, and moved off-canvas in RTL.
Dropdown Menu declared ARIA menu roles without a complete composite keyboard,
focus, group, disabled, or dismissal model.

ADR 0072 already limits their semantic Studio properties: Popover owns `open`,
Hover Card exposes none, and Dropdown Menu owns `open` plus item-level
`itemVariant`. The remaining work is to make those accepted boundaries complete
and target-translatable without promoting placement, portal, collision, delay,
provider, or framework concerns into neutral source.

## Decision

- Popover is a non-modal, trigger-owned floating surface whose semantics derive
  from its content. It does not receive `role="dialog"` or
  `aria-haspopup="dialog"` by default.
- Popover keeps `open` as its only semantic property. Controlled and
  uncontrolled targets are both valid when they maintain one authoritative
  state, synchronize the trigger relationship, and emit an equivalent open-
  change/dismiss signal.
- Portable Web targets may use `.popover--open`. Capable Web adapters may map the
  same state to `popover="auto"`, `popovertarget`, and `:popover-open`. Native
  top-layer use is progressive target policy, not a cross-target DOM guarantee.
- Popover preserves natural Tab order and does not trap focus or inert the page.
  Targets own repeated-trigger toggle, Escape/outside dismissal, focus entry for
  genuinely interactive content, and restoration when dismissal would otherwise
  lose focus.
- Popover title and content use existing semantic typography. Surface padding,
  bounds, arrow geometry, offsets, placement, collision padding, portal host and
  autofocus target remain private or target-owned.
- Hover Card is a passive supplemental preview of the destination behind one
  native link. The destination remains complete without the preview; the surface
  contains no required instruction, form, destructive command, or focus trap.
- Hover Card adds stable optional title and description anatomy but no public
  scalar property. Hover/focus interest, delays, collision and portal placement
  remain target/platform state under ADR 0072.
- Hover Card must satisfy the WCAG hover/focus-content boundary: it is keyboard
  revealable, pointer-hoverable, persistent while trigger or surface retains
  interest, and temporarily dismissible with Escape. `.hover-card--dismissed`
  is a target state for the current interest cycle, not a public semantic value;
  leaving or blurring the region resets it.
- Hover Card uses a direction-aware private translation so logical centering
  remains correct in LTR and RTL. This is implementation geometry, not a new
  placement property or token.
- Dropdown Menu is a Button-triggered vertical list of immediate commands. It is
  not primary navigation, a Select/Combobox, arbitrary Popover content, or a
  persistent toolbar.
- Dropdown Menu keeps `open` and per-item `itemVariant` (`default | danger`) as
  its only semantic properties. Items, groups, labels, icons, shortcut hints and
  separators are collection/slot composition.
- A target implementation uses a named `role="menu"`, optional labelled
  `role="group"` wrappers, `role="separator"`, and focusable
  `role="menuitem"` commands. Native, ARIA and adapter data-disabled mappings
  share visual state and never activate unavailable commands.
- Dropdown Menu uses one roving `tabindex`. Enter/Space or optional ArrowDown/
  ArrowUp opening moves focus into the menu; ArrowUp/Down, Home/End and printable
  typeahead navigate; Escape closes and restores the trigger; Tab/Shift+Tab close
  and continue document order; selection and outside interaction dismiss.
- Disabled items may participate in composite focus according to target policy,
  but never emit selection. Checkable items, radio groups, submenus and persistent
  navigation remain outside v1 until explicitly accepted.
- Placement, alignment, collision, portal, modal behavior and command execution
  remain target services for Popover and Dropdown Menu. Neutral CSS performs no
  measurement loop and adds no production JavaScript.
- Exhibit and Studio use one `FloatingMenuStudio` renderer, one initial fixture
  and canonical classes. Its React state demonstrates target behavior only; it
  is not a framework dependency or neutral runtime default.
- All three contracts remain `pilot`. Automated readiness does not promote them
  to `stable` without explicit human review.

## Performance

Batch 17 adds no neutral JavaScript, observer, timer, request, asset, provider or
continuous layout measurement. Deterministic level-9 gzip without file metadata
measures:

- Layout CSS: `5,845 B` against the permanent `4.8 KiB` family ceiling, a
  documented `930 B` exception.
- Shared neutral runtime: `10,321 B` against the permanent `8 KiB` ceiling,
  unchanged and covered by the existing runtime exception.
- Neutral Web component CSS: `62,398 B` against the `64 KiB` ceiling, leaving
  `3,138 B` headroom.

Relative to the Batch 17 baseline, Layout adds `588 B`, the complete Web
component bundle adds `617 B`, and neutral runtime source adds `0 B`. The Layout
exception records bounded logical geometry, canonical typography, direction-
aware Hover Card placement, menu groups/focus/disabled/danger states, touch
targets, reduced motion and forced-color boundaries. It does not reset the
permanent budget.

## Consequences

- Neutral Web, Webflow and Shopify receive byte-identical Layout CSS from the
  repository source; their markup/runtime layers retain target-native lifecycle
  and positioning responsibilities.
- React and Angular adapters may expose familiar controlled/uncontrolled events
  and positioning services, but must preserve the same semantic state owners and
  native focus/command contracts.
- Shopify may use native Popover capabilities or a bounded theme controller and
  should prefer its host action-list/menu semantics where available; dedicated
  Liquid/runtime adapters remain planned.
- Figma maps anatomy, states and existing tokens but owns no DOM roles, focus
  lifecycle, collision engine or provider behavior.
- SwiftUI and Compose map to native popover, hover/preview and menu facilities
  where semantically equivalent instead of copying Web DOM structure.
- Exact width, density, padding, radius, shadow, arrow treatment, danger balance,
  placement/collision service and Hover Card timing remain human or target
  decisions. Checkable/submenu breadth remains explicit future product scope.
