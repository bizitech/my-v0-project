"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star, Clock } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

interface Salon {
  id: string
  name: string
  address: string
  city: string
  area: string
  rating: number
  total_reviews: number
}

interface SalonSelectionProps {
  salons: Salon[]
  selectedSalon?: Salon
  onSalonSelect: (salon: Salon) => void
  isLoading: boolean
}

export function SalonSelection({ salons, selectedSalon, onSalonSelect, isLoading }: SalonSelectionProps) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <p className="text-gray-600 mb-6">Loading salon information...</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <p className="text-gray-600 mb-6">
        Choose from our verified beauty salons across Pakistan. Each salon offers professional services with experienced
        staff.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {salons.map((salon) => (
          <Card
            key={salon.id}
            className={`cursor-pointer transition-all hover:shadow-md ${
              selectedSalon?.id === salon.id ? "ring-2 ring-primary border-primary" : ""
            }`}
            onClick={() => onSalonSelect(salon)}
          >
            <CardContent className="p-4">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{salon.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
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

                <p className="text-sm text-gray-600">{salon.address}</p>

                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Open Today
                  </Badge>
                  {selectedSalon?.id === salon.id && <Badge variant="default">Selected</Badge>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {salons.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <h3 className="font-medium text-gray-900 mb-2">No salons available</h3>
            <p className="text-gray-600">Please check back later or contact support.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
