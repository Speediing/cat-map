# Caterpillar × SpaceXAI

A private, password-gated leave-behind for the Caterpillar and SpaceXAI pilot, used by both sides as the mutual action plan. One page: the plan at a glance (the path, the two use cases, owners, what the agreement gates and what runs in parallel), a drill into the pilot and each use case as Problem / Solution / Next steps with drawn diagrams, and a live, editable action board that both teams share.

Built with Next.js (App Router), TypeScript, and Tailwind CSS. Light mode only, `noindex` everywhere.

## Running it

```bash
npm install
cp .env.example .env.local   # fill in both values
npm run dev
```

## Environment variables

| Variable | Purpose |
| --- | --- |
| `SITE_PASSWORD` | The password visitors type on `/login`. |
| `SESSION_SECRET` | Long random string that signs the session cookie. `openssl rand -hex 32` works. |
| `POSTGRES_URL` | Storage for the live action plan (Vercel Postgres / Neon). The `plan_state` table is created automatically and seeded on first load. |
| `KV_REST_API_URL`, `KV_REST_API_TOKEN` | Optional fallback storage (Vercel KV / Upstash), used only when `POSTGRES_URL` is unset. |

The gate fails closed in production: if `SITE_PASSWORD` or `SESSION_SECRET` is missing, every route returns 503 until both are set in the hosting environment. In development the gate stays open so the site runs without setup.

Sessions are httpOnly cookies signed with HMAC-SHA256.

## The live plan

The "Who does what, by when" section is editable: statuses, owners, timing, and the working-date bars save through `GET`/`PUT /api/state` (one JSON document, last write wins) and survive refresh. The API sits behind the same session gate; there is no public write path. Without any storage env vars the plan uses in-process memory, which works locally but does not survive a redeploy. Seed content lives in `src/content/plan.ts` and only applies to the first load.

## Editing content

All copy lives in [`src/content/plan.ts`](src/content/plan.ts). Edit that file to change what the page says; layout and styling stay put. Section structure (nav, glance board, drill sections) is rendered from the same module, so new next steps or owners are one-line edits.

## Structure

- `src/app/page.tsx` renders the page from the content module.
- `src/app/login/` is the password form and its server action.
- `src/proxy.ts` gates every route behind the session cookie.
- `src/lib/session.ts` signs and verifies session tokens (Web Crypto, edge-safe).
