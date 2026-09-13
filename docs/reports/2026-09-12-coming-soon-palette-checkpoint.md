# Coming Soon accepted palette checkpoint

Date: 2026-09-12. Baseline: `46756f0`. ADR 0392. Owner choice: A.

Coming Soon now uses fixed white on-media text in both themes. Four public
component tokens expose text, scrim tint, final scrim opacity and muted text
opacity. White and scrim tint alias existing system colors; 0.78/0.86 retain the
reviewed component values. Shared scrim start opacity remains editable. No new
primitive, theme, layer or platform. No geometry, typography or behavior change.

Contract, registry, Studio, Exhibit and generated Web/Shopify outputs agree.
The obsolete Coming Soon inverse-text reference is removed from its inventory;
the global alias remains for other consumers. Adoption instructions explicitly
cover local inverse overrides and copy-and-own updates.

## Verification

Evidence: `output/playwright/coming-soon-palette-accepted/`.

- Twenty cases: 320/600/900/1200/1800px, Light/Dark, media present/absent. Geometry
  remains identical when switching the old and new palette declarations.
- Light and absent-media colors are preserved. Dark media headings become white.
  Native Input and Button text colors are unchanged across these cases.
- Studio text edits to yellow, scrim tint to purple, end opacity to 0.9 and muted
  opacity to 0.7 all reach computed styles; Reset restores the accepted palette.
- Forced colors yields CanvasText with reduced motion active. No new animation
  exists. Exhibit dark media is white and exposes all four role labels.
- The final dark Studio screenshot was inspected. All evidence resources closed.

The first harness used a switch role for a checkbox, then reinserted the entire
old component stylesheet after Studio's CSS and inadvertently overrode Studio's
preview height. The final harness restores only the old palette declarations;
this is a palette comparison in the real preview, not a fresh consumer layout
comparison. Source diff confirms the remaining declarations are unchanged.

Source catalogue, docs/contracts/Studio and generated adapters validate. This
checkpoint does not retest target submission, hosted Shopify, all authored media
or screen readers. Previously calculated default contrast bounds are retained
in the linked decision diagnostic; custom edits require their own review.
