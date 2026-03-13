"use server";

export async function createSpeech(formData: FormData) {
  const text = formData.get("text") as string;
  const voice = formData.get("voice") as string; // 'ngochuyen' | 'chieuthanh'

  if (!text) return { error: "Vui lòng nhập nội dung" };

  const uniqueId = `realtime_sound_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

  // 1. Tạo chuỗi JSON đúng chuẩn mẫu yêu cầu
  const payload = {
    company_id: 12,
    lang: voice,
    style: "callbot",
    debug: "false",
    voice: "sam",
    data: {
      [uniqueId]: text,
    },
  };

  try {
    // 2. Cấu hình gửi POST
    const apiUrl = "http://103.154.176.65:8086/api/tts-create-speak.php";

    console.log("🚀 Đang gửi POST tới:", apiUrl);
    console.log("📦 Payload:", JSON.stringify(payload));

    const res = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    // 3. Xử lý phản hồi (BẮT LỖI HTML Ở ĐÂY)
    const rawText = await res.text(); // Đọc ra dạng Text trước để tránh sập server

    if (!res.ok) {
      console.error("❌ Lỗi Server:", res.status, rawText);
      return {
        error: `Lỗi Server API (${res.status}): ${rawText.substring(0, 50)}...`,
      };
    }

    // Cố gắng ép Text thành JSON
    let data;
    try {
      data = JSON.parse(rawText);
      console.log("✅ Server trả về:", data);
    } catch (parseError) {
      console.error(
        "❌ API KHÔNG TRẢ VỀ JSON! Nội dung thực tế:",
        rawText.substring(0, 200),
      );
      return {
        error:
          "Hệ thống TTS phản hồi sai định dạng (Có thể bị chặn bởi Tường lửa). Vui lòng báo Admin.",
      };
    }

    // 4. Kiểm tra xem có key "html_data" không
    if (data.html_data) {
      try {
        const parsedInner = JSON.parse(data.html_data);

        if (Array.isArray(parsedInner) && parsedInner.length > 0) {
          const item = parsedInner[0];

          if (item[uniqueId]) {
            const fullUrl = item[uniqueId];
            const filename = fullUrl.split("/").pop();
            return { success: true, filename: filename };
          }
        }
      } catch (parseError) {
        console.error("Lỗi parse html_data:", parseError);
        return { error: "Lỗi định dạng dữ liệu bên trong phản hồi" };
      }
    }

    return {
      error: "API thành công nhưng không tìm thấy link Audio trong phản hồi",
    };
  } catch (error) {
    console.error("TTS System Error:", error);
    return {
      error: "Lỗi kết nối đến hệ thống TTS. Server API có thể đang tắt.",
    };
  }
}
