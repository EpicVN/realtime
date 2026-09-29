"use client";

import React, { useEffect, useRef } from "react";
import { motion, useInView, animate } from "framer-motion";

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
  title?: string;
  description?: string;
}

// ==============================================================
// COMPONENT PHỤ: HIỆU ỨNG ĐẾM SỐ TỰ ĐỘNG
// ==============================================================
const AnimatedNumber = ({ value }: { value: string }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    // Lọc lấy phần số (ví dụ: "10k" -> 10, "95" -> 95, "4.5" -> 4.5)
    const numValue = parseFloat(value.replace(/[^0-9.]/g, ""));
    const isNumber = !isNaN(numValue);

    if (isInView && isNumber && ref.current) {
      // Xác định xem số gốc có dấu thập phân không
      const hasDecimal = value.includes(".");

      const controls = animate(0, numValue, {
        duration: 2, // Thời gian đếm (2 giây)
        ease: "easeOut",
        onUpdate(latest) {
          if (ref.current) {
            ref.current.textContent = hasDecimal
              ? latest.toFixed(1)
              : Math.floor(latest).toString();
          }
        },
      });
      return () => controls.stop();
    }
  }, [isInView, value]);

  // Fallback: nếu value không phải là số (VD: "Chưa có"), hiển thị text tĩnh
  if (isNaN(parseFloat(value))) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>0</span>;
};

// ==============================================================
// COMPONENT CHÍNH: STATS SECTION (NÂNG CẤP UI)
// ==============================================================
const StatsSection = ({
  data,
  className = "bg-gray-50/50 dark:bg-gray-900/30",
  title,
  description,
}: StatsSectionProps) => {
  return (
    <section
      className={`relative py-24 border-y border-gray-100 dark:border-gray-800 overflow-hidden ${className}`}
    >
      {/* --- TRANG TRÍ BACKGROUND (Glow effects) --- */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 dark:bg-purple-600/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* --- HEADER SECTION --- */}
        {title && (
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-linear-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 mb-6"
            >
              {title}
            </motion.h2>

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed"
              >
                {description}
              </motion.p>
            )}
          </div>
        )}

        {/* --- STATS CARDS (GRID) --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.15,
                duration: 0.6,
                ease: "easeOut",
              }}
              className="relative group bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 hover:-translate-y-2 hover:shadow-2xl hover:border-blue-200 dark:hover:border-blue-900 transition-all duration-300 flex flex-col items-center text-center"
            >
              {/* Highlight vệt sáng góc trên bên phải khi Hover */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-linear-to-bl from-blue-100 to-transparent dark:from-blue-900/30 rounded-tr-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Icon */}
              {stat.icon && (
                <div className="mb-6 w-16 h-16 rounded-2xl bg-linear-to-br from-blue-50 to-blue-100 dark:from-gray-700 dark:to-gray-800 text-blue-600 dark:text-blue-400 flex items-center justify-center text-3xl group-hover:scale-110 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all duration-300 shadow-sm relative z-10">
                  {stat.icon}
                </div>
              )}

              {/* Value + Suffix + Animated Counter */}
              <div className="text-4xl lg:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight flex items-baseline relative z-10">
                <AnimatedNumber value={stat.value} />
                {stat.suffix && (
                  <span className="text-blue-600 dark:text-blue-400 text-3xl font-bold ml-1">
                    {stat.suffix}
                  </span>
                )}
              </div>

              {/* Label */}
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest relative z-10">
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
