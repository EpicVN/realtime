// lib/permissions.ts
export const PERMISSIONS = {
  MANAGE_POSTS: "manage_posts", 
  VIEW_LEADS: "view_leads",
  MANAGE_SETTINGS: "manage_settings",
  MANAGE_USERS: "manage_users",
};

// SỬA `any` THÀNH CÁC KIỂU DỮ LIỆU CỤ THỂ DƯỚI ĐÂY:
export const hasPermission = (
  userPermissions: string[] | string | undefined | null, 
  requiredPermission: string
) => {
  // 1. Nếu không có dữ liệu -> False luôn
  if (!userPermissions || !requiredPermission) return false;

  // 2. Ép kiểu an toàn: Đảm bảo userPermissions luôn là 1 mảng
  let safePermissions: string[] = [];
  if (Array.isArray(userPermissions)) {
    safePermissions = userPermissions;
  } else if (typeof userPermissions === "string") {
    safePermissions = [userPermissions]; // Đề phòng lỗi DB trả về chuỗi
  } else {
    return false;
  }

  // 3. Đưa tất cả về chữ thường (lowercase) và kiểm tra
  const normalizedUserPerms = safePermissions.map((p) => p.toLowerCase());
  return normalizedUserPerms.includes(requiredPermission.toLowerCase());
};