// app/actions/submit-contact.ts
"use server";

import { prisma } from "@/lib/prisma";
import nodemailer from "nodemailer"; // <-- IMPORT THÊM NODEMAILER

export type FormState = {
  success: boolean;
  message: string;
};

type ContactData = {
  name: string;
  email: string;
  phone: string | null;
  interest: string | null;
  message: string;
  status: string;
};

export async function submitContactForm(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const interest = formData.get("interest") as string;
  const message = formData.get("message") as string;

  if (!name || !email) {
    return { success: false, message: "Vui lòng điền tên và email!" };
  }

  try {
    // 1. Lưu vào Database
    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        interest,
        message: message || "Khách không để lại lời nhắn",
        status: "PENDING",
      },
    });

    // 2. Gửi thông báo Telegram (KHÔNG dùng await để tránh chặn luồng, hoặc dùng Promise.all để chạy song song)
    // Đã bọc Promise.all để gửi cả 2 cùng lúc cho nhanh
    await Promise.all([
      sendTelegramAlert(newContact),
      sendEmailAlert(newContact), // <-- GỌI HÀM GỬI EMAIL Ở ĐÂY
    ]);

    return {
      success: true,
      message: "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.",
    };
  } catch (error) {
    console.error("Lỗi gửi form:", error);
    return { success: false, message: "Lỗi hệ thống, vui lòng thử lại sau." };
  }
}

// ==========================================
// HÀM GỬI THÔNG BÁO TELEGRAM
// ==========================================
async function sendTelegramAlert(data: ContactData) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) return;

  const text = `
🔥 **NEW ORDER - REALTIME WEBSITE**
-------------------------
👤 **Name:** ${data.name}
📧 **Email:** ${data.email}
📞 **Phone:** ${data.phone || "N/A"}
👥 **User quy mô:** ${data.interest || "N/A"}
📝 **Note:** ${data.message}
-------------------------
⏰ ${new Date().toLocaleString("vi-VN")}
  `;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: "Markdown",
      }),
    });
  } catch (e) {
    console.error("Telegram Error:", e);
  }
}

// ==========================================
// HÀM GỬI THÔNG BÁO GMAIL (MỚI)
// ==========================================
async function sendEmailAlert(data: ContactData) {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  const emailReceiver = process.env.EMAIL_RECEIVER; // Email người nhận thông báo

  if (!emailUser || !emailPass || !emailReceiver) {
    console.warn("Thiếu cấu hình Email trong file .env");
    return;
  }

  // Cấu hình transporter cho Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  // Cấu hình nội dung Email
  const mailOptions = {
    from: `"Website Realtime" <${emailUser}>`,
    to: emailReceiver, // Có thể điền nhiều email cách nhau bằng dấu phẩy (VD: "email1@gmail.com, email2@gmail.com")
    subject: `[LIÊN HỆ MỚI] Từ khách hàng: ${data.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">Có khách hàng mới để lại lời nhắn!</h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <tr>
            <td style="padding: 8px 0; width: 120px;"><strong>👤 Họ và tên:</strong></td>
            <td>${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>📧 Email:</strong></td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>📞 Số điện thoại:</strong></td>
            <td>${data.phone || "Không cung cấp"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>👥 Quy mô User:</strong></td>
            <td>${data.interest || "Không cung cấp"}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>📝 Lời nhắn:</strong></td>
            <td style="background: #f3f4f6; padding: 10px; border-radius: 5px;">${data.message}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>⏰ Thời gian:</strong></td>
            <td>${new Date().toLocaleString("vi-VN")}</td>
          </tr>
        </table>
        <p style="margin-top: 20px; font-size: 12px; color: #888;">Email này được gửi tự động từ hệ thống website Realtime.</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Email Error:", error);
  }
}
