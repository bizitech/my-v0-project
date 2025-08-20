import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Home, MapPin } from "lucide-react"
import Link from "next/link"

interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
  is_home_service: boolean
  home_service_fee: number
}

interface FeaturedServicesProps {
  services: Service[]
}

export function FeaturedServices({ services }: FeaturedServicesProps) {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Popular Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our most loved beauty treatments, available both at salon and as home services
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <Card key={service.id} className="h-full hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <Badge variant="secondary" className="capitalize">
                      {service.category}
                    </Badge>
                    {service.is_home_service && (
                      <Badge variant="outline" className="text-accent">
                        <Home className="h-3 w-3 mr-1" />
                        Home Service
                      </Badge>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold text-xl text-foreground mb-2">{service.name}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{service.duration} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>Salon</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Salon Price:</span>
                      <span className="font-semibold text-lg text-primary">PKR {service.price.toLocaleString()}</span>
                    </div>
                    {service.is_home_service && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Home Service:</span>
                        <span className="font-semibold text-lg text-accent">
                          PKR {(service.price + service.home_service_fee).toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full">
                  <Link href={`/booking?service=${service.id}`}>Book Now</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" asChild>
            <Link href="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
