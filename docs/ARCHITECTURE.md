# The Gallery Architecture

Current delivery scope (ADR 0303): **complete Web, then Shopify**. Figma is removed
from the plan, including artwork, feedback, synchronization and release gates.
References to its exports or pilot below are historical evidence only; other
platform ideas are outside the current delivery plan.

This document describes what the repository currently does. If it conflicts with source files, trust the source files and update this document.

For the target architecture, read `docs/NORTH-STAR.md`. For the current-to-target gap map, read `docs/CURRENT-TO-TARGET.md`.

For target adapter implementation rules, read `docs/adapters/README.md`. For Shopify, read `docs/adapters/shopify.md`.

## Target Architecture Summary

The Gallery is moving toward this layered model:

```text
repo source
  -> tokens + component contracts + registry
  -> compilers/transforms
  -> target adapters and generated outputs
  -> docs/gallery/CLI
  -> consumer-owned local code
```

The repo has two intended internal source languages:

- Tokens: the language of values.
- Component contracts: the language of target-agnostic component structure and behavior.

Current CSS, Liquid, JS, and docs files are implementation facts. Long term, they should align with explicit tokens and contracts rather than silently becoming the only architecture.

Accepted directions:

- Token source should move toward DTCG-style `$value`/`$type` tokens.
- Component contracts are the formal component source layer.
- Component-scoped tokens are allowed only when they are part of a public customization API or reusable component-level decision.
- Canonical docs are English first.
- Generated consumer outputs should be packaged or released from source; docs builds are not source.
- Shopify should target modern theme-block architecture without deriving sellable code from Horizon.

## Repository Layers

```text
tokens/source/           New DTCG-style token source direction
tokens/                  Legacy Style Dictionary token input
components/contracts/    Target-agnostic component contract source
components/css/           Target-agnostic CSS component source
components/js/            Shared progressive-enhancement JS
registry.json             Component manifest for CLI and docs
cli/                      Copy-and-own CLI
site/                     React/Vite documentation and gallery app
platforms/shopify/        Shopify target implementation
platforms/web/            Neutral web token and component adapter output
platforms/webflow/        Webflow target output/copies
platforms/framer/         Framer token output
docs/                     Human and agent documentation
```

## Token Flow

The repo is the source of truth for The Gallery tokens. Figma is a target. Root-level `*.tokens.json` files are earlier Figma export snapshots and are not canonical source files.

The first DTCG-style source structure now lives in `tokens/source/`:

```text
tokens/source/primitives
tokens/source/semantics
tokens/source/components
tokens/source/modes
```

This source generates the neutral web token output and the Shopify wrapper. Webflow and Framer still use legacy input. Source structure is validated with:

```sh
npm run validate:tokens:source
```

Modes are selected at compile time instead of loaded all together:

```text
primitives + semantics + components + theme.light + viewport.desktop
primitives + semantics + components + theme.dark + viewport.mobile
```

The first source compiler builds every theme/viewport matrix into an ignored migration sandbox:

```sh
npm run build:tokens:source
npm run validate:tokens:source-build
```

```text
tokens/source/build/css/*.css
tokens/source/build/json/*.resolved.json
tokens/source/build/manifest.json
```

These files are comparable outputs, not production target artifacts.

The migration map lives at `tokens/source/migration-map.json`. `npm run validate:tokens:source-build` uses it to ensure every unique legacy token path is accounted for and every mapped token matches the generated source output across all eight matrices.

The first real target generated from `tokens/source/` is the neutral web CSS target:

```text
platforms/web/tokens.css
```

Build and validate it with:

```sh
npm run build:tokens:web
npm run validate:tokens:web
npm run validate:tokens:web-components
```

The web target emits canonical source-derived `--tg-*` variables plus compatibility aliases for the current public component CSS API. The aliases cover names already used in `components/css/`, including `--color-*`, `--typo-*`, `--space-*`, `--radius-*`, `--shadow-*`, transition, easing, opacity, and z-index tokens. They are generated output policy, not canonical source.

ADR 0311 keeps one complete token/alias base per theme scope and emits only
expression changes in its 768px, 1024px and 1440px media queries. Theme scope,
source matrices and compatibility names remain unchanged. Compare authored
expressions rather than resolved values to preserve consumer customization;
`npm run validate:tokens:responsive` covers the delta-selection rules.

`npm run validate:tokens:web-components` scans `components/css/`, ignores component-private `--_` variables, and verifies that every public CSS custom property reference is defined in `platforms/web/tokens.css`.

Motion is now a first-class source family. Primitive timing and curves live in `tokens/source/primitives/motion.tokens.json`; semantic adapter-facing roles live in `tokens/source/semantics/motion.tokens.json`. The source exposes `motion.duration.*`, `motion.curve.*`, `motion.transition.*`, and `motion.opacity.*`; neutral web emits both canonical `--tg-motion-*` variables and public `--motion-*` aliases. Existing `--transition-*`, `--easing-*`, and opacity aliases remain compatibility output. See `docs/decisions/0033-motion-token-architecture.md`.

Shopify is now the first thin target wrapper over the neutral web token target:

```text
tokens/source/
  -> platforms/web/tokens.css
  -> scripts/build-shopify-tokens.js
  -> platforms/shopify/assets/tokens.css
```

Build and validate the Shopify wrapper with:

```sh
npm run build:tokens:shopify
npm run validate:tokens:shopify
```

Shopify layouts load `tokens.css` before component CSS. Webflow and Framer remain on the legacy token build until they receive wrappers or source-token outputs.

Shopify also has an explicit adapter build and manifest:

```text
registry.json
components/contracts/*.contract.json
components/css/*.css
components/js/theme.js
components/js/runtime-modules.json
platforms/shopify/**/*.liquid
platforms/shopify/templates/*.json
platforms/shopify/config/*.json
platforms/shopify/assets/tokens.css
  -> scripts/build-shopify-adapter.js
  -> platforms/shopify/assets/base.css
  -> platforms/shopify/assets/*.css
  -> platforms/shopify/assets/theme.js
  -> platforms/shopify/assets/runtime-loader.js
  -> platforms/shopify/assets/tg-runtime-*.js
  -> platforms/shopify/adapter.manifest.json
  -> platforms/shopify/adapter.summary.json
```

Build and validate it with:

```sh
npm run build:adapter:shopify
npm run validate:adapter:shopify
```

`platforms/shopify/assets/base.css` is generated from reset, foundations, and utilities CSS. It must not define token values; those come from `platforms/shopify/assets/tokens.css`. Shopify layouts load `runtime-loader.js`, which imports only behavior matched by rendered markup; `theme.js` remains an unreferenced compatibility aggregate.

Shopify adapter maturity is computed per component in `adapter.manifest.json` with `shopify-maturity-v1`. CSS is required for every component, dedicated Liquid is required only for components using a target adapter strategy, and embedded class contracts can be target-ready without their own Liquid root. Section adapters also track schema/settings, data mapping, template composition, and editor-preview readiness. See `docs/decisions/0030-shopify-adapter-maturity-model.md` and `docs/decisions/0032-shopify-maturity-v1-schema-data-editor.md`.

Shopify target-ready also requires target-native editor and platform integration when a component owns those surfaces. Dedicated sections need Liquid plus schema/settings, data mapping, and behavior where applicable; snippets need stable render APIs; global theme controls belong in `config/settings_schema.json`. See `docs/adapters/shopify.md`.

The retained Webflow/Framer token flow uses the legacy files:

```text
tokens/*_tokens.json
  -> config.js
  -> npm run build:tokens
  -> platforms/webflow/tokens.css
  -> platforms/framer/tokens.js
```

See `docs/decisions/0003-token-source-format.md` and `docs/decisions/0007-token-source-architecture.md`.

## Component Flow

The first component contract source layer now exists:

```text
components/contracts/contract.schema.json
components/contracts/accordion.contract.json
components/contracts/account-dashboard.contract.json
components/contracts/account-settings.contract.json
components/contracts/address-book.contract.json
components/contracts/address-form.contract.json
components/contracts/alert.contract.json
components/contracts/announcement-bar.contract.json
components/contracts/announcement-extended.contract.json
components/contracts/article-body.contract.json
components/contracts/article-card.contract.json
components/contracts/article-hero.contract.json
components/contracts/artist-card.contract.json
components/contracts/artist-index.contract.json
components/contracts/artist-profile.contract.json
components/contracts/artist-statement.contract.json
components/contracts/auth-forms.contract.json
components/contracts/author-card.contract.json
components/contracts/avatar.contract.json
components/contracts/back-in-stock.contract.json
components/contracts/badge.contract.json
components/contracts/before-after.contract.json
components/contracts/blog-sidebar.contract.json
components/contracts/bottom-nav.contract.json
components/contracts/brand-story.contract.json
components/contracts/breadcrumb.contract.json
components/contracts/button-group.contract.json
components/contracts/button.contract.json
components/contracts/card.contract.json
components/contracts/care-instructions.contract.json
components/contracts/carousel.contract.json
components/contracts/cart-drawer.contract.json
components/contracts/cart-empty.contract.json
components/contracts/cart-line-item.contract.json
components/contracts/cart-note.contract.json
components/contracts/cart-page.contract.json
components/contracts/cart-summary.contract.json
components/contracts/cart-upsell.contract.json
components/contracts/filter-bar.contract.json
components/contracts/ceramics-faq.contract.json
components/contracts/ceramics-glossary.contract.json
components/contracts/certificate.contract.json
components/contracts/checkbox.contract.json
components/contracts/checkout-progress.contract.json
components/contracts/close-button.contract.json
components/contracts/collage-section.contract.json
components/contracts/collection-grid.contract.json
components/contracts/collection-hero.contract.json
components/contracts/collection-promo.contract.json
components/contracts/collection-story.contract.json
components/contracts/color-picker.contract.json
components/contracts/combobox.contract.json
components/contracts/coming-soon.contract.json
components/contracts/command-palette.contract.json
components/contracts/comments.contract.json
components/contracts/commission-form.contract.json
components/contracts/comparison-table.contract.json
components/contracts/contact-section.contract.json
components/contracts/context-menu.contract.json
components/contracts/cookie-consent.contract.json
components/contracts/countdown.contract.json
components/contracts/data-list.contract.json
components/contracts/data-table.contract.json
components/contracts/date-picker.contract.json
components/contracts/dimensions.contract.json
components/contracts/discount-field.contract.json
components/contracts/divider.contract.json
components/contracts/drawer.contract.json
components/contracts/dropdown-menu.contract.json
components/contracts/edition-badge.contract.json
components/contracts/empty-collection.contract.json
components/contracts/empty-state.contract.json
components/contracts/exhibition-page.contract.json
components/contracts/fab.contract.json
components/contracts/faq-section.contract.json
components/contracts/featured-collection.contract.json
components/contracts/field-wrapper.contract.json
components/contracts/fieldset.contract.json
components/contracts/file-upload.contract.json
components/contracts/filter-panel.contract.json
components/contracts/firing-info.contract.json
components/contracts/footer.contract.json
components/contracts/form.contract.json
components/contracts/free-shipping-bar.contract.json
components/contracts/gallery-grid.contract.json
components/contracts/gift-card.contract.json
components/contracts/gift-wrap.contract.json
components/contracts/glaze-guide.contract.json
components/contracts/header.contract.json
components/contracts/hero-section.contract.json
components/contracts/hero.contract.json
components/contracts/icon-button.contract.json
components/contracts/image-text.contract.json
components/contracts/inline-error.contract.json
components/contracts/input.contract.json
components/contracts/instagram-feed.contract.json
components/contracts/lightbox.contract.json
components/contracts/link.contract.json
components/contracts/logo-bar.contract.json
components/contracts/lookbook.contract.json
components/contracts/makers-mark.contract.json
components/contracts/marquee.contract.json
components/contracts/masonry-gallery.contract.json
components/contracts/material-library.contract.json
components/contracts/mega-menu.contract.json
components/contracts/mobile-menu.contract.json
components/contracts/modal.contract.json
components/contracts/multicolumn.contract.json
components/contracts/newsletter.contract.json
components/contracts/number-input.contract.json
components/contracts/order-detail.contract.json
components/contracts/order-history.contract.json
components/contracts/page-404.contract.json
components/contracts/pagination.contract.json
components/contracts/password-input.contract.json
components/contracts/password-reset.contract.json
components/contracts/payment-icons.contract.json
components/contracts/photo-reviews.contract.json
components/contracts/pin-input.contract.json
components/contracts/policy-page.contract.json
components/contracts/popover.contract.json
components/contracts/popup.contract.json
components/contracts/price.contract.json
components/contracts/process-timeline.contract.json
components/contracts/product-card.contract.json
components/contracts/product-form.contract.json
components/contracts/product-gallery.contract.json
components/contracts/product-info.contract.json
components/contracts/product-slider.contract.json
components/contracts/progress.contract.json
components/contracts/quantity-selector.contract.json
components/contracts/quick-view.contract.json
components/contracts/radio.contract.json
components/contracts/rating.contract.json
components/contracts/reading-progress.contract.json
components/contracts/related-articles.contract.json
components/contracts/review.contract.json
components/contracts/review-form.contract.json
components/contracts/review-highlights.contract.json
components/contracts/review-pagination.contract.json
components/contracts/review-summary.contract.json
components/contracts/review-toolbar.contract.json
components/contracts/rich-text-section.contract.json
components/contracts/scroll-area.contract.json
components/contracts/search-overlay.contract.json
components/contracts/segmented-control.contract.json
components/contracts/select.contract.json
components/contracts/share-buttons.contract.json
components/contracts/shipping-info.contract.json
components/contracts/size-chart.contract.json
components/contracts/skeleton.contract.json
components/contracts/slider.contract.json
components/contracts/social-proof.contract.json
components/contracts/spinner.contract.json
components/contracts/star-input.contract.json
components/contracts/star-rating.contract.json
components/contracts/stat.contract.json
components/contracts/stats-section.contract.json
components/contracts/steps.contract.json
components/contracts/sticky-atc.contract.json
components/contracts/pickup-location-selector.contract.json
components/contracts/store-locator.contract.json
components/contracts/studio-tour.contract.json
components/contracts/subscription-option.contract.json
components/contracts/switch.contract.json
components/contracts/table-of-contents.contract.json
components/contracts/tabs.contract.json
components/contracts/tag.contract.json
components/contracts/tags-input.contract.json
components/contracts/technique-explainer.contract.json
components/contracts/testimonials.contract.json
components/contracts/textarea.contract.json
components/contracts/timeline-primitive.contract.json
components/contracts/toast.contract.json
components/contracts/toggle.contract.json
components/contracts/tooltip.contract.json
components/contracts/trust-badges.contract.json
components/contracts/urgency.contract.json
components/contracts/variant-selector.contract.json
components/contracts/video-section.contract.json
components/contracts/view-toggle.contract.json
components/contracts/wishlist.contract.json
components/contracts/workshop-listing.contract.json
```

Contracts define target-agnostic anatomy, variants, sizes, states, optional semantic properties and target mappings, optional behavior requirements, public tokens, dependencies, accessibility requirements, and adapter status. The current contract source has 182 validated contracts and covers every component in `registry.json`: 4 are human-approved `stable`, 174 remain `pilot`, and 4 are `deprecated`. Button established the first reviewed semantic-property implementation; the property surface remains optional for other pilot contracts until their evidence is reviewed. See ADR 0035.

The docs site reads contract files from `components/contracts/` and renders contract metadata on component pages that have a contract.

Studio presentation metadata is a separate site-owned layer:

```text
components/contracts/<slug>.contract.json
  -> site/src/content/studio/<slug>.studio.json
  -> site/src/lib/studio.ts
  -> site/src/components/studio/index.ts
  -> metadata-driven inspector + component-specific preview renderer
```

Studio definitions may group and label contract facts, choose control presentation,
and reference public tokens. They do not own property types, values, defaults,
target mappings, behavior, or token values. Button is the first validated Studio
definition and covers all ten of its reviewed semantic properties. Its renderer
uses the canonical `.btn` implementation. Inspector controls compose complete
shared Gallery renderers when a public control exists; for example, every
`segmented` metadata control uses the same `SegmentedControlArtwork`, native
fieldset/radio anatomy, and generated adapter CSS as the Segmented Control page.
Site styles may arrange those controls and apply the documented compact editor
density, but must not replace or omit their canonical semantic anatomy. The
common row owns the visible left-column label while the native legend remains
the accessible group name. Studio icon selectors use a validated site-only
Lucide projection while component slots remain library agnostic. See ADRs 0036,
0037, and 0282.

In the desktop Studio workspace, the preview stage aligns its content start with
the top of the Customize inspector while preserving horizontal centering. This
site-only composition rule does not change the shared renderer or Exhibit
fixture. Overlay and viewport fixtures may retain explicit internal positioning.
See ADR 0283.

Validate contracts with:

```sh
npm run validate:contracts
npm run validate:studio
```

The validator compares contracts against `registry.json`, canonical CSS, MDX docs, and public token definitions in `platforms/web/tokens.css`. When a contract declares semantic properties, it also validates property types, enum sources, defaults, target mappings, selectors, and public web classes.

The Studio validator checks every site-owned presentation definition against its
contract. It rejects unknown or duplicate property bindings, missing semantic
properties, non-public token references, empty token projections, and copied
metadata fields that are not part of the presentation schema.

The neutral web adapter is now the first explicit component adapter output:

```text
components/css/*.css
components/js/theme.js
components/js/runtime-modules.json
components/contracts/*.contract.json
registry.json
platforms/web/tokens.css
  -> scripts/build-web-adapter.js
  -> platforms/web/index.css
  -> platforms/web/components.css
  -> platforms/web/components/*.css
  -> platforms/web/theme.js
  -> platforms/web/runtime-loader.js
  -> platforms/web/runtime/{core,*.js}
  -> platforms/web/adapter.manifest.json
  -> platforms/web/adapter.summary.json
```

The canonical component CSS still lives in `components/css/`. In the current adapter policy, CSS is hand-authored and contracts validate/describe the adapter; contracts do not generate component CSS yet. Each manifest component now declares a dependency-closed install slice. `components.css` and `theme.js` remain complete compatibility bundles, while copied family CSS and the selective runtime are the primary copy-and-own delivery units described by ADR 0273.

The documentation site consumes `platforms/web/index.css` as its document-level
design-system entry. Shadow-root previews use the generated
`platforms/web/components.css` and inherit tokens from the document, preserving
preview isolation without duplicating the complete token matrix in every preview
bundle.

Component MDX is presented through the site-owned Exhibit wrapper in
`site/src/components/ExhibitDocument.tsx`. It groups canonical headings into
Overview, Presentation, Guidelines, Accessibility, and Specification, promotes the
first preview as fallback artwork, and omits secondary previews from Exhibit. When
a component has Studio metadata and a registered renderer, Exhibit and Studio mount
that same renderer and initial fixture; Exhibit removes only the inspector and
Studio page title. The MDX source remains unchanged and continues to drive audit
evidence. See ADRs 0038 and 0087.

Build and validate the neutral web adapter with:

```sh
npm run build:adapter:web
npm run validate:adapter:web
```

Copied platform assets for Shopify and Webflow still flow through:

```text
components/css/*.css
components/js/theme.js
  -> scripts/copy-components.js
  -> platforms/shopify/assets/*.css and theme.js
  -> platforms/webflow/*.css
```

Copied platform assets should usually be regenerated by `npm run build:components`.

Components are organized by broad category files such as `primitives.css`, `layout.css`, `forms.css`, `product.css`, `sections.css`, and `reviews.css`. `components/css/index.css` imports the full base library.

For components without contracts yet, use `registry.json`, CSS, and MDX docs as the implementation facts until their contracts are added.

## Registry And CLI

`registry.json` is the manifest for components, categories, dependencies, selectors, token usage, and targets.

`cli/index.js` implements:

- `init`
- `add`
- `add --all`
- `list`
- `diff`

The CLI reads the Web adapter manifest, resolves the transitive component graph,
copies the exact base/family CSS and runtime modules for that graph, writes a
local `runtime.js` module entry when behavior is needed, and copies the manifest
token CSS generated from `tokens/source/`. `tg.config.json` records the installed
graph; `tg.install.json` records per-file upstream hashes and source/package
provenance. Dry runs do not write. Local customizations are preserved, unresolved
conflicts stop the whole plan, and reviewed files can be kept explicitly by path.
See `docs/CLI.md` and ADR 0299.

## Documentation Site

The docs app lives in `site/`.

Important files:

- `site/src/App.tsx`: docs routes.
- `site/src/lib/registry.ts`: registry adapter.
- `site/src/lib/tokens.ts`: token flattening for token pages.
- `site/src/lib/studio.ts`: validated Studio presentation discovery.
- `site/src/content/index.ts`: MDX page discovery.
- `site/src/content/components/*.mdx`: component docs.
- `site/src/content/studio/*.studio.json`: site-owned Studio grouping and controls.
- `site/src/content/studio/studio.schema.json`: Studio presentation schema.
- `site/src/content/studio/catalogues/`: validated site-only icon projections.
- `site/src/components/studio/StudioInspector.tsx`: metadata-driven inspector.
- `site/src/components/studio/lucideCatalogue.ts`: bounded Lucide component map.
- `site/src/components/studio/index.ts`: component Studio renderer registry.
- `site/src/components/studio/ButtonStudio.tsx`: first component-specific preview renderer.
- `site/src/components/ComponentPreview.tsx`: isolated component previews.
- `site/src/styles/preview-bundle.css`: preview CSS bundle.

`npm run validate:docs` checks the registry, contracts, Studio metadata, MDX pages,
selectors, dependencies, and preview class references.

`npm run audit:components` generates a deterministic neutral web certification matrix under `docs/reports/`. It checks exact source and manifest alignment, including whether source component tokens reach public aliases consumed by contract and CSS, and records human-review flags, but it does not promote component status. See `docs/COMPONENT-CERTIFICATION.md` and ADR 0034.

## Shopify Target

Shopify lives in `platforms/shopify/`.

Use target-specific files for Shopify-only behavior:

- Liquid sections: `platforms/shopify/sections/`.
- Liquid snippets: `platforms/shopify/snippets/`.
- Layouts: `platforms/shopify/layout/`.
- Templates: `platforms/shopify/templates/`.
- Settings and locales: `platforms/shopify/config/`, `platforms/shopify/locales/`.

Prefer changing base CSS in `components/css/` and copying it into Shopify with `npm run build:components`. Edit Shopify assets directly only for files that are intentionally target-specific.

Shopify token CSS is generated from the neutral web target, not from the legacy Style Dictionary config. Do not edit `platforms/shopify/assets/tokens.css` directly; use `npm run build:tokens:shopify`.

Shopify adapter files under `platforms/shopify/assets/` are generated or copied from source by `npm run build:adapter:shopify`. Do not edit generated `base.css`, copied component CSS assets, or `adapter.*.json` directly.

## Known Mismatches To Handle Carefully

- Root-level `*.tokens.json` files are Figma export snapshots, while `tokens/*_tokens.json` files are the current build input. Do not treat root exports as source of truth.
- The legacy Style Dictionary build still reports token collisions because legacy theme and viewport files are loaded together. This is legacy behavior; the new source compiler avoids it by selecting one theme and one viewport per matrix.
- The legacy Webflow/Framer build also emits unitless legacy font-size values such as `16` as `16rem`, while Webflow spacing values remain unitless. Do not treat those target artifacts as production-ready until they migrate to source-token wrappers or source-native outputs.
- `context.md` describes a component token collection, while `docs/analysis-component-tokens.md` recommends removing a separate component-token file. Ask before changing token architecture.
- `docs/COMPONENTS.md` says 46 components in places, while `registry.json` currently describes a much larger system. Use `registry.json` for current manifest facts, and use `docs/COMPONENTS.md` for CSS contract patterns until it is refreshed.
- `site/dist` is tracked and currently subject to build churn. Avoid rebuilding it unless the task asks for generated docs output.
- `.gitignore` does not ignore `site/dist`; changing that is a project policy decision.

## Validation Matrix

Use the smallest useful verification:

```sh
npm run validate:docs          # registry, MDX, CSS selectors, dependencies
npm run audit:components       # neutral web certification evidence matrix
npm run validate:tokens:source # DTCG-style source token structure
npm run build:tokens:source    # builds ignored source-token comparison outputs
npm run build:tokens:web       # builds the neutral web token target
npm run validate:tokens:web-components # validates web target aliases against component CSS
npm run build:tokens:shopify   # builds Shopify token wrapper from neutral web target
npm run build:adapter:web      # builds neutral web component adapter outputs and manifest
npm run validate:adapter:web   # validates neutral web adapter output against registry/contracts/CSS
npm run build:adapter:shopify  # builds Shopify assets and adapter manifests
npm run validate:adapter:shopify # validates Shopify adapter assets, load order, manifests, and Liquid inventory
npm run validate:contracts     # validates component contracts against registry/CSS/docs/tokens
npm run build:tokens           # legacy Webflow/Framer token pipeline
npm run build:components       # copies canonical CSS/JS to targets
npm --prefix site run build    # docs app build; rewrites site/dist
```

If a verification command rewrites generated files, mention that in the final response.
