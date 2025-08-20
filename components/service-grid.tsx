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

interface ServiceGridProps {
  services: Service[]
}

export function ServiceGrid({ services }: ServiceGridProps) {
  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground mb-4">No services found matching your criteria.</p>
        <Button variant="outline" asChild>
          <Link href="/services">View All Services</Link>
        </Button>
      </div>
    )
  }

  // Group services by category
  const servicesByCategory = services.reduce(
    (acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = []
      }
      acc[service.category].push(service)
      return acc
    },
    {} as Record<string, Service[]>,
  )

  const categoryNames: Record<string, string> = {
    facial: "Facial Treatments",
    hair: "Hair Services",
    makeup: "Makeup Services",
    nails: "Nail Care",
    massage: "Body Treatments",
    body: "Body Treatments",
    waxing: "Waxing Services",
  }

  return (
    <div className="space-y-12">
      {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
        <div key={category}>
          <h2 className="text-2xl font-bold text-foreground mb-6 capitalize">{categoryNames[category] || category}</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryServices.map((service) => (
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
        </div>
      ))}
    </div>
  )
}
