// components/Admin/DynamicAdminSidebar.tsx
"use client";

import dynamic from "next/dynamic";

// 1. Thêm biến permissions vào đây
type UserProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null; 
  permissions?: string[]; // <-- BỔ SUNG DÒNG NÀY
};

const AdminSidebar = dynamic(() => import("./AdminSidebar"), {
  ssr: false,
  loading: () => (
    <div className="w-72 bg-slate-950 min-h-screen border-r border-gray-800 hidden md:block" />
  ),
});

export default function DynamicAdminSidebar({ user }: { user: UserProps }) {
  // Vì truyền nguyên cục `session.user` từ layout xuống, nó đã chứa sẵn permissions rồi
  return <AdminSidebar user={user} />; 
}