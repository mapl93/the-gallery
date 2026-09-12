# Technique full-width checkpoint

Date: 2026-09-12

Owner decision: full width when no image (ADR 0357).

Canonical wide selectors now require a direct media child. Text-only steps
remain one column regardless of parity; media steps retain the token-controlled
split and alternate. Contract/MDX and current decision tracking reflect that
boundary. No new token, mode, property or runtime. Web/Shopify CSS regenerated.

Local evidence from a fresh CLI consumer:

- 160 element comparisons with media, four widths (320/600/900/1200) and both
  themes: geometry within 0.02 CSS px, font/color unchanged.
- 24 combinations remove the first, second or both images at those widths/themes.
  Every affected step fills its available width and preserves text-first order.
- Mixed RTL at 912px step width with a 0.7 text share: text-only width 912px;
  media-step text 615.984375px after the 32px gap. Share affects only the split.
- Actual Studio optional-media structure, exercised by removing media in the
  test DOM, fills all text steps. No new inspector property was added. Exhibit
  retains the public share control. Screenshot visually inspected.
- Evidence: ignored `output/playwright/technique-full-width/`; temporary public
  fixture removed. Single browser/server closed, resource gate clean and process
  inspection found no remaining test resources.

Source/Web/Shopify builds and adapter validation, docs/contracts/Studio/CLI,
structural certification/refinement/performance inventories pass. Source catalogue
is unchanged at 1,154 paths. Maturity remains 5 stable/173 pilot/4 deprecated;
Shopify performance guidance retains existing advisory overages.

No Shopify upload, target data/editor work, Figma, tool installation, site/dist,
source-format change or stable promotion. This is a scoped layout verification,
not a new screen-reader/contrast certification. Consumers adopt the CSS explicitly.
