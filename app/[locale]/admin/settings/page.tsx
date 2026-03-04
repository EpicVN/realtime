// app/admin/settings/page.tsx
import { getSiteConfig } from "@/app/actions/config";
import SettingsForm from "@/components/Admin/SettingsForm";

export default async function SettingsPage() {
  // Lấy dữ liệu 1 lần từ DB
  const config = await getSiteConfig();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Ném dữ liệu vào form hiển thị */}
      <SettingsForm config={config} />
    </div>
  );
}
