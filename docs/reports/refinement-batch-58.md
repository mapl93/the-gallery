# Refinement Batch 58: Ceramics Care FAQ

Status: Complete for technical refinement; ready for human review; remains
`pilot`

Date: 2026-07-15

## Outcome

Batch 58 converts R14 Ceramics Care FAQ into a contextual composition of
canonical Accordion and Link. It removes inert category controls, duplicate
disclosure markup/behavior and prevented placeholder navigation; preserves
native hidden panels and reversible pointer/keyboard interaction; and keeps
records, category policy and target integrations outside the neutral wrapper.

## Evidence And Performance

- Collapsed, expanded, zero-open and multiple-open states; pointer, Enter and
  Space; real navigation; optional omission; four paired viewports; long/
  localized/unbroken/RTL content; 200% zoom; contrast; forced colors and
  reduced motion pass.
- Exhibit and Studio initial root DOM is byte-identical at `3,366` characters
  with SHA-256
  `df7c70c5237ea6468919b134a9ae61e77868f57dfb1bff489b35190f7f65db6b`.
- Ceramics CSS falls from `4,459 B` to `4,229 B`, leaving `1,198 B` below its
  family ceiling. Ceramics FAQ adds `0 B` neutral runtime.
- Neutral Web, Shopify and Webflow outputs are synchronized. Records/schema,
  category behavior and stable disclosure policy remain explicit decisions.

## Human Review Queue

1. Choose Accordion, always-visible sections or separate pages as stable mode.
2. Approve contextual measure/type/rhythm and inherited Accordion/Link visuals.
3. Confirm the four-property API and absence of category/duplicate state API.
4. Define category URL/focus/result/announcement behavior only if required.
5. Select record/CMS ownership and Shopify editor mapping.

## Validation And Program Position

Contracts, Studio, docs, temporary site build outside `site/dist`, Web/Shopify
adapters, source-copy identity, structural/parity audits, disclosure/navigation
interaction, content/special modes, deterministic budgets and diff checks pass.

After Batch 58, the program has 99 dossiers and 87 components ready for human
review. The graph has 122 declared dependency edges, maximum depth 2, no
missing dependencies and no cycles.

See `docs/reports/ceramics-faq-web-refinement-audit.md` and ADR 0143. No
stability promotion was made and `site/dist` was not rebuilt.
