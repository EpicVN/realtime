"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft, FaFacebook, FaPhoneVolume, FaTelegram } from "react-icons/fa6";

const ThankYouPage = () => {
  return (
    <div className="pt-34 min-h-screen bg-gray-50 dark:bg-gray-950 pb-24">
      <div className="container mx-auto px-6">
        {/* --- PHẦN 1: ICON CHECK & LỜI CẢM ƠN --- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* Icon Check Xanh lá */}
          <div className="mb-6 rounded-full bg-green-100 p-4 dark:bg-green-900/20">
            <FaCheckCircle className="text-6xl text-green-500" />
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Cảm ơn bạn!
          </h1>

          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Chúng tôi đã nhận được thông tin của bạn và sẽ liên hệ lại trong
            thời gian sớm nhất. Bạn cũng có thể liên hệ với chúng tôi qua các số
            điện thoại hoặc trang mạng xã hội bên dưới.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 text-blue-600 font-semibold hover:underline"
          >
            <FaArrowLeft /> Quay về trang chủ
          </Link>
        </motion.div>

        {/* --- PHẦN 2: 2 THẺ THÔNG TIN (HOTLINE & SOCIAL) --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* CARD 1: HOTLINE */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <div className="mb-4 text-gray-800 dark:text-white flex items-center gap-2">
              <FaPhoneVolume className="text-2xl" />
              <h3 className="text-xl font-bold uppercase tracking-wide">
                HOTLINE
              </h3>
            </div>

            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Gọi cho chúng tôi 24/24 khi nào bạn cần sự hỗ trợ từ Realtime
            </p>

            <p className="text-xl font-bold text-gray-900 dark:text-white">
              +84 28 7303 3888 <span className="text-gray-400 mx-2">|</span>{" "}
              0933 119 056
            </p>
          </motion.div>

          {/* CARD 2: KẾT NỐI MẠNG XÃ HỘI */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-gray-900 p-10 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:shadow-lg transition-shadow"
          >
            <div className="mb-6 text-gray-800 dark:text-white flex items-center gap-2">
              {/* Icon kết nối đa sắc */}
              <div className="text-2xl">🤝</div>
              <h3 className="text-xl font-bold uppercase tracking-wide">
                KẾT NỐI VỚI CHÚNG TÔI
              </h3>
            </div>

            <div className="flex items-center gap-6 mt-2">
              {/* Facebook */}
              <a
                href="#"
                className="transform hover:scale-110 transition-transform"
              >
                <div className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:shadow-blue-500/50">
                  <FaFacebook className="text-2xl" />
                </div>
              </a>

              {/* Zalo */}
              <a
                href="#"
                className="transform hover:scale-110 transition-transform"
              >
                <div className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:shadow-blue-400/50 flex items-center justify-center font-bold h-12 w-12">
                  {/* Nếu không có SiZalo thì dùng chữ Zalo */}
                  <span className="text-xs">Zalo</span>
                </div>
              </a>

              {/* Telegram */}
              <a
                href="#"
                className="transform hover:scale-110 transition-transform"
              >
                <div className="bg-sky-500 text-white p-3 rounded-full shadow-lg hover:shadow-sky-400/50">
                  <FaTelegram className="text-2xl" />
                </div>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
