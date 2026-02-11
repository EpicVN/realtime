"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import TextToSpeechTool from "@/components/Common/TextToSpeechTool";
import AboutTextToSpeech from "@/components/Products/About/AboutTextToSpeech";
import { useTranslations } from "next-intl"; // 1. Import hook

import {
  FaBolt,
  FaCloudArrowDown,
  FaCode,
  FaDownload,
  FaLanguage,
  FaMapLocationDot,
  FaMicrophone,
  FaSliders,
  FaWaveSquare,
} from "react-icons/fa6";

const TextToSpeechPage = () => {
  const t = useTranslations("Products.TTS.Page"); // 2. Namespace

  // 3. Dữ liệu FEATURES dùng t()
  const TTS_FEATURES: FeatureItem[] = [
    {
      icon: <FaWaveSquare />,
      title: t("feat_natural_title"),
      desc: t("feat_natural_desc"),
    },
    {
      icon: <FaMapLocationDot />,
      title: t("feat_regional_title"),
      desc: t("feat_regional_desc"),
    },
    {
      icon: <FaSliders />,
      title: t("feat_customize_title"),
      desc: t("feat_customize_desc"),
    },
    {
      icon: <FaBolt />,
      title: t("feat_latency_title"),
      desc: t("feat_latency_desc"),
    },
    {
      icon: <FaCode />,
      title: t("feat_api_title"),
      desc: t("feat_api_desc"),
    },
    {
      icon: <FaDownload />,
      title: t("feat_export_title"),
      desc: t("feat_export_desc"),
    },
  ];

  // 4. Dữ liệu STATS dùng t()
  const TTS_STATS: StatItem[] = [
    {
      id: 1,
      value: "4.5",
      suffix: "/5",
      label: t("stat_quality"),
      icon: <FaMicrophone />,
    },
    {
      id: 2,
      value: "10",
      suffix: "+",
      label: t("stat_voices"),
      icon: <FaLanguage />,
    },
    {
      id: 3,
      value: "200",
      suffix: "ms",
      label: t("stat_latency"),
      icon: <FaBolt />,
    },
    {
      id: 4,
      value: "99",
      suffix: "%",
      label: t("stat_cost_saving"),
      icon: <FaCloudArrowDown />,
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO / ABOUT SECTION --- */}
      <AboutTextToSpeech />

      <TextToSpeechTool />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={TTS_FEATURES}
        title={t("features_title")} // Công nghệ lõi Text-to-Speech
        description={t("features_desc")} // Giải pháp chuyển đổi...
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={TTS_STATS}
        title={t("stats_title")} // Hiệu năng vượt trội
        description={t("stats_desc")} // Sẵn sàng đáp ứng...
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

export default TextToSpeechPage;
