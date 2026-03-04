// components/Admin/ContactFilters.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FaSearch, FaFilter, FaRedo } from "react-icons/fa";

export default function ContactFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Lấy giá trị hiện tại từ URL để làm giá trị mặc định
  const [query, setQuery] = useState(searchParams.get("query") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "ALL");
  const [fromDate, setFromDate] = useState(searchParams.get("from") || "");
  const [toDate, setToDate] = useState(searchParams.get("to") || "");

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1"); // Đặt lại về trang 1

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
    router.replace(pathname); // Xóa hết params
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 mb-4 flex flex-col xl:flex-row gap-4">
      {/* Tìm kiếm */}
      <div className="relative flex-1 min-w-50">
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

      {/* Lọc trạng thái */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="py-2 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent outline-none dark:text-white hover:cursor-pointer"
      >
        <option value="ALL">Tất cả trạng thái</option>
        <option value="PENDING">Chờ xử lý</option>
        <option value="CALLED">Đã gọi</option>
        <option value="CLOSED">Đã xử lý</option>
      </select>

      {/* Lọc thời gian (Dùng datetime-local để gộp chung ngày và giờ cho gọn) */}
      <div className="flex items-center gap-2">
        <input
          type="datetime-local"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="py-2 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent outline-none dark:text-white w-40 hover:cursor-pointer"
          title="Từ ngày giờ"
        />
        <span className="text-gray-500">-</span>
        <input
          type="datetime-local"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="py-2 px-3 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-transparent outline-none dark:text-white w-40 hover:cursor-pointer"
          title="Đến ngày giờ"
        />
      </div>

      {/* Nút thao tác */}
      <div className="flex gap-2">
        <button
          onClick={handleFilter}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors hover:cursor-pointer"
        >
          <FaFilter /> Lọc
        </button>
        <button
          onClick={handleReset}
          className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200 px-3 py-2 rounded-lg text-sm font-medium shadow-sm transition-colors hover:cursor-pointer"
          title="Xóa bộ lọc"
        >
          <FaRedo />
        </button>
      </div>
    </div>
  );
}
