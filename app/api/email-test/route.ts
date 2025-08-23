import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"

export async function POST(req: Request) {
  const { to } = await req.json().catch(() => ({}))
  const recipient = to || process.env.EMAIL_TO_TEST
  if (!recipient) {
    return NextResponse.json({ ok: false, error: 'Provide "to" or set EMAIL_TO_TEST' }, { status: 400 })
  }
  const res = await sendEmail({ to: recipient, subject: "Email test" })
  return NextResponse.json(res, { status: res.ok ? 200 : 500 })
}
