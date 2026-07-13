# 0087. Shared Exhibit–Studio Renderer

Status: Accepted

Date: 2026-07-13

## Context

Every registry component has a contract, Studio presentation metadata, and a
registered Studio renderer. Exhibit still promoted the first `Preview` block
from canonical MDX into its artwork pedestal, while Studio rendered a separate
React fixture. The two paths could therefore drift in content, markup,
interaction, dimensions, and responsive behavior even when both consumed
canonical component CSS.

The divergence was visible in Commission Form, Maker's Mark, Ceramics Glossary,
Coming Soon / Password, and Review Toolbar. It was systemic rather than specific
to those components.

## Decision

- Exhibit and Studio consume the same registered Studio renderer and the same
  Studio definition for every component that has both.
- The renderer owns the shared initial fixture, local interaction state,
  component markup, and canonical CSS classes.
- Studio adds the metadata-driven inspector around that renderer.
- Exhibit removes only the Studio page title and inspector from its artwork
  context. It does not substitute MDX markup, fixture content, state, styles, or
  behavior.
- The first canonical MDX `Preview` remains source and audit evidence. Exhibit
  uses it only as a fallback when a shared renderer is unavailable.
- The shared runtime does not promote Studio fixture content, Lucide choices,
  or site-only stage styles into component defaults or public API.
- Open product and target-runtime boundaries recorded in existing ADRs remain
  unchanged.

## Consequences

- Exhibit–Studio parity is structural by construction instead of a manual
  comparison between two implementations.
- A renderer interaction works in both modes because both modes mount the same
  implementation.
- Changes to a component fixture or initial configuration have one runtime
  owner.
- MDX keeps its documentation and audit role without becoming a second live
  component implementation.
- Visual certification still requires desktop and mobile browser evidence;
  shared rendering does not by itself prove contrast, overflow, or interaction
  quality.
