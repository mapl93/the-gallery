# Testimonials Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Testimonials (`G3`, dependency order `86`)

Contract: `components/contracts/testimonials.contract.json` `0.3.0`, `pilot`

## Outcome

Testimonials is now a passive, finite collection of attributed quotations with
one target-independent native composition: an unordered list whose items use
`figure`, `blockquote` and `figcaption`. An optional title selects a labelled
`section`; an untitled valid collection uses a neutral `div`. Empty and invalid
records cannot leave a semantic shell.

The component owns collection anatomy, intrinsic layout and presentation only.
Targets own records, verification, consent, moderation, ordering, localization,
publication and source URLs. The optional canonical Avatar remains passive and
redundant beside the visible author identity. G3 adds no neutral runtime and was
not promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive attributed quotations are separate from record retrieval, verification, consent, moderation, ratings, navigation, rotation and analytics. |
| Anatomy and omission | pass | Conditional root, optional title/mark/Avatar/detail, required native list and valid quote/name records; zero valid records omit G3. |
| Public API | pass | Optional `title` and required target-owned `items`; private geometry and record/governance fields are not public properties. |
| Native semantics | pass | One labelled section or neutral root, native `ul`/`li`, `figure`, `blockquote` and external `figcaption`; author names do not misuse `cite`. |
| Accessibility | pass | Decorative marks and redundant initials are hidden; visible attribution remains exposed; no custom role, focus stop, live region or keyboard model. |
| Responsive containment | pass | Root-container-driven one/two/three-column layout contains direct `200–1280px` roots without horizontal overflow. |
| Content resilience | pass | Untitled, minimal, Arabic RTL, long localized/unbroken and effective-200% text compositions remain valid and contained. |
| Theme, contrast and modes | pass | Light/dark text contrast passes; forced colors preserves semantic content and Avatar boundary; G3 authors no motion. |
| Exhibit / Studio parity | pass | One `MarketingStudio` renderer/fixture and canonical CSS; normalized outer HTML is exactly equal at `1,802` characters, FNV-1a `e59e95e6`. |
| DOM / CSS / runtime | pass | No G3 listener, observer, timer, request, client, formatter, asset, layout read or neutral JavaScript. |
| Generated targets | pass | Canonical, Webflow and Shopify Marketing CSS are SHA-256-identical; Web and Shopify adapters generate successfully. |
| Shopify target | pass | Valid reorderable blocks map to the same native composition with optional title, localized editor schema, empty adjacent image alt and no G3 script. |
| Human stability | pending | Final visuals and corrected G3-specific reference evidence require explicit owner review. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Root semantics | Always emitted an unnamed `section` and H2, including an empty optional title. | Non-empty title emits a labelled section/H2; untitled valid content emits a neutral `div`; invalid composition omits the root. |
| Collection semantics | `div role=list` and `figure role=listitem`. | Native `ul`/`li` with `figure` + `blockquote` + `figcaption`; no authored roles. |
| Attribution layout | Inline name/detail wrappers visibly collided. | Dedicated identity wrapper stacks name and optional detail without merging. |
| Quote decoration | CSS-generated opening mark had no explicit accessibility boundary. | Optional explicit `.testimonial__mark[aria-hidden=true]` is target-localizable and removable. |
| Responsive behavior | Viewport queries plus a Studio-only two-column override diverged across surfaces. | One named root-container implementation controls one/two/three columns for Exhibit, Studio and targets. |
| Spacing and type | Physical hardcoded padding/gaps/weight and incomplete type profiles. | Existing semantic tokens feed bounded private composition values and complete type/line-height profiles. |
| Shopify | Generic div/paragraph cards, fallback heading, invalid blocks and no complete adapter maturity. | Strict valid-record filtering, conditional root, native quotation/attribution, editor attributes, localization and target-ready adapter. |

Before evidence: `output/playwright/parity/marketing/testimonials-*.png` (`4`
Mobile/Desktop Exhibit/Studio PNGs).

After evidence: `output/playwright/batch84-testimonials/after/` (`16` PNGs):
paired Mobile, Tablet, Desktop and XL plus direct preview, `200px`, untitled,
minimal, Arabic RTL/long content, effective 200% text, dark, forced colors and
reduced motion.

## DOM, Optional Composition And Responsive Evidence

The shared initial renderer emits one labelled `SECTION` and H2, one native
`ul`, three `li`, three `figure`, three `blockquote` and three `figcaption`
elements. It authors zero roles and contains zero focusable descendants. Every
decorative mark and redundant initials Avatar is `aria-hidden`.

Normalized Exhibit and Studio outer HTML is byte-equal: `1,802` characters,
FNV-1a `e59e95e6`.

Clearing the optional title produces one `DIV`, no title and no
`aria-labelledby`, while preserving the valid list. Studio keeps the required
Testimonials slot checked and disabled. A minimal target composition with one
item and no mark, Avatar or detail remains valid, contained and free of empty
optional wrappers.

| Direct root | Root client/scroll | Grid client/scroll | Columns | Result |
| ---: | ---: | ---: | ---: | --- |
| `200px` | `200/200` | `136/136` | 1 | contained; zero card overflow |
| `320px` | `320/320` | `256/256` | 1 | contained |
| `520px` | `520/520` | `456/456` | 1 | contained |
| `700px` | `700/700` | `636/636` | 1 | usable content stays below the private `42rem` threshold |
| `900px` | `900/900` | `836/836` | 2 | contained |
| `1100px` | `1100/1100` | `1036/1036` | 3 | contained |
| `1280px` | `1280/1280` | `1216/1216` | 3 | contained |

Paired evidence uses `390x844`, `768x1024`, `1280x900` and `1536x960`
viewports. Exhibit and Studio share renderer and rules; their desktop/XL root
widths intentionally differ because the documentation surfaces provide
different containing columns.

## Accessibility, Content And Special Modes

- The accessibility snapshot exposes the region, list, list items, figures,
  quotations, paragraphs and visible Maria Garcia/Ana Lopez/Jules Rivera
  attributions. It omits the opening marks and redundant `MG/AL/JR` initials.
- Arabic RTL, long localized text and unbroken strings remain contained at a
  `688px` root and preserve logical grouping.
- Effective 200% authored type resolves to title `56/67.2px`, quote/name
  `32/48px` and detail `28/42px` font/line-height pairs; cards remain contained
  and quote/author rectangles do not overlap.
- Light contrast: title `17.93:1`, quote/name `16.44:1`, detail/Avatar text
  `7.17:1`. Dark: title `17.18:1`, quote/name `14.50:1`, detail/Avatar
  `10.21:1`. The light accent mark is `3.26:1` but is decorative and excluded
  from the accessibility tree; its dark contrast is `6.69:1`.
- Forced colors maps content to system black/white and retains the accepted
  canonical Avatar boundary. Reduced motion reports no non-zero animation or
  transition.
- One headless browser tab produced zero new console errors or warnings during
  final paired navigation and resize probes.

The direction follows the HTML Standard's native
[`blockquote`/`figure`/`figcaption` composition](https://html.spec.whatwg.org/dev/grouping-content.html),
its [sectioning guidance](https://html.spec.whatwg.org/dev/sections.html) and
its restriction against using `cite` for a person's name in this context
([semantic-purpose example](https://html.spec.whatwg.org/multipage/dom.html)).
[WAI decorative-image guidance](https://www.w3.org/WAI/tutorials/images/decorative/)
supports empty alternative text when adjacent text repeats identity. APG's
[pattern inventory](https://www.w3.org/WAI/ARIA/apg/patterns/) and the
[Open UI matrix](https://open-ui.org/research/component-matrix/) define no
Testimonial widget, so G3 adds no ARIA interaction model.

## Tokens, CSS And Performance

The contract exposes 23 existing semantic tokens covering text/surface/accent,
complete H2/Article/Body/Body Small typography, section/container/element
spacing, card radius and shadow. Root measure, thresholds, inset, card space,
identity geometry and relative line-height safeguards remain private. No token,
token layer or public geometry property was added.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| G3 CSS slice | `569 B` | `821 B` | family-owned | `+252 B`; complete semantic/responsive contract |
| Marketing family CSS | `3,920 B` | `4,146 B` | `4,198 B` | pass; `52 B` remaining |
| Neutral Web component CSS | `67,570 B` | `67,751 B` | `65,536 B` | existing program gap becomes `2,215 B`; batch delta `+181 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; G3 delta `0 B` |

Canonical, Webflow and Shopify Marketing CSS share SHA-256
`4e05869ed9de53186f8193e5664e9c11edaf1e8db92d8b65ce6a9851e4fc69a9`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced and zero G3 runtime. |
| Webflow | Source-identical CSS; CMS records and editorial governance remain target-owned. |
| Shopify | Implemented target-ready localized section with strict valid-block mapping, editor metadata and zero G3 JavaScript. |
| React / Angular | Documented thin passive list wrapper; target props/state own current records. |
| Figma | Planned; registered nodes `943:7` and `1020:480` are generic Button/Studio evidence, not G3 visual approval. |
| SwiftUI / Compose | Documented passive native collection and accessible identity translation; planned. |

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
- Chromium paired viewports, direct roots, title/minimal composition,
  RTL/long/effective-200% content, semantic/accessibility tree, contrast, dark,
  forced colors, reduced motion, exact DOM parity and console
- source/generated identity, deterministic gzip, `git diff --check`, resource
  cleanup and tracked `site/dist` verification

## Human Review Queue

1. Approve or revise maximum measure, thresholds, column density, inset, card
   padding/surface/radius, title/quote/author hierarchy, italic treatment,
   quote mark, Avatar prominence and fixture copy.
2. Supply corrected G3-specific Figma/reference evidence; current registered
   nodes show the generic Button detail/Studio shell.
3. Keep testimonial records, source URLs, verification, consent, moderation,
   localization, ordering, publication, image delivery, loading/error state,
   legal disclosure, analytics and update-announcement policy target-owned
   unless a later accepted architecture decision establishes a shared model.
4. Review automatic Avatar fallback and initials derivation under Avatar ADR
   0113 rather than duplicating that policy inside Testimonials.
5. Review the existing total Web CSS/runtime program gaps separately; G3 stays
   within its Marketing ceiling and adds no neutral runtime.

## Readiness

`human-review-ready`: semantic implementation, cross-target translation,
responsive/content/accessibility evidence, documentation and automated gates
are complete. Explicit human visual/reference approval remains pending. The
contract remains `pilot`; no `stable` promotion was made.
