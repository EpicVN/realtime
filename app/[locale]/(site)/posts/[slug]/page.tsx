import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Metadata } from "next";
import ViewCounter from "@/components/Helper/ViewCounter";

interface Props {
  params: Promise<{ slug: string }>;
}

// 1. Tự động SEO (Title + Meta Description)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // <--- THÊM DÒNG NÀY (Chờ lấy slug)

  const post = await prisma.post.findUnique({
    where: { slug: slug }, // Dùng biến slug vừa lấy được
  });

  if (!post) return { title: "Không tìm thấy bài viết" };

  return {
    title: post.title,
    description: post.description || post.title,
    openGraph: {
      images: post.thumbnail ? [post.thumbnail] : [],
    },
  };
}

// 2. Nội dung chính
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  // Lấy bài viết theo Slug
  const post = await prisma.post.findUnique({
    where: { slug: slug },
  });

  // Nếu không thấy bài hoặc bài đang nháp -> Trả về trang 404
  if (!post || !post.published) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 mt-20">
      {/* Breadcrumb */}
      <Link
        href="/posts"
        className="text-gray-500 hover:text-blue-600 text-sm mb-6 inline-block"
      >
        ← Quay lại danh sách
      </Link>

      {/* View counter */}
      <ViewCounter postId={post.id} />

      {/* Header bài viết */}
      <header className="mb-8 border-b pb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-gray-500 text-sm">
          <span>
            Ngày đăng: {new Date(post.createdAt).toLocaleDateString("vi-VN")}
          </span>
          <span>•</span>
          <span>{post.views} lượt xem</span>
        </div>
      </header>

      {/* NỘI DUNG HTML TỪ EDITOR */}
      <article className="prose prose-lg max-w-none prose-img:rounded-xl prose-a:text-blue-600 hover:prose-a:underline">
        {/* dangerouslySetInnerHTML là bắt buộc để render HTML */}
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </div>
  );
}
