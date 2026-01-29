"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutPBX from "@/components/Products/About/AboutPBX";
import {
    FaBuilding,
    FaChartPie,
    FaCoins,
    FaHeadset,
    FaMobileScreen,
    FaPhoneVolume,
    FaServer,
    FaSitemap,
} from "react-icons/fa6";

const PBX_FEATURES = [
  {
    icon: <FaServer />,
    title: "Không cần phần cứng",
    desc: "Loại bỏ hoàn toàn chi phí lắp đặt, bảo trì hệ thống dây cáp và máy chủ vật lý cồng kềnh.",
  },
  {
    icon: <FaSitemap />,
    title: "Định tuyến thông minh (IVR)",
    desc: "Tự động phân luồng cuộc gọi đến đúng bộ phận, nhân viên dựa trên kịch bản cài đặt sẵn.",
  },
  {
    icon: <FaMobileScreen />,
    title: "Đa nền tảng thiết bị",
    desc: "Sử dụng linh hoạt trên IP Phone, Smartphone (App) hoặc Laptop/PC (Webphone) mọi lúc mọi nơi.",
  },
  {
    icon: <FaChartPie />,
    title: "Báo cáo Realtime",
    desc: "Giám sát chất lượng cuộc gọi, thời lượng và hiệu suất nhân viên theo thời gian thực.",
  },
  {
    icon: <FaPhoneVolume />,
    title: "Ghi âm cuộc gọi",
    desc: "Tự động ghi âm và lưu trữ 100% cuộc gọi để phục vụ công tác đào tạo và kiểm soát chất lượng.",
  },
  {
    icon: <FaHeadset />,
    title: "Tích hợp CRM",
    desc: "Kết nối dễ dàng với các phần mềm CRM/ERP qua API để hiển thị thông tin khách hàng khi gọi đến.",
  },
];

const PBX_STATS: StatItem[] = [
  {
    id: 1,
    value: "50",
    suffix: "%",
    label: "Tiết kiệm chi phí",
    icon: <FaCoins />,
  },
  {
    id: 2,
    value: "99.9",
    suffix: "%",
    label: "Cam kết Uptime",
    icon: <FaServer />,
  },
  {
    id: 3,
    value: "1000",
    suffix: "+",
    label: "Doanh nghiệp tin dùng",
    icon: <FaBuilding />,
  },
  {
    id: 4,
    value: "24/7",
    suffix: "",
    label: "Hỗ trợ kỹ thuật",
    icon: <FaHeadset />,
  },
];

const PBXPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutPBX />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={PBX_FEATURES}
        title="Tính năng vượt trội của Realtime PBX"
        description="Mọi công cụ bạn cần để xây dựng hệ thống CSKH chuyên nghiệp đều có sẵn."
      />

      {/* --- 3. STATS SECTION  --- */}
      <StatsSection
        data={PBX_STATS}
        title="Con số khẳng định chất lượng"
        description="Hệ thống Realtime PBX đã được kiểm chứng bởi hàng ngàn doanh nghiệp với hiệu suất vận hành vượt trội."
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

export default PBXPage;
