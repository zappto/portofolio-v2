import { AdminBreadcrumb } from "@/components/admin/admin-breadcrumb";
import { AdminMobileNav } from "@/components/admin/admin-mobile-nav";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminUserMenu } from "@/components/admin/admin-user-menu";
import { requireAdmin } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireAdmin();

  return (
    <div className="grid min-h-dvh bg-muted/30 text-foreground lg:grid-cols-[17rem_1fr]">
      <AdminSidebar />
      <div className="min-w-0">
        <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
          <div className="flex h-16 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <AdminMobileNav />
              <div className="min-w-0">
                <AdminBreadcrumb />
                <p className="mt-0.5 hidden text-xs text-muted-foreground sm:block">
                  Professional CMS controls for portfolio content.
                </p>
              </div>
            </div>
            <AdminUserMenu email={user.email} />
          </div>
        </header>
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
