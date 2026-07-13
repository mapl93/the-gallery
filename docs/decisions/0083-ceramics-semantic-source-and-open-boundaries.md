# 0083. Ceramics Semantic Source And Open Boundaries

Status: Accepted

Date: 2026-07-12

## Context

The fourteen Ceramics contracts had canonical CSS and structurally valid pilot
contracts, but their anatomy was incomplete and their shared `targetData`
behavior implied a broad ceramics data integration without defining who owned
it. Several CSS selectors also exposed visual hooks for selection, filtering,
disclosure, booking-adjacent actions, certificate QR media, tour playback, and
commission uploads. Those selectors are implementation facts, not enough
evidence to assign product behavior to neutral web.

Commission Form already depends on Input, Textarea, File Upload, and Button.
Its prior upload-zone hover treatment duplicated part of File Upload's visual
state instead of preserving the dependency boundary. The form also had no
explicit composition regions for canonical fields and actions.

## Decision

### The Ceramics family remains a pilot

Material Library, Glaze Guide, Technique Explainer, Care Instructions,
Dimensions Display, Firing Info, Workshop Listing, Commission Form, Maker's
Mark, Edition Badge, Certificate Details, Ceramics Glossary, Studio Tour, and
Ceramics FAQ advance to contract version `0.2.0` and remain `pilot`.

Automated validation proves structural consistency only. It does not replace
human review or resolve the product boundaries below.

### Anatomy and semantic mappings follow canonical source

- Material Library records its header, responsive grid, full Material Card
  anatomy, and optional property-tag composition. Material records remain a
  target-owned slot rather than a CMS schema.
- Glaze Guide records swatches and the optional detail panel. Its selected
  selector remains a visual hook; targets decide whether samples are passive or
  selectable and own any selection model.
- Technique Explainer records ordered steps, text, and optional media. Visual
  alternation never changes source reading order.
- Care Instructions maps the registry-backed Default, Do, and Don't treatments
  to the documented root modifiers while preserving legacy item-level hooks.
  Icons and color support text guidance and
  never replace it.
- Dimensions exposes diagram, textual measurements, and optional unit controls
  as slots. Targets retain value formatting, conversion, and synchronization.
- Firing Info records explicit term-value anatomy without defining a ceramics
  technical-data schema.
- Workshop Listing records complete card anatomy, textual availability hooks,
  and optional Button composition without assigning booking behavior.
- Maker's Mark exposes passive identity content without defining artist or
  studio records or making authenticity claims.
- Edition Badge maps its Limited modifier as a presentation variant and remains
  passive, with target-formatted numbering.
- Certificate Details exposes fields and optional QR media as slots without
  assigning a verification protocol or guarantee.
- Ceramics Glossary records grouped terms, existing alphabet controls, and
  disclosure-style term anatomy. Navigation, filtering, search, and disclosure
  behavior remain target-owned.
- Studio Tour records ordered steps and optional media. Video provider,
  loading, consent, playback, modal, and analytics behavior remain target-owned.
- Ceramics FAQ records category controls and disclosure-style question anatomy.
  Category filtering, URL state, result announcements, and disclosure behavior
  remain target-owned.

### Commission Form composes canonical dependencies

Commission Form owns only its introduction and layout regions:

- `.commission-form__fields` composes canonical Input and Textarea instances.
- `.commission-form__upload-zone` is a layout slot for canonical File Upload and
  no longer owns hover, focus, disabled, drag, or validation styling.
- `.commission-form__actions` composes canonical Button instances.

Input, Textarea, and File Upload retain their Default, Error, Success, and
Warning validation families, label and message association, native value or
file semantics, disabled behavior, and focus treatment. Button retains its
variant, size, disabled, and busy behavior. Commission Form does not duplicate
those states or selectors.

The target owns field inventory, consent, submission, persistence, response
messages, notifications, and every later commission-workflow stage.

### Neutral-web CSS receives bounded hardening

Canonical Ceramics CSS now uses existing public tokens to add:

- Scoped border-box sizing, intrinsic-width containment, media bounds, and long
  text wrapping.
- Grid tracks that cannot overflow their container on narrow viewports.
- Responsive stacking for technique steps, firing details, certificate fields,
  and form actions while preserving source order.
- Existing touch-target sizing and visible focus treatment for current control
  selectors and target-provided native interactive roots.
- Non-hover fallbacks and reduced-motion suppression for decorative transforms
  and transitions.

No token, target adapter, runtime behavior, or data model is added.

## Open Product Boundaries

The following questions are intentionally unresolved:

- Which target or shared content layer owns material, glaze, firing, workshop,
  maker, certificate, glossary, FAQ, and tour records, and what schemas should
  those records use?
- Are Glaze Guide swatches always selectable, optionally selectable, or passive
  in some compositions? Which layer owns selected-detail synchronization?
- Does Dimensions convert canonical measurements or receive already-formatted
  values for each unit, and which layer guarantees rounding accuracy?
- Does Ceramics Glossary alphabet UI navigate, scroll, or filter? Is search a
  separate composed component, and which layer owns result and URL state?
- Which system owns workshop booking, capacity reservation, pricing freshness,
  authentication, payment, cancellation, and confirmation?
- What makes a certificate verifiable, where does QR content lead, and which
  target is authorized to make authenticity guarantees?
- Which Studio Tour media types are supported, and who owns provider consent,
  loading, playback, captions, modal presentation, and analytics?
- What are the Commission Form fields, consent requirements, submission states,
  persistence rules, notifications, and downstream workflow?
- Do Ceramics FAQ categories filter in place or navigate, and does the FAQ
  compose canonical Accordion after its content and behavior requirements are
  reconciled?

## Consequences

- Ceramics adapters can consume explicit semantic content and composition
  regions without treating fixture copy or visual selectors as a CMS contract.
- Commission Form remains aligned with canonical field validation and avoids a
  second, divergent state model.
- Narrow layouts and keyboard or touch input receive stronger neutral-web
  support without introducing JavaScript.
- Stable promotion, behavior dependencies, data schemas, and target-native
  implementations require owner decisions and human certification review.
