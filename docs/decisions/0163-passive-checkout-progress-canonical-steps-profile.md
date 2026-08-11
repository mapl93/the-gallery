# 0163. Passive Checkout Progress As A Canonical Steps Profile

Status: Accepted

Date: 2026-07-16

## Context

P4 Checkout Progress Indicator communicates the buyer's location in a known
checkout sequence. Its initial implementation duplicated canonical Steps
anatomy, indicators, connectors, statuses, tokens and responsive behavior. The
shared Pages renderer could emit an unnamed or empty list, Studio introduced an
independent earlier stacking breakpoint, the MDX fallback used a third status
representation and the Shopify adapter implied that theme Liquid could own a
native checkout surface.

ADR 0084 already defines P4 as informational with a required accessible label
and ordered step content while routing, navigation availability, visited state,
validation and checkout synchronization remain outside the contract. ADR 0103
defines canonical Steps as a passive labelled ordered list with completed,
current and upcoming states and no implicit workflow controller. WAI, HTML,
ARIA, WCAG, Open UI, Radix, Polaris and Shopify provide enough evidence to
reconcile those source contracts without deciding the remaining checkout
product and target architecture.

## Decision

- P4 is a passive checkout-context profile of canonical Steps. Registry and
  contract add `steps` as the sole direct dependency.
- A valid P4 composition requires a non-empty localized `accessibleLabel` and a
  non-empty ordered `steps` slot. Missing either omits the complete wrapper and
  list instead of leaving an empty or unnamed progress shell.
- P4 adds a passive `.checkout-progress` wrapper around the required canonical
  `ol.steps.checkout-progress__list`. The ordered list carries the accessible
  name. Canonical Steps owns items, connectors, indicators, content, titles,
  descriptions, state text and status presentation.
- The target supplies finite stages in checkout order and projects every item
  as completed, current or upcoming. At most one item uses
  `aria-current="step"`. Completed items include equivalent state text and a
  visible check or other non-color cue; decorative icons remain hidden from
  assistive technology.
- P4 is supporting progress context. Multi-page checkout targets also expose
  the current stage through the page title or primary heading when applicable.
- Wide P4 retains canonical horizontal Steps. The passive wrapper establishes a
  named inline-size container. At a private narrow threshold, P4 stacks public
  canonical parts, hides decorative connectors and preserves DOM/source order.
  It does not consume canonical Steps' private geometry or promote automatic
  orientation into the Steps public API.
- P4 exposes only `accessibleLabel` and `steps`. It does not expose current
  index, status mutation, completed count, percentage, routes, callbacks,
  availability, validation, persistence, automatic orientation, breakpoint,
  connector, indicator, layout, color, spacing or animation properties.
- P4 has no controlled/uncontrolled state. The owning target projects its
  authoritative checkout state and owns page context, data, saving, validation,
  availability, routing, history, focus, errors, announcements and analytics.
- Steps remain passive in v1. Completed-step navigation requires a later
  explicit product and architecture decision covering saved data, route
  availability, validation, focus, errors and announcements. Any approved
  interaction composes canonical Link or Button rather than changing the list
  items into implicit controls.
- Exhibit and Studio use one docs-only `StepsArtwork` renderer and the same P4
  fixture, DOM, omission rules and canonical CSS. Studio contributes no P4
  visual geometry or token fork.
- P4 exposes no independent visual token. Canonical Steps owns its public
  visual API; P4's measure and container threshold are private composition.
- P4 owns zero neutral listener, observer, request, timer, formatter, state
  store, route, validation service, generated id, authored motion, asset or
  JavaScript. The Pages + Coming Soon ceiling remains `5.3 KiB` (`5,427 B`).
- Shopify theme Liquid is not a valid native-checkout mapping. A future Shopify
  adapter requires an approved Checkout UI Extension target and supported
  Shopify components/data, or deliberately defers to platform-owned checkout
  progress. Neutral P4 DOM/CSS is not copied into that constrained surface.
- Contract version advances to `0.3.0` and remains `pilot`. Automated evidence
  can prepare human review but cannot approve visual values, the two-property
  API, checkout navigation, target mappings or stability.

## External Evidence

- WAI's multi-page form guidance uses an ordered list for a known step sequence,
  exposes current/completed meaning as text and recommends current-stage
  context in the page title and main heading.
- HTML defines `ol` for intentionally ordered items whose order affects meaning.
- ARIA defines `aria-current="step"` for the current item in a step-based
  process; WAI-ARIA APG defines no Stepper widget or keyboard model.
- WCAG requires that state not be conveyed by color alone.
- Open UI has no Stepper component. Radix has no Stepper primitive and
  recommends composing accessible leaves. Polaris exposes percentage Progress,
  not a named checkout-stage sequence.
- Shopify Checkout UI extensions are constrained to supported extension targets,
  APIs and web components. They cannot access the real checkout DOM, render
  arbitrary HTML or override component CSS.

## Performance

P4 adds no neutral JavaScript or bundled asset. Before refinement its duplicated
CSS slice is `808 B` deterministic gzip; complete Pages + Coming Soon is
`4,099 B` against the permanent `5,427 B` ceiling, leaving `1,328 B`. Replacing
parallel status/indicator CSS with a canonical Steps profile is expected to
reduce that family cost and keep shared runtime unchanged.

## Target Translation

- Neutral Web uses the passive P4 wrapper around canonical Steps and target-
  supplied ordered status projection.
- Webflow consumes source-identical Pages and Layout CSS while its project owns
  checkout state and any navigation.
- Shopify remains planned as a target-native Checkout UI Extension profile;
  theme Liquid is not applicable to native checkout.
- React and Angular use thin P4 wrappers over their canonical Steps adapter and
  controlled target data without a second state store.
- Figma should represent P4 as a checkout-labelled instance/profile of Steps
  after the owner supplies specific wide and narrow visual evidence.
- SwiftUI and Compose use target-native ordered/current/completed semantics;
  application state and navigation remain target-owned.

## Open Human Boundary

This decision intentionally does not approve:

- canonical Steps' visual reuse in checkout, P4 measure, narrow threshold,
  connector-free stacked treatment, density, typography or status emphasis;
- the complete two-property API for stable v1;
- completed-step navigation, saving, validation, routing, focus, error,
  announcement, analytics or checkout-state architecture;
- automatic container-driven orientation as a canonical Steps feature;
- a Shopify Checkout UI Extension target, supported stage data or composition;
- the registered generic Button Figma nodes as P4-specific evidence;
- framework/native implementations; or
- promotion from `pilot` to `stable`.

## Consequences

- P4 no longer carries a second stepper DOM, state or token system.
- Required data no longer leaves an empty or unnamed ordered sequence.
- Exhibit, Studio and the MDX fallback exercise canonical Steps anatomy and
  completion/current semantics.
- Narrow response belongs to the P4 component container without exposing a new
  public breakpoint or consuming dependency-private variables.
- Checkout navigation and state remain available for future target composition
  without being assumed for every platform.
- Shopify adapter status now describes the platform constraint truthfully
  instead of implying theme Liquid control of native checkout.
- ADRs 0084 and 0103 remain authoritative for informational P4 and passive
  canonical Steps boundaries; this ADR reconciles their composition.
