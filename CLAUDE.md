# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"Media Pembelajaran Zayyan" — a Next.js learning-media/practice-question app for an elementary-school student (grade 3 SD). Content and UI text are in Indonesian. Two subjects: Matematika (Puspresnas-olympiad-style questions) and Bahasa Inggris (vocabulary/grammar/conversation/reading). Students pick a subject, then a topic within it (or a mixed "campuran" set scoped to that subject), take a quiz, and see results; an admin-gated area shows attempt history with answer keys and per-question review.

## Commands

```
npm run dev          # start Next.js dev server
npm run build         # production build
npm run start          # run production build
npm run lint            # eslint

npm run db:generate     # drizzle-kit generate — create a migration from schema.ts changes
npm run db:migrate      # drizzle-kit migrate — apply migrations to the configured DB
npm run db:seed         # tsx db/seed.ts — upsert topics/questions from db/seed-data.ts
npm run admin:hash -- "yourpassword"   # bcrypt-hash a password for ADMIN_PASSWORD_HASH
```

There is no test suite configured.

## Environment / database

- Uses libSQL/Turso via drizzle-orm. With `TURSO_DATABASE_URL` unset, both the app (`db/client.ts`) and drizzle-kit (`drizzle.config.ts`) fall back to a local SQLite file `file:local.db` — this is the normal local dev setup, no external DB needed.
- `.env.example` documents the required vars: `TURSO_DATABASE_URL`, `TURSO_AUTH_TOKEN`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`. When setting `ADMIN_PASSWORD_HASH` in `.env`, every `$` in the bcrypt hash must be escaped as `\$`, or Next.js's env loader will try to interpolate it.
- Schema lives in `db/schema.ts`; migrations are generated into `drizzle/`. Change the schema, then run `db:generate` followed by `db:migrate`.
- Question/topic content is seed data, not admin-editable in the UI — edit `db/seed-data.ts` and rerun `npm run db:seed` (upserts by id, safe to rerun).

## Architecture

Next.js App Router (Next 16, React 19) with server components doing data access directly (no separate API layer for reads except where a client component needs to fetch, e.g. `app/api/questions/route.ts`).

**Data layer** (`db/`): drizzle schema with five tables — `subjects` (Matematika / Bahasa Inggris), `topics` (belongs to a subject via `subjectId`), `questions` (belongs to a topic; `multiple_choice` or `short_answer`; has `correctAnswer` + `explanation` which must never be sent to non-admin clients), `quizAttempts` (belongs to a subject via `subjectId`, plus optional `topicFilter`), and `attemptAnswers` (one row per answered question in an attempt). Subject is the top-level scope: a "campuran" (mixed) quiz or the stats/topic-accuracy breakdown never crosses subjects, only topics within one subject.

**`lib/` holds all query/business logic**, kept separate from routes/pages so both server components and API routes can reuse it:
- `lib/subjects.ts` — `getSubjects()`.
- `lib/topics.ts` — `getTopics(subjectId?)`; no argument returns all topics (used for admin/stats lookup maps spanning subjects), with a `subjectId` it filters to that subject's topics.
- `lib/questions.ts` — `getQuestionSet(subjectId, topicId)` returns questions **without** `correctAnswer`/`explanation` (the `PublicQuestion` type strips them). For a specific topic, questions come back in `orderIndex` order; for "campuran" (mixed, `topicId === null`), it joins `topics` to filter by `subjectId`, shuffles all active questions in that subject, and takes the first 15.
- `lib/scoring.ts` — `isAnswerCorrect` normalizes (trim/lowercase/collapse whitespace) before comparing, used for both multiple-choice and short-answer grading.
- `lib/stats.ts` — `getAttempts(subjectId?)` / `getTopicAccuracy(subjectId?)`, aggregate queries for the stats dashboard; unfiltered when called without a subject (used for the combined history table), filtered per-subject for the chart sections.
- `lib/admin-review.ts` — `getAttemptReview` joins an attempt with its answers, questions, correct answers, and explanations — this is the one place full answer keys are assembled, and it's only called from admin-gated code paths.
- `lib/admin-auth.ts` — JWT (jose) session in an httpOnly cookie (`admin_session`); `isAdminRequest()` is the guard called at the top of every admin page/route.

**Routing**: `/` is a subject picker (from `getSubjects()`); `/[subject]` is the per-subject topic picker (from `getTopics(subjectId)`), linking into `/quiz/[subject]/[topicOrMixed]`.

**Quiz flow**: `app/quiz/[subject]/[topicOrMixed]/page.tsx` (server) resolves the subject and topic, loads a question set via `getQuestionSet(subjectId, topicFilter)`, and renders `QuizRunner` (client component, receives `subjectId` as a prop) which drives the actual question-by-question interaction and timing, then POSTs the full attempt (`subjectId`, `topicFilter`, answers + timing) to `app/api/attempts/route.ts`. That route re-fetches the real questions server-side to grade answers (via `isAnswerCorrect`) rather than trusting client-submitted correctness — client only ever sees ungraded questions. Grading writes one `quizAttempts` row (with `subjectId`) and one `attemptAnswers` row per question, then the client is redirected to `app/result/[attemptId]/page.tsx`.

**Admin flow**: `/admin/login` posts to `app/api/admin/login/route.ts`, which bcrypt-compares against `ADMIN_PASSWORD_HASH` and sets the session cookie. All other `/admin/*` pages and `app/api/admin/*` routes call `isAdminRequest()` and redirect/401 if not authenticated. `app/api/admin/attempts/[attemptId]/route.ts` is the only endpoint that returns full answer keys (via `getAttemptReview`).

**Rendering**: quiz and stats pages are marked `export const dynamic = "force-dynamic"` since they read fresh DB state per request (no static caching of attempt/question data).

**Charts**: `app/stats/StatsCharts.tsx` uses Recharts for score/time trend and per-topic accuracy visualizations. `app/stats/page.tsx` renders these three charts once per subject (each fed by `getAttempts(subjectId)` / `getTopicAccuracy(subjectId)`) plus one combined "Riwayat Latihan" history table (unfiltered, with a Mata Pelajaran column) below.
