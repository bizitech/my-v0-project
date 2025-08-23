import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { AdminDashboard } from "@/components/admin/admin-dashboard"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function AdminPage() {
  if (!isSupabaseConfigured) {
    redirect("/auth/login?redirect=/admin")
  }

  const supabase = createClient()
  let user = null
  let bookings = []
  let services = []
  let staff = []
  let customers = []

  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser

    if (!user) {
      redirect("/auth/login?redirect=/admin")
    }

    const [{ data: bookingsData }, { data: servicesData }, { data: staffData }, { data: customersData }] =
      await Promise.all([
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

    bookings = bookingsData || []
    services = servicesData || []
    staff = staffData || []
    customers = customersData || []
  } catch (error) {
    console.error("Failed to fetch admin dashboard data:", error)
    // Continue with empty arrays if data fetch fails
  }

  return <AdminDashboard bookings={bookings} services={services} staff={staff} customers={customers} />
}
