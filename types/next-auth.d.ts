// types/next-auth.d.ts
import { Role } from "@prisma/client";
import { DefaultSession } from "next-auth";
import "next-auth/jwt";

// 1. Mở rộng type User (khi authorize trả về)
declare module "next-auth" {
  interface User {
    role: Role;
  }

  // 2. Mở rộng type Session (để dùng ở client/server component)
  interface Session {
    user: {
      role: Role;
    } & DefaultSession["user"];
  }
}

// 3. Mở rộng type JWT (để lưu role vào token)
declare module "next-auth/jwt" {
  interface JWT {
    role: Role;
  }
}
