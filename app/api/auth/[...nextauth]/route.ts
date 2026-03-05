// app/api/auth/[...nextauth]/route.ts
import { handlers } from "@/auth"; // Trỏ về file auth.ts ở thư mục gốc
export const { GET, POST } = handlers;