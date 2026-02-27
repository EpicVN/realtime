"use client";

import { useState } from "react";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Hoặc thư viện toast sếp đang dùng

export default function DeletePostButton({ id }: { id: number | string }) {
  const router = useRouter();

  // State quản lý việc Mở/Đóng Popup
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Hàm gọi API xóa thật
  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Đã xóa bài viết vĩnh viễn!");
        setIsOpen(false); // Đóng popup
        router.refresh(); // Refresh lại danh sách
      } else {
        toast.error("Có lỗi xảy ra khi xóa.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. NÚT THÙNG RÁC (Trigger) - Bấm vào thì mở Popup */}
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-red-600 hover:bg-red-100 rounded transition-colors"
        title="Xóa bài viết"
      >
        <FaTrash />
      </button>

      {/* 2. MODAL POPUP */}
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Lớp nền đen mờ (Backdrop) - Bấm ra ngoài thì đóng */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => !loading && setIsOpen(false)}
          ></div>

          {/* Hộp thoại chính (Dialog) */}
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
            {/* Nội dung cảnh báo */}
            <div className="p-6 text-center">
              {/* Icon cảnh báo màu đỏ */}
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-red-100 mb-5">
                <FaExclamationTriangle className="h-7 w-7 text-red-600" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Xóa bài viết này?
              </h3>
              <p className="text-sm text-gray-500 px-4">
                Hành động này{" "}
                <span className="font-bold text-red-500">
                  không thể hoàn tác
                </span>
                . Bài viết sẽ bị xóa vĩnh viễn khỏi hệ thống của bạn.
              </p>
            </div>

            {/* Các nút bấm (Footer) */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-center sm:justify-end border-t border-gray-100">
              <button
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200"
              >
                Hủy bỏ
              </button>

              <button
                onClick={handleDelete}
                disabled={loading}
                className="px-4 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg shadow-red-500/30 transition-all flex items-center gap-2 cursor-pointer disabled:cursor-not-allowed disabled:bg-red-400 disabled:hover:bg-red-400"
              >
                {loading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
                    Đang xóa...
                  </>
                ) : (
                  "Xóa vĩnh viễn"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
