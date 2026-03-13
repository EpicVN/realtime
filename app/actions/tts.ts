"use server";

export async function createSpeech(formData: FormData) {
  const text = formData.get("text") as string;
  const voice = formData.get("voice") as string; // 'ngochuyen' | 'chieuthanh'

  if (!text) return { error: "Vui lòng nhập nội dung" };

  const uniqueId = `realtime_sound_${Date.now()}_${Math.floor(Math.random() * 1000000)}`;

  // 1. Tạo chuỗi JSON đúng chuẩn mẫu yêu cầu
  const payload = {
    company_id: 12,
    lang: voice, // Giọng đọc (ngochuyen, chieuthanh...)
    style: "callbot", // Style đọc
    debug: "false", // Set false cho gọn response
    voice: "sam", // Tham số phụ bắt buộc
    data: {
      [uniqueId]: text,
    },
  };

  try {
    // 2. Cấu hình gửi POST
    //const apiUrl = "http://127.0.0.1:8086/api/tts-create-speak.php";
    //const apiUrl = "http://109.237.69.136:8086/api/tts-create-speak.php";
    const apiUrl = "http://103.154.176.65:8086/api/tts-create-speak.php";

    console.log("🚀 Đang gửi POST tới:", apiUrl);
    console.log("📦 Payload:", JSON.stringify(payload));

    const res = await fetch(apiUrl, {
      method: "POST", // BẮT BUỘC LÀ POST
      headers: {
        "Content-Type": "application/json", // Báo cho server biết mình gửi JSON
      },
      body: JSON.stringify(payload),
    });

    // 3. Xử lý phản hồi
    if (!res.ok) {
      const errText = await res.text();
      console.error("❌ Lỗi Server:", res.status, errText);
      return {
        error: `Lỗi Server API (${res.status}): ${errText.substring(0, 50)}...`,
      };
    }

    const data = await res.json();
    console.log("✅ Server trả về:", data);

    /// 1. Kiểm tra xem có key "html_data" không
    if (data.html_data) {
      try {
        const parsedInner = JSON.parse(data.html_data);

        if (Array.isArray(parsedInner) && parsedInner.length > 0) {
          const item = parsedInner[0];

          if (item[uniqueId]) {
            const fullUrl = item[uniqueId];
            // Cắt lấy tên file: "realtime_sound_177060888.wav"
            const filename = fullUrl.split("/").pop();
            return { success: true, filename: filename };
          }
        }
      } catch (parseError) {
        console.error("Lỗi parse html_data:", parseError);
        return { error: "Lỗi định dạng dữ liệu" };
      }
    }

    return {
      error: "API thành công nhưng không tìm thấy link Audio trong phản hồi",
    };
  } catch (error) {
    console.error("TTS System Error:", error);
    return {
      error: "Lỗi kết nối đến hệ thống TTS (Vui lòng kiểm tra IP Whitelist)",
    };
  }
}