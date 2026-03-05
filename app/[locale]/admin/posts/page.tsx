// app/admin/posts/page.tsx
import Pagination from "@/components/Helper/Pagination";
import DeletePostButton from "@/components/Posts/DeletePostButton";
import PostStatusToggle from "@/components/Posts/PostStatusToggle";
import { prisma } from "@/lib/prisma";
import Image from "next/image";
import Link from "next/link";
import { FaEdit, FaEye, FaPlus } from "react-icons/fa";

import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";

const ITEMS_PER_PAGE = 10;

interface SessionUser {
  role: string;
  permissions?: string[];
}

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
export default async function PostsPage(props: {
  searchParams: Promise<{ page?: string }>;
}) {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/login");
  }

  const role = (session.user as SessionUser).role;
  const permissions = (session.user as SessionUser).permissions || [];

  const canManagePosts =
    role === "SUPER_ADMIN" ||
    hasPermission(permissions, PERMISSIONS.MANAGE_POSTS);

  if (!canManagePosts) {
    redirect("/admin/dashboard");
  }

  const searchParams = await props.searchParams;
  const currentPage = Number(searchParams?.page) || 1;
  const skip = (currentPage - 1) * ITEMS_PER_PAGE;

  const posts = await prisma.post.findMany({
    take: ITEMS_PER_PAGE,
    skip: skip,
    orderBy: { createdAt: "desc" },
  });

  const stats = await getPostStats();
  const totalPages = Math.ceil(stats.total / ITEMS_PER_PAGE);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const startItem = (currentPage - 1) * ITEMS_PER_PAGE + 1;
  const endItem = Math.min(currentPage * ITEMS_PER_PAGE, stats.total);

  return (
    // THAY ĐỔI 1: Bỏ chiều cao fix cứng, đổi thành flex-1 h-full min-h-[70vh]
    <div className="flex flex-col gap-4 flex-1 h-full min-h-[70vh]">
      {/* --- HEADER --- */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 shrink-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
            Quản lý Tin tức
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Tổng: <strong className="text-blue-600">{stats.total}</strong> bài
            viết
          </p>
        </div>

        <Link
          href="/admin/posts/create"
          className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm whitespace-nowrap w-full sm:w-fit cursor-pointer"
        >
          <FaPlus /> Viết bài mới
        </Link>
      </div>

      {/* --- STATS MINI --- */}
      {/* 4 cục này sếp làm grid-cols-2 trên mobile là quá đẹp rồi, giữ nguyên */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 shrink-0">
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] sm:text-xs text-gray-500 uppercase font-bold">
            Tổng bài
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {stats.total}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] sm:text-xs text-green-500 uppercase font-bold">
            Đã đăng
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {stats.published}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] sm:text-xs text-orange-500 uppercase font-bold">
            Nháp
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {stats.drafts}
          </span>
        </div>
        <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex flex-col justify-center">
          <span className="text-[10px] sm:text-xs text-blue-500 uppercase font-bold">
            Lượt xem
          </span>
          <span className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
            {stats.views.toLocaleString()}
          </span>
        </div>
      </div>

      {/* --- TABLE WRAPPER --- */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col flex-1 overflow-hidden">
        {/* THAY ĐỔI 2: overflow-x-auto để có thanh cuộn ngang trên điện thoại */}
        <div className="flex-1 overflow-x-auto overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {/* THAY ĐỔI 3: Thêm min-w-[700px] để bảng không bị ép bẹp dí */}
          <table className="w-full text-left text-sm text-gray-600 dark:text-gray-300 table-fixed min-w-175">
            <thead className="bg-gray-50 dark:bg-gray-700 uppercase font-bold text-xs text-gray-500 dark:text-gray-200 sticky top-0 z-10 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-4 sm:px-6 py-4 w-[50%]">Tiêu đề bài viết</th>
                <th className="px-4 sm:px-6 py-4 w-[15%] text-center hidden sm:table-cell">
                  Views
                </th>
                <th className="px-4 sm:px-6 py-4 w-[15%] text-center">
                  Trạng thái
                </th>
                <th className="px-4 sm:px-6 py-4 w-[20%] text-right">
                  Hành động
                </th>
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
                    <td className="px-4 sm:px-6 py-4">
                      <div className="flex items-start gap-3">
                        {/* Ảnh Thumbnail bị ẩn trên điện thoại (hidden sm:block) -> Gọn gàng! */}
                        {post.thumbnail && (
                          <Image
                            src={post.thumbnail}
                            alt=""
                            width={48}
                            height={48}
                            className="w-12 h-12 rounded object-cover border hidden sm:block shrink-0"
                            unoptimized={post.thumbnail?.startsWith(
                              "/uploads/",
                            )}
                          />
                        )}
                        <div className="overflow-hidden">
                          <Link
                            href={`/posts/${post.slug}`}
                            target="_blank"
                            className="font-semibold text-gray-900 dark:text-white truncate block hover:text-blue-600 text-sm sm:text-base"
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

                    <td className="px-4 sm:px-6 py-4 text-center text-gray-500 hidden sm:table-cell font-mono text-sm">
                      {post.views.toLocaleString()}
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-center">
                      <PostStatusToggle
                        id={post.id}
                        initialStatus={post.published}
                      />
                    </td>

                    <td className="px-4 sm:px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 sm:gap-2">
                        <Link
                          href={`/posts/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                          title="Xem"
                        >
                          <FaEye />
                        </Link>
                        <Link
                          href={`/admin/posts/edit/${post.id}`}
                          className="p-2 text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-colors hover:cursor-pointer"
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

        {/* --- FOOTER --- */}
        {/* Đưa về flex-col trên mobile để Phân trang không bị ép lòi ra ngoài */}
        <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-4 py-3 flex flex-col sm:flex-row justify-between items-center gap-3 shrink-0">
          <span className="text-xs text-gray-400 hidden sm:inline">
            {posts.length > 0
              ? `Hiển thị ${startItem}-${endItem} trong tổng số ${stats.total} bài viết`
              : "0 kết quả"}
          </span>
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
