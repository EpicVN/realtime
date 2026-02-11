"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutBPO from "@/components/Products/About/AboutBPO";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaArrowsUpDownLeftRight,
  FaAward,
  FaChartLine,
  FaClipboardCheck,
  FaGlobe,
  FaGraduationCap,
  FaHandHoldingDollar,
  FaUsers,
  FaUserTie,
} from "react-icons/fa6";

const BPOPage = () => {
  const t = useTranslations("Products.BPO.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (BPO) dùng t()
  const BPO_FEATURES: FeatureItem[] = [
    {
      icon: <FaUserTie />,
      title: t("feat_staff_title"),
      desc: t("feat_staff_desc"),
    },
    {
      icon: <FaGraduationCap />,
      title: t("feat_training_title"),
      desc: t("feat_training_desc"),
    },
    {
      icon: <FaClipboardCheck />,
      title: t("feat_qa_title"),
      desc: t("feat_qa_desc"),
    },
    {
      icon: <FaArrowsUpDownLeftRight />,
      title: t("feat_scale_title"),
      desc: t("feat_scale_desc"),
    },
    {
      icon: <FaChartLine />,
      title: t("feat_report_title"),
      desc: t("feat_report_desc"),
    },
    {
      icon: <FaHandHoldingDollar />,
      title: t("feat_cost_title"),
      desc: t("feat_cost_desc"),
    },
  ];

  // 4. Dữ liệu STATS (BPO) dùng t()
  const BPO_STATS: StatItem[] = [
    {
      id: 1,
      value: "40",
      suffix: "%",
      label: t("stat_cost_saving"),
      icon: <FaHandHoldingDollar />,
    },
    {
      id: 2,
      value: "200",
      suffix: "+",
      label: t("stat_agents_ready"),
      icon: <FaUsers />,
    },
    {
      id: 3,
      value: "95",
      suffix: "%",
      label: t("stat_csat"),
      icon: <FaAward />,
    },
    {
      id: 4,
      value: "3",
      suffix: "",
      label: t("stat_voice_regions"),
      icon: <FaGlobe />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutBPO />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={BPO_FEATURES}
        title={t("features_title")} // Tại sao chọn RealtimeBPO?
        description={t("features_desc")} // Chúng tôi cung cấp giải pháp...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={BPO_STATS}
        title={t("stats_title")} // Năng lực vận hành
        description={t("stats_desc")} // Hệ thống quy trình chuẩn...
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

export default BPOPage;
