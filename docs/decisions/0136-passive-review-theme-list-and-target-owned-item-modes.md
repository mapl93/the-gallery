# 0136. Passive Review Theme List And Target-Owned Item Modes

Status: Accepted

Date: 2026-07-15

## Context

V5 Review Highlights entered refinement with a deliberately open product
boundary from ADR 0085. Its contract allowed passive text, navigation or
in-place selection, but the canonical surfaces contradicted that boundary:

- the registry called it a filterable tag cloud;
- MDX used passive spans without native collection structure;
- the shared Exhibit/Studio renderer always used multi-select toggle buttons,
  including an initially pressed item and local feedback;
- CSS applied hover treatment to passive text and exposed `.is-active`, a
  selected appearance with no native meaning;
- item and count typography was incomplete and passive text inherited action
  geometry.

There is no accepted provider, review taxonomy, item mode, selection cardinality,
URL strategy or results controller. Mature systems make those differences
explicit: Polaris separates passive Chip from Clickable Chip; Radix Toggle Group
requires single or multiple selection and controlled or uncontrolled ownership;
APG distinguishes toggle buttons from radio groups and links.

The declared Figma nodes are the generic Button Studio shell and inspector, not
Review Highlights artwork. The Reviews CSS family also entered the batch at
`3,781 B / 3,788 B` deterministic gzip, leaving no room for an implicit runtime
or decorative API expansion.

## Decision

- Review Highlights is one native unordered list with one native list item per
  target-supplied theme. The explicit `role=list` preserves list exposure when
  visual markers are reset.
- The canonical shared Exhibit/Studio fixture is passive. It uses a plain text
  `.review-highlights__tag`, visible target-formatted counts and accessible count
  units.
- The item slot remains open to truthful target projections:
  - passive text uses `span`;
  - navigation uses a native `a[href]` and optional truthful `aria-current`;
  - in-place selection uses a native `button[type=button][aria-pressed]`.
- The semanticless `.is-active` hook is removed. CSS styles selected/current
  appearance only from native state attributes.
- Hover, focus, disabled presentation and the 44px minimum apply only to native
  interactive projections. Passive themes retain compact content geometry.
- Item and count typography use the complete existing body-small and caption
  token roles. No new token layer or component token is introduced.
- Review Highlights owns no motion. State changes are immediate, so reduced
  motion is satisfied by construction.
- The neutral component owns no interaction state, listener, result update,
  filter, formatter, announcement, provider request or asset.
- A target/provider owns taxonomy, counts, localization, URLs, authored or
  projected state, reconciliation, reset, result loading, focus, empty results
  and complete status announcements.
- Shopify remains a future provider theme app block consuming generated CSS.
  No placeholder review Liquid is created.

## Alternatives Considered

### Canonical multi-select filters

Rejected for this batch. It requires a value array, initial versus controlled
state, events, reset, result association, loading and announcement decisions
that are explicitly open.

### Canonical single-select filters

Rejected for this batch. Single selection should use a radio-group contract,
including required-selection and keyboard policy, rather than independent
toggle-button styling.

### Canonical navigation cloud

Rejected for this batch. It would require URLs, history/current-location and
destination focus behavior that do not exist in source.

### Keep the interactive Studio fixture as an example

Rejected. Exhibit and Studio share that renderer, so the example becomes the
canonical artwork and silently selects multi-select filtering.

### Keep `.is-active` for compatibility

Rejected. The contract is `pilot`; the class duplicates native state without
exposing semantics and conflicts with the requirement not to rely on
presentation as behavior.

## Consequences

- Contract `0.3.0`, registry, MDX, Studio and the shared renderer now describe
  the same passive default and native list anatomy.
- Exhibit/Studio interaction coverage becomes not applicable for the canonical
  fixture. Link, pressed, focus, hover and disabled styling can still be verified
  as explicit target-projection probes.
- Targets may reuse the visual surface without receiving a filtering system.
- A future interactive Review Theme Filter can be added only after a product and
  results-controller decision, either as a refined mode or a separate component.
- Complete typography and native semantics fit within the unchanged Reviews CSS
  family ceiling by removing motion and ambiguous state styling.
- Human visual review must still approve pill density, type hierarchy, count
  treatment, wrapping and selected/current presentation.
- The component remains `pilot`; no stability promotion is made.

## Deferred Questions

- passive, navigation, single-select, multi-select or target-specific product
  modes;
- provider taxonomy, ordering, localization and count freshness;
- zero-count omission versus disabled or available presentation;
- URL/query synchronization, immediate versus applied filtering and history;
- loading, focus retention, empty results and result announcements;
- component-specific Figma artwork and final visual approval.
