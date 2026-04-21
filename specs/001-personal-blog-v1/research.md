# Research: Blog Pessoal V1

## Decision: Use Astro as a fully static site for Vercel

**Rationale**: The V1 has no auth, comments, CMS, search, personalization, or
server-only data. Astro static output keeps the runtime simple and aligns with
Vercel's support for static Astro deployments with no extra configuration.
Current Astro docs require an even-numbered compatible Node.js version and list
`v22.12.0` as the minimum supported version.

**Alternatives considered**:
- Astro SSR or hybrid output: rejected because V1 has no server-rendered
  behavior and would add adapter/runtime complexity.
- Next.js or another app framework: rejected because the approved stack is
  Astro and the product is content-focused.

**Sources**:
- Astro Vercel deployment docs: https://docs.astro.build/en/guides/deploy/vercel/
- Astro environment setup docs: https://docs.astro.build/en/tutorial/1-setup/1/
- Vercel Astro framework docs: https://vercel.com/docs/frameworks/frontend/astro

## Decision: Store posts as local Markdown content collections

**Rationale**: Astro content collections support local Markdown posts, querying
entries for templates, and schema-backed metadata validation. This matches the
constitution's Markdown-as-source-of-truth rule and keeps maintenance to a file
edit plus build validation.

**Alternatives considered**:
- Raw filesystem parsing without content collections: rejected because it would
  duplicate validation and typing that Astro provides.
- MDX: rejected for V1 because the requested content format is Markdown and MDX
  would expand authoring power beyond the current simplicity target.
- CMS or remote data source: rejected by scope.

**Sources**:
- Astro content collections docs: https://docs.astro.build/en/guides/content-collections/
- Astro content loader reference: https://docs.astro.build/en/reference/content-loader-reference/

## Decision: Generate RSS with `@astrojs/rss`

**Rationale**: Astro's official RSS helper is designed for blogs and content
websites, supports static builds, and can derive feed items from the same
published post collection used by Home and Post pages.

**Alternatives considered**:
- Hand-written XML: rejected because it increases maintenance and validation
  risk.
- Omitting RSS: rejected because RSS is required for V1.

**Sources**:
- Astro RSS recipe: https://docs.astro.build/en/recipes/rss/

## Decision: Generate sitemap with `@astrojs/sitemap`

**Rationale**: The official sitemap integration crawls statically generated
routes and requires the deployed `site` URL, which fits the Vercel static
deployment. It can generate sitemap files during build without custom XML code.

**Alternatives considered**:
- Manual sitemap generation: rejected because the official integration already
  covers static routes and dynamic `getStaticPaths()` routes.
- Deferring sitemap: rejected because sitemap is required for V1.

**Sources**:
- Astro sitemap integration docs: https://docs.astro.build/en/guides/integrations-guide/sitemap/

## Decision: Keep archive navigation derived and in-page

**Rationale**: Year/month groups are a view over post publication dates. Deriving
them from valid posts prevents empty groups, avoids duplicated data, and keeps
the sidebar synchronized with Home, RSS, and sitemap. Because V1 public reading
pages are limited to Home, Post, and About, archive navigation should link to
year/month anchors or sections within Home rather than create archive pages.

**Alternatives considered**:
- Manually configured archive tree: rejected because it can drift from content.
- Dedicated archive pages: rejected because V1 page scope is Home, Post, and
  About only.
- Tags/categories: rejected because tags are explicitly out of scope for V1.

## Decision: Use pt-BR as the only locale

**Rationale**: A single-language V1 reduces routing, sitemap, and SEO complexity.
All public pages should declare pt-BR language and use Portuguese labels.

**Alternatives considered**:
- Multi-language routing: rejected because no second locale is in scope.

## Decision: Validate by build output, not runtime behavior

**Rationale**: Because V1 is static, meaningful validation is concentrated in
content schema checks, static build, generated HTML assertions, RSS/sitemap
existence, canonical metadata, and responsive smoke checks.

**Alternatives considered**:
- End-to-end auth/admin scenarios: rejected because those flows are out of
  scope.
- Heavy observability setup: rejected because there is no server runtime in V1.
