"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutAutodialer from "@/components/Products/About/AboutAutodialer"; // Đã có đa ngôn ngữ
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaRobot,
  FaCalendarDays,
  FaFileExcel,
  FaFilter,
  FaChartColumn,
  FaMicrophoneLines,
  FaBolt,
  FaUserClock,
  FaPhoneSlash,
  FaMoneyBillWave,
} from "react-icons/fa6";

const AutodialerPage = () => {
  const t = useTranslations("Products.Autodialer.Page"); // 2. Namespace riêng cho trang này

  // 3. Dữ liệu FEATURES dùng t()
  const AUTO_FEATURES: FeatureItem[] = [
    {
      icon: <FaCalendarDays />,
      title: t("feat_schedule_title"),
      desc: t("feat_schedule_desc"),
    },
    {
      icon: <FaMicrophoneLines />,
      title: t("feat_tts_title"),
      desc: t("feat_tts_desc"),
    },
    {
      icon: <FaFileExcel />,
      title: t("feat_import_title"),
      desc: t("feat_import_desc"),
    },
    {
      icon: <FaChartColumn />,
      title: t("feat_report_title"),
      desc: t("feat_report_desc"),
    },
    {
      icon: <FaRobot />,
      title: t("feat_dtmf_title"),
      desc: t("feat_dtmf_desc"),
    },
    {
      icon: <FaFilter />,
      title: t("feat_filter_title"),
      desc: t("feat_filter_desc"),
    },
  ];

  // 4. Dữ liệu STATS dùng t()
  const AUTO_STATS: StatItem[] = [
    {
      id: 1,
      value: "300",
      suffix: "%",
      label: t("stat_productivity"),
      icon: <FaBolt />,
    },
    {
      id: 2,
      value: "80",
      suffix: "%",
      label: t("stat_time_saving"),
      icon: <FaUserClock />,
    },
    {
      id: 3,
      value: "10k",
      suffix: "+",
      label: t("stat_calls_per_hour"),
      icon: <FaPhoneSlash />,
    },
    {
      id: 4,
      value: "0",
      suffix: "đ",
      label: t("stat_hardware_cost"),
      icon: <FaMoneyBillWave />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO / ABOUT SECTION --- */}
      <AboutAutodialer />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={AUTO_FEATURES}
        title={t("features_title")} // Tính năng mạnh mẽ...
        description={t("features_desc")} // Giải phóng nhân sự...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={AUTO_STATS}
        title={t("stats_title")} // Tối ưu hóa quy trình...
        description={t("stats_desc")} // Với công nghệ Predictive...
      />

      {/* --- 4. PRICING SECTION --- */}
      <Pricing />

      {/* FAQ */}
      <FAQ />

      {/* ContactForm */}
      <ContactForm />

      {/* ContactInfo */}
      <ContactInfo />
    </div>
  );
};

export default AutodialerPage;
