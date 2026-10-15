# Support Pages — Implementation Plan

Plan for adding **Support**, **End User Agreement** and **Privacy Policy** pages for App Store / Google Play compliance.
Status: **implemented (Task 002), legal content pending.** See `docs/PROJECT_OVERVIEW.md` for architecture background.

## Implementation status (Task 002)

| Page | URL | File | State |
|---|---|---|---|
| Support | `/en/support` | `src/content/pages/support-en.mdoc` | Done: intro, contact (`mailto:support@protectukrainenow.org`), account-deletion steps, links to legal pages |
| End User Agreement | `/en/end-user-agreement` | `src/content/pages/end-user-agreement-en.mdoc` | Full text inserted (Effective July 4, 2026). §21 set to Illinois / Cook County, Illinois |
| Privacy Policy | `/en/privacy` | `src/content/pages/privacy-en.mdoc` | Full text inserted (Effective July 4, 2026). Former `[Insert …]` placeholders (§11, §13, §20) replaced with a referral to support@protectukrainenow.org |

- Implemented as planned: only the three `.mdoc` files were added. No code, route, config, navigation or dependency changes. Deviation: the End User Agreement URL is `/en/end-user-agreement` instead of the `/en/terms` specified in Task 002 (owner decision).
- English only. `/uk/...` falls back to English through the unchanged `Markdown.astro` fallback.
- Verified by code inspection only. Dependencies are not installed in this checkout, so pages have not been rendered in a running app yet (see §8).

- Navigation (added after Task 002 at owner request): `support` appended to the `pun` header menu in `src/layouts/Base.astro` (links to `/<lang>/support`, desktop and mobile menus), with labels `menu.support` added to `src/data/text.json` (en "Support", uk "Підтримка"). The UAT menu is unchanged. **The same row must be added to the Google Sheet behind `text.json`**, otherwise `pnpm load` (part of `pnpm build`) removes the labels and the menu shows the raw key `menu.support`.

**Remaining work before submitting the URLs to Apple/Google:**
1. Resolve the "Terms of Use" references (the agreement is titled "End User Agreement").
2. Run the runtime checks in §8 (render all three pages, check links and rendered content).
3. Deploy, then verify the production URLs.

## Recommended approach (fewest modifications)

Reuse the existing **content-page catch-all route** `src/pages/[lang]/[page].astro`. It already renders any `src/content/pages/<slug>-<lang>.mdoc` inside the `Article` layout with the site header and footer. Pages such as `about` and `methodology` already work this way.

**Adding three `.mdoc` content files is enough to publish the pages. No code, route, config or dependency change is needed.**

## 1. Recommended URL paths

| Page | URL (canonical, submit to stores) | Content file |
|---|---|---|
| Support | `https://protectukrainenow.org/en/support` | `src/content/pages/support-en.mdoc` |
| End User Agreement | `https://protectukrainenow.org/en/end-user-agreement` | `src/content/pages/end-user-agreement-en.mdoc` |
| Privacy Policy | `https://protectukrainenow.org/en/privacy` | `src/content/pages/privacy-en.mdoc` |

Notes:
- Paths must include the language segment. One-segment paths like `/support` hit `404.astro`, which redirects to `/`.
- Slugs were checked against existing routes and `public/` files and do not collide. `public/support.webp` is served at `/support.webp`, which is a different path. Static routes (`call`, `news`, `report`, `tiles`) take precedence only for their own names.
- Slug decided: `end-user-agreement` (changed from the originally planned `terms` before any deployment or store submission, to match the page name). It must stay stable once submitted.
- The pages will also respond on the UAT domain (same deployment) and under `/uk/...` (falling back to English). This is harmless, but the URLs submitted to the stores should be the PUN `/en/...` ones.

## 2. New files required

```
src/content/pages/support-en.mdoc
src/content/pages/end-user-agreement-en.mdoc
src/content/pages/privacy-en.mdoc
```

Format, matching existing files such as `about-en.mdoc`:

```markdown
---
title: Support EN
---
# Support

…content (supplied separately)…

- [End User Agreement](/en/end-user-agreement)
- [Privacy Policy](/en/privacy)
```

- Use front-matter `title: <Name> EN`. Keystatic derives the filename slug from `title` (`slugField: 'title'`), so `Support EN` → `support-en` keeps the files editable in the CMS without renames.
- The front-matter title is **not displayed**. Each page needs its own `# H1`, which gets the site's blue and yellow underline from `Article.astro`.
- The Support page links to the other two with relative `/en/...` links. Contact information and account-deletion instructions are placeholders until the content is supplied. Do not describe an automated deletion flow.
- Plain Markdown is enough. No custom Markdoc tags are needed.

## 3. Existing files requiring modification

**None required.**

Optional changes, only if requested (each is a separate, small decision):
- Add `support` (and/or others) to the `pun` header menu in `src/layouts/Base.astro`, with labels `menu.support` in `src/data/text.json` (`en` and `uk`). Caveat: `text.json` is regenerated from Google Sheets by `pnpm load:sheets` during `pnpm build`, so **labels added only in the repo would be overwritten whenever `pnpm load` runs** (confirmed: `load-sheets.js` writes `src/data/text.json`). Labels would have to be added in the source spreadsheet.
- Footer links: `Footer.tsx` currently has only the logo and email. Adding links means a code change in a shared component that affects every page and both brands.

**Recommendation:** no navigation changes. App stores only need reachable URLs. Discoverability comes from the Support page linking to the two legal pages.

## 4. Components and layouts reused

- Route `src/pages/[lang]/[page].astro` (unchanged)
- Layout `src/layouts/Article.astro` → `Base.astro` (header, footer, GTM, fonts)
- `src/components/Markdown.astro` (entry lookup, language fallback, `prose` typography)

## 5. Navigation and footer

There are none by default (see §3). Revisit only on explicit request.

## 6. Localization

- Ukrainian versions are optional. Without them, `/uk/support` etc. render the English file automatically (`Markdown.astro` fallback).
- To add Ukrainian later, create `support-uk.mdoc`, `end-user-agreement-uk.mdoc` and `privacy-uk.mdoc`. Inside Ukrainian files, cross-links should point to `/uk/...`.
- Legal text: confirm with the content owner whether a translated legal document is binding or whether English is authoritative.
- `<html lang>` follows the URL segment, so `/uk/privacy` showing English content would be tagged `uk`. This is a minor issue.

## 7. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Typo in a slug or filename gives an **empty 200 page**, not a 404 | Store reviewer sees a blank page | Verify the rendered content of each URL, not only the status code |
| Site-wide `<title>` ("Ukraine needs Public Support!") and OG meta on legal pages | Cosmetic. Generic tab title and share preview | Accept, or as a separate change add an optional `title` prop to `Base`/`Article` (touches shared layouts, so it is not in the minimal plan) |
| Pages are dynamic SSR with `Cache-Control: max-age=3600` | Content edits may take up to 1 hour to appear | Acceptable |
| Deploy trigger and process are not documented (assumed Cloudflare Pages on `master`) | Uncertainty about release | Confirm with the maintainer or the Cloudflare dashboard before merge |
| Build runs `pnpm load`, which needs Google Sheets access and rewrites `src/data/*.json` | Unrelated diffs or a build failure | Locally use `pnpm astro build`. Commit only the three `.mdoc` files |
| GTM analytics script loads on the legal pages | Privacy Policy must disclose it | Content owner should mention Google Tag Manager / Analytics in the website section of the policy, if it applies |
| CMS editors could rename or delete the files through Keystatic or Pages CMS | URLs break | Communicate that these slugs are fixed |
| The UAT domain also serves these URLs | Minor brand confusion | Submit only the PUN URLs |

## 8. Testing and verification

There are no automated tests, so verification is manual:

1. `pnpm install` (lockfile only, no upgrades), then `pnpm dev:pun`.
2. Open `http://localhost:4321/en/support`, `/en/end-user-agreement` and `/en/privacy`. Check the header, footer, H1 and full content, and that the links between pages work.
3. Check `/uk/support` (English fallback) and narrow mobile width (hamburger menu).
4. Regression spot check: `/en/about`, `/en/report`, `/en/home`, `/` still behave the same.
5. `pnpm astro check` and `pnpm astro build` (no `load`), then `pnpm preview` and repeat step 2.
6. `git status` shows only the three new `.mdoc` files (plus doc updates).
7. After deploy, verify the production URLs while logged out and in a private window, and with `curl -sI` (expect 200, no redirect). Only then submit them to App Store Connect and Google Play Console.

## Open questions for the product owner

1. ~~Final slug for the End User Agreement~~ Resolved: `end-user-agreement`.
2. Support contact (email or form) and the account-deletion procedure text.
3. Ukrainian versions needed now, or English only?
4. Any header or footer link wanted, or are direct URLs enough?
5. Confirm the deployment pipeline (Cloudflare Pages from `upstream/master`?) and who merges and releases.
