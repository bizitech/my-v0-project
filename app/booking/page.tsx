import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingFlow } from "@/components/booking-flow"
import { redirect } from "next/navigation"

interface SearchParams {
  service?: string
  salon?: string
}

export default async function BookingPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login?redirect=/booking")
  }

  const { data: salons } = await supabase
    .from("salons")
    .select("*")
    .eq("is_active", true)
    .eq("is_verified", true)
    .order("rating", { ascending: false })

  let selectedSalon = null
  let services: any[] = []
  let staff: any[] = []

  if (searchParams.salon) {
    selectedSalon = salons?.find((s) => s.id === searchParams.salon) || null

    if (selectedSalon) {
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
