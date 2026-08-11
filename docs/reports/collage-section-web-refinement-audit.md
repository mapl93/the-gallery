# Collage Section Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Collage Section (`S19`, dependency order `179`)

Contract: `components/contracts/collage-section.contract.json` `0.3.0`,
`pilot`

## Outcome

Collage Section is now a passive finite ordered media collection. An optional
visible heading creates and names a native section; an empty heading yields a
generic root; missing required items omit the component. One native list
contains target-owned figures, persistent captions and at most one recommended
feature span. Passive items no longer enter the tab order. Real destinations
remain native target-owned links with visible focus.

Exhibit and Studio use one renderer, property set, fixture and normalized DOM.
Neutral Web, Webflow and Shopify CSS projections are source-identical. Shopify
also has a localized target-native image-block section. S19 adds no neutral
runtime, assets or motion. No component was promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite art-directed media composition remains separate from Gallery Grid, Masonry, Carousel, Lightbox, commerce and provider feeds. |
| Anatomy | pass | Conditional root/header/heading, native `ul`/`li`, optional real link, required figure/media and optional persistent figcaption. |
| States, variants and sizes | pass | One passive default; titled/untitled, linked/passive, captioned/uncaptioned and feature metadata are explicitly bounded. |
| Required content | pass | `items` is required and disabled in Studio; renderer and Shopify reject false/invalid item collections instead of showing an empty shell. |
| Public API | pass | Optional `heading` plus required ordered `items`; target item records own media, alt intent, caption, feature metadata and real destination. |
| State ownership | pass | No controlled/uncontrolled value applies. Targets own navigation, Lightbox, selection, commerce and analytics. |
| Native semantics | pass | Named section, one native list, five list items, five figures and five visible captions in the shared fixture. |
| Keyboard and focus | pass | Five passive items resolve to `tabIndex -1`; two real anchors retain native behavior and an inset visible `2px` focus outline. |
| Responsive behavior | pass | Component-container response yields one track at `200/320/520px`, two at the Exhibit/Studio `584/752px` contexts, and four at `1120px`, without overflow. |
| Content resilience | pass | Short defaults, omitted heading, long Arabic RTL copy, an unbroken caption and effective 200% heading/caption type remain contained. |
| Theme, contrast and modes | pass | Persistent caption surface remains readable in light/dark; forced colors maps to `Canvas`/`CanvasText`; reduced motion reports zero animations. |
| DOM / CSS / runtime | pass | No role, passive handler, listener, observer, timer, request, transition, animation, layout loop or component asset. |
| Exhibit / Studio parity | pass | Normalized outer HTML is exactly equal; both surfaces expose five items, five captions and two links from the same renderer/fixture. |
| Generated targets | pass | Web adapter validates; canonical, Webflow and Shopify Sections CSS are SHA-256-identical. |
| Shopify target | pass | Localized addable section, validated image blocks, native figures/links, editor attributes, responsive `image_tag`, strict omission and zero JS. |
| Human stability | pending | Track thresholds, row size, feature ratio, crop, captions, focus, fixture and corrected S19 Figma evidence require explicit approval. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Root naming | Always an unnamed `section`. | Heading-labelled native section or untitled generic `div`. |
| Collection | Generic grid/item containers. | Native `ul` and ordered `li` records. |
| Media relationship | Generic image/caption descendants. | Native `figure` and persistent `figcaption`. |
| Keyboard | Five actionless `div[tabindex="0"]` stops. | Passive records have no tab stop; only two real links are focusable. |
| Caption access | Opacity `0` until hover/focus. | Computed opacity `1` in every item and input mode. |
| Motion | Hover image scale and transitions. | No S19 animation or transition. |
| Responsive | Duplicate viewport/container rules plus Studio-only `180px` rows. | One canonical component-query system and private fluid row size. |
| Shopify | Copied CSS only. | Localized target-native image-block section. |

Before evidence: `output/playwright/batch78-collage-section/before/` (`8` PNGs).

After evidence: `output/playwright/batch78-collage-section/after/` (`15` PNGs).

The final set contains paired Mobile, Tablet, Desktop and XL captures plus
untitled, keyboard focus, Arabic RTL/long content, effective 200% type, dark,
forced-colors and reduced-motion modes.

## DOM, Content And Responsive Evidence

The initial renderer in both surfaces emits:

- one `SECTION` whose `aria-labelledby` exactly matches its visible H2 id;
- one `UL`, five `LI`, five `FIGURE`, five image alternatives and five
  persistent native captions;
- two real native links and no passive item tab stops; and
- no horizontal root overflow.

Exhibit and Studio differ only in available presentation width. Normalizing the
target-unique heading id makes their complete component outer HTML exactly
equal.

| Direct host / context | Root client/scroll | Grid tracks | Result |
| ---: | ---: | --- | --- |
| `200px` | `200/200` | `168px` | one track; contained |
| `320px` | `320/320` | `268.812px` | one track; contained |
| `520px` | `520/520` | `436.812px` | one track; contained |
| Exhibit `584px` | `584/584` | `254.812px 254.812px` | two tracks; contained |
| Studio `752px` | `752/752` | `328.25px 328.266px` | two tracks; contained |
| `1120px` | `1120/1120` | four `211.203px` tracks | four tracks; contained |

The feature item spans two tracks/rows only when multiple tracks fit and returns
to one span in narrow containers. CSS never reorders source records.

Clearing the real Heading control produces `DIV`, zero heading nodes and no
`aria-labelledby`. The required Items control remains checked and disabled; the
renderer and Liquid both contain strict invalid-item omission paths. Effective
200% values resolve heading/caption type to `56px`/`28px`; a long heading and
unbroken caption remain `752/752px`, `677/677px` and `677/677px` respectively.

## Accessibility And Interaction

- Passive list items expose no role, `tabindex`, click handler or pointer-only
  behavior.
- The two linked figures use real destinations. Keyboard focus resolves to a
  visible `2px` outline with `-3px` inset offset so item clipping cannot hide it.
- Captions remain visible without pointer hover, keyboard focus, touch or
  motion. Informative media carries specific target-authored alternatives.
- Forced-colors captions resolve to white `Canvas` and black `CanvasText` in the
  test environment. The focused link retains a system-visible outline.
- S19 owns zero animations in normal and reduced-motion modes.
- Fresh final navigation reports zero component console errors or warnings; the
  known docs favicon request is not component behavior.

These choices follow native [HTML figure semantics](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element),
[WAI grouped-image guidance](https://www.w3.org/WAI/tutorials/images/groups/),
[WCAG meaningful sequence](https://www.w3.org/WAI/WCAG22/Understanding/meaningful-sequence.html)
and the [CSS Grid accessibility requirement](https://www.w3.org/TR/css-grid/#order-accessibility).
APG defines no Collage widget, so no custom ARIA role or keyboard model is added.

## Tokens, Visual System And Performance

The contract exposes 16 existing semantic tokens for primary/inverse/focus
color, H3/Body Small typography, small radius and section/container/element/grid
spacing. It exposes no column, row, crop, breakpoint, overlay, motion or target
property.

Private composition retains the `80rem` preferred measure, `8%` narrow inset,
`clamp(9rem, 22cqi, 18rem)` row size, four/two/one tracks, one 2x2 feature span,
caption inset/surface mix and focus geometry. These values are reviewable visual
decisions rather than public API.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family CSS | `6,795 B` | `6,662 B` | `6,861 B` | pass; `-133 B`, `199 B` remaining |
| Neutral Web component CSS | `67,136 B` | `66,965 B` | `65,536 B` | existing program gap becomes `1,429 B`; batch delta `-171 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; S19 delta `0 B` |

Canonical, Webflow and Shopify Sections CSS share SHA-256
`ae5ecab17ec09ace05305af95f38c5bb5d30eb07233ec3b5792c6a28a2cc8da6`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero-runtime. |
| Webflow | Source-identical CSS; CMS records and destinations remain project-owned. |
| Shopify | Target-ready localized section with image blocks, strict omission and zero JS. |
| React / Angular | Documented thin conditional native wrapper; planned. |
| Figma | Planned; registered nodes `943:7` and `1020:480` are Button evidence, not S19 approval. |
| SwiftUI / Compose | Documented native ordered grid/image/text/link translation; planned. |

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
- official Shopify validation of the section, both schema locales and generated
  Sections CSS: artifact `collage-section-s19-batch78`, revision 2
- Chromium paired viewports, direct hosts, semantics, optional heading,
  localized RTL/long/unbroken content, effective 200% type, dark, forced colors,
  reduced motion, keyboard focus, exact DOM parity and console
- source/generated identity, deterministic gzip, `git diff --check`, resource
  cleanup and tracked `site/dist` verification

## Human Review Queue

1. Approve or revise four/two/one track thresholds, fluid row size, one-feature
   recommendation, 2x2 span, crop, gap, radius and section measure/rhythm.
2. Approve persistent caption surface, inset, typography/contrast and inset
   focus geometry.
3. Confirm the two-property neutral API and target-owned optional link/
   Lightbox/commerce boundary.
4. Approve or replace the fixture and Shopify preset/editor defaults; neither is
   a universal component default or product claim.
5. Supply corrected S19-specific Figma/reference evidence.
6. Review existing total Web CSS and shared runtime program gaps separately;
   S19 reduces CSS and adds no runtime.

## Readiness

`human-review-ready`: research, canonical implementation, target translation,
evidence, documentation and automated gates are complete for stability review.
Contract remains `pilot`; no `stable` promotion was made.
