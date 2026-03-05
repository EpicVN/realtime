// components/Admin/DynamicAdminSidebar.tsx
"use client";

import dynamic from "next/dynamic";

type UserProps = {
  name?: string | null;
  email?: string | null;
  image?: string | null;
  role?: string | null;
  permissions?: string[];
};

const AdminSidebar = dynamic(() => import("./AdminSidebar"), {
  ssr: false,
  loading: () => (
    <div className="w-72 bg-slate-950 min-h-screen border-r border-gray-800 hidden md:block" />
  ),
});

// THÊM onMobileItemClick VÀO PROPS
export default function DynamicAdminSidebar({ 
  user, 
  onMobileItemClick 
}: { 
  user: UserProps;
  onMobileItemClick?: () => void;
}) {
  return <AdminSidebar user={user} onMobileItemClick={onMobileItemClick} />;
}