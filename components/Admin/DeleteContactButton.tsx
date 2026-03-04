// components/Admin/DeleteContactButton.tsx
"use client";

import { useState, useTransition } from "react";
import { FaTrash, FaExclamationTriangle } from "react-icons/fa";
import { toast } from "sonner";
import { deleteContact } from "@/app/actions/contact"; // Gọi Server Action thay vì Fetch API

export default function DeleteContactButton({ id }: { id: string }) {
  const [isOpen, setIsOpen] = useState(false);

  // Dùng useTransition để xử lý trạng thái loading của Server Action
  const [isPending, startTransition] = useTransition();

  // Hàm gọi Server Action để xóa
  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteContact(id);

      if (result.success) {
        toast.success("Đã xóa liên hệ thành công!");
        setIsOpen(false);
        // Không cần router.refresh() vì revalidatePath trong action đã làm việc đó rồi
      } else {
        toast.error(result.error || "Có lỗi xảy ra khi xóa.");
      }
    });
  };

  // Ngăn chặn sự kiện nổi bọt khi bấm nút xóa (tránh click nhầm vào các link xung quanh nếu có)
  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      {/* 1. NÚT THÙNG RÁC */}
      <button
        onClick={handleOpen}
        disabled={isPending} // Khóa nút khi đang load
        className="p-2 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed"
        title="Xóa liên hệ"
      >
        <FaTrash size={16} />
      </button>

      {/* 2. MODAL POPUP (Chỉ render khi isOpen = true) */}
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          {/* Lớp nền tối (Backdrop) */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => !isPending && setIsOpen(false)}
          ></div>

          {/* Hộp thoại chính */}
          <div
            className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Ngăn click trong hộp thoại bị đóng modal
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
                Thông tin liên hệ này sẽ bị xóa vĩnh viễn và <br />
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
                disabled={isPending}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 hover:cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                onClick={handleDelete}
                disabled={isPending}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:cursor-pointer"
              >
                {isPending ? (
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
