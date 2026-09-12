# Editorial font delivery checkpoint

Date: 2026-09-12. Baseline: `377cbc2`. Owner selected option A.

## Result

`site/index.html` now loads the already-declared Lora family through the existing
Google Fonts CSS2 stylesheet request, normal and italic weights 400–700, with
swap display. No token, component metric, generated target asset or package
model changes. `docs/CLI.md` explains host-owned font delivery and fallback.
ADR 0381 resolves the diagnostic and open question.

Shopify source inspection confirms native font pickers with editorial default
`lora_n4`, plus regular, medium, semibold, bold and italic font-face declarations
in `theme-brand-settings.liquid`. This checkpoint does not change selections,
upload a theme, or claim hosted font verification.

## Verification

One headless Chromium session/tab per evidence phase, no parallel servers.
Final evidence: `output/playwright/editorial-font-delivery/result.json`, runner
and inspected Article Hero/Body screenshots in the same ignored directory.

- 12 Studio samples: both components, 320/1200/1800px, both theme attributes.
  CSS.getPlatformFontsForNode confirms custom Lora glyphs; sampled text does not
  overflow. Article Hero size/leading match the current compact/wide tokens.
- Eight authored Prose samples: 400/500/600/700, normal and italic. Actual Lora
  glyphs and requested computed weight/style are recorded, including bold italic.
- Two Exhibit samples confirm actual Lora in the shared component renderer.
- Two initial navigations with Google font requests blocked render non-Lora
  fallback glyphs, retain visible text and do not overflow the sampled elements.
- An inherited editorial-family override switches the rendered face to Arial.

The initial harness attempts corrected protocol node discovery, the Exhibit
renderer selector and waiting for repaint before font inspection. All attempts
closed owned resources. The final run passes; evidence:assert-clean and the
owned-process scan are clean. No OS font installation or site/dist rebuild.

The external font request can fail or be blocked by a consumer's policy; the
fallback remains intentional. These sampled glyph, wrapping and delivery checks
are not complete visual/accessibility certification for every editorial use or
all operating systems. Copy-and-own hosts must arrange their own font loading.

Repository gates: validate:docs, audit:components, audit:refinement and
audit:refinement:performance pass. The performance inventory retains two
existing advisory Shopify asset overages; it is not target certification.
