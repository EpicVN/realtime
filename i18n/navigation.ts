import { createNavigation } from "next-intl/navigation";

export const locales = ["vi", "en"] as const;
export const localePrefix = "always"; // Luôn hiện /vi hoặc /en

export const { Link, redirect, usePathname, useRouter } = createNavigation({
  locales,
  localePrefix,
});
