# Refinement Batch 158 — Comment Section

Date: 2026-08-11

Component: L11 `comments`

Result: ready for explicit human review; remains `pilot`

## Decision Reconciliation

Owner decision 53 and ADR 0200 now define one finite, target-owned discussion:
at most two visible reply levels, deeper records flattened with immediate-parent
context, oldest-first by default, optional verified Select ordering, finite
Pagination, resolved canonical Empty State, authenticated target-owned Reply and
configurable ordered reaction arrays rendered as standalone Toggles.

The target returns complete reaction arrays and may implement independent or
mutually exclusive policy. Empty arrays omit reactions. The neutral root does
not expose a redundant single/multiple mode and does not own provider data,
identity, sanitization, moderation, persistence, count, page or form lifecycle.

## Implementation And Targets

- Exhibit and Studio share `CommentSectionArtwork` and one fixture.
- Provider depth three renders as only two visible list levels with localized
  `Replying to Marina Paz` context.
- Canonical Avatar, Button, Toggle, Select, Pagination, Textarea and Empty State
  are composed without duplicating their behavior.
- CSS is intrinsic, logical and container-relative; L11 adds zero neutral
  runtime, assets, listeners, observers, timers or requests.
- Shopify adds an article-only native comments section using published flat
  records, `new_comment`, localized status/form fields, canonical Empty State
  and a shared Pagination snippet also consumed by Main Collection. Native
  Shopify data cannot prove replies or reactions, so both are omitted.

## Evidence And Performance

`output/playwright/refinement-batch-158/` contains eight natural paired captures
and special keyboard, RTL/extreme, effective-200%, text-spacing, resolved-empty,
dark/reduced-motion and forced-colors evidence. Exact parity hashes are
`a5fa0acb` for DOM and `56d8b3e6` for computed style. All measured states have
zero overflow, repeated controls have complete names, native validation/focus
passes, contrast exceeds AA and there are no console/page errors.

Blog CSS is `30,741 B` raw / `5,439 B` gzip, leaving `90 B` under its
`5,529 B` family ceiling. The L11 slice is `5,073 B` raw / `1,215 B` gzip and
adds zero neutral runtime. Global Web CSS/runtime gaps remain documented program
work and are not hidden by this batch.

The single Playwright session and managed server are closed, port 4173 is free,
resource cleanup passes and `site/dist` remains untouched.

## Remaining Gates

- explicit owner review of rhythm, measure, Avatar/reply/reaction treatment,
  composer density and four-viewport visuals;
- first live Shopify article-template, Theme Editor and form-round-trip proof;
- production target proof for authentication, privacy, sanitization,
  permissions, moderation, abuse, reconciliation, insertion, focus and status;
- component-specific design evidence or approval of the repository render.

No `stable` promotion is authorized.
