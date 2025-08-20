"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Clock, Home, MapPin } from "lucide-react"

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

interface ServiceSelectionProps {
  services: Service[]
  selectedService?: Service
  isHomeService: boolean
  onServiceSelect: (service: Service) => void
  onHomeServiceToggle: (isHomeService: boolean) => void
}

export function ServiceSelection({
  services,
  selectedService,
  isHomeService,
  onServiceSelect,
  onHomeServiceToggle,
}: ServiceSelectionProps) {
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
    <div className="space-y-6">
      {/* Home service toggle */}
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="home-service" className="text-base font-medium">
                Home Service
              </Label>
              <p className="text-sm text-muted-foreground">
                Get beauty treatments in the comfort of your home (additional charges apply)
              </p>
            </div>
            <Switch id="home-service" checked={isHomeService} onCheckedChange={onHomeServiceToggle} />
          </div>
        </CardContent>
      </Card>

      {/* Service selection */}
      <div className="space-y-8">
        {Object.entries(servicesByCategory).map(([category, categoryServices]) => (
          <div key={category}>
            <h3 className="text-xl font-semibold text-foreground mb-4 capitalize">
              {categoryNames[category] || category}
            </h3>

            <div className="grid md:grid-cols-2 gap-4">
              {categoryServices.map((service) => {
                const isSelected = selectedService?.id === service.id
                const canBeHomeService = service.is_home_service || !isHomeService

                return (
                  <Card
                    key={service.id}
                    className={`cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "ring-2 ring-primary bg-primary/5"
                        : canBeHomeService
                          ? "hover:shadow-md hover:bg-muted/30"
                          : "opacity-50 cursor-not-allowed"
                    }`}
                    onClick={() => canBeHomeService && onServiceSelect(service)}
                  >
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg text-foreground">{service.name}</h4>
                            <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                          </div>
                          {!canBeHomeService && (
                            <Badge variant="secondary" className="ml-2">
                              Salon Only
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{service.duration} min</span>
                          </div>
                          <div className="flex items-center gap-1">
                            {isHomeService && service.is_home_service ? (
                              <Home className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                            <span>{isHomeService && service.is_home_service ? "Home" : "Salon"}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-right">
                            <div className="font-semibold text-lg text-primary">
                              PKR{" "}
                              {(
                                service.price +
                                (isHomeService && service.is_home_service ? service.home_service_fee : 0)
                              ).toLocaleString()}
                            </div>
                            {isHomeService && service.is_home_service && service.home_service_fee > 0 && (
                              <div className="text-xs text-muted-foreground">
                                Includes PKR {service.home_service_fee.toLocaleString()} home service fee
                              </div>
                            )}
                          </div>
                          {isSelected && (
                            <Button size="sm" className="ml-4">
                              Selected
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
