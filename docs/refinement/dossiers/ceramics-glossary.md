# Ceramics Glossary Refinement Dossier

Status: `human-review-ready`

Date: 2026-07-15

Registry: `R12` / `ceramics-glossary`

Dependency order: 157, phase 6 (Composed components), refined depth 1

## Purpose And Limits

Ceramics Glossary presents target-owned ceramic terms and definitions in an
alphabetical, scannable source order. The neutral component owns the glossary
frame, optional introduction, letter grouping and composition boundary for term
disclosures. It does not own a ceramics taxonomy, CMS schema, search index,
filter results, URL state, localization service or related-term graph.

The existing registry explicitly describes accordion definitions. That source
fact permits disclosure composition, but not a second disclosure implementation:
Ceramics Glossary must consume canonical Accordion. The target continues to own
term records, stable IDs, heading rank, per-item expansion, single/multiple group
policy and optional panel-region use.

## Accepted Source Facts

- ADR 0083 records grouped terms and disclosure-style anatomy while leaving
  alphabet navigation/filtering/search and data ownership open.
- ADR 0099 defines canonical Accordion as heading + native Button + synchronized
  panel/`hidden` composition, with target-owned group policy.
- The refinement goal requires composed components to consume canonical
  dependencies and forbids exposing incoherent configuration.
- The repository is the source of truth; Figma is evidence and a future target.
- Exhibit and Studio must use one renderer and one initial fixture.
- Ceramics Glossary remains `pilot` until explicit human review.

## Baseline Audit

- Contract `0.2.0`, registry and docs declare no dependency despite duplicating
  an Accordion trigger, indicator, panel visibility and motion implementation.
- The root exposes seventeen public token references, including focus, touch,
  border, hover, transition and easing tokens actually owned by Accordion.
- The docs renderer groups `Bisque` and `Crawling` under the inaccurate combined
  heading `B-C`, rather than separate alphabetical groups.
- Three B/C/Q alphabet Buttons are enabled and focusable but have no click
  handler, destination, filtering behavior, result state or announcement. Their
  existence contradicts the open product boundary.
- A term can expand, but clicking the same trigger again leaves it expanded.
  There is no truthful collapse path.
- Triggers are not wrapped in semantic headings. Expansion state is duplicated
  on an `article`, and collapsed panels rely on glossary CSS rather than native
  `hidden` from the accepted Accordion contract.
- Hidden related links point back to the glossary root and the docs renderer
  cancels navigation, so they are not truthful related-term destinations.
- At Mobile Studio the root contains exactly (`358px` client/scroll width), but
  source content is too short to prove long, localized or extreme resilience.
- Eight paired baseline images cover Mobile, Tablet, Desktop and XL under
  `output/playwright/refinement-batch-56/before/`.
- Ceramics CSS is `4,687 B` deterministic gzip against the `5.3 KiB` family
  ceiling. Complete Web component CSS is `67,132 B` against the existing
  `65,536 B` program ceiling; shared runtime is `10,492 B` against its existing
  `8,192 B` exception.

## Standards And Mature-System Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| HTML Living Standard `dl` | A description list represents name-value associations and explicitly includes a glossary example using `dfn`. | Always-visible glossary content may map to `dl` in a future non-disclosure mode; disclosure v1 must still preserve clear term/definition meaning. |
| WAI content structure | Description lists programmatically connect related terms and descriptions; logical headings expose document structure. | Keep real alphabetical group headings and unambiguous term labels, not a synthetic `B-C` heading. |
| WAI-ARIA APG Accordion | Each trigger is the only child of a contextual heading; `aria-expanded`, `aria-controls` and panel visibility stay synchronized; Enter/Space activate and Tab remains ordinary. | Consume canonical Accordion without a glossary-owned keyboard or visibility model. |
| Open UI Accordion research | Systems vary between non-exclusive, exclusive and exact-exclusive policies. | Do not freeze a glossary-specific single/multiple group policy. |
| Radix Accordion | Separates Root, Item, Header, Trigger and Content, and exposes controlled/uncontrolled single/multiple models. | Match compositional anatomy while keeping framework value shapes in adapters. |
| GOV.UK Accordion guidance | Hidden content needs user evidence; well-structured visible content or anchor links can be preferable. | Preserve the existing disclosure direction for v1, but require human confirmation that hiding definitions is desirable. |
| Current Polaris web components | Polaris supplies structure, text, links and controls but no current Accordion primitive in its documented catalogue. | Shopify targets should use native details or the Gallery Accordion contract; no provider-specific visual API is copied. |

References:

- <https://html.spec.whatwg.org/dev/grouping-content.html#the-dl-element>
- <https://www.w3.org/WAI/tutorials/page-structure/content/>
- <https://www.w3.org/WAI/ARIA/apg/patterns/accordion/>
- <https://open-ui.org/components/accordion.research/>
- <https://www.radix-ui.com/primitives/docs/components/accordion>
- <https://design-system.service.gov.uk/components/accordion/>
- <https://shopify.dev/docs/api/app-home/web-components>

## Owner Visual References

Studio metadata points to Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Direct read-only inspection confirms that both nodes
remain the generic Button component-detail shell and Studio inspector. They do
not contain Ceramics Glossary artwork and cannot determine grouping, disclosure
density, term imagery, alphabet behavior or related-link treatment.

## Convergence And Differences

Consensus:

- glossary records need clear terms, definitions and alphabetical structure;
- a disclosure presentation uses contextual headings and native Buttons;
- hidden panels must leave rendering and focus order;
- ordinary Tab, Enter and Space behavior is sufficient;
- single/multiple expansion remains a target policy;
- related destinations are real Links when supplied;
- review context does not justify duplicate Accordion CSS or runtime.

Differences that remain product, content or target decisions:

- disclosure versus always-visible definition-list presentation;
- alphabet anchor navigation, filtering, search or no alphabet control;
- taxonomy, term aliases, localization, synonyms and cross-references;
- heading rank and optional panel-region threshold;
- single, multiple, exact-exclusive or remembered expansion;
- CMS, URL, analytics, search and result announcements;
- final Figma and target-native presentation.

## Recommended Direction

Keep the current disclosure direction but compose canonical Accordion. Add
`accordion` and `link` as direct dependencies. Replace every duplicated
`.glossary-term__trigger`/content state rule with canonical Accordion anatomy,
native `hidden`, stable relationships and independently toggleable items.

Use separate B and C group headings. Keep only glossary-owned layout, heading,
optional image and related-copy styling. Related destinations use canonical
Link classes and real hashes in the docs fixture.

Remove `alphabetNavigation`, `.ceramics-glossary__alpha-btn`, active/disabled
alphabet states and their tokens from the v1 contract. This does not decide
between navigation, filtering and search; it prevents an unresolved choice from
appearing as a supported inert API. A future accepted decision may add a
coherent composed navigation or filter surface.

Extract the canonical docs Accordion tree into a shared `AccordionArtwork`
renderer used by Accordion itself and Ceramics Glossary. Local React state and
IDs remain documentation-target evidence, not neutral runtime.

## Alternatives Requiring A Decision

1. **Always-visible semantic description list.** Prefer `dl`/`dt`/`dd` when
   research shows definitions should remain directly scannable. This would
   remove Accordion behavior rather than imitate it.
2. **Alphabet anchor navigation.** Requires a sufficiently long glossary,
   stable group IDs, skip behavior and an accepted decision that letters scroll
   rather than filter.
3. **Alphabet filter or search.** Requires result-count/empty state, URL/history,
   focus and announcement policy plus a canonical form/control composition.
4. **Exclusive or remembered expansion.** Requires an accepted group policy and
   target persistence boundary; per-item correctness does not depend on it.

The current repository does not authorize alternatives 2–4. Alternative 1 is a
human/product choice after reviewing the disclosure candidate.

## Candidate Anatomy

| Part | Required | Semantics | Ownership |
| --- | --- | --- | --- |
| Root | yes | neutral `section` when titled, otherwise generic container | Ceramics Glossary |
| Header | no | title plus introduction | Ceramics Glossary |
| Group | yes/repeated | section identified by one real letter heading | Ceramics Glossary / target |
| Terms | yes | `.ceramics-glossary__terms.accordion` | Ceramics Glossary + Accordion |
| Item | yes/repeated | `.accordion__item.glossary-term` | Accordion / target |
| Term heading | yes | contextual heading containing only the trigger | Accordion / target |
| Trigger/indicator | yes/optional | native Button plus decorative indicator | Accordion / Studio fixture |
| Panel/content | yes | associated native-hidden panel and flow content | Accordion / target |
| Image | no | informative image with useful alternative text | target content |
| Related copy/link | no | flow text plus canonical Link destination | Ceramics Glossary + Link |

## State And Mode Matrix

| Mode/state | Neutral expectation |
| --- | --- |
| Default fixture | First term expanded; remaining terms collapsed; ordinary source order. |
| Collapsed term | Trigger `aria-expanded=false`; panel has `hidden`; descendants absent from focus. |
| Expanded term | Trigger `aria-expanded=true`; panel visible; indicator follows Accordion. |
| Disabled term | Native disabled trigger; definition remains perceivable only if already expanded. |
| Multiple open | Valid independent target policy demonstrated by the docs fixture. |
| Empty terms | Invalid required composition; omit the complete glossary rather than an empty frame. |
| Missing title | Root becomes a generic container and does not emit a broken labelling relationship. |
| Long/localized/extreme | Terms, definitions and links wrap without colliding with the fixed indicator. |
| RTL | Logical alignment and canonical Accordion indicator remain coherent. |
| Reduced motion / forced colors | Inherited from canonical Accordion and Link. |

## Public API And State Ownership

- `title`: optional localized glossary heading.
- `intro`: optional localized supporting introduction.
- `terms`: required target-owned letter groups and canonical Accordion item
  composition.

The glossary emits no synthetic filter, navigation or result event. Static Web
and Shopify own rendered records and URLs. Framework adapters may coordinate
Accordion items through controlled or uncontrolled values, but Ceramics
Glossary must not retain a second expansion store.

## Token And Runtime Audit

- Glossary-owned public tokens cover its container spacing/measure, title,
  introduction, letter headings, optional image radius and related-copy color.
- Accordion owns trigger/panel borders, surfaces, focus, touch size, body type,
  disabled state, indicator and motion. Link owns destination interaction.
- Purely compositional measures remain private `--_ceramics-glossary-*` values.
- The neutral profile adds no listener, observer, request, search index,
  formatter, state store, layout read, animation or asset.
- Studio-controlled expansion and generated IDs remain documentation-only.

## Responsive And Content Evidence

- Eight paired final Exhibit/Studio screenshots cover 390, 768, 1440 and
  1920px under `output/playwright/refinement-batch-56/final/`; the eight baseline
  images remain under `before/`.
- Initial Exhibit and Studio root `outerHTML` is byte-identical at Mobile:
  `4,610` characters with SHA-256
  `32dfae37cb5a8d95c19bb24a63a1f8e8a5133cc354d6dd791ee335f4cafa8e62`.
- Pointer activation collapses the initial term. Enter opens a focused term and
  Space collapses it. Independently opening Crawling while Bisque remains open
  yields two expanded triggers and two visible panels.
- Pointer and keyboard probes prove all-collapsed (`0` visible panels), expanded
  and independent multiple-open states. Per-item disabled behavior remains
  canonically owned and evidenced by Accordion rather than duplicated in the
  glossary inspector. Every trigger relationship has a unique ID, a real
  controlled panel and matching native `hidden` state.
- Removing title removes both the H2 and its `aria-labelledby`. A long mixed
  Spanish/Arabic/German introduction contains exactly at 390px.
- A synthetic required-resilience probe at 320px uses an extreme unbroken term,
  long localized definition, empty definition, long related Link and RTL. Root
  and document remain exact (`288/288px` and `320/320px`), with no trigger or
  content overflow.
- At 200% CSS zoom plus RTL, root and document also contain exactly
  (`179/179px` and `390/390px`).
- Light contrast is `17.93:1` for title/triggers and `7.81:1` for supporting
  copy, definitions and related Links. Dark contrast is `17.18:1` and
  `12.09:1` respectively.
- Forced colors resolves the canonical Accordion border to a system color.
  Reduced motion resolves its indicator transition to `0s` / `none`.
- Browser console inspection reports zero errors and zero warnings.
- Canonical, Shopify and Webflow Ceramics CSS are byte-identical at SHA-256
  `b56fcfb0ef663ddcac9c8609e3473088ed0997894300799a6496f9123155be28`.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Letter groups plus canonical Accordion and Link composition. | Safe to implement now. |
| Shopify | Liquid records map into canonical Accordion markup or native `details`; content schema remains target-owned. | Planned; no glossary record source selected. |
| React / Angular | Target-owned group records and controlled/uncontrolled canonical Accordion values. | Planned; no second glossary state store. |
| Figma | Letter-group frame containing canonical Accordion instances and optional media/link content. | Planned; current reference is unrelated. |
| SwiftUI / Compose | Target-native disclosure groups or always-visible term/definition lists. | Conceptual. |

## Human Review Boundary

Human review must first decide whether definitions should remain disclosures or
become an always-visible definition list. If disclosure is retained, approve
the canonical Accordion border, radius, density, heading hierarchy, expanded
content rhythm, image scale and related-link treatment. Alphabet navigation,
filtering and search remain absent until explicitly decided. No `stable`
promotion is permitted without explicit approval.

## Final Performance And Validation

- Ceramics CSS is `28,445 B` raw and `4,703 B` deterministic gzip against the
  permanent `5.3 KiB` (`5,427 B`) family ceiling, leaving `724 B`.
- Complete Neutral Web component CSS is `67,090 B` gzip against the existing
  `65,536 B` ceiling, a `1,554 B` program gap and `42 B` improvement from the
  baseline. Shared runtime remains `10,492 B`, the existing `2,300 B` exception;
  this component adds zero neutral runtime.
- Registry/docs, 183 contracts, 183 Studio definitions, Neutral Web, Shopify,
  Webflow identity, static previews, structural/refinement/parity audits, a
  temporary Vite build outside `site/dist`, browser interactions, content and
  preference modes, deterministic gzip and official Shopify CSS validation all
  pass.
- `site/dist` was not rebuilt or modified. The contract remains `pilot`.
