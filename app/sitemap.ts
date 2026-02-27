import { MetadataRoute } from 'next';
import { prisma } from '@/lib/prisma'; // Đường dẫn tới file prisma của sếp

// Thay bằng domain thật của sếp (VD: https://realtime.vn)
const BASE_URL = 'https://realtime.vn';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // 1. Lấy tất cả bài viết ĐÃ ĐĂNG (published = true)
  const posts = await prisma.post.findMany({
    where: { published: true },
    select: { slug: true, updatedAt: true },
  });

  // 2. Map dữ liệu bài viết chuẩn format Sitemap
  const postsUrls = posts.map((post) => ({
    url: `${BASE_URL}/posts/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // 3. Trả về mảng kết hợp (Trang chủ + Bài viết)
  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...postsUrls,
  ];
}