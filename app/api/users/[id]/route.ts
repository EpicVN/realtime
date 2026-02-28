import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import type { Prisma } from "@prisma/client";

// 1. CẬP NHẬT NHÂN VIÊN (PUT)
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }, // Next.js 15: params là Promise
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { name, email, password, role, permissions } = body;

    // Chuẩn bị dữ liệu update
    const updateData: Prisma.UserUpdateInput = {
      name,
      email,
      role,
      permissions,
    };

    // Nếu có nhập password mới thì mới mã hóa và update.
    // Nếu để trống thì giữ nguyên password cũ.
    if (password && password.trim() !== "") {
      updateData.password = await bcrypt.hash(password, 10);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Lỗi update user:", error);
    return NextResponse.json(
      { error: "Lỗi cập nhật nhân viên" },
      { status: 500 },
    );
  }
}

// 2. XÓA NHÂN VIÊN (DELETE) - Làm sẵn tiện tay
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    await prisma.user.delete({
      where: { id },
    });
    return NextResponse.json({ message: "Đã xóa thành công" });
  } catch (error) {
    return NextResponse.json({ error: "Lỗi xóa nhân viên" }, { status: 500 });
  }
}
