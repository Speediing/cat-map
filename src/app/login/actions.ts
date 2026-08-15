"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  passwordMatches,
} from "@/lib/session";
import { login } from "@/content/plan";

export type LoginState = {
  error: string | null;
};

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const sitePassword = process.env.SITE_PASSWORD;
  const sessionSecret = process.env.SESSION_SECRET;

  if (!sitePassword || !sessionSecret) {
    // The proxy fails closed in production before this can run;
    // in development the gate is open, so just go home.
    if (process.env.NODE_ENV !== "production") redirect("/");
    return { error: "This site is not configured yet." };
  }

  const candidate = String(formData.get("password") ?? "");
  if (!candidate || !passwordMatches(candidate, sitePassword)) {
    return { error: login.error };
  }

  const token = await createSessionToken(sessionSecret);
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/");
}
