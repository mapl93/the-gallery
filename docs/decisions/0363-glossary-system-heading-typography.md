# 0363. Glossary System Heading Typography

Status: Accepted

Date: 2026-09-12

## Decision

The owner reviewed the two ADR 0362 screenshots and selected option A. Ceramics
Glossary title and letter groups now explicitly consume the existing H2/H3
weights and line heights, alongside their current heading family and sizes.
Default weight changes from native 700 to H2's 600 and H3's 500. Line height follows
the existing responsive role instead of inheriting body line height.

Four existing roles join the public contract, registry and individual Studio
controls, also feeding Exhibit. No new source token or layer is needed. This
resolves the pending typography choice from ADR 0362 and applies ADR 0300.
Other glossary text and canonical Accordion/Link typography retain their owners.

## Compatibility and evidence

This is an intentional visual change: title/letter weight and line boxes change,
so following content positions can change too. Copy-and-own consumers adopt the
updated CSS explicitly. Local token overrides can retain a desired weight or
line height. Both generated targets include the CSS; Shopify glossary records
and editor behavior remain planned. Pilot maturity is unchanged.

Evidence: `docs/reports/2026-09-12-glossary-type-checkpoint.md`.
