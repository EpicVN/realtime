"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutVAS from "@/components/Products/About/AboutVAS";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaIdCard,
  FaSimCard,
  FaCommentSms,
  FaBullhorn,
  FaSignal,
  FaCheckDouble,
  FaTowerCell,
  FaArrowUpRightDots,
} from "react-icons/fa6";

const VoiceVASPage = () => {
  const t = useTranslations("Products.VAS.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES (VAS) dùng t()
  const VAS_FEATURES: FeatureItem[] = [
    {
      icon: <FaIdCard />,
      title: t("feat_brandname_title"),
      desc: t("feat_brandname_desc"),
    },
    {
      icon: <FaSimCard />,
      title: t("feat_sip_title"),
      desc: t("feat_sip_desc"),
    },
    {
      icon: <FaCommentSms />,
      title: t("feat_sms_title"),
      desc: t("feat_sms_desc"),
    },
    {
      icon: <FaBullhorn />,
      title: t("feat_zns_title"),
      desc: t("feat_zns_desc"),
    },
    {
      icon: <FaCheckDouble />,
      title: t("feat_shortcode_title"),
      desc: t("feat_shortcode_desc"),
    },
    {
      icon: <FaSignal />,
      title: t("feat_1900_title"),
      desc: t("feat_1900_desc"),
    },
  ];

  // 4. Dữ liệu STATS (VAS) dùng t()
  const VAS_STATS: StatItem[] = [
    {
      id: 1,
      value: "90",
      suffix: "%",
      label: t("stat_pickup"),
      icon: <FaArrowUpRightDots />,
    },
    {
      id: 2,
      value: "5",
      suffix: "",
      label: t("stat_networks"),
      icon: <FaTowerCell />,
    },
    {
      id: 3,
      value: "99",
      suffix: "%",
      label: t("stat_success_rate"),
      icon: <FaCheckDouble />,
    },
    {
      id: 4,
      value: "3s",
      suffix: "",
      label: t("stat_otp_time"),
      icon: <FaCommentSms />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutVAS />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={VAS_FEATURES}
        title={t("features_title")} // Hệ sinh thái Viễn thông...
        description={t("features_desc")} // Kết nối doanh nghiệp...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={VAS_STATS}
        title={t("stats_title")} // Hiệu quả truyền thông...
        description={t("stats_desc")} // Các giải pháp VAS...
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

export default VoiceVASPage;