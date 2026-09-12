# Storytelling Studio control reachability checkpoint

Date: 2026-09-12. Baseline: `8a3b664`. ADR 0388.

Seven pages replace static multi-role swatches with individual color controls.
The actual component renderer selected only the first listed token. The fix
preserves roles, values, defaults and the existing shared inspector.

Six binding regression tests pass, including the selected-filter group that
previously concealed its border and text. The guard applies only to reviewed
static renderers and preserves state-aware selection elsewhere.

Browser evidence is retained under `output/playwright/story-controls/`:

- All seven pages edit a formerly inaccessible color and reset it; Exhibit
  exposes the matching labels. Artist Profile/Collection Story quote rules,
  Certificate border, Process Timeline description, Artist Index introduction,
  Artist Card medium and Artist Statement quote respond.
- Process Timeline focus border responds independently with keyboard modality.
- Artist Index selected-filter border/text editors independently change their
  inherited public variables. The passive fixture contains no filter buttons,
  intentionally. This is variable-binding evidence only for those reserved
  hooks, not evidence of a functioning filter or its visual composition.
- The final Artist Index inspector screenshot was inspected. Input events test
  native color binding, not the OS picker. No semantic selection model is added.

An initial harness incorrectly expected filter buttons in the passive fixture;
it was corrected to respect the documented scope. A later assertion was made
color-serialization tolerant. All failed and successful phases cleaned owned
browser/server resources; the final gate is clean. No target rebuild, upload,
site/dist churn or certification promotion.
