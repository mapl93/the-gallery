# 0105. Native Site-Navigation Disclosure And Mobile Destination List

Status: Accepted

Date: 2026-07-14

## Context

Batch 20 refines the final dependency-safe Global navigation surfaces before the
program moves into commerce primitives. Mega Menu already exposed a controlled
multi-column layer, but its generic collections omitted list structure, its
trigger lifecycle was not evidenced, its viewport gutter compressed constrained
containers, and its physical layer/focus/special-color rules were incomplete.
Bottom Navigation already exposed native links and a safe-area edge, but lacked a
native list, relied on color for current state, duplicated count meaning, and
mixed target route policy with reusable presentation.

Existing ADR 0086 reserves cross-surface navigation inventory, controller
services, breakpoint policy, overlay coordination, route truth, and commerce
state for targets. This batch needs a complete neutral semantic boundary without
selecting those still-open product and architecture choices.

## Decision

- Mega Menu v1 is a non-modal site-navigation disclosure, not an application
  command menu. Its content uses a labelled native `nav`, visible-heading-
  labelled groups, `ul > li > a` destinations, and optional promo and featured
  destination links.
- Mega Menu does not use `menu`, `menubar`, `menuitem`, roving focus, arrow-key
  navigation, or a focus trap. Native Link Tab/Shift+Tab/Enter behavior remains
  intact.
- An external target-owned canonical Button controls Mega Menu through
  synchronized `aria-expanded`, `aria-controls`, `aria-hidden`, `inert`, and
  visual state. The target owns activation policy, pointer intent, Escape/
  outside dismissal, focus entry/restoration when moved, mutual exclusion, and
  mobile substitution.
- Mega Menu retains `label`, controlled `open`, `columns`, `promo`, and
  `featured`. Default, Promo, and Featured contract labels are composition
  presets, not modifier classes or mutually exclusive semantic modes. Records,
  ordering, routes, media, current state, and analytics remain target data.
- Promo and featured media are decorative when visible destination text already
  names the link. Current destinations use `aria-current="page"` and a non-color
  text cue. Canonical CSS owns container response, bounded block overflow,
  logical geometry, visible focus, reduced motion, and forced colors.
- Bottom Navigation v1 is a labelled `nav > ul > li > a` destination list. It is
  not Tabs, a toolbar, an application menu, a panel controller, or a roving-focus
  composite.
- Every Bottom Navigation destination has a visible localized label and an
  optional decorative icon. The target router owns zero unresolved or exactly
  one resolved `aria-current="page"`; current treatment uses surface plus weight
  and underline rather than color alone.
- An optional compact count is navigation metadata, not canonical Badge
  composition. The target formats the visual value, includes equivalent meaning
  in the containing link name, hides the visual duplicate from accessible-name
  calculation, and independently chooses whether dynamic changes need an
  announcement.
- Bottom Navigation retains only required `label` and `items`. The target owns
  destination inventory/order, route matching, count services, breakpoint and
  fixed/sticky policy, body offset, keyboard-viewport coordination, and global
  badge synchronization.
- Exhibit and Studio use the same renderer, fixture, properties, and canonical
  implementation for both components. Site CSS supplies only preview shell,
  media art, and fixed-component containment.
- Neither component adds neutral JavaScript. Both contracts remain `pilot`; no
  automated result promotes either to `stable` without explicit human review.

## Performance

Batch 20 adds no neutral listener, router, provider, observer, timer, request,
pointer-intent engine, or count subscription. The Studio renderer demonstrates a
target-local disclosure lifecycle without changing `components/js/theme.js`.
Deterministic level-9 gzip without file metadata measures:

- Global CSS: `4,470 B` against the permanent `3.7 KiB` family ceiling, a
  documented `681 B` exception.
- Shared neutral runtime: `10,321 B` against the permanent `8 KiB` ceiling,
  unchanged and covered by the existing runtime exception.
- Neutral Web component CSS: `63,981 B` against the `64 KiB` ceiling, leaving
  `1,555 B` headroom.

Relative to the Batch 20 baseline, Global adds `442 B`, the complete Web
component bundle adds `474 B`, and neutral runtime source adds `0 B`. The Global
exception records native list anatomy, immediate hidden-focus safety,
container/logical geometry, touch/current/count treatment, and special-media
fallbacks. It does not reset the permanent ceiling.

## Consequences

- Neutral Web and copied targets receive target-agnostic CSS and semantic
  contracts; each target remains responsible for native routing and disclosure
  services.
- Shopify can map nested linklists and promo/featured blocks to Mega Menu and a
  merchant destination list plus cart/customer services to Bottom Navigation.
  Dedicated Liquid schemas, body offset, breakpoint policy, and controller code
  remain planned.
- Framework adapters may expose controlled disclosure wrappers and router-
  derived links without changing the neutral properties. Native targets should
  use platform Navigation Bar/Tab Bar equivalents rather than reproduce Web DOM
  semantics.
- Figma maps anatomy, composition presets, open/current/focus/count states,
  narrow/wide layouts, and existing tokens. It does not own routes, focus,
  dismissal, announcements, or provider data.
- Click/hover/focus policy, destination inventory, body offset, dynamic badge
  announcements, private on-promo/on-count token debt, and the exact visual
  direction remain explicit target or human-review decisions under
  `docs/OPEN-QUESTIONS.md`.
