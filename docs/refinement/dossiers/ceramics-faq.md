# Component Dossier: Ceramics Care FAQ

Status: `human-review-ready`

Target reviewed: Neutral Web with documented Shopify and future-target translation

Contract: `components/contracts/ceramics-faq.contract.json`

## Recommendation

Treat Ceramics Care FAQ as a contextual composition of canonical Accordion and
Link rather than a second disclosure and destination implementation. Keep the
FAQ-specific introduction, target-owned question/answer records, and optional
follow-up region. Every question must use canonical Accordion headings,
triggers, panels, native `hidden`, focus, disabled, motion and target-coordinated
expansion behavior. Every follow-up destination must use canonical Link and a
real target-owned `href`.

Remove category controls from the v1 contract, CSS, Studio and fixture. The two
current Buttons do not filter, navigate, update `aria-pressed`, change the
question set, move focus, synchronize a URL or announce results. The accepted
product question explicitly leaves filter versus navigation unresolved. A
future accepted design can add one of two concrete modes:

1. category navigation using real Links and stable destinations; or
2. in-place filtering with a named single-choice control, target-owned result
   state, URL policy, focus policy, empty results and announcements.

Do not retain inert category classes or a compatibility property. Preserve the
open decision and add the behavior only when one complete mode is selected.

Keep `heading` and `subheading` optional, but emit `aria-labelledby` only when a
non-empty visible heading exists. Require `items` for the component to render.
The review fixture may start one answer open and allow independent expansion;
that is evidence, not a stable default or single/multiple group policy.

## Purpose And Limits

- Presents concise target-owned questions and answers about ceramic care,
  materials, use, handling or product-record guidance.
- Primary contexts are product/editorial pages, care hubs, post-purchase help,
  and target-native commerce sections.
- Ceramics FAQ owns its contextual introduction and optional follow-up
  presentation. Canonical Accordion owns per-item disclosure semantics and
  behavior. Canonical Link owns navigation.
- Targets own records, ordering, stable ids, heading rank, initial expansion,
  single/multiple/exact-exclusive coordination, rich-content trust,
  localization, source policy, destinations, analytics and persistence.
- It is not a search system, knowledge base, category taxonomy, faceted result
  set, policy database, product eligibility source, live support channel, CMS
  schema or legal/health/safety authority.
- The neutral source owns no category filter, URL state, query, network request,
  result count, announcement, session persistence, measurement or animation.

## Pre-Refinement Gallery Baseline

- Registry `R14`, category `ceramics`, no dependencies; contract `0.2.0`,
  `pilot`; thirteen anatomy parts, three states, three behaviors, five
  properties and eighteen public tokens.
- ADR 0083 records category controls and disclosure-style question anatomy but
  explicitly leaves filter versus navigation, result behavior and formal
  Accordion composition open.
- Canonical CSS independently owns category Buttons, question Buttons, answer
  visibility, icon rotation, hover, focus, transition and reduced-motion rules
  even though canonical Accordion and Link already completed refinement.
- The initial fixture renders two category Buttons with `aria-pressed="false"`.
  Clicking Care leaves both values false and keeps the same two items; the
  controls perform no action.
- Clicking the first question changes it to expanded and reveals its answer,
  but clicking it again leaves it expanded. Panels have no native `hidden`,
  collapsed content is removed only by CSS, and Studio panels lack the optional
  labelled-region structure used in the MDX example.
- The follow-up Link points to missing `#care-guidance` and prevents its native
  navigation. Browser activation leaves the URL/hash unchanged.
- Clearing the optional heading leaves the root with a dangling
  `aria-labelledby`; browser evidence measured `headingCount: 0` and
  `labelExists: false`.
- Exhibit and Studio share the renderer and fixture, but their current state is
  behaviorally incomplete. Existing evidence covers only the default Mobile,
  Tablet, Desktop and XL artwork and does not cover collapse recovery, multiple
  open items, empty optional parts, localization, RTL, zoom, special colors,
  exact parity or source/generated identity.
- Deterministic gzip baseline is `4,459 B` for Ceramics CSS against the permanent
  `5.3 KiB` (`5,427 B`) family ceiling, `66,947 B` for generated neutral Web
  component CSS, and `10,501 B` for shared runtime. Ceramics FAQ adds no neutral
  runtime.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) | Each native Button is the only child of a contextual heading; `aria-expanded`, `aria-controls`, panel visibility and optional regions stay synchronized; Enter/Space and normal Tab order apply. | Reuse canonical Accordion rather than recreating question triggers and CSS-only panels. |
| [Open UI Accordion research](https://open-ui.org/components/accordion.research/) | Accordion is a sequence of disclosures; non-exclusive, exclusive and exact-exclusive policies all exist across mature systems. | Keep group policy and controlled/uncontrolled coordination target-owned instead of inventing a Ceramics FAQ value API. |
| [HTML details/summary](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-details-element) | Native `details` represents one disclosure and `summary` its visible legend. | Shopify or another target may use native disclosure markup when it preserves the contract, but the neutral candidate keeps the accepted canonical Accordion anatomy. |
| [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion) | Exposes single/multiple, controlled/uncontrolled, collapsible, disabled and orientation choices at the Accordion root/item layer. | Those choices belong to the dependency or target coordinator, not a duplicate FAQ property surface. |
| [GOV.UK Accordion](https://design-system.service.gov.uk/components/accordion/) | Hidden content needs user evidence; visible headings or separate pages can be easier to scan, while an Accordion can help users choose among related sections. | Keep the current disclosure as a review candidate, document an always-visible alternative, and require human/product evidence before stable approval. |
| [Polaris Collapsible](https://polaris-react.shopify.com/components/utilities/collapsible) | Lower-priority content is controlled by an adjacent Button with unique id, expanded and controls relationships; critical information should not be hidden. | Shopify can compose target-native disclosure behavior, but care warnings required for every user must remain visible outside optional FAQ disclosure. |

### Mature-system comparison

- APG, Open UI, Radix and Polaris converge on a visible control, stable
  relationship and synchronized panel state. The current CSS-only display rule
  and one-way fixture do not meet that boundary.
- Radix and Open UI place single/multiple/collapsible policy in Accordion.
  Ceramics FAQ should accept target-owned records, not own a second expansion
  state model.
- GOV.UK provides a concrete alternative: visible headings or separate content
  may outperform disclosure when information is essential or commonly scanned.
  The v1 candidate remains Accordion because the repository already defines a
  FAQ disclosure surface, but final mode remains a human/product decision.
- Current Polaris Web Components expose no FAQ or Accordion. Archived Polaris
  React Collapsible is useful behavior evidence, not a target API to copy.
- None of the mature sources supports inert category Buttons. Category
  filtering or navigation requires a complete separate interaction model.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`,
and inspector `1020:480`. Direct Plugin API inspection finds a `1280x720`
generic `02 / Component Detail - Studio` frame with Button artwork and a
`344x684` generic inspector. Screenshot review shows Button label, type, size,
state, padding, gap, touch target, radius and fill controls. It contains no FAQ
heading, question, answer, Accordion, category, contact, responsive or ceramics
artwork. It validates inspector grouping only. The repository candidate remains
the visual proposal for human review.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | contextual `section.ceramics-faq` | Ceramics FAQ / target | Omitted unless at least one item composition is supplied; labelled only by a present visible heading. |
| Header | no | `header.ceramics-faq__header` | Ceramics FAQ | Omitted when both heading and subheading are empty. |
| Heading | no | contextual heading | target | Optional visible section label; rank belongs to document context. |
| Subheading | no | paragraph/rich text | target | Optional concise introduction; never substitutes for an accessible heading relationship. |
| FAQ list | yes | `.ceramics-faq__list.accordion` | Accordion / target | One canonical Accordion group containing at least one item. |
| FAQ item | repeated, at least one | `.ceramics-faq__item.accordion__item` | Accordion / target | Target-authored source order is authoritative. |
| Question heading | yes | contextual native heading | Accordion / target | Contains only the native trigger. |
| Question trigger | yes | native Button | Accordion | Required visible question and canonical trigger semantics. |
| Indicator | no | decorative icon | Accordion / target | Hidden from assistive technology; not required for meaning. |
| Answer panel | yes | canonical panel with native `hidden` | Accordion | Optional region naming only when useful and not proliferated. |
| Answer content | yes | target-owned flow content | target | Product/policy source owns accuracy, links, lists and rich-content trust. |
| Follow-up | no | `footer.ceramics-faq__contact` | Ceramics FAQ / target | Optional help context after the question set. |
| Follow-up text | no | paragraph | target | Omitted when empty. |
| Follow-up Link | no | native anchor with `.link` | Link / target | Real descriptive destination; no prevented placeholder activation. |

## Variant, Size, State, And Mode Matrix

- Variant/size: one contained contextual profile. Density, Accordion surface,
  icon, orientation, trigger padding and radius remain dependency-owned.
- Required composition: one or more valid question/answer items. Missing items
  omit the component instead of emitting an empty named section.
- Introduction: no header; heading only; subheading only; or heading plus
  subheading. Only a present heading supplies `aria-labelledby`.
- Item state: collapsed, expanded and target-disabled inherit canonical
  Accordion. One, multiple or exactly one expanded item is target policy.
- Follow-up: absent; text only; Link only; or text plus Link. A link requires a
  real destination.
- Categories: absent in v1. Future navigation and in-place filter modes remain
  alternatives, not hidden states or compatibility aliases.
- Content extremes: one, three, six and target maximum items; short, long, empty
  optional, localized, RTL, unbroken, rich answer and 200% zoom.
- Themes/assistive modes: light, dark, forced colors, reduced motion, keyboard,
  touch, screen reader and no-hover input.

## Public API And State Ownership

Expose four semantic properties:

- `heading` — optional visible contextual heading.
- `subheading` — optional introductory copy.
- `items` — required target-owned question/answer records projected through
  canonical Accordion.
- `contact` — optional follow-up content and canonical Link destination.

Remove `categories`. Do not add `category`, `activeCategory`, `filter`,
`categoryMode`, `onCategoryChange`, `resultCount`, `expandedItem`, `value`,
`defaultValue`, `type`, `collapsible`, `orientation`, `showAll`, `rememberOpen`,
`search`, `query` or `onExpandedChange` at the FAQ wrapper. Category lifecycle
belongs to a future selected product mode; expansion belongs to Accordion or a
target coordinator.

The neutral component has no controlled/uncontrolled store. Framework targets
may control Accordion values or use its target-native uncontrolled defaults.
The docs fixture may keep a local Boolean array solely to demonstrate correct
independent open/close behavior and parity.

## Token And Value Audit

- Canonical Accordion retains border, trigger/panel surface, focus, disabled,
  icon, transition, easing, touch target, item spacing and answer typography.
- Canonical Link retains navigation color, focus and transition tokens.
- Ceramics FAQ keeps only introduction and follow-up surface/text/spacing/radius
  tokens that it visibly owns.
- Remove category surface, statement surface, border-default, border-focus,
  radius-full, touch-target, transition and easing references from the profile.
- Use complete semantic H2/body typography pairs and logical dimensions. Keep
  the `45rem` component measure as a private composition variable rather than a
  public token.
- Remove literal fallback values and physical left/right/top/bottom properties.

## Accessibility And Interaction

- Emit a root label relationship only when a non-empty visible heading exists.
  Omit an empty header wrapper and omit the entire component when required items
  are absent.
- Reuse contextual Accordion headings, native Button triggers, stable ids,
  synchronized `aria-expanded`/`aria-controls`, native `hidden`, native
  Enter/Space activation and normal Tab order.
- Use labelled panel regions only when answer structure warrants them; avoid
  landmark proliferation for larger FAQ sets.
- Allow an expanded item to collapse when target policy permits. Preserve focus
  on the activated trigger and support independent multiple-open evidence.
- Follow-up navigation uses native Link with meaningful text and a real `href`.
- Do not expose category controls until their selection/navigation, URL, focus,
  result, empty and announcement lifecycle is selected.
- Do not hide essential safety, legal, eligibility or always-required care
  information only inside optional disclosures.
- No profile-authored motion remains. Canonical Accordion and Link already own
  reduced-motion and forced-color treatment.

## Responsive And Performance

- Use a private intrinsic measure, logical padding and content wrapping. No
  Ceramics FAQ viewport query or Studio-only component behavior is needed.
- Questions, answers and long destinations wrap without clipping at Mobile,
  Tablet, Desktop, XL, RTL, localization or 200% zoom.
- DOM/work is linear in target items. The profile owns no listener, observer,
  timer, request, formatter, result store, URL parser, layout read, animation,
  icon or neutral asset; target Accordion behavior is reused.
- Neutral runtime contribution remains `0 B`.
- Permanent Ceramics-family budget remains `5.3 KiB` (`5,427 B`) gzip. Removing
  category and duplicate disclosure/link CSS should reduce the family bundle
  and creates no new runtime ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Optional introduction plus canonical Accordion question/answer items and optional canonical Link follow-up. | Candidate to implement, generate, validate and browser-verify; zero neutral runtime. |
| Shopify | Section blocks mapped to APG Accordion markup or semantics-preserving `details`/`summary`, plus optional merchant destination. | Planned; record/schema/group policy and category behavior remain unresolved. |
| React / Angular | Thin composition around canonical Accordion and Link with target-owned item values and coordinator. | Planned; no independent FAQ state store. |
| Figma | Contextual frame containing reviewed Accordion and Link instances. | Planned; registered reference is generic Button artwork. |
| SwiftUI / Compose | Target-native disclosure group or always-visible question/answer sections plus native navigation. | Conceptual; product mode and records remain target-owned. |

## Exhibit And Studio Parity

- Exhibit and Studio must keep one `CeramicsStudio` renderer, one fixture and
  identical initial component `outerHTML`.
- The review fixture should contain three questions, start one answer open,
  allow every answer to expand/collapse independently, and expose a real
  canonical follow-up destination.
- Special evidence must cover pointer, Enter, Space, focus retention,
  collapsed/expanded/multiple-open/zero-open, heading omission, subheading and
  contact omission, long/localized/RTL/unbroken content, zoom, themes, forced
  colors, reduced motion, and source/generated identity.
- Studio exposes only the four semantic properties and profile-owned tokens.
  Dependency state and category controls are not duplicated.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| FAQ recreates canonical Accordion markup, visibility, focus and motion. | high | Compose canonical Accordion and register it as a direct dependency. | implementable from explicit goal and accepted layered composition |
| Category Buttons are inert and both start unselected. | high | Remove category API and CSS until filter or navigation is selected. | implementable strict correction; product mode remains open |
| Question opens but cannot collapse again. | high | Reuse canonical toggle behavior with native hidden panels. | implementable now |
| Collapsed answers lack native `hidden`. | high | Delegate synchronized visibility to canonical Accordion. | implementable now |
| Follow-up Link prevents navigation to a missing target. | high | Compose canonical Link with a real target-owned destination. | implementable now |
| Optional heading leaves a dangling label relationship. | high | Make root labelling conditional and omit empty header markup. | implementable semantic correction |
| CSS exposes dependency tokens and physical/hardcoded layout. | medium | Retain only contextual introduction/contact CSS and semantic logical tokens. | implementable now |
| No component-specific Figma artwork exists. | human review | Present repository candidate and request aesthetic approval. | owner |
| Category mode, records and target integrations remain open. | product/architecture | Keep explicit; do not invent filter/navigation or Shopify schema. | owner/target team |

## Refinement Result

- Advanced the contract to `0.3.0`, kept `pilot`, and added direct `accordion`
  and `link` dependencies.
- Removed category property, anatomy, state, behavior, CSS, Studio controls and
  fixture UI while retaining its product question without a compatibility alias.
- Replaced duplicated `.faq-item` markup and behavior with shared
  `AccordionArtwork`, native `hidden` panels and independent fixture toggles.
- Made root labelling conditional, omitted invalid required composition and
  replaced the prevented placeholder with canonical Link to a real destination.
- Kept only contextual introduction and follow-up CSS with complete typography,
  logical dimensions and profile-owned tokens.
- Updated MDX, Studio metadata, ADR, open questions and generated Web/Shopify
  adapters. Captured before/after, interaction, localization, special-mode and
  exact-parity evidence.

## Evidence And Validation

- Eight paired initial and eight paired final captures cover Mobile `390x844`,
  Tablet `768x1024`, Desktop `1440x1000`, and XL `1920x1200` under
  `output/playwright/refinement-batch-58/`.
- Initial state exposes one expanded and two collapsed answers with native
  `hidden`. Pointer collapse reaches zero open; Enter opens the second; Space
  closes it; and the first and third can remain open together. Focus stays on
  the activated native Button.
- Browser inspection finds three canonical triggers, zero category controls,
  one canonical follow-up Link, and labelled regions only for visible answers.
- The real `/components/care-instructions` destination navigates to the Care
  Instructions component page. No activation is prevented.
- Clearing only `heading` preserves optional subheading content but removes the
  heading node and `aria-labelledby`. Clearing both introduction fields omits
  the header; disabling optional contact omits the footer. Required `items`
  stays checked and disabled in Studio.
- Long Spanish plus an unbroken German compound remains `720/720px`; full
  Arabic RTL remains `358/358px`; both documents remain within their `768px`
  and `390px` viewports. At 200% CSS zoom the document remains `390/390px`.
- Light contrast ranges from `5.40:1` for the follow-up Link to `17.93:1` for
  heading/questions. Dark contrast ranges from `8.39:1` to `17.18:1`.
  Forced-colors structure remains legible and reduced-motion yields only `0s`
  transitions inside the component.
- Exhibit and Studio initial root DOM are byte-identical at `3,366` characters
  with SHA-256
  `df7c70c5237ea6468919b134a9ae61e77868f57dfb1bff489b35190f7f65db6b`.
- Canonical and Shopify `ceramics.css` are byte-identical at SHA-256
  `97202d91bdad08ac7f987bb1cbf258e6ef4950c33fc948a49808108697038a55`.
  Shared, Web and Shopify runtime are also byte-identical; Ceramics FAQ adds no
  component runtime.
- Deterministic Ceramics CSS gzip falls from `4,459 B` to `4,229 B`, removing
  `230 B` and leaving `1,198 B` below the `5,427 B` family ceiling.
- Registry/docs, 183 contracts, 183 Studio definitions, Web and Shopify adapter
  validation pass. The development console contains informational React
  DevTools messages only.

## Readiness Decision

Ceramics Care FAQ is `human-review-ready` for Neutral Web and remains `pilot`.
The technical, semantic, responsive, accessibility, adapter and parity gates
are reconciled. Human visual/product review and explicit stability approval are
still required. Category mode, stable disclosure presentation, record/CMS
ownership and dedicated target integrations remain deliberately unresolved.

`site/dist` was not rebuilt or modified. No stability promotion was made.

## Remaining Human Review

- Approve Accordion versus always-visible question/answer sections as the stable
  product mode based on user/content evidence.
- Approve or revise measure, header alignment, typography, vertical rhythm,
  inherited Accordion density/surface/indicator and contact treatment.
- Confirm the four-property API, optional heading, required items and absence of
  category, layout and duplicate expansion controls.
- Choose category navigation or in-place filtering only if product research
  requires categories; define URL, focus, empty-result and announcement policy
  at the same time.
- Select FAQ record/CMS source, content governance, safety/legal placement,
  target maximum items and Shopify editor mapping.
- Create Ceramics FAQ-specific Figma examples after browser approval and keep
  the contract `pilot` until explicit human stability approval.
