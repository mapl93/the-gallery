# Shipping Info Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-07-15

Component: Shipping Info (`S14`, dependency order `174`)

Contract: `components/contracts/shipping-info.contract.json` `0.3.0`,
`pilot`

## Outcome

Shipping Info is now a passive, text-complete native unordered list with one
required composition slot, optional decorative visuals, optional supporting
text, intrinsic container response, strict invalid-record/root omission, and
zero neutral runtime. Exhibit and Studio use the exact same renderer, fixture,
and DOM. Neutral Web, Webflow, and Shopify CSS projections are synchronized;
Shopify also has a target-native localized block section with editor attributes
and responsive optional images.

No component was promoted to `stable`. Human review still owns the visual
values, fixture claims, and replacement of the incorrect Button Figma trace.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite service/policy facts remain separate from rates, estimates, tracking, guarantees, and policy sources. |
| Anatomy and omission | pass | Required `ul`, one or more valid `li` items, required visible label, optional supporting text and decorative visual; invalid composition emits no root. |
| Public API | pass | One required target-owned `items` slot; no icon enum, structured commerce schema, layout controls, events, or controlled state. |
| Native semantics | pass | `UL`/`LI` accessibility tree, source order preserved, no false section landmark or ARIA widget. |
| Visual meaning | pass | All three visuals are `aria-hidden`; visible text carries every complete claim. |
| Keyboard and focus | pass | Zero focusable descendants and no authored keyboard model. |
| Responsive containment | pass | Direct `200/320/520/900/1120px` hosts contain roots/items and yield `1/1/2/3/3` tracks. |
| Localized/extreme content | pass | Arabic RTL, Spanish long copy, and an unbroken Latin identifier remain contained at Mobile. |
| Effective 200% type | pass | Public type tokens at `32/28px` produce a `660px`-high Mobile root with no horizontal overflow. |
| Optional content | pass | One label-only item renders without reserved visual or description space. |
| Theme and special colors | pass | Light/dark contrast, forced colors, and reduced-motion mode preserve content with no component motion. |
| Exhibit / Studio parity | pass | Exact outer HTML equality at every paired viewport: `2,064` characters, FNV-1a `1083a18c`. |
| Runtime and assets | pass | `0 B` S14 runtime; no listener, observer, timer, request, custom element, hydration, or target asset in neutral Web. |
| Generated targets | pass | Web adapter validates; Webflow and Shopify Sections CSS are source-identical. |
| Shopify target-native adapter | pass | Dedicated localized block section is target-ready with strict omission, editor attributes, responsive optional image, and zero component JavaScript. |
| Human stability | pending | Contract remains `pilot`; aesthetics, content claims, and corrected S14 Figma evidence require explicit approval. |

## Before / After

| Surface | Before | After |
| --- | --- | --- |
| Root | Always-emitted unnamed `section`. | Required native `ul` with `role=list`; absent items return no root. |
| Items | Generic `div` records. | Native direct `li` records. |
| Text | Generic label/text wrappers and calculated small type. | Paragraphs with semantic semibold and body-small tokens. |
| Visual | Icon semantics could imply unique meaning. | Optional decorative cue; visible text is complete. |
| Narrow response | A direct `200px` root scrolls to `238px`. | Direct `200px` host/root is `200/200px`; content track is `168px`. |
| Studio | Required slot could conceptually expose an empty preview shell. | Required slot control is intentionally disabled; renderer rejects absent required composition. |
| Shopify | CSS-ready only. | Localized reorderable blocks, strict omission, editor attributes, responsive optional images. |
| Exhibit/Studio baseline | Equal but incomplete: `2,123` chars, FNV `24332454`. | Equal and reconciled: `2,064` chars, FNV `1083a18c`. |

Before evidence: `output/playwright/batch73-shipping-info/before/`.

After evidence: `output/playwright/batch73-shipping-info/after/`.

The final set includes paired Mobile/Tablet/Desktop/XL captures, direct narrow
and wide hosts, the required Studio slot control, localized RTL/extreme copy,
effective 200% semantic type, dark mode, forced colors, and a minimal one-item
composition. The supplied Figma frame and inspector captures are stored beside
the evidence and explicitly classified as Button evidence, not S14 approval.

## DOM And Responsive Evidence

Every final Exhibit and Studio root emits:

- one `UL` with `role=list`;
- three direct `LI` records;
- three visible label paragraphs and three supporting paragraphs;
- three decorative SVG visuals with `aria-hidden=true`;
- zero focusable descendants.

At all eight paired captures the root satisfies
`scrollWidth === clientWidth`. Layout-context width differences do not change
markup: both modes remain `2,064` characters with FNV `1083a18c`.

| Assigned host | Host client/scroll | Root client/scroll | Tracks | Item widths | Result |
| ---: | ---: | ---: | ---: | --- | --- |
| `200px` | `200/200` | `200/200` | `1` | `168px` | contained |
| `320px` | `320/320` | `320/320` | `1` | `268.81px` | contained |
| `520px` | `520/520` | `520/520` | `2` | `202.41px` | contained |
| `900px` | `900/900` | `900/900` | `3` | `230.66–230.67px` | contained |
| `1120px` | `1120/1120` | `960/960` | `3` | `238.94px` | contained; maximum measure retained |

The isolated test found and fixed a defect hidden by viewport-only testing: the
XL container token could consume a `200px` embedded host. The final logical
inline inset uses the existing repository pattern and is capped at 8% of the
component's available width.

## Accessibility And Special-Mode Evidence

- Light contrast is `17.93:1` for labels and `7.81:1` for supporting text and
  decorative visuals. Dark contrast is `17.18:1` and `12.09:1` respectively.
- Forced colors produces system black text, preserves the visual cue, and has
  zero overflow. Meaning does not depend on the cue.
- Reduced-motion mode exposes no S14-authored animation or transition. The
  global motion guard reduces generic durations to `0.00001s`.
- Arabic RTL, long localized Spanish copy, and an unbroken identifier keep the
  `358/358px` Mobile root and every item contained.
- Doubling the public text tokens to label `32px` and supporting `28px` keeps
  the `358/358px` root contained without clipping.
- A single label-only item has one label, zero icons, zero descriptions, and no
  reserved optional-slot geometry.
- Final browser console inspection reports zero errors and warnings.

## Tokens, CSS, And Performance

Public tokens cover primary/secondary text, semantic label/supporting type,
section rhythm, container inset, and inter-item grid gap. Private geometry
retains the `60rem` measure, `12.5rem` preferred track minimum, `2.5rem` visual,
compact item gap, center alignment, and the narrow 8% inset cap. Numeric weight
and calculated supporting type were removed.

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,836 B` | `6,861 B` | `6,861 B` | pass; `+25 B`, exact ceiling |
| Neutral Web component CSS | `67,167 B` | `67,256 B` | `65,536 B` | existing program gap becomes `1,720 B`; S14 delta `+89 B` |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing program gap; S14 delta `0 B` |

Canonical, Webflow, and Shopify Sections CSS share SHA-256
`4a2776ba07518f5698ed88aaad0f7ca1d5b968dc09d3e54a8ae8cf90d48c4a2e`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced, zero runtime. |
| Webflow | Canonical Sections CSS regenerated and source-identical; collection authoring remains target-native. |
| Shopify | Target-ready localized block section with label/text/image settings, strict omission, editor attributes, responsive decorative image, and no JavaScript. |
| React / Angular | Documented thin native-list wrapper; planned. |
| Figma | Planned; current nodes `943:7` and `1020:480` are Button evidence, not S14. |
| SwiftUI / Compose | Planned target-native passive group/list mapping; target accessibility review required. |

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
- official Shopify validation for the section, both schema locales, and final
  generated Sections CSS, artifact `shipping-info-s14-batch73`, revision 2
- Chromium paired viewports, isolated widths, semantics, optional content,
  localized RTL/extreme copy, effective 200% type, contrast, dark theme, forced
  colors, reduced motion, exact parity, and console
- source/generated identity, deterministic gzip, `git diff --check`, and
  tracked `site/dist` verification

## Human Review Queue

1. Approve or revise the centered `60rem` measure, `12.5rem` preferred track,
   8% narrow inset, one/two/three-track response, and `2.5rem` visual size.
2. Approve center alignment versus a start-aligned alternative for longer
   service or policy content.
3. Approve section/grid/item rhythm, label/supporting typography, color roles,
   and the minimal one-item treatment.
4. Confirm visuals remain optional and decorative while visible text carries
   the complete meaning.
5. Approve or replace the delivery, inspection, and insurance fixture claims;
   they are examples, not product guarantees.
6. Supply corrected S14-specific Figma evidence; current nodes show Button.
7. Confirm passive v1 scope. Rates, estimates, tracking, guarantees, policy
   updates, and whole-card click behavior remain separate products/contracts.

## Readiness

`human-review-ready`: implementation, adapters, evidence, documentation, and
automated gates are complete for stability review. Contract remains `pilot`;
no `stable` promotion was made.
