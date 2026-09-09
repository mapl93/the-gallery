# 0345. Collection Hero Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Promote seven useful visual roles from ADR 0119's former private geometry:
image minimum height, readable width, independent inline/block padding caps,
content-gap factor, count scale and title weight. The profile completes 23 public
values with explicit body type and all existing palette/type/spacing roles.

A cap is a fraction of the containing inline width, preserving the previous
12%/6% behavior; effective padding is still min(system spacing bound, width cap).
Defaults retain 300px image height, 680px readable width, 0.5 content gap, 0.875
count size and browser bold title. The new height/width are component decisions,
not new primitive scale entries. Title weight aliases the existing bold role.

Image presence remains the sole semantic authority for image-backed composition.
Theme-relative text/scrim pairing, centered alignment, cover crop, stacking,
context-ranked heading, alt ownership and forced-colors behavior remain as in
ADR 0119. There is no new fixed on-media palette or public focal-point API.
Count stays target-formatted content; reduced motion requires no Hero runtime.
Contract remains pilot. The owner selected token authority for all Collection
Grid densities; that change follows in a separate checkpoint.

## Acceptance

Preserve default geometry/type/palette with and without image across widths and
both themes. Verify padding bounds, content width, image minimum, count/heading
controls, wrapping, image semantics, forced colors, Studio/reset and Exhibit.
Validate source/catalogue, docs, contracts, Studio, actual CLI and adapters.
