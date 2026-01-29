"use client";

import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import TechFrame from "@/components/Common/TechFrame";

const TEXTS = [
  {
    shortTitle: "Tổng quan",
    title: "Realtime PBX - Tổng đài thông minh",
    description:
      "Giải pháp tổng đài IP thế hệ mới giúp doanh nghiệp thiết lập hệ thống liên lạc chuyên nghiệp chỉ trong 15 phút. Không cần kéo cáp, không cần mua máy chủ, hoạt động ổn định trên nền tảng Cloud.",
    image: "/images/screen/PBX.png",
  },
  {
    shortTitle: "Tính năng",
    title: "Đầy đủ tính năng cao cấp",
    description:
      "Tích hợp sẵn lời chào tự động (IVR), ghi âm cuộc gọi không giới hạn, phân phối cuộc gọi thông minh (ACD) và báo cáo chi tiết theo thời gian thực.",
    image: "/images/screen/PBX.png",
  },
  {
    shortTitle: "Lợi ích",
    title: "Tiết kiệm 50% chi phí",
    description:
      "Miễn phí gọi nội bộ giữa các chi nhánh. Cước gọi ra rẻ hơn 40% so với viễn thông truyền thống. Không tốn phí bảo trì, vận hành phần cứng.",
    image: "/images/screen/PBX.png",
  },
  {
    shortTitle: "Kết nối",
    title: "Làm việc mọi lúc mọi nơi",
    description:
      "Sử dụng linh hoạt trên IP Phone, Smartphone App (iOS/Android) hoặc trực tiếp trên trình duyệt Web. Nhân viên có thể nghe gọi ngay cả khi đang di chuyển.",
    image: "/images/screen/PBX.png",
  },
];

const AboutPBX = () => {
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
        {/* --- CỘT TRÁI: NỘI DUNG --- */}
        <div className="flex flex-col justify-center items-start order-2 lg:order-1 relative z-10 w-full">
          <div className="mb-6 flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider">
              Tại sao chọn Realtime PBX?
            </span>
          </div>

          {/* TEXT CONTENT */}
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

          {/* --- THANH ĐIỀU HƯỚNG --- */}
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
                        layoutId="activeProgressPBX"
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

          {/* BUTTONS */}
          <div className="flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="group inline-flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 font-bold rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1"
            >
              <span>Đăng ký ngay</span>
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="#features" // Link tới phần tính năng chi tiết bên dưới (nếu có)
              className="inline-flex items-center justify-center space-x-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white px-8 py-4 font-bold rounded-lg transition-all"
            >
              <span>Xem chi tiết</span>
            </Link>
          </div>
        </div>

        {/* --- CỘT PHẢI: ẢNH --- */}
        <div className="w-full order-1 lg:order-2 flex items-center justify-center">
          <TechFrame title={TEXTS[activeIndex].title}>
            <div className="relative w-full h-full min-h-75 lg:min-h-112.5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }} // Zoom nhẹ khi biến mất
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={TEXTS[activeIndex].image}
                    alt={TEXTS[activeIndex].title}
                    fill
                    className="object-contain p-4"
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

export default AboutPBX;
