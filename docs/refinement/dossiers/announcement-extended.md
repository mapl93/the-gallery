# Component Dossier: Announcement Extended (Deprecated)

Status: `human-review-ready`

Target reviewed: Migration to canonical C2 Announcement Bar

Contract: `components/contracts/announcement-extended.contract.json`

Decision: ADR 0227 supersedes ADR 0173's unresolved proposal

## Recommendation

Keep G11 only as a deprecated pre-v1 migration identity. It must not own CSS,
markup, fixtures, behavior, tokens or target adapters independently from C2.
Consumers migrate every former Countdown, Rotating or Dismissible use to the
same canonical Announcement Bar modes and controlled lifecycle.

## Why Deprecation Is Correct

The old G11 grouped three unrelated-looking variants without a discriminating
API or complete dependencies. Countdown was fixed English text rather than G7;
Rotating animated one message through three fixed positions and became blank;
Dismissible duplicated Close Button styling and relied on undocumented
site-local visibility. Its default contract, Studio state and rendered anatomy
contradicted each other.

The owner chose one Announcement Bar with merged functionality. Preserving G11
as a second public implementation would violate the repository's canonical
composition and Exhibit/Studio parity rules. A permanent selector alias would
also preserve the duplicate styling boundary, so none was added.

## External And Repository Evidence

- [WAI-ARIA APG Carousel](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/)
  requires explicit pause/restart and focus/hover handling for auto-rotation.
- [WCAG 2.2.2](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)
  rejects the old uncontrolled continuous update.
- [Open UI Carousel research](https://open-ui.org/components/carousel.research/)
  shows that autoplay, looping, indicators and events need an explicit contract.
- The accepted G7 Countdown and shared Hero/Announcement Carousel runtime now
  provide canonical responsibilities that the old G11 duplicated or simulated.

## Migration Contract

| Former G11 concept | Canonical C2 mapping |
| --- | --- |
| Countdown variant | `mode=countdown` plus canonical Countdown composition. |
| Rotating variant | `mode=rotating`, real message collection, manual controls and optional autoplay. |
| Dismissible variant | `dismissible=true`, controlled `visible`, canonical Close Button and `announcementdismissrequest`. |
| Fixed cadence | Validated semantic `autoplayInterval`; default 6000 ms, autoplay off by default. |
| Local show/hide | Target-controlled visibility, persistence and safe focus destination. |

G11's contract forwards consumers to C2 and documents the migration. Its
registry record points at `.announcement`, canonical dependencies and the same
mode inventory, but its maturity status is `deprecated`.

## Implementation And Parity

- `GlobalStudio` renders both slugs.
- `AnnouncementArtwork` and one fixture render both Exhibit and Studio.
- `components/css/global.css` is the only source styling implementation.
- `components/js/theme.js` is the only neutral dynamic runtime.
- The former G11 block and infinite keyframes were removed from Marketing CSS.
- No compatibility markup, duplicate selector or target adapter was created.

Final default normalized DOM is identical across C2/G11 and Exhibit/Studio:
`318` characters on each surface. Dedicated G11 migration captures live beside
the full C2 evidence under
`output/playwright/refinement-global/announcement-bar-0227/`. Historical
screenshots under `output/playwright/parity/marketing/` remain before evidence
of the independent renderer.

## Target Translation

All targets translate C2, not G11. Neutral Web is implemented; Shopify currently
supports the truthful Static C2 profile; React/Angular, Figma and native targets
use the C2 contract. No target should publish an “Extended” component after the
migration.

## Risks And Human Review

- Confirm that the deprecated name and migration wording are understandable to
  consumers.
- Confirm the canonical C2 visuals and modes through the companion C2 dossier
  and report.
- Select future Shopify dynamic configuration separately; G11 deprecation does
  not authorize a speculative target surface.

## Readiness Decision

Ready for human review as a deprecated migration record. The duplicate source
has been removed and parity is proven. G11 must never be promoted to `stable`;
the canonical C2 contract remains `pilot` pending visual approval.
