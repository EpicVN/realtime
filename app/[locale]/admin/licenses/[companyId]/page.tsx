// app/admin/licenses/[companyId]/page.tsx
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaArrowLeft, FaFileExcel } from "react-icons/fa";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";

import DeleteLicenseButton from "@/components/Admin/Licenses/DeleteLicenseButton";
import ToggleLicenseStatus from "@/components/Admin/Licenses/ToggleLicenseStatus";

interface UserSession {
  role?: string;
  permissions?: string[];
}

export default async function CompanyKeysPage({
  params,
}: {
  params: Promise<{ companyId: string }>;
}) {
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

  // Await the params to get companyId correctly in Next.js 15
  const resolvedParams = await params;
  const companyId = resolvedParams.companyId;

  // Lấy thông tin Công ty và Toàn bộ Key của nó
  const company = await prisma.company.findUnique({
    where: { id: companyId },
    include: {
      licenses: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!company) return <div>Không tìm thấy công ty!</div>;

  return (
    <div className="flex flex-col gap-4 flex-1 h-full">
      {/* HEADER CỦA TRANG CHI TIẾT */}
      <div className="flex flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div>
          <Link
            href="/admin/licenses"
            className="text-blue-600 hover:underline flex items-center gap-1 text-sm font-medium mb-2"
          >
            <FaArrowLeft /> Quay lại danh sách
          </Link>
          <h1 className="text-xl font-bold text-gray-800">
            Chi tiết Key: <span className="text-blue-600">{company.name}</span>
          </h1>
          <p className="text-sm text-gray-500">
            Tổng số: {company.licenses.length} Key
          </p>
        </div>

        {/* Nút Xuất Excel (Sếp có thể sửa API export cũ nhận thêm companyId để lọc riêng) */}
        <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium">
          <FaFileExcel /> Xuất Excel
        </button>
      </div>

      {/* BẢNG DETAIL: 100 DÒNG KEY CỦA CÔNG TY NÀY */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-600">
            <thead className="bg-gray-50 uppercase font-bold text-xs text-gray-500 border-b">
              <tr>
                <th className="px-4 py-3 w-48">Mã License Key</th>
                <th className="px-4 py-3 w-48">Phần cứng (Hardware ID)</th>
                <th className="px-4 py-3 w-32">Ngày kích hoạt</th>
                <th className="px-4 py-3 w-24 text-center">Khóa/Mở</th>
                <th className="px-4 py-3 w-16 text-center">Xóa</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {company.licenses.map((lic) => (
                <tr key={lic.id} className="hover:bg-blue-50/50">
                  <td className="px-4 py-3">
                    <code className="px-2 py-1 bg-gray-100 text-blue-600 rounded text-xs border">
                      {lic.key}
                    </code>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs">
                    {lic.hardwareId ? (
                      <span className="text-green-600">{lic.hardwareId}</span>
                    ) : (
                      <span className="text-gray-400 italic">Chưa cắm máy</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {lic.activatedAt
                      ? new Date(lic.activatedAt).toLocaleDateString("vi-VN")
                      : "-"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {/* CÔNG TẮC QUYỀN LỰC */}
                    <ToggleLicenseStatus id={lic.id} isActive={lic.isActive} />
                  </td>
                  <td className="px-4 py-3 text-center">
                    {/* THÙNG RÁC TỬ THẦN */}
                    <DeleteLicenseButton id={lic.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
