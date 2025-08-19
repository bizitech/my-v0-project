"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sparkles, Scissors, Flower, Heart, Palette, Star } from "lucide-react"

const services = [
  {
    icon: Sparkles,
    title: "Bridal Makeup",
    description: "Complete bridal makeover packages",
    price: "From PKR 15,000",
    image: "/bridal-makeup-artist.png",
  },
  {
    icon: Scissors,
    title: "Hair Styling",
    description: "Cuts, colors, and styling",
    price: "From PKR 2,000",
    image: "/hair-stylist-cutting-hair.png",
  },
  {
    icon: Flower,
    title: "Facial Treatments",
    description: "Deep cleansing and skincare",
    price: "From PKR 3,000",
    image: "/facial-treatment-spa.png",
  },
  {
    icon: Heart,
    title: "Massage Therapy",
    description: "Relaxing full body massage",
    price: "From PKR 4,000",
    image: "/massage-therapy-spa.png",
  },
  {
    icon: Palette,
    title: "Mehndi Design",
    description: "Traditional and modern henna",
    price: "From PKR 1,500",
    image: "/placeholder-1h5p9.png",
  },
  {
    icon: Star,
    title: "Party Makeup",
    description: "Glamorous looks for events",
    price: "From PKR 5,000",
    image: "/glamorous-party-makeup.png",
  },
]

export function FeaturedServices() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Popular Beauty Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our most requested beauty services, available at your home or at professional salons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <IconComponent className="h-5 w-5" />
                      <span className="font-semibold">{service.title}</span>
                    </div>
                    <p className="text-sm opacity-90">{service.price}</p>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-4">{service.description}</p>
                  <Button className="w-full bg-secondary hover:bg-secondary/90">View Providers</Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
