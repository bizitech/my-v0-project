import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function DashboardPage() {
  if (!isSupabaseConfigured) {
    redirect("/auth/login?redirect=/dashboard")
  }

  const supabase = createClient()
  let user = null
  let customer = null
  let bookings = []

  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser

    if (!user) {
      redirect("/auth/login?redirect=/dashboard")
    }

    const [{ data: customerData }, { data: bookingsData }] = await Promise.all([
      supabase.from("customers").select("*").eq("id", user.id).single(),
      supabase
        .from("bookings")
        .select(`
          *,
          services (name, duration, category),
          staff (name, email)
        `)
        .eq("customer_id", user.id)
        .order("booking_date", { ascending: false })
        .order("booking_time", { ascending: false }),
    ])

    customer = customerData
    bookings = bookingsData || []
  } catch (error) {
    console.error("Failed to fetch user or dashboard data:", error)
    redirect("/auth/login?redirect=/dashboard")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <CustomerDashboard user={user} customer={customer} bookings={bookings} />
      </div>

      <Footer />
    </div>
  )
}
