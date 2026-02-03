"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import TechFrame from "@/components/Common/TechFrame";

// --- DỮ LIỆU TÙY CHỈNH CHO VOICE VAS ---
const TEXTS = [
  {
    shortTitle: "Tổng quan",
    title: "Voice VAS - Viễn thông & Thương hiệu",
    description:
      "Bộ giải pháp định danh thương hiệu trên nền tảng viễn thông. Bao gồm Voice Brandname, SMS Brandname và các đầu số tổng đài chuyên nghiệp (1900/1800/Mobile SIP).",
    image: "/images/products/vas/img1.png",
  },
  {
    shortTitle: "Voice Brandname",
    title: "Cuộc gọi hiển thị Tên Thương Hiệu",
    description:
      "Thay vì hiển thị số điện thoại lạ (09xxx), cuộc gọi đến khách hàng sẽ hiển thị tên Doanh nghiệp (Ví dụ: REALTIME). Giúp tăng uy tín và tỷ lệ bắt máy lên tới 90%.",
    image: "/images/products/vas/img2.png",
  },
  {
    shortTitle: "Mobile SIP",
    title: "Mobile SIP Trunk - Sim số doanh nghiệp",
    description:
      "Giải pháp biến Sim di động thông thường thành đầu số tổng đài. Tích hợp vào hệ thống PBX để gọi ra/gọi vào, ghi âm và định tuyến như số cố định.",
    image: "/images/products/vas/img3.png",
  },
  {
    shortTitle: "SMS & ZNS",
    title: "SMS Brandname & Zalo ZNS",
    description:
      "Gửi tin nhắn chăm sóc khách hàng, mã OTP hoặc thông báo đơn hàng tự động với tên thương hiệu hiển thị ở mục người gửi. Tiếp cận khách hàng ngay lập tức.",
    image: "/images/products/vas/img4.png",
  },
];

const AboutVAS = () => {
  const [activeIndex, setActiveIndex] = useState(0);

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
    <div className="py-24 min-h-screen bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-center gap-16">
        {/* --- CỘT TRÁI --- */}
        <div className="flex flex-col justify-center items-start order-2 lg:order-1 relative z-10 w-full">
          <div className="mb-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              Giải pháp thương hiệu số
            </span>
          </div>

          <div className="w-full min-h-45 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                variants={textVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="w-full"
              >
                <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                  {TEXTS[activeIndex].title}
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                  {TEXTS[activeIndex].description}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- NAV --- */}
          <div className="w-full grid grid-cols-4 gap-4 mb-10 border-b border-gray-100 dark:border-gray-800 pb-6">
            {TEXTS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => handleSegmentClick(index)}
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
                        transition={{ duration: 5, ease: "linear" }}
                        onAnimationComplete={handleNext}
                        layoutId="activeProgressVAS"
                      />
                    ) : (
                      <div
                        className={`h-full w-full ${index < activeIndex ? "bg-gray-300 dark:bg-gray-700" : "bg-transparent"}`}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
            >
              <span>Đăng ký Brandname</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="#features"
              className="inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 font-bold rounded-lg transition-all"
            >
              <span>Kho số đẹp</span>
            </Link>
          </div>
        </div>

        {/* --- CỘT PHẢI --- */}
        <div className="w-full order-1 lg:order-2">
          {/* Wrapper để căn chỉnh vị trí khung TechFrame */}
          <div className="flex justify-center lg:justify-end items-center h-full">
            <TechFrame title={TEXTS[activeIndex].title}>
              <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-900/50 flex items-center justify-center p-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.05 }}
                    transition={{ duration: 0.5 }}
                    // Đặt padding nhẹ để ảnh không dính sát viền khung
                    className="absolute inset-0 w-full h-full p-2 sm:p-3"
                  >
                    <Image
                      src={TEXTS[activeIndex].image}
                      alt={TEXTS[activeIndex].title}
                      fill
                      className="object-contain object-center rounded shadow-sm"
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
    </div>
  );
};

export default AboutVAS;
