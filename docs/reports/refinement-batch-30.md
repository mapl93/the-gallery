# Component Refinement Batch 30

Status: Product Info technically refined; target/owner input required

Date: 2026-07-14

Components: Product Info

## Outcome

Product Info's dossier, semantic decision, contract, canonical CSS, shared
Exhibit/Studio renderer and Price artwork, Studio metadata, MDX, Shopify Liquid
and locales, generated adapters, browser evidence and individual audit are
reconciled. The component remains `pilot` and is intentionally not ready for
human stability review until its product-state, content-trust, Shopify editor
scope and visual direction are decided.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Research And Decision

- WAI-ARIA APG and Open UI define no Product Info widget; native document
  structure is the appropriate base rather than a synthetic role or keyboard
  model.
- HTML supplies contextual headings, rich-flow semantics, text-direction markup
  and grouped `dl` associations for product metadata.
- Shopify and mature-system evidence supports a narrow identity/Price/content
  composition with adjacent product blocks owned by the page/target.
- ADR 0115 accepts the passive contract, required canonical Price, rich
  description, native metadata, intrinsic layout and zero-runtime boundary while
  leaving state/update, sanitizer, editor-block and visual decisions explicit.

## Browser Evidence Summary

- Exact Exhibit/Studio initial outerHTML parity is `1,104` characters.
- Four viewports cover both modes; the batch stores six before and sixteen after
  images, including optional, localized/RTL, focus, dark, forced-colors and zoom
  cases.
- A 520px neutral root uses three metadata columns; 260px uses one. Mobile uses
  one column inside a 311px root with no document or component overflow.
- Optional rich description and metadata omit cleanly while required Price
  remains present and disabled in Studio.
- Long German, Spanish and Arabic identity/content wraps correctly and native
  `dir="auto"` resolves the title to RTL.
- Contrast, link focus, forced colors, reduced motion and isolated 200% zoom pass.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `5,319 B` | `5.2 KiB` | pass (`5 B` headroom; `+269 B` from recorded Batch 29 baseline) |
| Shared neutral runtime | `10,501 B` | `8 KiB` | existing exception (`2,309 B` over; no Product Info runtime code) |
| Neutral Web components CSS | `65,338 B` | `64 KiB` | pass (`198 B` headroom; `+408 B` from recorded Batch 29 baseline) |

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; known unrelated Shopify
  maturity warnings remain non-blocking backlog.
- Structural certification, Exhibit/Studio parity, static previews and global
  refinement audits pass across all 183 components.
- TypeScript, temporary Vite build, browser semantic/responsive/special-media
  probes, locale parsing, deterministic gzip, generated-copy identity, diff
  checks and explicit `site/dist` cleanliness pass.

## Required Target And Owner Input

1. Choose product-wide versus selected-variant Price and the single coordinator
   for Price, SKU, inventory, availability, URL and structured data.
2. Choose one localized update-announcement owner and cadence for product pages
   and quick views.
3. Define allowed rich-description elements/embeds and each target's sanitizer
   trust boundary.
4. Decide whether Shopify v1 requires merchant-reorderable theme/app blocks or
   accepts the current fixed Main Product composition as an adapter milestone.
5. Provide or approve Product Info's visual reference and its identity hierarchy,
   type, spacing, vendor/subtitle treatment, metadata density and rich content.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 71 dossiers
and 63 components ready for human review. Product Info is refined but blocked;
only Button is human-approved. The next dependency-safe component is Variant
Selector (review order 72).
