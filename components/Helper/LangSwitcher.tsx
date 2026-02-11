"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import { motion } from "framer-motion";
import { GB, VN } from "country-flag-icons/react/3x2";

const languages = [
  { code: "vi", label: "VN", Flag: VN },
  { code: "en", label: "EN", Flag: GB },
];

export default function LangSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const onSelectChange = (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="relative flex items-center bg-white/10 dark:bg-gray-800/50 backdrop-blur-md rounded-full p-1 border border-white/20 shadow-inner">
      {languages.map((lang) => {
        const isActive = locale === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => onSelectChange(lang.code)}
            disabled={isPending}
            className={`relative z-10 flex items-center gap-1.5 px-3 py-1.5 text-sm font-bold transition-colors duration-300 ${
              isActive
                ? "text-blue-700 dark:text-white"
                : "text-white/70 dark:text-gray-400 hover:text-white"
            } ${isPending ? "cursor-not-allowed opacity-50" : ""}`}
          >
            {/* Render Cờ */}
            <lang.Flag className={`w-5 h-auto rounded-sm shadow-sm ${isActive ? 'opacity-100' : 'opacity-70 saturate-50'}`} />
            
            {/* Render Chữ (VN/EN) - Ẩn trên mobile cho gọn */}
            <span className="hidden md:inline-block">{lang.label}</span>

            {/* 🔥 HIỆU ỨNG TRƯỢT NỀN TRẮNG (Framer Motion) */}
            {isActive && (
              <motion.div
                layoutId="active-lang-pill"
                className="absolute inset-0 bg-white dark:bg-blue-600 rounded-full shadow-md -z-10"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}