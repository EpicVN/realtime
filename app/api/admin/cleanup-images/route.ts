import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs";
import path from "path";

// Cấu hình thư mục ảnh
const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");

export async function POST(req: Request) {
  // Dùng POST để bảo mật hơn chút
  try {
    // 1. Lấy danh sách tất cả file ảnh đang có trên ổ cứng
    if (!fs.existsSync(UPLOAD_DIR)) {
      return NextResponse.json({
        message: "Thư mục uploads chưa tồn tại, không có gì để xóa.",
      });
    }

    const filesOnDisk = fs.readdirSync(UPLOAD_DIR);

    if (filesOnDisk.length === 0) {
      return NextResponse.json({ message: "Thư mục trống." });
    }

    // 2. Lấy tất cả bài viết từ Database (Lấy cột content và thumbnail)
    const allPosts = await prisma.post.findMany({
      select: {
        content: true,
        thumbnail: true,
      },
    });

    // 3. Tạo danh sách các ảnh ĐANG ĐƯỢC SỬ DỤNG (Whitelist)
    const usedImages = new Set<string>();

    allPosts.forEach((post) => {
      // a. Thêm ảnh thumbnail vào whitelist
      if (post.thumbnail) {
        // Post.thumbnail lưu dạng "/uploads/abc.png", ta chỉ lấy tên file "abc.png"
        const fileName = post.thumbnail.split("/").pop();
        if (fileName) usedImages.add(fileName);
      }

      // b. Quét nội dung bài viết để tìm ảnh (dùng Regex)
      // Tìm các chuỗi kiểu: src="/uploads/..."
      if (post.content) {
        const regex = /\/uploads\/([a-zA-Z0-9-._]+)/g;
        let match;
        while ((match = regex.exec(post.content)) !== null) {
          // match[1] chính là tên file (ví dụ: image-123.png)
          usedImages.add(match[1]);
        }
      }
    });

    // 4. Tìm các file "mồ côi" (Có trên đĩa nhưng không có trong whitelist)
    const filesToDelete = filesOnDisk.filter((file) => !usedImages.has(file));

    // 5. Tiến hành xóa
    let deletedCount = 0;
    filesToDelete.forEach((file) => {
      const filePath = path.join(UPLOAD_DIR, file);
      try {
        fs.unlinkSync(filePath); // Xóa file
        deletedCount++;
      } catch (err) {
        console.error(`Không thể xóa file ${file}:`, err);
      }
    });

    return NextResponse.json({
      success: true,
      message: `Đã dọn dẹp xong!`,
      details: {
        totalFiles: filesOnDisk.length,
        usedFiles: usedImages.size,
        deleted: deletedCount,
      },
    });
  } catch (error) {
    console.error("Lỗi dọn dẹp:", error);
    return NextResponse.json({ error: "Lỗi Server" }, { status: 500 });
  }
}
