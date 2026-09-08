# Component Dossier: Author Card

Status: `human-review-ready`

Target under review: Neutral Web single-author identity/biography composition
and target-owned editorial/contact data

Contract: `components/contracts/author-card.contract.json`

## Recommendation

Define L6 as one passive, fail-closed, non-landmark author identity composition
for exactly one target-supplied person. Require one non-empty visible `name` and
omit the complete root without it. Preserve the accepted optional Avatar,
role/affiliation, biography, profile/contact Links and full/compact presentation
from ADR 0079; do not add CMS/provider fields, image URLs, heading rank, section
labels, SEO data, social network booleans, or action behavior to the neutral API.

Render a neutral `div` root and neutral name text in the shared implementation.
The real article host chooses whether the card belongs inside an article
`footer`, a tangential `aside`, or a contact-only `address`, and may map the name
to a contextual heading. L6 cannot choose those semantics safely across a full
end-of-article biography and a compact byline. An `address` is valid only when
all enclosed content is contact information for the nearest article/body; a
general biography must not be forced into it.

Compose canonical Avatar for visual identity and canonical Link anchors for
destinations. Profile, homepage, social and `mailto:` destinations are links,
not Button-styled actions. Targets may add `rel="author"` when a destination
describes/contact the author of the nearest article. Avatar content remains
explicit and context-sensitive; with the adjacent visible name, its image alt
or initials are normally redundant and hidden/null.

Owner decision 82 standardizes the shell on canonical Card. Full composes the
default Card surface; Compact composes `.card--flat` and keeps its tighter local
layout. Author Card no longer duplicates Card border or radius values.

For `full`, render every supplied optional part. For `compact`, render only
Avatar, name and role: do not merely leave biography/links in hidden DOM.
Replace viewport-driven stacking with intrinsic wrapping based on the card's
available inline size, use logical/token-backed geometry and complete wrapping,
and keep zero neutral runtime.

Create one `AuthorCardArtwork` and shared fixture consumed by Exhibit and
Studio. Keep fixture initials, icons, labels, destinations and target data out of
semantic defaults. Owner decision 50 accepts this `L6-A` boundary: the host owns
contextual semantics, multiple authors repeat canonical Author Cards, public
email is omitted by default, and homepage/social destinations require explicit
target supply and approval. Keep `pilot`; real target integration, final visual
review and explicit human stability approval remain later gates rather than
unresolved neutral architecture.

## Purpose And Limits

- Identifies one article author and may add useful affiliation, biography and
  author destinations near an article/byline.
- `full` supports a separate biographical block; `compact` supports a concise
  byline-like identity row.
- Represents one person, not an account menu, team directory, testimonial,
  comment author, user presence/status, social follow widget, profile editor,
  contact form, article metadata row, generic Card, or SEO model.
- Does not own the surrounding article/header/footer/aside/address, contextual
  heading rank, author source, CMS query, sanitization, localization, route,
  analytics, privacy/consent, social providers, email exposure, image loading,
  image failure/fallback, initials derivation, or multiple-author grouping.
- Does not make the whole card clickable, nest interactive surfaces, fetch
  author data, derive a profile URL, send email, follow accounts, copy contact
  details, or announce anything.
- Adds no listener, observer, timer, request, storage, generated asset,
  framework runtime, layout read, live region, or animation to neutral Web.

## Current Gallery Baseline

- Registry `L6`, Blog, dependency depth one, review order `120`, variants
  `full`/`compact`, dependency only `avatar`, and a description promising avatar,
  biography and social links.
- ADR 0079 already accepts full/compact presentation, author text, optional
  Avatar composition and target-owned profile/social links. No new product API
  is needed to reconcile the neutral source.
- Contract `0.1.0`, `pilot`, exposes six properties: variant, optional Avatar,
  required name, optional role, optional bio and optional links. It does not
  define missing-name behavior, passive runtime, root semantics, Link
  composition, compact DOM omission, multiple authors or privacy boundary.
- Root anatomy is semantically vague. Static MDX uses a labelled `aside` with a
  neutral `p` name, while Studio uses an unlabelled `section` with an `h2` name.
  Neither element/rank is universally correct and the two implementations
  disagree.
- Studio locally serializes every L6 part and fixture. There is no dedicated
  fail-closed renderer or shared author fixture. Exhibit baseline currently
  happens to show the Studio fixture, but source ownership is still duplicated.
- Studio composes a canonical Avatar class, but adds its contextual class to the
  Avatar root and locally supplies initials. The `docs-studio__blog-avatar`
  color/background are fixture presentation and not semantic API.
- Studio uses anchor elements with canonical Button classes for `mailto:` and
  profile destinations; MDX uses unclassified anchors. Contract/registry omit
  Link dependency while L6 CSS duplicates focus behavior for both anchors and
  buttons.
- Full/compact class mapping exists, but compact hides bio/links only with CSS.
  Targets can serialize content that remains in the DOM but is permanently
  unavailable. Studio also keeps the large Avatar fixture in compact mode.
- Canonical CSS uses physical `max-width`, `min-width`, viewport media query and
  `flex-direction`; hardcodes gaps/padding/margins `16/24/8/12px`, weight `600`,
  and a fractional body-size calculation despite accepted Body Small/weight/
  spacing tokens.
- Name, role and bio margin contracts are inconsistent: only name has a full
  reset; role sets only bottom margin; bio has no margin reset. Element changes
  between Studio/MDX can therefore change geometry.
- `.author-card__links` neither wraps nor provides intrinsic overflow resilience.
  Link labels/icons and long localized content can collide in a narrow host.
- Source uses a viewport `max-width:479px` stack while Studio duplicates the
  behavior with a container query. Exhibit/Studio can therefore differ by host
  even when the component has the same inline size.
- Baseline images are
  `output/playwright/parity/blog/author-card-{exhibit,studio}-{desktop,mobile}.png`.
  Visual inspection shows a coherent framed full card and clearly visible
  actions, but mobile stacking leaves identity far from its text, destination
  semantics look like mixed Button/Link controls, and no compact/extreme/RTL/
  dark/forced-color evidence exists.
- Existing parity reports mark two focusable surfaces and desktop/mobile visual
  review as passing. They do not prove one dedicated renderer, exact DOM/style
  equality, compact DOM omission, invalid required input, actual Link/Avatar
  composition, narrow intrinsic wrapping, contextual semantics, or privacy-
  safe target mapping.
- Web and Webflow receive copied CSS. Shopify is CSS-ready only; there is no L6
  Liquid. Shopify Liquid `article.user` exposes name, bio, email, homepage and
  image; `article.author` exposes a name string. Storefront `ArticleAuthor`
  exposes name, bio and email but no image/homepage. Role, social destinations,
  email publication, multi-author and placement remain target decisions.
- Registered Figma file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7`, and inspector
  `1020:480` remain generic Button Component Detail/Studio shells verified in
  this program; they provide no L6-specific full/compact, biography, avatar,
  link, responsive or article-context art direction.
- Deterministic baseline L6 slice is `1,278 B` raw / `490 B` level-9 gzip,
  SHA-256 `d40f86d75f6af35e746664334768f489d18d81aa1de7a4a204300c37d154475b`.
  Blog CSS is `31,961 B` raw / `5,486 B` gzip against the fixed `5,529 B`
  ceiling, leaving `43 B`. Shared runtime is `53,811 B` raw / `10,501 B`
  gzip; L6 owns zero.

## External Evidence

| Source | Relevant evidence | Gallery implication |
| --- | --- | --- |
| [HTML `address`](https://html.spec.whatwg.org/dev/sections.html#the-address-element) | `address` represents contact information for its nearest article/body, must contain only contact information, and cannot contain heading/sectioning/header/footer/address descendants. Author/editor contact often belongs inside a footer. | Do not hardcode `address` around a general biography or contextual heading. A target may use it only for a contact-only projection with truthful ancestry/content. |
| [HTML `aside`, `header`, and `footer`](https://html.spec.whatwg.org/dev/sections.html#the-aside-element) | `aside` is tangential/separate; article footer often contains author/related information; bylines may appear in header/footer/neither. | Root/placement semantics depend on the consuming article. Neutral L6 stays non-landmark; host wraps it truthfully. |
| [HTML link type `author`](https://html.spec.whatwg.org/dev/links.html#link-type-author) | `rel=author` on an anchor says the destination provides information about the nearest article's author; a `mailto:` may be that destination. | Target-authored profile/homepage/email links may opt into native author relationship; L6 does not infer which link qualifies. |
| [WAI Images Tutorial](https://www.w3.org/WAI/tutorials/images/) | Image alternatives depend on purpose/context; decorative/redundant images use null alt, functional images describe function. | Compose canonical Avatar and avoid repeating the adjacent visible name; a standalone or uniquely informative portrait needs contextual alt. |
| [APG Link pattern](https://www.w3.org/WAI/ARIA/apg/patterns/link/) | Native `a[href]` is strongly preferred and supplies standard navigation behavior; custom link roles require reimplementation. | Author destinations compose canonical native Links, not Button semantics or custom widgets. |
| [WCAG Headings and Labels](https://www.w3.org/WAI/WCAG22/Understanding/headings-and-labels.html) | Provided headings/labels must describe topic/purpose and fit programmatic structure; an Author Biography is one contextual example. | Do not guess H2. Host may choose a contextual heading; shared renderer uses neutral name text. |
| [WCAG Link Purpose](https://www.w3.org/WAI/WCAG22/Understanding/link-purpose-in-context.html) | Users must understand each link from text or programmatic context; different destinations should have distinct labels. Icon plus text forms one link and the redundant icon is null. | Use complete localized labels such as Author profile/Email; icon-only links need explicit names and decorative icons. |
| [WCAG Reflow and Target Size](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html) | Ordinary content reflows at 320 CSS px; target-size guidance protects pointer access. | Intrinsic wrapping, complete text, logical geometry, no page overflow and usable contextual Link targets need narrow/zoom evidence. |
| [Open UI Card research](https://open-ui.org/components/card.research/) | Cross-system Card research finds many optional visual concepts but no standardized anatomy/semantics; Open UI has no Author Card control. | Treat L6 as editorial composition over native content, Avatar and Link, not a custom widget/card role. |
| [Radix Avatar](https://www.radix-ui.com/primitives/docs/components/avatar) | Compound Root/Image/Fallback API owns image loading/failure and optional fallback delay. | Useful adjacent comparison, but Gallery's accepted Avatar explicitly leaves loading/fallback runtime target-owned; L6 consumes that canonical boundary. |
| [Shopify Polaris Avatar](https://shopify.dev/docs/api/app-home/web-components/media-and-visuals/avatar) | Profile image/initials, semantic sizes, adjacent identity placement and context-dependent empty alt are mature composition choices; Polaris also owns automatic fallback/events. | Confirms Avatar adjacency and alt policy without importing Polaris runtime/API into target-agnostic L6. |
| [Shopify Liquid `article`](https://shopify.dev/docs/api/liquid/objects/article) and [`user`](https://shopify.dev/docs/api/liquid/objects/user) | `article.author` is the full name and `article.user` supplies name, bio, email, homepage and image. | A passive Liquid snippet is feasible, but email/homepage exposure must be explicit and role/social/multi-author remain unsupported unless supplied separately. |
| [Shopify Storefront `ArticleAuthor`](https://shopify.dev/docs/api/storefront/latest/objects/articleauthor) | Headless author data contains name, bio and email but not image/homepage; it requires content-read scope. | Document a separate headless projection; do not promise parity with Liquid fields or invent missing media/destinations. |

APG has no Author Card widget pattern, and Open UI has no dedicated Author Card
control. Consensus is native document/content/link semantics plus a passive
identity image, not ARIA card/person roles or a custom keyboard model.

## Anatomy And Composition

| Part | Required | Semantic element/role | Owner | Notes |
| --- | --- | --- | --- | --- |
| Root | yes | neutral `div`, no role/tabindex | L6 | Fail closed without non-empty name; host owns article/footer/aside/address semantics. |
| Avatar | no | canonical passive Avatar | Avatar + target content | Adjacent identity normally null-alt/hidden; no L6 fallback/loading. |
| Info | yes | neutral `div` | L6 | Intrinsic text column. |
| Name | yes | neutral `p` in shared renderer | target content + host context | Host may map to contextual heading or author Link; no guessed rank. |
| Role/affiliation | no | `p` | target | Complete localized supporting identity text. |
| Biography | no, full only | `p` | target | Omitted from compact DOM; no rich HTML API in v1 neutral boundary. |
| Destinations | no, full only | neutral group of canonical Links | Link + target | Omitted from compact DOM; labels/URLs/rel/privacy stay target-owned. |

Canonical dependencies become `avatar` and `link`. L6 owns contextual layout;
Avatar owns identity thumbnail semantics/geometry and Link owns destination,
focus, hover, wrapping, forced-color and reduced-motion behavior.

## Variant, Size, State, And Mode Matrix

| Dimension | Direction |
| --- | --- |
| Full | Framed intrinsic composition with optional Avatar, role, bio and author Links. |
| Compact | Unframed concise Avatar/name/role row; bio and Links are not rendered. |
| Missing/blank name | Omit complete root; never create an unidentified author surface. |
| Missing Avatar | Valid text-only identity; no empty wrapper or generated initials. |
| Missing role | Valid; surrounding rhythm collapses without empty node. |
| Missing bio/Links | Valid full identity; no empty group. |
| One/many Links | Complete labels; intrinsic wrapping; target order; native anchor behavior. |
| Multiple authors | Target repeats L6 in a semantic list/group; singular L6 does not add collection API. |
| Long/localized/RTL | Complete strings, `dir=auto`, logical flow, breakable destinations, no clamps. |
| Light/dark/forced colors | Semantic tokens and canonical Avatar/Link preserve identity, boundary and focus. |
| Reduced motion | L6 has no motion; canonical Link removes its transition. |

There is one fluid component size. Avatar independently uses its accepted
semantic sizes. Mobile/Tablet/Desktop/XL are evidence contexts, not L6 API.

## Public API And State Ownership

| Property | Type | Requirement | Ownership |
| --- | --- | --- | --- |
| `variant` | `full \| compact` | optional, default `full` | Presentation/content-density profile only. |
| `avatar` | semantic slot | optional | Canonical Avatar composition; target owns image/initials/alt/loading/failure. |
| `name` | string | required non-empty | Visible localized author name; missing value omits root. |
| `role` | string | optional | Localized role/affiliation; not an ARIA role. |
| `bio` | string | optional, full only | Plain complete biography; compact omits it. |
| `links` | semantic slot | optional, full only | Canonical author destinations with target URLs, labels, relationships and privacy policy. |

There is no controlled/uncontrolled state, lifecycle or custom event. Native
Links control navigation. Targets replace author data through their own content
pipeline and own analytics/provider behavior.

Do not expose root element, heading rank, `aria-label`, avatar URL/initials/alt,
Avatar size, email/homepage/social network fields, icon choice, link layout,
card padding/radius, compact breakpoint, author id, SEO schema, provider state,
loading, fallback or multi-author collection as L6 properties.

## Token And Value Audit

- Retain semantic border, primary/secondary text, heading/body family, Body/
  Body Small size/line-height, accepted semibold, radius, stack spacing and
  touch-target tokens actually consumed through L6/Avatar/Link.
- Replace raw `16/24/8/12px`, `600`, and `calc(body * .875)` with existing
  stack, weight and Body Small tokens. Do not invent L6 public tokens.
- Root full padding/gap, intrinsic wrap threshold, link-group gap and compact
  density remain private composition. A private fallback value is acceptable
  where no public semantic decision exists.
- Remove Link focus/transition/color tokens from L6 metadata when they are
  inherited through the dependency rather than directly styled.
- L6 owns no icon, image source, initials, SVG, font, JavaScript or network
  asset. Studio-only Lucide icons and fixture initials remain site evidence.

## Visual And Content Audit

- Preserve the clean bordered full surface and unframed compact identity until
  human review chooses different art direction; do not add elevation or accent
  surface by assumption.
- Full desktop should keep Avatar and text closely associated. Narrow stacking
  must not create excessive whitespace or separate the identity from its name.
- Name is the strongest text; role and biography remain secondary but must pass
  contrast and retain complete line height. No truncation/clamp.
- Destination styling must communicate Link rather than action semantics. Icons
  are optional fixture decoration, never sole provider identity by default.
- Test one-grapheme/long/non-Latin names, missing every optional part, long role/
  biography, one/many/long Links, compact content omission, avatar image/null-
  alt and initials-hidden compositions, localized RTL, unbroken content,
  effective 200% type and WCAG text spacing.

## Accessibility And Interaction

- Neutral root is not a region/section/complementary/contentinfo landmark and
  does not enter the document outline. Host applies contextual semantics.
- Required visible name identifies the person without an extra accessible-name
  API. `dir=auto` protects standalone localized strings.
- Adjacent Avatar representing the same identity is `alt=""` or
  `aria-hidden="true"`; a uniquely informative/standalone portrait receives
  target-authored contextual alt through canonical Avatar.
- Profile/contact destinations are native canonical `a[href]`. Use `rel=author`
  only when truthful for the nearest article; external target/rel/security and
  email privacy remain target-owned.
- Link purpose must be clear from localized text or an explicit accessible name;
  icons inside labelled Links are hidden from assistive technology.
- No whole-card link, nested interactive content, button role, menu/social
  widget role, roving tabindex, live region, status or focus management.
- Compact omission is semantic DOM omission, not visually hidden unavailable
  content. Target authors should not supply critical destinations only to a
  compact projection.

## Responsive And Performance

- Replace the viewport media rule and Studio-only container duplication with
  intrinsic flex wrapping so identical card inline sizes produce identical
  layout in every host.
- Root/info/strings use logical dimensions, `min-inline-size:0`, complete
  wrapping and no fixed block size. Link group wraps without document overflow.
- Evidence covers paired Mobile/Tablet/Desktop/XL, direct `200–620px` hosts,
  full/compact, missing optionals, one/many links, long/localized/unbroken RTL,
  effective 200% type, text spacing, dark and forced colors.
- L6 budget stays `0 B` JavaScript/listeners/observers/timers/requests/assets.
  DOM/runtime scale only with supplied text and Links.
- Blog CSS has only `43 B` gzip headroom. Fund intrinsic/link/semantic changes by
  deleting the duplicate focus/media-query/raw declarations; do not raise the
  `5,529 B` ceiling silently. Shared runtime hash must remain unchanged.

## Cross-Target Translation

| Target | Mapping | Status / gap |
| --- | --- | --- |
| Web | Fail-closed neutral root; canonical Avatar/Link; optional text; full/compact intrinsic composition; zero runtime. | Source refinement can proceed; host semantics/author data remain integration. |
| Shopify Liquid | Supplied `article`/`user`; name required; optional user image/bio; explicit role; homepage/email Links opt-in with `rel=author`; no generated initials. | Passive snippet implemented. First consumer, concrete privacy approval, placement and schema remain target work; multiple authors repeat canonical L6 instances in a host-owned collection. |
| Storefront/Hydrogen | Project `ArticleAuthor` name/bio/email; target media/homepage may come from separate approved data. | Planned projection; do not promise Liquid field parity. |
| React / Angular | Thin stateless composition over target data and canonical Avatar/Link; host selects contextual wrapper/heading. | Planned; no framework runtime in base. |
| Figma | Full/compact, Avatar/no Avatar, short/long/missing optionals, link count, RTL/zoom equivalents. | L6-specific owner reference absent. |
| SwiftUI / Compose | Passive H/V stack with platform image/text/Link semantics and target-owned data/privacy. | Conceptual; native adapter design pending. |

## Exhibit And Studio Parity

Required refinement:

- create one `AuthorCardArtwork` that trims/validates name, maps full/compact,
  renders neutral text/root semantics, omits empty nodes and omits bio/links in
  compact;
- create one `AuthorCardFixture` using canonical Avatar and Link classes,
  decorative icons/initials, stable destinations and explicit author relation;
- make `BlogStudio` call the artwork/fixture rather than serialize L6 locally;
- let registered Exhibit and Studio receive the same fixture and initial values;
- update static MDX fallback to canonical anatomy for validation only;
- retain only stage width/fixture colors in site CSS; remove duplicated Author
  Card responsiveness;
- verify exact normalized DOM/styles at equal width, then capture four natural
  viewports and special states.

## Implementation Result

- `AuthorCardArtwork` now validates the required trimmed name, emits the neutral
  `div`/`p` composition, omits empty optional nodes, maps full/compact and omits
  biography/Links from compact DOM. BlogStudio supplies one shared data, Avatar
  and Link fixture to both registered Exhibit and Studio.
- Canonical CSS now uses logical dimensions, intrinsic flex wrapping, semantic
  stack/type/weight/touch-target tokens, explicit margin resets and wrapping
  Links. The viewport rule, Studio response override, raw `16/24/8/12px`, raw
  `600`, fractional font calculation and duplicate focus block are removed.
- Complete state evidence exposed canonical Link Nav hover at `3.56:1` light.
  The dependency source correction remains canonical; current CSS Color 4 pixel
  conversion measures `16.95:1` light / `17.05:1` dark. L6 adds no local Link
  override.
- Contract and Studio metadata are `0.2.0`; registry/contract depend on Avatar
  and Link. MDX, ADR 0197, Shopify documentation and open questions record the
  host semantics, target data/privacy and multi-author boundaries.
- `snippets/author-card.liquid` maps explicit `author_user` or `article.user`,
  falls back to `article.author` for name, omits blank identity, maps optional
  image/bio, derives no initials, and keeps homepage/email off until separately
  enabled with explicit localized labels. The official Shopify validator and
  repository adapter validator pass.
- Four paired natural viewports plus compact, missing optionals, 200px long RTL/
  unbroken, effective 200-percent type, text spacing, dark/reduced motion and
  forced colors, plus corrected Link hover, pass with zero overflow and no
  console/page errors. Equal-width
  DOM/style hashes are `71688a0c` / `ba61ec7b` in the current recertification.
- Light name/role/bio/Link contrast is `17.93/7.81/7.81/17.93:1`; dark is
  `17.18/12.09/12.09/17.18:1`. Both native Links receive a 2px keyboard focus
  outline and 44px minimum block size. Corrected Link hover is `16.95:1` light
  and `17.05:1` dark. Compact has no biography, Link group or focusable
  descendant.
- Final L6 CSS is `1,550 B` raw / `474 B` level-9 gzip, down `16 B` gzip from
  baseline. Current Blog is `28,699 B` raw / `5,130 B` audit gzip, `399 B`
  below the fixed `5,529 B` ceiling. Shared runtime is `117,741 B` raw /
  `22,807 B` audit gzip with zero L6 runtime ownership; its program gap is
  documented separately.
- Neutral Web, Webflow and Shopify Blog CSS projections are source-identical.
  Shopify now validates 90 target-ready components, 60 dedicated ready Liquid
  surfaces and 34/34 schema-ready surfaces. Tracked `site/dist` remains
  untouched; the final resource gate confirms the managed server stopped,
  Playwright closed and the pre-existing user server preserved.

## Findings And Direction

| Finding | Severity | Direction | Decision owner |
| --- | --- | --- | --- |
| MDX `aside/p` and Studio `section/h2` disagree and guess context. | high semantic/parity | Neutral `div`/`p`; host chooses article footer/aside/address/heading. | implementation/target |
| Required name has no fail-closed behavior. | high | Trim name and omit complete root when blank. | implementation |
| Author destinations use Button classes and L6 duplicates focus. | high | Add canonical Link dependency, native Link fixtures, remove duplicate state CSS. | implementation |
| Compact hides bio/links only with CSS. | semantic | Shared renderer omits them from compact DOM; CSS remains defensive. | implementation |
| Viewport source and container Studio rules duplicate responsive ownership. | parity/responsive | One intrinsic wrapping source; remove site reconstruction and viewport query. | implementation |
| Hardcoded/physical values and element-dependent margins drift. | medium | Logical/token-backed geometry and explicit margin resets. | implementation |
| Avatar content/size/fallback are fixture/target decisions. | target boundary | Consume canonical Avatar; do not derive initials or load/fallback in L6. | implementation/target |
| Shopify native author data can expose private email. | privacy/product | Accepted base defaults email/homepage off and requires explicit opt-in; each target still approves its actual public source and consumer. | Shopify target |
| Multi-author and role/social data are not consistent across Shopify APIs. | target integration | Accepted base repeats singular L6 instances in a host-owned collection; the target supplies approved role/social fields without inventing provider parity. | target |
| L6-specific visual/Figma evidence is absent. | visual blocker | Review repository render or supply article-context reference after technical reconciliation. | owner |

## Evidence And Validation Plan

Research/baseline complete:

- registry, ADR 0079, canonical Avatar/Link, contract/Studio metadata, Blog CSS,
  `BlogStudio`, static MDX, generated Web/Webflow/Shopify projections, adapter
  maturity, parity/interaction reports and site-only CSS audited;
- all four baseline screenshots inventoried and visually inspected;
- HTML, WAI/WCAG, APG, Open UI, Radix, Polaris and Shopify Liquid/Storefront
  evidence compared;
- exact L6/Blog/Web/runtime bytes, gzip and hashes recorded;
- no docs server, Playwright browser or Chrome opened during research.

Implementation and evidence completed:

- contracts, Studio, docs, static-preview, token-component, Neutral Web,
  Shopify/Liquid, certification, refinement, TypeScript, temporary build, JSON,
  diff, generated-copy identity and `site/dist` cleanliness gates pass;
- two bounded serial phases used one managed server, one stable headless
  Chromium session and one tab each: the complete matrix, then the discovered
  Link-hover remediation check. Full cleanup passed between phases and after
  the second; no resource overlapped;
- current exact DOM/style parity, four viewports, full/compact,
  required/optional omission, Avatar/no Avatar, long/RTL-unbroken-200px,
  effective-200%, text spacing, dark, forced colors, reduced motion and
  keyboard focus are retained under
  `output/playwright/refinement-batch-155/`; Batch 106 remains the original
  before/refinement evidence;
- native canonical Links, `rel=author`, neutral root/name semantics, compact DOM
  omission, zero overflow, high contrast and no browser errors are verified.

## Risks And Remaining Review Gates

Owner decision 50 resolves the neutral direction: one passive singular card,
host-owned semantics, repeated canonical cards for multiple authors, email off
by default, and explicitly supplied/approved homepage or social destinations.
The following are target or human-review gates, not blockers to presenting L6
for review:

1. Each real article composition must choose its truthful wrapper, placement,
   heading/link policy and author relation without changing the L6 contract.
2. Each Shopify or headless consumer must approve its concrete author source,
   public-contact consent, localized labels and any role/social extension data.
3. Human review must approve the final Full/Compact surface, Avatar placement,
   typography, rhythm, Link treatment and responsive appearance before `stable`.
4. Canonical Avatar fallback/initials typography remains Avatar work; L6 must
   continue consuming that dependency without inventing a second fallback.
5. L6-specific Figma/article-context evidence is still absent. The repository
   render remains the current source of truth and should be reviewed directly.

## Readiness Decision

`human-review-ready`. Owner decision 50 accepts `L6-A`, and the neutral Web,
shared renderer, canonical composition, intrinsic response, accessibility,
performance and privacy-safe passive Shopify mapping implement that boundary.
Concrete host semantics and target privacy remain consumer-owned, while final
visual judgment and explicit human stability approval remain pending. Contract
stays `pilot`; no `stable` promotion is authorized.
