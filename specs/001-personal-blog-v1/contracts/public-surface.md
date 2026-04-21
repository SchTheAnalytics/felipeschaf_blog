# Contract: Public Surface and Generated Outputs

This contract defines the public routes, generated artifacts, and visible
requirements for Blog Pessoal V1. It is intentionally static and contains no API,
authentication, admin, CMS, comments, search, tags, or dark mode contract.

## Global Requirements

- Every public HTML page MUST declare `lang="pt-BR"`.
- Every public HTML page MUST render the blog name in the top area.
- Every public HTML page MUST include a unique `<title>`, meta description, and
  canonical link.
- Core reading and archive navigation MUST work without client-side JavaScript.
- Archive navigation MUST use Home sections or anchors; it MUST NOT introduce
  archive pages in V1.
- Visual design MUST be original and must not copy the identity of external
  references.

## Route: Home

**Path**: `/`

**Purpose**: Show the blog name, all publicable posts in reverse chronological
order, and archive navigation.

**Required Content**:
- Blog name.
- Post list containing every publicable post.
- For each listed post: title, publication date, description or summary, and
  link to the Post route.
- Archive navigation containing only years/months with publicable posts.
- Year/month targets as sections or anchors on the Home page.
- Empty-state message when no posts are publicable.

**Validation**:
- The newest post appears first.
- No invalid or duplicate-slug post appears.
- No empty year or month appears in archive navigation.
- Archive links do not navigate outside Home, Post, or About page scope.

## Route: Post

**Path**: `/posts/{slug}/`

**Purpose**: Render one publicable Markdown post.

**Required Content**:
- Blog name.
- Post title.
- Publication date.
- Full rendered Markdown body.
- SEO metadata using the post title, description, and canonical URL.

**Validation**:
- A route exists for every publicable post.
- No route is generated for invalid post metadata.
- Markdown headings, paragraphs, links, lists, images, and code blocks remain
  semantic after rendering.

## Route: About

**Path**: `/about/`

**Purpose**: Present static pt-BR information about the author or blog.

**Required Content**:
- Blog name.
- Static About content in pt-BR.
- SEO metadata specific to About.

**Validation**:
- About is reachable from public navigation in no more than two interactions.
- About does not introduce comments, contact forms requiring backend, login, or
  admin behavior.

## Generated Artifact: RSS

**Path**: `/rss.xml`

**Purpose**: Expose all publicable posts for subscription.

**Required Content**:
- Feed title and description in pt-BR.
- Absolute links for each post.
- All publicable posts sorted newest first.

**Validation**:
- Includes every publicable post exactly once.
- Excludes invalid posts and non-post pages.

## Generated Artifact: Sitemap

**Path**: `/sitemap-index.xml` and generated sitemap files

**Purpose**: Expose discoverable public pages to search engines.

**Required Content**:
- Home.
- About.
- Every publicable Post route.

**Validation**:
- Includes every publicable public page.
- Excludes invalid posts and out-of-scope surfaces.

## Generated Artifact: Robots

**Path**: `/robots.txt`

**Purpose**: Allow crawling and reference the sitemap index.

**Required Content**:
- Allow all public pages.
- Absolute sitemap URL.

**Validation**:
- References the configured site URL.
- Does not block Home, About, or Post pages.
