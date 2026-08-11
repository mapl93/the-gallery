# Refinement Batch 148: U7 Address Form Certification

Date: 2026-08-10

## Outcome

U7 Address Form is `human-review-ready` and remains `pilot`. Owner decision U7-A
and ADR 0264 reconcile it as one canonical Form specialization. Required
`fields` and optional `actions` remain its only properties. Submit is explicit;
Cancel requests target navigation or closure and never resets implicitly.

Exhibit and Studio now use the same `AddressFormArtwork`, fixture state,
canonical Form/Input/Select/Button composition, DOM, CSS, and behavior. Shopify
v1 uses hosted Profile/Addresses as an intentional native handoff; headless and
separately versioned classic profiles remain distinct target work.

## Browser Evidence

`output/playwright/refinement-batch-148/` contains eighteen final images and
`results.json`. The run covered paired Exhibit/Studio Mobile, Tablet, Desktop,
and XL; native required validation and first-invalid focus; explicit submission;
Select change without auto-submit; non-reset Cancel with draft preservation;
optional action omission; 480px DOM/computed-style parity; localized RTL at
200px; effective 200-percent reflow; dark mode; forced colors; and reduced
motion.

The machine result has zero failures, console errors, or page errors. Normalized
DOM hashes match at `4cb62358`; selected computed-style hashes match at
`2e0d12b3`. Every measured component, descendant, and document overflow is zero.
The run used one named headless browser session and one page, then passed the
owned-resource cleanup gate.

## Performance

U7 CSS is `811 B` raw / `318 B` gzip with SHA-256
`006cd3f1b45428d2a066042802cf1c07349b1ed977b266616760ccfcb7016ffe`.
The current Account family is `2,826 / 3,072 B` gzip with `246 B` headroom.
U7 adds `0 B` runtime.

## Readiness

The dossier, contract `0.3.0`, ADR, registry, source CSS, renderer, Studio, MDX,
target mappings, audit, visual evidence, and global progress override agree.
Human review still owns final aesthetics and stability approval; live localized
protected-mutation evidence remains target integration work. No `stable` or
Shopify target-ready promotion is claimed.
