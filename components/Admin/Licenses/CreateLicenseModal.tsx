"use client";

import { useState, useTransition } from "react";
import { FaPlus, FaTimes } from "react-icons/fa";
import { createBulkLicensesAction } from "@/app/actions/license";
import { toast } from "sonner";

export default function CreateLicenseModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createBulkLicensesAction(formData);
      if (res.success) {
        toast.success(res.message);
        setIsOpen(false); // Đóng modal khi thành công
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <>
      {/* NÚT BẤM BÊN NGOÀI */}
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg text-sm font-medium shadow-sm whitespace-nowrap transition-colors"
      >
        <FaPlus /> <span className="hidden sm:inline">Tạo Key Mới</span>
      </button>

      {/* MODAL (POPUP) BÊN TRONG */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-md overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h2 className="text-lg font-bold text-gray-800 dark:text-white">
                Khởi tạo License Key
              </h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-red-500"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Tên Doanh Nghiệp / Khách Hàng *
                </label>
                <input
                  type="text"
                  name="companyName"
                  required
                  placeholder="VD: Công ty Luật Hoàng Kim"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Nếu tên đã tồn tại, Key sẽ được gộp chung vào công ty cũ.
                </p>
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Số lượng Key *
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    max="100"
                    defaultValue="1"
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Hạn sử dụng
                  </label>
                  <input
                    type="date"
                    name="expiresAt"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {isPending ? "Đang tạo..." : "Xác nhận tạo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
