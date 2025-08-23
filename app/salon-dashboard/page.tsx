import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SalonDashboard } from "@/components/salon/salon-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function SalonDashboardPage() {
  if (!isSupabaseConfigured) {
    redirect("/auth/login")
  }

  const supabase = createClient()
  let user = null
  let salonOwner = null
  let salon = null
  let bookings = []
  let services = []
  let staff = []
  let customers = []
  let reviews = []

  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser

    if (!user) {
      redirect("/auth/login")
    }

    const { data: salonOwnerData } = await supabase
      .from("salon_owners")
      .select("*, salons(*)")
      .eq("id", user.id)
      .single()
    salonOwner = salonOwnerData

    if (!salonOwner) {
      redirect("/salon/register")
    }

    salon = salonOwner.salons

    const [
      { data: bookingsData },
      { data: servicesData },
      { data: staffData },
      { data: customersData },
      { data: reviewsData },
    ] = await Promise.all([
      supabase
        .from("bookings")
        .select("*, customers(full_name, phone), services(name), staff(name)")
        .eq("salon_id", salon.id)
        .order("created_at", { ascending: false }),
      supabase.from("services").select("*").eq("salon_id", salon.id).order("created_at", { ascending: false }),
      supabase.from("staff").select("*").eq("salon_id", salon.id).order("created_at", { ascending: false }),
      supabase.from("customers").select("*, bookings!inner(salon_id)").eq("bookings.salon_id", salon.id),
      supabase
        .from("reviews")
        .select("*, customers(full_name)")
        .eq("salon_id", salon.id)
        .order("created_at", { ascending: false }),
    ])

    bookings = bookingsData || []
    services = servicesData || []
    staff = staffData || []
    customers = customersData || []
    reviews = reviewsData || []
  } catch (error) {
    console.error("Failed to fetch salon dashboard data:", error)
    redirect("/salon/register")
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SalonDashboard
        salon={salon}
        bookings={bookings}
        services={services}
        staff={staff}
        customers={customers}
        reviews={reviews}
      />
      <Footer />
    </div>
  )
}
