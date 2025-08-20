import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SalonDashboard } from "@/components/salon/salon-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function SalonDashboardPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is a salon owner
  const { data: salonOwner } = await supabase.from("salon_owners").select("*, salons(*)").eq("id", user.id).single()

  if (!salonOwner) {
    redirect("/salon/register")
  }

  const salon = salonOwner.salons

  // Fetch salon data
  const [{ data: bookings }, { data: services }, { data: staff }, { data: customers }, { data: reviews }] =
    await Promise.all([
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SalonDashboard
        salon={salon}
        bookings={bookings || []}
        services={services || []}
        staff={staff || []}
        customers={customers || []}
        reviews={reviews || []}
      />
      <Footer />
    </div>
  )
}
