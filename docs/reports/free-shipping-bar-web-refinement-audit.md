# Free Shipping Bar Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-16

## Outcome

Free Shipping Bar is now a passive target-controlled message composed with the
determinate Bar profile of canonical Progress. Its range, visual width and
derived achieved state cannot contradict one another; localized
`aria-valuetext` can explain money-like progress without duplicating visible
copy. The commerce target continues to own the qualifying amount, positive
threshold, eligibility rules, formatting, cart lifecycle and announcements.

No visual approval or `stable` promotion is implied.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive threshold communication only; not a shipping calculator, cart store, formatter, live region, promotion or checkout guarantee. |
| Anatomy and composition | pass | Required root/message plus canonical Progress root/track/bar; duplicate K5 track/fill removed. |
| Variants, sizes and states | pass | One intrinsic composition; determinate below/exact/above range with achieved derived from value/max. |
| Public API and ownership | pass | Five semantic properties; generic `text` and contradictory `achieved` removed without aliases. |
| Tokens and hardcoded values | pass | K5 owns semantic surface/text/border/type/spacing/radius; Progress owns track/fill/radius/motion. |
| Accessibility and motion | pass | Required name, synchronized clamped range, optional localized value text, text-complete status, passive root, no live region, inherited reduced motion/forced colors. |
| Responsive/content resilience | pass | Exhibit/Studio at four viewports plus localized RTL 200px, dark, reduced motion, forced colors and effective 200% zoom. |
| Runtime and assets | pass | `0 B` neutral runtime delta; no listener, observer, request, formatter, timer or asset. |
| Cross-target translation | pass | Neutral Web implemented; parameter-only Shopify snippet validates while commercial policy stays deferred. |
| Documentation and verification | pass | Dossier, ADR 0177, contract, registry, shared renderers, CSS, Studio, MDX, Shopify, adapters, evidence and reports agree. |

## Contract And Browser Evidence

- Contract `0.2.0` requires message, accessible name, value and positive max;
  optional value text maps to localized ARIA meaning. It declares five anatomy
  parts, two derived states and three behaviors.
- Exhibit and Studio emit one identical `439`-character K5 subtree. Default
  output is a passive `DIV` with no root role/live/tabindex and one named
  canonical `progressbar` at `0..100`, current `65`, `65%` width and no visible
  duplicate value line.
- Exact threshold gives explicit achieved text, modifier, value `100` and
  `100%` width. `135` clamps both width/ARIA to `100`; `-10` clamps both to `0`.
  Max `0` and blank message each omit output.
- Component client/scroll widths are `324/324`, `518/518`, `518/518` and
  `518/518` at Mobile/Tablet/Desktop/XL. Localized RTL at a 200px stage is
  `198/198`; effective 200% is component `518/518`, document `720/720`.
- Default message contrast is `7.81:1`; fill/track is `9.51:1`. Reduced motion
  resolves to `0s` transition/no animation and forced colors preserves distinct
  system track/fill colors.
- Fourteen final images cover the required viewports and special modes. One
  headless session, one tab and zero current console errors/warnings were used.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Passive message plus canonical determinate Progress; shared renderer derives/clamps projection. | Implemented and evidenced; commerce truth/status remain external. |
| Shopify | Parameter-only snippet receives value, positive max, message, accessible label and optional value text. | Official Liquid validation passes; not auto-rendered and remains planned until amount/threshold/placement/refresh/editor/live-store decisions. |
| React / Angular / Hydrogen | Stateless composition of canonical Progress from target store inputs. | Boundary documented; no framework/store dependency in neutral source. |
| Figma | Below/exact/above, narrow/wide, short/long/localized compositions using Progress Bar. | Studio validates semantic controls; component-specific visual approval remains pending. |
| SwiftUI / Compose | Passive text plus native linear progress with localized accessibility value. | Conceptual mapping; eligibility and announcements remain native target concerns. |

## Performance And Risks

- Final K5 CSS is `844 B` raw / `411 B` gzip, `-12 B` gzip from baseline.
  Complete Cart CSS is `15,340 B` raw / `3,005 B` gzip, a `-57 B` batch delta
  with `67 B` below the family ceiling.
- Complete Web component CSS is `506,019 B` raw / `67,838 B` gzip, an existing
  `2,302 B` program gap and a `-33 B` batch delta. Shared runtime remains
  `53,811 B` raw / `10,501 B` gzip; K5 neutral runtime delta is `0 B`.
- The parameter-only Shopify snippet is `2,309 B` raw / `830 B` gzip and adds no
  target runtime. It intentionally lacks cart-object selection and placement.
- Human review must approve the bordered primary surface, centered alignment,
  density, canonical primary fill, achieved text emphasis and removal of the
  prior success-only color.
- Product/target owners must select qualifying amount, threshold, excluded
  items, discounts/tax/duty/gift-card treatment, market/currency/destination,
  achieved wording, placement, refresh and announcement cadence.
- Progress Circle's separate long visible value-text question does not affect
  K5's Bar-only profile. Total Web CSS/runtime remain program-level gaps.

## Validation

Contracts, Studio, registry/docs, TypeScript, static previews, Neutral Web,
Shopify, the official Liquid validator, four-viewport/special-mode browser
inspection, exact shared-renderer parity, deterministic performance,
generated-copy identity, structural/certification/refinement audits, diff
checks, `site/dist` cleanliness and owned-resource cleanup are included in
Batch 86.
