# 0330. Accordion And Tabs Public Geometry And Focus

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 while preserving the semantic/runtime boundaries of ADR 0099.
Eleven Accordion and eight Tabs source roles expose meaningful geometry. No new
size axis, provider, source format, platform or behavior model is introduced.

Accordion exposes outer/item divider widths (1px each), icon size (1.25em),
trigger gap/block-padding/inline-padding factors (0.5/0.6667/1), content top/inline/
bottom padding factors (0/1/0.6667), focus width and positive inset (2px each).
Trigger weight reuses semibold. The shared spacing base retains its responsive
values; the existing 0.6667 approximation is preserved. Content spacing can change
independently from the trigger without adding external margins or changing anatomy.

Tabs exposes shared track/indicator thickness (2px), tab block/inline padding
factors (0.5/1), panel block/inline padding factors (1/0), shared focus width (2px),
tab focus inset (2px) and panel focus offset (2px). Weight reuses medium. The
track uses a token-sized linear-gradient inside the scrollable list and tabs
use zero negative margin. The former negative margin placed the selected border
outside the scroll clip: it had a computed accent color but was invisible. The
new track keeps default outer geometry and displays the selected border on the
same line. Forced colors suppress gradients, so a system-color track border is
used there; its width adds to list height in that mode, keeping the selection
border inside the clip.
Selected text retains the existing 70% accent/30% primary blend; Studio names both
inputs and distinguishes the accent-colored indicator from the resulting text.

Shared typography, surface/color, minimum target, radius and motion roles are
preserved. Positive focus-inset dimensions are negated by CSS to retain inward
focus; panel offset remains outward. Decorative 180-degree indicator rotation,
resets, full available width, hidden panels, horizontal tablist scrolling,
selection/disabled/activation and parent external layout remain mechanics or
semantic behavior, not additional tokens.

Tabs Studio routes selection from click, automatic focus, manual activation and
its Details-selected inspector control through the same local update. Previously
clicking Overview or Shipping changed the view but left the boolean inspector
stale. Removing the effect that mapped every false value back to Overview also
preserves a real Shipping selection; the boolean represents only the documented
Details item, not a new global selection-index property.

Both remain pilot. Native details/summary may use the existing CSS support; custom
Button and Tabs adapters still implement the target focus/ARIA/value requirements.
Copy-and-own adoption includes new tokens and updated CSS rather than silently
updating consumer copies. No global component provider or target delivery implied.

## Acceptance

Compare default geometry across eight matrices and representative closed/open,
selected/disabled states. Verify independent borders/padding/weights/icon/focus,
minimum targets, long/narrow content, native and custom disclosure, Tab/keyboard
selection and RTL, forced colors and reduced motion. Verify Studio/reset,
Exhibit, existing Accordion compositions and source/adapters/CLI validation.

## Technical Reference

[CSS Color Adjustment Level 1, forced-color properties](https://www.w3.org/TR/css-color-adjust-1/#forced-colors-properties)
defines suppression of non-URL background images in forced colors; the track
fallback preserves that user preference rather than opting out.
