import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function PlatformAdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // TODO: Add proper admin role check
  // For now, we'll assume authenticated users can access admin
  // In production, you'd check user roles/permissions here

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </div>
  )
}
