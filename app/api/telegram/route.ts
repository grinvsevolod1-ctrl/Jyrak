import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, service, date, message, formType } = body

    const botToken = process.env.TELEGRAM_BOT_TOKEN
    const chatId = process.env.TELEGRAM_CHAT_ID

    if (!botToken || !chatId) {
      return NextResponse.json({ success: false, error: "Telegram not configured" }, { status: 500 })
    }

    const text = `
🎨 Новая заявка с сайта Olli Beauty

📋 Тип формы: ${formType}
👤 Имя: ${name}
📞 Телефон: ${phone}
${service ? `💄 Услуга: ${service}` : ""}
${date ? `📅 Дата: ${date}` : ""}
${message ? `💬 Комментарий: ${message}` : ""}
    `.trim()

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("[v0] Telegram API error:", result)
      return NextResponse.json({ success: false, error: result.description }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[v0] Error in telegram route:", error)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
