# Current State To Target Architecture

## Current checkpoint — 2026-09-08

The Shopify brand-settings pilot is backed up remotely at `0f13e5e`; the bounded
Figma pilot is backed up remotely at `b6e62ac`. The owner liked both pilots and
removed Figma from the plan: **complete the base Web system, then Shopify**
(ADR 0303). The existing Figma pilot is historical and unmaintained. The Shopify
pilot remains unpublished.

The audit corrections backed up at `8c86add` are tracked explicitly by the original nine findings
in `docs/reports/2026-09-08-audit-follow-up.md`: consumer-file protection (9),
typography (3), variant/state intersections (7), and the accepted fixed/adaptive
spacing distinction (8). Strict interoperable export (6) is deferred; neither
its documentation nor the Figma pilot establishes full DTCG conformance.
The Foundations control matrix remains until equivalent adjacent/state coverage
exists in real compositions.

This document compares what The Gallery has today with the target architecture in `docs/NORTH-STAR.md`. It is the working backlog map for evolving the repo.

## Summary

The current repo is already a useful web-first design system and Shopify theme foundation. It has tokens, CSS components, a registry, a CLI, docs pages, and platform output directories.

The target repo is broader:

```text
repo source -> tokens + contracts -> adapters -> generated target outputs -> docs/CLI distribution
```

The main gap is not volume of components. The main gap is formalization: token source format, component contracts, target adapter boundaries, schemas, validation, and generated artifact policy.

## Current Vs Target

| Area | Current state | Target state | Tasks |
| --- | --- | --- | --- |
| Governance | `AGENTS.md`, project docs, and ADR 0001 now exist. | Decisions are captured as ADRs; agents know what is accepted vs open. | Keep adding ADRs for architecture decisions; make docs the first stop for every agent. |
| Token source | `tokens/*_tokens.json` is the legacy Style Dictionary build input for targets that have not switched. Root `*.tokens.json` are Figma snapshots. A small DTCG spike passes, `tokens/source/` exists, and `migration-map.json` covers every unique legacy token path. | Repo-native token source lives in DTCG-style `tokens/source/` with primitives, semantics, components, selected modes, and executable migration parity. | Continue switching targets one by one; define parity threshold before deleting legacy token files; archive or move Figma snapshots. |
| Token outputs | Legacy Webflow CSS and Framer JS outputs exist but have known unit-transform defects and are not production-ready. The new source compiler generates ignored comparison CSS/JSON under `tokens/source/build/`; the first real neutral web target exists at `platforms/web/tokens.css`; Shopify now has a thin token wrapper at `platforms/shopify/assets/tokens.css`. | The maintained delivery outputs are Web CSS/runtime and Shopify. | Validate Web and Shopify output parity; other targets are outside this plan. |
| Component source | Canonical source is now CSS plus MDX examples, registry metadata, and 182 validated component contracts covering every component in `registry.json`. Button is the first contract with reviewed semantic properties and web mappings; its site-owned Studio definition covers all ten properties without duplicating contract facts. | Component contracts define anatomy, slots, variants, states, semantic properties, target mappings, dependencies, tokens, behavior, and accessibility independent of Studio presentation. | Continue component-by-component property review without inferring missing capabilities; decide generation vs validation role for contracts; use contract metadata for target guidance. |
| Web/CSS adapter | The neutral web adapter generates complete compatibility bundles plus copied CSS family modules, 17 selective runtime modules, a small loader/core, and per-component dependency-closed install descriptors. | CSS is one concrete adapter backed by contracts, with explicit modular delivery and validation. | Keep CSS hand-authored; consider component-level CSS extraction only if measured family slices become a material bottleneck. |
| Shopify adapter | `platforms/shopify/` has active Liquid theme work, a generated token wrapper, generated/copied CSS assets, selective runtime modules, adapter manifest/summary validation, `shopify-maturity-v1`, and Shopify-specific adapter documentation. Layouts load the selective runtime rather than the complete compatibility runtime. | Shopify consumes tokens and component contracts through explicit Liquid/assets/settings/schema/data/behavior/template/editor adapter rules. | Reconcile `planned` contracts with Liquid/schema evidence; add stricter contract-specific snippet/section validation and Theme Check. |
| Registry | `registry.json` drives docs and CLI; `registry.schema.json` now exists with local structural validation. | Registry is schema-validated, target-aware, version-aware, and dependency-aware. | Expand target fields; align component count/categories over time; decide package vs registry versioning. |
| CLI | CLI reads Web dependency slices and canonical token CSS, records per-file upstream baselines, supports dry-run and explicit keep-local resolution, and stops unresolved conflicts before writes. | CLI installs by target, version, and dependency graph, preserving copy-and-own semantics. | Validate real consumer migrations before distribution; later consider `--target shopify/react/webflow`. |
| Documentation site | React/Vite docs app uses registry, MDX pages, previews, architecture pages, and a contracts index. It consumes `platforms/web/index.css` as a first-party adapter client; isolated previews use generated adapter component CSS and inherit the document token matrix. Exhibit now groups canonical MDX into five curatorial sections, promotes one preview as the artwork, and adapts its index and pedestal across desktop and mobile. A validated Studio presentation layer and generic inspector exist, with Button as the first interactive renderer and a site-only Lucide icon catalogue. | Exhibit and Studio consume contract facts through site-owned presentation metadata while docs expose north star, tokens, target-specific usage, versions, copy commands, and migration guidance. | Expand Studio only as component contracts are reviewed; implement the separately approved main-menu experience; improve token pages and reduce MDX inline style warnings over time. |
| Historical Figma pilot | ADR 0298 records the bounded pilot and its files. | Removed from delivery scope by ADR 0303. | No expansion, synchronization, feedback or release work. |
| Native targets | No SwiftUI or Compose output yet. | Tokens generate Swift/Kotlin values; contracts generate or guide native styles/components. | After token source stabilizes, add token-only native output spike; later pilot Button in SwiftUI and Compose. |
| Generated artifacts | `site/dist` is tracked and produces hash churn. | Docs builds are deployment output; consumer-ready outputs are release/package artifacts generated from source. | Remove or de-emphasize `site/dist` as source; define package/release artifact generation. |
| Quality gates | `npm run validate:docs` checks registry/MDX/CSS/contract relationships and validated Studio presentation metadata. `npm run validate:tokens:source` checks the new DTCG source structure. `npm run validate:tokens:web-components` verifies that the neutral web target defines every public token used by component CSS. `npm run audit:components` generates exact neutral web certification evidence, including Studio property coverage, without automatic status promotion. | Token, contract, registry, adapter, visual, generated-output, and human-reviewed maturity validation exist. | Certify the docs-site component kernel first, keep validations current, and add target adapter tests as adapters mature. |

## Backlog By Phase

### Phase 0 - North Star And Context

Status: completed.

- Add architecture north star docs.
- Add current-to-target map.
- Record accepted architecture decisions as ADRs.
- Update agent and Copilot instructions.

### Phase 1 - Stabilize Governance

- Add `registry.schema.json` because `registry.json` already references it. Done.
- Add a doc for naming conventions across tokens, contracts, adapters, and registry.
- Decide generated artifact policy for `site/dist`.
- Keep canonical documentation in English first; add other languages later.
- Update `context.md` or mark it as legacy if newer docs supersede parts of it.

### Phase 2 - Token Architecture

- Audit current `tokens/` against root Figma export snapshots.
- Document intended token hierarchy: primitives, semantics, modes, breakpoints, and optional component-specific tokens. Done; see `docs/decisions/0007-token-source-architecture.md`.
- Run a DTCG spike with a small token subset. Done; see `docs/spikes/0001-dtcg-token-source-spike.md`.
- Verify maintained outputs for Web and Shopify.
- Create first `tokens/source/` structure. Done.
- Add token source validation. Done; run `npm run validate:tokens:source`.
- Add source compiler mode matrix. Done; see `docs/decisions/0008-token-source-compiler.md`.
- Add migration map and parity validation. Done; see `docs/decisions/0009-token-migration-map.md`.
- Add first neutral web token target. Done; see `docs/decisions/0010-neutral-web-token-target.md`.
- Add compatibility aliases and component CSS token validation for the neutral web target. Done; see `docs/decisions/0011-web-token-compatibility-aliases.md`.
- Add Shopify token wrapper over the neutral web target. Done; see `docs/decisions/0012-target-adapter-token-wrappers.md`.
- Migrate target outputs toward DTCG-style token source target by target.
- Move historical Figma exports to an archive path or document them as migration snapshots.

### Phase 3 - Component Contract Pilot

- Define a first `components/contracts/` schema. Done; see `docs/decisions/0013-component-contract-schema-pilot.md`.
- Create a Button contract as the pilot. Done.
- Map the Button contract to current CSS classes and MDX docs. Done.
- Add validation that the registry, contract, MDX, CSS, and public web tokens agree. Done; run `npm run validate:contracts`.
- Add Input contract as the next richer pilot. Done; see `docs/decisions/0014-input-component-contract-pilot.md`.
- Add Textarea, Select, and Card contracts. Done; see `docs/decisions/0015-form-and-card-contract-expansion.md`.
- Add Checkbox, Radio, Modal, and Drawer contracts, including behavior metadata for overlays. Done; see `docs/decisions/0016-control-and-overlay-contract-expansion.md`.
- Render component contracts in the docs site and add Toast, Tabs, Accordion, Popover, and Combobox contracts. Done; see `docs/decisions/0017-contract-docs-and-interactive-expansion.md`.
- Add Tooltip, Dropdown Menu, Context Menu, Command Palette, and Date Picker contracts. Done; see `docs/decisions/0018-floating-command-and-date-contract-expansion.md`.
- Add Hover Card, Steps, Carousel, Scroll Area, and Lightbox contracts. Done historically; Hover Card was later consolidated into Popover before v1 by ADR 0286. See `docs/decisions/0019-layout-interaction-contract-expansion.md`.
- Add Switch, Slider, Color Picker, File Upload, Tags Input, Segmented Control, and Number Input contracts. Done; see `docs/decisions/0020-advanced-form-contract-expansion.md`.
- Add Pin Input, Field Wrapper, Fieldset, Inline Error, Password Input, and Form contracts. Done; see `docs/decisions/0021-form-infrastructure-contract-expansion.md`.
- Add commerce primitive and Breadcrumb contracts. Done; see `docs/decisions/0022-commerce-primitive-contract-expansion.md`.
- Complete the remaining primitive contracts: Button Group, Icon Button, Close Button, Toggle, FAB, Alert, Progress, Spinner, Stat, Data Table, Data List, Timeline Primitive, and Link. Done; see `docs/decisions/0023-remaining-primitive-contract-expansion.md`.
- Add Product Card, Product Gallery, Product Info, Variant Selector, Product Form, Product Slider, Size Chart, Back in Stock, Store Pickup, and Subscription Option contracts. Done; see `docs/decisions/0024-product-contract-expansion.md`.
- Add Collection Hero, Collection Grid, Filter Panel, Pagination, View Toggle, Collection Promo, and Empty Collection contracts. Done; see `docs/decisions/0025-collection-contract-expansion.md` and ADR 0250.
- Add Cart Page, Cart Line Item, Cart Summary, Discount Field, Free Shipping Bar, Cart Upsell, Cart Empty, Quick View, Sticky ATC, Cart Note, and Gift Wrap contracts. Done; see `docs/decisions/0026-cart-contract-expansion.md`.
- Add full component contract coverage for global, pages, account, reviews, blog, marketing, storytelling, sections, and ceramics. Done; see `docs/decisions/0027-full-component-contract-coverage.md`.
- Decide whether contracts are hand-authored metadata, generation source, or both.
- Review generated pilot contracts before using them for target code generation.

### Phase 4 - Target Adapter Boundaries

- Document the current web/CSS adapter. Done; see `docs/decisions/0028-neutral-web-adapter-manifest-and-bundle.md`.
- Add neutral web adapter build output and manifest. Done.
- Add neutral web adapter validation. Done; run `npm run validate:adapter:web`.
- Document Shopify adapter conventions. Done; see `docs/decisions/0029-shopify-adapter-manifest-and-validation.md`.
- Inventory Shopify snippets/sections against registry components. Done through `platforms/shopify/adapter.manifest.json`.
- Add Shopify adapter build output and validation. Done; run `npm run validate:adapter:shopify`.
- Add Shopify maturity model for CSS, Liquid, and behavior layers. Done; see `docs/decisions/0030-shopify-adapter-maturity-model.md`.
- Add target-native adapter documentation, beginning with Shopify. Done; see `docs/adapters/README.md`, `docs/adapters/shopify.md`, and `docs/decisions/0031-target-native-adapter-documentation.md`.
- Expand Shopify maturity from CSS/Liquid/behavior to CSS/Liquid/schema/data/behavior/template/editor layers. Done; see `docs/decisions/0032-shopify-maturity-v1-schema-data-editor.md`.
- Create target manifests for Shopify, Webflow, Framer, and future React.
- Decide what each adapter can own and what must remain in core source.

### Phase 5 - Registry And CLI Evolution

- Make registry schema-validated.
- Add target-aware registry metadata.
- Design CLI target install flows:

```sh
the-gallery add button --target shopify
the-gallery add button --target react
the-gallery add button --target webflow
```

- Add version/migration strategy for copied local components.

### Phase 6 - Docs As Product

- Add The Gallery architecture docs into the docs site. Done.
- Add a component contracts index page to the docs site. Done.
- Add source/contract/target tabs for component pages.
- Add token reference pages from canonical token source.
- Add target-specific copy/install guidance.
- Add migration notes for versioned components.

### Phase 7 - Native And Advanced Targets

- Generate token-only SwiftUI output.
- Generate token-only Jetpack Compose output.
- Pilot Button styles/components in SwiftUI and Compose.
- Decide whether native components are generated, hand-authored adapters, or hybrid.

### Phase 8 - Distribution And Release Channels

- Define npm package structure for CLI, core web, React, Angular, and adapter artifacts.
- Define Shopify release outputs: theme zips, npm assets, GitHub releases, and possible Theme Store submissions.
- Other target delivery formats are outside this plan (ADR 0303).
- Define future Swift Package Manager and Maven/Gradle distribution paths.

## First Recommended Tasks

The current owner-approved sequence is base Web system, then Shopify; it ends there.
Close the original audit findings using the dated audit follow-up report before
expanding unrelated targets. Continue component visual-customization coverage
and individual certification after the shared corrections. Package/release
policy and broader target adapters remain separate decisions.

## Control coherence pilot (2026-09-08)

ADR 0292 scopes the first audit follow-up: canonical catalogue and historical-doc
clarity, targeted contrast corrections, and an Input/Button density pilot.
The owner reviewed the overall pilot; its Input label/message spacing follow-up
preserves 4 px. Shopify editor customization and Figma Professional portability
now have owner-viewed bounded implementations in ADRs 0297 and 0298. Shopify work continues after the base Web system; Figma work is removed from
scope. Neither historical pilot certifies an entire target.


## Public visual customization coverage (ADR 0293)

Owner review requires meaningful visual choices to be editable through public
tokens and discoverable in Exhibit/Studio. Input and Textarea now expose
independent label/message gaps, border thickness, focus geometry and label
weight, plus previously declared font-family, bottom-margin and opacity tokens.
Exhibit's visual-control inventory is generated from the same metadata as Studio.
Other components still require a coverage review; contract validity alone does
not certify that their visual customization surface is complete.


## Choice control customization (ADR 0304)

Checkbox, Radio and Switch expose 17 additional source decisions, shared focus
dimensions and label typography through contracts and Exhibit/Studio. The contact
composition now covers their different immediate/deferred behaviors. Continue
with subsequent form families after this bounded checkpoint; do not infer
complete catalogue coverage or stable status from structural validation.

## Form infrastructure customization (ADR 0305)

Field Wrapper, Fieldset and Form now expose 30 additional source decisions and
shared visual controls in Studio/Exhibit. Wrapper spacing, neutral feedback, Form
preview width and contact heading isolation are corrected. Native form ownership
and contract maturity remain unchanged. See
`docs/reports/2026-09-09-form-infrastructure-checkpoint.md` for browser evidence,
copy-and-own compatibility and remaining scope.

## Specialized field customization (ADR 0306)

Inline Error, Password Input and Number Input expose 25 additional source
decisions through contracts and Studio/Exhibit. Number Input now shares the
46px outer density of Input, Password Input and Button, with independent action
width. Contact and Auth Forms exercise the shared implementations. See
`docs/reports/2026-09-09-specialized-fields-checkpoint.md` for evidence and
copy-and-own adoption notes. Component coverage and certification continue;
this checkpoint does not certify the hosted Shopify target.

## Popup field customization (ADR 0307)

Combobox and Date Picker expose 39 new visual decisions and reuse shared field
roles. Studio-only overrides and the wrapper width precedence are corrected;
Combobox IME and Date Picker focus follow their existing contracts. The owner
removed the Studio-only search icon. See
`docs/reports/2026-09-09-popup-fields-checkpoint.md` for measured overrides,
native HTML composition and adoption limits.

## File Upload and Pin Input customization (ADR 0308)

File Upload and Pin Input expose 24 source decisions, with generated Studio/Exhibit
controls and Web/Shopify outputs. Native selection/reset, image-preview cleanup,
compact cell geometry and readonly paste are verified in Studio and a native HTML
consumer. See `docs/reports/2026-09-09-file-pin-checkpoint.md` for evidence and limits.

## Tag composition customization and performance checkpoint (ADR 0309)

Tag and Tags Input expose 15 decisions; composed public tokens are validated
through declared CSS dependencies. RTL padding, removal contrast and field
customization are verified. The batch initially paused under the former internal
Web-token and Storytelling byte ceilings. ADR 0310 subsequently retires those
ceilings with owner approval: limits must be target-specific and sourced.
See `docs/reports/2026-09-09-component-batches-checkpoint.md` for the historical
measurements and `docs/reports/2026-09-09-target-performance-checkpoint.md` for the
new policy. Component batches can continue; token-output deduplication remains
a proposed optimization with equivalence acceptance, not a condition imposed by
an arbitrary byte budget.

## Responsive token output (ADR 0311)

Web and Shopify retain complete theme bases and emit only changed expressions
at their existing viewport breakpoints. Local gzip token output decreases by
about 73.1%; canonical values, aliases and component contracts remain unchanged.
The 1,008-case Chromium comparison and Studio/Contact checks are recorded in
`docs/reports/2026-09-09-responsive-token-checkpoint.md`. This supersedes the
pending output-optimization proposal above. Component batches can continue;
copy-and-own consumers and the hosted Shopify theme are not updated automatically.

## Native choice customization (ADR 0312)

Color Picker and Segmented Control expose 23 additional source decisions and
their complete reviewed public inventories in Studio/Exhibit. Native HTML remains
the selection/form owner. Studio retains third/fourth choices, Segmented Control's
legend gap now applies, and forced-color swatch selection has a real boundary.
The 96-case CSS comparison, 58 Studio measurements and native/composed checks are
recorded in `docs/reports/2026-09-09-native-choice-checkpoint.md`. Both remain pilot.

## Slider customization and runtime parity (ADR 0313)

Slider exposes six source decisions and 31 public controls. Studio uses the
canonical range enhancer; native default bounds and track focus are corrected.
Separate engine selector lists restore forced-color and reduced-motion rules.
The checkpoint records 32 default comparisons, 24 Studio measurements, native
form behavior and Before / After composition, including actual Chromium thumb
styles: `docs/reports/2026-09-09-slider-checkpoint.md`. Slider remains pilot.
Continue the remaining base Web customization batches; full Shopify integration
follows completion of the base Web system.

## Passive primitive customization (ADR 0314)

Badge and Price expose seven source decisions with unchanged defaults, 17/13
public controls and no additional runtime. Badge tracking preserves relative em
units; Price supporting weights reuse Body. The 48 presentation comparisons,
16 Studio measurements and Product Card checks are recorded in
`docs/reports/2026-09-09-passive-primitives-checkpoint.md`. Both remain pilot;
continue with Quantity Selector and remaining base Web customization coverage.

## Quantity customization and composition (ADR 0315)

Quantity Selector exposes seven source decisions and 39 public controls, shares
the 46px outer control height with Button, and remains compact inside grid fields.
Studio composes Field Wrapper and the canonical native enhancer. Evidence covers
32 default comparisons, 22 Studio measurements, native form ownership and Product
Form/Cart Line Item: `docs/reports/2026-09-09-quantity-checkpoint.md`. Keep pilot;
continue Rating and Loading Skeleton before broader commercial compositions.

## Rating and Skeleton customization (ADR 0316)

Rating and Loading Skeleton expose nine source decisions and ten/thirteen public
roles respectively. Defaults and relative units remain stable. Skeleton preserves
its existing 4.5-second maximum and static preference modes. Evidence covers 64
comparisons, twenty Studio measurements, installed CSS, real animation completion,
Review compositions and Exhibit: `docs/reports/2026-09-09-rating-skeleton-checkpoint.md`.
Continue remaining primitives and commercial compositions; both remain pilot.

## Empty State and Divider customization (ADR 0317)

Empty State exposes four additional geometry choices and enforces contextual
heading validation at runtime. Divider exposes two thicknesses without changing
parent-owned spacing or Purpose. Evidence covers 48 presentations, fifteen Studio
measurements, RTL/narrow containment and Cart Empty/Empty Collection composition:
`docs/reports/2026-09-09-empty-divider-checkpoint.md`. Avatar's paired-scale
clarification is resolved by ADR 0319; continue base component coverage.

## Studio color editing (ADR 0318)

The shared token swatch editor preserves RGB/alpha independently, displays real
transparency, and retains unsupported color expressions in a complete text editor.
Empty State color-mix, authored RGBA, Button transparent border and Slider shadow
regression pass: `docs/reports/2026-09-09-studio-color-checkpoint.md`. Site-only;
no source values, component maturity or target outputs change.


## Avatar customization (ADR 0319)

The owner resolved the paired-scale blocker: diameter and initials size are
independently customizable through tokens. Four diameter decisions and the existing
semantic type roles expose all thirteen visual controls, with unchanged defaults.
Evidence covers 56 roots, four independent pairs, CLI, Studio, Exhibit, Author Card,
Comment Section and image/naming boundaries: `docs/reports/2026-09-09-avatar-checkpoint.md`.
Continue Button Group, Icon Button and Close Button; Avatar remains pilot.

## Compact action customization (ADR 0320)

Button Group, Icon Button and Close Button now expose their meaningful visual
choices through public tokens. Group joining follows the existing Button border
width; size/icon and focus controls preserve defaults and native semantics.
Eight matrices and Lightbox composition pass; see
`docs/reports/2026-09-09-compact-actions-checkpoint.md`.
Continue Toggle and FAB without changing target priorities or pilot maturity.

## Toggle and FAB customization (ADR 0321)

Both expose 21 public roles with token-driven spacing, dimensions and focus.
Installed-consumer parity and native behavior pass; FAB keeps physical bottom-right
placement and target-owned action/visibility policy. Studio now preserves its
offsets in the contained preview. See
`docs/reports/2026-09-09-toggle-fab-checkpoint.md`.
Continue Alert, Progress, Spinner and Stat without changing pilot maturity.

## Feedback value customization (ADR 0322)

Alert, Spinner and Stat expose their meaningful geometry/motion/weight choices;
shared roles and documented color derivations are preserved. Studio identifies
Alert fallbacks and offers an optional Stat group fixture. See
`docs/reports/2026-09-09-feedback-values-checkpoint.md`.
Continue Progress with owner-approved independent circle diameter/stroke pixels.

## Progress pixel geometry (ADR 0323)

Progress exposes independent circle diameter/stroke pixels and public Bar layout
and indeterminate motion controls. Existing apparent stroke is preserved; the
small radius correction and copied-SVG adoption are explicit. Range, endpoints,
accessible text, Studio and Free Shipping Bar evidence pass. See
`docs/reports/2026-09-09-progress-checkpoint.md`.
Continue the remaining primitives without changing pilot maturity or target scope.

## Table and Data List customization (ADR 0324)

Eighteen source roles expose tabular density, borders, sortable-trigger geometry
and description-list spacing. Responsive layouts use the existing container query
and token values; configuration aliases leave the state inventory. Default parity,
native sorting/scroll/focus, Studio and Size Chart composition pass:
`docs/reports/2026-09-09-tabular-checkpoint.md`.
Continue Timeline and Link without changing pilot maturity or target scope.

## Timeline and Link customization (ADR 0325)

Timeline derives marker/content/connector alignment from public dimensions; Link
exposes decoration/focus geometry and preserves underline thickness across variants.
Visible default parity, states, RTL, native navigation and Studio pass:
`docs/reports/2026-09-09-timeline-link-checkpoint.md`.
Continue component/composition coverage. Collection Promo retains local underline
offset/hover literals despite inheriting Link focus; reconcile in its own batch.

## Card visual values (ADR 0326)

Card exposes border width, Hover lift and media scale, and Studio uses the same
values and pointer/motion guards as canonical CSS. Default parity and specialized
Card boundaries pass; the approved stable baseline is preserved. See
`docs/reports/2026-09-09-card-checkpoint.md`.
Continue Collection Promo and remaining component/composition coverage.

## Collection Promo visual values (ADR 0327)

Collection Promo exposes its meaningful dimensions, factors, density and Link
composition roles. This resolves the local underline exception recorded in ADR
0325. Default parity, compact container response, parent Grid span, native Link
and omission semantics pass: `docs/reports/2026-09-09-collection-promo-checkpoint.md`.
Shopify data/schema/insertion/editor validation remains separate; E6 stays pilot.
Continue Modal and Drawer.

## Modal and Drawer visual values (ADR 0328)

Modal/Drawer expose meaningful geometry and shared backdrop tint, preserving
responsive spacing factors. Studio/Exhibit stop masking source widths. Default
parity, long-content scroll, RTL, keyboard and composed sections pass:
`docs/reports/2026-09-09-modal-drawer-checkpoint.md`. True target modality remains
separate; both stay pilot. Continue Toast and Tooltip.
