# Ceramics contextual-profile checkpoint

Date: 2026-09-12

Decision: ADR 0362. Twenty-nine roles; Glossary/Tour/FAQ profiles 25/22/24.

## Local evidence

- Fresh CLI consumer installs the three profiles, Care Instructions and their
  canonical dependencies. 920 element comparisons at 320/600/900/1200 in both
  themes preserve default CSS geometry within 0.02px, fonts, colors, padding,
  margins, borders and radii. Final comparisons use the corrected Tour images
  with both old and new CSS; they do not assert that its broken placeholders
  were visually equivalent to photos.
- Glossary custom maximum 600px, padding 20/12px, intro/group gaps 6/30px,
  letter gap 8px, rule padding 12px, rule 3px and scroll offset 60px pass.
  The 12px inline padding survives narrow RTL without overflow.
- Tour custom header 450px, header/eyebrow/heading gaps 20/6/8px, tracking 2.4px,
  media gap 30px, caption gap 12px and square supplementary media pass.
- FAQ custom outer/header maxima 650/420px, padding 20/12px, header/intro gaps
  30/6px and contact gap/padding/link gap 24/14/16px pass. Narrow RTL fits and
  the canonical contact anchor receives focus.
- At 320px, Care Instructions with a 20px element gap and padding factor 2
  now renders 40px padding instead of bypassing the factor.
- Studio rem measures and inherited section-gap editing pass. Native Space
  toggles actual Accordion triggers in Glossary/FAQ; reset and Exhibit token
  references pass. An 8rem Glossary definition image remains at most 128px wide
  with its natural aspect ratio. Tour's images decode and its square-media
  control is verified. No target filtering or navigation model is exercised.
- Measured consumer Glossary H2/H3 use weight 700 and inherited 24px line height;
  FAQ H2 uses weight 600 and explicit 40px line height in the tested density.
  Typography is preserved pending the owner choice. Current/system-heading
  screenshots are browser-only proposals, not production changes.
- Screenshots inspected in ignored `output/playwright/ceramics-context/`.
  Initial Tour screenshots exposed invalid GIF placeholders; final evidence
  requires successful image decode after replacing them with existing local
  Studio assets. Temporary public fixture removed; each browser/server phase
  closed, resource gate clean and no remaining test processes.

Source/Web/Shopify builds and adapter validation, docs/contracts/Studio,
catalogue and structural certification/refinement/performance inventories pass.
Catalogue: 1,235 paths, 9,880 comparisons. Maturity remains 5 stable, 173 pilot,
4 deprecated; two existing Shopify advisory performance overages remain.

Limits: local Chromium and selected fixtures, not all locales or screen-reader
behavior. No new runtime, source modes, Figma, tools installed, site/dist,
Shopify upload or stable promotion. Shopify records, data mapping and editor
readiness remain separate. Glossary heading reconciliation is still open.
