# 0172. Social Proof Canonical Toast Profile And Target Truth

Status: Accepted

Date: 2026-07-16

Superseded in part by ADR 0253, which retains G10 as a v1 Toast profile and
accepts target-owned lifecycle plus Shopify omission until provider proof.

## Context

G10 Social Proof Notifications entered refinement as a fixed bottom-left
notification with target-supplied message, time, image and optional close
button. Although the contract called it passive and truthful, its CSS
independently owned surface, radius, shadow, width, z-index, physical viewport
placement, transform visibility, transition and close geometry.

B4 Toast already owns one flow-sized passive notification item, semantic hidden
state, content, optional safe action, canonical Close Button, visual feedback
and optional announcement priority. ADR 0098 deliberately leaves viewport,
queue, duration, pause/resume, Escape, persistence and removal to targets. G10's
parallel implementation therefore duplicated an accepted canonical component
and retained a weaker transform-only hidden state.

The shared docs renderer also assigned `role=status`, `aria-live=polite` and
`aria-atomic=true` to all Social Proof fixtures, including static initial
content. Commercial background activity is not user-action feedback or an
important system status and should not become an automatic screen-reader
interruption. Blank message and dismiss-label values were not validated, and
the fixture paired a claimed ceramic purchase with an unrelated artist photo.

Commercial truth cannot be established by the visual base. A “recent purchase”
requires an authoritative event, qualification, freshness/expiry, privacy and
publication policy. Purchaser, location, product and time combinations can be
identifying even when a full name is omitted. Shopify additionally prohibits
false/misleading claims and incomplete app-like theme features that need API
access.

## Decision

1. G10 remains a separately discoverable `pilot` Marketing component, but its
   implementation becomes a profile of canonical Toast rather than a second
   notification primitive.
2. Registry and contract declare Toast as G10's canonical dependency. Toast
   continues to compose Button and Close Button transitively.
3. The root uses `.toast.toast--info.social-proof`; content uses canonical
   `.toast__content`, message uses `.toast__message`, and optional dismissal uses
   `.close-button.toast__close` plus the G10 hook.
4. G10 CSS retains only profile-owned media and time presentation plus an
   explicit defensive mapping of Toast's semantic hidden/visible state. Fixed
   position, z-index, viewport width, surface, root radius, shadow, padding,
   transition and duplicated close behavior are removed.
5. `visible` projects through canonical `.is-visible` and `aria-hidden`. Targets
   may unmount instead. Transform-only hidden content is not accepted.
6. A non-empty trimmed `message` is a render precondition. Blank or missing
   message omits the complete root; G10 never generates fallback commercial
   copy.
7. Optional `time` is trimmed and omitted when blank. Targets own its source,
   formatting, freshness and expiry; the base does not calculate relative time.
8. Optional media must be relevant. Its alt is empty when the complete message
   already supplies the meaning and informative only when the image adds
   content. Image delivery/loading/failure remain target-owned.
9. Optional dismissal renders only when both the action and a non-empty localized
   label are supplied. It consumes canonical Close Button and has no hardcoded
   English fallback.
10. Static/default Social Proof has no `status`, `alert`, `aria-live`, landmark
    or focus movement. Marketing content never receives an assertive mode.
11. The target is solely responsible for truth, source, qualification,
    freshness, expiry, privacy, anonymisation/consent, localization,
    publication, provider calls, analytics and withdrawal.
12. Target Toast services own placement, safe areas, global overlay
    coordination, queue, deduplication, rate, recurrence, duration, pause,
    stop/hide/frequency control, focus/window pause, Escape, persistence and
    removal. G10 adds no neutral runtime.
13. Shopify remains planned. No theme Liquid, merchant-entered “live” purchase
    copy, fake dataset, order/customer query or simulated client queue is added.
    An accepted app/provider/privacy architecture or omission is required.
14. Exhibit and Studio continue to share one registered renderer and fixture.
    The fixture is explicitly Example-only, uses relevant product media and is
    never provider evidence.
15. Contract version advances to `0.3.0` but remains `pilot`. Automated success
    does not imply commercial approval, human visual approval or `stable`.

## API And Composition Boundary

The retained G10 surface is:

- required trimmed target-authored `message`;
- optional trimmed target-formatted `time`;
- optional relevant `image` and `imageAlt` composition;
- optional paired `dismissAction` and non-empty localized `dismissLabel`; and
- controlled `visible=false` presentation through Toast state.

Purchaser fields, city, product id, event type, timestamp parsing, relative-time
formatting, truth/verified flag, privacy/consent flag, source URL, order API,
provider, polling, queue, cadence, duration, delay, repeat, placement, z-index,
motion distance, surface, shadow, media pixels and close geometry are not G10
properties.

A `verified` boolean would only move an unverifiable claim into the public API;
it is intentionally excluded. Targets omit invalid, unavailable, stale,
withdrawn or privacy-disallowed records before rendering.

## External Evidence

- WAI-ARIA defines `status` as advisory information communicated through an
  implicit polite atomic live region without moving focus. Presence alone does
  not make marketing content a meaningful status.
- APG Alert describes brief important dynamic messages and warns about frequent
  interruption and automatic disappearance; Social Proof is not an Alert.
- WCAG 2.2.2 requires user control over automatically updating content shown
  beside other content; auto-updating has no five-second exception.
- HTML `hidden` establishes semantic non-rendering; moving a focusable subtree
  offscreen is not the same lifecycle.
- Open UI research describes Toast/Notification as brief, non-critical and
  non-interruptive, often with corner placement/timing.
- Radix separates Provider, Viewport, Root, content, safe action and close;
  provider-level duration/pause/queue concerns do not belong to one item.
- Shopify's App Home Toast API is short action feedback, not an origin of
  cross-customer purchase facts.
- Shopify Theme Store requirements prohibit false/misleading data and incomplete
  app-like theme features dependent on API access.
- The FTC dark-pattern report explicitly classifies false activity messages as
  deceptive social proof.
- EDPB and ICO guidance distinguish true anonymisation from pseudonymisation and
  note that location or combined attributes may enable identification.

These sources establish composition, announcement, truth and privacy boundaries.
They do not approve a universal commercial event, safe disclosure granularity,
freshness window, queue policy, placement or final Gallery visual.

## Performance

The baseline G10 CSS slice measured `1,653 B` raw / `676 B` local level-9 gzip.
Marketing measured `20,126 B` raw / `4,120 B` gzip against its permanent
`4,198 B` ceiling. Generated Neutral Web component CSS measured `67,759 B` gzip
against `65,536 B`; shared runtime measured `10,501 B` gzip against `8,192 B`.

Canonical composition must reduce G10/Marketing CSS and retain `0 B` neutral
runtime, listeners, timers, observers, requests, provider SDKs and bundled
remote assets. It does not raise any ceiling. Final measurements are recorded
in the refinement audit after generated targets and evidence are validated.

## Target Translation

- Neutral Web applies G10 content hooks to canonical Toast and receives current
  controlled target data/state without a provider or live role.
- Shopify Theme Store omits G10 until an accepted app/provider/data/privacy
  architecture supplies truthful current records and target lifecycle.
- React and Angular render the same profile inside one application Toast
  provider; no second queue or timer is allowed.
- Webflow and Framer require a verified provider or use a static Example-only
  design fixture; editor copy cannot claim a live purchase.
- Figma maps static profile anatomy and named Example-only states but cannot
  prove truth, privacy, freshness, timing or persistence.
- SwiftUI and Compose may map to native snackbars/toast-like surfaces only when
  product/privacy policy permits the commercial event; DOM/provider mechanics
  are not copied.

## Deferred Owner And Target Decisions

Before a production target becomes ready, decide:

1. retain G10 as a discoverable Toast profile, deprecate to a Toast recipe or
   replace it with a persistent activity card/list;
2. permitted event types, contexts and target priority for v1;
3. authoritative source, qualification, freshness, expiry, stale/error and
   withdrawal rules;
4. privacy/anonymisation/consent policy for purchaser, location, product and
   time combinations;
5. queue, deduplication, rate, recurrence, placement, duration, pause/stop/hide,
   persistence and any exceptional announcement policy;
6. whether Shopify uses an app/provider integration or omits G10; and
7. final media/time/measure/close/placement treatment and corrected G10-specific
   Figma/reference evidence.

## Consequences

- G10 no longer competes with canonical Toast or carries its own viewport.
- Hidden items are semantically unavailable, required content is strict and
  optional dismissal is correctly named.
- Default marketing content is quieter for assistive technology and does not
  impersonate action feedback.
- The docs fixture is honest and visually relevant without becoming production
  data.
- Neutral Web can be fully refined/evidenced while Shopify and commercial truth
  policy remain deliberately unresolved.
- At this decision point G10 was `refined-decision-needed`; ADR 0253 later
  resolves that input and enters G10 into human review while retaining `pilot`.

## Evidence Considered

- <https://www.w3.org/TR/wai-aria-1.2/#status>
- <https://www.w3.org/WAI/ARIA/apg/patterns/alert/>
- <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- <https://html.spec.whatwg.org/multipage/interaction.html#the-hidden-attribute>
- <https://open-ui.org/components/toast.research/>
- <https://www.radix-ui.com/primitives/docs/components/toast>
- <https://shopify.dev/docs/api/app-home-ui-extension/latest/target-apis/utility-apis/toast-api>
- <https://shopify.dev/docs/storefronts/themes/store/requirements>
- <https://www.ftc.gov/system/files/ftc_gov/pdf/P214800%20Dark%20Patterns%20Report%209.14.2022%20-%20FINAL.pdf>
- <https://www.edpb.europa.eu/topics/ai-and-technology/anonymisationpseudonymisation_en>
- <https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/data-sharing/anonymisation/how-do-we-ensure-anonymisation-is-effective/>
