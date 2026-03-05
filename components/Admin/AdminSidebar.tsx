// components/Admin/AdminSidebar.tsx
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
import { PERMISSIONS, hasPermission } from "@/lib/permissions";

type UserProps = {
  name?: string | null;
  role?: string | null;
  email?: string | null;
  permissions?: string[];
};

const MENU_GROUPS = [
  {
    label: "QUẢN LÝ CHUNG",
    items: [
      {
        name: "Tổng quan",
        href: "/admin",
        icon: <FaChartPie />,
        requiredPermission: "ALL",
      },
      {
        name: "Khách hàng",
        href: "/admin/contacts",
        icon: <FaAddressBook />,
        requiredPermission: PERMISSIONS.VIEW_LEADS,
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
        requiredPermission: PERMISSIONS.MANAGE_USERS,
      },
      {
        name: "Tin tức / Blog",
        href: "/admin/posts",
        icon: <FaNewspaper />,
        requiredPermission: PERMISSIONS.MANAGE_POSTS,
      },
      {
        name: "Cấu hình thông tin",
        href: "/admin/settings",
        icon: <FaCog />,
        requiredPermission: PERMISSIONS.MANAGE_SETTINGS,
      },
    ],
  },
];

export default function AdminSidebar({
  user,
  onMobileItemClick,
}: {
  user: UserProps;
  onMobileItemClick?: () => void;
}) {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const currentRole = user?.role || "ADMIN";
  const userPermissions = user?.permissions || [];
  const initial = user?.name ? user.name.charAt(0).toUpperCase() : "A";

  return (
    <aside
      className={`
        relative shrink-0 z-20 flex flex-col min-h-screen border-r border-gray-800 transition-all duration-300 ease-in-out
        bg-slate-950 text-slate-300
        w-72 ${isCollapsed ? "lg:w-20" : ""} 
      `}
    >
      <div className="absolute inset-0 bg-linear-to-b from-slate-900 via-slate-950 to-black opacity-80 -z-10" />

      {/* --- HEADER SIDEBAR --- */}
      <div className="h-16 lg:h-20 flex items-center justify-center border-b border-gray-800/50 bg-slate-900/50 backdrop-blur-sm px-2">
        <Link href="/admin" onClick={onMobileItemClick} className="w-full">
          <div className="transition-all duration-300 flex items-center justify-center">
            <div
              className={`scale-75 lg:scale-90 origin-center ${isCollapsed ? "lg:hidden" : "block"}`}
            >
              <Logo />
            </div>
            <div
              className={`w-10 h-10 bg-blue-600 rounded-xl items-center justify-center shadow-lg shadow-blue-500/20 ${isCollapsed ? "hidden lg:flex" : "hidden"}`}
            >
              <FaRocket className="text-white text-lg" />
            </div>
          </div>
        </Link>
      </div>

      {/* --- PHẦN RENDER MENU --- */}
      <nav className="flex-1 py-6 px-4 space-y-6 overflow-y-auto scrollbar-hide">
        {MENU_GROUPS.map((group, groupIdx) => {
          const visibleItems = group.items.filter((item) => {
            if (currentRole === "SUPER_ADMIN") return true;
            if (item.requiredPermission === "ALL") return true;
            return hasPermission(userPermissions, item.requiredPermission);
          });

          if (visibleItems.length === 0) return null;

          return (
            <div key={groupIdx}>
              <h3
                className={`text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3 px-2 transition-opacity duration-300 ${isCollapsed ? "lg:hidden" : ""}`}
              >
                {group.label}
              </h3>
              <div className="space-y-1">
                {visibleItems.map((item) => {
                  const cleanPathname =
                    pathname.replace(/^\/[a-z]{2}/, "") || "/";
                  const isActive =
                    item.href === "/admin" || item.href === "/admin"
                      ? cleanPathname === "/admin" || cleanPathname === "/admin"
                      : cleanPathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onMobileItemClick}
                      title={isCollapsed ? item.name : undefined}
                      className={`relative group flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium ${
                        isActive
                          ? "bg-linear-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/25"
                          : "hover:bg-slate-800/50 hover:text-white text-slate-400"
                      } ${isCollapsed ? "lg:justify-center" : ""}`}
                    >
                      <span
                        className={`text-lg transition-transform duration-200 ${!isActive && "group-hover:scale-110"}`}
                      >
                        {item.icon}
                      </span>
                      <span
                        className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "lg:w-0 lg:overflow-hidden lg:opacity-0" : "w-auto opacity-100"}`}
                      >
                        {item.name}
                      </span>
                      {isActive && isCollapsed && (
                        <div className="hidden lg:block absolute right-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]"></div>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div className="h-px bg-linear-to-r from-transparent via-gray-700 to-transparent my-4"></div>
        <Link
          href="/"
          target="_blank"
          onClick={onMobileItemClick}
          title={isCollapsed ? "Về trang chủ" : undefined}
          className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 font-medium group text-emerald-400 hover:bg-emerald-500/10 hover:text-emerald-300 border border-dashed border-gray-700 hover:border-emerald-500/50 ${isCollapsed ? "lg:justify-center" : ""}`}
        >
          <span className="text-lg group-hover:rotate-12 transition-transform">
            <FaHome />
          </span>
          <span
            className={`whitespace-nowrap transition-all duration-300 ${isCollapsed ? "lg:w-0 lg:overflow-hidden lg:opacity-0" : "w-auto opacity-100"}`}
          >
            Về trang chủ
          </span>
        </Link>
      </nav>

      {/* --- NÚT THU GỌN CHỈ HIỆN TRÊN DESKTOP --- */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="hidden lg:flex absolute -right-3 top-24 z-50 p-1.5 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/30 hover:bg-blue-500 hover:scale-110 transition-all border-2 border-slate-900 cursor-pointer items-center justify-center"
        title="Đóng/Mở Menu"
      >
        {isCollapsed ? (
          <FaChevronRight size={10} />
        ) : (
          <FaChevronLeft size={10} />
        )}
      </button>

      {/* --- FOOTER INFO --- */}
      <div className="p-4 border-t border-gray-800/50 bg-slate-900/30">
        <div
          className={`flex items-center gap-3 ${isCollapsed ? "lg:hidden" : ""}`}
        >
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
              {currentRole === "SUPER_ADMIN" ? "Super Admin" : "Nhân viên"}
            </span>
          </div>
        </div>

        {/* Avatar icon chỉ hiện trên Desktop khi thu gọn */}
        <div
          className={`mx-auto w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-pink-500 items-center justify-center text-sm font-bold text-white shadow-lg shadow-purple-500/20 ring-2 ring-slate-800 ${isCollapsed ? "hidden lg:flex" : "hidden"}`}
          title={user?.name || "Admin"}
        >
          {initial}
        </div>
      </div>
    </aside>
  );
}
