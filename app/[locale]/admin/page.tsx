// app/admin/page.tsx
import { prisma } from "@/lib/prisma";
import { FaAddressBook, FaUserClock, FaUsers } from "react-icons/fa";

// Cache dynamic để số liệu luôn mới
export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  // Lấy số liệu thật từ DB
  const totalContacts = await prisma.contact.count();
  const pendingContacts = await prisma.contact.count({
    where: { status: "PENDING" },
  });
  const totalUsers = await prisma.user.count();

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Tổng quan hệ thống
      </h1>

      {/* Grid thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Card 1 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-lg text-2xl">
            <FaAddressBook />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Tổng khách hàng</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalContacts}
            </h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-orange-100 text-orange-600 rounded-lg text-2xl">
            <FaUserClock />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Chờ xử lý</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {pendingContacts}
            </h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-green-100 text-green-600 rounded-lg text-2xl">
            <FaUsers />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Nhân sự hệ thống</p>
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
              {totalUsers}
            </h3>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-gray-800 p-6 rounded-xl border border-blue-100 dark:border-gray-700">
        <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2">
          Lời chào mừng!
        </h3>
        <p className="text-gray-600 dark:text-gray-300">
          Chào mừng trở lại bảng điều khiển. Hãy chọn các mục bên thanh thực đơn
          (Sidebar) để bắt đầu quản lý.
        </p>
      </div>
    </div>
  );
}
