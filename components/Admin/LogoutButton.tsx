"use client";

import { FaSignOutAlt } from "react-icons/fa";

type Props = {
  logoutAction: () => Promise<void>; // Hàm Server Action được truyền vào
};

export default function LogoutButton({ logoutAction }: Props) {
  const handleLogout = async () => {
    // 1. Dọn dẹp sạch sẽ tàn dư của hệ thống cũ trong LocalStorage
    if (typeof window !== "undefined") {
      localStorage.removeItem("userRole");
      localStorage.removeItem("userPermissions"); // <-- BỔ SUNG DÒNG NÀY ĐỂ QUÉT SẠCH
    }

    // 2. Gọi Server Action (NextAuth signOut) để xóa Cookie và đá về trang Login
    await logoutAction();
  };

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors border border-red-200 hover:cursor-pointer"
    >
      <FaSignOutAlt />
      Đăng xuất
    </button>
  );
}
