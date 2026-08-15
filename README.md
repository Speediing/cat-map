# Caterpillar × Cursor

A private, password-gated leave-behind for the Caterpillar and Cursor pilot. One page: the plan at a glance (clocks, the two use cases, owners, what the agreement gates and what runs in parallel), then a drill into the pilot and each use case as Problem / Solution / Next steps.

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

The gate fails closed in production: if either variable is missing, every route returns 503 until both are set in the hosting environment. In development the gate stays open so the site runs without setup.

Sessions are httpOnly cookies signed with HMAC-SHA256. There is no database.

## Editing content

All copy lives in [`src/content/plan.ts`](src/content/plan.ts). Edit that file to change what the page says; layout and styling stay put. Section structure (nav, glance board, drill sections) is rendered from the same module, so new next steps or owners are one-line edits.

## Structure

- `src/app/page.tsx` renders the page from the content module.
- `src/app/login/` is the password form and its server action.
- `src/proxy.ts` gates every route behind the session cookie.
- `src/lib/session.ts` signs and verifies session tokens (Web Crypto, edge-safe).
