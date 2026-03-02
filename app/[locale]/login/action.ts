"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// 1. Hàm check role (Giữ nguyên, cái này đang chạy đúng)
export async function checkUserRole(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Vui lòng nhập đủ thông tin!" };

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) return { error: "Tài khoản không tồn tại!" };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return { error: "Mật khẩu không chính xác!" };

    return { success: true, role: user.role };
  } catch (error) {
    return { error: "Lỗi hệ thống khi kiểm tra quyền!" };
  }
}

// 2. HÀM ĐĂNG NHẬP (SỬA LẠI ĐỂ TRẢ VỀ OBJECT)
export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // Quan trọng: Tắt tự động chuyển trang
    });

    // Nếu không có lỗi gì văng ra -> Thành công
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          // SỬA Ở ĐÂY: Trả về Object { error: ... } thay vì chuỗi
          return { error: "Email hoặc mật khẩu không đúng." };
        default:
          return { error: "Lỗi đăng nhập không xác định." };
      }
    }

    // Auth.js đôi khi throw lỗi redirect, ta phải catch và bỏ qua nếu thành công
    // Nhưng vì đã để redirect: false nên thường sẽ không vào đây trừ lỗi hệ thống
    console.error("Auth Error:", error);
    return { error: "Lỗi hệ thống server." };
  }
}
