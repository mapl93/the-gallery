# Ceramics Care FAQ Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

R14 Ceramics Care FAQ is now a contextual composition of canonical Accordion
and Link rather than a parallel disclosure, category and navigation
implementation. Registry, contract `0.3.0`, MDX, Studio metadata and the shared
browser renderer declare the same dependencies and four-property semantic API.

The inert category Buttons, duplicate `.faq-item` markup/CSS, one-way expansion,
CSS-only answer hiding, prevented placeholder Link and dangling optional-heading
label are gone. The fixture uses three canonical Accordion items, native
`hidden`, reversible pointer/keyboard interaction, independent expansion and a
real care-instructions destination.

The result is prepared for explicit human review, not stable. Human review must
approve the disclosure-versus-visible-content mode, inherited Accordion and
Link appearance, contextual visual treatment and category product direction.
Dedicated records/CMS and Shopify behavior remain deliberately unimplemented
because those architecture decisions are open.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Contextual ceramics questions and answers only; no taxonomy, search, policy database, CMS, support, commerce or safety-source ownership. |
| Anatomy and composition | pass | Optional introduction, required canonical Accordion items, optional follow-up and canonical Link destination. |
| Variants, states and modes | pass | One profile; collapsed, expanded, zero-open, multiple-open, optional-part omission, light/dark, forced colors, reduced motion and RTL are evidenced. |
| Public API | pass | Optional `heading`, `subheading`, `contact`; required `items`; category and duplicate Accordion controls are absent. |
| Controlled/uncontrolled | pass | FAQ owns no second store or value API; targets coordinate canonical Accordion group policy. |
| Canonical dependencies | pass | Direct Accordion and Link dependencies; no duplicated trigger, panel, focus, motion or navigation behavior. |
| Tokens and visual system | pass | Only contextual introduction/follow-up tokens remain; dependency tokens, hardcoded fallbacks and physical layout rules were removed. |
| Accessibility and motion | pass | Conditional labelling, contextual headings, native Buttons, synchronized relationships/`hidden`, real Link, forced colors and reduced motion pass. |
| Responsive/content resilience | pass | Four viewports plus long, unbroken, localized, RTL and 200% zoom content without document overflow. |
| Runtime and assets | pass | Zero component listener, observer, timer, request, formatter, URL parser, custom control, icon or neutral runtime contribution. |
| Cross-target translation | pass | Web implemented; Shopify CSS/manifest synchronized while records, schema and group/category policy remain honestly planned. |
| Exhibit/Studio parity | pass | One renderer and fixture; byte-identical initial component root DOM. |
| Human readiness | pass | Dossier, ADR, contract, docs, adapters, evidence, budgets, risks and gates complete; status remains `pilot`. |

## Contract And Implementation Result

- Contract advances from `0.2.0` to `0.3.0`, remains `pilot`, and records
  `accordion` and `link` as direct dependencies at refinement depth 1.
- `.ceramics-faq__list.accordion` and repeated
  `.accordion__item.ceramics-faq__item` replace the independent question and
  answer implementation.
- Each contextual heading contains one native Button with synchronized id,
  `aria-expanded`, `aria-controls`, panel id, optional region label and native
  `hidden` state.
- Targets own records, order, stable ids, heading rank, initial state,
  single/multiple/exact-exclusive policy, answer accuracy and localization.
  The FAQ wrapper adds no duplicate value/default/event API.
- Required `items` is non-removable in Studio and invalid required composition
  returns `null`. `heading` and `subheading` omit independently; root
  `aria-labelledby` exists only with a non-empty visible heading.
- Optional contact copy and destination compose canonical Link. The fixture's
  `/components/care-instructions` target resolves to the Care Instructions page.
- Category controls and `categories` are removed without an alias. Future
  category navigation or filtering requires a separately accepted complete
  URL, focus, result, empty and announcement lifecycle.
- Studio exposes only four semantic properties and profile-owned public tokens.
  Accordion density, surface, icon, focus, motion and expansion policy remain
  dependency/target-owned.

## Browser Evidence

### Structure, Interaction And State

- Initial state is `true/false/false`; panel `hidden` is
  `false/true/true`, with one visible labelled region.
- Pointer activation collapses the first item to zero open. Enter opens the
  second, Space closes it, and focus remains on the activated question.
- The first and third can stay expanded together, yielding two visible labelled
  regions. This proves target-coordinated multiple-open capability without
  declaring it the stable product policy.
- Browser inspection finds three native Accordion Buttons, three panels, zero
  category controls and one canonical Link. Activating the Link navigates to
  `/components/care-instructions` with page title `Care Instructions`.
- Clearing `heading` while retaining subheading leaves the root present with no
  heading node and no `aria-labelledby`. Clearing both omits the header;
  disabling optional contact omits the footer. Required items remains checked
  and disabled.
- No component errors or warnings appear in the browser console. Repeated
  entries are informational React DevTools development messages.

### Parity, Content And Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) have paired Exhibit/Studio before and final captures.
- Mobile root is `358/358px` and Tablet is `720/720px` in both views. Desktop
  deliberately exercises `580px` Exhibit and `692px` Studio hosts; XL exercises
  `584px` and `720px`. Every document remains exact at its viewport width.
- A long Spanish heading/introduction, long questions and an unbroken German
  compound remain contained at Tablet (`720/720px`). Full Arabic under
  `dir="rtl"` remains exact at Mobile (`358/358px`) with a `390/390px` document.
- At 200% CSS zoom, the root renders at `326px`; its logical client/scroll width
  remains `163/163px` and the document remains `390/390px`.
- Exhibit and Studio initial root `outerHTML` are byte-identical at `3,366`
  characters with SHA-256
  `df7c70c5237ea6468919b134a9ae61e77868f57dfb1bff489b35190f7f65db6b`.
- Eight baseline and sixteen final/special captures live under
  `output/playwright/refinement-batch-58/`.

### Contrast And User Preferences

- Light contrast: heading/questions `17.93:1`, subheading/answer `7.81:1`,
  contact copy `7.17:1`, and Link `5.40:1`.
- Dark contrast: heading/questions `17.18:1`, subheading/answer `12.09:1`,
  contact copy `10.21:1`, and Link `8.39:1`.
- Forced colors preserves headings, disclosure boundaries, native focus,
  expanded/collapsed structure and destination affordance.
- Reduced motion leaves only `0s` transition durations inside the profile and
  canonical dependencies.

## External And Figma Evidence

The [WAI-ARIA APG Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
specifies native Button triggers inside contextual headings, synchronized
expanded/control/panel visibility, Enter/Space and normal Tab behavior.
[Open UI Accordion research](https://open-ui.org/components/accordion.research/)
and [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion)
show that non-exclusive, exclusive, exact-exclusive, controlled and
uncontrolled choices belong to the Accordion layer rather than an FAQ wrapper.

The [HTML disclosure model](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element)
provides a target-native `details`/`summary` alternative. [GOV.UK Accordion](https://design-system.service.gov.uk/components/accordion/)
recommends disclosure only with user evidence, and [Polaris Collapsible](https://polaris-react.shopify.com/components/utilities/collapsible)
treats collapsed material as lower priority rather than a place for critical
information. Those sources support canonical disclosure composition and
keeping essential care/safety content visible; they do not choose The Gallery's
stable presentation or category mode.

Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector `1020:480`
contain the generic Button/Studio shell rather than Ceramics FAQ artwork. No
FAQ layout, visual, responsive, category or group-policy fact was inferred.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Optional contextual introduction plus canonical Accordion items and optional canonical Link follow-up. | Implemented, generated and browser-evidenced; zero neutral component runtime. |
| Shopify | Merchant records projected to canonical APG markup or semantics-preserving `details`/`summary`, plus real optional destination. | Canonical CSS, assets, manifest and validation synchronized; records/schema/group/category policy planned. |
| Webflow | Target-agnostic Ceramics profile over the same canonical dependencies. | Source-ready; no target-specific behavior required. |
| React / Angular | Thin projection around Accordion and Link with target-owned item values and coordinator. | Contract-ready; no independent FAQ state store. |
| Figma | Contextual frame containing reviewed Accordion and Link instances. | Planned; registered reference is unrelated generic artwork. |
| SwiftUI / Compose | Target-native disclosure group or visible sections plus native navigation. | Conceptual; targets preserve content and ownership boundaries. |

Canonical and Shopify Ceramics CSS are byte-identical at SHA-256
`97202d91bdad08ac7f987bb1cbf258e6ef4950c33fc948a49808108697038a55`.
Shared source runtime, Shopify runtime and Web runtime are also byte-identical.
No placeholder Liquid, category controller, record schema or target state store
was added.

## Performance And Risks

| Surface | Baseline gzip | Final gzip | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Ceramics CSS | `4,459 B` | `4,229 B` | `5.3 KiB` (`5,427 B`) | pass; `230 B` removed, `1,198 B` remaining |
| Neutral Web components CSS | `66,947 B` stale generated baseline | `67,675 B` synchronized snapshot | `64 KiB` (`65,536 B`) | existing `2,139 B` program gap; full rebuild includes unrelated pending canonical-source synchronization |
| Shared neutral runtime | `10,501 B` stale generated baseline | `10,580 B` synchronized snapshot | `8 KiB` (`8,192 B`) | existing `2,388 B` exception; FAQ adds `0 B`, rebuild synchronized pre-existing source runtime drift |

- Human review must approve disclosure Accordion versus always-visible headings
  or separate pages based on user/content evidence.
- Header measure/alignment/type/rhythm, inherited Accordion surface/density/icon,
  and follow-up treatment are visual candidates, not stable facts.
- Stable single/multiple/collapsible/exact-exclusive expansion policy remains
  target/product-owned.
- Category navigation versus filtering, taxonomy, URL, focus, results, empty
  state and announcements remain an explicit product decision.
- Record/CMS source, content governance, localization, rich-content trust,
  safety/legal placement, target maximum and analytics remain open.
- Dedicated Shopify/Liquid, Figma and framework adapters remain absent.
- Global Web CSS/runtime overages are existing program gaps, not budget
  increases authorized by this component.

## Validation

Registry/docs, DTCG source, 183 contracts, 183 Studio definitions, Neutral Web,
Shopify, source/generated CSS/runtime identity, structural certification,
static Preview audit, exact Exhibit/Studio parity, pointer/Enter/Space
interaction, collapsed/expanded/zero/multiple-open states, optional omission,
real navigation, long/localized/unbroken/RTL content, 200% zoom, light/dark
contrast, forced colors, reduced motion, deterministic gzip, temporary Vite
build outside `site/dist`, refinement/parity audits, diff checks and console
inspection comprise Batch 58.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Approve Accordion, always-visible headings or separate pages as the stable
   content mode based on user and content evidence.
2. Approve or revise measure, header alignment, typography, vertical rhythm,
   inherited Accordion density/surface/indicator and contact treatment.
3. Confirm the four-property API, optional heading, required items and absence
   of category, layout and duplicate expansion controls.
4. Select category navigation or in-place filtering only if required; define
   taxonomy, URL, focus, results, empty state and announcements together.
5. Select record/CMS ownership, content governance, safety/legal placement,
   target maximum and Shopify editor mapping before a dedicated target adapter.
6. Create Ceramics FAQ-specific Figma examples after browser approval and keep
   the contract `pilot` until explicit human stability approval.
