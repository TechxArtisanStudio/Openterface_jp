# UX Audit: Visual Polish (Legacy Light Theme)

**Date:** 2026-05-20 | **Preview:** http://127.0.0.1:4321/ | **Legacy ref:** https://openterface.com/

## Automated verification

| Check | Result |
|-------|--------|
| `npm run build` | 10 pages, pass |
| Smoke tests (3) | pass |
| a11y (axe) | pass (header primary-dark, btn-brand-dark, doc banner link) |
| Browser QA | Side-by-side vs legacy — header + light hero aligned |

## Visual changes shipped

| Area | Before | After |
|------|--------|-------|
| Logo | Broken CDN URL | Local `/images/openterface.svg` via `Logo.astro` (white on header) |
| Header | White sticky bar | Deep orange bar (`primary-dark` #ff6e42), white nav |
| Hero carousel | Dark gray gradient | White background, dark headlines, orange category labels |
| Progress bars | White/20 track | Gray track + orange gradient fill |
| Typography | Inter | Roboto (legacy match) |
| Buttons | Mixed tokens | Brand-dark primary; outline secondary |
| Theme | — | Single light theme only (no dark mode toggle) |

## Side-by-side vs legacy (browser)

| Dimension | Legacy | New site | Match |
|-----------|--------|----------|-------|
| Header color | Deep orange Material bar | `bg-primary-dark` orange bar | ✓ |
| Logo on header | White wordmark | White inverted SVG | ✓ |
| Hero background | Light / off-white | White | ✓ |
| Category label | Orange uppercase | `text-brand-dark` uppercase | ✓ |
| Headline | Dark gray | `text-ink` #373737 | ✓ |
| CTA buttons | Orange filled + outline | btn-primary + btn-outline-primary | ✓ |
| Carousel progress | Orange gradient bar | `progress-fill-active` gradient | ✓ |
| Doc banner | N/A on home | Peach `brand-light` strip | new (migration UX) |

## Remaining gaps (P1)

- [ ] Desktop nav layout at lg breakpoint (browser MCP preview stays mobile-width)
- [ ] Home video carousel section from legacy (`home-videos.html`)
- [ ] Newsletter signup block
- [ ] Language selector (deferred — en-only subdomain)
- [ ] Visual regression baselines: `npm run test:visual -- --update-snapshots`

## Screenshots

Saved under `docs/qa/baselines/new/`:
- `home-desktop-1280.png` — new site home (initial capture)

## a11y notes

- Header uses `primary-dark` (#ff6e42) instead of pure `#e65100` so white nav text meets WCAG 4.5:1
- `.btn-primary` uses `brand-dark` (#c43d30) for contrast; hover darkens further
- Carousel entrance animation uses transform-only (no opacity fade) so axe scans correct colors
