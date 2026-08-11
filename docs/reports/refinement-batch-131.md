# Refinement Batch 131: Native Segmented View Toggle

Date: 2026-07-20

Component: E5 Grid / List View Toggle

Result: `human-review-ready; pilot`; no component was promoted to `stable`.

## Accepted Direction Applied

Owner decision E5-B and ADR 0247 replace the earlier two-Button Toggle model
with one canonical native Segmented Control. Grid and List are fixed same-name
Radio values with one Tab entry, logical arrows, icon plus visible text, and an
unambiguous active surface. Grid is the neutral default; E5 is omitted when only
one real layout exists.

Neutral source stores no preference, changes no result DOM, and announces
nothing. The target coordinator preserves filters, sort, pagination, and product
identity and owns URL/persistence, focus/scroll, analytics, asynchronous
lifecycle, and any useful localized result status.

## Canonical Source Changes

- Rebuilt `ViewToggleArtwork` over canonical `SegmentedControlArtwork`.
- Extended the docs Segmented Control renderer with target-owned repeated-part
  classes/content so composites can consume it without cloning its behavior.
- Added one shared View Toggle fixture and a form-only evidence wrapper.
- Reconciled contract `0.3.0`, registry dependency, Studio metadata, MDX,
  decision coverage, ADR 0247, open questions, dossier, and audit.
- Replaced Button geometry with equal segmented distribution, full radius,
  fixed icon sizing/gap, and wrap-safe visible text.

## Browser Evidence

One managed server, one named headless Chromium session, and one page were used
serially. Eight Exhibit/Studio captures cover mobile, tablet, desktop, and XL.
All root/stage/document overflow checks pass and every normal target is 44px.

| Check | Result |
| --- | --- |
| Normalized DOM parity | `3a11f50e` exact |
| Non-geometric style parity | `2f618385` exact |
| Desktop geometry | `384x70px`; two `188x44px` segments |
| Mobile geometry | `326x70px`; two `159x44px` segments |
| Console/page/test failures | none |
| Direct 200px localized RTL/text spacing | zero overflow; two `96x112px` segments |
| Light contrast | minimum `7.17:1` |
| Dark contrast | minimum `10.21:1` |
| Reduced-motion animations/transitions | 0 / `0s` |
| Forced-color focus | 2px inner + 4px outer |

Native interaction proves ArrowRight selection/focus, one input/change, one
FormData value, Tab exit/return to the selected Radio, reset to Grid, native
disabled propagation, and fail-closed empty group naming.

The evidence phase caught and corrected a docs-fixture shrink-to-fit width
collapse before the final recapture. Visual inspection confirms the owner-
directed joined pill, icon-plus-visible-text choices, clear selected surface,
dark equivalent, and readable wrapped RTL extreme.

Artifacts:

- `output/playwright/refinement-batch-131/final-evidence.js`;
- `output/playwright/refinement-batch-131/evidence-summary.json`;
- `output/playwright/refinement-batch-131/after/view-toggle/`; and
- `output/playwright/refinement-batch-131/special/`.

The final resource gate is clean: server stopped, browser session closed, and
port 4173 free.

## Performance Result

| Surface | Actual | Ceiling/result |
| --- | ---: | --- |
| E5 CSS slice | `427 B` gzip | `95 B` below baseline |
| Collection CSS | `2,366 B` gzip | `2,560 B`; pass with `194 B` headroom |
| Neutral component CSS | `71,558 B` gzip | existing documented gap of `6,022 B` |
| Shared runtime | `21,633 B` gzip | existing documented gap; E5 delta `0 B` |

The global audit reports 18 surfaces, 10 pass, 8 documented gaps, and zero
undocumented gaps. No ceiling was raised. Collection CSS is byte-identical
across canonical source, Shopify, and Webflow.

## Cross-Target And Validation Result

- Neutral Web validates 183 components and 19 CSS sources.
- Shopify validates 183 components, 89 target-ready, 59 dedicated Liquid
  templates, 34/34 schema-ready, and 17 CSS assets.
- E5 remains Shopify `planned`: target collection-section, localization,
  editor/default, result coordination, and live-store proof are not claimed.
- TypeScript, contracts, Studio, docs, decision coverage, adapters, performance,
  source-copy equality, diff, and resource gates pass in their stated scope.

`site/dist` was not rebuilt or modified.

## Human Review And Remaining Risks

Human review should approve Legend placement, control width, pill radius,
density, icon geometry, active surface, focus hierarchy, dark mode, localized
wrapping, and coarse-pointer behavior. E5-specific Figma and live target proof
remain pending. The semantic-model and owner visual-direction decisions are
settled.
