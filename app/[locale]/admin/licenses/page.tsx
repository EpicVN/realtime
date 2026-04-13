// app/admin/licenses/page.tsx
import { auth } from "@/auth";
import CreateLicenseModal from "@/components/Admin/Licenses/CreateLicenseModal";
import CompanySearch from "@/components/Admin/Licenses/CompanySearch";
import Pagination from "@/components/Helper/Pagination";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { FaBuilding, FaEye } from "react-icons/fa";

export default async function CompaniesLicensePage({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    query?: string;
  }>;
}) {
  const session = await auth();
  const user = session?.user as { role?: string };
  if (user?.role !== "SUPER_ADMIN") redirect("/admin/dashboard");

  const params = await searchParams;
  const currentPage = Number(params.page) || 1;
  const pageSize = 10;
  const skip = (currentPage - 1) * pageSize;
  const query = params.query || "";

  const whereCondition: Prisma.CompanyWhereInput = {};
  if (query) {
    whereCondition.name = { contains: query, mode: "insensitive" };
  }

  // 1. Lấy danh sách Công ty VÀ đếm số lượng Key của từng công ty
  const [companies, totalCount] = await Promise.all([
    prisma.company.findMany({
      where: whereCondition,
      include: {
        _count: {
          select: { licenses: true }, // Đếm tổng số Key
        },
        // Lấy thêm thông tin Key để tính số lượng đã kích hoạt
        licenses: {
          select: { hardwareId: true, isActive: true },
        },
      },
      orderBy: { createdAt: "desc" },
      take: pageSize,
      skip: skip,
    }),
    prisma.company.count({ where: whereCondition }),
  ]);

  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className="flex flex-col gap-4 flex-1 h-full min-h-[70vh]">
      {/* HEADER */}
      <div className="flex flex-row justify-between items-center gap-4 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <FaBuilding className="text-blue-600" /> Quản lý Khách Hàng
            (License)
          </h1>
          <span className="text-xs sm:text-sm text-gray-500 mt-1 block">
            Tổng số Doanh nghiệp:{" "}
            <strong className="text-blue-600">{totalCount}</strong>
          </span>
        </div>

        {/* Vẫn giữ form đẻ sỉ Key của sếp ở đây */}
        <CreateLicenseModal />
      </div>

      {/* TẠM THỜI ẨN BỘ LỌC ĐỂ UI GỌN GÀNG (Sếp có thể thêm thanh Search sau) */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3 items-center justify-between">
        <CompanySearch />

        {/* Khu vực sếp có thể nhét thêm các nút lọc trạng thái sau này nếu cần */}
        {/* <div className="text-sm text-gray-500 dark:text-gray-400 italic hidden sm:block">
          Gõ để tìm kiếm nhanh, không cần nhấn Enter.
        </div> */}
      </div>

      {/* BẢNG MASTER: DANH SÁCH CÔNG TY */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col flex-1 overflow-hidden">
        <div className="flex-1 overflow-x-auto relative">
          <table className="w-full text-left text-sm text-gray-600 table-fixed min-w-200">
            <thead className="bg-gray-50 uppercase font-bold text-xs text-gray-500 border-b">
              <tr>
                <th className="px-4 py-3 w-48">Doanh Nghiệp</th>
                <th className="px-4 py-3 w-32 text-center">Tổng số Key</th>
                <th className="px-4 py-3 w-32 text-center text-green-600">
                  Đã kích hoạt máy
                </th>
                <th className="px-4 py-3 w-32 text-center text-orange-500">
                  Chưa kích hoạt
                </th>
                <th className="px-4 py-3 w-32 text-center">Chi tiết Key</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {companies.map((company) => {
                const totalKeys = company._count.licenses;
                // Đếm số Key đã có người dùng (có hardwareId)
                const activatedKeys = company.licenses.filter(
                  (l) => l.hardwareId !== null,
                ).length;
                const unusedKeys = totalKeys - activatedKeys;

                return (
                  <tr
                    key={company.id}
                    className="hover:bg-blue-50/50 transition-colors"
                  >
                    <td className="px-4 py-3 font-semibold text-gray-900 truncate">
                      {company.name}
                    </td>
                    <td className="px-4 py-3 text-center font-bold text-blue-600 text-lg">
                      {totalKeys}
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-green-600">
                      {activatedKeys}
                    </td>
                    <td className="px-4 py-3 text-center font-medium text-orange-500">
                      {unusedKeys}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {/* NÚT CHUYỂN TRANG SANG DETAIL VIEW */}
                      <Link
                        href={`/admin/licenses/${company.id}`}
                        className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 hover:bg-blue-600 hover:text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <FaEye /> Xem chi tiết
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="border-t p-3 flex justify-between items-center">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
