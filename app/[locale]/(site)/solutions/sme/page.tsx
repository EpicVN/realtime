"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutSME from "@/components/Solutions/About/AboutSME";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaPlug,
  FaChartArea,
  FaUserShield,
  FaHeadset,
  FaNetworkWired,
  FaFileInvoiceDollar,
} from "react-icons/fa6";

const SMEPage = () => {
  const t = useTranslations("Solutions.SME.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (SME) dùng t()
  const SME_FEATURES: FeatureItem[] = [
    {
      icon: <FaPlug />,
      title: t("feat_api_title"),
      desc: t("feat_api_desc"),
    },
    {
      icon: <FaChartArea />,
      title: t("feat_report_title"),
      desc: t("feat_report_desc"),
    },
    {
      icon: <FaUserShield />,
      title: t("feat_permission_title"),
      desc: t("feat_permission_desc"),
    },
    {
      icon: <FaNetworkWired />,
      title: t("feat_routing_title"),
      desc: t("feat_routing_desc"),
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: t("feat_quota_title"),
      desc: t("feat_quota_desc"),
    },
    {
      icon: <FaHeadset />,
      title: t("feat_quality_title"),
      desc: t("feat_quality_desc"),
    },
  ];

  // 4. Dữ liệu STATS (SME) dùng t()
  const SME_STATS: StatItem[] = [
    {
      id: 1,
      value: "30",
      suffix: "%",
      label: t("stat_cost_saving"),
      icon: <FaFileInvoiceDollar />,
    },
    {
      id: 2,
      value: "50",
      suffix: "%",
      label: t("stat_productivity"),
      icon: <FaChartArea />,
    },
    {
      id: 3,
      value: "100",
      suffix: "%",
      label: t("stat_data_control"),
      icon: <FaUserShield />,
    },
    {
      id: 4,
      value: "99.9",
      suffix: "%",
      label: t("stat_uptime"),
      icon: <FaNetworkWired />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutSME />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={SME_FEATURES}
        title={t("features_title")} // Nền tảng Communication cho SME
        description={t("features_desc")} // Giải pháp giúp doanh nghiệp SME...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={SME_STATS}
        title={t("stats_title")} // Đồng hành cùng sự phát triển
        description={t("stats_desc")} // Hơn 1000+ doanh nghiệp SME...
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

export default SMEPage;
