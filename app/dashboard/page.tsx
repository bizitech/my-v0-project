import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { CustomerDashboard } from "@/components/dashboard/customer-dashboard"

export default async function DashboardPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/dashboard")
  }

  // Fetch customer data
  const { data: customer } = await supabase.from("customers").select("*").eq("id", user.id).single()

  // Fetch user's bookings with related data
  const { data: bookings } = await supabase
    .from("bookings")
    .select(`
      *,
      services (name, duration, category),
      staff (name, email)
    `)
    .eq("customer_id", user.id)
    .order("booking_date", { ascending: false })
    .order("booking_time", { ascending: false })

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <CustomerDashboard user={user} customer={customer} bookings={bookings || []} />
      </div>

      <Footer />
    </div>
  )
}
