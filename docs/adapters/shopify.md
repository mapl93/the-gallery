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
| `assets/theme.js` | Copied shared progressive-enhancement JS | Generated/copied output |
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

### Section Adapter

Use this when the component should appear as an editable section in the Theme Editor.

Examples:

- `Header`
- `Hero`
- `Featured Collection`
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

The target-ready implementation should look like this:

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

The schema is what creates the Theme Editor panel. Liquid maps those settings to storefront output. CSS and JS only implement the visual and behavioral result.

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
3. Add or restore missing dedicated sections, starting with commerce/editor-critical sections such as `Featured Collection`.
4. Add Theme Check or Shopify CLI validation as a separate target gate.

## References

- Shopify section schema: https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema
- Shopify settings schema: https://shopify.dev/docs/storefronts/themes/architecture/config/settings-schema-json
- Shopify theme editor: https://shopify.dev/docs/storefronts/themes/tools/online-editor
- Shopify blocks: https://shopify.dev/docs/storefronts/themes/architecture/blocks
- Shopify theme architecture: https://shopify.dev/docs/storefronts/themes/architecture
