# Photo Reviews Gallery Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

V6 Photo Reviews now renders a passive native list of target-supplied review
images. Collection membership and optional activation are separate: every
image remains inside a native list item, while a target with a real destination
or action may add a native link or button inside that item.

Registry, contract `0.3.0`, renderer, Studio metadata and MDX use the same
anatomy. Passive media has no action overlay, transition, focus target or
runtime. Optional target actions receive native activation and disabled
semantics, fine-pointer feedback, reduced-motion handling and a two-tone focus
perimeter that remains distinguishable over mixed photo edges.

The result is prepared for explicit human review, not stable. Provider,
moderation, action mode, enlarged-media component, captions, production image
delivery and component-specific Figma artwork remain open.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Passive target-supplied review evidence; no provider, upload, moderation, download or overlay ownership. |
| Anatomy and composition | pass | Required native `ul` / `li`, strict image class and optional nested native action. |
| Variants, states and modes | pass | Passive default plus documented link/button, hover, focus, disabled, empty, theme and special-mode projections. |
| Public API | pass | Only optional collection label and required target-owned items are public; layout and crop internals remain private. |
| Controlled/uncontrolled | pass | Passive Web has no value; a composed Lightbox or Modal target owns open/index state and lifecycle. |
| Canonical dependencies | pass | No dependency is invented; a target may separately compose the canonical Lightbox or Modal. |
| Tokens and visual system | pass | Semantic surfaces, focus, radius, motion and disabled opacity are public; grid, crop, overlay and zoom remain private. |
| Accessibility and motion | pass | Native collection, contextual image/action names, native activation/disabled, two-tone focus, forced colors and reduced motion. |
| Responsive/content resilience | pass | Four viewports, empty content and 96/220/640px RTL hosts at 200% type remain contained. |
| Runtime and assets | pass | Zero component listener, observer, timer, request, formatter, layout read, icon, font or media dependency. |
| Cross-target translation | pass | Web implemented; Shopify/Webflow CSS regenerated; provider, delivery and framework boundaries documented. |
| Exhibit/Studio parity | pass | One renderer and fixture; exact root DOM at all four viewports. |
| Human readiness | pass | Dossier, ADR, contract, docs, targets, evidence, budgets and automated gates are complete; status remains `pilot`. |

## Contract And Browser Evidence

- The accessibility tree is one named native list with four list items and four
  informative images. The canonical fixture contains zero focusable controls,
  statuses or live regions.
- Passive items expose no generated overlay and image transition duration is
  `0s`. Interaction styling is allocated only after a target adds
  `.photo-reviews__action`.
- Target-only probes cover a real link, a real button, a native disabled button
  and one passive item. Enter activates the link once; Enter plus Space activate
  the button twice; the disabled button activates zero times.
- Fine-pointer hover resolves the optional action overlay to opacity `1` and
  the image transform to `scale(1.05)`. Keyboard modality resolves a solid 2px
  focus outline at `-4px` plus a 2px inset surface backing.
- Reduced motion resolves transition duration to `0s` and transform to `none`.
  Forced colors removes the decorative overlay and retains system focus color.
- At 96, 220 and 640px, RTL plus 200% type yields one, one and five columns.
  Broken localized image alternatives remain contained; root and item scroll
  widths equal their client widths.
- The empty composition remains a valid named native list with zero items and
  zero focusable descendants.
- Exhibit/Studio root `outerHTML` is identical at Mobile, Tablet, Desktop and
  XL with SHA-256
  `482b73ec0a6e9e9998962975eec838ce48f30f9f1b00eceed266f8b14faef36e`.

Fifteen final screenshots live under
`output/playwright/refinement-batch-52/final/`; eight before images remain under
`output/playwright/refinement-batch-52/before/`.

## External And Figma Evidence

The [HTML grouping model](https://html.spec.whatwg.org/multipage/grouping-content.html)
supports native list and optional figure/caption structures without inventing
an ARIA gallery widget. The [WAI Images tutorial](https://www.w3.org/WAI/tutorials/images/)
distinguishes informative and functional image naming. The
[APG modal dialog pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
assigns focus, Escape, close and restoration to the complete overlay, while
[Open UI Popover](https://open-ui.org/components/popover.research.explainer/)
shows why a non-modal surface is not interchangeable with it. Radix Aspect
Ratio and Shopify Image/Thumbnail APIs support keeping ratio presentation and
target image delivery as separate concerns.

Figma nodes `943:7` and `1020:480` are generic Button component-detail and
Studio inspector frames, not approved Photo Reviews artwork. No component
visual value was promoted from them. Full comparison and links are recorded in
`docs/refinement/dossiers/photo-reviews.md`.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Native list/items, strict image and optional link/button action. | Implemented and evidenced with zero component JavaScript. |
| Shopify | Provider theme app block supplies moderated media, CDN transforms, alternatives and actions. | Generated CSS ready/planned; no placeholder provider Liquid. |
| Webflow | CMS/provider list with truthful native actions and copied CSS. | Generated CSS available; data and behavior remain external. |
| React / Angular | Passive list now; a separately accepted overlay owns controlled or initial open/index state. | Contract-ready after target action choice. |
| Figma | Passive grid and reviewed target-action visual states. | Planned; component artwork is absent. |
| SwiftUI / Compose | Native/lazy grid with Image and optional Link/Button. | Conceptual; target owns delivery and state. |

Canonical source, Shopify and Webflow Reviews CSS are byte-identical. Photo
Reviews correctly adds no provider-free Shopify Liquid file.

## Performance And Risks

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Reviews CSS | `3,787 B` | `3.7 KiB` (`3,788 B`) | pass; `1 B` remaining and `9 B` added from baseline |
| Shared neutral runtime | `10,492 B` | `8 KiB` (`8,192 B`) | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,395 B` | `64 KiB` (`65,536 B`) | existing `1,859 B` program gap after regeneration |

- Human review must approve grid density, crop, gap, radius, overlay/zoom
  strength, two-tone focus treatment and the four-photo editorial composition.
- Passive, full-media link, download, Lightbox and Modal modes are not
  equivalent; each target must select one from product evidence.
- Provider, moderation, consent, sensitive imagery, deletion, failure,
  captions, attribution, duplicate treatment and analytics remain target-owned.
- The four docs-only JPEGs total `1,311,728 B`; target production sources,
  formats, transforms and loading thresholds require an explicit budget.
- No component-specific Figma artwork exists.
- The Reviews family has only `1 B` headroom; later work must preserve the
  ceiling or raise a separate architecture decision.
- Global Web CSS/runtime overages remain program gaps, not budget increases.

## Validation

Registry/docs, 183 contracts, 183 Studio definitions, canonical static preview
markup, native collection semantics, target action probes, four-viewport exact
parity, empty/broken/RTL/200% containment, dark/forced-colors/reduced motion,
Neutral Web, Shopify, Webflow, official Shopify artifact validation,
source/generated identity, deterministic gzip, TypeScript, a temporary Vite
build outside `site/dist`, structural/static/parity/refinement audits and diff
checks comprise Batch 52.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Approve or revise density, square crop, gap, radius, overlay/zoom, two-tone
   focus and the four-photo editorial fixture.
2. Confirm the passive shared fixture for v1 or select link, download,
   Lightbox, Modal or target-specific action per integration.
3. Select provider, moderation, caption/attribution, duplicate and production
   image-delivery policies before building integrations.
4. Create component-specific Figma artwork only after browser approval.
5. Keep the contract `pilot` until explicit human stability approval.
