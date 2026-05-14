import createMiddleware from "next-intl/middleware";
import { type NextRequest, NextResponse } from "next/server";
import { routing } from "@/i18n/routing";
import { isAdminUser } from "@/lib/auth/admin";
import { updateSession } from "@/lib/supabase/proxy";

const intlMiddleware = createMiddleware(routing);

export default async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    try {
      const { response, user } = await updateSession(request);

      if (!user || !isAdminUser(user)) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/admin/login";
        redirectUrl.searchParams.set("next", pathname);
        return NextResponse.redirect(redirectUrl);
      }

      return response;
    } catch {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/admin/login";
      redirectUrl.searchParams.set("next", pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/admin/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
