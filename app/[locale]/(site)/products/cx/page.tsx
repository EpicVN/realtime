"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutCX from "@/components/Products/About/AboutCX";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaUserGroup,
  FaTicketSimple,
  FaHeadset,
  FaBullhorn,
  FaChartLine,
  FaArrowsRotate,
  FaUsers,
  FaClock,
  FaHandshake,
  FaDatabase,
} from "react-icons/fa6";

const CXPage = () => {
  const t = useTranslations("Products.CX.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURE CHO CX dùng t()
  const CX_FEATURES: FeatureItem[] = [
    {
      icon: <FaUserGroup />,
      title: t("feat_360_title"),
      desc: t("feat_360_desc"),
    },
    {
      icon: <FaTicketSimple />,
      title: t("feat_ticket_title"),
      desc: t("feat_ticket_desc"),
    },
    {
      icon: <FaArrowsRotate />,
      title: t("feat_omni_title"),
      desc: t("feat_omni_desc"),
    },
    {
      icon: <FaChartLine />,
      title: t("feat_report_title"),
      desc: t("feat_report_desc"),
    },
    {
      icon: <FaBullhorn />,
      title: t("feat_marketing_title"),
      desc: t("feat_marketing_desc"),
    },
    {
      icon: <FaHeadset />,
      title: t("feat_click_title"),
      desc: t("feat_click_desc"),
    },
  ];

  // 4. Dữ liệu STATS CHO CX dùng t()
  const CX_STATS: StatItem[] = [
    {
      id: 1,
      value: "35",
      suffix: "%",
      label: t("stat_conversion"),
      icon: <FaHandshake />,
    },
    {
      id: 2,
      value: "50",
      suffix: "%",
      label: t("stat_handling_time"),
      icon: <FaClock />,
    },
    {
      id: 3,
      value: "100",
      suffix: "%",
      label: t("stat_centralized_data"),
      icon: <FaDatabase />,
    },
    {
      id: 4,
      value: "5000",
      suffix: "+",
      label: t("stat_active_users"),
      icon: <FaUsers />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO / ABOUT SECTION --- */}
      <AboutCX />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={CX_FEATURES}
        title={t("features_title")} // Tính năng toàn diện...
        description={t("features_desc")} // Biến dữ liệu khách hàng...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={CX_STATS}
        title={t("stats_title")} // Hiệu quả đo lường được
        description={t("stats_desc")} // RealtimeCX giúp doanh nghiệp...
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

export default CXPage;
