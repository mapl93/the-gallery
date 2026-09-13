# ADR 0407: Review Form and Toolbar Visual Values

Status: Accepted

Date: 2026-09-13

Expose Review Form's maximum width and five Review Toolbar values: row/column gaps,
vertical padding, rule width and sort basis. Keep the existing responsive boundary,
shared field geometry and component-owned child controls. Align Toolbar's Button
with the Select field at the lower edge, removing Select's trailing margin inside
this parent-owned spacing composition. This applies the owner's existing requirement
for equally dense, aligned adjacent fields and buttons; alignment is structural
composition, not an additional token or semantic variant.

Submission, sorting, navigation and provider records remain target-owned. Contracts,
Studio/Exhibit and generated Web/Shopify agree. Current copies adopt explicitly.
