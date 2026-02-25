import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Hàm tạo Slug tự động (VD: "Chào Sếp" -> "chao-sep")
function stringToSlug(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[đĐ]/g, "d")
    .replace(/([^0-9a-z-\s])/g, "")
    .replace(/(\s+)/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, content, thumbnail } = body;

    // Validate cơ bản
    if (!title || !content) {
      return NextResponse.json(
        { error: "Thiếu tiêu đề hoặc nội dung" },
        { status: 400 },
      );
    }

    // Tạo slug
    let slug = stringToSlug(title);

    // Kiểm tra trùng slug (nếu trùng thì thêm số random đuôi)
    const existingPost = await prisma.post.findUnique({ where: { slug } });
    if (existingPost) {
      slug = `${slug}-${Date.now()}`;
    }

    // Lưu vào Database
    const newPost = await prisma.post.create({
      data: {
        title,
        slug,
        description,
        content,
        thumbnail,
        published: true, // Đăng luôn
      },
    });

    return NextResponse.json(newPost);
  } catch (error) {
    console.error("Lỗi tạo bài viết:", error);
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}
