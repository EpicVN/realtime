"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import Component AboutEnterprise
import AboutEnterprise from "@/components/Solutions/About/AboutEnterprise";

import {
  FaShieldHalved,
  FaServer,
  FaCodeBranch,
  FaNetworkWired,
  FaFingerprint,
  FaClock
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (ENTERPRISE) ---
const ENTERPRISE_FEATURES: FeatureItem[] = [
  {
    icon: <FaShieldHalved />,
    title: "Bảo mật Đa lớp",
    desc: "Mã hóa luồng thoại (TLS/SRTP), kết nối qua VPN Site-to-Site hoặc đường truyền riêng (Leased Line) để đảm bảo an toàn tuyệt đối.",
  },
  {
    icon: <FaServer />,
    title: "Mô hình Cluster HA",
    desc: "Triển khai cụm máy chủ dự phòng (High Availability). Không bao giờ gián đoạn dịch vụ kể cả khi có sự cố phần cứng.",
  },
  {
    icon: <FaCodeBranch />,
    title: "Tích hợp Core System",
    desc: "Đấu nối sâu vào Core Banking, ERP (SAP, Oracle, Microsoft Dynamics) để đồng bộ dữ liệu khách hàng thời gian thực.",
  },
  {
    icon: <FaNetworkWired />,
    title: "Private Cloud / On-premise",
    desc: "Linh hoạt lựa chọn nơi đặt máy chủ: Tại Data Center chuẩn Tier 3 của Realtime hoặc ngay tại phòng server của Doanh nghiệp.",
  },
  {
    icon: <FaFingerprint />,
    title: "Voice Biometrics (Sinh trắc học)",
    desc: "Tích hợp công nghệ xác thực khách hàng bằng giọng nói (Voice ID) để tăng cường bảo mật cho các giao dịch tài chính.",
  },
  {
    icon: <FaClock />,
    title: "Hỗ trợ 24/7/365",
    desc: "Cam kết SLA phản hồi sự cố trong vòng 15 phút. Có đội ngũ kỹ thuật cao cấp (Tier 3) trực chiến riêng cho dự án.",
  },
];

// --- DỮ LIỆU STATS (ENTERPRISE) ---
const ENTERPRISE_STATS: StatItem[] = [
  {
    id: 1,
    value: "99.99",
    suffix: "%",
    label: "Cam kết Uptime (SLA)",
    icon: <FaClock />,
  },
  {
    id: 2,
    value: "Unlimited",
    suffix: "",
    label: "Số lượng cuộc gọi đồng thời",
    icon: <FaServer />,
  },
  {
    id: 3,
    value: "100",
    suffix: "%",
    label: "Dữ liệu được mã hóa",
    icon: <FaShieldHalved />,
  },
  {
    id: 4,
    value: "15",
    suffix: "phút",
    label: "Thời gian phản hồi sự cố",
    icon: <FaNetworkWired />,
  },
];

const EnterprisePage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutEnterprise />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={ENTERPRISE_FEATURES}
        title="Giải pháp Tổng đài cấp Tập đoàn"
        description="Được thiết kế để đáp ứng các tiêu chuẩn khắt khe nhất về Bảo mật, Hiệu năng và Độ ổn định."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={ENTERPRISE_STATS}
        title="Tiêu chuẩn Vận hành Quốc tế"
        description="Hệ thống Realtime Solutions hiện đang phục vụ nhiều Ngân hàng và Tập đoàn tài chính lớn tại Việt Nam."
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

export default EnterprisePage;