# Hero Section Web Refinement Audit

Status: `human-review-ready-deprecated-migration`; not `stable`

Date: 2026-07-20

Component: S1 Hero Section (`hero-section`)

Contract: `components/contracts/hero-section.contract.json` (`0.4.0`,
`deprecated`)

Decision: ADR 0223

## Outcome

The previous independent S1 implementation was removed. S1 now forwards to the
canonical G1 Hero contract, `.hero` CSS, `HeroArtwork` renderer, fixture and
shared slideshow runtime. Its former layouts and capability hooks are fully
represented by G1's independent `layout`, `height` and `mediaBehavior` axes.

## Verification

| Gate | Result |
| --- | --- |
| Independent CSS | none; registry and contract point to `components/css/marketing.css` / `.hero` |
| Independent JS | none; canonical `enhanceHero` owns behavior |
| Independent renderer/fixture | none; both slugs route through `MarketingStudio` and `HeroArtwork` |
| Independent Shopify adapter | none; consumers use canonical G1 `hero.liquid` |
| Contract | `deprecated`; same semantic migration surface as G1 |
| Exhibit / Studio | shared renderer and fixture; four final viewports for both modes |
| Visual special modes | inherited canonical parallax, text-only and localized-long evidence |
| Stable promotion | forbidden for the deprecated identity |

## Before / After

- Before: S1 owned `.hero-section` source, a passive parallax hook, an
  incomplete slideshow lane, a separate renderer and unresolved G1 overlap.
- After: no duplicate markup, CSS, runtime or target adapter remains; all useful
  behavior exists once in canonical Hero.

Final evidence is under
`output/playwright/refinement-marketing/hero-0223/hero-section-*`. Canonical
interaction, accessibility, performance and target details are recorded in
`docs/reports/hero-web-refinement-audit.md`.

## Readiness

`human-review-ready-deprecated-migration`. The migration is technically
reconciled and can be reviewed as part of the G1 Hero candidate. S1 itself is
not a stability candidate and remains removable before v1 after consumer
migration review.
