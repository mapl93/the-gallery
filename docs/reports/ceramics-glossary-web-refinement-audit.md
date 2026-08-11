# Ceramics Glossary Web Refinement Audit

Status: Technically refined; ready for human review; remains `pilot`

Date: 2026-07-15

## Outcome

R12 Ceramics Glossary is now a grouped editorial composition of canonical
Accordion and Link rather than a third disclosure implementation. Registry,
contract `0.3.0`, MDX, Studio metadata and the browser renderer declare the same
direct dependencies. Separate B and C headings preserve truthful source order;
each visible term uses `dfn` in a contextual Accordion heading; panels use
native `hidden`; optional media stays bounded; and related terms use real Links.

The unresolved B/C/Q alphabet controls, duplicated trigger/panel CSS, broken
one-way expansion, inaccurate `B-C` heading and prevented placeholder link are
gone. Alphabet navigation, filtering, search, URL state, focus movement and
result announcements are deliberately absent until their product behavior is
selected.

The result is prepared for explicit human review, not stable. Human review must
decide whether definitions should remain disclosures or become an always-visible
native `dl`, then approve the visual proposal. No component-specific Figma
artwork, glossary record source or production target adapter has been selected.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Grouped target-owned ceramics terms and definitions only; no taxonomy, CMS, search, result or URL ownership. |
| Anatomy and composition | pass | Optional title/intro, source-ordered letter sections, canonical Accordion items, `dfn`, optional media and canonical related Links. |
| Variants, states and modes | pass | Default, collapsed, expanded and independent multiple-open evidence; per-item disabled behavior is inherited from Accordion; one neutral size/variant. |
| Public API | pass | Optional localized `title` and `intro`, required target-owned `terms`; unresolved alphabet controls removed. |
| Controlled/uncontrolled | pass | Accordion owns per-item semantics; targets choose initial and single/multiple coordination without a glossary-owned duplicate store. |
| Canonical dependencies | pass | Direct Accordion and Link dependencies; one shared `AccordionArtwork` also serves canonical Accordion. |
| Tokens and visual system | pass | Thirteen glossary-owned semantic tokens; trigger, panel, focus, disabled, surface and motion tokens stay with dependencies. |
| Accessibility and motion | pass | Contextual headings, native Button/`dfn`, synchronized relationships/`hidden`, Enter/Space/Tab, real Links, forced colors and zero reduced-motion transition. |
| Responsive/content resilience | pass | Four viewports plus 320px extreme localized/empty/RTL and 200% zoom probes without overflow. |
| Runtime and assets | pass | Zero neutral listener, observer, request, search index, state store, formatter, layout read, animation or bundled asset. |
| Cross-target translation | pass | Web implemented; Shopify/Webflow CSS regenerated; target-native record and behavior mapping remains deliberately planned. |
| Exhibit/Studio parity | pass | One renderer and initial fixture; byte-identical root DOM. |
| Human readiness | pass | Dossier, ADR, contract, docs, targets, evidence, budgets, risks and gates complete; status remains `pilot`. |

## Contract And Implementation Result

- Contract advances from `0.2.0` to `0.3.0`, remains `pilot`, and records
  `accordion` and `link` as direct dependencies at refinement depth 1.
- `.ceramics-glossary__terms` layers on `.accordion`; every
  `.glossary-term` layers on `.accordion__item`. The glossary owns no trigger,
  indicator, focus, panel-visibility, disabled or reduced-motion implementation.
- B and C are separate native sections and contextual H3 headings. Term triggers
  sit inside H4 Accordion headings and visible terms use `dfn`.
- The optional title labels the root. Removing it removes both the heading and
  dangling `aria-labelledby` while group headings retain document structure.
- The docs fixture starts with Bisque expanded, supplies one informative image
  capped by a private `12.5rem` measure, and links to the actual Crawling trigger.
- The Studio inspector exposes title, intro, required term composition and only
  glossary-owned public tokens. Per-item state remains with Accordion rather
  than adding a duplicate glossary-level control.
- Shared docs-only `AccordionArtwork` now renders both canonical Accordion and
  Ceramics Glossary, preserving one DOM and interaction implementation without
  making React the neutral source.
- The contract explicitly excludes alphabet controls until navigation, filter,
  search, URL, focus and announcement behavior is accepted.

## Browser Evidence

### Structure, Interaction And State

- Initial root HTML contains four unique trigger/panel relationships. Bisque is
  expanded with a visible panel; the other three panels have native `hidden`.
- Clicking Bisque collapses it. Tabbing to Bone dry and pressing Enter expands
  it; Space collapses it again. Normal native Button activation is sufficient.
- Opening Crawling while Bisque remains open produces exactly two expanded
  triggers and two visible panels, proving independent multiple-open behavior.
- Collapsing the initial item yields zero expanded triggers and zero visible
  panels. Per-item native disabled behavior is inherited from the canonical
  Accordion dependency and is not restated as a glossary-level property.
- The related Crawling Link has a real hash and resolves to an existing trigger.
  No placeholder navigation is prevented by the renderer.
- Browser console inspection reports zero errors and zero warnings.

### Parity, Content And Viewports

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1440x1000`) and XL
  (`1920x1200`) have paired Exhibit/Studio final captures. Initial Mobile root
  `outerHTML` is byte-identical at `4,610` characters with SHA-256
  `32dfae37cb5a8d95c19bb24a63a1f8e8a5133cc354d6dd791ee335f4cafa8e62`.
- Removing title removes the H2 and `aria-labelledby`. A long mixed
  Spanish/Arabic/German introduction remains exactly contained at 390px.
- A synthetic 320px required-resilience probe combines an unbroken localized
  term, long definition, empty definition, long related label and RTL. The root
  reports `288px` client/scroll width and the document `320px`; no trigger or
  panel content overflows.
- At 200% CSS zoom plus RTL, the effective root remains exact at `179/179px`
  and the document at `390/390px`.
- Eight before and eight final images live under
  `output/playwright/refinement-batch-56/`.

### Contrast And User Preferences

- Light title/trigger contrast is `17.93:1`; supporting copy, definitions and
  related Links are `7.81:1`.
- Dark title/trigger contrast is `17.18:1`; supporting copy, definitions and
  related Links are `12.09:1`.
- Forced colors resolves canonical Accordion borders to system colors.
- Reduced motion resolves the canonical indicator to `0s` transition duration
  and `none` transition property.
- Native hidden removes collapsed panel descendants from rendering and normal
  sequential focus. Canonical Button and Link keep their accepted focus rules.

## External And Figma Evidence

The [HTML Living Standard](https://html.spec.whatwg.org/dev/grouping-content.html#the-dl-element)
explicitly demonstrates a glossary with `dl` and `dfn`, preserving an
always-visible alternative. The
[WAI-ARIA APG Accordion pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/)
requires contextual headings, native Button triggers, synchronized expansion
and visibility, Enter/Space activation and ordinary Tab order. Open UI and
Radix confirm that single/multiple and controlled/uncontrolled coordination
belong to Accordion, not the glossary wrapper. GOV.UK cautions that hidden
content needs user evidence and that visible headings or anchors can be easier
to scan.

Current Polaris documentation exposes no Accordion or glossary primitive. The
Gallery contract therefore remains the Shopify target boundary rather than
copying an archived framework API. The official Shopify theme validator accepts
the generated `assets/ceramics.css` artifact `ceramics-glossary-batch-56`,
revision 1.

Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector `1020:480`
are generic Button/Studio shells, not Ceramics Glossary artwork. No glossary
measure, grouping, disclosure, media or responsive fact was promoted from them.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Grouped sections plus canonical Accordion and Link markup. | Implemented, generated and browser-evidenced; zero neutral runtime. |
| Shopify | Liquid records map to canonical APG Accordion or semantics-preserving `details`/`summary`; target owns ids and group policy. | CSS ready and officially validated; record/schema/Liquid adapter remains planned. |
| Webflow | Canonical target-agnostic Ceramics CSS copy. | Source/generated identity verified. |
| React / Angular | Target records plus canonical controlled/uncontrolled Accordion and Link projections. | Contract-ready; no second glossary state store. |
| Figma | Letter-group frame containing accepted Accordion/Link instances. | Planned; registered references are unrelated. |
| SwiftUI / Compose | Target-native disclosure groups or always-visible definition structures. | Conceptual; product mode remains open. |

Canonical, Shopify and Webflow Ceramics CSS are byte-identical with SHA-256
`b56fcfb0ef663ddcac9c8609e3473088ed0997894300799a6496f9123155be28`.
Shopify remains at 56 target-ready components; no placeholder glossary Liquid
was added.

## Performance And Risks

| Surface | Deterministic gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Ceramics CSS | `4,703 B` | `5.3 KiB` (`5,427 B`) | pass; `724 B` remaining |
| Shared neutral runtime | `10,492 B` | `8 KiB` (`8,192 B`) | existing `2,300 B` program exception; `0 B` added |
| Neutral Web components CSS | `67,090 B` | `64 KiB` (`65,536 B`) | existing `1,554 B` program gap; `42 B` better than baseline |

- Human review must choose disclosure Accordion versus always-visible `dl` and
  approve measure, spacing, letter rule, Accordion density, image scale and
  related-link treatment.
- Initial state and single/multiple group policy remain target decisions.
- Alphabet navigation/filter/search and its URL, focus, result and announcement
  lifecycle remain deliberately absent.
- Taxonomy, normalization, synonyms, localization, CMS ownership and related
  destinations remain product/content decisions.
- Dedicated Shopify/Liquid, Figma and framework adapters remain absent.
- Global Web CSS/runtime overages remain program gaps, not budget increases.

## Validation

Registry/docs, DTCG source, 183 contracts, 183 Studio definitions, Neutral Web,
Shopify, Webflow copies, official Shopify CSS validation, source/generated CSS
identity, structural certification, static Preview audit, exact Exhibit/Studio
parity, pointer/Enter/Space interactions, default/collapsed/expanded/
multiple-open states, canonical disabled ownership, unique relationships, real destinations, title omission,
long/localized/empty/extreme RTL content, 320px, 200% zoom, light/dark contrast,
forced colors, reduced motion, deterministic gzip, temporary Vite build outside
`site/dist`, refinement/parity audits, diff checks and console cleanliness
comprise Batch 56.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Human Review Queue

1. Choose disclosure Accordion or always-visible `dl` as the stable product
   mode, based on expected scan and linking behavior.
2. If disclosure remains, approve or revise measure, grouping rhythm, letter
   rule, Accordion density, initial state, image cap and related-link treatment.
3. Define alphabet navigation, filter or search behavior only if user research
   justifies it; select URL, focus and announcement ownership at the same time.
4. Select record/CMS normalization and target mappings before building Shopify
   or framework adapters.
5. Create Ceramics Glossary-specific Figma examples after browser approval.
6. Keep the contract `pilot` until explicit human stability approval.
