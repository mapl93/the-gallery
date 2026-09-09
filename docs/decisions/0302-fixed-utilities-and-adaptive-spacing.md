# 0302. Fixed Utilities And Adaptive Spacing

Status: Accepted

Date: 2026-09-08

Owner confirmation: preserve fixed utility measures and adaptive semantic spacing.

## Context

Audit finding 8 identified two numeric spacing vocabularies. `.p-8` means 32px,
while `space.scale.8` means 64px on Desktop/XL and 40px on Mobile/Tablet. Neither
scale is intrinsically invalid; treating their indexes as equivalent is the risk.

## Decision

- Preserve current utility names and values. `p`, `px`, `py`, `m`, `mt`, `mb`
  and `gap` suffixes count fixed 4px steps and do not change with viewport mode.
- Replace literal utility measures with existing fixed dimension primitives.
  The 80px utility derives from the 4px primitive times 20; it does not need a
  new primitive solely for that utility. Zero/auto remain structural values.
- Preserve `space.scale` indexes and adaptive semantic roles. Prefer named
  roles such as `space.section.md`, `space.stack.md` or public component gaps
  when the intended decision is responsive or component-owned.
- Document the two vocabularies side by side in Foundations and the source guide.
  Do not silently map `.p-8` to `space.scale.8`, rename all tokens or migrate
  existing layouts.

## Acceptance

`.p-8` and `.gap-8` compute to 32px at mobile, tablet, desktop and XL, while
`--tg-space-scale-8` follows the existing 40/40/64/64px matrix. Changing a fixed
primitive is an intentional brand/source customization, not a viewport mode.
