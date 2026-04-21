---

description: "Task list template for feature implementation"
---

# Tasks: [FEATURE NAME]

**Input**: Design documents from `/specs/[###-feature-name]/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL only when
the feature specification does not request them. Constitution-required
build/render, Markdown/frontmatter, navigation, performance, accessibility, and
SEO validation tasks MUST be included when the implementation affects those
areas.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Static blog**: `content/articles/`, `src/content/`, `src/pages/`,
  `src/layouts/`, `src/components/`, `tests/`
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

<!-- 
  ============================================================================
  IMPORTANT: The tasks below are SAMPLE TASKS for illustration purposes only.
  
  The /speckit.tasks command MUST replace these with actual tasks based on:
  - User stories from spec.md (with their priorities P1, P2, P3...)
  - Feature requirements from plan.md
  - Entities from data-model.md
  - Pages, routes, or interfaces from contracts/
  
  Tasks MUST be organized by user story so each story can be:
  - Implemented independently
  - Tested independently
  - Delivered as an MVP increment
  
  DO NOT keep these sample tasks in the generated tasks.md file.
  ============================================================================
-->

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 Initialize [language] project with [framework] dependencies
- [ ] T003 [P] Configure linting, formatting, and build/render validation tools
- [ ] T004 [P] Create Markdown article content directory and sample fixture

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [ ] T005 Define article frontmatter schema and validation rules
- [ ] T006 [P] Implement Markdown loading and rendering pipeline
- [ ] T007 [P] Implement chronological article index grouped by year and month
- [ ] T008 Create shared layout with top name and responsive archive navigation
- [ ] T009 [P] Configure SEO metadata helpers, sitemap, and robots generation
- [ ] T010 [P] Configure accessibility, readability, and performance checks

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - [Title] (Priority: P1) MVP

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 1 (OPTIONAL - only if tests requested)

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Render test for [page or component] in tests/render/test_[name].[ext]
- [ ] T012 [P] [US1] Accessibility or SEO test for [user journey] in tests/[type]/test_[name].[ext]

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create or update article data type in src/content/[article].[ext]
- [ ] T014 [P] [US1] Add Markdown fixture in content/articles/[slug].md
- [ ] T015 [US1] Implement [page/component] in src/[location]/[file].[ext]
- [ ] T016 [US1] Add validation and error handling for missing article metadata
- [ ] T017 [US1] Add semantic HTML, readable typography, and responsive behavior

**Checkpoint**: At this point, User Story 1 MUST be fully functional and testable independently

---

## Phase 4: User Story 2 - [Title] (Priority: P2)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 2 (OPTIONAL - only if tests requested)

- [ ] T018 [P] [US2] Render test for [page or component] in tests/render/test_[name].[ext]
- [ ] T019 [P] [US2] Navigation test for [archive/listing behavior] in tests/integration/test_[name].[ext]

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create or update [component] in src/components/[component].[ext]
- [ ] T021 [US2] Implement [archive/listing/page] in src/[location]/[file].[ext]
- [ ] T022 [US2] Add SEO metadata for [page type]
- [ ] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 MUST both work independently

---

## Phase 5: User Story 3 - [Title] (Priority: P3)

**Goal**: [Brief description of what this story delivers]

**Independent Test**: [How to verify this story works on its own]

### Tests for User Story 3 (OPTIONAL - only if tests requested)

- [ ] T024 [P] [US3] Render test for [page or component] in tests/render/test_[name].[ext]
- [ ] T025 [P] [US3] SEO or performance test for [user journey] in tests/[type]/test_[name].[ext]

### Implementation for User Story 3

- [ ] T026 [P] [US3] Create or update [content/component] in src/[location]/[file].[ext]
- [ ] T027 [US3] Implement [page behavior] in src/[location]/[file].[ext]
- [ ] T028 [US3] Validate Markdown, chronology, and metadata impact

**Checkpoint**: All user stories MUST now be independently functional

---

[Add more user story phases as needed, following the same pattern]

---

## Phase N: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] TXXX [P] Documentation updates in docs/
- [ ] TXXX Code cleanup and refactoring
- [ ] TXXX Performance optimization across all stories
- [ ] TXXX [P] Additional unit tests (if requested) in tests/unit/
- [ ] TXXX Accessibility and readability review across affected pages
- [ ] TXXX SEO metadata, sitemap, robots, and canonical URL verification
- [ ] TXXX Confirm no CMS, comments, admin panel, authentication, or private areas were introduced
- [ ] TXXX Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but MUST remain independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but MUST remain independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Content schema before renderers
- Renderers before pages and navigation
- Core implementation before SEO, accessibility, and integration verification
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Content fixtures, schemas, and components within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Render test for [page or component] in tests/render/test_[name].[ext]"
Task: "Navigation or SEO test for [user journey] in tests/integration/test_[name].[ext]"

# Launch independent content and component work for User Story 1 together:
Task: "Create article schema in src/content/article.[ext]"
Task: "Create article fixture in content/articles/[slug].md"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story MUST be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
