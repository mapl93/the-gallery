# Empty State Web Refinement Audit

Status: Human-review-ready; remains `pilot`

Date: 2026-07-20

Decision: ADR 0236

## Outcome

Empty State is a passive, container-safe resolved-absence composition with
required native heading content, optional supporting message and decorative
icon, one optional canonical Button-or-Link action, complete semantic
typography, resilient localization, and zero neutral runtime.

The former architecture blocker is resolved. The host chooses the native
`h1`-`h6` appropriate to its page, panel, dialog, or section. Heading rank is
not a component property or Studio control. The shared docs renderer now
requires an explicit heading element, and Shopify requires a validated
adapter-only `heading_tag` instead of hardcoding H3.

The candidate is prepared for human visual/stability review but remains
`pilot`. No component is promoted to `stable`.

## Rubric Result

| Gate | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Resolved absence only; target owns cause, lifecycle, recovery truth, replacement, announcements, and focus. |
| Anatomy | pass | Required contextual native title; optional decorative icon/message; at most one canonical action. |
| States and modes | pass | One resolved-empty state, complete optional-slot matrix, H1-H6, LTR/RTL, themes, forced colors, reduced motion, narrow/zoom. |
| Public API | pass | Exactly `title`, `message`, `icon`, and `action`; no heading-level appearance property or private geometry. |
| Heading ownership | pass | ADR 0236; explicit host element in docs renderer and validated Shopify `heading_tag`. |
| Accessibility | pass | Genuine heading, decorative icon, ordinary static root, target Status for qualifying updates, no forced focus. |
| Canonical composition | pass | Link/Button own action semantics and interaction; no local action markup or runtime. |
| Responsive/content | pass | Four viewports, 200px host, long/unbroken/Arabic RTL content, and 200% zoom remain contained. |
| Runtime/assets | pass | Zero component JS, listeners, observers, timers, requests, animations, layout reads, or assets. |
| Cross-target mapping | pass | Web implemented; Shopify page/404/drawer heading contexts reconciled; future mappings documented. |
| Exhibit/Studio parity | pass | One renderer/fixture with explicit H2 produces exact initial DOM in both views. |
| Performance | pass | Empty State `1,005 B` raw / `436 B` gzip; Primitives `10,547/10,547 B`; zero runtime. |
| Human stability review | pending | Final icon, hierarchy, centered composition, spacing, measure, wrapping, and action treatment require owner approval. |

## Heading Translation Result

| Consumer | Context | Selected heading |
| --- | --- | --- |
| Empty State component page | Under docs page H1 | H2 |
| Wishlist nested empty state fixture | Inside Wishlist section/card structure | H3 |
| Empty Collection and Cart Empty docs fixtures | Under component page H1 | H2 |
| Shopify main cart empty page | Primary page title | H1 |
| Shopify 404 | Primary page title naming its section | H1 |
| Shopify cart drawer | Nested beneath H2 dialog title | H3 |

The heading element is explicit composition in every renderer/adapter path; it
does not enter `properties` or Studio metadata. Missing/unsupported Shopify tag
or blank title fails closed.

## Existing Browser Evidence

- Exact Exhibit/Studio initial markup, one required H2, decorative icon,
  paragraph, one native Link, and zero Empty State runtime.
- Title-only and no-action states omit unused parts without placeholders.
- H1 through H6 share identical computed title presentation.
- Link Enter activation and canonical focus pass.
- A 200px root, long unbroken strings, Arabic RTL mobile content, four paired
  viewports, dark, forced colors, reduced motion, and 200% zoom have no local
  overflow.
- ADR 0236 final evidence rechecks explicit heading composition, blank-title
  omission, exact paired DOM, and the absence of a Studio heading-level control.

## Source And Adapter Result

- Contract `0.4.0` records accepted host-owned contextual heading semantics and
  removes all deferral wording.
- `EmptyStateArtwork` requires explicit `titleElement: h1|h2|h3|h4|h5|h6` and
  still returns no root for blank title.
- Studio supplies H2 as page-context fixture data and exposes no heading-rank
  control. Nested artwork callers supply their own levels.
- Shopify's canonical snippet validates required `heading_tag`; main cart and
  404 pass H1, cart drawer passes H3, and Cart Empty forwards its host value.
- CSS is unchanged and remains heading-element agnostic.

## Performance And Risks

- Empty State CSS: `1,005 B` raw / `436 B` gzip-9.
- Primitives family: `10,547 / 10,547 B`, zero headroom.
- Empty State runtime/assets: `0 B`.
- Existing documented global CSS/runtime gaps remain separate program
  constraints; no budget was raised or exception hidden.
- Targets must still define truthful absence classification, which neighboring
  content/controls are removed, recovery behavior, status ownership,
  URL/history, and focus after replacement.

## Remaining Human Review

1. Approve or revise icon tone/scale, title/message hierarchy, centered layout,
   section rhythm, line measure, wrapping, and canonical action presentation.
2. Confirm the fixture is representative but not a default.
3. Preserve host-owned heading rank in every future target.
4. Do not promote to `stable` without explicit owner approval.

`site/dist` was not rebuilt or modified.
