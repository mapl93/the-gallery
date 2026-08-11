# Refinement Calibration Batch 01

Date: 2026-07-13

Components: Button, Select, Product Card

## Outcome

The permanent refinement workflow was calibrated against one accepted primitive,
one progressively enhanced field, and one composed commerce component. It now
has a reusable rubric, dossier template, dependency-safe review order, progress
matrix, performance budgets, before/after protocol, and target-translation rules.

- Button is human-review-ready under the expanded rubric; its existing 2026-07-11
  neutral-web approval remains valid.
- Select is human-review-ready and remains `pilot` pending explicit owner visual
  approval.
- Product Card is technically refined but not yet human-review-ready because
  media ratio and visual reference require owner input; its primary-media API is
  an explicit architecture boundary.
- No contract was promoted automatically and `site/dist` was not rebuilt.

## Method Calibration

| Calibration case | What it proved | Reusable rule |
| --- | --- | --- |
| Button | Accepted work can be re-evidenced without reopening approved visual decisions. | Preserve prior human approval; add missing rubric evidence without churn. |
| Select | A generated control needs both the shared renderer and direct distributed-enhancer evidence. | Test semantic form ownership, fallback, mutation sync, keyboard, extreme options, and special media modes separately. |
| Product Card | Structural validators can pass while canonical composition and link behavior still drift. | Audit semantic dependencies, duplicated target/site styling, rendered DOM, pointer modes, and content extremes before declaring readiness. |

Accepted decisions now apply to later components:

- Generated visible controls must not become a second form-value owner.
- Unsupported richer native semantics fall back natively rather than being
  flattened by a narrower enhancer.
- A stretched Card link uses one descriptive destination; media remains passive
  and separate actions are layered above it.
- Composed components consume canonical components and do not copy their surface
  tokens or site styles.
- Reduced-motion evidence measures computed duration/transform, not only the
  presence of a media query.
- Unbroken content receives measured before/after overflow evidence.

## Evidence Inventory

The batch produced 24 canonical Exhibit/Studio captures: three components,
two views, and four required viewports.

| Viewport | Dimensions | Button | Select | Product Card |
| --- | ---: | ---: | ---: | ---: |
| Mobile | `390 x 844` | Exhibit + Studio | Exhibit + Studio | Exhibit + Studio |
| Tablet | `768 x 1024` | Exhibit + Studio | Exhibit + Studio | Exhibit + Studio |
| Desktop | `1280 x 800` | Exhibit + Studio | Exhibit + Studio | Exhibit + Studio |
| XL | `1600 x 1000` | Exhibit + Studio | Exhibit + Studio | Exhibit + Studio |

Special-mode and stress evidence adds:

- Button forced colors plus reduced motion.
- Select forced colors, reduced motion, 48 localized choices, hidden prompt,
  empty list, native grouped/multiple fallback, form name/required, and keyboard
  selection.
- Product Card coarse pointer, forced colors, reduced motion, one-link DOM,
  card-sized focus, long/localized/unbroken text, extreme price, and failed media.

Artifacts live under `output/playwright/refinement-calibration/`. Historical
before references remain under `output/playwright/parity/`.

## Performance Snapshot

| Surface | Measurement | Ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | `56,481 B` gzip | `64 KiB` | pass |
| Shared progressive JS | `5,180 B` gzip | `8 KiB` | pass |
| Primitives CSS family | `9,343 B` gzip | `10.3 KiB` | pass |
| Product CSS family | `4,894 B` gzip | `5.2 KiB` | pass |
| Button component JS | `0 B` | `0 B` | pass |
| Product Card component JS | `0 B` | `0 B` | pass |

## Validation Snapshot

- 183 registry components and 94 dependency edges.
- Dependency depth 2; zero missing dependencies and zero cycles.
- 183/183 neutral-web structural gates pass.
- Contracts, Studio definitions, MDX docs, neutral Web adapter, and Shopify
  adapter validate.
- Existing Shopify warnings are recorded maturity backlog for unrelated planned
  contracts, not Product Card failures.
- Browser console contains only the pre-existing missing favicon request and
  development-mode information.

## Open Decisions and Risks

- Select: owner visual approval or a Select-specific reference; alternate sizes
  remain out of scope unless requested.
- Product Card: owner must choose the v1 media-ratio direction and visual
  reference. The recommended temporary state is the current square render.
- Product Card media: a target-agnostic primary-media API requires architecture
  review; neutral Web URLs or Shopify image objects must not enter the base
  contract by assumption.
- Shopify and future adapters retain target-native visual and integration
  certification even when their contract translation validates.

## Next Dependency-Safe Batch

Continue Phase 2 with zero-dependency primitives and Card before dependents:
Divider, Card, Icon Button, Close Button, Toggle / Toggle Group, FAB / Back-to-Top,
Progress, Spinner, Stat, Table, Data List, Timeline, and Link. Button Group and
Alert follow after their Button/Close Button dependencies are available.
