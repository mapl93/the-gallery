# 0076. Collection Semantic Studios And Responsive Boundary

Status: Accepted

Date: 2026-07-12

Partially superseded for E3 adaptive behavior and identity by ADR 0250.

## Context

The Collection family had canonical CSS and pilot contracts, but lacked reviewed
semantic properties and interactive Studios. Selected pagination and view-mode
controls still used the orange statement surface, page-level Collection Grid
spacing overflowed inside the constrained Exhibit artwork frame, and the
responsive filter source hid its desktop sidebar without defining a mobile
replacement surface.

## Decision

- Collection Hero exposes variant, title, description, count, media, and media
  alternative text. Media and copy in Studio remain fixture content.
- Collection Grid exposes ordered Product Card items and a bounded two-through-
  six desktop column property. Neutral web maps it through `data-columns` to the
  existing `--grid-columns` hook.
- Collection Grid keeps page-level canonical spacing. Exhibit owns a local
  fixture class that reduces that spacing inside its constrained artwork frame.
- Collection Filters exposes bar, active-filter, filter-group, and sidebar
  composition slots while Checkbox, Radio, and Tag retain their own semantics.
- Pagination exposes its navigation label, current page, and generated page-item
  composition. Current-page selection uses primary action tokens.
- View Toggle exposes group label, active Grid/List view, and whole-group
  disabled state. Active selection uses primary action tokens and synchronized
  `aria-pressed` values.
- Collection Promo keeps the statement surface as an editorial role. Text is
  primary without media and inverse only when media plus an overlay is present.
- Empty Collection uses the primary action family for recovery while keeping its
  icon optional and passive.
- Every Collection component remains `pilot` until human review.
- Mobile filter-surface ownership is deliberately unresolved. The canonical
  sidebar remains hidden below the desktop breakpoint until the owner chooses a
  Drawer, inline disclosure, or another documented pattern.

## Consequences

- Seven Collection Studios render canonical classes and provide 30 reviewed
  semantic properties for rapid iteration.
- Interactive states are neutral and consistent with the primary black base
  theme without changing the editorial statement palette.
- Desktop and mobile Collection layouts avoid viewport overflow.
- Collection Filters cannot be promoted to stable until the mobile filtering
  surface and its focus/dismissal behavior are explicitly selected.
