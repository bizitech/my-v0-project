import { createClient } from "@/lib/supabase/server"
import { Hero } from "@/components/hero"
import { ServiceCategories } from "@/components/service-categories"
import { FeaturedSalons } from "@/components/featured-salons"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const revalidate = 60

export default async function HomePage() {
  const supabase = createClient()

  let salons = []
  try {
    const { data, error } = await supabase
      .from("salons")
      .select("id,name,city,address,phone,email,created_at,status")
      .eq("status", "approved")
      .order("created_at", { ascending: false })
      .limit(8)

    if (error) {
      console.error("Failed to fetch salons:", error)
      salons = []
    } else {
      salons = data || []
    }
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
