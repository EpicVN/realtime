// app/admin/settings/SettingsForm.tsx
"use client";

import { updateSiteConfig } from "@/app/actions/config";
import {
  FaPhone,
  FaUser,
  FaFacebook,
  FaEnvelope,
  FaLocationDot,
  FaLink,
} from "react-icons/fa6";

import { FaSave } from "react-icons/fa";

import { toast } from "sonner"; // Import thư viện toast sếp đang dùng
import { useFormStatus } from "react-dom";

interface SiteConfig {
  hotline?: string;
  salePhone?: string;
  saleName?: string;
  zaloLink?: string;
  fbLink?: string;
  email?: string;
  address?: string;
}

// Component con: Tạo hiệu ứng Loading cho nút Lưu
function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm transition-all active:scale-95 whitespace-nowrap shrink-0 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      <FaSave className={pending ? "animate-bounce" : ""} />
      {pending ? "Đang lưu..." : "Lưu cấu hình"}
    </button>
  );
}

export default function SettingsForm({ config }: { config: SiteConfig }) {
  // Hàm xử lý khi bấm submit
  const handleSave = async (formData: FormData) => {
    const result = await updateSiteConfig(formData);

    // Nếu hàm updateSiteConfig trả về { success: true }
    if (result?.success) {
      toast.success("Đã lưu cấu hình website thành công!");
    } else {
      toast.error(result?.error || "Có lỗi xảy ra khi lưu cấu hình.");
    }
  };

  return (
    <form action={handleSave} className="flex flex-col gap-8 pb-10">
      {/* --- KHỐI HEADER & NÚT LƯU --- */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Cấu hình Website
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
            Quản lý thông tin liên hệ, mạng xã hội và địa chỉ công ty hiển thị
            trên giao diện người dùng.
          </p>
        </div>

        <SubmitButton />
      </div>

      {/* --- KHỐI 1: LIÊN HỆ & KINH DOANH --- */}
      <div className="flex flex-col md:flex-row gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Hotline & Kinh doanh
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Thiết lập các số điện thoại chính để khách hàng liên hệ nhanh chóng.
          </p>
        </div>

        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Hotline chính
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaPhone />
              </div>
              <input
                type="text"
                name="hotline"
                defaultValue={config?.hotline}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 outline-none transition-all dark:text-white"
              />
            </div>
            <p className="text-xs text-gray-500 italic">
              Hiển thị ở nút gọi rung màu đỏ góc dưới màn hình và trang Liên hệ.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                SĐT Sale
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaPhone />
                </div>
                <input
                  type="text"
                  name="salePhone"
                  defaultValue={config?.salePhone}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 outline-none transition-all dark:text-white"
                />
              </div>
              <p className="text-xs text-gray-500 italic">
                Hiển thị ở nút gọi phụ.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Tên Sale (Người phụ trách)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                  <FaUser />
                </div>
                <input
                  type="text"
                  name="saleName"
                  defaultValue={config?.saleName}
                  className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 outline-none transition-all dark:text-white"
                />
              </div>
              <p className="text-xs text-gray-500 italic">
                Tên hiển thị khi hover vào nút gọi phụ.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* --- KHỐI 2: MẠNG XÃ HỘI --- */}
      <div className="flex flex-col md:flex-row gap-6 border-b border-gray-200 dark:border-gray-800 pb-8">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Mạng xã hội
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Đường dẫn tới các trang mạng xã hội của công ty.
          </p>
        </div>

        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Link Zalo
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-500">
                <FaLink />
              </div>
              <input
                type="url"
                name="zaloLink"
                defaultValue={config?.zaloLink}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Link Facebook
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-600">
                <FaFacebook />
              </div>
              <input
                type="url"
                name="fbLink"
                defaultValue={config?.fbLink}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 outline-none transition-all dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>

      {/* --- KHỐI 3: THÔNG TIN CÔNG TY --- */}
      <div className="flex flex-col md:flex-row gap-6 pb-4">
        <div className="w-full md:w-1/3">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            Thông tin công ty
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Thông tin hiển thị ở dưới cùng trang web (Footer) và trang Liên hệ.
          </p>
        </div>

        <div className="w-full md:w-2/3 bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm space-y-6">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email công ty
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
                <FaEnvelope />
              </div>
              <input
                type="email"
                name="email"
                defaultValue={config?.email}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 outline-none transition-all dark:text-white"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              Địa chỉ trụ sở
            </label>
            <div className="relative">
              <div className="absolute top-3 left-0 pl-3 flex items-start pointer-events-none text-gray-400">
                <FaLocationDot />
              </div>
              <textarea
                name="address"
                defaultValue={config?.address}
                rows={3}
                className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-900 outline-none transition-all dark:text-white resize-none"
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
