"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutEducation from "@/components/Solutions/About/AboutEducation";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaGraduationCap,
  FaSchool,
  FaBullhorn,
  FaClipboardList,
  FaMoneyCheckDollar,
  FaComments,
  FaUserGroup,
  FaHeadset,
} from "react-icons/fa6";

const EducationPage = () => {
  const t = useTranslations("Solutions.Education.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (EDUCATION) dùng t()
  const EDUCATION_FEATURES: FeatureItem[] = [
    {
      icon: <FaClipboardList />,
      title: t("feat_crm_title"),
      desc: t("feat_crm_desc"),
    },
    {
      icon: <FaBullhorn />,
      title: t("feat_zns_title"),
      desc: t("feat_zns_desc"),
    },
    {
      icon: <FaMoneyCheckDollar />,
      title: t("feat_fee_title"),
      desc: t("feat_fee_desc"),
    },
    {
      icon: <FaUserGroup />,
      title: t("feat_enrollment_title"),
      desc: t("feat_enrollment_desc"),
    },
    {
      icon: <FaHeadset />,
      title: t("feat_support_title"),
      desc: t("feat_support_desc"),
    },
    {
      icon: <FaComments />,
      title: t("feat_omni_title"),
      desc: t("feat_omni_desc"),
    },
  ];

  // 4. Dữ liệu STATS (EDUCATION) dùng t()
  const EDUCATION_STATS: StatItem[] = [
    {
      id: 1,
      value: "200",
      suffix: "%",
      label: t("stat_enrollment_eff"),
      icon: <FaGraduationCap />,
    },
    {
      id: 2,
      value: "95",
      suffix: "%",
      label: t("stat_parent_sat"),
      icon: <FaSchool />,
    },
    {
      id: 3,
      value: "100",
      suffix: "%",
      label: t("stat_delivery"),
      icon: <FaBullhorn />,
    },
    {
      id: 4,
      value: "50",
      suffix: "%",
      label: t("stat_cost_saving"),
      icon: <FaMoneyCheckDollar />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutEducation />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={EDUCATION_FEATURES}
        title={t("features_title")} // Chuyển đổi số ngành Giáo dục
        description={t("features_desc")} // Kết nối Nhà trường...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={EDUCATION_STATS}
        title={t("stats_title")} // Hiệu quả thực tế triển khai
        description={t("stats_desc")} // Giải pháp được tin dùng...
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

export default EducationPage;
