"use client";

import React from "react";
import { motion } from "framer-motion";

// Định nghĩa kiểu dữ liệu cho từng tính năng
export interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface FeatureGridProps {
  features: FeatureItem[];
  title?: string;
  description?: string;
  className?: string; // Để đổi màu nền nếu cần (vd: bg-white hoặc bg-gray-50)
}

const FeatureGrid = ({
  features,
  title = "Tính năng nổi bật",
  description,
  className = "bg-gray-50 dark:bg-gray-950",
}: FeatureGridProps) => {
  // Animation Stagger (Xuất hiện lần lượt)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Mỗi thẻ hiện cách nhau 0.1s
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      className={`flex flex-col justify-center items-center min-h-screen pb-24 ${className}`}
    >
      <div className="container mx-auto px-6">
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
          >
            {title}
          </motion.h2>

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
            >
              {description}
            </motion.p>
          )}
        </div>

        {/* --- GRID --- */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-900 p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 group"
            >
              {/* Icon Box */}
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white group-hover:-rotate-6 transition-all duration-300 shadow-inner">
                {feature.icon}
              </div>

              {/* Content */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[15px]">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureGrid;
