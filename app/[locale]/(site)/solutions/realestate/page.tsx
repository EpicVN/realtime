"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutRealEstate from "@/components/Solutions/About/AboutRealEstate";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaMobileScreen,
  FaBuilding,
  FaUserSecret,
  FaEye,
  FaPhoneFlip,
  FaHandshake,
  FaChartColumn,
  FaSimCard,
} from "react-icons/fa6";

const RealEstatePage = () => {
  const t = useTranslations("Solutions.RealEstate.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (REAL ESTATE) dùng t()
  const REALESTATE_FEATURES: FeatureItem[] = [
    {
      icon: <FaMobileScreen />,
      title: t("feat_mobile_title"),
      desc: t("feat_mobile_desc"),
    },
    {
      icon: <FaUserSecret />,
      title: t("feat_masking_title"),
      desc: t("feat_masking_desc"),
    },
    {
      icon: <FaPhoneFlip />,
      title: t("feat_click_title"),
      desc: t("feat_click_desc"),
    },
    {
      icon: <FaSimCard />,
      title: t("feat_sip_title"),
      desc: t("feat_sip_desc"),
    },
    {
      icon: <FaEye />,
      title: t("feat_monitor_title"),
      desc: t("feat_monitor_desc"),
    },
    {
      icon: <FaChartColumn />,
      title: t("feat_marketing_title"),
      desc: t("feat_marketing_desc"),
    },
  ];

  // 4. Dữ liệu STATS (REAL ESTATE) dùng t()
  const REALESTATE_STATS: StatItem[] = [
    {
      id: 1,
      value: "300",
      suffix: "+",
      label: t("stat_calls"),
      icon: <FaPhoneFlip />,
    },
    {
      id: 2,
      value: "90",
      suffix: "%",
      label: t("stat_pickup"),
      icon: <FaBuilding />,
    },
    {
      id: 3,
      value: "100",
      suffix: "%",
      label: t("stat_security"),
      icon: <FaUserSecret />,
    },
    {
      id: 4,
      value: "2X",
      suffix: "",
      label: t("stat_closing"),
      icon: <FaHandshake />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutRealEstate />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={REALESTATE_FEATURES}
        title={t("features_title")} // Công cụ 'Săn khách' cho Sàn BĐS
        description={t("features_desc")} // Giải pháp tổng đài chuyên dụng...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={REALESTATE_STATS}
        title={t("stats_title")} // Gia tăng doanh số Bất động sản
        description={t("stats_desc")} // Hàng trăm sàn giao dịch BĐS...
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

export default RealEstatePage;
