# Refinement Batch 149: U8 Wishlist Decision Reconciliation

Date: 2026-08-10

## Outcome

U8 Wishlist is `human-review-ready` and remains `pilot`. Owner decision U8-C and
ADR 0265 define a target-owned hybrid of anonymous local-device and authenticated
account records. Sign-in performs an idempotent union by exact variant identity;
local records clear only after confirmed success. Remove is a contextual command
whose authoritative list/count/empty update occurs after target confirmation.

Neutral U8 remains one labelled native list of canonical Product Cards plus
optional Empty State and adds no storage or runtime. The fixture demonstrates
two variants of one parent product, visible saved-option text, option-specific
Remove names, and a retained unavailable record.

## Browser Evidence

`output/playwright/refinement-batch-149/` contains nineteen final images and
`results.json`. The run covered paired Exhibit/Studio Mobile, Tablet, Desktop,
and XL; exact variant identity; same-parent coexistence; retained unavailability;
non-mutating Remove; keyboard and forced-color focus; resolved empty; optional
count and required title; 480px DOM/style parity; localized RTL at 200px;
effective 200-percent reflow; dark mode; and reduced motion.

The machine result has zero failures, console errors, or page errors. Normalized
DOM hashes match at `5ed91685`; selected computed-style hashes match at
`1fdb4ad2`. Every measured component, descendant, and document overflow is zero.
The run used one named headless browser session and one page, then passed the
owned-resource cleanup gate.

## Performance

U8 CSS is `1,448 B` raw / `557 B` gzip with SHA-256
`d940e994e496d1647260693fbdd9b0aacee301bde21704588dd19ac3d6633d62`.
Current Account CSS is `2,826 / 3,072 B` gzip with `246 B` headroom. U8 adds
`0 B` runtime.

## Readiness

The dossier, contract `0.4.0`, ADRs, registry, source CSS, renderer, Studio, MDX,
target mappings, audit, visual evidence, and progress override agree. Human
review still owns final aesthetics and stability; live secure hybrid persistence
and Shopify service/extension evidence remain target integration work. No
`stable` or Shopify target-ready promotion is claimed.
