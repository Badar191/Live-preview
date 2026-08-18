# Live preview

Static site previews published via GitHub Pages.

Each folder is self-contained: plain HTML, CSS and a small vanilla motion
script, no framework and no build step. `assets/` holds the shared foundation
(self-hosted fonts, reset, scroll-reveal engine); each site carries its own
design in `style.css` and its imagery in `<site>/assets/`.

## Notes

- Every page is marked `noindex, nofollow`. These previews reproduce a real
  business's identity, and indexing them would put a duplicate into search
  results competing with that business's own site.
- The root index is intentionally blank. Previews are shared as direct links
  only.
