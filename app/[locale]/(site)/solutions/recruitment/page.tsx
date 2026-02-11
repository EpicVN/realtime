"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutRecruitment from "@/components/Solutions/About/AboutRecruitment";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaUserClock,
  FaPhoneVolume,
  FaFileAudio,
  FaListCheck,
  FaBullhorn,
  FaChartPie,
  FaUserCheck,
  FaCalendarCheck,
  FaSackDollar,
} from "react-icons/fa6";

const RecruitmentPage = () => {
  const t = useTranslations("Solutions.Recruitment.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (RECRUITMENT) dùng t()
  const RECRUITMENT_FEATURES: FeatureItem[] = [
    {
      icon: <FaPhoneVolume />,
      title: t("feat_click_title"),
      desc: t("feat_click_desc"),
    },
    {
      icon: <FaListCheck />,
      title: t("feat_ats_title"),
      desc: t("feat_ats_desc"),
    },
    {
      icon: <FaFileAudio />,
      title: t("feat_record_title"),
      desc: t("feat_record_desc"),
    },
    {
      icon: <FaCalendarCheck />,
      title: t("feat_reminder_title"),
      desc: t("feat_reminder_desc"),
    },
    {
      icon: <FaBullhorn />,
      title: t("feat_mass_title"),
      desc: t("feat_mass_desc"),
    },
    {
      icon: <FaChartPie />,
      title: t("feat_report_title"),
      desc: t("feat_report_desc"),
    },
  ];

  // 4. Dữ liệu STATS (RECRUITMENT) dùng t()
  const RECRUITMENT_STATS: StatItem[] = [
    {
      id: 1,
      value: "50",
      suffix: "%",
      label: t("stat_time"),
      icon: <FaUserClock />,
    },
    {
      id: 2,
      value: "90",
      suffix: "%",
      label: t("stat_pickup"),
      icon: <FaPhoneVolume />,
    },
    {
      id: 3,
      value: "30",
      suffix: "%",
      label: t("stat_cost"),
      icon: <FaSackDollar />,
    },
    {
      id: 4,
      value: "100",
      suffix: "%",
      label: t("stat_transparent"),
      icon: <FaUserCheck />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutRecruitment />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={RECRUITMENT_FEATURES}
        title={t("features_title")} // Công nghệ hóa quy trình Tuyển dụng
        description={t("features_desc")} // Giải phóng HR khỏi...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={RECRUITMENT_STATS}
        title={t("stats_title")} // Tối ưu hóa nguồn lực Tuyển dụng
        description={t("stats_desc")} // Nâng cao hình ảnh chuyên nghiệp...
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

export default RecruitmentPage;
