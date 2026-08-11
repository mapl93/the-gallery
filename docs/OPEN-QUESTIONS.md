# The Gallery Open Questions

This file tracks questions that are still genuinely open. Resolved architecture questions should move into ADRs under `docs/decisions/`.

## Recently Resolved

The first architecture questions were resolved on 2026-05-23:

- The repo is the source of truth; Figma is a target. See `docs/decisions/0001-repo-is-design-system-source-of-truth.md`.
- The Gallery uses a layered source, contract, and adapter architecture. See `docs/decisions/0002-layered-source-contract-adapter-architecture.md`.
- The canonical token source should move toward DTCG-style `$value`/`$type` tokens. See `docs/decisions/0003-token-source-format.md`.
- The formal component source layer is `Component Contracts`. Component-scoped tokens are allowed as contract-defined customization API, not required as a universal token for every component property. See `docs/decisions/0004-component-contracts-and-component-tokens.md`.
- Target priority is web-first, then web platforms/e-commerce, then design tools, then native app targets. See `docs/decisions/0005-target-priority-and-distribution.md`.
- Registry schema/versioning is required. See `docs/decisions/0005-target-priority-and-distribution.md`.
- Generated docs output should not be treated as source. Consumer-ready outputs should be published as release/package artifacts. See `docs/decisions/0005-target-priority-and-distribution.md`.
- Canonical documentation language is English first.
- Shopify should target the latest theme-block architecture while remaining independent of Horizon-derived code for Theme Store eligibility. See `docs/decisions/0006-shopify-target-strategy.md`.
- The token source architecture is `tokens/source/` with primitives, semantics, components, and selected modes. See `docs/decisions/0007-token-source-architecture.md`.
- The first token source compiler builds ignored comparison outputs for every theme/viewport matrix. See `docs/decisions/0008-token-source-compiler.md`.
- The token migration map covers every unique legacy token path with 201 mapped tokens, 5 format changes, and 0 pending tokens. See `docs/decisions/0009-token-migration-map.md`.
- The first real target generated from `tokens/source/` is neutral web CSS at `platforms/web/tokens.css`. See `docs/decisions/0010-neutral-web-token-target.md`.
- The neutral web target exposes compatibility aliases for every public token currently used by `components/css/`. See `docs/decisions/0011-web-token-compatibility-aliases.md`.
- Platform web targets should use thin wrappers when platform packaging/load-order concerns exist; Shopify is the first wrapper consuming the neutral web token target. See `docs/decisions/0012-target-adapter-token-wrappers.md`.
- The first component contract schema and Button pilot exist. See `docs/decisions/0013-component-contract-schema-pilot.md`.
- Input is the second component contract pilot and validates richer form-control anatomy. See `docs/decisions/0014-input-component-contract-pilot.md`.
- Textarea, Select, and Card extend the validated contract pilots to form-control extensions, native selects, and layout containers. See `docs/decisions/0015-form-and-card-contract-expansion.md`.
- Checkbox, Radio, Modal, and Drawer expand contracts into native choice controls and overlays with explicit behavior requirements. See `docs/decisions/0016-control-and-overlay-contract-expansion.md`.
- The docs site now renders contract metadata, and Toast, Tabs, Accordion, Popover, and Combobox expand the behavior contract pilots. See `docs/decisions/0017-contract-docs-and-interactive-expansion.md`.
- Tooltip, Dropdown Menu, Context Menu, Command Palette, and Date Picker expand contracts into generated helper text, command menus, context-triggered menus, modal command search, and calendar controls. See `docs/decisions/0018-floating-command-and-date-contract-expansion.md`.
- Hover Card, Steps, Carousel, Scroll Area, and Lightbox expand contracts into layout interaction primitives with progress, scroll, gallery, and modal image-viewer behavior. See `docs/decisions/0019-layout-interaction-contract-expansion.md`.
- Switch, Slider, Color Picker, File Upload, Tags Input, Segmented Control, and Number Input expand contracts into advanced form controls. See `docs/decisions/0020-advanced-form-contract-expansion.md`.
- Pin Input, Field Wrapper, Fieldset, Inline Error, Password Input, and Form complete the first form infrastructure contract pass. See `docs/decisions/0021-form-infrastructure-contract-expansion.md`.
- Badge, Tag, Price, Quantity Selector, Rating, Loading Skeleton, Empty State, Divider, Avatar, and Breadcrumb formalize commerce-oriented primitive dependencies. See `docs/decisions/0022-commerce-primitive-contract-expansion.md`.
- Button Group, Icon Button, Close Button, Toggle, FAB, Alert, Progress, Spinner, Stat, Data Table, Data List, Timeline Primitive, and Link complete the remaining primitive contract pass. See `docs/decisions/0023-remaining-primitive-contract-expansion.md`.
- Product Card, Product Gallery, Product Info, Variant Selector, Product Form, Product Slider, Size Chart, Back in Stock, Store Pickup, and Subscription Option complete the product contract pass. See `docs/decisions/0024-product-contract-expansion.md`.
- Collection Hero, Collection Grid, Filter Panel, Pagination, View Toggle, Collection Promo, and Empty Collection complete the collection contract pass. See `docs/decisions/0025-collection-contract-expansion.md` and ADR 0250.
- Cart Page, Cart Line Item, Cart Summary, Discount Field, Free Shipping Bar, Cart Upsell, Cart Empty, Quick View, Sticky ATC, Cart Note, and Gift Wrap complete the cart contract pass. See `docs/decisions/0026-cart-contract-expansion.md`.
- Full registry contract coverage now exists: 183 component contracts for 183 registry components. See `docs/decisions/0027-full-component-contract-coverage.md`.
- The neutral web adapter now has a generated bundle, manifest, and validator. See `docs/decisions/0028-neutral-web-adapter-manifest-and-bundle.md`.
- Shopify now has generated adapter assets, a manifest, a summary, and validation. See `docs/decisions/0029-shopify-adapter-manifest-and-validation.md`.
- Shopify adapter maturity is computed with `shopify-maturity-v1` across CSS, Liquid, schema, data, behavior, template composition, and editor-preview layers. See `docs/decisions/0030-shopify-adapter-maturity-model.md` and `docs/decisions/0032-shopify-maturity-v1-schema-data-editor.md`.
- Target-native adapter documentation now exists, beginning with Shopify. See `docs/adapters/README.md`, `docs/adapters/shopify.md`, and `docs/decisions/0031-target-native-adapter-documentation.md`.
- Neutral web component certification is now web-first and target-specific; `stable` requires human-reviewed evidence, semantic properties belong to contracts while Studio owns only their presentation, and the docs site will become a first-party consumer of `platforms/web/index.css`. See `docs/decisions/0034-web-component-certification-and-docs-dogfooding.md` and `docs/COMPONENT-CERTIFICATION.md`.
- Button now has ten reviewed semantic properties, independent leading and trailing
  icon slots, deterministic loading placement, and complete busy/disabled
  activation rules. See `docs/decisions/0035-button-semantic-properties-and-loading-placement.md`.
- Studio presentation metadata now lives in a site-owned validated layer separate
  from component contracts. See `docs/decisions/0036-site-owned-studio-presentation-metadata.md`.
- Lucide is the canonical site-only icon source for Studio controls; component
  contracts and target adapters remain icon-library agnostic. See
  `docs/decisions/0037-studio-lucide-icon-catalogue.md`.
- Slider, Combobox, and Date Picker now have native value ownership and shared
  progressive behavior for horizontal ranges, manual list autocomplete, and
  single ISO-date calendar selection. See
  `docs/decisions/0094-native-range-autocomplete-and-calendar-ownership.md`.
- Color Picker and File Upload now preserve native radio/FileList ownership,
  shared canonical docs rendering, and bounded neutral-Web behavior. See
  `docs/decisions/0095-native-swatch-and-file-selection-ownership.md`.
- Segmented Control now preserves native named-radio ownership, while Field
  Wrapper, Fieldset, and Inline Error have explicit composition and announcement
  boundaries shared by Exhibit and Studio. See
  `docs/decisions/0096-native-segmented-and-field-infrastructure-ownership.md`.
- Password Input now preserves one same-node native secret owner, Number Input
  shares native stepping infrastructure without merging with Quantity Selector,
  and Form maps to a real container-responsive native form with target-owned
  validation/submission lifecycle. See
  `docs/decisions/0097-native-password-number-and-form-ownership.md`.
- Modal and Drawer now share explicit named modal-dialog composition while
  Toast is a passive flow-sized item with content-only live semantics; their
  global overlay/provider lifecycles remain target-owned. See
  `docs/decisions/0098-modal-drawer-and-toast-item-ownership.md`.
- Tooltip now preserves trigger naming through explicit described content,
  Accordion uses heading/native-hidden item composition, and horizontal Tabs
  declares activation, disabled, roving-focus, and panel-focus obligations.
  Their provider, group, and richer navigation services remain target-owned.
  See `docs/decisions/0099-tooltip-accordion-tabs-semantic-runtime-boundaries.md`.
- Breadcrumb now uses native ordered hierarchy and wrap-safe content, Header
  responds to its own container while composing canonical actions, and static
  Announcement Bar is neutral by default with optional intentional landmark
  naming. Header services and Announcement campaign behavior remain open under
  ADR 0086. See
  `docs/decisions/0100-breadcrumb-header-and-static-announcement-boundaries.md`.
- Footer now uses labelled native navigation groups and its own container,
  Mobile Menu is a direct-link list composed inside canonical Drawer, and Search
  Overlay is a named modal with native search form, canonical dismissal, and
  ordinary linked results. Footer services/section groups, nested mobile
  navigation, search provider/status policy, and global overlay orchestration
  remain open under ADR 0086. See
  `docs/decisions/0101-footer-mobile-navigation-and-modal-search-boundaries.md`.
- Popover now has content-derived non-modal semantics and progressive native Web
  state, Hover Card is a dismissible passive destination preview with RTL-safe
  geometry, and Dropdown Menu is a complete immediate-command menu composite.
  Placement/collision services, Hover Card timing, and checkable/submenu breadth
  remain explicit target or future product decisions. See
  `docs/decisions/0102-popover-hover-card-and-action-menu-boundaries.md`.
- Carousel now preserves native finite scroll with synchronized canonical
  controls, Scroll Area remains one conditional named overflow region, and
  Lightbox composes the accepted Modal/Close/Icon primitives with finite or
  looping navigation, swipe, bounded zoom/pan and a documented private on-scrim
  literal. Scroll presentation breadth, production modal services, downloads,
  preload/full-screen policy, and visual/token approval remain explicit target
  or owner decisions. See ADRs 0104 and 0238.
- Mega Menu is now a non-modal native grouped-link disclosure with an external
  target-owned Button controller, while Bottom Navigation is a native mobile
  destination list with router-owned current state and link-owned count meaning.
  Activation/inventory/body-offset/provider policy and visual approval remain
  explicit target or owner decisions. See
  `docs/decisions/0105-native-site-navigation-disclosure-and-mobile-destination-list.md`.
- Badge remains a passive text-first status with explicit live-region opt-in,
  while Tag exposes only a conditionally named native removal request with
  target-owned mutation, focus and announcement. Tags Input now composes Field
  Wrapper and Tag as a controlled free-text collection: Enter is its only base
  commit request, explicit Tag removal returns focus to the field, and target-
  localized status text reports meaningful results. Suggestions, delimiters,
  duplicate normalization, limits, async validation, ordering, persistence,
  serialization, Shopify data ownership and visual approval remain open. See
  `docs/decisions/0106-passive-badge-status-and-target-owned-tag-removal.md`.
  See also
  `docs/decisions/0107-controlled-free-text-tags-input-composition.md`.
- Price is now passive target-formatted text with native compare-at semantics,
  localized per-part DOM labels, BDI value isolation, one responsive size, five
  accepted OpenType switches, and target-owned monetary/legal/update policy.
  Shopify uses platform money and unit-measurement filters; product-wide versus
  selected-variant pricing, volume breaks, update cadence, and visual approval
  remain target or owner work. See
  `docs/decisions/0108-semantic-target-formatted-price-parts.md`.
- Product Info now composes one required canonical Price with a clustered product
  identity, optional semantic rich description and native metadata groups. It
  adds no neutral state/runtime and no longer absorbs Breadcrumb, Rating or
  Product Form. ADR 0239 accepts product-range-before-resolution and exact
  selected-variant Price/SKU/inventory/availability afterward under one page or
  Quick View coordinator. Shopify now uses merchant-reorderable/app-compatible
  Main Product blocks plus granular Section Rendering updates for media, info,
  form, URL, structured data and one status. Rich-content trust policy and final
  visual approval remain target or owner work. See
  `docs/decisions/0115-passive-product-info-rich-content-composition.md` and
  `docs/decisions/0239-selected-variant-product-info-projection-and-target-coordinator.md`.
- Variant Selector now uses native fieldset/legend radio groups for both swatches
  and pills, derives visible selection from checkedness, keeps sold-out values
  inspectable, natively disables nonexistent combinations, and delegates all
  cross-group product updates to one target coordinator. Shopify now uses exact
  option-value variant existence/availability, granular Section Rendering and
  Combined Listing `product_url` navigation without serializing all variants.
  Live-store/editor evidence and final visuals remain target or owner work. See
  `docs/decisions/0116-native-product-option-groups-and-target-owned-variant-coordination.md`
  and `docs/decisions/0240-inspectable-variant-availability-and-combined-listing-coordination.md`.
- Product Form is now the real native purchase form, composes canonical Variant
  Selector, Quantity Selector and Button, keeps named child values/FormData/reset
  native, distinguishes unavailable from pending, removes duplicate Price, and
  delegates merchandise resolution plus optional asynchronous work to the
  target. D5-A requires native submission and permits only same-form Ajax
  enhancement; the implemented Shopify coordinator synchronizes merchandise,
  quantity and submit state, while one merchant setting may omit Quantity. See
  `docs/decisions/0117-native-product-form-and-target-owned-purchase-lifecycle.md`
  and `docs/decisions/0241-native-product-submission-and-same-form-target-enhancement.md`.
- Cart Drawer now composes canonical Drawer, Price and Quantity Selector with a
  native line list, contextual removal and an isolated compact description-list
  summary. Cart records, mutation/status/checkout services and production
  overlay coordination remain target-owned; Shopify remains planned until its
  controller and live cart lifecycle are proved. See
  `docs/decisions/0109-target-owned-cart-drawer-composition.md`.
- ADR 0235 resolves the passive rating identity: A11 Rating is canonical and
  absorbs the target-supplied half-step value, optional localized count and
  `default | lg` size. V2 Star Rating is a temporary deprecated migration
  record with no selector alias or independent implementation. Review Summary
  supplies its exact aggregate and half-step star projection independently;
  Star Input remains the interactive radio group.
- Loading Skeleton's `variant` is its only semantic property; individual shapes
  are decorative, dimensions and busy/Status/replacement lifecycle remain
  target-owned, and the neutral shimmer is finite with static reduced-motion
  and forced-color fallbacks. ADR 0064 already accepted the API boundary; the
  refinement is recorded in `docs/decisions/0111-decorative-finite-loading-skeleton.md`.
- Empty State keeps required title content as a native contextual heading chosen
  by its owning page, panel, dialog, or section. Heading rank is not a component
  property or Studio control; Shopify's repository-owned page, 404, and drawer
  placements now supply H1/H1/H3 respectively. See ADR 0236.

## Still Open

The twelve unresolved component identities that currently block final v1
implementation are consolidated in
`docs/reports/component-refinement-decision-packet.md`. That packet records one
recommended package, explicit alternatives, the scope included in approval and
the implementation work unlocked by each owner decision. The detailed family
sections below remain the authoritative question register.

The next dependency-ordered decisions for Progress, passive Rating, Empty State,
Avatar, Product and Collection components are consolidated in
`docs/reports/component-refinement-decision-packet-02-commerce-core.md`.
Marketing, Cart and Account decisions are consolidated in
`docs/reports/component-refinement-decision-packet-03-marketing-cart-account.md`.
Blog, Ceramics and Section decisions are consolidated in
`docs/reports/component-refinement-decision-packet-04-content-sections.md`.
Together the four packets cover every component currently carrying an owner
decision before implementation or human stability review; the detailed family
sections below remain the authoritative evidence and question register.

### Gift Wrap Commercial Model

K11 now has a safe neutral Checkbox plus optional canonical Price composition,
but Shopify cannot be target-ready until the owner chooses what gift wrapping
means commercially.

Questions:

- Is gift wrapping one order-level cart attribute, a dedicated sellable
  product/variant, a per-line property captured during product addition, or
  another explicit model?
- Must the amount participate in product tax, shipping, inventory, discounts,
  checkout line display, refunds, and fulfillment as a real cart line?
- Is wrapping available per order or per item, and how should removal, quantity
  changes, mixed eligibility, Cart Drawer parity, and Ajax failure reconcile
  checkedness and totals?
- Which merchant editor configuration supplies availability, label, resource,
  price presentation, and default selection without silently enabling the
  feature?

Research, alternatives, and the neutral implementation boundary are recorded
in `docs/refinement/dossiers/gift-wrap.md` and
`docs/decisions/0183-native-gift-wrap-choice-and-commercial-model-deferral.md`.

### Pin Input Native Value Owner

ADR 0021's accepted initial implementation models a one-time code as multiple
one-character native inputs with target-owned focus movement, paste distribution,
and completion. Current HTML autofill guidance and platform evidence instead favor
one complete-code text input with `autocomplete="one-time-code"` and derived visual
cells. Changing ownership would amend accepted architecture and was intentionally
not inferred during Batch 10.

Questions:

- Should Pin Input adopt the recommended single native full-code owner with
  derived cells, or explicitly retain the existing multiple-input model?
- If multiple native inputs remain, what cross-target naming/FormData convention
  and autofill distribution model owns the complete logical code?
- After the owner is chosen, should v1 support only numeric codes, which lengths,
  and whether masking, separators, or completion callbacks are public semantics?
- Auto-submit, WebOTP requests, resend/countdown, verification, and delivery
  channels remain target-owned in either architecture.

Research and concrete alternatives are recorded in
`docs/refinement/dossiers/pin-input.md`.

### Advanced Control Product Boundaries

Slider, Combobox, and Date Picker now have a complete narrow v1 Web behavior,
but broader APIs remain product or cross-target architecture decisions.

Questions:

- Should Slider support vertical orientation, marks, tooltips, transformed
  scales, unit formatting, minimum handle distance, or Number Input composition?
- Should Combobox require a selected suggestion, support clear actions, remote
  results, loading/errors, groups, rich options, multiple values, or result
  virtualization, and which target owns those data lifecycles?
- Should Date Picker support localized edit formats, configurable first weekday,
  date ranges, multiple months, week numbers, unavailable-date predicates, or
  time selection, and what API maps coherently to every target?
- Resolved by ADR 0273: shared progressive behavior is delivered as selective
  component-owned modules; the complete runtime remains compatibility output.

### Refinement Performance Architecture

Resolved by owner selection and ADR 0273: v1 uses dependency-closed copy-and-own
install slices as the required performance unit. The executable audit now passes
19/19 required surfaces and retains two complete-bundle overages as explicit
diagnostics. See `docs/reports/component-refinement-performance.md` and
`docs/reports/modular-runtime-cross-target-certification.md`.

Follow-up optimization questions:

- Which compatibility aliases can be removed before v1 rather than charged
- When a measured family install slice becomes the next material bottleneck,
  should CSS remain family-copied or gain deterministic component extraction?
- How should complete compatibility aggregates trend over time without turning
  their diagnostic ceilings into hidden permission for unlimited growth?

### Password, Number, And Form Product Boundaries

ADR 0097 resolves their neutral-Web native ownership and narrow v1 composition,
but the following API and service choices remain product or target decisions.

Questions:

- Which password policies, minimum/maximum lengths, strength algorithm, breach
  service, policy checklist, and live-announcement cadence belong to each target?
- Should Password Input expose any strength presentation beyond the accepted
  optional authored state/text, and what visual direction should v1 approve?
- Should Number Input later expose prefix/suffix composition, units, locale-aware
  parsing/formatting, wheel policy, scrubbing, alternate densities, or any formal
  relationship beyond shared internals with Quantity Selector?
- Which Form targets need native `action`/`method` configuration versus fully
  programmatic submission, and should those target differences remain adapter
  configuration rather than neutral contract properties?
- Which layer owns async pending/disabled state, server-error reconciliation,
  error-summary insertion/announcement/focus, dirty tracking, autosave, retries,
  and multi-step navigation for composed forms?

### Modal, Drawer, And Toast Target Services

ADR 0098 resolves their neutral item/composition ownership without selecting a
production overlay coordinator or Toast provider.

Questions:

- Which Web targets use native `dialog.showModal()` and which require a custom
  portal, and how will each certify inertness, focus restoration, scroll lock,
  top-layer behavior, nested application roots, and assistive technology?
- Which runtime owns Modal/Drawer mutual exclusion, stacking, route dismissal,
  destructive backdrop policy, exit completion, and coordination with Mobile
  Menu, Search Overlay, Cart Drawer, Lightbox, and Command Palette?
- Which Toast provider owns viewport placement, queue order, duplicate collapse,
  duration, hover/focus/window-blur pause, Escape, swipe, persistence, durable
  alternatives, and suppression of concurrent assertive announcements?
- Should light-theme Success and Warning decorative Toast accents be strengthened
  beyond their current `2.54:1` and `2.15:1` surface ratios, while keeping text
  as the non-color source of meaning?
- Should Drawer ever add logical start/end placement, non-modal inspector mode,
  bottom-sheet/snap variants, swipe, resize, or safe-area controls, and which of
  those can remain target-only rather than neutral API?

### Tooltip, Accordion, And Tabs Target Services

ADR 0099 resolves the narrow neutral semantics without choosing production
providers, Accordion group policy, routing, or richer navigation modes.

Questions:

- Which Web targets use a shared Tooltip provider, and what delay, skip-delay,
  collision, portal, touch, and disabled-trigger policies can map coherently to
  Shopify, framework, native, and design-tool targets?
- Should Accordion formalize single/multiple, collapsible, group value,
  orientation, and heading-level properties, or keep those as target-owned
  composition until real consumers establish a stable cross-target model?
- Should Accordion adopt native exclusive `details/name` where available, and
  how would that progressive path preserve controlled state, disabled items,
  animation, and framework hydration?
- Which future Tabs capabilities are product requirements: vertical
  orientation, routed destinations, closable tabs, lazy panels, dynamic items,
  reordering, or overflow menus? Which belong in neutral API versus adapters?
- Does the repository render establish the v1 visual direction for these three
  components, or will the owner supply component-specific visual references
  before stability review?

### Context Menu, Command Palette, And Steps Boundaries

ADR 0103 completes their narrow neutral semantics and target-local proof without
selecting a production positioning/overlay/command service or widening passive
Steps into a workflow router.

Questions:

- Which targets should replace native long press/context selection with a custom
  Context Menu, and which collision, portal/top-layer, scroll/resize dismissal,
  disabled-item focus, and visible-fallback policies can map coherently across
  Web, Shopify, framework, and native targets?
- Are checkable items, radio groups, submenus, or navigation destinations real
  Context Menu requirements, or should v1 remain immediate commands only?
- Which coordinator owns Command Palette mutual exclusion with Modal, Drawer,
  Search Overlay, Mobile Menu, Cart Drawer, and Lightbox, including inertness,
  scroll lock, route dismissal, restoration, and stacking?
- Which application service owns Command Palette inventory, keywords, ranking,
  recent history, async providers, cancellation, loading/errors, result-count
  announcements, shortcut scope, routing/execution, and virtualization budgets?
- Should command results distinguish navigation and immediate actions in typed
  adapter data while preserving one non-nested option surface in the DOM?
- Should future Steps support interactive backward navigation, errors, disabled
  or skipped states, branching, or automatic container-driven orientation? Which
  capabilities are stable cross-target semantics versus workflow composition?
- When may the temporary `.steps__label` and `.steps__item--done` compatibility
  aliases be removed, and what consumer migration evidence is required?
- Does the repository render establish the v1 visual direction for these three
  components, or will the owner supply component-specific visual references?

### Carousel, Scroll Area, And Lightbox Boundaries

ADRs 0104 and 0238 resolve their neutral semantics without selecting a
production carousel engine, widening Scroll Area into a custom scroll
implementation, or adding a provider-specific media viewer product suite.

Questions:

- Does the repository render establish Carousel slide peek, control surface and
  placement, dot size/gap, Scroll Area scrollbar weight, and Lightbox scrim,
  media bounds, controls, caption/counter hierarchy, radius, and shadow for v1,
  or will the owner supply component-specific visual references?
- Should a future Carousel support autoplay, loop, pages per view, variable
  widths, drag physics, or an engine adapter, and which subset is genuinely
  stable across Web, Shopify, framework, native, and Figma targets?
- Which target owns Carousel lazy loading, virtualization, visible-page
  calculation, analytics, status localization, and controlled/uncontrolled
  current-index events?
- Do any consumers require Scroll Area axis, viewport size, scrollbar position,
  custom thumb geometry, or scroll shadows as semantic properties, or should
  those remain layout/target composition?
- Should the private Lightbox black/white on-scrim values become an accepted
  semantic media-canvas token family, or remain private component geometry after
  human visual review?
- Which production modal coordinator owns Lightbox portal/inertness, scroll
  lock, mutual exclusion, stacking, route dismissal, and focus restoration?
- Do standalone Lightbox consumers require thumbnails, downloads, preload,
  commerce actions, or full-screen routing beyond the accepted navigation,
  swipe and bounded zoom/pan surface?

### Product Gallery Mobile Control Direction

ADR 0238 records the owner-selected D2-C rich-media scope: discriminated image,
hosted video, external video and model records, explicit playback/viewer/AR
activation, stable controlled current id, optional uncontrolled initial id,
swipe, optional loop, and canonical Lightbox detail. Shopify maps
`product.media`; image-only is no longer the v1 boundary. The remaining question
is aesthetic interaction density and was deliberately not inferred.

Questions:

- Should mobile intentionally render both thumbnails and compact dots, or must
  one control set be selected for the v1 visual direction?

### Product Info Variant Updates And Visual Direction

Product Info is an honest passive composition of identity, required Price,
semantic rich description and native name-value metadata. D3-A resolves commerce
state ownership: product-level range before resolution, exact selected-variant
Price/SKU/inventory/availability afterward, and one coordinator for dependent
media, form, URL, structured data and one localized status. Shopify block order
and app-block compatibility are implemented at the target rather than exposed as
neutral properties.

Questions:

- Which rich-description elements and embeds are permitted per target, and which
  CMS/platform sanitizer is the trust boundary?
- Does the repository candidate become the Product Info visual reference, or
  will the owner provide component-specific artwork for identity hierarchy,
  spacing, uppercase vendor, italic subtitle, metadata density and rich content?

### Variant Selector Availability, Coordination, And Visual Direction

Variant Selector now has a native group owner, one-value framework direction,
intrinsic layout, accepted inspectable sold-out behavior, disabled nonexistent
combinations, and a source-backed Shopify high-variant/Combined Listing
coordinator. The remaining work is release evidence or visual identity rather
than an unresolved neutral architecture decision.

Questions:

- Live Shopify high-variant and Combined Listing data still needs target release
  evidence, including theme-editor/app-block behavior. It is not a prerequisite
  for neutral human visual review.
- Should swatch names stay visually hidden, appear persistently, or use an
  optional target-owned supplementary disclosure? Tooltips alone are not an
  accessible naming solution.
- Does the repository candidate become the Variant Selector visual reference,
  or will the owner provide component-specific artwork for swatch/pill geometry,
  selected/focus treatment, unavailable marks, spacing, and typography?

### Product Form Purchase Lifecycle And Visual Direction

Product Form now has a native submission owner, canonical child composition,
named FormData, target-controlled merchandise id, distinct unavailable/pending
states, intrinsic layout, and a complete Shopify native form. D5-A resolves the
purchase boundary: JavaScript-free native submission is required; capable
targets may intercept the same valid form/FormData and own the asynchronous
lifecycle without a parallel path. The shared coordinator now refreshes the
resolved merchandise id, quantity rules and submit availability atomically.
Accelerated checkout and generic supplementary slots are excluded from neutral
v1, and Shopify exposes merchant-owned Quantity visibility. The remaining work
is target release evidence or visual identity, not unresolved neutral
architecture.

Questions:

- Live Shopify native submission, high-variant replacement, quantity omission,
  theme-editor and app-block behavior still need target release evidence.
- Any future Shopify Ajax enhancement must define Cart Drawer/count updates,
  pending, error, retry, focus, announcement and rollback behavior for that
  target before it is introduced.
- Selling plans, personalization, uploads, gifts, preorder and accelerated
  checkout need separate canonical composition decisions if they enter v1.
- Does the repository candidate become the Product Form visual reference, or
  will the owner provide component-specific artwork for spacing, action geometry,
  feedback placement, disabled/pending treatment, and narrow layout?

### Product Slider Visual, Merchandising, And Future Engine Direction

Product Slider now composes the finite Carousel, Icon Button, and Product Card
contracts as one named native product list. Exact logical item navigation,
direct-scroll synchronization, focus-safe native bounds, container-driven
two/three/four-card density, shared Exhibit/Studio rendering, and a locale-aware
Shopify recommendations section are implemented. The remaining choices change
visual identity, merchandising policy, target architecture, or product scope and
were deliberately not inferred.

Questions:

- Does the repository candidate establish v1 card density/crop, heading-control
  hierarchy, gap, control surface/shadow, and vertical rhythm, or will the owner
  supply Product Slider-specific visual artwork?
- Which Shopify recommendation intents and placements are required for v1, and
  who owns complementary merchandising, recently-viewed persistence,
  loading/error presentation, cancellation, analytics, and theme-editor/live-
  store lifecycle evidence?
- Does any real v1 consumer require autoplay, loop, dots, page grouping, lazy-
  loading policy, virtualization, or a carousel engine? Which subset, if any,
  is stable across Web, Shopify, framework, native, and Figma targets?
- Do React or Angular packages need controlled current product id, uncontrolled
  initial id, or both, and which event/id names are stable enough to standardize?
- Must the unresolved Product Card primary-media contract and visual direction
  be accepted before Product Slider can be promoted from `pilot` to `stable`?

### Collection Grid Visual Density And Result-Lifecycle Direction

Collection Grid now uses native list semantics, canonical Product Cards, one
container-responsive layout, a bounded `2..6` wide-column request, exact shared
Exhibit/Studio rendering, and a target-ready Shopify section. The remaining
questions are visual, commercial, or parent/target lifecycle decisions and were
deliberately not inferred.

Questions:

- Does the repository candidate establish v1 grid gap, page padding,
  one/two/three/wide density, six-column readability, and overall collection
  rhythm, or will the owner provide Collection Grid-specific artwork?
- Must the unresolved Product Card media ratio and visual direction be accepted
  before Collection Grid can be promoted from `pilot` to `stable`?
- Should Shopify keep one merchant-controlled wide column setting with intrinsic
  narrow/intermediate modes, or does a real storefront require separate mobile
  and desktop density controls?
- Which parent/target owns filter and sort refresh, result count announcement,
  focus restoration, loading/error presentation, pagination replacement,
  analytics, and editor/live-store lifecycle proof?
- Does any v1 target require infinite loading, progressive append,
  virtualization, masonry/dense packing, or list-view substitution? Each would
  require a new explicit product and accessibility decision.

### Product Card Media Contract and Visual Direction

The technical Product Card composition now consumes Card, Badge, Button, and
Price; uses one title link; preserves coarse-pointer quick add; and validates in
the neutral Web and Shopify adapters. The remaining questions affect visual
identity or cross-target architecture and were deliberately not inferred during
the v1 refinement calibration.

Questions:

- Should the v1 media ratio remain square, switch to a portrait default, or
  become a validated semantic option? Which combinations must remain coherent in
  grids, sliders, and recommendation surfaces?
- Does the current repository render become the Product Card visual reference,
  or will the owner supply a component-specific reference before human review?
- Should Product Card expose a reusable target-agnostic primary-media slot or
  property, and what model maps cleanly to Web sources, Shopify image objects,
  framework adapters, Figma, SwiftUI, and Compose without making one target the
  source language?
- Which target owns missing-media fallback assets, responsive source selection,
  loading priority, and optional hover-media requests?

### Filter Panel Human Review And Extended Facet Policies

Resolved by owner decision E3-A and ADR 0250: E3 is now domain-neutral Filter
Panel; one form/control tree becomes an adjacent non-modal panel in coherent
containers and canonical modal Drawer when constrained. `immediate | manual`
commitment is explicit with Immediate default, groups remain visible in v1,
sort/count stay in the parent composition, and capable targets own URL/history,
requests, results/status, focus and pagination reset. The adapter owns bounded
Drawer focus, dismissal and scroll locking. No permanent Collection Filters
alias remains.

Remaining questions are visual approval or future data-policy expansion, not
permission to complete the accepted adaptive implementation:

- Approve or revise the private `40rem` container threshold, `15rem` adjacent
  width, border, surface, spacing, group divider and action hierarchy.
- Approve the constrained Drawer width, overlay, motion, close placement and
  long/localized label treatment in light, dark and forced-color modes.
- Decide later whether swatch/image presentations, merchant-specific zero-count
  policies or very large facets need additional canonical composition. V1
  already supports Shopify list, boolean and bounded price-range data without a
  public facet-schema API.
- Supply component-specific Figma artwork if the generic registered Studio nodes
  should not remain merely traceability references.

### Pagination Target Lifecycle And Narrow-Window Policy

Batch 37 establishes the safe neutral Pagination baseline: one specifically
named `nav > ul > li` structure, canonical native Links for every available
destination, one non-interactive current page, hidden passive ellipses, omitted
boundary destinations, intrinsic wrapping, and no neutral runtime. Web and
Shopify use target-owned URLs and result pages as the source of truth. The
component is ready for human visual review without resolving the target
lifecycle questions below.

Questions:

- Does the two-row narrow candidate establish the v1 responsive treatment, or
  should a target calculate a smaller page window, switch to previous/next plus
  a compact position label, or introduce another explicit mode? CSS must not
  hide page destinations to simulate that policy.
- Should every v1 target retain numbered pages, or do cursor-only, load-more, or
  infinite-result products require separate components/contracts rather than a
  Pagination variant?
- When a client target intercepts native links, which coordinator owns pending
  and error state, result replacement, URL/history, scroll position, surviving
  focus, and the one useful result announcement?
- Should directional destinations remain icon-only, become visible localized
  text, or expose one validated presentation option? Human review must evaluate
  recognizability, RTL mirroring, density, and localization.
- Does any target need the current page to remain a self-link? The accepted v1
  baseline uses non-interactive text; changing it would alter focus and
  re-navigation behavior and needs explicit evidence.
- Should Shopify remain full-page native navigation or progressively use the
  Section Rendering API? Any enhancement must preserve real URLs, filters/sort,
  history, focus/scroll, and announcements when JavaScript fails.

### View Toggle Semantic Model And Result Ownership

ADR 0247 supersedes ADR 0217 after the owner selected E5-B. E5 is now the fixed
Grid/List profile over canonical native Segmented Control: visible Legend,
icon-plus-visible-text choices, fixed Grid/List Radio values, one `activeView`,
one Tab entry point, logical arrow selection, native form/reset behavior, shared
Exhibit/Studio rendering and zero E5-specific runtime. Grid is the neutral
default unless the target supplies a valid preference, and the control is
omitted when only one real result layout exists. The target still owns results,
preference lifecycle and any useful announcement.

Questions:

- Which target preference source, when present, overrides the neutral Grid
  default: merchant setting, URL, account/server state, or another explicit rule?
- Should the preference persist in URL/history, local storage, account/server
  state or not at all, and which layer resolves conflicts among those sources?
- Which Web and Shopify result DOM/class/template contract maps Grid and List
  while preserving filters, sort, pagination, loading/error state and analytics?
- Should activation preserve scroll and focus on the button, return to the result
  heading, or use another reviewed policy? Which external owner produces at most
  one useful result/layout announcement?
- Does Shopify v1 require this control, and if so is it a storefront-only
  preference, a merchant/editor setting, or both with an explicit precedence rule?
- Does the repository candidate establish segment density, icon geometry,
  pill boundary, focus, hover, selected and coarse-pointer treatment, or
  will the owner provide E5-specific Figma artwork before stability review?

### Collection Promo Policy, Placement And Shopify Block Ownership

Resolved by owner decision E6-A and ADR 0248: neutral v1 is first-party editorial
only; sponsored/paid placement is excluded. E6 stays a passive article with one
optional complete explicit Link CTA. The target owns eligible pages, insertion
index, frequency, audience, source order, heading rank and destination metadata.
Insertion must preserve product order, pagination, counts and filter/sort truth.
Span 2 is available only when the real parent Grid has at least two coherent
tracks; targets that cannot preserve these facts omit E6.

Remaining evidence gates, not unresolved neutral API decisions:

- implement and prove the explicit Shopify collection-grid block/record, schema,
  data source, localization, editor preview and live-store path;
- review the repository candidate's height, crop/focal point, padding, overlay,
  typography, tracking, link/focus, icon, radius and one/two-track rhythm;
- provide or approve E6-specific Figma evidence; and
- explicitly approve stability after human review.

### Empty Collection Truth, Recovery And Target Lifecycle

Resolved by owner decision E7-A and ADRs 0236/0249: E7 remains a named
Collection profile with zero intentional visual divergence from canonical Empty
State. It exposes no public cause enum. Empty source inventory, filtered/search
zero and merchandising exclusion are target lifecycle facts expressed through
truthful content and an optional canonical Button-or-Link recovery. The target
atomically owns Grid/Pagination/filter visibility, recovery, URL/history, focus
and any pre-existing localized Status output. Heading rank is host-owned and E7
creates no automatic live region.

Remaining evidence gates, not unresolved neutral component decisions:

- prove authoritative source-versus-current-view empty distinction in each real
  Web and Shopify results coordinator;
- implement and verify Shopify Liquid/data/localization/editor/section-refresh
  composition without confusing empty inventory with filtered no-results;
- review canonical Empty State artwork in collection context and approve
  E7-specific Figma composition evidence; and
- explicitly approve stability after human review.

### Account Component Product Boundaries

The Account category can complete its neutral-web contracts, Studios, and
curatorial documentation without resolving the questions below by keeping
repeated records and dependency-owned controls inside composition slots. These
questions are required before broadening the public API or promoting affected
contracts to `stable`.

Questions:

- Resolved by owner decisions U0-A/U1-A and ADR 0258: Login, registration,
  passwordless, MFA, passkeys, and provider handoff remain separate target flows
  composed through one passive Auth Forms shell, not public U1 variants.
  Shopify v1 uses current customer-account authorization/API/extension profiles;
  classic Liquid, if maintained, is a separately versioned compatibility
  adapter rather than a fallback or shared source architecture.
- Resolved by owner decision U2-A and ADR 0259: Password Reset request Form and
  provider-confirmed Alert are mutually exclusive target-controlled
  compositions. U2 exposes no public success boolean or transition machine;
  the target owns provider truth, replacement and focus recovery.
- Resolved by owner decision U3-A and ADR 0260: target-controlled account views
  project authorized data and routes through canonical Account Dashboard;
  platform-owned non-replaceable screens use a documented native handoff with
  no parity claim. Shopify v1 themes therefore use `shopify-account` and hosted
  pages, while full-page extensions/headless views are distinct target-owned
  projections and classic Liquid remains separately versioned compatibility.
- Resolved by owner decision U4-A and ADR 0261: Order History has no canonical
  order/status enum. Financial and fulfillment values remain distinct target
  facts projected into one truthful localized canonical Badge summary; a richer
  target composition is required when one summary cannot preserve meaning.
  Target-controlled views may render canonical U4, Shopify v1 themes hand off
  to the hosted Order index, and extension/headless/classic compatibility
  profiles remain distinct without parity or fallback claims.
- Resolved by owner decision U5-A and ADR 0262: Order Detail composes canonical
  Steps only from a provider-trusted ordered milestone model; non-linear or
  uncertain processing, fulfillment, shipment, pickup, return and refund facts
  use ordinary target-authored status content instead. Purchased products use
  read-only Cart Line Item with no cart commands. Target-controlled views may
  render canonical U5, Shopify v1 hands off to the hosted Order status page,
  and extension/headless/classic compatibility profiles remain distinct.
- Resolved by owner decision U6-A and ADR 0263: Add/Edit are canonical actions,
  Delete requires confirmation or guaranteed undo, and Set Default appears only
  when supported. Records and default truth remain authoritative until success;
  the target owns pending/error, confirmation/undo, reconciliation,
  announcements and deliberate focus restoration. Target-controlled views may
  render canonical U6, Shopify v1 hands off to hosted Profile/Addresses, and
  extension/headless/B2B/classic compatibility profiles remain distinct.
- Resolved by owner decision U7-A and ADR 0264: Address Form formally composes
  canonical Form while every target supplies its localized field inventory,
  order, names, autocomplete purposes, requiredness, validation, and protected
  mutation. Submit is explicit; optional Cancel is target navigation or close
  composition and never implicit reset. Custom/server errors map to canonical
  field messages plus a useful linked Form summary when needed, while the target
  owns dirty-data policy, pending/failure, focus, auth expiry, success routing,
  and announcements. Shopify v1 uses hosted Profile/Addresses handoff without a
  U7 parity claim; controlled headless projection and separately versioned
  classic compatibility remain distinct profiles.
- Does the former `.wishlist-btn` become a reusable product-level Save action,
  remain a Wishlist-only command, or stay removed in favor of target-composed
  canonical Button? A persistent toggle needs stable label plus `aria-pressed`
  and explicit controlled/uncontrolled ownership; a saved-page `Remove` command
  has no pressed state and may remove its Product Card from the collection.
- Is Wishlist v1 authenticated-account-only, anonymous local-device storage,
  app-backed cross-device storage, or a hybrid that merges on sign-in? Which
  layer owns consent, retention/expiry, limits, deduplication, conflicts,
  privacy, protected customer data, authorization, telemetry, and analytics?
- Does removal wait for persistence, optimistically delete with restoration,
  retain an unsaved Card, require confirmation, or offer Undo? Which layer owns
  pending/disabled state, failures, count refresh, empty transition, status
  announcements, and focus after the activated Button leaves the DOM?
- Is saved-product order meaningful, merchant-controlled, customer-reorderable,
  or query-defined? How should unavailable, deleted, region-restricted, or
  stale-price products be represented without falsifying Product Card data?
- Should Wishlist formally compose canonical Empty State, Skeleton/Spinner,
  Alert, and Status across its lifecycle, or keep those surfaces entirely
  target-owned? Empty State heading rank is already host-owned under ADR 0236.
- Does Shopify Wishlist map first to the documented
  `customer-account.page.render` full-page extension, a headless/app-backed
  surface, a theme/app-block or local-storage storefront profile, explicit
  compatibility, or target omission? These profiles must not be presented as
  interchangeable theme Liquid.
- Does each target persist Account Settings through one global explicit Form,
  independent section Forms, immediate changes, or a documented mixture? U9
  remains a passive section shell and must not encode the answer.
- Which v1 settings are platform-hosted versus The Gallery-rendered, and which
  binary preferences are immediate Switches versus deferred Checkbox/Form
  choices?
- Which layer owns Account Settings dirty-state navigation warnings, pending and
  disabled state, optimistic versus confirmed changes, user-error mapping,
  retries/conflicts, authentication expiry, focus recovery, announcements,
  refresh, audit history, telemetry, and analytics?
- Which notification and marketing preferences are regulated consent records
  requiring timestamp, source, unsubscribe, or double-opt-in behavior rather
  than ordinary account booleans?
- Does Shopify Account Settings map first to a current Profile extension,
  full-page customer-account extension, authenticated headless Customer Account
  API surface, explicit compatibility, or target omission? How are protected
  customer data and B2B surfaces handled?
- Should U9 keep Form, Input, Button, and Switch as direct common-composition
  dependencies, or should a future narrower shell name only its sections slot
  and discover all child dependencies transitively?

### Blog Component Product Boundaries

The Blog category can refine its static editorial composition while leaving
navigation, reading-state calculation, sharing providers, and comment data to
their eventual owners. These questions must be resolved before affected APIs
or neutral behavior are promoted to `stable`.

Questions:

- Is Article Card skeleton presentation a public state of Article Card or a
  composition of the standalone Skeleton component?
- Does Article Card receive an owner-approved default surface, border, and
  elevation, or remain borderless unless its parent composition supplies one?
- Is the accepted one-title-Link model permanent, or should a future supported
  link-area primitive combine media and title when the complete composition has
  no other interactive descendants?
- Are category and author always passive labels, optional independent Links, or
  target-specific records? Which target owns those destinations and target-size
  requirements?
- Which target supplies localized publication/date formatting and optional
  duration, and may duration ever be calculated rather than supplied? Neutral
  Article Card does not infer reading time.
- Should target adapters preserve complete title/excerpt content in all
  placements, or may a future reviewed content policy expose explicit editorial
  truncation? Current L1 CSS does not clamp.
- Which Shopify owner composes Article Card lists/sections and passes the
  optional blog label? The target-native snippet intentionally does not infer
  taxonomy from URL, tags, or article content.
- Does Article Hero remain visually unframed, or receive an owner-approved
  surface, border, radius, or elevation? The removed Studio treatment was not
  canonical design evidence.
- Must targets reject Article Hero `full` when background media is absent, or is
  the canonical readable no-media fallback an accepted product state?
- What crop/focal-point and text-safe-area policy is approved for Article Hero
  full and split media, and does overlay strength require target art direction?
- Are Article Hero category and author values passive text or independent
  target-owned Links, and which metadata fields/order/duration policy applies by
  locale and target?
- Which Shopify section/template first consumes `article-hero`, owns editor
  schema and blog label, and selects heading rank, image priority/sizes, empty
  article behavior, SEO, and structured data?
- Which layer is the sole canonical `.prose` owner: L3 Blog, or Foundations as
  an explicit base dependency plus documented L3 extensions? Current duplicate
  owners produce different copy-and-own output and block Article Body stability.
- Does `.prose__product-embed` become a canonical Product Card/Price
  composition in a prose-excluded island, become a registered Inline Product
  Embed, or leave L3? The current unregistered mini card is not certifiable.
- Does actual full-bleed article media belong to the host article/page outside
  `.prose`, or should L3 receive an explicit host breakout contract? The
  current safe L3 behavior is contained and does not promise viewport escape.
- Should `.pull-quote` and `.callout` migrate to L3-scoped BEM class names, or
  retain the current class names as compatibility hooks for a defined period?
- What readable measure, type rhythm, drop-cap geometry, quote/callout/media,
  code/table, link/visited, and media-collection visuals are owner-approved?
- Which Shopify article owner first consumes `article-body` and owns section or
  template schema, trusted-content policy, rich custom blocks, table/code
  wrappers, image rewriting, product composition, empty content, SEO, and
  editor UX?
- ADR 0228 resolves Reading Progress as one always-decorative article-position
  cue with exclusive Controlled and Automatic sources. Neutral Web owns one
  shared explicit-target measurement service; targets without safe geometry use
  Controlled. L4 is never a progressbar, scrollbar or live announcement, and
  its host owns placement, safe areas, Header offsets and stacking. Open: which
  specific Shopify article/template first owns source association, Theme Editor
  lifecycle and placement, and should Table of Contents later reuse the same
  measurement service without coupling its public contract to L4?
- Which Shopify article/template source owns Table of Contents heading text,
  nested order, unique fragment identifiers, editor lifecycle, localization,
  omission for short/unstructured content, and any current-location tracking:
  explicit structured data, build preprocessing, or bounded target JavaScript?
  Native Article content exposes formatted HTML but no Liquid heading index.
- Is L5 sticky presentation retained for v1, and which host owns the real
  header/safe-area offset, available block size for long lists, section scroll
  margins/padding, collision, and focus-not-obscured evidence?
- Which targets need automatic `aria-current="location"` synchronization, and
  what source/threshold/hash/focus policy do they use? Static L5 now omits current
  state rather than inventing a neutral observer.
- What L5 surface, border/radius, marker visibility, nesting depth/inset,
  typography/rhythm, current-location cue, and Mobile/Tablet/Desktop/XL page
  composition are owner-approved?
- ADR 0197 and owner decision 50 resolve Author Card as one passive singular
  identity with neutral host-owned semantics. Which first Web/Shopify article
  consumer selects `footer`, tangential `aside`, contact-only `address`, a
  contextual heading or author Link, and what integration evidence proves that
  choice truthful in its actual document?
- Which Shopify owner first consumes `author-card`, and is Liquid `article.user`
  the approved public source? Email remains off by default and homepage/social
  destinations require explicit supply and approval; which localized labels,
  consent rules and headless `ArticleAuthor` projection apply to that consumer?
- Multiple authors now repeat canonical singular Author Cards in a host-owned
  collection. Which real target needs that composition, and which approved
  source supplies role/social facts that do not exist consistently across
  Shopify author APIs?
- What L6 full/compact surface, border/radius, Avatar size/placement,
  typography/rhythm, Link/icon treatment, narrow wrapping and article-context
  composition are owner-approved, and where is the component-specific Figma
  evidence?
- Which first Web and Shopify consumers integrate Filter Bar with real query
  records and results; which target-specific query key, repeated-value
  serialization, push-versus-replace policy, result announcement/focus behavior
  and final L7 visual/Figma treatment are approved? ADR 0229 resolves the
  neutral identity, canonical choice composition, controlled selection and
  target lifecycle boundary.
- ADR 0198 and owner decision 51 resolve the public Blog Sidebar name, canonical
  Topic selectors, initial Recent Articles + Topics Link-list profile,
  target-owned order/limits/headings and separate Search/Newsletter lifecycles.
  Which first Web/Shopify page places the component, what editor exposure and
  localized content it uses, when are `.tag-cloud*` migration aliases removed
  before v1 freeze, and what responsive/final visual and L8-specific design
  evidence are approved?
- Which real Web and Shopify consumers, curated action subset, provider
  mappings, canonical resource source, popup/security policy, result-feedback
  pattern and final L9 visual/Figma treatment are approved? ADR 0230 resolves
  `.share-buttons` as the sole canonical Share Actions family, replaces sticky
  with intrinsic stacked layout, assigns fixed placement to a host/separate
  Share Rail, and keeps capabilities plus results target-owned.
- ADR 0199 and owner decision 52 resolve L10 as one-to-three explicitly curated
  canonical Article Cards in curator order, excluding the current article and
  duplicates, with no tag fallback or personalization. It belongs after primary
  article content and before Comments; `.article-nav` is never L10 and no
  Previous/Next component is registered in v1. Shopify now maps the rule through
  an ordered `article_list` section. Which first article template installs it,
  what final card/grid visuals are approved, and where is the L10-specific
  design evidence?
- ADR 0200 and owner decision 53 resolve Comments as a finite named discussion
  with at most two visible levels, contextual flattening, canonical valid-empty
  state, oldest-first records, optional verified Select, finite Pagination and
  target-configured controlled reaction arrays. Shopify now has a flat
  article-only section with native comments/form/moderation mapping and
  canonical Empty State/Pagination. Which first real article template installs
  it, which provider/auth/privacy/moderation/sanitization/rate-limit and
  edit/delete/report policies apply, and what post-mutation focus, announcement,
  count, permalink, analytics and notification behavior is verified live?
- Which final Comment Section section rhythm, Avatar scale, reply inset, text
  measure, composer density, Mobile/Tablet/Desktop/XL visuals and L11-specific
  design evidence are owner-approved?

### Storytelling Component Product Boundaries

Storytelling can complete its content anatomy, responsive layout, and Studio
fixtures while interactive destinations remain target-owned. The questions
below prevent inventing navigation or selection contracts from visual CSS.

Questions:

- Is each Masonry Gallery piece passive content, a link to an artwork, or a
  Lightbox trigger?
- Is Artist Index filtering single-select or multi-select? Is `All` exclusive,
  and which layer synchronizes the controls with results and URL state?
- Is Artist Card always a full-card link, or must it also support a passive
  presentation mode?
- Does Exhibition Page formally compose Product Card and Artist Card for works
  and artists, or expose target-owned slots without those public dependencies?

### Artist Profile Human Review

Artist Profile now has a source-backed semantic and cross-target implementation:
section-labelled native composition, portrait-first container layout, optional media, rich
biography, semantic quotation, canonical Button actions, and zero neutral
runtime. The remaining questions are visual approval, not permission to correct
semantic or adapter drift.

Questions:

- Should the v1 portrait remain `3:4` with target-owned `cover` crop and focal
  point, or does the owner want a different single canonical ratio?
- Approve or revise equal wide columns and the private `36rem` content-container
  threshold.
- Approve or revise the archival surface, large portrait radius, section insets,
  caption-uppercase label, heading/article scale, and vertical rhythm.
- Approve or revise the italic accent quotation with a logical inline-start rule.
- Approve primary plus outline Button emphasis and wrapped action layout.
- Confirm that portrait position, compact density, alignment and alternate
  surface remain absent from the v1 public API.

### Process Timeline Human Review

Process Timeline now has a source-backed semantic and cross-target
implementation: named native section, ordered one-row composition, visible
numbering, optional target-owned media/descriptions, intrinsic overflow, native
keyboard scrolling, logical decorative connectors, Shopify blocks and zero
neutral runtime. The remaining questions are visual approval, not permission to
correct semantic, responsive or adapter drift.

Questions:

- Approve or revise the one-row narrative lane and its private minimum step
  width before horizontal overflow begins.
- Approve or revise the `4:3` media crop, `36px` statement marker, full radius and
  logical connector retention/treatment.
- Approve or revise centered alignment, heading/body hierarchy, section insets,
  item gaps and the partial next-step cue produced by scroll snap.
- Confirm that vertical orientation, compact density, alternate surfaces,
  alignment, connector visibility and image ratio remain absent from the v1
  public API.

### Collection Story Human Review

Collection Story now has a source-backed semantic and cross-target
implementation: named native section, media-first source order, intrinsic
optional-media split, required narrative, genuine quotation semantics,
target-owned actions, Shopify image metadata and zero neutral runtime. The
remaining questions are visual/product approval, not permission to correct
semantic, responsive or adapter drift.

Questions:

- Approve or revise the private `4:3` media ratio, crop treatment, large radius,
  equal wide columns and `42rem` intrinsic split threshold.
- Approve or revise the section inset, `42rem` narrative measure, label/title/
  body scale, vertical rhythm, quotation rule and accent pairing.
- Approve or revise primary Button use in the Gallery fixture and outline Button
  use in Shopify; decide separately whether Button becomes a formal dependency.
- Confirm that column count, threshold, media ratio/position, alignment,
  surface, density, heading rank and action style remain absent from the v1
  public API.

### Masonry Gallery Human Review

Masonry Gallery now has a source-backed passive and cross-target candidate:
native list/figure semantics, authoritative source order, component-width
multi-columns, natural media proportions, persistent passive captions,
target-native interactive disclosure boundaries, Shopify artwork blocks and
zero neutral runtime. The activation question above remains intentionally open.

Questions:

- Approve or revise the private `13rem` minimum column width, maximum three
  columns, grid gap and source-flow visual reading model.
- Approve or revise natural image proportions, medium radius, opaque caption
  surface, caption placement, title/price hierarchy and internal padding.
- Approve or remove the subtle optional image scale reserved for native
  target-interactive pieces.
- Decide separately whether pieces remain passive, become artwork links, open a
  Lightbox or support target-selectable activation, and which dependencies that
  decision introduces.
- Confirm that columns, column width, ratio, crop, caption treatment, density,
  group naming and activation remain absent from the v1 neutral API.

### Artist Index Human Review

Artist Index now has a source-backed passive Neutral Web candidate: a
heading-labelled section, native ordered result list, one/two/three
component-width tracks, exact Exhibit/Studio markup, decorative fictional
fixture media, optional target filter hooks and zero neutral runtime. The
filtering and Artist Card dependency questions above remain intentionally open;
Shopify remains CSS-ready until an artist data model is accepted.

Questions:

- Approve or revise the private `27rem` and `44rem` track thresholds, maximum
  three columns, grid gap, section inset and heading/introduction rhythm.
- Approve or revise optional filter pill density, full radius, primary selected
  surface, focus treatment, wrapping and the decision to omit filters from the
  default shared fixture.
- Decide whether the v1 filter model is single-select, multi-select,
  navigational or target-specific; whether `All` is exclusive; and which layer
  owns values, URL, requests, results, status, empty/loading/error states,
  focus, analytics and persistence.
- Decide whether Artist Index formally composes Artist Card or continues to
  accept arbitrary target-owned artist records.
- Define the Shopify artist source and editor model before approving Liquid,
  schema, blocks, routes or filtering behavior.
- Confirm that columns, thresholds, density, filter values/mode, result-card
  anatomy, heading rank, destination and events remain absent from the v1
  neutral API.

### Artist Card Human Review

Artist Card now has a source-backed passive Neutral Web candidate: one native
article, optional target-owned portrait, canonical Badge composition, required
name, omitted-empty metadata, conditional native-root interaction hooks, exact
Exhibit/Studio markup and zero neutral runtime. Shopify remains CSS-ready until
an artist data and destination model is accepted.

Questions:

- Approve or revise the private `3:4` portrait ratio, cover crop, medium radius,
  Badge inset, name/metadata typography and vertical rhythm.
- Approve or remove the subtle `1.03` portrait scale reserved only for native
  target-interactive roots; approve the 2px focus outline and offset.
- Decide whether Artist Card is always passive, always a full-card link, or
  allows a target-level native link/button choice without a neutral property.
- Decide whether a future visual shell should compose canonical Card; the
  current flat portrait-plus-metadata candidate intentionally does not.
- Define the Shopify artist record, merchant editor model, portrait fields,
  route/destination, responsive image widths and loading priority before
  approving dedicated Liquid or schema. Metaobjects are one option, not the
  assumed answer.
- Confirm that ratio, crop, focal point, density, size, metadata layout,
  destination, activation, events and image URL remain absent from the v1
  neutral API.

### Exhibition Page Human Review

Exhibition Page now has a source-backed passive Neutral Web candidate: a
heading-labelled embedded article, valid media/no-media hero, neutral
information layout, semantic metadata and repeated lists, intrinsic record
grids, exact Exhibit/Studio markup and zero neutral runtime. Product Card and
Artist Card composition remains explicitly open. Shopify remains CSS-ready
until exhibition, work and artist data/editor ownership is accepted.

Questions:

- Approve or revise the private `24rem`/`42rem` hero bounds, `70cqi` scale,
  `120cqi`/`180cqi` narrow-container caps, target-owned cover crop, scrim
  treatment and `20ch` title measure.
- Approve or revise the statement-surface no-media hero, information `2:1`
  wide ratio, private `44rem` information threshold, section inset/rhythm and
  `11rem` work-grid minimum.
- Approve or revise the compact participating-artist record, `11rem` track
  minimum, `3.5rem` circular image and name/role hierarchy.
- Decide whether works and artists formally compose Product Card and Artist
  Card, remain arbitrary target-owned records, or support more than one
  target-specific mode. Decide any link, action, Lightbox or commerce ownership
  separately.
- Define Shopify exhibition, work and artist sources, JSON page template,
  sections/blocks, schema/dynamic sources, routes, responsive image widths,
  focal policy and editor behavior before approving dedicated Liquid.
- Decide whether a cross-target structured date-range and responsive-media
  contract should be introduced in a later architecture decision; the current
  neutral API intentionally keeps target-formatted date text and media slots.
- Confirm that hero dimensions, crop, focal point, scrim, title measure,
  columns, thresholds, density, record anatomy, destinations, actions, events,
  image URLs and CMS data remain absent from the v1 neutral API.

### Artist Statement Human Review

Artist Statement now has a source-backed passive and cross-target candidate: a
heading-labelled native section, optional target-owned portrait, required artist
identity and rich authored body, genuine quotation semantics, editorial-only
signature composition, container-owned reflow, exact Exhibit/Studio markup,
localized Shopify section and zero neutral runtime.

Questions:

- Approve or revise the private `3:4` portrait ratio, target-owned cover crop,
  `18.75rem` narrow cap, sticky wide treatment, one-third/two-thirds split and
  `42rem` content-container threshold.
- Approve or revise the `42rem` narrative measure, section inset, label/name/
  quote/body hierarchy, vertical rhythm, logical decorative quote rule and
  signature treatment.
- Confirm that a signature remains editorial text/media only and does not imply
  authentication, proof, identity verification or cryptographic signing.
- Approve Shopify's portrait intent, rich body, quotation and mutually exclusive
  text/image signature editor mapping; decide any future shared artist
  record/metaobject separately.
- Confirm that layout, portrait side, threshold, ratio, crop, sticky behavior,
  heading rank, quote attribution, signature medium, density, image fields,
  destinations and events remain outside the v1 neutral API.

### Marketing Component Product Boundaries

Marketing components can refine their structural contracts and responsive
presentation without assuming campaign data, consent policy, timers, or form
backends. These questions must be answered before neutral behavior or defaults
are claimed.

Questions:

- Resolved by ADR 0251: Newsletter remains a thin native Form/Input/Button
  composition with one optional target-confirmed response placement. Pending,
  success, error, retry, duplicate handling, provider integration, consent and
  result focus/announcement stay target-owned for v1.
- Resolved by ADR 0224: G4 is a deprecated migration record to canonical
  anchored Popover; genuinely modal marketing remains a canonical Modal recipe.
- Resolved by ADR 0225: G7 owns a real absolute-deadline runtime, one shared
  visibility-aware scheduler, stable configurable units, retained zero,
  `running | expired` output and one expiry event. Domain consequences remain
  target-owned.
- Resolved by ADR 0252: G8 retains Low Stock, Selling Fast, Viewers and Recent
  Sale as explicit passive types. The target supplies an already-qualified,
  complete localized claim and owns the accepted type-specific source,
  threshold/window, freshness, privacy and stale/error omission policy.
- Production-adapter evidence remains open per target: document and prove the
  authoritative source, selected-variant/market scope where applicable,
  bounded refresh/expiry, privacy minimum, omission behavior and placement.
  Neutral G8 never polls or announces promotional refreshes.
- ADR 0226 resolves G9 as Consent Manager: its first layer is a controlled,
  named, non-modal in-flow surface with explicit Accept, Reject and Customize
  requests; preferences compose canonical Modal and target-supplied canonical
  choice controls; closed content is omitted/natively hidden; and the target
  owns policy, provider, persistence, processing, errors, withdrawal and any
  fixed/sticky focus-obstruction policy. Which target/provider surface should
  be implemented first, and which G9-specific visual reference approves the
  action equality, density and preference hierarchy?
- Resolved by ADR 0253: G10 remains a separately discoverable passive profile
  of canonical Toast. It presents at most one verified, current and
  privacy-approved target statement, has no live role/provider/queue/timer in
  neutral source, and leaves truth, anonymisation/consent, freshness, expiry,
  placement and appearance lifecycle to the target.
- Shopify v1 omits G10 until a verified provider or authoritative source and
  its event/privacy/lifecycle policy are selected and certified. Production
  provider evidence and G10-specific media/time/measure/Close/placement design
  review remain target and human gates, not neutral architecture questions.
- ADR 0227 resolves G11 by deprecating it into canonical C2 Announcement Bar,
  whose exclusive Static, Countdown and Rotating modes compose canonical
  dependencies and whose orthogonal dismissal remains target-controlled. Which
  Shopify surface should implement the dynamic modes first: storefront Header
  section group, Checkout host Announcement, customer/app surface, or omission?
- Which C2-specific visual reference approves final compact density, control
  hierarchy, wrapping, counter treatment and its relationship with Header?
- Should the existing Shopify Announcement/Header static layout insertion move
  to a modern Header section group before either C2 or G11 is called target-
  ready?
- Which G11-specific visual/Figma reference approves message measure, close
  treatment, Header stacking and any retained Countdown/rotation controls?

### Section Component Product Boundaries

Sections can expose semantic content and composition regions without claiming
runtime behavior, provider data, or target routing. These questions must be
resolved before affected contracts can move beyond `pilot`.

Questions:

- Should S1 Hero Section and G1 Hero Banner consolidate into one canonical Hero,
  or remain separate with what exact consumer-facing selection rule and target
  adapter ownership? See ADR 0145.
- ADR 0151 resolves Video Section's neutral boundary: required target-owned
  media composes inside a passive native figure, the inert play action is
  removed, and the selected target/player owns playback, loading, controls,
  captions, descriptions, transcript, errors, consent, autoplay, events and
  analytics. Which targets support hosted, external, decorative, narrated,
  live or mixed media; whether a shared Player contract is required; and the
  exact Shopify profile remain explicit product/architecture decisions.
- Are Hero parallax and slideshow navigation shared neutral enhancements or
  target-specific behavior, and who owns state, timing, pause, focus,
  announcements, reduced motion, and media playback? Should either capability
  remain on S1, move to a composed component, or be removed until implemented?
- ADR 0233 resolves Before / After interaction: one canonical native Slider is
  the sole value, focus, pointer, touch, keyboard, form and reset owner; its
  fixed percentage synchronizes the logical clip and decorative divider. Media
  artwork and final visual treatment remain pending human review.
- ADRs 0231 and 0232 resolve shared Logo Bar/Marquee motion ownership:
  canonical Marquee owns one inert visual copy, logical direction, semantic
  distance-normalized pace, persistent Pause/Resume, and static
  reduced-motion/no-enhancement fallback; Logo Bar defaults to a native static
  mark list and composes that lifecycle only when selected. Component-specific
  artwork, mark geometry and final visual velocities remain human review
  questions.
- Which target owns Instagram authorization, fetching, caching, consent,
  freshness, errors, empty states, and the activation semantics of feed items?
- Are Gallery Grid, Lookbook, Instagram Feed, and Collage items passive, links,
  Lightbox triggers, commerce disclosures, or target-specific mixtures?
- ADR 0146 resolves Featured Collection's neutral boundary: each target supplies
  the ordered Product Card collection and owns queries, sorting, availability,
  pricing freshness, loading, empty/error state, analytics, and announcements;
  neutral Spotlight only emphasizes the first supplied item. Which commercial
  policy selects the collection, order, and first Spotlight record in each
  product remains an owner/target decision.
- ADR 0147 resolves Image with Text's neutral boundary: media, visible title and
  narrative body form one required passive composition; the target owns native
  media/heading/rich-text/action facts, and Button owns action behavior. Human
  review must still approve the private `4 / 3` crop, split density, Offset
  inset, Overlay block size/scrim and five-presentation hierarchy. Interactive
  video or provider-specific media remains a separate child/target decision.
- ADR 0152 resolves Brand Story's implementation boundary as a passive profile
  of canonical Image with Text with required media/title/body and an optional
  ordinary signature footer. Human review must still approve its separate
  product identity, inherited crop/split/density, signature treatment and
  raster light/dark asset policy, heading/rich-content policy, record model and
  component-specific Figma evidence.
- Which layer owns Stats count-up timing, formatting, live updates, and
  announcements?
- ADRs 0155 and 0272 resolve Comparison Table as a passive or controlled
  selectable contextual composition of canonical Data Table, with the title
  outside the named keyboard-scroll wrapper, native caption/header
  relationships, canonical Radio/Checkbox choice controls, independent
  Link/Button actions, text-complete statuses, target-owned finite matrix
  content, and zero S13 neutral runtime. Owner decision 66 selects a
  metaobject-backed variable finite Shopify matrix. The remaining Shopify gate
  is to choose and evidence exact `maxAlternatives`, `maxCriteria`, and
  `maxCells`, concrete definitions, custom/app versus Theme Store delivery
  profile, editor validation, selection persistence, and CTA lifecycle. Human
  review must separately approve the `72rem` measure, private readable table
  minimum, inherited density, title rhythm, highlight, status shapes,
  forced-color boundary, and corrected S13-specific Figma evidence.

### Ceramics Component Product Boundaries

Ceramics components currently expose content and composition without freezing a
CMS, booking system, verification service, or media provider.

ADR 0125 resolves Certificate's passive presentation boundary: native record
semantics, target-owned detail/signature/verification composition, and no
synthetic QR, status, proof, or authenticity claim. It intentionally leaves the
authoritative record and verification-service questions below open.

ADR 0211 converts Certificate Details into a Ceramics-context profile of that
canonical Certificate implementation. It removes the parallel card, decorative
check seal and QR-only API, requires a named article plus non-empty native
details, and permits verification only as a real descriptive canonical link
with optional redundant media. It intentionally leaves whether R11 remains a
separate v1 registry identity, becomes a genuinely distinct compact variant, or
is consolidated completely into F3 as an owner architecture decision.

ADR 0141 resolves Ceramics Glossary's current implementation boundary: grouped
terms compose canonical Accordion and Link, inert alphabet controls are removed,
and targets own records, ids and expansion coordination. It intentionally
leaves the stable disclosure-versus-visible-definition mode and all alphabet
navigation, filtering and search behavior below open.

ADR 0142 resolves Studio Tour's current implementation boundary: it becomes a
contextual profile of canonical Process Timeline, requires a visible heading,
removes the inert playback action, and keeps the neutral supplementary-media
fixture passive. It intentionally leaves record/schema ownership, supported
media types, provider, privacy/consent, loading, controls, captions,
descriptions, transcripts, playback, modal presentation and analytics below
open.

ADR 0143 resolves Ceramics FAQ's current implementation boundary: questions
and answers compose canonical Accordion, optional follow-up navigation composes
canonical Link, and inert category controls are removed. It intentionally
leaves category navigation versus in-place filtering, stable disclosure versus
visible content, group policy, records, content policy and target integrations
below open.

ADR 0201 resolves Material Library's neutral implementation boundary: R1 is a
passive conditional section/div containing a native list of complete named
material articles, optional context-dependent media and canonical passive Tags.
It intentionally leaves record/schema ownership, ordering meaning, technical
facts, claims, interaction, target mapping and final visual direction below open.

ADR 0202 resolves Glaze Guide's neutral implementation boundary: R2 is a
passive conditional section/div containing a native list of named sample
figures and an optional explicitly featured/reference detail article. It removes
the invented button selection from Exhibit/Studio while preserving the legacy
selected CSS rule only as a target projection hook. It intentionally leaves
selectable-mode identity, state ownership, records, facts/claims, media, target
mapping and final visual direction below open.

ADR 0203 resolves Technique Explainer's neutral implementation boundary: R3 is
a passive conditional section/div containing one native ordered list of complete
text-first steps. Owner decision 57 fixes required `name` and `description` plus
optional target-composed reviewed `details` and `media`; safety warnings use
separately reviewed rich content or canonical Alert, never arbitrary untyped
details. Visible ordinals derive from list position; canonical container CSS
may alternate supporting media without changing meaningful source order. The
neutral API and safety boundary are resolved. Production record proof, first
rich-details/media consumers, Shopify mapping and final human visual approval
remain below as target evidence gates.

ADR 0204 resolves Care Instructions' neutral implementation boundary: R4 is a
passive conditional section/div containing one native unordered list of
complete visible guidance, optional decorative icons, and homogeneous
Default/Do/Don't supporting treatments. Owner decision 58 fixes one homogeneous
neutral, recommended, or avoid tone per instance, separate instances for a
Do/Don't composition, stable `default | do | dont` values with target-localized
visible vocabulary, and separately reviewed rich content or canonical Alert
for legal/safety warnings. The neutral grouping and safety boundary are
resolved. Production records/review, symbol policy, Shopify mapping and final
human visual approval remain below as target evidence gates.

Questions:

- Which concrete target first supplies production R-family records and proves
  the R0-owned provenance, revision, localization, rights, applicability,
  measurement and claim-review lifecycle?
- For the accepted passive R1-A collection, are production visuals raw samples,
  fired outcomes or editorial images, and what crop, alt, loading, fallback and
  rights policy does that target certify?
- Which Shopify template first consumes R1-A, and what target-native data source,
  editor schema, limits, authoritative order, material-product relationship and
  localization are approved?
- Which layer owns glaze records, formulas, firing ranges, codes, vocabulary,
  localization, revisions, compatibility, safety and food-contact claims, and
  who validates accuracy/freshness?
- For accepted passive R2-A records, are production visuals flat
  approximations, fired test tiles, product photography or editorial media; what
  color-management, crop, alt, fallback and disclosure policy is certified?
- Which Shopify template first consumes passive R2-A, and how do target records
  map to metafields/metaobjects, editor settings and localization? Purchasable
  selection remains a separate Radio/Variant Selector product composition.
- Which concrete target first proves R0-owned Technique Explainer record
  provenance, localization, revision, applicability, factual/editorial review
  and rights?
- Which native/canonical parts does the first production R3 details composition
  use, and how does that target prove safety warnings and precautions remain in
  separately reviewed rich content or canonical Alert?
- For the first production R3 media consumer, are images informative,
  redundant or ambient; what crop, aspect ratio, alternative-text, loading,
  fallback, credit, rights and disclosure policy is certified?
- Which Shopify template first consumes R3, and what source, section/block
  schema, limits/order, localization, media picker and migration are approved?
- Does explicit human review approve R3's current zero-padded ordinal,
  typography, spacing, media treatment and private `30rem` wide-alternation
  threshold, or is R3-specific design evidence required first?
- Which concrete target first proves R0-owned R4 care records, product
  applicability, editorial/safety/legal review, revision history, localization,
  recalls and consumer association?
- Are production R4 icons decorative illustrations, standardized care symbols
  or branded pictograms, and which catalogue, licensing, fallback and
  cross-target mapping does the first consumer certify?
- Which care statements require qualifications, linked details, dates,
  provenance, regulatory disclosure or acknowledgement, and how does the first
  target prove their separate reviewed-rich-content/Alert composition?
- Which Shopify template first consumes R4, and what product data source,
  editor schema, limits/order, locale, merchant validation and migration are
  approved?
- Does explicit human review approve the centered intrinsic icon grid, current
  private track measure, sparse/text-heavy behavior and target-visible
  vocabulary, or is R4-specific design evidence required first?
- Which production target first proves Dimensions' complete preformatted unit
  sets, atomic mapping and stale/error behavior under decision 59?
- Does Ceramics Glossary alphabet UI navigate, scroll, or filter, and who owns
  search, result, and URL state?
- Should stable Ceramics Glossary use disclosure Accordion or an always-visible
  native `dl`, and what user evidence supports the additional interaction?
- Which system owns workshop booking, capacity, pricing, authentication,
  payment, cancellation, and confirmation?
- What makes a certificate verifiable, where does QR content lead, and which
  target may make authenticity guarantees?
- Which Studio Tour media types are supported, and who owns consent, loading,
  playback, captions, modal presentation, and analytics?
- What are the Commission Form fields, consent requirements, submission states,
  persistence rules, notifications, and downstream workflow?
- Do Ceramics FAQ categories navigate or filter in place, and who owns their
  taxonomy, URL, focus, result, empty, and announcement lifecycle?
- Should stable Ceramics FAQ use Accordion, always-visible headings, or separate
  pages, and what user evidence supports the additional disclosure interaction?

### Commission Form Human Review

Commission Form now has a safe neutral candidate without selecting the
commercial workflow: strict required-field omission, optional introduction/
upload/actions, canonical Input/Textarea/File Upload/Button composition, native
standalone form semantics in the docs fixture, one FileList owner, native reset,
intrinsic logical layout, shared Exhibit/Studio renderer/fixture and zero R8
neutral runtime. ADR 0208 records that boundary.

Owner decision 62 accepts `R8-A`: the target owns the Form root and submission
lifecycle; standalone consumers wrap R8 in canonical Form/native semantics,
embedded consumers reuse their owning Form, and File Upload appears only with a
verified secure backend path. Batch 117 supplies the complete browser/
interaction matrix and the current R8 CSS slice remains byte-identical, so R8
is ready for explicit human review. The remaining questions are production
fields, privacy, providers, upload security, target integration and visuals.

- Which fields are required for v1, which are optional, and who owns the record
  schema, labels, examples, localization and future migrations?
- What personal/sensitive data, consent, privacy notice, retention, deletion,
  access and audit requirements apply?
- Who owns feasibility, pricing/budget, timing, revisions, dimensions,
  materials, shipping, accessibility needs and commercial terms?
- Which endpoint/service owns submission, validation, idempotency, abuse
  protection, persistence, CRM/email notification, retries, status, result
  announcement and focus?
- Which file types/sizes/counts are permitted, and who validates, scans, uploads,
  stores, expires and deletes them while representing failures and retries?
- Which first standalone and embedded consumers prove the accepted target-owned
  Form-root boundary without nested markup or duplicated submission lifecycle?
- Can Shopify storefront contact represent the approved commission intake and
  responses? If reference files are required, which verified app/backend path
  owns them rather than assuming Liquid attachment support?
- Is the one-column measure, internal spacing, title/intro hierarchy, dropzone
  prominence, action order/stacking and dependency state composition approved,
  and where is R8-specific Figma evidence?
- Perform explicit human stability review; automated completion cannot promote
  R8 from `pilot` to `stable`.

### Maker's Mark Human Review

Owner decision 63 makes Maker's Mark ready for human review without defining a
maker record or authenticity protocol: strict required-identity omission,
optional stamp/studio/year, one optional canonical Link on the complete visible
identity, generic non-landmark semantics, contextual informative versus
decorative stamp treatment, complete logical wrapping, shared Exhibit/Studio
renderer/fixture and zero R9 neutral runtime. ADR 0209 records that boundary.

- Which system/target owns maker, artist, collective, studio and product
  relationships, stable identity, localization, revisions, rights and content
  moderation?
- Does `artist` represent a person, collective, business, manufacturer, vendor
  or display attribution, and must R9 ever represent multiple makers?
- What does `studio` mean: organization, place, workshop name, affiliation or
  another target-formatted context?
- What does `year` mean: creation/manufacture year, studio founding, mark
  version, record date or another fact, and does it need separate trustworthy
  machine-readable time data?
- Is stamp media a logo, monogram, signature, emboss, photo or illustration;
  what alternative, redundant/decorative, crop, shape, fallback, rights and
  color-mode policy is approved?
- Which separately verified record/protocol may substantiate authorship,
  manufacture, authenticity, certification or provenance without turning R9
  presentation into evidence?
- Which first target-owned maker-profile destination will populate the accepted
  optional canonical Link, and what record/relationship authorizes it?
- Which Shopify consumer comes first, and does it use `product.vendor`, product
  metafields or a maker-profile metaobject? How are editor validation, missing
  media, localization and product relationships handled?
- Is the quiet bordered measure, stamp size/shape, wide/narrow alignment,
  hierarchy and density approved, and where is R9-specific Figma evidence?
- Perform explicit human stability review; automated completion cannot promote
  R9 from `pilot` to `stable`.

### Edition / Numbering Human Review

Owner decision 64 makes Edition / Numbering ready for human review without
defining an edition, impression, inventory or authenticity record: visible
native paragraph content, strict empty omission, opaque direction-isolated
strings, a meaningful exposed slash, editorial rather than warning emphasis,
intrinsic wrapping and a shared Exhibit/Studio renderer/fixture. R10 remains
separate from canonical Badge. ADR 0210 records that boundary.

- Which system/target owns edition designation, edition number/name,
  impression/piece identifier, edition size, state/proof type, localization,
  revisions and product/work relationships?
- What exactly do `number` and `total` mean, and how are announced edition size,
  produced count, available inventory and proof/catalog notation kept distinct?
- Must v1 represent artist's proofs, printer's proofs, hors commerce, trial
  proofs, open/unlimited editions, Roman numerals, ranges or unnumbered works?
- Are any numeric constraints universal enough for contract validation, or must
  the display values remain opaque because valid notation is not always numeric?
- Which layer owns complete localized designation wording and abbreviations?
- If a target later composes a separate canonical Badge beside R10, document it
  as external target composition without adding an R10 mode or feedback meaning.
- Which Shopify consumer comes first, and which approved metafield/metaobject
  definitions, validations, editor states and product relationships supply it?
- Is the compact statement surface, radius, uppercase tracking, serif number
  hierarchy, spacing and wrap behavior approved, and where is R10-specific
  Figma evidence for partial/extreme content and modes?
- Perform explicit human stability review; automated completion cannot promote
  R10 from `pilot` to `stable`.

### Dimensions Display Human Review

Dimensions Display now has a source-backed candidate aligned with owner
decision 59: one required native description list of complete target-formatted
values, optional truthful visual/assistive-hidden redundant annotations,
optional canonical radio-backed Segmented Control, atomic replacement of the
complete active set, one shared Exhibit/Studio renderer and fixture, intrinsic
logical response and zero neutral R5 runtime. ADR 0205 records that accepted
implementation boundary; neutral R5 never converts or mixes sources.

- Which production target first proves separately authored formatted sets,
  atomic option-to-set mapping, provenance and stale/error fallback? Precision,
  rounding, locale, tolerance, available sets and persistence are target-owned.
- Which quantities belong in v1, which are required, and how do product versus
  packed dimensions, capacity, mass and target-specific facts coexist?
- How are handmade variation, approximation, tolerance, uncertainty,
  measurement method, orientation and significant figures communicated?
- Is unit choice centimetres/inches, Metric/US customary, locale-derived or
  target-configurable? Can it be absent, and does one preference synchronize
  with future Size Chart or other displays?
- Is native checked-radio feedback sufficient when values are replaced, or
  does a verified target need a concise non-duplicative result announcement?
- Which visuals are informative, redundant or decorative, and who guarantees
  their alternatives, annotation accuracy, scale, crop, rights and active-set
  correspondence?
- Which Shopify surface consumes R5 first, and what product/variant data,
  dynamic source, editor schema, validation and migration are approved?
- Is the current 4:3 visual, wide two-region threshold and row treatment
  approved, and where is R5-specific Figma evidence for optional anatomy,
  unit states, responsive/extreme content, RTL, themes, forced colors and print?

### Firing Schedule Human Review

Owner decision 60 supersedes the passive Kiln / Firing Info fact card. The R6
candidate is now Firing Schedule: one normalized Celsius/seconds planned
program derives both a required real-time ramp chart and one required canonical
Data Table row per stable segment. Optional controlled observations support
planned/actual/both and collecting/complete without connecting to equipment.
ADR 0271 records the accepted semantic and safety boundary.

Batch 164 now verifies the shared chart/table renderer and fixture, neutral
model rejection/fallback/conversion rules, all public view/unit/lifecycle modes,
native SVG/table semantics, two named overflow focus owners, AA text and line
contrast, forced colors, reduced motion, four paired viewports, narrow/RTL/
localized/200%/spacing/print resilience, exact Exhibit/Studio DOM/style parity,
source-identical target projections, the fixed Ceramics budget and clean
browser/server lifecycle. R6 is ready for explicit human review; the questions
below are production, target, migration and final visual gates rather than
missing automated evidence.

- Which production system owns reviewed normalized programs, applicability,
  versions, provenance, localization, audit, invalidation and safety approval?
- Which maximum segment/sample counts and controlled update cadence are safe
  across Web, Shopify, Webflow, mobile and future native targets?
- Which technical and safety content must compose separately, and who prevents
  the informative component from being mistaken for controller or alarm UI?
- May any target interpolate or summarize raw observations, and what defines
  actual segment boundaries, reached values and deviations?
- Which Shopify surface consumes R6 first, and what record source, editor
  validation, permissions, relationships, preview states and migrations apply?
- Are print/export, offline snapshots, run timestamps and audit provenance
  future target recipes rather than R6 API?
- When will the internal `firing-info` slug and legacy root/title selectors be
  removed before the public contract freezes?
- Does explicit human review approve the chart/table hierarchy, named narrow
  scroll strategy, line treatment, summary density and extreme modes, or is
  R6-specific design evidence required first?

### Workshop Listing Human Review

Workshop Listing now has a safe source-backed candidate without choosing a
workshop or booking architecture: native list/article/time/link semantics,
canonical Card/Price/Badge/Button composition, one shared Exhibit/Studio
renderer and fixture, intrinsic logical response and zero neutral R7 runtime.
ADR 0207 records that implementation boundary.

Owner decision 61 accepts this candidate as discovery-only: registration uses a
complete real Link to a separately certified target flow, optional Price and
passive Badge consume current target-formatted event/money/capacity truth, and a
Full workshop may retain useful details navigation. Batch 116 supplies the
complete browser matrix and the current R7 CSS slice remains byte-identical, so
R7 is ready for explicit human review. The remaining questions are production
source, freshness, target integration and final visual gates.

- Which system owns workshop records, stable IDs, recurrence, cancellation,
  revisions, instructors, venues, languages, access needs, materials and
  editorial approval?
- Which metadata belongs in a v1 summary and is any content required beyond
  title? Are online, in-person, series, drop-in and private workshops one model?
- Who owns time zone, daylight-saving changes, locale formatting, occurrence
  selection, cancellation/reschedule truth and stale fallback?
- Who owns price, taxes/fees, currency, discounts, deposits, refunds,
  sold-out/waitlist states, capacity thresholds and freshness guarantees?
- Which separately certified flow owns registration, authentication, payment,
  reservation locks, errors, cancellation and confirmation after R7 navigation?
- Do any targets need capacity-change announcements, and which owner controls
  timing, deduplication and errors rather than making the list live?
- Which Shopify surface consumes R7 first, and what resource/metaobject,
  dynamic source, theme block/section, date/money localization, merchant
  validation and booking integration are approved?
- Is the broad-media canonical Card, hierarchy, action prominence, intrinsic
  grid minimum and Available/Limited/Full treatment approved, and where is
  R7-specific Figma evidence across optional anatomy, localized/extreme content,
  RTL, responsive sizes, dark, forced colors and print?

### Page Component Product Boundaries

Page contracts keep authentication, timers, commerce, policy content, and
checkout routing outside their neutral semantic API until ownership is explicit.

Questions:

- ADR 0144 resolves neutral X1 as public Coming Soon only. Which password-page
  UX, authentication, error, lockout, focus, dismissal, and restoration policy
  should each target approve independently?
- Does Coming Soon compose Countdown, and who owns target time, time zone,
  cadence, correction, expiration, and post-expiration content?
- Which target owns gift-card balance freshness, redemption, purchase, wallet,
  printing, and account association, and what neutral action is valid by default?
- Which system supplies policy content, revisions, effective dates,
  localization, table-of-contents data, and stable section identifiers?
- Is Checkout Progress informational or navigable, and who owns routes,
  transitions, visited state, validation gates, and checkout synchronization?

### Coming Soon Human Review

ADR 0144 separates public X1 Coming Soon from target-native password access,
composes canonical Input, Button and Link, requires a non-empty visible heading,
and keeps Countdown outside the contract. The component remains `pilot`.

Questions:

- Is the proposed split/stack composition, measure, typography, spacing, image
  crop, scrim, brand/footer placement and social/form treatment visually
  approved for The Gallery?
- Is the ten-property API sufficient, and is the absence of password,
  countdown, layout, dependency-state and service controls approved?
- Should public Coming Soon and password access remain independent surfaces in
  every target?
- What is the target form purpose, field/consent model, backend, pending/
  success/error/retry placement, localization, analytics and persistence
  policy?
- If Countdown is required, what system owns time, timezone, cadence,
  correction, expiry and post-expiry content?
- What independent Shopify password UX/security policy governs modal versus
  inline presentation, focus/inertness/dismissal, errors and lockout?

### Policy Page Human Review

ADR 0162 reconciles Policy Page as a passive self-contained article with
required title/body, independent visible and machine date values, optional
named canonical Link navigation, intrinsic content semantics, zero runtime and
a strict Shopify policy-object snippet. The component remains `pilot`.

Questions:

- Does the proposed article measure, title/body hierarchy, header divider,
  update metadata tone, TOC surface/inset/numbering, flow rhythm and quotation,
  table and code treatment express The Gallery's visual identity?
- Is the six-property API sufficient, and should `updatedDateTime` remain an
  independent stable cross-target property?
- Which system owns policy content, revisions, effective dates, localization,
  policy types, stable section identifiers, trust/sanitization and publishing?
- Should any target generate the table of contents, and if so, who owns sticky
  presentation, current-section tracking, focus relocation and announcements?
- Is Shopify's truthful title/body-only snippet sufficient for the adapter, or
  should a future target-specific surface integrate a policy inventory after
  the platform route/editor architecture is explicitly chosen?
- Which P3-specific Figma/reference artwork and real legal-content extremes
  should be used for final visual approval?

### Checkout Progress Human Review

ADR 0163 reconciles Checkout Progress as a passive checkout-context profile of
canonical Steps with strict required composition, target-owned status, one
named component container, connector-free narrow stacking, zero runtime and a
truthful Shopify Checkout UI Extension boundary. The component remains
`pilot`.

Questions:

- Does canonical Steps' indicator, connector, typography, status emphasis and
  density express the desired Gallery checkout identity?
- Are the proposed P4 measure, horizontal rhythm, narrow connector-free stack,
  private threshold and long/localized-label behavior visually approved?
- Is the two-property `accessibleLabel` plus `steps` API sufficient, and is the
  absence of P4-owned current index, events, percentage, routes, validation,
  layout and token controls approved?
- May completed stages ever become navigable, in which targets, and who owns
  saving, availability, validation, routes, history, focus, errors and
  announcements?
- Should canonical Steps later gain automatic container-driven orientation, or
  should that remain a contextual profile decision?
- Which Shopify Checkout UI Extension target, supported components and checkout
  data should map P4, or should native Shopify progress remain platform-owned?
- Which P4-specific Figma/reference artwork and real checkout-content extremes
  should be used for final visual approval?

### Review Summary Human Review

ADR 0132 reconciles Review Summary's passive figure/caption/list semantics, one
accessible Star Rating owner, intrinsic component-width wrapping, complete text
equivalents, target-owned distribution, semantic token use, zero motion/runtime,
and shared Exhibit/Studio presentation. The component remains `pilot`.

Questions:

- Does the score, Star Rating and count hierarchy express the desired Gallery
  identity at narrow and wide measures?
- Are accent fill, track contrast/thickness, row density, alignment, flexible
  bases and intrinsic wrap point visually approved?
- Should Review Summary retain required V2 Star Rating composition after the
  separate A11 Rating/V2 Star Rating identity decision, and which formal
  registry dependency should result?

### Review Component Product Boundaries

Review components expose presentation and dependency composition without
inventing a provider, moderation model, aggregation algorithm, or submission
workflow.

ADR 0136 establishes Review Highlights as a passive native theme list by
default and reserves navigation or in-place selection for truthful target-owned
links or buttons. The component remains `pilot`.

ADR 0137 establishes Photo Reviews as a passive native photo list with a strict
image part and an optional separate target-owned native link or button. Image
delivery and any complete enlarged-media lifecycle remain outside the neutral
component. The component remains `pilot`.

ADR 0140 establishes Review Pagination as a contextual profile of canonical
Pagination. It removes the parallel button/CSS/token implementation and keeps
provider data, strategy, page windows, URLs and result lifecycle target-owned.
The component remains `pilot`.

Questions:

- Does the compact theme/count hierarchy, density, wrapping and
  selected/current projection express the desired Gallery identity?
- Should the v1 shared fixture remain passive, or should an accepted target
  promote navigation or selection into a separate semantic component?
- Which provider and data model supplies reviews, and who owns identity,
  verified-purchase truth, moderation, abuse, edits, deletion, and replies?
- Which layer computes aggregate values, scales, rounding, buckets, and missing
  values, including normalization of half stars and non-five-point systems?
- Which sort and filter options exist, what do Review Highlights activate, and
  who owns URL state, results, focus, empty states, and announcements?
- Which pagination strategy applies, and who owns loading, scrolling, focus,
  page windows, URL state, and result announcements?
- Does canonical Pagination's density, current emphasis, wrapping, ellipsis
  rhythm and directional icon treatment express the desired Gallery identity
  when reused for review results, or is a provider-backed target mode required?
- Are review photos passive, links, downloads, Lightbox triggers, or Modal
  triggers, and which component owns enlarged-media behavior?
- Does the square crop, density, gap, radius, hover/overlay strength, two-tone
  focus treatment and four-photo editorial composition express the desired
  Gallery identity?
- Which provider owns moderation, consent, sensitive imagery, deletion,
  captions, attribution and production source/format/loading/failure policy?
- Which Review Form fields and upload policies are required, and who owns
  authentication, consent, validation, submission, retries, duplicate
  prevention, moderation notice, and post-submit focus?

### Cart Page Human Review And Target Lifecycle

ADRs 0212 and 0254 reconcile Cart Page as a named populated-only composition
over canonical Cart Line Item and Cart Summary. The owner accepted
`summaryPlacement: sticky | flow`, default `sticky`, with narrow/short/incapable
contexts and targets degrading truthfully to flow. Cart Empty remains the
mutually exclusive target composition. K1 remains `pilot`.

Resolved semantic and architecture direction:

- the public API has seven properties: content/slots plus semantic summary
  placement; grid, breakpoint, offset, height and collision remain private;
- the target owns the coherent snapshot, mutation, pending/error/status,
  empty replacement, post-removal focus, checkout and refresh lifecycle; and
- sticky and flow reuse one canonical summary and source order. The target owns
  actual header/safe-area offset and focus-not-obscured certification.

Remaining human and target evidence:

- Does the title/count/continue hierarchy, underline, spacing, summary measure,
  wide-track ratio and sticky/flow treatment express The Gallery's desired cart
  identity?
- Which target uses native form navigation versus Ajax mutation, and what
  rollback/retry, focus, announcement and cross-surface coordination proves it?
- For Shopify, do the editor placement control, Gallery Header offset,
  localized/extreme content, zoom, keyboard, live-store refresh, selling-plan,
  unit-price, discount, tax, note, checkout and accelerated-payment paths pass?
- Which K1-specific Figma/reference artwork and real commerce extremes should
  be used for final visual approval?

### Quick View Human Review And Live-Target Evidence

ADRs 0180, 0238 and 0255 reconcile Quick View as one focused canonical Modal
over a complete target-coordinated product snapshot. K8 composes canonical
Product Gallery, Price, optional native Product Form, and a real full-details
Link. The Gallery receives the complete image/video/external-video/model
collection with `imageDetail="none"`; image selection, direct swipe and explicit
rich-media activation remain available, but featured images are passive and no
nested Lightbox exists. The complete-product destination keeps Product
Gallery's default lightbox experience. K8 remains `pilot`.

Resolved semantic and architecture direction:

- exactly one target product coordinator owns snapshot readiness, selected
  variant, current media, availability, Price, Form, URL, purchase outcome,
  cart refresh and one deliberate status;
- K8 is omitted while the snapshot is incomplete, loading, stale or cannot be
  coordinated; it owns no fetcher, loading state or commerce store;
- Modal exclusively owns modality, inertness, focus, dismissal, scroll locking
  and trigger restoration; and
- Product Form is optional when a complete real full-details Link provides the
  continuation. K8 adds no media, layout or lifecycle property.

Remaining human and target evidence:

- Does the modal width/chrome, media density, thumbnail/dot treatment,
  gallery-to-information ratio, spacing, action hierarchy and narrow scrolling
  express The Gallery's visual identity?
- Should an accepted target present the same centered modal, a full-screen
  dialog or a bottom sheet on mobile? This remains visual/target translation,
  not a new neutral K8 variant inferred by the implementation.
- Which concrete loading/invocation implementation does each target use, and
  does it prove complete snapshot readiness, stale-data prevention, focus and
  route behavior?
- Does Shopify pass live product loading, full `product.media`, high-variant and
  Combined Listing coordination, native/Ajax submission, errors, Cart Drawer
  refresh, editor preview and focus/status outcomes?
- Which K8-specific Figma/reference artwork and real product/media extremes
  should be used for final visual approval?

### Size Chart Final Visual And Live-Target Evidence

ADRs 0213 and 0242 reconcile Size Chart as a thin profile of canonical centered
Modal, required Data Table and optional Segmented Control. The accepted D7-A
direction uses complete target-authored tables, no conversion, the same centered
Web modality at every viewport, and a bounded merchant-owned Shopify
`custom.size_chart` reference. Large matrices use another target presentation.
The component remains `pilot`.

Questions:

- Does the link-style trigger, modal width/chrome, unit-control placement,
  table density, notes hierarchy and narrow treatment express The Gallery's
  visual identity, and where is D7-specific Figma evidence?
- Which real merchant records, locales, units, notes and extreme values should
  be used for final visual approval?
- Has the documented Shopify definition provisioning, Product association,
  translation workflow, Theme Editor block lifecycle and live storefront
  behavior been exercised without conflicting with pre-existing merchant
  custom data?

### Back In Stock Provider, Consent And Result Lifecycle

ADRs 0214 and 0243 apply accepted D8-A. Back In Stock binds one request to the
exact selected variant and current market, treats provider-confirmed
purchasability as the availability result, separates service and marketing
consent, and owns coherent idle/submitting/confirmed/retryable-error
presentation. Confirmed retains the form and prevents resubmission; retryable
error retains editing and retry. Neutral D8 owns no provider or request runtime.
Shopify hosts an installed provider app block rather than a theme-owned
notification database. The component remains `pilot`.

Questions:

- Which concrete provider does each deployment select, and has its verification,
  idempotency, abuse, retention, delivery, retry, expiry and unsubscribe policy
  been certified for every supported market?
- Has Shopify app installation, exact variant/market payload, localization,
  add/remove/reorder, repeated Section Rendering replacement and live storefront
  behavior been exercised with the selected provider?
- Does the current surface, measure, heading/action hierarchy, density, narrow
  stacking, field validation and confirmed/error presentation express The
  Gallery's visual identity, and where is D8-specific Figma evidence?

### Pickup Location Selector And Store Locator Target Certification

ADR 0244 implements the accepted D9-C identity split. Pickup Location Selector
searches target-supplied eligible locations for the exact current product,
variant and market and emits one stable location id as pickup intent. Store
Locator is general discovery-only. Both retain complete manual search, optional
explicit geolocation and a list-first workflow; optional maps never replace the
list. Both remain `pilot`.

Questions:

- Which provider and stable location-id namespace is authoritative per target,
  and how are localization, closures, services and partially known data mapped?
- What request/cancellation/retry/stale-suppression policy connects both
  components to one shared location/search service without duplicate stores?
- How does each transaction target persist D9 pickup intent and truthfully
  confirm, reject or repair it in Product Form, Cart or Checkout?
- For Shopify, should D9 use native variant `store_availability`, a provider app
  block, line-item/cart state, or a combination, and what live-store evidence
  proves that no selection is represented as an inventory reservation?
- Which general branch source supplies Store Locator in Shopify and other targets
  where variant pickup availability is not a complete directory?
- Which map/geocoding provider, attribution, privacy text, failure UI and usage
  limits apply per deployment? Manual search must remain complete regardless.
- Does the current surface, search/action hierarchy, list density, selected
  boundary, narrow stacking, status treatment and optional-map placement express
  The Gallery's identity, and where is component-specific owner/Figma evidence?

### Subscription Choice And Selling-Plan Ownership

ADR 0216 reconciles D10 as one recurring-purchase choice that composes
canonical Radio, Price, optional passive Badge, optional canonical Select, and
target-authored terms inside a target-owned named purchase-options group.
Neutral D10 owns no group policy, product/variant identity, selling-plan model,
allocation truth, final payload, CTA synchronization, cart workflow, or target
runtime. The component remains `pilot`.

Questions:

- Is the product model one-time versus one recurring group with a nested plan
  selector, or one native Radio per concrete selling-plan allocation?
- For subscription-only products, should targets omit the redundant Radio,
  present multiple recurring choices, or use a different higher-level surface?
- Which purchase option is initially selected, when is selection required, and
  which merchant/customer policy owns that decision?
- Which selling-plan groups, option names, ordering, eligibility and unavailable
  states are authoritative for each target?
- Which target value does D10's Radio submit, and which coordinator combines it
  with the plan control into the final cart payload?
- How are stale plans disabled or cleared when one-time purchase or another
  product variant becomes current?
- Which price meaning is primary: checkout charge, per-delivery, recurring
  allocation, compare-at, remaining balance, unit price or a range, and which
  visible labels are required?
- Which savings calculation, rounding, localization and claim policy is allowed?
- Which renewal, billing, delivery, commitment, pause, cancellation, tax,
  duties and consent terms are required by market and product?
- Which Shopify Liquid/block/editor structure and variant/plan/price/CTA
  JavaScript coordinator is intended, and what live-store proof is required?
- Does the current border, padding, metadata order, label/price hierarchy,
  savings treatment, detail density and wrapping express The Gallery's visual
  identity, and where is D10-specific owner/Figma evidence?

### Global Component Product Boundaries

Global shell components can expose source-backed regions and presentation, but
their cross-surface navigation, overlay, search, and commerce runtime remains
explicitly undecided.

ADR 0109 resolves Cart Drawer's neutral composition and removes its selector-dead
runtime without selecting those production services.

Questions:

- Which shared schema supplies brand, navigation, footer groups, legal metadata,
  locale controls, promos, featured destinations, and mobile items, and who
  decides current, unavailable, localized, or permissioned destinations?
- Which Header and Bottom Navigation actions are present and prioritized at each
  breakpoint?
- Which runtime connects Header actions to Search Overlay, Cart Drawer, Mobile
  Menu, Drawer, and Mega Menu, and enforces mutual exclusion?
- Which layer owns focus entry, containment, Escape/outside dismissal, focus
  restoration, scroll locking, inert background, route dismissal, and stacking?
- Does Mega Menu open on click, hover, focus, or a target-specific combination,
  and what keyboard model, delays, pointer intent, and mobile fallback apply?
- Which search provider owns debouncing, cancellation, ranking, caching,
  loading, errors, result types, media/prices, destinations, and announcements?
- Which cart service owns line mutations, inventory, pricing, totals, checkout,
  optimistic state, errors, focus, and synchronization of global badges?
- Which post-removal focus, pending-control suppression, success/error status,
  rollback/retry/undo, and empty/error visual policies apply to Cart Drawer?
- For Shopify, should Cart Drawer submit native cart forms with navigation or use
  Ajax `change.js` plus Section Rendering, and which controller owns lifecycle,
  line errors, refreshed sections, editor preview and live-store proof?
- Is Announcement Bar static, dismissible, scheduled, targeted, rotating, or a
  composition with Announcement Extended, and where is persistence stored?
- Which Footer services and content are required per target, and who owns
  newsletter, localization, legal revisions, consent, and external services?
- Which destinations belong in Bottom Navigation, who owns its body-offset
  strategy, and when should dynamic badges be announced?

### Token Source Migration Scope

The direction, initial spike, first `tokens/source/` structure, source compiler, migration map, source parity validation, neutral web target, component CSS compatibility validation, Shopify token wrapper, neutral web component adapter, and Shopify adapter validation/maturity v1 exist. The remaining questions are platform-adapter switching details.

Questions:

- What output parity threshold is required before deleting each legacy token file?
- Should historical Figma snapshots move to an archive path now or after the first source compiler lands?
- Should Webflow be the next wrapper target, or should JS/TS output for framework targets come first?

### Component Contract Maturity Details

The architecture requires `components/contracts/`. The first schema and 183 contracts exist, covering every component in `registry.json`; Button is `stable` for neutral web and the remaining 182 contracts are `pilot`. Expansion is complete at the coverage level; maturity and generation strategy are still open.

Button now establishes the smallest reviewed semantic-property and target-mapping schema, including independent icon slots and contextual loading placement. See `docs/decisions/0035-button-semantic-properties-and-loading-placement.md`. The schema remains optional for contracts that have not received equivalent review.

Questions:

- Beyond the approved Studio property use case, should contracts generate any implementation or continue to validate/describe hand-authored adapters?
- ADR 0235 consolidates A11 and V2 into canonical Rating. V2 is deprecated
  without a compatibility selector. Review Summary now receives exact
  `ratingValue` and a separate target-supplied half-step `ratingDisplayValue`,
  so neutral code performs no implicit rounding and Rating's label can agree
  with its visual sequence.
- ADR 0234 resolves Progress Circle value content: optional compact
  `displayValue` is visible, independent optional `valueText` maps only to
  `aria-valuetext`, and neither falls back to, truncates, scales or derives from
  the other. Final Circle artwork remains pending human visual review.
- ADR 0236 resolves Empty State heading ownership: the required title remains a
  native contextual heading selected by its host, never a `headingLevel` visual
  property or ordinary-text demotion. ADR 0064 continues to define the optional
  action as one canonical Button-or-Link composition slot.
- For Divider, are `decorative` and `section` exclusive variants or orthogonal
  modifiers, and does separator/decorative accessibility remain markup-owned?
- ADR 0237 resolves Avatar composition and initials scaling: targets explicitly
  provide either contextual native image markup or pre-derived one/two-grapheme
  initials, while loading/failure/source selection and fallback choice remain
  target-owned. The four existing sizes couple to Caption, Body Small, Body
  Default and Body Large typography respectively; no image URL, content mode,
  loading state or independent font-size property enters the neutral API.
- Which property fields become required for contracts seeking `stable` after the pilot?
- Which generated contract families need hand-refinement before adapter code generation?
- Which `template-detected` Shopify components should be promoted from `planned` to `implemented` first after schema, settings, data, behavior, and editor readiness are validated?
- Which Shopify warnings should become hard failures after contract status reconciliation?

### Registry Versioning Details

The repo needs a registry schema and versioning model.

Questions:

- How should package, registry, component, and target-adapter versions relate?
- How should copied components report available upstream updates?
- How should breaking changes be represented?

### Target Package Strategy Details

Consumer-ready outputs should be published as packages or release artifacts, but each target needs its own distribution design.

Questions:

- Which npm packages should exist for web, React, Angular, and CLI consumption?
- Should Shopify templates ship as GitHub release zips, npm package assets, Theme Store submissions, or all of these?
- How should Figma outputs ship: DTCG import files, plugin workflow, generated `.fig` files, or another route?
- When native targets arrive, should Swift ship as a Swift Package and Kotlin as Maven/Gradle artifacts?
