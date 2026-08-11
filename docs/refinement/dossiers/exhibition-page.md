# Component Dossier: Exhibition Landing Page

Status: `human-review-ready`

Target reviewed: Neutral Web with documented Shopify translation

Contract: `components/contracts/exhibition-page.contract.json`

## Recommendation

Refine Exhibition Landing Page as a passive, heading-labelled exhibition
composition whose source order remains hero, information, featured works and
participating artists. The embedded shared specimen should remain an `article`;
a full target page owns its surrounding `main` landmark and contextual heading
level. Regions with visible headings may use `section`; the untitled information
layout should remain a neutral container instead of receiving a hardcoded,
English-only landmark label.

Keep `title` as the only required value. Preserve optional hero media, label,
target-formatted dates, location, narrative, metadata, works and artists. Add a
truthful no-media hero mode so optional media does not leave inverse text on a
transparent surface. Targets own image sources, intrinsic dimensions, loading,
focal position, alternative-text purpose and machine-readable start/end dates.

Keep works and artists as target-owned slots. Prefer native unordered-list
grouping for repeated passive fixture records, but do not add Product Card,
Artist Card, link or action dependencies while ADR 0080 and `OPEN-QUESTIONS`
leave that ownership unresolved. The component owns page-region placement and
reading order, not record activation, filtering, commerce or a CMS model.

Move responsive authority into canonical container queries and intrinsic Grid.
Remove the viewport breakpoint and docs-only column corrections. Keep hero
height, crop, text measure, information ratio, grid minima, compact artist
record, section rhythm and scrim treatment private until human visual review.
Do not expose columns, ratios, crop, focal position, density, spacing, image
URLs, links or framework callbacks as public properties.

## Purpose And Limits

- Presents one exhibition identity, schedule/location, narrative, metadata,
  featured works and participating artists in a coherent reading sequence.
- Supports an exhibition landing surface embedded in a broader site or mapped
  to a target-owned page template.
- Owns the hero and information shells, optional section placement and source
  order. Targets own content records and any destination or action.
- Does not own Product Card, Artist Card, a gallery/lightbox, ticketing,
  filtering, sorting, commerce, CMS querying, analytics or page routing.
- Has no neutral controlled/uncontrolled state, listener, observer, timer,
  request, animation loop or component JavaScript.
- A target page supplies its outer `main`, heading level, localized section
  copy and URL/CMS/editor integration.

## Current Gallery Baseline

- Registry identity `F7`, category `storytelling`, no dependencies; contract
  `0.1.0`, `pilot`; 26 anatomy parts, one variant/size, two states, two
  behaviors, nine properties and 22 declared public tokens.
- ADR 0080 explicitly keeps featured works and participating artists
  target-owned and does not decide Product Card, Artist Card, link or other
  record ownership. The matching open question remains unresolved.
- The shared renderer uses a labelled `article`, hero `header`, untitled
  information `section` with a hardcoded English `aria-label`, semantic `dl`,
  passive figures and a native artist list. It contains zero focusable
  descendants.
- Exhibit and Studio use one renderer and fixture. Exact initial `outerHTML`
  parity passes at Mobile, Tablet, Desktop and XL.
- Baseline candidate measurements show no horizontal overflow: `310px` wide at
  Mobile, `688px` at Tablet, `372px` in the Desktop Exhibit shell and `536px`
  in the XL Exhibit shell. Height ranges from approximately `1,914px` to
  `3,024px` depending on available preview width.
- Canonical CSS uses a `60vh` hero and a `767px` viewport query. A narrow
  embedded candidate in a wide viewport therefore keeps the two-column
  information layout even when its own width is only `372px`.
- The optional hero-media contract is incomplete visually: without media the
  overlay disappears but hero text remains inverse on a transparent surface.
- Typography omits several accepted family, weight and line-height tokens.
  Physical margins, hardcoded spacing, opacity and the unused `--_accent`
  private variable obscure ownership.
- Works record presentation and artist columns are repaired in site-only CSS,
  so the canonical component is not the sole responsive authority.
- The MDX fallback uses manual list roles where native lists are available and
  transparent images with invented meaningful alternative text.
- Shopify receives copied CSS and a generated `planned` manifest entry. There
  is no accepted exhibition Liquid template, merchant schema, record model or
  mapping for work/artist slots.
- The registered Figma frame and inspector contain the generic Button Studio
  pilot only. No Exhibition Page artwork, responsive state or target mapping is
  present.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML sections](https://html.spec.whatwg.org/multipage/sections.html) and [grouping content](https://html.spec.whatwg.org/multipage/grouping-content.html) | `article` represents self-contained content; `section` needs a thematic identity; `ul`, `dl`, `figure` and `time` provide native grouping semantics. | Keep a labelled embedded article, visible-heading sections, native repeated lists and name-value metadata; avoid an unnamed/hardcoded localized landmark. |
| [WAI image alt decision tree](https://www.w3.org/WAI/tutorials/images/decision-tree/) | Informative images need a concise equivalent; decorative or nearby-redundant images use empty alt. | Targets decide alt by image purpose. Repository artist fixtures must not claim fictional identities. |
| [WCAG reflow](https://www.w3.org/WAI/WCAG21/Understanding/reflow) | Content should reflow at a narrow equivalent width without page-level two-dimensional scrolling except for genuine exceptions. | Component-width behavior must not depend on a wide page viewport; text and grids must remain inside the candidate. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Mature systems do not converge on one Card anatomy or interaction model. | Do not infer Product Card, Artist Card or whole-record activation from the visual grouping. |
| [Radix Themes Grid](https://www.radix-ui.com/themes/docs/components/grid) | Grid is a layout primitive with responsive columns/gaps rather than a page-content semantic contract. | Use intrinsic CSS Grid for placement while retaining native HTML semantics and Gallery-owned API. |
| [Polaris Layout](https://polaris-react.shopify.com/components/layout-and-structure/layout) and [Polaris layout guidance](https://polaris-react.shopify.com/design/layout) | Mature page layouts separate primary/secondary information, use proximity to express relationships and adapt structure to available space. | Preserve the narrative/metadata hierarchy and spacing relationships without importing Polaris components or admin styling. |
| [Shopify theme architecture](https://shopify.dev/docs/storefronts/themes/architecture), [sections](https://shopify.dev/docs/storefronts/themes/architecture/sections) and [blocks](https://shopify.dev/docs/storefronts/themes/architecture/blocks) | Templates organize sections; sections and blocks expose merchant-editable modular content; snippets reuse markup. | A future adapter likely needs a JSON template plus one or more sections/blocks, but exact record/editor ownership requires an accepted target design. |
| [Shopify theme performance](https://shopify.dev/docs/storefronts/themes/best-practices/performance/index) and [`image_tag`](https://shopify.dev/docs/api/liquid/filters/image_tag) | Themes should prefer HTML/CSS, minimize JavaScript and generate responsive intrinsic image markup; above-fold media should not be lazily loaded. | Keep zero neutral runtime. A future Liquid adapter owns hero priority, responsive widths/sizes and below-fold loading. |

### Mature-system comparison

- HTML supplies the durable page/article, heading, list, description-list,
  figure and time semantics. No WAI-ARIA APG widget pattern applies because the
  neutral candidate has no composite interaction.
- Open UI does not establish a universal Card record or activation contract.
- Radix and Polaris treat grids, stacks, page wrappers and cards as separable
  layout/composition concerns rather than one exhibition-specific API.
- Shopify requires explicit template, section/block, schema and data decisions;
  it does not provide a universal exhibition or artist/work data model.
- No source supports a viewport-owned component breakpoint, generic clickable
  containers, framework state in the neutral core, automatic Product/Artist
  Card dependencies or public controls for every internal visual value.

### Owner reference analysis

Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
and inspector `1020:480`. Read-only inspection finds `02 / Component Detail -
Studio`, the central artwork shell, Button-oriented Content/Presentation/Layout/
Appearance controls and no node whose name contains `Exhibition`. The reference
supplies Studio-shell evidence only, not Exhibition Page visual approval.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | embedded `article.exhibition-page` | Exhibition Page | Labelled by the contextual exhibition title; target page owns outer `main`. |
| Hero | yes | `header.exhibition-hero` | Exhibition Page | Default no-media surface; explicit media modifier when media exists. |
| Hero media | no | target media wrapper | target | Image/video/picture details and alt purpose are target-owned. |
| Hero overlay | conditional | decorative element | Exhibition Page | Present only with media; private contrast treatment. |
| Hero content | yes | ordered text group | Exhibition Page | Label, title, dates, location; robust wrapping. |
| Label | no | text | target | Short editorial classification; omitted when empty. |
| Title | yes | contextual heading | target | Heading level follows containing page; one exhibition identity heading. |
| Dates | no | target-formatted text / `time` descendants | target | Machine-readable start/end values require structured target data. |
| Location | no | text | target | Omitted when empty. |
| Information | no | neutral layout container | Exhibition Page | Not an unnamed or hardcoded-English landmark. |
| Description | no | rich-content slot | target | Logical reading order precedes metadata. |
| Metadata | no | `dl` | target | Repeated `dt`/`dd` pairs; omitted when empty. |
| Works | no | visible-heading `section` | Exhibition Page / target | Heading and records are supplied by the slot. |
| Works list/grid | no | preferably native `ul` with target-owned items | target | No Card, commerce, activation or lightbox inference. |
| Artists | no | visible-heading `section` | Exhibition Page / target | Heading and records are supplied by the slot. |
| Artist list | no | native `ul` with `li` records | target | Passive fixture; target owns any record destination/control. |
| Compact artist record | no | passive content inside `li` | target | Avatar, name and role remain optional; not a formal Artist Card dependency. |

## Variant, Size, State, And Mode Matrix

- Variant and size: default only; width follows the containing layout.
- Hero: media present/absent; informative/decorative target media; short/long
  label, title, dates and location.
- Information: description only, details only, both, neither; short/long rich
  content and zero/many metadata pairs.
- Works/artists: region absent, empty omitted by target, one item, many items,
  short/long/localized/unbroken records; passive or target-native interaction.
- Themes/preferences: light, dark, forced colors and reduced motion. The neutral
  candidate has no authored motion.
- Responsive: isolated narrow/medium/wide containers plus Mobile, Tablet,
  Desktop and XL docs shells. Source order never changes.
- Unsupported in neutral core: loading/skeleton, filtering, selected state,
  pagination, lightbox, purchase, ticketing, controlled/uncontrolled record
  state, destination/action/event and CMS synchronization.

## Public API And State Ownership

Keep the nine semantic properties:

- `heroMedia` — optional target media slot.
- `label` — optional exhibition label string.
- `title` — required exhibition title string.
- `dates` — optional target-formatted date text; structured machine values stay
  target-owned until a cross-target date contract is accepted.
- `location` — optional location string.
- `description` — optional rich-content slot.
- `details` — optional semantic metadata slot.
- `works` — optional heading plus target-owned work records.
- `artists` — optional heading plus target-owned artist records.

Do not add `href`, `onActivate`, `productCards`, `artistCards`, `columns`,
`density`, `height`, `ratio`, `crop`, `focalPoint`, `overlayOpacity`, `imageUrl`,
`imageAlt`, `loading`, `filters`, `selected`, `pagination`, CMS records or
framework callbacks. The neutral component has no controlled/uncontrolled
strategy. Targets own record lifecycles and native interaction.

## Token And Value Audit

- Replace Button color leakage with semantic inverse hero text; Button tokens
  do not belong to a passive page composition.
- Complete heading, article, body, small and caption family/weight/line-height
  usage with existing public tokens.
- Canonical spacing should use layout container, section, element and grid
  tokens; repeated micro-rhythm may use private token-derived calculations.
- Hero scrim color, min/max and narrow-container height bounds, text measure,
  information threshold/ratio, record minimum track and compact-avatar size are
  private compositional
  candidates. Audit and document them; do not automatically publish them.
- The repository has a semantic scrim opacity but no accepted scrim color.
  A private black media scrim is permissible for contrast until token
  architecture accepts a cross-component color role.
- Remove unused `--_accent`, viewport breakpoint, docs-only canonical layout
  repairs and public focus/Button tokens unused by the page itself.

## Visual And Content Audit

- Verify media crop and focal safety, no-media identity, title measure, hero
  contrast, narrative/metadata hierarchy, grid fill and compact artist rhythm.
- Optional parts must disappear without empty wrappers or inverse-text failure.
- Long titles, dates, locations, descriptions, metadata and records must wrap
  without expanding the component or page.
- Hero media can be visually dominant, but metadata and works/artists remain
  legible at narrow zoom-equivalent widths.
- Target-owned record fixtures must not be presented as component defaults or
  proof of Product/Artist Card composition.

## Accessibility And Interaction

- The embedded article is labelled by the exhibition title. A target page maps
  the title to its contextual page heading and owns the outer main landmark.
- Use sections only when a visible heading or localized accessible name exists.
- Use native `dl`, `ul`, `li`, `figure`, `figcaption` and `time` where content
  structure warrants them; do not duplicate native semantics with manual roles.
- Image alternative text depends on purpose. Informative hero/work media needs
  concise descriptions; decorative/redundant fixture portraits use empty alt.
- Passive works and artist records introduce no focus stops. A target that adds
  links or controls owns native markup, names, keyboard behavior and visible
  focus without nested conflicting activation.
- Source order remains hero, information, works, artists at every width and in
  RTL. No visual reordering may alter reading or focus order.

## Responsive And Performance

- Use `container-type: inline-size` on the page composition. Information and
  compact-artist layout respond to the candidate, not the browser viewport.
- Featured works use intrinsic Grid with bounded minimum tracks; source order
  remains unchanged as tracks wrap.
- Hero media supplies `object-fit: cover`; targets provide intrinsic dimensions,
  responsive candidates and focal policy.
- Neutral DOM and CSS add `0 B` runtime, no layout reads, listeners, observers,
  requests or timers.
- Family budget remains Storytelling CSS `4.2 KiB` gzip; global neutral
  components CSS remains `64 KiB`; shared runtime remains `8 KiB` with the
  existing documented exception. Overages must remain explicit.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Labelled article, header/no-media surface, semantic metadata and optional visible-heading work/artist regions; container-responsive CSS. | Source exists but requires contract/CSS/renderer/docs reconciliation and generated-adapter validation. |
| Shopify | JSON page template plus merchant-editable section/block composition, responsive `image_tag`, rich text/metadata and accepted work/artist sources. | CSS-ready only; template, schema, data, dynamic sources, editor behavior and record ownership remain planned. |
| React / Angular | Contextual semantic wrapper and children/slots; target owns heading level, structured dates, records and native links/actions. | Planned; no framework state belongs in the base contract. |
| Figma | Media/no-media, content combinations, narrow/medium/wide containers, long/localized/RTL content and target-owned record-slot annotation. | Planned; registered reference is unrelated Button Studio artwork. |
| SwiftUI / Compose | Passive semantic group with target-owned image/date/record models and navigation containers. | Conceptual; data loading, routing and interaction remain target-owned. |

## Exhibit And Studio Parity

- Keep one `StorytellingStudio` renderer, one fixture and exact initial
  `outerHTML` for Exhibit and Studio.
- Use truthful hero/work media descriptions and decorative artist fixture
  portraits; do not claim fictional identities from repository photography.
- Studio exposes the nine semantic values/slots and token presentation only.
  It must not expose internal columns, hero height, crop, scrim or spacing as
  semantic properties.
- Remove site-only layout/typography fixes after canonical CSS owns responsive
  authority. Site-only fixture imagery and frame padding may remain.
- Align the MDX fallback with native semantics, omission and no-media behavior;
  it remains a fallback, not a competing implementation.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| Narrow embedded candidates keep wide layout in wide viewports. | high | Replace viewport breakpoint with component-width container behavior. | implementable now |
| Optional hero media leaves no valid no-media visual state. | high | Add explicit media modifier and semantic no-media surface/text. | implementable now |
| Information region has a hardcoded English accessible label. | high | Use a neutral container unless a target supplies a localized visible/name label. | implementable now |
| CSS leaks Button tokens and incomplete type ownership. | medium | Use inverse/text/type semantic tokens and remove unused focus/Button exposure. | implementable now |
| MDX uses manual list roles and false transparent-image descriptions. | medium | Use native lists and truthful decorative/informative preview media. | implementable now |
| Canonical/site responsive authorities conflict. | medium | Move layout to canonical CSS; keep only fixture presentation in site CSS. | implementable now |
| Product Card/Artist Card and activation ownership is unresolved. | product/architecture boundary | Keep slots passive and dependency-free; request explicit owner decision separately. | owner |
| Shopify has no exhibition/artist/work editor model. | target boundary | Validate generated CSS and document future template/section/block mapping without inventing schema. | owner / target |
| Figma contains no Exhibition Page evidence. | human review | Use repository before/after evidence and request explicit visual approval. | owner |

## Refinement Result

- Contract `0.2.0` remains `pilot`: 27 anatomy parts, one variant/size, two
  hero states, five behaviors, nine semantic properties and 33 public tokens.
- The shared root is a labelled article with explicit media/no-media hero,
  neutral untitled information, semantic metadata, visible-heading work/artist
  sections and native repeated lists.
- Fictional artist fixture media is decorative; hero/work fixture media has
  truthful descriptive alt. Optional regions are removed rather than hidden.
- Container queries and intrinsic one/two/three-track grids replace viewport
  logic and docs-only responsive authority. The site keeps only frame and
  target-owned fixture presentation.
- Complete typography, logical layout, robust wrapping, semantic color roles,
  forced-color treatment and zero authored motion/runtime are canonical.
- Product Card, Artist Card, links, lightbox, commerce, CMS records, target
  events and structured dates/media remain explicit target/architecture work.
- Web and Shopify receive generated source-aligned CSS. Shopify stays honestly
  `css-ready`; no Liquid page or record/editor model was invented.

## Evidence And Validation

- Eight before and eight final captures cover Exhibit/Studio at Mobile,
  Tablet, Desktop and XL; exact initial `outerHTML` parity holds at all four.
- Candidates have equal client/scroll widths, zero focusables, one labelled
  article, two visible-heading sections, two lists and one description list.
- Media-off and minimal optional-content modes remove every absent wrapper and
  retain readable statement-surface hero content.
- Isolated `260/320/520/900px` hosts resolve `1/1/2/3` record tracks with no
  overflow and unchanged source order. The `900px` information layout is `2:1`.
- Long Arabic/unbroken RTL content remains within `320px` with no overflowing
  descendant; work fixture captions and prices wrap independently.
- No-media hero contrast is `16.89:1` light and `7.00:1` dark. Primary/
  secondary text passes in both themes; worst-case media-scrim text is `5.74:1`.
- Forced colors uses Canvas/CanvasText with a system boundary. Reduced motion
  has zero animations and `0s` transitions.
- Storytelling CSS is `4,752 B` gzip, a `451 B` exception against `4.2 KiB`.
  Neutral components CSS is `66,702 B`, a `1,166 B` gap against `64 KiB`.
  Shared runtime remains `10,492 B`; Exhibition Page adds `0 B` runtime.
- Contract, Studio, registry/docs, tokens, Web/Shopify adapters, copied CSS,
  official Shopify validation, structural/static/parity/refinement audits,
  temporary site build outside `site/dist`, diff checks and console pass.
- `site/dist` remains untouched.

## Risks And Open Questions

- Human visual approval: hero min/max/container-relative height, crop, scrim,
  title measure, no-media surface, information ratio, section rhythm, record
  track minimum and compact artist record.
- Owner/product/architecture: whether works/artists formally compose Product
  Card and Artist Card, remain target-owned, or support more than one mode.
- Target: Shopify exhibition record, page template, section/block schema,
  dynamic source, artist/work model, routes and responsive-media ownership.
- Architecture: structured cross-target date ranges and reusable responsive
  media/focal-point contracts remain absent; do not encode Web-only APIs now.

## Readiness Decision

Ready for human stability review, but not approved and not `stable`. The passive
composition, media modes, semantic grouping, optional content, responsive
containment, accessibility preferences, cross-target translation, performance
and Exhibit/Studio parity are technically reconciled. Human review must approve
the visual candidate and decide record dependencies plus Shopify data/editor
architecture. The contract remains `pilot` until that explicit review.
