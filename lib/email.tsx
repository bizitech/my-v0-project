// lib/email.ts
import { Resend } from "resend"

export function emailStatus() {
  return {
    RESEND_API_KEY: !!process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM || "",
  }
}

export async function sendEmail({
  to,
  subject,
  text,
  html,
}: { to: string; subject: string; text?: string; html?: string }) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM
  if (!key) return { ok: false, error: "RESEND_API_KEY missing" }
  if (!from) return { ok: false, error: "EMAIL_FROM missing" }

  const resend = new Resend(key)
  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text: text ?? "Test email from v0",
      html: html ?? "<p>Test email from v0</p>",
    })
    if (error) return { ok: false, error: error.message }
    return { ok: true }
  } catch (e: any) {
    return { ok: false, error: e?.message ?? "Unknown error" }
  }
}
