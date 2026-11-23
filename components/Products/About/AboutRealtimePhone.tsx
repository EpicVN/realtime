"use client";

import { Link } from "@/i18n/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import {
  FaApple,
  FaArrowRight,
  FaCircleInfo,
  FaDownload,
  FaShieldHalved,
  FaWindows,
  FaXmark,
} from "react-icons/fa6";

const AboutRealtimePhone = () => {
  const t = useTranslations("Products.RealtimePhone.About");
  const [activeIndex, setActiveIndex] = useState(0);
  const [showLicense, setShowLicense] = useState(false);

  const TEXTS = [
    {
      shortTitle: t("tab1.shortTitle"),
      title: t("tab1.title"),
      description: t("tab1.description"),
      image: "/images/products/realtimephone/img1.png",
    },
    {
      shortTitle: t("tab2.shortTitle"),
      title: t("tab2.title"),
      description: t("tab2.description"),
      image: "/images/products/realtimephone/img2.png",
    },
    {
      shortTitle: t("tab3.shortTitle"),
      title: t("tab3.title"),
      description: t("tab3.description"),
      image: "/images/products/realtimephone/img3.png",
    },
    {
      shortTitle: t("tab4.shortTitle"),
      title: t("tab4.title"),
      description: t("tab4.description"),
      image: "/images/products/realtimephone/img4.png",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEXTS.length);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="pt-8 pb-16 lg:pt-12 lg:pb-20 min-h-[calc(100vh-80px)] bg-white dark:bg-gray-950 overflow-hidden flex items-center">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-14">
        {/* --- CỘT TRÁI (5 cột) --- */}
        <div className="lg:col-span-5 flex flex-col justify-center items-start order-2 lg:order-1 relative z-10 w-full">
          <div className="mb-5 flex items-center gap-2">
            <span className="px-3.5 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              {t("tag")}
            </span>
          </div>

          <div className="w-full min-h-45 mb-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-3xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight tracking-tight">
                  {TEXTS[activeIndex].title}
                </h2>
                <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {TEXTS[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- NAV --- */}
          <div className="w-full grid grid-cols-4 gap-3 sm:gap-4 mb-8 border-b border-gray-100 dark:border-gray-800 pb-5">
            {TEXTS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className="cursor-pointer group flex flex-col gap-3 relative"
                >
                  <span
                    className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 truncate ${
                      isActive
                        ? "text-blue-600 dark:text-white"
                        : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-400"
                    }`}
                  >
                    {item.shortTitle}
                  </span>
                  <div className="h-1 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden relative">
                    {isActive ? (
                      <motion.div
                        className="h-full bg-blue-600 dark:bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        onAnimationComplete={handleNext}
                        layoutId="activeProgressPhone"
                      />
                    ) : (
                      <div
                        className={`h-full w-full ${
                          index < activeIndex
                            ? "bg-gray-300 dark:bg-gray-700"
                            : "bg-transparent"
                        }`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- CTA + BẢN QUYỀN GỌN 1 DÒNG --- */}
          <div className="flex flex-col items-start gap-2.5 w-full relative">
            <Link
              href="/products/realtimephone/download"
              className="group inline-flex items-center justify-center space-x-2.5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3.5 font-bold rounded-xl shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all transform hover:-translate-y-1"
            >
              <FaDownload className="text-lg" />
              <span>{t("buttons.download")}</span>
              <FaArrowRight className="text-sm group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="flex items-center gap-2 text-xs font-medium text-gray-600 dark:text-gray-300 pl-1 pt-0.5">
              <FaWindows className="text-blue-500 text-sm shrink-0" />
              <FaApple className="text-gray-800 dark:text-gray-200 text-sm shrink-0" />
              <span>{t("os_support")}</span>
            </div>

            {/* Dòng Copyright gọn + Popover chi tiết */}
            <div className="relative pl-1">
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{t("copyright_line")}</span>
                <button
                  type="button"
                  onClick={() => setShowLicense((prev) => !prev)}
                  className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <FaCircleInfo className="text-[11px]" />
                  <span>{t("copyright_title").replace(":", "")}</span>
                </button>
              </div>

              <AnimatePresence>
                {showLicense && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="absolute bottom-full left-0 mb-3 w-[320px] sm:w-[420px] z-30 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-2xl p-4 text-xs text-gray-600 dark:text-gray-300 leading-relaxed"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-gray-900 dark:text-white">
                        {t("copyright_title")}
                      </span>
                      <button
                        type="button"
                        onClick={() => setShowLicense(false)}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 cursor-pointer"
                        aria-label="Close"
                      >
                        <FaXmark />
                      </button>
                    </div>
                    <p className="mb-2">{t("copyright_body")}</p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {t("copyright_contact_label")}{" "}
                      <a
                        href={`mailto:${t("copyright_email")}`}
                        className="font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        {t("copyright_email")}
                      </a>
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* --- CỘT PHẢI (7 cột) --- */}
        <div className="lg:col-span-7 w-full order-1 lg:order-2">
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[520px] rounded-3xl overflow-hidden border border-blue-100/80 dark:border-gray-800 bg-gradient-to-br from-blue-50 via-indigo-50/60 to-sky-100/80 dark:from-gray-900 dark:via-blue-950/40 dark:to-gray-900 shadow-2xl shadow-blue-900/10 dark:shadow-none flex items-center justify-center p-3 sm:p-5">
            <div
              className="absolute inset-0 opacity-35 dark:opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  "radial-gradient(#3b82f6 1px, transparent 1px)",
                backgroundSize: "22px 22px",
              }}
            />

            <div className="absolute w-80 h-80 bg-blue-400/20 dark:bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

            <div className="absolute top-4 left-4 z-20 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-blue-100 dark:border-gray-700 shadow-sm text-xs font-semibold text-gray-800 dark:text-gray-200">
              <FaShieldHalved className="text-blue-600 dark:text-blue-400 text-sm shrink-0" />
              <span>{t("badge_highlight")}</span>
            </div>

            <div className="relative z-10 w-full h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 12, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="relative w-full h-full transition-transform duration-500 hover:scale-[1.03]"
                >
                  <Image
                    src={TEXTS[activeIndex].image}
                    alt={TEXTS[activeIndex].title}
                    fill
                    className="object-contain object-center drop-shadow-[0_22px_38px_rgba(15,23,42,0.18)]"
                    priority
                    sizes="(max-width: 1024px) 100vw, 58vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutRealtimePhone;
