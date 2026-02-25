import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

// Thêm cái này để Next.js không cache cứng, luôn hiện bài mới
export const dynamic = "force-dynamic";

export default async function BlogPage() {
  // 1. Lấy bài viết ĐÃ PUBLISHED từ DB
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 mt-20">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Tin tức & Sự kiện 📰
        </h1>
        <p className="text-gray-600 text-lg">
          Cập nhật những xu hướng mới nhất về VoIP và CRM
        </p>
      </div>

      {/* Grid bài viết */}
      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post.id}
            className="bg-white rounded-2xl shadow-sm border overflow-hidden hover:shadow-md transition-shadow flex flex-col"
          >
            {/* Ảnh bìa */}
            <Link
              href={`/posts/${post.slug}`}
              className="block h-48 overflow-hidden bg-gray-100 relative"
            >
              {post.thumbnail ? (
                <Image
                  src={post.thumbnail}
                  alt={post.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>No Image</span>
                </div>
              )}
            </Link>

            {/* Nội dung tóm tắt */}
            <div className="p-6 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-3 font-mono">
                <span>
                  {new Date(post.createdAt).toLocaleDateString("vi-VN")}
                </span>
                <span>•</span>
                <span>{post.views} lượt xem</span>
              </div>

              <Link href={`/posts/${post.slug}`} className="block mb-2">
                <h2 className="text-xl font-bold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors">
                  {post.title}
                </h2>
              </Link>

              <p className="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
                {post.description}
              </p>

              <Link
                href={`/posts/${post.slug}`}
                className="text-blue-600 font-semibold text-sm hover:underline mt-auto inline-flex items-center gap-1"
              >
                Đọc tiếp →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
