"use client";

import { Link } from "@/i18n/navigation";
import { FaArrowRight, FaRobot } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import TechFrame from "@/components/Common/TechFrame";
import { useTranslations } from "next-intl";

const AboutRealtimeHachi = () => {
  const t = useTranslations("Products.RealtimeHachi.About");
  const [activeIndex, setActiveIndex] = useState(0);

  const TEXTS = [
    {
      shortTitle: t("tab1.shortTitle"),
      title: t("tab1.title"),
      description: t("tab1.description"),
      image: "/images/products/realtimehachi/img1.png",
    },
    {
      shortTitle: t("tab2.shortTitle"),
      title: t("tab2.title"),
      description: t("tab2.description"),
      image: "/images/products/realtimehachi/img2.png",
    },
    {
      shortTitle: t("tab3.shortTitle"),
      title: t("tab3.title"),
      description: t("tab3.description"),
      image: "/images/products/realtimehachi/img3.png",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEXTS.length);
  };

  return (
    <div className="py-24 min-h-screen bg-white dark:bg-gray-950 relative overflow-hidden flex items-center">
      {/* --- BACKGROUND EFFECTS (Glow mờ) --- */}
      <div className="absolute top-20 left-[-10%] w-96 h-96 bg-blue-400/20 dark:bg-blue-900/30 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-10 right-[-5%] w-120 h-120 bg-purple-400/20 dark:bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16 relative z-10">
        {/* --- CỘT TRÁI: NỘI DUNG --- */}
        <div className="flex flex-col justify-center items-start order-2 lg:order-1 w-full">
          {/* Badge AI */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-linear-to-r from-blue-100 to-purple-100 dark:from-blue-900/40 dark:to-purple-900/40 border border-blue-200 dark:border-blue-800 shadow-sm"
          >
            <FaRobot className="text-blue-600 dark:text-blue-400 animate-pulse" />
            <span className="text-blue-700 dark:text-blue-300 text-xs font-bold uppercase tracking-wider">
              {t("tag")}
            </span>
          </motion.div>

          {/* TEXT CONTENT */}
          <div className="w-full min-h-45 mb-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full"
              >
                {/* Gradient Text cho Title */}
                <h2 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight bg-clip-text text-transparent bg-linear-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400">
                  {TEXTS[activeIndex].title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {TEXTS[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- THANH ĐIỀU HƯỚNG (UI Card Glassmorphism) --- */}
          <div className="w-full grid grid-cols-3 gap-3 mb-10">
            {TEXTS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`cursor-pointer group flex flex-col gap-3 relative p-3 rounded-xl transition-all duration-300 border ${
                    isActive
                      ? "bg-white dark:bg-gray-800 shadow-lg border-blue-100 dark:border-gray-700 scale-[1.02]"
                      : "bg-gray-50/50 dark:bg-gray-900/50 border-transparent hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  <span
                    className={`text-[11px] sm:text-xs font-bold uppercase tracking-wider truncate text-center ${
                      isActive
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    }`}
                  >
                    {item.shortTitle}
                  </span>

                  <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                    {isActive && (
                      <motion.div
                        className="h-full bg-linear-to-r from-blue-500 to-purple-500"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 6, ease: "linear" }}
                        onAnimationComplete={handleNext}
                        layoutId="activeProgressHachi"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* BUTTONS (Thêm Glow) */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center space-x-2 bg-blue-600 text-white px-8 py-4 font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all transform hover:-translate-y-1 overflow-hidden"
            >
              {/* Hiệu ứng quét sáng trên nút */}
              <span className="absolute inset-0 w-full h-full -translate-x-full bg-white/20 group-hover:animate-[shimmer_1.5s_infinite] skew-x-12" />
              <span className="relative">{t("buttons.consult")}</span>
              <FaArrowRight className="relative group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 font-bold rounded-xl transition-all border border-gray-200 dark:border-gray-700"
            >
              <span>{t("buttons.demo")}</span>
            </Link>
          </div>
        </div>

        {/* --- CỘT PHẢI: ẢNH (Floating Animation) --- */}
        <div className="w-full order-1 lg:order-2">
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="flex justify-center lg:justify-end items-center h-full relative"
          >
            {/* Khung viền Glow sau ảnh */}
            <div className="absolute inset-0 bg-linear-to-br from-blue-500 to-purple-500 rounded-2xl blur-2xl opacity-20 dark:opacity-40 animate-pulse" />
            
            <TechFrame title={TEXTS[activeIndex].title}>
              <div className="relative w-full aspect-4/3 sm:aspect-video rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-1 border border-gray-100 dark:border-gray-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95, filter: "blur(4px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.05, filter: "blur(4px)" }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full p-2 sm:p-4"
                  >
                    <Image
                      src={TEXTS[activeIndex].image}
                      alt={TEXTS[activeIndex].title}
                      fill
                      className="object-contain object-center rounded shadow-sm drop-shadow-xl"
                      priority
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>
            </TechFrame>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutRealtimeHachi;