// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL; // Lấy email từ .env (VD: boss@realtime.vn)
  const password = process.env.ADMIN_PASSWORD; // Lấy pass từ .env

  if (!email || !password) {
    console.error("❌ Thiếu ADMIN_EMAIL hoặc ADMIN_PASSWORD trong .env");
    return;
  }

  // Kiểm tra xem SuperAdmin đã tồn tại chưa
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (!existingUser) {
    // Nếu chưa có thì tạo mới
    const hashedPassword = await hash(password, 12); // Mã hóa mật khẩu

    const user = await prisma.user.upsert({
      where: { email: email },
      update: {
        role: "SUPER_ADMIN",
        permissions: [], // Super Admin full quyền nên để rỗng cũng được
        password: hashedPassword, // Reset lại mật khẩu luôn cho chắc
      },
      create: {
        email: email,
        name: "Super Admin",
        password: hashedPassword,
        role: "SUPER_ADMIN",
        permissions: [],
      },
    });
    console.log(`✅ Đã tạo SuperAdmin: ${user.name} với ${email}.`);
  } else {
    console.log(`ℹ️ SuperAdmin đã tồn tại.`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
