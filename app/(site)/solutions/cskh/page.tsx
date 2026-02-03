"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import Component AboutCSKH
import AboutCSKH from "@/components/Solutions/About/AboutCSKH";
import { FaSmile } from "react-icons/fa";

import {
  FaTicket,
  FaIdCardClip,
  FaHeadset,
  FaComments,
  FaChartLine,
  FaUsersViewfinder,
  FaClockRotateLeft,
  FaPhoneSlash,
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (CSKH) ---
const CSKH_FEATURES: FeatureItem[] = [
  {
    icon: <FaIdCardClip />,
    title: "CRM Popup 360°",
    desc: "Tự động hiển thị hồ sơ khách hàng khi có cuộc gọi đến. Nhân viên nắm bắt ngay lịch sử tương tác và đơn hàng gần nhất.",
  },
  {
    icon: <FaTicket />,
    title: "Quản lý Ticket (Phiếu ghi)",
    desc: "Mọi vấn đề của khách hàng được tạo thành Ticket để theo dõi tiến độ xử lý, chuyển ban phòng ban và đảm bảo không bị bỏ sót.",
  },
  {
    icon: <FaComments />,
    title: "Chat Đa kênh",
    desc: "Gom tin nhắn từ Fanpage, Zalo OA, Livechat Website về một màn hình làm việc duy nhất. Hỗ trợ Chatbot trả lời tự động.",
  },
  {
    icon: <FaPhoneSlash />,
    title: "Quản lý cuộc gọi nhỡ",
    desc: "Hệ thống tự động tạo Ticket hoặc gửi thông báo cho Supervisor khi có cuộc gọi nhỡ (Missed Call) để gọi lại ngay lập tức.",
  },
  {
    icon: <FaUsersViewfinder />,
    title: "Giám sát Chất lượng",
    desc: "Supervisor có thể nghe lén, nghe xen hoặc nhắc bài (Whisper) cho nhân viên trong cuộc gọi theo thời gian thực.",
  },
  {
    icon: <FaChartLine />,
    title: "Báo cáo SLA",
    desc: "Đo lường cam kết chất lượng dịch vụ (SLA): Thời gian phản hồi trung bình, tỷ lệ giải quyết khiếu nại lần đầu (FCR).",
  },
];

// --- DỮ LIỆU STATS (CSKH) ---
const CSKH_STATS: StatItem[] = [
  {
    id: 1,
    value: "95",
    suffix: "%",
    label: "Sự hài lòng (CSAT)",
    icon: <FaSmile />,
  },
  {
    id: 2,
    value: "80",
    suffix: "%",
    label: "Giải quyết cuộc gọi đầu (FCR)",
    icon: <FaHeadset />,
  },
  {
    id: 3,
    value: "<10",
    suffix: "s",
    label: "Thời gian chờ trung bình",
    icon: <FaClockRotateLeft />,
  },
  {
    id: 4,
    value: "24/7",
    suffix: "",
    label: "Hoạt động liên tục",
    icon: <FaHeadset />,
  },
];

const CSKHPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutCSKH />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={CSKH_FEATURES}
        title="Công cụ CSKH mạnh mẽ nhất"
        description="Biến trung tâm liên lạc thành lợi thế cạnh tranh, giữ chân khách hàng trung thành."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={CSKH_STATS}
        title="Nâng tầm trải nghiệm khách hàng"
        description="RealtimeCX giúp doanh nghiệp xây dựng quy trình CSKH chuyên nghiệp chuẩn quốc tế."
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

export default CSKHPage;
