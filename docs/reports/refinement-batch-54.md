# Refinement Batch 54: Review Sort / Filter Bar

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 54 refines V8 Review Toolbar as a labelled group that composes canonical
Select and Button/anchor. It preserves normal Tab order and child-native keyboard
behavior instead of claiming the APG toolbar widget. Exhibit and Studio share
the same renderer and fixture; provider, options, results and write-review flow
remain target-owned.

## Safe Refinement

- The contract advances to `0.3.0` without promotion from `pilot`.
- Registry and contract add the two actual canonical dependency edges, moving
  the component from depth 0 to accurate depth 1 while preserving review order 155.
- `role="toolbar"` is replaced with a named `group`; no roving focus or arrow
  interception is introduced.
- Empty, control-only and action-only composition behaves truthfully. With no
  slots, the complete component is omitted.
- Root-container response replaces page-viewport response while preserving the
  accepted mobile stack and desktop inline candidate.
- The wrapper no longer assigns Select typography. Only the structural border
  remains a public Review Toolbar token.
- Neutral Web, Shopify and Webflow CSS were regenerated; no provider Liquid or
  target framework behavior was invented.

## Browser Evidence

- Exhibit and Studio root DOM is byte-identical at Mobile, Tablet, Desktop and
  XL: `1056a34eed3dfcbd6f5e6fd77e0956c97561c97ed213881d5eb52e22f4c59c8b`.
- Two sequential Tab stops preserve Select and Button semantics. ArrowRight is
  not hijacked by the group; ArrowDown/End/Enter commit the canonical Select.
- Native fallback remains visible, focusable and value-owning after enhancement
  is removed. Reset restores the initial fixture and clears feedback.
- Control-only, action-only and complete omission pass without empty placeholders.
- A 320/480px host stacks inside a 1440px viewport; 628px stays inline.
- A 280px RTL/200% localized candidate contains exactly. Select truncates its
  long value canonically and the long action wraps.
- Sampled contrast is at least `7.81:1` light and `12.09:1` dark. Forced colors
  and reduced motion pass.
- Twenty final and eight before images preserve the evidence.

## Performance

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,717 B` | `3,788 B` | pass; `71 B` remaining |
| Shared neutral runtime | `10,492 B` | `8,192 B` | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,335 B` | `65,536 B` | current `1,799 B` program gap |

Review Toolbar adds no neutral orchestration runtime or asset. Select enhancement
and all child visuals remain owned by the canonical children.

## Human Review Queue

1. Approve spacing, border, Select/action emphasis, inline layout, 30rem host
   threshold and localized long-content treatment.
2. Decide real sort/filter options, labels, default selection and URL model.
3. Select provider and result loading/count/empty/error/focus/announcement lifecycle.
4. Choose write-review navigation, inline form, overlay or provider activation.
5. Create Review Toolbar-specific Figma artwork after browser approval.

## Validation

Contracts, Studio, docs, TypeScript, temporary site build outside `site/dist`,
Neutral Web, Shopify, Webflow copies, official Shopify artifact validation,
source/generated CSS identity, static previews, structural certification,
Exhibit/Studio parity, refinement progress, group/keyboard/native fallback/slots/
container behavior, four viewports, content/special modes, deterministic budgets
and diff checks pass.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Program Position

After Batch 54, the program has 95 dossiers and 83 components flagged as ready
for human review. The graph has 116 declared dependency edges, maximum depth 2,
no missing dependencies and no cycles. Review Pagination (V9, dependency order
156) is next.

See the detailed audit in
`docs/reports/review-toolbar-web-refinement-audit.md` and the decision in
`docs/decisions/0139-native-review-control-group-and-target-owned-result-lifecycle.md`.
