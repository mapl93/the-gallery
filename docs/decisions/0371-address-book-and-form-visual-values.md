# 0371. Address Book And Form Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293 to Address Book/Form with 14 source roles (11/3) and public
inventories 27/5. Promote their existing private visual measures to a token API:
record minimum, add-action minimum height, form maximum and independent gaps.
Keep 17.5rem/10rem/35rem defaults and their units. Book exposes separate logical
padding factors, postal-line gap, badge spacing, action spacing and border width.
System gap bases, zero postal gap and 1px border remain the defaults.

This refines the visual-value privacy boundaries of ADRs 0189/0190 without
adding semantic columns, field schema, record lifecycle or address mutations.
Native list, target formatting, contextual action names, canonical Badge/Button,
Form/Input/Select and explicit Cancel retain their owners. The dashed Add
command composition and private row threshold remain existing structural/purpose
treatments. Named Studio controls and shared Exhibit read the same contracts.

Both targets regenerate; no new runtime, mode, layer, account integration,
deployment or maturity promotion. Consumers must adopt source-dependent copies.

## Evidence

`docs/reports/2026-09-12-address-values-checkpoint.md`.
