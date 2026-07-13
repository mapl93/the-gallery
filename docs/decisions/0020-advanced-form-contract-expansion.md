# 0020. Advanced Form Contract Expansion

Status: Accepted Initial Implementation

Date: 2026-05-23

## Context

After layout interaction contracts, the next useful block was advanced form controls:

1. Switch / Toggle.
2. Slider / Range.
3. Tags Input.
4. Segmented Control.
5. File Upload / Dropzone.
6. Color Picker / Swatch.
7. Number Input.

These components test native form behavior, hidden inputs, generated browser controls, file handling, multiple values, and target-owned interaction logic.

## Decision

Add seven more validated component contracts:

```text
components/contracts/switch.contract.json
components/contracts/slider.contract.json
components/contracts/color-picker.contract.json
components/contracts/file-upload.contract.json
components/contracts/tags-input.contract.json
components/contracts/segmented-control.contract.json
components/contracts/number-input.contract.json
```

Also align registry token metadata and MDX API references for these components.

## Contract Notes

Switch captures:

- Native checkbox-backed switch anatomy.
- Small, default, and large sizes.
- Checked, focus-visible, and disabled states.
- Native checkbox and optional `role="switch"` synchronization requirements.

Slider captures:

- Single-value `.slider` and dual-handle `.range-slider` structures.
- Native range input and generated thumb styling.
- Disabled state, value display, range fill, and keyboard requirements.

Color Picker captures:

- Radio-backed color swatch group anatomy.
- Small, default, and large swatch sizes.
- Selected, hover, checkmark, and focus-visible states.
- Accessible color-name requirements.

File Upload captures:

- Native file input dropzone anatomy.
- Hover and drag-over states.
- Upload instructions, hints, previews, and thumbnails.
- File validation, drag-and-drop, and preview behavior requirements.

Tags Input captures:

- Text entry field and removable selected-value chips.
- Focus-within and remove-hover states.
- Tag creation, duplicate validation, and keyboard removal behavior.
- Dependency on the Tag primitive.

Segmented Control captures:

- Radio-backed segmented choice group anatomy.
- Checked, hover, and focus-visible states.
- Mutually exclusive radio-group semantics.

Number Input captures:

- Native number input plus increment/decrement buttons.
- Button hover and disabled states.
- Hidden browser spin buttons.
- Min, max, step, and value synchronization behavior.

## Consequences

- The contract layer now validates thirty-one components.
- The advanced form family now has explicit target-agnostic behavior requirements before React, Shopify, Figma, SwiftUI, or Compose adapters are built.
- Slider documentation now reflects the actual CSS API: `.slider` for single-value sliders and `.range-slider` for dual-handle ranges.
- Segmented Control documentation now reflects the actual CSS adapter selector: `.segmented`.
- Color Picker now exposes existing `color-swatch` size modifiers in the registry and contract layer.

## Follow-Up Work

- Form infrastructure expansion was completed in `docs/decisions/0021-form-infrastructure-contract-expansion.md`.
- Start target-specific adapter guidance that uses contract metadata, especially for Shopify and React.
- Decide whether contracts remain hand-authored validation metadata, become generation source, or become a hybrid.
