# Product Info Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-20

Accepted decision: D3-A / ADR 0239

## Outcome

Product Info is a passive, intrinsic cross-target composition for identity,
canonical Price, optional semantic rich description, and truthful product-level
or exact selected-variant metadata. One owning product-page or Quick View
coordinator synchronizes the dependent surface; Product Info adds no neutral
state, request, listener, live region, or runtime.

The unresolved architecture items from the prior audit are now settled. Shopify
implements merchant-reorderable blocks, exact/range projection and a bounded
granular Section Rendering coordinator. Exhibit and Studio use the same renderer,
fixture and canonical Price implementation. Explicit visual review and target
rich-content/live-theme release evidence remain pending. No component was
promoted to `stable`.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive identity/decision support; not selection, media, purchasing, URL, SEO or update service. |
| Anatomy and composition | pass | Required identity/title/canonical Price; optional vendor/subtitle/rich description/native metadata groups. |
| States, variants and sizes | pass | One passive state, one intrinsic size; truthful product/variant projection is target data. |
| Public API and ownership | pass | Six semantic properties; no editor, status, URL, option or sanitizer internals exposed. |
| Tokens and visual system | pass | 13 existing public semantic tokens, two private derived gaps, no new hardcoded visual values. |
| Accessibility and interaction | pass | Contextual native heading, `dl`, rich semantics, direction isolation, no root tab stop or duplicate live region. |
| Responsive/content resilience | pass | Four viewports, optional omission, long RTL, forced colors, dark, reduced motion and 200% zoom without component overflow. |
| Runtime and assets | pass | Zero neutral Product Info runtime; target coordinator is bounded and `2,075 B` gzip. |
| Cross-target translation | pass with release risk | Neutral Web/React/docs/Shopify implemented; live Shopify catalogue and target sanitizer evidence remain release work. |
| Exhibit/Studio parity | pass | Exact identical `1,460`-character `.product-info` outer HTML and shared Price artwork. |
| Performance | pass with documented program gaps | Product CSS passes; global CSS/runtime overages are documented; zero undocumented gaps. |
| Architecture/readiness | **ready for human review** | D3-A and ADR 0239 settle projection, coordinator, announcement and Shopify block ownership. |

## Implemented Result

- Contract `0.3.0` records truthful product/variant projection and the passive
  update boundary without adding public configuration.
- Shared Product Info artwork demonstrates an exact selected variant with Price,
  SKU, inventory and availability; MDX uses the same semantic projection.
- Shopify Price renders a product range only when no exact variant resolves and
  exact variant Price/compare-at/unit values after resolution.
- Shopify Product Info omits variant-only fields before resolution and renders
  localized SKU, inventory and availability after it.
- Main Product owns one stable status and one bounded render region. Merchant can
  reorder Breadcrumb, Product Info, Rating, Product Form and Certificate blocks,
  and can insert app blocks.
- Target-only `product-coordinator.js` resolves granular option-value ids through
  the Section Rendering API, cancels superseded work, atomically replaces the
  dependent surface, restores focus, updates the URL/structured data and emits
  one target event.
- Neutral Web and Shopify generated adapters were rebuilt and validated;
  `site/dist` was not rebuilt.

## Browser And Target Evidence

- Exhibit/Studio exact outer-HTML parity: `1,460` characters.
- Each surface renders one root, one canonical Price, six metadata groups, three
  variant-specific groups, no Product Info live region and no root tab stop.
- Root client/scroll widths are equal at Mobile, Tablet, Desktop and XL in both
  surfaces. Mobile uses two metadata columns; wider stages use three.
- Description and metadata can be omitted independently; Price remains exactly
  once.
- Long Arabic title computes RTL with equal `520 / 520` client/scroll width.
- Forced colors and reduced motion preserve semantics; animated descendants: `0`.
- Dark mode resolves primary `rgb(250, 250, 250)` and secondary
  `rgb(212, 212, 212)` text.
- At 200% zoom the effective 131px root and 390px document retain equal
  client/scroll widths; metadata resolves one column.
- Deterministic Shopify Section Rendering harness:
  - resolved: request contains `option_values=11&section_id=main`, visible URL
    becomes `variant=222`, projection becomes `variant`, Price is `$140`, SKU and
    structured data become `CS-04-CEL`;
  - unresolved: visible URL becomes `option_values=11`, projection becomes
    `product`, Price returns to `$120–$160`, variant-only metadata is absent;
  - both paths restore focus to the selected option, leave `aria-busy` cleared,
    emit one event, and use exactly one localized live status.
- Final docs page console: zero errors and zero warnings.

Manifest:
`output/playwright/refinement-product/product-info-0239/manifest.json`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native contextual heading, canonical Price, semantic rich flow and grouped `dl`; CSS only. | Implemented, generated and browser-tested. |
| Shopify | Product/range or exact variant Liquid projection plus block-based Main Product and target coordinator. | Implemented, adapter-validated and modified files Theme Check clean. |
| React/docs | Shared renderer receives already resolved target data; parent owns atomic updates/status. | Implemented in Exhibit and Studio. |
| Angular | Same passive DOM contract and parent-controlled projection. | Documented translation; no adapter yet. |
| Figma | Visible anatomy/optional slots; projection and trust policy are annotations. | Planned; Product Info artwork approval pending. |
| SwiftUI/Compose | Native identity stack, formatted Price dependency, rich content and labelled metadata. | Planned; parent owns selection/announcement. |

## Performance

| Surface | Final gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Product CSS | `4,803 B` | `5,324 B` | pass; `521 B` headroom |
| Neutral component CSS | `70,985 B` | `65,536 B` | documented `5,449 B` gap |
| Shared neutral runtime | `21,633 B` | `8,192 B` | documented `13,441 B` gap |
| Shopify product coordinator | `2,075 B` | target evidence | bounded target-only asset |

The full audit reports 18 surfaces, 10 pass and 8 documented gaps, with zero
undocumented gaps. Product Info adds no neutral runtime and no ceiling changed.

## Risks And Required Human Review

- Approve the identity hierarchy, serif/sans/italic relationship, spacing,
  metadata density and rich-description styling.
- Confirm each target's sanitizer and allowed-embed policy before accepting
  untrusted rich product content.
- Run a live Shopify theme integration with real high-variant, unavailable,
  media, selling-plan and app-block data before target release.
- Reduce or explicitly accept the existing neutral CSS/runtime distribution gaps
  before v1 packaging.

## Validation

Contract, Studio, docs, registry, decision coverage, JavaScript syntax, locale and
template JSON, Neutral Web adapter, Shopify adapter, scoped Theme Check, exact DOM
parity, optional slots, four viewports, long RTL, forced colors, reduced motion,
dark, 200% zoom, deterministic coordinator behavior, console, structural audit,
refinement audit, performance audit, diff checks, resource cleanup and
`site/dist` cleanliness are included in Batch 109.
