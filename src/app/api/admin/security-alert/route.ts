import { NextResponse } from "next/server"
import { getSupabaseClient } from "@/lib/supabase"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      enteredId = "Unknown",
      attempts = 3,
      loginMethod = "password",
      isTest = false,
      botTokenOverride,
      chatIdOverride,
    } = body

    // 1. Resolve Telegram Bot Token & Chat ID
    let botToken = botTokenOverride || process.env.TELEGRAM_BOT_TOKEN
    let chatId = chatIdOverride || process.env.TELEGRAM_CHAT_ID

    // If not in env, check Supabase settings table if available
    if (!botToken || !chatId) {
      try {
        const supabase = getSupabaseClient()
        if (supabase) {
          const { data } = await supabase
            .from("settings")
            .select("telegram_bot_token, telegram_chat_id")
            .eq("id", "global_settings")
            .single()
          if (data) {
            botToken = botToken || data.telegram_bot_token
            chatId = chatId || data.telegram_chat_id
          }
        }
      } catch (e) {
        console.error("Failed to query settings for Telegram alert:", e)
      }
    }

    if (!botToken || !chatId) {
      console.warn("Telegram alert skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not configured.")
      return NextResponse.json({
        success: false,
        message: "Telegram Bot credentials not configured.",
      }, { status: 200 })
    }

    // 2. Format Timestamp & Details
    const now = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    })

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "Unknown IP"
    const userAgent = req.headers.get("user-agent") || "Unknown Browser / Device"

    let message = ""

    if (isTest) {
      message = `🚀 <b>SRI WEB SQUAD - TELEGRAM BOT TEST</b>\n\n` +
        `✅ <b>Status:</b> Telegram Security Alert System is ACTIVE & CONNECTED!\n\n` +
        `📅 <b>Timestamp:</b> ${now} (IST)\n` +
        `🌐 <b>Portal:</b> Sri Web Squad Admin Gateway\n` +
        `🛡️ <b>Protection:</b> Active 24/7\n\n` +
        `<i>All future unauthorized login intrusions will trigger instant push notifications to this chat.</i>`
    } else {
      message = `🚨 <b>SRI WEB SQUAD - SECURITY INTRUSION ALERT</b> 🚨\n\n` +
        `⚠️ <b>${attempts} Consecutive Failed Login Attempts Detected!</b>\n\n` +
        `📅 <b>Time:</b> ${now} (IST)\n` +
        `🌐 <b>Portal:</b> Admin Login Gateway\n` +
        `🔑 <b>Method:</b> ${loginMethod.toUpperCase()}\n` +
        `📱 <b>Entered ID:</b> <code>${enteredId}</code>\n` +
        `🌐 <b>IP Address:</b> <code>${clientIp}</code>\n` +
        `💻 <b>Client Agent:</b> <i>${userAgent.slice(0, 100)}</i>\n` +
        `🔐 <b>Action Taken:</b> Portal Temporarily Locked (60s)\n\n` +
        `<i>⚠️ If this was NOT authorized by you, please check your server and admin credentials immediately.</i>`
    }

    // 3. Dispatch to Telegram Bot API
    const telegramEndpoint = `https://api.telegram.org/bot${botToken}/sendMessage`
    const res = await fetch(telegramEndpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "HTML",
        disable_web_page_preview: true,
      }),
    })

    const result = await res.json()

    if (!res.ok || !result.ok) {
      console.error("Telegram API Error:", result)
      return NextResponse.json({
        success: false,
        error: result.description || "Failed to deliver Telegram message.",
      }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: "Telegram security alert dispatched successfully.",
    })
  } catch (error: any) {
    console.error("Security alert route error:", error)
    return NextResponse.json({
      success: false,
      error: error.message || "Internal server error",
    }, { status: 500 })
  }
}
