# Editorial font declaration versus delivered face

Date: 2026-09-12. Source head: `172a474`.

Status: resolved — the owner selected A (load Lora). See ADR 0381 and the
editorial-font-delivery checkpoint report for implementation evidence.
This original diagnostic changes no canonical token,
component, font loader, Shopify setting, package model or installed font.

## Finding: confirmed declaration/delivery mismatch

- `tokens/source/primitives/typography.tokens.json:11` declares Lora first,
  then Georgia, Times New Roman and generic serif.
- `tokens/source/semantics/typography.tokens.json:56` and `:62` reference that
  serif family for the editorial title/body roles.
- `site/index.html:8-12` loads Inter and JetBrains Mono, with no Lora request;
  no additional Lora font-face or loader is present under site/src.
- Actual Studio Article Hero and Article Body at 1200px report the Lora-first
  CSS stack, but Chromium CSS.getPlatformFontsForNode reports Georgia-Bold
  (37 glyphs) and Georgia (160 glyphs), respectively. Neither page has a Lora
  FontFace. This is rendered-font evidence, not only computed font-family.

The fallback works; text is not absent or structurally inaccessible. The issue
is that the declared editorial identity and the reviewed visible face differ.
Changing either is an owner-facing visual decision. AGENTS.md reserves changes
to the owner-facing aesthetic for confirmation. Existing broad token work does
not tell us whether to retain the declared Lora or the visible Georgia result.

## Concrete alternatives

A — Load Lora to fulfill the existing canonical role (recommended because it
retains the declared system identity). Recheck editorial components with the
actual delivered regular, bold and italic faces. Target-specific font loading
remains separate from token values and consumer adoption.

B — Formalize the system serif fallback as the default role. The current
machine uses Georgia; other systems can use another available serif. This keeps
the observed local appearance without promising identical glyphs everywhere.
It deliberately updates the canonical font preference rather than leaving an
undelivered family at the front of the list.

Neither face is objectively the only correct choice. The recommendation is
architectural consistency, not a standard requiring Lora or a judgment that
Georgia is defective. Shopify's existing target font pickers/loader remain
separate and have not been changed by this diagnostic.

## Comparison and verification

`output/playwright/editorial-font-decision/options.png` shows the same source
Article Hero and Article Body content in two 300px sample containers. The
comparison fixture trims only Hero block padding to keep the two examples
readable side by side. Both title boxes are 240px, 38/46px and weight 700;
body paragraphs are 300px, 18/29px and weight 400. Title line breaks differ even
though both examples happen to remain 184px high. This is not a claim of equal
metrics for all text or widths.

A loads official Lora files under a fixture-only alias; protocol evidence
confirms custom Lora-Bold and Lora-Regular glyphs. B preserves the current
canonical stack and uses local Georgia. The real site was measured before the
fixture comparison. Two real-page samples and four title/body comparison
samples are recorded in result.json. Screenshot visually inspected.

The [Google Fonts CSS API](https://developers.google.com/fonts/docs/css2)
documents explicit family/style loading; [Lora's official specimen](https://fonts.google.com/specimen/Lora)
identifies the family used. The temporary CSS request selected 400 normal,
700 normal and 400 italic. Font files were fetched from the returned official
fonts.gstatic.com URLs, with URL/size/SHA256 provenance retained locally. No
font was installed on the operating system or added to canonical delivery.

One headless browser, one tab and one managed server; cleanup/resource gate and
process scan clean. Temporary public fixture removed. Evidence/font files stay
in ignored output/playwright; no deployment or production mutation occurred.

## Acceptance after selection

Align the chosen role and actual delivery; verify rendered font names as well
as computed CSS metrics, representative editorial line wrapping, bold/italic,
fallback/error behavior, Studio/Exhibit parity and target-specific loading.
Preserve the approved compact/wide Article Hero metric roles. Then resume the
remaining catalogue batches and Shopify delivery; no full token rebuild or
new font-distribution architecture is approved merely by this diagnostic.
