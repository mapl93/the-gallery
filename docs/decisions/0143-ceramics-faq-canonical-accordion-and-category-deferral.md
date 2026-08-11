# 0143. Ceramics FAQ Canonical Accordion And Category Deferral

Status: Accepted

Date: 2026-07-15

## Context

Ceramics Care FAQ entered refinement as an independent disclosure and category
implementation. It defined its own question Button, answer visibility, icon
rotation, focus, hover, transition and reduced-motion CSS even though canonical
Accordion already owned those responsibilities. Its two category Buttons were
focusable but did not select, filter, navigate, update their pressed state,
change results or announce an outcome. The follow-up Link prevented navigation
to a missing fragment, an expanded question could not collapse, and omitting
the optional heading left a dangling `aria-labelledby` relationship.

ADR 0083 accepted target-owned FAQ content while explicitly leaving category
filtering versus navigation and formal Accordion composition open. The program
goal now requires composed components to consume canonical components. It does
not authorize choosing a category product mode, record schema, policy source,
or target integration by assumption.

## Decision

- Ceramics FAQ becomes a contextual composition of canonical Accordion and
  canonical Link.
- Registry and contract add `accordion` and `link` as direct dependencies.
- Every question and answer uses canonical Accordion item, contextual heading,
  native Button trigger, stable relationships, native `hidden`, focus,
  disabled, motion and target-coordinated expansion behavior.
- Ceramics FAQ keeps only its optional contextual header, required item
  composition and optional follow-up presentation.
- A valid rendered profile requires at least one item. Missing required items
  omit the component rather than emitting an empty section.
- `heading` and `subheading` remain independently optional. The root receives
  `aria-labelledby` only when a non-empty visible heading exists; an empty
  header wrapper is not emitted.
- The wrapper adds no second value, default value, single/multiple,
  collapsible, orientation, controlled/uncontrolled, or change-event API over
  Accordion. Targets coordinate group policy.
- Category controls and the `categories` property are removed from the v1
  contract, canonical CSS, Studio metadata, fixture and docs rather than kept
  as inert or compatibility surfaces.
- A future accepted category mode must be complete: either real category Links
  and destinations, or a named in-place selection/filter model with records,
  URL, focus, result, empty and announcement policies.
- Optional follow-up navigation uses canonical Link with descriptive text and a
  real target-owned destination. Placeholder or prevented activation is not
  part of the contract.
- Essential safety, legal, eligibility and universally required care
  information must remain visible outside optional FAQ disclosures.
- Exhibit and Studio continue to use one `CeramicsStudio` renderer and fixture.
  The review fixture contains three questions, starts one open and demonstrates
  independent zero-, one- and multiple-open states without claiming a stable
  default policy.
- Contract version advances to `0.3.0` and remains `pilot`.

## External Evidence

- WAI-ARIA APG Accordion specifies native Button triggers inside contextual
  headings, synchronized expanded/controls/panel visibility, Enter/Space and
  normal Tab behavior.
- Open UI Accordion research records non-exclusive, exclusive and
  exact-exclusive policies rather than one universal group model.
- Native HTML `details` and `summary` provide a semantics-preserving target
  option for a single disclosure.
- Radix places single/multiple, controlled/uncontrolled, collapsible, disabled
  and orientation choices at the Accordion layer.
- GOV.UK advises using accordions only with user evidence and keeping commonly
  needed content visible or on clearer pages.
- Polaris Collapsible treats hidden content as lower priority and requires a
  real adjacent Button relationship; critical information should not be hidden.

These sources support canonical disclosure composition and truthful
navigation. They do not select The Gallery's visual identity, category mode,
records, content policy or stable disclosure-versus-visible-content decision.

## Figma Evidence

The registered file `k3axoTaF87g17fBRgJ0PMY`, frame `943:7` and inspector
`1020:480` are the generic Button/Studio shell. Direct API inspection and
screenshot review found no Ceramics FAQ artwork, question, answer, category,
contact, responsive state or component-specific controls. No FAQ density,
surface, typography, category model or group policy is inferred from it.

## Performance

Ceramics FAQ adds no neutral runtime. Removing the duplicate category,
disclosure, icon, focus, hover and motion CSS reduces the Ceramics-family and
complete Web CSS while canonical Accordion and Link retain their established
budgets and behavior.

The permanent Ceramics-family ceiling remains `5.3 KiB` (`5,427 B`) gzip. This
decision creates no new runtime ceiling, request, observer, timer, formatter,
store, URL parser, animation, icon or asset.

## Target Boundary

- Neutral Web uses the contextual header, canonical Accordion tree and optional
  canonical Link follow-up.
- Shopify may map merchant records to canonical APG-style markup or a
  semantics-preserving `details`/`summary` composition after record/schema and
  group policy are selected. Category behavior remains unresolved.
- React and Angular use a thin composition around canonical Accordion and Link
  with target-owned item values and coordinator.
- Figma uses reviewed Accordion and Link instances within a contextual frame
  after component-specific human visual approval.
- SwiftUI and Compose use target-native disclosure groups or always-visible
  sections plus native navigation while preserving the ownership boundary.

## Open Human And Product Boundary

This decision intentionally does not approve:

- final FAQ measure, alignment, typography, spacing, surface or Accordion/Link
  appearance in the ceramics context;
- stable Accordion versus always-visible headings/separate-page presentation;
- single, multiple, collapsible or exact-exclusive stable expansion policy;
- category navigation versus in-place filtering, taxonomy, URL, focus, result,
  empty and announcement lifecycle;
- record/schema, content-source, localization, rich-content trust, policy
  review, analytics or CMS ownership;
- dedicated Shopify, Figma, React, Angular, SwiftUI or Compose implementation;
  or
- promotion from `pilot` to `stable`.

## Consequences

- The repository has one disclosure and one navigation implementation instead
  of ceramics-specific forks.
- The formal dependency graph records canonical Accordion and Link composition.
- The Web candidate no longer exposes dead category controls, one-way expansion,
  a prevented destination, CSS-only hidden state or dangling heading label.
- Exhibit and Studio share the same renderer, fixture, markup, interaction and
  canonical source CSS.
- Category behavior remains an explicit product decision rather than a visual
  placeholder mistaken for completed functionality.
- Human visual review, product/record decisions, target integrations and
  explicit stability approval remain required.
