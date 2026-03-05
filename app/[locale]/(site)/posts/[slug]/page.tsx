import { prisma } from "@/lib/prisma";
import { Metadata, ResolvingMetadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeft, FaCalendarAlt, FaEye } from "react-icons/fa";

type Props = {
  params: Promise<{ slug: string }>;
};

// ==========================================
// 1. HÀM SEO (Metadata)
// ==========================================
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { slug } = await params;

  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  // CHẶN NGAY TỪ BƯỚC SEO: Không có bài HOẶC bài đang ẩn (published = false)
  if (!post || !post.published) {
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

// ==========================================
// 2. GIAO DIỆN CHI TIẾT BÀI VIẾT
// ==========================================
export default async function PostDetailPage({ params }: Props) {
  const { slug } = await params;

  // Bước 1: Tìm bài viết trước (Không dùng update ngay để tránh cộng view cho bài nháp/bài lỗi)
  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  // Bước 2: CHỐT CHẶN BẢO MẬT (Quan trọng nhất)
  // Nếu bài viết không tồn tại HOẶC chưa được xuất bản (published === false) -> Trả về 404
  if (!post || !post.published) {
    notFound();
  }

  // Bước 3: Nếu qua được chốt chặn, tiến hành cộng 1 view ngầm trong DB
  // Sếp yên tâm là khách vẫn load trang mượt mà vì ta không gán lại biến post
  prisma.post
    .update({
      where: { id: post.id },
      data: { views: { increment: 1 } },
    })
    .catch((err) => console.error("Lỗi tăng view:", err));

  // Vì ta tăng view ngầm, nên giao diện tạm cộng 1 vào số view hiện tại để khách thấy ngay
  const currentViews = post.views + 1;

  return (
    <div className="bg-gray-50 dark:bg-gray-950 min-h-screen py-8 sm:py-10 mt-16 sm:mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* NÚT QUAY LẠI */}
        <div className="mb-4 sm:mb-6">
          <Link
            href="/posts"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors font-medium group text-sm sm:text-base"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform text-xs sm:text-sm" />
            Quay lại danh sách
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
          {/* ẢNH BÌA */}
          {post.thumbnail && (
            <div className="relative w-full aspect-video md:aspect-21/9 min-h-50 bg-gray-100 dark:bg-gray-800">
              <Image
                src={post.thumbnail}
                alt={post.title}
                fill
                className="object-cover"
                priority
                unoptimized={post.thumbnail?.startsWith("/uploads/")}
              />
            </div>
          )}

          {/* NỘI DUNG */}
          <div className="p-4 sm:p-6 md:p-10">
            <div className="mb-6 sm:mb-8 border-b border-gray-100 dark:border-gray-800 pb-6 sm:pb-8">
              <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 leading-snug">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt className="text-blue-500" />
                  {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </div>

                <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-gray-300 dark:bg-gray-600"></span>

                <div className="flex items-center gap-2" title="Lượt xem">
                  <FaEye className="text-blue-500" />
                  <span>{currentViews} lượt xem</span>
                </div>
              </div>
            </div>

            <div
              className="prose prose-sm sm:prose-base md:prose-lg prose-blue max-w-none dark:prose-invert
                prose-headings:font-bold prose-headings:text-gray-800 dark:prose-headings:text-gray-100
                prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-xl prose-img:shadow-md prose-img:max-w-full prose-img:h-auto prose-img:mx-auto"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
