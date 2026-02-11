"use client";

import { submitContactForm } from "@/app/actions/submit-contact";
import { motion } from "framer-motion";
import { useActionState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { toast } from "sonner";
import {
  FaCommentDots,
  FaEnvelope,
  FaPaperPlane,
  FaPhone,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { useRouter } from "@/i18n/navigation"; // 1. Link chuẩn
import { useTranslations } from "next-intl"; // 2. Import hook

// Component nút Submit
function SubmitButton() {
  const { pending } = useFormStatus();
  const t = useTranslations("Home.ContactForm"); // Namespace cho nút

  return (
    <button
      type="submit"
      disabled={pending}
      className="
        group relative inline-flex items-center justify-center gap-2 
        bg-blue-600 hover:bg-blue-700 text-white 
        dark:bg-white dark:text-blue-900 dark:hover:bg-gray-100
        font-bold py-3.5 px-12 rounded-lg 
        shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-1
        transition-all duration-300 w-full md:w-auto disabled:opacity-70 disabled:cursor-not-allowed
      "
    >
      <span>{pending ? t("btn_sending") : t("btn_submit")}</span>
      {!pending && (
        <FaPaperPlane className="text-sm transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
      )}
    </button>
  );
}

const ContactForm = () => {
  const t = useTranslations("Home.ContactForm"); // 3. Namespace chính
  const [state, formAction] = useActionState(submitContactForm, {
    success: false,
    message: "",
  });

  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state.success) {
        toast.success(state.message, {
          duration: 5000,
        });
        router.push("/thank-you");
      } else {
        toast.error(state.message);
      }
    }
  }, [state, router]);

  return (
    <section className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 max-w-2xl">
        {/* --- Header Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 space-y-4"
        >
          <p className="text-gray-500 font-bold uppercase tracking-wider text-xs md:text-sm">
            {t("badge")} {/* THÔNG TIN LIÊN HỆ */}
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-blue-600 dark:text-white leading-tight">
            {t.rich("title", {
              br: () => <br className="hidden md:block" />,
            })}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed mt-4">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* --- Form Section --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-gray-900 w-full"
        >
          <form action={formAction} className="space-y-4 md:space-y-5">
            {/* Input: Họ tên */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUser className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                name="name"
                type="text"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base"
                placeholder={t("ph_name")} // Nhập họ tên...
              />
            </div>

            {/* Input: Số điện thoại */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaPhone className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                name="phone"
                type="tel"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base"
                placeholder={t("ph_phone")} // Nhập số điện thoại...
              />
            </div>

            {/* Input: Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                name="email"
                type="email"
                required
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base"
                placeholder={t("ph_email")} // Nhập email...
              />
            </div>

            {/* Input: Số lượng */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaUsers className="text-gray-400 group-focus-within:text-blue-500 transition-colors text-lg" />
              </div>
              <input
                name="interest"
                type="text"
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base"
                placeholder={t("ph_users")} // Số lượng user dự kiến...
              />
            </div>

            {/* Input: Tin nhắn */}
            <div className="relative group">
              <div className="absolute top-3.5 left-0 pl-4 flex items-start pointer-events-none">
                <FaCommentDots className="text-gray-400 group-focus-within:text-blue-500 transition-colors text-lg" />
              </div>
              <textarea
                name="message"
                rows={3}
                className="w-full pl-11 pr-4 py-3.5 bg-gray-50 dark:bg-gray-800 border border-transparent focus:border-blue-200 dark:focus:border-blue-900 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all placeholder-gray-400 text-sm md:text-base resize-none"
                placeholder={t("ph_message")} // Nội dung cần tư vấn...
              ></textarea>
            </div>

            <div className="text-center pt-6">
              <SubmitButton />
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
