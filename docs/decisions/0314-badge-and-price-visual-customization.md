# 0314. Badge And Price Visual Customization

Status: Accepted

Date: 2026-09-09

## Decision

Continue ADR 0293 with passive Badge and Price. Preserve their semantic contracts,
current defaults and pilot status. The broad customization authorization supersedes
the earlier private-only treatment of these specific visual dimensions in ADRs
0106/0108, without introducing new semantic properties or component modes.

- Badge exposes horizontal/vertical padding (10/2px), text weight (600) and letter
  spacing (0.05em) through four source decisions. Shared feedback colors, primary
  contrast input, Caption size/line height, UI family and full radius remain the
  existing public roles. All 17 roles have discoverable Studio/Exhibit controls.
- Price exposes row/column gaps (4/8px) and current weight (600) through three
  source decisions. Compare-at and unit weight use shared Body weight (400).
  Its 13 public roles also include existing current/supporting colors, UI family
  and the three type size/line-height pairs. No copy of the size catalogue is added.
- Badge text mixes 10% feedback foreground with 90% primary text. Both inputs
  are exposed and named as mix inputs; the background remains an exact color.
- Badge's accepted uppercase treatment and centered wrapping remain v1 CSS,
  alongside forced-color system boundaries. Icons, dot/count/ribbon, interaction
  and arbitrary text-transformation properties remain outside its semantic API.
  No string token type or source-format change is introduced for those options.
- Price wrapping/baseline alignment, native strike-through, hidden labels, BDI
  isolation and fixed ordinary zero remain implementation/semantic requirements.
  The target continues to own complete formatted strings, sale validity, currency,
  units and announcements. Gaps and weights do not become money-formatting controls.

## Acceptance and adoption

Compare default layout and colors across themes/widths, exercise every new control
plus shared supporting weight and relative tracking units through Studio, reset,
variants, passive/status semantics, sale/unit anatomy, BDI and long content.
Verify an installed HTML consumer, forced colors, and Product Card composition.
Record actual results and engine limitations in the checkpoint.

Generate matching Web/Shopify CSS and tokens. Consumers adopt copies explicitly.
No runtime is added, no hosted Shopify theme is updated, no existing alias is
removed, and no contract is promoted to stable. Figma remains out of delivery.
