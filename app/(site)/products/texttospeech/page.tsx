"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import component riêng của TTS
import AboutTextToSpeech from "@/components/Products/About/AboutTextToSpeech";

import {
    FaBolt,
    FaCloudArrowDown,
    FaCode,
    FaDownload,
    FaLanguage,
    FaMapLocationDot,
    FaMicrophone,
    FaSliders,
    FaWaveSquare
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (TTS) ---
const TTS_FEATURES: FeatureItem[] = [
  {
    icon: <FaWaveSquare />,
    title: "Chất giọng tự nhiên",
    desc: "Sử dụng mô hình Deep Learning để tái tạo ngữ điệu, nhịp thở và cảm xúc chân thực như phát thanh viên chuyên nghiệp.",
  },
  {
    icon: <FaMapLocationDot />,
    title: "Đa vùng miền (Regional)",
    desc: "Cung cấp đầy đủ giọng Bắc (Hà Nội), Trung (Huế/Đà Nẵng), Nam (Sài Gòn) giúp tiếp cận khách hàng địa phương hiệu quả.",
  },
  {
    icon: <FaSliders />,
    title: "Tùy chỉnh linh hoạt",
    desc: "Cho phép điều chỉnh Tốc độ (Speed), Cao độ (Pitch) và Âm lượng (Volume) để phù hợp với từng ngữ cảnh nội dung.",
  },
  {
    icon: <FaBolt />,
    title: "Streaming Low Latency",
    desc: "Phản hồi cực nhanh <200ms, đáp ứng hoàn hảo cho các ứng dụng hội thoại thời gian thực (Voicebot, Virtual Assistant).",
  },
  {
    icon: <FaCode />,
    title: "Tích hợp API đơn giản",
    desc: "Tài liệu API đầy đủ, hỗ trợ RESTful API và WebSocket. Dễ dàng tích hợp với Python, Node.js, PHP, Java...",
  },
  {
    icon: <FaDownload />,
    title: "Xuất file đa định dạng",
    desc: "Hỗ trợ tải xuống file âm thanh chất lượng cao với các định dạng phổ biến: MP3, WAV, OGG.",
  },
];

// --- DỮ LIỆU STATS (TTS) ---
const TTS_STATS: StatItem[] = [
  {
    id: 1,
    value: "4.5",
    suffix: "/5",
    label: "Điểm chất lượng MOS", // Mean Opinion Score
    icon: <FaMicrophone />,
  },
  {
    id: 2,
    value: "10",
    suffix: "+",
    label: "Giọng đọc khả dụng",
    icon: <FaLanguage />,
  },
  {
    id: 3,
    value: "200",
    suffix: "ms",
    label: "Độ trễ phản hồi",
    icon: <FaBolt />,
  },
  {
    id: 4,
    value: "99",
    suffix: "%",
    label: "Tiết kiệm phí thu âm",
    icon: <FaCloudArrowDown />,
  },
];

const TextToSpeechPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO / ABOUT SECTION --- */}
      <AboutTextToSpeech />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={TTS_FEATURES}
        title="Công nghệ lõi Text-to-Speech"
        description="Giải pháp chuyển đổi văn bản thành giọng nói tiếng Việt tốt nhất thị trường."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={TTS_STATS}
        title="Hiệu năng vượt trội"
        description="Sẵn sàng đáp ứng hàng triệu request mỗi ngày với chất lượng ổn định nhất."
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

export default TextToSpeechPage;
