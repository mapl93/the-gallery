# 0347. Filter Panel And Pagination Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Filter Panel exposes twelve scoped source roles around its existing Drawer/form
composition: adjacent width, panel/group border widths, root gap/padding,
active-tag gap, group padding, legend gap/weight, choice gap, price-field gap and
manual-action gap. Alongside explicit body type and the existing shared roles,
these complete nineteen public values. The 15rem width remains a component
value; 1px borders alias the existing primitive, legend weight aliases semibold,
and spacing factors continue to multiply the system Element gap. The footer gap
starts at zero, preserving existing placement without requiring CSS edits to
separate actions. No new primitive scale or source mode is introduced.

This supersedes ADR 0250's private-width detail, under the owner's broader public
visual-token direction. Adjacent width is independent of Drawer width. Drawer
retains surface, padding, motion and modal geometry; Button, Input, Checkbox,
Radio and Tag keep their respective APIs. The existing surface threshold and
single-form commitment model are unchanged. Panel width does not request a new
commit policy or surface lifecycle. Filter Panel remains pilot, contract 0.3.2.

Pagination adds five source roles for item gap, page padding, ellipsis padding,
icon size and current weight, aliasing dimensions 4/12/8/18 and semibold. Sixteen
public values include existing palette, radius, control minimum and body type.
The owner explicitly selected **18px directional icons in both Web and Shopify**.
Canonical CSS owns their size and overrides target SVG presentation dimensions;
remove Studio's competing 18px rule. Icon paths remain target-provided: Lucide is
still confined to the site. Shopify's previous 16px size deliberately becomes
18px, without changing icon paths or localized names.

Pagination keeps the existing shared control minimum, but uses minimum height
instead of fixed height so larger text can grow. Default geometry is preserved.
Link retains focus, underline and motion; target URLs, finite page-window
calculation, boundary omission and current state remain unchanged. No new JS,
variant or source mode. Pagination remains pilot, contract 0.2.2.

## Acceptance

Preserve initial geometry/type/palette across widths/themes. Exercise independent
spacing/width/border/type tokens, native no-JS forms, shared form identity across
panel/Drawer, immediate request versus manual submit/reset, Escape/focus return,
RTL and Studio's controlled commit/cancel path. Verify Pagination icon sizing,
text growth, wrap, native links/focus, first/last omission, reset and Exhibit.
Validate source/catalogue, docs, contracts, Studio, actual CLI and both adapters.
Use one reusable browser session/tab per evidence phase, cleanup even on failure,
and confirm no test browser processes survive. Remote Shopify remains separate.
