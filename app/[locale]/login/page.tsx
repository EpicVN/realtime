"use client"; // <--- QUAN TRỌNG: Chuyển thành Client Component

import Logo from "@/components/Helper/Logo";
import Link from "next/link";
import { useState } from "react";
import { FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";
import { checkUserRole, authenticate } from "./action"; // Import từ file vừa tạo
import { toast } from "sonner";

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    setLoading(true);
    setError(null);

    // 1. Kiểm tra User & Lấy Role trước
    const check = await checkUserRole(formData);

    if (check.error) {
      setError(check.error);
      setLoading(false);
      return;
    }

    if (check.success && check.role) {
      // 2. LƯU ROLE VÀO LOCALSTORAGE (Mấu chốt vấn đề)
      localStorage.setItem("userRole", check.role);

      // 3. Gọi hàm đăng nhập thật để chuyển trang
      const loginError = await authenticate(formData);

      // Nếu authenticate trả về lỗi (hiếm khi xảy ra vì đã check ở bước 1)
      if (loginError) {
        setError(loginError);
        setLoading(false);
      }
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-white dark:bg-[#020817]">
      {/* --- CỘT TRÁI (Branding) --- */}
      <div className="hidden md:flex w-1/2 bg-primary dark:bg-slate-900 items-center justify-center p-12 relative overflow-hidden">
        <div className="relative z-10 text-center">
          <div className="mb-6 scale-150 flex justify-center">
            <Logo type="white" />
          </div>
        </div>
      </div>

      {/* --- CỘT PHẢI (Form) --- */}
      <div className="flex-1 flex flex-col justify-center items-center p-8 relative">
        <Link
          href="/"
          className="absolute top-8 right-8 flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 transition-colors font-medium"
        >
          <FaArrowLeft className="text-xs" /> Về trang chủ
        </Link>

        <div className="w-full max-w-sm space-y-8">
          <div className="md:hidden flex justify-center mb-8">
            <Logo />
          </div>

          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Đăng nhập
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
              Nhập email và mật khẩu quản trị viên.
            </p>
          </div>

          {/* HIỂN THỊ LỖI */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm flex items-center gap-2 border border-red-100 dark:border-red-800 animate-pulse">
              <FaExclamationTriangle />
              <span>{error}</span>
            </div>
          )}

          <form action={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="admin@realtime.vn"
                className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Mật khẩu
                </label>
              </div>
              <input
                name="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            <button
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors shadow-sm shadow-blue-600/20 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 hover:cursor-pointer"
            >
              {loading && (
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              )}
              {loading ? "Đang xử lý..." : "Đăng nhập"}
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 mt-6">
            © 2026 Realtime Solutions.
          </p>
        </div>
      </div>
    </div>
  );
}
