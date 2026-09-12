# ADR 0390: Global Studio Explicit Color Controls

Status: Accepted

Date: 2026-09-12

GlobalStudio chooses the first resolved token for each swatch. Separate grouped
colors for Header, Footer, Mobile Menu, Search Overlay, Cart Drawer, Mega Menu
and Bottom Nav into individual named controls. Preserve all public identities,
values, semantic properties, overlay ownership and runtime behavior.

Extend the reviewed static-renderer binding guard to GlobalStudio. This changes
presentation metadata and validation only. Studio and Exhibit share each role.
