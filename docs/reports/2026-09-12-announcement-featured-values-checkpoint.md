# Announcement and Featured Collection visual-value checkpoint

Date: 2026-09-12. Baseline: `db64922`. ADR 0397.

Twenty component roles expose current values. Announcement's unused focus-color
inventory entry is removed; its outline continues to follow link currentColor.
The global color token remains. Featured Collection keeps its dependency-owned
Grid/Carousel behavior and now exposes Spotlight density and span values.

## Evidence

`output/playwright/announcement-featured-values/` contains before CSS, harness,
results and screenshots. Neutral fixtures clone actual Studio markup and remove
docs classes while retaining loaded styles; they are not fresh CLI installations.
Static/Countdown/Rotating Announcement and Grid/Carousel/Spotlight Featured
Collection, five widths (320/600/900/1200/1800) and two themes yield 60 cases and
2990 element comparisons. All six narrow RTL roots report 288px client/scroll
widths. Geometry, padding, gaps, borders and type retain their baseline values.

Actual Studio edits verify Announcement padding/content gap/rotation-control gap
and next-message counter (2/3), Featured header column/row gaps, compact Spotlight
columns and Carousel card basis. Reset and shared Exhibit controls work. A separate targeted check requests a
five-column first-item span inside one/two-column medium and wide grids: the
span caps to the active count without implicit columns or overflow. Its probe
uses the content width after section padding when selecting a breakpoint.

Catalogue: 1785 paths / 14280 comparisons across eight matrices. Generated
Web/Shopify and docs/contracts/Studio pass. The first combined evidence run
completed component checks but selected Image with Text's five-option variant as
a radio; the corrected harness uses its existing native select. Browser/server
cleanup passed after both attempts. No target services, site/dist or promotion.

The same bounded session captured a separate, read-only Image with Text palette
decision. See `2026-09-12-image-text-overlay-palette-decision.md`; its source is
unchanged in this checkpoint.
