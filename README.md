# Live preview

Static website previews, published for review via GitHub Pages.

Each folder is a self-contained site — plain HTML, CSS and a small vanilla
motion script, no framework and no build step. `assets/` holds the shared
foundation (self-hosted fonts, reset, scroll-reveal engine); each site carries
its own full design in `style.css` and its imagery in `<site>/assets/`.

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
- All animation honours `prefers-reduced-motion`.
