# Refinement Batch 53: Write-a-Review Form

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 53 refines V7 Review Form as one native form that composes canonical Star
Input, Input, Textarea, File Upload, Select, and Button. The formal dependency
graph, contract, renderer and docs now agree. Exhibit and Studio share the same
renderer and fixture; provider, required fields, accepted files, moderation and
submission lifecycle remain target-owned.

## Safe Refinement

- The contract advances to `0.3.0` without promotion from `pilot`.
- Registry and contract add the five previously implicit canonical dependency
  edges, moving the component from baseline depth 1 to accurate depth 2 while
  preserving review order 154.
- Input and Select help messages are associated in native/enhanced output.
- File Upload uses the canonical label-root, named native input, visible
  docs-only file policy and independent selected-file status.
- The local submit copy reports only a received fixture request; it never claims
  upload or persistence. Inspector reset clears the native FileList and all
  controlled fixture values.
- Six unused legacy Review Form field/photo hooks and one token fallback are
  removed. No second field API or budget exception remains.
- Neutral Web, Shopify and Webflow CSS were regenerated; no provider Liquid or
  target framework behavior was invented.

## Browser Evidence

- Exhibit and Studio root DOM is byte-identical at Mobile, Tablet, Desktop and
  XL: `754ca255a850f5dd9699faf7697827454c96ff967603be6857f277f81733e9ad`.
- Six sequential Tab stops preserve native group entry, fields, enhanced Select,
  file input and submit. Star Input arrows, Select keyboard commit and File
  Upload selection all update the submitted native values.
- `FormData` contains rating, title, body, classification and the real selected
  `File`. Reset restores all values and zero files.
- Missing required rating blocks submission, leaves target feedback empty and
  focuses the first radio.
- Optional-slot omission, file-selected, response, focus, dark, forced-colors,
  reduced-motion and a 280px localized RTL/200% candidate are captured.
- Visible localized content has no horizontal overflow. Sampled text contrast
  is at least `5.34:1` in light and `12.03:1` in dark. Relevant child transitions
  resolve to `0s` under reduced motion.
- Seventeen final and eight before images preserve the evidence.

## Performance

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,697 B` | `3,788 B` | pass; `91 B` remaining and `90 B` recovered |
| Shared neutral runtime | `10,492 B` | `8,192 B` | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,298 B` | `65,536 B` | current `1,762 B` program gap |

Review Form adds no neutral orchestration runtime or asset. Select/File Upload
enhancement and all child visuals remain owned by the canonical children.

## Human Review Queue

1. Approve width, hierarchy, gaps, required-rating wording, mixed validation
   examples, upload surface/copy and submit emphasis.
2. Decide required fields and visible instructions for the selected product.
3. Select provider, schema, authentication, endpoint, moderation, anti-abuse,
   validation-summary and full response/reset/focus lifecycle.
4. Define accepted files, consent, scanning, previews/removal and upload
   performance before production integration.
5. Create Review Form-specific Figma artwork after browser approval.

## Validation

Contracts, Studio, docs, TypeScript, temporary site build outside `site/dist`,
Neutral Web, Shopify, Webflow copies, official Shopify artifact validation,
source/generated CSS identity, static previews, structural certification,
Exhibit/Studio parity, refinement progress, native constraints/keyboard/FormData/
reset, four viewports, content/special modes, deterministic budgets and diff
checks pass. The temporary Vite build retains the existing large-chunk warning.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Program Position

After Batch 53, the program has 94 dossiers and 82 components flagged as ready
for human review. The graph has 114 declared dependency edges, maximum depth 2,
no missing dependencies and no cycles. Review Toolbar (V8, dependency order 155)
is next.

See the detailed audit in
`docs/reports/review-form-web-refinement-audit.md` and the decision in
`docs/decisions/0138-native-review-form-composition-and-target-owned-submission.md`.
