import Pagination from "@/components/Helper/Pagination";
import DeletePostButton from "@/components/Posts/DeletePostButton"; // Đảm bảo đường dẫn đúng
import PostStatusToggle from "@/components/Posts/PostStatusToggle";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";

// Số lượng bài viết trên mỗi trang
const ITEMS_PER_PAGE = 10;

// --- 1. Hàm tính toán thống kê ---
async function getPostStats() {
  const [total, published, drafts, totalViews] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { published: true } }),
    prisma.post.count({ where: { published: false } }),
    prisma.post.aggregate({
      _sum: { views: true },
    }),
  ]);

  return {
    total,
    published,
    drafts,
    views: totalViews._sum.views || 0,
  };
}

// --- 2. Component Chính (Server Component) ---
// Next.js 15: searchParams là Promise, cần await
export default async function PostsPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const searchParams = await props.searchParams;

  // 1. Xác định trang hiện tại (Mặc định là 1 nếu không có param)
  const currentPage = Number(searchParams?.page) || 1;

  // 2. Tính toán vị trí cần bỏ qua (Skip)
  // Ví dụ: Trang 1 -> skip 0. Trang 2 -> skip 10.
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  // 3. Lấy dữ liệu theo trang
  const posts = await prisma.post.findMany({
    take: ITEMS_PER_PAGE, // Lấy 10 bài
    skip: skip, // Bỏ qua các bài của trang trước
    orderBy: { createdAt: "desc" },
  });

  const stats = await getPostStats();

  // 4. Tính tổng số trang
  const totalPages = Math.ceil(stats.total / ITEMS_PER_PAGE);

  // Hàm format ngày tháng
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  // Tính toán hiển thị "Hiển thị từ X đến Y"
  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, stats.total);

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-9rem)]">
      {/* --- HEADER --- */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quản lý Tin tức
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tổng: <strong className="text-blue-600">{stats.total}</strong> bài
            viết
          </p>
        </div>

        <Link
          href="/admin/posts/create"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap w-fit cursor-pointer"
        >
          <FaPlus /> Viết bài mới
        </Link>
      </div>

      {/* --- STATS MINI --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 shrink-0">
        {/* ... (Phần Stats giữ nguyên như code cũ của sếp) ... */}
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
          <span className="text-[10px] text-gray-500 uppercase font-bold">
            Tổng bài
          </span>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            {stats.total}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
          <span className="text-[10px] text-green-500 uppercase font-bold">
            Đã đăng
          </span>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            {stats.published}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
          <span className="text-[10px] text-orange-500 uppercase font-bold">
            Nháp
          </span>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            {stats.drafts}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col">
          <span className="text-[10px] text-blue-500 uppercase font-bold">
            Lượt xem
          </span>
          <span className="text-xl font-bold text-gray-800 dark:text-white">
            {stats.views.toLocaleString()}
          </span>
        </div>
      </div>

      {/* --- TABLE WRAPPER --- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col flex-1 overflow-hidden">
        {/* SCROLL AREA */}
        <div className="flex-1 overflow-auto relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 table-fixed">
            <thead className="bg-gray-50 dark:bg-gray-700 uppercase font-bold text-xs text-gray-500 dark:text-gray-200 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-4 w-[50%]">Tiêu đề bài viết</th>
                <th className="px-6 py-4 w-[15%] text-center hidden sm:table-cell">
                  Views
                </th>
                <th className="px-6 py-4 w-[15%] text-center">Trạng thái</th>
                <th className="px-6 py-4 w-[20%] text-right">Hành động</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {posts.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-gray-400">
                    Chưa có bài viết nào.
                  </td>
                </tr>
              ) : (
                posts.map((post) => (
                  <tr
                    key={post.id}
                    className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors group"
                  >
                    {/* Tiêu đề */}
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        {post.thumbnail && (
                          <Image
                            src={post.thumbnail}
                            alt=""
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded object-cover border hidden sm:block shrink-0"
                          />
                        )}
                        <div className="overflow-hidden">
                          <Link
                            href={`/posts/${post.slug}`}
                            target="_blank"
                            className="font-semibold text-gray-900 dark:text-white truncate block hover:text-blue-600 text-base"
                            title={post.title}
                          >
                            {post.title}
                          </Link>
                          <p className="text-xs text-gray-400 mt-1 font-mono">
                            {formatDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Views */}
                    <td className="px-6 py-4 text-center text-gray-500 hidden sm:table-cell font-mono text-sm">
                      {post.views.toLocaleString()}
                    </td>

                    {/* Trạng thái */}
                    <td className="p-4 text-center">
                      <PostStatusToggle
                        id={post.id} // Truyền ID vào đây
                        initialStatus={post.published}
                      />
                    </td>

                    {/* Hành động */}
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/posts/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:bg-gray-100 rounded transition-colors"
                          title="Xem"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-100 rounded transition-colors"
                          title="Sửa"
                        >
                          <FaEdit />
                        </Link>
                        <DeletePostButton id={post.id} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* FOOTER */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-3 flex justify-between items-center shrink-0">
          <span className="text-xs text-gray-400">
            {posts.length > 0
              ? `Hiển thị ${startItem}-${endItem} trong tổng số ${stats.total} bài viết`
              : "0 kết quả"}
          </span>
          {/* Truyền đúng tham số cho Pagination */}
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
