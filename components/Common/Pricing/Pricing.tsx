"use client";

import React from "react";
import { FaCheck, FaXmark } from "react-icons/fa6";
import { motion, Variants } from "framer-motion";
import Link from "next/link";

const Pricing = () => {
  const plans = [
    {
      id: 1,
      name: "Realtime-PBX Block 3",
      description: "Hỗ trợ tối đa 3 máy nhánh.",
      oldPrice: "150.000",
      price: "100.000",
      popular: false,
      features: [
        { text: "Cuộc gọi/nhận đồng thời", included: true },
        { text: "Trả lời tự động (IVR)", included: true },
        { text: "Phát nhạc chờ", included: true },
        { text: "Gọi đến, gọi đi, gọi nội bộ", included: true },
        { text: "Chuyển cuộc gọi", included: true },
        { text: "Định tuyến, phân bổ (ACD)", included: true },
        { text: "Hiển thị số gọi đến", included: true },
        { text: "Ghi âm cuộc gọi", included: true },
        { text: "Nghe lại cuộc gọi", included: true },
        { text: "Hỗ trợ đầu số hotline", included: true },
        { text: "Quản lý Extensions qua web", included: true },
        { text: "Tích hợp CRM", included: false },
      ],
    },
    {
      id: 2,
      name: "Realtime-PBX Block 10",
      description: "Hỗ trợ tối đa 10 máy nhánh.",
      oldPrice: "350.000",
      price: "299.000",
      popular: true,
      features: [
        { text: "Cuộc gọi/nhận đồng thời", included: true },
        { text: "Trả lời tự động (IVR)", included: true },
        { text: "Phát nhạc chờ", included: true },
        { text: "Gọi đến, gọi đi, gọi nội bộ", included: true },
        { text: "Chuyển cuộc gọi", included: true },
        { text: "Định tuyến, phân bổ (ACD)", included: true },
        { text: "Hiển thị số gọi đến", included: true },
        { text: "Ghi âm cuộc gọi", included: true },
        { text: "Nghe lại cuộc gọi", included: true },
        { text: "Hỗ trợ đầu số hotline", included: true },
        { text: "Quản lý Extensions qua web", included: true },
        { text: "Tích hợp CRM", included: false },
      ],
    },
    {
      id: 3,
      name: "Realtime-PBX Block 20",
      description: "Hỗ trợ tối đa 20 máy nhánh.",
      oldPrice: "650.000",
      price: "450.000",
      popular: false,
      features: [
        { text: "Cuộc gọi/nhận đồng thời", included: true },
        { text: "Trả lời tự động (IVR)", included: true },
        { text: "Phát nhạc chờ", included: true },
        { text: "Gọi đến, gọi đi, gọi nội bộ", included: true },
        { text: "Chuyển cuộc gọi", included: true },
        { text: "Định tuyến, phân bổ (ACD)", included: true },
        { text: "Hiển thị số gọi đến", included: true },
        { text: "Ghi âm cuộc gọi", included: true },
        { text: "Nghe lại cuộc gọi", included: true },
        { text: "Hỗ trợ đầu số hotline", included: true },
        { text: "Quản lý Extensions qua web", included: true },
        { text: "Tích hợp CRM", included: false },
      ],
    },
  ];

  // --- ANIMATION VARIANTS ---
  // Variant cho container cha: Giúp điều khiển các con xuất hiện lần lượt
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // Mỗi thẻ hiện ra cách nhau 0.15s
      },
    },
  };

  // Variant cho từng Card
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15, // Damping cao hơn xíu để đỡ rung quá nhiều
      },
    },
  };

  return (
    <section className="h-full w-full overflow-y-auto bg-gray-50 dark:bg-gray-900 pt-28 pb-10 px-4">
      <div className="container mx-auto">
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 space-y-2"
        >
          <p className="text-blue-600 dark:text-blue-400 uppercase font-semibold tracking-wider text-sm">
            Báo giá
          </p>
          <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white uppercase">
            Bảng giá dịch vụ tổng đài RealtimePBX
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm lg:text-base">
            Hệ thống tổng đài ảo hiện đại, sẵn sàng mở rộng và tối ưu chi phí.
          </p>
        </motion.div>

        {/* --- Pricing Cards Grid --- */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start py-4"
          variants={containerVariants} // Áp dụng stagger
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              variants={cardVariants} // Nhận animation từ cha
              // --- HOVER EFFECT ---
              whileHover={{
                y: -15, // Nhấc lên cao hơn chút
                scale: 1.02, // Phóng to nhẹ toàn bộ card
                transition: { type: "spring", stiffness: 300 },
              }}
              className={`relative flex flex-col bg-white dark:bg-gray-800 border rounded-xl p-6 shadow-md transition-colors duration-300 h-full
                ${
                  plan.popular
                    ? "border-blue-500 shadow-xl z-10 lg:scale-105" // Giữ scale tĩnh cho popular
                    : "border-gray-200 dark:border-gray-700"
                }
              `}
            >
              {plan.popular && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute -top-4 left-1/2 transform -translate-x-1/2"
                >
                  <div className="bg-linear-to-r from-blue-600 to-blue-400 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wide whitespace-nowrap flex items-center gap-1">
                    ★ Phổ biến nhất
                  </div>
                </motion.div>
              )}

              {/* Tên gói */}
              <div className="text-center mb-4 mt-2">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {plan.name}
                </h3>
                <p className="text-gray-500 text-xs">{plan.description}</p>
              </div>

              {/* Giá tiền */}
              <div className="text-center mb-6 border-b border-gray-100 dark:border-gray-700 pb-4">
                <p className="text-gray-400 line-through text-sm font-medium decoration-gray-400">
                  {plan.oldPrice} vnđ
                </p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  <span className="text-3xl font-bold text-blue-600 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-500 font-semibold self-end mb-1 text-sm">
                    vnđ
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 mt-1 uppercase tracking-wide">
                  / tháng / user
                </p>

                {/* ANIMATED BUTTON */}
                <Link href={"/contact"}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`mt-4 w-full py-2.5 px-4 rounded-lg font-bold text-white shadow-md transition-all text-sm
                    ${
                      plan.popular
                        ? "bg-linear-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/40"
                        : "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600"
                    }
                  `}
                  >
                    Đăng ký ngay
                  </motion.button>
                </Link>
              </div>

              {/* Danh sách tính năng */}
              <ul className="space-y-3 text-sm grow">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="mt-0.5 shrink-0">
                      {feature.included ? (
                        <FaCheck className="text-green-500 text-sm" />
                      ) : (
                        <FaXmark className="text-red-500 dark:text-red-500 text-sm opacity-70" />
                      )}
                    </div>
                    <span
                      className={`leading-tight text-xs lg:text-sm ${
                        feature.included
                          ? "text-gray-700 dark:text-gray-300"
                          : "text-gray-400 line-through"
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;
