# Component Refinement Batch 44

Status: Artist Card refined and ready for human review

Date: 2026-07-14

Components: Artist Card; canonical Badge contrast dependency correction

## Outcome

Artist Card's dossier, standards research, passive/native decision, contract,
canonical CSS, Badge composition, shared Exhibit/Studio renderer, Studio
metadata, MDX, generated adapters, browser evidence and individual audit are
reconciled. The contract remains `pilot`; no component was promoted to
`stable`.

The dependency audit also corrected Badge's dark-theme small-text contrast in
canonical Primitives CSS. No Artist Card-specific visual override was added.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Safe Refinement

- The shared candidate remains a passive native article with no pointer, hover,
  focus, event, state or runtime promise.
- Targets can use one native link or button root after choosing an activation
  boundary; enabled roots receive conditional hover/focus hooks and disabled
  buttons retain native semantics.
- Optional artist status composes Badge; duplicated label colors, type, padding
  and radius were removed from Artist Card.
- Empty portrait/Badge/metadata parts are omitted, and Studio hides Badge
  configuration when portrait is absent.
- Complete canonical typography, logical positioning, media sizing and wrapping
  remove docs-only presentation repairs.
- Decorative fixture media has truthful empty alternative text; targets own
  informative portrait sources, dimensions, loading and alt purpose.
- Generic Card is not inferred from the component name. The current flat visual
  shell remains an explicit owner decision.
- Neutral Web and Shopify consume generated canonical CSS. Shopify stays
  `css-ready` until artist data, route, editor and responsive image policy are
  accepted.
- ADR 0129 records the safe implementation and preserved open boundaries.

## Browser Evidence Summary

- Exact Exhibit/Studio initial `outerHTML` parity holds in Mobile, Tablet,
  Desktop and XL with a `280px` candidate, `3:4` portrait and zero overflow.
- The passive article has no focus stop, pointer cursor, outline or hover motion.
- Optional portrait/Badge/metadata omission produces no empty nodes.
- Synthetic native link focus/Enter/hover and disabled button behavior pass
  without becoming neutral API.
- Isolated `180/220/280/480px` hosts, `320px` reflow, unbroken localized RTL
  content, logical Badge inset, light/dark contrast, forced colors and reduced
  motion pass.
- Badge's four tones now pass small-text contrast in light and dark; the dark
  minimum is Warning at `4.58:1`.
- Eight before, eight final viewport and seven special-state images live under
  `output/playwright/refinement-batch-44/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Storytelling CSS | `4,584 B` | `4.2 KiB` | exception (`284 B` over; `+13 B` from Batch 43) |
| Primitives CSS | `10,485 B` | `10.3 KiB` | pass (approximately `62 B` headroom) |
| Shared neutral runtime | `10,492 B` | `8 KiB` | existing exception (`2,300 B` over; no Artist Card runtime) |
| Neutral Web components CSS | `66,469 B` | `64 KiB` | gap (`933 B` over; `+50 B` from Batch 43) |

All ceilings remain unchanged. The Storytelling/global/runtime overages stay
explicit program gaps; accessibility, truthful interaction and semantic
composition were not removed to manufacture a pass.

## Human Review Queue

Review portrait ratio/crop/radius, Badge inset, typography/rhythm, focus geometry
and optional native-root motion. Decide separately final passive/link/button
policy, future Card composition and Shopify artist data/editor/route/responsive
media ownership. Confirm that internal visual values and activation/media
details remain outside the v1 neutral API.

## Validation

Registry/docs, tokens, 183 contracts, 183 Studios, Neutral Web, Shopify and
copied CSS, mandatory Shopify docs/official validation, structural/static/
parity/refinement audits, browser states/preferences/reflow, all Badge contrast
variants, source/generated identity, deterministic gzip, temporary site build
outside `site/dist`, diff checks, zero-error component console and `site/dist`
cleanliness form the final gate.

## Program Progress

After regeneration the program contains 183 components, 109 dependency edges,
85 dossiers and 74 components ready for human review. Artist Card is
`human-review-ready`; it remains `pilot` and human review is pending.
Exhibition Landing Page (`F7`) is the next dependency-order candidate.
