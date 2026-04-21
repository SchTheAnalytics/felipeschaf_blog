# Data Model: Blog Pessoal V1

## Entity: Post

**Purpose**: Published Markdown content rendered on Home, Post pages, archive
navigation, RSS, and sitemap.

**Fields**:
- `title` (string, required): Human-readable post title.
- `slug` (string, required): Stable URL segment, unique across all posts.
- `date` (date, required): Publication date used for ordering and archive
  grouping.
- `description` (string, required): Summary used in Home previews, metadata,
  RSS, and SEO description.
- `body` (Markdown, required): Main post content.
- `isPublicable` (derived boolean): True when required metadata is present,
  valid, and non-conflicting.

**Validation Rules**:
- `title`, `slug`, `date`, `description`, and Markdown body MUST be present.
- `slug` MUST be URL-safe, readable, stable, and unique.
- `date` MUST be parseable and is the only source for ordering and year/month
  grouping.
- Posts with invalid metadata MUST NOT appear in Home, sidebar, Post pages, RSS,
  or sitemap.

**Relationships**:
- Belongs to one `ArchiveMonth` derived from `date`.
- Produces one `PublicPage` of type `Post`.
- May appear in one `Feed` and one `Sitemap` when publicable.

## Entity: ArchiveYear

**Purpose**: Derived group used for archive navigation.

**Fields**:
- `year` (number, required): Four-digit year.
- `months` (ArchiveMonth[], required): Only months containing publicable posts.
- `postCount` (number, derived): Total publicable posts in the year.

**Validation Rules**:
- Archive years with zero publicable posts MUST NOT render.
- Years sort in reverse chronological order.

## Entity: ArchiveMonth

**Purpose**: Derived group used for navigating posts within a year.

**Fields**:
- `year` (number, required): Parent year.
- `month` (number, required): Month number from 1 to 12.
- `label` (string, required): pt-BR month label.
- `posts` (Post[], required): Publicable posts published in this month.

**Validation Rules**:
- Months with zero publicable posts MUST NOT render.
- Months sort in reverse chronological order within each year.

## Entity: PublicPage

**Purpose**: Public reading surface available without authentication.

**Allowed Types**:
- `Home`
- `Post`
- `About`

**Fields**:
- `title` (string, required): Unique page title.
- `description` (string, required): SEO description.
- `canonicalUrl` (URL, required): Absolute canonical URL.
- `language` (string, required): Always `pt-BR`.
- `content` (HTML, required): Rendered readable content.

**Validation Rules**:
- Public page types outside Home, Post, and About are out of scope for V1.
- Every public page MUST be accessible without authentication.
- Every public page MUST include title, description, canonical URL, and semantic
  structure.

## Entity: Feed

**Purpose**: RSS subscription artifact for publicable posts.

**Fields**:
- `url` (URL, required): Feed URL, expected `/rss.xml`.
- `title` (string, required): Blog feed title.
- `description` (string, required): Feed description in pt-BR.
- `items` (Post[], required): All publicable posts, sorted newest first.

**Validation Rules**:
- Feed MUST include only publicable posts.
- Feed MUST not include tags because tags are out of scope.
- Feed MUST use absolute links derived from configured site URL.

## Entity: Sitemap

**Purpose**: Search discovery artifact for all publicable public pages.

**Fields**:
- `url` (URL, required): Sitemap index URL.
- `pages` (PublicPage[], required): Home, About, and all publicable Post pages.

**Validation Rules**:
- Sitemap MUST include all publicable public pages.
- Sitemap MUST not include non-existent Post pages or excluded V1 surfaces.

## State Transitions

```text
Draft Markdown file
  -> Validated post metadata
  -> Publicable post
  -> Included in Home, sidebar, Post page, RSS, sitemap
```

Invalid metadata or duplicate slug returns the post to "Draft Markdown file" for
correction before it can appear in public outputs.
