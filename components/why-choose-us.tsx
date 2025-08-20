import { Card, CardContent } from "@/components/ui/card"
import { Shield, Users, Clock, Award, Home, Heart } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Certified Professionals",
    description: "All our beauticians are certified and experienced professionals",
  },
  {
    icon: Users,
    title: "500+ Happy Customers",
    description: "Trusted by hundreds of satisfied customers across Pakistan",
  },
  {
    icon: Clock,
    title: "Flexible Scheduling",
    description: "Book appointments that fit your busy schedule, 7 days a week",
  },
  {
    icon: Award,
    title: "Premium Products",
    description: "We use only high-quality, branded beauty products",
  },
  {
    icon: Home,
    title: "Home Service Available",
    description: "Enjoy salon-quality treatments in the comfort of your home",
  },
  {
    icon: Heart,
    title: "Personalized Care",
    description: "Customized treatments based on your skin type and preferences",
  },
]

export function WhyChooseUs() {
  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Why Choose Bella Beauty?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the difference with our professional beauty services and exceptional customer care
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="mb-4">
                    <div className="inline-flex p-3 rounded-full bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
