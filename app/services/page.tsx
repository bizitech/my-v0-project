import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ServiceGrid } from "@/components/service-grid"
import { ServiceFilters } from "@/components/service-filters"

interface SearchParams {
  category?: string
  search?: string
}

export default async function ServicesPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const supabase = createClient()

  // Build query based on filters
  let query = supabase.from("services").select("*").eq("is_active", true)

  if (searchParams.category) {
    query = query.eq("category", searchParams.category)
  }

  if (searchParams.search) {
    query = query.ilike("name", `%${searchParams.search}%`)
  }

  const { data: services } = await query.order("category").order("name")

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Beauty Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover our comprehensive range of professional beauty treatments. Available both at our salon and as home
            services.
          </p>
        </div>

        <ServiceFilters />
        <ServiceGrid services={services || []} />
      </div>

      <Footer />
    </div>
  )
}
