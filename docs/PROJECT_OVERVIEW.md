# Project Overview — Protect Ukraine Now Website (legacy)

Reference for developers and AI assistants maintaining this repository.
Produced by Task 001 (discovery only, no code changes). Last reviewed: 2026-10-14.

Legend: **[Confirmed]** = verified in the repository. **[Assumption]** = inferred, not verifiable from the repo alone.

---

## 1. Purpose and architecture

- Public website of Protect Ukraine Now (PUN), a California-based NGO: advocacy pages (letters and calls to Congress), military-aid analytics (charts and tables), news, and publications. **[Confirmed]** (`README.md`, `src/content/pages/*`)
- **A single codebase serves two brands**, chosen at request time by hostname (`src/tools/app.ts`): **[Confirmed]**
  - `pun`: Protect Ukraine Now (protectukrainenow.org)
  - `uat`: Ukraine Aid Tracker (selected when the origin contains `uat` or `ukraineaidtracker`)
  - `VITE_APP_NAME` overrides the hostname detection.
- **Server-side rendered (SSR)** Astro app (`output: "server"`) running on **Cloudflare** through `@astrojs/cloudflare`. No page is prerendered. **[Confirmed]** (`astro.config.mjs`)
- Content comes from Markdoc/Markdown files in `src/content/`, which are edited through Keystatic CMS, Pages CMS or plain git. Chart data comes from JSON files in `src/data/`, which are regenerated from Google Sheets at build time. **[Confirmed]**
- **Not connected to the PUN backend API.** No code calls it. **[Confirmed]** (searched `src/`)
- External services: Google Tag Manager (`GTM-TSJ66R2`, in `Base.astro`), Google Fonts, ActionNetwork letter widget (`Letter.astro`), the Google Civic Info API (`src/actions/representatives.ts`), the Google Sheets API (`src/data/load-sheets.js`) and the ApiFlash screenshot API (`src/pages/shot/[...rest].ts`). **[Confirmed]**

## 2. Technology stack

All versions are the ones resolved in `pnpm-lock.yaml`. **[Confirmed]**

| Area | Details |
|---|---|
| Language | TypeScript 5.6 / JavaScript (ESM), SCSS |
| Framework | Astro 4.16.6 (SSR) |
| Adapter / hosting | `@astrojs/cloudflare` 11.1.0 |
| UI components | Preact 10.24 for `.tsx` components; React 18 only for the Keystatic admin UI (`**/keystatic/*`) |
| Content | `@astrojs/markdoc` 0.11.5, Astro content collections |
| CMS | Keystatic (`@keystatic/astro` 5.0.2, `@keystatic/core` 0.5.38), Pages CMS (`.pages.yml`), Front Matter VS Code extension (`frontmatter.json`) |
| Styling | UnoCSS 0.63 (presets uno, typography, daisy [DaisyUI 3, theme `emerald`], fluid, icons), SCSS modules (`sass` 1.80) |
| Charts | Vega 5 / Vega-Lite 5 |
| Page transitions | `astro:transitions` `<ViewTransitions />` and `astro-vtbot` |
| Utilities | `rambda`, `clsx`, `dayjs`, `slugify` |
| Package manager | pnpm (`packageManager: pnpm@10.29.3`, lockfile v9) |
| Node | `.nvmrc` = 22.2.0, but pnpm 10.29.3 needs ≥ 22.13: use latest 22.x (see §8) |
| Build tool | Vite (bundled with Astro), plus `rollup-plugin-visualizer`, which writes `stats.html` |

## 3. Directory structure

```
astro.config.mjs        Astro, Vite and UnoCSS configuration, Cloudflare adapter
markdoc.config.mjs      Custom Markdoc tags ({% Letter /%}, {% Publications /%}, charts…)
keystatic.config.ts     Keystatic CMS schema (collections: pages, notes, publications, blog)
.pages.yml              Pages CMS schema (mirrors Keystatic)
frontmatter.json        Front Matter VS Code extension config
public/                 Static files served from the site root (_headers, robots.txt, *.webp)
src/
  pages/                File-based routes (see §5)
  layouts/              Base.astro (html shell, header, footer), Article.astro (narrow article)
  components/           Astro and Preact components (Header, Footer, Menu, charts, tiles…)
  content/              Content collections: pages/, notes/, publications/, blog/ + config.ts
  data/                 text.json (UI translations), chart data JSON, loader scripts
  actions/              Astro Actions (representatives lookup)
  styles/               Global SCSS (variables, mixins, globals)
  tools/                Helpers: location, language/i18n, app (brand), country, date…
  assets/               Images and logos processed by Astro
docs/                   Project documentation (this file, tasks/)
```

Leftovers that are not part of the build: `vs.pun.sln`, `vs.pun.esproj` (Visual Studio), `*.bat` (Windows helpers), `.vscode/`, and `stats.html` (generated bundle report that has been committed).

## 4. Important files

| File | Role |
|---|---|
| `src/layouts/Base.astro` | HTML shell: `<head>` (title, OG meta, GTM, fonts), `Header`, `Footer`. Holds the **per-brand config**: menu items, languages, footer email. |
| `src/layouts/Article.astro` | Wraps `Base` and centers content in `<article class="max-w-96ch mx-auto">`. Adds the blue/yellow `h1` underline. |
| `src/components/Markdown.astro` | Loads a content entry by `collection` and `slug`, with language fallback, and renders it in `prose`. |
| `src/pages/[lang]/[page].astro` | **Catch-all for content pages**: renders `src/content/pages/<page>-<lang>.mdoc`. |
| `src/tools/language.ts` | `useLanguage()` (first URL segment, default `en`), `useText()` (translation lookup in `src/data/text.json`). |
| `src/tools/location.ts` | Module-level holder for `Astro.url`. Must be primed with `useLocation(Astro)` in every page. |
| `src/tools/astro.ts` | `setup(Astro)`: primes location and sets `Cache-Control: public, max-age=3600` in production. |
| `src/components/Header/Header.astro` | Builds menu hrefs as `/${lang}/${name}` and labels as `text('menu.<name>')`. |
| `src/components/Footer/Footer.tsx` | Logo, social share and contact email. There are no footer links today (a menu is commented out). |
| `src/data/text.json` | UI strings for `en` and `uk`. Brand-specific keys are prefixed `pun/` or `uat/` (e.g. `pun/seo`). |

## 5. Routing and page rendering

Astro file-based routing in `src/pages/`. **[Confirmed]**

| Route | File | Behavior |
|---|---|---|
| `/` | `index.astro` | Redirect: `uat` → `/en/report`; otherwise by `cf-ipcountry`: US → `/en/home`, UA → `/uk/report`, other → `/en/report` |
| `/:lang/:page` | `[lang]/[page].astro` | Renders content entry `pages/<page>-<lang>` in `Article` layout |
| `/:lang/blog/:slug` | `[lang]/blog/[slug].astro` | Renders a `blog` entry |
| `/:lang/call` | `[lang]/call.astro` | Like `[page]` plus `NoScroll` |
| `/:lang/news` | `[lang]/news.astro` | News list from `src/data/news.json` |
| `/:lang/report` | `[lang]/report.astro` | Analytics dashboard (Base layout, charts) |
| `/:lang/tiles` | `[lang]/tiles.astro` | Tile grid |
| `/shot/*` | `shot/[...rest].ts` | Proxies the ApiFlash screenshot service (used for OG images and publication thumbnails) |
| `/keystatic/*`, `/api/keystatic/*` | injected by `@keystatic/astro` | CMS admin |
| any unmatched | `404.astro` | **Redirects to `/`** (there is no real 404 page) |

**Content-page resolution** (`Markdown.astro`): `getEntry('pages', '<slug>-<lang>')` → fallback `<slug>-en` → fallback `<slug>`. The slug is lowercased first.

Behaviors to know about: **[Confirmed by code reading, not by running]**
- `[lang]` is not validated. Any first segment is accepted, and text falls back to English.
- **An unknown `/:lang/:page` returns HTTP 200 with an empty article** instead of a 404.
- Single-segment paths such as `/support` match no route, so they hit `404.astro` and redirect to `/`.
- The content front-matter `title` is **not rendered**. Each page writes its own `# Heading` in the body.

## 6. Layouts, navigation and styling

- **Page title and meta** are site-wide: `text('seo.title')` and `text('seo.description')` per brand and language. No page sets its own `<title>`. **[Confirmed]**
- **Header menu** is configured in `Base.astro` (`config.pun.header.menu`, `config.uat.header.menu`). Labels come from `text.json` → `menu.<name>`, and a missing key shows the raw key. The mobile `Hamburger` uses the same menu. **[Confirmed]**
- **Language selector**: `pun` has `en` (ENG) and `uk` (УКР) and swaps the first path segment. `uat` has no selector. **[Confirmed]**
- **Footer**: logo and `mailto:` email from `Base.astro` config (pun: contact@ProtectUkraineNOW.org). **[Confirmed]**
- **Styling**: UnoCSS utility classes, Tailwind-like (`max-w-96ch`, `prose`, DaisyUI `menu`), plus SCSS modules per component (`style.module.scss`) and global SCSS in `src/styles/`. Body text uses `prose` from presetTypography. **[Confirmed]**
- **i18n**: languages `en` and `uk`. UI strings live in `src/data/text.json` (partly generated by `load-sheets.js` from Google Sheets). Page content is one file per language (`about-en.mdoc`, `about-uk.mdoc`), and a missing translation falls back to English. **[Confirmed]**

## 7. Configuration and environment variables

| Variable | Purpose | Where |
|---|---|---|
| `VITE_APP_NAME` | Forces brand `pun` or `uat` (used by `pnpm dev:pun` / `dev:uat`) | `src/tools/app.ts` |
| `KEYSTATIC_GITHUB_CLIENT_ID`, `KEYSTATIC_GITHUB_CLIENT_SECRET`, `KEYSTATIC_SECRET`, `PUBLIC_KEYSTATIC_GITHUB_APP_SLUG` | Keystatic GitHub-mode authentication (production) | `.env.example` |
| `NODE_ENV` | `production` → Keystatic uses GitHub storage; otherwise it edits local files | `keystatic.config.ts` |

- `astro.config.mjs` inlines every `VITE_*` and `*KEYSTATIC_*` env var into the bundle as `process.env.*` **and prints their values to the build log** (`console.log(key, val)`).
- `.env` and `.env.production` are git-ignored. No `wrangler.toml` exists, so Cloudflare settings live in the Cloudflare dashboard. **[Assumption]**
- `public/_headers` sets long-lived immutable caching for `/_astro/*`.

## 8. Local development

`node_modules/` is not installed in this checkout, so none of these commands were run during discovery.

> **Node version conflict [Confirmed]:** `.nvmrc` pins Node 22.2.0, but `packageManager` pins pnpm 10.29.3, which requires Node ≥ 22.13 (`pnpm install` fails on 22.2.0). Use the latest Node 22.x (`nvm install 22 && nvm use 22`), not `nvm use` (which reads `.nvmrc`). `.nvmrc` itself has not been changed.

```sh
nvm use 22              # latest Node 22.x (≥ 22.13), see note above
pnpm install --frozen-lockfile   # pnpm 10 (see packageManager); does not rewrite the lockfile
cp .env.example .env    # only needed for Keystatic GitHub mode
pnpm dev                # astro dev → http://localhost:4321, brand detected from hostname (pun)
pnpm dev:pun            # force PUN brand
pnpm dev:uat            # force UAT brand
```

Local CMS: http://localhost:4321/keystatic (local file storage outside production).

## 9. Build and deployment

```sh
pnpm build    # = pnpm load (load:sheets + load:vega, both NEED NETWORK) && astro build
pnpm preview  # preview the build
```

- `pnpm load` **overwrites tracked files** in `src/data/` (`text.json`, `balance.json`, `sankey*.json`, …) with live Google Sheets data. A local build can therefore produce unrelated git diffs. Do not commit those diffs unless that is intended.
- To build without refreshing data: `pnpm astro build`.
- Output goes to `dist/` (Cloudflare Pages SSR worker).
- **Deployment [Assumption]**: Cloudflare Pages git integration on the `master` branch of `protect-ukraine-now/pun`. There are no CI workflows (`.github/` is absent). The README section "Manual deployment: just edit this file to trigger" and the many `publish` commits suggest that any push to `master` deploys, and that the build step refreshes Sheets data. Confirm this in the Cloudflare dashboard.
- Git remotes in this checkout: `origin` = fork `alik78/pun`, `upstream` = `protect-ukraine-now/pun`. The default branch is **`master`** (there is no `main`).

## 10. Testing and verification

- **No test framework and no tests.** `vs.pun.esproj` mentions Jest, but Jest is not installed. **[Confirmed]**
- **Linting is effectively broken**: `.eslintrc.cjs` extends `@rakkasjs` (a remnant of an earlier Rakkas version), which is not in `package.json` or the lockfile. There is no ESLint or Prettier dependency or script. **[Confirmed]**
- Formatting: `.editorconfig` (tabs for code, LF line endings).
- Type checking is available: `pnpm astro check` (`@astrojs/check` is a dependency).
- Practical verification: `pnpm astro build`, `pnpm preview`, and a manual check of the affected routes in both brands and both languages.

## 11. Known limitations and maintenance concerns

1. **Hard-coded API keys in source** (Google Civic Info key in `src/actions/representatives.ts`, Google Sheets key in `src/data/load-sheets.js`, ApiFlash key in `src/pages/shot/[...rest].ts`). They are public in git history. Rotating them or moving them to env vars should be a separate task.
2. **Build log leaks env values**: `astro.config.mjs` prints every `VITE_*` / `*KEYSTATIC_*` variable, including `KEYSTATIC_SECRET`, and inlines them into the bundle.
3. **Non-deterministic builds**: `pnpm build` depends on live Google Sheets and rewrites tracked data files.
4. **No tests, no working lint, no CI.** Changes can only be verified manually.
5. **No real 404**: unknown content slugs render an empty page with 200, and other unknown paths redirect to `/`.
6. **Single site-wide `<title>` and description.** There is no per-page metadata.
7. **Module-level mutable state** (`tools/location.ts`, `tools/country.ts`) stores `Astro` globally across requests. **[Assumption]** This is safe only because each render primes it first. Every new page must call `useLocation(Astro)` (or use a layout that calls `setup`).
8. Dead or unused code: `MenuBar._MenuItem` references undefined identifiers, and `README.md` front-matter exists for Keystatic. Leave these untouched unless a task targets them.
9. The `.frontmatter/`, `.pages.yml` and `keystatic.config.ts` CMS schemas must stay consistent when collections change.
10. `.nvmrc` (Node 22.2.0) is incompatible with the pinned pnpm 10.29.3 (needs Node ≥ 22.13). See §8.
11. Dependencies have not been updated since roughly October 2024 (Astro 4). Per project policy, do **not** upgrade unless a task requires it.

## Maintenance principles (from Task 001)

Make minimal changes. Do not modernize or upgrade, do not refactor unrelated code, reuse existing patterns, add no new dependencies, and preserve existing routes and deployment behavior. Keep this document in sync with meaningful changes.
