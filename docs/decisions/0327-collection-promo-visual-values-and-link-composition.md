# 0327. Collection Promo Visual Values And Link Composition

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with thirteen source roles, existing shared type/spacing and
six applicable Link roles: 32 public visual roles for Collection Promo. Preserve
the accepted first-party passive article, optional complete CTA pair, target-owned
media and parent Grid placement from ADRs 0218/0248. No new platform implementation.

Expose wide/compact minimum heights, compact padding factor, overlay density,
eyebrow size factor/tracking/opacity/gap factor, CTA vertical/icon gap factors,
local underline offset/Hover width and icon size. Factors remain unitless inputs
to the existing shared typography/spacing bases: they preserve responsive brand
relationships instead of storing derived pixels independently per breakpoint.
For example, a 32px spacing base and 0.25 gap factor produce 8px. Compact padding
preserves the existing 0.6667 approximation; changing it is explicit customization.
The source compiler still uses ordinary dimensions/numbers, without expressions,
additional modes or a new source format.

The existing container query chooses which minimum-height/padding values apply.
Studio's optional Compact preview uses a complete shared Checkbox to change only
its fixture width, exercising the canonical query. It resets off and is not a
component size property. Span 2 leaves the state inventory in accordance with
ADR 0274; it remains a parent-owned placement variant with the same CSS hooks.

Primary text is also the media overlay color input; its Studio label identifies
both uses. Overlay opacity and inverse text apply with media. The local E6 Link
underline offset/Hover width use tokens while resting width, focus dimensions,
radius and timing reuse canonical Link roles. Contextual inherited focus/text
colors remain E6 responsibilities; irrelevant Link color/variant roles are not
copied into the E6 contract.

Uppercase remains the accepted eyebrow treatment. Local z-index 1, parent span,
media fit, final zero margins, passive overlay and icon mirroring remain composition
mechanics. Media source/focal point/crop policy stays target-owned. None is silently
converted into another semantic property or claimed as a new visual approval.

## Acceptance

Verify media/no-media and narrow/wide defaults across the theme/viewport matrices;
custom source factors/dimensions and shared roles through a CLI consumer and Studio;
Link geometry in resting/hover/focus; responsive Grid placement, long content, RTL,
forced colors, native semantics and omission rules. Verify reset and Exhibit,
source/adapters/contracts/Studio/TypeScript. Preserve pilot and copy-and-own limits;
Shopify schema/data/insertion/editor/live-store validation remain a later checkpoint.
