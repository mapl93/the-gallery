# Refinement Batch 134: Filter Panel

Date: 2026-07-20

Component: `E3` / `filter-panel`

Status: `human-review-ready` / contract remains `pilot`

## Outcome

The owner-approved Filter Panel direction is implemented across the canonical
contract, registry, CSS, neutral runtime, shared Exhibit/Studio renderer,
Shopify Main Collection, Studio metadata, component documentation, dossier,
ADR 0250, open-question ledger and global progress matrix.

The component now uses one native GET form and one choice tree. Its own
container selects an adjacent non-modal panel at `>= 40rem` and canonical modal
Drawer below that threshold. Immediate is the default commitment mode; Manual
keeps draft state until Apply and restores committed state on Cancel. The target
continues to own filter data, query/URL/history, results/status/focus and
pagination reset; sort and result count stay outside E3.

The final browser run reports `failures: []`, `consoleErrors: []` and
`pageErrors: []`. Exhibit and Studio have exact DOM/style parity, the visual QA
correction preserves the canonical `15rem` panel width, and the owned browser
and server lifecycle is clean. No `stable` promotion is claimed.

## Validation

- five direct container widths across both adaptive surfaces: pass;
- eight natural Exhibit/Studio viewport captures: pass;
- Drawer focus, containment, dismissal, inertness and scroll lifecycle: pass;
- Immediate, Manual, Tag removal and neutral-runtime cleanup: pass;
- localized RTL 200%, dark contrast, forced colors and reduced motion: pass;
- Collection budget: `2,490 / 2,560 B`, `70 B` headroom;
- global CSS/runtime gaps: documented by ADR 0250, ceilings unchanged;
- evidence resources: server stopped, port 4173 free, Playwright closed; and
- `site/dist`: not rebuilt.

Structured evidence and screenshots are stored under
`output/playwright/refinement-batch-134/`.
