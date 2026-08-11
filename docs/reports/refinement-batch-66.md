# Refinement Batch 66: Video Section

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 66 turns S7 into a truthful passive media figure. Required target-owned
media and optional visible caption remain; the no-op play button, its public
action/label API, hover motion and Studio repair CSS are removed.

The target owns any complete player. Shopify remains deliberately `css-ready`
until the supported media, accessibility, privacy and fallback profile is an
explicit product/architecture decision. ADR 0151 records that boundary.

## Safe Refinement

- Contract advances from `0.2.0` to `0.3.0` and remains `pilot`.
- Public API narrows from five to three semantic properties: `variant`, required
  `media`, optional `caption`.
- Native `figure`/`figcaption`, strict required-media omission, generic media
  class and zero passive focus replace poster/play partial behavior.
- Canonical CSS becomes self-sufficient, logical, token-backed and motion-free.
- Direct-width evidence found and fixed desktop padding that collapsed media at
  `200–260px`; the accepted grid-gap token now bounds it.
- Exhibit/Studio and MDX use the same passive composition. Shopify's missing
  profile remains reported rather than receiving a guessed section.

## Browser Evidence

- Exhibit and Studio normalize to the same `368`-character subtree and FNV-1a
  `0a0adb12` at four paired viewports.
- Nine baseline and 21 final captures cover paired viewports, direct roots,
  fullwidth, empty/long caption, native video controls, themes, forced colors,
  reduced motion and RTL/unbroken content.
- Every default root is a native figure with zero buttons/focus stops and equal
  client/scroll width.
- Direct `200/260/520/900/1120px` roots retain
  `136/196/456/836/1056px` useful media width. Fullwidth is zero-padding/radius.
- Caption contrast is `7.81:1` light and `12.09:1` dark; forced colors, no
  authored motion, localized extremes and clean-console checks pass.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,814 B` | `6,758 B` | `6,861 B` | pass; `56 B` reduction, `103 B` remaining |
| Neutral Web component CSS | `66,941 B` | `66,920 B` | `65,536 B` | existing gap `1,384 B`; delta `-21 B` |
| Shared neutral runtime | `10,492 B` | `10,501 B` | `8,192 B` | existing gap; S7 adds no runtime behavior |

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web, Shopify,
Webflow copies, static previews, official Shopify asset revision 1, real-browser
matrix, budgets, source/generated identity, console, diff and clean `site/dist`
checks pass. Shopify truthfully reports S7 `css-ready`, not implemented.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Human Review Queue

1. Approve ratio, crop, radius, caption treatment and full-width presentation.
2. Confirm the three-property neutral API and removal of independent play intent.
3. Select target media/player modes and whether a shared Player is needed.
4. Define captions/transcript, consent, loading, autoplay, error, analytics and
   fallback policies before a Shopify implementation.
5. Add component-specific Figma evidence after visual approval.

See `docs/refinement/dossiers/video-section.md`,
`docs/reports/video-section-web-refinement-audit.md`, and ADR 0151.

## Program Position

After Batch 66, the expected program position is 107 dossiers and 94 components
ready for human review. All 183 automated gates must remain passing after the
final audit. The next dependency-safe component is Brand Story (S8, review
order `168`).
