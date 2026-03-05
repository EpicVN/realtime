// app/admin/layout.tsx
import { auth, signOut } from "@/auth";
import { redirect } from "next/navigation";
import AdminLayoutClient from "./AdminLayoutClient";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 1. Kiểm tra đăng nhập trên Server (Bảo mật tuyệt đối)
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  // 2. Server Action để truyền xuống nút Logout
  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/login" });
  }

  // 3. Render giao diện Client và truyền data xuống
  return (
    <AdminLayoutClient user={session.user} logoutAction={handleSignOut}>
      {children}
    </AdminLayoutClient>
  );
}
