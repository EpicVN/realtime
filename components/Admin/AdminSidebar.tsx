"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaAddressBook,
  FaChartPie,
  FaChevronLeft,
  FaChevronRight,
  FaCog,
  FaHome,
  FaNewspaper,
  FaUsers,
} from "react-icons/fa";
import Logo from "../Helper/Logo";
import { FaRocket } from "react-icons/fa6";

// --- ĐỊNH NGHĨA KIỂU DỮ LIỆU USER ---
type UserProps = {
  name?: string | null;
  role?: string | null; // "SUPER_ADMIN" | "ADMIN"
  email?: string | null;
};

// ... (Giữ nguyên phần CONST MENU_GROUPS) ...
const MENU_GROUPS = [
  // ... code menu ...
  {
    label: "QUẢN LÝ CHUNG",
    items: [
      {
        name: "Tổng quan",
        href: "/admin",
        icon: <FaChartPie />,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
      {
        name: "Khách hàng",
        href: "/admin/contacts",
        icon: <FaAddressBook />,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
  {
    label: "HỆ THỐNG",
    items: [
      {
        name: "Nhân viên",
        href: "/admin/users",
        icon: <FaUsers />,
        allowedRoles: ["SUPER_ADMIN"],
      },
      {
        name: "Tin tức / Blog",
        href: "/admin/posts",
        icon: <FaNewspaper />,
        allowedRoles: ["SUPER_ADMIN", "ADMIN"],
      },
    ],
  },
];

// --- NHẬN PROPS USER TỪ LAYOUT ---
export default function AdminSidebar({ user }: { user: UserProps }) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Dùng role được truyền trực tiếp từ Server (An toàn hơn localStorage)
  // Nếu không có user, mặc định là ADMIN để ẩn các mục nhạy cảm
  const currentRole = user?.role || "ADMIN";

  // Lấy chữ cái đầu của tên để làm Avatar (Ví dụ: "Khoa" -> "K")
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <aside
      className={`
        relative shrink-0 z-20 flex flex-col min-h-screen border-r border-gray-800 transition-all duration-300 ease-in-out
        bg-slate-950 text-slate-300
        ${isCollapsed ? "w-20" : "w-72"} 
      `}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-950 to-black opacity-80 -z-10" />

      {/* Header */}
      <div className="h-20 flex items-center justify-center border-b border-gray-800/50 bg-slate-900/50 backdrop-blur-sm">
        <Link href="/admin">
          <div className="transition-all duration-300 flex items-center justify-center">
            {!isCollapsed ? (
              <div className="scale-90 origin-center">
                <Logo />
              </div>
            ) : (
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <FaRocket className="text-white text-lg" />
              </div>
            )}
          </div>
        </Link>
      </div>

      {/* Sửa lại phần filter menu dùng currentRole mới */}
      <nav className="flex-1 py-6 px-4 space-y-6 overflow-y-auto scrollbar-hide">
        {MENU_GROUPS.map((group, groupIdx) => {
          const visibleItems = group.items.filter(
            (item) => item.allowedRoles.includes(currentRole), // <--- Dùng biến currentRole
          );
          if (visibleItems.length === 0) return null;

          return (
            // ... (Code render menu giữ nguyên) ...
            <div key={groupIdx}>
              {!isCollapsed && (
                <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 transition-opacity duration-300">
                  {group.label}
                </h3>
              )}
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  // ... (Logic active link giữ nguyên) ...
                  const cleanPathname =
                    pathname.replace(/^\/[a-z]{2}/, "") || "/";
                  const isActive =
                    item.href === "/admin"
                      ? cleanPathname === "/admin"
                      : cleanPathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      title={isCollapsed ? item.name : undefined}
                      className={`relative group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium ${isActive ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25" : "hover:bg-slate-800/50 hover:text-white text-slate-400"} ${isCollapsed ? "justify-center" : ""}`}
                    >
                      <span
                        className={`text-lg transition-transform duration-200 ${!isActive && "group-hover:scale-110"}`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}
                      >
                        {item.name}
                      </span>
                      {isActive && isCollapsed && (
                        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* ... (Phần link về trang chủ, nút toggle giữ nguyên) ... */}
        <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent my-4"></div>
        <Link
          href="/"
          target="_blank"
          title={isCollapsed ? "Về trang chủ" : undefined}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium group text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 border border-dashed border-gray-700 hover:border-emerald-500/50 ${isCollapsed ? "justify-center" : ""}`}
        >
          <span className="text-lg group-hover:rotate-12 transition-transform">
            <FaHome />
          </span>
          <span
            className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 overflow-hidden opacity-0" : "w-auto opacity-100"}`}
          >
            Về trang chủ
          </span>
        </Link>
      </nav>

      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-24 z-50 p-1.5 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-110 transition-all border-2 border-slate-900 cursor-pointer"
        title="Đóng/Mở Menu"
      >
        {isCollapsed ? (
          <FaChevronRight size={10} />
        ) : (
          <FaChevronLeft size={10} />
        )}
      </button>

      {/* --- FOOTER HIỂN THỊ INFO --- */}
      <div className="p-4 border-t border-gray-800/50 bg-slate-900/30">
        {!isCollapsed ? (
          <div className="flex items-center gap-3">
            {/* Avatar chữ cái đầu */}
            <div className="w-9 h-9 shrink-0 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/20 ring-2 ring-slate-800">
              {initial}
            </div>

            <div className="flex flex-col overflow-hidden">
              <span
                className="text-xs font-bold text-white truncate"
                title={user?.name || "Admin"}
              >
                {user?.name || "Realtime Admin"}
              </span>
              <span className="text-[10px] text-gray-500 uppercase font-semibold tracking-wider truncate">
                {user?.role === "SUPER_ADMIN" ? "Super Admin" : "Nhân viên"}
              </span>
            </div>

            <FaCog className="ml-auto text-gray-500 hover:text-white cursor-pointer transition-colors" />
          </div>
        ) : (
          <div
            className="w-9 h-9 mx-auto rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/20 ring-2 ring-slate-800"
            title={user?.name || "Admin"}
          >
            {initial}
          </div>
        )}
      </div>
    </aside>
  );
}
