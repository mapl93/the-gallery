# 0066. Timeline Entry Semantic Statuses

Status: Accepted

Date: 2026-07-12

## Context

Timeline initially exposed only a boolean current state. That covered progress
position but could not represent operational outcomes or conditions such as a
completed, delayed, warning, or failed entry.

## Decision

- Status belongs to each timeline entry, not to the timeline root.
- The canonical `status` property is an enum with `default`, `current`,
  `completed`, `delayed`, `warning`, and `error` values.
- Neutral web maps explicit states to `data-status` on `.timeline__item`.
- Only `current` maps to `aria-current="step"`, and targets apply it to at most
  one entry when the sequence represents progress.
- Completed, delayed, warning, and error reuse existing global semantic
  feedback tokens. No Timeline-specific color tokens are introduced.
- Delayed uses an outlined warning treatment so it remains distinguishable
  from a solid warning marker without adding another semantic color.
- Consumers provide localized visible status text through
  `.timeline__status` whenever status meaning matters. Color is supplemental.
- `.timeline__item--active` remains a compatibility alias for current visual
  presentation while the pilot API moves to `data-status="current"`.

## Consequences

- Timeline can represent both historical events and operational progress with
  one composable entry model.
- Studio presents all six states on one sample entry and exposes only existing
  public semantic tokens.
- The contract remains pilot until visual and target-adapter review are
  complete.
