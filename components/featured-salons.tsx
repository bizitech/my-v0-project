import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"
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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Recommended</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top-rated beauty salons across Pakistan offering exceptional services
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {salons.map((salon) => {
            const status = getCurrentStatus(salon.opening_hours)
            return (
              <Card
                key={salon.id}
                className="overflow-hidden hover:shadow-lg transition-all duration-300 border-border bg-card"
              >
                <div className="relative h-40">
                  <Image
                    src={salon.images[0] || "/placeholder.svg?height=160&width=300&query=beauty salon interior"}
                    alt={salon.name}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-3 right-3">
                    <Badge
                      variant={status.isOpen ? "default" : "secondary"}
                      className="bg-background/90 text-foreground text-xs"
                    >
                      {status.isOpen ? "Open" : "Closed"}
                    </Badge>
                  </div>
                </div>

                <CardContent className="p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold text-card-foreground line-clamp-1">{salon.name}</h3>

                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{salon.rating}</span>
                      <span className="text-muted-foreground">({salon.total_reviews})</span>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-3 w-3" />
                      <span className="line-clamp-1">
                        {salon.area}, {salon.city}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {salon.salon_categories.slice(0, 2).map((cat, index) => (
                        <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                          {cat.category.replace("_", " ")}
                        </Badge>
                      ))}
                    </div>

                    <Button asChild className="w-full mt-3 bg-primary hover:bg-primary/90">
                      <Link href={`/salon/${salon.id}`}>View & Book</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground bg-transparent"
          >
            <Link href="/salons">Browse All Salons</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
