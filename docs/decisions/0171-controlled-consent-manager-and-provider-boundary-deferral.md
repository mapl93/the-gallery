# 0171. Controlled Consent Manager And Provider Boundary Deferral

Follow-up: ADR 0226 records the owner's selection of the controlled Consent
Manager direction, in-flow first layer, canonical Modal/choice composition,
explicit requests, controlled state and target/provider boundary. The deferred
identity and composition choices below are superseded; the historical baseline
and evidence remain useful.

Status: Accepted

Date: 2026-07-16

## Context

G9 Cookie Consent entered refinement with three incompatible identities. The
registry promises a GDPR consent banner with a preferences modal, the contract
describes a dismissible notice with generic actions and optional preference
layout, and the shared documentation renderer implements an inline explanatory
panel with no categories, controls, persistence or modal behavior.

The canonical CSS hides the fixed banner only by translating it below the
viewport. Attribute-only visibility therefore does not guarantee that its link
and Buttons leave the keyboard order or accessibility tree. Studio avoids that
problem by unmounting the fixture, so the renderer and source contract do not
demonstrate the same lifecycle. Fixed viewport placement can also obscure a
focused page control unless the surrounding product reserves space or adopts a
complete modal model.

A consent mechanism is not only a visual component. Its validity depends on
target policy, jurisdiction, disclosure, meaningful accept/reject/customize
choices, current values, persistence, resource blocking and withdrawal. The
neutral component cannot infer those responsibilities, while Shopify already
provides authoritative customer-privacy state and mutation APIs.

Choosing between a passive notice, a controlled consent manager and a target-
only provider recipe changes G9's identity, dependency graph, public events,
state and first-layer modality. That is an owner architecture/product decision,
not a CSS-only refinement.

## Decision

- G9 remains `pilot` at contract version `0.2.0` until the owner selects its
  identity and first-layer mode.
- No contract, registry, canonical CSS, renderer, Studio metadata, Shopify
  adapter or generated target output changes in this decision.
- The recommended direction is a controlled Consent Manager composition
  profile. The Gallery would own a localized named first layer, semantic
  accept/reject/customize action regions, pending/result presentation and
  canonical composition rules.
- The target remains the only owner of jurisdiction, policy copy, lawful
  qualification, category records/defaults, current consent, persistence,
  processing gates, provider integration, errors, withdrawal and audit evidence.
- Consent state is controlled-only. The neutral component does not set/read
  cookies or storage, block resources, call providers, geolocate visitors or
  infer acceptance from dismissal, silence, scrolling or continued use.
- Preferences, if retained in the neutral profile, compose canonical Modal and
  accepted canonical Checkbox/Switch-like controls. G9 does not recreate
  dialog focus management, Button behavior or form-control semantics.
- A non-modal first layer needs an accepted page-reservation or equivalent
  focus-not-obscured policy. A modal first layer or preference surface needs the
  complete canonical Modal lifecycle, including naming, initial focus,
  containment, Escape policy, inert background and focus restoration.
- Hidden/closed content must be omitted, natively hidden or equivalently inert.
  Transform-only positioning is not an accepted visibility mechanism.
- Accept, reject and customize requests must be explicit contract semantics if
  G9 retains the word Consent. A generic actions slot or dismiss request cannot
  be the sole consent model.
- Two alternatives remain supported pending owner input: rename G9 to passive
  Cookie Notice and remove consent/preference claims, or remove the neutral G9
  API and publish target/provider-specific composition recipes.
- Existing Mobile/Desktop captures remain before-only evidence. No evidence
  server or browser is needed for this decision-only batch.
- No `stable` promotion or human visual approval is implied.

## External Evidence

- EDPB consent guidance establishes freely given, specific, informed,
  unambiguous and withdrawable choice as a policy/legal boundary rather than a
  visual-banner property.
- The EDPB Cookie Banner Taskforce examines positive action, reject access,
  preselected choices and misleading presentation.
- ICO guidance states that silence/inactivity is not consent, rejection should
  be as easy as acceptance and first-layer choices should expose meaningful
  accept/reject/customize paths.
- WCAG 2.4.11 identifies sticky cookie banners as a focus-obscuring risk and
  recognizes modality or page-layout reservation as possible mitigations.
- The HTML `hidden` state removes content from rendering when it is no longer
  relevant; moving a focusable subtree offscreen is not the same lifecycle.
- APG Modal Dialog and the HTML `dialog` technique require a named, focus-
  managed modal lifecycle that the current `.cookie-preferences` layout lacks.
- Open UI converges on Button, Dialog, Checkbox and Switch primitives but does
  not define a universal Cookie Consent policy component.
- Radix separates Dialog/Alert Dialog composition and focus behavior rather
  than embedding a provider or legal-consent engine.
- Shopify Customer Privacy APIs own banner eligibility, region, current visitor
  consent, allowed processing and consent mutation for platform categories.

These sources constrain truthful semantics and accessibility. They do not
select one universal category set, policy text, placement, provider, first-
layer modality or visual direction for The Gallery.

## Recommended API Boundary After Approval

The candidate neutral surface is deliberately semantic and controlled:

- required localized `title`, `description` and real policy-link composition;
- controlled `open`, `preferencesOpen`, `pending` and result presentation;
- explicit accept, reject, customize, save and close requests where the
  accepted target policy permits them;
- target-supplied current category records and values composed through
  canonical controls; and
- canonical Modal, Button, Link and status/error dependencies.

Cookie names, storage keys, provider SDK methods, geolocation, jurisdiction
enums, policy versions, expiry durations, category ids, z-index, pixel spacing,
Button order, modal mechanics, analytics and legal copy remain target facts or
private composition. They are not portable visual properties.

No uncontrolled default is valid. A target convenience adapter must project
authoritative state into the same controlled profile rather than create a
second consent owner.

## Performance

G9's current CSS slice is `1,918 B` raw / `763 B` deterministic gzip. Marketing
is `20,126 B` raw / `4,119 B` gzip against its permanent `4,198 B` ceiling,
leaving `79 B`. Generated Neutral Web component CSS is `67,697 B` gzip against
`65,536 B`, retaining an existing `2,161 B` program gap. Shared runtime is
`10,492 B` gzip against `8,192 B`, retaining an existing `2,300 B` gap.

G9 adds `0 B` neutral provider/runtime code today. The recommended controlled
profile must preserve zero provider, storage and network work in the base and
recover CSS through replacement/removal of duplicated preference, motion and
physical-layout rules rather than raising the Marketing ceiling.

## Open Owner Choice

Choose one identity:

1. controlled Consent Manager composition profile — recommended;
2. passive Cookie Notice with policy disclosure and optional dismiss request;
   or
3. target-only provider recipe with no neutral G9 component.

Then select:

- non-modal reserved region, canonical modal, Sheet or target-specific first
  layer;
- whether preferences are canonical Modal plus approved choice controls, an
  external target slot, or absent from the neutral layer;
- required accept/reject/customize/save/close requests and their equal-
  prominence policy;
- controlled pending/saved/error/retry/reopen/withdrawal ownership;
- required title, policy link and accessible-name/invalid-content policy; and
- the first v1 target/provider, with Shopify Customer Privacy recommended as
  the first platform-specific certification candidate.

Final hierarchy, surface, placement, action order, equal prominence,
preference presentation, typography and G9-specific Figma evidence remain
separate visual/product decisions after the identity is accepted.

## Target Boundary

- Neutral Web receives controlled presentation and request events only; it adds
  no provider, policy, persistence, blocking or network engine.
- Shopify consumes its authoritative Customer Privacy state and mutation APIs;
  it must not invent cookies, categories, region or persistence in Liquid/CSS.
- React and Angular remain thin controlled views over the selected provider.
- Webflow and Framer require provider integration or an explicitly notice-only
  composition; editor toggles cannot claim persisted consent.
- Figma supplies static named decision-state examples only and cannot prove
  legal validity, persistence or processing gates.
- SwiftUI and Compose require separate platform privacy/tracking contracts;
  web-cookie categories do not transfer automatically.

## Consequences

- The legal/provider boundary remains visible instead of being hidden behind a
  polished but incomplete banner.
- G9 cannot be reported ready for human stability review yet.
- The dossier and audit provide an executable implementation/certification
  register after owner input.
- Work can continue to later components without inventing categories,
  persistence, local storage or duplicated dialog behavior.

## Evidence Considered

- <https://www.edpb.europa.eu/documents/guideline/guidelines-052020-on-consent-under-regulation-2016679_es>
- <https://www.edpb.europa.eu/documents/task-force-report/report-of-the-work-undertaken-by-the-cookie-banner-taskforce_en>
- <https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guidance-on-the-use-of-storage-and-access-technologies/how-do-we-manage-consent-in-practice/>
- <https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum>
- <https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute>
- <https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/>
- <https://www.w3.org/WAI/WCAG22/Techniques/html/H102>
- <https://open-ui.org/research/component-matrix/>
- <https://open-ui.org/components/switch.explainer/>
- <https://www.radix-ui.com/primitives/docs/components/alert-dialog>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/2025-10/target-apis/account-apis/customer-privacy-api>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/targets/footer>
