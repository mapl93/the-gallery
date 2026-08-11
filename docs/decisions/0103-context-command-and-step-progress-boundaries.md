# 0103. Context Command And Step Progress Boundaries

Status: Accepted

Date: 2026-07-14

## Context

Batch 18 refines the next dependency-safe Layout components. Context Menu had
the correct Dropdown Menu dependency but only toggled a visually positioned
surface. Command Palette declared Modal and Combobox/Listbox semantics while
duplicating dialog chrome and leaving focus, IME, dismissal, and active-
descendant behavior incomplete. Steps rendered a progress sequence but used an
unsupported `aria-orientation` on an ordered list, hid completion meaning, and
used physical geometry that did not survive RTL or long content.

Existing contracts already keep their root property surface deliberately small:
Context Menu owns `open`, Command Palette owns `open` and `query`, and Steps owns
`orientation`. The refinement must complete those meanings without promoting
coordinates, placement, command algorithms, workflow routing, or private visual
geometry into neutral cross-target API.

## Decision

- Context Menu is a context-invoked list of immediate commands and consumes the
  canonical Dropdown Menu group, label, item, icon, shortcut, separator,
  disabled, danger, roving-focus, and typeahead contracts.
- Context Menu supports pointer `contextmenu`, Shift+F10, and the platform Menu
  key. Pointer opening uses the invocation point; keyboard opening uses invoker
  geometry. The target clamps the surface, moves focus into it, dismisses on
  selection/Escape/outside interaction/scroll/resize, and restores focus when
  appropriate.
- Context Menu keeps `open` as its only scalar property. Coordinates, placement,
  collision, top-layer/portal host, focus restoration, long-press policy, and
  command execution are target services. Checkable/radio items, submenus, and
  navigation remain outside v1.
- Command Palette is a canonical Modal composition containing an editable
  Combobox and named Listbox. It reuses Modal overlay/panel and the inherited
  Close Button instead of defining parallel dialog chrome.
- Opening Command Palette focuses the named input. DOM focus stays in the input
  while `aria-activedescendant` identifies one enabled option; options have
  `tabindex="-1"` and contain no nested interactive descendants. Arrows,
  Home/End, Enter, pointer selection, Escape, backdrop policy, visible close,
  Tab containment, restoration, and IME composition follow the accepted Modal,
  Combobox, and Listbox boundaries.
- Command Palette keeps `open` and `query` as scalar properties. Command IDs,
  labels, keywords, groups, disabled state, icons, shortcuts, inventory,
  filtering, ranking, async providers, virtualization, announcements, routing,
  execution, and global shortcut scope are target/application data and behavior.
- Shortcut hints are shown only when real. A target shortcut must not capture an
  unrelated editable context or override browser/platform-reserved behavior.
- Steps v1 is a passive, labelled `<ol>` whose `<li>` items preserve source order
  in horizontal, vertical, LTR, and RTL modes. It is not a router, validator,
  tablist, percentage progress bar, or workflow state machine.
- At most one current item uses `aria-current="step"`. Completed meaning is
  available in text as well as a decorative check and color. The ordinary list
  receives no `aria-orientation`; orientation changes only visual layout.
- Steps keeps `orientation` as its only scalar property. Step count, labels,
  descriptions, numbers, and per-item states are ordered consumer content/data.
  Interactive workflow navigation composes canonical Link/Button with target
  routing and validation rather than changing passive Steps semantics.
- `.steps__title`, `.steps__description`, and `.steps__item--completed` are the
  canonical names. `.steps__label` and `.steps__item--done` remain temporary CSS
  compatibility aliases and create no second public semantic state.
- Exhibit and Studio use one renderer and one fixture for each component.
  Site-only CSS may contain the preview but must not restyle canonical menu,
  dialog, command-item, or step parts.
- All three contracts remain `pilot`. Automated readiness never implies a
  `stable` promotion without explicit human review.

## Performance

Batch 18 adds no neutral JavaScript, provider, observer, timer, request, asset,
or continuous measurement. Deterministic level-9 gzip without file metadata
measures:

- Layout CSS: `6,357 B` against the permanent `4.8 KiB` family ceiling, a
  documented `1,442 B` exception.
- Shared neutral runtime: `10,321 B` against the permanent `8 KiB` ceiling,
  unchanged and covered by the existing runtime exception.
- Neutral Web component CSS: `62,893 B` against the `64 KiB` ceiling, leaving
  `2,643 B` headroom.

Relative to the Batch 18 baseline, Layout adds `512 B`, the complete Web
component bundle adds `495 B`, and neutral runtime source adds `0 B`. The Layout
exception records bounded/contextual surfaces, canonical modal/command parts,
logical Steps geometry, internal scrolling, special-media treatment, and
semantic typography. It does not reset the permanent ceiling.

## Consequences

- Neutral Web and copied target CSS receive the canonical refinements; production
  Web, Shopify, React, Angular, SwiftUI, and Compose adapters retain target-native
  positioning, focus, overlay, command, and workflow responsibilities.
- Shopify can render passive Steps with the shared class contract. Dedicated
  Context Menu and Command Palette Liquid/runtime adapters remain planned.
- Figma maps anatomy, states, orientation, and existing tokens but owns no DOM
  roles, focus lifecycle, collision engine, command registry, or workflow router.
- Context Menu remains an alternative command surface, never the only path to a
  critical action. Large command inventories should use Command Palette or
  another explicit information architecture rather than widening Context Menu.
- Exact menu/panel/indicator geometry, density, radius, shadow, overlay balance,
  completed icon, long-copy policy, and target service choices remain human or
  target decisions documented in `docs/OPEN-QUESTIONS.md`.
