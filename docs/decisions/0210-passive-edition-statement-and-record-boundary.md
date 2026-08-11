# 0210. Passive Edition Statement And Record Boundary

Status: Accepted

Date: 2026-07-18

Owner confirmation: decision 64, 2026-08-11

## Context

R10 Edition / Numbering was defined as a passive limited-edition badge with
optional label, number and total. Its runtime and MDX fallback nevertheless
named a native paragraph with generated English `aria-label` text and hid the
slash that communicates the visible number/total relationship. Empty values
could leave a bordered paragraph shell.

The limited variant consumed the warning feedback token even though the docs
denied warning, scarcity and inventory meaning. Canonical CSS used physical
hardcoded spacing and incomplete typography while Studio applied two competing
component-width rules. Exhibit and Studio shared only the containing family
renderer, not an isolated R10 renderer and fixture.

HTML and WAI make paragraph content natively readable and prohibit author names
for the paragraph role. Museum/cataloguing references distinguish edition
description, edition number/name, impression number, edition size and proof
classes; Shopify has no approved R10 record mapping. Gallery's canonical Badge
is a short status/classification primitive whose feedback variants do not
represent a structured edition statement.

## Decision

- R10 remains a passive target-formatted edition statement, not an edition,
  impression, product, inventory, certificate, provenance or authenticity
  record.
- `label`, `number` and `total` remain optional opaque strings. Targets own
  truthful meaning, formatting, localization and synchronization; R10 does not
  parse, compare, generate or validate domain values.
- Blank parts omit. When all three content values are blank, the complete root
  omits rather than rendering an empty surface.
- Neutral Web uses native visible `p` content without `role`, `aria-label`,
  `aria-labelledby`, focusability or live-region behavior.
- Opaque strings use `bdi[dir="auto"]`. The slash renders only when both number
  and total exist and remains exposed because it communicates their relationship.
- `limited` is editorial statement emphasis, not warning, error, urgency,
  availability, verification, authenticity, scarcity or inventory state. It
  uses the existing statement surface rather than feedback-warning tokens.
- R10 does not automatically compose canonical Badge. Its designation and
  number/total relationship form one structured statement; a separate Badge
  label remains an explicit future owner/architecture/visual choice.
- `EditionBadgeArtwork` and `buildEditionBadgeFixture` are the sole registered
  Exhibit/Studio path. The MDX fallback remains structurally aligned.
- Canonical CSS owns logical containment, complete typography, wrapping,
  surface and internal rhythm. Studio may frame the artwork but does not restyle
  R10 width, type, color, border or behavior.
- R10 owns no events, keyboard model, focus, announcement, request, timer,
  observer, persistence or neutral JavaScript.
- R10 remains `pilot`; automated evidence cannot promote it to `stable`.

Owner decision 64 confirms this complete `R10-A` direction: the component keeps
target-formatted values opaque, performs no parsing or scarcity/authenticity
inference, and remains separate from canonical Badge.

## Consequences

- Assistive technology receives the same visible target-authored statement
  instead of invalid and potentially mistranslated hidden English copy.
- Partial compositions remain truthful without inferred placeholders, and
  mixed-direction target values remain isolated.
- Limited-edition presentation no longer consumes a feedback warning meaning.
- Targets can adopt museum, commerce or custom edition records without R10
  collapsing impression identity, edition size, proof type and inventory.
- Shopify requires an approved metafield/metaobject or other explicit source;
  product variant and inventory values are not inferred as edition data.
- Edition record meaning, proof vocabulary, numeric constraints, localization,
  first target integration, final visuals, R10-specific Figma evidence and
  explicit human approval remain open questions. Any future separately composed
  Badge is external target composition and does not change R10.
