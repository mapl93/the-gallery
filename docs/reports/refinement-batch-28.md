# Component Refinement Batch 28

Status: Avatar technically refined; architecture input required

Date: 2026-07-14

Components: Avatar

## Outcome

Avatar's dossier, safe semantic decision, contract, canonical CSS, shared
Exhibit/Studio renderer and fixture, Studio metadata, registry, MDX fallback,
Shopify context, generated adapters, browser evidence and individual audit are
reconciled. The component remains `pilot`, adds no runtime and is intentionally
not ready for human stability review because fallback/image mapping and initials
typography scaling remain unresolved.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Research And Decision

- WAI image guidance makes alternative text contextual: standalone identity
  needs an equivalent name, while an avatar beside the same visible name should
  be null-alt or hidden. APG defines no Avatar widget or keyboard model.
- Radix and current Shopify Polaris both expose image/fallback anatomy and
  discrete sizes, but their framework runtimes, APIs, color policies and size
  sets differ. They are evidence, not a neutral contract to copy.
- ADR 0113 preserves ADR 0064's one-property, explicit-composition, zero-runtime
  boundary; accepts logical/no-shrink geometry, native image normalization,
  tokenized weight, contextual naming and forced-color correction; and explicitly
  defers fallback/image API and initials type scaling.
- Shopify Testimonials now uses null alt because the visible adjacent author name
  already supplies identity. No missing-image fallback is inferred.

## Browser Evidence Summary

- Exhibit and Studio have exact serialized standalone initials markup, zero
  focusables, no animation and no neutral runtime.
- Four sizes remain exact 32/40/56/80px squares. Inline prose computes to
  `inline-flex`; an 80px Avatar does not shrink inside a 120px row.
- A 1800x2700 portrait fills exact 80px/56px circles with block-level centered
  cover crop. Standalone/adjacent image and initials semantics match context.
- Latin, accented, Arabic/RTL, CJK and emoji graphemes remain contained. Invalid
  long initials clip without document overflow.
- Canonical Link composition retains focus and Enter activation. Light/dark
  contrast is 7.17:1/10.21:1; forced colors preserves a system-color boundary;
  200% zoom doubles the visual square without page overflow.
- Sixteen after and four before images are stored under
  `output/playwright/refinement-batch-28/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Primitives CSS | `10,495 B` | `10.3 KiB` | pass (`52 B` headroom; `+23 B` batch delta) |
| Shared neutral runtime | `10,171 B` | `8 KiB` | existing exception (`1,979 B` over); Avatar delta `0 B` |
| Neutral Web components CSS | `64,808 B` | `64 KiB` | pass (`728 B` headroom; `+30 B` batch delta) |

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass;
  static-preview coverage increases to 252 examples.
- Neutral Web and Shopify adapters generate/validate; canonical source CSS/JS
  remains reconciled with generated copies. Known unrelated Shopify maturity
  warnings remain non-blocking backlog.
- Structural certification, Exhibit/Studio parity, static previews and global
  refinement audits pass across all 183 components.
- TypeScript, complete Vite build into `/tmp`, browser semantic/responsive/
  special-media probes, locale parsing, deterministic gzip, diff checks and
  explicit `site/dist` cleanliness pass.

## Required Architecture Input And Risks

1. Recommended: keep image/initials explicit in neutral source and let each
   target own loading/failure fallback. Alternatives: formal Image/Fallback
   parts or public content mode plus lifecycle.
2. Recommended: define a discrete semantic initials type step for each accepted
   size. Alternatives: one fixed explicit type size or consumer ownership.
3. Human review must approve the four diameters, circle, neutral colors, crop,
   weight, future type scale and imagery.
4. Targets own native source selection, focal point, CDN transforms, localized
   initial derivation, failure, duplicate-name prevention, interaction and
   status semantics.
5. Empty State, compact-versus-rich Rating and Pin Input remain separate
   architecture blocks.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 69 dossiers
and 63 components ready for human review. Avatar is refined but blocked; only
Button is human-approved. The next dependency-safe component is Product Gallery
(review order 70).
