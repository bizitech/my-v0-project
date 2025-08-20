import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { ServiceCategories } from "@/components/service-categories"
import { FeaturedSalons } from "@/components/featured-salons"
import { WhyChooseUs } from "@/components/why-choose-us"
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
    .eq("is_active", true)
    .eq("is_verified", true)
    .order("rating", { ascending: false })
    .limit(6)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServiceCategories />
      <FeaturedSalons salons={salons || []} />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}
