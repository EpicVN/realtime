"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaPhone,
  FaEnvelope,
  FaUsers,
  FaPaperPlane,
} from "react-icons/fa6"; // Dùng bộ icon fa6 là ok, hoặc có thể đổi sang hi/bi nếu muốn nét mảnh hơn

const ContactForm = () => {
  return (
    <section className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-2xl">
        {" "}
        {/* Thu hẹp max-w lại một chút cho form gọn hơn */}
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 space-y-4"
        >
          <p className="text-gray-500 font-bold uppercase tracking-wider text-xs md:text-sm">
            THÔNG TIN LIÊN HỆ
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-white leading-tight">
            Sẵn sàng bứt phá hiệu suất <br className="hidden md:block" />
            cùng hệ sinh thái Realtime?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-4">
            Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn thiết lập
            giải pháp tối ưu nhất. Để lại thông tin để nhận tư vấn miễn phí ngay
            hôm nay!
          </p>
        </motion.div>
        {/* --- Form Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 w-full"
        >
          <form className="space-y-4 md:space-y-5">
            {/* Input: Họ tên */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base"
                placeholder="Nhập họ tên của bạn..."
              />
            </div>

            {/* Input: Số điện thoại */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaPhone className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="tel"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base"
                placeholder="Nhập số điện thoại của bạn..."
              />
            </div>

            {/* Input: Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="email"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base"
                placeholder="Nhập địa chỉ email của bạn..."
              />
            </div>

            {/* Input: Số lượng dự kiến */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUsers className="text-gray-400 group-focus-within:text-blue-500 transition-colors text-lg" />
              </div>
              <input
                type="number"
                min={0}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base"
                placeholder="Nhập số lượng user dự kiến..."
              />
            </div>

            {/* Button Submit */}
            <div className="text-center pt-6">
              <button
                type="button"
                className="
                    group relative inline-flex items-center justify-center gap-2 
                    bg-blue-600 hover:bg-blue-700 text-white 
                    dark:bg-white dark:text-blue-900 dark:hover:bg-gray-100
                    font-bold py-3.5 px-12 rounded-lg 
                    shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1
                    transition-all duration-300 w-full md:w-auto
                "
              >
                <span>Đăng ký tư vấn ngay</span>
                <FaPaperPlane className="text-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
