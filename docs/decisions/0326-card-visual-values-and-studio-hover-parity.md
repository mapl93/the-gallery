# 0326. Card Visual Values And Studio Hover Parity

Status: Accepted

Date: 2026-09-09

## Decision

Complete the existing Card customization surface through ADR 0293: border width,
upward hover lift and optional media scale become public tokens, preserving the
owner-approved 1px, 2px and 1.03 defaults from ADRs 0284/0290. Existing media timing
and surface/media easing roles become discoverable in Studio. Fourteen public
roles cover the base Card; child content and typography remain composition-owned.

The unitless scale is grouped under a transform category registered in the
existing registry category inventory and the contract's open token categories. This
is presentation categorization of a number, not another source layer or format.
Flat retains its transparent border width, stationary shadowless shell and optional
fine-pointer image zoom. Its lift editor is inapplicable; image scale remains valid.

Studio formerly simulated Hover through a literal inline translateY(-2px), omitted
image zoom and bypassed CSS preference guards. Replace that override with site-only
simulation selectors using the same public values and fine-pointer/reduced-motion
queries as native Card. No Studio selector is added to target-agnostic source CSS,
no semantic property is introduced and no component runtime is required.

Retain Card's existing stable status and the approved default visual baseline.
No related card becomes stable. Product Card remains stationary through its own
recorded override and keeps its independently owned product image treatment.
Consumer copies must explicitly adopt regenerated CSS/tokens; new arbitrary values
do not inherit human approval merely because defaults were previously approved.

## Acceptance

Verify default and Hover across three variants and eight theme/width matrices,
custom border/lift/scale through consumer and Studio, reset, reduced motion and
coarse-pointer suppression, focus-within clipping release and inherited shell
geometry in specialized cards. Validate source, contracts, Studio, TypeScript,
Exhibit and Web/Shopify outputs, keeping remote Shopify validation separate.
