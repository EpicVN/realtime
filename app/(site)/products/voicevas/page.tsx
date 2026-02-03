"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import component AboutVAS vừa tạo
import AboutVAS from "@/components/Products/About/AboutVAS";

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

// --- DỮ LIỆU FEATURES (VOICE VAS) ---
const VAS_FEATURES: FeatureItem[] = [
  {
    icon: <FaIdCard />,
    title: "Định danh thương hiệu",
    desc: "Tên doanh nghiệp hiển thị trang trọng trên màn hình điện thoại khách hàng thay vì số lạ, tạo dựng niềm tin tuyệt đối.",
  },
  {
    icon: <FaSimCard />,
    title: "Mobile SIP Trunk",
    desc: "Tận dụng sóng di động của nhà mạng (Viettel/Vina/Mobi) để làm tổng đài, khắc phục nhược điểm phụ thuộc internet của VoIP truyền thống.",
  },
  {
    icon: <FaCommentSms />,
    title: "SMS Marketing & OTP",
    desc: "Hệ thống gửi tin nhắn số lượng lớn với tốc độ cao. Ưu tiên đường truyền riêng cho mã xác thực OTP ngân hàng/ứng dụng.",
  },
  {
    icon: <FaBullhorn />,
    title: "Zalo ZNS",
    desc: "Gửi thông báo CSKH qua Zalo với chi phí thấp hơn SMS 40%. Hỗ trợ gửi ảnh, nút bấm tương tác và logo thương hiệu.",
  },
  {
    icon: <FaCheckDouble />,
    title: "Đầu số ngắn (Shortcode)",
    desc: "Cung cấp đầu số ngắn (Ví dụ: 80xx, 60xx) cho các chiến dịch nhắn tin bình chọn, tra cứu thông tin hoặc quyên góp.",
  },
  {
    icon: <FaSignal />,
    title: "Đầu số 1900 / 1800",
    desc: "Đầu số hotline toàn quốc chuyên nghiệp. 1900 (Kinh doanh/CSKH có thu phí), 1800 (Miễn phí cước gọi cho khách hàng).",
  },
];

// --- DỮ LIỆU STATS (VOICE VAS) ---
const VAS_STATS: StatItem[] = [
  {
    id: 1,
    value: "90",
    suffix: "%",
    label: "Tỷ lệ bắt máy (Brandname)",
    icon: <FaArrowUpRightDots />,
  },
  {
    id: 2,
    value: "5",
    suffix: "",
    label: "Nhà mạng kết nối trực tiếp",
    icon: <FaTowerCell />,
  },
  {
    id: 3,
    value: "99",
    suffix: "%",
    label: "Tỷ lệ gửi tin thành công",
    icon: <FaCheckDouble />,
  },
  {
    id: 4,
    value: "3s",
    suffix: "",
    label: "Thời gian nhận OTP",
    icon: <FaCommentSms />,
  },
];

const VoiceVASPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutVAS />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={VAS_FEATURES}
        title="Hệ sinh thái Viễn thông toàn diện"
        description="Kết nối doanh nghiệp với khách hàng qua mọi điểm chạm: Cuộc gọi, Tin nhắn và Zalo."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={VAS_STATS}
        title="Hiệu quả truyền thông thực tế"
        description="Các giải pháp VAS của Realtime giúp tối ưu hóa tỷ lệ chuyển đổi và giảm chi phí Marketing."
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
