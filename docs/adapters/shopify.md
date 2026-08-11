# Shopify Adapter Guide

Shopify is a target adapter, not the source of truth. The repo owns tokens, component contracts, registry metadata, and adapter rules. Shopify files translate that source into a theme that merchants can use in the Shopify storefront and Theme Editor.

## Target-Ready Definition

A Shopify component is target-ready when it uses the Shopify platform correctly, not when CSS merely exists.

Depending on the component strategy, Shopify target-ready can require:

- Liquid markup.
- Section or block schema.
- `section.settings`, `block.settings`, or global `settings` mapping.
- Shopify objects such as `product`, `collection`, `cart`, `customer`, `routes`, `shop`, and `linklists`.
- JSON template or section-group composition.
- Theme Editor live-preview behavior.
- App block support where appropriate.
- Shared CSS classes and tokens.
- JavaScript behavior for progressive enhancement.
- Locales for merchant-facing labels.

CSS is necessary but not sufficient for Shopify sections, blocks, templates, and commerce components.

Back In Stock uses the provider-app boundary documented in
[`shopify-back-in-stock-app-block.md`](./shopify-back-in-stock-app-block.md).
The theme implements the canonical class/state projection and Main Product app
host; registration, inventory observation and delivery remain installed-app
responsibilities.

Pickup Location Selector and Store Locator use the separate source and
integration boundaries documented in
[`shopify-location-search.md`](./shopify-location-search.md). Native variant
pickup availability can inform D9, but it is not a general branch directory and
selection alone is never an inventory reservation.

## Shopify File Roles

| Path | Role | Source policy |
| --- | --- | --- |
| `layout/*.liquid` | Page shell, global asset loading, head/body scaffolding, section groups | Target source |
| `sections/*.liquid` | Merchant-editable sections with `{% schema %}` | Target source |
| `blocks/*.liquid` | Reusable merchant-editable theme blocks | Future target source |
| `snippets/*.liquid` | Reusable Liquid partials rendered by sections/templates | Target source |
| `templates/*.json` | Page composition of sections and default settings | Target source |
| `config/settings_schema.json` | Global Theme settings panel | Target source |
| `config/settings_data.json` | Saved merchant/theme-editor selections | Generated/runtime state, not canonical source |
| `locales/*.json` | Merchant-facing strings and translations | Target source |
| `assets/tokens.css` | Generated token wrapper from neutral web target | Generated output |
| `assets/base.css` | Generated reset/foundations/utilities bundle | Generated output |
| `assets/*.css` | Copied component CSS assets from `components/css/` | Generated/copied output |
| `assets/runtime-loader.js` | Detects rendered component roots and imports only matching behavior modules | Generated output; primary layout runtime |
| `assets/tg-runtime-*.js` | Shared core plus component-owned progressive-enhancement modules | Generated output from canonical runtime boundaries |
| `assets/theme.js` | Complete copied progressive-enhancement runtime | Generated/copied compatibility and diagnostic output; not loaded by layouts |
| `adapter.manifest.json` | Generated Shopify adapter inventory | Generated output |
| `adapter.summary.json` | Generated Shopify adapter summary for docs | Generated output |

## Strategy Types

### Embedded Class Contract

Use this when a component is a reusable class/anatomy contract and does not need a standalone Theme Editor panel.

Examples:

- `Button`
- `Badge`
- `Input`
- `Fieldset`
- `Card`

The Shopify implementation is usually plain Liquid markup inside another section or snippet:

```liquid
<a class="btn btn--secondary" href="{{ section.settings.cta_url }}">
  {{ section.settings.cta_text }}
</a>
```

No dedicated `sections/button.liquid` is required.

### Snippet Adapter

Use this when markup is reusable and data comes from a parent section/template, but merchants do not configure the snippet directly.

Examples:

- `snippets/product-card.liquid`
- `snippets/price.liquid`
- `snippets/product-form.liquid`
- `snippets/variant-selector.liquid`

Snippet requirements:

- Accept explicit parameters through `render`.
- Map Shopify data objects into contract anatomy.
- Avoid owning section-level settings.
- Preserve accessibility and contract class names.
- Be reusable across sections.

Example shape:

```liquid
{% render 'product-card',
  product: product,
  show_vendor: section.settings.show_vendor,
  image_ratio: section.settings.image_ratio
%}
```

Free Shipping Bar is intentionally a parameter-driven snippet adapter. Its
caller must pass the already selected qualifying amount, positive threshold,
complete localized message, accessible label, and optional localized value
text. The snippet must not choose between `cart.items_subtotal_price`,
`cart.total_price`, another target amount, or a merchant setting, and it is not
automatically composed into Main Cart until that commercial policy, placement,
refresh lifecycle, and editor behavior are explicitly accepted.

### Section Adapter

Use this when the component should appear as an editable section in the Theme Editor.

Examples:

- `Header`
- `Hero`
- `Featured Collection`
- `Image with Text`
- `Main Product`
- `Cart Page`
- `Newsletter`

Section requirements:

- Live in `sections/*.liquid`.
- Include exactly one valid `{% schema %}` block.
- Define merchant-facing settings that match the contract customization surface.
- Use `section.settings` to map setting values into Liquid markup, CSS variables, classes, and snippets.
- Include `presets` when merchants should be able to add the section from the Theme Editor.
- Use `blocks` or future theme blocks when merchants need repeatable/reorderable child content.
- Keep schema labels localizable where needed.

### Theme Block Adapter

Use this when Shopify's modern block system is a better fit than a section-only API.

Theme blocks live in `blocks/*.liquid`, have their own settings, and are visible to merchants in the editor. They are different from snippets: snippets accept variables from parent code and do not appear in the Theme Editor.

Use theme blocks for reusable merchant-editable content units, nested content systems, and layouts that should let merchants add, remove, reorder, or configure child pieces across multiple sections.

### Template Adapter

Use JSON templates to compose sections into Shopify page types.

Examples:

- `templates/product.json`
- `templates/collection.json`
- `templates/cart.json`
- `templates/index.json`

Template requirements:

- Reference section files by type.
- Provide default section settings where useful.
- Avoid treating merchant-edited template JSON as the only source for reusable defaults.

### Global Settings Adapter

Use `config/settings_schema.json` for theme-wide settings, such as logo, colors, typography, favicon, layout defaults, and global social links.

Use global settings when:

- The value affects many sections.
- The value should be reused from layout, snippets, and sections.
- The setting belongs to the theme identity rather than one component instance.

Do not use `settings_data.json` as source. It stores saved selections from the Theme Editor.

## Contract-To-Shopify Mapping

| Contract field | Shopify mapping |
| --- | --- |
| Anatomy | Liquid markup, snippets, root classes, child classes |
| Slots | Blocks, snippets, child renders, rich text settings |
| Variants | Schema `select`, `radio`, `checkbox`, class modifiers |
| Sizes | Schema options, class modifiers, CSS variables |
| States | ARIA attributes, data attributes, Shopify object conditions, JS state |
| Behavior | Shared JS, custom elements, theme editor events, form submissions |
| Tokens | `tokens.css`, CSS vars, color schemes, theme settings |
| Dependencies | `render` snippets, CSS load order, JS modules |
| Accessibility | Native elements, labels, roles, focus, keyboard, live regions |
| Docs | Usage guidance, editor settings, target limitations |

## Featured Collection Example

The screenshot-like `Featured collection` panel is a Section Adapter, not just CSS.

ADR 0146 applies the permanent configurability test to the actual S2 adapter.
The accepted implementation exposes only `collection`, `title`, `variant`,
`product_count`, and `show_view_all`; its view-all destination is derived from
the selected collection. Columns, mobile columns, arbitrary gaps, width,
alignment, color scheme, and section padding remain private/token composition
until a separate reviewed contract establishes them as stable merchant choices.

The earlier capability inventory below remains a target exploration reference,
not the current S2 public contract:

```text
sections/featured-collection.liquid
  -> schema settings:
     collection
     type
     carousel_on_mobile
     product_count
     columns
     mobile_columns
     horizontal_gap
     vertical_gap
     width
     alignment
     color_scheme
     padding_top
     padding_bottom
  -> Liquid:
     assign selected collection from section.settings.collection
     loop through collection.products limited by product_count
     render snippets/product-card.liquid for each product
  -> CSS:
     use contract classes plus CSS variables for gaps and padding
  -> JS:
     enable mobile carousel only when the setting is active
```

Example section skeleton:

```liquid
{%- assign featured_collection = section.settings.collection -%}
{%- assign product_limit = section.settings.product_count | default: 4 -%}

<section
  class="featured-collection featured-collection--{{ section.settings.type }}"
  style="
    --featured-collection-columns: {{ section.settings.columns }};
    --featured-collection-mobile-columns: {{ section.settings.mobile_columns }};
    --featured-collection-row-gap: {{ section.settings.vertical_gap }}px;
    --featured-collection-column-gap: {{ section.settings.horizontal_gap }}px;
    --section-padding-top: {{ section.settings.padding_top }}px;
    --section-padding-bottom: {{ section.settings.padding_bottom }}px;
  "
>
  {%- for product in featured_collection.products limit: product_limit -%}
    {% render 'product-card', product: product %}
  {%- endfor -%}
</section>

{% schema %}
{
  "name": "Featured collection",
  "settings": [
    { "type": "collection", "id": "collection", "label": "Collection" },
    {
      "type": "select",
      "id": "type",
      "label": "Type",
      "options": [
        { "value": "grid", "label": "Grid" },
        { "value": "carousel", "label": "Carousel" }
      ],
      "default": "grid"
    },
    { "type": "checkbox", "id": "carousel_on_mobile", "label": "Carousel on mobile", "default": false },
    { "type": "range", "id": "product_count", "label": "Product count", "min": 2, "max": 12, "step": 1, "default": 4 }
  ],
  "presets": [{ "name": "Featured collection" }]
}
{% endschema %}
```

## Image with Text Example

ADR 0147 defines S3 as a complete passive Section Adapter. Shopify exposes
merchant image selection, explicit decorative classification and alternative,
eyebrow, required heading/rich text, a complete optional button pair, and the
five accepted presentation choices. The adapter uses `image_url` plus
`image_tag` so responsive sources, intrinsic dimensions, native alt output and
merchant focal points remain Shopify-owned.

Crop ratio, content measure, split threshold, arbitrary alignment, per-instance
padding, Overlay opacity, custom CSS, media height, and heading typography stay
private/token composition. Missing image, valid image semantics, heading, or
body omits the section; a partial button label/destination pair omits only the
action. The current implementation is:

```text
sections/image-text.liquid
  -> image picker plus decorative/alternative semantics
  -> required heading and rich-text narrative
  -> optional complete Button-composed destination
  -> default, reversed, stacked, overlay, or offset class mapping
  -> responsive image widths/sizes with native focal-point handling
  -> zero section JavaScript
```

The schema is what creates the Theme Editor panel. Liquid maps those settings to storefront output. CSS and JS only implement the visual and behavioral result.

## Comparison Table Boundary

ADRs 0155 and 0272 define S13 as a contextual profile of canonical Data Table
with passive or controlled selectable alternatives. The complete finite
caption/header/row/cell matrix remains one target-owned `table` composition;
selectable mode progressively composes canonical Radio or Checkbox controls in
alternative headers, while ordinary cells remain passive.

Owner decision 66 selects a metaobject-backed variable finite matrix for the
dedicated Shopify profile. This replaces the earlier bounded two-alternative
recommendation. The architecture, validation rules, interaction boundary, and
delivery-profile split are documented in
[Shopify Comparison Table Metaobjects](./shopify-comparison-table-metaobjects.md).

`comparison-table` remains `planned` and CSS-ready until the adapter declares
exact numeric alternative/criterion/cell bounds and implements Liquid,
schema/data, editor validation, localization, selection persistence, CTA
lifecycle, accessibility, responsive, and performance evidence. Do not use
Shopify's platform maximum as the product budget, flatten the matrix into the
neutral contract, or claim that a custom/app metaobject definition is valid for
a Theme Store-listed theme.

## Size Chart Custom Data

D7 uses an accepted merchant-owned Product reference rather than theme-block
row settings or runtime conversion. The complete definition, authoring, and
Liquid retrieval contract is documented in
[Shopify Size Chart Custom Data](./shopify-size-chart-custom-data.md). The
adapter supports one required and one optional complete three-column table,
twenty rows per presentation, localized display strings, canonical Modal/Data
Table/Segmented Control composition, and no conversion engine.

## Shipping Info Section

ADR 0156 maps S14's one required item-composition slot to a dedicated
merchant-editable section without creating a neutral item schema or icon
catalogue. Each reorderable block exposes a required visible label, optional
supporting text, and optional decorative image. Liquid omits label-less blocks
and the complete list when no valid item remains, adds
`block.shopify_attributes`, and renders native `ul`/`li` semantics.

The image is deliberately decorative because the adjacent visible text must
carry the complete service or policy claim. The adapter does not extend the
shared `icon.liquid` inventory, expose Studio-only Lucide names, create image
alternative settings, or ship default fulfillment/insurance guarantees. It
adds no section JavaScript, live shipping data, calculator, estimate, tracking,
policy refresh, or click-through behavior.

```text
sections/shipping-info.liquid
  -> reorderable service-fact blocks
  -> required label plus optional supporting text
  -> optional responsive decorative image
  -> native list semantics and strict omission
  -> localized schema and editor attributes
  -> zero component JavaScript
```

## Auth Forms Account Boundary

ADR 0184 keeps U1 as a neutral authentication-entry composition and does not
pretend that one Liquid form represents every Shopify customer-account mode.
For the latest customer accounts, Shopify owns the account component and hosted
authentication surface. Classic accounts still have documented
`customer_login`, `create_customer`, and `recover_customer_password` Liquid
forms, but that is a distinct compatibility profile.

Before U1 can become target-ready, the adapter must explicitly select one of:

1. Shopify-managed latest customer accounts, with the theme-owned account
   component/navigation and no local credential form;
2. classic-account Liquid templates using Shopify form tags, native form errors,
   purposeful autocomplete, and complete template composition;
3. a version-aware strategy that keeps those surfaces separate; or
4. omission of a theme-owned U1 surface.

Copied `account.css` is only CSS readiness. Do not hand-code login endpoints,
emit classic forms as a default for managed accounts, add provider/session logic
to shared `theme.js`, or mark U1 ready until the selected account architecture is
implemented and validated.

## Account Dashboard Boundary

ADR 0186 keeps U3 as a passive account-navigation shell and does not equate its
neutral Card/Link composition with one universal Shopify customer-account
template. Current Shopify-managed accounts expose the theme-owned
`<shopify-account>` component and hosted account pages; customer-account UI
extensions and headless Customer Account API implementations are separate
integration surfaces. Deprecated-account Liquid compatibility is another
explicit profile rather than the default.

Before U3 can become target-ready, the adapter must explicitly select one of:

1. the Shopify-managed account sheet and hosted pages, using editor-configured
   menu links instead of cloning U3 in Liquid;
2. a customer-account UI extension that maps U3's navigation intent into an
   extension surface;
3. a headless implementation backed by the Customer Account API;
4. an explicitly versioned deprecated-account compatibility profile using
   Shopify route objects and localized copy; or
5. omission of a Shopify-owned U3 surface.

Copied `account.css` proves only source parity. It does not provide customer
data, authorization, route availability, sign-out behavior, privacy policy,
loading/error/expired state, editor composition, or target-native evidence.
Do not add a speculative Liquid dashboard or mark U3 target-ready until the
owner selects and validates one profile.

## Order History Boundary

ADR 0187 keeps U4 as a passive native order-summary list and does not define a
universal Shopify order-status taxonomy or customer-account implementation.
Current customer accounts provide a Shopify-hosted Order index and extension
targets independently of themes. Headless implementations use Customer Account
API data. Deprecated Liquid compatibility can read paginated `customer.orders`,
order destinations, and localized financial/fulfillment labels, but it is a
separate explicitly selected profile.

Before U4 can become target-ready, the adapter must explicitly select one of:

1. the Shopify-hosted latest-account Order index, with any app behavior added
   through supported customer-account extension targets rather than cloned
   theme markup;
2. a headless implementation backed by authenticated Customer Account API data
   and real supported order destinations;
3. an explicitly versioned deprecated-account compatibility profile using
   paginated `customer.orders`, order URLs, localized target labels, canonical
   Link/Badge composition, and complete account-template evidence; or
4. omission of a Shopify-owned U4 surface.

Copied `account.css` proves only CSS projection. It does not provide secure
order data, authentication/authorization, query/pagination, financial versus
fulfillment truth, status wording or Badge mapping, date/currency formatting,
routes, loading/empty/error/expired behavior, live updates, announcements,
focus, editor composition, or target-native evidence. Do not add a speculative
customer-account Liquid list or mark U4 target-ready until the owner selects and
validates one profile.

## Order Detail Boundary

ADR 0188 keeps U5 as a passive title-labelled composition of target metadata,
canonical Steps, and read-only canonical Cart Line Item. It does not define one
universal tracking-stage inventory or collapse financial, fulfillment,
shipping, pickup, return, refund, and cancellation truth into a synthetic
state.

Current Shopify accounts already provide a hosted Order status page with
authentication/redaction states, line items, fulfillment progress, customer and
payment information, actions, and supported extension targets. Headless
Customer Account API views and deprecated `customers/order` Liquid
compatibility are separate profiles.

Before U5 can become target-ready, the adapter must explicitly select one of:

1. the Shopify-hosted latest-account Order status page, with app content added
   through supported customer-account extension targets instead of cloned theme
   markup;
2. a headless implementation backed by authenticated Customer Account API/order
   data with an explicit disclosure and redaction policy;
3. an explicitly versioned deprecated-account compatibility profile using
   Liquid order fields, localized financial/fulfillment labels, line items,
   money filters, and complete account-template evidence; or
4. omission of a Shopify-owned U5 surface.

Copied `account.css` proves only CSS projection. It does not provide secure
order data, authentication/authorization, redaction, stage mapping, carrier
updates, dates/currency/taxes/refunds, routes, loading/error/not-found/expired
behavior, live updates, announcements, focus, privacy, editor composition, or
target-native evidence. Do not add speculative `customers/order` Liquid or mark
U5 target-ready until the owner selects and validates one profile.

## Address Book Boundary

ADR 0189 keeps U6 as a passive native saved-address collection with canonical
Badge and Button or Link leaves. It does not define a universal postal schema,
action inventory, default mutation policy, delete confirmation, user-error
recovery, or authenticated account lifecycle.

Latest Shopify customer accounts already host Profile Addresses. The current
`customer-account.profile.addresses.render-after` extension target is
supplementary content after that hosted section, not a replacement list, and it
does not render for B2B customers. Authenticated headless Customer Account API
address mutations and deprecated-account Liquid compatibility are separate
profiles.

Before U6 can become target-ready, the adapter must explicitly select one of:

1. Shopify-hosted latest-account Profile Addresses, with supported extension
   content kept supplementary and an explicit B2B strategy;
2. a headless implementation backed by authenticated Customer Account API
   address data and explicit create, update, delete, default, user-error, and
   protected-data handling;
3. an explicitly versioned deprecated-account compatibility profile using
   customer-address Liquid data/forms, localized labels, canonical Badge/Button
   composition, and complete account-template evidence; or
4. omission of a Shopify-owned U6 surface.

Copied `account.css` proves only CSS projection. It does not provide secure
address data, authentication/authorization, protected-data approval, locale
formatting, default truth, action permissions, routing, mutation pending/error
state, destructive confirmation/recovery, focus restoration, announcements,
B2B behavior, privacy, editor composition, or target-native evidence. Do not
add speculative customer-address Liquid or mark U6 target-ready until the owner
selects and validates one profile.

## Address Form Boundary

ADR 0190 keeps U7 as a native form/layout shell around canonical Input, Select,
and Button controls. It does not define a universal customer-address schema,
locale field order, requiredness, validation service, create-versus-edit mode,
cancellation policy, mutation lifecycle, or authentication boundary. Whether
it formally depends on canonical Form remains explicitly unresolved.

Current authenticated Customer API address mutations accept a target-specific
input model and return field-addressable user errors. Hosted latest customer
accounts, headless Customer API views, and deprecated customer-address Liquid
forms (`{% form 'customer_address', customer.new_address %}` or an existing
`address`) are separate profiles, not interchangeable implementations.

Before U7 can become target-ready, the adapter must explicitly select one of:

1. Shopify-hosted latest-account address creation/editing, extended only at
   supported targets rather than cloned as theme markup;
2. a headless implementation backed by authenticated Customer API create/update
   mutations with explicit field mapping, user-error association, pending,
   authentication-expiry, focus, cancellation, and success behavior;
3. an explicitly versioned deprecated-account compatibility profile using the
   official customer-address form tag, target fields, localized labels, error
   rendering, canonical controls, and complete account-template evidence; or
4. omission of a Shopify-owned U7 surface.

Copied `account.css` proves only layout projection. It does not provide a
successful form action, secure account context, field inventory, locale order,
country/zone dependencies, target names and values, validation/user-error
mapping, pending/disabled behavior, cancellation, routing, focus, feedback,
privacy, editor composition, or target-native evidence. Do not add speculative
customer-address Liquid or mark U7 target-ready until the owner selects and
validates one profile.

## Wishlist Boundary

ADR 0191 keeps U8 as a heading-labelled, target-controlled native saved-product
list composed from canonical Product Card, Price, Button, and optional Empty
State. It does not define product queries, saved IDs, account/guest identity,
storage, merge, limits, ordering, optimistic mutation, focus recovery,
announcements, privacy, or analytics. The saved-page fixture uses a contextual
Remove command with no pressed state; a reusable Product Card Save toggle
remains a separate unresolved canonical-owner decision.

Current Shopify documentation explicitly presents Wishlist as a
`customer-account.page.render` full-page customer-account UI extension. Its
example queries products, renders loading and empty branches, navigates through
product links, and performs asynchronous Remove commands. That extension/app
surface is not theme Liquid and cannot be represented by copied `account.css`
or a speculative customer metafield loop.

Before U8 can become target-ready, the target portfolio must explicitly select
and implement one of:

1. a current full-page customer-account UI extension with Storefront API or
   app-owned data, explicit metafield/service definitions and permissions,
   protected-customer-data handling, loading/empty/error branches, removal,
   focus, announcements, navigation, and merchant installation evidence;
2. a headless/Hydrogen or app-backed implementation with an authenticated or
   guest persistence service, product freshness, merge, consent, retention,
   mutation recovery, and canonical presentation mapping;
3. an explicit storefront theme-app/app-block or local-device profile with a
   documented guest/account boundary, storage/privacy/expiry policy, target
   JavaScript lifecycle, and synchronization evidence;
4. an explicitly versioned compatibility profile whose customer data and
   routes are actually supported; or
5. omission of a Shopify-owned U8 surface.

Copied `account.css` proves only CSS projection. It does not provide a Wishlist
route, account authorization, product query, app scopes, metafield definition,
saved data, local storage, guest/sign-in merge, count formatting, product
freshness, pending/error/undo state, empty/loading/error composition, focus,
announcements, privacy, consent, editor installation, telemetry, or target-native
evidence. Do not add universal Wishlist Liquid or mark U8 ready until the owner
selects and validates one profile.

## Account Settings Boundary

ADR 0192 keeps U9 as a passive container of heading-labelled account-preference
sections. It does not define a customer schema, global or section Form boundary,
immediate versus deferred setting semantics, profile mutation, password flow,
notification service, consent ledger, authentication, dirty state, validation,
request lifecycle, focus, announcements, or analytics.

Current customer accounts already provide hosted Profile capabilities and
supported Profile/full-page extension targets. Polaris customer-account Switch
is explicitly immediate; deferred choices belong in a Form with an appropriate
deferred control. Authenticated Customer Account API profile updates, separate
marketing-consent mutations, headless services, and compatibility Liquid are
different target profiles rather than one universal `account-settings` form.

Before U9 can become target-ready, the adapter must explicitly select and
implement one of:

1. a current Profile or full-page customer-account extension with Polaris Web
   Components, explicit global/per-section/immediate boundaries, authenticated
   API access, protected-data approval, user errors, consent, pending, focus,
   announcements, B2B behavior, and installation evidence;
2. a headless/Hydrogen implementation with a real customer schema,
   authentication/authorization, Form and Switch mapping, mutation and consent
   services, dirty state, failure recovery, and target-native evidence;
3. an explicitly versioned compatibility profile using only supported customer
   forms/routes and documented limitations; or
4. omission of a Shopify-owned U9 surface in favor of hosted account settings.

Copied `account.css` proves only passive layout projection. It does not provide
writable customer data, scopes, consent truth, target Forms, mutation handlers,
errors, persistence, pending state, protected-data policy, account routes,
focus, status, editor installation, or B2B support. Do not add a speculative
global customer Liquid form or mark U9 ready until the owner selects and
validates one profile.

## Article Card Adapter

ADR 0193 maps L1 to `snippets/article-card.liquid` as a target-native passive
article summary. The owning blog section, block, template, or headless route
queries and passes the Shopify `article`; the snippet does not query a blog,
select a collection, or create a Theme Editor surface by itself.

The mapping is explicit:

| Article Card contract | Shopify source |
| --- | --- |
| `title` and `href` | `article.title` and `article.url`, rendered once as the contextual heading Link |
| `media` and `imageAlt` | optional `article.image` responsive `image_tag` and its stored alt text |
| `category` | optional passive `blog_label` supplied by the owning composition |
| `metadata` | optional localized `article.published_at` with machine-readable date |
| `excerpt` | optional complete `article.excerpt` after markup removal and escaping |
| `author` | optional passive `article.author` name |
| `variant` | validated `standard`, `featured`, `minimal`, `horizontal`, or `editorial` modifier |
| contextual heading | validated `heading_level` from 2 through 6 |

`show_image`, `show_date`, `show_excerpt`, and `show_author` are explicit
snippet parameters. `image_loading` accepts only the default `lazy` or an
explicit `eager` request from the owning high-priority placement. The adapter
does not infer category from tags or URLs, calculate reading duration, truncate
title/excerpt, duplicate navigation on media, forward whole-card clicks, load
JavaScript, submit data, or emit analytics.

Article Card CSS and Liquid readiness therefore prove native rendering and data
mapping only. The eventual blog owner still owns article queries, pagination,
locale/content policy, canonical URLs, blog-label choice, image selection/crop,
author/category destinations, empty/error loading surfaces, Theme Editor
schema, app scopes for headless Storefront API use, tracking, and template
composition.

## Article Hero Adapter

ADR 0194 maps L2 to `snippets/article-hero.liquid` as a target-native passive
article introduction. The owning article section/template or headless route
passes the Shopify `article`; the snippet does not query a blog, render the
article body, create Theme Editor schema, or own the surrounding `article`.

The mapping is explicit:

| Article Hero contract | Shopify source |
| --- | --- |
| `title` | required `article.title`, rendered once in the validated contextual heading |
| `backgroundMedia` / `splitMedia` | optional `article.image` responsive `image_tag`, selected by the validated variant |
| media alternative | stored `article.image.alt`, explicit `image_alt`, or empty only after explicit `image_is_decorative` |
| `category` | optional passive `blog_label` supplied by the owning composition |
| `metadata` | optional `article.author` and localized `article.published_at` with machine-readable date |
| `variant` | validated `full`, `split`, or `text-only` modifier |
| contextual heading | validated `heading_level` from 1 through 6, defaulting to the normal article-page H1 |
| missing selected media | derived private `.article-hero--without-media` readable fallback |

`show_image`, `show_date`, and `show_author` are explicit parameters.
`image_loading` accepts the default `lazy` or an explicit `eager` placement;
`image_sizes` stays target-owned and defaults conservatively to `100vw`. The
adapter does not calculate reading duration, infer taxonomy from tags/URLs,
link category/author, add navigation, emit article JSON-LD/SEO, load JavaScript,
submit data, or emit analytics.

Article Hero CSS and Liquid readiness therefore prove native rendering, safe
media omission, and data mapping only. The eventual article owner still owns
query/template/section/schema, locale and metadata order, blog label, heading
rank, image crop/focal point/priority/sizes, whether full requires media,
author/category destinations, article body, SEO/structured data, tracking,
empty/error states, editor UX, and contrast approval for real imagery.

## Article Body Adapter

ADR 0195 maps L3 to `snippets/article-body.liquid` as a passive reusable rich-
content projection. The owning article section/template or headless route may
pass trusted `content`; otherwise the snippet uses native `article.content`.
It renders the same `.article-body.prose` root and optional
`.article-body--drop-cap` class as Neutral Web, and omits the complete root when
stripped content is empty.

The snippet deliberately does not parse, sanitize, rewrite, truncate, query,
calculate reading time, infer headings, inject product Liquid into stored rich
text, add code highlighting, load JavaScript, own the surrounding article, emit
SEO/JSON-LD, or create a Theme Editor surface. Shopify or the selected headless
stack remains responsible for trusted-content policy, authored semantics,
image delivery, links, localization, code/table wrappers, custom blocks,
canonical commerce composition, publication lifecycle, and editor behavior.

Article Body CSS and Liquid readiness therefore prove passive root mapping and
empty-content omission only. Stability remains blocked by duplicate
Foundations/Blog `.prose` ownership, the unregistered mini product embed, actual
full-bleed ownership, final visual approval, and installation evidence in the
first article owner.

## Table Of Contents Adapter Boundary

ADR 0270 completes ADR 0196 with the owner-accepted API. L5 is a named native
same-document navigation whose target-supplied ordered nested heading records
become canonical Links. Every record has a stable unique `id`, a localized
`label`, and optional `children`; its text, order, hierarchy and fragment must
match the article headings.

`placement: sticky | flow` defaults to `sticky` but keeps identical content and
degrades to flow whenever the target cannot prove its real header/safe-area
offset, available height, collision bounds, zoom behavior, long-list
reachability, and focus-not-obscured behavior. Optional target-controlled
`currentSectionId` maps one matching Link to `aria-current="location"`; blank or
unmatched state marks none.

Shopify Article provides formatted article content but no Liquid heading-index,
nested-order or unique-fragment relationship. The adapter therefore remains
planned rather than treating copied Blog CSS as target readiness. The accepted
boundary allows L5 only when an article owner can validate one of these sources:

1. structured merchant/editor data whose items and ids are authored together;
2. trusted build/preprocessing that emits headings, ids and the index atomically;
3. verified preprocessing owned by the selected headless/build target that emits
   the article headings and Table of Contents records together.

Do not map L5 to an arbitrary Shopify navigation menu, parse `article.content`
inside Liquid or neutral JavaScript, invent heading ids independently from
stored HTML, or add a second scroll observer. The selected target also owns
localization, omission for short/unstructured/infinite content, sticky column
placement, section scroll margins, hash and focus policy, Theme Editor refresh,
and integration with the same bounded reading-state service used by Reading
Progress when automatic current tracking is present.

Until one article source or verified preprocessing pipeline supplies the records
and matching ids, Shopify status remains `planned` / `css-ready`, not
target-ready. That is an explicit source-availability gate rather than an open
neutral-component architecture decision.

## Author Card Adapter

ADR 0197 maps L6 to `snippets/author-card.liquid` as one passive singular author
identity. The owning article composition passes a Shopify `article`; an explicit
`author_user` may override `article.user`. The required visible name uses the
selected user's name and falls back to `article.author` only when necessary.
Blank name omits the complete root.

The mapping is explicit:

| Author Card contract | Shopify source |
| --- | --- |
| `name` | required selected `user.name`, then `article.author` fallback |
| `avatar` | optional selected `user.image` inside canonical Avatar; no generated initials |
| `role` | optional localized target parameter because Shopify author objects expose no stable role |
| `bio` | optional stripped selected `user.bio`, full presentation only |
| `links` | explicit homepage/email opt-ins, full presentation only, canonical Link and `rel="author"` |
| `variant` | validated `full` or `compact`; compact omits biography and Links from output |

`show_image` and `show_bio` default on when native data exists. `show_homepage`
and `show_email` default off: each destination also requires a non-empty explicit
localized visible label before it renders. Social destinations are not inferred
from Shopify author records and may appear only through an explicitly supplied,
approved target extension. The target owns whether any destination is public and
appropriate in this placement. `image_alt` is explicit and empty by default
because the visible name normally makes the adjacent portrait redundant;
`image_loading` remains lazy unless a prioritized placement chooses eager.

The snippet does not derive initials, fetch a profile, infer a role/provider,
create social destinations, group multiple authors, add a heading/landmark,
choose article header/footer/aside/address placement, expose editor schema, emit
SEO/JSON-LD, track navigation, or load JavaScript. Its target readiness proves
native passive data mapping and privacy-safe defaults only. Multiple authors are
composed by the host as repeated canonical Author Cards. First consumer, Theme
Editor composition, headless `ArticleAuthor` mapping, concrete contact approval,
role/social extension data, contextual semantics, localization and final visual
approval remain target work.

## Blog Sidebar Adapter

ADR 0198 and owner decision 51 map L8 to
`snippets/blog-sidebar.liquid` as one passive named complementary region. The
host must provide an explicit `blog`, localized region label, contextual
`heading_tag`, and localized headings. The initial target profile contains only
Recent Articles and Topics; Search and Newsletter remain separate compositions
with their own complete lifecycles.

The mapping is explicit:

| Blog Sidebar profile | Shopify source |
| --- | --- |
| Recent Articles | ordered `blog.articles`; optional `current_article` is excluded |
| Topics | `blog.all_tags`, which includes tags outside the current pagination view |
| Topic URL | `blog.url` plus `/tagged/[handle]`, Shopify's documented article-tag route |
| headings | required target-localized text using a validated host-supplied `h1`-`h6` rank |
| order/limits | target snippet parameters; not neutral L8 properties |

`show_recent_articles` and `show_topics` default on only when the corresponding
source and localized heading are available. `recent_limit` is bounded to 1-12,
`topics_limit` to 1-24, and `module_order` accepts `recent-first` or
`topics-first`. Missing Blog, region label, valid heading rank, or all truthful
module content omits the complete root.

Canonical Topics use `.blog-sidebar__topics`, `.blog-sidebar__topic`, and
`.blog-sidebar__topic-link`. `.tag-cloud*` classes remain on the same native list
elements only as temporary migration aliases; they do not compose Tag and must
be removed before the public v1 contract freezes.

The snippet owns no search query, result announcement, newsletter submission,
pagination, sticky placement, responsive hiding, JavaScript, section schema or
first template placement. A section/template may render it only when the
content is genuinely complementary and must own localization, page hierarchy,
editor exposure, placement and current-route policy.

## Related Articles Adapter

ADR 0199 and owner decision 52 map L10 to
`sections/related-articles.liquid`. Shopify's native `article_list` setting is
limited to three published articles and preserves the merchant's explicit
curator order. The section defensively removes the current article and duplicate
ids, renders only the first three remaining records, and omits the complete
named section when its localized heading or valid curated collection is empty.
It never derives a fallback from tags, blog order, `next_article`,
`previous_article`, search, personalization or a recommendation service.

Each valid `li.related-articles__item` composes the canonical
`snippets/article-card.liquid`. Heading rank and canonical child-card
presentation settings are target composition controls; they do not expand the
neutral L10 API beyond `title` and `articles`. The section is enabled only for
article templates and owns no JavaScript, loading shell, ranking, analytics,
live region or Previous/Next behavior.

The owning article JSON/template must place the section after primary article
content and before Comments. Author Card and Share Actions may appear around
that boundary. Both Related Articles and Comments are addable article-only
sections; the Gallery does not fabricate an article template merely to force a
merchant composition. First installation and final visual approval remain
explicit target/human review gates.

## Comments Adapter

ADR 0200 and owner decision 53 map L11 to
`sections/comments.liquid`. The addable section is enabled only for article
templates and omits itself when Shopify comments are unavailable. It reads
Shopify's authoritative published `article.comments` and `comments_count`,
preserves the platform record order, renders one native comment article per
record and displays a submitted pending record only when Shopify exposes that
target state.

Resolved zero published records compose the canonical `empty-state` snippet.
Long discussions reuse the shared canonical `pagination` snippet with a comment
fragment; `main-collection.liquid` now consumes that same snippet instead of
duplicating Pagination markup. Loading, provider errors and disabled comments
never masquerade as empty.

The optional top-level composer uses Shopify's native
`{% form 'new_comment', article %}` lifecycle and exact `comment[author]`,
`comment[email]` and `comment[body]` names. Canonical Input, Textarea and Button
classes own presentation; Shopify owns server validation, moderation, pending
state, authoritative insertion/count and localized error/success feedback. The
section exposes only heading rank, comments per page and composer presence as
merchant settings.

Shopify's published comment object is flat and exposes no parent or reaction
data. The adapter therefore emits no reply controls, nested relationships or
reaction toggles. That omission is an honest target capability mapping, not a
different neutral contract. A future provider-backed Shopify app must supply
and verify its own authenticated reply/reaction/moderation lifecycle before
adding those surfaces.

## Theme Editor Requirements

When a Shopify adapter owns an editor surface, it must:

- Define all merchant-facing settings in section, block, or global schema.
- Use settings in the actual rendered Liquid output.
- Avoid dead controls that do not affect the storefront.
- Include presets for addable sections.
- Use blocks or theme blocks for reorderable child content.
- Keep labels and help text clear and merchant-oriented.
- Preserve live preview where Shopify supports it.
- Use `request.design_mode` in Liquid or `Shopify.designMode` in JS only when editor-specific behavior is required.

## Maturity Model

The generated manifest now uses `shopify-maturity-v1`:

```text
shopify-maturity-v1
  css
  liquid
  schema
  data
  behavior
  template-composition
  editor-preview
```

Under this model:

- `Section Adapter` target-ready requires schema.
- `Theme Block Adapter` target-ready requires block schema.
- `Snippet Adapter` target-ready does not require schema, but requires a stable render API.
- `Embedded Class Contract` target-ready requires CSS and contract class usage only.
- Components that map Shopify objects need data mapping validation.
- Section adapters must be reachable through a JSON template, a layout `{% section %}` call, or a section preset.
- Editor-preview readiness checks that schema controls are wired into rendered Liquid instead of becoming dead controls.

The current generated inventory records:

- Liquid file kind: layout, section, block, snippet, or template.
- Validity and contents of each section/block `{% schema %}` block.
- `section.settings`, `block.settings`, and global `settings` references.
- Shopify data object references.
- Snippet `render` calls and parameters.
- Layout/template `{% section %}` calls.
- JSON template section composition.

## Validation Rules

Shopify validation now checks:

- Every dedicated section has exactly one `{% schema %}` block.
- Section schema is valid JSON.
- Section/schema/data/template/editor maturity layers are present and internally consistent.
- Snippets expose detectable render/data mapping before being promoted.
- `settings_data.json` is not treated as canonical source.

Validation still needs to grow into stricter target gates:

- Section schema declares required settings from the contract/adapter mapping.
- Addable sections include `presets` when they are not otherwise composed.
- Sections that render blocks define valid block schemas.
- Components using Shopify data objects map the expected contract objects.
- Theme Editor settings affect rendered Liquid, CSS vars, classes, snippets, or JS.
- Theme Check passes as a separate target gate.

## Current Repo Implications

The current Shopify adapter now separates class-level contracts, snippets, sections, and missing dedicated Liquid templates. Existing section adapters with Liquid are schema-ready, data-ready, composed, and editor-preview ready in the generated maturity model.

The next implementation pass should:

1. Reconcile contracts whose Shopify status is still `planned` even though Liquid exists.
2. Promote existing Liquid sections/snippets only after checking behavior and contract-specific data mapping.
3. Validate remaining commerce/editor-critical sections against the same minimal semantic-setting and canonical-composition standard now applied to `Featured Collection`.
4. Add Theme Check or Shopify CLI validation as a separate target gate.

## References

- Shopify section schema: https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema
- Shopify settings schema: https://shopify.dev/docs/storefronts/themes/architecture/config/settings-schema-json
- Shopify theme editor: https://shopify.dev/docs/storefronts/themes/tools/online-editor
- Shopify blocks: https://shopify.dev/docs/storefronts/themes/architecture/blocks
- Shopify theme architecture: https://shopify.dev/docs/storefronts/themes/architecture
