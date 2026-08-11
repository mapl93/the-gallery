# Modular Runtime Cross-Target Certification

Status: `pass`

Snapshot: 2026-08-11

ADR 0273 makes dependency-closed copy-and-own slices the primary v1 delivery
and performance unit. This report verifies the implementation without treating
the complete compatibility bundles as consumer defaults.

## Result

- Web manifest `0.2.0` maps all 183 components to exact CSS/runtime install
  closures and validates 19 copied CSS source modules plus 17 runtime modules.
- Shopify manifest `0.2.0` maps the same 183-component dependency graph to its
  CSS/runtime assets. Both layouts load `runtime-loader.js`; neither loads the
  complete compatibility `theme.js`.
- The CLI fixture installed Product Gallery and Filter Panel with seven required
  CSS files and four runtime files plus its generated entry. It included
  dependency-owned Checkbox behavior and excluded unrelated Date Picker,
  Countdown, and Marquee behavior.
- The performance audit passes all 19 required surfaces with zero gap. The
  loader is 765 B gzip, the shared core 715 B, and the largest individual
  enhancer is Date Picker at 3,396 B against a 5,120 B ceiling.
- The complete CSS and runtime aggregates remain reported at 72,723 B and
  22,807 B gzip as two diagnostic overages. They are not hidden or reclassified
  as install payloads.

## Browser Proof

One headless page began with only Select markup. The loader exposed only
`enhanceSelects`, enhanced the generated trigger/listbox, and synchronized the
native value to `two`. Countdown and Filter Panel were then inserted after page
load. The loader requested their modules plus dependency-owned Checkbox, the
shared core initialized the dynamic roots, Countdown entered `running`, and
Filter Panel entered its Drawer/open state.

Requested runtime files were exactly:

- `runtime-loader.js`;
- `core.js`;
- `select.js`;
- `countdown.js`;
- `checkbox.js`;
- `filter-panel.js`.

No Date Picker or Marquee module was requested. The page produced zero console
errors, zero uncaught page errors, one tab, and zero assertion failure.

Visual evidence:
`output/playwright/refinement-performance-architecture/final/select-countdown-filter-panel.png`.

## Resource Hygiene

The `gallery-refinement` session was closed immediately after capture. The
repository-owned server is stopped, the pre-existing responsive server remains
untouched, and `npm run evidence:assert-clean` passes.

Machine-readable evidence lives in
`docs/reports/modular-runtime-cross-target-certification.json`.
