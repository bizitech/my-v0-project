"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { SalonSelection } from "@/components/booking/salon-selection"
import { ServiceSelection } from "@/components/booking/service-selection"
import { DateTimeSelection } from "@/components/booking/date-time-selection"
import { StaffSelection } from "@/components/booking/staff-selection"
import { BookingDetails } from "@/components/booking/booking-details"
import { BookingConfirmation } from "@/components/booking/booking-confirmation"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface Salon {
  id: string
  name: string
  address: string
  city: string
  area: string
  rating: number
  total_reviews: number
}

interface Service {
  id: string
  name: string
  description: string
  duration: number
  price: number
  category: string
  is_home_service: boolean
  home_service_fee: number
  salon_id: string
}

interface Staff {
  id: string
  name: string
  email: string
  phone: string
  specialties: string[]
  salon_id: string
}

interface User {
  id: string
  email: string
}

interface BookingData {
  salon?: Salon
  service?: Service
  isHomeService: boolean
  selectedDate?: string
  selectedTime?: string
  selectedStaff?: Staff
  customerAddress?: string
  notes?: string
}

interface BookingFlowProps {
  salons: Salon[]
  selectedSalon?: Salon | null
  services: Service[]
  staff: Staff[]
  preselectedService?: Service | null
  user: User
}

const steps = [
  { id: 1, title: "Select Salon", description: "Choose your preferred salon" },
  { id: 2, title: "Select Service", description: "Choose your beauty treatment" },
  { id: 3, title: "Date & Time", description: "Pick your preferred slot" },
  { id: 4, title: "Select Staff", description: "Choose your beautician" },
  { id: 5, title: "Review Details", description: "Confirm your booking" },
  { id: 6, title: "Confirmation", description: "Booking complete" },
]

export function BookingFlow({
  salons,
  selectedSalon,
  services: initialServices,
  staff: initialStaff,
  preselectedService,
  user,
}: BookingFlowProps) {
  const [currentStep, setCurrentStep] = useState(selectedSalon ? 2 : 1)
  const [services, setServices] = useState<Service[]>(initialServices)
  const [staff, setStaff] = useState<Staff[]>(initialStaff)
  const [bookingData, setBookingData] = useState<BookingData>({
    salon: selectedSalon || undefined,
    service: preselectedService || undefined,
    isHomeService: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const supabase = createClient()

  const loadSalonData = async (salon: Salon) => {
    setIsLoading(true)
    try {
      const [{ data: salonServices }, { data: salonStaff }] = await Promise.all([
        supabase.from("services").select("*").eq("salon_id", salon.id).eq("is_active", true).order("name"),
        supabase.from("staff").select("*").eq("salon_id", salon.id).eq("is_available", true).order("name"),
      ])

      setServices(salonServices || [])
      setStaff(salonStaff || [])
    } catch (error) {
      console.error("Error loading salon data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateBookingData = (updates: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...updates }))
  }

  const handleSalonSelect = async (salon: Salon) => {
    updateBookingData({
      salon,
      service: undefined, // Reset service when salon changes
      selectedStaff: undefined, // Reset staff when salon changes
    })
    await loadSalonData(salon)
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!bookingData.salon
      case 2:
        return !!bookingData.service
      case 3:
        return !!bookingData.selectedDate && !!bookingData.selectedTime
      case 4:
        return !!bookingData.selectedStaff
      case 5:
        return true
      default:
        return false
    }
  }

  const progress = (currentStep / steps.length) * 100

  if (currentStep === 6) {
    return <BookingConfirmation bookingData={bookingData} />
  }

  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Step {currentStep} of {steps.length - 1}
              </h2>
              <Badge variant="outline">{Math.round(progress)}% Complete</Badge>
            </div>
            <Progress value={progress} className="w-full" />
            <div className="grid grid-cols-5 gap-2 text-sm">
              {steps.slice(0, -1).map((step) => (
                <div
                  key={step.id}
                  className={`text-center ${
                    step.id === currentStep
                      ? "text-primary font-medium"
                      : step.id < currentStep
                        ? "text-muted-foreground"
                        : "text-muted-foreground/50"
                  }`}
                >
                  <div className="font-medium">{step.title}</div>
                  <div className="text-xs">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Step content */}
      <Card>
        <CardHeader>
          <CardTitle>{steps[currentStep - 1].title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <SalonSelection
              salons={salons}
              selectedSalon={bookingData.salon}
              onSalonSelect={handleSalonSelect}
              isLoading={isLoading}
            />
          )}

          {currentStep === 2 && bookingData.salon && (
            <ServiceSelection
              services={services}
              selectedService={bookingData.service}
              isHomeService={bookingData.isHomeService}
              onServiceSelect={(service) => updateBookingData({ service })}
              onHomeServiceToggle={(isHomeService) => updateBookingData({ isHomeService })}
              salon={bookingData.salon}
            />
          )}

          {currentStep === 3 && bookingData.service && (
            <DateTimeSelection
              service={bookingData.service}
              selectedDate={bookingData.selectedDate}
              selectedTime={bookingData.selectedTime}
              onDateSelect={(date) => updateBookingData({ selectedDate: date })}
              onTimeSelect={(time) => updateBookingData({ selectedTime: time })}
            />
          )}

          {currentStep === 4 && bookingData.service && bookingData.salon && (
            <StaffSelection
              service={bookingData.service}
              staff={staff}
              selectedStaff={bookingData.selectedStaff}
              selectedDate={bookingData.selectedDate}
              selectedTime={bookingData.selectedTime}
              onStaffSelect={(staff) => updateBookingData({ selectedStaff: staff })}
              salon={bookingData.salon}
            />
          )}

          {currentStep === 5 && (
            <BookingDetails
              bookingData={bookingData}
              user={user}
              onUpdate={updateBookingData}
              onConfirm={() => {
                setIsSubmitting(true)
                // Simulate booking creation
                setTimeout(() => {
                  setIsSubmitting(false)
                  nextStep()
                }, 2000)
              }}
              isSubmitting={isSubmitting}
            />
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      {currentStep < 5 && (
        <div className="flex justify-between">
          <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
            <ChevronLeft className="h-4 w-4 mr-2" />
            Previous
          </Button>
          <Button onClick={nextStep} disabled={!canProceed() || isLoading}>
            {isLoading ? "Loading..." : "Next"}
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      )}
    </div>
  )
}
