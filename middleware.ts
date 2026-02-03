// middleware.ts
import NextAuth from "next-auth";
import { authConfig } from "./auth.config"; // <--- CHỈ IMPORT FILE CONFIG NHẸ

export default NextAuth(authConfig).auth;

export const config = {
  // Matcher để middleware chạy trên các route cần thiết
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};