// auth.ts
import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Định nghĩa rõ type cho credentials
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

        // Trả về object đúng chuẩn User interface đã định nghĩa ở bước 1
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role, // TypeScript sẽ không báo lỗi nữa
        };
      },
    }),
  ],
  callbacks: {
    // Type của `token` và `user` đã được tự động hiểu là JWT và User
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // OK: token.role đã được định nghĩa
      }
      return token;
    },
    // Type của `session` và `token` đã được tự động hiểu
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role; // OK: session.user.role đã được định nghĩa
        session.user.id = token.sub as string; // Gán thêm ID nếu cần
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
