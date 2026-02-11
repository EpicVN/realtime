"use client";

import React, { useState } from "react";
import { Link } from "@/i18n/navigation"; // 1. Link chuẩn
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus } from "react-icons/fa6";
import { useTranslations } from "next-intl"; // 2. Import hook

const FAQ = () => {
  const t = useTranslations("Home.FAQ"); // 3. Namespace
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  // 4. Dữ liệu FAQ dùng t()
  const faqs = [
    {
      question: t("q1"),
      answer: t("a1"),
    },
    {
      question: t("q2"),
      answer: t("a2"),
    },
    {
      question: t("q3"),
      answer: t("a3"),
    },
    {
      question: t("q4"),
      answer: t("a4"),
    },
    {
      question: t("q5"),
      answer: t("a5"),
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
            {t("badge")} {/* Hỗ trợ khách hàng */}
          </span>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {t("title")} {/* Câu hỏi thường gặp */}
          </h2>
          <p className="text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")} {/* Giải đáp những thắc mắc... */}
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
                        ? "bg-white dark:bg-gray-900 border-primary shadow-lg dark:shadow-blue-900/20"
                        : "bg-gray-50 dark:bg-gray-900 border-transparent hover:border-gray-200 dark:hover:border-gray-800"
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

                  {/* Icon xoay */}
                  <span
                    className={`
                    shrink-0 flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300
                    ${isActive ? "bg-primary text-white" : "bg-gray-200 dark:bg-gray-800 text-gray-500 group-hover:bg-blue-100 group-hover:text-primary"}
                  `}
                  >
                    <motion.div
                      animate={{ rotate: isActive ? 45 : 0 }}
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

        {/* Footer Note */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            {t("footer_text")}{" "}
            <Link
              href="/contact"
              className="text-primary font-bold hover:underline"
            >
              {t("footer_link")}
            </Link>{" "}
            {t("footer_text_2")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
