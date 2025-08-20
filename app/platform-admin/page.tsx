import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PlatformAdminDashboard } from "@/components/platform-admin/platform-admin-dashboard"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function PlatformAdminPage() {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/platform-admin")
  }

  // In production, check for platform admin role
  // For demo, we'll allow any authenticated user

  // Fetch platform-wide data
  const [
    { data: salons },
    { data: customers },
    { data: bookings },
    { data: reviews },
    { data: pendingSalons },
    { data: recentRegistrations },
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <PlatformAdminDashboard
        salons={salons || []}
        customers={customers || []}
        bookings={bookings || []}
        reviews={reviews || []}
        pendingSalons={pendingSalons || []}
        recentRegistrations={recentRegistrations || []}
      />
      <Footer />
    </div>
  )
}
