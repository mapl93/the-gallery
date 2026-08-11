# Refinement Batch 155: Author Card Decision Reconciliation

Date: 2026-08-10

Component: Author Card (`L6`)

Result: `human-review-ready`; remains `pilot`

## Scope

Reconciled the existing refined implementation with owner decision 50:

- one passive singular identity with neutral host-owned semantics;
- retained `full` and `compact` presentations;
- host-owned repetition of canonical Author Cards for multiple authors;
- public email omitted by default; and
- homepage/social destinations only when explicitly supplied and approved.

## Source Result

- The `0.2.0` contract, shared renderer, Studio metadata, canonical CSS and
  Shopify snippet already implement the accepted neutral direction; no public
  API or source-code expansion was necessary.
- Exhibit and Studio continue using the same `AuthorCardArtwork`, fixture,
  Avatar and Link composition.
- The dossier, audit, ADR 0197, Shopify guidance, component page, open-question
  register and global progress matrix now distinguish accepted neutral choices
  from real consumer integration and human visual-review gates.
- L6 owns no runtime and remains `pilot`.

## Validation

- docs, registry, tokens, 183 contracts, 183 Studio definitions, 67 recorded
  owner decisions, static previews, Neutral Web adapter, Shopify adapter,
  TypeScript, temporary production build, JSON and diff checks pass;
- the global matrix reports `169/183` ready for human review;
- eight Exhibit/Studio natural viewport captures have zero root, part or
  document overflow;
- equal-width DOM/style parity matches at 620px (`71688a0c` / `ba61ec7b`);
- neutral root/name semantics, blank-name fail-close, optional omission,
  Compact DOM omission, canonical Avatar/Link composition, two native focus
  stops, fragment navigation, RTL at 200px, effective 200-percent text, text
  spacing, light/dark contrast, forced colors and reduced motion pass;
- current Link hover contrast is `16.95:1` light / `17.05:1` dark using CSS
  Color 4-safe pixel conversion;
- console/page errors are empty;
- no more than one headless browser and one tab ran at once; the pre-existing
  user server was preserved and the final resource gate is clean; and
- `site/dist` was not rebuilt.

## Performance

- L6: `1,550 B` raw / `474 B` level-9 gzip, zero runtime.
- Blog: `5,130 / 5,529 B` audit gzip, `399 B` headroom.
- Neutral CSS and shared runtime retain existing documented program gaps; this
  decision reconciliation adds no L6 source or runtime bytes.

## Evidence

- Dossier: `docs/refinement/dossiers/author-card.md`
- Audit: `docs/reports/author-card-web-refinement-audit.md`
- ADR: `docs/decisions/0197-neutral-author-identity-and-target-owned-context.md`
- Current browser evidence: `output/playwright/refinement-batch-155/`
- Original before/refinement evidence: `output/playwright/refinement-batch-106/`

Explicit human visual review remains required before `stable`.
