import { NextRequest, NextResponse } from "next/server";

// 🔒 CẤU HÌNH BÍ MẬT (Chỉ Server biết)
const BACKEND_URL = "http://109.237.69.136:8086/files";

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
    
    // Gọi sang Backend lấy dữ liệu
    const response = await fetch(internalUrl);

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