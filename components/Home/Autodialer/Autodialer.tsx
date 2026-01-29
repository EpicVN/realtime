"use client";

import TechFrame from "@/components/Common/TechFrame"; // Kiểm tra đường dẫn
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion, Variants } from "framer-motion"; // 1. Import Motion

const Autodialer = () => {
  // --- ĐỊNH NGHĨA ANIMATION ---

  // 1. Cấu hình cho nhóm Text (xuất hiện lần lượt)
  const textContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Mỗi dòng cách nhau 0.2s
        delayChildren: 0.3, // Đợi 0.3s mới bắt đầu chạy
      },
    },
  };

  // 2. Hiệu ứng con của Text: Trượt từ Trái sang
  const textItemVariants: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // 3. Hiệu ứng cho Ảnh: Trượt từ Phải sang
  const imageVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 }, // Delay xíu cho khớp nhịp
    },
  };

  return (
    <div className="py-24 bg-gray-100 dark:bg-gray-950 min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-stretch gap-16">
        {/* --- CỘT TEXT (Trái): Áp dụng Stagger Animation --- */}
        <motion.div
          className="flex flex-col justify-center gap-10 lg:gap-12 items-start"
          variants={textContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="flex flex-col justify-center gap-8">
            {/* Tiêu đề */}
            <motion.h2
              variants={textItemVariants}
              className="text-5xl font-bold text-primary mb-6 dark:text-white"
            >
              Realtime Autodialer – Giải Pháp Gọi Tự Động Thông Minh
            </motion.h2>

            {/* Đoạn văn */}
            <motion.p
              variants={textItemVariants}
              className="text-black dark:text-gray-300 mb-8 text-lg leading-relaxed"
            >
              Hệ thống giúp doanh nghiệp thực hiện hàng nghìn cuộc gọi mỗi giờ
              với kịch bản linh hoạt, đặc biệt phù hợp cho các chiến dịch nhắc
              nợ, khảo sát và Telesales.
            </motion.p>
          </div>

          {/* Nút Đăng ký */}
          <motion.div variants={textItemVariants}>
            <Link
              href={"/contact"}
              className="group inline-flex items-center justify-center space-x-4 bg-white border-3 border-primary dark:bg-white dark:text-gray-900 px-6 py-4 font-semibold hover:bg-primary-dark hover:border-primary-dark transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span className="text-primary group-hover:text-white dark:text-gray-900">
                Đăng ký
              </span>
              <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform text-primary group-hover:text-white dark:text-gray-900" />
            </Link>
          </motion.div>
        </motion.div>

        {/* --- CỘT ẢNH (Phải): Trượt từ Phải sang --- */}
        <motion.div
          className="flex items-center"
          variants={imageVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <TechFrame title="Realtime Autodialer">
            <Image
              src={"/images/screen/Autocall.png"}
              alt="Realtime Autodialer"
              fill
              className="object-contain object-top-left"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </TechFrame>
        </motion.div>
      </div>
    </div>
  );
};

export default Autodialer;
