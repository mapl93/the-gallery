# 0367. Quick View And Sticky ATC Visual Values

Status: Accepted

Date: 2026-09-12

## Decision

Apply ADR 0293's subsequently approved public visual customization direction to
Quick View and Sticky ATC. Their prior empty token inventories become 9/20 public
values, including eleven new source roles (4/7). Existing consumed typography,
color, shadow, stacking and motion values are now visible in Studio/Exhibit.
Use existing registry category `transition` for duration; no category is added.

Quick View owns maximum width, gallery/detail gap, inner information rhythm and
wide gallery share. The share clamps to 0–1 and applies after subtracting the
gap, following Technique's existing fractional-track pattern. Default 0.5 keeps
equal tracks. The fixed structural two-slot relationship and container query
remain; Modal and Product Gallery keep their contracts.

Sticky ATC owns independent inner/information gaps, logical padding, media
measure, border and title weight. Border and title alias system values; image
initially aliases size.touch.minHeight to preserve responsive defaults while
allowing independent overrides. Existing surface, shadow, layer and motion
roles remain shared. Reduced motion still disables its transition.

This supersedes only the earlier absence of public visual controls in ADRs
0255/0256. Complete snapshot, modality, product coordination, external form,
hidden inertness, visibility eligibility, safe-area/collision and real target
certification responsibilities are unchanged. No extra runtime or property.
Both generated targets update; explicit copy adoption and pilot maturity remain.

## Evidence

See `docs/reports/2026-09-12-quick-sticky-checkpoint.md`.
