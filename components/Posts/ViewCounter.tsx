"use client";

import { useEffect } from "react";

export default function ViewCounter({ postId }: { postId: string }) {
  useEffect(() => {
    // 1. Kiểm tra trong Session Storage (F5 sẽ không mất, tắt tab mới mất)
    const viewedKey = `viewed_${postId}`;
    const hasViewed = sessionStorage.getItem(viewedKey);

    if (!hasViewed) {
      // 2. Nếu chưa xem -> Gọi API tăng view
      fetch("/api/posts/view", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId }),
      });

      // 3. Đánh dấu là đã xem
      sessionStorage.setItem(viewedKey, "true");
    }
  }, [postId]);

  return null; // Component này tàng hình, không hiện gì cả
}
