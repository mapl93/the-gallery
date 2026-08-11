# Workshop Listing Web Refinement Audit

Date: 2026-07-18

Batch: 116

Component: R7 `workshop-listing`

Status: ready for explicit human review; remains `pilot`

## Outcome

Workshop Listing is now a passive target-authored collection of independently
complete workshop summaries. It does not prescribe an event/CMS record,
recurrence model, capacity service or booking workflow. Native list, article,
heading, time and link semantics provide the neutral Web structure; canonical
Card, Price, Badge and Button provide the shared design-system composition.

Exhibit and Studio consume one renderer and fixture. Full availability remains
visible as passive status and does not disable an independently useful details
destination. Empty/invalid collections fail closed, optional content omits
without shells, and R7 adds no neutral runtime.

Owner decision 61 accepts this discovery-only direction. Record ownership,
schedule/localization, money/capacity freshness, the separately certified
registration flow, Shopify, final visuals, component-specific Figma evidence
and explicit stability approval remain production/human gates. The contract
stays `pilot`.

## Certification Summary

| Area | Result | Evidence |
| --- | --- | --- |
| Purpose and limits | pass | Discovery summaries only; no universal workshop or booking model. |
| Anatomy and composition | pass | Native `ul > li > article`; canonical Card, Price, Badge and Button descendants. |
| Required/optional content | pass | Stable unique identity and title required; invalid records and empty roots omit. |
| States and modes | pass for passive scope | Default/Limited/Full, one/many, media present/absent, narrow/wide, themes and special colors. |
| Accessibility | pass | Article-heading association, valid time values, descriptive native anchors, visible status, AA contrast and canonical focus. |
| Responsive/content resilience | pass | Eight natural captures plus direct widths, localized/RTL/extreme text, 200% text and spacing with zero overflow. |
| Runtime/performance | pass for R7/Ceramics | Zero R7 runtime; shared runtime unchanged; Ceramics retains `524 B` gzip headroom. |
| Exhibit/Studio parity | pass | Shared renderer/fixture and exact normalized DOM/style hashes. |
| Targets | Web implemented; others bounded | Web/Webflow/Shopify CSS projections validate; no target data or booking architecture invented. |
| Human review | required | Semantic direction is accepted; production sources, targets, final visuals and explicit stability approval remain pending. |

## Anatomy, API And Behavior

The `0.2.0` contract exposes one semantic property:

| Property | Requirement | Meaning |
| --- | --- | --- |
| `workshops` | required non-empty slot | Ordered target-owned workshop-card composition using canonical parts. |

The verified root is a native `UL` with two direct `LI` records. Each item has
one direct `ARTICLE.card` named through `aria-labelledby` by its visible `H2`.
Optional media uses canonical `card__media`; body and footer use canonical Card
anatomy. Price contains a direction-isolating `BDI`, availability is a passive
canonical Badge, and details navigation is a native anchor with canonical
Button classes.

The renderer trims values, rejects records without stable identity/title,
rejects later duplicate identities and omits the complete root when no valid
records remain. Media, schedule, level/format, description, price, availability
and action omit independently. A footer renders only when it has content.

The public contract does not expose columns, density, media ratio, crop,
heading rank, schedule fields, time zone, locale, currency, capacity threshold,
status polling, action callbacks or booking state. Those are either private
composition or target/domain facts.

## Schedule, Availability And Action Semantics

The fixture verifies complete localized schedule labels paired with valid
machine values:

- `2026-08-15T14:00:00-03:00` for Saturday 15 August at 14:00 ART;
- `2026-08-23T10:30:00-03:00` for Sunday 23 August at 10:30 ART.

Without machine data, schedule remains ordinary truthful text. R7 never
calculates occurrences, recurrence, time zones, cancellation or localization.

Limited and Full are complete passive labels composed through Warning and Error
Badges. Neither is a live region. The Full record retains a real details link;
the verified link is not disabled, receives focus and activates once with
Enter. Reservation availability and booking-action availability remain separate
target decisions.

## Accessibility

The collection has no fabricated grid/widget role, roving focus, selection
model or whole-card interactive wrapper. Articles are named by visible headings;
images have explicit context-appropriate alternatives and intrinsic dimensions;
repeated “View workshop” links include the workshop title in their accessible
names.

Measured contrast after refinement:

| Content | Light | Dark |
| --- | ---: | ---: |
| Schedule | `4.94:1` | `9.21:1` |
| Title | `17.93:1` | `17.18:1` |
| Description | `7.81:1` | `12.09:1` |
| Price | `17.93:1` | `17.18:1` |
| Availability Badge | `13.64:1` | `4.58:1` |
| Details action | `17.93:1` | `17.93:1` |

The original accent schedule measured `3.56:1` on white. A component-private
mix of existing accent and primary text now preserves the editorial cue while
meeting AA without adding public API. Forced colors preserves Card/footer
boundaries, Badge outline and the focused action outline. Reduced-motion
inspection finds zero active motion parts.

## Responsive And Extreme Content

Natural Mobile, Tablet, Desktop and XL captures pass in Exhibit and Studio.
Mobile stacks two records; wider available containers resolve to two intrinsic
tracks. Direct-root results are:

| Root | Columns | Height | Overflow |
| ---: | ---: | ---: | ---: |
| `180px` | 1 | `1,570px` | 0 |
| `320px` | 1 | `1,229px` | 0 |
| `520px` | 2 | `629px` | 0 |
| `720px` | 2 | `620px` | 0 |

One card at `320px`, media absent at `240px`, localized dense content at
`320px`, mixed RTL/unbroken content at `220px`, effective 200% text at `360px`
and user text spacing at `320px` all preserve zero root, visible-part and
document overflow. Source order and complete text remain intact.

## Tokens, CSS And Canonical Composition

R7 directly consumes 15 existing public token references for subtle border,
media fallback, accent/primary/secondary text, heading/body-small typography
and layout spacing. Card minimum track, media ratio, compact gap and accessible
schedule-color mix remain private composition.

The source uses native list resets, logical geometry, intrinsic
`auto-fit/minmax`, aspect ratio, `min-inline-size: 0` and deliberate wrapping.
It removes the former fixed media height, duplicated Card surface/hover/motion,
local price/status styles, physical layout declarations and Studio-only R7
grid/media/breakpoint overrides.

`BadgeArtwork` is now the shared canonical docs renderer consumed by both Badge
and Workshop Listing; `PriceArtwork` and native Button classes complete the
dependency chain. React types and sample records stay in the docs consumer, not
the target-agnostic contract.

## Exhibit And Studio Parity

`WorkshopListingArtwork` and `buildWorkshopListingFixture` are the only
registered Exhibit/Studio path. Eight paired natural captures contain the same
two titles, statuses, links and zero overflow.

With the same `720px` host and public tokens, both modes produce:

- DOM hash `f3132ac0`;
- style hash `55a8c8b2`;
- two `348px` cards;
- two grid tracks and zero overflow.

## Cross-Target Translation

| Target | Result / boundary |
| --- | --- |
| Neutral Web | Implemented with native list/articles/time/links, canonical dependencies, intrinsic logical response and zero R7 JavaScript. |
| Shopify | CSS projection validates. Liquid/schema remains planned until workshop data, schedules, money/capacity, destinations, booking and first consumer are approved. |
| Webflow | Source-identical Ceramics CSS; CMS supplies ordered complete records and real destinations. |
| React/Angular | Thin record/children projection; canonical descendants retain native semantics and target workflows own state. |
| Figma | Future component models one/many, sparse/dense, media present/absent, Available/Limited/Full and narrow/wide; current generic nodes are not R7 approval. |
| SwiftUI/Compose/future | Use native list/card/date/text/link patterns and keep capacity/booking services outside the visual component. |

No target workshop schema, metaobject, recurrence engine, money formatter,
capacity service, polling, announcement or booking adapter was invented.

## Automated And Browser Verification

Final browser evidence covers shared structure, strict omission, canonical
ancestry, valid time values, descriptive links, Full-link keyboard activation,
four paired natural viewports, intrinsic widths, optional media, localized/RTL/
extreme content, effective 200% text, user spacing, contrast, dark, forced
colors, reduced motion and exact normalized parity. Console issues and page
errors are empty.

Final structural/build gates include:

- `npm run validate:contracts` (`183` contracts)
- `npm run validate:studio` (`183` definitions)
- `npm run validate:docs` (`183` registry components and MDX pages)
- `npm run audit:previews:static` (`255` previews, zero errors)
- `npm run build:components`
- `npm run build:adapter:web:components` (`183` components, `19` CSS sources)
- `npm run build:adapter:shopify:components` (`183` components, `83`
  target-ready; known maturity warnings only)
- production Vite build outside `site/dist` (`2,478` modules)
- `npm run audit:exhibit-studio` (`183/183` shared paths and complete
  interaction classification)
- `npm run audit:components` (`183/183` automated passes)
- owner-decision reconciliation audit (`179/183` ready for human review after
  R7)
- source-identical Webflow and Shopify Ceramics CSS projections
- `npm run evidence:cleanup` and `npm run evidence:assert-clean`

Evidence lives under `output/playwright/refinement-batch-116/`: four preserved
before captures, eight final natural captures, nine final special captures,
executable probes and `evidence-summary.json`.

On 2026-08-11, owner decision 61 was reconciled without changing source. The
current R7 CSS slice is byte-identical to the evidenced Batch 116 slice;
representative Mobile/Desktop and special-mode captures were re-inspected, and
current contract, Studio, docs, shared-renderer, adapter, component and
refinement audits pass. The existing complete browser matrix therefore remains
the applicable visual evidence.

The final evidence phase used one fixed-port managed server and one ephemeral
headless Chromium process with one context/page. All modes and probes ran
sequentially; the browser closed in `finally`. Normal Chrome and parallel
servers/browsers were never used. Cleanup confirms the URL is unresponsive,
port 4173 is free, the managed server is stopped and the evidence gate is clean.

No command wrote `site/dist`.

## Performance Budget

The R7 slice remains byte-identical to Batch 116 at `2,339 B` raw / `729 B`
gzip, SHA-256
`382fb6c7374ce2e69182d93c7e969b9b13e47b1c3dca5da1b9759689499d2fd5`.
Current Ceramics CSS is `36,881 B` raw / `5,345 B` gzip, leaving `82 B` under
its fixed `5,427 B` ceiling. Neutral Web component CSS is `540,123 B` raw /
`72,660 B` gzip and shared runtime is `117,741 B` raw / `22,807 B` gzip; those
are previously documented global gaps, while R7 itself adds zero neutral
JavaScript.

## Risks And Required Human Decisions

1. Approve the record owner, schema, stable IDs, inventory, recurrence,
   cancellation, instructors, venues, languages, access needs and editorial
   review workflow.
2. Approve schedule/time-zone/daylight-saving/localization ownership and stale
   or cancelled occurrence behavior.
3. Approve price/tax/fee/deposit/refund formatting, capacity thresholds,
   freshness, waitlist/full policy and commercial claims.
4. Decide whether R7 remains discovery-only or which separately certified flow
   owns registration, authentication, reservation locks, payment, errors and
   confirmation.
5. Approve the first Shopify consumer, resource/metaobject, dynamic sources,
   Liquid/block schema, editor validation, localization and booking integration.
6. Approve final card density, crop, hierarchy, action prominence, canonical
   elevation/hover and responsive threshold against R7-specific Figma evidence.
7. Perform explicit human stability review. Automated completion does not
   authorize promotion from `pilot` to `stable`.
