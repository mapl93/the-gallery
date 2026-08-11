# Instagram Feed Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Instagram Feed (`S16`, dependency order `176`)

Contract: `components/contracts/instagram-feed.contract.json` `0.3.0`,
`pilot`

## Outcome

Instagram Feed is now a passive finite media collection for target-supplied
records. A visible heading creates and names a native section; no heading yields
a generic root; no valid records yields no component. The collection uses native
list/figure/caption semantics, leaves passive records out of the tab order, and
creates native links only for real destinations. Artificial provider metrics,
hover/focus disclosure, fixed viewport columns, invented URLs, authored motion,
and neutral runtime are gone.

Exhibit and Studio use the same renderer, initial fixture, properties and
normalized DOM. Neutral Web, Webflow and Shopify CSS projections are
synchronized. Shopify also has a localized target-native media-block section.
No component was promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite supplied media remains separate from provider auth/fetch/cache/consent/moderation/analytics, infinite feed, carousel and lightbox behavior. |
| Anatomy and omission | pass | Conditional named section/generic root, required native list and valid records, optional paired account link, figures, visible captions, destinations and action. |
| Public API | pass | Optional `heading`, paired `handle`/`handleDestination`, required `items`, optional `action`; no provider, metric, columns, ratio, crop, gap, breakpoint or editor API. |
| Native semantics | pass | One `ul`, six `li`, six `figure`, six `figcaption`, six images with alternatives; no APG `feed`, `role=list`, `role=listitem`, roving focus or custom keys. |
| Keyboard and focus | pass | Three passive items have zero focusables; real keyboard traversal reaches item links with `2px` solid focus and `2px` offset. |
| Responsive containment | pass | Paired viewports and direct `200–740px` assignments remain contained; intrinsic tracks respond to component space without S16 media queries. |
| Localized/extreme content | pass | Arabic RTL, long account label, missing caption, unbroken caption and effective 200% title/account/caption type remain contained. |
| Theme and contrast | pass | Light heading/handle/caption `17.93:1` / `5.88:1` / `7.81:1`; dark `17.18:1` / `9.95:1` / `12.09:1`. |
| Forced colors and motion | pass | System colors remain visible; S16 owns no transition/animation and docs reduced-motion guard clamps globally. |
| Exhibit / Studio parity | pass | Normalized outer HTML exactly equal: `2,829` characters, FNV-1a `fbc9e923`, at all paired viewports. |
| Runtime and assets | pass | `0 B` S16 runtime; no state, event, listener, observer, timer, request, provider SDK, layout read, hydration or bundled asset. |
| Generated targets | pass | Web adapter validates; canonical, Webflow and Shopify Sections CSS are SHA-256-identical. |
| Shopify target-native adapter | pass | Dedicated localized media-block section is target-ready, strictly omits invalid/empty content and adds no JavaScript. |
| Human stability | pending | Aesthetics, provider/product policy, fixture, name and corrected S16 Figma evidence require explicit approval. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Root | Always unnamed `section`; empty required slot could leave shell. | Heading-labelled `section`, untitled `div`, strict required-record omission. |
| Collection | Six generic focusable `div` items. | Native `ul`/`li` with figures; three passive and three linked fixture records. |
| Content | Artificial like/comment counts hidden behind hover/focus overlay. | Always-visible authored figcaptions; no canonical metric fields. |
| Destinations | Account silently fell back to `#studio`; item focus did not navigate. | Account pair omits when incomplete; only real native destinations enter tab order. |
| Responsive | Fixed `6/3/2` viewport rules plus duplicate container rules and Studio overrides. | One intrinsic auto-fit grid driven by available component width. |
| Tokens / motion | Incomplete type, hardcoded gaps/colors, three transitions and image scaling. | Complete semantic typography/spacing/color profiles and no S16-authored motion. |
| Shopify | CSS-ready only. | Localized addable section with paired links, validated image blocks, captions/destinations and zero JS. |

Before evidence: `output/playwright/batch75-instagram-feed/before/`.

After evidence: `output/playwright/batch75-instagram-feed/after/`.

The final set contains `19` PNG captures plus structured measurements: paired
Mobile, Tablet, Desktop and XL; direct narrow/wide assignments; empty heading;
incomplete handle pair; optional action; Arabic RTL/extreme copy; effective 200%
type; light/dark contrast; forced colors/reduced motion; keyboard focus; and
mixed/empty/extreme captions.

## DOM And Responsive Evidence

Every initial renderer root emits:

- one visible-heading-labelled native `section` and contextual `h2`;
- one native `ul` containing six `li` and six `figure` records;
- six visible `figcaption` nodes and six informative image alternatives;
- one account link, three item links, three passive records and one canonical
  Button link; and
- no widget/feed role, generic tab stop, fake URL, hidden metric or S16 runtime.

| Viewport | Exhibit width / tracks | Studio width / tracks | Contained |
| --- | ---: | ---: | --- |
| Mobile `390x844` | `358px` / 2 | `358px` / 2 | yes |
| Tablet `768x1024` | `736px` / 4 | `736px` / 4 | yes |
| Desktop `1440x1000` | `580px` / 3 | `692px` / 3 | yes |
| XL `1920x1200` | `584px` / 3 | `752px` / 4 | yes |

The track difference at XL is the expected result of different available layout
space; the normalized renderer DOM remains exactly equal.

## Accessibility And Special Modes

- Empty Heading switches to `DIV`, removes heading/naming attributes and keeps
  content at `358/358px`.
- Empty handle label or destination omits the complete account link; the
  focusable count falls from five to four without a fake fallback.
- Arabic RTL and an unbroken account label remain contained. One removed caption
  plus one extreme unbroken caption also remains contained.
- Effective 200% type resolves heading/account/caption to `56/28/24px` and
  reflows inside `358/358px`.
- Real Tab navigation produces `:focus-visible` and a visible `2px` outline with
  `2px` offset on an item-wide link.
- Forced colors resolves heading to system black and links/captions to system
  link blue. Final fresh navigation reports zero console errors or warnings.

## Tokens, CSS, And Performance

Public tokens cover semantic H3, Body Small and Caption profiles; primary,
secondary, accent and focus colors; section/container insets; and element/grid
gaps. Private composition retains `9rem` tile minimum, `80rem` preferred maximum,
square crop, `.5em` media/caption rhythm, underline offset and focus geometry.
No component-scoped public token was added.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,856 B` | `6,795 B` | `6,861 B` | pass; `-61 B`, `66 B` remaining |
| Neutral Web component CSS | `67,280 B` | `67,136 B` | `65,536 B` | existing program gap becomes `1,600 B`; synchronized delta `-144 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; S16 delta `0 B` |

Canonical, Webflow and Shopify Sections copies share SHA-256
`064e077887f5d7c9594a3cc33919bc0a546f31d067fd4c865e98772e269b71a9`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced, zero runtime. |
| Webflow | Canonical Sections CSS regenerated and source-identical; CMS records and provider state remain target-native. |
| Shopify | Target-ready localized addable section with paired account/action links, media blocks, strict omission and no JavaScript. |
| React / Angular | Documented thin conditional native wrapper around framework records; planned. |
| Figma | Planned; current nodes `943:7` and `1020:480` are Button evidence, not S16. |
| SwiftUI / Compose | Documented target-native grid/list/image/text/link composition; planned. |

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run build:components`
- `npm run build:adapter:web:components`
- `npm run build:adapter:shopify:components`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- `npm run audit:components`
- `npm run audit:refinement`
- `npm run audit:exhibit-studio`
- `site/node_modules/.bin/tsc --noEmit -p site/tsconfig.json`
- official Shopify validation for section, both schema locales and final
  generated Sections CSS: artifact `instagram-feed-s16-batch75`
- Chromium paired viewports, intrinsic widths, semantics, omissions, RTL,
  extreme/empty captions, effective 200% type, contrast, themes, forced colors,
  reduced motion, keyboard focus, exact parity and console
- source/generated identity, deterministic gzip, `git diff --check`, resource
  cleanup and tracked `site/dist` verification

## Human Review Queue

1. Approve or revise the `9rem` tile minimum, `80rem` preferred measure, track
   density, grid gap and square crop.
2. Approve caption placement/type/underlines, title/account/action rhythm,
   alignment, focus geometry and current mixed passive/linked fixture.
3. Confirm the five-property/slot API and passive finite v1 scope; provider
   authorization, data truth, metrics and network states remain targets.
4. Decide whether the public name should remain Instagram Feed or become
   provider-neutral in a future breaking release.
5. Supply corrected S16-specific Figma evidence; current nodes show Button.
6. Review the existing total Web CSS and shared runtime program gaps separately;
   S16 reduces CSS and adds no runtime.

## Readiness

`human-review-ready`: implementation, adapters, evidence, documentation and
automated gates are complete for stability review. Contract remains `pilot`; no
`stable` promotion was made.
