import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: Request) {
  try {
    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      return NextResponse.json(
        { error: "Không có file nào được tải lên" },
        { status: 400 },
      );
    }

    // 1. Chuyển file thành Buffer để ghi
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 2. Tạo tên file độc nhất (tránh trùng tên)
    // Ví dụ: image-1735628392-anh-dep.png
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = file.name.replace(/\s/g, "-"); // Bỏ khoảng trắng
    const uniqueFilename = `${uniqueSuffix}-${filename}`;

    // 3. Đường dẫn lưu file (Lưu vào folder public/uploads)
    // Lưu ý: process.cwd() trỏ đến thư mục gốc dự án
    const uploadDir = join(process.cwd(), "public", "uploads");

    // Tạo thư mục nếu chưa có
    await mkdir(uploadDir, { recursive: true });

    const path = join(uploadDir, uniqueFilename);

    // 4. Ghi file vào ổ cứng
    await writeFile(path, buffer);

    // 5. Trả về đường dẫn để lưu vào DB (bắt đầu bằng /uploads/...)
    const fileUrl = `/uploads/${uniqueFilename}`;

    return NextResponse.json({ url: fileUrl });
  } catch (error) {
    console.error("Lỗi upload:", error);
    return NextResponse.json({ error: "Upload thất bại" }, { status: 500 });
  }
}
