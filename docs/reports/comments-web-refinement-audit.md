# Comment Section Web Refinement Audit

Date: 2026-08-11

Batch: 158

Component: L11 `comments`

Status: ready for explicit human review; remains `pilot`

## Outcome

Comment Section now implements the owner-approved finite discussion model from
decision 53 and ADR 0200. It exposes one named discussion, no more than two
visible reply levels, visible reply-to context for deeper provider records,
optional verified ordering, finite Pagination, configurable per-comment
reaction arrays, a resolved Empty State and an optional target-owned composer.

Exhibit and Studio consume the same renderer, fixture and canonical component
composition. The neutral component remains independent of React and provider
lifecycles; Shopify has a target-native flat article-comments section and
honestly omits replies and reactions that its native data model cannot prove.
No stability promotion is authorized by this audit.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Finite authored discussion composition; not a Feed, provider, auth service, sanitizer, moderation queue, reaction database, cache or notification system. |
| Anatomy and composition | pass | Named `section`, native ordered thread/reply lists, named comment `article` records, canonical Avatar, Button, Toggle, Select, Pagination, Textarea and Empty State. |
| Required and optional parts | pass | Blank title or missing discussion omits the root; count, order, reactions, Pagination and composer are independently optional within the accepted constraints. |
| Depth and record order | pass | Provider depth three is flattened into the second visible level in authoritative order with localized immediate-parent context. |
| Reactions | pass | Zero, one or many ordered standalone Toggle records; complete names, optional icon/count, selected/disabled state and target-returned complete arrays. |
| Empty, order and pagination | pass | Resolved zero composes canonical Empty State; native canonical Select requests verified ordering; canonical finite numbered Pagination replaces the record window. |
| Accessibility | pass | Native landmarks/lists/articles/time/form, complete repeated-action names, native validation, visible focus, AA contrast, forced-colors focus and no inappropriate Feed/live region. |
| Responsive and content resilience | pass | Mobile, Tablet, Desktop, XL, direct `200/320/720px`, RTL, localized long/unbroken text, effective 200% and user text spacing all contain without overflow. |
| Runtime and performance | pass for L11/Blog | Zero neutral L11 runtime/assets; Blog CSS is `5,439 B` gzip against its `5,529 B` family ceiling. |
| Exhibit/Studio parity | pass | Exact DOM hash `a5fa0acb` and computed-style hash `56d8b3e6` at the same `720px` test width before special-mode capture correction. |
| Shopify | structurally target-ready | Published flat `article.comments`, native `new_comment`, localized fields/status, canonical Empty State and shared Pagination; live theme/form proof remains. |
| Human review | required | Final visual rhythm, Avatar scale, indentation, density, reaction treatment and target-specific live behavior still require explicit review. |

## Accepted Product Contract

- The rendered discussion has at most two visible levels. A provider descendant
  below level two remains in the second list and receives a visible localized
  `Replying to …` label naming its immediate parent.
- Reply appears only when a target can provide authenticated composer,
  permissions and moderation behavior. Flat targets may omit it.
- A resolved valid zero-record discussion uses canonical Empty State. Loading,
  provider failure, moderation lock and unavailable are separate target states.
- Oldest first is the default. An optional canonical Select requests another
  verified order; neutral code never reorders partial local records.
- Long discussions use canonical finite numbered Pagination. Infinite loading
  and APG Feed semantics are outside v1.
- Every comment receives an ordered reaction array containing zero, one or many
  records. Each record has a stable id, complete localized accessible label,
  optional icon/count, selected state and availability.
- Reactions are standalone canonical Toggle buttons. A target may preserve
  independent selections or enforce mutual exclusion when it returns the full
  array; the root has no artificial `single | multiple` mode.

## Anatomy, API And Ownership

| Property | Requirement | Meaning |
| --- | --- | --- |
| `title` | required string | Visible localized discussion name; blank fails closed. |
| `count` | optional string | Target-formatted authoritative supporting text, never a neutral live count. |
| `orderControl` | optional slot | Canonical Select for a target-verified record order. |
| `thread` | required slot | Native ordered records or canonical resolved Empty State. |
| `pagination` | optional slot | Canonical finite numbered page navigation. |
| `composer` | optional slot | Target-owned named native form using canonical controls. |

The root has no controlled/uncontrolled value. Child and target state owns the
complete reaction arrays, selected order, current page/destinations, draft,
validation, submission, pending/result state and focus/announcement policy.
Provider ids, timestamps, depth, vocabulary, auth, moderation, page totals,
heading rank, Avatar size, indentation, spacing, border and measure are not root
properties.

## Browser Evidence

Evidence directory: `output/playwright/refinement-batch-158/`

- one headless Playwright session named `gallery-refinement`, one tab and
  sequential Exhibit/Studio navigation;
- eight natural captures across Mobile, Tablet, Desktop and XL;
- exact same-container parity: DOM `a5fa0acb`, style `56d8b3e6`, `8,358`
  serialized characters and identical `720px` roots;
- one native section and heading, one top-level list, one reply list, three
  named articles, three native times, maximum list depth two and no Feed role;
- visible `Replying to Marina Paz` context for the flattened third-level source
  record;
- reaction arrays of two, one and zero items; three standalone Toggle buttons,
  no Toggle Group, correct `aria-pressed` and complete comment-specific names;
- verified Select request, independent Toggle update with complete-array target
  feedback, page request, Reply request and composer validation/result feedback;
- 12 expected focus targets with visible `2–4px` outlines;
- blank title and missing thread each produce zero roots;
- resolved Empty State has one canonical root and no live region;
- zero root, part or document overflow at natural and direct widths, RTL/long/
  unbroken content, effective 200% and user text spacing;
- light contrast: heading/author `17.93:1`, body/unpressed `7.81:1`, pressed
  reaction `10.37:1`;
- dark contrast: heading/author `17.18:1`, body/unpressed `12.09:1`, pressed
  reaction `17.93:1`;
- forced colors retains a solid `2px` reaction focus outline and reduced motion
  reports no active motion;
- zero console issues and page errors.

The special dark capture was corrected to a `480px` root so the evidence width
fits Studio's canvas; this changes only the evidence procedure. The bounded
lifecycle ends with the managed server stopped, Playwright closed, port 4173
free and `evidence:assert-clean` passing. No ordinary Chrome process is used.

## Tokens, CSS And Runtime

L11 adds no public Comment-specific tokens. It composes existing semantic
border/text/type/layout tokens and lets canonical children own their public
token contracts. `18rem` is a private order-control maximum and `1em` is private
icon geometry. Reply indentation uses logical, container-relative composition.

Current measured artifacts:

| Surface | Raw | Gzip | Ceiling/result |
| --- | ---: | ---: | --- |
| L11 CSS slice | `5,073 B` | `1,215 B` | observation; no independent public bundle |
| Blog CSS | `30,741 B` | `5,439 B` | pass; `90 B` below `5,529 B` |
| Neutral Web component CSS | `536,847 B` | `72,913 B` | documented global program gap versus `65,536 B` |
| Shared neutral runtime | `117,741 B` | `23,003 B` | documented global program gap versus `8,192 B`; L11 adds zero runtime |
| L11 listeners/observers/timers/requests/assets | `0` | `0` | pass |

SHA-256:

- L11 slice: `2699d6e23e1fe0f1c067b3e811df7042718e1666921e7c402f0920764733ece6`
- Blog CSS: `1c549a05a2849e29ffd1b3c3531f4e62b44f7a3f26339fa0c8ada96876fb6457`
- Neutral Web component CSS: `32d498e400d20e1717561773e3a323ac264f62ed497abe020ac9e3e18979a854`
- shared runtime: `0b994eebb186dba2b4b3d875515c03b3e8000235811de73cea1630124fcd619b`

Shopify and Webflow Blog CSS are regenerated from canonical source and checked
for byte identity after the final component build.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented with native HTML, canonical children, intrinsic Blog CSS and zero L11 lifecycle runtime. |
| Shopify | Addable article-only section using published native records, canonical Empty State/shared Pagination and `new_comment`; flat source omits unprovable replies/reactions. |
| Webflow | Canonical Blog CSS projection; CMS, identity, moderation and mutation remain external. |
| React/Angular | Thin structural renderer receives authoritative records/slots; application services own data and lifecycle. |
| Figma | Model two levels, optional toolbar/reactions/Pagination/composer and resolved empty; current registered nodes are traceability, not approval. |
| SwiftUI/Compose/future | Use target-native grouping/list/form/state controls while preserving flattening and ownership boundaries. |

## Validation

Final gates include contracts, Studio metadata, docs, TypeScript, component
preview audit, Web and Shopify adapter validation, isolated Vite build,
component structural audit, refinement readiness/performance audits, Git
whitespace checks and resource cleanup. Generated `site/dist` is not rebuilt.

## Remaining Human And Target Gates

- final section measure, vertical rhythm, Avatar scale, reply inset, composer
  density, reaction appearance and four-viewport visual approval;
- first live Shopify article-template installation, Theme Editor behavior and
  moderated/unmoderated form round trip;
- production provider proof for authentication, privacy, sanitization,
  permissions, moderation, abuse, edit/delete/report, reaction reconciliation,
  insertion, focus and announcements;
- component-specific Figma evidence or explicit approval of the repository
  implementation.

L11 is ready for human stability review, not `stable`.
