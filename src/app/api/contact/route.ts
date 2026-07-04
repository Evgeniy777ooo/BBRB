export const runtime = "edge";

import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  company?: string;
  phone: string;
  email?: string;
  message?: string;
  source?: string;
};

function buildEmailHtml(data: ContactPayload): string {
  const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });
  const rows = [
    ["Имя", data.name],
    data.company ? ["Компания", data.company] : null,
    ["Телефон", `<a href="tel:${data.phone}" style="color:#e85d4a">${data.phone}</a>`],
    data.email ? ["Email", `<a href="mailto:${data.email}" style="color:#e85d4a">${data.email}</a>`] : null,
    data.message ? ["Задача / вопрос", data.message] : null,
    ["Источник", data.source ?? "Сайт"],
    ["Время", now],
  ]
    .filter(Boolean)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:8px 12px;background:#f5f0eb;font-weight:600;white-space:nowrap;color:#4a3f5c;border-radius:4px">${label}</td>
        <td style="padding:8px 12px;color:#2d2233">${value}</td>
      </tr>`
    )
    .join("");

  return `
<!DOCTYPE html>
<html lang="ru">
<head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f0ebe3;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0ebe3;padding:32px 0">
    <tr><td align="center">
      <table width="560" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 16px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr>
          <td style="background:#4a3f5c;padding:24px 32px">
            <div style="font-size:22px;font-weight:800;color:#fff">🤖 Бабушкаробот</div>
            <div style="font-size:13px;color:#c9b8e8;margin-top:4px">Новая заявка с сайта</div>
          </td>
        </tr>
        <!-- Body -->
        <tr>
          <td style="padding:28px 32px">
            <p style="margin:0 0 20px;font-size:16px;color:#2d2233">
              Поступила новая заявка. Детали ниже:
            </p>
            <table cellpadding="0" cellspacing="6" width="100%">
              ${rows}
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="padding:16px 32px 28px;border-top:1px solid #f0ebe3">
            <p style="margin:0;font-size:12px;color:#9b8fa8">
              Письмо сформировано автоматически · babushkarobot.ru
            </p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as ContactPayload;

    if (!data.name || !data.phone) {
      return NextResponse.json(
        { ok: false, error: "Имя и телефон обязательны" },
        { status: 400 }
      );
    }

    const now = new Date().toLocaleString("ru-RU", { timeZone: "Europe/Moscow" });

    console.log("[contact] Новая заявка:", { ...data, at: now });

    // ── 1. Email через Resend ──────────────────────────────────────────────
    const resendKey = process.env.RESEND_API_KEY;
    const toEmail = process.env.CONTACT_EMAIL ?? "oldgoodbatman@gmail.com";

    if (resendKey) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${resendKey}`,
          },
          body: JSON.stringify({
            from: "Бабушкаробот <noreply@babushkarobot.ru>",
            to: [toEmail],
            reply_to: data.email ?? undefined,
            subject: `Новая заявка от ${data.name}${data.company ? ` (${data.company})` : ""}`,
            html: buildEmailHtml(data),
          }),
        });
        if (!res.ok) {
          const err = await res.text();
          console.error("[contact] Resend error:", err);
        }
      } catch (err) {
        console.error("[contact] Resend fetch error:", err);
      }
    } else {
      console.warn("[contact] RESEND_API_KEY не задан — email не отправлен");
    }

    // ── 2. Telegram (опционально) ──────────────────────────────────────────
    const tgToken = process.env.TELEGRAM_BOT_TOKEN;
    const tgChatId = process.env.TELEGRAM_CHAT_ID;

    if (tgToken && tgChatId) {
      const text = [
        "🤖 <b>Новая заявка — Бабушкаробот</b>",
        `👤 <b>Имя:</b> ${data.name}`,
        data.company ? `🏢 <b>Компания:</b> ${data.company}` : null,
        `📞 <b>Телефон:</b> ${data.phone}`,
        data.email ? `📧 <b>Email:</b> ${data.email}` : null,
        data.message ? `💬 <b>Задача:</b> ${data.message}` : null,
        `🕐 <b>Время:</b> ${now}`,
      ]
        .filter(Boolean)
        .join("\n");

      try {
        await fetch(`https://api.telegram.org/bot${tgToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: tgChatId, text, parse_mode: "HTML" }),
        });
      } catch (err) {
        console.error("[contact] Telegram error:", err);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] error:", err);
    return NextResponse.json(
      { ok: false, error: "Внутренняя ошибка" },
      { status: 500 }
    );
  }
}
