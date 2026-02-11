"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutCollection from "@/components/Solutions/About/AboutCollection";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaRobot,
  FaFileInvoiceDollar,
  FaTimeline,
  FaHeadset,
  FaUserShield,
  FaChartPie,
  FaMoneyBillTrendUp,
  FaStopwatch,
  FaUsersSlash,
} from "react-icons/fa6";

const CollectionPage = () => {
  const t = useTranslations("Solutions.Collection.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (COLLECTION) dùng t()
  const COLLECTION_FEATURES: FeatureItem[] = [
    {
      icon: <FaRobot />,
      title: t("feat_autocall_title"),
      desc: t("feat_autocall_desc"),
    },
    {
      icon: <FaTimeline />,
      title: t("feat_scenario_title"),
      desc: t("feat_scenario_desc"),
    },
    {
      icon: <FaHeadset />,
      title: t("feat_predictive_title"),
      desc: t("feat_predictive_desc"),
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: t("feat_crm_title"),
      desc: t("feat_crm_desc"),
    },
    {
      icon: <FaUserShield />,
      title: t("feat_monitor_title"),
      desc: t("feat_monitor_desc"),
    },
    {
      icon: <FaChartPie />,
      title: t("feat_report_title"),
      desc: t("feat_report_desc"),
    },
  ];

  // 4. Dữ liệu STATS (COLLECTION) dùng t()
  const COLLECTION_STATS: StatItem[] = [
    {
      id: 1,
      value: "300",
      suffix: "%",
      label: t("stat_productivity"),
      icon: <FaStopwatch />,
    },
    {
      id: 2,
      value: "40",
      suffix: "%",
      label: t("stat_recovery_rate"),
      icon: <FaMoneyBillTrendUp />,
    },
    {
      id: 3,
      value: "60",
      suffix: "%",
      label: t("stat_cost_saving"),
      icon: <FaUsersSlash />,
    },
    {
      id: 4,
      value: "100",
      suffix: "%",
      label: t("stat_compliance"),
      icon: <FaUserShield />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutCollection />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={COLLECTION_FEATURES}
        title={t("features_title")} // Quy trình thu hồi nợ 4.0
        description={t("features_desc")} // Chuyển đổi từ mô hình...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={COLLECTION_STATS}
        title={t("stats_title")} // Hiệu quả đầu tư (ROI)
        description={t("stats_desc")} // Giải pháp đã được ứng dụng...
      />

      {/* --- 4. SẢN PHẨM LIÊN QUAN (Optional) --- */}

      {/* --- 5. PRICING SECTION --- */}
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

export default CollectionPage;
