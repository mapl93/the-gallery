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
- Collection Hero, Collection Grid, Collection Filters, Pagination, View Toggle, Collection Promo, and Empty Collection complete the collection contract pass. See `docs/decisions/0025-collection-contract-expansion.md`.
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

## Still Open

### Collection Mobile Filter Surface

Collection Filters has a desktop sidebar, active-filter tags, and validated
filter-group composition. The canonical CSS intentionally hides the sidebar
below the desktop breakpoint, but no accepted source decision defines the mobile
replacement.

Questions:

- Should mobile filters open in a modal Drawer, expand inline below the filter
  bar, or use another surface?
- Should Apply and Clear actions be sticky within that surface, and are changes
  applied immediately or committed as a batch?
- Which component owns focus trapping, dismissal, scroll locking, and focus
  restoration when the mobile surface closes?

### Account Component Product Boundaries

The Account category can complete its neutral-web contracts, Studios, and
curatorial documentation without resolving the questions below by keeping
repeated records and dependency-owned controls inside composition slots. These
questions are required before broadening the public API or promoting affected
contracts to `stable`.

Questions:

- Should Login and Register remain compositions of one Auth Forms shell, become
  an explicit mode, or split into separate components?
- Is Password Reset request/success a mutually exclusive public state, and which
  layer owns that transition? Until decided, success remains optional feedback
  content rather than a boolean component mode.
- Are Order History status names canonical, or are they target-specific visual
  projections of financial and fulfillment states?
- Are Order Detail tracking stages fixed by The Gallery or supplied entirely by
  each commerce target?
- Should Address Form formally depend on the Form contract, or remain a layout
  wrapper around Input, Select, and Button?
- Does `.wishlist-btn` remain part of the Wishlist page contract or move to a
  reusable product-level wishlist action?
- Are Account Settings persisted per explicit submit, immediately per change,
  or according to each composed section?

### Blog Component Product Boundaries

The Blog category can refine its static editorial composition while leaving
navigation, reading-state calculation, sharing providers, and comment data to
their eventual owners. These questions must be resolved before affected APIs
or neutral behavior are promoted to `stable`.

Questions:

- Is Article Card skeleton presentation a public state of Article Card or a
  composition of the standalone Skeleton component?
- Do Reading Progress and Table of Contents calculate scroll state through a
  shared neutral-web enhancement, or receive already-calculated state from each
  target? Is Reading Progress exposed as an accessible progressbar or as a
  decorative visual whose containing reading surface owns the announcement?
- Does Category Nav navigate between category pages or filter the current
  collection in place, and which layer owns URL/result synchronization?
- Does Blog Sidebar formally compose Input and Tag, or keep independent search
  and tag-cloud APIs?
- Which of the existing `.share*` and `.share-buttons*` families is canonical,
  and which layer owns provider URLs, Web Share, copy feedback, and fallbacks?
- Does `.article-nav` belong to Related Articles or become a separate registered
  component?
- Which Comments behaviors belong to the neutral component versus the target:
  sorting, top-level and reply composers, authentication, moderation, optimistic
  updates, and count synchronization?

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

### Marketing Component Product Boundaries

Marketing components can refine their structural contracts and responsive
presentation without assuming campaign data, consent policy, timers, or form
backends. These questions must be answered before neutral behavior or defaults
are claimed.

Questions:

- Does Newsletter own loading, success, and error response states, or does the
  target form adapter provide them?
- Is Popup a generic content/CTA surface, does it also own email capture, and
  which node canonically owns `data-open`?
- Does Countdown receive a target timestamp and calculate segments, or receive
  already-calculated segments? Which timezone and expiration behavior apply?
- Is `low-stock` a canonical default for Urgency, and which target guarantees
  the truth and freshness of viewer, stock, and recent-sale data?
- Does Cookie Consent own the preferences dialog and consent-category model, or
  compose external Modal and Switch behavior supplied by the target?
- Are Announcement Extended countdown, rotation, and dismissal mutually
  exclusive variants or combinable capabilities, and must rotation support an
  arbitrary message count?

### Section Component Product Boundaries

Sections can expose semantic content and composition regions without claiming
runtime behavior, provider data, or target routing. These questions must be
resolved before affected contracts can move beyond `pilot`.

Questions:

- Which layer owns Video Section playback, loading, controls, captions,
  transcripts, errors, autoplay policy, and external-player APIs?
- Are Hero parallax and slideshow navigation shared neutral enhancements or
  target-specific behavior, and who owns timing, pause, focus, and announcements?
- Is Before / After passive, draggable, keyboard adjustable, or target-specific,
  and which node owns range semantics and synchronized clip position?
- Which layer duplicates Logo Bar and Marquee content, hides visual duplicates,
  and owns speed, direction, pause, repetition, and non-motion fallbacks?
- Which target owns Instagram authorization, fetching, caching, consent,
  freshness, errors, empty states, and the activation semantics of feed items?
- Are Gallery Grid, Lookbook, Instagram Feed, and Collage items passive, links,
  Lightbox triggers, commerce disclosures, or target-specific mixtures?
- Which target owns Featured Collection queries, sorting, availability, pricing,
  loading states, and spotlight selection?
- Which layer owns Stats count-up timing, formatting, live updates, and
  announcements?

### Ceramics Component Product Boundaries

Ceramics components currently expose content and composition without freezing a
CMS, booking system, verification service, or media provider.

Questions:

- Which target or shared content layer owns material, glaze, firing, workshop,
  maker, certificate, glossary, FAQ, and tour records and schemas?
- Are Glaze Guide swatches passive or selectable, and who synchronizes selected
  details?
- Does Dimensions convert canonical measurements or receive formatted values,
  and who guarantees rounding accuracy?
- Does Ceramics Glossary alphabet UI navigate, scroll, or filter, and who owns
  search, result, and URL state?
- Which system owns workshop booking, capacity, pricing, authentication,
  payment, cancellation, and confirmation?
- What makes a certificate verifiable, where does QR content lead, and which
  target may make authenticity guarantees?
- Which Studio Tour media types are supported, and who owns consent, loading,
  playback, captions, modal presentation, and analytics?
- What are the Commission Form fields, consent requirements, submission states,
  persistence rules, notifications, and downstream workflow?
- Do Ceramics FAQ categories filter or navigate, and should the component
  formally compose Accordion?

### Page Component Product Boundaries

Page contracts keep authentication, timers, commerce, policy content, and
checkout routing outside their neutral semantic API until ownership is explicit.

Questions:

- Is Coming Soon password access a composition or a built-in capability, and who
  owns authentication, errors, lockout, dialog behavior, and focus restoration?
- Does Coming Soon compose Countdown, and who owns target time, time zone,
  cadence, correction, expiration, and post-expiration content?
- Which target owns gift-card balance freshness, redemption, purchase, wallet,
  printing, and account association, and what neutral action is valid by default?
- Which system supplies policy content, revisions, effective dates,
  localization, table-of-contents data, and stable section identifiers?
- Is Checkout Progress informational or navigable, and who owns routes,
  transitions, visited state, validation gates, and checkout synchronization?

### Review Component Product Boundaries

Review components expose presentation and dependency composition without
inventing a provider, moderation model, aggregation algorithm, or submission
workflow.

Questions:

- Which provider and data model supplies reviews, and who owns identity,
  verified-purchase truth, moderation, abuse, edits, deletion, and replies?
- Which layer computes aggregate values, scales, rounding, buckets, and missing
  values, including normalization of half stars and non-five-point systems?
- Which sort and filter options exist, what do Review Highlights activate, and
  who owns URL state, results, focus, empty states, and announcements?
- Which pagination strategy applies, and who owns loading, scrolling, focus,
  page windows, URL state, and result announcements?
- Are review photos passive, links, downloads, Lightbox triggers, or Modal
  triggers, and which component owns enlarged-media behavior?
- Which Review Form fields and upload policies are required, and who owns
  authentication, consent, validation, submission, retries, duplicate
  prevention, moderation notice, and post-submit focus?

### Global Component Product Boundaries

Global shell components can expose source-backed regions and presentation, but
their cross-surface navigation, overlay, search, and commerce runtime remains
explicitly undecided.

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
- Should A11 `rating` remain the compact passive rating primitive while V2
  `star-rating` owns richer review display, or should those two display-only
  contracts be consolidated? `star-input` remains the distinct interactive
  control either way.
- For Skeleton, is `variant` a reviewed semantic property, are shapes always
  decorative while the containing region owns loading announcements, and do
  dimensions remain consumer-owned fixture/layout values?
- For Empty State, is the heading level contextual, and should the optional
  action be a single composition slot or formal action anatomy?
- For Divider, are `decorative` and `section` exclusive variants or orthogonal
  modifiers, and does separator/decorative accessibility remain markup-owned?
- For Avatar, is initials fallback automatic or an explicit composition mode,
  how is image content mapped publicly, and should initials typography scale
  with the four existing sizes?
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
