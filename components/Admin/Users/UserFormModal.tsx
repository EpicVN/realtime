// app/admin/users/UserFormModal.tsx
"use client";

import { useState, useEffect } from "react";
import { FaUserShield, FaTimes, FaCheck } from "react-icons/fa";
import { toast } from "sonner";
import { PERMISSIONS } from "@/lib/permissions";

// Khai báo type
export type User = {
  id: string;
  name: string | null;
  email: string;
  role: string;
  permissions: string[];
  createdAt: string;
};

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  editingUser: User | null;
  onSuccess: () => void; // Hàm gọi lại để báo cho cha biết đã làm xong
}

export default function UserFormModal({
  isOpen,
  onClose,
  editingUser,
  onSuccess,
}: UserFormModalProps) {
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    permissions: [] as string[],
  });

  // Tự động điền data khi mở Modal
  useEffect(() => {
    if (isOpen) {
      if (editingUser) {
        setFormData({
          name: editingUser.name || "",
          email: editingUser.email || "",
          password: "", // Không hiển thị pass cũ
          role: editingUser.role,
          permissions: editingUser.permissions || [],
        });
      } else {
        // Reset form nếu là tạo mới
        setFormData({
          name: "",
          email: "",
          password: "",
          role: "ADMIN",
          permissions: [],
        });
      }
    }
  }, [isOpen, editingUser]);

  const togglePermission = (perm: string) => {
    setFormData((prev) => {
      const exists = prev.permissions.includes(perm);
      if (exists) {
        return {
          ...prev,
          permissions: prev.permissions.filter((p) => p !== perm),
        };
      } else {
        return { ...prev, permissions: [...prev.permissions, perm] };
      }
    });
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      toast.error("Tên và Email là bắt buộc!");
      return;
    }
    if (!editingUser && !formData.password) {
      toast.error("Vui lòng nhập mật khẩu cho nhân viên mới!");
      return;
    }

    setSubmitting(true);
    try {
      const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";
      const method = editingUser ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(
          editingUser ? "Cập nhật thành công!" : "Tạo nhân viên thành công!",
        );
        onSuccess(); // Báo cho Component cha (UsersClient) để làm mới dữ liệu
        onClose(); // Đóng Modal
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Có lỗi xảy ra");
      }
    } catch (error) {
      console.error(error);
      toast.error("Lỗi kết nối server");
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-gray-100 dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-800">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white flex items-center gap-2">
            <FaUserShield className="text-blue-600 dark:text-blue-400" />
            {editingUser ? "Cập nhật thông tin" : "Cấp tài khoản mới"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors hover:cursor-pointer"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {editingUser ? "Mật khẩu mới" : "Mật khẩu"}
              </label>
              <input
                type="password"
                className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Vai trò
              </label>
              <select
                className="w-full border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none transition-colors"
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
              >
                <option value="ADMIN">Nhân viên (Admin)</option>
                <option value="SUPER_ADMIN">
                  Quản trị cấp cao (Super Admin)
                </option>
              </select>
            </div>
          </div>

          {formData.role === "ADMIN" && (
            <div className="pt-4 border-t border-gray-100 dark:border-gray-700">
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3">
                Phân quyền:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Lặp qua các quyền cơ bản (Sếp có thể map() mảng thay vì code tay nếu muốn) */}
                {[
                  { id: PERMISSIONS.MANAGE_POSTS, label: "Quản lý Bài viết" },
                  { id: PERMISSIONS.VIEW_LEADS, label: "Xem Khách hàng" },
                  {
                    id:
                      (PERMISSIONS as Record<string, string>).MANAGE_SETTINGS || "MANAGE_SETTINGS",
                    label: "Cấu hình thông tin",
                  },
                ].map((perm) => (
                  <div
                    key={perm.id}
                    onClick={() => togglePermission(perm.id)}
                    className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 transition-colors ${
                      formData.permissions.includes(perm.id)
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                        : "border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        formData.permissions.includes(perm.id)
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 dark:border-gray-500 bg-white dark:bg-gray-800"
                      }`}
                    >
                      {formData.permissions.includes(perm.id) && (
                        <FaCheck size={12} />
                      )}
                    </div>
                    <span className="text-sm">{perm.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800/80 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors hover:cursor-pointer"
          >
            Hủy bỏ
          </button>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2 hover:cursor-pointer disabled:hover:cursor-not-allowed"
          >
            {submitting && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
            )}
            {submitting
              ? "Đang xử lý..."
              : editingUser
                ? "Lưu thay đổi"
                : "Tạo mới"}
          </button>
        </div>
      </div>
    </div>
  );
}
