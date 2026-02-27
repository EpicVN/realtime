// app/api/posts/[id]/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// 1. Lấy chi tiết bài viết (để điền vào form sửa)
export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id: id },
    });

    if (!post) {
      return NextResponse.json(
        { error: "Không tìm thấy bài viết" },
        { status: 404 },
      );
    }

    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}

// 2. Cập nhật bài viết
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        title: body.title,
        description: body.description,
        content: body.content,
        thumbnail: body.thumbnail,
        // Nếu sếp muốn sửa xong nó vẫn giữ trạng thái cũ thì không cần dòng status
        // status: body.status
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi cập nhật" }, { status: 500 });
  }
}

// 3. Xóa bài viết
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    // Xóa trong Database
    await prisma.post.delete({
      where: { id: id },
    });

    return NextResponse.json({ message: "Xóa thành công!" });
  } catch (error) {
    return NextResponse.json(
      { error: "Lỗi khi xóa bài viết" },
      { status: 500 },
    );
  }
}

// 4. Cập nhật trạng thái Xuất bản (PATCH)
export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body = await req.json();
    const { published } = body; // Nhận true/false từ Client

    const updatedPost = await prisma.post.update({
      where: { id: id },
      data: {
        published: published,
      },
    });

    return NextResponse.json(updatedPost);
  } catch (error) {
    console.error("Lỗi PATCH:", error);
    return NextResponse.json(
      { error: "Lỗi cập nhật trạng thái" },
      { status: 500 },
    );
  }
}
