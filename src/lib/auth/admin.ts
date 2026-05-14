import { redirect } from "next/navigation";
import { getAdminEmails } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export function isAdminUser(user: {
  id?: string | null;
  email?: string | null;
  app_metadata?: Record<string, unknown>;
}) {
  const email = user.email?.toLowerCase();
  const role = user.app_metadata?.role;
  const adminEmails = getAdminEmails();

  return role === "admin" || (!!email && adminEmails.includes(email));
}

export async function getCurrentUser() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}

export async function requireAdmin() {
  const user = await getCurrentUser();

  if (!user || !isAdminUser(user)) {
    redirect("/admin/login");
  }

  return user;
}
