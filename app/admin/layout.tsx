import type React from "react"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  if (!isSupabaseConfigured) {
    redirect("/auth/login?redirect=/admin")
  }

  try {
    const supabase = createClient()

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      redirect("/auth/login?redirect=/admin")
    }
  } catch (error) {
    console.error("Failed to authenticate admin user:", error)
    redirect("/auth/login?redirect=/admin")
  }

  return <>{children}</>
}
