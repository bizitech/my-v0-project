import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface Salon {
  id: string
  name: string
  description: string
  address: string
  city: string
  area: string
  phone: string
  rating: number
  total_reviews: number
  images: string[]
  opening_hours: Record<string, { open: string; close: string; closed?: boolean }>
  salon_categories: { category: string }[]
  salon_amenities: { amenity: string }[]
}

interface FeaturedSalonsProps {
  salons: Salon[]
}

export function FeaturedSalons({ salons }: FeaturedSalonsProps) {
  const getCurrentStatus = (openingHours: Record<string, { open: string; close: string; closed?: boolean }>) => {
    const now = new Date()
    const currentDay = now.toLocaleLowerCase().substring(0, 3) // mon, tue, etc.
    const currentTime = now.toTimeString().substring(0, 5) // HH:MM format

    const todayHours = openingHours[currentDay + "day"] || openingHours["monday"]

    if (todayHours?.closed) {
      return { isOpen: false, text: "Closed Today" }
    }

    if (todayHours && currentTime >= todayHours.open && currentTime <= todayHours.close) {
      return { isOpen: true, text: `Open until ${todayHours.close}` }
    }

    return { isOpen: false, text: "Closed" }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-rose-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Beauty Salons</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover top-rated beauty salons across Pakistan offering exceptional services and experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {salons.map((salon) => {
            const status = getCurrentStatus(salon.opening_hours)
            return (
              <Card key={salon.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48">
                  <Image
                    src={salon.images[0] || "/placeholder.svg?height=200&width=400&query=beauty salon interior"}
                    alt={salon.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant={status.isOpen ? "default" : "secondary"} className="bg-white/90 text-gray-900">
                      <Clock className="h-3 w-3 mr-1" />
                      {status.text}
                    </Badge>
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{salon.name}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4" />
                        <span>
                          {salon.area}, {salon.city}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{salon.rating}</span>
                      <span className="text-sm text-gray-500">({salon.total_reviews})</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="text-gray-600 mb-4 line-clamp-2">{salon.description}</p>

                  {/* Service Categories */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {salon.salon_categories.slice(0, 3).map((cat, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {cat.category.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                      </Badge>
                    ))}
                    {salon.salon_categories.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{salon.salon_categories.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Contact Info */}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                    <Phone className="h-4 w-4" />
                    <span>{salon.phone}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button asChild className="flex-1">
                      <Link href={`/salon/${salon.id}`}>View Details</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href={`/booking?salon=${salon.id}`}>Book Now</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link href="/salons">Browse All Salons</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
