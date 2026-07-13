# 0071. Tooltip, Accordion, Tabs, And Breadcrumb Semantic Studios

Status: Accepted

Date: 2026-07-12

## Context

Tooltip, Accordion, Tabs, and Breadcrumb had canonical CSS and structural
contracts, but no reviewed semantic property surface or interactive Studio.
Their repeated content also creates a risk of promoting site fixtures, labels,
or item counts into target-agnostic component API.

## Decision

- Tooltip exposes required short `label` text mapped to `aria-label`. Its
  content remains non-interactive and appears on hover or keyboard focus.
- Accordion exposes `expanded` for an individual item through
  `aria-expanded`. Item count, labels, content, and single-open or multi-open
  group coordination remain consumer-owned composition and behavior.
- Tabs exposes `selected` for an individual tab through `aria-selected`. The
  containing set must coordinate one selected tab, linked panels, focus, and
  keyboard navigation. Studio tab labels and panel content remain fixtures.
- Breadcrumb exposes its navigation landmark `label` and required
  `currentLabel`. Intermediate links and hierarchy remain consumer-owned.
- Studio renders canonical CSS and accessible target markup. Lucide supplies
  the site-only Accordion chevron without becoming a contract dependency.
- Studio presents one representative composition for each component and only
  exposes existing contract-declared public tokens.
- No new public component tokens, variants, item models, or adapter behavior
  are introduced.

## Consequences

- Four additional Layout components have validated semantic property coverage
  and interactive Studios.
- Repeated-item components preserve a small semantic API without freezing
  fixture content into the design-system contract.
- Accordion and Tabs remain explicit that a target adapter or consumer owns
  group coordination and keyboard behavior beyond canonical CSS.
- All four contracts remain `pilot` until owner review and the applicable
  neutral-web certification gates are complete.
