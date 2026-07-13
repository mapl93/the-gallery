# 0034. Web Component Certification And Docs Dogfooding

Status: Accepted

Date: 2026-07-11

## Context

The Gallery has complete structural coverage across the current registry:

```text
183 registry components
183 component contracts
183 canonical MDX pages
```

That coverage is a validated baseline, not a maturity claim. Every contract is
still marked `pilot`, and ADR 0027 explicitly records that mechanically generated
families need human refinement before contracts can drive stricter adapter or
generation work.

The documentation site is also being redesigned around two component-page modes:

- Exhibit presents one component as the primary object of study.
- Studio lets a user customize one live component instance.

Studio needs machine-readable component properties, while the site itself should
exercise the same neutral web adapter that external web consumers receive.

## Decision

### Certification is target-specific and web-first

Component maturity is evaluated independently per target. The first certification
scope is the neutral web adapter used by the documentation site. Shopify, React,
Figma, SwiftUI, Compose, and future targets retain their own adapter status and do
not block web certification.

### `stable` requires evidence and human review

`pilot` means a component has a structurally validated source baseline. It does
not mean every property, behavior, token, example, or target implementation has
been reviewed.

A contract may move to `stable` only after the web certification gates in
`docs/COMPONENT-CERTIFICATION.md` pass and ambiguous product decisions have been
resolved. Automated audits report evidence and review flags; they never promote a
component to `stable` automatically.

### Contracts own semantic properties; Studio owns presentation

Component contracts are the source for semantic customizable properties and their
target mappings. Examples include content, enumerated presentation choices,
boolean capabilities, states, attributes, slots, and public token overrides.

Studio may define how those facts are grouped, ordered, and represented as UI
controls. Studio must not invent a component capability that is absent from the
contract or another accepted source fact.

The exact property schema will be introduced through the Button pilot. This ADR
does not authorize guessing defaults, option sets, or mappings that are not
established by canonical source evidence.

Contracts continue to validate and describe hand-authored web CSS. This decision
does not make contracts generate CSS.

### The docs site is a first-party neutral web consumer

The documentation site should consume `platforms/web/index.css` as its complete
design-system stylesheet entry instead of permanently importing every canonical
CSS source file individually. Site-specific compositions such as Exhibit, Studio,
and the inspector remain site product code built from public Gallery components;
they do not become public design-system components automatically.

Migration to the adapter entry must preserve preview isolation and occur only after
the existing web adapter validates.

## Consequences

- Full registry coverage and certified component maturity are separate facts.
- The site becomes a dogfooding surface for the distributed neutral web adapter.
- Component audits can proceed without waiting for non-web targets.
- Studio control rendering can eventually be data-driven without making its UI
  arrangement part of the target-agnostic contract.
- Existing `pilot` contracts remain unchanged until their evidence is reviewed.
- Conflicts between current source files and historical documentation are recorded
  as certification gaps rather than resolved by assumption.

## Follow-Up Work

1. Generate a deterministic web certification matrix for all registry components.
2. Audit Button as the semantic-property pilot.
3. Propose the smallest contract-schema extension supported by Button evidence.
4. Certify the component kernel needed to build Exhibit and Studio.
5. Switch the site stylesheet entry to `platforms/web/index.css` after adapter
   validation and browser verification.

## Implementation Status

The documentation site now loads `platforms/web/index.css` as its document-level
design-system entry. Shadow-root previews load the generated
`platforms/web/components.css` and inherit the document token matrix, preserving
isolation without duplicating the complete token output inside each preview.
