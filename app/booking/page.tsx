import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingFlow } from "@/components/booking-flow"
import { redirect } from "next/navigation"

export const dynamic = "force-dynamic"
export const revalidate = 0

interface SearchParams {
  service?: string
  salon?: string
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Service Unavailable</h1>
          <p className="text-muted-foreground">Booking service is currently unavailable. Please try again later.</p>
        </div>
      </div>
    )
  }

  const supabase = createClient()
  let user = null
  let salons = []
  let selectedSalon = null
  let services: any[] = []
  let staff: any[] = []

  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    user = authUser

    if (!user) {
      redirect("/auth/login?redirect=/booking")
    }

    const { data: salonsData } = await supabase
      .from("salons")
      .select("*")
      .eq("is_active", true)
      .eq("is_verified", true)
      .order("rating", { ascending: false })

    salons = salonsData || []
  } catch (error) {
    console.error("Failed to fetch user or salons:", error)
    redirect("/auth/login?redirect=/booking")
  }

  if (searchParams.salon) {
    selectedSalon = salons?.find((s) => s.id === searchParams.salon) || null

    if (selectedSalon) {
      try {
        const [{ data: salonServices }, { data: salonStaff }] = await Promise.all([
          supabase
            .from("services")
            .select("*")
            .eq("salon_id", selectedSalon.id)
            .eq("is_active", true)
            .order("category", { ascending: true })
            .order("name", { ascending: true }),
          supabase.from("staff").select("*").eq("salon_id", selectedSalon.id).eq("is_available", true),
        ])

        services = salonServices || []
        staff = salonStaff || []
      } catch (error) {
        console.error("Failed to fetch salon services or staff:", error)
        services = []
        staff = []
      }
    }
  }

  const preselectedService = searchParams.service ? services?.find((s) => s.id === searchParams.service) : null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Appointment</h1>
            <p className="text-lg text-muted-foreground">
              {selectedSalon
                ? `Book your appointment at ${selectedSalon.name}. Select your service, date, and time.`
                : "Choose your preferred salon, service, date, and time. We'll confirm your booking within minutes."}
            </p>
          </div>

          <BookingFlow
            salons={salons || []}
            selectedSalon={selectedSalon}
            services={services}
            staff={staff}
            preselectedService={preselectedService}
            user={user}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}
