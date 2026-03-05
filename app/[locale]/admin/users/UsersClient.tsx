// app/admin/users/UsersClient.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { PERMISSIONS } from "@/lib/permissions";
import UserFormModal, { User } from "@/components/Admin/Users/UserFormModal";
import UserDeleteModal from "@/components/Admin/Users/UserDeleteModal";

export default function UsersClient({
  initialUsers,
}: {
  initialUsers: User[];
}) {
  const router = useRouter();
  const [users, setUsers] = useState<User[]>(initialUsers);

  // Đồng bộ với Server khi có thay đổi
  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  // State quản lý việc đóng mở Modal
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  // Hàm mở Modal
  const openCreateModal = () => {
    setEditingUser(null);
    setIsFormOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setIsFormOpen(true);
  };

  const openDeleteConfirm = (user: User) => {
    setUserToDelete(user);
    setIsDeleteOpen(true);
  };

  return (
    <div>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý Nhân viên
        </h1>
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 font-medium text-sm transition-all hover:cursor-pointer"
        >
          <FaPlus /> Tạo tài khoản mới
        </button>
      </div>

      {/* BẢNG DANH SÁCH */}
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100 dark:border-gray-600">
            <tr>
              <th className="p-4">Tên nhân viên</th>
              <th className="p-4">Email</th>
              <th className="p-4">Vai trò</th>
              <th className="p-4">Quyền hạn</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {users.length === 0 ? (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-400">
                  Chưa có nhân viên nào.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="hover:bg-blue-50/50 dark:hover:bg-blue-900/10 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-800 dark:text-white">
                    {user.name}
                  </td>
                  <td className="p-4 text-gray-600 dark:text-gray-300">
                    {user.email}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${
                        user.role === "SUPER_ADMIN"
                          ? "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                          : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.role === "SUPER_ADMIN" ? (
                      <span className="text-xs text-gray-400 dark:text-gray-500 italic">
                        Toàn quyền hệ thống
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.length > 0 ? (
                          user.permissions.map((p) => (
                            <span
                              key={p}
                              className="px-1.5 py-0.5 border border-gray-200 dark:border-gray-600 rounded text-[10px] text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800"
                            >
                              {p === PERMISSIONS.MANAGE_POSTS
                                ? "QL Bài viết"
                                : p === PERMISSIONS.VIEW_LEADS
                                  ? "Khách hàng"
                                  : p === PERMISSIONS.MANAGE_SETTINGS
                                    ? "Cấu hình"
                                    : p}
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-red-400">
                            Chưa cấp quyền
                          </span>
                        )}
                      </div>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => openEditModal(user)}
                        className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors hover:cursor-pointer"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(user)}
                        className="p-2 bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400 rounded hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors hover:cursor-pointer"
                        title="Xóa nhân viên"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* NHÚNG 2 COMPONENT MODAL VÀO ĐÂY */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingUser={editingUser}
        onSuccess={() => router.refresh()} // Báo Server cập nhật DB
      />

      <UserDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        userToDelete={userToDelete}
        onSuccess={(deletedId) => {
          // Xóa trên giao diện tức thì cho mượt, đồng thời gọi router.refresh() ngầm
          setUsers((prev) => prev.filter((u) => u.id !== deletedId));
          router.refresh();
        }}
      />
    </div>
  );
}
