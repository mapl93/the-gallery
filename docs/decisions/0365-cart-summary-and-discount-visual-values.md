# 0365. Cart Summary And Discount Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 to Cart Summary/Discount Field: 22 source roles (10/12), with
26/25 public values. Factors preserve shared element-gap bases; border/focus
thickness and weights alias existing system primitives. Existing rem/em and
color-mix semantics remain; the discount accent share is bounded to 0–1.
Shared body weight roles now apply explicitly where font shorthand formerly
reset the weight to normal. Defaults remain visually unchanged.

Summary owns padding, section/row/total/express rhythm, divider and title/total
weights. Discount owns disclosure type/underline/focus, panel/form/code rhythm
and record borders. All consumed roles are named Studio controls and shared
Exhibit metadata. Button/Input and payment providers retain their owners.

Browser evidence found that an Input error message pushed Apply below its field.
Use the existing Back in Stock subgrid pattern: wide layouts share label, field
and message rows; Apply occupies the field row. Input's existing label/message
spacing remains authoritative. Narrow contexts and browsers without subgrid
stack in normal flow. No measured offsets, height tokens or new runtime are
needed. This applies the owner's prior matching field/button alignment decision.

Native details, code content, mutation, confirmation, focus and checkout remain
under ADRs 0175/0176. The older numeric Cart CSS ceiling is superseded by ADR
0310; this checkpoint uses its target-specific advisory inventory.

Both generated targets update; explicit consumer adoption remains necessary.
No Shopify deployment, provider styling, new platform or stable promotion.

## Evidence

See `docs/reports/2026-09-12-cart-summary-discount-checkpoint.md`.
