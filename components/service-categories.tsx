import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Scissors, Palette, Hand, GiftIcon as Massage, Zap } from "lucide-react"

const categories = [
  {
    name: "Facial Treatments",
    description: "Deep cleansing and rejuvenating facials",
    icon: Sparkles,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    href: "/services?category=facial",
  },
  {
    name: "Hair Services",
    description: "Cutting, styling, and coloring",
    icon: Scissors,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    href: "/services?category=hair",
  },
  {
    name: "Makeup",
    description: "Professional makeup for all occasions",
    icon: Palette,
    color: "text-rose-600",
    bgColor: "bg-rose-50",
    href: "/services?category=makeup",
  },
  {
    name: "Nail Care",
    description: "Manicure, pedicure, and nail art",
    icon: Hand,
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    href: "/services?category=nails",
  },
  {
    name: "Body Treatments",
    description: "Relaxing massages and body care",
    icon: Massage,
    color: "text-green-600",
    bgColor: "bg-green-50",
    href: "/services?category=massage",
  },
  {
    name: "Waxing",
    description: "Professional hair removal services",
    icon: Zap,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    href: "/services?category=waxing",
  },
]

export function ServiceCategories() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Our Beauty Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our comprehensive range of beauty treatments designed to enhance your natural beauty
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link key={category.name} href={category.href}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg ${category.bgColor}`}>
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-foreground mb-2">{category.name}</h3>
                        <p className="text-muted-foreground text-sm">{category.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
