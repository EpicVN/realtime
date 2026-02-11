"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutStartup from "@/components/Solutions/About/AboutStartup";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaRocket,
  FaMobileScreenButton,
  FaPiggyBank,
  FaBolt,
  FaSitemap,
  FaLaptopCode,
} from "react-icons/fa6";

const StartupPage = () => {
  const t = useTranslations("Solutions.Startup.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (STARTUP) dùng t()
  const STARTUP_FEATURES: FeatureItem[] = [
    {
      icon: <FaBolt />,
      title: t("feat_instant_title"),
      desc: t("feat_instant_desc"),
    },
    {
      icon: <FaMobileScreenButton />,
      title: t("feat_wfa_title"),
      desc: t("feat_wfa_desc"),
    },
    {
      icon: <FaPiggyBank />,
      title: t("feat_save_title"),
      desc: t("feat_save_desc"),
    },
    {
      icon: <FaSitemap />,
      title: t("feat_ivr_title"),
      desc: t("feat_ivr_desc"),
    },
    {
      icon: <FaLaptopCode />,
      title: t("feat_crm_title"),
      desc: t("feat_crm_desc"),
    },
    {
      icon: <FaRocket />,
      title: t("feat_scale_title"),
      desc: t("feat_scale_desc"),
    },
  ];

  // 4. Dữ liệu STATS (STARTUP) dùng t()
  const STARTUP_STATS: StatItem[] = [
    {
      id: 1,
      value: "0",
      suffix: t("currency"), // đ
      label: t("stat_hardware_cost"),
      icon: <FaPiggyBank />,
    },
    {
      id: 2,
      value: "15",
      suffix: t("time_unit"), // phút
      label: t("stat_deploy_time"),
      icon: <FaBolt />,
    },
    {
      id: 3,
      value: "100",
      suffix: "%",
      label: t("stat_flexible"),
      icon: <FaMobileScreenButton />,
    },
    {
      id: 4,
      value: "24/7",
      suffix: "",
      label: t("stat_support"),
      icon: <FaRocket />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutStartup />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={STARTUP_FEATURES}
        title={t("features_title")} // Bệ phóng công nghệ cho Startup
        description={t("features_desc")} // Giải pháp tổng đài tinh gọn...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={STARTUP_STATS}
        title={t("stats_title")} // Khởi đầu dễ dàng & Vững chắc
        description={t("stats_desc")} // Đồng hành cùng sự phát triển...
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

export default StartupPage;
