# 0364. Cart Page And Line Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 to Cart Page and Cart Line Item. Twenty-four source roles preserve
existing values: eight page roles and sixteen line roles. Profiles expose 22/31
public values. Borders/focus alias system dimensions; line title aliases system
semibold, image surface/border alias semantic default border color. Rem/em
measures and spacing factors preserve original expressions.

Page owns title wrapping basis, header row gap, wide-summary track measures,
continue-link accent share, underline and focus. Line owns wide/compact media,
independent padding, detail/quantity/action rhythm, divider/image border and
surface, title weight, hover accent share and focus. Accent shares clamp to 0–1.
Existing responsive queries choose layout and media density; no mode is added.

ADR 0254's private safe sticky offset, viewport bounds, collision policy and
semantic sticky/flow property remain intact. Public track measurements are
visual-value tokens under ADR 0293, not a second placement property API.
Targets still own cart truth, actions, checkout and delivery certification.

All consumed public values are individually editable in Studio and listed by
Exhibit. Cart Page's Studio uses available desktop width instead of generic
1120px page/760px inner caps. Existing mobile cascade remains. Its composed
summary fills the track instead of using the demonstration's separate 420px cap.
Other Studio profiles retain their measures.

Both generated targets update. Copy-and-own consumers explicitly adopt CSS and
tokens. Pilot maturity remains; no Shopify upload, new runtime or commerce model.

## Evidence

See `docs/reports/2026-09-12-cart-page-line-checkpoint.md`.
