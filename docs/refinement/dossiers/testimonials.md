# Component Dossier: Testimonials

Status: `human-review-ready`

Target reviewed: Neutral Web with Shopify translation and future-target boundary

Contract: `components/contracts/testimonials.contract.json`

## Recommendation

Keep G3 Testimonials as a passive, finite collection of verified attributed
quotations. The canonical Web composition should use a native unordered list;
each item should contain a `figure`, a `blockquote` for the quoted words and a
`figcaption` for attribution. A visible author name is required. Supporting
detail and canonical Avatar composition remain optional.

Testimonials should own the collection context, optional title, repeated-item
anatomy, intrinsic layout and presentation only. The target owns testimonial
records, ordering, source verification, consent, moderation, localization,
publication and any source URL. It should not become a carousel, review score,
CMS client, consent ledger or interaction controller.

The current decorative opening quotation mark should become an explicit
`aria-hidden` part rather than generated text. Targets may localize or omit that
decoration without changing the quotation semantics. The author name must not
use `cite`: HTML reserves that element for the title of a creative work, not a
person's name.

## Purpose And Limits

- Presents one or more short statements from identifiable people or entities.
- Makes the quoted words and their attribution structurally related without
  making the author part of the quotation itself.
- Supports an optional visible collection title and optional per-item author
  detail or canonical Avatar.
- Owns passive collection layout, card anatomy, content containment and
  container-responsive columns.
- Requires a non-empty quote and visible non-empty author name for every
  rendered item; invalid target records are omitted.
- Omits the complete component when no valid item remains.
- Uses a title-labelled native `section` when a title is present and a neutral
  `div` when it is absent, avoiding an unnamed section landmark.
- Does not own record retrieval, author identity resolution, image delivery,
  Avatar fallback, endorsement verification, consent, legal disclosure,
  moderation, dates, ratings, navigation, pagination, rotation or analytics.
- Does not define controlled/uncontrolled state because it is passive content.

## Current Gallery Baseline

- Registry identity `G3`, category `marketing`, dependency Avatar, dependency
  depth `1` and review order `86`.
- Contract `0.2.0`, `pilot`: optional title, required items slot, one passive
  state and one viewport-responsive presentation.
- The contract identifies semantic quotation and Avatar composition, but still
  describes a generated quote mark and a viewport-owned column model.
- The shared `MarketingStudio` renderer is used by Exhibit and Studio, but it
  always emits a native `section` and H2 even when the optional title is empty.
- Disabling the required items slot leaves an empty section instead of omitting
  the invalid composition.
- The renderer uses `div role="list"` and `figure role="listitem"` even though a
  native `ul`/`li` structure is available.
- The fixture correctly places `blockquote` and `figcaption`, and keeps a
  visible author name beside redundant hidden initials.
- Name and detail wrappers are inline without a block/grid identity layout.
  Existing evidence shows author name and detail colliding into one run of text.
- Canonical CSS uses physical viewport media queries at `768px` and `1024px`.
  An embedded narrow component inside a wide viewport therefore receives the
  wrong column count.
- Studio privately forces two columns and separately collapses them at a
  `680px` docs-container threshold. Exhibit and Studio do not consume the same
  responsive implementation.
- Card padding `24px`, internal gaps `16/12px`, weight `600` and detail size
  multiplication are unclassified hardcoded values.
- Title, name and detail typography omit line height, body family and semantic
  weights. Absolute line-height tokens also need relative minimums for
  text-only enlargement.
- The generated opening quote is not explicitly excluded from the accessibility
  tree and currently renders like two orange slashes in the supplied evidence.
- Avatar correctly remains passive and redundant initials are hidden, but its
  neutral secondary surface visually merges with the secondary card. This is
  an inherited Avatar/visual-review concern, not permission for G3 to restyle
  Avatar internals.
- Shopify has a dedicated section but uses generic `div` cards, paragraphs in
  place of `blockquote`/`figure`/`figcaption`, an unnamed section, an always-on
  hardcoded fallback heading and no invalid-record omission.
- Shopify correctly changed adjacent Avatar image alternative text to `alt=""`
  under ADR 0113, but still reports `planned` in the contract.
- Studio metadata references Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`
  and inspector `1020:480`; these are the generic Button/Studio shell rather
  than G3-specific visual evidence.
- Historical before evidence covers Exhibit and Studio at mobile and desktop
  in `output/playwright/parity/marketing/testimonials-*.png`.
- Deterministic baseline gzip is `569 B` for the G3 CSS slice, `3,920 B` for
  Marketing, `67,570 B` for generated Neutral Web component CSS and `10,501 B`
  for shared runtime. G3 owns no neutral JavaScript or asset.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `blockquote`, `figure` and `figcaption`](https://html.spec.whatwg.org/dev/grouping-content.html) | `blockquote` represents content quoted from another source; attribution belongs outside it. The standard explicitly demonstrates `figure` + `blockquote` + `figcaption` to relate a quote and attribution. | Use that native composition for every testimonial card. |
| [HTML sectioning](https://html.spec.whatwg.org/dev/sections.html) | `section` is a thematic grouping that typically has a heading. | Emit a title-labelled section only when the optional title exists; otherwise use a neutral root. |
| [HTML semantic-purpose requirement](https://html.spec.whatwg.org/multipage/dom.html) | The standard shows that a person's name is not the title of a work and therefore must not be marked up with `cite`. | Keep author name as visible text; reserve `cite` for an actual work title inside target-authored attribution. |
| [WAI decorative images](https://www.w3.org/WAI/tutorials/images/decorative/) | An image whose information is already supplied by adjacent text should use an empty alternative. | Adjacent Avatar images use `alt=""`; redundant initials stay `aria-hidden`. |
| [APG pattern inventory](https://www.w3.org/WAI/ARIA/apg/patterns/) | APG defines interactive widgets and keyboard models but no Testimonial pattern. | Add no role, focus, live region or keyboard model to passive quotations. |
| [Open UI component matrix](https://open-ui.org/research/component-matrix/) | The cross-system inventory contains no converged Testimonial component. | Keep G3 a thin content composition rather than inventing cross-target state or record APIs. |
| [Radix Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) | Radix exposes Root/Image/Fallback and composes actionability externally; it does not define a Testimonial composite. | Framework targets may implement Avatar loading/fallback, but G3 consumes the accepted passive Avatar boundary only. |
| [Polaris component inventory](https://shopify.dev/docs/api/app-home/web-components) | Polaris supplies generic Section, Grid, Stack, List, Text and Avatar primitives but no Testimonial composite. | Compose semantic content and existing primitives; do not mirror layout internals as public G3 properties. |
| [Polaris Avatar](https://shopify.dev/docs/api/app-home/web-components/media-and-visuals/avatar) | Polaris recommends empty Avatar alt when the same name appears adjacent and positions Avatar near its identity text. | This agrees with ADR 0113 and the Gallery fixture's redundant-image treatment. |

The evidence agrees on native quotation, attribution, list and redundant-image
semantics. It does not define a universal testimonial record schema, final card
visuals, source-verification workflow or content-governance policy.

## Mature-System Comparison

- HTML provides the strongest stable anatomy: native collection, quote and
  attribution semantics with no custom behavior.
- APG omits Testimonials because passive quotations are document content, not
  an ARIA widget.
- Open UI shows no converged named component or interoperable state model.
- Radix offers only the optional Avatar primitive; its React-specific
  image/fallback lifecycle must not enter the neutral G3 contract.
- Polaris similarly exposes layout, list, text and Avatar building blocks. Its
  documented responsive values are container-oriented, supporting an intrinsic
  Gallery layout without making `columns` a consumer property.
- Shopify Liquid can map merchant blocks into the same native structure while
  keeping record validation, editor metadata and image delivery target-native.

## Owner Reference Analysis

The registered Figma file/frame/inspector belong to the generic Component
Detail/Studio Button pilot. They validate the shared Exhibit/Studio method and
inspector organization only; they do not approve Testimonials card width,
column count, title hierarchy, quotation mark, italics, surface, radius,
Avatar treatment, spacing or author alignment.

The four historical PNGs are therefore baseline evidence, not visual approval.
They reveal three actionable implementation defects independent of taste:

1. author name and detail collide because identity text remains inline;
2. Studio forces a different two-column layout from canonical Exhibit CSS; and
3. viewport queries make cards excessively narrow in embedded desktop contexts.

The refined candidate still requires human approval for all aesthetic choices.

## Anatomy And Canonical Composition

| Part | Required | Semantic element/role | Owner | Direction |
| --- | --- | --- | --- | --- |
| Root | yes | labelled `section.testimonials` or neutral `div.testimonials` | Testimonials + target | Omit when there are no valid items. Use `section` only with a non-empty title. |
| Title | no | contextual native heading | target | Visible, non-empty and referenced by the section when present; target selects rank/id. |
| Grid | yes | `ul.testimonials__grid` | Testimonials | Native finite unordered collection; no duplicate `role=list`. |
| Item | yes | `li.testimonials__item` | Testimonials | One valid target record; editor metadata belongs here when needed. |
| Testimonial | yes | `figure.testimonial` | Testimonials | Relates quotation and attribution; not an interactive Card dependency. |
| Mark | no | `.testimonial__mark[aria-hidden=true]` | target fixture + G3 presentation | Localized/omittable decoration; never part of the quote or accessible name. |
| Quote | yes | `blockquote.testimonial__quote > p` | target record | Non-empty quoted words; optional native `cite` URL remains target record data. |
| Author | yes | `figcaption.testimonial__author` | target record | Attribution outside `blockquote`. |
| Avatar | no | canonical `.avatar` with explicit image or initials | Avatar + target | Adjacent image alt is empty; adjacent initials are hidden; no G3 fallback logic. |
| Identity | yes | `.testimonial__identity` neutral wrapper | Testimonials | Stacks visible name and optional detail without merging text. |
| Name | yes | `.testimonial__name` visible text | target record | Non-empty; not HTML `cite`. |
| Detail | no | `.testimonial__detail` visible text | target record | Role, location, organization or other concise context. |

## Variant, State, Mode, And Content Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One passive card-grid presentation; no G3 modifier. |
| Required content | At least one item with non-empty quote and visible author name. |
| Optional content | Root title, mark, Avatar and author detail omit independently without empty wrappers/gaps. |
| Empty/invalid | Omit invalid records; omit G3 when zero valid records remain. |
| Interaction | None. Links or controls require separately contracted canonical composition. |
| Controlled/uncontrolled | Not applicable; target owns immutable/current records. |
| Theme | Semantic primary/secondary/accent text and secondary card surface. |
| Forced colors | Passive text remains readable; decoration may be omitted; Avatar retains its accepted boundary. |
| Reduced motion | G3 authors no animation or transition. |
| RTL | Logical spacing/alignment and target-localized quote mark; identities remain visually grouped. |
| Responsive | Root-container-driven one, two or three columns; never viewport- or Studio-owned. |
| Extreme content | Long localized title, quote, name/detail and unbroken tokens wrap without horizontal overflow. |
| Text enlargement | Effective 200% title/quote/name/detail type retains relative line-height floors and no overlap. |

Invalid composition includes an empty quote, empty visible author name, an
Avatar as the only author identification, attribution inside `blockquote`, a
person name in `cite`, ARIA widget/list roles replacing available native HTML,
an empty list/root, viewport-only columns, automatic rotation or target records
embedded in neutral runtime.

## Public API And State Ownership

Retain the narrow two-property neutral API:

- `title` — optional non-empty visible heading content.
- `items` — required target/CMS slot containing one or more valid testimonial
  records in the canonical repeated anatomy.

Quote, author name, author detail, optional Avatar, optional citation URL and a
localized decorative mark are per-record slot content, not top-level G3
properties. The contract should document their required/optional anatomy
without pretending the current schema can validate a cross-target record type.

No `columns`, `breakpoint`, `cardPadding`, `gap`, `radius`, `alignment`,
`quoteStyle`, `avatarSize`, `autoplay`, `interval`, `activeIndex`, `rating`,
`source`, `verified`, `consent`, `moderation`, `loading`, `error`, `onChange` or
event belongs on G3. These are private layout, target record/governance or a
different component's facts.

G3 has no controlled/uncontrolled strategy. React/Angular receive records and
render them; Shopify receives section blocks; Webflow/Figma/native targets use
their own record/content model. Dynamic collection updates remain target-owned
and require no neutral state store.

## Alternatives Considered

| Alternative | Assessment |
| --- | --- |
| `div role=list` + `figure role=listitem` | Works as a fallback but adds ARIA where native `ul`/`li` is available; reject for canonical Web. |
| Independent `article` cards | Overstates each short quotation as a self-contained distributable composition; native figure/attribution is more precise. |
| Author in `cite` | Non-conforming for a person's name unless the text is the title of a work; reject. |
| Attribution inside `blockquote` | Contradicts HTML's quotation boundary; reject. |
| Generated CSS quote mark | Visually compact but not explicitly hidden from assistive technology and difficult for targets to localize; replace with optional hidden markup. |
| Carousel/auto-rotation | Introduces focus, controls, live changes and reduced-motion behavior belonging to canonical Carousel composition; outside G3. |
| Formal universal testimonial-record object | Could validate fields, but current cross-target content/source/governance needs are not accepted and the slot already preserves target-native records; defer. |

## Token And Hardcoded-Value Audit

| Current fact | Direction |
| --- | --- |
| Primary/secondary/accent text and secondary surface | Existing semantic public tokens remain appropriate. |
| H2, article, body and reduced-detail type | Complete each profile with existing family, semantic weight and line-height tokens. |
| Section/container/grid spacing | Retain existing system inputs and add existing element gap for card rhythm. |
| `24px` card padding | Use existing layout spacing through a private composition mapping; do not expose card padding. |
| `16px` card gap and `12px` author gap | Replace with existing semantic spacing/private derivation. |
| `600` author weight | Replace with existing semantic semibold font-weight token. |
| `calc(body * .875)` detail size | Replace with existing body-small size/line-height/weight profile. |
| `768/1024px` viewport breakpoints | Replace with private root-container thresholds; not public API. |
| Studio `680px` repair | Remove; Studio must consume canonical container response. |
| Generated `2em` quote mark | Use explicit hidden decoration with existing H2/accent type facts; no public mark-size property. |
| Absolute type line heights under text-only enlargement | Add private relative `em` minimums while retaining semantic tokens as the normal baseline. |

No new token or token layer is required. Avatar tokens stay owned by Avatar and
must not be copied into G3 merely because the optional dependency is present.

## Responsive And Content Test Plan

- Mobile `390x844`, Tablet `768x1024`, Desktop `1280x900`, XL `1536x960`.
- Direct roots near `200`, `320`, `520`, `700`, `900`, `1100` and `1280px` in
  an otherwise wide viewport, verifying one/two/three intrinsic columns.
- One valid item, three valid items, missing optional title, mark, Avatar and
  detail, invalid empty quote/name and zero valid items.
- Short copy, long localized Spanish/German copy, Arabic RTL, mixed scripts,
  long unbroken identity/detail tokens and effective 200% text size.
- Native list/figure/blockquote/figcaption accessibility tree, no focusable
  element, redundant Avatar treatment and no generated accessible quote text.
- Light, dark, forced colors and reduced motion.
- Exact normalized Exhibit/Studio DOM and computed-style parity.
- Shopify valid/invalid blocks, optional title/root choice, unique heading id,
  editor block attributes, empty adjacent image alt and localized schema labels.

## Performance Budget

- G3 remains a passive composition with `0 B` neutral component runtime.
- Baseline G3 CSS slice is `569 B` gzip (`1,485 B` raw).
- Marketing is `3,920 B` gzip against its permanent `4.1 KiB` (`4,198 B`)
  ceiling, leaving `278 B` headroom.
- Generated Neutral Web CSS is already `67,570 B` gzip against the unchanged
  `64 KiB` (`65,536 B`) ceiling, a program-level `2,034 B` gap.
- Shared runtime is already `10,501 B` gzip against `8 KiB` (`8,192 B`), a
  program-level `2,309 B` gap. G3 must add `0 B`.
- No listener, observer, timer, request, formatter, custom element, client,
  asset or layout read belongs to neutral G3.

## Target Translation

- Neutral Web: optional labelled section or neutral root, native list,
  figure/blockquote/figcaption items, optional canonical Avatar and zero G3
  runtime.
- Shopify: valid merchant blocks mapped to the same native anatomy, optional
  heading, unique id, editor attributes, target image delivery with `alt=""`,
  localized editor schema and zero G3 script.
- Webflow: CMS collection list with canonical classes and native quote/author
  markup; record verification remains editorial workflow.
- React/Angular: thin passive list renderer; target props/state own records and
  optional per-record source URLs.
- Figma: optional title plus repeated quote/author/Avatar slots and existing
  semantic appearance tokens after a G3-specific visual reference exists.
- SwiftUI/Compose: native lazy/static collection of semantic quote and author
  content; accessibility merges redundant imagery with visible identity text.

## Open Product And Human Boundary

This dossier intentionally does not decide:

- author consent, testimonial verification, material-edit disclosure,
  moderation, expiration, source records, dates, organization/legal claims,
  ordering, analytics or publication workflow;
- a universal cross-target testimonial-record object or required public source
  URL, date, role, image or rating;
- automatic Avatar fallback or initials derivation, which remain open under
  Avatar ADR 0113;
- final maximum measure, container thresholds, columns, card surface, padding,
  radius, title/quote/author hierarchy, italic treatment, quote glyph, Avatar
  prominence or copy; or
- promotion from `pilot` to `stable`.

These are target editorial facts, future architecture choices or human visual
review items. They do not block the recommended native structural refinement.

## Certification Plan

1. Record the passive native-quotation and target-record boundary in an ADR.
2. Advance the contract without adding interaction, record or layout APIs.
3. Make required record/root omission and native list/quote/attribution anatomy
   coherent in the shared renderer and static docs example.
4. Move all responsive behavior into canonical Marketing CSS, complete type and
   logical containment, and remove Studio's column repair.
5. Bring Shopify's existing section into the same native structure with strict
   valid-record omission and localized editor metadata.
6. Regenerate Web, Shopify and Webflow copied outputs required by source changes.
7. Capture before/after, four viewport, direct-container, optional/invalid
   composition, accessibility and special-mode evidence in one bounded phase.
8. Validate contracts, Studio, docs, adapters, parity, budgets and resource
   cleanup.
9. Mark `human-review-ready` only if the structural/target/evidence gates pass;
   keep `pilot` and require explicit human visual approval before stability.

## Implemented Result

Completed on 2026-07-16 without promoting the contract from `pilot`:

- Contract `0.3.0` now defines conditional titled-section/generic-root
  semantics, native list/figure/quotation/attribution anatomy, strict record
  omission, explicit hidden decoration, canonical optional Avatar composition,
  target record ownership, intrinsic response and zero neutral runtime.
- Exhibit and Studio use one `MarketingStudio` renderer and fixture. Normalized
  outer HTML is exactly equal at `1,802` characters with FNV-1a `e59e95e6`.
- The initial DOM contains one labelled section/H2, one native `ul`, three
  native `li`, three `figure`, three `blockquote` and three `figcaption`
  elements, with zero authored roles and zero focusable descendants.
- Clearing optional title produces one neutral `DIV`, no heading, no
  `aria-labelledby` and the same valid list. The required items control remains
  checked and disabled in Studio; source omission guards remove the root when
  the slot is absent.
- A minimal target composition with one item and no mark, Avatar or detail
  remains contained without empty wrappers or gaps.
- Canonical Marketing CSS owns the complete type, identity grouping, bounded
  private inset/card space and root-container columns. Studio's private
  Testimonials column rules were removed.
- Direct `200/320/520/700px` roots use one column, `900px` uses two, and
  `1100/1280px` use three. Every root and grid has equal client/scroll width;
  cards have zero overflow. The `700px` root remains one column because its
  usable content box is `636px`, below the private `42rem` threshold.
- Arabic RTL, long localized and unbroken content remains contained at a
  `688px` root. Effective 200% type resolves to title `56/67.2px`, quote and
  name `32/48px`, and detail `28/42px`; all cards stay contained and quotation
  and author rectangles do not overlap.
- The accessibility snapshot contains visible names and attribution but no
  decorative mark or redundant `MG/AL/JR` initials. G3 adds no keyboard model,
  focus stop, live region, transition or animation.
- Light title contrast is `17.93:1`; light quote/name is `16.44:1` and
  detail/Avatar text is `7.17:1`. Dark title is `17.18:1`, quote/name `14.50:1`
  and detail/Avatar `10.21:1`. The light accent mark is `3.26:1` but is purely
  decorative and excluded from the accessibility tree; dark is `6.69:1`.
- Forced colors maps content to system black/white and retains canonical Avatar
  boundaries. Reduced motion reports no non-zero animation or transition.
- Sixteen final PNGs cover paired Mobile, Tablet, Desktop and XL plus untitled,
  minimal, Arabic RTL/long, effective-200%, dark, forced-colors and
  reduced-motion evidence. One browser tab produced zero new console errors or
  warnings during paired view/resize probes.
- Shopify is now target-ready and implemented: it filters invalid blocks,
  omits an empty collection, selects section or generic root from optional
  title, maps native quotation/attribution markup, preserves editor attributes,
  uses empty adjacent image alt, localizes schema metadata and adds no script.
- Canonical, Webflow and Shopify Marketing CSS are SHA-256-identical at
  `4e05869ed9de53186f8193e5664e9c11edaf1e8db92d8b65ce6a9851e4fc69a9`.
- Final deterministic gzip is `821 B` for G3 (`+252 B`), `4,146 B` for
  Marketing (`52 B` below its ceiling), `67,751 B` for generated Neutral Web
  CSS (`+181 B`, retaining the global program gap) and `10,501 B` for shared
  runtime (`0 B` G3 delta).
- Human review must approve final geometry, type, surface, quote mark, Avatar
  prominence and fixture copy and replace the generic Button Figma trace with
  G3-specific evidence. These are visual/reference gates, not unresolved G3
  state or architecture decisions.
