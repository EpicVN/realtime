// app/admin/users/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import UsersClient from "./UsersClient";

interface UserSession {
  role: string;
  permissions?: string[];
}

export default async function UsersPage() {
  // ==========================================
  // 1. LOGIC CHECK QUYỀN (SERVER-SIDE)
  // ==========================================
  const session = await auth();

  if (!session || !session.user) {
    redirect("/admin");
  }

  const user = session.user as UserSession;
  const role = user.role;
  const permissions = user.permissions || [];

  // Lấy tên quyền từ cấu hình (Nếu sếp dùng tên khác thì sửa lại nhé)
  const USERS_PERM = PERMISSIONS.MANAGE_USERS || "MANAGE_USERS";

  const canManageUsers =
    role === "SUPER_ADMIN" || hasPermission(permissions, USERS_PERM);

  if (!canManageUsers) {
    redirect("/admin");
  }

  // ==========================================
  // 2. GỌI DATABASE (Việc Nặng)
  // ==========================================
  // Lấy dữ liệu ngay trên Server (Cực nhanh, không cần API /api/users)
  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      permissions: true,
      createdAt: true,
    },
  });

  // Xử lý lại ngày tháng để truyền xuống Client không bị lỗi
  const formattedUsers = users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));

  // ==========================================
  // 3. TRUYỀN DATA XUỐNG GIAO DIỆN (Việc Nhẹ)
  // ==========================================
  return (
    <div className="max-w-7xl mx-auto">
      <UsersClient initialUsers={formattedUsers} />
    </div>
  );
}
