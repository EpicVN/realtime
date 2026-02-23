// app/admin/layout.tsx
import { auth, signOut } from "@/auth";
import AdminSidebar from "@/components/Admin/AdminSidebar";
import ThemeToggler from "@/components/Helper/ThemeToggler"; // <--- 1. IMPORT NÓ VÀO ĐÂY
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar cố định bên trái */}
      <AdminSidebar />

      {/* Khu vực nội dung bên phải */}
      <div className="flex-1 flex flex-col">
        {/* Header Admin (Topbar) */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Xin chào, {session.user?.name} 👋
          </h2>

          <div className="flex items-center gap-4">
            {/* 2. ĐẶT NÚT THEME TOGGLER Ở ĐÂY */}
            <ThemeToggler />

            {/* Thông tin User */}
            <div className="text-right hidden sm:block border-r border-gray-300 dark:border-gray-700 pr-4 mr-2">
              <p className="text-sm font-bold text-gray-800 dark:text-white">
                {session.user?.email}
              </p>
              <p className="text-xs text-blue-600 font-semibold uppercase">
                {session.user?.role}
              </p>
            </div>

            {/* Form Logout */}
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/login" });
              }}
            >
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200">
                Đăng xuất
              </button>
            </form>
          </div>
        </header>

        {/* Nội dung thay đổi */}
        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
