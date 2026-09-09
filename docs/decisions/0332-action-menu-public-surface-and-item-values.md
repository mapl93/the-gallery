# 0332. Action Menu Public Surface And Item Values

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 for Dropdown Menu and Context Menu while preserving their
semantic boundaries in ADR 0102/0103. Thirty new source tokens expose meaningful
visual values: Dropdown owns eight surface values and fifteen item/label values;
Context owns seven surface values and consumes the same Dropdown item tokens.
Both reuse semibold label weight and bold forced-color danger weight. There are
46/45 public roles respectively; no copied value definitions or new size modes.

Surface defaults retain 11.25rem minimum width, 20rem maximum width/height,
0.25rem padding, 1px border, upward 4px entrance displacement and total viewport
gutter factor 2. Dropdown also exposes its existing 0.25rem trigger gap. Width
is intrinsic within bounds; native minimum wins contradictory minimum/maximum
settings. Height overflow remains scrollable. Context's coordinate placement and
Dropdown's anchoring are target responsibilities, separate from visual tokens.

Shared item roles retain height 2.5rem, gap factor 0.5, block/inline padding factors
0.25/0.75, transparent border 1px, focus width/inset 2px, icon size 1rem, shortcut
extra gap factor 0.5, separator width/gap 1px/0.25, label padding factors
0.375/0.75/0.25 and tracking 0.05em. Coarse minimum uses max(item minimum, shared
touch target), preserving default density and any deliberately larger custom row.
Danger retains the existing 55% error/45% primary text blend; both inputs are
named explicitly. Uppercase labels and system-color forced treatment remain
semantic presentation policy, not invented string tokens.

Remove itemDanger/danger duplicates from state lists under ADR 0274. Dropdown's
existing itemVariant remains independent. Context inherits child variants from
its dependency; open remains its only scalar property. No submenus/checkable
items or action execution service is added.

Studio exposes all declared appearance and geometry roles, removes fixed menu
widths and uses available-container bounds. Dropdown's preview reserves content
height in local flow. Context's local area grows with the selected maximum height
and re-clamps once after token edits. Its existing 8px preview inset is represented
once as a private CSS value read by the local controller; it is not a technical
platform requirement or general size cap. The temporary frame cancels on cleanup.
Ignore scroll events originating inside Context Menu when handling viewport
dismissal. The former capture listener closed the menu when navigating or
scrolling its own overflow, making a small maximum-height token unusable.
Outside scroll and viewport resize still dismiss and restore focus.
Remove the unrelated 18px Button icon override so the trigger follows Button.
Exhibit Context keeps local centering while respecting the entrance token and
reserving enough height. No target service enters canonical neutral CSS.

## Acceptance

Compare defaults across theme/viewport matrices; verify independent surface and
shared item geometry, bounds/scroll, focus and larger coarse rows, RTL long text,
forced colors and reduced motion. Verify Studio reset/controls, variant/state
independence, keyboard/pointer invocation, disabled non-activation, selection,
Tab exit, Escape, clamping and dismissal. Validate source, contracts, Studio,
Exhibit, adapters and installed CLI dependencies. Both remain pilot; no remote
Shopify upload or native-platform certification is implied.
