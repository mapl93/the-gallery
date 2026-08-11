# Refinement Batch 59: Coming Soon

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 59 makes X1 a truthful public Coming Soon page and separates it strictly
from target-native password authentication. It removes inert password/dialog
hooks, duplicate Input/Button styling, prevented social Links and invalid local
form success; adds canonical Input, Button and Link dependencies; requires a
non-empty heading; and makes optional form labelling and region omission
coherent.

Shopify's public customer-signup section and independent password template are
both implemented and validated, but only the public page maps to X1. Countdown
and its complete clock/expiry lifecycle remain open rather than inferred.

## Safe Refinement

- Contract advances to `0.3.0` and remains `pilot`.
- Public API is required `heading` plus nine optional semantic slots/strings.
  Password, countdown, layout, dependency-state and service internals are absent.
- Source CSS owns only page composition, semantic tokens and private measures.
  Canonical dependencies own focus, validation, actions and navigation.
- One named container and logical properties drive split/stack response in the
  component host; Studio no longer owns a second layout.
- Decorative media uses an empty alternative and is suppressed in forced
  colors. Coming Soon adds no neutral motion or runtime.
- ADR 0144 records the public/password boundary. No compatibility alias or
  unapproved target service was introduced.

## Browser Evidence

- Exhibit and Studio share one renderer and fixture; after normalizing only
  React-generated relationship-id suffixes, initial root DOM is identical at
  `1,937` characters with SHA-256
  `e23b301977fe4646e7975a034135dd6c0a7a66d48b1a68c40b99cd69260240fc`.
- Two real social destinations, native required/email validation, truthful
  valid status, invalid type-mismatch, conditional required/optional omission
  and Link/Input/Button keyboard order pass.
- Four paired viewports have no root or document overflow. Long Spanish plus an
  unbroken compound, fully Arabic RTL and 200% zoom remain contained.
- Light/dark no-media contrast, conservative media-scrim contrast, forced
  colors with focused Input and zero reduced-motion durations pass.
- Eight baseline, eight final, six special and one Figma-reference capture live
  under `output/playwright/refinement-batch-59/`.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Coming Soon CSS | `2,184 B` | `1,370 B` | family-bound | `814 B` removed |
| Pages + Coming Soon | `4,178 B` | `3,503 B` | `5,427 B` | pass; `1,924 B` remaining |
| Neutral Web components CSS | `67,690 B` | `66,884 B` | `65,536 B` | existing `1,348 B` program gap; `806 B` removed |
| Shared neutral runtime | `10,589 B` | `10,589 B` | `8,192 B` | existing `2,397 B` program gap; `0 B` added |

## Human Review Queue

1. Approve split/stack composition, measure, typography, spacing, crop/scrim,
   brand/footer placement and social/form treatment.
2. Confirm the ten-property API and strict public/password separation.
3. Define the target form purpose, consent, backend and full response lifecycle.
4. Decide Countdown only with complete time/timezone/correction/expiry policy.
5. Review Shopify password UX/security independently.
6. Create Coming Soon-specific Figma examples after browser approval.

## Validation

Registry/docs, token source, 183 contracts, 183 Studio definitions, temporary
site build outside `site/dist`, Neutral Web, Shopify, Webflow copies, official
Shopify Liquid revision 5, source/generated identity, structural/static-preview/
parity/refinement audits, native interaction, four viewports, content/special
modes, deterministic budgets, console inspection and diff checks pass.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Program Position

After Batch 59, the program has 100 dossiers and 88 components ready for human
review. All 183 automated gates pass. The graph has 125 declared dependency
edges, maximum depth 2, no missing dependencies and no cycles. The next
dependency-safe component is Hero Section (M1, review order 161).

See `docs/reports/coming-soon-web-refinement-audit.md` and ADR 0144.
