"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import Component AboutRealEstate
import AboutRealEstate from "@/components/Solutions/About/AboutRealEstate";

import {
  FaMobileScreen,
  FaBuilding,
  FaUserSecret,
  FaEye,
  FaPhoneFlip,
  FaHandshake,
  FaChartColumn,
  FaSimCard,
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (REAL ESTATE) ---
const REALESTATE_FEATURES: FeatureItem[] = [
  {
    icon: <FaMobileScreen />,
    title: "App Mobile cho Sales",
    desc: "Biến smartphone thành tổng đài. Sale có thể gọi điện, xem lịch sử và note ghi chú khách hàng mọi lúc mọi nơi, không cần ngồi văn phòng.",
  },
  {
    icon: <FaUserSecret />,
    title: "Che số khách hàng (Data Masking)",
    desc: "Tính năng bảo mật cao cấp: Nhân viên chỉ bấm nút gọi trên phần mềm mà không nhìn thấy số điện thoại thật của khách, tránh mất data.",
  },
  {
    icon: <FaPhoneFlip />,
    title: "Click-to-Call & Auto Dial",
    desc: "Tự động quay số liên tục từ danh sách có sẵn. Giúp Sale thực hiện 200-300 cuộc gọi/ngày mà không mỏi tay bấm số.",
  },
  {
    icon: <FaSimCard />,
    title: "Mobile SIP Trunk",
    desc: "Tích hợp Sim số di động vào tổng đài để gọi ra. Tận dụng các gói cước gọi miễn phí nội mạng của nhà mạng để tiết kiệm chi phí.",
  },
  {
    icon: <FaEye />,
    title: "Giám sát Realtime",
    desc: "Quản lý sàn có thể xem ngay lập tức: Ai đang gọi, ai đang nghỉ, ai đang chốt khách. Nghe xen cuộc gọi để hỗ trợ chốt deal.",
  },
  {
    icon: <FaChartColumn />,
    title: "Báo cáo Hiệu quả Marketing",
    desc: "Thống kê cuộc gọi đến từ nguồn nào (Website, Facebook, Banner treo...) để tối ưu ngân sách quảng cáo.",
  },
];

// --- DỮ LIỆU STATS (REAL ESTATE) ---
const REALESTATE_STATS: StatItem[] = [
  {
    id: 1,
    value: "300",
    suffix: "+",
    label: "Cuộc gọi/Sale/Ngày",
    icon: <FaPhoneFlip />,
  },
  {
    id: 2,
    value: "90",
    suffix: "%",
    label: "Tỷ lệ bắt máy (Brandname)",
    icon: <FaBuilding />,
  },
  {
    id: 3,
    value: "100",
    suffix: "%",
    label: "Bảo mật Data khách hàng",
    icon: <FaUserSecret />,
  },
  {
    id: 4,
    value: "2X",
    suffix: "",
    label: "Tăng tỷ lệ chốt Deal",
    icon: <FaHandshake />,
  },
];

const RealEstatePage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutRealEstate />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={REALESTATE_FEATURES}
        title="Công cụ 'Săn khách' cho Sàn BĐS"
        description="Giải pháp tổng đài chuyên dụng giúp tối ưu hiệu suất Telesales và bảo mật tuyệt đối nguồn dữ liệu."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={REALESTATE_STATS}
        title="Gia tăng doanh số Bất động sản"
        description="Hàng trăm sàn giao dịch BĐS lớn tại Việt Nam đang sử dụng hệ thống của Realtime Solutions."
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

export default RealEstatePage;
