# 0139. Native Review Control Group And Target-Owned Result Lifecycle

Status: Accepted

Date: 2026-07-15

## Context

V8 Review Toolbar entered refinement as a responsive visual composition for one
ordering Select and one write-review action. ADR 0085 already kept option
inventory, filtering, URL state, result updates and write-review behavior
target-owned, but the implementation and formal source still disagreed:

- the root used `role="toolbar"` with two normal Tab stops and no roving focus,
  arrow navigation, Home/End behavior or orientation model;
- the Select child already owned an arrow-key listbox model;
- registry and contract declared no dependencies despite explicitly composing
  canonical Select and Button;
- responsive stacking followed the page viewport instead of the component's
  actual host width; and
- the wrapper assigned typography already owned by Select.

The historical component name and BEM class are useful visual identifiers, but
they do not authorize an incomplete ARIA composite widget.

## Decision

- `.review-toolbar` remains the historical class and component name, but its
  neutral web root is an optional labelled `group`, not an ARIA toolbar widget.
- The group preserves normal sequential Tab order. It adds no roving `tabindex`,
  arrow-key movement, Home/End behavior, orientation state or focus memory.
- A target may create a real toolbar only after selecting at least three
  appropriate controls and implementing the complete APG keyboard model without
  conflicting with child arrow-key behavior. That is a separate component or
  target decision.
- Registry and contract dependencies are reconciled to `select` and `button`.
  These edges describe canonical composition; both slots remain optional.
- When neither optional slot is supplied, targets omit the complete component
  instead of rendering an empty named group or decorative rule.
- Select owns visible label, native/enhanced value, current/default selection,
  options, disabled/validation state, popup behavior, native `change` and reset.
- Button or a native anchor owns action versus navigation semantics, activation,
  disabled/busy state and focus presentation.
- The target owns sort/filter meaning, URL state, loading, result count, empty
  and error states, focus retention, announcements and the write-review flow.
- The root becomes an inline-size container. Descendant controls stack and
  stretch when the root container is narrow; page viewport width is not the
  responsive source.
- The wrapper's typography assignment is removed. Select and Button remain the
  only typography, dimension, icon, surface and interaction owners.
- The structural border remains the sole public Review Toolbar token. The
  8/12/16px layout measures stay private composition and are not promoted into
  semantic API or a component token layer.
- Exhibit and Studio continue to mount one `ReviewsStudio` renderer, one Studio
  definition and one initial fixture. Docs-only local feedback demonstrates
  native event boundaries without claiming a result update or destination.
- Contract version advances to `0.3.0` and remains `pilot`.

## External Evidence

- WAI-ARIA APG defines toolbar as a composite widget with one Tab entry point,
  roving arrow navigation and recommends using it for groups of at least three
  controls. It warns against children that need the same arrow pair.
- WAI-ARIA 1.2 defines `group` as a logical collection of UI objects without
  creating a landmark or a composite keyboard model.
- HTML Select, Button and anchor semantics already provide native value, focus,
  activation and event behavior.
- Open UI Select research keeps option/value/popup anatomy in Select rather
  than its surrounding layout.
- Radix Toolbar implements the full roving-focus and arrow/Home/End model,
  confirming that toolbar is a behavior primitive rather than a styling name.
- Polaris keeps selection, default/current value, disabled state and `change`
  within the control. Rich filtering is a separate product surface.
- Shopify documents product reviews as a theme app-block use case and requires
  app blocks to adapt to their containing section.

These sources support group semantics, child ownership and host-responsive
layout. They do not select a review provider, options, result model or visual
identity for The Gallery.

## Performance

Review Toolbar adds no neutral listener, observer, timer, request, state store,
formatter, layout read, animation or asset. The existing Select progressive
enhancer remains independently owned child runtime. Studio state and feedback
are documentation-target behavior only.

The permanent Reviews family ceiling remains `3.7 KiB` (`3,788 B`) gzip, total
Neutral Web component CSS remains `64 KiB`, and shared runtime remains `8 KiB`.
Final measurements and existing program exceptions are recorded in Batch 54;
this decision raises no ceiling.

## Target Boundary

- Neutral Web is a labelled group plus canonical Select and Button/anchor.
- Shopify needs a selected review-provider theme app block for data, allowed
  controls, results, eligibility and write-review lifecycle. This decision does
  not authorize provider-free review Liquid.
- Webflow maps to native Select/action markup and external CMS/provider behavior.
- React and Angular may control the child Select or use its default, then handle
  native change/activation without a wrapper-owned duplicate state store.
- SwiftUI and Compose use target-native picker/menu and action controls in an
  adaptive stack with target-owned results.
- Current Figma references are generic Studio/Button frames. Component-specific
  Review Toolbar artwork remains a human visual target after browser review.

## Open Human And Product Boundary

This decision intentionally does not approve:

- final spacing, border treatment, control widths, emphasis or inline/stacked
  breakpoint as visual stability decisions;
- sort/filter option inventory, labels, default selection or URL model;
- provider, data schema, loading, counts, empty/error results, announcements,
  focus retention or moderation;
- write-review navigation, inline form, overlay, eligibility or authentication;
- dedicated Shopify, Figma, React, Angular, SwiftUI or Compose implementation;
  or
- promotion from `pilot` to `stable`.

## Consequences

- Assistive technology receives a truthful named group and two normal child
  controls rather than an incomplete composite widget.
- Select can use its full native/enhanced keyboard model without a parent arrow
  conflict.
- The formal graph now describes actual canonical composition.
- A narrow host stacks correctly even inside a wide browser viewport.
- Targets can add provider workflows without changing the neutral layout or
  duplicating child state and behavior.
- Human visual review, target policy and explicit stability approval remain
  required.
