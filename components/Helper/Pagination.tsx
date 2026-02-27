"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Lấy trang hiện tại từ URL, mặc định là 1
  const currentPage = Number(searchParams.get("page")) || 1;

  // Hàm tạo URL khi chuyển trang
  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  // Hàm xử lý hiển thị số trang (Logic rút gọn: 1 2 ... 5 6)
  const generatePagination = () => {
    // Nếu tổng trang ít (<= 7), hiện hết
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // Logic hiển thị dấu "..." nếu trang quá dài (Nâng cao)
    // Hiện tại để đơn giản cho sếp, mình hiển thị kiểu rút gọn cơ bản:
    // Luôn hiện trang đầu, trang cuối, và trang hiện tại +- 1
    if (currentPage <= 3) {
      return [1, 2, 3, "...", totalPages];
    }
    if (currentPage >= totalPages - 2) {
      return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    }
    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const allPages = generatePagination();

  return (
    <div className="flex items-center justify-center gap-2">
      {/* NÚT PREVIOUS */}
      <button
        className={`p-2 rounded-lg border transition-all ${
          currentPage <= 1
            ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 cursor-pointer"
        }`}
        disabled={currentPage <= 1}
        onClick={() => router.push(createPageURL(currentPage - 1))}
      >
        <FaChevronLeft size={14} />
      </button>

      {/* DANH SÁCH SỐ TRANG */}
      <div className="flex items-center gap-1">
        {allPages.map((page, index) => {
          if (page === "...") {
            return (
              <span key={index} className="px-2 text-gray-400 text-sm">
                ...
              </span>
            );
          }

          const isActive = page === currentPage;
          return (
            <button
              key={index}
              onClick={() => router.push(createPageURL(page))}
              className={`min-w-9 h-9 px-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/30 border border-blue-600"
                  : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>

      {/* NÚT NEXT */}
      <button
        className={`p-2 rounded-lg border transition-all ${
          currentPage >= totalPages
            ? "border-gray-100 text-gray-300 cursor-not-allowed"
            : "border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-600 cursor-pointer"
        }`}
        disabled={currentPage >= totalPages}
        onClick={() => router.push(createPageURL(currentPage + 1))}
      >
        <FaChevronRight size={14} />
      </button>
    </div>
  );
}
