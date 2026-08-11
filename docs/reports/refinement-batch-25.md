# Component Refinement Batch 25

Status: Rating Stars technically refined; architecture input required

Date: 2026-07-14

Components: Rating Stars

## Outcome

Rating Stars' dossier, safe semantic decision, contract, canonical CSS, shared
Exhibit/Studio renderer and fixture, Studio metadata, registry, MDX fallback,
Shopify mapping, generated adapters, browser evidence and individual audit are
reconciled. The component remains `pilot`, adds no runtime and is intentionally
not ready for human stability review because A11 Rating and V2 Star Rating still
have an unresolved identity/consolidation boundary.

`site/dist` was not rebuilt or modified. Button remains the only human-approved
stable component.

## Research And Decision

- WAI image guidance and WCAG color/non-text evidence support one named star
  image with decorative shape-distinct stars and an independent count sibling.
- APG, Open UI, Radix and Polaris provide no passive rating API consensus to
  copy; ADR 0064's narrow adapter-owned projection remains the safe boundary.
- ADR 0110 accepts the corrected passive anatomy, target ownership, typography,
  zero-runtime and cross-target semantics while explicitly deferring A11/V2
  retain-versus-consolidate input.
- Shopify now maps the official Rating object scale/value, target-local
  nearest-half sequence, localized label/plural count and ID-free star SVGs.

## Browser Evidence Summary

- Exhibit and Studio have exact serialized root markup: generic root, one image
  label, decorative full/half/empty shapes and ordinary localized count text.
- Count omission, 0/5, 3.5/5 and 5/5 probes retain truthful anatomy with zero
  focusables and no interaction or motion.
- Four canonical viewports in both views plus 160px, long Arabic/RTL, dark,
  forced colors/reduced motion and 200% zoom show no horizontal overflow.
- Light contrast is `3.56:1` filled and `7.81:1` empty/count; dark is
  `7.92:1`/`12.09:1`. Forced colors preserves solid, outline and partial form.
- Fourteen after and two before images are stored under
  `output/playwright/refinement-batch-25/`.

## Performance Budgets

| Surface | Measured gzip | Ceiling | Result |
| --- | ---: | ---: | --- |
| Primitives CSS | `10,543 B` | `10.3 KiB` | pass (`4 B` headroom) |
| Shared neutral runtime | `10,171 B` | `8 KiB` | existing exception (`1,979 B` over); Rating delta `0 B` |
| Neutral Web components CSS | `64,799 B` | `64 KiB` | pass (`737 B` headroom) |

Relative to the Batch 25 baseline, Primitives CSS adds `74 B`, complete Web
component CSS adds `80 B`, and shared runtime is unchanged. The family budget is
now effectively exhausted and is an explicit next-component risk.

## Validation

- Registry/docs, DTCG source, 183 contracts and 183 Studio definitions pass.
- Neutral Web and Shopify adapters generate/validate; canonical source CSS/JS
  remains reconciled with generated copies. Known unrelated Shopify maturity
  warnings remain non-blocking backlog.
- Structural certification, Exhibit/Studio parity, static previews and global
  refinement audits pass across all 183 components.
- TypeScript, complete Vite build into `/tmp`, browser semantic/responsive/
  special-media probes, locale parsing, deterministic gzip, diff checks and
  explicit `site/dist` cleanliness pass.

## Remaining Owner Input And Risks

1. Choose whether A11 remains the compact commerce projection and V2 the richer
   review display, or consolidate both passive components and migrate consumers.
2. If retained, approve the use-case boundary so consumers do not choose by
   registry category accident.
3. Approve the repository candidate's accent, star shapes/size/gaps, count
   hierarchy, alignment and localized wrapping, or provide visual evidence.
4. Targets must choose normalization, half-step policy, missing/zero behavior,
   aggregates, structured data, updates and review-link composition.
5. Primitives has only `4 B` gzip headroom; shared runtime retains its existing
   exception and complete Web CSS has `737 B` headroom.
6. Pin Input separately still needs the owner choice between one full-code
   native value owner and the accepted multiple-input model.

## Program Progress

The regenerated matrix shows 183 components, 105 dependency edges, 66 dossiers,
and 62 components ready for human review. Rating Stars is technically refined
but remains excluded from readiness. Only Button is human-approved. The next
dependency-safe component is Loading Skeleton (review order 67).
