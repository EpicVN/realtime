"use client";

import ContactForm from "@/components/Common/ContactForm/ContactForm";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import FAQ from "@/components/Common/FAQ/FAQ";
import FeatureGrid, { FeatureItem } from "@/components/Common/FeatureGrid";
import Pricing from "@/components/Common/Pricing/Pricing";
import StatsSection, { StatItem } from "@/components/Common/StatsSection";
// Import component AboutCLOUD vừa tạo
import AboutCLOUD from "@/components/Products/About/AboutCLOUD";

import {
  FaBolt,
  FaShieldHalved,
  FaServer,
  FaNetworkWired,
  FaCloudArrowUp,
  FaGaugeHigh,
  FaBuildingShield,
  FaClock,
} from "react-icons/fa6";

// --- DỮ LIỆU FEATURES (CLOUD) ---
const CLOUD_FEATURES: FeatureItem[] = [
  {
    icon: <FaBolt />,
    title: "Tốc độ siêu tốc",
    desc: "Hệ thống sử dụng 100% ổ cứng NVMe Enterprise và CPU đời mới, đảm bảo xử lý mọi tác vụ nặng một cách mượt mà nhất.",
  },
  {
    icon: <FaShieldHalved />,
    title: "Bảo mật đa lớp",
    desc: "Tường lửa (Firewall) cứng kết hợp mềm giúp ngăn chặn các cuộc tấn công DDoS và xâm nhập trái phép hiệu quả.",
  },
  {
    icon: <FaNetworkWired />,
    title: "Network 10Gbps",
    desc: "Cổng mạng Uplink lên tới 10Gbps trong nước và quốc tế, đảm bảo đường truyền luôn ổn định, không nghẽn mạng giờ cao điểm.",
  },
  {
    icon: <FaCloudArrowUp />,
    title: "Backup tự động",
    desc: "Dữ liệu được sao lưu định kỳ hàng tuần (Weekly) và lưu trữ tại 2 nơi khác nhau để đảm bảo an toàn tuyệt đối.",
  },
  {
    icon: <FaServer />,
    title: "Ảo hóa KVM/VMware",
    desc: "Công nghệ ảo hóa tiên tiến giúp tài nguyên (RAM, CPU) được cấp phát thực (Dedicated), không bị chia sẻ với người dùng khác.",
  },
  {
    icon: <FaGaugeHigh />,
    title: "Nâng cấp tức thì",
    desc: "Dễ dàng nâng cấp cấu hình (Scale Up) CPU, RAM, Disk chỉ trong vài phút mà không làm gián đoạn dịch vụ lâu.",
  },
];

// --- DỮ LIỆU STATS (CLOUD) ---
const CLOUD_STATS: StatItem[] = [
  {
    id: 1,
    value: "99.99",
    suffix: "%",
    label: "Cam kết Uptime (SLA)",
    icon: <FaClock />,
  },
  {
    id: 2,
    value: "Tier 3",
    suffix: "",
    label: "Tiêu chuẩn Data Center",
    icon: <FaBuildingShield />,
  },
  {
    id: 3,
    value: "30",
    suffix: "s",
    label: "Thời gian khởi tạo",
    icon: <FaBolt />,
  },
  {
    id: 4,
    value: "24/7",
    suffix: "",
    label: "Kỹ thuật trực tại DC",
    icon: <FaServer />,
  },
];

const CloudPage = () => {
  return (
    <div className="bg-white dark:bg-gray-950 pt-20 overflow-hidden">
      {/* --- 1. HERO SECTION --- */}
      <AboutCLOUD />

      {/* --- 2. KEY FEATURES GRID --- */}
      <FeatureGrid
        features={CLOUD_FEATURES}
        title="Hạ tầng Cloud đạt chuẩn quốc tế"
        description="Nền tảng vững chắc cho mọi ứng dụng, website và hệ thống doanh nghiệp của bạn."
      />

      {/* --- 3. STATS SECTION --- */}
      <StatsSection
        data={CLOUD_STATS}
        title="Thông số kỹ thuật ấn tượng"
        description="Hạ tầng của RealtimeCLOUD được đặt tại các Data Center lớn nhất Việt Nam (Viettel, VNPT, FPT)."
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

export default CloudPage;
