# Component Refinement Program

This document is the permanent operating rubric for preparing The Gallery
components for human stability review. It complements
`docs/COMPONENT-CERTIFICATION.md`: certification defines the neutral-web maturity
gate, while this program defines the research, refinement, evidence, performance,
and cross-target work that must happen before that gate is presented to a human.

The repository remains the source of truth. External systems provide evidence and
comparison points; they do not replace accepted Gallery decisions or canonical
source.

## Program States

| State | Meaning |
| --- | --- |
| `baseline` | Registry, contract, CSS, docs, Studio, and generated adapter facts have been inventoried. |
| `researched` | A component dossier records standards, mature-system comparisons, current evidence, and a recommended direction. |
| `refined` | In-scope source gaps are resolved and every unresolved product, aesthetic, commercial, or architecture choice is explicit. |
| `evidence-ready` | Required validation, content stress cases, interaction checks, and four-viewport evidence are complete. |
| `human-review-ready` | No blocking rubric gap remains. The component can be evaluated by the owner without additional implementation work. |
| `approved` | A human explicitly approved promotion. Only then may the contract become `stable`. |

Automated scripts may assign or derive every state except `approved`. A structural
pass in `docs/reports/component-web-certification.md` remains baseline evidence,
not a maturity promotion.

## Batch Workflow

1. Confirm a clean or understood worktree and preserve unrelated changes.
2. Select the next dependency-safe batch from
   `docs/reports/component-refinement-program.md`.
3. Create the dossier before changing canonical implementation.
4. Reconcile the dossier against accepted ADRs, open questions, source CSS,
   contracts, registry, docs, Studio, Web, and target-native adapters.
5. Separate technical corrections from decisions that need owner input.
6. Implement only source-backed corrections and accepted recommendations.
7. Render the shared Exhibit/Studio implementation with the same initial fixture.
8. Exercise the required content, interaction, theme, motion, and viewport matrix.
9. Record before/after evidence, validation results, remaining risks, and the
   human-review recommendation.
10. Close the owned Playwright session and stop the owned docs server immediately
    after each browser-evidence phase.
11. Update the refinement override and decision-coverage manifest when its
    readiness or owner-decision assignment changes, then regenerate the global
    report.

Accepted decisions from a completed batch apply to later components with the same
anatomy or behavior. A new ADR is required when the rule changes public semantics,
ownership, architecture, or target translation.

## Local Evidence Resource Budget

Resource cleanup is part of the certification gate. A batch may own at most one
Gallery docs server, one Playwright CLI session/browser, and one browser tab at a
time.

- Do not keep Vite or Playwright open during research, editing, report writing,
  adapter generation, or non-browser validation.
- Probe `http://127.0.0.1:4173` first. Reuse a responsive Gallery server. If none
  exists, start `npm run dev:site:evidence` in a managed execution session and
  retain its session identifier; do not background or orphan it. The command
  fixes host `127.0.0.1`, port `4173`, and `strictPort`, records the process it
  owns, and refuses to create a second server on an occupied port.
- Use the stable Playwright session `gallery-refinement` for Exhibit, Studio,
  viewport, state, theme, and content checks. Navigate one tab instead of creating
  parallel before/after or viewport sessions.
- Baseline and final evidence are separate short phases. Close the baseline
  browser before implementation. Close the final browser immediately after the
  last console/evidence check.
- In cleanup, run `npm run evidence:cleanup`, then
  `npm run evidence:assert-clean`. The cleanup command closes only the stable
  Gallery Playwright session and the recorded repo-owned server. It never closes
  the user's normal Chrome or a pre-existing user-owned docs server.
- The managed server also closes `gallery-refinement` when its own process exits,
  providing a failure-safe for interrupted evidence phases. The explicit cleanup
  and assertion remain mandatory.
- A batch report must confirm browser/server cleanup alongside `site/dist`
  cleanliness. If cleanup cannot be verified, the batch is not complete.

## Dossier Evidence Order

Use evidence in this order:

1. Concrete canonical source and generated validator facts.
2. Accepted Gallery ADRs and owner-reviewed evidence.
3. Web standards and WAI-ARIA Authoring Practices where applicable.
4. Open UI research for emerging native controls and platform behavior.
5. Mature design-system APIs such as Radix and Polaris.
6. Other relevant, attributable implementation references.
7. Historical Gallery documents and owner-provided visual references.

Conflicts are recorded; they are not silently resolved. When external systems
disagree, the dossier recommends one Gallery direction and lists concrete
alternatives. Owner input is requested only for aesthetic, commercial, product,
or architecture decisions.

## Permanent Rubric

Each row receives one of `pass`, `gap`, `decision-needed`, or `not-applicable`.
`human-review-ready` requires no `gap`. A `decision-needed` result is blocking
when it changes the component's public meaning, visual identity, commercial
behavior, or architecture. Target-owned integrations may remain explicitly
deferred when the neutral contract defines their boundary.

| Gate | Required evidence |
| --- | --- |
| Purpose and limits | Purpose, primary use cases, non-goals, selection guidance, and boundary with adjacent components. |
| Anatomy and composition | Required and optional parts, slots, generated parts, semantic element choices, and canonical dependencies without duplicated markup or behavior. |
| Variants and modes | Complete matrix of variants, sizes, states, themes, density, visibility, validation, and responsive modes with explicit defaults. |
| Public API | Properties, attributes, events, content, slots, target mappings, invalid combinations, and omission behavior. |
| State ownership | Controlled/uncontrolled strategy where applicable; source of truth, synchronization, reset, form, pending, disabled, and derived states. |
| Tokens and values | Public tokens used by canonical CSS; private `--_` composition; every literal classified as semantic value, private geometry, native requirement, or gap. |
| Visual system | Typography, spacing, dimensions, iconography, border, radius, shadow, color, alignment, text wrapping, media fit, and theme behavior. |
| Accessibility | Native semantics, accessible name/description, relationships, keyboard, focus, touch target, contrast, forced colors, validation, announcements, and disabled/busy behavior. |
| Motion | Purpose, duration/curve source, interruption, reduced-motion fallback, and absence of unnecessary continuous work. |
| Responsive behavior | Container behavior plus Mobile, Tablet, Desktop, and XL evidence; no unexplained viewport-only API. |
| Content resilience | Short, long, empty, localized, bidirectional when relevant, missing media, numeric extremes, and unbroken content. |
| Runtime and assets | DOM shape, CSS/JS cost, listeners, observers, layout reads, network requests, assets, and avoidable work. |
| Cross-target translation | Neutral Web mapping; Shopify strategy/data/editor behavior where applicable; notes for React, Figma, SwiftUI, Compose, and future adapters. |
| Documentation parity | One shared Exhibit/Studio renderer, definition, fixture, canonical CSS, initial state, and local behavior; MDX remains source and fallback evidence. |
| Verification | Relevant validators, real-browser interactions, evidence manifest, before/after comparison, report, risks, and human review result. |

## Configurability Test

A control or public token is exposed only when all five answers are yes:

1. Can a consumer understand it without knowing private implementation details?
2. Does the concept survive translation across targets?
3. Does it change semantic content, behavior, state, layout mode, or an intentional
   design-system decision?
4. Can validators or target adapters verify the mapping?
5. Can it compose with every other public option without creating incoherent or
   inaccessible states?

If not, it remains fixture data, target-owned data, native child composition, or a
private `--_` variable. Public component tokens are not created merely to replace
every CSS literal.

## Required Evidence Matrix

### Viewports

| Mode | Evidence viewport | Review emphasis |
| --- | ---: | --- |
| Mobile | `390 x 844` | Touch, wrapping, narrow overlays, coarse-pointer alternatives, no horizontal overflow. |
| Tablet | `768 x 1024` | Token-mode transition, intermediate grids, popup and overlay containment. |
| Desktop | `1280 x 800` | Default Studio inspector, pointer and keyboard states, common layout. |
| XL | `1600 x 1000` | XL token mode, maximum container behavior, line length, excessive stretching. |

Every viewport is captured in Exhibit and Studio. Responsive differences caused by
the available canvas are valid only when the renderer, fixture, and semantic state
remain shared.

### Content

- Short canonical fixture.
- Long localized prose with spaces.
- Long unbroken identifier or URL where the component accepts free text.
- Empty optional content; required content must fail validation rather than render
  an unexplained blank surface.
- Missing or failed media where media is owned.
- Maximum repeated items and numeric limits defined by the contract.
- RTL or bidirectional content for controls whose direction changes navigation,
  placement, or icon meaning.

### Interaction and accessibility

- Pointer, touch/coarse-pointer behavior, Tab order, Enter, Space, Escape, and
  component-specific keys.
- Visible `:focus-visible`, focus entry/return, disabled and busy suppression, form
  reset, and controlled/uncontrolled synchronization where applicable.
- Light, dark, forced-colors, normal motion, and reduced motion.
- Accessible name, description, roles, states, relationships, live regions, and
  contrast sampled from the rendered component.

## Performance Evidence By Target

ADR 0310 supersedes the numeric budget policy in ADRs 0088 and 0273. Keep the
copy-and-own dependency slice as the useful delivery unit, and keep measuring
complete compatibility outputs. A byte threshold must belong to a specific
target and have a verified external basis; historical Gallery ceilings are not
platform requirements.

The executable policy remains at `docs/refinement/performance-budgets.json`
(version 3). Run `npm run audit:refinement:performance` to regenerate the report
and `npm run validate:refinement:performance` to exercise its policy safeguards.
The report separates raw bytes from local `gzip -9 -n -c` size. Concatenated
install slices exclude the separately measured tokens and are a comparison
model, not the sum of actual HTTP responses or the cost of a whole page.

| Target / evidence | Treatment |
| --- | --- |
| Neutral Web tokens, dependency-closed installs, runtime modules and compatibility bundles | Observed raw/gzip sizes with exact files and hashes. No adopted external byte ceiling. |
| Shopify local CSS and JS assets | Separate inventory, including compatibility files. Theme Check default references are advisory, use raw local bytes, and carry official sources and applicability. |
| A mandatory platform limit | May block only its applicable target; record the authority, primary URL, verification date, exact metric and applicability before enforcing it. |
| Hosted page performance, upload/package limits and target tool execution | Require their own evidence; the asset inventory does not mark them passed. |

The former 64 KiB token, 21 KiB Storytelling and other family/runtime ceilings
remain `historicalReference` metadata only. They cannot stop a component batch,
serve as acceptance criteria or be described as standards. Do not substitute
another arbitrary threshold or inflate a limit just to clear a report.

`tool-guideline` rules are advisory. Only `platform-requirement` rules can be
required, and the validator rejects missing target, provenance, applicability or
units. Missing files and failed measurements remain errors, never zero-byte
passes. `--allow-gaps` no longer bypasses a required target failure. Source review
must verify that a cited rule actually supports its encoded threshold; metadata
validation alone cannot establish that fact.

A successful inventory means it was measured without an applicable required
failure; it does not certify speed or Shopify release readiness. Shopify theme
app extensions and Theme Store submission criteria do not apply automatically
to this Online Store theme. See ADR 0310 for the current source discrepancy and
its resolution for local asset size.

### Component architecture contracts

Passive components retain their existing no-owned-JavaScript contract unless a
declared dependency introduces behavior. Consumer media and editorial fixtures
remain data rather than bundled component-owned assets. These are accepted
architecture/ownership decisions, not universal byte limits or external target
standards; they remain subject to their own contract and lifecycle validation.

### Runtime rules by family

- Passive primitives, content cards, badges, prices, and static sections: no
  component JavaScript, observers, timers, or animation loops.
- Native fields and controls: native value/form behavior remains authoritative;
  enhancement must be progressive and preserve input/change/reset semantics.
- Floating surfaces and overlays: no background work while closed; listeners and
  observers are released when the surface is removed.
- Commerce compositions: network, inventory, money, authentication, and persistence
  remain target-owned and do not enter the neutral runtime.
- Repeated content: DOM and work scale linearly with supplied items. Large-data
  virtualization, pagination, or lazy loading belongs to the owning target unless
  accepted into the component contract.
- Motion uses opacity and transform where practical, performs no continuous layout
  reads, and has a reduced-motion fallback.

## Before/After Protocol

Before implementation, preserve a named screenshot or DOM/measurement record for
every reported gap. After implementation, capture the same route, viewport, theme,
fixture, state, and browser. The report must state what changed and what deliberately
did not change. If a source correction should be visually neutral, DOM, computed
style, accessibility-tree, or bundle measurements are valid before/after evidence.

## Cross-Target Readiness

Neutral-web readiness and target readiness are independent:

- Web must map contract semantics to native HTML/CSS/JS and pass the generated
  adapter validation.
- Shopify must follow its documented embedded, snippet, section, block, template,
  or layout strategy and validate data, schema, composition, editor behavior, and
  accessibility as applicable.
- React and future framework adapters must document controlled and uncontrolled
  APIs without changing the contract's semantic meaning.
- Figma maps reviewed properties and variants but remains a target.
- SwiftUI and Compose preserve meaning and native behavior rather than copying DOM
  implementation details.

## Program Outputs

- Rubric: this document.
- Dossier template: `docs/refinement/DOSSIER-TEMPLATE.md`.
- Component dossiers: `docs/refinement/dossiers/`.
- Generated dependency order, progress matrix, and graph:
  `docs/reports/component-refinement-program.md`, its JSON companion, and
  `docs/reports/component-dependency-graph.dot`.
- Owner-decision coverage: `docs/refinement/decision-coverage.json`, validated
  by `npm run validate:refinement-decisions`, plus the four decision packets in
  `docs/reports/`. Every component outside the human-review queue must appear
  exactly once.
- Current performance measurements:
  `docs/reports/component-refinement-performance.md` and its JSON companion,
  generated from the sourced target policy and measurement inventory (ADR 0310).
- Requirement-by-requirement completion audit:
  `docs/reports/component-refinement-completion-audit.md`.
- Structural certification matrix: `docs/reports/component-web-certification.md`.
- Exhibit/Studio evidence: `docs/reports/exhibit-studio-*.json` and corresponding
  human-readable reports.
- Product and architecture risks: `docs/OPEN-QUESTIONS.md` plus dossier-local risks.
