import { createClient } from "@/lib/supabase/server"
import { SalonSearch } from "@/components/salon-search"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function SalonsPage() {
  const supabase = createClient()

  // Fetch all active salons with their categories and amenities
  const { data: salons } = await supabase
    .from("salons")
    .select(`
      *,
      salon_categories(category),
      salon_amenities(amenity)
    `)
    .eq("is_active", true)
    .eq("is_verified", true)
    .order("rating", { ascending: false })

  // Get unique cities for filter
  const { data: cities } = await supabase.from("salons").select("city").eq("is_active", true).eq("is_verified", true)

  const uniqueCities = [...new Set(cities?.map((c) => c.city) || [])]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Find Your Perfect Beauty Salon</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse through hundreds of verified beauty salons across Pakistan and book your appointment instantly
          </p>
        </div>

        <SalonSearch salons={salons || []} cities={uniqueCities} />
      </div>
      <Footer />
    </div>
  )
}
