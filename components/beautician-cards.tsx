"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Clock, Heart } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

const beauticians = [
  {
    id: 1,
    name: "Ayesha Khan",
    businessName: "Glamour Studio",
    location: "DHA, Karachi",
    rating: 4.9,
    reviews: 127,
    priceRange: "PKR 2,000 - 15,000",
    services: ["Bridal Makeup", "Hair Styling", "Facial"],
    image: "/professional-female-beautician.png",
    isAtHome: true,
    isAtSalon: true,
    responseTime: "Usually responds in 2 hours",
  },
  {
    id: 2,
    name: "Fatima Ahmed",
    businessName: "Beauty Bliss",
    location: "Gulberg, Lahore",
    rating: 4.8,
    reviews: 89,
    priceRange: "PKR 1,500 - 8,000",
    services: ["Mehndi", "Threading", "Facial"],
    image: "/professional-female-beautician.png",
    isAtHome: true,
    isAtSalon: false,
    responseTime: "Usually responds in 1 hour",
  },
  {
    id: 3,
    name: "Zara Malik",
    businessName: "Elite Beauty Lounge",
    location: "F-7, Islamabad",
    rating: 4.9,
    reviews: 156,
    priceRange: "PKR 3,000 - 20,000",
    services: ["Bridal Makeup", "Party Makeup", "Hair Styling"],
    image: "/professional-female-beautician.png",
    isAtHome: false,
    isAtSalon: true,
    responseTime: "Usually responds in 3 hours",
  },
  {
    id: 4,
    name: "Sana Riaz",
    businessName: "Home Beauty Services",
    location: "Clifton, Karachi",
    rating: 4.7,
    reviews: 73,
    priceRange: "PKR 1,800 - 12,000",
    services: ["Massage", "Facial", "Waxing"],
    image: "/professional-female-beautician.png",
    isAtHome: true,
    isAtSalon: false,
    responseTime: "Usually responds in 30 minutes",
  },
  {
    id: 5,
    name: "Maria Khan",
    businessName: "Radiance Salon",
    location: "Johar Town, Lahore",
    rating: 4.8,
    reviews: 94,
    priceRange: "PKR 2,500 - 18,000",
    services: ["Hair Color", "Keratin", "Highlights"],
    image: "/professional-female-beautician.png",
    isAtHome: true,
    isAtSalon: true,
    responseTime: "Usually responds in 1 hour",
  },
  {
    id: 6,
    name: "Hina Tariq",
    businessName: "Bridal Beauty Studio",
    location: "Blue Area, Islamabad",
    rating: 4.9,
    reviews: 112,
    priceRange: "PKR 5,000 - 25,000",
    services: ["Bridal Packages", "Photography Makeup", "Hair Styling"],
    image: "/professional-female-beautician.png",
    isAtHome: true,
    isAtSalon: true,
    responseTime: "Usually responds in 4 hours",
  },
]

export function BeauticianCards() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Top Rated Beauticians</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect with verified beauty professionals in your city
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beauticians.map((beautician) => (
            <Card key={beautician.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={beautician.image || "/placeholder.svg"} alt={beautician.name} />
                    <AvatarFallback>
                      {beautician.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg text-foreground truncate">{beautician.name}</h3>
                    <p className="text-muted-foreground text-sm mb-1">{beautician.businessName}</p>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="truncate">{beautician.location}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-primary">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{beautician.rating}</span>
                  </div>
                  <span className="text-muted-foreground text-sm">({beautician.reviews} reviews)</span>
                </div>

                <div className="flex gap-2 mb-3">
                  {beautician.isAtHome && (
                    <Badge variant="secondary" className="text-xs">
                      At Home
                    </Badge>
                  )}
                  {beautician.isAtSalon && (
                    <Badge variant="outline" className="text-xs">
                      At Salon
                    </Badge>
                  )}
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Services:</p>
                  <div className="flex flex-wrap gap-1">
                    {beautician.services.map((service, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground">{beautician.priceRange}</p>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Clock className="h-3 w-3" />
                    <span>{beautician.responseTime}</span>
                  </div>
                </div>

                <Link href={`/beautician/${beautician.id}`}>
                  <Button className="w-full bg-secondary hover:bg-secondary/90">Book Now</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            View All Beauticians
          </Button>
        </div>
      </div>
    </section>
  )
}
