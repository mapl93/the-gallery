# 0141. Ceramics Glossary Canonical Accordion Composition

Status: Accepted

Date: 2026-07-15

## Context

Ceramics Glossary entered refinement with useful grouped-term intent but three
conflicting implementations. Its registry described Accordion definitions,
while its contract exposed unresolved alphabet controls and its CSS and Studio
renderer reimplemented disclosure triggers, panels, focus and motion. The
alphabet buttons had no navigation, filtering or search behavior. The Studio
fixture combined B and C under one heading, emitted content panels without
native `hidden`, started fully collapsed, and could expand a term but could not
collapse it again.

Canonical Accordion and Link have already completed technical refinement. They
own the exact disclosure and destination behavior the glossary needs. The
remaining glossary-specific responsibilities are editorial grouping, term
semantics, definition content, optional media and related-term composition.

HTML also provides a native `dl`/`dt`/`dd` glossary model. Disclosure therefore
remains a product presentation choice rather than the only valid semantic form.

## Decision

- Ceramics Glossary keeps the existing disclosure direction for its current v1
  candidate, but every term composes canonical Accordion anatomy and behavior.
- Registry and contract add direct `accordion` and `link` dependencies.
- `.ceramics-glossary__terms` layers on `.accordion`; each `.glossary-term`
  layers on `.accordion__item`. Glossary CSS no longer owns trigger, indicator,
  panel visibility, focus, hover, disabled or reduced-motion rules.
- Each visible term uses `dfn` inside the contextual Accordion heading. Each
  associated panel contains the definition and optional media or related Link.
- Letter groups remain native contextual sections with separate source-ordered
  headings. They are not merged for visual convenience.
- Alphabet navigation is removed from the v1 property, state, anatomy, CSS,
  Studio and documentation API. It is not retained as a compatibility alias.
- Navigation, scrolling, filtering, search, URL state, focus movement and result
  announcements remain open until the product behavior is explicitly selected.
- The target owns records, normalized group keys, ordering, stable ids, initial
  state and Accordion single-or-multiple expansion policy.
- Optional title omission also removes its `aria-labelledby` relationship.
- Related terms use canonical Links with real target-owned destinations; dead
  or activation-prevented placeholder anchors are excluded.
- A docs-only shared `AccordionArtwork` renderer is consumed by the canonical
  Accordion and Ceramics Glossary. This guarantees one DOM and interaction
  implementation across their Exhibit and Studio projections without making
  React the neutral source.
- The default review fixture opens the first term and allows every enabled term
  to expand and collapse independently. This is evidence, not a required
  production default or group policy.
- Contract version advances to `0.3.0` and remains `pilot`.

## External Evidence

- WHATWG HTML explicitly demonstrates glossaries with `dl`, `dt`, `dd` and
  `dfn`, supporting an always-visible semantic alternative.
- WAI content-structure guidance favors meaningful headings and regions over
  visual grouping alone.
- WAI-ARIA APG Accordion requires a native Button as the only child of a
  heading, synchronized `aria-expanded`/`aria-controls`, hidden collapsed
  content, native activation and normal Tab order.
- Open UI Accordion research and Radix expose single/multiple and
  controlled/uncontrolled choices at the Accordion layer, not in a glossary
  wrapper.
- GOV.UK recommends Accordion only with user evidence and notes that visible
  headings and anchors can be easier to scan and link.
- Current Polaris documentation exposes no glossary or Accordion primitive;
  target-native composition is preferable to copying its archived React API.

These sources support semantic terms, truthful disclosure composition and a
human decision between disclosure and always-visible definitions. They do not
select The Gallery's final visual identity or alphabet behavior.

## Figma Evidence

The registered file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector
`1020:480` are generic Button/Studio shells, not Ceramics Glossary artwork. No
glossary density, grouping, media, expansion or responsive decision is inferred
from those nodes.

## Performance

The glossary adds no neutral listener, observer, timer, request, layout read,
formatter or asset. Target behavior reuses canonical Accordion. Removing the
duplicate alphabet and disclosure CSS lowers the Ceramics family bundle; the
docs-only React fixture keeps local Boolean state solely for review evidence.

The permanent Ceramics-family ceiling remains `5.3 KiB` (`5,427 B`) gzip.
Canonical Accordion and Link retain their existing budgets. This decision
creates no new runtime ceiling.

## Target Boundary

- Neutral Web emits grouped native sections and canonical Accordion/Link
  markup. A target may instead choose an always-visible `dl` mode only after the
  product decision is recorded.
- Shopify maps records and groups in Liquid, then uses canonical APG Accordion
  markup or a semantics-preserving native `details`/`summary` profile. Liquid
  owns stable ids; theme behavior owns group policy.
- React and Angular compose their canonical Accordion and Link projections with
  one target-owned expansion coordinator when controlled behavior is needed.
- Figma composes reviewed Accordion and Link instances after human visual
  approval; current generic references supply no component-specific truth.
- SwiftUI and Compose use target-native disclosure groups or always-visible
  definition structures while preserving term, definition and group meaning.

## Open Human And Product Boundary

This decision intentionally does not approve:

- disclosure Accordion versus always-visible `dl` as the stable product mode;
- final measure, spacing, letter-rule emphasis, Accordion density, media scale
  or related-link treatment;
- initial collapsed/expanded state or single/multiple group policy;
- alphabet navigation, scroll, filtering, search, URL, focus or announcement
  behavior;
- record schema, normalization, localization, editorial ownership or related
  destination strategy;
- dedicated Shopify, Figma, React, Angular, SwiftUI or Compose implementation;
  or
- promotion from `pilot` to `stable`.

## Consequences

- The repository has one disclosure and destination implementation instead of
  a ceramics-specific fork.
- Inert alphabet controls and their incoherent public API disappear.
- Terms, definitions, headings, ids and visibility relationships are truthful
  and testable across targets.
- Exhibit and Studio share the exact same renderer and fixture.
- An always-visible glossary remains a concrete human-review alternative rather
  than an accidental architecture change.
- Human visual review, product-mode selection and explicit stability approval
  remain required.
