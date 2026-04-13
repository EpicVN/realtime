"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";

// 1. ACTION: XÓA LICENSE
export async function deleteLicense(id: string) {
  try {
    const session = await auth();
    // Khai báo rõ ràng kiểu dữ liệu có chứa role
    const user = session?.user as { role?: string } | undefined;

    if (!user || user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Từ chối truy cập. Yêu cầu quyền Admin!",
      };
    }

    await prisma.license.delete({
      where: { id },
    });

    revalidatePath("/admin/licenses");
    return { success: true, message: "Đã xóa Key vĩnh viễn!" };
  } catch (error) {
    console.error("Lỗi xóa License:", error);
    return { success: false, message: "Lỗi hệ thống khi xóa dữ liệu." };
  }
}

// 2. ACTION: BẬT/TẮT TRẠNG THÁI KHÓA KEY
export async function toggleLicenseStatusAction(
  id: string,
  currentStatus: boolean,
) {
  try {
    const session = await auth();
    // Ép kiểu an toàn, nói KHÔNG với any
    const user = session?.user as { role?: string } | undefined;

    if (!user || user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Từ chối truy cập. Yêu cầu quyền Admin!",
      };
    }

    await prisma.license.update({
      where: { id },
      data: { isActive: !currentStatus },
    });

    revalidatePath("/admin/licenses");
    return {
      success: true,
      message: !currentStatus
        ? "Đã mở khóa Key thành công!"
        : "Đã khóa Key thành công!",
    };
  } catch (error) {
    console.error("Lỗi cập nhật trạng thái:", error);
    return { success: false, message: "Lỗi hệ thống khi cập nhật trạng thái." };
  }
}

// 3. ACTION: TẠO HÀNG LOẠT LICENSE (DÙNG CHO FORM IMPORT EXCEL) - KHÔNG DÙNG CHO FORM TẠO THỦ CÔNG 1 KEY
function generateLicenseKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const blocks = [];

  // Lặp 5 lần tạo ra 5 block, mỗi block 5 ký tự
  for (let i = 0; i < 5; i++) {
    let block = "";
    for (let j = 0; j < 5; j++) {
      block += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    blocks.push(block);
  }

  // Nối các block lại bằng dấu gạch ngang (VD: 8A2B9-X7P1M-QW4E5-ZXC8V-9L0K2)
  return blocks.join("-");
}

export async function createBulkLicensesAction(formData: FormData) {
  try {
    const session = await auth();
    const user = session?.user as { role?: string } | undefined;

    if (!user || user.role !== "SUPER_ADMIN") {
      return {
        success: false,
        message: "Từ chối truy cập. Yêu cầu quyền Admin!",
      };
    }

    const companyName = formData.get("companyName") as string;
    const quantityStr = formData.get("quantity") as string;
    const expiresAtStr = formData.get("expiresAt") as string;

    if (!companyName?.trim()) {
      return {
        success: false,
        message: "Vui lòng nhập tên Khách hàng/Công ty!",
      };
    }

    const quantity = parseInt(quantityStr) || 1;
    if (quantity < 1 || quantity > 100) {
      return {
        success: false,
        message: "Số lượng tạo cùng lúc giới hạn từ 1 đến 100 Key!",
      };
    }

    // 1. Tìm công ty cũ hoặc Tạo công ty mới
    let company = await prisma.company.findFirst({
      where: { name: companyName.trim() },
    });

    if (!company) {
      company = await prisma.company.create({
        data: { name: companyName.trim() },
      });
    }

    // 2. Chuẩn bị mảng chứa hàng loạt Key
    const keysToCreate = [];
    for (let i = 0; i < quantity; i++) {
      keysToCreate.push({
        key: generateLicenseKey(), // Tái sử dụng hàm đẻ key 25 ký tự ở trên
        companyId: company.id,
        expiresAt: expiresAtStr ? new Date(expiresAtStr) : null,
      });
    }

    // 3. Bắn 1 phát vào Database (Dùng createMany cho hiệu năng siêu tốc)
    await prisma.license.createMany({
      data: keysToCreate,
    });

    revalidatePath("/admin/licenses");
    return {
      success: true,
      message: `Đã xuất xưởng thành công ${quantity} Key cho ${company.name}!`,
    };
  } catch (error) {
    console.error("Lỗi tạo License hàng loạt:", error);
    return { success: false, message: "Lỗi hệ thống khi tạo Key." };
  }
}
