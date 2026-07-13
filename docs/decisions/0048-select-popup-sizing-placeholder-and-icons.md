# 0048. Select Popup Sizing, Placeholder, and Icons

Status: Accepted

Date: 2026-07-12

## Context

Human review of the custom Select found three remaining presentation problems:
the option panel inherited a narrow trigger width and compromised label
legibility, the initial prompt appeared as a disabled option, and the chevron
and selected check did not use the accepted icon language.

## Decision

- Select is intrinsic when its consumer does not define a width. An explicit
  width on `.select` remains authoritative and the trigger stretches to it.
- The listbox owns its width independently. It is at least as wide as the
  trigger, grows to the option labels, and is capped to a viewport-safe maximum.
- The popup aligns to the trigger start by default and aligns to its end when
  start alignment would overflow the viewport.
- An initial prompt is represented by a selected, hidden, empty-value native
  option. It can label the closed trigger but is absent from the custom listbox
  and is not a disabled choice.
- The canonical trigger indicator uses Lucide ChevronDown geometry and the
  selected-option indicator uses Lucide Check geometry.
- Studio renders the named `lucide-react` components. Shared target-agnostic
  JavaScript emits equivalent SVG geometry without adding a runtime icon-library
  dependency or exposing Lucide names as semantic component properties.

## Consequences

- Compact Select triggers no longer force compact, hard-to-read option panels.
- Consumers may set any supported CSS width on `.select` without a new semantic
  property or Select-specific size variant.
- Placeholder text cannot be selected from the open listbox.
- ADR 0037 remains the rule for Studio icon catalogues; this decision adds a
  reviewed canonical-icon exception for Select's fixed structural indicators.
