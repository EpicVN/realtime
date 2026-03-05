// app/admin/posts/create/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth"; 
import { PERMISSIONS, hasPermission } from "@/lib/permissions";
import CreatePostClient from "./CreatePostClient"; // Nhúng cái ruột Form vào

interface User {
  role: string;
  permissions?: string[];
}

export default async function CreatePostPage() {
  // 1. Kiểm tra phiên đăng nhập
  const session = await auth();

  if (!session || !session.user) {
    redirect("/admin");
  }

  // 2. Lấy thông tin quyền
  const role = (session.user as User).role;
  const permissions = (session.user as User).permissions || [];

  // 3. Kiểm tra quyền "Quản lý bài viết"
  const canManagePosts = 
    role === "SUPER_ADMIN" || 
    hasPermission(permissions, PERMISSIONS.MANAGE_POSTS);

  // 4. Đuổi về trang chủ nếu không có quyền
  if (!canManagePosts) {
    redirect("/admin");
  }

  // 5. Qua được bảo vệ -> Hiển thị form tạo bài viết
  return <CreatePostClient />;
}