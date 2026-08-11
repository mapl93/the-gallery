# Rich Text Section Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-16

Component: Rich Text Section (`S15`, dependency order `175`)

Contract: `components/contracts/rich-text-section.contract.json` `0.3.0`,
`pilot`

## Outcome

Rich Text Section is now a passive bounded narrative profile with an optional
visible title and one required target-owned semantic body. A title creates and
names a native `section`; no title yields a generic `div`; no body yields no
component. Native document descendants remain authored content rather than a
new editor schema, Article Body dependency, or neutral parser/runtime.

Exhibit and Studio use the same renderer, initial properties, fixture and
normalized DOM. Neutral Web, Webflow and Shopify CSS projections are
synchronized. Shopify also has a localized target-native `richtext` section.
No component was promoted to `stable`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Bounded page narrative remains separate from autonomous Article Body, CMS/editor, sanitizer, publication workflow and advanced editorial compositions. |
| Anatomy and omission | pass | Required root/body, optional title; title-labelled section, untitled generic div, and strict missing-body root omission. |
| Public API | pass | Optional `title` plus required semantic `body` slot; no heading-rank, width, alignment, parser, target, media, block-list or target-editor properties. |
| Native semantics | pass | Initial body retains four paragraphs, one quotation/citation, one contextual heading, one list with three items, and one descriptive native link. |
| Keyboard and focus | pass | Only the target-owned link is focusable; native activation/history plus visible `2px` outline, `2px` offset and persistent underline. |
| Responsive containment | pass | Direct `200/320/520/740/900/1120px` hosts contain root/body; the component caps at `740px`. |
| Localized/extreme content | pass | Arabic RTL, long localized title and one unbroken item remain `358/358px`; effective 200% title/body type remains contained. |
| Theme and contrast | pass | Light title/body/link contrast is `17.93:1` / `7.81:1` / `5.88:1`; dark title/body is `17.18:1` / `12.09:1`. |
| Forced colors and motion | pass | Native system colors remain visible; root has no S15 animation or transition and generic reduced-motion guard resolves to `0.00001s`. |
| Media resilience | pass | A target-owned `1200px` intrinsic image renders at `662.41px` inside a `662px` body with no overflow and a useful alternative. |
| Exhibit / Studio parity | pass | Normalized outer HTML is exactly equal: `747` characters, FNV-1a `af5cc90d`, at all paired modes. |
| Runtime and assets | pass | `0 B` S15 runtime; no state store, listener, observer, timer, request, parser, sanitizer, custom element, hydration or bundled asset. |
| Generated targets | pass | Web adapter validates; canonical, Webflow and Shopify Sections CSS are SHA-256-identical. |
| Shopify target-native adapter | pass | Dedicated localized optional-heading/required-richtext section is target-ready, strictly omits empty body and adds no JavaScript. |
| Human stability | pending | Aesthetics, fixture, target trust policy and corrected component-specific Figma evidence require explicit approval. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Root | Always-emitted `article` for page-fragment content. | Named native `section` with title; generic `div` without title. |
| Required body | Disabled body could leave an empty shell. | Missing body returns `null` / emits no Liquid section. |
| Naming | Visible title had no id or root relationship. | Target-unique title id supplies `aria-labelledby`. |
| Body coverage | Paragraphs, `h2/h3`, links, image and quote styles only. | Native paragraphs, `h2–h6`, lists, quotations/citations, figures/media and links remain supported authored semantics. |
| Typography | Numeric body line-height and incomplete heading profile. | Semantic H2 and Article tokens; target heading rank stays independent from visual title scale. |
| Rhythm / geometry | Physical margins/insets and `740px` width literal. | Private relative grid flow, logical quote/list inset and `46.25rem` maximum inline measure. |
| Site ownership | Docs rules overrode nested component headings and duplicated quote wrapping. | Docs heading typography excludes Studio descendants; quote wrapping remains canonical. |
| Shopify | CSS-ready only. | Localized `title` + `richtext` section, strict empty omission and zero JS. |

Before evidence: `output/playwright/batch74-rich-text-section/before/`.

After evidence: `output/playwright/batch74-rich-text-section/after/`.

The final set contains `18` PNG captures plus structured measurements: paired
Mobile, Tablet, Desktop and XL; direct narrow/wide hosts; empty title; required
slot control; Arabic RTL/extreme content; effective 200% type; dark mode;
forced colors/reduced motion; link focus; and wide target media. The registered
Figma frame and inspector captures are stored beside the evidence and are
explicitly classified as Button evidence, not S15 approval.

## DOM And Responsive Evidence

Every initial renderer root emits:

- one title-labelled native `section` and contextual `h2`;
- one required `.rich-text-section__body`;
- four paragraphs, one `blockquote`, one `cite`, one nested `h3`, one `ul`,
  three `li` records, and one native anchor;
- no component-owned widget role, handler, state or runtime.

At all eight paired viewports root and body satisfy
`scrollWidth === clientWidth`. Exhibit and Studio layout contexts may differ in
available width, but the normalized root DOM remains exactly equal.

| Assigned host | Root client/scroll | Body client/scroll | Height | Result |
| ---: | ---: | ---: | ---: | --- |
| `200px` | `200/200` | `168/168` | `1315.5px` | contained |
| `320px` | `320/320` | `269/269` | `921.5px` | contained |
| `520px` | `520/520` | `437/437` | `759.5px` | contained |
| `740px` | `740/740` | `622/622` | `672.5px` | contained |
| `900px` | `740/740` | `596/596` | `701.5px` | contained; capped |
| `1120px` | `740/740` | `561/561` | `701.5px` | contained; capped |

Final visual evidence found two defects that ordinary source inspection missed:
the shared `inline-size` hardening won against the initial preferred measure at
XL, and docs-wide `h2/h3` selectors overrode canonical Studio typography. The
source now uses an explicit private `max-inline-size`, while site-only docs
typography excludes `.docs-studio` descendants.

## Accessibility And Special Modes

- Clearing the real Title control produces `DIV`, zero title nodes, no
  `aria-labelledby`, and `358/358px` containment.
- The required Body control remains checked and disabled; source and Shopify
  omission paths reject missing/empty body content.
- Arabic RTL keeps logical quotation/list geometry and long unbroken content
  inside the `358px` root.
- Effective 200% title/body values resolve to `64px` and `36px`; the
  `2098.56px`-high Mobile root reflows without horizontal overflow.
- A focused link retains underline plus a visible focus outline. Forced colors
  resolves root/link to system black/blue with no content loss.
- Fresh final navigation reports zero component console errors, warnings, page
  errors or failed requests. The known docs-site `/favicon.ico` 404 is excluded
  from component evidence.

## Tokens, CSS, And Performance

Public tokens cover semantic title/body typography, primary/secondary/accent
text, quote/focus borders, section rhythm, container inset and title gap.
Private composition retains the `46.25rem` measure, `8%` narrow inset,
`1.25em` flow, `1.5em` list/quote inset, `3px` quote border and focus geometry.
No component-scoped token or media-radius API was added.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,861 B` | `6,856 B` | `6,861 B` | pass; `-5 B`, `5 B` remaining |
| Neutral Web component CSS | `67,256 B` | `67,280 B` | `65,536 B` | existing program gap becomes `1,744 B`; synchronized delta `+24 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; S15 delta `0 B` |

Canonical, Webflow and Shopify Sections CSS share SHA-256
`e108f4fcfe7202dbcfd147bb2811fad4acaa6c945c934acec6b04de540852296`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced, zero runtime. |
| Webflow | Canonical Sections CSS regenerated and source-identical; content source and wrapper semantics remain target-native. |
| Shopify | Target-ready localized section with optional title, required `richtext`, strict omission and no JavaScript. |
| React / Angular | Documented thin conditional native wrapper around framework children; planned. |
| Figma | Planned; current nodes `943:7` and `1020:480` are Button evidence, not S15. |
| SwiftUI / Compose | Documented target-native semantic text/link/media composition; planned. |

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
- official Shopify validation for section, both schema locales, and final
  generated Sections CSS: artifact `rich-text-section-s15-batch74`, revision 3
- Chromium paired viewports, direct widths, semantics, omission, localized
  RTL/extreme copy, effective 200% type, contrast, dark theme, forced colors,
  reduced motion, focus, target media, exact parity, and console
- source/generated identity, deterministic gzip, `git diff --check`, resource
  cleanup, and tracked `site/dist` verification

## Human Review Queue

1. Approve or revise the `46.25rem` measure, responsive inline inset, title/body
   scales and `1.25em` flow.
2. Approve quotation border/inset, list rhythm, native nested-heading hierarchy,
   accent link treatment, focus geometry and target media presentation boundary.
3. Approve or replace the current studio/process fixture; it is evidence, not a
   component default or product claim.
4. Confirm the two-property API and passive v1 scope. Rich-text schemas,
   sanitization, legal copy, publishing, link and media policy remain targets.
5. Supply corrected S15-specific Figma evidence; current nodes show Button.
6. Review the existing total Web CSS and shared runtime program gaps separately;
   S15 stays within its family ceiling and adds no runtime.

## Readiness

`human-review-ready`: implementation, adapters, evidence, documentation and
automated gates are complete for stability review. Contract remains `pilot`;
no `stable` promotion was made.
