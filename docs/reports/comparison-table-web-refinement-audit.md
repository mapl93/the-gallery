# Comparison Table Web Refinement Audit

Status: `human-review-ready`; no stability promotion

Date: 2026-08-11

Component: Comparison Table (`S13`)

Contract: `components/contracts/comparison-table.contract.json` `0.4.0`,
`pilot`

Decision: owner response 66; ADRs 0155 and 0272

Evidence: `output/playwright/refinement-batch-169/`

## Outcome

Comparison Table now supports the accepted passive and controlled selectable
profiles without abandoning native table semantics. It composes canonical Data
Table, Radio, Checkbox, Link, and Button implementations; keeps ordinary cells
passive; separates checked state, visual highlight, explicit claim text, and CTA
activation; and adds zero S13 neutral runtime.

Exhibit and Studio use the exact same renderer and fixture. Mobile, tablet,
desktop, XL, direct widths, RTL/extreme content, effective 200% text, dark,
forced colors, reduced motion, keyboard, controlled state, independent actions,
and exact parity pass with no browser errors or warnings.

Owner decision 66 also resolves the Shopify architecture direction as a
metaobject-backed variable finite matrix. The dedicated adapter remains
honestly `planned` until exact target bounds, definitions, Liquid/schema/editor
validation, selection persistence, action lifecycle, and distribution profile
are implemented. This is documented target work, not an unresolved neutral
component identity.

S13 is prepared for explicit human visual/stability review and remains `pilot`.

## Certification Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite comparison is separated from grid, spreadsheet, calculator, recommendation engine, checkout, and live-data products. |
| Anatomy and omission | pass | Conditional section/div, optional title, required native table composition, caption, headers/cells, optional choices/highlight/claim/status/actions; invalid required matrix returns no root. |
| Public API | pass | `title`, `table`, `interaction`, `selectionMode`, `selectedId`, and `selectedIds`; no private layout or target lifecycle leakage. |
| Controlled strategy | pass | Single emits complete next id; multiple emits complete ordered id list; target owns persistence and effects. |
| Canonical dependencies | pass | Registry/contract use Data Table, Radio, Checkbox, Link, and Button; no duplicated choice/action behavior. |
| Native table semantics | pass | Caption, thead/tbody/tfoot, scoped headers, nine body cells, no table role override, zero grid/gridcell roles. |
| Ordinary-cell passivity | pass | Zero focusable body headers/cells and no roving cell tabindex/navigation. |
| Single keyboard | pass | Three same-name native Radios; ArrowRight moves Satin to Gloss and Studio controlled value becomes `gloss`. |
| Multiple keyboard | pass | Three native Checkboxes; Space adds Raw and removes Gloss; Studio readout becomes `satin, raw`. |
| Passive mode | pass | Choice controls drop from three to zero while all alternatives and both explicit actions remain. |
| Action independence | pass | Request sample button leaves selected Gloss unchanged; Link has a real destination; highlight/claim remain Satin. |
| Root semantics | pass | Titled root is a labelled SECTION; empty title yields DIV with no heading/landmark and retains caption/scroll label. |
| Overflow and focus | pass | Only named wrapper scrolls; ArrowRight changes `0 -> 24`; 2 px outline + 2 px offset; layout containment prevents document overflow. |
| Natural responsive | pass | Exhibit/Studio × Mobile/Tablet/Desktop/XL: zero root and document overflow, one tab, no errors. |
| Direct responsive | pass | 200/320/520/900/1120 px roots exactly contain; wrapper alone scrolls where required. |
| Localized/extreme/RTL | pass | 320 px Arabic RTL plus unbroken label: root `320/320`, wrapper `254/821`, document overflow zero. |
| Effective 200% text | pass | Root `320/320`, wrapper `254/1344`, title 92 px high, document overflow zero. |
| Theme and special colors | pass | Dark colors remain legible; forced colors exposes system boundary/status; reduced motion has zero active animations. |
| Exhibit / Studio parity | pass | At equal 580 px container: normalized DOM 3,510 chars/hash `9974b588`; style hash `300d6c6d`; both exact. |
| Runtime/assets | pass | S13 runtime 0 B; no listener, observer, request, timer, hydration, custom element, or asset. |
| Performance | pass family | Sections 6,829 B deterministic gzip under 6,861 B ceiling; 32 B headroom. |
| Generated targets | pass CSS | Web adapter validates; Webflow/Shopify Sections CSS source-identical. |
| Shopify architecture | selected / implementation planned | Metaobject-backed finite matrix accepted; exact target limits and implementation evidence remain mandatory. |
| Human stability | pending | Contract remains `pilot`; visual approval and explicit promotion are human-only gates. |

## Before / After

| Surface | Before | Final candidate |
| --- | --- | --- |
| Dependency ownership | S13 duplicated Data Table presentation and had no dependencies. | Canonical Data Table plus Radio, Checkbox, Link, and Button dependencies. |
| Interaction | Passive-only, no controlled alternative selection. | Passive or selectable; native single/multiple controlled state. |
| Overflow | Whole section/title participated in horizontal scrolling and wide table overflow propagated to the page. | Title stays outside named table wrapper; wrapper containment preserves complete scroll and zero document overflow. |
| Root semantics | Unnamed focusable section. | Named section with title; generic div without title; passive root. |
| Matrix name | Live renderer lacked caption. | Native visually hidden caption also describes choices. |
| Status meaning | Site-only labelled icons in otherwise empty cells. | Decorative check/cross plus complete assistive text. |
| Choice semantics | Not applicable. | Same-name Radios or independent Checkboxes in alternative headers; ordinary cells passive. |
| Highlight and claims | Highlight could be mistaken for recommendation. | Highlight explicitly visual; target claim text is separate and visible. |
| Actions | No formal action composition. | Optional complete canonical Link/Button per alternative; no silent selection. |
| Neutral alternative bound | Earlier Shopify recommendation implied two offerings. | Fixture proves three; neutral hardcodes no two limit; every target must declare a finite profile. |
| Shopify | Architecture choice open. | Metaobject-backed variable finite direction accepted and documented; adapter implementation still honest. |
| Exhibit/Studio | Shared old renderer with shared defects. | Shared reconciled artwork/fixture with exact DOM and style parity. |

Before evidence remains under
`output/playwright/batch72-comparison-table/before/`. Final evidence is under
`output/playwright/refinement-batch-169/after/`.

## Functional Evidence

The default shared fixture emits three alternatives (`satin`, `gloss`, `raw`),
three criteria, nine body cells, a visually highlighted Satin column with
explicit “Gallery choice” text, one real Satin Link, and one Gloss Button.

Single mode exposes three Radios with one generated non-empty name and values
matching stable alternative ids. All reference the caption. ArrowRight moves
native focus/selection from Satin to Gloss and the Studio `selectedId` field
updates to `gloss`.

Clicking Request sample leaves Gloss checked. At that point Satin remains
highlighted and retains the claim, proving selected, highlighted, claimed, and
acted-on states are not conflated.

Passive mode removes all header choice inputs but preserves all three labels and
both actions. Multiple mode begins with Satin and Gloss checked; Space on Raw
produces `satin, gloss, raw`, then Space on Gloss produces `satin, raw`. Studio's
collection readout mirrors the complete controlled list.

## Responsive And Special-Mode Evidence

| Assigned root | Root client/scroll | Wrapper client/scroll | Document overflow |
| ---: | ---: | ---: | ---: |
| 200 px | 200/200 | 134/690 | 0 |
| 320 px | 320/320 | 254/690 | 0 |
| 520 px | 520/520 | 454/690 | 0 |
| 900 px | 900/900 | 790/790 | 0 |
| 1120 px | 1120/1120 | 984/984 | 0 |

At natural page contexts, both modes pass at 390×844, 768×1024, 1440×1000,
and 1920×1080. Context widths differ by docs layout, while root containment,
structure, behavior, and source implementation remain shared.

RTL/extreme evidence uses Arabic title/claim/labels plus one unbroken Latin
alternative. The 320 px root remains contained and only its 254 px wrapper
scrolls 821 px. Effective 200% text retains zero page overflow with a 32 px root
font and a 92 px wrapped title.

Forced colors yields a white system Canvas highlight with 1 px black boundary,
black status marks, native choice treatment, and zero active animation under
reduced motion. Dark evidence retains visible hierarchy and control/action
boundaries.

## Tokens, CSS, And Performance

S13 exposes only stable semantic color, typography, and spacing decisions.
Canonical child components retain their own public token contracts. Inner
measure, column minima, highlight mix, status placement, action wrapping, and
layout containment remain private composition details.

| Surface | Result | Ceiling / delta |
| --- | ---: | ---: |
| S13 CSS slice | 2,232 B raw / 779 B gzip | component evidence |
| Sections CSS | 41,145 B raw / 6,829 B gzip | 6,861 B ceiling; 32 B headroom |
| S13 runtime | 0 B | exact 0 B budget |

Canonical, Webflow, and Shopify Sections CSS share SHA-256
`aa527d5432b1cc2177303e109d34e23704f1e82b645f87a56775e4db7524bcc2`.

## Cross-Target Status

| Target | Result |
| --- | --- |
| Neutral Web | Implemented, generated, validated, browser-evidenced, controlled where selectable, zero S13 runtime. |
| Webflow | Canonical CSS source-identical; target authoring supplies native finite records and lifecycle. |
| Shopify custom/app | Metaobject-backed finite profile selected; target adapter remains planned pending exact limits/definitions/Liquid/schema/editor/state/action evidence. |
| Shopify Theme Store | Custom/app metaobject matrix cannot be claimed Theme Store-safe; separate standard-definition or accepted bounded profile required. |
| React / Angular | Documented controlled wrapper translation; planned. |
| Figma | Planned; current linked nodes still show Button and cannot approve S13 aesthetics. |
| SwiftUI / Compose | Documented native semantic translation; target accessibility review required. |

## Validation

- `npm run validate:docs`
- `npm run validate:contracts`
- `npm run validate:studio`
- `npm run validate:refinement-decisions`
- `npm run build:components`
- `npm run build:adapter:web`
- `npm run build:adapter:shopify`
- `npm run validate:adapter:web`
- `npm run validate:adapter:shopify`
- `npm run audit:previews:static`
- `npm run audit:exhibit-studio`
- `npm exec -- tsc --noEmit -p site/tsconfig.json`
- one-session Chromium evidence for all states and viewports listed above
- source projection SHA, deterministic gzip, JSON, diff, and resource-cleanliness checks

## Human And Target Queue

1. Approve or revise the 72rem maximum measure, table/column minima, section
   rhythm, title hierarchy, cell density, control alignment, CTA weight,
   highlight intensity, status marks, dark presentation, and forced-color
   boundary.
2. Choose exact Shopify `maxAlternatives`, `maxCriteria`, and `maxCells` inside
   the accepted metaobject-backed profile.
3. Implement and review the Shopify definitions, Liquid/schema/editor
   validation, localization, stale-reference behavior, state persistence,
   actions, and custom/app versus Theme Store distribution claim.
4. Supply or approve corrected S13-specific Figma evidence; linked nodes remain
   Button evidence.
5. Explicitly approve stability only after human review; automation must not
   promote the contract.

## Readiness

`human-review-ready`. All neutral implementation, evidence, documentation,
adapter translation, performance, and parity gates needed to present S13 for
human stability review are complete. The contract remains `pilot` and Shopify
target implementation remains transparently planned.
