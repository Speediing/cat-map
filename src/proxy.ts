import { NextRequest, NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";

/**
 * Password gate for the whole site.
 *
 * - /login and static assets pass through.
 * - Everything else needs a valid signed session cookie.
 * - Production with missing SITE_PASSWORD or SESSION_SECRET fails closed
 *   (503 for every route, including /login).
 * - Development without the env vars stays open, so `npm run dev` works
 *   before any setup.
 */

// hero-truck.jpg is decorative art; the next/image optimizer fetches it
// server-side without cookies, so it must stay public.
const PUBLIC_PATHS = new Set([
  "/login",
  "/robots.txt",
  "/favicon.ico",
  "/icon.svg",
  "/hero-truck.jpg",
]);

function isConfigured(): boolean {
  return Boolean(process.env.SITE_PASSWORD && process.env.SESSION_SECRET);
}

function unavailable(): NextResponse {
  return new NextResponse(
    "This site is not configured yet. Set SITE_PASSWORD and SESSION_SECRET in the hosting environment.",
    { status: 503, headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  if (!isConfigured()) {
    if (process.env.NODE_ENV !== "production") return NextResponse.next();
    return unavailable();
  }

  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const authed = await verifySessionToken(token, process.env.SESSION_SECRET as string);

  if (PUBLIC_PATHS.has(pathname)) {
    if (pathname === "/login" && authed && request.method === "GET") {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }

  if (!authed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
