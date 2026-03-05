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

  useEffect(() => {
    setUsers(initialUsers);
  }, [initialUsers]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

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
    // THAY ĐỔI 1: Bọc flex-col và giới hạn chiều cao tổng (h-full)
    <div className="flex flex-col gap-4 h-full min-h-[70vh]">
      {/* --- HEADER --- */}
      {/* Dùng flex-col trên Mobile, sm:flex-row trên Desktop */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 shrink-0">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white">
          Quản lý Nhân viên
        </h1>
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 font-medium text-sm transition-all hover:cursor-pointer"
        >
          <FaPlus /> Tạo tài khoản mới
        </button>
      </div>

      {/* --- BẢNG DANH SÁCH --- */}
      {/* THAY ĐỔI 2: flex-1 và overflow-hidden ở khung ngoài */}
      <div className="bg-white dark:bg-gray-800 dark:border-gray-700 rounded-xl shadow-sm border border-gray-100 flex flex-col flex-1 overflow-hidden">
        {/* THAY ĐỔI 3: overflow-x-auto để cuộn ngang trên Mobile */}
        <div className="flex-1 overflow-x-auto overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
          {/* THAY ĐỔI 4: Ép min-w-[800px] để bảng không bị bóp méo chữ */}
          <table className="w-full text-left text-sm border-collapse table-fixed min-w-200">
            <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-200 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100 dark:border-gray-600 sticky top-0 z-10">
              <tr>
                <th className="p-4 w-[20%]">Tên nhân viên</th>
                <th className="p-4 w-[25%]">Email</th>
                <th className="p-4 w-[15%]">Vai trò</th>
                <th className="p-4 w-[25%]">Quyền hạn</th>
                <th className="p-4 w-[15%] text-center">Hành động</th>
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
                    <td
                      className="p-4 font-medium text-gray-800 dark:text-white truncate"
                      title={user.name || "No Name"}
                    >
                      {user.name}
                    </td>
                    <td
                      className="p-4 text-gray-600 dark:text-gray-300 truncate"
                      title={user.email}
                    >
                      {user.email}
                    </td>
                    <td className="p-4">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${
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
                        <span className="text-xs text-gray-400 dark:text-gray-500 italic whitespace-nowrap">
                          Toàn quyền hệ thống
                        </span>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {user.permissions.length > 0 ? (
                            user.permissions.map((p) => (
                              <span
                                key={p}
                                className="px-1.5 py-0.5 border border-gray-200 dark:border-gray-600 rounded text-[10px] text-gray-500 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 whitespace-nowrap"
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
                            <span className="text-xs text-red-400 whitespace-nowrap">
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
      </div>

      {/* --- MODALS --- */}
      <UserFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        editingUser={editingUser}
        onSuccess={() => router.refresh()}
      />

      <UserDeleteModal
        isOpen={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
        userToDelete={userToDelete}
        onSuccess={(deletedId) => {
          setUsers((prev) => prev.filter((u) => u.id !== deletedId));
          router.refresh();
        }}
      />
    </div>
  );
}
