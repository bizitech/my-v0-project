"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, Home } from "lucide-react"

interface Service {
  id: number
  name: string
  description: string
  duration: string
  price: number
  category: string
  isAtHome: boolean
  isAtSalon: boolean
}

interface ServicesListProps {
  services: Service[]
}

export function ServicesList({ services }: ServicesListProps) {
  const categories = [...new Set(services.map((service) => service.category))]

  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-6">Services & Pricing</h2>

        <div className="space-y-6">
          {categories.map((category) => (
            <div key={category}>
              <h3 className="text-lg font-medium mb-4 text-primary">{category}</h3>
              <div className="space-y-4">
                {services
                  .filter((service) => service.category === category)
                  .map((service) => (
                    <div key={service.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-lg">{service.name}</h4>
                            <span className="font-bold text-lg text-primary">PKR {service.price.toLocaleString()}</span>
                          </div>

                          <p className="text-muted-foreground mb-3">{service.description}</p>

                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center gap-1 text-sm text-muted-foreground">
                              <Clock className="h-4 w-4" />
                              <span>{service.duration}</span>
                            </div>

                            <div className="flex gap-2">
                              {service.isAtHome && (
                                <Badge variant="secondary" className="text-xs">
                                  <Home className="h-3 w-3 mr-1" />
                                  At Home
                                </Badge>
                              )}
                              {service.isAtSalon && (
                                <Badge variant="outline" className="text-xs">
                                  <MapPin className="h-3 w-3 mr-1" />
                                  At Salon
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        <Button className="bg-secondary hover:bg-secondary/90 md:ml-4">Book This Service</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
