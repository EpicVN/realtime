// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login", // Đường dẫn trang đăng nhập của bạn
  },
  callbacks: {
    // Logic bảo vệ route (Middleware sẽ dùng cái này)
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const pathname = nextUrl.pathname.replace(/^\/(vi|en)/, "");

      const isOnAdmin = pathname.startsWith("/admin");

      if (isOnAdmin) {
        if (isLoggedIn) return true;
        return false; // Redirect về login nếu chưa đăng nhập
      }
      return true;
    },
    // Giữ lại các callback jwt/session nếu bạn có logic custom ở đây
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) session.user.role = token.role;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  providers: [], // QUAN TRỌNG: Để mảng rỗng ở đây để không kéo Prisma vào
} satisfies NextAuthConfig;