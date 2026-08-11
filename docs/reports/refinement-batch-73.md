# Refinement Batch 73 — Shipping Info

Status: Human-review-ready; no stability promotion

Date: 2026-07-15

Component: Shipping Info (`S14`, dependency order `174`)

## Outcome

Batch 73 converts Shipping Info from an unnamed generic section into a passive,
text-complete native unordered list. Required composition is strict, optional
visuals are decorative, supporting text is optional, the layout responds to its
available container without narrow overflow, and S14 adds zero neutral runtime.
Exhibit and Studio now emit exact shared markup and Shopify gains a localized,
target-native block section.

## Delivered

- Permanent S14 dossier and detailed refinement audit.
- ADR 0156 for native list semantics, decorative visuals, API, omission,
  responsive ownership, runtime, and target translation.
- Contract `0.3.0`, registry description, focused Studio metadata, and native
  shared renderer.
- Canonical responsive Sections CSS, semantic typography, and removal of the
  Studio-only paragraph repair.
- Reconciled MDX fallback and documentation research.
- Localized Shopify section with reorderable item blocks, strict label/root
  omission, editor attributes, responsive optional images, and zero JavaScript.
- Paired before/after viewport evidence plus direct-width, required-slot,
  localized RTL/extreme, 200% type, dark, forced-color, and minimal-content
  captures.
- Regenerated Web, Webflow, and Shopify assets and manifests.

## Verification Summary

- All 183 registry components, contracts, Studio definitions, and MDX pages
  validate.
- Exhibit and Studio DOM is exactly equal: `2,064` characters, FNV-1a
  `1083a18c`, three native list items, three text-complete labels, three
  decorative visuals, and zero focusables.
- Direct `200–1120px` hosts remain contained and produce `1/1/2/3/3` tracks;
  the `1120px` host retains the `960px` maximum component measure.
- Localized Arabic RTL, long and unbroken content, doubled semantic type,
  light/dark contrast, forced colors, reduced motion, and one label-only item
  pass without overflow or content loss.
- S14 has no listener, observer, timer, request, animation, custom element,
  hydration, or neutral JavaScript.
- Shopify is target-ready and the generated Sections CSS copies are
  source-identical; official validation passes at artifact
  `shipping-info-s14-batch73`, revision 2.
- Final browser console has zero errors/warnings; `site/dist` remains untouched.

## Budgets

| Surface | Final | Ceiling | Result |
| --- | ---: | ---: | --- |
| Sections CSS | `6,861 B` gzip | `6,861 B` | pass; exact ceiling |
| Neutral Web component CSS | `67,256 B` gzip | `65,536 B` | existing program gap `1,720 B` |
| Shared neutral runtime | `10,501 B` gzip | `8,192 B` | existing program gap; S14 delta `0 B` |

Canonical/Webflow/Shopify Sections copies share SHA-256
`4a2776ba07518f5698ed88aaad0f7ca1d5b968dc09d3e54a8ae8cf90d48c4a2e`.

## Program Position

Shipping Info keeps dependency depth `0`; the global graph remains `131`
edges. The dossier count becomes `114`, and human-review-ready becomes `99 of
183`. S14 remains `pilot` until explicit human stability approval.

The next dependency-ordered component is Rich Text Section (`S15`, order
`175`). Comparison Table (`S13`) remains separately queued for the owner's
Shopify matrix architecture choice.
