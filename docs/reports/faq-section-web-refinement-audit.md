# FAQ Section Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-15

Component: FAQ Section (`S9`, review order `169`)

## Outcome

FAQ Section is now a narrow container-responsive context wrapper around one
required canonical Accordion. It owns optional introductory title/subtitle,
conditional section semantics and placement only. Accordion continues to own
item anatomy, expanded/disabled state, keyboard activation, focus,
trigger/panel relationships, indicator and group policy.

Exhibit and Studio use the same `AccordionArtwork` renderer, three-item fixture,
local target state and normalized DOM. Short answer panels no longer become
automatic `region` landmarks. Shopify exposes a localized block-based section
using native `details`/`summary`, canonical classes and zero target script.

No new ADR was needed: ADR 0082 already requires canonical Accordion
composition, while ADR 0099 assigns group policy to the consumer/target and
permits native details mapping.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Canonical dependency | SectionsStudio manually recreated headings, triggers, icon, ids, panels and state | Shared `AccordionArtwork` owns the complete Web fixture; S9 adds list/item context hooks only | pass |
| Root semantics | Always emitted an unnamed native section | Titled root is a title-labelled section; untitled root is a generic div | pass |
| Required composition | Empty item composition could leave a shell | Missing required items omits the complete component | pass |
| Panel landmarks | All three short answers used `role="region"` | Zero automatic answer landmarks; contextual opt-in remains on Accordion | pass |
| Group policy | Single/collapsible fixture behavior looked like S9 API | Contract/doc explicitly keep single/multiple/exact/collapsible/initial policy target-owned | pass |
| Narrow embedding | Direct `200/260px` roots forced `320px`; Accordion width collapsed to `2px` | Exact-width roots with `168/228px` Accordion tracks and no overflow | pass |
| Docs CSS isolation | Generic `.docs-main h2/h3` overrode title/item margins, size, padding and border | Canonical scoped BEM rules win; no docs divider or heading margins leak into either view | pass |
| Public API | Three fields existed but validity and state boundary were incomplete | Optional `title`/`subtitle`, required canonical `items`; no duplicated state/event API | pass |
| Shopify | Copied CSS only, `css-ready` | Localized addable section with ordered question blocks and native zero-script disclosure | pass |
| Runtime | S9 used local React state plus duplicated markup | S9 neutral contribution is `0 B`; docs state lives in canonical renderer and Shopify uses native state | pass |

## Contract And API

Contract `0.3.0` remains `pilot` with one default presentation and three
properties:

- `title` — optional non-empty visible contextual heading; target chooses rank
  and unique id. Its presence creates and names a native section.
- `subtitle` — optional supporting text; omission leaves no empty rhythm and it
  never substitutes as a section name.
- `items` — required non-empty ordered canonical Accordion composition; absent
  or invalid composition omits the complete wrapper.

S9 exposes no heading level, expanded/default-expanded value, single/multiple
mode, collapsibility, required-open policy, panel-region switch, indicator,
item limit, structured data, analytics, search, breakpoint, measure, alignment,
CMS object or Shopify block field. It has no events and no controlled/
uncontrolled state. Framework Accordion adapters may expose those state
conveniences while FAQ Section remains a single composition owner.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | One-subject concise FAQ context; critical information, nested disclosures and knowledge-base behavior excluded. |
| Anatomy and composition | `pass` | Conditional root, optional native header/title/subtitle, required canonical Accordion list and repeated items. |
| Variants and modes | `pass` | One intrinsic presentation; title/subtitle omission plus inherited Accordion states and target group modes documented. |
| Public API | `pass` | Three semantic properties; state, visual internals and target records remain outside S9. |
| State ownership | `pass` | Accordion/target exclusively owns disclosure state; no S9 events or store. |
| Tokens and values | `pass` | Existing semantic type/spacing plus dependency tokens; two private measures and one private inset curve. |
| Visual system | `pass` for candidate | Four paired viewports, direct roots, dark/focus, RTL/extreme and native-target specimen; aesthetics await owner approval. |
| Accessibility | `pass` | Conditional named section, contextual headings, native triggers/hidden panels, zero automatic regions, visible focus. |
| Interaction | `pass` | Pointer, Enter and Space reversible; hidden and expanded state stay synchronized. |
| Motion | `pass` | S9 authors no motion; dependency transitions reduce to `0.00001s`. |
| Responsive behavior | `pass` | Root-owned container units preserve real tracks at `200–1120px`; all checked roots contain. |
| Content resilience | `pass` | Optional omission, long Arabic RTL, unbroken text, long answers and exact scroll/client width. |
| Runtime and assets | `pass` locally / global gap | Zero S9 neutral JS/assets/layout reads; family CSS remains under its permanent ceiling. |
| Cross-target translation | `pass` for Web/Shopify/Webflow | Shopify target-ready; framework/Figma/native projections remain planned. |
| Documentation parity | `pass` | One renderer/fixture; exact normalized Exhibit/Studio DOM hash. |
| Verification | `pass` | Source/adapters/docs/audits, official Shopify validation, browser matrix, budgets, copies and isolated site build. |

## Browser Evidence

- Evidence directory: `output/playwright/refinement-batch-68/` with 11 baseline
  and 14 final image captures, plus the baseline page/console artifacts.
- Exhibit and Studio normalize to `2,647` characters and FNV-1a `a22df099`.
  Both expose three native Button focus stops, three FAQ items and zero answer
  regions.
- Mobile `390x844` and Tablet `820x1000` produce exact paired geometry:
  root/list `358/322.19px` and `740/666px`. Desktop `1440x1000` produces
  Exhibit `580/522px` and Studio `692/622.8px`; XL `1920x1200` produces
  Exhibit `584/525.59px` and Studio `740/666px`. Every root has equal client and
  scroll width.
- Direct `200/260/520/900/1120px` roots remain exact width and provide
  `168/228/457.59/792/985.59px` Accordion tracks. The baseline `200/260px`
  cases grew to `320px` and left only a `2px` track.
- Initial state is `100`. Pointer on item two, Enter on item three and Space on
  item one produce `010 -> 001 -> 100`; native hidden panels match each state
  and focus remains on the activated trigger.
- Clearing title changes `section` to `div` and removes `aria-labelledby` while
  preserving optional subtitle. Clearing both intro values removes the header.
  A forced required-slot false value produces zero roots.
- Arabic RTL, a long unbroken question and long answer remain contained at the
  Mobile stage: root `358/358px` and list `320/320px` client/scroll widths.
- Light primary/secondary contrast is `17.93:1` / `7.81:1`; dark is
  `17.18:1` / `12.09:1`. Dark focus is visible, forced colors preserves a
  `2px` outline, and reduced-motion transition duration is `0.00001s`.
- A native details specimen exposes `display:flex`, no list marker, a `44px`
  minimum trigger, reversible pointer/Enter/Space state, `block/none` panel
  visibility and `180deg/none` indicator transforms with no script.
- The final browser session reports zero console errors and zero warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,726 B` | `6,822 B` | `6,861 B` | pass; `+96 B`, `39 B` remaining |
| Layout dependency | `6,826 B` | `6,900 B` | `4.8 KiB` | existing program exception; `+74 B` for native details/content-flow hardening |
| Neutral Web component CSS | `66,881 B` | `67,097 B` | `65,536 B` | existing gap `1,561 B`; synchronized delta `+216 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; delta `0 B`; S9 adds no behavior |

Canonical, Shopify and Webflow Sections CSS are SHA-256-identical:
`f2f0b90469b42684244fd65d908a76e326c6fb2e96d29e39ee8ee94c5fe645d7`.
Canonical, Shopify and Webflow Layout CSS are also source-identical:
`c73687eb5cdf8625701c116def1d0ad59f4a37dd1475b3bb5747451acd069e70`.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced canonical composition. |
| Shopify | `implemented`, `target-ready`; localized title/subtitle, repeatable question/answer/open blocks, editor attributes, preset and native details. |
| Webflow | Canonical Sections and Layout copies regenerated and source-identical. |
| React / Angular | Planned thin context wrapper around one canonical controlled/uncontrolled Accordion adapter. |
| Figma | Generic Studio shell traceability only; optional intro and inherited Accordion states await visual approval. |
| SwiftUI / Compose | Documented optional context plus native disclosure-group composition with target-owned group state. |

The Shopify adapter now reports 64 target-ready components, 34 dedicated Liquid
templates and FAQ Section at maturity `implemented`, `ready: true`, with schema,
data, behavior, template composition and editor-preview layers ready. Official
Shopify validation completed successfully for artifact
`faq-section-s9-batch68`, revision 2, covering the section, both schema locale
files, Sections CSS and Layout CSS.

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
- isolated site production build outside `site/dist`
- official Shopify validation, artifact `faq-section-s9-batch68`, revision 2
- Chromium paired viewports, direct roots, root/optional/invalid semantics,
  pointer/keyboard/focus/hidden state, native details, localized RTL/unbroken
  content, themes, contrast, forced colors, reduced motion and clean console
- source/generated identity and `git diff --check`

## Human Review Queue

1. Approve the `46.25rem` root and `40rem` intro measures, container inset curve,
   centered introduction and spacing rhythm.
2. Approve title scale, question/answer density, border/radius and disclosure
   indicator treatment across Mobile through XL.
3. Confirm the three-property neutral API and FAQ Section's separate
   discoverable value relative to composing Accordion directly.
4. Decide whether any product context needs a single, multiple or exact-one-open
   target default; keep it out of S9 until explicitly accepted.
5. Define target content records, maximum editor item count, analytics, search
   and structured-data ownership if required.
6. Add component-specific Figma examples and framework/native projections after
   visual approval.

## Readiness

`ready for human review`: the neutral wrapper and Shopify projection are
semantically, visually, responsively, technically and documentarily complete
for review. Contract remains `pilot`; no `stable` promotion was made.
