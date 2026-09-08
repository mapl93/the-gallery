# Author Card Web Refinement Audit

Status: Human-review-ready; owner decision 50 implemented; target integration,
visual review, and explicit stability approval remain pending; stays `pilot`

Date: 2026-07-17

Component: Author Card (`L6`, dependency order `120`)

## Outcome

Author Card is now one passive, fail-closed identity composition for exactly one
target-supplied author. It requires a visible name, composes optional canonical
Card, Avatar and author Links, uses neutral root/name semantics, omits biography and
Links from compact DOM, responds intrinsically to its real container, and adds
zero neutral runtime.

The refinement removes the MDX `aside` versus Studio `section`/`h2` divergence,
Button-styled destinations, duplicated Link focus, hidden-but-serialized compact
content, viewport/Studio response duplication, raw spacing/weight/fractional
type values, and local renderer/fixture ownership. Exhibit and Studio consume
the same `AuthorCardArtwork`, data, Avatar, and Link fixtures.

## Refinement Rubric

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | One author identity/biography only; no account menu, team list, testimonial, social widget, CMS schema, profile fetch, follow/contact action, article shell, or provider model. |
| Anatomy and composition | pass | Neutral root; required name/info; optional canonical Avatar/role; full-only bio and canonical Links; no empty optional nodes. |
| Variants, sizes and states | pass with host boundary | Full and compact; one fluid intrinsic size; compact semantically omits unavailable content. Article placement remains host-owned. |
| Public API | pass | Six stable semantic decisions: variant, Avatar, required name, role, bio, Links. No root element, heading rank, provider fields, breakpoints, icon, padding, or fallback internals. |
| Controlled/uncontrolled | not applicable / explicit | Passive content and native navigation only; no mutable component state, lifecycle or custom event. |
| Dependencies | pass | Canonical Card owns the default/Flat shell; Avatar owns identity thumbnail semantics/geometry; Link owns anchors, focus, hover, wrapping and reduced-motion transition. |
| Tokens and values | pass | Existing Card-owned shell plus Author Card text/type/weight/stack/touch-target tokens; private intrinsic basis only; no new public token or hardcoded public geometry. |
| Accessibility | pass for neutral base | Required visible identity, no guessed landmark/heading, redundant Avatar hidden, native named Links, 44px targets, visible focus, AA contrast, RTL/reflow, forced colors and reduced motion. |
| Responsive/content | pass | Four viewports per surface plus missing optionals, compact, localized RTL/unbroken 200px, effective 200% type and text spacing have zero overflow. |
| Runtime/performance | pass for L6/Blog | Zero L6 runtime; L6 slice remains 16 B gzip below baseline; current Blog has 399 B headroom. Existing documented global Web CSS/runtime gaps remain separate program debt. |
| Cross-target translation | pass for Web/Shopify boundary | Web/Webflow/Shopify CSS is source-identical; validated passive Liquid mapping has privacy-safe contact defaults. First consumer/context/privacy approval remain open. |
| Exhibit/Studio parity | exact | Shared renderer/fixture; current equal DOM hash `71688a0c` and selected-style hash `ba61ec7b` at 620px. |
| Human review | ready, pending | Owner decision 50 accepts neutral host ownership, repeated singular cards for multiple authors, privacy-safe defaults and explicit approved destinations. Final visual judgment and real target integration remain pending. |

## Certified Neutral Boundary

- The complete root is omitted when the trimmed visible `name` is empty. Avatar,
  role, biography and Links are individually optional and create no empty node.
- Neutral Web renders a `div` root and `p` name without role, accessible-name
  attribute, tabindex, heading, article or landmark. The consuming document
  owns a contextual article `footer`, tangential `aside`, contact-only
  `address`, heading rank, linked name, structured data and placement.
- L6 represents one author. Multiple-author consumers repeat it inside a
  truthful semantic collection or define a separately reviewed composition.
- Avatar is explicit canonical composition. L6 does not fetch an image, derive
  initials, switch fallback, choose alt/loading, announce status or make the
  identity actionable. The shared adjacent initials fixture is `aria-hidden`.
- Destinations are native `.link.link--nav.author-card__link` anchors with real
  href values and explicit labels. Buttons remain reserved for actions. Targets
  own route, provider, target/rel security, truthful author relationship,
  localization, privacy and analytics.
- Full renders supplied optional content. Compact renders Avatar, name and role
  only; biography and Link group are not present or focusable. Defensive CSS
  still hides incompatible copied markup.
- Author source, localization, sanitization, rich biography, image delivery,
  email/homepage/social exposure, consent, SEO, CMS/editor schema and the first
  consumer remain target-owned. Multiple authors use a host-owned collection of
  canonical singular L6 instances. L6 adds no JavaScript.

## Public API And Composition

| Property | Contract | Mapping |
| --- | --- | --- |
| `variant` | `full \| compact`, default `full` | `.card.author-card` full or `.card.card--flat.author-card--compact` semantic density profile. |
| `avatar` | optional semantic slot | Canonical `.avatar.author-card__avatar`; target owns content, alternative, size, loading and fallback. |
| `name` | required non-empty string | Complete visible neutral `.author-card__name`; blank omission removes root. |
| `role` | optional string | Complete visible neutral `.author-card__role`; not an ARIA role. |
| `bio` | optional string | Complete plain `.author-card__bio` in full only. |
| `links` | optional semantic slot | Full-only wrapping group of target-owned canonical author destinations. |

Contract and Studio metadata now use contract `0.3.0` and stay `pilot`.
Registry and contract dependencies are `card`, `avatar`, and `link`. Framework,
Shopify, Figma, provider data and fixture icons/initials do not enter the
target-agnostic property API.

## Implementation And Visual Reconciliation

- `AuthorCardArtwork` trims the required name, maps only full/compact, emits
  neutral semantics and omits incompatible optional content. Shared data,
  Avatar and Link fixtures remain explicit Studio evidence rather than defaults.
- BlogStudio no longer serializes Author Card locally. Registered Exhibit and
  Studio receive the same renderer, initial values, fixture DOM and behavior.
  The static MDX preview is a matching validation fallback only.
- CSS replaces physical width, raw `16/24/8/12px`, raw `600`, fractional type,
  viewport stacking and duplicate focus with logical dimensions, intrinsic flex
  wrapping, existing stack/Body/Body Small/semibold/touch-target tokens, margin
  resets and canonical Link focus/motion ownership.
- Full-state auditing exposed canonical Link Nav hover using a pure accent at
  `3.56:1` light. The dependency source now reuses the accepted accent/primary
  direction; current CSS Color 4 pixel conversion measures `16.95:1` light /
  `17.05:1` dark. L6 adds no override.
- Site CSS now supplies fixture width and Avatar color only; the Author Card
  container query reconstruction is removed.
- Visual review of Mobile, Tablet, Desktop, XL, compact, missing optionals,
  200px localized RTL/unbroken, 200% type, text spacing, dark and forced colors
  shows a coherent bordered full identity, concise unframed compact row,
  complete content, correct logical flow and no clipping. Final art direction
  still requires the owner.

## Accessibility And Interaction Evidence

- Final root is one `DIV` with no role, label, tabindex or contextual
  sectioning/heading descendant. Name, role and biography are `P`; the visible
  name uses `dir="auto"`. Blank name yields zero roots.
- Canonical Avatar is a direct root child with `.avatar.avatar--lg` in full,
  default `.avatar` in compact, `.author-card__avatar`, and redundant fixture
  initials hidden from assistive technology.
- Two canonical native anchors are the only focusable descendants in full.
  Both retain real href, clear visible labels, `rel="author"`, decorative hidden
  icons, 44px block size, and 2px `:focus-visible` keyboard outline. There are no
  buttons, custom widget roles or live regions.
- A detached profile anchor follows native navigation to `#author-profile`
  without component JavaScript. The docs inspection handler remains outside the
  neutral component contract.
- Compact has zero biography nodes, Link groups and focusable descendants.
  Removing Avatar, role, bio and Links leaves a valid name-only composition.
- Light name/role/bio/Link contrast is `17.93:1`, `7.81:1`, `7.81:1`, and
  `17.93:1`. Dark equivalents are `17.18:1`, `12.09:1`, `12.09:1`, and
  `17.18:1`; current corrected Nav hover is `16.95:1` light and `17.05:1`
  dark after CSS Color 4 pixel conversion.
- Eight natural surface/viewport combinations and every special stress report
  zero root, part and document overflow. RTL places Avatar on logical start;
  unbroken strings wrap completely. Forced colors retains a 2px focus outline;
  reduced motion removes canonical Link transition and leaves zero moving part.
- Console warnings/errors and page errors are empty.

## Cross-Target Result

- Neutral Web validates all 182 components and records the Card/Avatar/Link
  dependencies, refined semantic contract, canonical Blog CSS and zero L6
  runtime.
- Webflow and Shopify Blog CSS copies are byte-identical to canonical source.
- `snippets/author-card.liquid` accepts an explicit `author_user` or native
  `article.user`, uses `article.author` only as required-name fallback, maps
  optional image and stripped bio, validates full/compact omission, derives no
  initials and adds no runtime.
- Homepage and email default off and each requires an explicit opt-in plus an
  explicit localized visible label. Image alt remains explicit and empty by
  default beside the visible name; eager loading is explicit.
- The official Shopify Liquid validator passes the snippet. Repository adapter
  validation reports 90 target-ready components, 60 dedicated ready Liquid
  surfaces, 34/34 schema-ready surfaces and the existing 12 unrelated maturity
  warnings.
- Target readiness proves passive native mapping and privacy-safe defaults, not
  a first article consumer, Theme Editor schema, headless field parity, approved
  public contact policy, multiple authors, role/social data, contextual article
  semantics, localization, SEO or final visuals.
- React/Angular remain thin stateless compositions; Figma, SwiftUI and Compose
  translations are documented without coupling the neutral base to them.

## Automated And Browser Verification

- Contract, Studio, docs, token/component compatibility, Neutral Web adapter,
  Shopify adapter and official Liquid, TypeScript, static preview, structural
  certification and generated-copy identity gates pass.
- Production Vite build passes to
  `/private/tmp/the-gallery-site-batch-155-final`; tracked `site/dist` was not
  rebuilt or changed.
- Current evidence is retained at
  `output/playwright/refinement-batch-155/`; Batch 106 remains the original
  before/refinement record.
- The complete matrix and corrected CSS Color 4 hover measurement ran as two
  bounded serial probes under the same stable `gallery-refinement` name, never
  more than one browser and one tab at a time. They reused the responsive
  pre-existing user server. Final cleanup confirms the managed server stopped,
  Playwright closed, the user server preserved, and the resource gate clean.

## Performance

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| L6 CSS slice | `1,278 B` raw / `490 B` gzip | `1,550 B` raw / `474 B` gzip | component observation | richer coverage; `-16 B` gzip |
| Blog CSS | `31,961 B` raw / `5,486 B` gzip | `28,699 B` raw / `5,130 B` audit gzip | `5,529 B` | pass; `399 B` headroom |
| Neutral Web component CSS | `69,080 B` gzip | `534,805 B` raw / `71,925 B` audit gzip | `65,536 B` | existing documented global gap `6,389 B`; no L6 delta in this reconciliation |
| Shared neutral runtime | `10,501 B` gzip | `117,741 B` raw / `22,807 B` audit gzip | `8,192 B` | existing documented global gap `14,615 B`; zero L6-owned runtime |
| L6 listeners/observers/timers/requests/assets | `0` | `0` | zero-runtime boundary | pass |

Final L6 SHA-256:
`4d346c74301d08e1db1f7e985726a2e0916391f967ac824183862852cbb3bae5`.
Final Blog CSS SHA-256:
`bb1a4ab914c1f07cbd00f182ca1a44d3b8c12149f89bec5bf13b1546f3e1d9ea`.
Neutral Web component CSS SHA-256:
`a2186c279799159abcae60066a90718f4a86f85046434e653a45de586ee7c687`.
Runtime SHA-256:
`0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`.

## Risks And Remaining Review Gates

1. A real article host must select its truthful wrapper, placement,
   heading/linked-name policy and `rel=author` relationship. Owner decision 50
   intentionally leaves this contextual choice to the host.
2. Shopify and headless consumers still need an approved author source,
   localized labels, consent/public-contact policy and any role/social fields.
   Email remains off by default; homepage/social links require explicit supply
   and approval.
3. Multiple authors must be rendered as a host-owned collection of canonical
   singular Author Cards; no L6 record-array mode may be introduced silently.
4. Human review must approve the Full/Compact surface, Avatar placement,
   typography/rhythm, Link treatment and responsive visuals before `stable`.
5. Canonical Avatar fallback questions and L6-specific Figma evidence remain
   separate follow-up work; the repository render is the source of truth.
6. Complete Web CSS/runtime stay above pre-existing program ceilings. L6 stays
   within Blog's fixed ceiling and adds no runtime.

## Readiness Decision

`human-review-ready`. Owner decision 50 accepts `L6-A`; neutral semantics,
canonical composition, accessibility, intrinsic response, contrast, target
projection, exact parity and performance implement that direction. Concrete
host semantics and target privacy remain integration responsibilities, while
final visual judgment and explicit human approval remain required for
stability. L6 stays `pilot`; no `stable` promotion was made.
