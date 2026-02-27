import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// 1. Tạo wrapper cho plugin (trỏ đúng vào file request.ts sếp đã tạo)
// Lưu ý: Nếu file request.ts sếp để trong thư mục src thì sửa đường dẫn thành "./src/i18n/request.ts"
const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// 2. Cấu hình Next.js gốc của sếp
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Cho phép ảnh từ Cloudinary
      },
    ],
  },
};

// 3. Xuất ra cấu hình đã được next-intl bao bọc
export default withNextIntl(nextConfig);
