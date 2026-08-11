# Refinement Batch 107 — Reading Progress

Status: Human-review-ready; remains `pilot`

Date: 2026-07-20

Component: Reading Progress (`L4`, dependency order `118`)

## Outcome

Batch 107 implements the owner-selected always-decorative article-position cue
with exclusive Controlled and Automatic sources. It removes global fixed-layer
assumptions, task-progress ambiguity, width interpolation and divergent Exhibit/
Studio reconstructions. Neutral Web now has one explicit-source measurement
service with bounded cadence and complete cleanup.

## Delivered

- Accepted ADR 0228, human-review-ready dossier/audit and resolved open-question
  ledger entry.
- Contract/Studio `0.2.0` with `mode`, conditional bounded `value`, explicit
  `targetId` and optional `scrollRootId`.
- Canonical intrinsic root/fill CSS with private transform scale, logical RTL
  origin, forced-colors mapping and no transition.
- Shared `ReadingProgressArtwork`, fixture and `BlogStudio` rendering for both
  Exhibit and Studio.
- Shared Neutral Web runtime for nested/document sources, dynamic geometry,
  invalid/unavailable omission, grouped listeners, one frame and last-instance
  cleanup.
- Regenerated Web, Webflow and Shopify copied/adapter outputs; `site/dist`
  untouched.

## Verification Summary

- Controlled clamp/invalid and Automatic top/middle/bottom pass.
- Nested and document scroll sources, dynamic content, missing target/root and
  short content pass with no stale value.
- Root remains `aria-hidden`, role-less, non-focusable, non-live and statically
  positioned; no input is intercepted.
- Exhibit and Studio normalized DOM are exactly equal (`303` characters).
- Eight paired Mobile/Tablet/Desktop/XL views have zero document, root and
  fixture overflow.
- Dark, forced colors, component RTL, reduced motion and mobile 200% evidence
  pass visual inspection.
- One headless browser, one tab and one fixed-port managed server were used. The
  final resource gate reports port 4173 free, server stopped and
  `gallery-refinement` closed.
- Contracts, Studio, TypeScript, docs, Neutral Web and Shopify adapter validators
  pass; Shopify remains `84` target-ready, `57` dedicated Liquid and `34/34`
  schema-ready.

## Budgets

| Surface | Baseline | Final | Ceiling | Result |
| --- | ---: | ---: | ---: | --- |
| Blog CSS | `5,503 B` | `5,610 B` | `5,529 B` | documented `81 B` gap; `+107 B` |
| Shared runtime | `16,079 B` | `17,569 B` | `8,192 B` | documented program gap; `+1,490 B` |
| Neutral component CSS | `69,477 B` | `69,690 B` | `65,536 B` | documented program gap; `+213 B` |

Ceilings were not raised. ADR 0228 is executable evidence for all three
overages. Automatic work exists only while connected instances require it and
adds no polling, request, asset, cookie, storage or analytics work.

## Risks And Open Questions

- Approve three-pixel thickness, accent, track treatment and real article/Header
  placement.
- Select the first Shopify article/template source and Theme Editor lifecycle.
- Decide whether automatic Table of Contents current-location tracking reuses
  the same internal measurement service.
- Reduce or explicitly accept the program-level CSS/runtime distribution gaps.

## Readiness Decision

`human-review-ready`. Semantic identity, source ownership, runtime, failure
states, accessibility, responsive behavior, target translation and Exhibit/
Studio parity are reconciled. Explicit visual review remains pending; no
`stable` promotion is authorized.
