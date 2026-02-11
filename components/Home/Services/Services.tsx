"use client";

import ServiceCard from "@/components/Helper/ServiceCard";
import { useTranslations } from "next-intl"; // 1. Import hook
import { MdPhoneCallback } from "react-icons/md";
import { TbDeviceDesktopAnalytics, TbFileMusic, TbServer2 } from "react-icons/tb";

const Services = () => {
  const t = useTranslations("Home.Services"); // 2. Khởi tạo namespace

  return (
    <div className="py-10 h-full items-center bg-gray-100 dark:bg-gray-950 min-h-screen">
      {/* Services title section*/}
      <div className="w-[80%] mx-auto">
        {/* Subtitle */}
        <h1 className="text-primary-dark dark:text-primary-light font-bold text-center uppercase tracking-widest text-sm mb-2">
          {t("subtitle")} {/* CÔNG CỤ MÀ BẠN CẦN */}
        </h1>

        {/* Title */}
        <h1 className="text-center text-2xl md:text-3xl lg:text-5xl text-primary mt-4 font-bold dark:text-white leading-tight">
          {t("title")} {/* Hệ Sinh Thái Giao Tiếp... */}
        </h1>
      </div>

      {/* Service cards */}
      <div className="w-[90%] xl:w-[80%] mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
        
        {/* Card 1: RealtimeCX */}
        <div>
          <ServiceCard
            icon={<TbDeviceDesktopAnalytics />}
            title="RealtimeCX"
            description={t("cx_desc")}
            shadow
          />
        </div>

        {/* Card 2: Autodialer */}
        <div>
          <ServiceCard
            icon={<MdPhoneCallback />}
            title="Autodialer"
            description={t("autodialer_desc")}
            shadow
          />
        </div>

        {/* Card 3: TTS */}
        <div>
          <ServiceCard
            icon={<TbFileMusic />}
            title="Text-To-Speech"
            description={t("tts_desc")}
            shadow
          />
        </div>

        {/* Card 4: PBX */}
        <div>
          <ServiceCard
            icon={<TbServer2 />}
            title="RealtimePBX"
            description={t("pbx_desc")}
            shadow
          />
        </div>
        
      </div>
    </div>
  );
};

export default Services;