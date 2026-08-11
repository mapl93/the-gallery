# Refinement Batch 60: Hero Section

Status: Safe technical refinement complete; architecture input required; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 60 makes S1 a truthful passive Hero candidate: required title omission,
media-contained scrim, text-only coherence, real navigation, classified
decorative media, canonical container response, complete typography, forced-
colors support and zero parallax runtime now agree across contract, CSS, MDX,
Studio and generated targets.

The batch deliberately does not merge S1 Hero Section with G1 Hero Banner and
does not invent parallax/slideshow interaction. Those two architecture
boundaries keep S1 at `refined-decision-needed` and out of the human stability-
review-ready count.

## Safe Refinement

- Contract advances from `0.2.0` to `0.3.0` and remains `pilot`.
- Required `.hero-section__inner` owns layout within a named root container.
- Empty title omits the candidate; optional content and slots collapse cleanly.
- Media/scrim/text-only combinations are derived coherently; split scrim is
  scoped to the media column.
- Review art is decorative; canonical action Links use real destinations and
  preserve pointer/keyboard activation.
- Parallax is an empty target capability hook with no compositor or runtime
  work. Slideshow is a native three-record snap lane but not a claimed carousel.
- Docs-only Hero layout/type repairs are removed. Canonical source owns all
  candidate layout and resists docs heading leakage.
- ADR 0145 records the passive source and the open identity/capability boundary.
- Shopify G1 Liquid is unchanged and independently validated; S1 remains
  `css-ready` rather than receiving a duplicate inferred section.

## Browser Evidence

- Exhibit and Studio normalized initial root DOM is exactly equal: `848`
  characters, FNV-1a `df87e3f1`.
- Eight paired final viewports cover Mobile, Tablet, Desktop and XL.
- Thirteen special images cover empty/optional composition, no media,
  text-only, split narrow/wide, slideshow, long/unbroken/RTL, dark, forced
  colors, reduced motion and effective 200% zoom.
- Split switches between one and two columns at root widths `768/769 px`.
- Link focus order and Enter navigation pass; long/localized/zoom cases have no
  root or document overflow.
- Light/dark no-media contrast is `17.93:1`/`17.18:1`; conservative media/scrim
  contrast is `5.74:1`.
- Forced colors removes decorative media/scrim; reduced motion has no duration
  above `0.001 s`; fullscreen matches the dynamic viewport.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Hero CSS | `1,142 B` | `1,491 B` | family-bound | `+349 B` measured |
| Sections | `6,002 B` | `6,447 B` | `6,861 B` | pass; `414 B` remaining |
| Neutral Web CSS | `66,884 B` | `67,356 B` | `65,536 B` | existing gap now `1,820 B` |
| Shared runtime | `10,589 B` | `10,589 B` | `8,192 B` | existing gap; `0 B` added |

## Validation

All 183 registry/docs/contracts/Studio definitions, 534 source tokens, Neutral
Web, Shopify, Webflow copies, static previews, temporary Vite production build,
official G1 Liquid revision 1, real-browser matrix, console and diff checks pass.
Shopify retains its documented non-blocking maturity warnings.

The fresh browser console contains only the existing site-shell `/favicon.ico`
404; Hero emits no component error.

No stability promotion was made and `site/dist` was not rebuilt or modified.

## Owner Decisions Required

1. Consolidate S1/G1 or define a strict stable selection/adapter boundary.
2. Retain, separate or remove `parallax` and `slideshow`; if retained, define
   the complete target/state/accessibility/motion lifecycle.
3. Confirm whether overlay remains a public media-contained slot or becomes a
   private scrim in a future breaking contract.
4. Approve the proposed Hero crop, scrim, block sizes, split ratio, threshold,
   typography, measure, alignment and action hierarchy.

See `docs/refinement/dossiers/hero-section.md`,
`docs/reports/hero-section-web-refinement-audit.md`, and ADR 0145.

## Program Position

After Batch 60, the program has 101 dossiers and 88 components ready for human
review. All 183 automated gates pass. The graph has 125 declared dependency
edges, maximum depth 2, no missing dependencies and no cycles. The next
dependency-safe component is Featured Collection (S2, review order 162).
