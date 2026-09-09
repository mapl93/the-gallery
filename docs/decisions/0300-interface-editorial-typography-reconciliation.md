# 0300. Interface And Editorial Typography Reconciliation

Status: Accepted

Date: 2026-09-08

## Context

Audit finding 3 identified missing Display/H1–H3 weights and a Web/Shopify
family mismatch. ADR 0277 already establishes the UI/editorial boundary. The
owner approved implementing that existing direction in the base system.

## Decision

- `typography.h1/h2/h3.family` reference the sans/UI primitive. The public heading
  alias resolves through H1. Existing component consumers inherit this correction.
- Display retains its explicitly editorial serif source role. Its utility now
  applies the source family and weight; H1–H3 apply their role family and weight.
- Body Large/Default/Small and Caption utilities apply source family, weight and
  line height, so unrelated ancestor styling does not override their role.
- `typography.article.body.family` references the serif/editorial primitive,
  matching the existing Shopify editor binding. `.prose` applies that family.
- Prose headings, Article Hero title and Article Body drop cap explicitly use
  the article family. Blog navigation, cards, commerce and controls keep UI
  headings. `.prose-excluded` preserves UI component typography inside prose.
- Keep existing size, weight and viewport values. No new token layer, font,
  mode or platform is introduced. Source family values change deliberately;
  historical exports and retained legacy target outputs are not authoritative.

## Verification and compatibility

Rebuild Web and the generated Shopify wrapper/assets from canonical source.
Check computed family/weight at mobile and desktop, editorial/UI boundaries,
brand-family overrides and real forms. This corrects the identified mappings;
it does not certify every component's aesthetic or promote component maturity.
