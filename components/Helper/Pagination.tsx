"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Lấy trang hiện tại từ URL (ví dụ: ?page=2), mặc định là 1
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    // Giữ lại các params khác (ví dụ search) nếu có
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (direction: "prev" | "next") => {
    if (direction === "prev" && currentPage > 1) {
      router.push(createPageURL(currentPage - 1));
    }
    if (direction === "next" && currentPage < totalPages) {
      router.push(createPageURL(currentPage + 1));
    }
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-500 dark:text-gray-400">
        Trang <span className="font-bold text-gray-900 dark:text-white">{currentPage}</span> / {totalPages}
      </span>

      <div className="flex gap-2">
        <button
          onClick={() => handlePageChange("prev")}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 text-xs font-medium border rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Trước
        </button>
        
        <button
          onClick={() => handlePageChange("next")}
          disabled={currentPage >= totalPages}
          className="px-3 py-1.5 text-xs font-medium border rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Sau
        </button>
      </div>
    </div>
  );
}