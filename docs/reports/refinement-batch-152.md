# Refinement Batch 152

Date: 2026-08-10

Component: L2 Article Hero

Result: `human-review-ready`; remains `pilot`

## Decision Closure

- Added accepted ADR 0268 for owner-selected L2-A.
- Retained `full`, `split`, and `text-only` with one mandatory safe no-media
  behavior for both media-dependent modes.
- Missing media removes inverse colors, overlay assumptions, media minimum
  height, empty split tracks, and image substitution while retaining title and
  supplied metadata.
- Unsupported variant input now normalizes to full before fallback derivation.
- The root remains an unframed passive native header. Heading rank, crop/focal
  point, image loading, links, metadata order/locale, and duration stay
  target-owned.

## Evidence

- Contract `0.3.0`, registry, MDX, Studio definition, shared renderer, Shopify
  snippet, dossier, audit, ADR, and progress matrix agree.
- Exact `640px` parity: normalized DOM `c8a1c099`, selected computed styles
  `c148679a`.
- One passive `HEADER`, one contextual H2 in docs, no role/tabindex/interactive/
  live descendants, contextual alt, hidden visual overlay/separators, and
  machine-readable date/duration values.
- Split uses one column at `600px` and two equal columns at `700px`. Full and
  split no-media states omit media/overlay/empty tracks and use normal colors;
  text-only remains centered and media-independent.
- Optional category/metadata omission and blank-title fail-closed behavior pass.
- Conservative on-image title contrast measures `7.81:1` over the all-white
  image composite and `21:1` over black.
- Mobile, Tablet, Desktop, and XL in both modes; localized RTL at `200px`;
  effective `200%` text at `320px`; dark; forced colors; and reduced motion pass
  without overflow, console issues, page errors, or active motion.
- Machine-readable results and visual artifacts are in
  `output/playwright/refinement-batch-152/`.

## Performance

- L2 CSS: `5,272 B` raw / `1,123 B` gzip; neutral L2 runtime: `0 B`.
- Blog CSS remains `5,603 B` gzip against `5,529 B`, a documented `74 B` gap.
- Program audit remains 18 surfaces, 10 passing, 8 documented gaps, and zero
  undocumented gaps. No ceiling was raised.

## Resource Lifecycle

The run opened one headless `gallery-refinement` session with one page, reused
the responsive Gallery server that remained external to the managed lifecycle,
closed the owned browser, preserved the external server, and passed
`evidence:assert-clean`. No additional tab, port, server, or normal Chrome was
left behind.

## Remaining Human And Target Gates

- Human approval of full/split/text-only art direction, crop/focal point,
  text-safe area, display scale, rhythm, minimum height, scrim, no-media states,
  four viewports, and the dense 200px RTL stress presentation.
- Live target contrast against real crops and Shopify query/schema/editor/
  image/locale/SEO/analytics/empty-error evidence.
- L2-specific Figma artwork/parity remains future work; generic registered
  nodes are not approval.
- No `stable` or live-target promotion was made.
