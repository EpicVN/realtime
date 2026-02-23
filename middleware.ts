import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import createMiddleware from "next-intl/middleware";

// 1. Khởi tạo Middleware của Next-Intl
const intlMiddleware = createMiddleware({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "always",
  // Không thêm localeDetection: false ở đây để Cookie vẫn hoạt động
});

// 2. Khởi tạo Middleware của NextAuth
const { auth } = NextAuth(authConfig);

// 3. KẾT HỢP: Dùng NextAuth bao bọc Next-Intl + Logic ép ngôn ngữ
export default auth((req) => {
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
