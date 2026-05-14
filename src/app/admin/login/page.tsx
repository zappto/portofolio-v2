import type { Metadata } from "next";
import { LoginForm } from "@/app/admin/login/login-form";

export const metadata: Metadata = {
  title: "Admin Login",
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const nextPath = next?.startsWith("/admin") ? next : "/admin";

  return (
    <main className="flex min-h-dvh items-center justify-center bg-muted/30 px-4 py-10">
      <section className="w-full max-w-md rounded-xl border border-border bg-background p-6 shadow-elevation-sm">
        <p className="text-ui-label text-muted-foreground">Admin CMS</p>
        <h1 className="mt-3 text-3xl font-semibold">Sign in</h1>
        <p className="mt-3 text-sm leading-6 text-muted-foreground">
          Gunakan akun Supabase Auth yang sudah diberi role admin.
        </p>
        <LoginForm nextPath={nextPath} />
      </section>
    </main>
  );
}
