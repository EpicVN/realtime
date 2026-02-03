"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import Component AboutRecruitment
import AboutRecruitment from "@/components/Solutions/About/AboutRecruitment";

import {
  FaUserClock,
  FaPhoneVolume,
  FaFileAudio,
  FaListCheck,
  FaBullhorn,
  FaChartPie,
  FaUserCheck,
  FaCalendarCheck,
  FaSackDollar,
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (RECRUITMENT) ---
const RECRUITMENT_FEATURES: FeatureItem[] = [
  {
    icon: <FaPhoneVolume />,
    title: "Click-to-Call",
    desc: "Gọi điện cho ứng viên ngay trên trình duyệt (Webphone) chỉ với 1 cú click chuột. Không cần bấm số thủ công trên điện thoại bàn.",
  },
  {
    icon: <FaListCheck />,
    title: "Quản lý Hồ sơ (Mini ATS)",
    desc: "Lưu trữ thông tin ứng viên, trạng thái hồ sơ (Sơ tuyển, Phỏng vấn, Offer) và lịch sử tương tác cuộc gọi ngay trên hệ thống.",
  },
  {
    icon: <FaFileAudio />,
    title: "Ghi âm Phỏng vấn",
    desc: "Tự động ghi âm cuộc gọi phỏng vấn sơ tuyển qua điện thoại. Giúp HR Manager nghe lại để đánh giá chất lượng ứng viên khách quan hơn.",
  },
  {
    icon: <FaCalendarCheck />,
    title: "Automation Reminder",
    desc: "Tự động gửi tin nhắn nhắc lịch phỏng vấn qua SMS/Zalo. Giảm thiểu tỷ lệ ứng viên quên lịch hoặc vắng mặt không lý do.",
  },
  {
    icon: <FaBullhorn />,
    title: "Chiến dịch Gọi hàng loạt",
    desc: "Tải lên danh sách hàng nghìn số điện thoại để hệ thống tự động gọi thông báo tuyển dụng mass recruiting hiệu quả.",
  },
  {
    icon: <FaChartPie />,
    title: "Báo cáo Hiệu suất HR",
    desc: "Thống kê chi tiết số cuộc gọi, thời lượng thoại và tỷ lệ chuyển đổi ứng viên của từng chuyên viên tuyển dụng.",
  },
];

// --- DỮ LIỆU STATS (RECRUITMENT) ---
const RECRUITMENT_STATS: StatItem[] = [
  {
    id: 1,
    value: "50",
    suffix: "%",
    label: "Giảm thời gian tuyển dụng",
    icon: <FaUserClock />,
  },
  {
    id: 2,
    value: "90",
    suffix: "%",
    label: "Tỷ lệ bắt máy (Brandname)",
    icon: <FaPhoneVolume />,
  },
  {
    id: 3,
    value: "30",
    suffix: "%",
    label: "Giảm chi phí per Hire",
    icon: <FaSackDollar />,
  },
  {
    id: 4,
    value: "100",
    suffix: "%",
    label: "Minh bạch thông tin",
    icon: <FaUserCheck />,
  },
];

const RecruitmentPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutRecruitment />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={RECRUITMENT_FEATURES}
        title="Công nghệ hóa quy trình Tuyển dụng"
        description="Giải phóng HR khỏi các tác vụ thủ công, tập trung vào việc tìm kiếm và thu hút nhân tài."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={RECRUITMENT_STATS}
        title="Tối ưu hóa nguồn lực Tuyển dụng"
        description="Nâng cao hình ảnh chuyên nghiệp của Doanh nghiệp trong mắt ứng viên ngay từ cuộc gọi đầu tiên."
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

export default RecruitmentPage;
