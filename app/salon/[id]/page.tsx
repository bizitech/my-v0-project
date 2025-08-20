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

  // Fetch salon details with all related data
  const { data: salon } = await supabase
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

  if (!salon) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <SalonDetails salon={salon} />
      <Footer />
    </div>
  )
}
