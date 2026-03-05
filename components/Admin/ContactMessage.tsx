// components/Admin/ContactMessage.tsx
"use client";

import { useState } from "react";
import { FaTimes, FaEye } from "react-icons/fa";

export default function ContactMessage({
  message,
}: {
  message: string | null;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const displayMessage = message || "Không có nội dung";

  // Nếu không có nội dung thì hiện mờ
  if (displayMessage === "Không có nội dung") {
    return <p className="text-gray-400 italic text-sm">{displayMessage}</p>;
  }

  // Nếu nội dung ngắn (dưới 30 ký tự) thì hiện luôn, khỏi cần nút bấm
  if (displayMessage.length <= 30) {
    return (
      <p className="text-gray-600 dark:text-gray-300 text-sm italic">
        {displayMessage}
      </p>
    );
  }

  return (
    <>
      {/* PHẦN HIỂN THỊ TRONG BẢNG */}
      <div className="flex items-center gap-2">
        <p className="truncate max-w-30 sm:max-w-50 text-gray-500 italic text-sm">
          {displayMessage}
        </p>
        <button
          onClick={() => setIsOpen(true)}
          className="text-blue-500 hover:text-blue-700 p-1.5 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors shrink-0"
          title="Xem chi tiết"
        >
          <FaEye size={14} />
        </button>
      </div>

      {/* POPUP (MODAL) HIỂN THỊ FULL NỘI DUNG */}
      {isOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)} // Bấm ra ngoài nền đen sẽ đóng
        >
          <div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-lg flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Ngăn không cho sự kiện click lan ra nền đen
          >
            {/* Header Modal */}
            <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">
                Nội dung lời nhắn
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg p-2 transition-colors"
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Body Modal */}
            <div className="p-6 max-h-[60vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
              <p className="text-gray-700 dark:text-gray-200 whitespace-pre-wrap text-sm leading-relaxed">
                {displayMessage}
              </p>
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end bg-gray-50 dark:bg-gray-800/50">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-white rounded-lg text-sm font-semibold transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
