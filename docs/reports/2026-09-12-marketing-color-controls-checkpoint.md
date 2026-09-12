# Marketing Studio color control checkpoint

Date: 2026-09-12. Baseline: `5d861b9`. ADR 0386.

## Confirmed defect and correction

MarketingStudio.tsx selected `resolveTokens(control, contract)[0]` for each
control, while StudioInspector rendered one selected swatch. Nine groups across
eight pages listed multiple roles: eleven non-first color roles were therefore
uneditable. Metadata now exposes individual controls. No values, CSS or target
files change; Trust Badges receives descriptive typography labels only.

Social Proof timestamp size/leading now have meaningful labels instead of X/Y.
Other type labels identify affected parts, including author name/detail and
quote size/leading. The existing shared input and color editor implementations
remain; no second inspector or custom widget is introduced.

The guard derives MarketingStudio slugs from index.ts instead of copying a
component list. It rejects exactly the configuration that this renderer cannot
edit. Four tests cover the former Testimonials group, single/empty bindings,
quoted/unquoted registration keys and preservation of Button's state-aware and
paired-control behavior. validate:docs passes, including the new test gate.

## Browser evidence

`output/playwright/marketing-color-controls/` retains previous metadata,
harness/results, and the inspected final Testimonials inspector image.

- Eight Studio pages independently edit a formerly inaccessible role and reset
  it. Native color inputs are changed through their input event; expression
  colors use the actual text editor. This tests binding, not OS color-picker UI.
- Hero secondary media surface, deprecated forwarding on-media text, Newsletter
  description, Testimonials accent, Countdown labels, Urgency Viewers text,
  Consent Manager description and Social Proof timestamp all change to #663399.
- Testimonials secondary detail also changes to #228844 without changing the
  quotation accent or primary author name. Countdown's invalid fallback changes
  independently after editing the public deadline to invalid input.
- Social Proof timestamp size/leading edit independently to 20/28px. Exhibit
  exposes the corresponding role labels on all eight pages.
- Final label-only inspection confirms descriptive weight/quote controls.

The harness learned to use the existing expression editor for a color-mix value;
no source workaround was needed. Owned browser/server resources are closed after
every phase. Final resource gate passes. No upload, data mutation, certification
promotion, token rebuild or site/dist output.

## Remaining audit

The same static first-token pattern exists in other renderer families. A source
inventory identifies affected swatch groups in Blog, Storytelling, Global,
Sections, Reviews, Pages and Cart. They remain queued for separate bounded
checkpoints; this report does not claim site-wide control reachability.
