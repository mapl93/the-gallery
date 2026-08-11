# 0121. Native Collection Filter Core And Adaptive Lifecycle Deferral

Status: Superseded

Date: 2026-07-14

Superseded by: ADR 0250

## Context

Collection Filters mixed a passive collection layout with incomplete form and
disclosure semantics. The shared renderer used a `section`, generic groups,
unnamed Checkbox inputs, a generic active-value container, and two native Button
titles with no expanded state or effect. CSS hid every group below a viewport
breakpoint but provided no mobile replacement; the same viewport rule displayed
a `240px` sidebar inside an Exhibit root only `356px` wide. Sort appeared as
plain inert text. Shopify rendered active-removal links and sort but no available
facet controls or result-update lifecycle.

Native HTML already defines form submission and reset, successful named values,
field grouping, Checkbox/Radio interaction, and accessible group names. WAI
recommends fieldset/legend for related controls. Open UI has no standardized
storefront Filter widget, while mature systems make selected values consumer-
owned and use an actual Disclosure/Accordion when groups collapse. Shopify
supplies merchant-configured filter types, parameter names/values/counts and
active-removal URLs, but its application, section refresh, status, history, and
focus lifecycle are target responsibilities.

No accepted repository decision or owner artwork defines whether narrow filters
use Drawer, inline expansion, or an external target shell; whether selection is
immediate or Apply/Cancel; whether groups collapse; or whether sort belongs to
Filters or a parent Collection Toolbar. Those choices change dependencies,
public API, focus/dismissal, responsive layout, and target translation and cannot
be inferred during implementation.

## Decision

- Collection Filters has a neutral `.filters` root and one named native
  `form.filters__form` query-control boundary on Web. Result content is a sibling
  of the form so Product Cards, quick-add, newsletter, and other consumers can
  retain valid independent forms. Static HTML may submit natively; a target may
  intercept the same filter form.
- Every always-visible facet is a native `.filter-group` fieldset with a first
  `.filter-group__title` legend. Inert group-title Buttons are removed. Any future
  collapsed group must compose an accepted Disclosure or Accordion with real
  open state, association, keyboard behavior, focus, and reduced motion.
- Available values compose canonical Checkbox or Radio controls with stable
  target-defined names, values, checkedness, labels, and disabled state. Swatch
  color or texture supplements a localized text name and non-color selection
  cue; it never becomes the only name.
- Native Web controls own live state, events, FormData, and reset by default.
  Framework adapters may expose coherent controlled selected-value collections
  or uncontrolled initial values, but not a hidden second owner.
- Applied values form a native `.filters__active` list. Each
  `.filters__active-item` contains one canonical Tag whose optional action
  requests removal only. The consuming target reconciles state and results,
  chooses surviving focus, and supplies any useful announcement.
- The shared CollectionStudio fixture demonstrates controlled target ownership,
  real names/values, reset, and focus recovery to the next removal action or the
  first remaining choice. This code is docs evidence, not neutral runtime.
- The bar remains a target-supplied required slot. Inert sort text is removed.
  Select is not added as a dependency until sort ownership is accepted.
- `label` is a required localized non-empty form name. It is the only new public
  semantic property; four existing composition slots remain unchanged.
- The current wide `.filters__layout` and `.filters__sidebar` remain documented
  as incomplete. Viewport response is not presented as certified responsive
  behavior, and hidden mobile groups are a blocking gap rather than an accepted
  simplification.
- Drawer versus inline versus target-external narrow surface, native-submit
  versus immediate versus Apply/Cancel commitment, group collapse, sort/result-
  count ownership, price/swatch/large-facet policy, and the single result-status/
  history/focus owner remain explicit questions in `docs/OPEN-QUESTIONS.md`.
- The target owns facet availability/counts, query parsing/serialization,
  commitment timing, URL/history, requests/cancellation, pending/error/empty
  result state, result rendering/counts, analytics, focus restoration, and
  pagination reset. Neutral Filters adds no request, store, live region,
  listener, observer, formatter, or URL mutation.
- Shopify remains `planned` and not ready. Existing active-removal URLs and sort
  are useful partial target evidence, but real `collection.filters` controls,
  adaptive presentation, commit behavior, section refresh, one status, history,
  and focus must be implemented after the blocking choices.
- Contract status remains `pilot`. The dossier is
  `refined-decision-needed`, not human-review-ready, and no stability promotion
  is inferred.

## Performance

Deterministic level-9 gzip after the safe refinement measures:

- Collection CSS: `2,257 B / 2.5 KiB`, leaving `303 B`; Batch 36 removes `1 B`
  from the Batch 35 family baseline while adding native fieldset/list resets.
- Neutral Web component CSS: `65,531 B / 64 KiB`, leaving `5 B`; Batch 36 adds
  `14 B` to the generated complete bundle. The ceiling remains effectively
  exhausted.
- Shared neutral runtime: `10,492 B / 8 KiB`, the existing explicit cumulative
  `2,300 B` exception. Collection Filters adds `0 B`; fixture-only React focus
  recovery is not shipped by the neutral adapter.

No ceiling is reset.

## Consequences

- Web and future targets share a credible semantic core without making React,
  Liquid, a URL schema, or one mobile pattern the source language.
- Product/result compositions can contain their own native forms without
  invalid nesting inside the filter query form.
- Exhibit and Studio keep one renderer and fixture; exact initial outerHTML,
  selection, reset, removal, focus, and content evidence cannot drift by mode.
- Always-visible groups now expose native names and serializable values, while
  canonical child components keep their own focus, checked, disabled,
  validation, forced-color, and reduced-motion behavior.
- The program records actionable progress without disguising the primary
  functional gap. Human review cannot start until the owner chooses the adaptive
  surface and commitment model and the resulting implementation is evidenced on
  narrow and wide containers.
- Once those choices are accepted, this component must revisit container-based
  response, dependency metadata, Studio controls, Shopify facet types and
  lifecycle, price/swatch/large-facet states, result announcements, and full
  before/after evidence before becoming human-review-ready.
