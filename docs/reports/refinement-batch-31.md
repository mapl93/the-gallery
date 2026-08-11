# Component Refinement Batch 31

Status: Variant Selector technically refined; target/owner input required

Date: 2026-07-14

Components: Variant Selector

## Outcome

Variant Selector's dossier, semantic decision, contract, canonical CSS, shared
Exhibit/Studio renderer and fixture, Studio metadata, MDX, Shopify Liquid and
locales, generated adapters, browser evidence and individual audit are
reconciled. It remains `pilot` and is intentionally not ready for human stability
review until its commerce coordination, availability, target maturity and visual
decisions are made.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Browser Evidence Summary

- Exact Exhibit/Studio initial outerHTML parity is `2,162` characters.
- Four viewports cover both modes; five before and thirteen after images also
  cover isolated Web, localized RTL, dark, forced-colors/reduced-motion and 200%
  zoom cases.
- Two fieldsets/legends and seven native radios expose correct group/option names
  with no redundant roles. Every target is at least 44×44px.
- ArrowRight changes the checked value/focus/derived legend and emits native
  `input` then `change`; FormData, required validity and reset pass in the
  isolated generated adapter.
- Studio's ten semantic controls all bind and reset. The contradictory selected-
  value editor is absent.
- Narrow neutral/mobile roots, long Arabic content, RTL and 200% zoom have no
  component overflow. Dark contrast and forced-color/reduced-motion states pass.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `5,306 B` | `5.2 KiB` | pass (`18 B` headroom; `-13 B` from Batch 30) |
| Shared neutral runtime | `10,501 B` | `8 KiB` | existing exception (`2,309 B` over; no Variant Selector runtime) |
| Neutral Web components CSS | `65,441 B` | `64 KiB` | pass (`95 B` headroom; `+103 B` from Batch 30) |

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; known maturity warnings
  remain non-blocking target backlog.
- Temporary Vite build, native semantic/interaction probes, parity, four
  viewports, special media, locale parsing, deterministic gzip, structural/
  static-preview/refinement audits and explicit `site/dist` cleanliness pass.

## Required Target And Owner Input

1. Choose the product-page/quick-view coordinator for selected options, variant
   id, availability, URL, Price, media, SKU/inventory, selling plans, submit state,
   analytics and one localized update status.
2. Choose whether commercially unavailable values remain selectable, become
   native-disabled, or follow a product/target policy.
3. Decide whether Shopify high-variant and combined-listing live/editor parity is
   a v1 human-review gate.
4. Choose persistent, supplementary or visually hidden swatch-name presentation;
   tooltip-only naming is insufficient.
5. Provide or approve the Variant Selector visual reference and swatch/pill,
   selected/focus/unavailable, spacing and typography direction.

## Program Progress

After regenerating the matrix, the program contains 183 components, 105
dependency edges, 72 dossiers and 63 components ready for human review. Variant
Selector is refined but blocked; only Button is human-approved. The next
dependency-safe component is Product Form (review order 73).
