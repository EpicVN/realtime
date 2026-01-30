// app/actions/submit-contact.ts
'use server'

import { prisma } from '@/lib/prisma'

// Định nghĩa kiểu dữ liệu trả về
export type FormState = {
  success: boolean
  message: string
}

type ContactData = {
  name: string
  email: string
  phone: string | null
  interest: string | null
  message: string
  status: string
}

// ===> ĐÂY LÀ HÀM submitContactForm MÀ BẠN ĐANG TÌM <===
export async function submitContactForm(prevState: FormState, formData: FormData): Promise<FormState> {
  // 1. Lấy dữ liệu từ Form
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  
  // Lấy interest từ form (chính là số lượng user bạn nhập)
  const interest = formData.get('interest') as string
  const message = formData.get('message') as string

  // 2. Validate cơ bản
  if (!name || !email) {
    return { success: false, message: 'Vui lòng điền tên và email!' }
  }

  try {
    // 3. Lưu vào Database (Neon)
    const newContact = await prisma.contact.create({
      data: {
        name,
        email,
        phone,
        interest, // Lưu số lượng user vào cột này
        message: message || 'Khách không để lại lời nhắn',
        status: 'PENDING'
      },
    })

    // 4. Gửi thông báo Telegram
    await sendTelegramAlert(newContact)

    return { success: true, message: 'Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ sớm.' }
    
  } catch (error) {
    console.error('Lỗi gửi form:', error)
    return { success: false, message: 'Lỗi hệ thống, vui lòng thử lại sau.' }
  }
}

// Hàm phụ để gửi tin nhắn Telegram
async function sendTelegramAlert(data: ContactData) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const chatId = process.env.TELEGRAM_CHAT_ID
  
  if (!token || !chatId) return

  const text = `
🔥 **NEW ORDER - REALTIME WEBSITE**
-------------------------
👤 **Name:** ${data.name}
📧 **Email:** ${data.email}
📞 **Phone:** ${data.phone || 'N/A'}
👥 **User quy mô:** ${data.interest || 'N/A'}
📝 **Note:** ${data.message}
-------------------------
⏰ ${new Date().toLocaleString('vi-VN')}
  `

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'Markdown',
      }),
    })
  } catch (e) {
    console.error('Telegram Error:', e)
  }
}