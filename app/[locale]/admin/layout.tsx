import { auth, signOut } from "@/auth";
import ThemeToggler from "@/components/Helper/ThemeToggler";
import LogoutButton from "@/components/Admin/LogoutButton";
import { redirect } from "next/navigation";

// Import cái Wrapper vừa tạo (Thay vì import dynamic trực tiếp ở đây)
import DynamicAdminSidebar from "@/components/Admin/DynamicAdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session) redirect("/login");

  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Sidebar Wrapper (Đã tắt SSR bên trong) */}
      <DynamicAdminSidebar user={session.user} />

      <div className="flex-1 flex flex-col">
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-8 shadow-sm z-10 relative">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            Xin chào, {session.user?.name} 👋
          </h2>

          <div className="flex items-center gap-4">
            <ThemeToggler />
            <div className="text-right hidden sm:block border-r border-gray-300 dark:border-gray-700 pr-4 mr-2">
              <p className="text-sm font-bold text-gray-800 dark:text-white">
                {session.user?.email}
              </p>
              <p className="text-xs text-blue-600 font-semibold uppercase">
                {session.user?.role}
              </p>
            </div>
            <LogoutButton logoutAction={handleSignOut} />
          </div>
        </header>

        <main className="flex-1 p-8 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
