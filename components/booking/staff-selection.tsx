"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { User, Star, CheckCircle } from "lucide-react"

interface Service {
  id: string
  category: string
}

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
}

interface StaffSelectionProps {
  service: Service
  staff: Staff[]
  selectedStaff?: Staff
  selectedDate?: string
  selectedTime?: string
  onStaffSelect: (staff: Staff) => void
}

export function StaffSelection({
  service,
  staff,
  selectedStaff,
  selectedDate,
  selectedTime,
  onStaffSelect,
}: StaffSelectionProps) {
  // Filter staff based on service category
  const availableStaff = staff.filter((member) => member.specialties.includes(service.category))

  if (availableStaff.length === 0) {
    return (
      <div className="text-center py-8">
        <User className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg text-muted-foreground mb-2">No staff available</p>
        <p className="text-sm text-muted-foreground">
          No beauticians are currently available for this service category.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        {selectedDate && selectedTime && (
          <p>
            Available staff for {selectedDate} at {selectedTime}
          </p>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {availableStaff.map((member) => {
          const isSelected = selectedStaff?.id === member.id
          const initials = member.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .toUpperCase()

          return (
            <Card
              key={member.id}
              className={`cursor-pointer transition-all duration-200 ${
                isSelected ? "ring-2 ring-primary bg-primary/5" : "hover:shadow-md hover:bg-muted/30"
              }`}
              onClick={() => onStaffSelect(member)}
            >
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">{initials}</AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-lg text-foreground">{member.name}</h4>
                        {isSelected && <CheckCircle className="h-5 w-5 text-primary" />}
                      </div>

                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-muted-foreground ml-1">(4.8)</span>
                      </div>

                      <div className="space-y-2">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Specialties:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.specialties.map((specialty) => (
                              <Badge key={specialty} variant="secondary" className="text-xs capitalize">
                                {specialty}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="text-sm text-muted-foreground">
                          <p>5+ years experience</p>
                          <p>Certified professional</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="pt-2 border-t">
                      <Button size="sm" className="w-full">
                        Selected
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="text-center">
        <Button variant="outline" size="sm">
          Any Available Staff
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Let us assign the best available beautician for your appointment
        </p>
      </div>
    </div>
  )
}
