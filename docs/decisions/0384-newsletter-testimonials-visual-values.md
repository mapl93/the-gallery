# ADR 0384: Newsletter And Testimonials Visual Values

Status: Accepted

Date: 2026-09-12

Apply ADR 0293 to Newsletter (10 new roles, 27 public values) and Testimonials
(17 new roles, 39 public values), refining the earlier private-value boundaries
of ADRs 0164–0165. Preserve ADR 0251's target-owned subscription lifecycle and
native quotation/attribution composition.

Newsletter exposes its content maximum, bounded insets, section padding,
independent content/form gaps and relative line-height floors. Input and Button
continue to own field/button density, validation, interaction and appearance.

Testimonials exposes collection measure, bounded insets and card spacing,
independent card padding/content/author gaps, title/grid spacing, relative
line-height floors, quotation-mark leading and compact/intermediate/wide column
counts at the existing container thresholds. Responsive spacing bases remain
live. Explicit rem measures retain their existing meaning without expanding the
primitive scale. The existing quotation italics and canonical Avatar remain.

Remove `--space-layout-container` from Testimonials' public inventory: neither
its CSS nor Avatar consumes it. This removes an ineffective advertised control;
the global token remains available and no rendered default changes.

Both targets regenerate. Studio and Exhibit derive their controls from the same
inventory. There is no new semantic state, mode, breakpoint, runtime, source
layer, hosted integration or maturity promotion. See the checkpoint report.
