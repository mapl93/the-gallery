# ADR 0404: Before / After, Marquee and Collage Visual Values

Status: Accepted

Date: 2026-09-13

Expose 13 Before / After roles for divider/thumb/media measures and independent
label insets, padding, tracking and paired theme-aware colors; ten Marquee roles
for type, rules and spacing factors; and 19 Collage roles for measure, row sizes,
columns, feature spans, caption treatment and native-link focus geometry.
Existing defaults and container boundaries remain. Collage feature column spans
cannot exceed the active explicit column count. Caption padding stays em-based.

Native Slider owns Before / After value, focus and keyboard. Marquee pace retains
its distance-normalized semantic presets and private measured duration; separators
remain decorative content. Source order, media and activation remain target-owned.
Forced-color system boundaries remain intact. These public values feed the same
contract inventory in Studio and Exhibit; Web and Shopify regenerate from source.
Existing consumers adopt these changes explicitly, including migration of any
local inverse-color override to the corresponding label/caption text role.
