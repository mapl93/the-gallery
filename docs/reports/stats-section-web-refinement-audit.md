# Stats Counter Web Refinement Audit

Status: Ready for human review; remains `pilot`

Date: 2026-07-15

Component: Stats Counter (`S11`, review order `171`)

## Outcome

Stats Counter is now a passive, container-responsive context section that owns
only conditional landmark semantics, title presentation, list placement and
section rhythm. Its required metrics are native unordered-list items composed
from canonical Stat; targets retain formatted values, labels, ordering,
freshness, comparison, loading/error policy and any update announcement.

Exhibit and Studio use the exact same `SectionsStudio` renderer and fixture,
with `StatArtwork` supplying the shared child anatomy. The false count-up hook,
duplicated metric CSS and empty item rule are gone. Shopify now provides a
localized addable section with reorderable metric blocks, editor attributes and
zero target JavaScript. ADR 0154 records these boundaries.

## Before / After Findings

| Finding | Baseline | Final | Result |
| --- | --- | --- | --- |
| Root semantics | Always an unnamed `section` | Visible title names a `section`; otherwise generic `div` | pass |
| Metric semantics | `div[role=list]` in docs; plain divs in Studio | Native `ul > li` | pass |
| Canonical composition | Duplicated number/label markup and CSS | Required dependency on canonical Stat | pass |
| Required content | Metrics could be disabled while shell remained | Required composition; adapters omit incomplete records/all-empty section | pass |
| Behavior claim | `data-animate`, `transition: all`, no runtime implementation | Passive static output; no hook, transition or live region | pass |
| Responsive authority | Physical inset and viewport-derived behavior | Root-owned intrinsic grid, logical inset and capped block rhythm | pass |
| Studio API | Child metric appearance re-exposed at section level | Only S11 title/layout decisions; child appearance stays with Stat | pass |
| Shopify | Copied CSS only | Localized section, block schema/data/editor support, no script | pass |
| Runtime | Comment and hook implied count-up | Neutral and Shopify S11 runtime exactly `0 B` | pass |

## Contract And API

Contract `0.3.0` remains `pilot` and exposes only:

- `title` — optional trimmed visible heading; when present it creates and names
  a thematic section.
- `metrics` — required target-owned list composition; every record contains one
  complete canonical Stat with formatted value and label.

S11 exposes no raw number, formatter, locale, currency, unit, precision,
comparison direction, count-up, duration, polling, live mode, alignment, column
count, breakpoint or child typography property. It emits no events and has no
controlled/uncontrolled model. Target adapters own data lifecycle; Stat owns
metric presentation and optional comparison.

## Rubric

| Gate | Result | Evidence / remaining review |
| --- | --- | --- |
| Purpose and limits | `pass` | Small finite set of factual metrics; dashboards, charts, progress and data clients excluded. |
| Anatomy and composition | `pass` | Conditional root, inner, optional title and required native list of canonical Stat items. |
| Variants and modes | `pass` | One intrinsic presentation; titled/untitled and target lifecycle boundaries documented. |
| Public API | `pass` | Two semantic properties; child, data and layout internals remain dependency-, target- or private-owned. |
| State ownership | `pass` | Passive S11; target owns data/freshness/update policy; no aggregate store or event. |
| Tokens and values | `pass` | Nine existing public references; private inset/measure/cap; no new component token. |
| Visual system | `pass` for candidate | Paired viewports, controlled equal-width parity, themes, RTL, many records and 200% type; aesthetics await owner. |
| Accessibility | `pass` | Named thematic section when titled, native list, visible contextual labels, no unnecessary widget/live semantics. |
| Interaction | `not applicable` | No focus target, keyboard model, pointer behavior or neutral update lifecycle. |
| Motion | `pass` | False count-up contract removed; no authored motion or reduced-motion exception. |
| Responsive behavior | `pass` | Exact `200–1120px` roots, intrinsic tracks, logical inset and no viewport/Studio-owned rule. |
| Content resilience | `pass` | Optional title, one/three/seven records, Arabic RTL, long labels and effective 200% type remain contained. |
| Runtime and assets | `pass` locally / global gap | Zero S11 runtime/assets; Sections ceiling passes; existing global Web/runtime gaps remain explicit. |
| Cross-target translation | `pass` for Web/Shopify/Webflow | Generated Web, target-native Shopify and source-identical Webflow CSS; future targets documented. |
| Documentation parity | `pass` | One renderer/fixture, reusable canonical Stat child and exact normalized Exhibit/Studio DOM hash. |
| Verification | `pass` | Source/adapters/docs/audits, official Shopify validation, browser matrix, budgets and copy identity. |

## Browser Evidence

- Evidence directory: `output/playwright/batch70-stats-section/` with nine
  baseline and fifteen final images.
- Exhibit and Studio normalize to exactly `1,194` characters and FNV-1a
  `bd10f6ad`. At an assigned `420px`, both are `420x321px`, inner `356px`, block
  padding `32px`, tracks `170px 170px`, gap `16px`.
- Default semantics are one title-labelled section, one native unordered list,
  three `li.stat` items, three values, three labels, zero live regions and zero
  focusable descendants.
- Clearing the real Studio Title control produces `DIV`, no title and no
  `aria-labelledby`, while retaining the required list and three items.
- Direct `200/320/520/900/1120px` roots retain exact assigned/scroll widths.
  Inner widths are `136/256/456/810/960px`, and responsive block padding is
  `32/32/36.4/63/64px`.
- Seven records remain contained at both `320px` and `1120px`. Long Arabic RTL
  and effective 200% typography remain `320/320px` assigned/scroll width.
- Light primary/secondary contrast is `17.93:1` / `7.81:1`; dark is
  `17.18:1` / `12.09:1`. Forced colors resolves essential text to system black
  on Canvas, and no S11 motion exists.
- Final browser console: zero errors and zero warnings.

## Performance

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Sections family | `6,859 B` | `6,788 B` | `6,861 B` | pass; `-71 B`, `73 B` remaining |
| Neutral Web component CSS | `67,140 B` | `67,047 B` | `65,536 B` | existing gap `1,511 B`; synchronized `-93 B` delta |
| Shared neutral runtime | `10,501 B` | `10,501 B` | `8,192 B` | existing gap; delta `0 B`; S11 adds no behavior |

Canonical, Shopify and Webflow Sections CSS are SHA-256-identical:
`feca9d9717674ad2b93e6df3c869154ad4c2501865ace042c69b4d1312d0e6b4`.

## Cross-Target Result

| Target | Result |
| --- | --- |
| Neutral Web | Refined, generated, validated and browser-evidenced passive native composition. |
| Shopify | `implemented`, target-ready localized section with metric blocks, omission policy and no script. |
| Webflow | Canonical Sections CSS regenerated and source-identical; data/markup remain target-native. |
| React / Angular | Planned thin context wrapper mapping records to canonical Stat children. |
| Figma | Current S11 trace incorrectly resolves to Button; corrected component evidence and final visuals are required. |
| SwiftUI / Compose | Documented localized finite collection/group with platform-owned data lifecycle. |

The Shopify adapter reports 66 target-ready components, 36 dedicated Liquid
templates and 27/27 schema-ready sections. Stats Counter is `implemented`,
`ready: true`, with all maturity layers ready/accepted. Official validation
passed all four requested files for artifact `stats-section-s11-batch70`,
revision 3.

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
- official Shopify validation, artifact `stats-section-s11-batch70`, revision 3
- Chromium paired viewports, controlled equal-width parity, direct roots,
  omission semantics, many/localized/extreme content, effective 200% type,
  light/dark contrast, forced colors and clean console
- source/generated identity and `git diff --check`

## Human Review Queue

1. Approve the `60rem` maximum measure, intrinsic track balance, logical inset
   curve, capped section rhythm and one/two/three/many density.
2. Approve title hierarchy, title-to-list spacing, centered value/label
   relationship and localized wrapping across Mobile through XL.
3. Confirm the two-property neutral API and that comparison/update policy stays
   on canonical Stat or the target rather than S11.
4. Confirm passive v1 behavior; animated count-up remains a separate future
   product/accessibility decision.
5. Supply or approve a corrected S11-specific Figma frame; current nodes show
   the Button pilot.

## Readiness

`ready for human review`: neutral composition, Shopify projection, responsive
containment, semantics, accessibility, performance, parity and documentation
are complete for review. Contract remains `pilot`; no `stable` promotion was
made.
