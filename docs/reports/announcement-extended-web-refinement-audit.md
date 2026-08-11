# Announcement Extended Web Refinement Audit

Status: `human-review-ready` as a deprecated migration record

Component: G11 Announcement Extended (`announcement-extended`, review order
`94`)

Date: 2026-07-20

## Outcome

The owner chose one canonical Announcement Bar with the former G11 capabilities
merged into C2. G11 is therefore deprecated rather than certified as a second
component. It owns no independent renderer, fixture, CSS, runtime or target
adapter. Its contract, registry entry, Studio metadata and MDX page now direct
consumers to canonical C2 and ADR 0227.

This resolves ADR 0173's open identity question without preserving a duplicate
compatibility implementation. Human review is still required for the deprecation
communication and for C2's final visuals.

## Rubric

| Area | Result | Evidence |
| --- | --- | --- |
| Identity | pass | Explicit deprecated status and canonical C2 migration. |
| Anatomy/API | pass by forwarding | Former modes map to C2's exclusive mode and controlled lifecycle contract. |
| Dependencies | pass | Link, Countdown, Carousel, Icon Button and Close Button are consumed through C2. |
| Duplicate source | pass | Old Marketing CSS, keyframes, renderer and fixture were removed. |
| Exhibit/Studio parity | pass | G11 uses `GlobalStudio` and `AnnouncementArtwork`; normalized markup is identical. |
| Target translation | pass as migration | Every target consumes C2; no target publishes a new Extended adapter. |
| Automated evidence | pass | Dedicated migration captures, DOM equality, validators and adapters pass. |
| Human review | pending | Deprecated record cannot be stable. |

## Migration Map

- Countdown -> C2 `mode=countdown` with canonical G7.
- Rotating -> C2 `mode=rotating` with real Carousel slides, manual controls and
  optional controlled autoplay.
- Dismissible -> C2 `dismissible=true`, controlled `visible`, canonical Close
  Button and `announcementdismissrequest`.
- Fixed CSS cadence -> bounded `autoplayInterval`, opt-in autoplay and explicit
  Pause/Play.
- Site-only unmount -> target-controlled lifecycle, persistence and safe focus.

## Evidence

Historical G11 captures under `output/playwright/parity/marketing/` show the
former independent renderer. Final migration captures are
`output/playwright/refinement-global/announcement-bar-0227/deprecated-{exhibit,studio}-desktop.png`.

The final static root is byte-for-byte equal after whitespace normalization
across C2/G11 and Exhibit/Studio (`318` characters on every surface). Both slugs
resolve through one renderer and fixture. The browser used one tab, produced no
console error/warning and finished with all owned resources closed.

## Source And Validation

- G11 contract version `0.3.0` is `deprecated` and forwards to C2.
- Registry and Studio display the deprecated name and C2 migration.
- G11 MDX documents migration rather than an independent API.
- Web/Shopify adapters regenerate from canonical source; no G11 CSS copy exists.
- Contracts, Studio, docs, adapters, TypeScript, component/refinement audits,
  performance audit and diff checks pass subject only to documented program
  budget gaps.

## Remaining Human Review

- Confirm that G11 should disappear from future public distribution after the
  migration window.
- Confirm the deprecated naming and guidance are sufficiently clear.
- Review C2's visuals and dynamic Shopify direction in the canonical report.

G11 must not be promoted to `stable`. `site/dist` remains untouched.
