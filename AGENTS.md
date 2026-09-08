# The Gallery Agent Guide

This file is the first stop for any AI agent working in this repository.

The Gallery is intended to become a long-lived, platform-agnostic design system: design tokens, target-agnostic component sources, a documentation/gallery site, and target adapters for Shopify, Webflow, Framer, React, Angular, Figma, and future platforms. It follows a copy-and-own distribution model inspired by shadcn/ui: consumers copy the pieces they need into their own project and can customize them locally.

## Start Here

Read these files before making non-trivial changes:

- `docs/PROJECT-BRIEF.md` for the owner-stated product vision and priorities.
- `docs/NORTH-STAR.md` for the target architecture and long-term direction.
- `docs/ARCHITECTURE.md` for the current repo structure and build/data flow.
- `docs/CURRENT-TO-TARGET.md` for the gap map and development backlog.
- `docs/OPEN-QUESTIONS.md` for unresolved architecture decisions. Do not resolve these by assumption.
- `docs/decisions/0001-repo-is-design-system-source-of-truth.md` for the accepted source-of-truth decision.
- `docs/decisions/0002-layered-source-contract-adapter-architecture.md` for the accepted layered architecture.
- `docs/adapters/README.md` and `docs/adapters/shopify.md` for target-native adapter implementation rules.
- `docs/COMPONENT-CERTIFICATION.md`, `docs/decisions/0034-web-component-certification-and-docs-dogfooding.md`, and `docs/decisions/0035-button-semantic-properties-and-loading-placement.md` for web-first maturity gates, semantic Studio property ownership, the Button property-schema pilot, and docs-site adapter consumption.
- `docs/decisions/0274-variant-state-orthogonality.md` for the global rule that variants and states remain independent contract and Studio axes; combined CSS selectors are implementation evidence, not additional states.
- `docs/decisions/0275-required-field-indicator-standard.md` for the global centered required-marker treatment, single-marker group rule, and native or ARIA semantic-authority boundary.
- `docs/decisions/0276-product-card-hierarchy-description-and-quick-look.md` for Product Card spacing hierarchy, two-line description, Quick Look semantics, and non-elevating Card surface.
- `docs/decisions/0278-product-card-quick-look-overlay-width.md` for Product Card's intrinsic-width media-overlay Quick Look placement and hover/focus/coarse-input visibility.
- `docs/decisions/0279-product-card-artist-price-and-overlay-alignment.md` for Product Card's reversible artist visibility, required Price composition outside optional footer actions, and logical Quick Look/content alignment.
- `docs/decisions/0280-product-card-unified-content-inset.md` for Product Card's shared compact inset across badges, content, Price, Quick Look, and optional footer actions.
- `docs/decisions/0281-divider-parent-owned-spacing-and-purpose.md` for Divider's visual-only variants, parent-owned external spacing, and independent purpose/semantics control.
- `docs/decisions/0282-studio-inspector-canonical-control-dogfooding.md` for the rule that Studio Customize controls must compose complete shared Gallery renderers instead of imitating them with partial class reuse.
- `docs/decisions/0283-studio-preview-top-alignment.md` for the Studio-only rule that desktop previews align with the top of Customize without changing shared component renderers or Exhibit fixtures.
- `docs/decisions/0284-card-fine-pointer-hover-treatment.md`, `docs/decisions/0285-card-family-composition-and-review-identity.md`, `docs/decisions/0286-hover-card-consolidation-into-popover.md`, and `docs/decisions/0287-card-editorial-fixture-and-compact-inset.md` for Card hover, Card-family composition, Hover Card consolidation, and Card's shared editorial fixture plus compact content inset.
- `docs/decisions/0288-studio-inspector-numeric-units-token-names-and-label-columns.md` for number-only Studio token editing, visible unit badges, normalized token display names, and bounded dynamic label columns.
- `docs/decisions/0289-studio-structured-shadow-token-editor.md` for the shared inline X, Y, Blur, Spread, Color, and Opacity authoring treatment for Studio shadow tokens.
- `docs/decisions/0290-card-final-stability-approval.md` for the owner-approved Card v1 baseline and its promotion from `pilot` to `stable` without changing related components' maturity.
- `docs/decisions/0291-button-group-configurable-studio-fixture.md` for Button Group's site-owned count and per-child label controls without promoting fixture data into the target-agnostic contract.
- `docs/decisions/0293-public-visual-customization-coverage.md` for broad public visual customization coverage, independent Input label/message spacing, and shared Exhibit/Studio token controls.
- `docs/decisions/0294-button-select-customization-and-contact-composition.md` for Button/Select visual controls, shared field geometry, unitless token editing and the contact composition checkpoint.
- `docs/decisions/0295-required-marker-public-color.md` for the shared red required-marker token and its Studio/Exhibit exposure.
- `docs/decisions/0296-button-icon-optical-edge-offset.md` for editable Button icon-side optical spacing and loading-slot geometry.
- `docs/decisions/0297-shopify-brand-settings-pilot.md` for Shopify Light brand settings, shared typography and the hosted-editor verification boundary.
- `docs/decisions/0292-control-coherence-pilot.md` for the canonical token catalogue, Input/Button density pilot, targeted contrast corrections and the owner-reviewed spacing follow-up.
- `docs/decisions/0277-interface-numerals-and-editorial-serif-boundary.md` for ordinary interface zeroes, removal of the slashed-zero API, and the UI-versus-editorial typeface boundary.
- `docs/decisions/0007-token-source-architecture.md` for the accepted token source layering.
- `docs/decisions/0051-field-variant-hover-preservation.md` for the requirement
  that field hover preserve the active validation color family.
- `docs/decisions/0052-textarea-input-contract-composition.md` for Textarea's
  Input composition, native value mapping, and multi-line ownership boundary.
- `docs/decisions/0053-textarea-resize-direction-property.md` for Textarea's
  independent Vertical, Horizontal, and Both resize property.
- `docs/decisions/0054-numeric-semantic-component-properties.md` for numeric
  contract properties and their Studio controls.
- `docs/decisions/0055-textarea-line-bound-properties.md` for Textarea minimum
  and maximum visible-line behavior.
- `docs/decisions/0056-checkbox-native-state-and-validation-composition.md` for
  Checkbox native properties, validation ownership, and mixed-state behavior.
- `docs/decisions/0057-radio-native-group-and-validation-composition.md` for
  Radio named-group behavior and choice-control validation composition.
- `docs/decisions/0058-badge-passivity-and-tag-removal-ownership.md` for Badge
  passivity, Tag removal ownership, and Studio optional-slot controls.
- `docs/decisions/0008-token-source-compiler.md`, `docs/decisions/0009-token-migration-map.md`, `docs/decisions/0010-neutral-web-token-target.md`, `docs/decisions/0011-web-token-compatibility-aliases.md`, `docs/decisions/0012-target-adapter-token-wrappers.md`, `docs/decisions/0013-component-contract-schema-pilot.md`, `docs/decisions/0014-input-component-contract-pilot.md`, `docs/decisions/0015-form-and-card-contract-expansion.md`, `docs/decisions/0016-control-and-overlay-contract-expansion.md`, `docs/decisions/0017-contract-docs-and-interactive-expansion.md`, `docs/decisions/0018-floating-command-and-date-contract-expansion.md`, `docs/decisions/0019-layout-interaction-contract-expansion.md`, `docs/decisions/0020-advanced-form-contract-expansion.md`, `docs/decisions/0021-form-infrastructure-contract-expansion.md`, `docs/decisions/0022-commerce-primitive-contract-expansion.md`, `docs/decisions/0023-remaining-primitive-contract-expansion.md`, `docs/decisions/0024-product-contract-expansion.md`, `docs/decisions/0025-collection-contract-expansion.md`, `docs/decisions/0026-cart-contract-expansion.md`, `docs/decisions/0027-full-component-contract-coverage.md`, `docs/decisions/0028-neutral-web-adapter-manifest-and-bundle.md`, `docs/decisions/0029-shopify-adapter-manifest-and-validation.md`, `docs/decisions/0030-shopify-adapter-maturity-model.md`, `docs/decisions/0031-target-native-adapter-documentation.md`, `docs/decisions/0032-shopify-maturity-v1-schema-data-editor.md`, `docs/decisions/0033-motion-token-architecture.md`, `docs/decisions/0034-web-component-certification-and-docs-dogfooding.md`, `docs/decisions/0035-button-semantic-properties-and-loading-placement.md`, `docs/decisions/0036-site-owned-studio-presentation-metadata.md`, `docs/decisions/0037-studio-lucide-icon-catalogue.md`, `docs/decisions/0038-curatorial-exhibit-mdx-composition.md`, `docs/decisions/0039-stable-ui-body-scale-and-button-type-token.md`, `docs/decisions/0040-button-source-token-reconciliation.md`, `docs/decisions/0041-direct-string-attribute-contract-mapping.md`, `docs/decisions/0042-input-density-icon-and-typography-contract.md`, `docs/decisions/0043-primary-focus-color.md`, `docs/decisions/0044-input-success-state-symmetry.md`, `docs/decisions/0045-field-focus-ring-hierarchy.md`, `docs/decisions/0046-input-hover-surface-default.md`, `docs/decisions/0047-custom-select-progressive-enhancement.md`, `docs/decisions/0048-select-popup-sizing-placeholder-and-icons.md`, `docs/decisions/0049-field-validation-state-requirement.md`, `docs/decisions/0050-field-warning-validation-variant.md`, `docs/decisions/0051-field-variant-hover-preservation.md`, and `docs/decisions/0052-textarea-input-contract-composition.md` for source-token build, migration parity, target adapters, component contracts, certification, the Button and Input semantic-property pilots, Studio presentation ownership, the site-only icon source, Exhibit composition, the stable UI typography scale, source-token reconciliation, direct string mappings, Input density and icon composition, primary focus, validation-state symmetry, the shared field focus-ring hierarchy, the Input hover surface default, custom Select progressive enhancement, Select popup sizing, placeholder semantics, fixed Lucide indicators, the required validation states including Warning for every value-entry field, variant-preserving field hover, and Textarea's Input composition boundary.
- `context.md` for the existing long-form design-system context.
- `docs/COMPONENTS.md` for CSS contract patterns and component guidance.
- `registry.json` for the current component manifest used by the CLI and docs site.

If these files conflict, treat the concrete source files and scripts as current implementation facts, then ask before making architecture-level decisions.

## Non-Negotiables

- Do not assume missing product or architecture decisions. Ask when a decision is not already explicit.
- Do not invent tokens, component classes, target adapters, or registry fields without checking existing patterns.
- Do not edit copied/generated target files as the canonical source. Prefer `components/css/`, `components/js/`, `tokens/`, `registry.json`, and `site/src/content/components/`.
- Do not churn `site/dist` unless the task explicitly requires rebuilding and committing built docs output.
- Preserve local/user changes. This repo may have a dirty worktree; never revert unrelated changes.
- Treat local test resources as owned lifecycles. Never leave a docs server,
  Playwright session, browser process, trace, or extra tab running after the
  evidence phase that created it.
- Keep component CSS target-agnostic unless working inside a target adapter such as `platforms/shopify/`.
- Components should use BEM-style classes, `--_` private custom-property contracts, semantic tokens, accessible markup patterns, and progressive enhancement.
- When the user writes in Spanish, respond in Spanish unless they ask otherwise.

## Current Canonical Surfaces

- New token source direction: `tokens/source/` with DTCG-style `$value`/`$type` tokens.
- Current legacy token build input: `tokens/*_tokens.json`.
- Design-system source of truth: the repo. Figma is a target, not the source.
- Raw Figma exports: root-level `*.tokens.json`. These are migration/reference snapshots from an earlier Figma export, not canonical source files.
- Base component CSS: `components/css/*.css`.
- Component contracts: `components/contracts/*.contract.json`.
- Shared component JS: `components/js/theme.js`.
- Canonical runtime module boundaries: `components/js/runtime-modules.json`.
- Component manifest: `registry.json`.
- CLI: `cli/index.js`.
- Docs app: `site/`.
- Docs component pages: `site/src/content/components/*.mdx`.
- Studio presentation metadata: `site/src/content/studio/*.studio.json`.
- Shopify target: `platforms/shopify/`.
- Shopify adapter output: `platforms/shopify/assets/base.css`, copied CSS assets, `platforms/shopify/assets/theme.js`, `platforms/shopify/adapter.manifest.json`, and `platforms/shopify/adapter.summary.json`.
- Neutral web token target: `platforms/web/tokens.css`.
- Neutral web component adapter output: `platforms/web/index.css`, `platforms/web/components.css`, `platforms/web/components/`, `platforms/web/runtime-loader.js`, `platforms/web/runtime/`, compatibility `platforms/web/theme.js`, `platforms/web/adapter.manifest.json`, and `platforms/web/adapter.summary.json`.
- Webflow target CSS output/copies: `platforms/webflow/`.
- Framer token output: `platforms/framer/tokens.js`.

## Generated Or Copied Outputs

- `scripts/copy-components.js` copies files from `components/css/` and `components/js/` into platform directories.
- `scripts/build-web-adapter.js` generates the neutral web component adapter from registry, contracts, token output, CSS, and JS source facts.
- `scripts/validate-web-adapter.js` validates the neutral web adapter output and manifest.
- `scripts/build-shopify-adapter.js` generates Shopify base/assets/manifests from registry, contracts, CSS, JS, Liquid, schema, data, and template-composition source facts.
- `scripts/validate-shopify-adapter.js` validates Shopify adapter assets, manifest, layout load order, Liquid inventory, and `shopify-maturity-v1`.
- `config.js` defines Style Dictionary outputs for Shopify, Webflow, and Framer.
- `site/dist` is built output. It is currently tracked in git, so avoid incidental rebuild churn.
- Shopify copied CSS in `platforms/shopify/assets/` should usually be regenerated from `components/css/` instead of edited directly. Platform-only Liquid lives under `platforms/shopify/sections`, `snippets`, `templates`, `layout`, `config`, and `locales`.

## Common Commands

Run from the repo root unless noted:

```sh
npm run validate:docs
npm run validate:refinement-decisions
npm run audit:components
npm run audit:refinement
npm run audit:refinement:performance
npm run validate:tokens:source
npm run build:tokens:source
npm run validate:tokens:source-build
npm run build:tokens:web
npm run validate:tokens:web
npm run validate:tokens:web-components
npm run build:tokens:shopify
npm run validate:tokens:shopify
npm run validate:shopify:brand
npm run build:adapter:web
npm run validate:adapter:web
npm run build:adapter:shopify
npm run validate:adapter:shopify
npm run validate:cli
npm run validate:contracts
npm run validate:studio
npm run build:tokens
npm run build:components
npm run build
npm run tg -- list
npm run tg -- add button
npm run dev:site
npm run dev:site:evidence
npm run evidence:status
npm run evidence:cleanup
npm run evidence:assert-clean
npm --prefix site run build
```

Use validation commands that match the files you changed. Do not run commands that rewrite generated outputs unless the task calls for those outputs.

## Local Test Resource Hygiene

Browser evidence must use a bounded lifecycle. The default resource budget is
one Gallery docs server, one Playwright CLI session/browser, and one tab. Do not
run independent Exhibit, Studio, viewport, before, and after browsers in
parallel.

Before browser work:

1. Do not start the docs site during research, source editing, or non-browser
   validation. Start it only for a short baseline or final evidence phase.
2. Probe `http://127.0.0.1:4173` before starting Vite. Reuse a responsive Gallery
   server instead of opening another port.
3. When no server exists, start exactly one with
   `npm run dev:site:evidence` in a managed execution session. The command fixes
   host `127.0.0.1`, port `4173`, and `strictPort`, records only the process it
   owns, and reuses a responsive server instead of opening another one. Keep its
   execution-session identifier as a first shutdown path; never use `&`,
   `nohup`, an implicit fallback port, or one server per viewport.
4. Reuse the stable Playwright session name `gallery-refinement`. Use one tab and
   navigate it between Exhibit, Studio, states, and viewports. Default to
   headless mode; use headed mode only when a visible interactive inspection is
   materially necessary.

After each baseline or final evidence phase, including interrupted or failed
runs:

1. Run `npm run evidence:cleanup`. It closes only `gallery-refinement` and the
   server process recorded as owned by this repo; it preserves a pre-existing
   user-owned server and normal Chrome.
2. If the managed execution session is still present, send it `Ctrl-C` and run
   cleanup again. Stopping the managed server also closes the stable Playwright
   session as a failure-safe. Never stop a pre-existing user-owned server.
3. Run `npm run evidence:assert-clean`. A batch may not finish while this gate
   reports an owned browser or server.
4. Keep the browser and server closed while writing code, documentation, reports,
   or running non-browser validators.

Before/after evidence may require two short browser phases. Close the baseline
phase before implementation, then open one fresh `gallery-refinement` session
for final evidence and close it immediately afterward. The screenshots remain;
the processes must not.

## Adding Or Changing Components

1. Find the component in `registry.json`.
2. Edit the canonical CSS file under `components/css/`.
3. Keep selectors and naming aligned with BEM and existing category files.
4. Use semantic CSS variables and component-private `--_` variables for composition.
5. Update `registry.json` when dependencies, categories, selectors, or token usage change.
6. Update or add the canonical docs page at `site/src/content/components/<slug>.mdx`.
7. If a target needs implementation markup, add it inside that target's directory.
8. Run `npm run validate:docs`.

## Token Work

The design-system source of truth lives in this repo. New source-token work should happen in `tokens/source/` using DTCG-style `$value`/`$type` tokens. The current build pipeline still consumes legacy `tokens/*_tokens.json` through Style Dictionary, so keep it stable until the new source compiler and output comparisons are ready.

Root-level `*.tokens.json` files look like Figma exports with `$type`, `$value`, and Figma metadata; they are reference snapshots only. Do not promote them to source files.

An initial DTCG spike exists in `spikes/dtcg/` and is documented in `docs/spikes/0001-dtcg-token-source-spike.md`. The first source structure is documented in `docs/decisions/0007-token-source-architecture.md`, and the first source compiler is documented in `docs/decisions/0008-token-source-compiler.md`.

Run `npm run validate:tokens:source` after changing `tokens/source/`. Run `npm run build:tokens:source` and `npm run validate:tokens:source-build` when changing the source compiler, source modes, or migrated token values.

`tokens/source/build/` is ignored and is only a migration/comparison sandbox. Do not treat it as a target output or source file.

`tokens/source/migration-map.json` is the executable inventory from legacy token paths to source token paths. Keep it covering every unique legacy path from `tokens/*_tokens.json`; `npm run validate:tokens:source-build` enforces this.

`platforms/web/tokens.css` is the first real target generated from `tokens/source/`. Build it with `npm run build:tokens:web`. It is a tracked target artifact, unlike `tokens/source/build/`.

The neutral web target exposes canonical `--tg-*` variables and compatibility aliases for the current public component CSS API (`--color-*`, `--typo-*`, `--space-*`, `--radius-*`, `--shadow-*`, and related names). Treat aliases as target output policy, not canonical source. `npm run validate:tokens:web-components` verifies that every public `components/css` variable reference is defined by `platforms/web/tokens.css`; component-private `--_` variables are intentionally ignored.

Shopify tokens are generated from the neutral web target through `scripts/build-shopify-tokens.js`, not from the legacy Style Dictionary config. Use `npm run build:tokens:shopify` and do not edit `platforms/shopify/assets/tokens.css` directly. `npm run build:tokens` is now the legacy Webflow/Framer token build and reads only `tokens/*_tokens.json`.

Shopify `base.css` is generated by `scripts/build-shopify-adapter.js` from reset, foundations, and utilities CSS. It must not define token values. Shopify component CSS assets and `theme.js` are copied from source; `adapter.manifest.json` and `adapter.summary.json` are generated inventories. Run `npm run validate:adapter:shopify` after changing Shopify layouts, Liquid snippets/sections/templates, component CSS, shared JS, or Shopify adapter metadata. Shopify maturity is computed from CSS, Liquid, schema, data mapping, behavior, template composition, editor-preview readiness, and contract status. Embedded class contracts do not require a dedicated Liquid root. Current Shopify adapter warnings are maturity backlog, not build blockers.

Before adding, deleting, or renaming token layers, read `docs/analysis-component-tokens.md` and `docs/OPEN-QUESTIONS.md`, then ask if the intended architecture is still unclear.

## Contract And Adapter Work

The target architecture has two internal source languages: tokens for values and component contracts for target-agnostic component definition. CSS, Liquid, JSX, SwiftUI, Compose, Figma variables, and Webflow files are adapters or outputs.

The first formal `components/contracts/` schema exists with 183 validated contracts covering every component in `registry.json`. Contracts must stay aligned with `registry.json`, canonical CSS, MDX docs, and public web tokens. Interactive contracts may include target-agnostic `behavior` requirements such as visibility, dismissal, focus management, navigation, motion, form semantics, file handling, validation, submission, commerce formatting, and ARIA semantics. Some generated pilot contracts are intentionally conservative and should be refined before code generation. The docs site reads contracts through `site/src/lib/contracts.ts` and renders them with `site/src/components/ContractSummary.tsx`. Run `npm run validate:contracts` after changing contracts, registry component metadata, component CSS covered by a contract, or public component tokens.

The docs site reads Studio presentation definitions through `site/src/lib/studio.ts`. These files own grouping, ordering, control presentation, and Figma traceability only. They reference contract properties, states, and public tokens and must not copy semantic defaults, option sets, mappings, behavior, or token values. Run `npm run validate:studio` after changing Studio metadata or reviewed semantic properties.

Studio renderers live under `site/src/components/studio/` and are registered in `site/src/components/studio/index.ts`. Keep the inspector metadata-driven and render the actual canonical component implementation. Preview fixtures such as sample content or icons must not be described as component defaults or promoted to public API without an accepted source decision.

Lucide is the accepted icon source for Studio only. Keep `lucide-react` scoped to
`site/`, expose curated choices through validated Studio catalogue metadata, and do
not add Lucide names or dependencies to target-agnostic component contracts.

The neutral web adapter is generated by `npm run build:adapter:web`. Its manifest is target metadata generated from source facts; do not hand-edit it when source files should change instead. Run `npm run validate:adapter:web` after changing `components/css/index.css`, component CSS, shared JS, contract adapter metadata, or the web adapter build script.

Component-scoped tokens are allowed when a contract exposes them as public customization API or a reusable component-level design decision. The owner requires broad coverage of meaningful visual customization: do not leave author-facing spacing, border, type, surface or effect choices as unexplained CSS literals. Expose them through appropriate shared or component tokens, contracts and Studio controls, with Exhibit documentation derived from that same metadata. Structural CSS and semantic behavior remain separate; not every private variable is itself a public token. See ADR 0293.

## Distribution Work

Consumer-ready outputs should be generated from source and published through target-appropriate channels such as npm packages, registry items, Shopify theme zips, Figma import files, Swift packages, or Maven/Gradle artifacts. Do not treat docs build output such as `site/dist` as source.

## Shopify Work

The Shopify adapter should target Shopify's modern theme-block architecture. Do not derive sellable Theme Store-oriented code from Horizon; use Horizon as a reference/compatibility benchmark and prefer Shopify's Skeleton Theme direction for Theme Store-safe foundations.

Shopify loads `platforms/shopify/assets/tokens.css` before component CSS in both `theme.liquid` and `password.liquid`. Preserve that load order when editing layouts.

Shopify target-ready means target-native. Dedicated sections need Liquid plus `{% schema %}` settings, data mapping, editor behavior, and JS when required. Snippets need stable render parameters and Shopify data mapping. Embedded class contracts can be used inside Liquid without their own schema. Do not treat `config/settings_data.json` as source.

## Docs Site Work

The docs site is a React/Vite app in `site/`. `registry.json` drives component lists and detail pages. MDX pages under `site/src/content/components/` are auto-discovered by `site/src/content/index.ts`.

`site/src/components/ExhibitDocument.tsx` is the presentation wrapper for component
MDX. Preserve the five-section grouping and one-artwork rule from ADR 0038. Do not
delete secondary previews from MDX merely because Exhibit does not render them.

The accepted direction is for the docs site to become a first-party consumer of `platforms/web/index.css`. Preserve preview isolation and validate the generated web adapter before replacing the current source-CSS imports.

`npm run audit:components` generates the neutral web certification matrix. A passing automated gate is structural evidence only; never promote a contract to `stable` without the human review required by `docs/COMPONENT-CERTIFICATION.md`.

`ComponentPreview` renders examples in a shadow root and imports `site/src/styles/preview-bundle.css`. If preview classes fail validation, update source CSS or the MDX example rather than bypassing validation.

## When To Ask

Ask before:

- Changing the canonical token source format inside the repo.
- Introducing or removing a component-token layer.
- Creating a new platform target adapter.
- Changing the package publishing/versioning model.
- Rebuilding or committing generated artifacts such as `site/dist`.
- Changing the owner-facing product direction, aesthetic, or target platform priorities.
