# Implementation Plan: Blog Pessoal V1

**Branch**: `001-personal-blog-v1` | **Date**: 2026-04-21 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-personal-blog-v1/spec.md`

## Summary

Build a static personal blog in Astro for pt-BR readers, with Markdown posts as
the source of truth, Home/Post/About pages, reverse-chronological post listing,
archive navigation by populated years and months, RSS, sitemap, basic SEO, and
Vercel deployment. The technical approach favors Astro's static output and
content collections so the V1 stays fast, easy to maintain, and free of CMS,
comments, auth, admin UI, search, tags, and dark mode.

## Technical Context

**Language/Version**: TypeScript with Astro current stable; Node.js `>=22.12.0` even-numbered LTS compatible with current Astro requirements  
**Primary Dependencies**: Astro, Astro content collections, `@astrojs/rss`, `@astrojs/sitemap`  
**Storage**: Markdown files in the repository (`src/content/posts/`) plus static About content  
**Testing**: `astro check`, `astro build`, content schema validation, generated HTML checks, RSS/sitemap checks, responsive smoke checks  
**Target Platform**: Static site deployed to Vercel  
**Project Type**: Static content website  
**Content Source**: Local Markdown posts with frontmatter (`title`, `slug`, `date`, `description`)  
**Rendering Strategy**: Static generation for Home, About, Post routes, in-page archive anchors on Home, RSS, robots, and sitemap  
**Performance Goals**: Main content visible within 2 seconds on a common web connection; no client JavaScript required for core reading/navigation  
**Constraints**: pt-BR only; V1 pages limited to Home, Post, About; no tags, dark mode, search, comments, CMS, admin, authentication, or private areas  
**Scale/Scope**: Personal blog V1; all posts listed on Home; archive sidebar contains only populated year/month groups

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **V1 scope**: PASS. The plan includes only Home, Post, About, RSS, robots, and
  sitemap, and explicitly excludes CMS, comments, admin, authentication, private
  areas, search, tags, and dark mode.
- **Content source**: PASS. Posts remain Markdown files in the repository with
  required frontmatter and deterministic slug routes.
- **Chronology & navigation**: PASS. Home lists every public post in reverse
  chronological order; archive navigation derives year/month groups only from
  populated posts, links to in-page Home sections, and has a responsive
  equivalent for small screens.
- **Performance & readability**: PASS. Static generation, shared semantic
  layouts, restrained CSS, no required client JavaScript, and responsive reading
  checks satisfy the constitution.
- **SEO & identity**: PASS. Page-specific titles/descriptions/canonicals,
  `lang="pt-BR"`, RSS, sitemap, robots, and original visual design are planned.
- **Maintainability**: PASS. Adding a post requires one Markdown file with valid
  frontmatter; build checks protect frontmatter, routing, archive generation,
  SEO, RSS, and sitemap output.

**Post-Design Re-check**: PASS. Phase 1 artifacts preserve the same gates:
content collections enforce metadata, contracts define only static public
interfaces, and quickstart validates build output without adding excluded V1
features.

## Project Structure

### Documentation (this feature)

```text
specs/001-personal-blog-v1/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── public-surface.md
└── tasks.md
```

### Source Code (repository root)

```text
public/
└── favicon.svg

src/
├── content.config.ts
├── content/
│   └── posts/
│       └── *.md
├── data/
│   └── site.ts
├── layouts/
│   └── BaseLayout.astro
├── components/
│   ├── ArchiveNav.astro
│   ├── PostList.astro
│   └── SeoHead.astro
├── pages/
│   ├── index.astro
│   ├── about.astro
│   ├── rss.xml.js
│   ├── robots.txt.ts
│   └── posts/
│       └── [slug].astro
└── styles/
    └── global.css

tests/
├── render/
├── accessibility/
└── content/
```

**Structure Decision**: Use a single Astro static-site project. Keep shared site
metadata in `src/data/site.ts`, enforce Markdown metadata in
`src/content.config.ts`, generate all reading routes under `src/pages/`, and
avoid backend, database, API, CMS, or client application layers.

## Complexity Tracking

No constitution violations or justified complexity exceptions.
