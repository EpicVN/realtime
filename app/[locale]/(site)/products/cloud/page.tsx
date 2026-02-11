"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutCLOUD from "@/components/Products/About/AboutCLOUD";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaBolt,
  FaShieldHalved,
  FaServer,
  FaNetworkWired,
  FaCloudArrowUp,
  FaGaugeHigh,
  FaBuildingShield,
  FaClock,
} from "react-icons/fa6";

const CloudPage = () => {
  const t = useTranslations("Products.Cloud.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (CLOUD) dùng t()
  const CLOUD_FEATURES: FeatureItem[] = [
    {
      icon: <FaBolt />,
      title: t("feat_speed_title"),
      desc: t("feat_speed_desc"),
    },
    {
      icon: <FaShieldHalved />,
      title: t("feat_security_title"),
      desc: t("feat_security_desc"),
    },
    {
      icon: <FaNetworkWired />,
      title: t("feat_network_title"),
      desc: t("feat_network_desc"),
    },
    {
      icon: <FaCloudArrowUp />,
      title: t("feat_backup_title"),
      desc: t("feat_backup_desc"),
    },
    {
      icon: <FaServer />,
      title: t("feat_virtualization_title"),
      desc: t("feat_virtualization_desc"),
    },
    {
      icon: <FaGaugeHigh />,
      title: t("feat_upgrade_title"),
      desc: t("feat_upgrade_desc"),
    },
  ];

  // 4. Dữ liệu STATS (CLOUD) dùng t()
  const CLOUD_STATS: StatItem[] = [
    {
      id: 1,
      value: "99.99",
      suffix: "%",
      label: t("stat_uptime"),
      icon: <FaClock />,
    },
    {
      id: 2,
      value: "Tier 3",
      suffix: "",
      label: t("stat_datacenter"),
      icon: <FaBuildingShield />,
    },
    {
      id: 3,
      value: "30",
      suffix: "s",
      label: t("stat_deploy_time"),
      icon: <FaBolt />,
    },
    {
      id: 4,
      value: "24/7",
      suffix: "",
      label: t("stat_support"),
      icon: <FaServer />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutCLOUD />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={CLOUD_FEATURES}
        title={t("features_title")} // Hạ tầng Cloud đạt chuẩn...
        description={t("features_desc")} // Nền tảng vững chắc...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={CLOUD_STATS}
        title={t("stats_title")} // Thông số kỹ thuật ấn tượng
        description={t("stats_desc")} // Hạ tầng của RealtimeCLOUD...
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

export default CloudPage;
