# Refinement Batch 167 — Maker's Mark Certification

Date: 2026-08-11

Component: R9 `makers-mark`

Result: ready for explicit human review; remains `pilot`

## Accepted Direction

Owner decision 63 preserves Maker's Mark as passive maker attribution and adds
one optional canonical Link on the complete visible identity. A blank `artist`
omits the complete root. A blank `href` leaves ordinary visible identity text.
Stamp, studio, year, and the root remain passive. The target owns maker records,
destinations, rights, relationships, profile lifecycle, and substantiated
authenticity or provenance claims.

## Implemented Change

- added canonical Link as the only dependency;
- added optional `href` to contract, Studio, shared fixture, renderer, registry,
  MDX, and target documentation;
- preserved strict artist omission and contextual stamp semantics;
- kept the target-agnostic layer free of React, Shopify, Figma, or router logic;
- retained one shared Exhibit/Studio renderer and fixture.

## Evidence

Batch 167 verifies eight natural Exhibit/Studio captures, one-tab native Link
activation, progressive href omission, required-artist failure, direct
`160/240/320/420px` roots, RTL, 200% text, user spacing, AA light/dark contrast,
forced-color focus, zero reduced-motion activity, zero console/page errors, and
exact normalized DOM/style parity (`b46b7e17` / `a7ca058e`).

R9 CSS is `2,025 B` raw / `647 B` gzip level 9. Ceramics CSS is `5,349 B`
against its `5,427 B` ceiling, leaving `78 B`. R9 owns zero neutral runtime.

One headless `gallery-refinement` session and one tab reused a pre-existing
user-owned server. The session closed, the server was preserved, and the clean
resource gate passed. `site/dist` was not rebuilt.

## Remaining Gates

Record semantics, multi-maker policy, real stamp rights/alternatives,
authenticity/provenance protocol, first Shopify consumer, final visuals,
R9-specific Figma evidence, and explicit human stability review remain pending.

No `stable` promotion is authorized.
