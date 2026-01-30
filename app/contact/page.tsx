"use client";

import {
  FaPaperPlane,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaPen,
  FaCommentDots,
} from "react-icons/fa6";
import { motion } from "framer-motion";
import ContactInfo from "@/components/Common/ContactInfo/ContactInfo";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { submitContactForm } from "@/app/actions/submit-contact";
import { toast } from "sonner"; // Import Toast

// Component nút Submit
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <span>{pending ? "Đang gửi..." : "Gửi thông tin ngay"}</span>
      {!pending && (
        <FaPaperPlane className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      )}
    </button>
  );
}

const ContactPage = () => {
  const router = useRouter();

  // Kết nối Server Action
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    message: "",
  });

  // --- LOGIC TOAST & REDIRECT ---
  useEffect(() => {
    if (state.message) {
      if (state.success) {
        // 1. Hiện thông báo thành công
        toast.success(state.message, {
          duration: 5000, // Tự tắt sau 5s
        });

        // 2. Chuyển hướng sang trang cảm ơn
        router.push("/thank-you");
      } else {
        // 3. Nếu lỗi thì hiện Toast đỏ báo lỗi
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <div className="pt-28 min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      {/* Container chính: items-center để căn giữa dọc */}
      <div className="container mx-auto px-6 py-10 grow flex items-center">
        {/* Grid: items-center để cân đối 2 bên */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          {/* --- CỘT TRÁI: Text giới thiệu --- */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h1 className="text-4xl lg:text-5xl font-bold text-blue-900 dark:text-white leading-tight">
              Sẵn sàng bứt phá cùng <br />
              <span className="text-blue-600">Realtime Ecosystem?</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg">
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng hỗ trợ bạn thiết
              lập giải pháp tối ưu nhất. Hãy để lại thông tin để nhận tư vấn
              ngay.
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

          {/* --- CỘT PHẢI: FORM LIÊN HỆ (Đã thu gọn) --- */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            // Thêm w-full max-w-lg mx-auto để form gọn gàng
            className="w-full max-w-lg mx-auto bg-white dark:bg-gray-900 p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800"
          >
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-5 text-center">
              Gửi yêu cầu tư vấn
            </h2>

            <form action={formAction} className="space-y-4">
              {/* Họ tên */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  name="name"
                  required
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
                  placeholder="Họ và tên..."
                />
              </div>

              {/* SĐT & Email (Chia đôi cột ở màn hình lớn) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaPhone className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    name="phone"
                    type="tel"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
                    placeholder="Số điện thoại..."
                  />
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    name="email"
                    required
                    type="email"
                    className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
                    placeholder="Email..."
                  />
                </div>
              </div>

              {/* Số lượng user (Interest) */}
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaPen className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  name="interest"
                  type="text"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white text-sm"
                  placeholder="Số lượng user (VD: 10)..."
                />
              </div>

              {/* Message (Ghi chú) */}
              <div className="relative group">
                <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                  <FaCommentDots className="text-gray-400 group-focus-within:text-blue-500 transition-colors mt-0.5" />
                </div>
                <textarea
                  name="message"
                  rows={3}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white resize-none text-sm"
                  placeholder="Nội dung cần tư vấn..."
                ></textarea>
              </div>

              <div className="pt-2">
                <SubmitButton />
              </div>

              <p className="text-xs text-center text-gray-400">
                Cam kết bảo mật thông tin 100%.
              </p>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Footer Contact Info */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
        <ContactInfo />
      </div>
    </div>
  );
};

export default ContactPage;
