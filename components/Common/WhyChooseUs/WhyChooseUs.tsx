"use client";

import ServiceCard from "@/components/Helper/ServiceCard";
import React from "react";
import { useTranslations } from "next-intl"; // 1. Import hook
// Import các icon
import { 
  TbBulb,           // Đơn vị tiên phong
  TbBroadcast,      // Hạ tầng
  TbRocket,         // Triển khai nhanh
  TbShieldCheck,    // Bảo mật
  TbGauge,          // Tốc độ/Hỗ trợ
  TbSettingsDollar  // Tối ưu chi phí
} from "react-icons/tb";

const WhyChooseUs = () => {
  const t = useTranslations("Home.WhyChooseUs"); // 2. Namespace

  // 3. Định nghĩa dữ liệu bên trong component để dùng t()
  const features = [
    {
      icon: <TbBulb />,
      title: t("feat_pioneer_title"),
      description: t("feat_pioneer_desc"),
    },
    {
      icon: <TbBroadcast />,
      title: t("feat_infra_title"),
      description: t("feat_infra_desc"),
    },
    {
      icon: <TbRocket />,
      title: t("feat_deploy_title"),
      description: t("feat_deploy_desc"),
    },
    {
      icon: <TbShieldCheck />,
      title: t("feat_security_title"),
      description: t("feat_security_desc"),
    },
    {
      icon: <TbGauge />,
      title: t("feat_support_title"),
      description: t("feat_support_desc"),
    },
    {
      icon: <TbSettingsDollar />,
      title: t("feat_cost_title"),
      description: t("feat_cost_desc"),
    }
  ];

  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-950 min-h-screen h-full flex items-center justify-center">
      <div className="container mx-auto px-6">
        
        {/* --- TITLE SECTION --- */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-blue-600 dark:text-white mb-4">
            {t("title")} {/* Tại sao chọn Realtime Solution? */}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        {/* --- GRID CONTENT --- */}
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((item, index) => (
            <div key={index} className="h-full w-full max-w-95 flex flex-col items-center">
              <ServiceCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                shadow={true}
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;