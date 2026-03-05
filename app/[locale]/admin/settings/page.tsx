// app/admin/settings/page.tsx
import { getSiteConfig } from "@/app/actions/config";
import SettingsForm from "@/components/Admin/SettingsForm";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";

interface UserSession {
  role?: string;
  permissions?: string[];
}

export default async function SettingsPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user as UserSession;
  const role = user.role;
  const permissions = user.permissions || [];

  const canManageSettings =
    role === "SUPER_ADMIN" ||
    hasPermission(permissions, PERMISSIONS.MANAGE_SETTINGS);

  if (!canManageSettings) {
    redirect("/admin/dashboard");
  }

  const config = await getSiteConfig();

  return (
    // Trả lại sự tối giản nguyên bản, chỉ thêm w-full để chống tràn Mobile
    <div className="max-w-5xl mx-auto w-full">
      <SettingsForm config={config} />
    </div>
  );
}
