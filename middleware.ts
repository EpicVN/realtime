// middleware.ts

// Cách đơn giản nhất cho Next.js 15 + Auth v5:
export { auth as middleware } from "@/auth"

export const config = {
  // Chặn tất cả route /admin/...
  matcher: ["/admin/:path*"],
}