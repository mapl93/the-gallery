# Component Dossier: Comment Section

Status: `human-review-ready`

Target under review: L11 finite discussion structure, controlled reactions and
target-native Shopify comments

Contract: `components/contracts/comments.contract.json` (`0.3.0`, `pilot`)

Accepted owner direction: `docs/refinement/owner-decision-responses.md`,
decision 53

## Purpose And Limits

L11 presents one clearly named discussion associated with surrounding content.
It preserves authoritative order and reply context through native document
semantics, supports a resolved empty state and composes optional order,
pagination, reactions and composer controls from canonical dependencies.

L11 is not a provider, authentication surface, moderation queue, sanitizer,
reaction database, notification system, infinite Feed, sorter or cache. The
target owns identity/privacy, permissions, moderation, sanitization, records,
counts, page truth, draft/submission state, optimistic versus confirmed update,
errors, announcements, focus restoration, analytics and abuse policy.

## Accepted Product Direction

- Show at most two visible levels. Flatten deeper provider descendants into the
  second list in authoritative order and add visible localized reply-to context
  naming their immediate parent.
- Show Reply only with a target-authenticated composer and moderation lifecycle.
  A flat target may omit reply controls and nesting.
- Compose canonical Empty State for a resolved valid zero-record discussion.
  Loading, provider error, moderation lock and unavailable are different states.
- Default to oldest first. A target may offer another verified order through
  canonical Select while replacing the complete authoritative record set.
- Use finite numbered canonical Pagination for long discussions. Infinite Feed,
  unbounded insertion and neutral runtime sorting are excluded from v1.
- Give every comment one ordered reaction array. An item contains stable id,
  complete localized accessible label, optional icon/count, selected state and
  availability. Empty removes the entire surface.
- Reactions are standalone canonical Toggle buttons. After activation the target
  returns the complete array and may preserve independent selections or enforce
  mutual exclusion. There is no root `single | multiple` mode.

## Current Repository Findings

### Before refinement

- Contract `0.2.0` documented a native thread but left empty presentation,
  maximum depth, order/pagination and reactions open.
- The renderer recursively emitted unlimited nested `ol` elements, had one raw
  Reply Button, no reactions, no order control and no Pagination.
- Studio exposed only title, count, thread and composer. The fixture contained
  two records and could not demonstrate flattening or configurable reaction
  arrays.
- Shopify was `planned`; there was no article comment section or shared
  Pagination Liquid snippet.
- Existing Batch 109 evidence covered the older shell but could not prove the
  owner decisions above.

### Refined implementation

- `CommentSectionArtwork` remains the single Exhibit/Studio renderer. Its shared
  fixture includes provider depth three but produces only two visible levels;
  the flattened record says `Replying to Marina Paz`.
- The fixture contains multi-item, single-item and empty reaction arrays. Each
  rendered item is a standalone `.toggle.comment__reaction` with complete name,
  `aria-pressed`, native disabled support and optional icon/count.
- `BlogStudio` owns the target simulation: order, current page, draft and the
  complete authoritative reaction record tree. L11 CSS/JS owns none of them.
- Optional `orderControl` and `pagination` slots compose native canonical Select
  and Pagination. `thread` remains the required slot and may instead contain
  canonical Empty State.
- CSS is intrinsic and container-relative: one inline-size container, logical
  reply inset, wrapping metadata/actions/reactions/Pagination and no viewport
  breakpoint.
- Shopify now has an addable article-only section backed by published
  `article.comments`, native `new_comment`, canonical Empty State and one shared
  Pagination snippet reused by Main Collection. Its flat data model honestly
  omits replies and reactions.

## External Evidence

| Source | Evidence | Direction for The Gallery |
| --- | --- | --- |
| [HTML `article`](https://html.spec.whatwg.org/multipage/sections.html#the-article-element) | A user-submitted comment is an explicit `article` use case; related articles may be nested. | Use one native article per record and native list hierarchy rather than generic rows. |
| [HTML `section`](https://html.spec.whatwg.org/multipage/sections.html#the-section-element) | A section is a thematic grouping normally identified by a heading. | Require a visible contextual heading and fail closed when it is blank. |
| [APG Feed](https://www.w3.org/WAI/ARIA/apg/patterns/feed/) | Feed describes automatic scroll-driven loading and an interoperability contract covering focus, Page Up/Down, position/set-size and busy state. | A finite paginated discussion is not a Feed; do not add its role or keyboard model. |
| [APG names](https://www.w3.org/WAI/ARIA/apg/practices/names-and-descriptions/) | Visible labels and distinguishing repeated-action names are preferred. | Name each comment from visible author/date and each reaction/reply for its comment context. |
| [Open UI components](https://open-ui.org/components/) | No standardized Comment/Discussion primitive or provider lifecycle exists. | Keep L11 as native composition and avoid inventing a universal social service. |
| [Radix Toggle](https://www.radix-ui.com/primitives/docs/components/toggle) | A two-state button exposes explicit pressed state and controlled/uncontrolled change. | Persistent reactions require Toggle semantics and target state; a stateless Button is insufficient. |
| [Radix Form](https://www.radix-ui.com/primitives/docs/components/form) | Labels, controls, validation messages and server invalid state remain explicit compositions. | Accept a composer slot while leaving fields, validation and result lifecycle to the target. |
| [Polaris Web Components](https://shopify.dev/docs/api/app-home/web-components) | Polaris exposes action/form primitives rather than a portable Comment Section service. | Reuse canonical leaves and keep discussion policy outside visual CSS. |
| [Shopify article](https://shopify.dev/docs/api/liquid/objects/article) | `article.comments` contains published records, is empty when comments are disabled, exposes authoritative count/enabled/moderated state and supports Pagination up to 50. | Map the target natively and never infer unpublished records or reply relationships. |
| [Shopify comment](https://shopify.dev/docs/api/liquid/objects/comment) | Published comments expose author, content, created date, id, status and URL, but no parent or reaction data. | Shopify must remain flat and omit unsupported reply/reaction surfaces. |
| [Shopify form](https://shopify.dev/docs/api/liquid/tags/form#form-new_comment) and [Dawn](https://github.com/Shopify/dawn/blob/main/sections/main-article.liquid) | `new_comment` is the native mutation path; Dawn demonstrates exact author/email/body fields, errors, moderation success and Pagination composition. | Implement a target section with canonical Gallery classes while preserving Shopify's actual form contract. |

There is strong consensus on section/list/article/time/form-control semantics and
explicit Toggle state. There is no cross-system consensus on depth, order,
reaction vocabulary, moderation or provider lifecycle; owner decision 53 now
supplies The Gallery's portable boundaries without copying another identity.

## Anatomy And Composition

| Part | Required | Semantics and owner |
| --- | --- | --- |
| Root/title | yes | `section[aria-labelledby]` plus contextual heading; target supplies localized title/rank. |
| Count | no | Static authoritative target text; never a live or computed neutral value. |
| Order control | no | Canonical Select in `.comments__toolbar`; target replaces ordered records. |
| Thread/item/comment | when populated | `ol > li > article`; L11 owns finite structure, target owns records. |
| Author/date/content | per record | Visible author, optional native `time`, target-sanitized authored content. |
| Avatar | no | Canonical passive Avatar; redundant adjacent identity is hidden. |
| Reply-to | for flattened depth >2 | Visible localized parent context. |
| Actions/reactions | no | Canonical Button/Link and standalone Toggle leaves; target owns availability and requests. |
| Reply list | no | One second-level `ol`, never recursively nested in rendered DOM. |
| Empty State | when resolved zero | Canonical passive Empty State, not loading/error/unavailable. |
| Pagination | for long discussion | Canonical finite numbered navigation with target URLs/lifecycle. |
| Composer/status | no | Named native form using canonical fields/Button and target feedback. |

## Variant, Size, State And Mode Matrix

| Dimension | Supported direction |
| --- | --- |
| Variant/size | One default intrinsic composition; no public aesthetic or viewport size variants. |
| Invalid root | Blank title or absent discussion slot omits the complete root. |
| Resolved empty | Required slot contains canonical Empty State; no order or Pagination. |
| Populated | Oldest-first authoritative `ol` with one or many records. |
| Depth | Maximum two visible levels; deeper provider data flattened with parent label. |
| Reactions | Zero, one or many per record; pressed/unpressed/disabled and optional count/icon. |
| Alternative order | Optional Select request; no local in-place sort. |
| Long collection | Optional canonical Pagination; no Feed or automatic loading. |
| Composer | Optional top-level target form; Reply requires authenticated target lifecycle. |
| Localized/RTL/extreme | Complete text wraps; logical flow/inset; no truncation or clamp. |
| Narrow/zoom/spacing | Single container-responsive column with wrapping controls. |
| Dark/forced colors/reduced motion | Semantic tokens and canonical child behavior; L11 adds no motion. |

## Public API And State Ownership

| Property | Type | Meaning |
| --- | --- | --- |
| `title` | required string | Visible localized section name; blank fails closed. |
| `count` | optional string | Target-formatted authoritative supporting text. |
| `orderControl` | optional slot | Canonical Select for a verified alternative order. |
| `thread` | required slot | Native ordered records or canonical resolved Empty State. |
| `pagination` | optional slot | Canonical finite numbered Pagination. |
| `composer` | optional slot | Target-owned named native form. |

The L11 root has no controlled/uncontrolled value. Controlled state lives in
child contracts and target data: each comment supplies its complete reaction
array, Pagination supplies current/page destinations, Select supplies order,
and the target owns composer draft/result. Do not expose provider IDs,
timestamps, depth, reaction vocabulary, auth, moderation, page totals, heading
rank, Avatar size, indentation, spacing, border or measure as root properties.

## Token And Runtime Audit

- Public L11 tokens remain existing semantic border/text, heading/body type and
  layout spacing tokens. No Comment-specific public token layer was added.
- Canonical Select, Toggle, Pagination, Avatar, Button, Textarea and Empty State
  own their own public tokens and interaction presentation.
- `18rem` is one private maximum order-control measure; `1em` is private icon
  geometry. The reply inset uses an existing semantic minimum/maximum plus
  container-relative `cqi`, not a public knob.
- L11 owns zero neutral JavaScript, request, listener, observer, timer, storage,
  animation or asset. Studio's React state is target simulation only.
- Current size/hash evidence is recorded in the component report after the final
  adapter and browser pass.

## Target Translation

| Target | Mapping |
| --- | --- |
| Neutral Web | Native finite section/list/article/time structure; canonical child classes; zero L11 runtime. |
| Shopify | Implemented article-only Liquid section, published flat records, shared Empty State/Pagination and native localized comment form; no fabricated replies/reactions. |
| Webflow | Preserve native document/form markup and classes; CMS/provider lifecycle remains external. |
| React/Angular | Thin structural renderer receives authoritative children/records; application controls reactions, order, pages and mutations. |
| Figma | Model two visible levels, optional toolbar/reactions/Pagination/composer and resolved empty; registered generic nodes are traceability, not approval. |
| SwiftUI/Compose/future | Use native section/list/article-equivalent grouping and stateful target controls while preserving flattening and lifecycle boundaries. |

## Risks And Remaining Questions

- Real provider authentication, privacy, moderation, sanitization, rate limits,
  edit/delete/report, abuse, insertion, focus and announcement behavior still
  require target-specific proof.
- Shopify's first real article template installation and live Theme Editor/form
  round trip remain target evidence, even though the generated adapter is
  structurally target-ready.
- Final section rhythm, Avatar scale, reply inset, measure, composer density and
  Mobile/Tablet/Desktop/XL visual direction need owner review.
- Registered Figma nodes remain generic and do not certify L11 visuals.
- `pilot` remains mandatory until explicit human stability approval.

## Completed Evidence

- Contract, Studio metadata, docs, neutral Web and Shopify adapters validate.
- Exact same-container Exhibit/Studio parity passes with DOM hash `a5fa0acb`
  and computed-style hash `56d8b3e6` at `720px`.
- Mobile, Tablet, Desktop and XL plus `200/320/720px`, RTL, long/unbroken,
  effective 200%, text spacing, dark, forced colors and reduced motion pass.
- DOM inspection proves at most two list levels, visible flattening context,
  reaction arrays of two/one/zero items, complete names/pressed state, canonical
  Select/Pagination/Empty State/form composition and native validation.
- Controlled order, reaction, page, Reply and composer requests return truthful
  target feedback without claiming neutral persistence.
- The bounded Playwright lifecycle is closed and `evidence:assert-clean` passes;
  `site/dist` is not rebuilt.
- Full results and performance hashes are recorded in
  `docs/reports/comments-web-refinement-audit.md` and
  `output/playwright/refinement-batch-158/results.json`.
