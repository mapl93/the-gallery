# Refinement Batch 168 — Edition / Numbering Decision Reconciliation

Date: 2026-08-11

Component: R10 `edition-badge`

Result: ready for explicit human review; remains `pilot`

## Accepted Direction

Owner decision 64 confirms `R10-A`, matching ADR 0210 and the current
implementation:

- one passive target-formatted edition statement;
- optional opaque designation, identifier and edition-size strings;
- no parsing, numeric inference, scarcity, inventory, authenticity or
  provenance claim;
- strict all-blank omission and meaningful visible number/total slash;
- editorial limited emphasis rather than feedback warning;
- no automatic composition with canonical Badge.

No component source change was required.

## Existing Evidence Reused

The current R10 CSS slice is byte-identical to fully evidenced Batch 119:

`244e468e41bb7038be0fb1956428dbdb912e98729ebf33a741604abfeb2b4ea5`

Batch 119 proves native paragraph semantics, prohibited-name removal, opaque
`BDI[dir="auto"]` strings, conditional exposed slash, all partial/blank
compositions, zero focus/live/script behavior, eight paired natural viewports,
direct `120/160/240/360px` roots, localized RTL/mixed direction, unbroken text,
effective 200% text, user spacing, AA light/dark contrast, forced colors,
reduced motion, and exact normalized DOM/style parity (`333b2896` /
`de566840`). Representative captures were visually re-inspected during this
reconciliation.

## Current Performance And Resources

- R10 CSS: `2,133 B` raw / `671 B` gzip, exact Batch 119 SHA;
- Ceramics CSS: `5,349 B` gzip / `5,427 B` ceiling, `78 B` headroom;
- R10 owned runtime: zero;
- current global contract, Studio, docs, parity, component, refinement and
  performance audits pass with all overages documented.

No browser or server was opened for this source-identical reconciliation. The
pre-existing user-owned Gallery server was untouched, `site/dist` was not
rebuilt, and evidence-resource cleanliness remained passing.

## Remaining Gates

Edition/proof record meaning, localization and numeric policy, first Shopify
source/integration, final visuals, R10-specific Figma evidence and explicit
human stability approval remain pending. A future Badge may be composed only as
an explicit external target choice.

No `stable` promotion is authorized.
