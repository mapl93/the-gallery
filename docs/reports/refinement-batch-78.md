# Refinement Batch 78 — Collage Section

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Collage Section (`S19`, dependency order `179`)

## Outcome

Batch 78 replaces an unnamed generic collage with a passive native ordered media
collection. A visible heading names a section; heading omission yields a generic
root; invalid required items omit the component. Native list/figure/caption
semantics preserve source order, captions remain visible, passive items leave
the tab order, and only real target-owned links are interactive. Responsive
geometry is component-container-driven and S19 adds zero runtime or motion.

Exhibit and Studio use exact shared markup and fixtures. Shopify gains a
localized target-native image-block section with strict omission and zero JS.

## Delivered

- Permanent S19 dossier, detailed refinement audit and ADR 0159.
- Contract `0.3.0`, registry/API/token audit, Studio metadata and canonical MDX.
- Shared conditional renderer with native section/list/figure/caption output,
  two real link examples and zero passive focus stops.
- Canonical four/two/one-track CSS, persistent captions, contained focus,
  forced-colors adaptation and no transitions/animations.
- Localized Shopify section with responsive images, alt intent, caption,
  destination, one feature recommendation, editor attributes and preset.
- Paired before/after Mobile, Tablet, Desktop and XL evidence plus untitled,
  focus, RTL/long, effective 200% type, dark, forced-colors and reduced-motion.
- Regenerated neutral Web, Webflow and Shopify assets/manifests.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate.
- Exhibit and Studio normalized component DOM is exactly equal: one named
  section, one list, five items/figures/captions, two links and no passive tab
  stops.
- Direct `200/320/520/1120px` hosts, the `584/752px` docs contexts, Arabic RTL,
  unbroken 200%-scale text, dark, forced colors, reduced motion and Tab focus
  remain contained.
- S19 has no listener, observer, timer, request, transition, animation, custom
  element, hydration, bundled asset or neutral JavaScript.
- Shopify is target-ready and passes official validation artifact
  `collage-section-s19-batch78`, revision 2.
- Canonical/Webflow/Shopify Sections CSS is source-identical; final browser and
  server sessions were closed and cleanup checks are empty.
- `site/dist` remains untouched.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections CSS | `6,795 B` | `6,662 B` | `6,861 B` | pass; `-133 B`, `199 B` remaining |
| Neutral Web component CSS | `67,136 B` | `66,965 B` | `65,536 B` | existing gap `1,429 B`; batch delta `-171 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; S19 delta `0 B` |

Canonical/Webflow/Shopify Sections copies share SHA-256
`ae5ecab17ec09ace05305af95f38c5bb5d30eb07233ec3b5792c6a28a2cc8da6`.

## Program Position

Collage Section keeps dependency depth `0`; the global graph remains `131`
edges. The regenerated matrix contains `119` dossiers and `102 of 183`
components ready for human review. S19 remains `pilot` until explicit human
stability approval.

Before / After Image Slider (`S17`) and Scrolling Text Marquee (`S18`) remain
separately queued for owner architecture input; S19 does not resolve them by
assumption.

## Risks And Open Questions

- Blocking implementation decisions: none. Passive grouping, native semantics,
  strict omission, persistent captions, target-owned activation and zero runtime
  follow accepted policy.
- Human review remains required for measure, thresholds, row size, feature span,
  crop, gap, radius, captions, focus and fixture.
- The owner must confirm the two-property API, per-target optional activation and
  corrected S19-specific Figma evidence.
- Existing total Web CSS and shared runtime program gaps remain global work; S19
  reduces CSS and adds no runtime.

## Readiness Decision

`human-review-ready`. Research, canonical source refinement, target translation,
automated gates, paired evidence and explicit human-review questions are
complete. Contract stays `pilot`; no stability promotion was made.
