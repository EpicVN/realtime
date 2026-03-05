// app/admin/contacts/page.tsx
import { prisma } from "@/lib/prisma";
import { FaFileExcel } from "react-icons/fa";
import Pagination from "@/components/Helper/Pagination";
import ContactFilters from "@/components/Admin/ContactFilters";
import ContactStatus from "@/components/Admin/ContactStatus";
import DeleteContactButton from "@/components/Admin/DeleteContactButton";
import ContactMessage from "@/components/Admin/ContactMessage";
import Link from "next/link";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";
import { Prisma } from "@prisma/client";

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
    status?: string;
    from?: string;
    to?: string;
  }>;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const user = session.user as { role?: string; permissions?: string[] };
  const role = user.role;
  const permissions = user.permissions || [];

  const canViewContacts =
    role === "SUPER_ADMIN" ||
    hasPermission(permissions, PERMISSIONS.VIEW_LEADS);

  if (!canViewContacts) {
    redirect("/admin/dashboard");
  }

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 6;
  const skip = (currentPage - 1) * pageSize;

  const query = params.query || "";
  const status = params.status || "ALL";
  const fromDate = params.from || "";
  const toDate = params.to || "";

  const whereCondition: Prisma.ContactWhereInput = {};

  if (query) {
    whereCondition.OR = [
      { name: { contains: query, mode: Prisma.QueryMode.insensitive } },
      { phone: { contains: query, mode: Prisma.QueryMode.insensitive } },
      { email: { contains: query, mode: Prisma.QueryMode.insensitive } },
    ];
  }

  if (status !== "ALL") {
    whereCondition.status = status;
  }

  if (fromDate || toDate) {
    whereCondition.createdAt = {};
    if (fromDate) whereCondition.createdAt.gte = new Date(fromDate);
    if (toDate) whereCondition.createdAt.lte = new Date(toDate);
  }

  const [contacts, totalCount] = await Promise.all([
    prisma.contact.findMany({
      where: whereCondition,
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: skip,
    }),
    prisma.contact.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  const excelQuery = new URLSearchParams();
  if (query) excelQuery.set("query", query);
  if (status !== "ALL") excelQuery.set("status", status);
  if (fromDate) excelQuery.set("from", fromDate);
  if (toDate) excelQuery.set("to", toDate);

  return (
    // Đổi h-[calc...] thành flex-1 và min-h để không bị lỗi chiều cao trên Mobile
    <div className="flex flex-col gap-4 flex-1 h-full min-h-[70vh]">
      {/* --- HEADER KHU VỰC --- */}
      <div className="flex flex-row justify-between items-center gap-4 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Quản lý Liên hệ
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Tổng số: <strong className="text-blue-600">{totalCount}</strong>
            </span>
          </div>
        </div>

        <Link
          href={`/api/admin/export-contacts?${excelQuery.toString()}`}
          target="_blank"
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium shadow-sm whitespace-nowrap transition-colors"
        >
          <FaFileExcel /> <span className="hidden sm:inline">Xuất Excel</span>
        </Link>
      </div>

      {/* --- BỘ LỌC (Sếp nhớ check cả responsive bên trong component này nhé) --- */}
      <ContactFilters />

      {/* --- TABLE WRAPPER --- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col flex-1 overflow-hidden">
        {/* Lớp bọc này cho phép cuộn ngang (overflow-x-auto) trên Mobile */}
        <div className="flex-1 overflow-x-auto overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {/* THÊM min-w-[900px] ĐỂ ÉP BẢNG KHÔNG BỊ VỠ CHỮ TRÊN ĐIỆN THOẠI */}
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 table-fixed min-w-225">
            <thead className="bg-gray-50 dark:bg-gray-700 uppercase font-bold text-xs text-gray-500 dark:text-gray-200 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 py-3 w-35">Ngày gửi</th>
                <th className="px-4 py-3 w-40">Họ tên</th>
                <th className="px-4 py-3 w-30">SĐT</th>
                <th className="px-4 py-3 w-40 hidden md:table-cell">Email</th>
                <th className="px-4 py-3 w-35">Nhu cầu</th>
                <th className="px-4 py-3 min-w-37.5">Lời nhắn</th>
                <th className="px-4 py-3 w-32 text-center">Trạng thái</th>
                <th className="px-4 py-3 w-16 text-center">Xóa</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {contacts.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-20 text-center text-gray-400"
                  >
                    Chưa có dữ liệu.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr
                    key={contact.id}
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                  >
                    <td className="px-4 py-3 whitespace-nowrap text-xs font-mono">
                      {new Date(contact.createdAt).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>

                    <td
                      className="px-4 py-3 font-semibold text-gray-900 dark:text-white truncate"
                      title={contact.name}
                    >
                      {contact.name}
                    </td>

                    <td className="px-4 py-3 text-blue-600 font-mono text-xs">
                      {contact.phone || "-"}
                    </td>

                    <td className="px-4 py-3 hidden md:table-cell">
                      <div
                        className="truncate max-w-45"
                        title={contact.email || ""}
                      >
                        {contact.email}
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className="inline-block truncate max-w-30 px-2 py-0.5 rounded text-[11px] font-bold bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 border border-blue-200 dark:border-blue-800"
                        title={contact.interest || "Tư vấn chung"}
                      >
                        {contact.interest || "Tư vấn chung"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <ContactMessage message={contact.message} />
                    </td>

                    <td className="px-4 py-3 text-center">
                      <ContactStatus
                        id={contact.id}
                        currentStatus={contact.status || "PENDING"}
                      />
                    </td>

                    <td className="px-4 py-3 text-center">
                      <DeleteContactButton id={contact.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* --- FOOTER PHÂN TRANG --- */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          <span className="text-xs text-gray-400 hidden sm:inline">
            Hiển thị {contacts.length}/{totalCount}
          </span>
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
