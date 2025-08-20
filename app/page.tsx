import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { ServiceCategories } from "@/components/service-categories"
import { FeaturedServices } from "@/components/featured-services"
import { WhyChooseUs } from "@/components/why-choose-us"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default async function HomePage() {
  const supabase = createClient()

  // Fetch featured services
  const { data: services } = await supabase.from("services").select("*").eq("is_active", true).limit(6)

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />
      <ServiceCategories />
      <FeaturedServices services={services || []} />
      <WhyChooseUs />
      <Footer />
    </div>
  )
}
