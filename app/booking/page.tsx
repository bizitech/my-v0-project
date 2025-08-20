import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { BookingFlow } from "@/components/booking-flow"
import { redirect } from "next/navigation"

interface SearchParams {
  service?: string
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

  // Fetch services and staff
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("is_active", true)
    .order("category", { ascending: true })
    .order("name", { ascending: true })

  const { data: staff } = await supabase.from("staff").select("*").eq("is_available", true)

  const preselectedService = searchParams.service ? services?.find((s) => s.id === searchParams.service) : null

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Book Your Appointment</h1>
            <p className="text-lg text-muted-foreground">
              Select your preferred service, date, and time. We'll confirm your booking within minutes.
            </p>
          </div>

          <BookingFlow
            services={services || []}
            staff={staff || []}
            preselectedService={preselectedService}
            user={user}
          />
        </div>
      </div>

      <Footer />
    </div>
  )
}
