# ADR 0399: Multicolumn and Gallery Grid Visual Values

Status: Accepted

Date: 2026-09-13

Multicolumn exposes its existing header measure, item basis/maximum, icon size and
copy gap as five roles. Gallery Grid exposes its four responsive column counts,
regular crop, Masonry preferred width and maximum count as seven roles. Keep
existing shared semantic spacing/type/radius inputs and all defaults.

Gallery's 22rem/40rem/60rem thresholds remain structural. Counts have CSS's minimum
of one without a neutral upper ceiling. Masonry preserves source-flow columns
and natural image proportions; its count is a maximum subject to available width.
There is no invented masonry JS, record ordering or activation behavior.

Remove the passive Gallery's unused public focus-color inventory/control. Its
canonical CSS does not consume it, and target-owned native links/buttons retain
their own focus requirements. This does not delete the global token or authorize
hiding focus in an interactive target implementation.

Contracts and Studio feed shared Exhibit controls, and Web/Shopify outputs follow
source. Existing copies adopt changes explicitly; no target certification.
