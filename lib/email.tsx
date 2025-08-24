import { Resend } from "resend"

export async function trySendEmail(opts: {
  to?: string
  subject: string
  text?: string
  html?: string
}) {
  const key = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM

  if (!key || !from || !opts.to) {
    return { ok: false, skipped: true }
  }

  const resend = new Resend(key)

  try {
    const { error } = await resend.emails.send({
      from,
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html ?? `<p>${opts.text ?? ""}</p>`,
    })

    return { ok: !error, error: error?.message }
  } catch (e: any) {
    return { ok: false, error: e?.message }
  }
}

// Additional exports for compatibility
export async function sendEmail(opts: {
  to: string
  subject: string
  text?: string
  html?: string
}) {
  return trySendEmail(opts)
}

export async function emailStatus() {
  const key = process.env.RESEND_API_KEY
  const from = process.env.EMAIL_FROM

  return {
    configured: !!(key && from),
    hasApiKey: !!key,
    hasFromAddress: !!from,
  }
}
