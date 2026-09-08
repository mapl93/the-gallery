# Component Dossier: Product Card

Status: `human-review-ready`

Target reviewed: Neutral Web and Shopify composition

Contract: `components/contracts/product-card.contract.json`

## Recommendation

Keep Product Card as a canonical composition of Card, Badge, Button, and Price;
retain one stretched title link as the single product-detail navigation target;
keep media passive; allow the artist/vendor line to be reversibly hidden; pair
it closely with the piece title when present; then separate a complete
two-line-clamped description and required Price. Place one compact,
intrinsic-width Quick Look request over the media; reveal it on fine-pointer
hover or focus-within and keep it visible on coarse/no-hover input. Use the UI
body family, align every visible region to the Badge's compact `12px` inset, and
keep the Card surface stationary on hover. Preserve the accepted
bounded `square | portrait` media-ratio API with
`square` as the default and the existing 3:4 portrait proportion.

## Purpose And Limits

- Product Card summarizes a product in a list, grid, slider, or recommendation
  surface and navigates to product detail.
- Optional content includes artist/vendor, description, alternate hover media,
  Badge composition, a Quick Look Button, and secondary footer action. Canonical
  Price is required.
- Product Gallery owns multi-image browsing; Product Form owns variant choice,
  quantity, validation, selling plans, and cart mutation; Rating owns review
  presentation when explicitly composed by a parent.
- Product Card must not become an entire nested link, duplicate product-form
  behavior, or infer unavailable commerce services.

## Current Gallery Baseline

- Registry identity: `D1`, product; dependencies are now Card, Badge, Button,
  and Price.
- Contract: `0.7.0`, `pilot`; 13 anatomy parts, one variant, one size, four
  states, seven behavior rules, 12 properties, and 11 public token references.
- Canonical CSS and every registered renderer now compose `.card.product-card`;
  Studio retains preview sizing but no longer recreates Card visuals.
- MDX, Studio, and Shopify use passive media plus one stretched title link.
- Four-viewport and special-mode browser evidence covers the reconciled source.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard](https://html.spec.whatwg.org/multipage/grouping-content.html#the-article-element) | `article` represents a self-contained composition; links and buttons retain their own interactive semantics. | Use `article` as the container and avoid nesting interactive content. |
| [Inclusive Components: Cards](https://inclusive-components.design/cards/) | A single heading link can be stretched over a card while additional controls are positioned above it; duplicated links create repetitive focus stops. | Retain one title link, make media passive, and keep Quick Look above the stretched hit area. |
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
| Body | yes | content wrapper | Product Card | Closely grouped vendor/title plus separated description. |
| Artist/vendor | no | text | consumer/product data | Secondary metadata with reversible `showVendor` presentation. |
| Title | yes | heading plus one link | Product Card | The only product-detail navigation target. |
| Description | no | text | consumer/product data | Complete DOM text, visually clamped to two lines. |
| Price | yes | canonical Price composition | Price / parent | Always visible and independent from optional actions. |
| Footer | no | composition region | parent | Explicitly declared secondary action only; never Price. |
| Quick Look | no | Button composition | Button / target coordinator | Intrinsic-width media overlay for coherent Quick View, named with product context. |

The former Shopify-only Rating rendering was removed. Rating may return only
through an explicit slot and dependency decision.

## Variant, Size, State, And Mode Matrix

- Current variant and size: Default only. Media ratio is an independent semantic
  property with `square` default and optional `portrait`; it is not a visual
  variant or arbitrary size.
- Visual states: default, fine-pointer hover/focus-within media and Quick Look
  reveal, coarse/no-hover visible Quick Look, and title-link focus-visible.
  Whole-card elevation is suppressed.
- Interaction modes: fine pointer with hover, coarse/no-hover, keyboard focus,
  reduced motion, light/dark, and loading/lazy media.
- Compositions: with/without artist, description, hover image, badges, Quick
  Look, and footer action; Price remains present in every valid composition.
  Sold out and sale badges are target data states, not new root
  variants.
- Mobile, Tablet, Desktop, and XL pass in Exhibit and Studio. Coarse pointer,
  forced colors, reduced motion, long/localized and unbroken text, missing media,
  and an extreme localized price have explicit browser evidence. Dense multi-card
  target grids remain target-level evidence rather than base-card behavior.

## Public API And State Ownership

Current properties are `title`, `href`, `showVendor`, `vendor`, `description`,
`imageAlt`, `mediaRatio`, `hoverImage`, `badges`, `quickLookAction`, required
`price`, and optional `footer`. Slots allow canonical Badge, Button, and Price
composition without exposing internal gaps or media
transition details. Product Card does not own a controlled value. The parent
owns product data and the Quick View request; Button owns native interaction;
Product Form inside Quick View or the target commerce layer owns mutation and errors. The absence
of a primary-media slot/source property is a notable target mapping limitation,
but adding one requires a cross-target media contract rather than a Web-only URL
string.

## Token And Value Audit

- The contract exposes 11 public token references. Card owns the surface,
  border, radius, resting shadow, and clipping; Product Card suppresses hover
  translation and shadow growth using the existing resting shadow token.
- Duplicated private `--_card-*` values were removed from Product Card.
- One private `12px` inset aligns Badge, body, Price, Quick Look, and optional
  footer actions at the logical side and lower edges. The former public
  `--space-layout-element-gap` reference was removed because it no longer
  controls Product Card layout. The close `2px` identity gap, `10px` description
  separation, uppercase vendor
  tracking, and image scale are internal composition literals. They should be
  audited visually but not promoted automatically.
- Studio's shell styling was removed; only stage sizing remains site-owned.

## Visual And Content Audit

The owner selected bounded square and portrait media, with square as the
default. Canonical CSS maps square to 1:1 and portrait to the established 3:4
portrait proportion through one private value; Studio changes the real root
attribute and Shopify sections forward the same bounded choice. Vendor type,
UI-body title family, unified compact content inset, compact action overlay, badge inset, two-line
description clamp, media crop, hover scale, long title wrapping, localized price width, and
failed media now have measured evidence. A deliberately unbroken title initially
expanded from `276px` to `857px`; `overflow-wrap: anywhere` now keeps the same
fixture at `276px` with no Card or page overflow. Failed-media sourcing and
fallback assets remain target-owned. The recommendation does not choose a new
ratio.

## Accessibility And Interaction

The root is an article; its title is a heading and the only navigation link.
Media must not add a redundant link stop. Hover images use empty alt. Quick Look
remains above the stretched link, is revealed on fine-pointer hover or
focus-within, remains visible on coarse/no-hover input, carries product context
in its accessible name when repeated, and requests target-owned Quick View
without direct cart mutation. The stretched title link needs a card-sized
focus-visible indicator. Browser evidence must confirm one product-detail link,
one contextual Quick Look button, a `4px` Card focus outline with `2px` offset,
and zero-duration media transitions/transform under reduced motion. Forced
colors retains the Card-sized focus boundary.

## Responsive And Performance

Product Card is container-sized by its parent grid, not by global viewport
breakpoints. The base DOM is one article, one media region, content, and optional
composition slots. It has no Product Card-specific JavaScript,
layout observer, or network request; image loading and responsive sources are
target data concerns. It must remain inside the commerce/card-family CSS budget,
and optional hover media should not be loaded by an adapter when the feature is
disabled. The canonical D1 CSS slice measures `4,612 B` against the executable
`5,324 B` family ceiling. The broader neutral component bundle remains a documented
program-level gap; Product Card adds no JavaScript, observers, timers or
network work.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | `article card product-card`, one title link, canonical slots, CSS-only states. | Implemented and browser-evidenced. |
| Shopify | Product Liquid data, responsive `image_tag`, Badge/Button/Price snippets. | Canonical Button class, media alt rules, contextual action name, and declared composition validate. |
| React / Angular | Data props plus media/Badge/Button/Price slots; parent owns Quick View coordination. | Contract direction is viable; primary media API unresolved. |
| Figma | Card surface, content/commerce slots, media hover, Quick Look presence, and square/portrait media-ratio property. | Registered reference is the Button pilot frame; the owner-supplied screenshot is implementation inspiration, not a Figma source of truth. |
| SwiftUI / Compose | Card container, navigation overlay, image, content stack, compact media action. | Conceptual mapping only; media and navigation layering need adapter tests. |

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
| Quick Add implied direct cart mutation. | resolved | Quick Look requests target-owned Quick View and uses a contextual name. | owner + implementation |
| Quick Look placement and fill-width treatment did not match the owner's live preference. | resolved | ADR 0278 restores the media overlay and keeps the Button intrinsic-width, with hover/focus reveal and coarse/no-hover visibility. | owner + implementation |
| Product identity, description, and Price lacked spacing hierarchy. | resolved | Close artist/title pairing plus separate description and required Price tiers. | owner + implementation |
| Artist content could only be hidden by deleting its text. | resolved | `showVendor` controls reversible omission while preserving the configured artist name. | owner + implementation |
| Price belonged to the optional Footer slot and could disappear. | resolved | ADR 0279 makes `.product-card__price` required and reserves Footer for optional secondary actions. | owner + implementation |
| Quick Look did not align with the text column. | resolved | Logical inline-start now uses the same private inset as Badge, body, Price, and footer actions. | owner + implementation |
| Badge and content used different lateral and lower-edge spacing. | resolved | ADR 0280 unifies the full composition on one private `12px` logical inset without changing the accepted vertical hierarchy. | owner + implementation |
| Product title mixed editorial serif into catalog UI. | resolved | Product Card uses the UI body family under ADR 0277. | owner + implementation |
| Card hover lifted the complete surface and increased shadow. | resolved | Product Card retains the resting Card surface and suppresses hover elevation. | owner + implementation |
| Shopify used stale Button/alt/Rating composition. | resolved | Snippet now uses canonical dependencies and validates. | implementation |
| Unbroken product titles overflowed the Card. | resolved | Text regions wrap anywhere and Price/footer content can wrap without page overflow. | implementation |
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
- The first owner-directed pass confirmed one product link, zero media links,
  one contextual Quick Look button, a `48px` two-line description with
  `96px` complete scroll content, UI-body Inter typography, `"zero" 0` on the
  composed Price, and unchanged Card transform/resting shadow on hover. The
  optional media layer still changes independently.
- ADR 0278 follow-up evidence confirms Quick Look is nested inside media, hidden
  only at fine-pointer rest, visible on hover or focus-within, and uses a
  `109.4px` intrinsic-width Button inside the `360px` Card without `btn--full`.
  Light and Dark keep that width, and Card transform/shadow remain unchanged.
- Exhibit and Studio resolve the same shared fixture values and media-contained
  Quick Look anatomy; the structural parity audit remains `183/183`.
- ADR 0279 evidence confirms reversible artist omission: `Lucia Ferrer` is
  absent while `Show artist` is off, `$102.00` remains visible, and the original
  artist value returns when the control is restored. Required Price is outside
  the optional footer even when a `Save` secondary action is composed.
- ADR 0280 replaces the previous wide public layout gap with the Badge's private
  `12px` inset across body, Price, Quick Look, and optional footer actions.
  Badge, Quick Look, title, and Price content share `x = 968px` in Studio Light
  and Dark and `x = 1044.5px` in Exhibit. The optional `Save` action also starts
  at `x = 968px`; its footer has `12px` padding on every side and the Button sits
  `12px` above the Card's inner lower edge.
- Contracts, Studio, docs, component/refinement audits, neutral Web/Shopify
  adapter validation, and scoped browser checks pass.

## Risks And Open Questions

- Human visual review closed on 2026-08-12 with approval of the complete Product
  Card after the final compact-inset pass. The repository render is the accepted
  v1 visual baseline.
- Architecture boundary: a primary-media property needs a reusable target-
  agnostic media model; do not encode a Web URL or Shopify image object into the
  base contract.
- Non-blocking target debt: target-specific responsive image widths, loading
  priority, and commerce analytics remain adapter concerns.

## Readiness Decision

Approved `stable` by the owner on 2026-08-12. The accepted media ratio,
ADR 0276 hierarchy, description, typography and stationary surface, ADR 0278
compact Quick Look overlay, and ADR 0279 artist/Price/alignment follow-up are
reconciled with ADR 0280 compact full-card alignment in source, Studio, Web, and
Shopify.
Primary media remains correctly target-owned; no Web-only URL or Shopify object
was invented.
