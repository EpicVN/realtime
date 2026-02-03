"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import Component AboutStartup
import AboutStartup from "@/components/Solutions/About/AboutStartup";

import {
  FaRocket,
  FaMobileScreenButton,
  FaPiggyBank,
  FaBolt,
  FaSitemap,
  FaLaptopCode
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (STARTUP) ---
const STARTUP_FEATURES: FeatureItem[] = [
  {
    icon: <FaBolt />,
    title: "Triển khai Tức thì",
    desc: "Khởi tạo hệ thống chỉ trong 15 phút. Không cần chờ đợi lắp đặt, không cần khoan đục văn phòng. Có thể sử dụng ngay lập tức.",
  },
  {
    icon: <FaMobileScreenButton />,
    title: "Work from Anywhere",
    desc: "Sử dụng Smartphone làm máy nhánh. Nhân viên có thể trực tổng đài, chăm sóc khách hàng ngay tại quán cafe hoặc khi đi gặp đối tác.",
  },
  {
    icon: <FaPiggyBank />,
    title: "Tiết kiệm 50% Cước",
    desc: "Miễn phí 100% gọi nội bộ giữa các phòng ban/chi nhánh. Cước gọi ra rẻ hơn so với cước di động thông thường.",
  },
  {
    icon: <FaSitemap />,
    title: "Lời chào IVR Chuyên nghiệp",
    desc: "Tự thiết lập kịch bản lời chào: 'Cảm ơn quý khách đã gọi đến [Tên Startup]...'. Tạo ấn tượng doanh nghiệp quy mô lớn.",
  },
  {
    icon: <FaLaptopCode />,
    title: "Tích hợp CRM Mini",
    desc: "Có sẵn tính năng lưu trữ thông tin khách hàng, ghi chú cuộc gọi và nghe lại file ghi âm cơ bản ngay trên nền tảng.",
  },
  {
    icon: <FaRocket />,
    title: "Sẵn sàng Tăng trưởng",
    desc: "Dễ dàng thêm máy nhánh, mở rộng chi nhánh hoặc tích hợp vào các phần mềm CRM cao cấp hơn khi Startup phát triển lớn mạnh.",
  },
];

// --- DỮ LIỆU STATS (STARTUP) ---
const STARTUP_STATS: StatItem[] = [
  {
    id: 1,
    value: "0",
    suffix: "đ",
    label: "Chi phí phần cứng ban đầu",
    icon: <FaPiggyBank />,
  },
  {
    id: 2,
    value: "15",
    suffix: "phút",
    label: "Thời gian triển khai",
    icon: <FaBolt />,
  },
  {
    id: 3,
    value: "100",
    suffix: "%",
    label: "Linh hoạt địa điểm",
    icon: <FaMobileScreenButton />,
  },
  {
    id: 4,
    value: "24/7",
    suffix: "",
    label: "Hỗ trợ kỹ thuật",
    icon: <FaRocket />,
  },
];

const StartupPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutStartup />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={STARTUP_FEATURES}
        title="Bệ phóng công nghệ cho Startup"
        description="Giải pháp tổng đài tinh gọn, hiệu quả và tối ưu chi phí dành riêng cho doanh nghiệp khởi nghiệp."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={STARTUP_STATS}
        title="Khởi đầu dễ dàng & Vững chắc"
        description="Đồng hành cùng sự phát triển của hơn 500+ Startup Việt trong hành trình chinh phục thị trường."
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

export default StartupPage;