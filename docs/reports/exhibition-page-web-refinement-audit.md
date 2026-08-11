# Exhibition Page Web Refinement Audit

Status: ready for human review; remains `pilot`

Date: 2026-07-14

Component: Exhibition Landing Page (`F7`)

## Outcome

Exhibition Page is reconciled as a passive, heading-labelled exhibition
composition with a valid media/no-media hero, neutral information layout,
semantic metadata and repeated lists, intrinsic component-width grids,
target-owned work/artist records and zero neutral runtime. Contract, registry,
canonical CSS, MDX, shared Exhibit/Studio renderer, Studio metadata, generated
Web/Shopify outputs, dossier, ADR and browser evidence agree.

The component is `human-review-ready` but remains `pilot`. Human review must
approve the visual candidate and decide whether Product Card and Artist Card
formally own the record slots. Shopify exhibition/work/artist data, template,
section/block, editor and route architecture also remains explicit target work.

## Research And Decision

- Native HTML supplies the durable article, header, visible-heading sections,
  description list, unordered lists, figures and time semantics. The passive
  candidate requires no WAI-ARIA APG widget pattern.
- WAI image guidance makes alt text contextual. Repository artist photography
  cannot truthfully identify fictional fixture artists and is therefore
  decorative; actual targets own image purpose.
- WCAG reflow supports adapting to narrow equivalent width without page-level
  horizontal scrolling. Component layout cannot depend on a wide page viewport.
- Open UI does not converge on universal Card anatomy. Radix and Polaris keep
  page layout, grid, grouping and content semantics separable.
- Shopify templates, sections/blocks, dynamic sources and responsive images
  require explicit merchant and data architecture; no universal exhibition
  record is inferred.
- Direct Figma inspection of file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
  and inspector `1020:480` found only the generic Button Studio prototype and
  no Exhibition Page artwork or state evidence.

ADR 0130 records the safe boundary: labelled passive composition, explicit
media state, neutral untitled information, native grouping, container-responsive
layout, target-owned records/data and zero neutral runtime.

## Contract And Implementation Result

- Contract `0.2.0` remains `pilot`: 27 anatomy parts, one variant/size, two hero
  states, five behaviors, nine semantic properties and 33 public tokens.
- The shared root is an `article` labelled by its contextual exhibition title.
  A target page owns its surrounding `main` and page-heading level.
- The default no-media hero uses statement surface plus primary text. Media
  applies `.exhibition-hero--with-media`, target media, a decorative `0.6`
  scrim and inverse text. Optional media can disappear without illegibility.
- The untitled information layout is a neutral `div`; the hardcoded English
  `aria-label` and unnecessary landmark are removed. Metadata remains native
  `dl`/`dt`/`dd`.
- Works and artists are visible-heading sections. Repeated passive fixtures use
  native lists, with figures for works and compact list items for artists.
- Fictional artist fixture media uses empty alt. Hero and work fixture media
  retain truthful informative descriptions.
- Works and artist slots remain target-owned. No Product Card, Artist Card,
  link, action, lightbox, filter, commerce or framework event is inferred.
- Root container queries and intrinsic Grid replace the viewport breakpoint
  and docs-only columns. Information uses a private `44rem` threshold; record
  grids use private `11rem` minima.
- Complete typography, logical padding, robust wrapping, semantic text/surface/
  border roles, full-radius artist media and scrim opacity replace incomplete
  typography, hardcoded physical spacing and Button/focus token leakage.
- Hero bounds, container caps, title measure, scrim color, information ratio,
  track minima, avatar size and micro-rhythm remain private and unexposed.
- Studio exposes nine semantic controls and eight token controls. It does not
  expose columns, hero geometry, crop, scrim, media URL or target events.
- Neutral Web embeds the source CSS once. Shopify's Storytelling copy is
  byte-identical and remains `css-ready`, `ready: false`.

## Browser Evidence

### Parity, Semantics And Responsive Layout

- Mobile (`390x844`), Tablet (`768x1024`), Desktop (`1280x1000`) and XL
  (`1600x1080`) produce exact initial Exhibit/Studio `outerHTML` parity.
- Candidate widths are `310`, `688`, `372/484` and `536/704px` depending on
  docs shell. Every candidate has equal client/scroll width and zero neutral
  focusable descendants.
- The shared outline is one labelled `ARTICLE`, two visible-heading sections,
  two native lists with six list items and one description list. Headings are
  one contextual `H2` plus two `H3` region headings.
- Source order is hero, information, works, artists at every shell. No visual
  rule reorders the DOM.
- Mobile/Tablet/Desktop Exhibit record grids resolve `1/2/1` tracks from their
  actual candidate width; XL resolves two. The Studio shell independently
  resolves `1/2/1/2`, demonstrating container rather than viewport authority.
- All fixture artist images are exactly `56x56px` after removing the former
  docs-only size repair.

### Optional Content And Media Modes

- Disabling hero media removes media, overlay and the media modifier. The hero
  resolves to `rgb(255 247 237)` with `rgb(23 23 23)` text, no overflow and no
  focus stop.
- Disabling description, details, works and artists leaves only the required
  hero/title: no information wrapper, section, list, media or empty record node
  remains.
- Informative hero/work fixture images remain exposed with descriptive alt.
  Three fictional artist images disappear from the accessibility tree through
  empty alt.

### Isolated Containers, Reflow And Extreme Content

- Isolated canonical `260/320/520/900px` hosts have equal client/scroll widths,
  preserve source order and resolve work/artist grids to `1/1/2/3` tracks.
- Information stays one column through `520px` and becomes `2:1` at `900px`.
- Hero height remains content-safe: private bounds/caps can expand for wrapped
  content rather than clipping target strings.
- A `320px` RTL fixture with long Arabic text, repeated unbroken narrative,
  metadata, work captions/prices and artist values has `320px` client/scroll
  width, no overflowing descendant and unchanged source order.
- Site-owned work captions now give both target-owned fixture fields a
  shrinkable, anywhere-wrapping boundary; no canonical record anatomy was
  invented to repair the fixture.

### Contrast And Preferences

- No-media hero contrast is `16.89:1` in light and `7.00:1` in dark.
- Primary/secondary text on the primary surface is `17.93:1 / 7.81:1` in light
  and `17.18:1 / 12.09:1` in dark.
- A `0.6` black scrim produces a theoretical worst-case `5.74:1` for white text
  over an otherwise white image; the actual fixture remains visibly stronger.
- Forced colors removes the image scrim, presents Canvas/CanvasText content and
  gives the hero a `1px` system-color boundary.
- Reduced motion reports zero subtree animations and `0s` hero/media
  transitions. Exhibition Page authors no motion or runtime.
- Eight before images, eight final viewport images and special no-media,
  minimal, isolated-container, RTL, dark and forced-color evidence live under
  `output/playwright/refinement-batch-45/`.
- The final component console reports zero errors and zero warnings.

## Cross-Target Result

| Target | Mapping | Result |
| --- | --- | --- |
| Web | Labelled article, media/no-media hero, semantic metadata/lists and container-responsive passive regions. | Implemented, generated and validated; no component runtime. |
| Shopify | Exact canonical CSS; future JSON page template, sections/blocks, `image_tag`, rich text and accepted work/artist sources. | `css-ready`, `ready: false`; Liquid, schema, data, dynamic sources, routes and editor behavior intentionally planned. Official CSS validation passes. |
| Webflow | Canonical target-agnostic CSS with target-authored semantic content records. | Generated path remains available; record/data mapping is target-owned. |
| React / Angular | Contextual semantic wrapper and slots; target owns heading rank, structured dates, records and native links/actions. | Planned; no framework state/callback belongs in the base contract. |
| Figma | Media/no-media, content combinations, container widths, localized extremes and explicit target-owned record-slot annotations. | Planned; registered reference is unrelated Button artwork. |
| SwiftUI / Compose | Passive semantic group with target-owned media/date/record/navigation models. | Conceptual; loading, data and routing remain target-owned. |

## Performance And Risks

- Storytelling CSS is `4,752 B / 4.2 KiB`, a `451 B` exception and `+168 B`
  from Batch 44.
- Complete neutral Web component CSS is `66,702 B / 64 KiB`, a `1,166 B`
  program gap and `+233 B` from Batch 44.
- Shared runtime remains `10,492 B / 8 KiB`, the existing `2,300 B` exception.
  Exhibition Page adds `0 B` runtime, listener, observer, timer or request.
- Human review must approve hero bounds/crop/scrim/title measure, no-media
  surface, information ratio/rhythm, record grid density and compact artist
  treatment.
- Owner/product/architecture must decide Product Card and Artist Card
  composition plus any record activation, lightbox or commerce ownership.
- Shopify remains a documented gap until page template, record sources, editor
  schema/dynamic sources, routes and responsive-media policy are accepted.

All ceilings remain unchanged. The Storytelling/global/runtime overages are
explicit program gaps rather than silently raised budgets.

## Validation

Registry/docs, source tokens, 183 contracts, 183 Studio definitions, neutral
Web, Shopify and copied CSS, official Shopify CSS validation, structural/static/
parity/refinement audits, exact four-viewport DOM parity, semantic/optional/
no-media probes, isolated containers, narrow reflow, localized RTL extremes,
light/dark contrast, forced colors, reduced motion, deterministic gzip,
source/generated identity, temporary site build outside `site/dist`, diff
checks, final console inspection and explicit `site/dist` cleanliness comprise
Batch 45.

`site/dist` was not rebuilt or modified.

## Remaining Human Review

- Approve or revise hero geometry, crop, scrim, title measure and no-media
  statement-surface direction.
- Approve or revise information ratio/threshold, section inset/rhythm, record
  track minimum and compact artist image/name/role treatment.
- Decide whether works/artists formally compose Product Card/Artist Card,
  remain arbitrary target slots or support multiple target-specific modes.
- Define Shopify exhibition/work/artist records, JSON template, sections/
  blocks, schema/dynamic sources, routes, image widths/focal policy and editor
  behavior before dedicated Liquid.
- Decide whether structured cross-target date ranges and responsive media/focal
  contracts should be separate later architecture work.
- Confirm that internal geometry, crop, columns, thresholds, density, record
  anatomy, destinations, actions, events, image URLs and CMS data remain outside
  the v1 neutral API.
- Do not promote the contract to `stable` without explicit human approval.
