# Component Dossier: Workshop Listing

Status: `human-review-ready`

Date: 2026-07-18

Registry: `R7` / `workshop-listing`

Dependency order: 132, phase 6 (Composed components), depth 1 before refinement

## Recommendation

Keep Workshop Listing as a target-authored collection of independently complete
workshop summaries. Render the collection as a native unnumbered list and each
record as a list item containing a self-contained `article` named by its visible
contextual heading. Compose the canonical Card for the surface/anatomy, Price
for optional target-formatted commerce content, Badge for optional static
availability, and Button rendered as an anchor for an optional details
destination.

Do not define a universal workshop, event, capacity or booking schema. Title is
the only required content inside each target-owned record; schedule, media,
level/format, description, price, availability and destination are independently
optional only when their omission remains truthful. Incomplete records omit,
and no valid records omit the complete list. A host may compose Empty State,
filters, pagination, authentication or a booking flow outside R7.

Treat schedule text, machine-readable date/time, currency, availability and
destination as target-owned facts. Use `time[datetime]` only when the target has
a valid machine-readable value corresponding to the visible localized text.
Price must consume canonical Price rather than recreate currency markup.
Availability must consume passive canonical Badge and remain complete visible
text; it is not a live region by default.

“View workshop” is navigation and must be a native anchor styled by canonical
Button. A full workshop may still have useful details, waitlist, cancellation or
future-session information, so the full status must not automatically disable
that destination. Booking, registration, reservation, payment, cancellation,
authentication, inventory locking, error handling and confirmation remain
target workflows, not R7 behavior.

Keep the public semantic API to required non-empty `workshops` composition.
Do not expose columns, card minimum width, media ratio/crop, padding, elevation,
heading rank, locale, currency, capacity threshold or availability polling as
R7 properties. R7 remains `pilot`; do not promote it to `stable` without
explicit human review.

## Current Gallery Result

- `WorkshopListingArtwork` and `buildWorkshopListingFixture` are the single
  registered Exhibit/Studio implementation and sample-data path. The MDX
  fallback is structurally aligned without becoming a second runtime renderer.
- The root now fails closed and renders native
  `ul > li > article[aria-labelledby]` anatomy for valid unique records. Visible
  contextual headings name each article; schedules use `time[datetime]` only
  when the fixture has matching machine-readable data.
- Every card composes canonical Card media/body/footer, Price with `bdi`,
  passive Badge and Button styling on a native details anchor. The Full card
  keeps its details link enabled, focusable and Enter-activatable.
- R7-specific CSS owns only reset, intrinsic grid/media response, editorial
  hierarchy and footer arrangement. Card surface/hover/motion, Price, Badge and
  Button behavior remain canonical dependencies; Studio-specific R7 layout and
  breakpoint overrides are gone.
- A private schedule-color mix preserves the orange editorial cue while raising
  measured small-text contrast from the baseline `3.56:1` to `4.94:1` in light
  mode and `9.21:1` in dark mode. The minimum measured final dependency/text
  combination is `4.58:1`.
- Final evidence covers eight paired natural captures, one/empty/media-absent,
  Limited/Full, keyboard activation, `180/320/520/720px` direct roots, localized
  content, `220px` RTL/extreme strings, effective 200% text, user spacing, dark,
  reduced motion, forced colors and zero visible/root/document overflow.
- At one normalized `720px` host, Exhibit and Studio have identical DOM hash
  `f3132ac0`, style hash `55a8c8b2`, two `348px` cards and zero overflow.
- The R7 CSS slice remains byte-identical to Batch 116 at `2,339 B` raw /
  `729 B` gzip, SHA-256
  `382fb6c7374ce2e69182d93c7e969b9b13e47b1c3dca5da1b9759689499d2fd5`.
  Current Ceramics CSS is `36,881 B` raw / `5,345 B` gzip, retaining `82 B`
  below its fixed `5,427 B` family ceiling. R7 adds zero neutral JavaScript.
- Web, Webflow and Shopify CSS projections validate. No workshop Liquid,
  schema, resource model, booking workflow or target adapter was invented.
- ADR 0207 plus owner decision 61 record the accepted neutral composition and
  discovery-only workflow boundary. Record/domain, recurrence/time-zone/
  localization, money/capacity freshness, separate booking flow, Shopify,
  final visual/Figma and explicit stability approval remain production/human
  gates; R7 is ready for that review and stays `pilot`.

## Purpose And Limits

- Presents an ordered or editorially ranked collection of workshop/class
  summaries for discovery.
- Keeps each record independently understandable with a visible title and any
  target-owned schedule, format, description, price and availability.
- May offer one target-owned details destination or another canonical action
  whose semantics are defined by the target.
- Does not define the workshop record source, recurrence model, time zone,
  location, instructor, age/access requirements, materials, language, capacity,
  waitlist, price/tax/refund policy or enrollment eligibility.
- Does not reserve capacity, create a booking, collect payment, authenticate,
  validate prerequisites, manage a cart or confirm attendance.
- Does not own sorting, filtering, pagination, search, empty results, loading,
  errors, stale data, polling or live updates.
- Does not make the whole card clickable when a card contains its own link or
  future nested actions.
- Does not expose layout density, grid tracks, media crop, surface, border,
  elevation or status color as business API.

## Accepted Source Facts

- The repository is the source of truth; Figma remains a target/evidence source.
- ADR 0083 accepts complete Workshop Listing card anatomy, textual availability
  hooks and optional Button composition while leaving booking ownership open.
- Owner decision 61 accepts discovery-only summaries, real Link navigation to a
  separately certified registration flow, target-owned event/money/capacity
  truth, optional canonical Price/Badge and useful details navigation even when
  a workshop is full.
- At research start, the `0.2.0` pilot contract exposed one required
  `workshops` slot and listed only Button as a dependency.
- Card, Price, Badge and Button already have canonical contracts and web
  implementations. The component-composition principle requires R7 to consume
  them rather than duplicate their surface, currency, status or action markup.
- Exhibit and Studio already resolve the registered Ceramics Studio renderer at
  runtime, while the MDX `<Preview>` is static fallback/audit source. R7 still
  needs one isolated renderer and fixture so its anatomy is not duplicated
  inline inside the family renderer.
- All 183 Studio metadata files reference the same generic Figma frame and
  inspector nodes (`943:7`, `1020:480`); those nodes are not R7-specific visual
  approval.

## Baseline Implementation Audit

### Contract, DOM And Runtime

- The root is a labelled `section` with direct `article` children rather than a
  native list. Its hardcoded “Studio workshops” label is docs copy, not a
  target-owned public property or visible heading.
- Cards are self-contained enough for `article`, but neither runtime nor static
  fallback explicitly associates each article with its heading.
- Studio renders two nearly identical cards inline in `CeramicsStudio`; the MDX
  fallback uses a separate one-card fixture and different date/title/price.
- Studio schedule is a plain `div`; the fallback uses `time`. The runtime loses
  the machine-readable date relationship.
- Studio uses a native `button` for “View details” but defines no click behavior.
  In the full state it disables that no-op button even though viewing details is
  navigation that may remain valid.
- Price is a plain span and availability is a locally styled span despite
  canonical Price and Badge implementations.
- R7 has no neutral listener, observer, timer, request or script. That zero-
  runtime listing boundary is correct. Controlled/uncontrolled is not
  applicable to passive records; booking state belongs to its target workflow.

### CSS And Tokens

- R7 duplicates canonical Card border, radius, clipping, hover shadow,
  transition and reduced-motion treatment instead of composing Card.
- It hardcodes `300px`, `200px`, `16px`, `12px`, `8px`, `6px`, `4px`, weight
  `600`, type multipliers and physical width/height/margin/padding/text
  properties.
- Root list defaults are not reset because the current root is not a list.
- Image size is a fixed block height rather than an intrinsic media ratio.
- Footer wrapping is generic flex behavior; long price/status/action content has
  no deliberate source-order or narrow-container layout.
- Studio overrides grid minimum, image height, outer padding, date-icon size,
  full-width action and a `680px` docs-stage container breakpoint. Canonical CSS
  therefore does not own the complete component response.
- The baseline R7 slice is `1,989 B` raw / `705 B` gzip, SHA-256
  `3757390fb9fe082791d47f0f3369354221e50090cbb64ad2367426ace1affdcc`.
- After R6, Ceramics CSS is `32,244 B` raw / `4,954 B` gzip with `473 B`
  beneath its `5,427 B` family ceiling. Neutral Web component CSS is
  `522,076 B` raw / `70,442 B` gzip. Shared runtime is `53,811 B` raw /
  `10,565 B` gzip and R7 contributes no neutral script.

### Documentation And Fixtures

- Runtime repeats the same title, level and description twice, changing only
  image and date; this weakens list/content stress evidence and produces
  repeated generic action labels.
- Runtime uses `$120` without a currency identifier while fallback uses
  `ARS 48,000`; neither path consumes canonical Price.
- The visible baseline has a useful editorial hierarchy: image, accent schedule,
  serif title, quiet metadata, body summary, price/status and a clear action.
- Documentation correctly keeps booking outside R7 but does not require list
  semantics, canonical Card/Price/Badge composition, descriptive navigation,
  time-zone/localization truth or strict empty-record omission.

### Baseline Visual Evidence

Four preserved captures exist under `output/playwright/parity/ceramics/`:

- `workshop-listing-exhibit-mobile.png`
- `workshop-listing-exhibit-desktop.png`
- `workshop-listing-studio-mobile.png`
- `workshop-listing-studio-desktop.png`

The useful identity is a restrained editorial card with broad workshop media,
accented schedule, strong serif title, low-emphasis supporting metadata and one
full-width action. Desktop uses a two-card grid in Studio and a one-column
bounded specimen in Exhibit; Mobile stacks records. The direction is worth
preserving while removing duplicated primitives and false action semantics.

There is no R7-specific Figma evidence for card anatomy, dense/sparse records,
media absent, availability states, themes, RTL, extreme localization, text
enlargement, forced colors or booking boundaries.

## External Research

| Source | Evidence | Gallery implication |
| --- | --- | --- |
| [WHATWG article and section semantics](https://html.spec.whatwg.org/dev/sections.html) | `article` represents a complete, independently reusable composition; sections and headings convey document structure. | Each workshop summary may be an article named by its visible contextual heading; R7 does not need a fabricated widget role. |
| [WHATWG `time`](https://html.spec.whatwg.org/dev/text-level-semantics.html#the-time-element) | `time` pairs visible content with a valid machine-readable `datetime`. | Render `time[datetime]` only when both target values are present and correspond; otherwise preserve truthful text without fake machine data. |
| [WAI-ARIA APG Link](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Native `a[href]` is strongly preferred because it supplies navigation and expected browser behavior. | “View workshop” uses a native anchor styled by canonical Button, not a no-op button or custom link role. |
| [WAI WCAG G91](https://www.w3.org/WAI/WCAG22/Techniques/general/G91) | Link text should describe the destination/purpose and distinguish links. | Preserve “View workshop” in the accessible name and add the workshop title as context for repeated destinations. |
| [WAI informative images](https://www.w3.org/WAI/tutorials/images/informative/) | Informative images need a concise alternative conveying their purpose; redundant/decorative images may use empty alt. | Media alternative is target/context owned; it must not be derived mechanically from the title. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Mature systems disagree on card anatomy and mix grid, media, metadata, footer, link, disabled, focusable and hoverable concepts; the research records no shared anatomy. | Keep R7 semantics in native list/article/time/link content and canonical Gallery composition rather than standardizing every card concept as API. |
| [Radix Themes Card](https://www.radix-ui.com/themes/docs/components/card) | Card groups related content/actions and may render as another element; interactive card styling is explicit when used as a link/button. | Preserve semantic element choice and avoid treating hover elevation as proof that the whole workshop card is interactive. |
| [Radix composition guide](https://www.radix-ui.com/primitives/docs/guides/composition) | Changing an underlying element requires preserving its native accessibility and behavior; design-system leaf components should forward semantics. | Canonical Button visual treatment must retain anchor semantics for navigation. |
| [Shopify Polaris Web Components](https://shopify.dev/docs/api/app-home/web-components) | Polaris separates Grid/Section/Image/Heading, passive Badge status and Link/Button actions instead of defining a workshop schema. | Shopify composition can use target primitives, but R7 still owns no event/booking data model. |
| [Shopify dynamic sources](https://shopify.dev/docs/storefronts/themes/architecture/blocks/theme-blocks/dynamic-sources) | Theme blocks can receive products, articles, pages and metaobjects through explicit resource context. | A future storefront adapter may consume an approved workshop metaobject/resource; R7 must not invent that definition. |
| [Shopify `time_tag`](https://shopify.dev/docs/api/liquid/filters/time_tag) | Liquid can produce a localized visible `<time>` with machine-readable datetime. | A future adapter should use target locale/date facilities instead of hardcoded English schedule strings. |

## Coincidences, Differences And Direction

### Coincidences

- Repository source, HTML and design-system references agree that a workshop
  card is content composition, not a WAI-ARIA widget.
- Existing contract and external evidence agree that schedule, price,
  availability, destination and ordering remain target-owned facts.
- Gallery Card, Price, Badge and Button already match the decomposition shown in
  mature systems; R7 should compose them rather than grow parallel APIs.
- Existing visual evidence and Card research both support media, metadata, body
  and footer regions while leaving which regions are present to content.

### Differences Or Gaps

- Current R7 uses direct articles without native listing semantics and a
  hardcoded hidden section label instead of a target-visible list context.
- Runtime and fallback disagree on fixture content and time semantics.
- The full state incorrectly disables a no-op details button.
- Price/status/Card behavior is duplicated instead of canonical.
- Current CSS response is split between source and Studio and remains heavily
  hardcoded/physical.
- Generic Figma pointers cannot approve R7 visual values or content extremes.

### Recommended Direction

- Extract `WorkshopListingArtwork` and one varied fixture consumed by the
  registered Exhibit/Studio renderer; keep static MDX fallback structurally
  aligned for audits and no-JavaScript documentation.
- Filter records without stable id/title and omit the root when none remain.
- Render `ul.workshop-grid > li.workshop-grid__item > article.card.workshop-card`
  and associate each article with its contextual heading.
- Compose canonical `card__media`, `card__body`, `card__footer`, Price, passive
  Badge and Button-as-anchor markup. Do not wrap the whole article in a link.
- Use valid `time[datetime]` when target schedule metadata exists and ordinary
  text when it does not. Preserve target source order and full visible strings.
- Keep a details destination available in Full state; status does not infer
  booking-action availability or reservation behavior.
- Replace fixed media height and Studio breakpoints with canonical Card behavior,
  logical CSS, a private media ratio and intrinsic list/card response.
- Preserve the broad media and restrained editorial hierarchy without treating
  hover elevation, availability tone or fixture fields as public API.

## Proposed Anatomy

| Part | Required | Semantic form | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes with valid records | `ul.workshop-grid` | R7 | Native collection; no invented grid widget role. |
| Item | repeated | direct `li.workshop-grid__item` | R7 | One independently complete record. |
| Card | yes per item | `article.card.workshop-card` | Card/R7 | Named by visible title; entire card is not one interactive root. |
| Media | optional | `.card__media.workshop-card__image > img` | Card/target | Informative or decorative alternative chosen in context. |
| Body | yes | `.card__body.workshop-card__body` | Card/R7 | Contains title and optional summary metadata. |
| Schedule | optional | `time` with valid `datetime`, else text | target | Complete localized date/time/time-zone expression. |
| Title | yes | contextual `h2`-`h6` | target | Visible article name; heading rank follows host context. |
| Level/format | optional | text | target | Complete, non-interactive metadata. |
| Description | optional | `p` | target | Concise truthful summary; not hidden/truncated semantically. |
| Footer | optional | `.card__footer.workshop-card__footer` | Card/R7 | Omit when price/status/action are all absent. |
| Price | optional | canonical Price | Price/target | Complete formatted commercial string; no R7 parsing. |
| Availability | optional | passive canonical Badge | Badge/target | Visible complete text; static by default. |
| Action | optional | canonical Button as native anchor or target-owned native button | Button/target | Anchor for details navigation; booking action only with a real target workflow. |

## State, Variant, Size And Mode Matrix

| Dimension | Safe scope |
| --- | --- |
| Default/available | Passive article plus optional truthful availability label. |
| Limited | Canonical Warning Badge plus explicit target text; threshold remains target-owned. |
| Full | Canonical Error Badge plus explicit target text; does not automatically disable details navigation. |
| One/many | One valid article remains a useful list; repeated records preserve target order. |
| Empty/invalid | Omit complete R7 root; host may compose canonical Empty State. |
| Media present/absent | Body and footer remain complete without an empty media shell. |
| Metadata sparse/dense | Title required; other independently truthful regions omit without placeholders. |
| Narrow/wide | Grid and footer respond to actual available inline size; no viewport/Studio mode API. |
| LTR/RTL/mixed data | Logical geometry, automatic direction and `bdi` through Price; source order unchanged. |
| Light/dark/forced colors | Canonical Card/Badge/Button/Price and semantic tokens preserve boundaries/status/action. |
| Reduced motion | Canonical Card and Button motion preferences; no R7-owned motion. |
| Loading/error/filter/pagination | Host states outside R7; compose canonical components. |
| Controlled/uncontrolled | Not applicable to passive records; target booking/filter controls own their state. |

## Public API Direction

Retain only:

| Property | Type | Requirement | Meaning |
| --- | --- | --- | --- |
| `workshops` | slot | required non-empty | Target-owned ordered workshop-card records composed from canonical parts without a prescribed CMS or booking model. |

Do not add a fixed record object to the target-agnostic contract, title/intro for
the containing page, columns, density, minimum card width, media ratio/crop,
price fields, currency, locale, time zone, capacity number, low-capacity
threshold, availability polling, action label/destination, heading rank or
booking callbacks as R7 properties. Those facts remain inside target-owned slot
composition or later approved target/domain contracts.

R7 owns no events, controlled/uncontrolled state, focus movement, keyboard
model, live region, request, timer, observer, reservation, persistence or
neutral JavaScript. Canonical descendants retain their own semantics.

## Token And CSS Direction

- Remove R7 copies of Card surface, border, radius, shadow, transition, hover
  and reduced-motion behavior; consume canonical Card classes.
- Remove local price/status color and typography duplication; canonical Price
  and Badge own those decisions.
- Use existing heading/body-small typography, accent/primary/secondary text and
  layout spacing for R7-specific editorial hierarchy.
- Reset native `ul/li`, use logical properties and deterministic margins, and
  keep card/media/body/footer children `min-inline-size: 0`.
- Keep card minimum track, media ratio and compact internal gaps private.
- Use `aspect-ratio`, bounded media, `overflow-wrap: anywhere` and an intrinsic
  grid rather than fixed image height or docs-stage breakpoints.
- Let canonical Card/Button own hover/focus/reduced motion; add no passive
  row/card click handler or R7 transition.

## Target Translation

| Target | Direction |
| --- | --- |
| Neutral Web | Native list/articles/time/link, canonical Card/Price/Badge/Button composition, intrinsic logical grid and zero R7 JavaScript. |
| Shopify | Planned. Approve workshop resource/metaobject, recurrence/time-zone/localization, money, capacity freshness, destination/booking service, merchant validation and first consumer before Liquid/schema. Use `time_tag`, money filters and dynamic sources when approved. |
| Webflow | CMS supplies ordered complete records, valid schedule values, formatted price/status and real destinations; canonical CSS projection remains source-identical. |
| React/Angular | Thin projection of target records/children with contextual headings; canonical descendants retain native semantics and target workflows own state. |
| Figma | Future component models one/many, media absent/present, sparse/dense metadata, Available/Limited/Full and narrow/wide modes; generic registered nodes are not R7 approval. |
| SwiftUI/Compose/future | Use native list/card/date/text/link patterns and keep booking/capacity services outside the visual component. |

## Evidence And Validation Plan

- Preserve the four current Desktop/Mobile captures as before evidence.
- Capture paired Exhibit/Studio Mobile, Tablet, Desktop and XL with one managed
  fixed-port server, one explicit headless Chromium session and one tab.
- Verify one isolated renderer/fixture, native `ul > li > article`, article-title
  association, valid `time`, canonical Card/Price/Badge/Button ancestry and zero
  R7 scripts/listener state.
- Verify available, limited and full statuses; full keeps a real link focusable
  and activatable while no false booking action is exposed.
- Verify records absent, one card, media absent, metadata sparse, footer absent,
  long title/description/status, localized schedule/price, duplicate/invalid
  records and RTL.
- Exercise narrow direct roots, natural multi-column widths, effective 200%
  text, user spacing, dark, forced colors and reduced motion with zero root/part/
  document overflow and visible canonical focus.
- Validate contracts, registry/dependency graph, Studio, docs, static previews,
  generated Web/Shopify adapters, Exhibit/Studio parity, component/refinement
  audits, JSON, diff hygiene, target CSS copy parity and production build outside
  `site/dist`.

## Risks And Open Questions

1. Which content/domain layer owns workshop records, stable IDs, recurrence,
   cancellation, revisions, instructors, venues, languages, access needs,
   materials and editorial approval?
2. Which metadata belongs in a v1 summary, and what is required beyond title?
   Are online, in-person, series, drop-in and private workshops one card model?
3. Which service owns time zone, daylight-saving changes, locale formatting,
   occurrence selection, cancellation/reschedule truth and stale fallback?
4. Which service owns price, taxes/fees, currency, discounts, deposits, refunds,
   sold-out/waitlist states, capacity thresholds and freshness guarantees?
5. Is R7 discovery-only, may it expose registration, or must every booking action
   navigate to a separately certified flow? How are authentication, payment,
   reservation locks, errors and confirmation handled?
6. Should availability changes announce in-place in any target, and if so which
   owner controls timing, deduplication and user context rather than making the
   whole list live?
7. Which Shopify surface consumes R7 first, and what metaobject/metafield,
   dynamic source, theme block/section, locale, money/date rendering and booking
   integration are approved?
8. Is the current broad-media editorial card, hierarchy, action prominence,
   canonical Card elevation and responsive minimum approved, and where is
   R7-specific Figma evidence for all states/modes?

Owner decision 61 confirms the implemented discovery-only boundary without
selecting a booking architecture. The native collection/list/article/link
semantics, canonical dependencies, shared fixture and useful Full-state details
navigation are ready for explicit human review. Production event-source,
freshness, separate booking-flow, target integration and visual questions stay
visible; R7 remains `pilot` until explicit stability approval.
