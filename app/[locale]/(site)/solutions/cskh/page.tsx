"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutCSKH from "@/components/Solutions/About/AboutCSKH";
import { useTranslations } from "next-intl"; // 1. Import hook
import { FaSmile } from "react-icons/fa";

import {
  FaTicket,
  FaIdCardClip,
  FaHeadset,
  FaComments,
  FaChartLine,
  FaUsersViewfinder,
  FaClockRotateLeft,
  FaPhoneSlash,
} from "react-icons/fa6";

const CSKHPage = () => {
  const t = useTranslations("Solutions.CSKH.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (CSKH) dùng t()
  const CSKH_FEATURES: FeatureItem[] = [
    {
      icon: <FaIdCardClip />,
      title: t("feat_popup_title"),
      desc: t("feat_popup_desc"),
    },
    {
      icon: <FaTicket />,
      title: t("feat_ticket_title"),
      desc: t("feat_ticket_desc"),
    },
    {
      icon: <FaComments />,
      title: t("feat_chat_title"),
      desc: t("feat_chat_desc"),
    },
    {
      icon: <FaPhoneSlash />,
      title: t("feat_missed_title"),
      desc: t("feat_missed_desc"),
    },
    {
      icon: <FaUsersViewfinder />,
      title: t("feat_quality_title"),
      desc: t("feat_quality_desc"),
    },
    {
      icon: <FaChartLine />,
      title: t("feat_sla_title"),
      desc: t("feat_sla_desc"),
    },
  ];

  // 4. Dữ liệu STATS (CSKH) dùng t()
  const CSKH_STATS: StatItem[] = [
    {
      id: 1,
      value: "95",
      suffix: "%",
      label: t("stat_csat"),
      icon: <FaSmile />,
    },
    {
      id: 2,
      value: "80",
      suffix: "%",
      label: t("stat_fcr"),
      icon: <FaHeadset />,
    },
    {
      id: 3,
      value: "<10",
      suffix: "s",
      label: t("stat_wait_time"),
      icon: <FaClockRotateLeft />,
    },
    {
      id: 4,
      value: "24/7",
      suffix: "",
      label: t("stat_operation"),
      icon: <FaHeadset />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutCSKH />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={CSKH_FEATURES}
        title={t("features_title")} // Công cụ CSKH mạnh mẽ nhất
        description={t("features_desc")} // Biến trung tâm liên lạc...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={CSKH_STATS}
        title={t("stats_title")} // Nâng tầm trải nghiệm khách hàng
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

export default CSKHPage;
