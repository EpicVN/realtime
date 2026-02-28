"use client";

import dynamic from "next/dynamic";

// 1. Định nghĩa kiểu dữ liệu User (Copy giống bên AdminSidebar)
type UserProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null; // Đây là cái quan trọng nhất
};

const AdminSidebar = dynamic(() => import("./AdminSidebar"), {
  ssr: false,
  loading: () => (
    <div className="w-72 bg-slate-950 min-h-screen border-r border-gray-800 hidden md:block" />
  ),
});

// 2. Thay 'any' bằng 'UserProps'
export default function DynamicAdminSidebar({ user }: { user: UserProps }) {
  return <AdminSidebar user={user} />;
}