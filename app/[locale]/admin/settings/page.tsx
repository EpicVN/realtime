// app/admin/settings/page.tsx
import { getSiteConfig } from "@/app/actions/config";
import SettingsForm from "@/components/Admin/SettingsForm";
import { redirect } from "next/navigation";
// CHUẨN NEXTAUTH v5: Import thẳng hàm auth từ file cấu hình của sếp
import { auth } from "@/auth";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";

interface UserSession {
  role?: string;
  permissions?: string[];
}

export default async function SettingsPage() {
  // 1. Lấy thông tin phiên đăng nhập siêu ngắn gọn (NextAuth v5)
  const session = await auth();

  // 2. Nếu chưa đăng nhập -> Đá ra trang login
  if (!session || !session.user) {
    redirect("/admin");
  }

  // 3. Lấy Role và Permissions
  const user = session.user as UserSession;
  const role = user.role;
  const permissions = user.permissions || [];

  // 4. Kiểm tra quyền "Cấu hình" hoặc "SUPER_ADMIN"
  const canManageSettings =
    role === "SUPER_ADMIN" ||
    hasPermission(permissions, PERMISSIONS.MANAGE_SETTINGS);

  // Nếu không có quyền -> Đá về trang Dashboard
  if (!canManageSettings) {
    redirect("/admin");
  }

  // 5. Vượt qua vòng bảo vệ -> Gọi DB lấy cấu hình
  const config = await getSiteConfig();

  return (
    <div className="max-w-5xl mx-auto">
      <SettingsForm config={config} />
    </div>
  );
}
