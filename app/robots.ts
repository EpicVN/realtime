import { MetadataRoute } from "next";

const BASE_URL = "https://realtime.vn";

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
