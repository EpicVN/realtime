// app/actions/contact.ts
"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateContactStatus(id: string, status: string) {
  try {
    await prisma.contact.update({
      where: { id: id }, // Nếu id của sếp là Int thì dùng: id: Number(id)
      data: { status },
    });
    // Làm mới lại trang để hiển thị trạng thái mới
    revalidatePath("/admin/contacts");
    return { success: true };
  } catch (error) {
    return { success: false, error: "Lỗi cập nhật trạng thái" };
  }
}
