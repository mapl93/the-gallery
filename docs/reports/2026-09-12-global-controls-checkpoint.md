# Global Studio control reachability checkpoint

Date: 2026-09-12. Baseline: `fcc92df`. ADR 0390.

Seven navigation/overlay pages now expose independently editable color roles
previously grouped behind a first-token swatch. No component CSS, contract,
runtime, source token or generated adapter changes.

Browser evidence under `output/playwright/global-controls/` checks every split
binding reaches its intended inherited public variable, resets all overrides,
and appears in Exhibit. Actual visible consumers are sampled on each page:
Header logo, Footer link, Mobile Menu link, search result price, cart-line
details, Mega Menu inactive link and Bottom Nav inactive item. All respond to
the chosen color. The Header screenshot was inspected.

The initial harness expected desktop Header links, which correctly remain
hidden in Studio's compact preview. The final check uses the visible logo;
it does not override responsive CSS. This run does not retest all overlay
keyboard behavior, desktop navigation states or remote cart/search operations.
Native color input events test bindings rather than the OS picker.

Validation passes, including seven binding regressions and the expanded
renderer scope. Failed and final phases both close owned resources; the final
gate is clean. No upload, site/dist output or certification promotion.
