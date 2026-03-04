// app/actions/config.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// Hàm lấy cấu hình
export async function getSiteConfig() {
  let config = await prisma.siteConfig.findUnique({
    where: { id: "global" },
  });

  // Nếu chưa có thì tạo mặc định
  if (!config) {
    config = await prisma.siteConfig.create({
      data: { id: "global" },
    });
  }
  return config;
}

// Hàm cập nhật cấu hình
export async function updateSiteConfig(formData: FormData) {
  try {
    await prisma.siteConfig.update({
      where: { id: "global" },
      data: {
        hotline: formData.get("hotline") as string,
        salePhone: formData.get("salePhone") as string,
        saleName: formData.get("saleName") as string,
        zaloLink: formData.get("zaloLink") as string,
        fbLink: formData.get("fbLink") as string,
        email: formData.get("email") as string,
        address: formData.get("address") as string,
      },
    });

    // Xóa cache để web cập nhật ngay lập tức
    revalidatePath("/", "layout");
    return { success: true };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return { success: false, error: "Lỗi cập nhật cấu hình" };
  }
}
