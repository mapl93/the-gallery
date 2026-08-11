# Component Dossier: Announcement Bar

Status: `human-review-ready`

Target reviewed: Neutral Web with a static Shopify profile and documented
future-target translations

Contract: `components/contracts/announcement-bar.contract.json`

Decision: ADR 0227

## Recommendation

Use C2 Announcement Bar as the single canonical compact announcement surface.
It has three exclusive content modes—Static, Countdown and Rotating—and one
orthogonal controlled Dismissible capability. G11 Announcement Extended is a
deprecated migration identity that forwards to this implementation.

The component owns compact presentation and coordination of canonical
dependencies. Targets continue to own campaign truth, content records,
eligibility, placement, persistence, analytics, navigation and every commercial
effect. The contract remains `pilot` until explicit human visual review.

## Purpose And Limits

- Static presents one concise, non-critical message with an optional native
  Link.
- Countdown presents canonical G7 Countdown in its Inline presentation; the
  Countdown owns deadline validation, time projection, retained zero and expiry.
- Rotating presents at least two real messages through canonical Carousel
  structure with manual controls and optional autoplay.
- Dismissible requests a controlled visibility change through canonical Close
  Button. It does not store or infer dismissal.
- The bar is not Alert/Banner feedback, Toast, consent, legal or safety status,
  a campaign manager, a scheduler, a targeting engine or a persistence service.
- Critical information must remain available elsewhere, especially when the bar
  rotates or can be dismissed.

## Repository Baseline And Correction

Before ADR 0227, C2 was static-only while G11 claimed Countdown, Rotating and
Dismissible variants through a second renderer and Marketing CSS. G11 rendered
one hardcoded message but translated it through three fixed `2em` positions on
an infinite eight-second animation. It could become blank, clipped long content,
had no current position, previous/next, pause/restart, focus/hover suspension or
truthful Countdown, and duplicated Close Button treatment.

The refined source now:

- merges every supported mode into `.announcement` in `global.css`;
- deletes the independent G11 CSS loop and renderer;
- composes canonical Link, Countdown, Carousel, Icon Button and Close Button;
- uses intrinsic logical layout and a `28rem` container query for compact
  rotation controls;
- shares one `AnnouncementArtwork` and fixture between C2/G11 and
  Exhibit/Studio; and
- shares one Carousel rotation service with Hero rather than introducing a
  second autoplay implementation.

## Research Evidence

| Source | Relevant evidence | Gallery direction |
| --- | --- | --- |
| [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/) | Auto-rotation needs a stop/restart Button, stops when focus enters, does not restart implicitly, and stops on hover. | Opt-in autoplay exposes Pause/Play; focus/manual navigation creates a durable pause and hover creates a temporary pause. |
| [WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html) | Moving or auto-updating parallel content requires a user mechanism unless essential. | No CSS-only infinite loop; the visible control remains available whenever autoplay exists. |
| [Open UI Carousel research](https://open-ui.org/components/carousel.research/) | Carousel APIs vary across autoplay, looping, controls, indicators and events. | Expose only the accepted Announcement semantics; keep content stores and target campaign configuration outside the neutral API. |
| [Shopify theme testing checklist](https://shopify.dev/docs/storefronts/themes/store/test-theme/checklist) | Theme behavior must remain usable across devices, localization and merchant editing. | Current Shopify mapping stays truthful as Static; dynamic modes wait for a target-native merchant surface and editor lifecycle. |

Radix and Polaris do not provide a portable marketing-announcement union.
Polaris Banner and Shopify host Announcement remain useful semantic boundaries,
not implementations to copy into neutral source.

## Owner Reference Analysis

The supplied Gallery references support a pale statement surface, compact type,
centered content and restrained icon treatment. They do not approve final
typography, density, row wrapping, Countdown hierarchy, control spacing or
dismiss placement. The prior G11 still images showed only the first rotating
frame and therefore concealed the blank-frame animation. Final visual direction
remains an explicit human review item.

## Anatomy And Canonical Composition

| Part | Required | Canonical owner | Notes |
| --- | --- | --- | --- |
| Root/body | yes while visible | Announcement Bar | Neutral `div` or intentionally labelled `section`; no live default. |
| Static message | Static only | target + Link | Trimmed content; optional destination Link. |
| Inline timer | Countdown only | Countdown | Absolute deadline and state belong to G7. |
| Track/slides | Rotating only | Carousel | At least two real slides; no clones, dots or progress bar. |
| Previous/next | Rotating only | Icon Button | Always present and natively focusable. |
| Counter/status | Rotating only | Announcement Bar | Visible localized current/total plus quiet/polite status policy. |
| Pause/play | autoplay only | Icon Button | Explicit persistent user control. |
| Dismiss | optional in every mode | Close Button | Emits a request; target reconciles `visible`. |

## Mode, State And Content Matrix

| Dimension | Supported behavior |
| --- | --- |
| Mode | Exclusive `static`, `countdown` or `rotating`; invalid required content omits the root. |
| Visibility | Controlled visible/omitted projection. |
| Dismissal | Optional in every mode; one request event, no local storage or automatic reappearance. |
| Rotation | Manual by default; optional 3,000–12,000 ms autoplay, wrapping through real logical indices. |
| Playback | Off, Playing or Paused output; hover/hidden temporary pause, focus/manual/direct scroll durable pause, explicit Play restart. |
| Reduced motion | Autoplay and smooth scrolling off; manual controls remain. |
| Status | `aria-live=off` while playing and `polite` while user-controlled. |
| Content | Short, long, empty/invalid, localized, unbroken, RTL, 200%, one/many and retained Countdown zero. |
| Responsive | Intrinsic wrapping from container width; rotating controls stack below the track in narrow hosts. |

## Public API And State Ownership

- Content: `mode`, optional intentional `label`, conditional `message`,
  `countdown` and `messages` slots.
- Lifecycle: controlled `visible`, optional `dismissible`, required localized
  `dismissLabel` when dismissal is rendered.
- Rotation: `autoplay`, bounded `autoplayInterval`, localized previous/next/
  pause/play labels, `counterTemplate` and `statusTemplate`.
- Outputs: `announcementdismissrequest`, `announcementchange` and
  `announcementplaybackchange`.

Campaign IDs, message record schemas, dates, eligibility, storage keys,
placement, sticky behavior, analytics and navigation are deliberately not
public component properties.

## Tokens, CSS And Runtime

Public decisions use existing statement surface, text, body-small typography,
container spacing and element-gap tokens. Private variables own compact gap and
composition. The `0.5rem` block inset, `5ch` counter measure and `28rem`
container breakpoint are internal layout details, not new cross-target API.

The old `2em` height, fixed transforms, physical dismiss offsets and infinite
animation were removed. One generic rotation enhancer now serves Hero and
Announcement. Each connected rotating root owns at most one timeout; one shared
visibility listener and one reduced-motion listener coordinate all instances.
Disconnected roots clear timeout, animation frame and scroll-release work. The
component performs no request, polling, asset load, storage write or layout
loop.

## Accessibility And Interaction

- Static page-load content stays ordinary document content, not `alert`,
  `status` or an automatic live announcement.
- A label creates an intentional named region; Rotating requires that name and
  exposes named slide groups plus current position.
- All actions are native Buttons/Links with canonical focus treatment and
  localized accessible names.
- The focused track retains native horizontal keyboard scrolling; the root does
  not intercept Arrow keys.
- Previous/next and direct scrolling pause autoplay durably. Hover pauses only
  while the pointer remains inside. Hidden documents stop timers. Reduced
  motion keeps the first/current item static.
- Dismissal returns control to the target. The Studio fixture demonstrates safe
  focus restoration to “Show announcement” without making that launcher part
  of the component API.

## Cross-Target Translation

| Target | Translation | Current status |
| --- | --- | --- |
| Neutral Web | Canonical CSS, native DOM and shared progressive runtime. | Implemented and evidenced. |
| Shopify storefront | Existing static Announcement section consumes canonical CSS. | Static profile implemented; dynamic schema, persistence and Header section-group surface remain planned. |
| React / Angular | Thin controlled props/events over the same DOM/runtime contract. | Planned; must not duplicate the rotation/countdown store. |
| Figma | Static representations for modes, wrapping, pause and dismissal. | Planned; no clock/persistence simulation. |
| SwiftUI / Compose | Native timer/carousel/actions preserving exclusive modes and controlled outputs. | Planned. |

## Evidence And Validation

Final artifacts are under
`output/playwright/refinement-global/announcement-bar-0227/`:

- Exhibit and Studio at Mobile, Tablet, Desktop and XL;
- Countdown, Rotating autoplay, durable Paused and controlled Closed states;
- dark, forced colors, component-scoped RTL with reduced motion and mobile 200%
  text reflow evidence; and
- deprecated G11 Exhibit/Studio migration captures.

Browser assertions proved autoplay advance, temporary hover pause/resume,
durable focus/manual pause, explicit Play state, quiet/polite live policy, one
dismiss request, focus restoration, no action-triggered resource/storage/cookie
change, one tab and zero console errors/warnings. All eight view/viewport pairs
had zero document and component overflow. Static normalized DOM was exactly
equal across C2 Exhibit, C2 Studio, G11 Exhibit and G11 Studio (`318` characters
each).

## Risks And Human Questions

1. Approve or revise statement color, typography, compact density, wrapping,
   Countdown hierarchy, controls and dismiss placement.
2. Choose the first dynamic Shopify merchant configuration and Header
   section-group placement before calling those modes target-ready.
3. Shared runtime and Global/total CSS remain documented program budget gaps;
   ceilings were not raised.
4. G11 deprecation needs human confirmation as product communication, but no
   second implementation remains.

## Readiness Decision

Ready for explicit human review as a `pilot`. Semantic composition, state
ownership, runtime, accessibility, responsive behavior, target boundaries,
Exhibit/Studio parity and automated evidence are reconciled. No `stable`
promotion is authorized.
