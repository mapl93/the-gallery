# 0017. Contract Docs And Interactive Expansion

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

Component contracts were validated source files, but they were not visible in the documentation site. That made the new architecture useful for agents and validation, but not yet part of The Gallery's product experience.

The next requested contract expansion order was:

1. Toast.
2. Tabs.
3. Accordion.
4. Popover.
5. Combobox.

This order tests live regions, tablist behavior, disclosure behavior, non-modal floating content, and custom searchable listbox behavior.

## Decision

Expose component contracts in the docs site and add five more interactive contracts:

```text
site/src/lib/contracts.ts
site/src/components/ContractSummary.tsx
components/contracts/toast.contract.json
components/contracts/tabs.contract.json
components/contracts/accordion.contract.json
components/contracts/popover.contract.json
components/contracts/combobox.contract.json
```

The docs site now auto-loads `components/contracts/*.contract.json` and renders a contract section on component pages that have a contract. The component list also marks components that already have a contract.

## Interactive Contracts

Toast captures:

- Feedback variants: info, success, error, warning.
- Visible state through `.is-visible`.
- Live region semantics and dismissal behavior.

Tabs captures:

- Tablist, tab, and panel anatomy.
- Selected tab and hidden panel states.
- Keyboard navigation and ARIA tab semantics.

Accordion captures:

- Item, trigger, icon, panel, and content anatomy.
- Expanded state driven by `aria-expanded`.
- Disclosure semantics and keyboard activation.

Popover captures:

- Non-modal floating panel anatomy.
- Open state through `.popover--open`.
- Trigger relationship, outside dismissal, Escape dismissal, and focus return behavior.

Combobox captures:

- Search input, listbox, option, highlighted, selected, and empty states.
- Combobox/listbox ARIA requirements.
- Filtering and keyboard navigation behavior.

## Select Versus Combobox

Select should remain the native finite-choice control. It is the right default when users choose from a short known list and do not need search.

Combobox is a custom input plus listbox pattern. Use it when users need typing, filtering, autocomplete, async results, or richer option matching. Because it replaces native select behavior, it needs a stronger behavior and accessibility contract.

## Consequences

- At the time of this decision, the contract layer validated fourteen components. Later contract expansions are tracked in follow-up ADRs.
- Contract metadata is visible in the docs site instead of living only as repo source.
- The docs can now communicate anatomy, variants, states, behavior, tokens, accessibility, and adapter status from the source contract.
- Interactive behavior requirements are explicit before target-specific React, Shopify, Figma, SwiftUI, or Compose adapters are built.

## Follow-Up Work

- Decide whether contracts remain hand-authored metadata, become generation source, or become a hybrid of both.
- Add target-specific install/copy guidance from contract adapter metadata.
- Continue contract expansion into remaining high-behavior components.
