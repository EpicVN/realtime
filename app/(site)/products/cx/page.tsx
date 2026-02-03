"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
import AboutCX from "@/components/Products/About/AboutCX";

import {
  FaUserGroup,
  FaTicketSimple,
  FaHeadset,
  FaBullhorn,
  FaChartLine,
  FaArrowsRotate,
  FaUsers,
  FaClock,
  FaHandshake,
  FaDatabase,
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURE CHO CX ---
const CX_FEATURES: FeatureItem[] = [
  {
    icon: <FaUserGroup />,
    title: "Customer 360",
    desc: "Hiển thị Popup thông tin khách hàng ngay khi có cuộc gọi đến. Xem lịch sử tương tác, ghi chú và đơn hàng cũ.",
  },
  {
    icon: <FaTicketSimple />,
    title: "Quản lý Ticket",
    desc: "Hệ thống tiếp nhận, phân loại và điều phối phiếu hỗ trợ tự động. Đảm bảo đúng người, đúng việc, đúng SLA.",
  },
  {
    icon: <FaArrowsRotate />,
    title: "Omnichannel",
    desc: "Tích hợp đa kênh: Tổng đài, Zalo OA, Facebook Messenger, Email và Livechat vào một giao diện duy nhất.",
  },
  {
    icon: <FaChartLine />,
    title: "Báo cáo Telesales",
    desc: "Thống kê chi tiết năng suất nhân viên: Số cuộc gọi, thời lượng thoại, tỷ lệ chốt đơn và file ghi âm.",
  },
  {
    icon: <FaBullhorn />,
    title: "Chiến dịch Marketing",
    desc: "Tạo chiến dịch gọi tự động (Auto Call) hoặc gửi tin nhắn hàng loạt (SMS/Zalo) để chăm sóc khách hàng cũ.",
  },
  {
    icon: <FaHeadset />,
    title: "Click-to-Call",
    desc: "Thực hiện cuộc gọi đi ngay trên trình duyệt web chỉ với 1 cú click chuột, không cần bấm số thủ công.",
  },
];

// --- DỮ LIỆU STATS CHO CX ---
const CX_STATS: StatItem[] = [
  {
    id: 1,
    value: "35",
    suffix: "%",
    label: "Tăng tỷ lệ chốt Sale",
    icon: <FaHandshake />,
  },
  {
    id: 2,
    value: "50",
    suffix: "%",
    label: "Giảm thời gian xử lý",
    icon: <FaClock />,
  },
  {
    id: 3,
    value: "100",
    suffix: "%",
    label: "Dữ liệu tập trung",
    icon: <FaDatabase />,
  },
  {
    id: 4,
    value: "5000",
    suffix: "+",
    label: "User đang sử dụng",
    icon: <FaUsers />,
  },
];

const CXPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO / ABOUT SECTION (Dùng AboutCX) --- */}
      <AboutCX />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={CX_FEATURES}
        title="Tính năng toàn diện của RealtimeCX"
        description="Biến dữ liệu khách hàng thành tài sản giá trị nhất của doanh nghiệp."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={CX_STATS}
        title="Hiệu quả đo lường được"
        description="RealtimeCX giúp doanh nghiệp tối ưu hóa quy trình sales và CSKH ngay từ ngày đầu tiên."
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

export default CXPage;
