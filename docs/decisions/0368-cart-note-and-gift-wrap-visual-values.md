# 0368. Cart Note And Gift Wrap Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 to the final two Cart visual wrappers: ten source roles (4/6),
with 9/13 public values replacing empty inventories. Existing system gap bases
are preserved; focus/border dimensions and label/current-price weights alias
system primitives. No default aesthetic change is introduced.

Cart Note owns top margin, field separation and summary focus geometry. Gift
Wrap owns logical padding, label/price gap, border and label/current-price
weights. Existing typography/color/radius roles are also exposed through named
Studio controls and the shared Exhibit inventory. Textarea/Input, Checkbox and
Price retain their owners. Cart Empty has no additional authored visual values;
it remains a structural composition over canonical Empty State.

The broader public-value direction supersedes earlier zero-token inventories,
without changing ADR 0257's dedicated sellable line model or target reconciliation
requirements. Native disclosure, field/checkedness, form entries and reset remain
unchanged. No persistent note service, gift-wrap transaction, new runtime or mode.
Both generated targets update; copy adoption remains explicit and maturity pilot.

## Evidence

See `docs/reports/2026-09-12-cart-note-wrap-checkpoint.md`.
