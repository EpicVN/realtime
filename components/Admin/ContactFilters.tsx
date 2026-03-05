// components/Admin/ContactFilters.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";

export default function ContactFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "ALL");
  const [fromDate, setFromDate] = useState(searchParams.get("from") || "");
  const [toDate, setToDate] = useState(searchParams.get("to") || "");

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");

    if (query) params.set("query", query);
    else params.delete("query");
    if (status !== "ALL") params.set("status", status);
    else params.delete("status");
    if (fromDate) params.set("from", fromDate);
    else params.delete("from");
    if (toDate) params.set("to", toDate);
    else params.delete("to");

    router.replace(`${pathname}?${params.toString()}`);
  };

  const handleReset = () => {
    setQuery("");
    setStatus("ALL");
    setFromDate("");
    setToDate("");
    router.replace(pathname);
  };

  return (
    // THAY ĐỔI 1: Ép w-full cho khung ngoài cùng để nó không bao giờ vượt quá viền màn hình
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col xl:flex-row gap-4 w-full shrink-0">
      {/* --- CỤM 1: TÌM KIẾM & TRẠNG THÁI --- */}
      <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
        <div className="relative flex-1 w-full min-w-0">
          <input
            type="text"
            placeholder="Tìm tên, SĐT, Email..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent outline-none transition-all dark:text-white"
            onKeyDown={(e) => e.key === "Enter" && handleFilter()}
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full sm:w-auto py-2 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent outline-none dark:text-white hover:cursor-pointer dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors shrink-0"
        >
          <option value="ALL">Tất cả trạng thái</option>
          <option value="PENDING">Chờ xử lý</option>
          <option value="CALLED">Đã gọi</option>
          <option value="CLOSED">Đã xử lý</option>
        </select>
      </div>

      {/* --- CỤM 2: NGÀY THÁNG & NÚT THAO TÁC --- */}
      {/* Chuyển thành flex-col trên mobile (dọc) và sm:flex-row trên Tablet (ngang) */}
      <div className="flex flex-col sm:flex-row gap-4 w-full xl:w-auto shrink-0">
        {/* LỌC THỜI GIAN: ĐÂY LÀ CHỖ QUYẾT ĐỊNH */}
        {/* Dùng flex-col để ép 2 cái ngày nằm trên dưới trên Mobile, sm:flex-row để nằm ngang trên PC */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto">
          <input
            type="datetime-local"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent outline-none dark:text-white hover:cursor-pointer min-w-0"
            title="Từ ngày giờ"
          />

          {/* Dấu gạch ngang chỉ hiện trên giao diện ngang (Tablet/PC) */}
          <span className="hidden sm:inline text-gray-500 shrink-0 text-center">
            -
          </span>

          <input
            type="datetime-local"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="w-full sm:w-auto py-2 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent outline-none dark:text-white hover:cursor-pointer min-w-0"
            title="Đến ngày giờ"
          />
        </div>

        {/* NÚT THAO TÁC */}
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          <button
            onClick={handleFilter}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors hover:cursor-pointer"
          >
            <FaFilter /> Lọc
          </button>
          <button
            onClick={handleReset}
            className="flex-none flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors hover:cursor-pointer"
            title="Xóa bộ lọc"
          >
            <FaRedo />
          </button>
        </div>
      </div>
    </div>
  );
}
