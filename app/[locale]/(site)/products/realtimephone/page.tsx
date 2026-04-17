"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import AboutRealtimePhone from "@/components/Products/About/AboutRealtimePhone";
import {
  FaFeather,
  FaVolumeHigh,
  FaNetworkWired,
  FaLayerGroup,
  FaShieldHalved,
  FaWandMagicSparkles,
  FaLanguage,
  FaCrown,
  FaGift,
  FaWindows,
  FaPalette,
  FaEnvelopeCircleCheck,
} from "react-icons/fa6";
import { useTranslations } from "next-intl"; // <-- Import hook dịch thuật

// ==============================================================
// COMPONENT: RE-BRANDING PROMO (Đóng gói thương hiệu)
// ==============================================================
const RebrandingPromo = () => {
  // Trỏ vào đúng block "Page" trong file JSON
  const t = useTranslations("Products.RealtimePhone.Page");

  return (
    <section className="py-20 bg-blue-50 dark:bg-gray-900 relative overflow-hidden">
      {/* Trang trí nền */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-72 h-72 rounded-full bg-blue-200/50 dark:bg-blue-900/20 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-cyan-200/50 dark:bg-cyan-900/20 blur-3xl"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-300 font-bold text-sm mb-4">
            <FaCrown className="text-yellow-500" /> {t("Rebranding.badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6">
            {t("Rebranding.title1")} <br className="hidden md:block" />
            <span className="text-blue-600 dark:text-blue-400 mt-2 block">
              {t("Rebranding.title2")}
            </span>
          </h2>
          {/* Render HTML chứa thẻ <strong> từ JSON */}
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {t.rich("Rebranding.description", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Card 1: Khách hàng dự án (Miễn phí) */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-t-4 border-green-500 relative transform transition-transform hover:-translate-y-2 flex flex-col">
            <div className="absolute sm:top-4 sm:right-4 right-0 top-0 bg-green-100 text-green-600 font-bold px-3 py-1 rounded-full text-xs flex items-center gap-1">
              <FaGift /> {t("Rebranding.option1.badge")}
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("Rebranding.option1.title")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
              {t("Rebranding.option1.subtitle")}
            </p>

            <div className="mb-6">
              <span className="text-4xl font-extrabold text-green-500">
                {t("Rebranding.option1.price")}
              </span>
            </div>

            <ul className="space-y-3 mb-8 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <FaWindows className="text-green-500" />{" "}
                {t("Rebranding.option1.service1")}
              </li>
              <li className="flex items-center gap-2">
                <FaPalette className="text-green-500" />{" "}
                {t("Rebranding.option1.service2")}
              </li>
            </ul>

            <div className="bg-gray-50 dark:bg-gray-900/50 p-4 rounded-lg text-sm text-gray-600 dark:text-gray-400 mt-auto">
              <strong>{t("Rebranding.option1.conditionTitle")}</strong> <br />
              {/* ĐÃ SỬA: Map thẻ <highlight> từ JSON ra style Tailwind */}
              {t.rich("Rebranding.option1.conditionDesc", {
                highlight: (chunks) => (
                  <span className="font-bold text-green-500 dark:text-green-400">
                    {chunks}
                  </span>
                ),
              })}
            </div>
          </div>

          {/* Card 2: Khách mới (Có phí) */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-xl border-t-4 border-blue-500 relative transform transition-transform hover:-translate-y-2 flex flex-col">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t("Rebranding.option2.title")}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-6 pb-6 border-b border-gray-100 dark:border-gray-700">
              {t("Rebranding.option2.subtitle")}
            </p>

            <div className="mb-6 flex items-end gap-1">
              <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                {t("Rebranding.option2.priceValue")}
              </span>
              <span className="text-lg text-gray-500 font-bold mb-1">
                {t("Rebranding.option2.priceUnit")}
              </span>
            </div>

            <ul className="space-y-3 mb-8 text-gray-600 dark:text-gray-300">
              <li className="flex items-center gap-2">
                <FaWindows className="text-blue-500" />{" "}
                {t("Rebranding.option2.service1")}
              </li>
              <li className="flex items-center gap-2">
                <FaPalette className="text-blue-500" />{" "}
                {t("Rebranding.option2.service2")}
              </li>
            </ul>

            <div className="mt-auto pt-4 flex flex-col gap-3">
              <a
                href="mailto:sales@realtime.vn"
                className="w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition-colors flex justify-center items-center gap-2"
              >
                <FaEnvelopeCircleCheck /> sales@realtime.vn
              </a>
              <p className="text-center text-xs text-gray-500">
                {t("Rebranding.option2.contactText")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ==============================================================
// MAIN PAGE ASSEMBLE
// ==============================================================
const RealtimePhonePage = () => {
  // Khởi tạo t() ở trang chính
  const t = useTranslations("Products.RealtimePhone.Page");

  // Đưa PHONE_FEATURES vào trong Component để dùng được hàm t()
  const PHONE_FEATURES: FeatureItem[] = [
    {
      icon: <FaFeather />,
      title: t("Features.items.free_light.title"),
      desc: t("Features.items.free_light.desc"),
    },
    {
      icon: <FaVolumeHigh />,
      title: t("Features.items.audio.title"),
      desc: t("Features.items.audio.desc"),
    },
    {
      icon: <FaNetworkWired />,
      title: t("Features.items.sip.title"),
      desc: t("Features.items.sip.desc"),
    },
    {
      icon: <FaLayerGroup />,
      title: t("Features.items.multipurpose.title"),
      desc: t("Features.items.multipurpose.desc"),
    },
    {
      icon: <FaShieldHalved />,
      title: t("Features.items.security.title"),
      desc: t("Features.items.security.desc"),
    },
    {
      icon: <FaWandMagicSparkles />,
      title: t("Features.items.easy_setup.title"),
      desc: t("Features.items.easy_setup.desc"),
    },
    {
      icon: <FaLanguage />,
      title: t("Features.items.multilingual.title"),
      desc: t("Features.items.multilingual.desc"),
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION (APP INTRO & DOWNLOAD) --- */}
      <AboutRealtimePhone />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={PHONE_FEATURES}
        title={t("Features.sectionTitle")}
        description={t("Features.sectionDesc")}
      />

      {/* --- 3. RE-BRANDING PROMO (CALL TO ACTION CHỐT SALE) --- */}
      <RebrandingPromo />

      {/* FAQ */}
      <FAQ />

      {/* ContactForm */}
      <ContactForm />

      {/* ContactInfo */}
      <ContactInfo />
    </div>
  );
};

export default RealtimePhonePage;
