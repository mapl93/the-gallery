# 0349. Process Timeline And Collection Story Visual Values

Status: Accepted

Date: 2026-09-09

## Decision

Nineteen scoped source roles complete 33 Process Timeline and 34 Collection
Story public values under the owner's token-customization direction. This
extends ADRs 0124/0126's visual candidates without changing native narrative
semantics, source order, target-owned content or runtime boundaries.

Process Timeline exposes step minimum width, marker diameter, connector
thickness, image ratio, lane focus geometry, inline padding cap and factors for
title, track padding and step content gaps. Marker/focus/connector dimensions
alias existing primitives. Defaults remain 11rem, 36px, 2px and 4:3; the
connector's vertical position is derived as (diameter - thickness) / 2, retaining
17px initially. Its length follows the track gap. These dependent geometries
are not additional public position/length tokens. Step minimum width remains
bounded by the lane's available width. Studio Tour inherits this anatomy and
these values through its existing Process Timeline dependency (ADR 0142).

Collection Story exposes stacked content maximum width, image ratio, label
tracking, paragraph gap, quote border, label/quote accent share, inline padding
cap, quote inset and action gap factors. The content cap remains 42rem while
stacked; wide media composition still fills equal columns. Tracking and
paragraph gap retain em relationships to local type. The 3px quote border
aliases dimension.3; accent share 0.7 weights the existing accent/primary mix
with full opacity. Its valid 0–1 range follows the percentage mix operation.

Existing shared type, color, radius and spacing roles remain public and are
represented in Studio. The two transparent MDX placeholders use empty alt
instead of describing subjects that those placeholder images do not depict.

The Collection Story actions slot remains target-owned under ADR 0126. A
consumer choosing Button installs it explicitly alongside Collection Story;
this decision does not add a mandatory dependency. Media presence still owns
the split, and reversed only changes wide visual placement. There are no new
source modes, semantic properties, JS, target schemas or stability promotions.

## Acceptance

Compare original layouts with/without media, reversed story and narrow/wide
widths in both themes. Verify custom geometry, native lane keyboard overflow,
bounded minimums, RTL, focus/forced colors, source order, stacked-width scope,
relative type spacing and opaque palette mixing. Exercise Studio edit/reset,
Exhibit and inherited Studio Tour geometry. Validate source/catalogue,
contracts, Studio, registry, docs, CLI consumption and generated adapters.
Close the one browser session and confirm no test processes remain.
