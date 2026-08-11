# Component Dossier: Product Card

Status: `human-review-ready`

Target reviewed: Neutral Web and Shopify composition

Contract: `components/contracts/product-card.contract.json`

## Recommendation

Make Product Card a canonical composition of Card, Badge, Button, and Price;
retain one stretched title link as the single product-detail navigation target;
keep media passive; keep quick add as a separately focusable Button above the
stretched link; and reveal quick add persistently on coarse/no-hover pointers.
Remove Studio's duplicated shell visuals and align the Shopify snippet with the
same contract. Apply the accepted bounded `square | portrait` media-ratio API,
with `square` as the default and the existing 3:4 portrait proportion, without
exposing arbitrary numeric ratios.

## Purpose And Limits

- Product Card summarizes a product in a list, grid, slider, or recommendation
  surface and navigates to product detail.
- Optional content includes vendor, subtitle, alternate hover media, Badge
  composition, Price composition, and a quick-add Button.
- Product Gallery owns multi-image browsing; Product Form owns variant choice,
  quantity, validation, selling plans, and cart mutation; Rating owns review
  presentation when explicitly composed by a parent.
- Product Card must not become an entire nested link, duplicate product-form
  behavior, or infer unavailable commerce services.

## Current Gallery Baseline

- Registry identity: `D1`, product; dependencies are now Card, Badge, Button,
  and Price.
- Contract: `0.3.0`, `pilot`; 12 anatomy parts, one variant, one size, five
  states, five behavior rules, ten properties, and 10 Product Card-owned public
  tokens after removing duplicated Card surface tokens.
- Canonical CSS and every registered renderer now compose `.card.product-card`;
  Studio retains preview sizing but no longer recreates Card visuals.
- MDX, Studio, and Shopify use passive media plus one stretched title link.
- Four-viewport and special-mode browser evidence covers the reconciled source.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-article-element) | `article` represents a self-contained composition; links and buttons retain their own interactive semantics. | Use `article` as the container and avoid nesting interactive content. |
| [Inclusive Components: Cards](https://inclusive-components.design/cards/) | A single heading link can be stretched over a card while additional controls are positioned above it; duplicated links create repetitive focus stops. | Retain one title link, make media passive, and keep quick add above the stretched hit area. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Card is a compositional surface; `asChild`/link usage does not prescribe commerce behavior. | Product Card should consume Gallery Card for its shell and keep commerce semantics in its own composition. |
| [Shopify Dawn product card](https://github.com/Shopify/dawn/blob/main/snippets/card-product.liquid) | A mature commerce card handles media ratios, secondary images, badges, vendor, price, ratings, quick add, unavailable states, and responsive image loading through explicit settings. | Gallery should map product data and composed dependencies, but not copy Dawn's large merchant API or choose its visual ratio by assumption. |
| [Shopify Polaris Clickable](https://shopify.dev/docs/api/app-home/web-components/actions/clickable) | Clickable regions need one clear destination and must account for nested interactive children. | Keep a single navigation target and separately layered action controls. |
| [UC Berkeley card accessibility](https://dap.berkeley.edu/websites/accessibility-guidance-developers/card-ui-component) | Card groups need logical headings, descriptive links, and careful treatment of whole-card click behavior. | Preserve heading structure and a meaningful product-title link name. |

There is no Product Card-specific APG or Open UI pattern. Native HTML semantics
and established card accessibility guidance are the relevant evidence.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `article.card.product-card` | Card + Product Card | Card owns surface; Product Card owns layout. |
| Media | yes | passive container | Product Card | Contains one primary visual and optional hover layer. |
| Primary image | yes | `img` or target media | consumer/product data | Meaningful alt when the image adds information. |
| Hover image | no | decorative alternate image | consumer/product data | Empty alt because it is the same product purpose. |
| Badge stack | no | Badge compositions | Badge | Sale, new, or availability labels. |
| Quick add | no | Button composition | Button / product workflow | Separately focusable and named with product context. |
| Body | yes | content wrapper | Product Card | Vendor, title, subtitle. |
| Vendor | no | text | consumer/product data | Secondary metadata. |
| Title | yes | heading plus one link | Product Card | The only product-detail navigation target. |
| Subtitle | no | text | consumer/product data | Short descriptor. |
| Footer | no | composition region | Price / parent | Price and explicitly declared secondary content. |

The former Shopify-only Rating rendering was removed. Rating may return only
through an explicit slot and dependency decision.

## Variant, Size, State, And Mode Matrix

- Current variant and size: Default only. Media ratio is an independent semantic
  property with `square` default and optional `portrait`; it is not a visual
  variant or arbitrary size.
- Visual states: default, fine-pointer hover/focus-within media transition,
  quick-add visible, and title-link focus-visible.
- Interaction modes: fine pointer with hover; coarse/no-hover with persistent
  quick add; keyboard focus; reduced motion; light/dark; loading/lazy media.
- Compositions: with/without vendor, subtitle, hover image, badges, quick add,
  footer/price; sold out and sale badges are target data states, not new root
  variants.
- Mobile, Tablet, Desktop, and XL pass in Exhibit and Studio. Coarse pointer,
  forced colors, reduced motion, long/localized and unbroken text, missing media,
  and an extreme localized price have explicit browser evidence. Dense multi-card
  target grids remain target-level evidence rather than base-card behavior.

## Public API And State Ownership

Current properties are `title`, `href`, `vendor`, `subtitle`, `imageAlt`,
`mediaRatio`, `hoverImage`, `badges`, `quickAddAction`, and `footer`. Slots allow canonical
Badge, Button, and Price composition without exposing internal gaps or media
transition details. Product Card does not own a controlled value. The parent
owns product data and quick-add operation; Button owns busy/disabled semantics;
Product Form or the target commerce layer owns mutation and errors. The absence
of a primary-media slot/source property is a notable target mapping limitation,
but adding one requires a cross-target media contract rather than a Web-only URL
string.

## Token And Value Audit

- The contract exposes 10 Product Card-owned public tokens; Card owns surface,
  border, radius, shadow, clipping, and lift tokens.
- Duplicated private `--_card-*` values were removed from Product Card.
- `12px` in badges and quick-add positioning, `4px` local gaps, uppercase vendor
  tracking, and image scale are internal composition literals. They should be
  audited visually but not promoted automatically.
- Studio's shell styling was removed; only stage sizing remains site-owned.

## Visual And Content Audit

The owner selected bounded square and portrait media, with square as the
default. Canonical CSS maps square to 1:1 and portrait to the established 3:4
portrait proportion through one private value; Studio changes the real root
attribute and Shopify sections forward the same bounded choice. Vendor type,
heading scale, body/footer padding, badge inset, quick-add
inset, media crop, hover scale, long title wrapping, localized price width, and
failed media now have measured evidence. A deliberately unbroken title initially
expanded from `276px` to `857px`; `overflow-wrap: anywhere` now keeps the same
fixture at `276px` with no Card or page overflow. Failed-media sourcing and
fallback assets remain target-owned. The recommendation does not choose a new
ratio.

## Accessibility And Interaction

The root is an article; its title is a heading and the only navigation link.
Media must not add a redundant link stop. Hover images use empty alt. Quick-add
must be reachable without hover, remain above the stretched link, carry product
context in its accessible name when repeated, and preserve native Button focus
and busy behavior. The stretched title link needs a card-sized focus-visible
indicator. Browser evidence confirms one product-detail link, a contextual quick
add name, a `4px` Card focus outline with `2px` offset, persistent coarse-pointer
quick add, and zero-duration transitions/transform under reduced motion. Forced
colors retains the Card-sized focus boundary.

## Responsive And Performance

Product Card is container-sized by its parent grid, not by global viewport
breakpoints. The base DOM is one article, one media region, content, and optional
composition slots. It has no Product Card-specific JavaScript,
layout observer, or network request; image loading and responsive sources are
target data concerns. It must remain inside the commerce/card-family CSS budget,
and optional hover media should not be loaded by an adapter when the feature is
disabled. Product CSS measures `4,448 B` against the executable `5,324 B`
family ceiling. The broader neutral component bundle remains a documented
program-level gap; Product Card adds no JavaScript, observers, timers or
network work.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `article card product-card`, one title link, canonical slots, CSS-only states. | Implemented and browser-evidenced. |
| Shopify | Product Liquid data, responsive `image_tag`, Badge/Button/Price snippets. | Canonical Button class, media alt rules, contextual action name, and declared composition validate. |
| React / Angular | Data props plus media/Badge/Button/Price slots; parent owns quick-add operation. | Contract direction is viable; primary media API unresolved. |
| Figma | Card surface, content/commerce slots, hover/quick-add states, and square/portrait media-ratio property. | Registered reference is the Button pilot frame; Product Card-specific visual reference remains absent. |
| SwiftUI / Compose | Card container, navigation overlay, image, content stack, separate action. | Conceptual mapping only; media and navigation layering need adapter tests. |

## Exhibit And Studio Parity

The registered shared renderer provides the same Product Card fixture to Exhibit
and Studio. Both render `.card.product-card`, passive media, one title link, and
the same canonical CSS; Studio retains only preview sizing. Secondary MDX examples
were reconciled to the same single-link anatomy. The current design reference is
not Product Card-specific.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Card shell was missing from registry/contract dependencies. | resolved | Card is required and both classes render everywhere. | implementation |
| Studio recreated Card surface visuals. | resolved | Duplicate styles were removed; only stage sizing remains. | implementation |
| MDX used redundant media and title links. | resolved | Media is passive and one title link owns navigation. | implementation |
| Stretched link lacked a Card-sized focus treatment. | resolved | Focus-visible produces a `4px` Card outline with `2px` offset. | implementation |
| Quick add depended on hover and had a generic repeated name. | resolved | Coarse/no-hover keeps it visible and accessible names include product context. | implementation |
| Shopify used stale Button/alt/Rating composition. | resolved | Snippet now uses canonical dependencies and validates. | implementation |
| Unbroken product titles overflowed the Card. | resolved | Text regions wrap anywhere and the footer can wrap without page overflow. | implementation |
| Primary media has no cross-target property/slot. | medium | Define a target-agnostic media contract before exposing it. | architecture / owner if scope changes |
| Media aspect ratio was an aesthetic/product choice. | resolved | Owner selected bounded square/portrait, square default; ADR 0221 and four-viewport evidence reconcile it. | owner + implementation |
| No Product Card-specific external visual reference exists. | review note | Use the current repository candidate for explicit human visual review; do not infer final approval. | owner |

## Evidence And Validation

- Before baseline: existing Exhibit/Studio Mobile and Desktop parity images plus
  `product-card-extreme-content-coarse-mobile.png` for the text overflow.
- Earlier after evidence: eight four-viewport Exhibit/Studio images; coarse-pointer,
  forced-colors/reduced-motion, focus, single-link DOM, and extreme-content
  captures including `product-card-extreme-content-mobile-after.png`.
- Ratio reconciliation evidence: four Exhibit square images, four Studio square
  images, and four Studio portrait images at Mobile, Tablet, Desktop, and XL in
  `output/playwright/refinement-calibration/product-card-0221/`. Browser
  inspection resolves the selected root to `data-media-ratio="portrait"` and
  computed media `aspect-ratio: 3 / 4`.
- Browser DOM: one product link, zero media links, one contextual quick-add
  button; coarse mode resolves quick add to opacity `1` and pointer events `auto`.
- Contracts, Studio, docs, component/refinement audits, neutral Web/Shopify
  adapter validation, and scoped browser checks pass.

## Risks And Open Questions

- Final visual review remains pending; no component-specific external reference
  has been supplied, so the current repository candidate is the review surface.
- Architecture boundary: a primary-media property needs a reusable target-
  agnostic media model; do not encode a Web URL or Shopify image object into the
  base contract.
- Non-blocking target debt: target-specific responsive image widths, loading
  priority, and commerce analytics remain adapter concerns.

## Readiness Decision

Human-review-ready. The accepted square/portrait media-ratio contract,
implementation, Studio control, Web and Shopify mappings, and four-viewport
evidence are reconciled. Final visual approval remains pending and the contract
stays `pilot`. Primary media remains correctly target-owned; no Web-only URL or
Shopify object was invented.
