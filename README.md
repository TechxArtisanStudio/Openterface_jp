# openterface_en

English marketing site for Openterface — Astro 6 + Tailwind 4. Deploys to **en.openterface.com**.

## Quick start

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # output → dist/
npm run preview    # serve dist/
```

## Test & QA

```bash
npm run build && npm run preview -- --port 4321 --host 127.0.0.1
PLAYWRIGHT_BASE_URL=http://127.0.0.1:4321 CI=true npm test
```

- **Smoke:** route loads, carousel, product pages
- **a11y:** axe-core via Playwright (no critical/serious violations)
- **UX audit skill:** `.cursor/skills/ux-audit/SKILL.md`

## Site map (Wave 1–2)

| Route | Status |
|-------|--------|
| `/` | Home + hero carousel |
| `/products/{keymod,kvm-go,minikvm,uconsole-kvm-extension,accessories}/` | Product landings |
| `/about/`, `/videos/`, `/use-cases/` | Stubs with legacy links |
| FAQs, Tutorial, App, Support | Link to openterface.com |

## Structure

```
src/
├── components/     # Header, footer, carousel, slideshow
├── config/site.ts  # URLs, buy links
├── data/           # Home slides, products, nav
├── layouts/        # BaseLayout, ProductLanding
└── pages/          # Astro routes
```

Internal locale rollout tooling: private **web-dev-tool** repo.
