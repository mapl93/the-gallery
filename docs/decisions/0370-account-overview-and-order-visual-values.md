# 0370. Account Overview And Order Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 to Dashboard, Order History and Order Detail: 22 source roles
(11/6/5), with public inventories 28/17/20. Independent gap/padding factors keep
existing system bases; Dashboard icon measure retains 2rem, title weights alias
existing bold/semibold, and History separator aliases the 1px primitive.
History number/total weights are separately editable. Body typography is
explicitly consumed where exposed. Preserve every existing visual default.

Dashboard and Detail explicitly fill their available inline space. Inline-size
containment otherwise gives these roots no intrinsic content contribution as
flex children; Studio's old width override concealed that limitation. Remove
Studio's zero-padding bypass and put Account fixture feedback below its artwork
rather than beside it. This is layout composition, not a new visual token.

Existing private container thresholds/area layouts remain structural under
ADRs 0186–0188. No public columns property or navigation/status lifecycle is
introduced. Card, Link, Badge, Steps and Cart Line Item keep their own controls.
Current hosted-account handoff remains ADR 0260's target boundary.

Both generated targets update. Copies require explicit adoption; no new mode,
runtime, authentication integration, Shopify deployment or maturity promotion.

## Evidence

`docs/reports/2026-09-12-account-orders-values-checkpoint.md`.
