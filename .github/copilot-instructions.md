# Copilot Instructions for dompub

Portuguese public domain literature site built with Astro. Fully static, GitHub Pages deployment.

## Commands

| Task | Command |
|------|---------|
| **Dev server** | `npm run dev` (localhost:4321) |
| **Build** | `npm run build` (generates `dist/`) |
| **Preview** | `npm run preview` (test build locally) |

No tests, linting, or type-checking scripts. Use TypeScript strict mode in `tsconfig.json`.

## Architecture

**Static content + route generation:**
- Authors stored as markdown in `src/data/authors/*.md` (frontmatter: `name`, `slug`)
- Works stored as markdown in `src/data/works/{authorSlug}/*.md` (frontmatter: `title`, optional `type`)
- `src/data/utils.ts` provides helpers: `getAllAuthors()`, `getAuthorBySlug()`, `getWorksByAuthor()`, `getWorkModule()`
- Each page uses `getStaticPaths()` to generate static HTML at build time

**Routing (3 levels):**
1. `/` → index listing all authors
2. `/{author}` → works by author (from `[author].astro`)
3. `/{author}/{work}` → full work with TOC (from `[author]/[work].astro`)

**URL handling for subrepo:**
- Base path is `/dompub/` on GitHub Pages (configured in `astro.config.mjs`)
- All internal links must use `getUrl()` helper from `src/lib/url.ts` to prefix routes correctly
- Example: `<a href={getUrl('/Camoes')}>` → renders as `/dompub/Camoes`

## Key conventions

**Slug format:**
- Slugs match directory/filename exactly (case-sensitive)
- Example: author slug `Camoes` → directory `src/data/authors/Camoes.md`, not `Camoes.md`
- Accents preserved in frontmatter names, removed from slugs

**Markdown frontmatter:**
- Authors: `name` (required, for display), slug inferred from filename
- Works: `title` (required), `type` (optional: `'verse'` or default `'prose'`) for text alignment
- Footnotes labeled as "Notas" (Portuguese, configured in `astro.config.mjs`)

**CSS/styling:**
- Global styles in `src/styles/global.css`
- Light/dark theme via `data-theme` attribute + localStorage persistence
- Font: Source Serif 4 (Google Fonts)
- Verse content uses `text-align: left` instead of justified

**Language:**
- All content Portuguese (`lang="pt-BR"`)
- No i18n; English not supported

## GitHub Pages deployment

- Workflow: `.github/workflows/deploy.yml`
- Triggered: push to `main` branch (or manual workflow dispatch)
- Build: `npm run build` generates `dist/`
- Deploy: GitHub Actions + `actions/deploy-pages`
- Site URL: `https://joaoguimaraens.github.io/dompub/`
- Config: `astro.config.mjs` has `base: '/dompub'`, `output: 'static'`, `site: 'https://joaoguimaraens.github.io'`

## EditorConfig

- Indent: 2 spaces
- Line endings: CRLF
- Charset: UTF-8

## TypeScript

- Strict mode enabled (`astro/tsconfigs/strict`)
- Type definitions auto-generated in `.astro/` (gitignored)
- No external type packages; use Astro's built-in types
