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

    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name: "Super Admin",
        role: "SUPER_ADMIN",
      },
    });
    console.log(`✅ Đã tạo SuperAdmin: ${email}`);
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
