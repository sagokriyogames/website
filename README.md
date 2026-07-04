# sagokriyo.com

The Sago Kriyo studio website — plain static HTML/CSS/JS, deployed by GitHub
Pages from the `main` branch root. No build step: what's committed is what
ships.

The design system (palettes, tile ramp, motion timings, fonts) is lifted
directly from our game **2048 Infinity** — see `assets/js/themes.js` for the
palettes extracted from the game's theme resources, and the playable board in
`assets/js/game2048.js`, which mirrors the game's merge rules.

## Pages

| Path | Purpose |
|------|---------|
| `/` | Studio homepage (playable 2048 hero, games, modes, achievements) |
| `/privacy/` | Privacy policy — the URL registered with Google Play |
| `/delete-account/` | Account & data deletion requests — Google Play data-deletion URL |
| `/404.html` | "Game Over" not-found page (served automatically by Pages) |

## Editing notes

- Bump the `?v=N` query on `site.css` / `*.js` references when changing them —
  GitHub Pages caches for ~10 minutes.
- `CNAME` binds the custom domain; don't delete it.
- Fonts in `assets/fonts/` are copied from the game repo
  (`2048/assets/fonts/`); licenses in `assets/fonts/LICENSES.txt`.
- Regenerate icons / og-image with the game fonts if the brand changes
  (they were drawn with Pillow using `MalamPoek.ttf` + `Sora`).
