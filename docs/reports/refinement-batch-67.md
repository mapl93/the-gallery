# Refinement Batch 67: Brand Story

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 67 turns S8 into a truthful Brand Story profile of canonical Image with
Text. Required media/title/body, optional eyebrow and optional ordinary
signature footer remain; duplicated layout/anatomy, redundant signature label,
unnamed section and Studio-only repairs are removed.

Shopify gains a localized addable section and shares one documented Liquid
composition with the general Image with Text section. The adapter reports S8
`target-ready`. ADR 0152 records the profile, dependency, strict composition,
signature semantics and shared-target boundary.

## Safe Refinement

- Contract advances from `0.2.0` to `0.3.0` and remains `pilot`.
- Registry and contract now declare `image-text` as the sole direct dependency.
- Public API remains five semantic inputs without exposing generic layout,
  crop, ratio or target editor details.
- Native naming, strict omission and footer semantics replace the incomplete
  baseline shell.
- Browser evidence found and fixed two canonical dependency defects: media
  expanding beyond a two-track grid and viewport-mode padding collapsing narrow
  containers.
- Exhibit, Studio, MDX, Web, Shopify and Webflow now converge on the same
  canonical composition boundary.

## Browser Evidence

- Exhibit and Studio normalize to FNV-1a `c1e58f96` at four paired viewports.
- Nine baseline and 19 final captures cover paired viewports, direct roots,
  optional omission, localized/RTL/unbroken content, signature media, themes,
  forced colors and reduced motion.
- Tablet media/content tracks are exactly `394/394px`; the baseline media
  overlap is removed.
- Direct `200/260/520/900/1120px` roots have equal client/scroll widths and no
  outside descendant under XL tokens.
- Blank title omits the profile; signature-off omits only the footer; zero
  focusable surfaces remain.
- Dark/forced-color modes, zero authored motion and clean-console checks pass.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,758 B` | `6,731 B` | `6,861 B` | pass; `27 B` reduction, `130 B` remaining |
| Neutral Web component CSS | `66,920 B` | `66,881 B` | `65,536 B` | existing gap `1,345 B`; delta `-39 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; S8 adds no runtime behavior |

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web, Shopify,
Webflow copies, static previews, paired parity, official Shopify Liquid
revision 3, real-browser matrix, budgets, source/generated identity, console,
diff and clean `site/dist` checks pass. The final container-padding-only CSS
delta also passes repository Shopify validation; the final official runner did
not return a captured summary.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve inherited crop, split, responsive threshold and content density.
2. Approve signature treatment and decide the raster light/dark asset policy.
3. Confirm the five-property API and the component's separate product identity.
4. Define heading/rich-content and future CMS/metaobject target policy.
5. Add component-specific Figma evidence after browser visual approval.

See `docs/refinement/dossiers/brand-story.md`,
`docs/reports/brand-story-web-refinement-audit.md`, and ADR 0152.

## Program Position

After Batch 67, the expected program position is 108 dossiers and 95 components
ready for human review. All 183 automated gates must remain passing after the
final audit. The next dependency-safe component is FAQ Section (S9, review order
`169`).
