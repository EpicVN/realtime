"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import TechFrame from "@/components/Common/TechFrame";

const TEXTS = [
  {
    shortTitle: "RealtimeCX",
    title: "RealtimeCX",
    description:
      "Nền tảng CRM tích hợp tổng đài toàn diện. Thiết kế theo triết lý Nhanh – Gọn – Hiệu quả. Quản lý khách hàng, Ticket và Call Center trên một màn hình duy nhất.",
    image: "/images/screen/CX.png",
  },
  {
    shortTitle: "Autodialer",
    title: "Realtime Autodialer",
    description:
      "Giải pháp gọi tự động thông minh (Auto Call). Tối ưu hóa quy trình telesales, nhắc nợ và CSKH với số lượng lớn, giúp tiết kiệm 80% thời gian quay số thủ công.",
    image: "/images/screen/Autocall.png",
  },
  {
    shortTitle: "Text-to-Speech",
    title: "Realtime Text-to-Speech",
    description:
      "Công nghệ AI chuyển đổi văn bản thành giọng nói tiếng Việt tự nhiên để tự động hóa các cuộc gọi nhắc nợ, đọc mã OTP hoặc thông báo cá nhân hóa.",
    image: "/images/screen/TextToSpeech.png",
  },
  {
    shortTitle: "RealtimePBX",
    title: "RealtimePBX",
    description:
      "Tổng đài IP thế hệ mới tối ưu hóa luồng liên lạc. Ổn định – Linh hoạt – Hiệu suất trên nền tảng hạ tầng đám mây. Mở rộng máy nhánh không giới hạn.",
    image: "/images/screen/PBX.png",
  },
];

const About = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Hàm chuyển slide tiếp theo
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % TEXTS.length);
  };

  // Hàm xử lý khi bấm vào Tab
  const handleSegmentClick = (index: number) => {
    setActiveIndex(index);
  };

  // Animation cho Text
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
              Hệ sinh thái
            </span>
          </div>

          {/* NỘI DUNG CHÍNH */}
          <div className="w-full min-h-50 mb-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex} // Quan trọng: Key thay đổi để trigger animation
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
          {/* Sửa: Dùng key={index} để tránh lỗi trùng lặp ID */}
          <div className="w-full grid grid-cols-4 gap-2 lg:gap-4 mb-8 border-b border-gray-200 dark:border-gray-800 pb-4">
            {TEXTS.map((item, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={index}
                  onClick={() => handleSegmentClick(index)}
                  className="cursor-pointer group flex flex-col gap-2 relative"
                >
                  {/* Label */}
                  <span
                    className={`text-[10px] lg:text-xs font-bold uppercase tracking-wider transition-colors duration-300 truncate ${isActive ? "text-blue-600 dark:text-white" : "text-gray-400 group-hover:text-gray-500"}`}
                  >
                    {item.shortTitle}
                  </span>

                  {/* Thanh Progress Line - Dùng Framer Motion để chạy tự động */}
                  <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden relative">
                    {isActive ? (
                      <motion.div
                        className="h-full bg-blue-600 dark:bg-white"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 5, ease: "linear" }} // Chạy trong 5 giây
                        onAnimationComplete={handleNext} // Chạy xong tự gọi hàm Next
                        layoutId="activeProgress" // Giúp chuyển tab mượt mà
                      />
                    ) : (
                      // Đánh dấu xám nhẹ cho các mục đã qua
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
            href={"/contact"}
            className="group inline-flex items-center justify-center space-x-4 bg-primary dark:bg-white text-white dark:text-gray-900 px-6 py-4 font-semibold hover:bg-primary-dark transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <span className="dark:group-hover:text-white">Đăng ký</span>
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
