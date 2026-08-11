# 0100. Breadcrumb, Header, And Static Announcement Boundaries

Status: Accepted

Date: 2026-07-13

## Context

Batch 15 refined the next dependency-safe components after Tooltip, Accordion,
and Tabs. Breadcrumb's shared renderer did not emit the ordered hierarchy already
described by the component guide, Header responded to the outer viewport and
recreated icon actions outside canonical Button, and Announcement Bar created a
region landmark for static page-load content by default.

The neutral source must preserve native document semantics, consume canonical
dependencies, and describe target boundaries without deciding route structure,
global service orchestration, campaign behavior, or merchant policy. Exhibit and
Studio must also render the same implementation and fixture.

## Decision

- Breadcrumb is a named `nav` containing an ordered `ol` of `li` records. Linked
  ancestors use native anchors; the current record is exposed once with
  `aria-current="page"`; visual separators are hidden from the accessibility
  tree. The full path wraps and unbroken labels may break within the component.
- Breadcrumb remains passive. Route truth, records, URLs, localized labels,
  separator content, and current-page derivation remain consumer or target data.
  Collapse, middle-item hiding, ellipsis, history, overflow menus, and alternate
  separators are not inferred as v1 modes.
- Breadcrumb hover keeps primary text contrast and uses the existing accent token
  for an underline. Focus uses the existing semantic focus token. No component
  runtime, custom keyboard model, or controlled state is introduced.
- Header is a sticky site-masthead composition boundary. A body-scoped native
  `header` supplies banner semantics; optional primary navigation uses native
  links and optional actions compose canonical Button or native Link.
- Header's accepted 48rem compact/expanded threshold is evaluated against the
  Header's own inline size with a container query. Compact mode hides the primary
  navigation and may show a target-connected menu trigger; expanded mode shows
  navigation and hides that trigger. The navigation owns bounded horizontal
  overflow when localized content exceeds its allocation.
- `.header__action` is the canonical local positioning hook for action adornments
  such as the cart count. The count is hidden from duplicate name calculation and
  must be included in the owning action's accessible name. Logical positioning is
  used for sticky, border, and badge geometry.
- Header current/hover navigation text uses primary text contrast; the existing
  accent token remains the state underline. Search, account, cart, authentication,
  menu, route, focus-trap, scroll-lock, sticky-offset, analytics, action-priority,
  and data services remain target-owned under ADR 0086.
- Announcement Bar v1 is one concise static message with an optional native link.
  It renders neutral document content by default. A target may render a labelled
  `section` only when it intentionally needs a distinct landmark.
- Static Announcement Bar does not imply `alert`, `status`, or `aria-live`.
  Dynamic insertion, urgency, dismissal, persistence, rotation, countdown,
  scheduling, targeting, analytics, and campaign lifecycle require separate
  target or product decisions. Empty required content omits the component.
- Announcement Bar exposes a BEM link part while retaining descendant-link and
  paragraph compatibility for Shopify rich text. It remains HTML/CSS-only.
- Exhibit and Studio use the same renderer and initial fixture for all three
  components. Site React state and inspector data remain target evidence, not
  neutral runtime or public defaults.
- Breadcrumb, Header, and Announcement Bar remain `pilot`. Automated readiness
  does not promote them to `stable` without explicit human review.
- This ADR supersedes ADR 0071 only for Breadcrumb. It preserves ADR 0086's
  Header and Announcement service/product boundaries and does not resolve the
  corresponding open questions.

## Performance

Batch 15 adds no neutral JavaScript, observer, timer, request, asset, provider, or
continuous layout work. Deterministic level-9 gzip measurements are:

- Layout CSS: `5,257 B` against the permanent `4.8 KiB` ceiling. This is the
  continuing documented family exception, now `342 B` over.
- Global CSS: `3,624 B` against the `3.7 KiB` ceiling.
- Shared neutral runtime: `10,321 B`, unchanged and covered by the existing
  documented runtime exception.
- Neutral Web component CSS: `61,364 B` against the `64 KiB` ceiling.

Relative to the Batch 14 close, Layout adds `113 B`, Global remains inside its
permanent ceiling, shared runtime adds `0 B`, and the complete Web component CSS
adds `368 B`. The Layout exception records ordered-list containment, wrap-safe
labels, native focus, contrast-safe hover, reduced motion, and forced colors; it
does not silently change the rubric ceiling.

## Consequences

- Neutral Web, Webflow, and Shopify consume the same Breadcrumb and Global CSS;
  Shopify Liquid supplies route/merchant data and target services.
- Framework adapters may provide route records and controlled overlay services,
  but must preserve native Link/Button composition and one state owner per
  connected service.
- Figma maps anatomy, semantic modes, states, and tokens but owns no landmarks,
  routing, live regions, breakpoints, scroll services, or campaign lifecycle.
- SwiftUI and Compose use native hierarchy, masthead/navigation, and passive
  announcement facilities where available rather than reproducing DOM details.
- Breadcrumb collapse, Header action/service architecture, Announcement campaign
  behavior, and final visual treatment remain explicit human or target decisions.
