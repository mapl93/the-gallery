# 0016. Control And Overlay Contract Expansion

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

After Textarea, Select, and Card, the next contract expansion needed to cover two remaining gaps:

1. Native choice controls that should preserve browser behavior.
2. Overlay components that require target-agnostic interaction requirements, not only CSS selectors.

The selected order was:

1. Checkbox.
2. Radio.
3. Modal.
4. Drawer.

## Decision

Add four component contracts:

```text
components/contracts/checkbox.contract.json
components/contracts/radio.contract.json
components/contracts/modal.contract.json
components/contracts/drawer.contract.json
```

The contract schema now also allows an optional `behavior` field. This field describes target-agnostic interaction requirements such as open state, dismissal, focus management, required ARIA semantics, and keyboard behavior.

## Checkbox And Radio

Checkbox and Radio are native form-control contracts. They capture:

- Root label wrapper.
- Native input control.
- Visible label text.
- Generated selected indicator.
- Default, checked, hover, and focus-visible states.
- Public token usage for color, typography, radius, motion, and easing.

The accessibility contract requires native inputs so adapters preserve expected keyboard, form, and assistive technology behavior.

## Modal And Drawer

Modal and Drawer are overlay contracts. They capture:

- Overlay/backdrop anatomy.
- Root panel or dialog anatomy.
- Header, body, footer, title, and close-control anatomy where applicable.
- Open/closed states.
- Drawer left placement variant.
- Behavior requirements for visibility, dialog semantics, focus management, and dismissal.

CSS remains the current web adapter. Behavior is intentionally described in the contract and must be implemented by the consuming target or adapter.

## Registry Corrections

The registry metadata was adjusted to match current CSS facts:

- Checkbox and Radio now declare the typography token they use.
- Modal now declares both `--easing-default` and `--easing-out`.
- Drawer now declares its left variant and the additional tokens used by its close control and transitions.

## Consequences

- The contract layer now validates nine components: Button, Input, Textarea, Select, Card, Checkbox, Radio, Modal, and Drawer.
- The schema can represent both static structure and interactive behavior without making CSS the only source of truth.
- Overlay behavior is now explicit for future React, Shopify, Figma, SwiftUI, and Compose adapters.

## Follow-Up Work

- Decide whether contracts remain hand-authored metadata, become generation source, or become a hybrid of both.
- Add contract metadata to the docs UI once enough components are covered.
- Use Toast, Accordion, Tabs, or Popover next to further test interactive behavior patterns.
