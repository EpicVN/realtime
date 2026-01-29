"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa6"; // Chỉ cần icon Plus là đủ

const FAQ = () => {
  // Mặc định null (đóng hết) để giao diện gọn gàng lúc đầu, hoặc 0 nếu muốn mở cái đầu
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  const faqs = [
    {
      question:
        "Tôi có cần đầu tư máy chủ vật lý tại văn phòng để sử dụng hệ thống không?",
      answer:
        "Không. Hệ thống Realtime được xây dựng theo mô hình điện toán tập trung (Cloud), giúp doanh nghiệp tối ưu chi phí đầu tư ban đầu. Bạn chỉ cần kết nối Internet và sử dụng các thiết bị linh hoạt như IP Phone, Softphone trên máy tính hoặc điện thoại analog qua IP Gateway.",
    },
    {
      question:
        "Nếu công ty tôi mở rộng quy mô nhân sự, việc nâng cấp có phức tạp không?",
      answer:
        'Hoàn toàn đơn giản. Kiến trúc hệ thống được thiết kế để sẵn sàng mở rộng bất cứ lúc nào. Bạn chỉ cần nâng cấp gói dịch vụ theo các "Block" người dùng (như Block 10, Block 20...) để tăng số lượng máy nhánh mà không cần thay đổi hạ tầng kỹ thuật hiện có.',
    },
    {
      question:
        "Nếu nhân viên làm việc từ xa hoặc đi công tác thì có sử dụng được tổng đài không?",
      answer:
        "Có. Hệ thống hỗ trợ đa nền tảng (Web, App Mobile, Softphone). Nhân viên có thể đăng nhập và nghe gọi, chăm sóc khách hàng ở bất cứ đâu miễn là có kết nối Internet.",
    },
    {
      question:
        "Việc nghe lại các cuộc gọi cũ để kiểm tra chất lượng dịch vụ có dễ dàng không?",
      answer:
        "Rất dễ dàng. Hệ thống tự động ghi âm và lưu trữ lịch sử cuộc gọi. Quản lý có thể tìm kiếm, nghe lại hoặc tải xuống file ghi âm ngay trên trình duyệt web quản trị.",
    },
    {
      question:
        "Hệ thống có hỗ trợ tự động đọc mã OTP hoặc nhắc nợ bằng giọng nói không?",
      answer:
        "Có. Với giải pháp Text-To-Speech và Auto Call tích hợp, hệ thống có thể tự động gọi ra để đọc mã OTP, thông báo số dư, nhắc lịch hẹn hoặc nhắc nợ hoàn toàn tự động với giọng đọc AI tự nhiên.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white dark:bg-gray-950 min-h-screen flex flex-col items-center justify-center">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-primary dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            Hỗ trợ khách hàng
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Câu hỏi thường gặp
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Giải đáp những thắc mắc phổ biến nhất về hệ thống Realtime
            Solutions.
          </p>
        </div>

        {/* --- FAQ List --- */}
        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={index}
                className={`
                    border rounded-xl overflow-hidden transition-all duration-300
                    ${
                      isActive
                        ? "bg-white dark:bg-gray-900 border-primary shadow-lg dark:shadow-blue-900/20" // Active: Viền xanh, có bóng
                        : "bg-gray-50 dark:bg-gray-900 border-transparent hover:border-gray-200 dark:hover:border-gray-800" // Inactive: Nền xám nhẹ
                    }
                `}
              >
                {/* Question Header */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none cursor-pointer group"
                >
                  <span
                    className={`font-bold text-lg pr-8 transition-colors ${
                      isActive
                        ? "text-primary dark:text-blue-400"
                        : "text-gray-800 dark:text-white group-hover:text-primary"
                    }`}
                  >
                    {item.question}
                  </span>

                  {/* Icon xoay 45 độ khi active */}
                  <span
                    className={`
                    shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                    ${isActive ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-500 group-hover:bg-blue-100 group-hover:text-primary"}
                  `}
                  >
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }} // Xoay dấu + thành dấu x
                      transition={{ duration: 0.3 }}
                    >
                      <FaPlus className="w-4 h-4" />
                    </motion.div>
                  </span>
                </button>

                {/* Answer Content */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-gray-100 dark:border-gray-800 px-6 pb-6 pt-2">
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-[15px]">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Footer Note (Optional) */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Bạn không tìm thấy câu trả lời?{" "}
            <a href="/contact" className="text-primary font-bold hover:underline">
              Liên hệ ngay
            </a>{" "}
            với chúng tôi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
