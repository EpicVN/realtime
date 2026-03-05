// app/admin/users/UserDeleteModal.tsx
"use client";

import { useState } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { toast } from "sonner";
import { User } from "./UserFormModal"; // Dùng chung type User ở file kia

interface UserDeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  userToDelete: User | null;
  onSuccess: (deletedUserId: string) => void;
}

export default function UserDeleteModal({
  isOpen,
  onClose,
  userToDelete,
  onSuccess,
}: UserDeleteModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/users/${userToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success(`Đã xóa nhân viên ${userToDelete.name}`);
        onSuccess(userToDelete.id); // Báo về cho cha biết ID đã xóa
        onClose(); // Đóng Modal
      } else {
        toast.error("Lỗi khi xóa");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isOpen || !userToDelete) return null;

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={() => !isDeleting && onClose()}
      ></div>
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200 dark:bg-gray-800">
        <div className="p-6 text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
            <FaExclamationTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 dark:text-white">
            Xóa nhân viên?
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Bạn có chắc chắn muốn xóa nhân viên <br />
            <span className="font-bold text-gray-800 dark:text-white">
              {userToDelete.name}
            </span>
            ? <br />
            Hành động này{" "}
            <span className="font-bold text-red-500">không thể hoàn tác</span>.
          </p>
        </div>
        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-center border-t border-gray-100 dark:bg-gray-700/50 dark:border-gray-700">
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors disabled:opacity-50 hover:cursor-pointer disabled:hover:cursor-not-allowed"
          >
            Hủy bỏ
          </button>
          <button
            onClick={confirmDelete}
            disabled={isDeleting}
            className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2 hover:cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isDeleting ? (
              <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Xóa ngay"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
