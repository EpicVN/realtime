"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useTransition, useState, useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function CompanySearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Khởi tạo giá trị từ URL
  const [inputValue, setInputValue] = useState(searchParams.get("query") || "");

  // Dùng useRef để giữ bộ đếm thời gian (Không gây re-render như useState/useEffect)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearchChange = (value: string) => {
    // 1. Cập nhật chữ trên ô input ngay lập tức để sếp thấy chữ gõ ra mượt mà
    setInputValue(value);

    // 2. Hủy bộ đếm cũ nếu sếp vẫn đang gõ liên tục
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // 3. Đặt bộ đếm mới: Đợi đúng 500ms sau khi ngừng gõ mới đẩy URL
    timeoutRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (value) {
        params.set("query", value);
      } else {
        params.delete("query");
      }

      // Xóa page để quay về trang 1
      params.delete("page");

      // Cập nhật thanh URL ngầm
      startTransition(() => {
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      });
    }, 500);
  };

  return (
    <div className="relative w-full md:w-1/3">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <FaSearch className="text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Tìm tên Công ty/Doanh nghiệp..."
        value={inputValue}
        onChange={(e) => handleSearchChange(e.target.value)} // Bắt thẳng sự kiện gõ phím ở đây
        className="w-full pl-10 pr-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-500 transition-shadow bg-white border-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
      />

      {/* Icon xoay xoay góc phải báo hiệu đang load */}
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}
