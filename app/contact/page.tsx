"use client";

import {
  FaPaperPlane,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaPen,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import { useRouter } from "next/navigation";

const ContactPage = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // ... (Logic gửi API lên server của bạn ở đây) ...

    // 3. Sau khi gửi thành công -> Chuyển hướng
    router.push("/thank-you");
  };

  return (
    <div className="pt-32 min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* --- PHẦN 1: HEADER & FORM --- */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* CỘT TRÁI: Text giới thiệu */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 dark:text-white mb-6 leading-tight">
              Sẵn sàng bứt phá cùng <br />
              <span className="text-blue-600">Realtime Ecosystem?</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn thiết
              lập giải pháp tối ưu nhất. Hãy để lại thông tin, chúng tôi sẽ liên
              hệ tư vấn giải pháp tổng đài và CRM phù hợp nhất cho doanh nghiệp
              của bạn.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
              <h3 className="font-bold text-blue-800 dark:text-blue-300 mb-2">
                Bạn cần hỗ trợ gấp?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Gọi ngay hotline kỹ thuật 24/7 của chúng tôi:{" "}
                <span className="font-bold text-red-500 text-lg ml-1">
                  0933 119 056
                </span>
              </p>
            </div>
          </motion.div>

          {/* CỘT PHẢI: FORM LIÊN HỆ (Đã style lại đẹp hơn) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              Gửi yêu cầu tư vấn
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Họ tên */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="Họ và tên của bạn..."
                />
              </div>

              {/* Số điện thoại & Email (2 cột) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="Số điện thoại..."
                  />
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                    placeholder="Địa chỉ Email..."
                  />
                </div>
              </div>

              {/* Số lượng user */}
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaPen className="text-gray-400" />
                </div>
                <input
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
                  placeholder="Số lượng user dự kiến (VD: 10 user)..."
                />
              </div>

              {/* Nút gửi */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group"
              >
                <span>Gửi thông tin ngay</span>
                <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </button>

              <p className="text-xs text-center text-gray-500 mt-4">
                Chúng tôi cam kết bảo mật thông tin của bạn 100%.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* --- PHẦN 2: THÔNG TIN LIÊN HỆ CHI TIẾT (Tái sử dụng Component cũ) --- */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <ContactInfo />
      </div>
    </div>
  );
};

export default ContactPage;
