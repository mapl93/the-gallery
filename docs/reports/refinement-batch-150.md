# Refinement Batch 150

Date: 2026-08-10

Component: U9 Account Settings

Result: `human-review-ready`; remains `pilot`

## Decision Closure

- Added accepted ADR 0266 for the owner-selected per-section commitment model.
- Deferred profile-like edits use an explicit canonical Form.
- Immediate effects use canonical Switch outside unrelated Save actions.
- Marketing, notification, privacy, and other consent remain policy-backed
  target records rather than generic U9 booleans.
- Platform-hosted settings are linked or omitted when neutral composition
  cannot preserve the provider lifecycle.
- Replaced misleading notification/security switches with immediate non-consent
  Display preferences.

## Evidence

- Contract `0.3.0`, registry, MDX, Studio renderer, dossier, audit, ADR, and
  progress matrix agree.
- One shared Account Settings renderer and fixture serve Exhibit and Studio.
- Exact `512px` parity: DOM `d43da67e`, computed styles `fe73d09c`.
- Deliberate Profile submit fires once; pointer and Space changes to Display
  Switches do not submit that Form.
- The fixture contains no generic consent-like Switch labels or names.
- Mobile, Tablet, Desktop, and XL in both modes; localized RTL at `200px`;
  effective `200%` text at `320px`; dark; forced colors; and reduced motion pass
  without overflow, console errors, or page errors.
- Machine-readable results and visual artifacts are in
  `output/playwright/refinement-batch-150/`.

## Resource Lifecycle

The run reused one responsive pre-existing Gallery server, opened one headless
`gallery-refinement` Playwright session with one page, closed that session, and
passed `npm run evidence:assert-clean`. No user-owned browser or server was
stopped.

## Remaining Human And Target Gates

- Human approval of measure, hierarchy, divider/copy/control rhythm, fixture,
  responsive visuals, and owner artwork.
- Real target evidence for account inventory, authentication, protected
  mutation, consent records, dirty/pending/failure/conflict recovery, focus,
  announcements, and platform handoffs.
- No `stable` or Shopify target-ready promotion was made.
