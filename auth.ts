// auth.ts
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// ==========================================
// 1. BỔ SUNG KHAI BÁO TYPE CHO PERMISSIONS
// ==========================================
declare module "next-auth" {
  interface User {
    role: string;
    permissions: string[];
  }
  interface Session {
    user: User & {
      role: string;
      permissions: string[];
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: string;
    permissions: string[];
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.password) {
          throw new Error("Tài khoản không tồn tại");
        }

        const isPasswordValid = await compare(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Sai mật khẩu");
        }

        // ==========================================
        // 2. NHÉT PERMISSIONS TỪ DATABASE RA (TRẠM 1)
        // ==========================================
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          permissions: user.permissions, // <--- CHÌA KHÓA LÀ ĐÂY!
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        // ==========================================
        // 3. NHÉT VÀO TOKEN (TRẠM 2)
        // ==========================================
        token.permissions = user.permissions;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role;
        session.user.id = token.sub as string;
        // ==========================================
        // 4. XUẤT RA SESSION CHO SẾP XÀI (TRẠM 3)
        // ==========================================
        session.user.permissions = token.permissions;
      }
      return session;
    },
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});
