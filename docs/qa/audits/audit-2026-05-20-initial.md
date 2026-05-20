# UX Audit: Home + Product Landings (Initial Build)

**Date:** 2026-05-20 | **Wave:** 1–2 | **Preview:** http://127.0.0.1:4321/

## Automated verification

| Check | Result |
|-------|--------|
| `npm run build` | 10 pages, pass |
| Smoke tests (5) | pass |
| a11y (axe) | pass after btn contrast fix |
| Browser snapshot | Home + nav + carousel present |

## Scores (/5)

| Dimension | Score | Notes |
|-----------|------:|-------|
| Visual hierarchy | 4 | Clear hero → products → CTA flow |
| Brand consistency | 4 | Brand red on buttons; logo from CDN |
| CTA clarity | 4 | Buy + Download visible; legacy docs linked |
| Content parity | 3 | Core copy present; video grid + signup not yet ported |
| Interaction quality | 4 | Carousel autoplay + progress bars work |
| Accessibility | 4 | Fixed contrast on `.btn-primary`; carousel has ARIA |
| Performance feel | 4 | Static build; external images from CDN |
| Doc bridge | 5 | DocLinkBanner + legacy links on all product pages |

## P1 — Fix before public launch

- [ ] Port home video carousel (`home-videos.html`) from legacy
- [ ] Port product signup form (`subscribe.js`)
- [ ] Add visual regression baselines (`npm run test:visual -- --update-snapshots`)
- [ ] Deploy to `en.openterface.com` via GitHub Pages

## P2 — Next iteration

- [ ] Port YouTube video grid for `/videos/`
- [ ] Extract shared components to `@openterface/website-ui`
- [ ] Add hreflang when locale repos launch

## Working well

- 8-module product landing template with HW+SW section
- All 5 product routes build and test clean
- Legacy doc links preserve marketing-first strategy
