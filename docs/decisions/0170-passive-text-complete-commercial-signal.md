# ADR 0170: Passive text-complete commercial signal

- Status: Accepted
- Date: 2026-07-16
- Superseded in part by ADR 0252, which retains all four types and defines their
  target qualification boundaries.
- Components: Urgency Indicators (`G8`)
- Certification status: technical baseline retained; ADR 0252 resolves the
  architecture/product input; contract remains `pilot`

## Context

Urgency entered refinement as a passive line of text with Low Stock, Selling
Fast, Viewers and Recent Sale modifiers. The contract already required an
explicit variant and truthful target message, but the docs renderer retained a
runtime fallback to Low Stock and did not omit blank content. Anatomy mixed a
generated Low Stock pseudo-element, a generic Selling Fast SVG selector and a
Viewers `strong` selector that the string-only renderer never produced.

Canonical CSS animated the Low Stock dot and Selling Fast icon forever at a
`1.5s` cadence. Reduced-motion preference disabled that animation, but WCAG
2.2.2 independently requires automatically blinking content lasting more than
five seconds to offer pause/stop/hide unless essential. Decorative marketing
motion is not essential and does not justify adding controls/runtime.

Selling Fast also used the Error feedback family. Polaris reserves critical
attention for statuses requiring action and demonstrates Low Stock as compact
status content rather than a failure. Treating promotional velocity as Error
would conflate commerce copy with system feedback and intensify pressure beyond
the text.

The repository still leaves the commercial architecture open: which data and
thresholds prove each claim, how freshness is maintained, and which target owns
that source. Shopify Liquid exposes variant inventory facts, but inventory
quantity has different meaning when tracking is disabled; Viewers, Selling Fast
and Recent Sale need external authoritative data. Shopify Theme Store rules
also reject fictitious stock/viewer urgency.

## Decision

1. G8 is one passive, contextual, text-complete commercial signal.
2. Web maps the valid root to native `p.urgency`, the optional decorative visual
   to `.urgency__cue[aria-hidden=true]`, and required visible text to
   `.urgency__message`.
3. A non-empty trimmed `message` and an explicit valid `variant` are coupled
   render preconditions. Missing/unknown type or blank text omits the complete
   root.
4. The registry's Low Stock `default` marker exists only for schema/Studio
   presentation. The runtime has no Low Stock fallback and consumers must select
   a type explicitly.
5. Low Stock and Selling Fast use Warning-family presentation. Selling Fast is
   not Error/Critical feedback. Viewers and Recent Sale remain neutral.
6. Every cue is optional and decorative. It is hidden from assistive technology,
   has stable named anatomy, and never verifies or communicates the claim.
7. The complete claim lives in visible localized text. G8 does not synthesize
   counts, concatenate grammar or expose icon names.
8. G8 has no `alert`, `status`, live-region, focus, keyboard, pointer,
   dismissal, event, controlled state or neutral runtime behavior. Targets own
   any meaningful verified update and announcement policy.
9. G8 authors no animation or transition. Infinite pulse/keyframes and their
   reduced-motion exception are removed.
10. Body Small size/line-height/body family plus the existing semibold token
    form the complete type profile. Existing element-gap, Warning, primary,
    secondary and full-radius tokens are sufficient; no new token layer is
    created.
11. Layout uses logical intrinsic sizing. Long, localized, RTL, unbroken and
    enlarged text must wrap without clipping or moving the cue away from the
    first line.
12. The base owns no truth, threshold, inventory scope, velocity, viewer
    definition, recency, freshness, evidence, qualification, privacy,
    publication, polling, analytics or network work.
13. Shopify remains `planned` until the owner accepts claim-specific source and
    stale/error/omission rules. No arbitrary merchant-copy snippet or fake data
    preset is introduced.
14. Exhibit and Studio use the same registered renderer and explicit “Example
    only” fixture. Fixture wording is not a component default or commercial
    claim.
15. Automated success does not imply `stable`, human visual approval or target
    truth approval.

## API And Composition Boundary

The v1 candidate base exposes only required `message` and required `variant`.
The optional cue remains a visual part rather than an icon-name property.

Count, threshold, inventory fields, velocity, viewer count, sale timestamp,
recency window, verified/source flags, source timestamp, refresh interval,
polling, live/announce, tone, color, icon, pulse, gap, weight, placement,
loading, error, event and analytics remain target data/policy, private
composition or separate responsibilities.

G8 does not consume canonical Badge. Badge is one compact status/metadata label;
G8 is a complete contextual sentence. It does not consume Alert/Banner because
the base is not an interruptive or live system message. Product Info/Form owns
placement and selected-variant data when composing G8.

## Accessibility And Responsive Requirements

- Render native paragraph content with no widget role or focus stop.
- Keep the complete claim visible in text and hide redundant cue content.
- Do not add live semantics to static/present-at-load content. A target-owned
  meaningful change may be announced only through a separately accepted policy.
- Use no motion, including when reduced motion is not requested.
- Measure normal text contrast in light/dark. Color/cue never carries meaning.
- Forced-colors mode retains text; decorative cue may adapt or disappear.
- Preserve source/logical order in LTR/RTL and allow narrow containers,
  localization, unbroken content and effective 200% text to wrap.

## Target Truth Boundary

- Neutral Web, React, Angular, Webflow, Framer and native targets receive current
  target-authored type/text and add no verification service to the base.
- Shopify Low Stock may later derive from the selected tracked variant plus an
  accepted threshold and inventory-policy rule.
- Selling Fast requires an accepted sales metric/window; Viewers requires a
  privacy-safe current-viewer definition/source/freshness window; Recent Sale
  requires a real event source, recency window, localization, privacy and
  expiry rule.
- Stale, unavailable, untracked, ambiguous or unsupported source data omits the
  claim rather than falling back to marketing copy.
- Figma exposes static examples only and cannot establish truth or live state.

## Performance

The baseline G8 slice measured `1,134 B` raw / `510 B` gzip. The refined slice
measures `1,502 B` raw / `539 B` gzip while adding named anatomy, complete
typography and intrinsic containment. Removing shared pulse rules reduces the
whole Marketing family from `4,134 B` to `4,119 B` deterministic gzip, leaving
`79 B` under its permanent `4,198 B` ceiling.

G8 adds zero neutral JavaScript, listeners, timers, observers, requests, layout
reads or bundled assets. The Marketing ceiling is not raised.

## Deferred Owner Decisions

Before Shopify or any automatic data adapter becomes target-ready, decide:

1. which of the four claim types remain in v1;
2. authoritative source and freshness for each;
3. Low Stock threshold scope, tracking/policy requirements and selected-variant
   updates;
4. Selling Fast metric/window, Viewers definition/privacy/freshness and Recent
   Sale event/window/privacy/localization;
5. qualifications/disclosures and stale/error omission; and
6. placement and whether any verified change merits announcement.

Final tone strength, cue language, typography, spacing and G8-specific Figma
reference remain human visual decisions.

## Evidence Considered

- <https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-strong-element>
- <https://www.w3.org/TR/wai-aria-1.2/#status>
- <https://www.w3.org/TR/wai-aria-1.2/#alert>
- <https://www.w3.org/WAI/ARIA/apg/patterns/alert/>
- <https://www.w3.org/WAI/WCAG22/Understanding/use-of-color>
- <https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum>
- <https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html>
- <https://open-ui.org/>
- <https://www.radix-ui.com/primitives/docs/overview/introduction>
- <https://shopify.dev/docs/apps/build/customer-accounts/migrate-to-web-components/badge>
- <https://shopify.dev/docs/api/customer-account-ui-extensions/latest/web-components/feedback-and-status-indicators/badge>
- <https://shopify.dev/docs/api/liquid/objects/variant>
- <https://shopify.dev/docs/storefronts/themes/store/requirements>

## Consequences

- G8 becomes structurally testable without pretending the presentation layer
  can prove a commercial claim.
- The default experience is quieter, text-complete and zero-runtime.
- Error feedback remains available for actual failures rather than promotional
  pressure.
- Neutral Web can be fully refined and evidenced while Shopify truth policy
  remains visible and unresolved.
- At this decision point G8 was `refined-decision-needed`; ADR 0252 later
  resolves that input and enters G8 into human review while retaining `pilot`.
