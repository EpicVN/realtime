import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Hàm sinh Key 25 ký tự chuẩn Microsoft (VD: 8A2B9-X7P1M-QW4E5-ZXC8V-9L0K2)
function generateLicenseKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const blocks = [];
  for (let i = 0; i < 5; i++) {
    let block = "";
    for (let j = 0; j < 5; j++) {
      block += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    blocks.push(block);
  }
  return blocks.join("-");
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyId, companyName, expiresAt } = body;

    // 1. Ràng buộc đầu vào: Phải có ID công ty cũ, hoặc Tên để tạo công ty mới
    if (!companyId && !companyName) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Vui lòng cung cấp companyId (Công ty cũ) hoặc companyName (Tạo công ty mới)",
        },
        { status: 400 },
      );
    }

    let finalCompanyId = companyId;

    // 2. Tự động khởi tạo Công ty nếu sếp truyền tên mới
    if (!finalCompanyId) {
      const newCompany = await prisma.company.create({
        data: { name: companyName },
      });
      finalCompanyId = newCompany.id;
    }

    // 3. Đẻ Key 25 ký tự
    const newKey = generateLicenseKey();

    // 4. Lưu vào Database và móc nối thẳng vào Công ty
    const newLicense = await prisma.license.create({
      data: {
        key: newKey,
        companyId: finalCompanyId,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
      },
      include: {
        company: true, // Trả về luôn thông tin Công ty cho sếp dễ kiểm tra
      },
    });

    return NextResponse.json({
      success: true,
      message: "Tạo Key bản quyền thành công!",
      data: newLicense,
    });
  } catch (error) {
    console.error("Lỗi API Create License:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi hệ thống khi tạo Key" },
      { status: 500 },
    );
  }
}
