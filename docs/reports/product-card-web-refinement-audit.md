# Product Card Refinement Audit

Status: Stable; owner-approved

Date: 2026-07-20

Targets: Neutral Web source and Shopify adapter composition

Contract: `components/contracts/product-card.contract.json` (`0.7.0`, `pilot`)

## Result

Product Card consumes canonical Card, Badge, Button, and Price composition; uses
one product-detail link with passive media; lets the optional artist/vendor line
be reversibly hidden; groups it closely with the piece title when present;
visually clamps a complete description to two lines; requires a separate,
always-visible Price; places an intrinsic-width Quick Look request over the
media aligned with the content column; uses the UI
body family; aligns Badge, content, Price, Quick Look, and optional footer to one
compact `12px` inset; and keeps the whole Card stationary with its resting shadow on
hover. Exhibit, Studio, MDX,
neutral Web, and Shopify map the same anatomy. The contract is `stable`.

The owner accepted bounded `square | portrait` media with `square` as the
default. Contract, canonical CSS, shared renderer, Studio, Web and Shopify now
map that decision consistently, so the candidate is ready for explicit human
visual review. The unresolved primary-media object remains target-owned and was
not replaced with a Web-only URL property.

## Owner-Directed Live Evidence — 2026-08-12

- Studio Light and Dark render the same `360px` Product Card, owner-directed
  fixture, renderer, anatomy, and spacing.
- The description contains the complete `121`-character string. Its client
  height is `48px` at a `24px` line height while scroll height is `96px`, and
  the live result shows the automatic two-line ellipsis.
- Measured vertical tiers are `2px` between vendor and title, `12px` from title
  to description, and `12px` from description to Price content. Quick Look is
  independently positioned over the lower start edge of the media.
- On a fine pointer, Quick Look resolves to `opacity: 0` at rest and
  `opacity: 1` with active pointer events on hover or focus-within. Its Button is
  `109.4px` wide inside the `360px` Card (about `30.4%`) and has no fill-width
  modifier. The overlay is a descendant of the canonical media region in both
  Exhibit and Studio.
- Vendor, title, and description resolve to Inter through UI/body-family tokens;
  no serif is mixed into the Product Card.
- Composed Price resolves `font-feature-settings` with `"zero" 0` and visibly
  renders `$102.00` with an ordinary zero.
- Resting Card transform is `none` with shadow
  `rgba(23, 23, 23, 0.05) 0px 1px 2px`. During real pointer hover, Card remains
  `transform: none` with the identical shadow. Only optional product media
  transitions: hover image opacity becomes `1` and primary media scales to
  approximately `1.03`.
- Exhibit and Studio snapshots contain the same title, vendor, complete
  description, `$102.00` Price, and `Quick look at Celadon Study No. 4` Button.
  `npm run audit:exhibit-studio` reports all `183` components structurally shared
  with no gaps.
- Light and Dark use the same `109.4px` overlay width. In Dark the Button
  resolves to a white surface with near-black text, while Product Card remains
  stationary with its unchanged resting shadow.
- ADR 0279 follow-up evidence confirms `Show artist` removes the vendor node
  while required Price remains `$102.00`; restoring the control restores
  `Lucia Ferrer` without re-entry. The Price Studio switch is visibly on and
  disabled because the slot is required.
- Enabling the optional `Secondary action` produces a separate footer containing
  `Save`; `.product-card__price` remains a root child, is not contained by that
  footer, and remains visible before and after the action is toggled.
- After ADR 0280, Badge, Quick Look, title, and Price content all start at
  `x = 968px` in Studio Light and Dark, a zero-pixel delta. Exhibit resolves all
  four starts to `x = 1044.5px`, again with zero delta on its centered stage.
- The optional `Save` action also starts at `x = 968px`. Its footer computes to
  `12px` padding on every side, leaving the Button `12px` above the Card's inner
  lower edge while Price remains independently visible above it.

## Source Reconciliation

- `registry.json` and the contract now require `card`, `badge`, `button`, and
  `price`.
- `showVendor` defaults true and lets targets hide the artist line without
  discarding its content. Studio exposes separate `Show artist` and `Artist name`
  controls.
- `.product-card__price` is required in every valid Product Card. The optional
  `.product-card__footer` now owns secondary actions only.
- Every live renderer uses `article.card.product-card`; Studio no longer copies
  Card surface, border, radius, shadow, or clipping styles.
- Product Card exposes 11 public token references. It uses Card's existing
  resting shadow token solely to neutralize Card hover shadow growth.
- Product Card's former public `--space-layout-element-gap` reference is removed.
  One private `12px` logical inset now owns Badge, body, Price, Quick Look, and
  optional footer alignment without exposing an ineffective customization API.
- Product Card exposes `mediaRatio: square | portrait`; square maps to 1:1 and
  portrait uses the existing 3:4 Gallery portrait proportion through a private
  CSS value.
- The shared renderer and all reconciled MDX examples use passive media plus one
  stretched title link. The resulting rendered Card has one link and no media
  link.
- The title link produces a Card-sized `4px` focus-visible outline with a `2px`
  offset. Other interactive descendants remain above the stretched link.
- Quick Look uses an intrinsic-width Button over the media, appears on
  fine-pointer hover or focus-within, remains visible for coarse/no-hover input,
  has a product-specific accessible name, and requests target-owned Quick View
  without direct mutation.
- Reduced motion removes Card, image, and hover-media transitions and
  suppresses image scaling.
- Long text uses resilient wrapping; Price and optional footer actions can wrap
  without expanding their container.
- Studio edits `data-media-ratio` on the actual shared Product Card renderer;
  there is no preview-only crop implementation.
- Studio edits the real `showVendor` composition and required Price anatomy;
  Exhibit consumes the same renderer, fixture values, and CSS without parallel
  markup.
- The Shopify snippet uses canonical Button classes, a meaningful primary image
  fallback alt, an empty alternate-image alt, contextual Quick Look naming, and no
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

### Earlier semantics and interaction baseline

- Before ADR 0276, the rendered DOM had one product-detail link, zero media links,
  and one Button named `Quick add Celadon Study No. 4`.
- Earlier keyboard evidence moved from Quick Add to the title link; the title matches
  `:focus-visible` and the Card outline resolves to `4px solid` with `2px`
  offset.
- The earlier `390 x 844` touch context reports coarse pointer and no hover. Quick Add
  resolves to opacity `1`, `pointer-events: auto`, and zero translation without
  horizontal overflow. Evidence:
  `product-card-coarse-mobile.png`.
- Forced colors plus reduced motion retains the Card focus outline. Card, image,
  and former action transition durations resolve to `0s`; primary image transform is
  `none`. Evidence:
  `product-card-forced-colors-reduced-motion-desktop.png`.

### Content resilience before/after

The earlier stress fixture used a long localized vendor and descriptor, an unbroken
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

- Canonical D1 CSS slice: `4,612 B`, below the executable `5,324 B` ceiling.
- The current neutral component CSS aggregate diagnostic remains above its
  program-level ceiling; the overage is explicitly reported by
  `audit:refinement:performance` and was not hidden by raising the budget.
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

## Final Owner Review

- The owner approved the complete Product Card on 2026-08-12 after live Light
  and Dark review, including square/portrait crops, optional artist visibility,
  required Price, separated content tiers, unified compact inset, intrinsic-width
  Quick Look, automatic two-line ellipsis, UI typography, ordinary zeroes, and
  the stationary Card surface.
- The owner's direct response to the explicit stability question was to close
  the component and continue to the next one. This satisfies the human
  certification gate; the contract is `stable`.
- Primary-media source objects, focal points, failure fallback and loading remain
  target-owned and do not alter the accepted neutral baseline.
