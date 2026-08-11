# Component Dossier: Comparison Table

Status: `human-review-ready`

Target reviewed: Neutral Web with Webflow, Shopify, framework, design, and
native-target translation boundaries

Contract: `components/contracts/comparison-table.contract.json` `0.4.0`

Decision: owner response 66; ADRs 0155 and 0272

Evidence: `output/playwright/refinement-batch-169/`

## Recommendation

Keep Comparison Table as one contextual composition of canonical Data Table
that can be passive or explicitly selectable. The finite target-owned matrix
retains native table semantics in every mode. Selectable single mode composes a
canonical native Radio in each alternative header; multiple mode composes
canonical Checkboxes. Ordinary cells never become grid widgets.

Keep four meanings independent:

1. checked state is controlled target selection;
2. highlighted cells are visual emphasis only;
3. recommendations or commercial claims are explicit target-authored text;
4. optional Link or Button CTA activation has its own target lifecycle and does
   not silently select or submit an alternative.

Canonical Data Table remains the sole table surface, cell typography,
separator, caption/header-association, overflow, focus, and responsive-scroll
owner. S13 owns only its conditional contextual root, inner measure, optional
title, comparison emphasis, and placement of canonical controls/actions.

Owner decision 66 selects a variable but finite metaobject-backed Shopify
matrix. The neutral source hardcodes no two-alternative cap. Exact Shopify
alternative/criterion/cell bounds remain an explicit target-adapter gate, not a
neutral property or an invented product decision.

The current implementation is ready for human visual and stability review. It
remains `pilot`; no `stable` promotion is implied.

## Purpose, Use Cases, And Limits

- Compare a finite set of products, plans, finishes, services, collections, or
  other alternatives against the same criteria.
- Present exact text, quantities, prices, availability, or inclusion/exclusion
  meaning supplied and formatted by the target.
- Optionally let a consumer choose one alternative or several alternatives.
- Optionally expose one complete Link or Button action per alternative.
- Support explicit qualified claims such as “Gallery choice” without inferring
  those claims from color or selection.
- Do not become an ARIA grid, spreadsheet, generic result table, pricing
  calculator, recommendation engine, checkout form, chart, or card transformer.
- Do not fetch, normalize, calculate, sort, filter, paginate, persist, submit,
  announce, or act on matrix data in neutral source.
- Do not expose Shopify records, limits, handles, analytics, inventory, pricing,
  pending/error, or action routing as neutral presentation properties.

## Evidence And System Comparison

| Source | Relevant evidence | Direction for The Gallery |
| --- | --- | --- |
| [HTML table model](https://html.spec.whatwg.org/multipage/tables.html) | Native caption, row group, header, row, and data-cell relationships carry the matrix structure. | Keep one native table and authoritative source order. |
| [WAI Tables Tutorial](https://www.w3.org/WAI/tutorials/tables/) | Simple matrices use `scope`; complex matrices use explicit `id`/`headers`. | Fixture uses scoped headers; targets own complex associations. |
| [WAI Radio Group](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) | Native radios provide one mutually exclusive named group and expected arrow-key behavior. | Single mode composes canonical native Radio controls. |
| [WAI Checkbox](https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/) | Native checkboxes expose independent checked state and Space activation. | Multiple mode composes canonical Checkboxes. |
| [WAI Grouping Controls](https://www.w3.org/WAI/tutorials/forms/grouping/) | Related choices require visible labels and understandable context. | Alternative labels stay visible and controls reference the table caption. |
| [Open UI Table](https://open-ui.org/components/table/) | Static table cells and interactive grid widgets are distinct; controls can exist inside cells without converting the table. | Ordinary cells remain passive and no grid role/roving focus is added. |
| Radix Radio Group / Checkbox | Mature headless primitives separate control state from surrounding layout/content. | S13 composes canonical controls instead of duplicating their behavior. |
| Polaris table and choice patterns | Data scanning and choice input remain distinct concerns; actions need explicit ownership. | Table owns scanning, canonical choice controls own selection, target actions own mutation/navigation. |
| [Shopify input settings](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings) | `metaobject`/`metaobject_list` can select structured records, with a platform maximum and one declared type. | Use an explicit finite project profile rather than treating platform ceilings as product budgets. |
| [Shopify Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements) | Theme Store settings may use only standard metaobject definitions. | Separate custom/app delivery from a Theme Store-safe profile. |

No source defines The Gallery's final visual treatment or Shopify project
bounds. The external material supports semantics and target constraints; the
repo and owner decision define the component identity.

## Baseline And Reconciliation

The original S13 implementation duplicated Data Table CSS, scrolled the title
with the matrix, always emitted an unnamed focusable section, omitted a live
caption, used site-only labelled icons in otherwise empty cells, and exposed no
selection model. ADR 0155 corrected canonical composition and passive table
semantics. Owner decision 66 and ADR 0272 add controlled whole-alternative
selection and select the metaobject-backed Shopify direction.

The final shared renderer now:

- uses conditional named `section` / generic `div` semantics;
- places the title outside `.table-wrapper` horizontal overflow;
- composes `.table` with caption, scoped headers, body, and optional footer;
- shows three alternatives, proving no hardcoded two-column neutral limit;
- composes canonical Radio, Checkbox, Link, and Button implementations;
- keeps statuses text-complete and shapes decorative;
- isolates scrollable table layout with `contain: inline-size layout`, preventing
  page-level overflow while preserving complete horizontal scrolling;
- returns `null` for missing/invalid required matrix content;
- adds no S13 neutral runtime.

## Anatomy And Slots

| Part | Required | Semantic/implementation owner | Notes |
| --- | --- | --- | --- |
| Root | yes | S13 / target | Named `section` with non-empty title; otherwise generic `div`. |
| Inner | yes | S13 | Maximum measure, logical inset, section rhythm, containment. |
| Title | no | S13 / target | Visible heading and section name; outside horizontal scroll. |
| Scroll wrapper | yes | canonical Data Table | Named, focusable `.table-wrapper`; sole horizontal scroll owner. |
| Table | yes | canonical Data Table / target | Native `.table` with one finite authoritative matrix. |
| Caption | yes | target table | Concise matrix and choice context; visible or visually hidden. |
| Alternative header | yes | target | Stable id and visible label for every comparable column. |
| Choice | conditional | canonical Radio/Checkbox | Omitted in passive mode. |
| Criterion row header | yes | target | Complete visible label and native header association. |
| Value/status cell | yes | target | Target-formatted text or text-equivalent status. |
| Highlight | no | S13 / target | Visual only; related header/body/footer cells stay aligned. |
| Claim | no | target | Explicit visible qualified meaning; never inferred. |
| Action | no | canonical Link/Button / target | One complete optional action per alternative, independent from selection. |

## State, Variant, Size, And Mode Matrix

| Dimension | Supported behavior |
| --- | --- |
| Variant | One comparison presentation; no public decorative variants. |
| Size | One semantic size; Data Table owns density and S13 keeps geometry private. |
| Passive | No choice inputs; explicit CTA controls may remain. |
| Selectable single | One named native Radio group; controlled `selectedId`; zero or one checked value. |
| Selectable multiple | Independent canonical Checkboxes; controlled ordered `selectedIds`; empty or many checked values. |
| Titled | Named native section associated with visible title. |
| Untitled | Generic div with caption and named scroll wrapper. |
| Highlighted | Visual background/boundary only; no checked or recommendation semantics. |
| Explicit claim | Visible target-authored text adjacent to the alternative label/control. |
| Link action | Real destination; activation navigates only. |
| Button action | `type=button`; target owns mutation lifecycle. |
| Included/excluded | Decorative check/cross plus meaningful assistive text. |
| Missing/invalid matrix | Omit the entire component. |
| Narrow container | Preserve columns and scroll only the table wrapper. |
| RTL/localized/extreme | Preserve logical layout, source order, complete labels, and scroll. |
| Dark/forced colors | Semantic colors; forced-color structural boundary; canonical native controls. |
| Reduced motion | Zero S13 animation and zero active descendants in evidence. |

Unsupported combinations include ARIA grid semantics, focusable ordinary cells,
roving cell tabindex, implicit recommendation from highlight, CTA-triggered
silent selection, selection-triggered silent CTA, hidden essential columns,
CSS card transformation, automatic pricing/availability claims, target data
fetching, or neutral persistence/submission.

## Public API And Controlled Strategy

- `title?: string` — optional trimmed contextual heading.
- `table` — required finite target-owned canonical Data Table composition.
- `interaction?: "passive" | "selectable"` — semantic default `passive`.
- `selectionMode?: "single" | "multiple"` — semantic default `single`; read
  only in selectable mode.
- `selectedId?: string` — controlled single-selection id; empty is valid.
- `selectedIds?: string[]` — controlled ordered multiple-selection ids; empty
  list is valid.
- selection change — returns the complete next id or ordered id list.

The neutral contract is controlled when selectable. It does not add an internal
durable store or an uncontrolled `defaultSelected*` API. Native controls emit
changes; the target validates ids, replaces controlled state, and owns any URL,
form, cart, account, persistence, analytics, pending, feedback, or error policy.

## Tokens, Private Variables, And Hardcoded Values

Public semantic inputs are limited to existing color, typography, and spacing
tokens for title, claim/status meaning, section rhythm, and highlight family.
Canonical Radio, Checkbox, Link, Button, and Data Table retain their own public
token contracts.

Private S13 composition includes:

- `--_comparison-inset` and `--_comparison-block-gap`;
- `72rem` maximum inner measure;
- `36rem` minimum table width, `12rem` criterion column, and `10rem`
  alternative columns;
- 6% primary highlight mix;
- status placement and no-wrap action fitting;
- `contain: inline-size layout` on the S13 Data Table wrapper.

These values are visual/layout candidates, not stable cross-target semantic
choices. They remain private pending human review. Structural zeroes, percentages,
and forced-color Canvas/CanvasText values are implementation mechanics rather
than public customization API.

## Responsive, Content, And Accessibility Evidence

- Natural Exhibit and Studio captures pass at 390×844, 768×1024, 1440×1000,
  and 1920×1080 with zero root or document overflow.
- Direct roots at 200, 320, 520, 900, and 1120 px stay exactly contained. The
  wrapper alone scrolls below the readable table width.
- Arabic RTL, a long localized title/claim, and an unbroken alternative label
  preserve a 320/320 px root while the 254 px wrapper scrolls 821 px.
- Effective 200% text preserves a 320/320 px root and zero document overflow;
  the title reflows to 92 px and the wrapper retains complete 1344 px content.
- Native single Radios share one name, expose stable values, reference the
  caption, and move `satin -> gloss` with ArrowRight while Studio updates
  controlled `selectedId` to `gloss`.
- Native multiple Checkboxes start `satin, gloss`; Space adds `raw` and removes
  `gloss`, with Studio reflecting `satin, raw`.
- The wrapper has a visible 2 px outline plus 2 px offset; ArrowRight changes
  scrollLeft `0 -> 24`.
- Ordinary body headers/cells have zero focusable surfaces and the component has
  zero grid/gridcell roles.
- Link `/collections/satin-finish` and `type=button` action remain explicit;
  button activation leaves selected `gloss` unchanged.
- Highlight remains Satin and its explicit claim remains “Gallery choice” while
  selection is Gloss, proving semantic independence.
- Forced colors produces a 1 px system boundary and system-color statuses;
  reduced-motion evidence finds zero active animations.
- Browser console and page-error counts are zero.

## Performance And Runtime

| Surface | Result | Budget |
| --- | ---: | ---: |
| S13 CSS slice | 2,232 B raw / 779 B gzip | documented within Sections family |
| Sections family | 41,145 B raw / 6,829 B gzip | 6,861 B ceiling; 32 B headroom |
| S13 neutral runtime | 0 B | 0 B |

S13 creates no listener, observer, request, timer, layout-read loop, custom
element, hydration requirement, or asset. React exists only in the docs
renderer/Studio target. Source, Webflow, and Shopify Sections CSS are
byte-identical at SHA-256
`aa527d5432b1cc2177303e109d34e23704f1e82b645f87a56775e4db7524bcc2`.

## Cross-Target Translation

| Target | Translation | Status / gate |
| --- | --- | --- |
| Neutral Web | Shared renderer fixture, native table, controlled native controls, explicit actions, table-only overflow, zero runtime. | Implemented and evidenced. |
| Webflow | Canonical Sections/Primitives CSS and target-authored native markup/data. | CSS projection source-identical; authoring remains target-native. |
| Shopify custom/app | Metaobject-backed finite matrix with stable ids, ordered references, validation, canonical Liquid table/controls/actions. | Architecture selected; exact numeric bounds, definitions, Liquid/schema/editor/persistence evidence still required before target-ready. |
| Shopify Theme Store | May use only standard metaobject definitions in theme settings. | Custom comparison definition is not Theme Store-safe; separate accepted profile required. |
| React / Angular | Controlled thin wrapper around canonical child components and application-owned records. | Planned translation documented. |
| Figma | Optional title, finite matrix, passive/single/multiple properties, highlight/claim/action separation, narrow-scroll annotation. | Planned; current linked Button nodes remain invalid S13 visual evidence. |
| SwiftUI / Compose | Native table/list equivalent with labelled whole-alternative choice controls and complete values/actions. | Planned; platform accessibility review required. |

Detailed Shopify requirements live in
`docs/adapters/shopify-comparison-table-metaobjects.md`.

## Exhibit / Studio Parity

Both surfaces import the registered `SectionsStudio`, which delegates S13 to
`ComparisonTableArtwork` and `buildComparisonTableFixture`. At an equal 580 px
container, normalized outer HTML is exactly equal at 3,510 characters with hash
`9974b588`; computed style signatures are exactly equal with hash `300d6c6d`.
Natural layout differences at unequal container widths are intentional
container-query responses, not implementation divergence.

## Risks And Open Questions

- Human review must approve the current typography, 72rem measure, responsive
  table minimum, column widths, density, section spacing, highlight intensity,
  status marks, control alignment, CTA weight, dark appearance, and forced-color
  boundary.
- Shopify must choose exact `maxAlternatives`, `maxCriteria`, and `maxCells`
  within the selected metaobject-backed profile and validate editor/render cost.
- Shopify must declare custom/app versus Theme Store distribution and the
  controlled selection persistence/action lifecycle.
- Complex target matrices need explicit `id`/`headers` evidence rather than the
  fixture's simple `scope` model.
- The current Figma references point to Button and cannot approve S13 visual
  identity; component-specific owner evidence remains desirable for aesthetic
  review.

These are explicit review/target gates. They do not justify inventing new
neutral properties or prevent the implemented Web component from entering
human stability review.

## Certification Checklist

- [x] Purpose, use cases, and non-goals defined.
- [x] HTML, WAI, Open UI, mature-system, and Shopify evidence reviewed.
- [x] Anatomy, required/optional parts, states, modes, sizes, and omission defined.
- [x] Public API and controlled selection strategy documented.
- [x] Canonical Data Table, Radio, Checkbox, Link, and Button dependencies used.
- [x] Public tokens, private variables, and hardcoded values audited.
- [x] Short, long, localized, RTL, unbroken, 200%, dark, forced-color, and reduced-motion content tested.
- [x] Focus, keyboard, semantics, accessible names, claims, actions, and ordinary-cell passivity tested.
- [x] Direct widths and Mobile/Tablet/Desktop/XL captures completed.
- [x] DOM/CSS/runtime/assets and performance budget reviewed.
- [x] Web, Webflow, Shopify, framework, Figma, and native translations documented honestly.
- [x] Exact Exhibit/Studio renderer, fixture, DOM, and style parity validated.
- [x] Generated adapters and source-identical CSS validated.
- [x] Automated reports and evidence completed.
- [ ] Human visual/stability review completed.
- [ ] Explicit `stable` promotion approved.

## Readiness

`human-review-ready`. Comparison Table is the final component implementation
candidate prepared for explicit human stability review. Contract remains
`pilot`; no automatic stability promotion was made.
