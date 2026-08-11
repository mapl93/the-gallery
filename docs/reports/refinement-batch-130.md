# Refinement Batch 130: Explicit Subscription Purchase Options

Date: 2026-07-20

Component: D10 Subscription / Recurring Option

Result: `human-review-ready; pilot`; no component was promoted to `stable`.

## Accepted Direction Applied

Owner decision D10-A and ADR 0246 make D10 one complete named purchase-options
group. One-time purchase and every eligible recurring allocation are peer native
Radio choices. The former generic recurring card and nested Select are removed.

One-time is selected initially when present. Subscription-only merchandise needs
at least two recurring choices or a simpler non-Radio presentation. Every
recurring record visibly identifies checkout charge, per-delivery amount, and
cadence; optional verified savings and target-authored terms remain target data.

## Canonical Source Changes

- Added one shared `SubscriptionOptionArtwork` and fixture used by Exhibit and
  Studio through `ProductStudio`.
- Replaced custom Radio/Select clones with canonical Fieldset, Radio, Price, and
  optional Badge composition.
- Reconciled contract `0.3.0`, registry dependencies, Studio metadata, MDX,
  owner decision coverage, ADR 0246, dossier, and component audit.
- Added intrinsic container styling, native-checked selected detail, logical
  properties, and forced-color support without D10 runtime.
- Regenerated neutral Web, Shopify, and Webflow copies from canonical source.

## Browser Evidence

One managed server, one named headless Chromium session, and one page were used
serially. Eight Exhibit/Studio captures cover mobile, tablet, desktop, and XL.
All component, stage, and document overflow checks pass.

| Check | Result |
| --- | --- |
| Normalized DOM parity | `5413cb9a` exact |
| Non-geometric style parity | `774d889d` exact |
| Console/page/test failures | none |
| Direct 200 px localized RTL/text spacing | zero overflow |
| Light text contrast | minimum `7.81:1` |
| Dark text contrast | minimum `12.09:1` |
| Reduced-motion animations | 0 |
| Forced-color focus | native appearance, `4px` outline |

Native interaction evidence proves Arrow selection/focus, input/change, one
FormData value, reset to one-time, required invalidity without selection,
disabled Fieldset propagation, and a non-interactive card body. The final DOM
has three same-name Radios and zero Select elements.

The first final-evidence pass exposed that the amount meaning used Price's
visually hidden label. This was corrected with explicit visible One-time price,
Due today, Per delivery, and Cadence labels, then the complete evidence set was
recaptured and visually inspected.

Artifacts:

- `output/playwright/refinement-batch-130/final-evidence.js`;
- `output/playwright/refinement-batch-130/evidence-summary.json`;
- `output/playwright/refinement-batch-130/after/subscription-option/`; and
- `output/playwright/refinement-batch-130/special/`.

The final resource gate is clean: server stopped, browser session closed, and
port 4173 free.

## Performance Result

| Surface | Actual | Ceiling/result |
| --- | ---: | --- |
| D10 CSS slice | `770 B` gzip | `518 B` below baseline |
| Product CSS | `5,302 B` gzip | `5,324 B`; pass with `22 B` headroom |
| Neutral component CSS | `71,528 B` gzip | existing documented global gap of `5,992 B` |
| Shared runtime | `21,633 B` gzip | existing documented gap; D10 delta `0 B` |

The global audit reports 18 surfaces, 10 pass, 8 documented gaps, and zero
undocumented gaps. No ceiling was raised. Product CSS is byte-identical across
canonical source, Shopify, and Webflow copies.

## Cross-Target And Validation Result

- Neutral Web validates 183 components and 19 CSS source files.
- Shopify validates 183 components, 89 target-ready, 59 dedicated Liquid
  templates, 34/34 schema-ready, and 17 CSS assets.
- D10 remains Shopify `planned`: allocation-to-record mapping is documented but
  Liquid/block/editor/coordinator/live-store proof is not claimed.
- TypeScript, 183 contracts, 183 Studio definitions, 183 docs pages, and
  refinement decision coverage pass.
- The performance command's expected non-zero exit represents eight documented
  program-level gaps; Product itself passes and undocumented gaps are zero.

`site/dist` was not rebuilt or modified.

## Human Review And Remaining Risks

Human review should approve card density/boundary, spacing, amount hierarchy,
savings treatment, selection emphasis, terms density, and narrow stacking.
D10-specific Figma evidence and live target integration remain pending. The
complete-group versus nested-Select product decision is settled.
