"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import Component AboutSME
import AboutSME from "@/components/Solutions/About/AboutSME";

import {
  FaPlug,
  FaChartArea,
  FaUserShield,
  FaHeadset,
  FaNetworkWired,
  FaFileInvoiceDollar
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (SME) ---
const SME_FEATURES: FeatureItem[] = [
  {
    icon: <FaPlug />,
    title: "Open API & Webhook",
    desc: "Cung cấp tài liệu API đầy đủ để đội ngũ IT doanh nghiệp tự đấu nối tổng đài vào hệ thống nội bộ (CRM, ERP, HRM) dễ dàng.",
  },
  {
    icon: <FaChartArea />,
    title: "Báo cáo Quản trị",
    desc: "Hệ thống báo cáo chi tiết đến từng phút gọi, tỷ lệ nhỡ, thời gian đàm thoại trung bình... xuất file Excel định kỳ gửi sếp.",
  },
  {
    icon: <FaUserShield />,
    title: "Phân quyền Chặt chẽ",
    desc: "Thiết lập quyền hạn chi tiết: Nhân viên chỉ xem data của mình, Trưởng nhóm xem toàn team, Giám đốc xem toàn công ty.",
  },
  {
    icon: <FaNetworkWired />,
    title: "Định tuyến Thông minh",
    desc: "Tự động chuyển khách hàng cũ gặp đúng nhân viên chăm sóc cũ (Last Agent Routing) để tăng trải nghiệm cá nhân hóa.",
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: "Quản lý Hạn mức Cước",
    desc: "Cấp quota cước gọi cho từng nhân viên/phòng ban. Khi hết hạn mức, hệ thống tự động chặn gọi ra để kiểm soát ngân sách.",
  },
  {
    icon: <FaHeadset />,
    title: "Giám sát Chất lượng",
    desc: "Công cụ cho phép QA/QC nghe file ghi âm, chấm điểm cuộc gọi và note lại các lỗi sai để đào tạo nhân viên.",
  },
];

// --- DỮ LIỆU STATS (SME) ---
const SME_STATS: StatItem[] = [
  {
    id: 1,
    value: "30",
    suffix: "%",
    label: "Tiết kiệm chi phí viễn thông",
    icon: <FaFileInvoiceDollar />,
  },
  {
    id: 2,
    value: "50",
    suffix: "%",
    label: "Tăng năng suất nhân viên",
    icon: <FaChartArea />,
  },
  {
    id: 3,
    value: "100",
    suffix: "%",
    label: "Kiểm soát dữ liệu",
    icon: <FaUserShield />,
  },
  {
    id: 4,
    value: "99.9",
    suffix: "%",
    label: "Cam kết Uptime",
    icon: <FaNetworkWired />,
  },
];

const SMEPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutSME />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={SME_FEATURES}
        title="Nền tảng Communication cho SME"
        description="Giải pháp giúp doanh nghiệp SME chuyên nghiệp hóa quy trình vận hành và kiểm soát chặt chẽ đội ngũ Telesales/CSKH."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={SME_STATS}
        title="Đồng hành cùng sự phát triển"
        description="Hơn 1000+ doanh nghiệp SME tại Việt Nam đang sử dụng hệ thống Realtime PBX để tối ưu vận hành."
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

export default SMEPage;