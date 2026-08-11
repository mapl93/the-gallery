# Shopify Comparison Table Metaobject Profile

Status: selected architecture; adapter implementation planned

Owner decision: refinement decision 66

Related decisions: ADR 0155 and ADR 0272

## Purpose

Define the target-native Shopify data boundary for S13 Comparison Table without
copying Shopify schema details into the neutral contract. The selected direction
supports a variable number of alternatives and criteria, but every concrete
delivery profile must remain finite, validated, and performant.

This document is an implementation gate, not a claim that Liquid, definitions,
schema, data, editor preview, or interaction persistence already exist.

## Conceptual Records

One comparison matrix record owns:

- stable matrix id and localized caption;
- optional localized contextual title;
- ordered references to alternative records;
- ordered references to criterion records;
- passive or selectable interaction policy;
- single or multiple selection policy when selectable;
- optional target persistence/action configuration;
- version/freshness metadata needed by the delivery profile.

Each alternative record owns:

- one stable id used by headers, cells, controlled selection, and analytics;
- localized visible label;
- optional visual-highlight flag;
- optional explicit localized claim text;
- optional complete Link destination or Button action descriptor.

Each criterion record owns:

- one stable id;
- localized visible row-header label;
- one value for every referenced alternative, keyed by stable alternative id;
- target-formatted text or text-complete inclusion/exclusion meaning.

An implementation may normalize cells into separate records only when its
chosen definitions and limits make that structure safer. Regardless of storage,
the renderer receives one finite, ordered, rectangular projection.

## Required Validation

Before rendering, the adapter must reject or apply its documented omission/error
policy when:

- the matrix caption is empty;
- no valid alternatives or criteria remain;
- ids are empty or duplicated;
- an ordered reference is missing, stale, unpublished, or unavailable to the
  storefront;
- any criterion lacks a value for a valid alternative;
- a cell points to an unknown criterion or alternative;
- a single selected id is not a valid alternative;
- a multiple-selection list contains invalid or duplicate ids;
- an action label has no destination/action or vice versa;
- localized display text is missing under the delivery profile's fallback
  policy;
- any declared editorial or performance bound is exceeded.

The adapter must preserve the authoritative order from the matrix record. It
must not infer relationships from creation time, handle sorting, or incidental
Liquid iteration order.

## Mandatory Finite Profile

Every concrete Shopify delivery profile must declare all three values together:

| Bound | Meaning |
| --- | --- |
| `maxAlternatives` | Maximum comparable columns after the criterion column. |
| `maxCriteria` | Maximum visible comparison rows. |
| `maxCells` | Maximum rendered criterion-by-alternative cells; must be consistent with the other two limits. |

The values must be justified by Theme Editor usability, narrow-screen scroll,
Liquid/render cost, localized extreme content, and evidence on representative
store data. Shopify currently allows a `metaobject_list` setting limit up to 50
entries and up to 50 blocks per section, but those are platform ceilings—not
The Gallery's editorial or performance budgets.

Exact S13 numbers remain an explicit adapter-profile decision. Until they are
accepted and enforced, Shopify status stays `planned` and no target-ready claim
is permitted.

## Interaction And Action Lifecycle

- `passive` renders no choice controls. Explicit per-alternative CTA controls
  may still appear.
- `selectable + single` renders canonical native Radios with one shared name and
  a target-controlled selected id.
- `selectable + multiple` renders canonical native Checkboxes and a
  target-controlled ordered selected-id list.
- The target defines whether state is local, URL-backed, form-backed, cart- or
  account-backed, or persisted elsewhere. S13 does not choose that policy.
- A CTA activates only its own complete Link or Button lifecycle. It does not
  silently select, submit, add to cart, or mutate another record.
- Pending, success, failure, feedback, analytics, authorization, inventory,
  pricing, and retry behavior belong to the owning target action.

## Liquid Projection

The future renderer must produce:

- conditional named `section` or generic `div` root;
- title outside the horizontal table scroll owner;
- canonical `.table-wrapper` and `.table` classes;
- native caption, `thead`, `tbody`, optional `tfoot`, and correct header
  relationships;
- canonical Radio or Checkbox markup only in selectable mode;
- ordinary passive cells with no ARIA grid semantics;
- explicit claim text and complete canonical Link/Button actions;
- complete horizontal scrolling without hiding essential columns;
- text-equivalent status meaning and forced-color-safe structure.

The target must use the same conceptual contract as Neutral Web, but its Liquid
and metaobject definitions remain Shopify-owned adapter source.

## Delivery Profiles

### Custom storefront or app-owned profile

May use custom or app-owned metaobject definitions when the definitions exist,
are storefront-readable, are deployed/managed by the owning system, and the
section validates missing or stale references. This is the selected first
implementation direction.

### Theme Store-safe profile

Shopify permits `metaobject` and `metaobject_list` settings in Theme Store-listed
themes only when they reference standard Shopify definitions. A custom or
app-owned comparison-matrix definition cannot be presented as Theme Store-safe.

Until Shopify offers a compatible standard definition or the owner accepts a
different bounded editor-native model for that distribution profile, S13 is
unsupported for merchant-authored Theme Store matrix data. CSS and developer
composition compatibility do not equal target-native editor maturity.

## Evidence Required For Target Readiness

- concrete definitions and sample entries;
- exact finite bounds and validation failures;
- section/schema or app-block configuration;
- Liquid projection and canonical dependency use;
- Theme Editor create, reorder, delete, stale-reference, localization, and
  preview behavior;
- passive, single, and multiple interaction evidence;
- independent Link/Button behavior and state persistence policy;
- mobile, tablet, desktop, XL, RTL, long/extreme content, forced colors, and
  keyboard evidence;
- render/runtime measurements within the accepted Shopify family budget;
- explicit custom/app or Theme Store compatibility statement.

## Official Shopify Evidence

- [Input settings: `metaobject` and `metaobject_list`](https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings)
- [Theme architecture limits](https://shopify.dev/docs/storefronts/themes/architecture/limits)
- [Theme Store requirements](https://shopify.dev/docs/storefronts/themes/store/requirements)
- [Dynamic data sources](https://shopify.dev/docs/storefronts/themes/architecture/settings/dynamic-sources)
