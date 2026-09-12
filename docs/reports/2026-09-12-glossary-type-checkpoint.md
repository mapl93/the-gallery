# Glossary typography checkpoint

Date: 2026-09-12. Decision: ADR 0363. Parent: `0a44ba7`.

The owner selected the system-heading screenshot (option A). Title now consumes
H2 weight/line height and letter groups H3. Actual source weights are 600/500;
the earlier conversational description incorrectly called both 600. The chosen
screenshot already used the correct roles. Four existing tokens are exposed in
contract, registry, Studio and Exhibit; the profile now has 29 public values.

## Evidence

- Fresh CLI consumer installs Glossary with Accordion/Link and generated CSS.
- Eight viewport/theme combinations (320, 600, 900, 1200px; Light/Dark): computed
  heading fonts match system roles. Narrow H2/H3 line heights are 30/26px,
  intermediate 35/28px and 1200px 40/30px. Weights remain 600/500.
- Independent 400/700 weight and 3rem/2.5rem line-height overrides compute
  48/40px despite conflicting ancestor weight/line height.
- Long multiline title fits a 320px RTL container without horizontal overflow.
- Studio edits all four controls; computed weights/line heights match values.
  Native Space toggles the Accordion. Reset restores system weights; Exhibit
  lists all four roles. Final screenshot visually matches approved option A.
- Generated Web and Shopify component adapters and docs validation pass.
- One headless browser/tab and one managed server; cleanup and process scan
  show no remaining owned resources. Temporary public fixture removed.

Local ignored evidence: `output/playwright/glossary-type/` (result JSON, CLI
provenance, harness, narrow RTL and default Studio screenshots).

## Limits and adoption

Intentional typography/line-box change can move following content. No token
source defaults, disclosure runtime, Shopify records/editor, or publishing
changed. Consumers explicitly adopt CSS. This bounded Chromium check does not
certify all accessibility behavior or promote the pilot to stable.
