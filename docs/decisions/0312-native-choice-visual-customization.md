# 0312. Native Choice Visual Customization

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with Color Picker / Swatch and Segmented Control. Add 23 source
decisions to the existing component layer, retaining shared color, typography,
radius, motion and field roles. The contract public inventory is exposed in Studio
and Exhibit's existing metadata-derived reference. Both contracts remain pilot.

| Component | New decisions | Existing defaults |
| --- | --- | --- |
| Color Picker | Legend gap/weight, option row/column gaps, name gap, three fill sizes, minimum target, border width, selected ring gap/width, check size, focus width/offset, name maximum width | 8px/600, 8/12px, 4px, 24/32/40px, 44px, 2px, 2/2px, 18px, 4/4px, 18ch |
| Segmented Control | Surface padding, segment gap, surface border, option horizontal/vertical padding, option weight, inner focus width | 2px, 2px, 1px, 16/8px, 500, 2px |

Color names explicitly consume Body weight, preventing incidental parent weight
inheritance. Segmented legends use Input label weight and label gap. A native
fieldset's legend sits outside its anonymous content box: the old root grid gap
did not separate legend from options. Margin on the legend makes the intended
4px gap real and editable. Hovered option text follows the active validation family.

Segment inner radius derives from outer radius minus surface padding, clamped at
zero. Inner focus offset derives from its width. The existing 44px activation
floor from ADRs 0095/0096 remains an explicit component contract, not a new
universal target requirement. Color Picker's target also accommodates its fill.
The existing 320px container layout rule remains CSS; no viewport modes or size
variants are added. These decisions concern visual customization, not target
performance limits; ADR 0310 remains authoritative for the latter.

Default border and validation color mixes remain private, documented derivations
from editable inputs (60% default border, 70% validation border, 55% validation
label mixed with primary text). Authored swatch fills are option/product data.
Icon paths/strokes, native-input hiding, centering, wrapping, border style and
forced-color system colors remain implementation mechanics.

In forced colors, the selected swatch uses a real outline because the browser may
suppress box shadows. Focus has its own wider outline; the selected border stays
visible. Normal-theme selected rings retain their existing geometry and colors.

## Native and documentation ownership

Same-name native radios continue to own static HTML selection, events, validity,
submission and reset. No component runtime is added. Studio's controlled fixture
now handles the inspector's first-option toggle directly; a native selection no
longer triggers an effect that coerces a third/fourth choice to the second option.
Renaming the first submitted value updates selection only when it is selected.

## Adoption and acceptance

Generate Web and Shopify assets from source; adopt matching CSS and tokens together
in consumer-owned copies. Existing public aliases remain available. Consumers
depending on the old zero legend separation can set Input's label gap locally.
No existing consumer copy or hosted Shopify theme updates automatically.

Verify default rendering, non-default overrides and reset through the inspector,
third/fourth-option selection, native Arrow/Space and form lifecycle, clear/dark
themes, narrow containers, RTL, focus, reduced motion and forced colors. Exercise
Segmented Control in existing View Toggle/Filter Bar and inspector compositions.
Validation is bounded evidence, not human stability approval or full Shopify
editor certification. The batch checkpoint records actual results and limits.
