import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { SalonDetails } from "@/components/salon-details"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface SalonPageProps {
  params: {
    id: string
  }
}

export default async function SalonPage({ params }: SalonPageProps) {
  const supabase = createClient()

  try {
    console.log("[v0] Fetching salon with id:", params.id)

    // Fetch salon details with all related data
    const { data: salon, error } = await supabase
      .from("salons")
      .select(`
        *,
        salon_categories(category),
        salon_amenities(amenity),
        services(*),
        staff(*),
        reviews(*, customers(full_name))
      `)
      .eq("id", params.id)
      .eq("is_active", true)
      .single()

    if (error || !salon) {
      console.log("[v0] Salon not found for id:", params.id, "Error:", error)
      notFound()
    }

    console.log("[v0] Successfully fetched salon:", salon.name)

    return (
      <div className="min-h-screen bg-background">
        <Header />
        <SalonDetails salon={salon} />
        <Footer />
      </div>
    )
  } catch (error) {
    console.log("[v0] Error in SalonPage:", error)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Salon Not Found</h1>
          <p className="text-gray-600 mb-4">The salon you're looking for doesn't exist or has been removed.</p>
          <a href="/salons" className="text-rose-600 hover:text-rose-700 underline">
            Browse All Salons
          </a>
        </div>
      </div>
    )
  }
}
