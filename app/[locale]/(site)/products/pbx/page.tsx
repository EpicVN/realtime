"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutPBX from "@/components/Products/About/AboutPBX";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaBuilding,
  FaChartPie,
  FaCoins,
  FaHeadset,
  FaMobileScreen,
  FaPhoneVolume,
  FaServer,
  FaSitemap,
} from "react-icons/fa6";

const PBXPage = () => {
  const t = useTranslations("Products.PBX.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES dùng t()
  const PBX_FEATURES: FeatureItem[] = [
    {
      icon: <FaServer />,
      title: t("feat_hardware_title"),
      desc: t("feat_hardware_desc"),
    },
    {
      icon: <FaSitemap />,
      title: t("feat_ivr_title"),
      desc: t("feat_ivr_desc"),
    },
    {
      icon: <FaMobileScreen />,
      title: t("feat_multiplatform_title"),
      desc: t("feat_multiplatform_desc"),
    },
    {
      icon: <FaChartPie />,
      title: t("feat_report_title"),
      desc: t("feat_report_desc"),
    },
    {
      icon: <FaPhoneVolume />,
      title: t("feat_record_title"),
      desc: t("feat_record_desc"),
    },
    {
      icon: <FaHeadset />,
      title: t("feat_crm_title"),
      desc: t("feat_crm_desc"),
    },
  ];

  // 4. Dữ liệu STATS dùng t()
  const PBX_STATS: StatItem[] = [
    {
      id: 1,
      value: "50",
      suffix: "%",
      label: t("stat_cost"),
      icon: <FaCoins />,
    },
    {
      id: 2,
      value: "99.9",
      suffix: "%",
      label: t("stat_uptime"),
      icon: <FaServer />,
    },
    {
      id: 3,
      value: "1000",
      suffix: "+",
      label: t("stat_clients"),
      icon: <FaBuilding />,
    },
    {
      id: 4,
      value: "24/7",
      suffix: "",
      label: t("stat_support"),
      icon: <FaHeadset />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutPBX />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={PBX_FEATURES}
        title={t("features_title")} // Tính năng vượt trội...
        description={t("features_desc")} // Mọi công cụ bạn cần...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={PBX_STATS}
        title={t("stats_title")} // Con số khẳng định...
        description={t("stats_desc")} // Hệ thống Realtime PBX...
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

export default PBXPage;
