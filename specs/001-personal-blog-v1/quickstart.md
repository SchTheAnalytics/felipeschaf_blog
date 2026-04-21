# Quickstart: Blog Pessoal V1

## Prerequisites

- Node.js `>=22.12.0` on an even-numbered LTS line compatible with the current Astro release.
- npm available locally.
- Vercel project configured after the first repository push.

## Bootstrap

```bash
npm create astro@latest . -- --template minimal
npm install
npm install @astrojs/rss @astrojs/sitemap
```

Keep the project static. Do not add an SSR adapter unless a future constitution
amendment adds server-rendered behavior.

## Expected Configuration

- `astro.config.mjs` sets the production `site` URL.
- `@astrojs/sitemap` is registered in Astro integrations.
- RSS is generated at `src/pages/rss.xml.js`.
- Robots is generated at `src/pages/robots.txt.ts`.
- Posts live under `src/content/posts/*.md`.
- Post schema requires `title`, `slug`, `date`, and `description`.
- Public reading pages are limited to `/`, `/posts/{slug}/`, and `/about/`.
- Archive navigation links to populated year/month sections on `/`; it does not
  create archive pages in V1.

## Add a Post

1. Create a Markdown file under `src/content/posts/`.
2. Add frontmatter with `title`, `slug`, `date`, and `description`.
3. Write the post body in Markdown.
4. Run validation commands before publishing.

## Validate Locally

```bash
npm run validate
npm run check
npm run validate:content
npm run build
npm run validate:render
npm run preview
```

Manual smoke checks:

- Home shows all publicable posts newest first.
- Sidebar shows only years/months that have posts and links to Home sections.
- Small-screen archive navigation remains accessible.
- Post page renders Markdown semantics correctly.
- About is reachable from public navigation.
- `/rss.xml` contains all publicable posts.
- `/sitemap-index.xml` exists and includes public pages.
- `/robots.txt` references the sitemap.
- View source confirms `lang="pt-BR"`, title, description, and canonical links.

Validated locally with `npm run validate` on 2026-04-21 after implementation.

## Deploy to Vercel

1. Push the repository branch.
2. Import the project in Vercel.
3. Use the Astro framework preset and static output defaults.
4. Configure the production site URL used by Astro metadata.
5. Verify the deployed Home, Post, About, RSS, sitemap, and robots URLs.

## Out of Scope Guardrails

Do not add tags, dark mode, search, comments, CMS, painel admin, authentication,
private areas, server-only content sources, or databases in V1.
