# 0019. Layout Interaction Contract Expansion

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

After formalizing tooltip, menu, command, and date-picker behavior, the next useful contract block was the remaining layout interaction primitives:

1. Hover Card.
2. Steps / Stepper.
3. Carousel / Slider.
4. Scroll Area.
5. Lightbox.

These components are still web-first in the current implementation, but they carry behavior that needs to survive across Shopify, React, Figma, SwiftUI, Compose, and future adapters.

## Decision

Add five more validated component contracts:

```text
components/contracts/hover-card.contract.json
components/contracts/steps.contract.json
components/contracts/carousel.contract.json
components/contracts/scroll-area.contract.json
components/contracts/lightbox.contract.json
```

Also align registry token metadata and MDX API references for these components.

## Contract Notes

Hover Card captures:

- Root and floating content anatomy.
- Hidden, hover, and focus-within states.
- Supplemental-content requirements and a Popover fallback for richer interactions.

Steps captures:

- Root, item, generated connector, indicator, title, and label anatomy.
- Horizontal and vertical variants.
- Active, completed, done, and first-item connector states.
- Ordered progress semantics and `aria-current="step"` guidance.

Carousel captures:

- Root, track, slide, navigation, button, dots, and dot anatomy.
- Previous and next navigation placement.
- Disabled navigation and active dot states.
- Scroll-snap, pagination, keyboard navigation, and motion-control requirements.

Scroll Area captures:

- Native scroll region anatomy.
- Progressive WebKit scrollbar, track, and thumb styling.
- Keyboard-accessible scroll-region requirements.

Lightbox captures:

- Modal image viewer anatomy: content, image, close, navigation, counter, and caption.
- Open and closed states.
- Modal semantics, focus trapping, dismissal, image navigation, and synchronized caption/counter requirements.

## Consequences

- The contract layer now validates twenty-four components.
- The layout interaction family is substantially more explicit before target adapters are built.
- Steps currently documents both `completed` and `done` CSS states. They represent similar completed-progress semantics and can be unified later if the CSS API is cleaned up.
- Carousel and Lightbox now make motion, navigation, and accessibility expectations explicit instead of hiding them inside docs prose.

## Follow-Up Work

- Continue contract expansion into remaining form and product components.
- Decide whether contracts remain hand-authored validation metadata, become generation source, or become a hybrid.
- Add target-specific install/copy guidance from contract adapter metadata.
