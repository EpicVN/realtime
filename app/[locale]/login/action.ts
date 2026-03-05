"use server";

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

// HÀM ĐĂNG NHẬP CHUẨN NEXTAUTH v5
export async function authenticate(formData: FormData) {
  try {
    // Gọi hàm signIn của NextAuth. Nó sẽ tự động kích hoạt hàm "authorize" bên trong file auth.ts của sếp.
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false, // Tắt tự động chuyển trang để Client tự xử lý
    });

    // Nếu chạy qua được dòng trên mà không bị throw lỗi -> Đăng nhập thành công!
    return { success: true };
  } catch (error) {
    // 1. Nếu là lỗi xác thực (Sai email, sai mật khẩu)
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Email hoặc mật khẩu không chính xác!" };
        default:
          return { error: "Có lỗi xảy ra trong quá trình đăng nhập." };
      }
    }

    // 2. CHỐT CHẶN QUAN TRỌNG NHẤT: Trả lại lỗi cho Next.js xử lý
    // Dòng này giúp Next.js thực hiện các hành động nội bộ (như Redirect) mà không bị nuốt lỗi.
    throw error;
  }
}
