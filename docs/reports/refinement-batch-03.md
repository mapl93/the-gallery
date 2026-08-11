# Refinement Batch 03: Button Group, Icon Button, Close Button

Date: 2026-07-13

Status: Three components ready for human review; none promoted to `stable`

## Batch Result

| Component | Contract | Technical result | Human input |
| --- | --- | --- | --- |
| Button Group | `0.3.0` | Logical RTL joining, resilient Full content, normal group keyboard model, required-name visibility | Full wrapping and visual approval |
| Icon Button | `0.3.0` | Three target/icon sizes, native activation/disabled, reduced motion, contrast/state matrix | Compact-action visuals and active treatment |
| Close Button | `0.3.0` | Native dismiss boundary, inline composition, reduced motion, contrast/state matrix | Dismiss visuals and active treatment |

Button Group follows its already accepted Button dependency. Icon Button and
Close Button are dependency-zero primitives in generated order. ADR 0062 already
owns their semantic APIs and composition boundaries, so this batch needed no new
ADR or public property.

## Shared Evidence

- 24 canonical screenshots: three components, Exhibit and Studio, Mobile
  `390 x 844`, Tablet `768 x 1024`, Desktop `1280 x 800`, XL `1600 x 1000`.
- 16 supplemental screenshots cover reproduced before/after failures, Full
  extreme content, RTL, inline composition, dark hover, disabled, keyboard
  focus, forced colors, and reduced motion.
- Exhibit and Studio render byte-identical root markup and fixtures for all three
  components; their containing stage widths differ by docs layout only.
- Browser console reported zero errors in the final evidence pass.

Evidence directory: `output/playwright/refinement-batch-03/`.

## Source Changes

- Button Group: logical inline corner/border overlap and resilient Full labels.
- Icon Button and Close Button: shared reduced-motion fallback.
- Close Button: atomic `inline-flex` outer layout.
- Primitive action renderer: no fallback names for empty required group/action
  labels.
- Studio: removed the Button Group nowrap override so both docs modes exercise
  canonical behavior.
- Contracts, MDX, dossiers, Web adapter, and Shopify adapter were reconciled.
- `site/dist` was not rebuilt.

## Performance

| Surface | Current gzip | v1 ceiling | Result |
| --- | ---: | ---: | --- |
| Neutral component CSS | `56,615 B` | `64 KiB` | pass |
| Shared enhancement JS | `5,180 B` | `8 KiB` | pass |
| Primitives CSS | `9,414 B` | `10.3 KiB` | pass |
| Layout/overlay CSS | `4,421 B` | `4.8 KiB` | pass |

All three components add `0 B` component JS and no requests, observers, timers,
animations, or continuous work. Button children retain the accepted Button
runtime behavior.

## Open Review Items

1. Approve Full's equal-share wrapping for extreme localized labels or request a
   separately specified responsive stacking behavior.
2. Approve the repository renders or provide component-specific references for
   the joined group and compact-action families.
3. Decide later, as one aesthetic family decision, whether Icon Button and Close
   Button need a distinct active visual treatment.
4. Modern HTML close commands and any Tooltip/Menu Button composition remain
   target or parent concerns; no universal properties were inferred.

## Validation And Known Repository Risks

- Registry, token source, 183 contracts, 183 Studio definitions, and 183 MDX
  pages validate.
- Web and Shopify adapters are regenerated from canonical sources; existing
  Shopify maturity warnings remain unrelated backlog rather than new blockers.
- The component and refinement audits remain structural evidence only. Human
  review is still mandatory before any `stable` promotion.
- Static preview audit retains the pre-existing File Upload opacity warning.
- The existing docs application large-chunk warning remains a docs optimization
  risk, not component runtime introduced by this batch.
- `git diff --check` passes and `site/dist` remains untouched.

## Next Dependency-Ordered Batch

Continue phase 2 with Toggle / Toggle Group, FAB / Back-to-Top, and Alert /
Banner, subject to their accepted dependencies and dossier research. No component
from this batch is stable until explicit human review is recorded.
