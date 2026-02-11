"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const Partners = () => {
  const t = useTranslations("Home.Partners");

  // 👇 THÊM THUỘC TÍNH 'scale' VÀO ĐÂY ĐỂ CÂN CHỈNH
  const partners = [
    { name: "CMC Telecom", src: "/images/partners/cmc.png", scale: 1 },       // Giữ nguyên
    { name: "FPT Telecom", src: "/images/partners/fpt.png", scale: 1.4 },     // Thu nhỏ 10%
    { name: "FindJobs", src: "/images/partners/findjobs.png", scale: 0.8 },   // Phóng to 20%
    { name: "Hùng Cường", src: "/images/partners/hungcuong.png", scale: 1.4 },// Phóng to 10%
    { name: "Cửa Sổ Vàng", src: "/images/partners/cuasovang.png", scale: 1.2 }, // Giữ nguyên
    { name: "Myjob365", src: "/images/partners/myjob365.png", scale: 1.8 },  // Thu nhỏ 5%
  ];

  return (
    <section className="flex flex-col items-center justify-center gap-8 bg-white dark:bg-gray-950 overflow-hidden min-h-screen">
      <div className="container mx-auto px-6 mb-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-white">
          {t("title")}
        </h2>
      </div>

      <div className="relative w-full">
        {/* Lớp phủ mờ */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-linear-to-r from-white to-transparent z-10 dark:from-gray-950 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-linear-to-l from-white to-transparent z-10 dark:from-gray-900 pointer-events-none" />

        <div className="flex">
          <motion.div
            className="flex shrink-0 gap-16 pr-16 items-center"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* Render LẦN 1 */}
            {partners.map((partner, index) => (
              <div
                key={index}
                // 👇 ÁP DỤNG SCALE TẠI ĐÂY
                style={{ transform: `scale(${partner.scale})` }} 
                className="relative h-16 w-32 md:h-24 md:w-52 shrink-0 cursor-pointer"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>

          <motion.div
            className="flex shrink-0 gap-16 pr-16 items-center"
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{
              duration: 20,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {/* Render LẦN 2 */}
            {partners.map((partner, index) => (
              <div
                key={`duplicate-${index}`}
                // 👇 ÁP DỤNG SCALE TẠI ĐÂY
                style={{ transform: `scale(${partner.scale})` }}
                className="relative h-16 w-32 md:h-24 md:w-52 shrink-0 cursor-pointer"
              >
                <Image
                  src={partner.src}
                  alt={partner.name}
                  fill
                  className="object-contain"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Partners;