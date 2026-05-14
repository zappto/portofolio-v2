import { Button } from "@/components/ui/button";
import { logoutAction } from "@/app/admin/actions";

export default function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-muted/30 text-foreground">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold">Portfolio Admin</p>
          <form action={logoutAction}>
            <Button type="submit" variant="outline" size="sm">
              Logout
            </Button>
          </form>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
