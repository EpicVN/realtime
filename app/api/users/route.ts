import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { PERMISSIONS } from "@/lib/permissions";

// 1. Lấy danh sách nhân viên
export async function GET() {
  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        // Chỉ lấy các trường cần thiết, giấu password đi
        id: true,
        name: true,
        email: true,
        role: true,
        permissions: true,
        createdAt: true,
      },
    });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}

// 2. Tạo nhân viên mới
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, permissions } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }

    // Check trùng email
    const exist = await prisma.user.findUnique({ where: { email } });
    if (exist) {
      return NextResponse.json({ error: "Email đã tồn tại" }, { status: 400 });
    }

    // Mã hóa pass
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN", // Mặc định tạo ra là nhân viên thường
        permissions: permissions || [], // Lưu mảng quyền được chọn
      },
    });

    return NextResponse.json(newUser);
  } catch (error) {
    console.error("Lỗi tạo user:", error);
    return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
  }
}
