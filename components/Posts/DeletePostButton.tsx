"use client";

import { useState } from "react";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeletePostButton({ id }: { id: number | string }) {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hàm gọi API xóa
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Đã xóa bài viết thành công!");
        setIsOpen(false);
        router.refresh();
      } else {
        const data = await res.json();
        toast.error(data.error || "Có lỗi xảy ra khi xóa.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối máy chủ.");
    } finally {
      setLoading(false);
    }
  };

  // Ngăn chặn sự kiện nổi bọt khi bấm nút xóa
  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault(); // Ngăn việc thẻ cha là Link/a
    e.stopPropagation(); // Ngăn việc thẻ cha có onClick
    setIsOpen(true);
  };

  return (
    <>
      {/* 1. NÚT THÙNG RÁC */}
      <button
        onClick={handleOpen}
        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 rounded-lg transition-all duration-200"
        title="Xóa bài viết"
      >
        <FaTrash size={16} />
      </button>

      {/* 2. MODAL POPUP (Chỉ render khi isOpen = true) */}
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Lớp nền tối (Backdrop) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => !loading && setIsOpen(false)}
          ></div>

          {/* Hộp thoại chính */}
          <div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
            // Ngăn click trong hộp thoại bị đóng modal
            onClick={(e) => e.stopPropagation()}
          >
            {/* Nội dung */}
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
                <FaExclamationTriangle className="h-8 w-8 text-red-600 dark:text-red-500" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                Xác nhận xóa?
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Bài viết sẽ bị xóa vĩnh viễn và <br />
                <span className="font-bold text-red-500">
                  không thể khôi phục
                </span>
                .
              </p>
            </div>

            {/* Footer buttons */}
            <div className="bg-gray-50 dark:bg-gray-700/50 px-6 py-4 flex gap-3 justify-center border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                Hủy bỏ
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  "Xóa ngay"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
