import { prisma } from "@/lib/prisma";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link"; // <--- Import Link
import { notFound } from "next/navigation";
import { FaCalendarAlt, FaUser, FaEye, FaArrowLeft } from "react-icons/fa"; // <--- Import thêm icon

type Props = {
  params: Promise<{ slug: string }>;
};

// 1. HÀM SEO (Metadata)
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  if (!post) {
    return { title: "Không tìm thấy bài viết" };
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://realtime.vn";
  const postUrl = `${baseUrl}/posts/${post.slug}`;
  const ogImage = post.thumbnail || `${baseUrl}/images/logo_bg_white.png`;

  return {
    title: post.title,
    description: post.description || post.title,
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      url: postUrl,
      type: "article",
      publishedTime: post.createdAt.toISOString(),
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    alternates: {
      canonical: postUrl,
    },
  };
}

// 2. GIAO DIỆN CHI TIẾT BÀI VIẾT
export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;

  // --- LOGIC TĂNG VIEW (Mỗi lần F5 là +1 view) ---
  // Dùng update thay vì findUnique để vừa lấy dữ liệu vừa tăng view
  // Nếu sếp chưa có cột 'views' trong DB thì đổi lại thành findUnique như cũ nhé
  let post;
  try {
    post = await prisma.post.update({
      where: { slug: slug },
      data: {
        views: {
          increment: 1, // Tự động cộng thêm 1
        },
      },
    });
  } catch (error) {
    // Fallback: Nếu lỗi (do chưa có cột views) thì chỉ findUnique thôi
    post = await prisma.post.findUnique({
      where: { slug: slug },
    });
  }

  if (!post) {
    notFound();
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 mt-24">
      {/* Container chính */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* --- 1. NÚT QUAY LẠI (MỚI) --- */}
        <div className="mb-6">
          <Link
            href="/posts" // <--- Đường dẫn về trang danh sách bài viết (Sếp sửa lại nếu khác)
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors font-medium group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-sm" />
            Quay lại danh sách
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {/* --- 2. ẢNH BÌA --- */}
          {post.thumbnail && (
            <div className="relative w-full aspect-video md:aspect-21/9">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}

          {/* --- 3. NỘI DUNG --- */}
          <div className="p-6 md:p-10">
            {/* Header bài viết */}
            <div className="mb-8 border-b border-gray-100 pb-8">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                {/* Ngày tháng */}
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                {/* --- 4. LƯỢT XEM (MỚI) --- */}
                {/* Dấu chấm ngăn cách */}
                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-300"></span>

                <div className="flex items-center gap-2" title="Lượt xem">
                  <FaEye className="text-blue-500" />
                  {/* Hiển thị số view, nếu chưa có thì hiện 0 */}
                  <span>{post.views || 0} lượt xem</span>
                </div>
              </div>
            </div>

            {/* Nội dung HTML */}
            <div
              className="prose prose-lg prose-blue max-w-none 
                prose-headings:font-bold prose-headings:text-gray-800
                prose-p:text-gray-600 prose-p:leading-relaxed
                prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-md"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
