"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import Component AboutEducation
import AboutEducation from "@/components/Solutions/About/AboutEducation";

import {
  FaGraduationCap,
  FaSchool,
  FaBullhorn,
  FaClipboardList,
  FaMoneyCheckDollar,
  FaComments,
  FaUserGroup,
  FaHeadset
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (EDUCATION) ---
const EDUCATION_FEATURES: FeatureItem[] = [
  {
    icon: <FaClipboardList />,
    title: "CRM Quản lý Học viên",
    desc: "Lưu trữ tập trung thông tin học viên, phụ huynh, lớp học và lịch sử tư vấn. Dễ dàng tra cứu khi phụ huynh gọi đến.",
  },
  {
    icon: <FaBullhorn />,
    title: "Zalo ZNS Thông báo",
    desc: "Gửi thông báo điểm danh, kết quả học tập, thời khóa biểu trực tiếp qua Zalo cho phụ huynh với chi phí rẻ và tỷ lệ đọc cao.",
  },
  {
    icon: <FaMoneyCheckDollar />,
    title: "Nhắc Học phí Tự động",
    desc: "Thiết lập kịch bản nhắc nợ học phí khéo léo qua SMS/Call/Zalo theo lộ trình: Trước 3 ngày, đúng ngày và sau hạn đóng.",
  },
  {
    icon: <FaUserGroup />,
    title: "Chiến dịch Tuyển sinh",
    desc: "Công cụ Autocall giúp gọi hàng nghìn data lạnh trong thời gian ngắn để lọc ra những phụ huynh có nhu cầu thực sự.",
  },
  {
    icon: <FaHeadset />,
    title: "Tổng đài Tư vấn 24/7",
    desc: "Hệ thống tổng đài CSKH chuyên nghiệp, hỗ trợ giải đáp thắc mắc về khóa học, lộ trình đào tạo cho phụ huynh mọi lúc.",
  },
  {
    icon: <FaComments />,
    title: "Đa kênh Tương tác",
    desc: "Kết nối Facebook Fanpage, Zalo OA vào một giao diện. Tư vấn viên không cần chuyển tab qua lại mà vẫn chat được với khách.",
  },
];

// --- DỮ LIỆU STATS (EDUCATION) ---
const EDUCATION_STATS: StatItem[] = [
  {
    id: 1,
    value: "200",
    suffix: "%",
    label: "Tăng hiệu quả Tuyển sinh",
    icon: <FaGraduationCap />,
  },
  {
    id: 2,
    value: "95",
    suffix: "%",
    label: "Phụ huynh hài lòng",
    icon: <FaSchool />,
  },
  {
    id: 3,
    value: "100",
    suffix: "%",
    label: "Thông báo tới đích",
    icon: <FaBullhorn />,
  },
  {
    id: 4,
    value: "50",
    suffix: "%",
    label: "Tiết kiệm chi phí viễn thông",
    icon: <FaMoneyCheckDollar />,
  },
];

const EducationPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutEducation />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={EDUCATION_FEATURES}
        title="Chuyển đổi số ngành Giáo dục"
        description="Kết nối Nhà trường - Phụ huynh - Học sinh liền mạch và chuyên nghiệp."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={EDUCATION_STATS}
        title="Hiệu quả thực tế triển khai"
        description="Giải pháp được tin dùng bởi các Hệ thống Anh ngữ, Trường liên cấp và Trung tâm đào tạo nghề."
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

export default EducationPage;