// app/admin/settings/SettingsForm.tsx
"use client";

import { updateSiteConfig } from "@/app/actions/config";
import {
  FaEnvelope,
  FaFacebook,
  FaLocationDot,
  FaPhone,
  FaUser
} from "react-icons/fa6";

import { FaSave } from "react-icons/fa";

import { useFormStatus } from "react-dom";
import { toast } from "sonner"; // Import thư viện toast sếp đang dùng

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
            Thiết lập các số điện thoại chính để khách hàng liên hệ.
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
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                >
                  <path
                    fill="#2962ff"
                    d="M15,36V6.827l-1.211-0.811C8.64,8.083,5,13.112,5,19v10c0,7.732,6.268,14,14,14h10 c4.722,0,8.883-2.348,11.417-5.931V36H15z"
                  />
                  <path
                    fill="#eee"
                    d="M29,5H19c-1.845,0-3.601,0.366-5.214,1.014C10.453,9.25,8,14.528,8,19 c0,6.771,0.936,10.735,3.712,14.607c0.216,0.301,0.357,0.653,0.376,1.022c0.043,0.835-0.129,2.365-1.634,3.742 c-0.162,0.148-0.059,0.419,0.16,0.428c0.942,0.041,2.843-0.014,4.797-0.877c0.557-0.246,1.191-0.203,1.729,0.083 C20.453,39.764,24.333,40,28,40c4.676,0,9.339-1.04,12.417-2.916C42.038,34.799,43,32.014,43,29V19C43,11.268,36.732,5,29,5z"
                  />
                  <path
                    fill="#2962ff"
                    d="M36.75,27C34.683,27,33,25.317,33,23.25s1.683-3.75,3.75-3.75s3.75,1.683,3.75,3.75 S38.817,27,36.75,27z M36.75,21c-1.24,0-2.25,1.01-2.25,2.25s1.01,2.25,2.25,2.25S39,24.49,39,23.25S37.99,21,36.75,21z"
                  />
                  <path
                    fill="#2962ff"
                    d="M31.5,27h-1c-0.276,0-0.5-0.224-0.5-0.5V18h1.5V27z"
                  />
                  <path
                    fill="#2962ff"
                    d="M27,19.75v0.519c-0.629-0.476-1.403-0.769-2.25-0.769c-2.067,0-3.75,1.683-3.75,3.75 S22.683,27,24.75,27c0.847,0,1.621-0.293,2.25-0.769V26.5c0,0.276,0.224,0.5,0.5,0.5h1v-7.25H27z M24.75,25.5 c-1.24,0-2.25-1.01-2.25-2.25S23.51,21,24.75,21S27,22.01,27,23.25S25.99,25.5,24.75,25.5z"
                  />
                  <path
                    fill="#2962ff"
                    d="M21.25,18h-8v1.5h5.321L13,26h0.026c-0.163,0.211-0.276,0.463-0.276,0.75V27h7.5 c0.276,0,0.5-0.224,0.5-0.5v-1h-5.321L21,19h-0.026c0.163-0.211,0.276-0.463,0.276-0.75V18z"
                  />
                </svg>
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
