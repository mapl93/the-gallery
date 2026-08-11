# 0106. Passive Badge Status And Target-Owned Tag Removal

Status: Accepted

Date: 2026-07-14

## Context

Batch 21 refines Badge and Tag before their first dependent field, Tags Input.
Both primitives already had narrow semantic contracts, but Badge could overflow
with exceptional content and lacked semantic typography and forced-color
evidence. Tag allowed an unnamed remove button, exposed only a 20px pointer
target, and its shared demo removed the focused control without choosing a
surviving focus destination.

Existing ADR 0058 establishes Badge passivity, explicit live-status opt-in, Tag
removal ownership, native Button activation, and the fixed Lucide X geometry.
This decision completes the review-ready boundary without broadening either
component into a general chip system or pre-empting Tags Input.

## Decision

- Badge v1 is a passive, text-first status or metadata label. The default root
  is an ordinary non-focusable `span` with no widget or live-region role.
- `announceChanges=true` maps Badge to `role="status"` only when an existing
  instance will report a dynamic result. The target owns update timing and
  vocabulary. Badge does not move focus or duplicate the role's implicit polite
  and atomic live-region semantics.
- Badge retains only required `label`, semantic `variant` (`info`, `success`,
  `warning`, `error`), and optional `announceChanges`. Arbitrary color, radius,
  size, weight, casing, icon, counter, dot, ribbon, and progress controls are not
  v1 public API.
- Badge labels should remain concise, but exceptional long, unbroken, localized,
  and zoomed content wraps within its container rather than overflowing or
  being silently truncated.
- Tag v1 is a passive value label with one optional native
  `button type="button"` remove action. The full Tag is not a Button, Link,
  toggle, selectable chip, editable field, or application-managed collection.
- `removeLabel` is conditionally required and non-empty whenever
  `removeAction` is present. A target that cannot provide a contextual accessible
  name omits the action and renders a passive Tag.
- The remove action preserves native Tab/Shift+Tab/Enter/Space and disabled
  behavior, visible focus, and a minimum 24 by 24 CSS-pixel pointer target. The
  X remains a decorative fixed CSS mask using accepted Lucide geometry with no
  runtime icon dependency.
- Activation requests removal only. The target owns data mutation, DOM
  reconciliation, pending/error policy, the next surviving focus destination,
  and any localized status announcement. Tag does not handle Backspace/Delete,
  selection, duplicate policy, ordering, serialization, or input focus.
- Tags Input may compose Tag later and owns all collection/field semantics. It
  must not duplicate Tag markup or silently change this primitive's public API.
- Exhibit and Studio continue to use one renderer, fixture, property model, and
  canonical implementation. The shared fixture demonstrates a target-owned
  status result and explicit focus destination, but that lifecycle is not
  neutral component runtime or a Tag dependency.
- Both contracts remain `pilot`. Automated checks and this accepted boundary do
  not promote either component to `stable` without explicit human review.

## Performance

Neither component adds neutral JavaScript, a listener, observer, timer, request,
state store, measurement loop, or animation. Deterministic level-9 gzip without
file metadata measures:

- Primitives CSS: `10,356 B` against the permanent `10.3 KiB` ceiling, leaving
  `191 B` headroom.
- Shared neutral runtime: `10,321 B` against the permanent `8 KiB` ceiling,
  unchanged and covered by the existing documented exception.
- Neutral Web component CSS: `64,070 B` against the `64 KiB` ceiling, leaving
  `1,466 B` headroom.

Relative to the Batch 21 baseline, Primitives adds `88 B`, the complete Web
component bundle adds `89 B`, and neutral runtime adds `0 B`. The CSS delta pays
for content containment, system-color fallbacks, the 24px action floor, logical
geometry, and fine-pointer hover gating; it does not reset a budget.

## Consequences

- Neutral Web and copied Shopify CSS share the same bounded passive/status and
  named-removal presentation. Shopify may use a target-native Link when removal
  is navigation, as already allowed by ADR 0058.
- Framework adapters expose stateless Badge presentation and a controlled Tag
  removal request. They do not import Studio's React state or hardcoded fixture
  announcement.
- Figma maps four Badge semantic variants and Tag passive/removable/disabled/
  focus states. Live-region timing, DOM removal, focus, and target data remain
  outside presentation metadata.
- SwiftUI and Compose adapters should use platform-native passive labels and
  removal controls while preserving visible meaning and target-owned state.
- Badge casing/density/radius/color strength and Tag surface/radius/spacing/X
  weight remain explicit human visual-review risks.
- Selectable/clickable chips, Badge counts/dots/icons, Tag link/edit/drag modes,
  and Tags Input collection behavior require separate evidence and decisions.
