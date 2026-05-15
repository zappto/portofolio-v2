"use server";

import { redirect } from "next/navigation";
import { isAdminUser } from "@/lib/auth/admin";
import { getAdminPassword } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export type LoginState = {
  error?: string;
};

export async function loginAction(
  _previousState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const email = String(formData.get("email") ?? "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/admin");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  const configuredAdminPassword = getAdminPassword();

  if (configuredAdminPassword && password !== configuredAdminPassword) {
    return { error: "Login gagal. Periksa email dan password." };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { error: "Login gagal. Periksa email dan password." };
  }

  if (!isAdminUser(data.user)) {
    await supabase.auth.signOut();
    return { error: "Akun ini tidak punya akses admin." };
  }

  redirect(next.startsWith("/admin") ? next : "/admin");
}

export async function logoutAction() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
