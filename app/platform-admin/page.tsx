import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PlatformAdminDashboard } from "@/components/platform-admin/platform-admin-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function PlatformAdminPage() {
  if (!isSupabaseConfigured) {
    redirect("/auth/login?redirect=/platform-admin")
  }

  const supabase = createClient()
  let user = null
  let salons = []
  let customers = []
  let bookings = []
  let reviews = []
  let pendingSalons = []
  let recentRegistrations = []

  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser

    if (!user) {
      redirect("/auth/login?redirect=/platform-admin")
    }

    const [
      { data: salonsData },
      { data: customersData },
      { data: bookingsData },
      { data: reviewsData },
      { data: pendingSalonsData },
      { data: recentRegistrationsData },
    ] = await Promise.all([
      supabase
        .from("salons")
        .select(`
          *,
          salon_categories(category),
          salon_owners(full_name)
        `)
        .order("created_at", { ascending: false }),
      supabase.from("customers").select("*").order("created_at", { ascending: false }),
      supabase
        .from("bookings")
        .select(`
          *,
          salons(name),
          customers(full_name),
          services(name)
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("reviews")
        .select(`
          *,
          salons(name),
          customers(full_name)
        `)
        .order("created_at", { ascending: false }),
      supabase
        .from("salons")
        .select(`
          *,
          salon_owners(full_name)
        `)
        .eq("is_active", false)
        .order("created_at", { ascending: false }),
      supabase
        .from("salons")
        .select("*")
        .gte("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
        .order("created_at", { ascending: false }),
    ])

    salons = salonsData || []
    customers = customersData || []
    bookings = bookingsData || []
    reviews = reviewsData || []
    pendingSalons = pendingSalonsData || []
    recentRegistrations = recentRegistrationsData || []
  } catch (error) {
    console.error("Failed to fetch platform admin data:", error)
    // Continue with empty arrays if data fetch fails
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PlatformAdminDashboard
        salons={salons}
        customers={customers}
        bookings={bookings}
        reviews={reviews}
        pendingSalons={pendingSalons}
        recentRegistrations={recentRegistrations}
      />
      <Footer />
    </div>
  )
}
