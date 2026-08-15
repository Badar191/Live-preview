# Live preview

Static website previews, published for review via GitHub Pages.

Each folder is a self-contained site — plain HTML and CSS, no framework and no
build step. `assets/base.css` holds the shared design system; each site overrides
its own palette in `theme.css`.

| Preview | Path |
|---|---|
| World of Comfort | [`world-of-comfort/`](world-of-comfort/) |
| Dupont Heating & Air Conditioning | [`dupont-heating/`](dupont-heating/) |
| Cool Comfort System | [`cool-comfort-system/`](cool-comfort-system/) |

## Notes

- Every page is marked `noindex, nofollow`. These previews reproduce a real
  business's identity, and indexing them would put a duplicate into search
  results competing with that business's own site.
- Layouts are verified at 1440px and 390px with no horizontal overflow.
- Imagery is currently CSS and inline SVG; photography is dropped in later.
