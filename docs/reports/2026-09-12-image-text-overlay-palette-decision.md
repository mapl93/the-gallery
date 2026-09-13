# Image with Text overlay palette — owner decision

Date: 2026-09-12. Source inspected after `db64922`; no Image with Text source edit.

## Confirmed behavior

`components/css/sections.css` defines `.image-text--overlay` content with a black
scrim and `--color-text-inverse` for eyebrow, title and body. In actual Studio,
the title resolves to white in Light and rgb(23,23,23) in Dark, while the black
scrim remains. The Dark screenshot shows dark text over darkened photography.
This is direct rendering evidence, not a blanket contrast certification.

## Concrete alternatives

The ignored `output/playwright/announcement-featured-values/` artifacts include
current Light/Dark and two browser-local Dark alternatives, with the same media,
content, typography, geometry and independent Button composition:

- A: white text in both themes, retain the existing black scrim. Consistent with
  the owner-approved Hero and Coming Soon on-media choices (ADRs 0383/0392).
- B: dark text on a white scrim in Dark. This changes the photo treatment; the
  proof uses white at 0.6 opacity and dark text, rather than claiming a new default.

A screenshot is not proof across arbitrary photography or brand overrides.
A public on-media color/scrim role should follow the selected treatment; the
shared global inverse role must not be changed for unrelated consumers.

## Status

Pending owner choice before changing Image with Text's media palette. No source,
Shopify or token changes implement either alternative. Both alternatives were
captured with temporary DOM custom-property overrides. Browser and server closed.
