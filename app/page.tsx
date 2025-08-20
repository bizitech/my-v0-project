import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { ServiceCategories } from "@/components/service-categories"
import { FeaturedSalons } from "@/components/featured-salons"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function HomePage() {
  const supabase = createClient()

  const { data: salons } = await supabase
    .from("salons")
    .select(`
      *,
      salon_categories(category),
      salon_amenities(amenity)
    `)
    .eq("status", "approved")
    .order("rating", { ascending: false })
    .limit(8)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServiceCategories />
      <FeaturedSalons salons={salons || []} />
      <Footer />
    </div>
  )
}
