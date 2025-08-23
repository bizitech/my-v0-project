import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { ServiceCategories } from "@/components/service-categories"
import { FeaturedSalons } from "@/components/featured-salons"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function HomePage() {
  const supabase = createClient()

  let salons = []
  try {
    const { data } = await supabase
      .from("salons")
      .select(`
        *,
        salon_categories(category),
        salon_amenities(amenity)
      `)
      .eq("status", "approved")
      .order("rating", { ascending: false })
      .limit(8)

    salons = data || []
  } catch (error) {
    console.warn("Failed to fetch salons:", error)
    salons = []
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServiceCategories />
      <FeaturedSalons salons={salons} />
      <Footer />
    </div>
  )
}
