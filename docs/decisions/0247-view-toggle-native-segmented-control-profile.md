# 0247. View Toggle Native Segmented Control Profile

Status: Accepted

Date: 2026-07-20

Supersedes: ADR 0217

## Context

ADR 0217 technically reconciled E5 as two canonical pressed Toggle Buttons with
ordinary Tab navigation, but kept native Radio/Segmented Control semantics as an
open alternative. The owner selected E5-B instead: View Toggle should look and
behave like the provided joined Grid/List reference, with one mutually exclusive
value, one Tab stop, logical arrow navigation, an icon and visible text in each
segment, and a clearly active surface.

Canonical Segmented Control already owns the accepted native Fieldset/Legend,
same-name Radio, one-value, keyboard, event, FormData, disabled, reset, focus,
forced-color, and reduced-motion contract. Maintaining two pressed Buttons would
leave E5 inconsistent with the accepted product direction and duplicate a less
appropriate interaction model.

## Decision

- E5 composes canonical Segmented Control. The root carries both `.segmented`
  and `.view-toggle`; child parts retain canonical classes and add E5 classes for
  traceable profile composition.
- The control contains exactly two options in stable source order: native Radio
  value `grid`, then native Radio value `list`, sharing one required non-empty
  target-supplied field `name`.
- A visible native Legend names the collection-view decision. Grid and List have
  complete visible localized text plus fixed passive decorative icons. Icons are
  hidden from duplicate accessible naming and are not public icon choices.
- The one checked Radio is the sole state owner. Native Web and uncontrolled
  adapters author one checked/default value; controlled adapters project one
  `activeView` and one value-change callback.
- Grid is the neutral initial value unless the target supplies a valid merchant,
  URL, or account preference. Invalid adapter values normalize to Grid only at a
  validated boundary. E5 is omitted whenever only one real layout exists.
- Native Radio behavior provides one Tab entry/exit point, logical arrow
  selection, Space activation, input/change, FormData, disabled propagation,
  and reset. E5 adds no button roles, `aria-pressed`, roving-focus runtime, or
  component-specific keyboard listener.
- The two segments remain horizontally joined and share available width. Visible
  labels may wrap in narrow containers without hiding text, changing source
  order, or exposing an icon-only mode. Exact colors and dimensions from the
  owner reference are directional rather than final visual approval.
- The target results coordinator applies the requested layout while preserving
  filters, sort, pagination, and product identity. It owns URL/history,
  merchant/account/storage preference, scroll/focus policy, analytics, loading,
  errors, and any useful localized result announcement.
- Neutral E5 stores no preference, mutates no result surface, and emits no live
  announcement. It adds no listener, observer, timer, request, storage, layout
  read, asset, or runtime coordinator.
- Shopify remains planned until an owning collection section proves localized
  Liquid markup, result-mode mapping, editor/default policy, optional preference
  lifecycle, and live-store behavior.
- Exhibit and Studio mount one `ViewToggleArtwork`, one fixture, one canonical
  Segmented Control path, and the same state projection.
- E5 remains `pilot`; automated certification cannot promote it to `stable`.

## Consequences

- E5 now matches its accepted mutually exclusive interaction model instead of
  exposing two independently tabbable pressed actions.
- Visible Grid/List text removes the old icon-only interpretation cost while
  fixed icons retain the owner's recognizable visual cue.
- Native semantics supply arrow navigation and a serializable value without E5
  JavaScript.
- Result and persistence behavior stays target-owned, so the neutral component
  remains useful across Web, Shopify, frameworks, native platforms, and future
  targets.
- Final surface, radius, spacing, icon geometry, focus hierarchy, localized
  wrapping, E5-specific Figma evidence, target integration, and explicit
  stability review remain human gates.

## References

- <https://www.w3.org/WAI/ARIA/apg/patterns/radio/>
- <https://open-ui.org/components/radio-button.research/>
- <https://www.radix-ui.com/themes/docs/components/segmented-control>
- <https://shopify.dev/docs/storefronts/themes/architecture/templates/collection>
