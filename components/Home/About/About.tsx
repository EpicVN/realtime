"use client";

import { Link } from "@/i18n/navigation"; // 1. Link chuẩn
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import TechFrame from "@/components/Common/TechFrame";
import { useTranslations } from "next-intl"; // 2. Hook dịch

const About = () => {
  const t = useTranslations("Home.About"); // 3. Namespace
  const [activeIndex, setActiveIndex] = useState(0);

  // 4. Định nghĩa mảng dữ liệu BÊN TRONG component để dùng được t()
  const TEXTS = [
    {
      shortTitle: "RealtimeCX",
      title: "RealtimeCX", // Tên riêng giữ nguyên
      description: t("cx_desc"),
      image: "/images/screen/CX.png",
    },
    {
      shortTitle: "Autodialer",
      title: "Realtime Autodialer",
      description: t("autodialer_desc"),
      image: "/images/screen/Autocall.png",
    },
    {
      shortTitle: "Text-to-Speech",
      title: "Realtime Text-to-Speech",
      description: t("tts_desc"),
      image: "/images/screen/TextToSpeech.png",
    },
    {
      shortTitle: "RealtimePBX",
      title: "RealtimePBX",
      description: t("pbx_desc"),
      image: "/images/screen/PBX.png",
    },
  ];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEXTS.length);
  };

  const handleSegmentClick = (index: number) => {
    setActiveIndex(index);
  };

  const textVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <div className="py-24 min-h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        
        {/* --- CỘT TRÁI --- */}
        <div className="flex flex-col justify-center items-start order-2 lg:order-1 relative z-10 w-full">
          <div className="mb-4 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-primary-light text-xs font-bold uppercase tracking-wider">
              {t("badge")} {/* Hệ sinh thái */}
            </span>
          </div>

          {/* NỘI DUNG CHÍNH */}
          <div className="w-full min-h-50 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  {TEXTS[activeIndex].title}
                </h2>
                <p className="text-base lg:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {TEXTS[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- THANH ĐIỀU HƯỚNG NGANG --- */}
          <div className="w-full grid grid-cols-4 gap-2 lg:gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            {TEXTS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => handleSegmentClick(index)}
                  className="cursor-pointer group flex flex-col gap-2 relative"
                >
                  <span
                    className={`text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-colors duration-300 truncate ${isActive ? "text-blue-600 dark:text-white" : "text-gray-400 group-hover:text-gray-500"}`}
                  >
                    {item.shortTitle}
                  </span>

                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                    {isActive ? (
                      <motion.div
                        className="h-full bg-blue-600 dark:bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }}
                        onAnimationComplete={handleNext}
                        layoutId="activeProgress"
                      />
                    ) : (
                      <div
                        className={`h-full w-full ${index < activeIndex ? "bg-gray-300 dark:bg-gray-600" : "bg-transparent"}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center space-x-4 bg-primary dark:bg-white text-white dark:text-gray-900 px-6 py-4 font-semibold hover:bg-primary-dark transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span className="dark:group-hover:text-white">{t("btn_register")}</span> {/* Đăng ký */}
            <FaArrowRight className="group-hover:translate-x-1 dark:group-hover:text-white transition-transform" />
          </Link>
        </div>

        {/* --- CỘT PHẢI: ẢNH --- */}
        <div className="w-full order-1 lg:order-2 flex items-center justify-center">
          <TechFrame title={`${TEXTS[activeIndex].title}`}>
            <div className="relative w-full h-full min-h-75 lg:min-h-112.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={TEXTS[activeIndex].image}
                    alt={TEXTS[activeIndex].title}
                    fill
                    className="object-contain object-top-left"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </TechFrame>
        </div>
      </div>
    </div>
  );
};

export default About;