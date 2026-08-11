# Component Dossier: Policy Page Template

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify policy-object snippet mapping and
future-target translation

Contract: `components/contracts/policy-page.contract.json`

## Recommendation

Certify Policy Page as one passive, self-contained legal document composition,
not as a CMS, policy generator, revision ledger, localization pipeline, consent
surface, legal-advice system or source API. Require a non-empty visible title
and non-empty semantic body. Use a labelled contextual `article` in Exhibit and
Studio so the documentation site's existing `main` remains the only main
landmark; standalone targets place the article inside their document-level
main and choose heading ranks from the host outline.

Keep the visible update label optional and add an independent optional
`updatedDateTime` string for an exact machine-readable value. Render native
`time[datetime]` only when both are supplied; never parse a localized display
string. Without the machine value, preserve the visible metadata as ordinary
text rather than claiming invalid time semantics.

Keep the table of contents optional. When it exists, require a non-empty
visible `tocTitle`, a labelled native `nav`, an ordered list and canonical Link
composition. Every link must name the same section as its target heading,
resolve to one unique id in the same document and preserve body order. The
target owns table-of-contents generation and synchronization; P3 adds no
observer, active-section state, focus relocation, smooth scrolling or runtime.

Treat the body as one required target-owned semantic slot. Preserve paragraphs,
contextual headings, ordered and unordered lists, emphasis, quotations,
figures, links, tables, code and dates in authored order. Provide an optional
focusable overflow wrapper for genuinely two-dimensional content, but keep
trust, sanitization, parsing, legal text, link policy, media meaning,
localization, revision and publication ownership in the target.

Do not make Rich Text Section a dependency. It is an adjacent bounded section
profile, while P3 is the complete document with its own header, optional date
and table of contents. Compose canonical Link for table-of-contents navigation
and allow target content systems to attach Link presentation to body anchors
where their markup pipeline supports classes.

For Shopify, provide a strict snippet that receives one real Liquid `policy`
object and maps its title and body to canonical P3 anatomy. Shopify's documented
object has no update date or table-of-contents data, and the documented theme
template inventory has no policy template type, so the adapter must omit those
optional regions and must not invent a route, date, index or shared policy-type
inventory.

## Purpose And Limits

- Presents one complete policy or other self-contained legal document with a
  readable title/body hierarchy.
- Supports optional visible update metadata and optional in-document
  navigation when the target can supply truthful, synchronized relationships.
- Owns document composition, readable measure, visual hierarchy, intrinsic
  response, content containment and optional-region placement.
- Canonical Link owns table-of-contents anchor presentation, hover, focus,
  reduced-motion behavior and native navigation semantics.
- The target owns legal content, correctness, source trust, sanitization,
  parsing, revisions, effective dates, localization, policy inventory,
  section identifiers, external-link policy, media, publishing and routes.
- It is not a terms-acceptance control, cookie/consent banner, legal form,
  version history, editor, Markdown/portable-text schema, search surface,
  reading-progress tracker or automatic table-of-contents engine.

## Pre-Refinement Gallery Baseline

- Registry `P3`, category `pages`, no dependencies; contract `0.2.0`, `pilot`;
  nine anatomy parts, five states, two behaviors, five properties and 16 public
  tokens.
- Required title/body values do not gate rendering. The shared renderer can
  leave an empty named `article`, an empty header or a body-less document.
- The renderer outputs update text as `p`, so its fixture cannot expose the
  already-known exact date as a native `time[datetime]` value.
- The optional navigation can render without a title and therefore without an
  accessible name; its fixed links are not composed from canonical Link.
- The body is a generic `div`, but its section headings use `h2` beside the
  contextual P3 `h2`, flattening the documentation page hierarchy.
- The MDX fallback emits a nested `main` inside the docs site's existing main,
  nests a second `article` for the body and includes a no-op `href="#"`.
- CSS removes ordered-list markers, duplicates Link color/hover/focus behavior,
  uses physical properties and hardcoded pixel spacing, and responds to the
  page viewport instead of the component container.
- `pre` and `table` are changed to block scroll containers without a named,
  explicit keyboard-overflow contract. Body styling omits quotations, figures,
  captions, table cells and deeper contextual headings.
- Studio adds independent P3 block/inline padding and a narrow-container
  override, so the same renderer does not have one canonical visual geometry.
- Exhibit and Studio otherwise share `PagesStudio` and the same initial fixture.
- Shopify has only generic `main-page.liquid`; no canonical P3 Liquid mapping
  exists. The adapter is CSS-only and reports Shopify as planned.
- Deterministic baseline is `816 B` gzip for the P3 slice, `2,939 B` for Pages,
  `3,783 B` for Pages + Coming Soon, `67,304 B` for Neutral Web component CSS
  and `10,501 B` for shared neutral runtime. P3 contributes no JavaScript.

Before visual evidence will be stored in
`output/playwright/refinement/policy-page/before/` using one bounded Mobile and
Desktop Exhibit/Studio phase. The browser and server must close immediately
after capture.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML Standard: `article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | `article` represents a complete self-contained composition; one page-wide article can sit inside the document's main content. | Use a contextual article in shared docs and let the standalone target own `main`. |
| [HTML Standard: `nav`](https://html.spec.whatwg.org/multipage/sections.html#the-nav-element) | `nav` represents links to pages or parts within the page. | A supplied table of contents is a named native navigation region, not a menu widget. |
| [HTML Standard: `time`](https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-time-element) | `datetime` holds a valid machine-readable equivalent independently of visible content. | Expose visible update text and exact machine value separately; never parse localized text. |
| [WCAG 2.2: Info and Relationships](https://www.w3.org/WAI/WCAG22/Understanding/info-and-relationships.html), [Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) and [Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | Visible document structure, descriptive headings and link purpose must remain programmatically determinable. | Preserve authored headings/lists/tables and use descriptive index labels matching destination sections. |
| [WCAG 2.2: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Two-dimensional tables may scroll in their own container while surrounding prose must reflow. | Keep prose intrinsic and use a bounded, named keyboard-overflow wrapper only for genuinely wide content. |
| [WCAG 2.2: Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html) | Keyboard-operable links need a visible focus indicator. | Canonical Link owns index focus; content anchors retain visible target styling. |
| [Open UI component research](https://open-ui.org/components/) | Open UI defines no policy-document or table-of-contents widget; its Table research distinguishes passive native tables from interactive grids. | Use ordinary document/navigation/table semantics and add no custom ARIA widget or keyboard model. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) | Composite features preserve accessible leaf elements instead of recreating their behavior. | P3 arranges canonical Link leaves and does not duplicate their states. |
| [Polaris Text](https://polaris-react.shopify.com/components/typography/text) | Visual typography and the semantically correct native element are independent choices. | Keep P3 visual classes element-agnostic and let each host choose contextual heading rank. |
| [USWDS in-page navigation](https://designsystem.digital.gov/components/in-page-navigation/) | In-page navigation suits long, heading-structured pages; labels should match target headings and short pages need no index. | Keep the index optional, descriptive and synchronized rather than a universal default. |
| [Shopify Liquid `policy`](https://shopify.dev/docs/api/liquid/objects/policy) and [`shop.policies`](https://shopify.dev/docs/api/liquid/objects/shop#shop-policies) | Shopify supplies policy title/body/url/id and a platform-owned policy inventory, but no update date or section-index data. | Map title/body from one supplied policy object and omit unsupported optional regions. |
| [Shopify theme templates](https://shopify.dev/docs/storefronts/themes/architecture/templates) | Shopify documents the allowed theme template types and does not expose a policy template type. | Add a reusable policy-object snippet; do not invent `templates/policy.json` or claim control of platform policy routes. |

### WAI-ARIA APG and Open UI scope

WAI-ARIA APG defines interactive widget and landmark patterns but no policy-page
widget. A policy document needs native headings, navigation, links and content,
not `application`, `document`, `menu`, `tablist` or custom key handling. Open UI
likewise offers no interoperable Policy Page anatomy. The absence of a widget
supports HTML-first passive composition; it does not authorize a custom role.

### Mature-system comparison

- HTML, WAI, USWDS and Polaris converge on meaningful native hierarchy with
  visual style independent from heading rank. The current flattened body
  headings and nested-main fallback diverge from that model.
- USWDS has a richer generated, sticky, active-section navigation with runtime.
  The Gallery's narrow v1 keeps target-supplied native links because generation,
  focus relocation and active tracking are not accepted cross-target behavior.
- Radix provides composition guidance rather than a legal-page component. Its
  leaf-ownership model supports canonical Link composition for the index.
- Shopify provides actual policy objects but not revision dates, content-section
  ids or a policy template type. A truthful adapter maps what exists and omits
  what does not.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. All current Studio definitions share those ids. Prior
direct inspection in this refinement program established that they show the
generic Button detail shell and Button controls, not a policy document, date,
table of contents, legal-content hierarchy, responsive state or P3-specific
token. The repository candidate is therefore the visual proposal for human
review; no P3 aesthetic approval is inferred.

## Recommended Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | contextual labelled `article`; hosted by standalone target main | P3 / target | Omitted when title or body is empty. |
| Header | yes | native `header` | P3 | Contains title and optional update metadata. |
| Title | yes | contextual heading with target-unique id | target | Names the article; rank follows the host document. |
| Update metadata | no | `time[datetime]` when exact value exists; otherwise text | target | Visible and machine values are independent. |
| Table of contents | no | labelled native `nav` | P3 / target | Omitted unless title and synchronized items both exist. |
| TOC title | conditional | contextual heading with target-unique id | target | Required to name a supplied TOC. |
| TOC list | conditional | native ordered list | target | Preserves body-section order. |
| TOC link | conditional | canonical Link anchor | Link / target | Fragment resolves to one unique body id. |
| Body | yes | semantic flow container | target | Complete non-empty legal document body. |
| Body section | no | native `section` with contextual heading | target | Section ids are target-owned and stable when linked. |
| Overflow wrapper | no | named focusable region around genuinely wide content | target | Used only when two-dimensional content cannot reflow. |

## Variant, State, Size, And Mode Matrix

- Variant/size: one readable legal-document profile. Measure, rhythm, inset and
  container thresholds remain private composition details.
- Required content: non-empty title and body. Missing either omits the complete
  component instead of leaving an empty article/header.
- Update metadata: absent; visible-only target text; or visible text plus exact
  machine-readable datetime. A machine value alone is ignored.
- Table of contents: absent; or present only with non-empty visible title,
  ordered canonical links and matching unique targets. Broken/empty index
  composition is omitted.
- Body: short, long, localized, RTL, unbroken, list-heavy, quotation/media-rich,
  tabular and code content; authored semantics and order remain intact.
- Links: native resting/visited policy from the target, pointer hover, keyboard
  focus and activation. TOC uses canonical Link states.
- Responsive: readable bounded flow at every component width; TOC inset adapts
  by named component container; no viewport-specific DOM or Studio fork.
- Modes: light, dark, forced colors, reduced motion, keyboard, touch, screen
  reader, user styles, 200% text and 400% zoom. P3 owns no motion.

## Public API And State Ownership

Recommend six semantic properties for contract `0.3.0`:

- `title` - required non-empty visible document title.
- `updatedDate` - optional target-formatted visible update metadata.
- `updatedDateTime` - optional exact machine-readable value used only with
  visible update text.
- `tocTitle` - optional visible index heading, conditionally required when
  `tocItems` exists.
- `tocItems` - optional target-owned ordered canonical Link composition.
- `body` - required non-empty target-owned semantic policy document.

Do not expose policy type, locale, revision/effective-date model, source/CMS,
legal clauses, sanitizer/parser, section-id algorithm, active section,
scroll/focus behavior, heading level, HTML tag allowlist, body blocks, link
target policy, table strategy, measure, alignment, spacing, radius, breakpoint,
sticky position, color scheme or target route.

P3 has no controlled/uncontrolled state. Targets supply immutable document
content or replace it through their publishing lifecycle. Native fragment
navigation remains browser-owned; target-generated indexes own synchronization.

## Token And Value Audit

- Keep page-owned primary/secondary text, surface, subtle/default border,
  focus, heading/body typography, radius and semantic section/element spacing.
- Remove Link transition/color internals from P3's public tokens when canonical
  Link owns the TOC. Body-anchor presentation remains a contextual document
  treatment, not a second Link API.
- Replace physical `width`, `margin`, `padding-left`, `min-height` and viewport
  queries with logical properties, named inline-size containment and existing
  semantic tokens.
- Keep readable measure, section scroll offset, quotation border width and table
  cell inset as private `--_` variables. They are reviewable visual composition,
  not stable consumer decisions.
- Remove arbitrary pixel rhythm and fallback token values. P3 adds no new token,
  transition, animation, asset, icon, listener, observer, timer or runtime.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Neutral Web | Contextual article, target-ranked title/body headings, optional independent date pair, optional named ordered Link index, semantic body and overflow hook. | Implemented, generated, validated and browser-evidenced with zero component runtime. |
| Shopify | Strict snippet receives one real Liquid `policy`, escapes title and renders platform body; date/index omitted because the object lacks them. | Implemented and adapter-ready; no invented policy template or route. |
| Webflow | Source-identical Pages CSS; CMS collection supplies trusted body/date/index relationships. | Implemented CSS projection; content lifecycle remains project-owned. |
| React / Angular | Thin article wrapper over children, optional date pair and target-owned link/section data. | Planned; no parser, CMS or state store. |
| Figma | Approved legal-document frame with optional date/index and semantic body placeholders. | Planned; registered nodes are generic Button evidence. |
| SwiftUI / Compose | Native scrollable document with headings, links and accessibility semantics; platform owns content and routing. | Planned; date/index data remain target-supplied. |

## Responsive And Performance Direction

- Establish a named inline-size container and bound the article to a private
  readable measure with logical section padding.
- Keep prose reflowing; media is intrinsically contained; text tables wrap by
  default; genuinely two-dimensional content uses the explicit overflow part.
- Source order remains header, optional index, body at every size and in RTL.
- P3 owns zero neutral runtime, events, observers, requests, timers, layout
  reads, generated ids, parsing, formatting, active tracking or authored motion.
- Permanent Pages + Coming Soon ceiling remains `5.3 KiB` (`5,427 B`) gzip.
  Final size is `4,099 B`, leaving `1,328 B`; P3 remains inside that family
  room and adds `0 B` neutral runtime.

## Refinement Outcome And Evidence

- Contract `0.3.0` now records the strict required document, independent date
  pair, conditional named table of contents, semantic body, target ownership
  and zero-runtime requirements while remaining `pilot`.
- The shared `PagesStudio` renderer omits invalid title/body compositions,
  emits `time[datetime]` only from the valid pair, conditionally omits an
  incomplete index, uses canonical Link, preserves contextual H2/H3 hierarchy
  and renders the exact same normalized outer HTML in Exhibit and Studio.
- Canonical Pages CSS owns all geometry. It uses logical properties, semantic
  tokens, named container response, complete document-flow coverage and an
  explicit overflow hook; the former Studio-only P3 padding fork is removed.
- Mobile, Tablet, Desktop and XL Exhibit/Studio after evidence plus RTL/long,
  effective 200%, dark, forced-colors and reduced-motion captures are stored in
  `output/playwright/refinement/policy-page/after/`. The paired baseline remains
  in `output/playwright/refinement/policy-page/before/`.
- Direct `200`, `320`, `520` and `1120px` hosts report no component overflow.
  The tested viewport roots are `310/310`, `688/688`, `644/644` and `704/704`
  client/scroll pixels from Mobile through XL.
- The final DOM contains one document-level `main`, one labelled `ARTICLE`, a
  native `TIME` with `datetime="2026-07-12"`, one labelled `NAV`, three ordered
  Link destinations and three uniquely labelled H3 sections. The first index
  Link has a solid `2px` focus outline and resolves to exactly one target.
- Empty title or body omits the complete root. Disabling index items leaves the
  valid article and omits only navigation. Visible-only update text becomes a
  paragraph; machine-only input emits no metadata node.
- Light primary/secondary/index contrast is `17.93:1`, `7.81:1` and `19.22:1`.
  Dark primary/secondary/index contrast is `17.18:1`, `12.09:1` and `8.40:1`.
  Forced colors exposes system boundaries; reduced motion reports `0s` for
  root and Link transitions/animations. Final console inspection has no errors.
- Shopify's reusable snippet maps only one real `policy` object's title/body.
  Adapter validation reports P3 `implemented` and target-ready. Shopify Theme
  Check reports zero P3 offenses; its unrelated global baseline remains four
  errors and 55 warnings.
- Final deterministic gzip is `1,307 B` for the P3 slice, `3,270 B` for Pages,
  `4,099 B` for Pages + Coming Soon, `67,626 B` for Neutral Web component CSS
  and `10,501 B` for shared runtime. P3 changes the family by `+316 B`, Web CSS
  by `+322 B` and shared runtime by `0 B` from the recorded baseline.
- Canonical, Webflow and Shopify Pages CSS are SHA-256-identical at
  `997b194efbab43034d9226f2f7f96802660860eec8f969f3cbff9ead42feb380`.
  ADR 0162 records the accepted implementation boundary; the component remains
  ready for, but not approved by, human stability review.

## Open Decisions And Human Review

- Approve or revise article measure, title/body scale, header divider, update
  metadata tone, TOC surface/inset/numbering, content rhythm, quotation/table/
  code treatment, scroll offset and narrow-container composition.
- Confirm the six-property API and conditional TOC validity rule.
- Confirm that `updatedDateTime` is the correct stable cross-target machine
  value rather than leaving exact date semantics entirely markup-owned.
- Decide the unresolved CMS/revision/effective-date/localization/section-id and
  policy-type ownership questions from ADR 0084; this batch does not answer them.
- Decide whether future generated/sticky/current-section navigation belongs in
  another component or target service after user evidence.
- Supply P3-specific Figma/reference artwork and target legal-content examples.
- Keep contract `pilot`; no automated result promotes stability.
