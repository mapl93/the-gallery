# 0366. Shipping And Upsell Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 to Free Shipping Bar and Cart Upsell: nineteen source roles
(3/16), exposing 12/26 public values. Gap factors preserve the shared system
basis; dimensions, weights and image colors alias existing primitives/semantics.
Rem media and text measures preserve their prior defaults. Shipping message
weight explicitly consumes small-body weight instead of shorthand normal.

Shipping owns outer padding, message/progress separation and border. Upsell
owns surface/heading/list/item/text rhythm, borders, media geometry/background,
text wrapping measures and independent heading/item weights. Existing Progress,
Price, Link and Button continue to own their respective presentation/behavior.
All consumed public values feed individual Studio controls and Exhibit.

Eligibility/threshold policy, recommendation ranking, availability, price and
cart mutations remain target-owned. No extra modes, runtime or semantic API.
Both generated targets update; consumers explicitly adopt tokens/CSS. Components
remain pilot, without Shopify publication or stable promotion.

## Evidence

See `docs/reports/2026-09-12-shipping-upsell-checkpoint.md`.
