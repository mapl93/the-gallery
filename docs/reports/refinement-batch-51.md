# Refinement Batch 51: Review Highlights / Themes

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 51 refines V5 Review Highlights as a passive native collection of
target-supplied review themes and optional counts. Exhibit and Studio now share
the same neutral list renderer and fixture. Target-owned navigation or
selection may project real links or buttons, but filtering, provider data,
results and announcements are not inferred from pill styling.

## Safe Refinement

- The contract advances to `0.3.0` without promotion from `pilot`.
- Native list/list-item semantics and accessible count units replace a generic
  section with canonical toggle buttons.
- `.is-active`, passive hover and passive touch-target behavior are removed;
  current/pressed/disabled/focus styling is limited to truthful native states.
- Public API stays limited to an optional collection label and target-owned
  items. There is no neutral controlled/uncontrolled value.
- Complete existing typography and semantic tokens replace partial inherited
  presentation; no motion or runtime is added.
- Neutral Web, Shopify and Webflow CSS were regenerated; no provider Liquid was
  invented.

## Browser Evidence

- Exhibit and Studio root DOM is identical at Mobile, Tablet, Desktop and XL:
  `0e6612b81fef543e6ebae9c7b5fa1fd5e38750b9b33dbf2cf757892b965ba098`.
- The accessible tree is one named list with four theme/count items, zero
  controls and zero live regions.
- Target-only link/button probes pass current, pressed, disabled, Enter, Space,
  hover and keyboard-focus behavior while leaving state ownership external.
- Empty, dark, reduced-motion, forced-colors and a 220px RTL host at 200% type
  are captured. Fifteen final and eight before images preserve evidence.
- The only fresh-server console error is the repo's unrelated missing
  `favicon.ico` request.

## Performance

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,778 B` | `3,788 B` | pass; `10 B` remaining |
| Shared neutral runtime | `10,492 B` | `8,192 B` | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,381 B` | `65,536 B` | current `1,845 B` program gap |

## Human Review Queue

1. Approve theme/count hierarchy, density, radius, wrapping and selected/current
   strength.
2. Confirm passive v1 presentation or request a separate navigation/filter
   contract.
3. Resolve provider taxonomy/count and result-lifecycle policy per target.
4. Create Review Highlights-specific Figma artwork after browser approval.

## Validation

Contracts, Studio, docs, TypeScript, temporary site build outside `site/dist`,
Neutral Web, Shopify, Webflow copies, official Shopify artifact validation,
source/generated CSS identity, static previews, structural certification,
Exhibit/Studio parity, refinement progress, four viewports, special modes,
deterministic budgets and diff checks pass.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Program Position

After Batch 51, the program has 92 dossiers and 80 components flagged as ready
for human review. Photo Reviews (V6, dependency order 153) is next.

See the detailed audit in
`docs/reports/review-highlights-web-refinement-audit.md` and the decision in
`docs/decisions/0136-passive-review-theme-list-and-target-owned-item-modes.md`.
