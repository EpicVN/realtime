"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import AboutCollection
import AboutCollection from "@/components/Solutions/About/AboutCollection";

import {
  FaRobot,
  FaFileInvoiceDollar,
  FaTimeline,
  FaHeadset,
  FaUserShield,
  FaChartPie,
  FaMoneyBillTrendUp,
  FaStopwatch,
  FaUsersSlash,
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (COLLECTION) ---
const COLLECTION_FEATURES: FeatureItem[] = [
  {
    icon: <FaRobot />,
    title: "Autocall Nhắc phí",
    desc: "Hệ thống tự động gọi nhắc hạn thanh toán cho hàng nghìn khách hàng cùng lúc với giọng đọc AI tự nhiên (Text-to-Speech).",
  },
  {
    icon: <FaTimeline />,
    title: "Kịch bản đa bước",
    desc: "Thiết lập quy trình tự động: Gửi SMS trước 3 ngày -> Gọi Autocall đúng hạn -> Nhân viên gọi trực tiếp nếu quá hạn.",
  },
  {
    icon: <FaHeadset />,
    title: "Predictive Dialing",
    desc: "Tự động quay số cho nhân viên thu hồi nợ (Collectors). Chỉ kết nối khi khách nghe máy, loại bỏ số ảo, số bận.",
  },
  {
    icon: <FaFileInvoiceDollar />,
    title: "Quản lý Hồ sơ nợ",
    desc: "Tích hợp CRM hiển thị chi tiết: Số tiền nợ, hạn thanh toán, lịch sử hứa trả, ghi chú của nhân viên trước đó.",
  },
  {
    icon: <FaUserShield />,
    title: "Giám sát & Ghi âm",
    desc: "Ghi âm 100% cuộc gọi để làm bằng chứng pháp lý và kiểm soát thái độ nhân viên, đảm bảo tuân thủ quy định.",
  },
  {
    icon: <FaChartPie />,
    title: "Báo cáo Tỷ lệ",
    desc: "Theo dõi realtime tỷ lệ hứa trả (PTP), tỷ lệ thực trả (Paid), và năng suất làm việc của từng Collector.",
  },
];

// --- DỮ LIỆU STATS (COLLECTION) ---
const COLLECTION_STATS: StatItem[] = [
  {
    id: 1,
    value: "300",
    suffix: "%",
    label: "Tăng năng suất gọi",
    icon: <FaStopwatch />,
  },
  {
    id: 2,
    value: "40",
    suffix: "%",
    label: "Tăng tỷ lệ thu hồi",
    icon: <FaMoneyBillTrendUp />,
  },
  {
    id: 3,
    value: "60",
    suffix: "%",
    label: "Giảm chi phí nhân sự",
    icon: <FaUsersSlash />,
  },
  {
    id: 4,
    value: "100",
    suffix: "%",
    label: "Kiểm soát tuân thủ",
    icon: <FaUserShield />,
  },
];

const CollectionPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutCollection />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={COLLECTION_FEATURES}
        title="Quy trình thu hồi nợ 4.0"
        description="Chuyển đổi từ mô hình thủ công sang tự động hóa hoàn toàn với Realtime Solutions."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={COLLECTION_STATS}
        title="Hiệu quả đầu tư (ROI)"
        description="Giải pháp đã được ứng dụng thành công tại nhiều Công ty Tài chính và Ngân hàng lớn."
      />

      {/* --- 4. SẢN PHẨM LIÊN QUAN (Cross-sell) --- */}
      {/* Bạn có thể thêm một section giới thiệu các sản phẩm cấu thành giải pháp này: Autodialer + CX + Brandname */}

      {/* --- 5. PRICING SECTION --- */}
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

export default CollectionPage;
