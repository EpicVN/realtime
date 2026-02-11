"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutEnterprise from "@/components/Solutions/About/AboutEnterprise";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaShieldHalved,
  FaServer,
  FaCodeBranch,
  FaNetworkWired,
  FaFingerprint,
  FaClock,
} from "react-icons/fa6";

const EnterprisePage = () => {
  const t = useTranslations("Solutions.Enterprise.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (ENTERPRISE) dùng t()
  const ENTERPRISE_FEATURES: FeatureItem[] = [
    {
      icon: <FaShieldHalved />,
      title: t("feat_security_title"),
      desc: t("feat_security_desc"),
    },
    {
      icon: <FaServer />,
      title: t("feat_ha_title"),
      desc: t("feat_ha_desc"),
    },
    {
      icon: <FaCodeBranch />,
      title: t("feat_core_title"),
      desc: t("feat_core_desc"),
    },
    {
      icon: <FaNetworkWired />,
      title: t("feat_deploy_title"),
      desc: t("feat_deploy_desc"),
    },
    {
      icon: <FaFingerprint />,
      title: t("feat_biometrics_title"),
      desc: t("feat_biometrics_desc"),
    },
    {
      icon: <FaClock />,
      title: t("feat_support_title"),
      desc: t("feat_support_desc"),
    },
  ];

  // 4. Dữ liệu STATS (ENTERPRISE) dùng t()
  const ENTERPRISE_STATS: StatItem[] = [
    {
      id: 1,
      value: "99.99",
      suffix: "%",
      label: t("stat_uptime"),
      icon: <FaClock />,
    },
    {
      id: 2,
      value: "Unlimited",
      suffix: "",
      label: t("stat_concurrency"),
      icon: <FaServer />,
    },
    {
      id: 3,
      value: "100",
      suffix: "%",
      label: t("stat_encryption"),
      icon: <FaShieldHalved />,
    },
    {
      id: 4,
      value: "15",
      suffix: t("stat_response_unit"), // phút / minutes
      label: t("stat_response_time"),
      icon: <FaNetworkWired />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutEnterprise />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={ENTERPRISE_FEATURES}
        title={t("features_title")} // Giải pháp Tổng đài cấp Tập đoàn
        description={t("features_desc")} // Được thiết kế để đáp ứng...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={ENTERPRISE_STATS}
        title={t("stats_title")} // Tiêu chuẩn Vận hành Quốc tế
        description={t("stats_desc")} // Hệ thống Realtime Solutions...
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

export default EnterprisePage;
