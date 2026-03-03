// app/api/admin/export-contacts/route.ts
import { prisma } from "@/lib/prisma";
import ExcelJS from "exceljs";
import { NextRequest } from "next/server";
import { Prisma } from "@prisma/client";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  
  // 1. Lấy các tham số từ URL
  const query = searchParams.get("query") || "";
  const status = searchParams.get("status") || "ALL";
  const fromDate = searchParams.get("from") || "";
  const toDate = searchParams.get("to") || "";

  // 2. Xây dựng điều kiện lọc linh hoạt
  const whereCondition: Prisma.ContactWhereInput = {};

  // Lọc theo từ khóa tìm kiếm
  if (query) {
    whereCondition.OR = [
      { name: { contains: query, mode: "insensitive" } },
      { phone: { contains: query, mode: "insensitive" } },
      { email: { contains: query, mode: "insensitive" } },
    ];
  }

  // Lọc theo trạng thái
  if (status && status !== "ALL") {
    whereCondition.status = status;
  }

  // Lọc theo thời gian
  if (fromDate || toDate) {
    whereCondition.createdAt = {};
    if (fromDate) whereCondition.createdAt.gte = new Date(fromDate);
    if (toDate) {
      // Vì datetime-local nếu người dùng chọn "2026-03-03T23:59" thì ok, 
      // nhưng để chắc chắn lấy hết phút cuối cùng, ta dùng trực tiếp giá trị truyền vào
      whereCondition.createdAt.lte = new Date(toDate);
    }
  }

  // 3. Gọi Database lấy dữ liệu đã được lọc
  const contacts = await prisma.contact.findMany({
    where: whereCondition,
    orderBy: { createdAt: "desc" },
  });

  // 4. Khởi tạo file Excel
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("DanhSachKhachHang", {
    views: [{ state: "frozen", ySplit: 1 }] // Khóa dòng tiêu đề khi cuộn
  });

  // 5. Cấu hình Cột
  worksheet.columns = [
    { header: "Ngày gửi", key: "createdAt", width: 22 },
    { header: "Họ tên", key: "name", width: 25 },
    { header: "SĐT", key: "phone", width: 18 },
    { header: "Email", key: "email", width: 35 },
    { header: "Nhu cầu", key: "interest", width: 20 },
    { header: "Lời nhắn", key: "message", width: 50 },
    { header: "Trạng thái", key: "status", width: 18 },
  ];

  // 6. Trang trí dòng Tiêu đề (Header)
  const headerRow = worksheet.getRow(1);
  headerRow.height = 30; 
  headerRow.eachCell((cell) => {
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FF1F4E78" }, // Nền xanh dương đậm
    };
    cell.font = {
      bold: true,
      color: { argb: "FFFFFFFF" }, // Chữ trắng
      size: 12,
    };
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.border = {
      top: { style: "thin" }, left: { style: "thin" },
      bottom: { style: "thin" }, right: { style: "thin" },
    };
  });

  // 7. Đổ dữ liệu vào các dòng và trang trí
  contacts.forEach((c) => {
    const row = worksheet.addRow({
      createdAt: new Date(c.createdAt).toLocaleString("vi-VN", {
        day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute:"2-digit"
      }),
      name: c.name,
      phone: c.phone ? ` ${c.phone}` : "", // Thêm dấu cách ẩn để sửa lỗi tam giác xanh
      email: c.email || "",
      interest: c.interest ? ` ${c.interest}` : "Tư vấn chung",
      message: c.message || "",
      status: c.status === "PENDING" ? "Chờ xử lý" : c.status === "CALLED" ? "Đã gọi" : "Đã chốt",
    });

    row.height = 25; // Giãn dòng

    // Căn chỉnh các ô dữ liệu
    row.eachCell((cell, colNumber) => {
      cell.alignment = { 
        vertical: "middle", 
        // Căn giữa cho Ngày gửi (1), SĐT (3), Nhu cầu (5), Trạng thái (7)
        horizontal: [1, 3, 5, 7].includes(colNumber) ? "center" : "left",
        wrapText: colNumber === 6 // Tự động xuống dòng cho Lời nhắn
      };
      cell.border = {
        top: { style: "thin", color: { argb: "FFDDDDDD" } },
        left: { style: "thin", color: { argb: "FFDDDDDD" } },
        bottom: { style: "thin", color: { argb: "FFDDDDDD" } },
        right: { style: "thin", color: { argb: "FFDDDDDD" } },
      };
    });
  });

  // 8. Xuất file trả về cho trình duyệt
  const buffer = await workbook.xlsx.writeBuffer();

  return new Response(buffer as BodyInit, {
    headers: {
      "Content-Disposition": 'attachment; filename="DanhSachKhachHang.xlsx"',
      "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    },
  });
}