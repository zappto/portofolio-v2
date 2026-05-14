import { getTranslations } from "next-intl/server";
import { publicNavigation } from "@/config/navigation";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

type SiteShellProps = {
  children: React.ReactNode;
};

export async function SiteShell({ children }: SiteShellProps) {
  const navigation = await getTranslations("Navigation");

  const navItems = publicNavigation.map((item) => ({
    href: item.href,
    label: navigation(item.labelKey),
  }));

  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SiteHeader
        navItems={navItems}
        resumeLabel={navigation("resume")}
        mobileSheetTitle={navigation("menu")}
      />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
