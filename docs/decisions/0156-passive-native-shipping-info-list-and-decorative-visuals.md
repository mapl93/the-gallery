# 0156. Passive Native Shipping Info List And Decorative Visuals

Status: Accepted

Date: 2026-07-15

## Context

S14 Shipping Info is intended to summarize a finite set of target-owned service
or policy facts. Its initial contract exposed one required item-composition slot
and no interaction, but the live renderer emitted an unnamed native `section`,
generic `div` records, generic text nodes, and an empty shell when the required
slot was disabled. Canonical CSS overflowed a directly constrained `200px`
root because a fixed `200px` minimum track could not shrink inside section
padding.

The initial icon boundary allowed a target to decide whether a visual was
decorative or informative. That flexibility is not useful here: every service
or policy claim must remain understandable and auditable as visible text. A
truck, package, shield, or payment image cannot itself prove delivery terms,
inspection, insurance, returns, or security. The repo also has no canonical
target-agnostic Icon component; Lucide is explicitly scoped to Studio.

HTML native list semantics, Open UI list research, WAI image guidance, WCAG
non-text content/reflow, Polaris layout composition, Radix native-element
composition guidance, and Shopify's repeatable block model establish a complete
neutral direction without a custom ARIA pattern or new product architecture.
The registered Figma references still render the Button pilot and cannot approve
S14 aesthetics.

## Decision

- Shipping Info is a passive collection of short, text-complete service or
  policy facts. It is not a calculator, estimate, tracker, policy source,
  guarantee engine, status feed, form, or action surface.
- The root is a native `ul.shipping-info`; each valid record is one native
  `li.shipping-info__item`. Because the shared reset suppresses list markers,
  the root keeps explicit `role="list"` to preserve list exposure across
  browser/assistive-technology combinations.
- Every rendered item requires a non-empty visible
  `.shipping-info__label`. Supporting `.shipping-info__text` and one
  `.shipping-info__icon` visual are optional.
- Optional visuals are always decorative. Visible text owns the complete
  service or policy meaning; S14 exposes no icon name, alternative, taxonomy,
  asset source, or Studio Lucide choice.
- Missing required items, or a target collection with no valid labelled item,
  omits the complete root. The component never renders an empty list shell.
- The public API remains one required `items` composition slot. Structured item
  records, item counts, columns, alignment, measure, spacing, breakpoints,
  links, destinations, commerce claims, live data, and legal policy remain
  target-owned or private.
- The neutral component has no event, controlled/uncontrolled strategy,
  focusable passive item, custom role, keyboard model, live region, listener,
  observer, request, timer, layout read, authored motion, or runtime.
- Responsive layout is intrinsic to the component's container. The track
  minimum is capped by available content width, so direct `200–1120px` roots
  preserve source order without horizontal overflow or viewport-only markup.
- Numeric label weight and calculated supporting type are replaced by existing
  semantic typography tokens. Track threshold, maximum measure, visual size,
  compact item gap, alignment, and structural zeroes remain private.
- Exhibit and Studio use the same `SectionsStudio` renderer, fixture, omission
  rule, native markup, and canonical CSS. MDX fallback markup documents the
  same contract rather than a parallel labelled-section/article composition.
- Shopify receives a dedicated merchant-editable Section Adapter. Reorderable
  blocks expose a label, optional supporting text, and optional decorative
  image; label-less blocks and empty sections are omitted; editor attributes
  are preserved; no component JavaScript or icon catalogue is added.
- Webflow and neutral Web receive regenerated canonical CSS projections.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  can prepare S14 for human review but cannot approve aesthetics, validate
  merchant claims, replace missing S14 Figma evidence, or promote stability.

## External Evidence

- HTML defines `ul` as a list where changing item order does not materially
  change document meaning and `li` as its native item.
- Open UI list research permits compound list-item content including visuals
  and multiple text regions without creating a separate widget role.
- WAI image guidance distinguishes informative and decorative imagery based on
  purpose and context. Adjacent visible text provides the complete fact here,
  so the visual is decorative.
- WCAG requires non-text information to have an equivalent and requires text to
  remain perceivable, resizable, and reflowable at narrow effective widths.
- Polaris separates layout, unordered-list, icon, and text responsibilities;
  responsive composition does not require one flattened component API.
- Radix composition guidance retains native element semantics and places
  responsibility on consumers that substitute a less appropriate element.
- Shopify block objects provide repeatable settings and
  `block.shopify_attributes` for editor identity and ordering.

These sources support native list semantics, text-complete facts, decorative
visuals, intrinsic layout, and block-based target translation. They do not
approve The Gallery's final measure, alignment, rhythm, visual size, fixture
claims, or aesthetic identity.

## Performance

Shipping Info has a `0 B` neutral runtime budget. Native list semantics and CSS
grid require no component JavaScript. The docs renderer may use React to project
Studio fixture content, but that code is not neutral component runtime.

The permanent Sections ceiling remains `6,861 B` deterministic gzip. S14 must
fit within the prior `25 B` headroom or recover bytes from its own obsolete
rules; the ceiling is not raised. Shopify uses one bounded Liquid traversal per
render and responsive image output only when the merchant supplies a visual.

## Target Translation

- Neutral Web uses `ul`/`li`, text-complete paragraph content, an optional
  decorative visual, intrinsic tracks, and zero runtime.
- Webflow consumes the same canonical Sections CSS and maps the composition to
  a native list or collection list with target-owned content.
- Shopify uses reorderable section blocks with required label, optional text,
  optional decorative image, strict omission, localized schema, editor
  attributes, and zero component runtime.
- React and Angular use thin native-list renderers over target children or
  records without importing Studio icon names.
- Figma should expose repeated text-complete items and optional decorative
  visuals after a corrected S14 owner reference exists.
- SwiftUI and Compose use native passive semantic collections and hide
  decorative visuals from accessibility.

## Open Human Boundary

This decision intentionally does not approve:

- the final `60rem` maximum measure, `12.5rem` track threshold, section inset,
  section/grid/item rhythm, `2.5rem` visual size, center alignment, label weight,
  supporting type, or content measure;
- the default delivery, inspection, and insurance fixture claims;
- any calculator, estimate, tracking, live policy, click-through card, or
  guarantee behavior;
- a target-agnostic icon catalogue or informative visual mode;
- component-specific Figma evidence, because the current nodes show Button;
- framework/native implementations; or
- promotion from `pilot` to `stable`.

## Consequences

- Consumers receive a real content list instead of an unnamed section and
  generic wrappers.
- Service and policy meaning remains available without images, color, or icon
  interpretation.
- The component contains narrow layouts without viewport-specific DOM or
  runtime.
- Shopify merchants receive a target-native editor surface without extending a
  cross-target icon API or adding unverifiable default claims.
- Exhibit and Studio remain exact projections of one renderer and fixture.
- Human review remains responsible for visual identity, content truth,
  corrected design evidence, and stability.
