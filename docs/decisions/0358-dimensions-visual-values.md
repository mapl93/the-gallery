# 0358. Dimensions Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

ADR 0293 exposes nineteen Dimensions roles: visual aspect/minimum-column/maximum
measure and border; annotation width inset, padding, gap, border and logical
placement; annotation marker length/thickness; measurement-list and row borders,
row padding, term share and narrow stacked gap. Factors retain the existing
shared element gap; borders/marker thickness alias dimension.1. Existing intrinsic
layout and 18rem stacked-row query remain. No universal density ceiling is added.

The component now has 36 public values. Measurement terms use system semibold
instead of Button's font-weight token, preserving 600 while removing unrelated
Button customization coupling. Annotation/list weights explicitly use shared
small/default body roles instead of accidental host inheritance. Registry,
contract and Studio expose the complete inventory; Exhibit derives from it.

Native Segmented Control remains the dependency. Targets still own complete
measurement sets, atomic unit changes, formatting, rounding, annotations and
image meaning. There is no Dimensions arithmetic or new semantic property.
Studio's outer presentation frame remains site-owned. Both target copies are
regenerated; the component remains pilot.

Consumers explicitly adopt tokens/CSS together. An intentional term-weight
customization previously made through `--typo-button-weight` should move to the
Dimensions-scoped `--tg-font-weight-semibold` override; Button's public token
continues to exist for Button consumers.

## Evidence

See `docs/reports/2026-09-12-dimensions-checkpoint.md` for 424 default comparisons,
independent visual controls, weight isolation, native unit controls, omission,
RTL/forced colors and resource cleanup.
