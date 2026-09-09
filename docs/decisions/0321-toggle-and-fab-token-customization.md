# 0321. Toggle And FAB Token Customization

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with the accepted ADR 0062 behavior and existing component layer.
Toggle exposes nine additional source roles: content gap, two paddings, minimum
height, group gap, border width, focus width/offset and resting fill. Existing
semantic roles are reused, for 21 public controls. Minimum height remains a floor;
wrapping can increase height. Font size/family are semantic; surrounding inherited
weight/line-height stay context-owned. The system-color selected boundary is not
a brand token. Multiple target-owned content items consume the content gap.

FAB exposes eight additional source roles: control and icon size, physical bottom
and right offsets, hidden vertical displacement, border width and focus width/offset.
Existing color, shadow, radius, layer and motion roles are reused, for 21 controls.
Preserve fixed bottom-right anchoring, including RTL. Logical placement, safe-area
and fixed-chrome policy remain target-owned decisions; no policy is inferred from
an offset token. Studio uses absolute positioning only to contain the preview and
now preserves the canonical offsets instead of overwriting both with zero.

Studio focus simulation uses the same roles as native focus. All public roles
feed the shared Exhibit reference. Native toggle selection/normal Tab order and
controlled FAB visibility/action semantics remain independent of appearance.
No runtime behavior, new platform, token format, stability or package change.

## Acceptance

Compare installed-consumer default rendering across eight matrices. Exercise
non-default tokens, multiline content, exclusive selection and native keyboard,
forced colors, reduced motion, FAB hidden-focus exclusion, viewport offsets in
LTR/RTL, Studio editing and reset. Record the intentional preview inset change
separately from canonical parity. Regenerate Web/Shopify; do not upload a theme.
