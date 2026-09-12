# ADR 0381: Editorial Font Delivery

Status: Accepted

Date: 2026-09-12

The owner selected A from the rendered Lora/Georgia comparison: load Lora to
fulfill the existing canonical editorial family. Keep the serif token's fallback
stack and ADR 0375's compact/wide Article Hero size and leading roles.

The Web documentation host adds Lora to its existing Google Fonts CSS2 request,
with normal/italic weights 400–700 and swap display. This covers the existing
Prose body, heading, emphasis and configurable shared weight roles without
changing the UI/editorial boundary or introducing a token layer or font package.

Font-family tokens declare values; each host owns actual font delivery. The CLI
continues to copy CSS/runtime, not font files or a remote loader. Its guide now
states the consumer's responsibility. Shopify retains its native font pickers
and shared font loader, including its current Lora editorial default; merchant
selections are not overwritten.

Protocol evidence verifies actual custom Lora glyphs in Studio and Exhibit,
regular and italic weights, preserved metrics, brand overrides, and readable
fallback when font requests fail. See
`docs/reports/2026-09-12-editorial-font-delivery-checkpoint.md`.
