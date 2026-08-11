# G9 Consent Manager Refinement Dossier

Status: `human-review-ready`

Date: 2026-07-20

Target reviewed: Neutral Web, shared Exhibit/Studio composition, Shopify
Customer Privacy and future-target boundaries

Contract: `components/contracts/cookie-consent.contract.json`

## Recommendation And Accepted Direction

Implement the owner's accepted G9-A direction: a controlled Consent Manager,
not a passive Cookie Notice and not a neutral compliance/provider engine. The
initial surface is a named non-modal section in normal flow with a real policy
Link and explicit Accept, Reject and Customize requests. Detailed preferences
compose canonical Modal and canonical choice controls. Every consent fact and
side effect remains target-owned.

The public name changes to Consent Manager. The `cookie-consent` slug remains a
pre-v1 migration identifier only; there is one implementation.

## Purpose, Uses And Limits

Consent Manager may:

- present target-approved localized decision copy and policy navigation;
- provide comparably accessible Accept, Reject and Customize requests;
- project controlled open, preferences-open and busy state;
- compose target categories/current values inside canonical Modal and choice
  controls; and
- host target-owned pending/result/error/retry feedback.

It does not determine jurisdiction, legal basis, eligible visitors, category
inventory/defaults, required technologies, provider payloads, persistence,
processing gates, resource blocking, withdrawal, analytics or audit evidence.
It never sets/reads cookies or storage, calls a provider, geolocates, or claims
that its presence makes a site compliant.

## Research Summary

### Web and accessibility standards

- [APG Modal Dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
  requires a named modal, focus entry, contained Tab/Shift+Tab, Escape, a
  visible close path and logical focus restoration. Preferences therefore use
  canonical Modal instead of `.cookie-preferences` overlay fragments.
- [HTML dialog](https://html.spec.whatwg.org/multipage/interactive-elements.html#the-dialog-element)
  supplies a native modal building block but no consent categories or provider
  service.
- [WCAG Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html)
  makes fixed/sticky obstruction a page-integration responsibility. Canonical
  G9 remains in flow and exposes no placement property.
- Native `hidden`/omission removes closed content from interaction. Moving a
  focusable tree below the viewport does not.

### Privacy and target evidence

- The ICO's [cookies and similar technologies guidance](https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/)
  requires clear positive action and easy enable/disable access for
  non-essential use. Presentation alone cannot establish valid consent.
- Shopify's [Customer Privacy API](https://shopify.dev/docs/api/customer-privacy)
  owns banner eligibility, current purpose-level consent, allowed processing
  and tracking-consent mutation. A Shopify adapter must project that authority
  instead of inventing cookies, geography or state.

### Mature systems

Open UI, Radix and Polaris converge on constituent Button, Link, Dialog/Modal
and Checkbox/Switch primitives rather than one universal cookie-consent widget.
The Gallery follows the same composition boundary without copying React,
Shopify or provider types into neutral source.

## Owner Reference Analysis

No corrected G9-specific visual reference was supplied. The registered Figma
nodes trace the generic Studio pilot, not a consent hierarchy, equal decision
paths, preference Modal, category density or target placement. Existing
Mobile/Desktop parity captures remain baseline-only evidence of the old fixed
banner and show why visual review is still required.

The implementation direction is semantic rather than aesthetic: a bordered
in-flow surface, visible title, readable policy link, three equal-style action
buttons and a canonical preferences Modal. Final typography, surface, density,
action order/wrapping and fixture category treatment remain owner-review items.

## Baseline Contradictions Removed

- “Cookie Consent” described three incompatible product identities.
- Fixed bottom placement and transform-only hiding could obscure focus and
  retain invisible interactive descendants.
- Generic actions could not distinguish Accept, Reject or Customize.
- Dismiss was visually presented as a decision although documentation denied
  that it meant consent.
- The preference shell was inline text with no Modal, form controls, current
  values, save request or focus lifecycle.
- English policy/action/name copy and a placeholder destination lived outside
  the public contract.
- CSS duplicated Link focus, preference text and physical responsive rules.
- Shopify had copied CSS but no authoritative Customer Privacy integration.

## Anatomy And Canonical Dependencies

| Part | Required | Owner |
| --- | --- | --- |
| Named first-layer section | yes | Consent Manager layout + target state |
| Visible title and description | yes | Target localized content |
| Real policy Link | yes | Canonical Link + target route |
| Accept / Reject / Customize | yes | Canonical Button + target callbacks |
| Feedback | optional | Target status/error/retry composition |
| Preferences surface | yes | Canonical Modal lifecycle |
| Categories/current values | yes when customized | Target slot + canonical choice controls |
| Save | yes | Canonical Button + target callback |

Registry dependencies become Button, Link, Modal and Checkbox. Modal retains
its own Close Button dependency. G9 CSS only arranges these parts.

## State Matrix

| State | Rendering and behavior |
| --- | --- |
| Closed | Root and preferences omitted/natively hidden; no focusable copy |
| Open | Valid named first layer in normal flow |
| Busy | `aria-busy`; decision and save requests disabled; target feedback optional |
| Preferences open | Canonical Modal with current target values |
| Invalid | Missing required copy, real link, labels or preference composition omits the candidate |

Pending, success, failure and retry are not CSS variants. They are real target
results supplied through `feedback`. Reopen and withdrawal are target entry
points outside the transient component.

## Public API And Controlled Ownership

Required localized content: `title`, `description`, `policyLabel`,
`policyHref`, `acceptLabel`, `rejectLabel`, `customizeLabel`,
`preferencesTitle`, `preferences`, `closePreferencesLabel`, and `saveLabel`.
Optional content is `preferencesDescription` and `feedback`. Controlled state
is `open`, `preferencesOpen`, and `busy`.

Native Button activations/callbacks are Accept, Reject, Customize, Save and
Close requests. They are outputs, not consent values. The target reconciles
them against its authoritative provider and then projects new state. There is
no uncontrolled default or neutral storage.

## Token And CSS Audit

- Fixed position, z-index, shadow, transition and viewport media query are
  removed from G9.
- Logical inline/block properties and flex/grid wrapping respond to the actual
  host container.
- Hardcoded `8/16/480/1200px`, derived `87.5%` type and hardcoded weight are
  replaced by canonical color, radius, typography and spacing tokens.
- Private basis/minimum values express internal wrapping composition and are
  not public configuration.
- Link, Button, Modal and Checkbox visual states remain dependency-owned.
- No motion branch is needed because G9 itself has no animation.

## Accessibility

- The first layer is a named section, not a modal, alert or live region.
- All three first-layer choices are native Buttons with equal keyboard access
  and visible canonical focus.
- The policy is a real keyboard-reachable Link.
- Closed composition leaves no tabbable or accessibility-tree residue.
- Preferences use the complete canonical Modal focus model and visible Close
  Button; structured category content omits a flattened dialog description.
- Categories are labeled canonical controls with target-owned checked/disabled
  values. Color and position are not their only state cues.
- Target feedback chooses status/alert/error semantics only after a real result.

## Responsive And Content Evidence

Final artifacts live under
`output/playwright/refinement-marketing/consent-manager-0226/`:

- Exhibit and Studio Mobile, Tablet, Desktop and XL stage captures;
- controlled Busy, Closed and Preferences Open captures;
- dark, forced-colors, Arabic RTL with reduced motion, and effective 200% text;
- invalid required title and placeholder-only policy destination omission;
- required preferences enforced by the contract/Studio schema and renderer
  guard (the required Studio slot cannot be switched off);
- Accept, Reject, Customize, Save and Checkbox target simulation;
- initial title focus, contained Tab/Shift+Tab, Escape and Customize focus
  restoration through canonical Modal;
- closed state with zero G9 focusable descendants;
- unchanged cookies, local/session storage and zero action-triggered network
  requests; and
- exact normalized Exhibit/Studio DOM parity (`1,028` characters each), one tab,
  zero console errors and zero document/host overflow at `390`, `768`, `1,440`
  and `1,920` CSS pixels.

The existing `output/playwright/parity/marketing/cookie-consent-*.png` captures
remain the before evidence for the fixed banner. Final density, action wrapping
and preference hierarchy remain human-review judgments.

## Runtime And Performance

Neutral G9 adds no provider, storage, network, observer, timer or event service.
The shared React artwork callbacks are documentation target simulation, not
base runtime. The final CSS slice is `3,412 B` raw / `903 B` deterministic gzip.
Marketing changes from `5,073 B` to `5,162 B` gzip and generated Neutral Web
component CSS from `69,242 B` to `69,401 B`. Fixed ceilings are not raised; both
program gaps remain documented.

## Target Translation

| Target | Translation | Status |
| --- | --- | --- |
| Neutral Web | Semantic HTML/CSS composition plus target-bound native handlers | Human-review-ready candidate |
| Shopify | Project Customer Privacy eligibility, consent, allowed processing and mutation results | Planned; surface not selected |
| React / Angular | Thin controlled props/callbacks over same composition | Planned |
| Webflow / Framer | Target/provider script binds requests and controlled state | Planned |
| Figma | Closed/Open/Busy/Preferences visual states only | Planned; no legal claim |
| SwiftUI / Compose | Native privacy-service state, modal and choice controls | Planned |

## Risks And Human Questions

- Final visual hierarchy, equal action treatment, order, density and Modal
  presentation require owner review.
- A first Shopify/provider surface remains an explicit target architecture
  decision; copied CSS is intentionally not counted as ready.
- Every consumer still needs legal review and a tested provider/resource-blocking
  integration; the component cannot certify that system.
- Fixed/sticky target hosts need their own safe-area, collision and
  focus-not-obscured evidence.

## Certification Exit Criteria

- Registry, contract, CSS, renderer, Studio, MDX and adapters agree on one
  Consent Manager identity and canonical dependencies.
- Exhibit and Studio share exact renderer, fixture, Modal and Checkbox markup.
- Request/control/focus/closed-state assertions and the complete viewport/mode
  evidence matrix pass with no console errors.
- Performance and resource cleanup gates pass or retain documented fixed-budget
  gaps; `site/dist` remains untouched.
- Human review occurs before any `stable` promotion.
