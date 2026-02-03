"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import component AboutBPO vừa tạo
import AboutBPO from "@/components/Products/About/AboutBPO";

import {
    FaArrowsUpDownLeftRight, // Số lượng người
    FaAward, // Tai nghe
    FaChartLine, // Nhân sự chuyên nghiệp
    FaClipboardCheck, // Chất lượng
    FaGlobe, // Hiệu quả
    FaGraduationCap, // Đào tạo
    FaHandHoldingDollar, // Tiết kiệm tiền
    FaUsers,
    FaUserTie
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (BPO) ---
const BPO_FEATURES: FeatureItem[] = [
  {
    icon: <FaUserTie />,
    title: "Nhân sự chất lượng cao",
    desc: "Đội ngũ Agents được tuyển chọn kỹ lưỡng, giọng nói chuẩn vùng miền và có kinh nghiệm thực chiến trong nhiều lĩnh vực.",
  },
  {
    icon: <FaGraduationCap />,
    title: "Đào tạo bài bản",
    desc: "Quy trình training nghiệp vụ và kỹ năng mềm chuyên sâu trước khi bắt đầu dự án. Cập nhật kiến thức định kỳ hàng tuần.",
  },
  {
    icon: <FaClipboardCheck />,
    title: "Kiểm soát chất lượng (QA)",
    desc: "Đội ngũ QA nghe lại file ghi âm, chấm điểm và coaching 1-1 để đảm bảo tuân thủ kịch bản và thái độ phục vụ.",
  },
  {
    icon: <FaArrowsUpDownLeftRight />,
    title: "Linh hoạt quy mô",
    desc: "Dễ dàng tăng/giảm số lượng nhân sự (Scale up/down) theo mùa vụ hoặc chiến dịch marketing của doanh nghiệp.",
  },
  {
    icon: <FaChartLine />,
    title: "Báo cáo minh bạch",
    desc: "Cung cấp báo cáo hiệu suất (KPIs) chi tiết theo ngày/tuần/tháng: Số cuộc gọi, tỷ lệ chuyển đổi, AHT, CSAT...",
  },
  {
    icon: <FaHandHoldingDollar />,
    title: "Tối ưu chi phí",
    desc: "Không tốn chi phí tuyển dụng, đóng bảo hiểm, thuê văn phòng hay mua sắm trang thiết bị máy tính/tai nghe.",
  },
];

// --- DỮ LIỆU STATS (BPO) ---
const BPO_STATS: StatItem[] = [
  {
    id: 1,
    value: "40",
    suffix: "%",
    label: "Tiết kiệm chi phí",
    icon: <FaHandHoldingDollar />,
  },
  {
    id: 2,
    value: "200",
    suffix: "+",
    label: "Nhân sự sẵn sàng",
    icon: <FaUsers />,
  },
  {
    id: 3,
    value: "95",
    suffix: "%",
    label: "Tỷ lệ hài lòng (CSAT)",
    icon: <FaAward />,
  },
  {
    id: 4,
    value: "3",
    suffix: "",
    label: "Miền giọng (Bắc/Trung/Nam)",
    icon: <FaGlobe />,
  },
];

const BPOPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutBPO />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={BPO_FEATURES}
        title="Tại sao chọn RealtimeBPO?"
        description="Chúng tôi cung cấp giải pháp nhân sự toàn diện, giúp bạn tập trung vào cốt lõi kinh doanh."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={BPO_STATS}
        title="Năng lực vận hành"
        description="Hệ thống quy trình chuẩn quốc tế cùng đội ngũ nhân sự giàu kinh nghiệm."
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

export default BPOPage;
