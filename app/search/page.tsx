import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export const dynamic = "force-dynamic"
export const revalidate = 0

type Props = {
  searchParams: { q?: string; city?: string; date?: string }
}

export default async function SearchPage({ searchParams }: Props) {
  const q = (searchParams.q ?? "").trim()
  const city = (searchParams.city ?? "").trim()

  if (!isSupabaseConfigured) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-6 text-yellow-600">
          <h1 className="text-2xl font-bold mb-4">Search Unavailable</h1>
          <p>Database is not configured. Please complete the setup to search for salons.</p>
        </div>
        <Footer />
      </div>
    )
  }

  let salons = []
  let error = null

  try {
    const supabase = createClient()

    let query = supabase.from("salons").select("id,name,city,address,phone,created_at,status").eq("status", "approved")

    if (city) {
      query = query.ilike("city", `%${city}%`)
    }
    if (q) {
      // Match by salon name or city
      query = query.or(`name.ilike.%${q}%,city.ilike.%${q}%`)
    }

    const result = await query.order("created_at", { ascending: false })
    salons = result.data || []
    error = result.error
  } catch (err) {
    error = err instanceof Error ? err : new Error("Database query failed")
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-6 text-red-600">
          <h1 className="text-2xl font-bold mb-4">Search Error</h1>
          <p>Unable to search salons at this time. Please try again later.</p>
          <details className="mt-4 text-sm">
            <summary>Error details</summary>
            <pre className="mt-2 p-2 bg-gray-100 rounded">{error.message}</pre>
          </details>
        </div>
        <Footer />
      </div>
    )
  }

  if (!salons || salons.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="p-10 text-center text-gray-600">
          <h1 className="text-2xl font-bold mb-4">No salons found</h1>
          <p>
            {q || city
              ? `No results for "${[q, city].filter(Boolean).join(" in ")}"`
              : "Try adjusting your search criteria."}
          </p>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">
          Search Results {(q || city) && `for "${[q, city].filter(Boolean).join(" in ")}"`}
        </h1>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {salons.map((salon) => (
            <a
              key={salon.id}
              href={`/salon/${salon.id}`}
              className="bg-white rounded-lg border p-6 hover:shadow-lg transition-shadow"
            >
              <div className="font-semibold text-lg mb-2">{salon.name}</div>
              <div className="text-sm text-gray-600 mb-1">{salon.city}</div>
              {salon.address && <div className="text-sm text-gray-500 mb-2">{salon.address}</div>}
              {salon.phone && <div className="text-sm text-blue-600">{salon.phone}</div>}
            </a>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
