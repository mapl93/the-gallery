# 0271. Normalized Firing Schedule Chart And Table

Status: Accepted

Date: 2026-08-11

Owner confirmation: decision 60

Supersedes: ADR 0206

## Context

The earlier R6 candidate was a passive arbitrary description list. Owner review
established that this identity was too broad and did not represent the intended
domain component. R6 must always present a specific firing program as both a
segment table and a temperature-over-time ramp chart. Planned and observed
temperatures may be compared, but the component must never become kiln control
software or claim technical or safety approval.

A truthful chart requires real elapsed time rather than equal-width schematic
segments. Accepting both a planned table and a separately target-drawn planned
curve would permit drift. Full-rate controller semantics also lack a numeric
rate, so they cannot occupy a real-time axis without an approved estimated
duration. Display conversion must remain coherent across table, axes, summary,
legend, and accessible description.

WAI guidance for complex images supports a short name plus equivalent detailed
text or tabular information. The WAI SVG ACT rule recommends an explicit image
role with a non-empty accessible name; SVG 2 exposes `title` and `desc` through
accessibility APIs. HTML, Open UI, and Polaris preserve table structure for
row/column comparison. Radix has no chart or passive-table primitive whose
state model should replace native SVG and the canonical Gallery Data Table.

## Decision

- Public identity is **Firing Schedule** with canonical root
  `.firing-schedule`. Internal slug `firing-info`, legacy visible naming, and
  root/title selectors are pre-v1 migration compatibility only and must be
  removed before the public contract freezes.
- Both the real-time ramp chart and canonical Data Table are required. One
  planned segment produces one table row.
- The normalized planned source is one finite starting Celsius temperature and
  an ordered non-empty segment collection. Every segment has a unique stable
  `segmentId`, positive Celsius-per-hour rate or `full`, target Celsius
  temperature, and non-negative hold seconds.
- Neutral `components/js/firing-schedule.js` validates the planned source and
  derives accumulated time, ramp/hold boundaries, planned points, and table
  durations. Targets do not supply a second planned curve.
- A `full` segment requires a positive target-reviewed estimated ramp duration.
  It is labelled estimated. Missing that estimate invalidates the complete
  schedule.
- The horizontal axis represents accumulated seconds. Ramp and hold widths
  correspond to duration; line slope represents temperature change per time.
  No equal-width schematic mode exists.
- Optional controlled actual samples are strictly increasing elapsed-second /
  Celsius records. They draw the observed curve and never become table rows or
  sequential focus stops.
- Optional observed summaries correlate duration, reached temperature, and
  deviation to a planned row by `segmentId`. Missing summaries do not invent
  data from raw samples.
- `view` is `planned | actual | both`. When unset it resolves to `both` if
  actual samples exist and otherwise `planned`; `actual` cannot remain active
  without samples.
- `displayUnit` is `celsius | fahrenheit`, defaulting to Celsius. Every visible
  and accessible value derives from the same normalized Celsius/seconds source;
  targets never supply duplicate unit datasets.
- `actualStatus` is `collecting | complete`. Targets may replace the controlled
  sample array at bounded cadence. R6 does not connect to equipment, poll,
  persist, animate samples, or announce each update.
- The chart is one informative SVG image with localized name and concise
  summary of visible series, range, time, lifecycle, and relevant deviation.
  A visible legend uses text and dashed/solid treatment in addition to color.
  A visible caption remains available.
- Canonical Data Table is the primary detailed representation. Native caption,
  headers, scope, and keyboard-focusable overflow remain owned by that
  dependency.
- Firing Schedule is informative only. R0/target systems own the technically
  reviewed program, units, applicability, provenance, safety content, source
  updates, and localization. R6 never programs, starts, controls, validates,
  certifies, or recommends a firing.
- The contract remains `pilot`; automated evidence cannot promote it to
  `stable`.

## Consequences

- Chart and table cannot disagree about planned duration or values because they
  share one derived model.
- Fahrenheit is presentation, not a parallel data source.
- Partial actual data is representable without claiming completion, and raw
  telemetry does not overload the table or accessibility tree.
- Narrow layouts preserve legible chart and table geometry through two named,
  focus-visible horizontal scroll owners instead of shrinking detailed text
  below readable size or overflowing the document.
- Shopify, Webflow, React, Angular, SwiftUI, Compose, and future targets map the
  same normalized records to their native chart/table surfaces while keeping
  equipment connectivity outside R6.
- Production schema validation, maximum segment/sample limits, bounded update
  cadence, provenance, safety review, target localization, print/export,
  identity-migration removal, first Shopify consumer, final design evidence,
  and explicit human stability review remain gates.
