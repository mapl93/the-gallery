# Shopify Size Chart Custom Data

Status: Accepted target schema for the D7 implementation candidate

Date: 2026-07-20

This adapter reads one merchant-owned product metafield:
`product.metafields.custom.size_chart`. Its value references a reusable
`gallery_size_chart` metaobject. The schema is intentionally bounded to one
required primary table and one optional secondary table, each with one row
header, two value columns, and no more than twenty valid rows.

The values, units, captions, headings and notes are complete localized strings.
Neither Liquid nor JavaScript converts, rounds, reformats, recommends or infers
measurements. A larger or structurally different matrix needs another target
presentation.

This is merchant-owned theme data, so the stable `custom.size_chart` namespace
and the two definitions are created through Admin GraphQL rather than an
app-reserved TOML namespace. Shopify documents Size Charts as a metaobject use
case, definition creation through `metaobjectDefinitionCreate`, typed reference
validation through `metaobject_definition_id`, and list access through Liquid
metafield `.value`:

- [Metaobjects](https://shopify.dev/docs/apps/build/metaobjects)
- [Create a metaobject definition](https://shopify.dev/docs/api/admin-graphql/latest/mutations/metaobjectDefinitionCreate)
- [Create a metafield definition](https://shopify.dev/docs/api/admin-graphql/latest/mutations/metafieldDefinitionCreate)
- [Reference validation](https://shopify.dev/docs/apps/build/metafields/list-of-validation-options#metaobject-definition)
- [Liquid metafield object](https://shopify.dev/docs/api/liquid/objects/metafield)

## 1. Create the definitions

Use an authorized Admin GraphQL client with `write_metaobject_definitions` and
access to Product metafield definitions. Create the row definition first and
save the returned definition id.

```graphql
mutation CreateDefinition($definition: MetaobjectDefinitionCreateInput!) {
  metaobjectDefinitionCreate(definition: $definition) {
    metaobjectDefinition { id type }
    userErrors { field message code }
  }
}
```

```json
{
  "definition": {
    "name": "Gallery size chart row",
    "type": "gallery_size_chart_row",
    "description": "One complete row in a bounded Gallery size chart table.",
    "displayNameKey": "row_label",
    "access": {
      "admin": "MERCHANT_READ_WRITE",
      "storefront": "PUBLIC_READ"
    },
    "capabilities": {
      "translatable": { "enabled": true }
    },
    "fieldDefinitions": [
      {
        "name": "Row label",
        "key": "row_label",
        "type": "single_line_text_field",
        "required": true,
        "validations": [{ "name": "max", "value": "80" }]
      },
      {
        "name": "First value",
        "key": "first_value",
        "type": "single_line_text_field",
        "required": true,
        "validations": [{ "name": "max", "value": "80" }]
      },
      {
        "name": "Second value",
        "key": "second_value",
        "type": "single_line_text_field",
        "required": true,
        "validations": [{ "name": "max", "value": "80" }]
      }
    ]
  }
}
```

Create the chart definition next. Replace `ROW_DEFINITION_ID` with the returned
`gid://shopify/MetaobjectDefinition/...` value. Primary fields are required.
Secondary fields are optional as a set; Liquid exposes the second presentation
only when its label, caption, three headers and at least one complete row all
exist.

```json
{
  "definition": {
    "name": "Gallery size chart",
    "type": "gallery_size_chart",
    "description": "One required and one optional complete three-column size chart presentation.",
    "displayNameKey": "title",
    "access": {
      "admin": "MERCHANT_READ_WRITE",
      "storefront": "PUBLIC_READ"
    },
    "capabilities": {
      "translatable": { "enabled": true }
    },
    "fieldDefinitions": [
      { "name": "Title", "key": "title", "type": "single_line_text_field", "required": true, "validations": [{ "name": "max", "value": "120" }] },
      { "name": "Primary label", "key": "primary_label", "type": "single_line_text_field", "required": true, "validations": [{ "name": "max", "value": "40" }] },
      { "name": "Primary caption", "key": "primary_caption", "type": "single_line_text_field", "required": true, "validations": [{ "name": "max", "value": "160" }] },
      { "name": "Primary row header", "key": "primary_row_header", "type": "single_line_text_field", "required": true, "validations": [{ "name": "max", "value": "80" }] },
      { "name": "Primary first header", "key": "primary_first_header", "type": "single_line_text_field", "required": true, "validations": [{ "name": "max", "value": "80" }] },
      { "name": "Primary second header", "key": "primary_second_header", "type": "single_line_text_field", "required": true, "validations": [{ "name": "max", "value": "80" }] },
      {
        "name": "Primary rows",
        "key": "primary_rows",
        "type": "list.metaobject_reference",
        "required": true,
        "validations": [
          { "name": "metaobject_definition_id", "value": "ROW_DEFINITION_ID" },
          { "name": "list.min", "value": "1" },
          { "name": "list.max", "value": "20" }
        ]
      },
      { "name": "Secondary label", "key": "secondary_label", "type": "single_line_text_field", "validations": [{ "name": "max", "value": "40" }] },
      { "name": "Secondary caption", "key": "secondary_caption", "type": "single_line_text_field", "validations": [{ "name": "max", "value": "160" }] },
      { "name": "Secondary row header", "key": "secondary_row_header", "type": "single_line_text_field", "validations": [{ "name": "max", "value": "80" }] },
      { "name": "Secondary first header", "key": "secondary_first_header", "type": "single_line_text_field", "validations": [{ "name": "max", "value": "80" }] },
      { "name": "Secondary second header", "key": "secondary_second_header", "type": "single_line_text_field", "validations": [{ "name": "max", "value": "80" }] },
      {
        "name": "Secondary rows",
        "key": "secondary_rows",
        "type": "list.metaobject_reference",
        "validations": [
          { "name": "metaobject_definition_id", "value": "ROW_DEFINITION_ID" },
          { "name": "list.max", "value": "20" }
        ]
      },
      { "name": "Notes", "key": "notes", "type": "rich_text_field" }
    ]
  }
}
```

Finally create the Product metafield definition. Replace
`CHART_DEFINITION_ID` with the chart definition id.

```graphql
mutation CreateProductSizeChartDefinition($definition: MetafieldDefinitionInput!) {
  metafieldDefinitionCreate(definition: $definition) {
    createdDefinition { id namespace key type { name } }
    userErrors { field message code }
  }
}
```

```json
{
  "definition": {
    "name": "Size chart",
    "namespace": "custom",
    "key": "size_chart",
    "description": "Reusable Gallery size chart associated with this product.",
    "type": "metaobject_reference",
    "ownerType": "PRODUCT",
    "validations": [
      { "name": "metaobject_definition_id", "value": "CHART_DEFINITION_ID" }
    ]
  }
}
```

Definition creation is idempotent only when the caller first queries the
existing type and `custom.size_chart` definition. Do not blindly rerun create
mutations or replace an existing incompatible merchant definition.

## 2. Write rows, a chart, and the product reference

Create all row entries first. Each `value` is the final authored display string,
including its unit or qualifier where required.

```graphql
mutation CreateSizeChartRow($metaobject: MetaobjectCreateInput!) {
  metaobjectCreate(metaobject: $metaobject) {
    metaobject { id handle }
    userErrors { field message code }
  }
}
```

```json
{
  "metaobject": {
    "type": "gallery_size_chart_row",
    "fields": [
      { "key": "row_label", "value": "S" },
      { "key": "first_value", "value": "24 cm" },
      { "key": "second_value", "value": "18 cm" }
    ]
  }
}
```

Create the chart after all row ids exist. List-reference values are JSON arrays
encoded as strings. Omit every secondary field when there is no second complete
presentation.

```graphql
mutation CreateSizeChart($metaobject: MetaobjectCreateInput!) {
  metaobjectCreate(metaobject: $metaobject) {
    metaobject { id handle }
    userErrors { field message code }
  }
}
```

```json
{
  "metaobject": {
    "type": "gallery_size_chart",
    "fields": [
      { "key": "title", "value": "Framed textile size guide" },
      { "key": "primary_label", "value": "CM" },
      { "key": "primary_caption", "value": "Framed textile measurements in centimetres" },
      { "key": "primary_row_header", "value": "Size" },
      { "key": "primary_first_header", "value": "Width" },
      { "key": "primary_second_header", "value": "Height" },
      { "key": "primary_rows", "value": "[\"PRIMARY_ROW_GID_1\",\"PRIMARY_ROW_GID_2\"]" },
      { "key": "secondary_label", "value": "IN" },
      { "key": "secondary_caption", "value": "Framed textile measurements in inches" },
      { "key": "secondary_row_header", "value": "Size" },
      { "key": "secondary_first_header", "value": "Width" },
      { "key": "secondary_second_header", "value": "Height" },
      { "key": "secondary_rows", "value": "[\"SECONDARY_ROW_GID_1\",\"SECONDARY_ROW_GID_2\"]" }
    ]
  }
}
```

Associate the resulting chart with a Product through the defined metafield.

```graphql
mutation AssignProductSizeChart($metafields: [MetafieldsSetInput!]!) {
  metafieldsSet(metafields: $metafields) {
    metafields { id namespace key value }
    userErrors { field message code }
  }
}
```

```json
{
  "metafields": [
    {
      "ownerId": "PRODUCT_GID",
      "namespace": "custom",
      "key": "size_chart",
      "type": "metaobject_reference",
      "value": "CHART_METAOBJECT_GID"
    }
  ]
}
```

Localize translatable row and chart fields through Shopify's standard custom-
data translation workflow. Never generate the secondary table from the primary
table during save or render.

## 3. Retrieve and render in Liquid

The target reads the reference and list fields through `.value`:

```liquid
{% assign chart = product.metafields.custom.size_chart.value %}
{% assign rows = chart.primary_rows.value %}

{% for row in rows limit: 20 %}
  {{ row.row_label.value }}
  {{ row.first_value.value }}
  {{ row.second_value.value }}
{% endfor %}
```

The canonical implementation is
`platforms/shopify/snippets/size-chart.liquid`. It fails closed unless title,
primary label/caption/headers and at least one complete primary row exist. It
shows the optional Segmented Control only when the full secondary presentation
is valid. `platforms/shopify/assets/size-chart.js` opens one native modal
dialog, focuses the visible title, restores the invoker, supports Escape and
backdrop dismissal, and swaps only between already-authored complete tables.

The Main Product `size_chart` block contains no duplicate editor settings. Add
the block to the product template after assigning `custom.size_chart`; products
without a valid reference render no empty trigger or modal.
