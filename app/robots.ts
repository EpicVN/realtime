import { MetadataRoute } from "next";

const BASE_URL = "http://realtime.vn";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/api/"], // Cấm Google vào Admin và API
    },
    sitemap: `${BASE_URL}/sitemap.xml`, // Chỉ đường dẫn tới bản đồ
  };
}

// Bước tiếp theo: Đăng ký robots.txt với Google Search Console
// Google Search Console
// 1. Đăng nhập vào Google Search Console
// 2. Thêm trang web của bạn (http://realtime.vn)
// 3. Chọn phương thức xác minh (thường là "Thẻ HTML")
// 4. Sao chép đoạn mã meta tag được cung cấp
// 5. Dán đoạn mã vào phần <head> của file app/[locale]/layout.tsx
// 6. Quay lại Google Search Console và nhấn "Xác minh" để hoàn tất quá trình xác minh trang web của bạn.
