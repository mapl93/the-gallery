# Component Dossier: Instagram Feed

Status: `human-review-ready`

Target reviewed: Neutral Web with Webflow and Shopify translation

Contract: `components/contracts/instagram-feed.contract.json`

## Recommendation

Keep Instagram Feed as a passive, finite media-collection section that presents
records already supplied by a target. S16 owns optional account context, one
required ordered item composition, optional visible captions, optional native
destinations, an optional action region, intrinsic grid layout, and section
rhythm. Provider authorization, fetching, caching, consent, freshness, ordering,
pagination, failures, moderation, analytics, and metric truth remain target
responsibilities.

Do not apply the WAI-ARIA `feed` pattern. APG defines that pattern for a dynamic
or infinitely scrolling series of articles and couples DOM focus to loading,
removal, and scrolling. S16 is a bounded gallery of media records, so a native
`ul`/`li` collection is the interoperable baseline. Use `figure` and
`figcaption` for each captioned media item. A target may wrap the figure in a
native anchor when the record has a real destination; passive items must not
receive `tabindex`, a click handler, or link-like styling.

Render a native `section` only when a non-empty visible heading can name it
through `aria-labelledby`; otherwise render a generic `div`. Omit the entire
component when the required item collection is empty. Render the optional
handle only when both a non-empty label and a real destination are present;
never synthesize `#` or a Studio-only destination in the neutral contract.

Replace the hover-only dark overlay and provider-style like/comment counts with
an optional, always-available authored caption. Social metrics are volatile,
provider-specific data rather than stable cross-target component properties.
If a target chooses to supply metric text inside the item slot, it owns the
meaning, freshness, localization, and accessible wording. S16 should add no
motion, disclosure state, custom keyboard model, JavaScript, or bundled asset.

Keep the public API at optional `heading`, optional paired `handle` and
`handleDestination`, required `items`, and optional `action`. Item record
schemas, fixed column counts, overlay mode, image ratio, crop, gap, heading
rank, text alignment, breakpoint values, provider name, account id, API token,
fetch limit, refresh interval, metric fields, loading mode, and target editor
settings remain target or private concerns. The action slot may consume the
canonical Button when appropriate without making Button a required dependency
of the neutral section.

For Shopify, the recommended translation is a target-native merchant-editable
section with optional heading and paired account link settings plus repeatable
image blocks. Each valid block supplies image, alternative text, optional
caption, and optional destination; the section omits empty blocks and renders
nothing when no valid image remains. Provider API integration must not be
embedded in the neutral component or guessed from the Instagram name.

Human review must approve the final grid density, gap, title/account rhythm,
caption treatment, image crop, action placement, fixture, and whether the public
name should remain provider-specific in a future release. The registered Figma
nodes are Button-specific and therefore provide no S16 aesthetic authority. The
contract remains `pilot`; automated evidence must not promote it to `stable`.

## Purpose And Limits

- Presents a finite collection of target-supplied social or studio media.
- Supports account context, individual captions, optional item destinations,
  and an optional account/gallery action.
- Preserves source order and native list/figure/link semantics.
- Allows passive and linked items in the same collection without making every
  item interactive.
- Does not become an Instagram client, embed wrapper, API adapter, OAuth flow,
  consent manager, cache, cron job, event stream, infinite scroller, carousel,
  lightbox, analytics surface, moderation queue, or metric calculator.
- Does not guarantee provider availability, freshness, account ownership,
  caption truth, rights, localization, alt text, or destination safety.
- Does not expose social metrics as canonical S16 fields.
- Does not add hidden content that requires hover, focus, or tap to discover.
- Use Gallery Grid when there is no account/social context. Use Carousel or
  Lightbox only when those independent interaction contracts are actually
  required.

## Current Gallery Baseline

- Registry identity `S16`, category `sections`, selector `.instagram-feed`, no
  dependencies, dependency depth `0`, review order `176`, and phase `7`.
- Registry copy promises an Instagram grid with hover statistics and fixed
  `6/3/2` responsive columns; this overstates provider behavior and encodes
  presentation rather than the refined semantic boundary.
- Contract `0.2.0`, `pilot`: required root/grid and item slot, optional header,
  heading, handle, overlay/stat and action; one default variant and size;
  provider integration remains target-owned.
- The public API contains optional `heading`, optional `handle`, optional
  `handleDestination`, required `items`, and optional `action`. The current
  renderer silently invents `#studio` when the destination is absent.
- Canonical CSS uses viewport media queries followed by duplicate container
  queries, hardcoded `24/16/4px`, six columns, a square crop, two opacity
  transitions, one image-scale transition, black/white literals, and hidden
  metadata that appears on hover/focus-within or non-hover devices.
- The item itself receives `position`, aspect ratio and overflow, while generic
  descendant `img` selectors own the crop. There is no explicit media, link,
  figure, or caption part.
- Shared hardening gives the root border-box containment, container query
  context, intrinsic minimums, long-string wrapping, media containment,
  reduced-motion suppression, and two-pixel focus outlines.
- The live renderer always emits `section`, never names it, leaves an empty root
  when the required item slot is disabled, renders six generic focusable `div`
  items, and exposes artificial like/comment counts as if they were content.
- Every Studio item is keyboard-focusable despite having no action. The hidden
  overlay becomes visible on focus, so focus is used as a disclosure mechanism
  for non-interactive content.
- Exhibit and Studio resolve the same `SectionsStudio` renderer and initial
  properties. The MDX fallback already differs: it uses a labelled section,
  `role=list`, `figure`/`figcaption`, four passive items, useful image
  alternatives, and textual captions rather than the live fake metrics.
- Studio exposes content/slot controls plus public text, focus, heading-size,
  section-space, and transition tokens. Transition controls describe an
  interaction direction that the refined passive component should not own.
- The neutral Web manifest reports CSS implementation and no dependency. The
  Shopify manifest reports CSS-ready only, with no Liquid/data/editor section.
- Deterministic level-9 baseline gzip is Sections `6,856 B`, generated neutral
  Web components `67,280 B`, and shared runtime `10,501 B`. Sections has only
  `5 B` below its permanent `6,861 B` ceiling, so S16 must recover room from its
  obsolete overlay/motion/duplicate-query rules and add `0 B` neutral runtime.
- `components/js/theme.js` contains no Instagram Feed selector, listener,
  observer, request, timer, or state owner.
- Live Figma inspection on 2026-07-16 confirms frame `943:7` is
  `02 / Component Detail - Studio` for Button and inspector `1020:480` exposes
  Button label, icons, type, size, state, padding, gap and appearance. These
  nodes are invalid as S16 visual evidence.
- Before-edit browser evidence is stored under
  `output/playwright/batch75-instagram-feed/before/`: paired Mobile, Tablet,
  Desktop and XL surfaces plus omission, focus, RTL, text-size and direct-width
  baselines. One named headless browser and one tab were closed with the owned
  server immediately after capture.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [WAI-ARIA APG Feed Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) | A feed automatically loads article sections while scrolling and establishes a focus/loading interoperability contract with `feed`, `article`, position/set size and busy state. | S16 is finite and already rendered; do not use `role=feed`, article focus movement, Page Up/Down handling or live-loading ARIA. |
| [HTML grouping content](https://html.spec.whatwg.org/multipage/grouping-content.html) | Native lists express related items; `figure` represents self-contained referenced content and its first `figcaption` supplies the caption. | Use `ul`/`li` and `figure`/`figcaption` instead of generic divs plus ARIA repair. |
| [WAI Groups of Images](https://www.w3.org/WAI/tutorials/images/groups/) | A related image collection needs item-specific alternatives and can use figures/captions to preserve each image's relationship to the collection. | Each informative media item needs context-appropriate alternative text; authored captions remain visible and semantic. |
| [WCAG 2.2 Focus Visible](https://www.w3.org/WAI/WCAG22/Understanding/focus-visible) | Every keyboard-operable component needs a persistent visible focus indicator. | Only real handle/item/action links enter the tab order; their native focus remains visible. |
| [WCAG 2.2 Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) | Pointer targets generally need a `24x24` CSS-pixel area or adequate spacing/equivalent exceptions. | A linked media tile uses the complete tile as its target; tiny overlay controls are outside S16 v1. |
| [Open UI List research](https://open-ui.org/components/list.research/) | Lists present sequential items and may contain compound content such as images and multiple text regions. | A native ordered record collection is a better baseline than a custom social-feed widget. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Cross-system card research finds media, metadata, link and loading concepts but no consensus anatomy. | Keep item internals as a validated target-owned slot; do not invent a universal social-card schema. |
| [Open UI charter](https://open-ui.org/charter/) | Provider-iconic or platform-specific patterns are outside Open UI's standardization scope. | Instagram integration and metrics remain target/provider policy, not neutral component behavior. |
| [Radix composition](https://www.radix-ui.com/primitives/docs/guides/composition) | Replacing a native element transfers responsibility for its accessibility; non-interactive divs are not acceptable substitutes for links/buttons. | Targets compose native anchors only for real destinations and leave passive items unfocusable. |
| [Polaris Media Card](https://polaris-react.shopify.com/components/layout-and-structure/media-card) | Media is paired with written information; the written content must stand alone, while actions are explicit properties. | Captions/context cannot depend on an image or hover alone; actions remain explicit target-owned composition. |
| [Polaris Resource List](https://polaris-react.shopify.com/components/lists/resource-list) | A collection API separates item data/rendering from sorting, filtering, pagination and network logic handled by consumers. | S16 owns layout/semantics for supplied records, not fetching, pagination or provider state. |

APG has no finite social-image-gallery widget. Open UI likewise has no
Instagram Feed proposal or consensus social-card anatomy. Native content
semantics plus explicit target-owned links are the stable cross-target basis.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes when items valid | named `section.instagram-feed`; otherwise `div.instagram-feed` | S16 / target | Heading names the section. Untitled content avoids an unnamed landmark. |
| Header | no | `header.instagram-feed__header` | S16 | Exists only when heading or a valid handle link exists. |
| Heading | no | contextual heading `.instagram-feed__heading` | target semantics, S16 presentation | Non-empty trimmed content and target-unique id; rank follows page context. |
| Handle | no | `a.instagram-feed__handle[href]` | target | Requires both visible label and real destination; never a fake anchor. |
| Grid | yes | `ul.instagram-feed__grid` | S16 | Native finite ordered collection; visual grid does not change reading order. |
| Item | repeated | `li.instagram-feed__item` | target records, S16 geometry | Passive by default; no item `tabindex`. |
| Item link | no | `a.instagram-feed__link[href]` | target | Wraps one figure only when the item has a real destination. |
| Figure | yes per valid item | `figure.instagram-feed__figure` | target content, S16 crop | Contains one target-owned media node and optional caption. |
| Media | yes per valid item | `img` or target-equivalent `.instagram-feed__media` | target | Source, dimensions, loading, rights and alternative text are target-owned. |
| Caption | no | `figcaption.instagram-feed__caption` | target | Visible without hover/focus; no canonical metric fields. |
| Action | no | `.instagram-feed__cta` containing target-native action | target | Canonical Button/Link may be composed; no duplicate button markup contract. |

S16 has no required canonical component dependency. Button remains optional
slot content, while native list, figure, image and anchor elements are platform
semantics rather than registry components.

## Variant, Size, State, And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Presentation | One finite media-grid profile; no public variant modifier. |
| Size | One semantic heading/account/caption scale; no public size enum. |
| Titled | Native section named by visible contextual heading. |
| Untitled | Generic div with the same list content. |
| Valid handle | Non-empty label plus real destination renders one native link. |
| Incomplete handle pair | Omit the handle entirely; no placeholder destination. |
| Required items absent/empty | Omit the complete component. |
| Passive item | Native list item/figure, no tab stop, no pointer affordance. |
| Linked item | Native anchor wrapping the figure, full-tile target and visible focus. |
| Captioned item | Visible semantic figcaption; no hover disclosure requirement. |
| Uncaptioned item | Figure/media remains valid; no reserved caption space. |
| Long/localized/extreme | Captions, heading and handle wrap; media/grid remain contained. |
| RTL | Logical geometry and target `dir`; source/list order remains authored. |
| 200% text | Captions and account context reflow without clipping or horizontal page scroll. |
| Light/dark | Semantic text/surface/focus tokens only. |
| Forced colors | Native text/link/focus remain perceivable; imagery is not the sole carrier of essential text. |
| Reduced motion | No authored S16 motion or transition. |
| Controlled/uncontrolled | Not applicable; no value, selection, open state or component event. |

Unsupported combinations include `role=feed` without the APG loading contract,
generic focusable items, click-only divs, fake anchors, hover-only captions,
provider metric properties, nested interactive content inside an item-wide link,
infinite loading, live regions for passive records, viewport-swapped DOM, and
component-owned provider JavaScript.

## Public API And State Ownership

- `heading` — optional trimmed visible string. When present, targets render a
  contextual heading with a unique id and name the native section from it.
- `handle` — optional trimmed visible account label. It renders only together
  with a valid `handleDestination`.
- `handleDestination` — optional target-owned account/profile URL paired with
  `handle`; it never receives an invented fallback.
- `items` — required ordered slot containing one or more valid item/list/figure
  compositions. Targets own item identities, sources, alternatives, captions,
  destinations and any trustworthy supplemental text.
- `action` — optional target-owned action slot. A target may compose canonical
  Button or Link according to its navigation/action semantics.
- S16 exposes no provider, account id, access token, query, fetch limit,
  refresh, order, page, cursor, metric count, caption mode, overlay mode,
  column count, ratio, crop, gap, radius, title alignment, color scheme,
  breakpoint, loading, error, stale, consent or editor-setting property.
- S16 emits no event and has no controlled/uncontrolled strategy. Target-owned
  native links and any future composed descendants retain their own contracts.

## Token And Value Audit

| Concern | Baseline fact | Recommended direction |
| --- | --- | --- |
| Section spacing | `--section-spacing-y` fallback with no inline inset | Use existing `--space-layout-section-gap` and bounded `--space-layout-container`; no new S16 token. |
| Heading | Family plus `--typo-h3-size`; line-height/weight incomplete | Use the complete existing H3 semantic profile; heading rank remains target-owned. |
| Handle | Small size with fallback and accent/primary color mix | Use complete Body Small semantic profile, persistent underline and native link focus. |
| Grid | Six tracks and `4px` gap | Use private auto-fit/minmax geometry and one private gap derived from existing layout spacing. Column count is responsive outcome, not API. |
| Item crop | Hardcoded square aspect | Keep one private square media-frame ratio for v1; human review may revise it without public API churn. |
| Caption | Black overlay, white text, `600`, `16/4px` gaps | Replace with always-visible text below media using semantic caption typography; provider stats disappear. |
| Focus | Shared `--color-border-focus` outline on item and descendants | Keep focus only on native handle/item/action links; thickness/offset remain private. |
| Motion | `--transition-default`, `--transition-fast`, `--easing-default`, image scale and opacity | Remove S16-authored motion and public transition ownership. |
| Hardcoded values | `48/24/16/4px`, `1.05`, `68%`, black, white | Retain only validated private crop/gradient/focus geometry; replace spacing/type/color literals with existing semantic tokens or relative private composition. |

No component-scoped public token is justified. Grid minimums, gap, crop,
caption placement/gradient, focus geometry and section alignment are private
composition until human visual review establishes a stable semantic decision.

## Accessibility And Interaction

- The titled root is a native thematic section named by its visible heading;
  the untitled root is a generic div.
- The item collection is a native unordered list. Visual columns never change
  source order, reading order, or tab order.
- Informative images require useful contextual alternatives; decorative images
  use `alt=""`. A visible caption does not automatically replace the alternative
  when the image conveys additional information.
- Passive items do not receive focus. Linked items and account/action links use
  native activation, history, accessible names, full pointer targets and visible
  keyboard focus.
- Captions and essential context remain visible without pointer hover, keyboard
  focus, touch discovery, color, or motion.
- Item-wide links must not contain nested buttons or anchors. Additional actions
  require a different target composition instead of invalid nested interaction.
- S16 has no APG feed navigation keys, roving tabindex, arrow-key model, focus
  management, live region, busy state, position/set-size ARIA, or custom event.
- Target loading, empty, error, stale and consent states are outside the neutral
  renderer but must be communicated as accessible text when the target has them.

## Responsive And Content Test Plan

- Paired Exhibit/Studio Mobile, Tablet, Desktop and XL screenshots plus exact
  normalized root-DOM comparison.
- Direct hosts at `200/320/520/740/900/1120px` to verify intrinsic containment
  and grid adaptation without viewport dependence.
- One, two, four, six and many items; mixed caption presence; passive and linked
  items; empty required items; missing heading; incomplete/valid handle pair;
  optional action on/off.
- Short English, long Spanish/German, Arabic RTL, unbroken handle/caption, empty
  optional text, and effective 200% text.
- Light, dark, forced colors, reduced motion, keyboard focus on handle/item/action,
  and image alternative/semantic tree inspection.
- Fresh console, page-error and failed-request capture after final navigation.

## Runtime And Performance Budget

- Neutral runtime budget: `0 B`.
- No S16 listener, observer, timer, request, provider SDK, embed, state store,
  custom element, hydration, layout read, animation, or bundled asset.
- Keep the Sections family at or below its permanent `6,861 B` deterministic
  gzip ceiling. S16 must fund its semantic work by deleting obsolete hover
  overlay, fake-stat, transition and duplicate viewport-query CSS.
- Shopify may perform one bounded Liquid render over merchant image blocks but
  adds no section JavaScript or provider network request.

## Target Translation

- Neutral Web uses conditional `section`/`div`, optional heading/account link,
  native `ul`/`li` + figure compositions, optional item links/captions, intrinsic
  CSS and zero runtime.
- Webflow consumes source-identical canonical Sections CSS and maps CMS records
  to the target-owned item slot without copying provider logic into S16.
- Shopify maps optional heading/account settings and repeatable image blocks to
  a target-native addable section, with strict invalid/empty omission,
  localized schema strings and zero component JavaScript.
- React and Angular use thin conditional native wrappers around target record
  rendering; data fetching and cache state remain outside the component.
- Figma should expose optional heading/account context and finite item/action
  composition after the owner supplies S16-specific visual evidence.
- SwiftUI and Compose use native list/grid, image, text and link semantics while
  provider integration remains a separate data layer.

## Open Human Boundary

This dossier intentionally does not approve:

- final grid minimums, column density, gap, crop, caption placement/treatment,
  section alignment, title/account/action rhythm, type scale, focus geometry or
  fixture;
- Instagram API/auth/embed/consent/cache/freshness/moderation/analytics policy;
- provider metrics as public API or the commercial right to display them;
- renaming S16 to a provider-neutral public name;
- component-specific Figma evidence, because registered nodes show Button;
- framework/native implementations; or
- promotion from `pilot` to `stable`.

## Pre-Edit Decision

Proceed with a passive finite-list refinement. The repo, APG, HTML, WAI, Open UI,
Radix and Polaris evidence agree on native collection/figure/link semantics and
target-owned data. No unresolved aesthetic, commercial, product or architecture
choice is required to remove artificial focus, fake metrics, hover-only content,
duplicate responsive rules or invented destinations. Those corrections can be
prepared for human review while all visual choices and provider policy remain
explicitly open.

## Evidence And Validation

- Contract `0.3.0`, registry, MDX, Studio metadata, TypeScript, all `183`
  contracts and all `183` Studio definitions validate.
- Exhibit and Studio use one `SectionsStudio` renderer and exact normalized
  initial DOM at all four paired viewports: `2,829` characters, FNV-1a
  `fbc9e923`.
- Initial semantics are one heading-labelled native `section`, one `ul`, six
  `li`, six `figure`, six visible `figcaption`, six images with alternatives,
  three native item links, three passive items, one valid handle link, one
  canonical Button link, zero explicit `feed/list/listitem` ARIA repair and zero
  passive focusables.
- Mobile, Tablet, Desktop and XL root/grid widths remain contained. Intrinsic
  columns resolve to `2/4/3/3` in Exhibit and `2/4/3/4` in Studio according to
  available component space without viewport-specific S16 queries or alternate
  markup.
- Clearing Heading yields a generic `div`, no heading and no naming attribute.
  Clearing either half of the account pair omits the handle and reduces the
  focusable count from five to four. Disabling Action removes its region.
- Arabic RTL plus a long handle stays `358/358px`; an unbroken extreme caption
  stays `153/153px`; a missing caption leaves five valid captions without
  reserving hidden overlay content.
- Effective 200% heading, handle and caption values resolve to `56/28/24px` and
  reflow inside `358/358px`. Direct assigned widths `200/320/520/740px` remain
  contained with `1/1/2/4` tracks; the real Studio host caps wider assignments
  at its available `752px` and four tracks.
- Light heading/handle/caption contrast is `17.93:1`, `5.88:1`, and `7.81:1`;
  dark contrast is `17.18:1`, `9.95:1`, and `12.09:1`. Forced colors exposes
  system black heading and system-link handle/captions with no overflow.
- Real keyboard traversal reaches an item link with `:focus-visible`, a `2px`
  solid outline and `2px` offset. Reduced motion shows only the docs-wide
  `0.00001s` safety clamp; S16 declares no transition or animation. The optional
  composed canonical Button retains its independent `0.1s` transition.
- Final fresh navigation reports zero console errors and warnings. Captures and
  structured measurements live under
  `output/playwright/batch75-instagram-feed/after/`.
- Neutral Web and Shopify adapters validate. Shopify is target-ready with one
  localized addable section, validated heading/account/action settings,
  repeatable media blocks, strict invalid/empty omission and zero component JS.
- Canonical, Webflow and Shopify Sections CSS share SHA-256
  `064e077887f5d7c9594a3cc33919bc0a546f31d067fd4c865e98772e269b71a9`.
  Deterministic gzip is Sections `6,795 B`, Web components `67,136 B`, and
  shared runtime `10,501 B`; S16 remains `0 B` runtime and the Sections ceiling
  retains `66 B` headroom.
- Resource cleanup passed: one named browser had one tab, both browser and
  agent-owned Vite server closed, ports `4173/5173` are free, no owned process
  remains, and `site/dist` is untouched.

## Findings And Direction

| Finding | Severity | Result | Decision owner |
| --- | --- | --- | --- |
| Generic focusable items and focus-based disclosure | high | Resolved with passive list items and native links only for real destinations. | standards / implementation |
| Artificial provider metrics and hover-only content | high | Resolved with always-visible authored figcaptions and no metric fields. | implementation |
| Unnamed section and invented `#studio` destination | high | Resolved with conditional named section/generic root and strict account pair. | standards / implementation |
| Empty required records can leave a shell | high | Resolved in renderer/contract and Shopify strict omission paths. | implementation |
| Fixed `6/3/2` viewport columns plus duplicate container queries | medium | Resolved with intrinsic auto-fit geometry and source-identical targets. | implementation |
| Incomplete type/spacing tokens and hardcoded motion/colors | medium | Resolved with semantic public profiles and private relative composition. | implementation |
| Shopify CSS-only projection | high | Resolved with officially validated localized target-native section. | target adapter |
| Provider-specific public name | product question | Kept for compatibility; future rename remains explicit human/product work. | owner |
| Figma trace resolves to Button | review risk | Recorded; S16-specific visual evidence remains required for aesthetic approval. | owner |

## Readiness Decision

`human-review-ready`. Research, semantic source refinement, target translation,
automated gates, paired evidence, performance accounting, cleanup, and explicit
human questions are complete. Contract remains `pilot`; no stability promotion
was made.
