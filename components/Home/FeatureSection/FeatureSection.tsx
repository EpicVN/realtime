"use client";

import TechFrame from "@/components/Common/TechFrame";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import {
  TbClipboardList,
  TbDeviceDesktopAnalytics,
  TbSitemap,
  TbUserScan,
} from "react-icons/tb";
import { motion, Variants } from "framer-motion"; // 1. IMPORT FRAMER MOTION

const FeatureSection = () => {
  // 2. ĐỊNH NGHĨA CÁC BIẾN ANIMATION (VARIANTS)

  // Hiệu ứng trượt từ trái sang (cho ảnh)
  const fadeInLeft: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Hiệu ứng trượt từ phải sang (cho text)
  const fadeInRight: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Hiệu ứng xuất hiện lần lượt cho 4 tính năng (Stagger)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Mỗi item cách nhau 0.15s
        delayChildren: 0.3, // Đợi 0.3s sau khi component hiện rồi mới chạy
      },
    },
  };

  // Hiệu ứng con: Trồi lên từ dưới
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen overflow-hidden">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 items-stretch gap-16">
        {/* --- CỘT ẢNH: Trượt từ trái sang --- */}
        <motion.div
          className="flex items-center"
          variants={fadeInLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Chỉ chạy 1 lần khi cuộn tới
        >
          <TechFrame title="RealtimeCX">
            <Image
              src={"/images/screen/CX.png"}
              alt="RealtimeCX"
              fill
              className="object-contain object-top-left"
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </TechFrame>
        </motion.div>

        {/* --- CỘT TEXT --- */}
        <div className="flex flex-col justify-center gap-10 lg:gap-12 items-start">
          <div className="flex flex-col justify-center gap-8">
            {/* Tiêu đề: Trượt từ phải sang */}
            <motion.h2
              variants={fadeInRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-4xl font-bold text-primary mb-6 dark:text-white"
            >
              RealtimeCX – CRM Tích Hợp Tổng Đài Toàn Diện
            </motion.h2>

            {/* Grid 4 tính năng: Xuất hiện lần lượt */}
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 mt-2"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Feature 1 */}
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-primary">
                    <TbUserScan className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Nhận diện khách hàng
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                  Tự động hiển thị thông tin (Screen Pop-up) ngay khi có cuộc
                  gọi đến.
                </p>
              </motion.div>

              {/* Feature 2 */}
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-primary">
                    <TbClipboardList className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Xử lý Ticket
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                  Ghi chú và tạo phiếu xử lý công việc song song ngay trong quá
                  trình đàm thoại.
                </p>
              </motion.div>

              {/* Feature 3 */}
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-primary">
                    <TbDeviceDesktopAnalytics className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Quản trị đa kênh
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                  Theo dõi danh sách liên hệ, tiến độ xử lý và hiệu suất điện
                  thoại viên theo thời gian thực.
                </p>
              </motion.div>

              {/* Feature 4 */}
              <motion.div
                className="flex flex-col gap-3"
                variants={itemVariants}
              >
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-primary">
                    <TbSitemap className="text-3xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Hỗ trợ đa doanh nghiệp
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                  Khả năng quản lý nhiều công ty con hoặc chi nhánh trên cùng
                  một hệ thống CRM.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Nút đăng ký: Xuất hiện cuối cùng */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }} // Delay để nó hiện sau cùng
            viewport={{ once: true }}
          >
            <Link
              href={"/contact"}
              className="group inline-flex items-center justify-center space-x-4 bg-primary dark:bg-white text-white dark:text-gray-900 px-6 py-4 font-semibold hover:bg-primary-dark transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1"
            >
              <span className="dark:group-hover:text-white">Đăng ký</span>
              <FaArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform dark:group-hover:text-white" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FeatureSection;
