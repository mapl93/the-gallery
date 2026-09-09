# 0328. Modal And Drawer Public Geometry And Backdrop

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with sixteen component geometry roles and one shared semantic
backdrop color. Preserve the accepted section hierarchy and target-owned modality
from ADRs 0068/0098. Reuse existing surface, shadow, radius, title typography,
semibold weight, scrim opacity, timing, curves and layer levels. No new token layer,
format, mode, component property or platform adapter is introduced.

Modal exposes maximum width (560px), viewport-height factor (0.85), entrance
offset (16px), divider width (1px), overlay-inset/body-padding factors (1),
header/footer padding and close-gap factors (0.75), and action-gap factor (0.5).
Drawer exposes preferred width (400px), divider width (1px), viewport-gap and
independent header/body/footer/close-gap factors (all 1). Each spacing factor
multiplies the existing responsive layout-element-gap input; defaults preserve
brand/viewport relationships. For example, base 32px × 0.75 remains 24px.

The shared semantic color.overlay starts at exact black, as both backdrops did.
It composes with the existing scrim opacity through color-mix; tint alpha and
scrim density multiply. This does not replace Lightbox's independent accepted
media-viewer treatment. No new primitive black is required for this one role.

Studio exposes every public Modal/Drawer role, including the previously omitted
motion/layer controls and Drawer backdrop easing. Its extra fixed width rules
are replaced with source widths and spacing. Drawer containment translates the
viewport bound to the local preview width in Studio and Exhibit; physical left
and right still belong to the canonical placement selectors. Modal no longer
subtracts a second, fixed 48px inside the canonical overlay padding.

Full dynamic Drawer height, complete offscreen displacement, Modal's available
area bound, scroll partition, pointer/visibility state mechanics, forced-color
system borders and composition of complete Button/Close Button stay structural.
They are not additional customization tokens. No background inertness, global
portal/stacking provider, resize/swipe interaction or maturity promotion is implied.
Copy-and-own consumers must adopt the updated tokens and CSS explicitly.

## Acceptance

Compare canonical default geometry and normalized backdrop colors across all eight
theme/viewport matrices. Verify independent geometry and tint/density controls,
long-content body scrolling, physical placement in RTL, closed/open visibility,
reduced motion, forced colors, composed consumers, Studio reset and local keyboard
behavior. Validate source/catalogue/contracts/Studio/docs/adapters and TypeScript.
Local demo focus behavior does not certify full-page modality or remote Shopify.
