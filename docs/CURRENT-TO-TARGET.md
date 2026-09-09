# Current State To Target Architecture

## Current checkpoint — 2026-09-08

The Shopify brand-settings pilot is backed up remotely at `0f13e5e` after
hosted checks in unpublished theme `188631449907` (ADR 0297). ADR 0298 adds a
bounded repo-to-Figma pilot in the existing Design System file: four editable
form components, 154 variables, three compositions and an identity-preserving
4 → 8 → 4 px spacing update. Owner visual review is pending; the library is
unpublished. See the dated Shopify and Figma pilot reports for exact evidence
and limitations. The Foundations control matrix remains until equivalent
adjacent/state coverage exists in real compositions.

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
| Token outputs | Legacy Webflow CSS and Framer JS outputs exist but have known unit-transform defects and are not production-ready. The new source compiler generates ignored comparison CSS/JSON under `tokens/source/build/`; the first real neutral web target exists at `platforms/web/tokens.css`; Shopify now has a thin token wrapper at `platforms/shopify/assets/tokens.css`. | Outputs include CSS, JS/TS, Figma variables, Shopify, Webflow, Framer, SwiftUI, Compose, and future targets. | Add Webflow wrapper or JS/TS output next; expand target by target. |
| Component source | Canonical source is now CSS plus MDX examples, registry metadata, and 182 validated component contracts covering every component in `registry.json`. Button is the first contract with reviewed semantic properties and web mappings; its site-owned Studio definition covers all ten properties without duplicating contract facts. | Component contracts define anatomy, slots, variants, states, semantic properties, target mappings, dependencies, tokens, behavior, and accessibility independent of Studio presentation. | Continue component-by-component property review without inferring missing capabilities; decide generation vs validation role for contracts; use contract metadata for target guidance. |
| Web/CSS adapter | The neutral web adapter generates complete compatibility bundles plus copied CSS family modules, 17 selective runtime modules, a small loader/core, and per-component dependency-closed install descriptors. | CSS is one concrete adapter backed by contracts, with explicit modular delivery and validation. | Keep CSS hand-authored; consider component-level CSS extraction only if measured family slices become a material bottleneck. |
| Shopify adapter | `platforms/shopify/` has active Liquid theme work, a generated token wrapper, generated/copied CSS assets, selective runtime modules, adapter manifest/summary validation, `shopify-maturity-v1`, and Shopify-specific adapter documentation. Layouts load the selective runtime rather than the complete compatibility runtime. | Shopify consumes tokens and component contracts through explicit Liquid/assets/settings/schema/data/behavior/template/editor adapter rules. | Reconcile `planned` contracts with Liquid/schema evidence; add stricter contract-specific snippet/section validation and Theme Check. |
| Registry | `registry.json` drives docs and CLI; `registry.schema.json` now exists with local structural validation. | Registry is schema-validated, target-aware, version-aware, and dependency-aware. | Expand target fields; align component count/categories over time; decide package vs registry versioning. |
| CLI | CLI can init, add, list and diff; Web installs now read the adapter manifest, copy dependency-closed CSS/runtime slices and generate a local module entry. | CLI installs by target, version, and dependency graph, preserving copy-and-own semantics. | Add dry-run/manifest output and later support `--target shopify/react/webflow`. |
| Documentation site | React/Vite docs app uses registry, MDX pages, previews, architecture pages, and a contracts index. It consumes `platforms/web/index.css` as a first-party adapter client; isolated previews use generated adapter component CSS and inherit the document token matrix. Exhibit now groups canonical MDX into five curatorial sections, promotes one preview as the artwork, and adapts its index and pedestal across desktop and mobile. A validated Studio presentation layer and generic inspector exist, with Button as the first interactive renderer and a site-only Lucide icon catalogue. | Exhibit and Studio consume contract facts through site-owned presentation metadata while docs expose north star, tokens, target-specific usage, versions, copy commands, and migration guidance. | Expand Studio only as component contracts are reviewed; implement the separately approved main-menu experience; improve token pages and reduce MDX inline style warnings over time. |
| Figma target | Root exports remain historical snapshots. ADR 0298 adds a bounded Plugin API pilot in `platforms/figma/pilot/`, with variables, styles, four form components and persistent IDs. | Figma variables and components are generated/synced from repo source. | Review the pilot, including derived CSS transformations; decide the general delivery/update model before expansion. |
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
- Verify outputs for CSS, Shopify, Webflow, Framer, Figma import, Swift, and Kotlin/Compose.
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
- Define Webflow, Framer, and Figma delivery formats.
- Define future Swift Package Manager and Maven/Gradle distribution paths.

## First Recommended Tasks

These are the highest-leverage next tasks:

1. Reconcile Shopify contracts whose adapters are detected by `shopify-maturity-v1` but still marked `planned`.
2. Add the Webflow token/component wrapper or JS/TS output for framework targets.
3. Decide generated artifact policy for `site/dist`.
4. Add target-specific guidance to component contract docs sections.
5. Extend the manifest-driven CLI beyond Web with explicit target selection and dry-run output.
6. Define package/release policy for source-generated target artifacts.

These tasks turn the north star into executable structure without forcing a risky full migration.

## Control coherence pilot (2026-09-08)

ADR 0292 scopes the first audit follow-up: canonical catalogue and historical-doc
clarity, targeted contrast corrections, and an Input/Button density pilot.
The owner reviewed the overall pilot; its Input label/message spacing follow-up
preserves 4 px. Shopify editor customization and Figma Professional portability
now have bounded implementations in ADRs 0297 and 0298, pending owner review.


## Public visual customization coverage (ADR 0293)

Owner review requires meaningful visual choices to be editable through public
tokens and discoverable in Exhibit/Studio. Input and Textarea now expose
independent label/message gaps, border thickness, focus geometry and label
weight, plus previously declared font-family, bottom-margin and opacity tokens.
Exhibit's visual-control inventory is generated from the same metadata as Studio.
Other components still require a coverage review; contract validity alone does
not certify that their visual customization surface is complete.
