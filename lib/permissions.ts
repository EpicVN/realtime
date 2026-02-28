// lib/permissions.ts

export const PERMISSIONS = {
  MANAGE_POSTS: "manage_posts", // Viết, sửa, xóa bài viết
  VIEW_LEADS: "view_leads", // Xem danh sách khách hàng
  MANAGE_SETTINGS: "manage_settings", // Chỉnh sửa thông tin web (sau này)
  MANAGE_USERS: "manage_users", // Quản lý nhân viên (chỉ Super Admin hoặc HR)
};

// Hàm helper để check quyền (Dùng ở Frontend)
export const hasPermission = (
  userPermissions: string[],
  permission: string,
) => {
  return userPermissions.includes(permission);
};
