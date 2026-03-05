// proxy.ts (Đổi tên file từ middleware.ts sang proxy.ts)
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import createMiddleware from "next-intl/middleware";

// 1. Khởi tạo xử lý đa ngôn ngữ của Next-Intl
const intlMiddleware = createMiddleware({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "always",
  // Không thêm localeDetection: false ở đây để Cookie vẫn hoạt động
});

// 2. Khởi tạo Auth
const { auth } = NextAuth(authConfig);

// 3. KẾT HỢP: Gán hàm auth vào biến export tên là `proxy` (Thay vì export default)
export const proxy = auth((req) => {
  const hasCookie = req.cookies.has("NEXT_LOCALE");

  if (!hasCookie) {
    req.headers.set("accept-language", "vi");
  }

  return intlMiddleware(req);
});

// 4. Cấu hình Matcher (Giữ nguyên như cũ)
export const config = {
  matcher: ["/((?!api|_next|_vercel|images|.*\\..*).*)"],
};
