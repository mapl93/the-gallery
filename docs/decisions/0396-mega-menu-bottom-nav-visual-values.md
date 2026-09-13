# ADR 0396: Mega Menu and Bottom Nav Visual Values

Status: Accepted

Date: 2026-09-12

Expose Mega Menu's authored gutters, columns, responsive spacing, borders,
promotion/featured imagery, typography, focus and effects through 42 component
roles. Existing primitive dimensions and font weights remain aliases; the 180px,
140px and 164px measures remain explicit component defaults, not new primitives.
Container shares, aspect ratios and scale are numbers used in canonical CSS.

Keep the existing 40rem and 28rem container boundaries. Wide columns retain
adaptive minimum widths; medium and compact layouts expose their existing two
and one column defaults as tokens. The repeat count minimum of one follows CSS
syntax; there is no neutral upper limit. Source format and token matrices remain.
Promo text stays white with its existing black 0.58 scrim in both themes.

Expose Bottom Nav's current icon, spacing, badge, underline and focus values
through 17 roles. Badge text remains white, and its background retains the mix of
shared error and primary-text colors with an editable 0.55 error share. Its size
role keeps minimum width, fixed height and centered line height together. Safe
area insets, viewport visibility and route semantics remain structural/target
responsibilities. Forced colors and reduced-motion overrides are unchanged.

Contracts, registry, Studio and Exhibit expose these roles. Generated Web/Shopify
outputs follow source; existing consumer copies adopt changes explicitly. No
navigation service or target certification is inferred from token coverage.
