"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import component riêng của Autodialer
import AboutAutodialer from "@/components/Products/About/AboutAutodialer";

import {
  FaRobot,
  FaCalendarDays,
  FaFileExcel,
  FaFilter,
  FaChartColumn,
  FaMicrophoneLines,
  FaBolt,
  FaUserClock,
  FaPhoneSlash,
  FaMoneyBillWave,
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (AUTODIALER) ---
const AUTO_FEATURES: FeatureItem[] = [
  {
    icon: <FaCalendarDays />,
    title: "Lên lịch chiến dịch",
    desc: "Cài đặt thời gian bắt đầu và kết thúc chiến dịch gọi. Hệ thống tự động chạy theo khung giờ vàng để tăng tỷ lệ bắt máy.",
  },
  {
    icon: <FaMicrophoneLines />,
    title: "Text-to-Speech (TTS)",
    desc: "Công nghệ AI Voice chuyển văn bản thành giọng nói tự nhiên, cho phép cá nhân hóa tên khách hàng, số tiền nợ, hoặc mã OTP.",
  },
  {
    icon: <FaFileExcel />,
    title: "Import dữ liệu dễ dàng",
    desc: "Tải lên danh sách khách hàng từ file Excel hoặc đồng bộ trực tiếp từ CRM chỉ trong vài giây.",
  },
  {
    icon: <FaChartColumn />,
    title: "Báo cáo chi tiết",
    desc: "Thống kê trạng thái cuộc gọi (nghe máy, bận, sai số), thời lượng gọi và xuất báo cáo chi tiết để đánh giá hiệu quả.",
  },
  {
    icon: <FaRobot />,
    title: "Tương tác phím bấm (DTMF)",
    desc: "Cho phép khách hàng bấm phím để tương tác (Ví dụ: Bấm phím 1 để gặp nhân viên, bấm phím 2 để nghe lại thông tin).",
  },
  {
    icon: <FaFilter />,
    title: "Lọc số thông minh",
    desc: "Tự động phát hiện số không tồn tại, số thuê bao hoặc số trong danh sách đen (Blacklist) để tiết kiệm cước phí.",
  },
];

// --- DỮ LIỆU STATS (AUTODIALER) ---
const AUTO_STATS: StatItem[] = [
  {
    id: 1,
    value: "300",
    suffix: "%",
    label: "Tăng năng suất Telesales",
    icon: <FaBolt />,
  },
  {
    id: 2,
    value: "80",
    suffix: "%",
    label: "Tiết kiệm thời gian gọi",
    icon: <FaUserClock />,
  },
  {
    id: 3,
    value: "10k",
    suffix: "+",
    label: "Cuộc gọi mỗi giờ",
    icon: <FaPhoneSlash />, // Biểu tượng đại diện cho công suất lớn
  },
  {
    id: 4,
    value: "0",
    suffix: "đ",
    label: "Phí đầu tư phần cứng",
    icon: <FaMoneyBillWave />,
  },
];

const AutodialerPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO / ABOUT SECTION --- */}
      <AboutAutodialer />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={AUTO_FEATURES}
        title="Tính năng mạnh mẽ của Autodialer"
        description="Giải phóng nhân sự khỏi công việc quay số thủ công nhàm chán. Tập trung vào việc chốt đơn."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={AUTO_STATS}
        title="Tối ưu hóa quy trình gọi ra"
        description="Với công nghệ Predictive Dialing, nhân viên của bạn chỉ dành thời gian để nói chuyện với khách hàng thực sự."
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

export default AutodialerPage;
