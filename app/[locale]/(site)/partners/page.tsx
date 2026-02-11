"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl"; // 2. Import hook
import {
  FaHandshake,
  FaChartLine,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa6";
import Link from "next/link";

const PartnerPage = () => {
  const t = useTranslations("Partners"); // 3. Namespace

  // 4. Dữ liệu PARTNERS (Giữ nguyên string path)
  const PARTNERS = [
    {
      category: t("cat_telecom"), // Nhà mạng viễn thông
      logos: [
        { name: "Viettel", img: "/images/partners/viettel.jpg" },
        { name: "VNPT", img: "/images/partners/vnpt.png" },
        { name: "Mobifone", img: "/images/partners/mobifone.png", scale: 2 },
        { name: "FPT Telecom", img: "/images/partners/fpt.png", scale: 2 },
        { name: "CMC Telecom", img: "/images/partners/cmc.png", scale: 1.8 },
      ],
    },
    {
      category: t("cat_customer"), // Khách hàng tiêu biểu
      logos: [
        { name: "Vietstar", img: "/images/partners/vietstar.png" },
        {
          name: "Tìm việc 365",
          img: "/images/partners/myjob365.png",
          scale: 2.4,
        },
        { name: "Hùng Cường", img: "/images/partners/hungcuong.png", scale: 2 },
        { name: "Findjobs", img: "/images/partners/findjobs.png", scale: 0.8 },
        {
          name: "Cửa Sổ Vàng",
          img: "/images/partners/cuasovang.png",
          scale: 1.6,
        },
      ],
    },
  ];

  // 5. Dữ liệu BENEFITS dùng t()
  const BENEFITS = [
    {
      icon: <FaHandshake />,
      title: t("ben_1_title"),
      desc: t("ben_1_desc"),
    },
    {
      icon: <FaChartLine />,
      title: t("ben_2_title"),
      desc: t("ben_2_desc"),
    },
    {
      icon: <FaGlobe />,
      title: t("ben_3_title"),
      desc: t("ben_3_desc"),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-34 pb-20 overflow-hidden">
      {/* --- HERO SECTION --- */}
      <div className="container mx-auto px-6 text-center mb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
            {t("badge")} {/* Mạng lưới kết nối */}
          </span>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {t("hero_title")} <br /> {/* Đối tác chiến lược của */}
            <span className="text-blue-600">Realtime Solutions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            {t("hero_desc")} {/* Chúng tôi tự hào được đồng hành... */}
          </p>
        </motion.div>
      </div>

      {/* --- LOGO SLIDER SECTION --- */}
      <div className="w-full mb-24 space-y-20 container mx-auto px-6">
        {PARTNERS.map((group, groupIndex) => (
          <div key={groupIndex} className="relative">
            {/* Tên nhóm */}
            <div className="container mx-auto px-6 mb-8">
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="text-2xl font-bold text-gray-800 dark:text-white border-l-4 border-blue-600 pl-4"
              >
                {group.category}
              </motion.h3>
            </div>

            {/* --- MARQUEE CONTAINER --- */}
            <div className="flex overflow-hidden relative w-full mask-[linear-gradient(to_right,transparent,white_10%,white_90%,transparent)]">
              <motion.div
                className="flex flex-nowrap gap-8 py-4"
                animate={{ x: "-50%" }}
                transition={{
                  duration: 30,
                  ease: "linear",
                  repeat: Infinity,
                }}
              >
                {/* Nhân bản danh sách logo */}
                {[
                  ...group.logos,
                  ...group.logos,
                  ...group.logos,
                  ...group.logos,
                ].map((logo, index) => (
                  <div
                    key={index}
                    className="shrink-0 w-50 h-25 bg-white dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-800 flex items-center justify-center p-6 shadow-sm hover:border-blue-300 transition-colors"
                  >
                    <div className="relative w-full h-full grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                      <Image
                        src={logo.img}
                        alt={logo.name}
                        fill
                        className="object-contain"
                        style={{ transform: `scale(${logo.scale || 1})` }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        ))}
      </div>

      {/* --- WHY PARTNER WITH US (BENEFITS) --- */}
      <div className="bg-blue-600 dark:bg-blue-900/40 py-20 mb-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("ben_title")} {/* Tại sao chọn hợp tác... */}
            </h2>
            <p className="text-blue-100 max-w-2xl mx-auto">
              {t("ben_desc")} {/* Hệ sinh thái công nghệ... */}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {BENEFITS.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-white hover:bg-white/20 transition-all"
              >
                <div className="bg-white text-blue-600 w-14 h-14 rounded-full flex items-center justify-center text-2xl mb-6 shadow-lg">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-50 text-sm leading-relaxed opacity-90">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* --- CTA SECTION --- */}
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gray-900 dark:bg-white rounded-3xl p-12 relative overflow-hidden"
        >
          {/* Background Decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-[100px] opacity-20 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold text-white dark:text-gray-900 mb-6">
              {t("cta_title")} {/* Trở thành đối tác... */}
            </h2>
            <p className="text-gray-400 dark:text-gray-600 mb-8 max-w-xl mx-auto">
              {t("cta_desc")} {/* Đăng ký ngay để nhận... */}
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1"
            >
              <span>{t("btn_register")}</span>
              <FaArrowRight />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PartnerPage;
