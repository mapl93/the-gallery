# Refinement Batch 74 — Rich Text Section

Status: Human-review-ready; no stability promotion

Date: 2026-07-16

Component: Rich Text Section (`S15`, dependency order `175`)

## Outcome

Batch 74 converts Rich Text Section from an always-emitted autonomous `article`
into a passive bounded narrative profile. A visible title creates and names a
native section, title omission produces a generic root, missing required body
omits the component, native document structure is preserved, and S15 adds zero
runtime. Exhibit and Studio use exact shared markup, while Shopify gains a
localized target-native `richtext` section.

## Delivered

- Permanent S15 dossier, detailed refinement audit, and ADR 0157.
- Contract `0.3.0`, registry/token audit, focused Studio metadata and shared
  conditional renderer.
- Canonical responsive Sections CSS with semantic type, bounded measure,
  relative flow, lists, quotations, links, focus and media containment.
- Docs heading-isolation correction so Exhibit/Studio display canonical type.
- Reconciled MDX fallback and primary-source research.
- Localized Shopify section with optional title, required `richtext`, strict
  empty omission, preset and zero JavaScript.
- Paired before/after viewport evidence plus direct widths, omission, required
  slot, localized RTL/extreme content, 200% type, themes, forced colors,
  reduced motion, focus and target media.
- Regenerated Web, Webflow and Shopify assets/manifests.

## Verification Summary

- All 183 registry components, contracts, Studio definitions and MDX pages
  validate.
- Exhibit and Studio normalized DOM is exactly equal: `747` characters, FNV-1a
  `af5cc90d`, with one named section and complete semantic fixture.
- Direct `200–1120px` hosts remain contained; the root caps at `740px`.
- Arabic RTL, unbroken content, effective 200% type, light/dark contrast,
  forced colors, reduced motion, focused link and wide media pass.
- S15 has no listener, observer, timer, request, parser, sanitizer, animation,
  custom element, hydration or neutral JavaScript.
- Shopify is target-ready; official validation passes artifact
  `rich-text-section-s15-batch74`, revision 3.
- Canonical/Webflow/Shopify Sections CSS is source-identical; final browser and
  server sessions were closed and cleanup checks are empty.
- `site/dist` remains untouched.

## Budgets

| Surface | Final | Ceiling | Result |
| --- | ---: | ---: | --- |
| Sections CSS | `6,856 B` gzip | `6,861 B` | pass; `5 B` remaining |
| Neutral Web component CSS | `67,280 B` gzip | `65,536 B` | existing program gap `1,744 B`; batch delta `+24 B` |
| Shared neutral runtime | `10,501 B` gzip | `8,192 B` | existing program gap; S15 delta `0 B` |

Canonical/Webflow/Shopify Sections copies share SHA-256
`e108f4fcfe7202dbcfd147bb2811fad4acaa6c945c934acec6b04de540852296`.

## Program Position

Rich Text Section keeps dependency depth `0`; the global graph remains `131`
edges. The dossier count becomes `115`, and human-review-ready becomes `100 of
183`. S15 remains `pilot` until explicit human stability approval.

The next dependency-ordered component is Instagram Feed (`S16`, order `176`).
Logo Bar (`S12`) and Comparison Table (`S13`) remain separately queued for
owner architecture input.
