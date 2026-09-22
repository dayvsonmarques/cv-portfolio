# Admin auth enforcement — design

Status: approved
Date: 2026-09-22
Sub-project: A (of the "admin panel for blog/projects/CV/experience" initiative)

## Problem

The `/admin` panel (users, groups, permissions, content, skills, experience) and every route under `/api/admin/*` are fully built but **not protected**. NextAuth is configured (`src/lib/authOptions.ts`, credentials + bcrypt, JWT session), a seeded admin user exists, and `/admin/login` renders — but nothing in the request path actually checks the session:

- `middleware.ts` only matches `/dashboard` and `/login`, neither of which exist as pages, and its handler body is a no-op.
- `AdminLayout` (`src/app/admin/layout.tsx`) renders the sidebar/header for any request, no session check.
- Every `/api/admin/*` route handler (content, users, groups, permissions, skills, experience) reads/writes the database with no auth check.
- `POST /api/auth/register` is public and lets anyone create a user, including passing an arbitrary `groupId`.

This is live in production: anyone who finds the URL can read/create/edit/delete users, permissions, and site content today.

Additionally, `prisma/seed.ts` hardcodes the initial passwords (`admin123`, `editor123`, `viewer123`) directly in a file committed to git.

## Goals

1. Require a valid session to reach any `/admin` page except login/forgot/reset.
2. Require a valid session to call any `/api/admin/*` route and `POST /api/auth/register`.
3. Keep it simple: any authenticated user (regardless of group/permission) gets full admin access. Per-role restriction (using the already-seeded Admin/Editor/Viewer groups and Permission model) is explicitly deferred, not part of this sub-project.
4. Stop hardcoding seed passwords in git; make them overridable via environment variables.

## Non-goals

- Per-route/per-group permission checks (viewer read-only, editor content-only, etc.) — the schema supports it, but it's future work.
- A password-change UI for existing users (`PATCH /api/admin/users` currently doesn't accept a password field, and `prisma.user.upsert`'s `update: {}` means re-running the seed does not rotate an existing user's password). Out of scope here; noted as a follow-up.
- Any change to `/admin/forgot` / `/admin/reset` (password recovery) behavior — they stay public, unchanged.

## Design

### Central enforcement point: `middleware.ts`

Replace the current no-op middleware with real logic using `getToken` from `next-auth/jwt` (reads the JWT session cookie already configured in `authOptions.ts`, works in Edge middleware without pulling in the full NextAuth/Prisma stack).

**Matcher** (protected paths):
- `/admin/:path*`
- `/api/admin/:path*`
- `/api/auth/register`

**Inside the middleware**, for a matched request:
1. Skip enforcement for the allowlisted public admin pages: `/admin/login`, `/admin/forgot`, `/admin/reset` (must stay reachable without a session, or nobody can log in / recover access).
2. Call `getToken({ req, secret })`. If a token exists, `NextResponse.next()`.
3. If no token:
   - Path starts with `/api/` → `NextResponse.json({ error: "Unauthorized" }, { status: 401 })`.
   - Otherwise (a page) → `NextResponse.redirect` to `/admin/login?callbackUrl=<original pathname+search>`.

The dead `/dashboard` and `/login` matcher entries and the commented-out example code are removed.

### Why middleware instead of per-route checks

One file enforces the boundary for 8+ API route files and the entire `/admin` page tree, instead of adding a repeated `getServerSession` check to every route handler. Lower risk of a future new route forgetting the check.

### Seed password hardening

In `prisma/seed.ts`, replace the three hardcoded literals:

```ts
const password = await hash('admin123', 10);
...
password: await hash('editor123', 10),
...
password: await hash('viewer123', 10),
```

with environment-driven values, falling back to the current literals only so local dev (against the Docker Postgres set up earlier) keeps working with no extra setup:

```ts
const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? 'admin123';
const editorPassword = process.env.SEED_EDITOR_PASSWORD ?? 'editor123';
const viewerPassword = process.env.SEED_VIEWER_PASSWORD ?? 'viewer123';
```

Document the three optional vars in `.env.example`.

**This does not rotate the already-seeded production password** — `upsert`'s `update: {}` is a no-op for existing users. Once this ships, the production `admin@admin.com` password must be rotated manually (direct DB update, since there's no password-change UI yet) — flagged to the user as a manual follow-up action, not automated here.

## Error handling

- Missing/invalid/expired session token → treated identically to "no session" (redirect or 401 per above). `getToken` returns `null` for both cases; no separate handling needed.
- `getToken` throwing (e.g. malformed cookie) is not expected in normal operation; if it happens, it propagates as a middleware error (Next.js default error handling), which is acceptable — it fails closed (no access), not open.

## Verification plan (manual, no test framework in this repo)

1. Anonymous `GET /admin/content` → redirects to `/admin/login?callbackUrl=/admin/content`.
2. Anonymous `POST /api/admin/content` → `401 { error: "Unauthorized" }`.
3. Anonymous `GET /admin/login`, `/admin/forgot`, `/admin/reset` → 200, unaffected.
4. Anonymous `POST /api/auth/register` → `401`.
5. Log in with the seeded admin (`admin@admin.com` / current seed password) at `/admin/login` → redirected to admin pages, all `/admin/*` pages and `/api/admin/*` calls work as before.
6. `npm run dev` still boots clean against the local Docker Postgres (no regression from the seed script change).
