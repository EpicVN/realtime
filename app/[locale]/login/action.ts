"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

// 1. Hàm kiểm tra User & Lấy Role (Không đăng nhập, chỉ check)
export async function checkUserRole(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return { error: "Vui lòng nhập đủ thông tin!" };

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !user.password) {
      return { error: "Tài khoản không tồn tại!" };
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return { error: "Mật khẩu không chính xác!" };
    }

    // Trả về Role để Client lưu
    return { success: true, role: user.role };
  } catch (error) {
    return { error: "Lỗi hệ thống!" };
  }
}

// 2. Hàm đăng nhập thật (Gọi Auth.js)
export async function authenticate(formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Thông tin đăng nhập không đúng.";
        default:
          return "Lỗi đăng nhập.";
      }
    }
    throw error;
  }
}
