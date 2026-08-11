# Product Card Refinement Audit

Status: Human-review-ready; final visual approval pending

Date: 2026-07-20

Targets: Neutral Web source and Shopify adapter composition

Contract: `components/contracts/product-card.contract.json` (`0.3.0`, `pilot`)

## Result

Product Card now consumes canonical Card, Badge, Button, and Price composition;
uses one product-detail link with passive media; keeps quick add separately
focusable and visible without hover; and maps the same anatomy through Exhibit,
Studio, MDX examples, neutral Web, and Shopify. The contract remains `pilot` and
is not promoted automatically.

The owner accepted bounded `square | portrait` media with `square` as the
default. Contract, canonical CSS, shared renderer, Studio, Web and Shopify now
map that decision consistently, so the candidate is ready for explicit human
visual review. The unresolved primary-media object remains target-owned and was
not replaced with a Web-only URL property.

## Source Reconciliation

- `registry.json` and the contract now require `card`, `badge`, `button`, and
  `price`.
- Every live renderer uses `article.card.product-card`; Studio no longer copies
  Card surface, border, radius, shadow, or clipping styles.
- Product Card exposes 10 Product Card-owned public tokens. Card-owned surface
  tokens and private `--_card-*` aliases were removed.
- Product Card exposes `mediaRatio: square | portrait`; square maps to 1:1 and
  portrait uses the existing 3:4 Gallery portrait proportion through a private
  CSS value.
- The shared renderer and all reconciled MDX examples use passive media plus one
  stretched title link. The resulting rendered Card has one link and no media
  link.
- The title link produces a Card-sized `4px` focus-visible outline with a `2px`
  offset. Other interactive descendants remain above the stretched link.
- Quick add is visible for `(hover: none)` or `(pointer: coarse)` and has a
  product-specific accessible name.
- Reduced motion removes Card, image, hover-media, and quick-add transitions and
  suppresses image scaling.
- Long text uses resilient wrapping; the footer can wrap without expanding its
  container.
- Studio edits `data-media-ratio` on the actual shared Product Card renderer;
  there is no preview-only crop implementation.
- The Shopify snippet uses canonical Button classes, a meaningful primary image
  fallback alt, an empty alternate-image alt, contextual quick-add naming, and no
  undeclared Rating composition.

## Browser Evidence

The four-view matrix contains eight shared-renderer screenshots:

- Mobile `390 x 844`: `product-card-exhibit-mobile.png`,
  `product-card-studio-mobile.png`.
- Tablet `768 x 1024`: `product-card-exhibit-tablet.png`,
  `product-card-studio-tablet.png`.
- Desktop `1280 x 800`: `product-card-exhibit-desktop.png`,
  `product-card-studio-desktop.png`.
- XL `1600 x 1000`: `product-card-exhibit-xl.png`,
  `product-card-studio-xl.png`.

All files live under `output/playwright/refinement-calibration/`. The shared
fixture and canonical classes are unchanged between Exhibit and Studio; Studio
only adds its inspector.

The accepted ratio follow-up adds twelve screenshots under
`output/playwright/refinement-calibration/product-card-0221/`: Exhibit square,
Studio square and Studio portrait at Mobile, Tablet, Desktop and XL. The browser
resolves the portrait root to `data-media-ratio="portrait"`, computed
`aspect-ratio: 3 / 4`, and a contained `360px` card at the Mobile stage width.

### Semantics and interaction

- Rendered DOM: one product-detail link, zero media links, and one Button named
  `Quick add Celadon Study No. 4`.
- Keyboard focus moves from quick add to the title link; the title matches
  `:focus-visible` and the Card outline resolves to `4px solid` with `2px`
  offset.
- A `390 x 844` touch context reports coarse pointer and no hover. Quick add
  resolves to opacity `1`, `pointer-events: auto`, and zero translation without
  horizontal overflow. Evidence:
  `product-card-coarse-mobile.png`.
- Forced colors plus reduced motion retains the Card focus outline. Card, image,
  and quick-add transition durations resolve to `0s`; primary image transform is
  `none`. Evidence:
  `product-card-forced-colors-reduced-motion-desktop.png`.

### Content resilience before/after

The stress fixture used a long localized vendor and subtitle, an unbroken
product title, an extreme localized price, and a failed media URL.

- Before: the title had `857px` scroll width inside a `276px` title region and
  expanded Card scroll width to `881px`. Evidence:
  `product-card-extreme-content-coarse-mobile.png`.
- After: the same title resolves `overflow-wrap: anywhere`; title width remains
  `276px`, Card scroll width equals its `324px` client width, and the page has no
  horizontal overflow. Evidence: `product-card-extreme-content-mobile-after.png`.
- Failed media preserves its meaningful alt text. The neutral component does not
  invent a fallback asset or network handler; that data/source policy remains
  target-owned.

## Performance

- Product family CSS: `4,448 B`, below the executable `5,324 B` ceiling.
- Neutral component CSS bundle: `68,944 B`, `3,408 B` above its `65,536 B`
  ceiling; the program-level overage remains explicitly documented and was not
  hidden by raising the budget.
- Product Card component JavaScript, observers, timers, and network assets: zero.
- Hover media remains optional target data; adapters should not request it when
  the feature is absent.

## Validation

- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:docs`
- `npm run audit:components`
- `npm run audit:refinement`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `git diff --check`

The Shopify Liquid skill validator also passes the Product Card snippet, three
owning sections and English/Spanish schema locales after validating the optional
snippet parameter. Known adapter warnings concern other planned contracts;
Product Card validates as target-ready. `site/dist` was not rebuilt.

## Human Review Boundary

- Review square and portrait crops, card rhythm, typography, quick-add placement
  and catalog density using the repository evidence; this audit does not claim
  final visual approval.
- The contract remains `pilot` until explicit human promotion.
- Primary-media source objects, focal points, failure fallback and loading remain
  target-owned and are not a blocker for reviewing this neutral candidate.
