# Product Info Refinement Dossier

Status: Human-review-ready; remains `pilot`

Date: 2026-07-20

Registry: `D3` / Product / dependency order `59`

Accepted direction: D3-A / ADR 0239

## Purpose And Limits

Product Info is the passive reading surface for a product's identity, one
canonical Price, an optional semantic rich description, and optional name-value
metadata. It can truthfully present either unresolved product-level information
or the exact selected-variant projection supplied by its owning product surface.

It does not own product or variant state, selection controls, media, purchase
controls, money formatting, availability logic, URL state, structured data,
requests, announcements, or editor block order. Breadcrumb, Rating, Variant
Selector and Product Form remain sibling dependencies of the page or Quick View
coordinator.

## Research Dossier

### Web And Accessibility Standards

WAI-ARIA APG and Open UI define no Product Info widget. The appropriate base is
ordinary native document structure rather than a custom role or keyboard model.
The title uses the contextual native heading rank; metadata uses one `dl` with
complete grouped `dt`/`dd` pairs; unknown plaintext can use `dir="auto"`; rich
content keeps its own headings, paragraphs, lists, links, language and direction.

- [WAI-ARIA APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [WAI heading structure](https://www.w3.org/WAI/tutorials/page-structure/headings/)
- [Open UI components](https://open-ui.org/components/)
- [HTML description lists](https://html.spec.whatwg.org/multipage/grouping-content.html#the-dl-element)
- [HTML text direction](https://html.spec.whatwg.org/multipage/dom.html#the-dir-attribute)

### Mature-System Comparison

Radix has no Product Info primitive; its composition guidance supports preserving
the semantic contract of the canonical Price dependency. Polaris product
surfaces are application compositions rather than a neutral storefront Product
Info API. Shopify distinguishes product-wide `price_min`, `price_max` and
`price_varies` from exact selected-variant facts, and requires dependent media,
price and availability to update together. Its granular `option_values` and
Section Rendering guidance avoid serializing an unbounded variant catalogue.

- [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition)
- [Shopify variant guidance](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants)
- [Shopify product object](https://shopify.dev/docs/api/liquid/objects/product)
- [Shopify sections](https://shopify.dev/docs/storefronts/themes/architecture/sections)
- [Shopify blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks)
- [Shopify high-variant products](https://shopify.dev/docs/storefronts/themes/product-merchandising/variants/support-high-variant-products)

### Repository And Owner Evidence

The prior repository candidate already established the editorial hierarchy,
canonical Price composition, rich-flow description, intrinsic metadata columns,
and shared Exhibit/Studio renderer. The owner accepted D3-A: Product Info stays
passive while one product-page or Quick View coordinator supplies a truthful
product or exact-variant projection and owns at most one localized status.

The registered Figma frame is a generic Studio/Button surface rather than a
Product Info artwork. It is evidence for the inspector layout only. Final approval
is still required for title/vendor/subtitle treatment, spacing, metadata density,
and rich-description styling.

## Recommended And Accepted Direction

- Before variant resolution, render a target-formatted product Price range and
  product-level metadata only.
- After resolution, render exact selected-variant Price, SKU, inventory and
  availability.
- Keep `data-product-info-projection="product|variant"` as target diagnostics,
  not public neutral configuration.
- Let one target coordinator atomically synchronize Product Gallery, Product
  Info, Variant Selector, Product Form, URL, structured data and one status.
- Keep rich-description sanitization and allowed embeds as target security
  policy; do not expose them as component properties.
- Preserve merchant-reorderable Shopify blocks and app blocks in the target
  adapter without promoting editor composition to the neutral API.

## Anatomy

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root | yes | Ordinary content container | Product Info |
| Identity | yes | Vendor/title/subtitle cluster | Product Info |
| Vendor | no | Plain brand/vendor text | Target content |
| Title | yes | One contextual native heading | Target chooses rank |
| Subtitle | no | Supporting editorial text | Target content |
| Price | yes | One canonical Price composition | Price dependency |
| Description | no | Semantic rich-flow container | Target content/security policy |
| Metadata | no | Native `dl` | Product Info structure |
| Metadata group | yes when metadata exists | Grouped `dt`/`dd` | Target data/localization |

Empty optional wrappers are omitted. The metadata list is absent when it has no
complete name-value pairs.

## State, Variant, Size, And Mode Matrix

Product Info has one passive component state and one intrinsic size. Projection
is target data, not a component-owned state machine.

| Projection/case | Price | Metadata | Expected result |
| --- | --- | --- | --- |
| Product unresolved, varying prices | Formatted min–max range | Product-level only | Truthful unresolved view |
| Exact variant | Exact variant value/compare/unit | Product plus exact SKU, inventory, availability | Truthful selected view |
| Unavailable combination | Product range | No variant-only fields | Remains visible; coordinator reports outcome |
| No description | Required Price remains | Description wrapper omitted | Valid |
| No metadata | Required Price remains | `dl` omitted | Valid |
| Long/localized/RTL | Same anatomy | Intrinsic wrap and native reading order | No overflow or DOM swap |
| Dark/forced colors/reduced motion | Same content | System/theme colors; no animation | Preserved semantics |

## Public API And Ownership

The stable neutral API is deliberately small:

| Property | Type | Required | Meaning |
| --- | --- | --- | --- |
| `title` | string | yes | Non-empty visible product title |
| `vendor` | string | no | Vendor or brand line |
| `subtitle` | string | no | Editorial subtitle or edition note |
| `price` | slot | yes | One canonical Price composition |
| `description` | slot | no | Target-owned semantic rich content |
| `metadata` | slot | no | Complete localized `dl` groups |

There is no controlled/uncontrolled API because the component is passive. Variant
id, option-value ids, range values, loading/error state, URL, structured data,
announcement text, Liquid blocks and sanitizer configuration remain target data
or parent composition.

## Tokens And Visual Audit

The contract references 13 existing public semantic tokens: primary/secondary
text, the layout element gap, heading/accent families, and paired h2/h4/body-sm/
article size-line-height tokens. Canonical CSS derives only two private spacing
values (`--_product-info-identity-gap` and `--_product-info-content-gap`). No
hardcoded color, spacing, border, icon, breakpoint, animation, or component token
was added for D3-A.

The visual composition is container-driven. Identity uses a tight editorial
cluster, Price is a distinct required block, rich content follows native flow,
and metadata resolves intrinsic columns from available inline size. Product Info
owns no iconography, border, surface, fixed dimension, or viewport query.

## Accessibility And Interaction Audit

- One visible contextual heading; no redundant root role or accessible name.
- Native description-list associations and semantic rich-content descendants.
- `dir="auto"` for unknown identity/scalar values; canonical Price uses `bdi`.
- Root stays out of the tab order; native links retain their own focus behavior.
- No component listener, request, observer, timer, animation, formatter, live
  region, or controlled state.
- One stable target status lives outside Product Info and reports the atomic
  variant update without duplicate announcements.
- Forced colors remains readable and reduced motion finds zero animated
  descendants.

## Cross-Target Translation

| Target | Translation | Result |
| --- | --- | --- |
| Neutral Web | Native heading, canonical Price slot, rich flow, native `dl`; CSS only | Implemented and validated |
| React/docs | Shared renderer and fixture; parent supplies exact projection | Implemented; exact Exhibit/Studio parity |
| Shopify | Liquid accepts product or variant; Main Product blocks compose siblings; target JS uses granular Section Rendering | Implemented and scoped Theme Check clean |
| Figma | Visible anatomy and optional slots; projection/update policy remains annotation | Planned; component artwork approval pending |
| SwiftUI/Compose | Native identity stack, formatted Price dependency, rich text and labelled metadata | Planned; parent owns selection and announcement |

The Shopify coordinator keeps at most one in-flight request, aborts a superseded
request, replaces one bounded render region, restores option focus, updates the
visible URL to `variant` or `option_values`, updates structured data from the same
server response, dispatches one target event, and cleans disconnected roots. It
does not enter the neutral runtime.

## Content, Responsive, And Runtime Evidence

- Exhibit and Studio `.product-info` outer HTML is exactly equal (`1,460`
  characters), with one root, one Price, six metadata groups and three exact-
  variant groups.
- Mobile, Tablet, Desktop and XL roots have equal client and scroll widths in
  both surfaces. Mobile renders two metadata columns; wider fixtures render three.
- Omitting description and metadata removes both wrappers while one required
  canonical Price remains.
- A long Arabic title computes RTL and has `520 / 520` client/scroll width.
- Forced colors and reduced motion preserve content with zero animated
  descendants. Dark mode resolves readable theme colors.
- At 200% zoom the effective 131px component and 390px document both have equal
  client/scroll widths, and metadata collapses to one column.
- A deterministic Shopify harness proves resolved `variant=222` and unresolved
  `option_values=11` URLs, exact/range projection, structured-data synchronization,
  one live region, focus restoration, event detail and cleared `aria-busy`.
- Browser console: zero errors and zero warnings.

Evidence manifest:
`output/playwright/refinement-product/product-info-0239/manifest.json`.

## Performance

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | existing documented `5,449 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | existing documented `13,441 B` gap |
| Shopify product coordinator | `2,075 B` | target evidence | target-only; no neutral delta |

Product Info itself adds zero neutral runtime. The overall performance audit has
zero undocumented gaps and no ceiling was raised.

## Risks And Open Questions

- Human visual approval remains required for hierarchy, typography, spacing,
  metadata density and rich-description styling.
- Each adapter must document its rich-content sanitizer and allowed-embed policy;
  this is a target security requirement, not an open neutral API decision.
- The Shopify coordinator is validated with deterministic Section Rendering
  responses and Theme Check, not a live merchant catalogue. A live-theme
  integration pass remains target release evidence.
- Existing neutral CSS/runtime distribution gaps remain program-level risks.

## Readiness Recommendation

Product Info is ready for explicit human stability review. Its semantics,
projection truth, API boundary, composition, responsive behavior, accessibility,
runtime ownership, Shopify translation and Exhibit/Studio parity are reconciled.
It remains `pilot`; no `stable` promotion is authorized without owner approval.
