# 0350. Certificate And Masonry Gallery Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Twenty-nine source roles complete 45 Certificate and 29 Masonry Gallery public
values under the owner's broad visual-customization direction (ADR 0293).
This supersedes the private visual-candidate treatment in ADRs 0125/0127;
record semantics, natural media, source order and activation ownership remain.

Certificate exposes maximum width, shared frame/rule thickness, rule length,
verification media size, tracking, padding share/minimum/maximum factors,
label/attribution/detail/signature/verification rhythm, attribution accent
share, underline and focus. Border/focus dimensions alias existing primitives;
rem/em values retain their original relative-unit semantics. Padding's middle
percentage remains relative to the containing block, with bounds tied to the
shared Element gap. Accent share weights the existing accent/primary palette
without reducing opacity. The QR/media region remains square and contained.

Certificate's compact/wide metadata counts are public tokens starting at one
and two. Its existing 23rem content-box query only selects the active private
value; a single grid formula consumes it. Counts are positive integers, bounded
below by one without an invented neutral upper limit. The query threshold,
native article/dl structure, target record and verification service stay outside
the visual-token API. No authenticity guarantee is inferred from appearance.

Masonry Gallery exposes preferred column width (13rem), maximum count (three),
vertical item-gap factor, caption padding factor and title/price gap, focus and
optional enabled-native-root media scale (1.02). Natural media and source flow
remain unchanged. Column count is a maximum, not a promise that every column
will be occupied; column width is preferred and may shrink when space is short.
The initial caption gap of zero aliases dimension.0 rather than an invented
spacing scale. Caption type/easing and existing shared layout tokens are
available in Studio as well.

Disabled native pieces and anchors without a destination retain visible
captions and do not receive interactive media emphasis. Enabled native roots
keep paired hover/focus disclosure. The reduced-motion selectors carry the
same specificity so a customized scale cannot override transform suppression.
ARIA-disabled activation prevention remains target-owned; no disabled property,
activation mode, Lightbox dependency or runtime is introduced. Transparent MDX
placeholder media uses empty alt instead of claiming to depict specific works.

## Technical basis

The [CSS Multi-column specification](https://www.w3.org/TR/css-multicol-1/#the-number-and-width-of-columns)
defines the relationship between preferred width, count and used columns.
[CSS Values](https://www.w3.org/TR/css-values-4/#calc-range) defines integer
calculation handling. These are Web layout requirements, not prescriptions for
the initial Gallery density or target performance limits.

## Acceptance

Compare defaults in both themes and four widths, complete/minimal records and
captioned/plain galleries. Exercise independent visual controls, container
counts, native links, missing verification media, passive/enabled/disabled
artwork, RTL, focus/forced colors and reduced motion. Verify Studio editing,
reset and Exhibit, actual CLI consumption and generated adapters. Close the
single browser and owned server after each phase and confirm zero test
processes. Both components remain pilot; Shopify remote follows Web completion.
