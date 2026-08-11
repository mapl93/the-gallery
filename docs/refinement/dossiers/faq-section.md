# Component Dossier: FAQ Section

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation

Contract: `components/contracts/faq-section.contract.json`

## Recommendation

Keep FAQ Section as a small contextual wrapper around canonical Accordion. It
should own only an optional introductory heading, optional supporting text, the
placement of one required ordered Accordion composition, and container-aware
section rhythm. Accordion must continue to own item anatomy, expansion state,
disabled state, keyboard activation, focus, trigger/panel relationships, and
group policy.

Render a native `section` named by the visible title when a non-empty title is
supplied. Without a title, render a generic `div`; supporting text alone does
not name a thematic section. Omit the complete wrapper when the required item
composition is absent or empty. Do not give every answer a `region`: panel
landmarks remain an explicit contextual Accordion decision and are unnecessary
for the three-question reference fixture.

The docs target should consume the existing `AccordionArtwork` renderer instead
of reconstructing its markup and behavior inside `SectionsStudio`. Shopify can
translate the same item composition to native `details`/`summary`, allowing
zero-script multiple disclosure while preserving canonical visual classes.
Group exclusivity, exact-one-open policy, analytics, structured data, search,
content sourcing, and editor limits remain target-owned.

No new architecture decision is needed. ADR 0082 already requires FAQ Section
to compose Accordion, and ADR 0099 already assigns Accordion group policy to the
consumer/target and permits a native `details` translation. Human review must
approve the final width, centered introduction, typography, density, disclosure
indicator, and open-state candidate before any stability promotion.

## Purpose And Limits

- Groups concise questions and answers about one coherent subject inside a page.
- Supplies optional visible context above one required canonical Accordion.
- Supports policy, care, shipping, viewing, product, service, or process topics
  when disclosure reduces scanning cost without hiding essential information.
- Does not become a knowledge base, search result, support ticket flow, nested
  navigation tree, tab set, glossary, product policy source, or generic rich-text
  section.
- Does not replace Ceramics Care FAQ, which is a domain profile with optional
  care-instructions contact content and its own accepted dependency surface.
- Critical instructions, legal consent, price, availability, errors, and content
  required to complete a task must remain visible outside collapsed answers.
- Nested accordions are unsupported. Long guides should link to a dedicated page
  instead of creating deeply nested disclosure content.
- Content governance, localization, sanitization, links, SEO/structured data,
  analytics, persistence, CMS records, and merchant editor state are target-owned.

## Current Gallery Baseline

- Registry identity `S9`, category `sections`, selector `.faq-section`, dependency
  `accordion`, dependency depth `1`, and review order `169`.
- Contract `0.2.0`, `pilot`: root/header/title/subtitle anatomy, one default
  variant/size/state, one composition behavior, properties `title`, `subtitle`,
  and required `items`, seven partial public tokens, Web CSS implemented, and
  Shopify planned.
- CSS fixes the root to `740px`, centers it, and applies full
  `--space-layout-container` inline padding. It hardcodes `32px` and `8px`, omits
  complete title/body line-height and weight mappings, and leaves the subtitle's
  native paragraph margin intact.
- XL tokens resolve the inline container spacing to `160px`. A direct `200px` or
  `260px` root therefore grows to `320px`, reduces the Accordion content track to
  `2px`, and produces a section more than `6,000px` tall. A `520px` root leaves a
  `200px` Accordion track. The docs shell masks this intrinsic failure.
- The docs renderer manually recreates Accordion headings, triggers, icons,
  panels, state, ids, and behavior instead of consuming `AccordionArtwork`.
- The docs renderer always emits `section`, never associates it with the visible
  title, uses a generic `div` header, and still emits an empty header when title
  and subtitle are cleared. Title-only, subtitle-only, and no-heading modes all
  remain unnamed native sections.
- All three fixture panels receive `role="region"` and `aria-labelledby` even
  though the panels are short and not structurally significant.
- The fixture behaves as a single, collapsible group with item zero initially
  open, but that local Studio policy is undocumented and must not become S9's
  neutral public API or default.
- Pointer, Enter, and Space correctly toggle the local native Button fixture;
  the initial/second/third/first state sequence is `100 -> 010 -> 001 -> 100`.
- Exhibit and Studio already resolve the same `SectionsStudio` renderer and
  fixture, but both modes share the duplicated and incomplete implementation.
- Studio exposes `title`, `subtitle`, and required disabled `items` composition,
  plus primary/secondary text, H2 size, and section-space token controls. Its
  design reference is the generic shared Sections shell; no S9-specific owner
  artwork or responsive frame is recorded in the repository.
- Shopify has copied canonical CSS only. Its manifest is `css-ready` with no
  Liquid, data mapping, native behavior, or editor schema.
- Before evidence lives under
  `output/playwright/refinement-batch-68/before/` for Exhibit/Studio at Mobile,
  Tablet, Desktop, and XL, plus interaction and direct `200px`/`1120px` roots.
- Deterministic level-9 baseline gzip is Sections `6,726 B`, Layout `6,826 B`,
  generated neutral Web component CSS `66,881 B`, and shared runtime `10,501 B`.
  Sections has a permanent `6,861 B` ceiling; FAQ Section's runtime budget is
  `0 B`.
- Baseline source SHA-256 is
  `9d9f3d6dc5e7eb5fe139225b7afa89842b946f7daa253985855c5466fb9a2b97`
  for canonical/copied Sections CSS and
  `38fed7b98c0f862e414a8e3a340396699de00c015b84ae4fba69b8cac6bf8075`
  for canonical/copied Layout CSS.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `details` and `summary`](https://html.spec.whatwg.org/dev/interactive-elements.html) | Native details exposes disclosure state through `open`; related details can participate in an exclusive group through `name`, but exclusivity is not required. | Shopify may use native details for zero-script disclosure; S9 must not force a group policy. |
| [WAI-ARIA APG Accordion](https://www.w3.org/WAI/ARIA/apg/patterns/accordion/) | A Button trigger is the only child of a heading, exposes `aria-expanded` and `aria-controls`, and activates with Enter/Space. Panel regions are optional and can create landmark proliferation. | The Web composition delegates exact semantics to canonical Accordion and does not automatically make every FAQ answer a region. |
| [Open UI Accordion research](https://open-ui.org/components/accordion.research/) | Accordion systems vary between non-exclusive, exclusive, and exact-exclusive policies; non-exclusive behavior is common. | Expansion policy belongs to Accordion consumers/targets, not the FAQ wrapper. |
| [Radix Accordion](https://www.radix-ui.com/primitives/docs/components/accordion) | Mature APIs distinguish single/multiple mode, collapsibility, controlled value, and default value at the Accordion group. | React/Angular adapters may offer controlled/uncontrolled conveniences, but S9 should expose no parallel group API. |
| [Polaris Collapsible](https://polaris-react.shopify.com/components/utilities/collapsible) | Disclosure is for lower-priority information and requires a stable trigger/content relationship. | Keep critical information visible and inherit relationship semantics from the dependency. |
| [GOV.UK Accordion](https://design-system.service.gov.uk/components/accordion/) | Accordions should be evidence-led, avoided when most users need all content, and not nested. | Document restrained use, visible essential information, and no nested FAQ disclosure. |
| [Shopify Sections](https://shopify.dev/docs/storefronts/themes/architecture/sections) | Section blocks are merchant-editable, reorderable repeated records; section blocks support theme-editor attributes. | Map each FAQ item to a Shopify block and include `block.shopify_attributes` without leaking block records into the neutral API. |

## Anatomy And Canonical Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | `section.faq-section` when titled; otherwise `div.faq-section` | FAQ Section / target | Titled section is named by the visible heading. Untitled wrapper has no section landmark. |
| Header | no | `header.faq-section__header` | FAQ Section | Present only when title or subtitle exists. |
| Title | no | contextual heading `.faq-section__title` | FAQ Section / target | Non-empty title gets a target-unique id and names the section. |
| Subtitle | no | paragraph `.faq-section__subtitle` | FAQ Section | Supporting context; never names a section by itself. |
| Accordion list | yes | `.accordion.faq-section__list` | Accordion + FAQ Section | Accordion owns disclosure anatomy; S9 adds only a contextual list hook. |
| FAQ item | yes, repeated | `.accordion__item.faq-section__item` | Accordion + FAQ Section | Ordered source item; target owns question/answer records. |
| Heading/trigger/panel/content | dependency-required | canonical Accordion anatomy or native target equivalent | Accordion / target | Never duplicated as private S9 behavior. |

The canonical neutral Web path consumes `AccordionArtwork` in docs and the
contract dependency in target code. Shopify's native `details`/`summary`
translation is equivalent target anatomy rather than a new neutral variant.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One centered introduction and one ordered Accordion; no S9 variant modifier. |
| Size | One intrinsic size; maximum measure, intro measure, inline padding curve, and breakpoint remain private composition. |
| Complete | One or more valid FAQ items, with independently optional title/subtitle. |
| Missing items | Omit the complete component; do not emit an empty landmark or border shell. |
| Titled | Native named section plus optional subtitle. |
| Untitled | Generic `div`; subtitle may remain visible but does not create a section landmark. |
| Collapsed / expanded / disabled | Inherited per-item Accordion states; not duplicated on `.faq-section`. |
| Single / multiple / exact-exclusive | Consumer/target group policy; unsupported as S9 properties. |
| Collapsible / required-open | Consumer/target group policy; unsupported as S9 properties. |
| Panel region | Off by default; contextual opt-in belongs to Accordion/target. |
| Theme | Semantic text, surface, border, and focus tokens in light/dark themes. |
| Forced colors | Native headings, buttons, borders, focus, and disclosure remain perceivable. |
| Reduced motion | Dependency indicator transition resolves to zero duration; S9 adds no motion. |
| RTL | Logical measures/padding and inherited text-start trigger alignment. |
| Responsive | Width and padding respond to the component's own inline size, not viewport or Studio-only queries. |

Unsupported combinations include zero items, an empty native section, a
subtitle-only section landmark, nested accordions, automatic landmark regions
for every answer, critical hidden information, S9-owned heading rank, duplicated
expanded state, target CMS records in the neutral contract, and a target-specific
single/multiple policy promoted as the component default.

## Public API And State Ownership

- `title` — optional trimmed visible string. When present it names the thematic
  root; target chooses the contextual heading rank and unique id.
- `subtitle` — optional trimmed supporting string. Omitted independently and
  never used as a replacement accessible name.
- `items` — required non-empty ordered Accordion composition. Each item retains
  Accordion's question, answer, expanded, disabled, trigger, panel, and content
  obligations or a semantically equivalent native target mapping.
- S9 exposes no `headingLevel`, `expanded`, `defaultExpanded`, `type`,
  `collapsible`, `multiple`, `requiredOpen`, `regionPanels`, `indicator`,
  `maxItems`, `structuredData`, `search`, `analytics`, breakpoint, measure,
  alignment, padding, CMS record, or Shopify block property.
- There are no S9 events. Per-item expanded changes belong to Accordion.
- There is no S9 controlled/uncontrolled strategy. React/Angular Accordion
  adapters may expose controlled values and defaults, but the FAQ wrapper must
  not become a second state owner.

## Token And Value Audit

- Public S9 tokens should cover section rhythm, introductory title/subtitle
  typography and colors, plus the inherited Accordion dependency tokens used by
  the composed result.
- Root/intro maximum measures are private `rem` containment constraints. They are
  not consumer-facing semantic configuration.
- Replace hardcoded `740px`, `32px`, and `8px` with private measures and existing
  semantic spacing tokens/calc. Complete font family, size, line-height, weight,
  color, and margin resets prevent UA drift.
- Structural zeroes, percentage width, ratio-free layout, border-box behavior,
  and container-query interpolation are implementation details, not tokens.
- Indicator SVG geometry remains Accordion/target-owned. FAQ Section must not add
  an icon property or duplicate Lucide names in the target-agnostic contract.
- The public token audit must distinguish S9-owned intro tokens from inherited
  Accordion border/surface/focus/touch/transition tokens. Dependency usage is
  documented; it does not make every Accordion token an S9 override control.

## Visual And Content Audit

- Baseline centered presentation is directionally useful, but fixed viewport
  padding destroys narrow embedded layouts and creates extreme vertical text.
- Use a bounded maximum root measure and a container-relative inline padding
  curve that preserves a real content track at `200px` and `260px`.
- Use a separate bounded introduction measure so long subtitles remain readable
  without changing Accordion width.
- Preserve question/answer source order and left/start alignment inside the
  centered intro composition.
- Reset title/subtitle native margins and use complete semantic type values.
- Test short, empty, long English, long Spanish, RTL, unbroken strings, inline
  links/lists, three short answers, many items, all collapsed, multiple open,
  disabled item, and omission of each optional intro part.
- Fixture questions and answers are documentation evidence only; they are not
  consumer defaults, policy claims, translations, or bundled content.

## Accessibility And Interaction

- Render the root only with one or more valid ordered items.
- Use a native section and `aria-labelledby` only when a visible title exists;
  use a generic `div` otherwise.
- Keep the heading level contextual. The docs fixture uses H2 for the section and
  H3 for item headings; S9 does not expose rank as semantic configuration.
- Inherit native Button, `aria-expanded`, `aria-controls`, stable id, native
  `hidden`, disabled, pointer, Enter, Space, Tab, focus-visible, and panel
  obligations from Accordion.
- Do not automatically set `role="region"` on short answer panels. Targets may
  opt in only when a panel is structurally significant and landmark count stays
  useful.
- Keep collapsed descendants out of rendering and sequential focus. Do not use a
  visual-only height collapse.
- Do not nest Accordion controls, place interactive descendants inside the
  trigger, announce ordinary expansion through a live region, or intercept
  optional Arrow/Home/End keys without an accepted Accordion policy.
- Verify text/border/focus contrast in light/dark/forced-colors and dependency
  transition suppression under reduced motion.

## Responsive And Performance

- Test direct roots at `200`, `260`, `520`, `900`, and `1120px`, plus docs Mobile
  `390x844`, Tablet `820x1000`, Desktop `1440x1000`, and XL `1920x1200`.
- Require `scrollWidth === clientWidth`, non-zero Accordion width, contained long
  text, stable source order, and no viewport-only or Studio-owned S9 layout rule.
- Neutral S9 runtime budget is exactly `0 B`: no listener, observer, request,
  timer, layout read, custom element, hydration, animation controller, or asset.
- The docs target may use local React fixture state as target evidence. That state
  is not neutral runtime and must live only in the canonical Accordion renderer.
- Shopify uses native details for zero-script disclosure. A target may later add
  group coordination, but such code needs an explicit target behavior budget.
- Sections remains capped at `6,861 B` deterministic gzip. Refine within the
  baseline `135 B` headroom or recover family space; do not raise the ceiling.
- FAQ Section may consume the already-budgeted Accordion CSS. Native details
  compatibility must remain a bounded dependency delta and preserve Layout's
  already-documented program exception rather than silently changing its ceiling.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Conditional native section/div plus canonical Accordion composition; target/consumer owns group state. | Implemented, generated, validated and browser-evidenced. |
| Shopify | Localized addable section; FAQ blocks map to native `details`/`summary` with canonical classes and editor attributes. | Implemented and adapter-maturity `ready`; official Liquid validation passed. |
| React / Angular | Wrapper composes one Accordion instance; Accordion alone exposes controlled/uncontrolled group value and change events. | Planned. |
| Figma | Optional intro plus repeated Accordion instances/states; no ids, runtime, CMS data, or hidden DOM claims. | Planned; generic Studio reference only. |
| SwiftUI / Compose | Optional contextual heading plus native DisclosureGroup/expandable list semantics and target-owned state policy. | Planned. |

## Exhibit And Studio Parity

- Both views resolve the same `SectionsStudio` renderer, three-item fixture,
  local initial state, and canonical CSS.
- S9's duplicated Accordion markup is replaced by `AccordionArtwork`; contextual
  classes exist only on the root/list/items and no site-only visual class remains.
- Keep item zero initially expanded solely as a documentation fixture decision.
  Document it as target evidence rather than a neutral default.
- The three short answers use `regionPanels={false}` and local state resets with
  the other fixture values.
- Normalized outerHTML is exact. Both views consume the same canonical style
  rules; Mobile/Tablet geometry is exact, while Desktop/XL values respond to the
  intentionally different stage widths. Interaction, focus, optional-part
  omission and all four evidence viewports pass.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Narrow direct roots force `320px` and a `2px` Accordion track. | high | Replace fixed viewport padding with bounded container-relative spacing and private measures. | implementation |
| Native section is never named and persists without a title. | high | Use title-labelled `section`; otherwise generic `div`; omit when items are absent. | accepted standards / implementation |
| SectionsStudio duplicates canonical Accordion anatomy and behavior. | high | Consume `AccordionArtwork` and contextual item/list classes. | ADR 0082 / implementation |
| Every short answer becomes a region landmark. | medium | Disable automatic regions; keep contextual opt-in in Accordion. | ADR 0099 / implementation |
| Local single/collapsible state appears to be S9 behavior. | medium | Document as fixture-only; leave group policy target-owned. | ADR 0099 |
| Token/type audit is incomplete and contains hardcoded physical spacing. | medium | Reconcile complete semantic typography and existing spacing tokens. | implementation |
| Shopify has no native section or editor mapping. | medium | Add localized block-based native details section with no neutral JS. | target adapter |
| No S9-specific owner visual/reference frame exists. | review risk | Treat the refined visual as a candidate requiring human review. | owner |
| Critical-information and nested-disclosure limits are undocumented. | medium | Add explicit usage and accessibility guidance. | documentation |

## Evidence And Validation

Baseline complete:

- Source/contract/registry/Studio/MDX/Accordion/Shopify inventory audit.
- WAI-ARIA APG, HTML, Open UI, Radix, Polaris, GOV.UK, and Shopify primary-source
  research.
- Exhibit and Studio screenshots at Mobile, Tablet, Desktop, and XL.
- Pointer, Enter, Space, focus, expanded-state, accessible-name/region, optional
  title/subtitle, direct-width, DOM, geometry, gzip, and SHA-256 baseline probes.

Final evidence complete:

- Contract, Studio, docs, Web adapter, Shopify adapter, source-token coverage,
  component/readiness/parity audits, static preview audit, isolated site build,
  and diff-whitespace validations pass.
- Shopify official Liquid validation passes artifact
  `faq-section-s9-batch68`, revision 2, across the section, both schema locales
  and both synchronized CSS assets. The adapter reports S9
  `implemented`, `ready: true`, 64 target-ready components and 34 dedicated
  Liquid templates.
- Exhibit/Studio normalized DOM is exactly equal at `2,647` characters, FNV-1a
  `a22df099`, three focusable native triggers and zero answer regions.
- Four paired viewports and direct `200/260/520/900/1120px` roots are captured
  under `output/playwright/refinement-batch-68/after/`; all checked roots have
  equal client/scroll width and Accordion tracks of
  `168/228/457.59/792/985.59px`.
- Pointer, Enter and Space produce reversible `100 -> 010 -> 001 -> 100`
  state, with synchronized native hidden panels and retained trigger focus.
- Optional title/subtitle, invalid item omission, long Arabic RTL, unbroken
  content, dark/focus, forced colors, reduced motion and a native details target
  specimen pass browser probes. Light primary/secondary contrast is
  `17.93:1` / `7.81:1`; dark is `17.18:1` / `12.09:1`.
- Final gzip is Sections `6,822 B`, Layout `6,900 B`, neutral Web component CSS
  `67,097 B`, and runtime `10,501 B`. Sections remains `39 B` below its
  unchanged ceiling; the Layout/global exceptions remain explicit and S9 adds
  no runtime.
- Canonical/Shopify/Webflow hashes match for Sections
  (`f2f0b90469b42684244fd65d908a76e326c6fb2e96d29e39ee8ee94c5fe645d7`)
  and Layout
  (`c73687eb5cdf8625701c116def1d0ad59f4a37dd1475b3bb5747451acd069e70`).
- Full audit: `docs/reports/faq-section-web-refinement-audit.md`.

## Risks And Open Questions

- Blocking owner decision for `stable`: approve final visual treatment and confirm
  that FAQ Section remains valuable as a distinct contextual profile rather than
  documentation-only Accordion composition.
- Human review should approve the maximum measure, centered intro, title scale,
  density, disclosure border/indicator, and initial docs fixture state.
- No accepted repository evidence defines an exclusive, non-exclusive, or
  exact-one-open product default. This is intentionally target-owned and does not
  block a human-review-ready neutral wrapper.
- Shopify structured data, content source, block limits, analytics, search, and
  group exclusivity remain target-owned follow-up. This pass should not infer
  them.
- Native `details` marker suppression and open-state icon treatment must be
  verified across target browsers and forced colors.
- Layout and global neutral CSS already carry existing program-level budget
  exceptions. This pass must report actual deltas without changing ceilings.

## Readiness Decision

`human-review-ready`. Semantic root behavior, canonical composition, intrinsic
response, contract/docs truth, target-ready Shopify translation, after evidence
and automated validation are reconciled. Human review must approve the visual
candidate, API/product identity and target-owned group/content policies. The
contract stays `pilot`; no automated result promoted it to `stable`.
