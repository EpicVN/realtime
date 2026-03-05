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
    // THAY ĐỔI 1: Bọc w-full và flex-col để tối ưu khoảng cách (gap)
    <div className="flex flex-col gap-4 sm:gap-6 w-full">
      <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
        Tổng quan hệ thống
      </h1>

      {/* THAY ĐỔI 2: Grid thống kê - Thêm khoảng cách nhỏ lại trên Mobile (gap-4) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Card 1 */}
        {/* THAY ĐỔI 3: Giảm padding trên mobile (p-4) và to hơn trên PC (sm:p-6) */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <div className="p-3 sm:p-4 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xl sm:text-2xl shrink-0">
            <FaAddressBook />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
              Tổng khách hàng
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              {totalContacts}
            </h3>
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <div className="p-3 sm:p-4 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg text-xl sm:text-2xl shrink-0">
            <FaUserClock />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
              Chờ xử lý
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              {pendingContacts}
            </h3>
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex items-center gap-4">
          <div className="p-3 sm:p-4 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg text-xl sm:text-2xl shrink-0">
            <FaUsers />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm truncate">
              Nhân sự hệ thống
            </p>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
              {totalUsers}
            </h3>
          </div>
        </div>
      </div>

      {/* Lời chào mừng */}
      {/* THAY ĐỔI 4: Giảm padding và căn chỉnh size chữ cho Mobile */}
      <div className="bg-blue-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl border border-blue-100 dark:border-gray-700">
        <h3 className="font-bold text-blue-800 dark:text-blue-400 mb-2 text-sm sm:text-base">
          Lời chào mừng!
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed">
          Chào mừng trở lại bảng điều khiển. Hãy chọn các mục bên thanh menu để
          bắt đầu quản lý.
        </p>
      </div>
    </div>
  );
}
