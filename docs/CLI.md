# Copy-and-own Web installation

The CLI installs the Web adapter's dependency-closed CSS/runtime slice and its
canonical generated token CSS. The copied files belong to your project.

```sh
npx the-gallery init
npx the-gallery add button input --dry-run
npx the-gallery add button input
npx the-gallery diff
```

`init` chooses directories and preserves an existing `tg.config.json`. Without
an existing config, `add` uses `styles/the-gallery`, `styles/tokens` and
`scripts/the-gallery`; its dry run does not create them.

Load `styles/tokens/tokens.css` first, then the CSS paths printed by the install
in their listed order. Load `scripts/the-gallery/runtime.js` with
`type="module"` only when the installed components need behavior. Put brand
overrides in a separate stylesheet after tokens; this makes upstream token
updates easier to review. Direct edits are still supported and protected.

Commit `tg.config.json`, `tg.install.json` and your copied files together in your
project. The install record stores the upstream hash, source path and package
version for each file. Keep it when editing a copied file: changing the record
to match your edit would erase the distinction between local and upstream work.

## What happens when adding another component

| Local file | Upstream since recorded baseline | Result |
| --- | --- | --- |
| Absent, never installed | New file | Copy |
| Identical to upstream | Any | Retain; record the matching baseline |
| Unchanged | Changed | Update |
| Customized | Unchanged | Preserve custom file and baseline |
| Customized | Changed | Stop before any planned writes |
| Different, no known baseline | Unknown | Stop; do not guess ownership |
| Previously installed, now absent | Any | Stop; preserve intentional deletion |

Base CSS, token CSS and generated runtime entries follow the same rules.
Updating the package alone never updates consumer copies; only an explicit CLI
operation performs the printed install plan. Files outside the requested and
already-installed dependency graph are not copied.

## Reviewing a conflict

1. Run `npx the-gallery diff`. It shows file status and local/upstream content,
   including tokens and runtime, without modifying files.
2. Back up the affected local files using your project's version control or a
   separate copy. If needed, run the same CLI package in a temporary empty
   consumer directory to inspect the complete proposed dependency slice.
3. Merge or review the differences in your local file. Then explicitly keep
   each reviewed path while accepting the current upstream baseline:

   ```sh
   npx the-gallery add date-picker --keep-local styles/the-gallery/primitives.css --dry-run
   npx the-gallery add date-picker --keep-local styles/the-gallery/primitives.css
   ```

   Repeat `--keep-local` for each reviewed conflicting file. It never writes to
   those files, and it does not infer whether your merge supports the new
   component. Verify required selectors/imports yourself before accepting.
   Unresolved conflicts still stop the complete installation.
4. Validate your application. A future upstream change to a customized file
   produces another conflict, even after a previous explicit keep-local choice.

A customized `runtime.js` may need a new import for the added component. The CLI
stops rather than leaving that component recorded but inactive.

For an older installation without `tg.install.json`, matching files can be
adopted. Differing files require review. Legacy `*_tokens.json` files are never
deleted or converted, and the CLI never changes your application's imports.

The protection covers detected content/path conflicts, not concurrent editors or
an operating-system failure during writes. Keep normal version-control backups.
