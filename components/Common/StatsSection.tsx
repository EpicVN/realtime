"use client";

import React from "react";
import { motion } from "framer-motion";

export interface StatItem {
  id: number | string;
  value: string;
  label: string;
  icon?: React.ReactNode;
  suffix?: string;
}

interface StatsSectionProps {
  data: StatItem[];
  className?: string;
  // --- THÊM 2 PROPS MỚI ---
  title?: string;       // Tiêu đề lớn (Ví dụ: Con số biết nói)
  description?: string; // Mô tả nhỏ bên dưới
}

const StatsSection = ({ 
  data, 
  className = "bg-white dark:bg-gray-900",
  title,
  description
}: StatsSectionProps) => {
  return (
    <section className={`flex flex-col items-center justify-center min-h-screen border-y border-gray-100 dark:border-gray-800 ${className}`}>
      <div className="container mx-auto px-6">
        
        {/* --- HEADER SECTION (Chỉ hiện khi có Title) --- */}
        {title && (
          <div className="text-center mb-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {title}
            </motion.h2>
            
            {description && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100 dark:divide-gray-800">
          {data.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex flex-col items-center justify-center p-6 text-center group hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors rounded-xl md:rounded-none"
            >
              {/* Icon */}
              {stat.icon && (
                <div className="mb-4 w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                  {stat.icon}
                </div>
              )}

              {/* Value */}
              <div className="text-3xl lg:text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
                {stat.value}
                {stat.suffix && <span className="text-blue-600 text-2xl align-top ml-1">{stat.suffix}</span>}
              </div>

              {/* Label */}
              <p className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wide group-hover:text-blue-600 transition-colors">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;