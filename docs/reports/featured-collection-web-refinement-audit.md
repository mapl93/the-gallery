# Featured Collection Web Refinement Audit

Status: `human-review-ready`; technical refinement complete; remains `pilot`

Date: 2026-07-15

Component: S2 Featured Collection

Contract: `components/contracts/featured-collection.contract.json` (`0.3.0`,
`pilot`)

Decision: keep Featured Collection as a passive, finite merchandising section
over target-supplied Product Cards. Compose accepted Gallery dependencies,
preserve native section/list/navigation behavior, and leave product selection,
order, freshness and commercial spotlight policy to each target.

## Outcome

- A non-empty visible title and one or more Product Cards are render
  preconditions; invalid empty inputs omit the section.
- The title names both the thematic `section` and native `ul`; every ordered
  product is one `li` containing the canonical Product Card artwork.
- The optional collection action composes Link and appears only from a complete
  label/destination pair.
- Grid composes Collection Grid, Carousel composes its native focusable
  scroll/snap track, and Spotlight owns only first-record parent layout.
- Six varied fixtures cover optional content, long Spanish and Arabic names,
  mixed vendors and image alternatives without becoming public defaults.
- Site-only Featured Collection columns, portrait crop and breakpoints are
  removed. Exhibit and Studio consume the same renderer, fixture and CSS.
- Shopify now has a localized addable section with selected collection, title,
  variant, bounded target-only count and view-all visibility. It renders the
  canonical Product Card snippet.
- ADR 0146 records the passive composition and target data boundary. No
  framework dependency, component runtime, extra asset or inferred product
  policy was introduced.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Section naming | Optional H2; no relationship | Required visible H2 names root and list | pass |
| Repeated semantics | Unlabelled `div`, no items | `ul[role=list]` with one `li` per product | pass |
| Product implementation | Three reduced local cards | Six canonical `ProductCardArtwork` compositions | pass |
| Layout ownership | Duplicated Grid/Carousel plus Studio overrides | Collection Grid/Carousel classes; Spotlight-only source layout | pass |
| Optional action | Fragment URL and cancelled activation | Complete Link pair with real destination and native activation | pass |
| Empty composition | Empty header keeps `24px` gap | Empty title/products omit root; incomplete Link omits itself | pass |
| Grid response | Viewport/site rules disagree | Accepted Collection Grid container response | pass |
| Carousel | `DIV`, no focus stop, local `260px` rules | Named focusable native list, canonical track/slide geometry | pass |
| Spotlight | First-child styling with uniform fixture | First supplied canonical card spans parent tracks; target owns order | pass |
| Shopify | CSS-ready, no dedicated Liquid/data/schema | Localized addable Section Adapter; all required layers ready | pass |

## Contract And API

The five-property source surface is intentionally small:

- `variant` — `grid` by default, `carousel`, or `spotlight`.
- `title` — required non-empty visible contextual heading; targets own rank.
- `viewAllLabel` and `viewAllDestination` — optional coupled Link values.
- `products` — required ordered slot with one or more canonical Product Cards.

Featured Collection exposes no columns, card basis, current item, spotlight id,
loading flag, query, sort, limit, pagination, inventory, analytics or price
state. It has no controlled/uncontrolled store. Targets own collection choice,
records, ordering, limit, freshness, loading/error announcements and updates.
Shopify's collection/count settings are target adapter data, not neutral API.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Passive short merchandising section; full result pages and controlled sliders remain separate. |
| Anatomy and composition | `pass` | Required named section/header/title/list/items and exact canonical dependencies. |
| Variants and modes | `pass` | Grid, native Carousel lane and CSS Spotlight preserve source order and child ownership. |
| Public API | `pass` | Five semantic properties; no private density or target data promoted. |
| State ownership | `pass` | No local state; target owns records, async lifecycle and commercial policy. |
| Tokens and values | `pass` | Section rhythm/title tokens only; Link, Carousel, Collection Grid and Product Card retain their tokens. |
| Visual system | `pass` for candidate | Four paired viewports plus variants/specials; final aesthetics await owner approval. |
| Accessibility | `pass` | Native section/list/links, shared naming, focus, contrast, alternatives and forced colors. |
| Motion | `pass` | No S2 motion/runtime; inherited durations clamp to `0.00001s` and scroll is `auto` under reduce. |
| Responsive behavior | `pass` | Named containers and logical geometry; no S2 viewport or Studio behavior rule. |
| Content resilience | `pass` | One/six/empty, long, unbroken, Spanish, Arabic RTL and 200% layout contain. |
| Runtime and assets | `pass` locally / global gap | Zero S2 JS/assets; Sections stays under ceiling; global CSS/runtime exceptions remain explicit. |
| Cross-target translation | `pass` for Web/Shopify | Web generated; Shopify is `implemented`/`ready`; other targets remain documented projections. |
| Documentation parity | `pass` | Exact normalized Exhibit/Studio root DOM and one six-record renderer/fixture. |
| Verification | `pass` | Validators, official Liquid, browser matrix, temporary build, copies and diff checks pass. |

## Browser Evidence

- Evidence directory: `output/playwright/refinement-batch-61/`.
- Images: 11 baseline, 8 paired final and 8 special-mode captures.
- Paired final viewports: `390 x 844`, `768 x 1024`, `1280 x 900`, and
  `1536 x 960` in Exhibit and Studio.
- Normalized initial DOM: exact equality, `6,883` characters and FNV-1a
  `beda6dcc` in both modes.
- Default paired candidates: one named list, six `li` records and six canonical
  Product Cards at every viewport.
- Empty title and empty required products: root count `0`. Either missing
  view-all half: Link count `0`, header/title preserved.
- One-record Grid: `532px` root, two `231px` tracks, one `231px` item; the card
  does not stretch across the complete section.
- Carousel: native `UL[role=list][tabindex=0]`, `677px` client width,
  `1,888px` scroll width and six items. Two ArrowRight presses reach `640px`.
- Wide Spotlight: `1,120px` root, four `235px` tracks, first item `span 2` at
  `498px`, and original DOM order.
- Pointer action reaches `/components/collection-grid`; focused first Product
  Card plus Enter reaches `/components/product-card?work=1`.
- Focused collection Link: `2px` solid outline and `2px` offset. Light title
  and Card copy contrast is `17.93:1`; Link contrast is `5.88:1` on white.
- Long German heading, unbroken product name, Spanish, Arabic RTL, dark, forced
  colors and effective 200% layout stay within the root. Price's intentionally
  hidden accessible label is the only descendant scroll-width exception.
- Reduced motion reports `auto` scroll and `0.00001s` descendant duration.
- Fresh console inspection: zero errors and zero warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,407 B` | `6,464 B` | `6,861 B` | pass; `397 B` remaining |
| Neutral Web component CSS | `66,440 B` | `66,551 B` | `65,536 B` | existing gap is `1,015 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; `0 B` added |

S2 adds no listener, observer, timer, query, network request, formatter,
component JavaScript or asset. DOM/work scale linearly with the short supplied
collection. Targets own limits, pagination, virtualization and media policy.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced passive composition. |
| Shopify | `implemented`, `ready: true`, section-adapter; Liquid, schema, data, behavior, template composition and editor preview are ready. |
| Webflow | Canonical Sections CSS copy regenerated and source-identical. |
| React / Angular | Planned thin props/children composition with no local store. |
| Figma | Generic Studio/Button reference only; final S2 art/density require owner review. |
| SwiftUI / Compose | Documented target-native adaptive grid/horizontal lane/emphasized-first projection. |

Shopify adapter metrics after the batch are 58 target-ready components, 28
dedicated Liquid-ready components, 19 ready section schemas and no implemented
component missing required Liquid. S2 has settings `collection`, `title`,
`variant`, `product_count`, and `show_view_all`, a preset, no dead settings and
canonical `product-card` composition.

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- temporary Vite production build outside `site/dist`
- official Shopify Liquid validation for six touched Liquid/locale files,
  artifact `featured-collection-s2-batch61`, revision 1
- real Chromium interaction, responsive, content, theme, contrast,
  forced-color, reduced-motion and effective-zoom matrix
- source/generated-copy identity checks
- `git diff --check`
- clean `site/dist` status

Global structural, Exhibit/Studio and refinement audits are regenerated after
this report and recorded in Batch 61.

## Human Review Queue

1. Approve Grid density, title/action hierarchy and section spacing.
2. Approve Carousel card width, next-card affordance and direct-scroll model.
3. Approve Spotlight's first-record emphasis across product-image shapes.
4. Review the inherited Product Card square crop, type, border and Price rhythm.
5. Confirm the five-property neutral API and minimal Shopify settings surface.
6. Define collection selection, sorting and first-spotlight policy in the
   consuming product/target rather than in S2.
7. Create component-specific Figma examples after browser visual approval.

## Readiness

`ready for human review`: semantic, visual-candidate, responsive, interaction,
runtime, documentation and Web/Shopify translation evidence is complete. Human
review must approve aesthetics and the public contract before any stability
promotion. Contract remains `pilot`; no `stable` promotion was made.
