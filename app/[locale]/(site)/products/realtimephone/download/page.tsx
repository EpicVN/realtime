"use client";

import { Link } from "@/i18n/navigation";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  FaApple,
  FaArrowLeft,
  FaCheck,
  FaCircleInfo,
  FaDownload,
  FaMicrochip,
  FaWindows,
} from "react-icons/fa6";

// Đổi đường dẫn thư mục chứa file zip trên server của bạn tại đây
const DOWNLOAD_BASE_URL = "http://realtime.vn/huong-dan/RealtimePhone";

const RealtimePhoneDownloadPage = () => {
  const t = useTranslations("Products.RealtimePhone.Download");

  const DOWNLOAD_OPTIONS = [
    {
      id: "windows-x64",
      os: "Windows",
      arch: "64-bit (x64)",
      badge: t("cards.win.badge"),
      title: t("cards.win.title"),
      subtitle: t("cards.win.subtitle"),
      fileName: "RealtimePhone-windows-x64.zip",
      href: `${DOWNLOAD_BASE_URL}/RealtimePhone-windows-x64.zip`,
      icon: <FaWindows className="text-4xl text-blue-600 dark:text-blue-400" />,
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      borderColor: "border-blue-500",
      buttonStyle:
        "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25",
      highlight: true,
      requirements: [
        t("cards.win.req1"),
        t("cards.win.req2"),
        t("cards.win.req3"),
      ],
    },
    {
      id: "macos-arm64",
      os: "macOS",
      arch: "Apple Silicon (ARM64)",
      badge: t("cards.macArm.badge"),
      title: t("cards.macArm.title"),
      subtitle: t("cards.macArm.subtitle"),
      fileName: "RealtimePhone-macos-arm64.zip",
      href: `${DOWNLOAD_BASE_URL}/RealtimePhone-macos-arm64.zip`,
      icon: <FaApple className="text-4xl text-gray-900 dark:text-white" />,
      iconBg: "bg-gray-100 dark:bg-gray-800",
      borderColor: "border-gray-800 dark:border-gray-600",
      buttonStyle:
        "bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 shadow-md",
      highlight: false,
      requirements: [
        t("cards.macArm.req1"),
        t("cards.macArm.req2"),
        t("cards.macArm.req3"),
      ],
    },
    {
      id: "macos-x64",
      os: "macOS",
      arch: "Intel (x64)",
      badge: t("cards.macIntel.badge"),
      title: t("cards.macIntel.title"),
      subtitle: t("cards.macIntel.subtitle"),
      fileName: "RealtimePhone-macos-x64.zip",
      href: `${DOWNLOAD_BASE_URL}/RealtimePhone-macos-x64.zip`,
      icon: <FaApple className="text-4xl text-gray-700 dark:text-gray-300" />,
      iconBg: "bg-gray-100 dark:bg-gray-800",
      borderColor: "border-gray-300 dark:border-gray-700",
      buttonStyle:
        "bg-gray-900 hover:bg-gray-800 dark:bg-white dark:hover:bg-gray-100 text-white dark:text-gray-900 shadow-md",
      highlight: false,
      requirements: [
        t("cards.macIntel.req1"),
        t("cards.macIntel.req2"),
        t("cards.macIntel.req3"),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/50 dark:bg-gray-950 pt-28 pb-24 relative overflow-hidden">
      {/* Glow trang trí nền */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-400/10 dark:bg-cyan-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10 max-w-6xl">
        {/* Nút quay lại */}
        <div className="mb-8">
          <Link
            href="/products/realtimephone"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            <FaArrowLeft />
            <span>{t("backBtn")}</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider mb-4"
          >
            <FaDownload /> {t("badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-5 leading-tight"
          >
            {t("title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed"
          >
            {t("description")}
          </motion.p>
        </div>

        {/* 3 Card tải xuống */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
          {DOWNLOAD_OPTIONS.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (idx + 1), duration: 0.45 }}
              className={`relative bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl shadow-gray-200/60 dark:shadow-none border-t-4 ${item.borderColor} border-x border-b border-gray-100 dark:border-gray-800 flex flex-col transition-transform duration-300 hover:-translate-y-2`}
            >
              {/* Badge góc phải */}
              <div className="flex items-center justify-between mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl ${item.iconBg} flex items-center justify-center`}
                >
                  {item.icon}
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    item.highlight
                      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
                      : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                  }`}
                >
                  {item.badge}
                </span>
              </div>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {item.subtitle}
              </p>

              {/* Chip / Kiến trúc */}
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 dark:text-gray-300 bg-gray-50 dark:bg-gray-800/80 px-3 py-2 rounded-lg mb-6 w-fit">
                <FaMicrochip className="text-blue-500" />
                <span>{item.arch}</span>
              </div>

              {/* Thông tin yêu cầu */}
              <ul className="space-y-2.5 mb-8 text-sm text-gray-600 dark:text-gray-300 flex-1">
                {item.requirements.map((req, rIdx) => (
                  <li key={rIdx} className="flex items-start gap-2.5">
                    <FaCheck className="text-green-500 mt-1 shrink-0 text-xs" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>

              {/* Nút Download trực tiếp file .zip */}
              <div className="mt-auto">
                <a
                  href={item.href}
                  download
                  className={`w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-xl font-bold transition-all ${item.buttonStyle}`}
                >
                  <FaDownload />
                  <span>{t("downloadBtn")}</span>
                </a>
                <p
                  className="text-center text-xs text-gray-400 dark:text-gray-500 mt-3 truncate"
                  title={item.fileName}
                >
                  {item.fileName}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hộp hướng dẫn chọn phiên bản macOS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-blue-50/70 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xl shrink-0">
            <FaCircleInfo />
          </div>
          <div>
            <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
              {t("macGuide.title")}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {t("macGuide.desc")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RealtimePhoneDownloadPage;
