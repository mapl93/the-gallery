# Sections Studio control reachability checkpoint

Date: 2026-09-12. Baseline: `0ba0d3c`. ADR 0391.

Ten section pages split grouped swatches into independently editable colors.
Logo Bar changes its erroneous radius swatch to a numeric editor, making eleven
metadata pages in this bounded editor-only checkpoint. Values, CSS, contracts
and generated targets remain unchanged.

Evidence under `output/playwright/sections-controls/` checks every split color
binding, complete override reset and each Exhibit reference label. Representative
actual consumers are checked on every page: Image Text/Brand Story body,
Multicolumn item text, Lookbook/Collage captions, FAQ subtitle, Contact text,
Shipping description, Rich Text body and Instagram caption. Logo Bar's link
radius changes from 4px to 18px through its real numeric control and resets.
The Logo Bar inspector screenshot was inspected.

This is binding evidence, not certification of each interaction, media palette
or every possible composition. Native input events test color binding rather
than the OS picker. Existing paired editors remain reachable but some X/Y
labels still describe non-geometric roles poorly; this is separate usability
work. No token/CSS rebuild, target upload, site/dist or maturity promotion.

Validation passes with the reviewed renderer guard. Owned browser and server
are closed and the resource gate is clean. The final source inventory resolves
both names and regular expressions across all 13 static renderer families (121
pages); it finds no remaining multi-token or non-color static swatches. Dynamic
state-aware swatches are intentionally outside that statement.
