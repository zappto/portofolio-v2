"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { loginAction, type LoginState } from "@/app/admin/actions";

type LoginFormProps = {
  nextPath: string;
};

const initialState: LoginState = {};

export function LoginForm({ nextPath }: LoginFormProps) {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState,
  );

  return (
    <form action={formAction} className="mt-8 flex flex-col gap-5">
      <input type="hidden" name="next" value={nextPath} />
      <div className="flex flex-col gap-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-11 rounded-lg border border-input bg-background px-3 text-sm outline-none transition-colors focus:border-ring"
        />
      </div>
      {state.error ? (
        <p className="rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
          {state.error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}
