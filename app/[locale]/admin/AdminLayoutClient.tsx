// app/admin/AdminLayoutClient.tsx
"use client";

import { useState } from "react";
import ThemeToggler from "@/components/Helper/ThemeToggler";
import LogoutButton from "@/components/Admin/LogoutButton";
import DynamicAdminSidebar from "@/components/Admin/DynamicAdminSidebar";
import { FaBars, FaTimes } from "react-icons/fa";

type UserProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
  permissions?: string[];
};

type AdminLayoutClientProps = {
  user: UserProps;
  children: React.ReactNode;
  logoutAction: () => Promise<void>;
};

export default function AdminLayoutClient({
  user,
  children,
  logoutAction,
}: AdminLayoutClientProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-950 overflow-hidden relative">
      {/* 1. OVERLAY */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* 2. SIDEBAR CONTAINER */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* TRUYỀN HÀM ĐÓNG MENU VÀO ĐÂY */}
        <DynamicAdminSidebar
          user={user}
          onMobileItemClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Nút X đóng menu - Chỉnh lại vị trí cho khỏi đè */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-5 right-4 text-slate-400 hover:text-white lg:hidden z-50 p-2 bg-slate-800/50 rounded-lg backdrop-blur-sm"
        >
          <FaTimes size={20} />
        </button>
      </div>

      {/* 3. MAIN CONTENT (Giữ nguyên như cũ) */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <header className="h-16 shrink-0 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 sm:px-8 shadow-sm z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
              <FaBars size={20} />
            </button>
            <h2 className="text-sm sm:text-lg font-semibold text-gray-700 dark:text-gray-200 truncate pr-2">
              <span className="hidden sm:inline">
                Xin chào, {user?.name} 👋
              </span>
              <span className="sm:hidden">
                Hi, {user?.name?.split(" ")[0]} 👋
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <ThemeToggler />
            <div className="text-right hidden lg:block border-r border-gray-300 dark:border-gray-700 pr-4 mr-2">
              <p className="text-sm font-bold text-gray-800 dark:text-white truncate max-w-37.5">
                {user?.email}
              </p>
              <p className="text-xs text-blue-600 font-semibold uppercase">
                {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Nhân viên"}
              </p>
            </div>
            <LogoutButton logoutAction={logoutAction} />
          </div>
        </header>

        <main
          id="admin-main-scroll-area"
          className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto overflow-x-hidden relative"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
