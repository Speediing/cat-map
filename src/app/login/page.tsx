"use client";

import { useActionState } from "react";
import { login, site } from "@/content/plan";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = { error: null };

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <main className="flex min-h-screen items-center bg-canvas px-6 py-16 sm:px-10">
      <div className="mx-auto w-full max-w-md">
        <div className="flex items-center gap-2.5">
          <span aria-hidden className="h-2 w-2 rounded-[2px] bg-cat-yellow" />
          <span className="text-[14px] font-medium tracking-[-0.01em]">
            {site.wordmark.left} × {site.wordmark.right}
          </span>
        </div>

        <p className="mt-10 text-[12px] uppercase tracking-[0.08em] text-orange">
          {login.kicker}
        </p>
        <h1 className="mt-3 text-[1.7rem] leading-[1.15] font-medium tracking-[-0.025em]">
          {login.title}
        </h1>

        <form action={formAction} className="mt-7 flex gap-2">
          <label htmlFor="password" className="sr-only">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            autoComplete="current-password"
            placeholder={login.placeholder}
            className="min-w-0 flex-1 rounded-lg border border-hairline-strong bg-paper px-4 py-2.5 text-[15px] text-ink placeholder:text-ink-faint focus:border-ink/40 focus:outline-none"
          />
          <button
            type="submit"
            disabled={pending}
            className="shrink-0 rounded-lg bg-ink px-5 py-2.5 text-[14px] font-medium text-canvas transition-opacity hover:opacity-85 disabled:opacity-40"
          >
            {login.button}
          </button>
        </form>

        {state.error ? (
          <p className="mt-4 text-[13px] text-orange">{state.error}</p>
        ) : null}
      </div>
    </main>
  );
}
