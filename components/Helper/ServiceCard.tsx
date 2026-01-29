import React from "react";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion"; // 1. Import Framer Motion

interface ServiceCardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  href?: string;
  linkText?: string;
  shadow?: boolean;
}

const ServiceCard = ({
  icon,
  title,
  description,
  href,
  linkText = "Learn More",
  shadow = false,
}: ServiceCardProps) => {
  return (
    // 2. Thay div thường thành motion.div
    <motion.div
      // --- CẤU HÌNH ANIMATION ---
      // Trạng thái ban đầu (ẩn, nằm thấp xuống 50px)
      initial={{ opacity: 0, y: 50 }}
      // Khi cuộn tới (hiện, trượt lên vị trí gốc)
      whileInView={{ opacity: 1, y: 0 }}
      // Chỉ chạy animation 1 lần khi load trang (không lặp lại khi cuộn lên xuống)
      viewport={{ once: true, margin: "-50px" }}
      // Hiệu ứng vật lý lò xo (Spring) khi trượt lên
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
        duration: 0.5,
      }}
      // Hiệu ứng khi Hover: Nảy lên cao hơn một chút
      whileHover={{ y: -10 }}
      // Hiệu ứng khi Click/Tap: Lún nhẹ xuống
      whileTap={{ scale: 0.98 }}
      // --- END ANIMATION CONFIG ---

      className={`
        group h-full rounded-2xl p-8 text-center flex flex-col items-center 
        bg-white dark:bg-gray-900 
        border border-gray-100 dark:border-primary-light
        cursor-pointer
        
        ${/* Xử lý giao diện Shadow hoặc Flat */ ""}
        ${
          shadow
            ? "shadow-[0_2px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] border-transparent"
            : "hover:border-blue-500 dark:hover:border-blue-400"
        }
      `}
    >
      {/* ICON SECTION */}
      {icon && (
        <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20 text-primary dark:text-primary-light transition-all duration-300 group-hover:scale-110 group-hover:bg-primary group-hover:text-white dark:group-hover:bg-primary group-hover:rotate-3">
          <div className="text-4xl">{icon}</div>
        </div>
      )}

      {/* TITLE SECTION */}
      {title && (
        <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white transition-colors group-hover:text-primary">
          {title}
        </h3>
      )}

      {/* DESCRIPTION SECTION */}
      {description && (
        <p className="mb-6 text-gray-600 dark:text-gray-400 leading-relaxed text-[15px]">
          {description}
        </p>
      )}

      {/* Spacer */}
      <div className="grow" />

      {/* BUTTON SECTION */}
      {href && (
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-primary font-bold text-base hover:text-blue-700 dark:hover:text-blue-400 transition-colors"
          onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click lan ra card cha nếu cần
        >
          {linkText}
          {/* Mũi tên di chuyển khi hover vào cả Card (nhờ class 'group') */}
          <FaArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2" />
        </Link>
      )}
    </motion.div>
  );
};

export default ServiceCard;
