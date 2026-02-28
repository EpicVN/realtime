"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaPlus,
  FaUserShield,
  FaTimes,
  FaCheck,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";
import { toast } from "sonner";
import { PERMISSIONS } from "@/lib/permissions";

// Định nghĩa kiểu dữ liệu User
type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
  createdAt: string;
};

export default function AdminUsersPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  // State cho Modal Tạo/Sửa
  const [showModal, setShowModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  // --- NEW: State cho Modal Xóa ---
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // State form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
    permissions: [] as string[],
  });

  // --- 1. LOGIC BẢO VỆ & FETCH DATA ---
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (!storedRole) {
      toast.error("Vui lòng đăng nhập lại!");
      router.push("/admin");
      return;
    }
    if (storedRole !== "SUPER_ADMIN") {
      toast.error("⛔ Bạn không có quyền truy cập khu vực này!");
      router.replace("/admin");
      return;
    }

    fetchUsers();
  }, [router]);

  const fetchUsers = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
        toast.error("Lỗi tải danh sách");
      });
  };

  // --- 2. CÁC HÀM MỞ MODAL ---
  const openCreateModal = () => {
    setEditingUser(null);
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "ADMIN",
      permissions: [],
    });
    setShowModal(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name || "",
      email: user.email || "",
      password: "",
      role: user.role,
      permissions: user.permissions || [],
    });
    setShowModal(true);
  };

  // --- NEW: Hàm mở Modal Xóa ---
  const openDeleteConfirm = (user: User) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

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

  // --- 3. SUBMIT TẠO/SỬA ---
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
      let res;
      if (editingUser) {
        res = await fetch(`/api/users/${editingUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch("/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      if (res.ok) {
        toast.success(
          editingUser ? "Cập nhật thành công!" : "Tạo nhân viên thành công!",
        );
        setShowModal(false);
        fetchUsers();
      } else {
        const errorData = await res.json();
        toast.error(errorData.error || "Có lỗi xảy ra");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Lỗi kết nối");
    } finally {
      setSubmitting(false);
    }
  };

  // --- 4. XỬ LÝ XÓA THẬT (Khi bấm nút trong Modal) ---
  const confirmDelete = async () => {
    if (!userToDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/users/${userToDelete.id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        toast.success(`Đã xóa nhân viên ${userToDelete.name}`);
        // Cập nhật UI ngay lập tức (không cần fetch lại)
        setUsers(users.filter((u) => u.id !== userToDelete.id));
        setShowDeleteModal(false);
        setUserToDelete(null);
      } else {
        toast.error("Lỗi khi xóa");
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Lỗi kết nối");
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-600"></div>
        <p className="text-gray-500 font-medium animate-pulse">
          Đang tải dữ liệu...
        </p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Quản lý Nhân viên</h1>
        <button
          onClick={openCreateModal}
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center gap-2 font-medium text-sm transition-all"
        >
          <FaPlus /> Tạo tài khoản mới
        </button>
      </div>

      {/* Table Danh sách */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-semibold">
            <tr>
              <th className="p-4">Tên nhân viên</th>
              <th className="p-4">Email</th>
              <th className="p-4">Vai trò</th>
              <th className="p-4">Quyền hạn</th>
              <th className="p-4 text-center">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
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
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="p-4 font-medium text-gray-800">{user.name}</td>
                  <td className="p-4 text-gray-600">{user.email}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-bold ${user.role === "SUPER_ADMIN" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    {user.role === "SUPER_ADMIN" ? (
                      <span className="text-xs text-gray-400 italic">
                        Toàn quyền hệ thống
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1">
                        {user.permissions.length > 0 ? (
                          user.permissions.map((p) => (
                            <span
                              key={p}
                              className="px-1.5 py-0.5 border border-gray-200 rounded text-[10px] text-gray-500 bg-gray-50"
                            >
                              {p === PERMISSIONS.MANAGE_POSTS
                                ? "QL Bài viết"
                                : p === PERMISSIONS.VIEW_LEADS
                                  ? "Khách hàng"
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
                        className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors hover:cursor-pointer"
                        title="Chỉnh sửa"
                      >
                        <FaEdit />
                      </button>
                      {/* Nút xóa kích hoạt Modal */}
                      <button
                        onClick={() => openDeleteConfirm(user)}
                        className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-100 transition-colors hover:cursor-pointer"
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

      {/* --- MODAL TẠO/SỬA --- */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800 flex items-center gap-2">
                <FaUserShield className="text-blue-600" />
                {editingUser ? "Cập nhật thông tin" : "Cấp tài khoản mới"}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <FaTimes size={20} />
              </button>
            </div>
            {/* ... (Phần nội dung Form giữ nguyên như cũ) ... */}
            <div className="p-6 space-y-4">
              {/* (Sếp copy lại phần input form ở code cũ vào đây nhé, em rút gọn để tập trung vào phần xóa) */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Họ và tên
                  </label>
                  <input
                    type="text"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {editingUser ? "Mật khẩu mới" : "Mật khẩu"}
                  </label>
                  <input
                    type="password"
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vai trò
                  </label>
                  <select
                    className="w-full border rounded-lg p-2.5 focus:ring-2 focus:ring-blue-500 outline-none bg-white"
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
                <div className="pt-4 border-t border-gray-100">
                  <label className="block text-sm font-bold text-gray-700 mb-3">
                    Phân quyền:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div
                      onClick={() => togglePermission(PERMISSIONS.MANAGE_POSTS)}
                      className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 ${formData.permissions.includes(PERMISSIONS.MANAGE_POSTS) ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${formData.permissions.includes(PERMISSIONS.MANAGE_POSTS) ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}
                      >
                        {formData.permissions.includes(
                          PERMISSIONS.MANAGE_POSTS,
                        ) && <FaCheck size={12} />}
                      </div>
                      <span className="text-sm">Quản lý Bài viết</span>
                    </div>
                    <div
                      onClick={() => togglePermission(PERMISSIONS.VIEW_LEADS)}
                      className={`cursor-pointer border rounded-lg p-3 flex items-center gap-3 ${formData.permissions.includes(PERMISSIONS.VIEW_LEADS) ? "border-green-500 bg-green-50 text-green-700" : "border-gray-200"}`}
                    >
                      <div
                        className={`w-5 h-5 rounded border flex items-center justify-center ${formData.permissions.includes(PERMISSIONS.VIEW_LEADS) ? "bg-green-500 border-green-500 text-white" : "border-gray-300"}`}
                      >
                        {formData.permissions.includes(
                          PERMISSIONS.VIEW_LEADS,
                        ) && <FaCheck size={12} />}
                      </div>
                      <span className="text-sm">Xem Khách hàng</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg shadow-blue-500/30 transition-all disabled:opacity-50 flex items-center gap-2"
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
      )}

      {/* --- NEW: MODAL XÓA (Giao diện giống DeletePostButton) --- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !isDeleting && setShowDeleteModal(false)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 mb-6">
                <FaExclamationTriangle className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Xóa nhân viên?
              </h3>
              <p className="text-sm text-gray-500">
                Bạn có chắc chắn muốn xóa nhân viên <br />
                <span className="font-bold text-gray-800">
                  {userToDelete?.name}
                </span>
                ? <br />
                Hành động này{" "}
                <span className="font-bold text-red-500">
                  không thể hoàn tác
                </span>
                .
              </p>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-center border-t border-gray-100">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 text-sm font-bold text-white bg-red-600 rounded-xl hover:bg-red-700 shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2"
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
      )}
    </div>
  );
}
