import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export default async function AdminPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/admin")
  }

  // For demo purposes, we'll allow any authenticated user to access admin
  // In production, you'd check for admin role/permissions

  // Fetch dashboard data
  const [{ data: bookings }, { data: services }, { data: staff }, { data: customers }] = await Promise.all([
    supabase
      .from("bookings")
      .select(`
        *,
        services (name, category),
        staff (name),
        customers (full_name, phone)
      `)
      .order("created_at", { ascending: false }),
    supabase.from("services").select("*").order("category"),
    supabase.from("staff").select("*").order("name"),
    supabase.from("customers").select("*").order("created_at", { ascending: false }),
  ])

  return (
    <AdminDashboard
      bookings={bookings || []}
      services={services || []}
      staff={staff || []}
      customers={customers || []}
    />
  )
}
