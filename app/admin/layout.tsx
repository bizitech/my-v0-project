import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  // For demo purposes, we'll allow any authenticated user to access admin
  // In production, you'd check for admin role/permissions here
  // Example: Check if user has admin role in database

  return <>{children}</>
}
