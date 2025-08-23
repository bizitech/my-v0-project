"use client"
import { useEffect, useState } from "react"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default function EmailDebug() {
  const [status, setStatus] = useState<any>()
  const [to, setTo] = useState("")
  const [result, setResult] = useState<string>("")

  useEffect(() => {
    fetch("/api/email-status")
      .then((r) => r.json())
      .then(setStatus)
      .catch(() => {})
  }, [])

  async function send() {
    setResult("Sending…")
    const r = await fetch("/api/email-test", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ to }),
    })
    const j = await r.json()
    setResult(j.ok ? "✅ Email sent" : `❌ ${j.error || "Failed"}`)
  }

  return (
    <div style={{ padding: 16, maxWidth: 560 }}>
      <h1>Email Debug</h1>
      <pre style={{ background: "#f6f7f8", padding: 12 }}>{JSON.stringify(status, null, 2)}</pre>
      <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="to@example.com (optional if EMAIL_TO_TEST is set)"
          style={{ flex: 1, padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
        />
        <button onClick={send} style={{ padding: "8px 12px" }}>
          Send test
        </button>
      </div>
      {result ? <p style={{ marginTop: 8 }}>{result}</p> : null}
    </div>
  )
}
