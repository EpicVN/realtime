import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import createMiddleware from "next-intl/middleware";

// 1. Khởi tạo Middleware của Next-Intl
const intlMiddleware = createMiddleware({
  locales: ["vi", "en"],
  defaultLocale: "vi",
  localePrefix: "always", // Luôn hiển thị /vi hoặc /en
});

// 2. Khởi tạo Middleware của NextAuth
const { auth } = NextAuth(authConfig);

// 3. KẾT HỢP: Dùng NextAuth bao bọc Next-Intl
export default auth((req) => {
  // Hàm này chỉ chạy khi NextAuth đã xử lý xong (hoặc cho phép truy cập)
  // Sau đó ta return intlMiddleware để nó định tuyến ngôn ngữ
  return intlMiddleware(req);
});

// 4. Cấu hình Matcher (Giữ nguyên như cũ để trừ file tĩnh)
export const config = {
  matcher: [
    // Khớp tất cả các path NGOẠI TRỪ:
    // 1. /api (API routes)
    // 2. /_next (Next.js internals)
    // 3. /_vercel (Vercel internals)
    // 4. /images (Thư mục ảnh của sếp - QUAN TRỌNG NHẤT)
    // 5. Các file có đuôi mở rộng (favicon.ico, robot.txt...)
    "/((?!api|_next|_vercel|images|.*\\..*).*)",
  ],
};
