import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";
import { isLocale } from "@/config/site";
import { routing } from "@/i18n/routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = requested ?? routing.defaultLocale;

  if (!isLocale(locale)) {
    notFound();
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
