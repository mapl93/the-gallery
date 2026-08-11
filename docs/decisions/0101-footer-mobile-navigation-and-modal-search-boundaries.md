# 0101. Footer, Mobile Navigation, And Modal Search Boundaries

Status: Accepted

Date: 2026-07-13

## Context

Batch 16 refined the next dependency-safe Global components after Header and
Announcement Bar. Footer responded to the document viewport, mixed semantic and
calculated typography, and mapped incomplete group semantics. Mobile Menu
described Drawer composition but the shared renderer recreated a partial drawer,
left closed focusables mounted, and used a non-canonical dismiss control. Search
Overlay rendered a visually open generic section without dialog naming, a native
label, canonical dismissal, focus lifecycle, or native result-list structure.

The neutral source must preserve native document/navigation/search semantics,
consume accepted canonical dependencies, and keep provider, route, CMS, overlay,
and publishing architecture in their target owners. Exhibit and Studio must use
one renderer and one fixture without promoting docs-target behavior to neutral
runtime.

## Decision

- Footer is one body-scoped native `footer`. It does not add redundant
  `role="contentinfo"`; body-level placement supplies the page landmark, while a
  nested consumer context retains the native element's contextual semantics.
- Footer requires one or more target-owned navigation groups. Each group is a
  native `nav` named by a visible heading through `aria-labelledby` and contains
  a native `ul > li > a` inventory. Optional brand context and metadata remain
  ordinary content and do not create extra landmarks.
- Footer exposes `linkGroups`, optional `brand`, and optional `metadata`. It does
  not infer newsletter, social, locale, consent, legal CMS, app-block, payment,
  or sticky behavior. Those services and records remain target/product owned
  under ADR 0086.
- Footer evaluates the accepted 48rem stacked/wide threshold against its own
  inline size with a container query. Long localized and unbroken labels wrap
  within the component. Body-small and caption tokens replace calculated type
  scales; private column ratio and local geometry remain implementation detail.
- Footer link hover keeps primary text contrast and uses the existing accent
  token for its underline. Native focus, reduced-motion, and forced-colors
  boundaries are canonical. Footer adds no neutral runtime.
- Mobile Menu is a direct-link site-navigation list composed inside canonical
  Drawer. It requires one or more native `li > a` items and does not expose a
  second `open`, title, dismiss, focus, or backdrop owner.
- Ordinary site navigation does not use `menu`, `menubar`, `menuitem`, roving
  focus, or application-style arrow-key behavior. The v1 Mobile Menu certifies
  one direct destination level; nested disclosure navigation and close-after-
  navigation policy remain target/product decisions.
- Mobile Menu inherits Drawer title, named canonical Close Button, visibility,
  focus entry/containment, `Escape`, inertness, scroll locking, and restoration.
  The shared docs target demonstrates entry, cyclic Tab, Escape, removal of
  closed focusables, and restoration without adding neutral JavaScript.
- Search Overlay is a named modal dialog when a target actually blocks
  interaction behind it. A visible title supplies `aria-labelledby`; a required
  named canonical Close Button supplies intentional dismissal.
- Search Overlay contains one native `role="search"` form, native label, and
  `type="search"` input. A target may control the query or intentionally
  initialize native uncontrolled state, but must maintain one authoritative
  value and native form semantics.
- Search results are optional target-owned status or content. Navigable results
  use ordinary native lists and links; Search Overlay does not imply combobox or
  listbox behavior. Provider, debounce, cancellation, ranking, caching, records,
  prices, loading, empty/error truth, analytics, and announcement policy remain
  target owned. No unconditional live region is created.
- The Search target owns trigger placement, background inertness, scroll locking,
  mutual exclusion, route cleanup, and backdrop dismissal. The shared docs target
  demonstrates input focus, cyclic Tab, Escape, canonical dismissal, removal of
  closed focusables, and restoration.
- Shopify Liquid adopts the canonical semantics and classes. Footer section-group
  architecture, Mobile Menu Drawer runtime, and Search predictive/runtime layers
  remain explicit target maturity debt; this ADR does not resolve them.
- Exhibit and Studio use the same `GlobalStudio` renderer, initial fixture, and
  canonical classes for all three components. Site React state is target evidence,
  not neutral source behavior or a public default.
- Footer, Mobile Menu, and Search Overlay remain `pilot`. Automated readiness does
  not promote them to `stable` without explicit human review.

## Performance

Batch 16 adds no neutral JavaScript, observer, timer, request, provider, asset, or
continuous layout work. Deterministic level-9 gzip without file metadata measures:

- Global CSS: `4,028 B` against the permanent `3.7 KiB` ceiling, a documented
  `239 B` family exception.
- Shared neutral runtime: `10,321 B` against the permanent `8 KiB` ceiling,
  unchanged and covered by the existing documented runtime exception.
- Neutral Web component CSS: `61,781 B` against the `64 KiB` ceiling, leaving
  `3,755 B` headroom.

Relative to Batch 15, Global adds `404 B`, the complete Web component CSS adds
`417 B`, and neutral runtime source adds `0 B`. The Global exception records the
container query, semantic type roles, touch/wrap behavior, canonical dependency
hooks, bounded modal search layout, focus/hover states, reduced motion, and
forced-colors boundaries. It does not rewrite the permanent rubric ceiling.

## Consequences

- Neutral Web, Webflow, and Shopify consume the same Global CSS; target markup
  supplies route, merchant, provider, legal, locale, and service truth.
- Framework adapters may coordinate global overlays and controlled query state,
  but must preserve one state owner, canonical Drawer/Close Button composition,
  native form submission, ordinary navigation links, and truthful result status.
- Figma maps anatomy, semantic slots, states, and tokens but owns no landmarks,
  focus lifecycle, provider data, container runtime, or section-group publishing.
- SwiftUI and Compose use native page-bottom, navigation, dialog, and search
  facilities where semantically equivalent rather than copying DOM structure.
- Footer services/section groups, Mobile nested navigation, Search provider and
  global overlay orchestration, and final visual treatment remain explicit human
  or target decisions.
