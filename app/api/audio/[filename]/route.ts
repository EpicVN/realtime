import { NextRequest, NextResponse } from "next/server";

// ⏱️ HÀM TẠO NHỊP THỞ (Chờ Server ghi file)
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 🔒 CẤU HÌNH BÍ MẬT (Chỉ Server biết)
const BACKEND_URL = "http://103.229.42.193:8086/files";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ filename: string }> }
) {
  const { filename } = await params;

  // Validate nhẹ: Chỉ cho phép file .wav
  if (!filename || !filename.endsWith(".wav")) {
    return new NextResponse("Invalid file type", { status: 400 });
  }

  try {
    const internalUrl = `${BACKEND_URL}/${filename}`;
    
    // 🔥 ĐIỂM CHỐT HẠ: Ép code nhịn lại 2 giây để Server gốc ghi xong file .wav 🔥
    console.log(`Đang chờ 2 giây để file ${filename} được ghi xong...`);
    await delay(2000);
    
    // Gọi sang Backend lấy dữ liệu (Có gắn cầu chì ngắt sau 30 giây để tránh treo Server)
    const response = await fetch(internalUrl, {
        signal: AbortSignal.timeout(30000) 
    });

    if (!response.ok) {
      return new NextResponse("Audio not found", { status: 404 });
    }

    // Thiết lập Headers trả về
    const headers = new Headers();
    headers.set("Content-Type", "audio/wav");
    headers.set("Cache-Control", "no-store, max-age=0"); 

    // 🔥 FIX LỖI THỜI GIAN: Forward Content-Length 🔥
    // Lấy kích thước file từ Server gốc và báo cho Trình duyệt biết
    const contentLength = response.headers.get("content-length");
    if (contentLength) {
      headers.set("Content-Length", contentLength);
    }

    return new NextResponse(response.body, {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error("Stream Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}