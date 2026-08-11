# 0123. Container-Responsive Artist Profile Composition

Status: Accepted

Date: 2026-07-14

## Context

Artist Profile already exposed portrait, label, name, location, biography,
philosophy and action composition under ADR 0080, but the implementation did
not yet satisfy that semantic contract across surfaces. The root grid responded
to viewport width rather than its actual container. Removing the optional
portrait at a wide viewport left content in only one half of the grid. The docs
site overrode the name heading, section padding, grid gap and biography rhythm,
so the shared Exhibit/Studio renderer did not display canonical source styling.

The shared fixture composed canonical Button classes without declaring the
dependency and wrapped two ordinary destinations in an extra `nav` landmark.
Shopify had a dedicated section and settings schema but emitted an empty portrait
region, hard-coded an undeclared label and icon, lacked a section-to-heading
association, and remained marked as a planned adapter.

WAI guidance supports a native section named by its visible heading and leaves
heading rank to document context. Image alternative text depends on purpose and
must remain authored by the target. HTML supplies native quotation and link/
button semantics without an Artist Profile widget role. Open UI has no standard
Artist Profile primitive; Radix and Polaris model media, identity and actions as
explicit composition. Shopify sections and image settings provide target-native
merchant configuration, media alt and focal-point data.

## Decision

- Artist Profile is a passive native section associated with the visible artist-
  name heading through a target-unique `aria-labelledby` and `id` pair.
- A required `.artist-profile__layout` wrapper sits inside the root. The root
  establishes an isolated inline-size container and owns surface/insets; the
  descendant wrapper owns the responsive grid.
- The layout stacks in narrow component containers and becomes two equal minmax
  columns at a private `36rem` content-box threshold only when the explicit
  `.artist-profile__layout--split` modifier declares a rendered portrait. It
  preserves portrait-before-content source order and does not use viewport
  media queries or structural `:has()` matching.
- Portrait remains optional. When omitted, no portrait wrapper is rendered and
  adapters also omit the split modifier, so the layout remains one full-width
  content column at every size.
- The target owns image source, loading policy, focal point and whether the
  portrait is informative or decorative. Informative media uses useful alt;
  decorative media uses `alt=""`.
- Name remains a contextual native heading. The canonical class fully defines
  its visual font, line height, margin, padding and border so host documentation
  styles cannot change component presentation. The neutral reset continues to
  own generic element margins outside the component-specific heading reset.
- Biography remains target-owned rich content. Canonical CSS owns only resilient
  wrapping and predictable block rhythm; targets own sanitization and inner
  semantic elements.
- Philosophy remains optional native `blockquote` content. Citation metadata is
  target-authored when needed; no synthetic `cite` property is added.
- Actions remain an optional ordinary group. The default fixture and Shopify
  section compose canonical Button on native anchors, so Button becomes the one
  declared dependency. The group is not a `nav`, toolbar or composite widget.
- The seven accepted properties remain unchanged. Artist records, heading rank,
  portrait position/ratio controls, layout variants, social links, destinations,
  CMS/metaobjects and events do not become neutral public API.
- Artist Profile owns no controlled/uncontrolled state, JavaScript, listener,
  observer, focus management, live region or motion. Native controls and targets
  retain their own behavior and lifecycle.
- Site-only Artist Profile padding, gap, biography and responsive overrides are
  removed so Exhibit and Studio consume the canonical implementation directly.
- Shopify maps its image, identity, rich-text, quotation and destination settings
  into the same anatomy, omits empty optional wrappers, offers a decorative-
  portrait setting, localizes schema labels and fallback action/name strings,
  and is marked implemented only after theme validation passes.
- The component remains `pilot`. Complete evidence may make it ready for human
  review, but only explicit human approval can promote it to `stable`.

## Performance

Artist Profile adds no neutral runtime, image loader, state store, formatter,
listener, observer, request, animation or component asset. The layout uses one
CSS container and one explicit BEM modifier supplied by the target when portrait
markup is present. The permanent Storytelling `4.2 KiB` and total component CSS
`64 KiB` gzip ceilings remain binding and are not reset by this decision. Any
bundle overage remains a documented certification gap rather than a silent
budget rewrite or loss of semantic typography.

## Consequences

- Web, Shopify and future targets share one section-labelled, ordered editorial structure
  without making React, Liquid, a CMS record or a viewport breakpoint canonical.
- The component now behaves correctly inside narrow and wide embedding contexts
  and when any accepted optional content is absent.
- Exhibit and Studio can prove exact DOM parity while using source CSS rather
  than site-owned presentation patches.
- Action focus, hover, disabled, busy and activation behavior remain canonical
  Button responsibilities rather than duplicated Artist Profile API.
- Human review still owns the aesthetic acceptance of portrait ratio/crop,
  column proportion, threshold, surface, radius, typography, quote rule, spacing,
  action emphasis and the absence of additional v1 layout variants.
