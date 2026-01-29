import ServiceCard from "@/components/Helper/ServiceCard";
import React from "react";
// Import các icon giống thiết kế nhất
import { 
  TbBulb,           // Đơn vị tiên phong (Bóng đèn)
  TbBroadcast,      // Hạ tầng (Cột sóng)
  TbRocket,         // Triển khai nhanh (Tên lửa)
  TbShieldCheck,    // Bảo mật (Khiên)
  TbGauge,          // Tốc độ/Hỗ trợ (Đồng hồ đo)
  TbSettingsDollar  // Tối ưu chi phí (Bánh răng + Tiền) - Hoặc dùng TbCoin
} from "react-icons/tb";


const WhyChooseUs = () => {
  // Dữ liệu nội dung giống trong ảnh
  const features = [
    {
      icon: <TbBulb />,
      title: "Đơn vị tiên phong",
      description: "Chúng tôi có kinh nghiệm triển khai VoIP từ những năm VoIP mới phát triển."
    },
    {
      icon: <TbBroadcast />,
      title: "Hạ tầng viễn thông mạnh mẽ",
      description: "Chúng tôi cung cấp được số VoIP ở tất cả các tỉnh thành từ HCM, HNI, Đà Nẵng, Bình Dương..."
    },
    {
      icon: <TbRocket />,
      title: "Triển khai nhanh",
      description: "Chúng tôi có đầy đủ nhân lực để triển khai cho quý doanh nghiệp nhanh nhất (1 ngày)."
    },
    {
      icon: <TbShieldCheck />,
      title: "Cơ chế dự phòng an toàn",
      description: "Chúng tôi có hạ tầng cơ sở đầy đủ phục vụ quý doanh nghiệp, hệ thống hoạt động với cơ chế dự phòng."
    },
    {
      icon: <TbGauge />,
      title: "Hỗ trợ tức thì",
      description: "Cam kết khắc phục sự cố nhanh chóng, đảm bảo hệ thống luôn trong trạng thái ổn định nhất để phục vụ kinh doanh."
    },
    {
      icon: <TbSettingsDollar />, // Nếu lỗi icon này, bạn có thể thay bằng TbReportMoney
      title: "Tối ưu chi phí",
      description: "Giải pháp giúp doanh nghiệp cắt giảm tối đa chi phí đầu tư máy chủ vật lý ban đầu cũng như các chi phí bảo trì, quản lý hệ thống."
    }
  ];

  return (
    <section className="py-24 bg-gray-100 dark:bg-gray-900 min-h-screen h-full flex items-center justify-center">
      <div className="container mx-auto px-6">
        
        {/* --- TITLE SECTION --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-blue-600 dark:text-white mb-4">
            Tại sao chọn Realtime Solution?
          </h2>
          {/* (Optional) Thêm dòng mô tả nhỏ nếu cần */}
          {/* <p className="text-gray-500">Cam kết chất lượng hàng đầu</p> */}
        </div>

        {/* --- GRID CONTENT --- */}
        {/* Chia 2 cột (md:grid-cols-2) để giống hệt layout trong ảnh */}
        <div className="flex flex-wrap justify-center gap-8">
          {features.map((item, index) => (
            <div key={index} className="h-full w-full max-w-95 flex flex-col items-center">
              <ServiceCard
                icon={item.icon}
                title={item.title}
                description={item.description}
                shadow={true} // Để false nếu muốn card phẳng, clean giống ảnh. Để true nếu muốn nổi bật hơn.
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;