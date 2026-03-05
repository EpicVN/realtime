// app/admin/posts/edit/[id]/page.tsx
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { PERMISSIONS, hasPermission } from "@/lib/permissions";
import { prisma } from "@/lib/prisma";
import EditPostClient from "./EditPostClient";

interface UserSession {
  role: string;
  permissions?: string[];
}

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1. Kiểm tra Quyền
  const session = await auth();

  if (!session || !session.user) {
    redirect("/admin");
  }

  const role = (session.user as UserSession).role;
  const permissions = (session.user as UserSession).permissions || [];

  const canManagePosts =
    role === "SUPER_ADMIN" ||
    hasPermission(permissions, PERMISSIONS.MANAGE_POSTS);

  if (!canManagePosts) {
    redirect("/admin");
  }

  // 2. Lấy ID từ URL
  const resolvedParams = await params;
  const postId = resolvedParams.id;

  // 3. Lấy dữ liệu bài viết từ DB siêu tốc
  const post = await prisma.post.findUnique({
    where: { id: postId },
  });

  // Nếu id bậy bạ, không có bài viết -> Đá về trang danh sách
  if (!post) {
    redirect("/admin/posts");
  }

  // 4. Render Form và ném dữ liệu vào
  return (
    <EditPostClient
      postId={postId}
      initialData={{
        ...post,
        description: post.description || "",
        thumbnail: post.thumbnail || "",
      }}
    />
  );
}
