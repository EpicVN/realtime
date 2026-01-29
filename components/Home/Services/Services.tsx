import ServiceCard from "@/components/Helper/ServiceCard";
import { MdPhoneCallback } from "react-icons/md";
import { TbDeviceDesktopAnalytics, TbFileMusic, TbServer2 } from "react-icons/tb";

const Services = () => {
  return (
    <div className="py-10 h-full items-center bg-gray-100 dark:bg-gray-950 min-h-screen">
      {/* Services title section*/}
      <div>
        {/* Subtitle */}
        <h1 className="text-primary-dark dark:text-primary-light font-bold text-center">
          CÔNG CỤ MÀ BẠN CẦN
        </h1>

        {/* Title */}
        <h1 className="text-center text-3xl md:text-4xl lg:text-5xl text-primary mt-4 font-bold dark:text-white">
          Hệ Sinh Thái Giao Tiếp & Quản Trị Doanh Nghiệp Toàn Diện
        </h1>
      </div>

      {/* Service cards */}
      <div className="w-[80%] mx-auto mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <ServiceCard
            icon={<TbDeviceDesktopAnalytics />}
            title="RealtimeCX"
            description="Quản lý tập trung CRM và Tổng đài trên một nền tảng duy nhất giúp tối ưu quy trình chăm sóc khách hàng."
            shadow
          />
        </div>

        <div>
          <ServiceCard
            icon={<MdPhoneCallback />}
            title="Autodialer"
            description="Giải pháp gọi tự động số lượng lớn giúp chủ động tiếp cận khách hàng và tăng năng suất telesales."
            shadow
          />
        </div>

        <div>
          <ServiceCard
            icon={<TbFileMusic />}
            title="Text-To-Speech"
            description="Công nghệ AI chuyển đổi văn bản thành giọng nói tiếng Việt tự nhiên để tự động hóa các cuộc gọi nhắc nợ, đọc mã OTP hoặc thông báo cá nhân hóa."
            shadow
          />
        </div>

        <div>
          <ServiceCard
            icon={<TbServer2 />}
            title="RealtimePBX"
            description="Hệ thống tổng đài IP hiện đại với tính năng điều phối ACD và tương tác IVR tự động 24/7."
            shadow
          />
        </div>
      </div>
    </div>
  );
};

export default Services;
