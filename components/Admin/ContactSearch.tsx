// components/Admin/ContactSearch.tsx
"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { FaSearch } from "react-icons/fa";

export default function ContactSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const timeoutId = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleSearch = (term: string) => {
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      params.set("page", "1"); // Về trang 1 khi tìm kiếm mới

      if (term) {
        params.set("query", term);
      } else {
        params.delete("query");
      }

      router.replace(`${pathname}?${params.toString()}`);
    }, 500); // Đợi 500ms sau khi gõ xong mới tìm để tránh giật lag
  };

  return (
    <div className="relative group">
      <input
        type="text"
        placeholder="Tìm kiếm tên, sđt, email..."
        defaultValue={searchParams.get("query")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        className="pl-9 pr-4 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white outline-none w-48 md:w-64 transition-all"
      />
      <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
    </div>
  );
}
