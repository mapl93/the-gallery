# Refinement Batch 165 — Workshop Listing Decision Reconciliation

Date: 2026-08-11

Component: R7 `workshop-listing`

Result: ready for explicit human review; remains `pilot`

## Accepted Direction

Owner decision 61 confirms the existing ADR 0207 implementation:

- R7 is discovery-only and never books, reserves, waitlists, authenticates or
  takes payment;
- registration/details use a complete real Link to a separately certified
  target flow;
- each native article may present target-formatted schedule, media,
  level/format and description;
- optional canonical Price and passive Badge render only from current
  target-owned money/capacity facts;
- Full status does not disable independently useful details navigation;
- the event source owns recurrence, timezone, capacity and freshness.

No component source change was required.

## Existing Evidence Reused

The current R7 CSS slice is byte-identical to the fully evidenced Batch 116
slice:

`382fb6c7374ce2e69182d93c7e969b9b13e47b1c3dca5da1b9759689499d2fd5`

Batch 116 already proves native `ul > li > article` anatomy, canonical Card /
Price / Badge / Button composition, truthful `time`, descriptive real links,
Full-link keyboard activation, strict omission, one/media-absent cases, eight
paired natural viewports, direct `180/320/520/720px` roots, localized and
`220px` RTL/extreme content, effective 200% text, user spacing, AA light/dark
contrast, forced colors, reduced motion, exact normalized DOM/style parity,
source-identical target CSS and zero neutral R7 runtime. Representative captures
were visually re-inspected during reconciliation.

## Current Targets And Performance

- R7 CSS: `2,339 B` raw / `729 B` gzip, exact Batch 116 SHA;
- Ceramics CSS: `36,881 B` raw / `5,345 B` gzip against `5,427 B`, leaving
  `82 B` headroom;
- R7 runtime/listeners/observers/timers/requests: zero;
- Webflow and Shopify Ceramics CSS: source-identical;
- current global contract, Studio, docs, parity, adapter and component audits
  pass.

No browser or server was opened for this source-identical decision
reconciliation. The pre-existing user-owned Gallery server was not touched,
`site/dist` is unchanged and resource cleanliness remains passing.

## Remaining Gates

- production event records, provenance, recurrence/timezone/cancellation and
  freshness proof;
- money, capacity and availability claims;
- separately certified registration/booking flow;
- first Shopify consumer/editor integration;
- final visual review and R7-specific design evidence;
- explicit human stability approval.

No `stable` promotion is authorized.
