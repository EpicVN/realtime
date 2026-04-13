import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { key, hardwareId } = body;

    if (!key || !hardwareId) {
      return NextResponse.json(
        { success: false, message: "Thiếu Key hoặc Hardware ID" },
        { status: 400 },
      );
    }

    // 1. Tìm Key trong DB, GỌI KÈM LUÔN THÔNG TIN CÔNG TY (include)
    const license = await prisma.license.findUnique({
      where: { key: key },
      include: { company: true },
    });

    if (!license) {
      return NextResponse.json(
        { success: false, message: "Key không tồn tại trên hệ thống" },
        { status: 404 },
      );
    }

    // 2. Kiểm tra trạng thái của Key
    if (!license.isActive) {
      return NextResponse.json(
        { success: false, message: "Key này đã bị khóa bởi Admin" },
        { status: 403 },
      );
    }

    // 3. KIỂM TRA TRẠNG THÁI CÔNG TY (Tính năng B2B VIP)
    if (!license.company.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Tài khoản Doanh nghiệp này đã bị đình chỉ hoạt động",
        },
        { status: 403 },
      );
    }

    // 4. Kiểm tra Hạn sử dụng
    if (license.expiresAt && new Date() > new Date(license.expiresAt)) {
      return NextResponse.json(
        { success: false, message: "Key đã hết hạn sử dụng" },
        { status: 403 },
      );
    }

    // 5. Khóa Hardware ID (DRM)
    if (!license.hardwareId) {
      // Key mới -> Gắn ID
      await prisma.license.update({
        where: { id: license.id },
        data: {
          hardwareId: hardwareId,
          activatedAt: new Date(),
        },
      });

      return NextResponse.json({
        success: true,
        message: "Kích hoạt bản quyền thành công cho thiết bị mới!",
        company: license.company.name, // Trả về Tên công ty thay vì customer như cũ
      });
    }

    if (license.hardwareId !== hardwareId) {
      // Sai ID -> Chém
      return NextResponse.json(
        {
          success: false,
          message: "Key đã được sử dụng trên một thiết bị khác!",
        },
        { status: 403 },
      );
    }

    // Hợp lệ toàn bộ -> Cho qua
    return NextResponse.json({
      success: true,
      message: "Xác thực bản quyền thành công!",
      company: license.company.name,
      expiresAt: license.expiresAt,
    });
  } catch (error) {
    console.error("Lỗi API Verify License:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống máy chủ" },
      { status: 500 },
    );
  }
}
