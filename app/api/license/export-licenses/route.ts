import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { Prisma } from "@prisma/client";
import ExcelJS from "exceljs";

export async function GET(request: Request) {
  try {
    const session = await auth();
    const user = session?.user as { role?: string } | undefined;

    if (!user || user.role !== "SUPER_ADMIN") {
      return new NextResponse("Từ chối truy cập. Yêu cầu quyền Admin!", { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const status = searchParams.get("status") || "ALL";
    const fromDate = searchParams.get("from") || "";
    const toDate = searchParams.get("to") || "";

    const whereCondition: Prisma.LicenseWhereInput = {};

    if (query) {
      whereCondition.OR = [
        { key: { contains: query, mode: "insensitive" } },
        { hardwareId: { contains: query, mode: "insensitive" } },
        { company: { name: { contains: query, mode: "insensitive" } } },
      ];
    }
    if (status === "ACTIVE") whereCondition.isActive = true;
    if (status === "INACTIVE") whereCondition.isActive = false;
    if (fromDate || toDate) {
      whereCondition.createdAt = {};
      if (fromDate) whereCondition.createdAt.gte = new Date(fromDate);
      if (toDate) whereCondition.createdAt.lte = new Date(toDate);
    }

    const licenses = await prisma.license.findMany({
      where: whereCondition,
      include: { company: true },
      orderBy: { createdAt: "desc" },
    });

    // 1. Khởi tạo File Excel xịn sò
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Danh Sach License");

    // 2. Định nghĩa các cột và Độ rộng (width) cho đẹp
    worksheet.columns = [
      { header: "Ngày tạo", key: "createdAt", width: 15 },
      { header: "Doanh nghiệp / Khách hàng", key: "company", width: 40 },
      { header: "Mã License Key", key: "key", width: 35 },
      { header: "Hardware ID (Mã máy)", key: "hardwareId", width: 30 },
      { header: "Ngày kích hoạt", key: "activatedAt", width: 15 },
      { header: "Hạn sử dụng", key: "expiresAt", width: 15 },
      { header: "Trạng thái", key: "status", width: 20 },
    ];

    // 3. In đậm cái dòng Tiêu đề (Row 1)
    worksheet.getRow(1).font = { bold: true, size: 12 };
    
    // 4. Nhồi dữ liệu vào các hàng
    licenses.forEach((lic) => {
      worksheet.addRow({
        createdAt: new Date(lic.createdAt).toLocaleDateString("vi-VN"),
        company: lic.company?.name || "N/A",
        key: lic.key,
        hardwareId: lic.hardwareId || "Chưa kích hoạt",
        activatedAt: lic.activatedAt ? new Date(lic.activatedAt).toLocaleDateString("vi-VN") : "N/A",
        expiresAt: lic.expiresAt ? new Date(lic.expiresAt).toLocaleDateString("vi-VN") : "Vĩnh viễn",
        status: lic.isActive ? "ĐANG HOẠT ĐỘNG" : "BỊ KHÓA"
      });
    });

    // 5. Biến file Excel thành Buffer để gửi qua mạng
    const buffer = await workbook.xlsx.writeBuffer();

    // 6. Trả về đúng định dạng .xlsx của Microsoft
    return new NextResponse(buffer, {
      status: 200,
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="Danh_sach_License_${new Date().getTime()}.xlsx"`,
      },
    });

  } catch (error) {
    console.error("Lỗi xuất Excel License:", error);
    return new NextResponse("Lỗi hệ thống khi xuất file", { status: 500 });
  }
}