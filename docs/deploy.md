# Build & Deploy Checklist (MVP)

## Local Setup
- `npm install --registry=https://registry.npmmirror.com --fetch-timeout=600000 --fetch-retries=2`
- `npm run tailwind:build` to generate `public/assets/site.css`
- `npm run build:pages` (optional; `npm run dev` triggers it automatically)
- `npm run dev` serves `http://localhost:5173/en/index.html`

## Static Build
- `npm run build` runs the Nunjucks prebuild and emits localized HTML into `public/`
- Run `npx html-validate public/en/index.html` before shipping (after build)

## Template Build Notes
- Templates live in `src/pages/` and rely on macros under `src/components/` with data from `layout-data.js`.
- `scripts/build-pages.mjs` uses Nunjucks; ensure `npm install` installs `nunjucks`, `fast-glob`, `fs-extra`.
- Output is written to `src/generated/`; Vite `root` points there, so always run `npm run build:pages` (or `npm run dev`) before editing generated HTML.

## Outstanding Follow-ups
- Add watch mode for `scripts/build-pages.mjs` (e.g., `npm run build:pages -- --watch`)
- Localize new placeholder pages (ko/de/es/ar) with full copy and CTA labels
- Add Playwright smoke tests for language alert and generator interactions
- Document proxy troubleshooting in `docs/setup-troubleshooting.md`
- Capture responsive screenshots once the MVP design stabilizes

## Testing Checklist
- `npm run build:pages` — regenerate Nunjucks templates into `src/generated/`.
- `npm run build` — end-to-end build (prebuild + Vite).
- `npx html-validate public/en/index.html` — pass.
- `npx html-validate "public/**/*.html"` — currently reports missing closing tags on non-English landing pages; fix templates before release.
- Manual smoke test via `npm run dev` across `/en/`, `/ja/`, `/ko/`, `/ar/` to verify layout + language alert.

## Known Gaps
- Non-English landing templates still need closing `</section>`/`</div>` cleanup so full-site HTML validation passes.
- Playwright scenarios (language alert, microtype tool) pending.
- Optional `build:pages --watch` helper not yet implemented.
