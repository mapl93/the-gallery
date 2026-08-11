# Component Refinement Batch 27

Status: Empty State technically refined; architecture input required

Date: 2026-07-14

Components: Empty State

## Outcome

Empty State's dossier, ADR, contract, canonical CSS, shared Exhibit/Studio
renderer and fixture, Studio metadata, registry, MDX fallback, generated
adapters, browser evidence and individual audit are reconciled. It remains
`pilot`, adds no runtime and is intentionally excluded from human-review
readiness until the owner decides who controls contextual heading rank.

`site/dist` was not rebuilt or modified. No component was promoted to `stable`;
Button remains the only human-approved stable component.

## Research And Decision

- WAI heading guidance supports contextual native ranks based on surrounding
  document structure. Status-message guidance makes dynamic no-results
  announcement a target concern, not a role placed on every static root.
- Open UI, WAI-ARIA APG and Radix define no Empty State widget. Shopify, Polaris,
  Atlassian and Carbon support content-plus-guidance composition but do not
  create a neutral lifecycle or universal heading-rank API for The Gallery.
- ADR 0112 preserves ADR 0064's required title, optional message/decorative icon,
  one canonical action slot, target lifecycle and zero runtime. It accepts the
  safe visual/technical correction and explicitly defers heading ownership.

## Browser Evidence Summary

- Exhibit and Studio produce exact shared renderer HTML: ordinary root, hidden
  icon, contextual heading fixture, paragraph and real navigation Link.
- Enter activation navigates to `/components`; focus, forced colors and the
  canonical action remain visible. Title-only and no-action compositions remove
  optional nodes and focusables cleanly.
- H1-H6 title probes retain identical semantic typography without deciding rank.
  A 200px container uses 40px inline padding rather than 96px and has no local
  overflow; long unbroken title/message and action client/scroll widths match.
- Both modes pass Mobile, Tablet, Desktop and XL. Long Arabic RTL, dark, reduced
  motion, forced colors and 200% zoom retain containment and semantics.
- Seventeen after and five before images are stored under
  `output/playwright/refinement-batch-27/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Primitives CSS | `10,472 B` | `10.3 KiB` | pass (`75 B` headroom; `-71 B` batch delta) |
| Shared neutral runtime | `10,171 B` | `8 KiB` | existing exception (`1,979 B` over); Empty State delta `0 B` |
| Neutral Web components CSS | `64,778 B` | `64 KiB` | pass (`758 B` headroom; `-21 B` batch delta) |

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; canonical source CSS/JS
  remains reconciled with generated copies. Known unrelated Shopify maturity
  warnings remain non-blocking backlog.
- Structural certification, Exhibit/Studio parity, static previews and global
  refinement audits pass across all 183 components.
- TypeScript, complete Vite build into `/tmp`, browser semantic/responsive/
  special-media probes, deterministic gzip, diff checks and explicit
  `site/dist` cleanliness pass.

## Required Architecture Input And Risks

1. Recommended: each target chooses the contextual native heading tag while the
   public `title` property remains content-only. Alternatives: add cross-target
   `headingLevel`, or make the visible title ordinary text and require external
   section labeling.
2. Shopify's cart drawer, cart page and 404 currently share fixed H3 markup and
   must be reconciled only after that choice.
3. Human review must still approve icon scale/tone, hierarchy, centered layout,
   spacing, measure, wrapping and action treatment.
4. Targets own truthful state classification, dynamic Status announcement,
   focus after destructive updates, destination/callback and replacement data.
5. Pin Input and compact-versus-rich Rating remain separate architecture blocks.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 68 dossiers
and 63 components ready for human review. Only Button is human-approved. Empty
State is refined but blocked; the next dependency-safe component is Avatar
(review order 69).
