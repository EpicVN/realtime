// app/admin/posts/page.tsx
import Pagination from "@/components/Helper/Pagination"; // Tái sử dụng Pagination
import Link from "next/link";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";

// Dữ liệu giả lập (Sau này thay bằng DB)
const MOCK_POSTS = [
  {
    id: 1,
    title:
      "Hướng dẫn tích hợp tổng đài VoIP vào CRM để tối ưu quy trình CSKH cho doanh nghiệp vừa và nhỏ",
    category: "Giải pháp",
    author: "Admin Realtime",
    status: "PUBLISHED",
    createdAt: "20/01/2026",
    views: 1250,
  },
  {
    id: 2,
    title: "Thông báo bảo trì hệ thống định kỳ tháng 2",
    category: "Thông báo",
    author: "Super Admin",
    status: "DRAFT",
    createdAt: "01/02/2026",
    views: 0,
  },
  {
    id: 3,
    title: "Realtime AutoDialer - Giải pháp telesales x10 hiệu suất",
    category: "Sản phẩm",
    author: "Sale Manager",
    status: "PUBLISHED",
    createdAt: "15/01/2026",
    views: 3400,
  },
  // Thêm dữ liệu mẫu để test scroll
  {
    id: 4,
    title: "Tổng quan thị trường BPO 2025",
    category: "Tin tức",
    author: "Admin",
    status: "PUBLISHED",
    createdAt: "10/01/2026",
    views: 500,
  },
  {
    id: 5,
    title: "Cách cấu hình SIP Trunk trên Asterisk",
    category: "Kỹ thuật",
    author: "Dev Team",
    status: "DRAFT",
    createdAt: "05/01/2026",
    views: 100,
  },
  {
    id: 6,
    title: "Lợi ích của việc thuê ngoài nhân sự (Outsourcing)",
    category: "BPO",
    author: "HR",
    status: "PUBLISHED",
    createdAt: "02/01/2026",
    views: 890,
  },
];

export default function PostsPage() {
  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-9rem)]">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quản lý Tin tức
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tổng: <strong className="text-blue-600">6</strong> bài viết
          </p>
        </div>

        <Link
          href="/admin/posts/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap w-fit"
        >
          <FaPlus /> Viết bài mới
        </Link>
      </div>

      {/* --- STATS MINI (Thu nhỏ lại để đỡ chiếm chỗ) --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold">
            Tổng bài
          </span>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            6
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
          <span className="text-[10px] text-green-500 uppercase font-bold">
            Đã đăng
          </span>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            4
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
          <span className="text-[10px] text-orange-500 uppercase font-bold">
            Nháp
          </span>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            2
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
          <span className="text-[10px] text-blue-500 uppercase font-bold">
            Lượt xem
          </span>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            6.1k
          </span>
        </div>
      </div>

      {/* --- TABLE WRAPPER --- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col flex-1 overflow-hidden">
        {/* SCROLL AREA */}
        <div className="flex-1 overflow-auto relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {/* QUAN TRỌNG: table-fixed */}
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 table-fixed">
            <thead className="bg-gray-50 dark:bg-gray-700 uppercase font-bold text-xs text-gray-500 dark:text-gray-200 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600">
              <tr>
                {/* Tiêu đề dài nhất -> Cho width to nhất (40% hoặc px cố định) */}
                <th className="px-6 py-4 w-100">Tiêu đề bài viết</th>
                <th className="px-6 py-4 w-30">Danh mục</th>
                <th className="px-6 py-4 w-35 hidden md:table-cell">Tác giả</th>
                <th className="px-6 py-4 w-25 text-center hidden sm:table-cell">
                  Views
                </th>
                <th className="px-6 py-4 w-32.5 text-center">Trạng thái</th>
                <th className="px-6 py-4 w-25 text-right">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {MOCK_POSTS.map((post) => (
                <tr
                  key={post.id}
                  className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                >
                  {/* Tiêu đề: TRUNCATE để cắt chữ nếu quá dài */}
                  <td className="px-6 py-4">
                    <p
                      className="font-semibold text-gray-900 dark:text-white truncate"
                      title={post.title}
                    >
                      {post.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-1 font-mono">
                      {post.createdAt}
                    </p>
                  </td>

                  {/* Danh mục */}
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 text-[11px] font-bold px-2 py-1 rounded border border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600">
                      {post.category}
                    </span>
                  </td>

                  {/* Tác giả (Ẩn trên mobile) */}
                  <td
                    className="px-6 py-4 hidden md:table-cell truncate"
                    title={post.author}
                  >
                    {post.author}
                  </td>

                  {/* Views */}
                  <td className="px-6 py-4 text-center text-gray-500 hidden sm:table-cell font-mono text-xs">
                    {post.views.toLocaleString()}
                  </td>

                  {/* Trạng thái */}
                  <td className="px-6 py-4 text-center">
                    {post.status === "PUBLISHED" ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 border border-green-200 dark:border-green-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                        Đã đăng
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-800">
                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-600"></span>
                        Nháp
                      </span>
                    )}
                  </td>

                  {/* Hành động */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-1.5 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="p-1.5 text-red-600 hover:bg-red-100 rounded transition-colors"
                        title="Xóa"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* FOOTER (Pagination Giả lập) */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-between items-center shrink-0">
          <span className="text-xs text-gray-400">Hiển thị 6/6 kết quả</span>
          {/* Truyền mock data vào Pagination để hiện UI cho đẹp */}
          <Pagination totalPages={1} />
        </div>
      </div>
    </div>
  );
}
