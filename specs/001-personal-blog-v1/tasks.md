# Tasks: Blog Pessoal V1

**Input**: Design documents from `/specs/001-personal-blog-v1/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/public-surface.md, quickstart.md

**Tests**: Validation tasks are included because the constitution and quickstart require build/render, content metadata, SEO, RSS, sitemap, accessibility, and responsive checks.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1, US2, US3, US4)
- Each task includes exact file paths

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Create the Astro project baseline and shared directories.

- [X] T001 Create Astro project baseline in package.json, package-lock.json, astro.config.mjs, tsconfig.json, and src/env.d.ts
- [X] T002 Configure npm scripts for dev, check, build, and preview in package.json
- [X] T003 Add Astro integrations @astrojs/rss and @astrojs/sitemap in package.json and package-lock.json
- [X] T004 Set Node.js version requirement in .nvmrc and package.json
- [X] T005 [P] Create source directories in src/content/posts/.gitkeep, src/components/.gitkeep, src/layouts/.gitkeep, src/data/.gitkeep, src/styles/.gitkeep, and tests/render/.gitkeep
- [X] T006 [P] Add public asset placeholder in public/favicon.svg
- [X] T007 [P] Add repository README with Astro/Vercel local commands in README.md

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish content, metadata, layout, and validation primitives required by every story.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T008 Define shared site metadata, pt-BR locale, canonical base URL placeholder, and navigation labels in src/data/site.ts
- [X] T009 Configure static output, site URL, and @astrojs/sitemap integration in astro.config.mjs
- [X] T010 Define posts content collection schema requiring title, slug, date, and description in src/content.config.ts
- [X] T011 Implement post query helpers for public posts, newest-first sorting, slug uniqueness, and canonical paths in src/data/posts.ts
- [X] T012 Create SEO head component for title, description, canonical URL, RSS link, and lang support in src/components/SeoHead.astro
- [X] T013 Create base layout with top blog name, pt-BR html lang, semantic main landmark, shared navigation, and global stylesheet import in src/layouts/BaseLayout.astro
- [X] T014 Create restrained readable global styles for typography, links, layout width, focus states, and responsive behavior in src/styles/global.css
- [X] T015 [P] Add three valid Markdown fixture posts across at least two years and three months in src/content/posts/primeiro-post.md, src/content/posts/segundo-post.md, and src/content/posts/terceiro-post.md
- [X] T016 [P] Add invalid-content fixture documentation for manual validation cases in tests/content/README.md

**Checkpoint**: Foundation ready - content can be loaded, metadata is validated, and shared layout exists.

---

## Phase 3: User Story 1 - Ler posts recentes (Priority: P1) MVP

**Goal**: Readers can open Home, see the blog name, view all publicable posts newest first, and open individual Post pages.

**Independent Test**: With at least three valid posts, Home shows all posts in reverse chronological order and each listed post opens a readable Post page.

### Implementation for User Story 1

- [X] T017 [P] [US1] Create post list component rendering title, date, description, and Post links in src/components/PostList.astro
- [X] T018 [US1] Implement Home page with all publicable posts newest first and empty-state copy in src/pages/index.astro
- [X] T019 [P] [US1] Implement dynamic Post route with getStaticPaths for publicable slugs in src/pages/posts/[slug].astro
- [X] T020 [US1] Add Home and Post SEO metadata integration through SeoHead in src/pages/index.astro and src/pages/posts/[slug].astro
- [X] T021 [P] [US1] Add generated HTML assertions for Home order, top blog name, and Post page content in tests/render/home-post.mjs
- [X] T022 [US1] Add npm script for render assertions in package.json

**Checkpoint**: User Story 1 is fully functional and testable independently.

---

## Phase 4: User Story 2 - Navegar por anos e meses (Priority: P2)

**Goal**: Readers can use archive navigation for only populated years/months, with an equivalent small-screen experience and no archive pages.

**Independent Test**: With posts across multiple years/months, Home archive navigation shows only populated groups and links to Home sections in no more than three interactions.

### Implementation for User Story 2

- [X] T023 [US2] Add archive grouping helper for year/month groups and pt-BR month labels in src/data/posts.ts
- [X] T024 [P] [US2] Create archive navigation component for populated year/month groups in src/components/ArchiveNav.astro
- [X] T025 [US2] Add year/month Home sections and anchors without creating archive pages in src/pages/index.astro
- [X] T026 [US2] Integrate ArchiveNav into Home sidebar layout in src/pages/index.astro
- [X] T027 [US2] Add responsive archive navigation styles for desktop sidebar and small-screen equivalent in src/styles/global.css
- [X] T028 [P] [US2] Add generated HTML assertions for populated-only archive links and in-page targets in tests/render/archive-nav.mjs

**Checkpoint**: User Story 2 is fully functional and testable independently after US1.

---

## Phase 5: User Story 3 - Conhecer o autor (Priority: P3)

**Goal**: Readers can access a static pt-BR About page from public navigation.

**Independent Test**: From any public page, About is reachable in no more than two interactions and includes its own SEO metadata.

### Implementation for User Story 3

- [X] T029 [P] [US3] Implement static About page content in pt-BR in src/pages/about.astro
- [X] T030 [US3] Add About link to shared public navigation in src/layouts/BaseLayout.astro
- [X] T031 [US3] Add About SEO metadata through SeoHead in src/pages/about.astro
- [X] T032 [P] [US3] Add generated HTML assertions for About navigation, pt-BR content, and metadata in tests/render/about.mjs

**Checkpoint**: User Story 3 is fully functional and testable independently after shared navigation exists.

---

## Phase 6: User Story 4 - Manter posts em Markdown (Priority: P4)

**Goal**: Maintainers can add one valid Markdown post and see it reflected in Home, Post page, archive navigation, RSS, and sitemap without CMS or admin features.

**Independent Test**: Adding a valid Markdown post makes it appear in all public outputs; invalid metadata or duplicate slugs are blocked from public outputs.

### Implementation for User Story 4

- [X] T033 [P] [US4] Add content validation script for required frontmatter, date parsing, slug format, and duplicate slugs in tests/content/validate-posts.mjs
- [X] T034 [US4] Add npm script for content validation in package.json
- [X] T035 [P] [US4] Implement RSS feed route with all publicable posts newest first in src/pages/rss.xml.js
- [X] T036 [P] [US4] Implement robots.txt route pointing to the sitemap index in src/pages/robots.txt.ts
- [X] T037 [US4] Add authoring guide for adding Markdown posts and V1 exclusions in README.md
- [X] T038 [P] [US4] Add generated output assertions for RSS, sitemap index, robots.txt, and excluded invalid posts in tests/render/feeds-and-sitemap.mjs
- [X] T039 [US4] Update npm scripts to run content, render, and build validations together in package.json

**Checkpoint**: User Story 4 is fully functional and testable independently after public routes exist.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verify quality gates across all user stories and prepare for Vercel deployment.

- [X] T040 Run Astro type/content validation and fix reported issues in src/content.config.ts, src/data/posts.ts, and src/pages/posts/[slug].astro
- [X] T041 Run production build and fix generated-route issues in astro.config.mjs, src/pages/index.astro, src/pages/about.astro, src/pages/posts/[slug].astro, src/pages/rss.xml.js, and src/pages/robots.txt.ts
- [X] T042 [P] Review reading typography, focus states, mobile layout, and sidebar behavior in src/styles/global.css and src/layouts/BaseLayout.astro
- [X] T043 [P] Verify SEO metadata coverage for Home, Post, About, RSS discovery, and canonical URLs in src/components/SeoHead.astro, src/pages/index.astro, src/pages/about.astro, and src/pages/posts/[slug].astro
- [X] T044 [P] Verify V1 exclusions by scanning for tags, dark mode, search, comments, CMS, admin, authentication, private routes, and databases in src/pages/, src/components/, src/data/, and README.md
- [X] T045 Document Vercel deployment settings and production site URL setup in README.md
- [X] T046 Run quickstart validation checklist and record any fixes in specs/001-personal-blog-v1/quickstart.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; can start immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **US1 (Phase 3)**: Depends on Foundational; MVP delivery.
- **US2 (Phase 4)**: Depends on US1 Home page and post helpers.
- **US3 (Phase 5)**: Depends on Foundational; can run after US1 or in parallel with US2 once BaseLayout exists.
- **US4 (Phase 6)**: Depends on US1 routes and Foundational content helpers; should complete after US2 so archive/RSS/sitemap share the same publicable post rules.
- **Polish (Phase 7)**: Depends on desired user stories being complete.

### User Story Dependencies

- **US1 - Ler posts recentes**: No story dependency after Foundation; suggested MVP.
- **US2 - Navegar por anos e meses**: Depends on US1 because archive sections live on Home.
- **US3 - Conhecer o autor**: Independent after Foundation and shared navigation.
- **US4 - Manter posts em Markdown**: Depends on US1 and US2 output rules for publicable posts and archive grouping.

### Within Each User Story

- Shared content schema and helpers before pages.
- Components before page integration.
- Pages before generated HTML assertions.
- Public outputs before RSS/sitemap/robots validation.
- Story complete before moving to the next priority unless parallel work is on disjoint files.

## Parallel Opportunities

- T005, T006, and T007 can run in parallel after package baseline begins.
- T015 and T016 can run in parallel after content directories exist.
- T017 can run in parallel with T018 preparation, but T018 integration depends on T017.
- T024 can run in parallel with T023 if its props contract is agreed in the task handoff.
- T029 can run in parallel with US2 after BaseLayout exists.
- T042, T043, and T044 can run in parallel during polish.

## Parallel Example: US1

```bash
Task: "T017 [P] [US1] Create post list component rendering title, date, description, and Post links in src/components/PostList.astro"
Task: "T021 [P] [US1] Add generated HTML assertions for Home order, top blog name, and Post page content in tests/render/home-post.mjs"
```

## Parallel Example: US2

```bash
Task: "T023 [US2] Add archive grouping helper for year/month groups and pt-BR month labels in src/data/posts.ts"
Task: "T024 [P] [US2] Create archive navigation component for populated year/month groups in src/components/ArchiveNav.astro"
```

## Parallel Example: US3

```bash
Task: "T029 [P] [US3] Implement static About page content in pt-BR in src/pages/about.astro"
Task: "T032 [P] [US3] Add generated HTML assertions for About navigation, pt-BR content, and metadata in tests/render/about.mjs"
```

## Parallel Example: US4

```bash
Task: "T033 [P] [US4] Add content validation script for required frontmatter, date parsing, slug format, and duplicate slugs in tests/content/validate-posts.mjs"
Task: "T035 [P] [US4] Implement RSS feed route with all publicable posts newest first in src/pages/rss.xml.js"
```

## Implementation Strategy

### MVP First (US1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational.
3. Complete Phase 3: US1.
4. Validate Home and Post rendering with `npm run build` and `tests/render/home-post.mjs`.
5. Demo Home listing and Post pages before adding archive/About/RSS.

### Incremental Delivery

1. Add US1 to deliver readable Home and Post pages.
2. Add US2 to improve chronological discovery without adding search or archive pages.
3. Add US3 to complete the public page set.
4. Add US4 to complete Markdown maintenance, RSS, sitemap, and robots.
5. Run Polish checks before Vercel deployment.

### Validation Commands

```bash
npm run check
npm run validate:content
npm run validate:render
npm run build
npm run preview
```

## Notes

- Keep the architecture static and Astro-native.
- Keep public reader pages limited to Home, Post, and About.
- Do not add tags, dark mode, search, comments, CMS, admin, authentication, private areas, server-only content sources, or databases.
- Use Markdown posts and schema validation as the only content maintenance workflow.
