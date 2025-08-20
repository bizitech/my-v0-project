"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { Clock, CalendarDays } from "lucide-react"
import { format, addDays, isAfter, startOfDay } from "date-fns"

interface Service {
  id: string
  name: string
  duration: number
}

interface DateTimeSelectionProps {
  service: Service
  selectedDate?: string
  selectedTime?: string
  onDateSelect: (date: string) => void
  onTimeSelect: (time: string) => void
}

// Generate time slots from 9 AM to 6 PM
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour < 18; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
      slots.push(time)
    }
  }
  return slots
}

export function DateTimeSelection({
  service,
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}: DateTimeSelectionProps) {
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const timeSlots = generateTimeSlots()
  const today = new Date()
  const maxDate = addDays(today, 30) // Allow booking up to 30 days in advance

  // Simulate fetching available slots when date changes
  useEffect(() => {
    if (selectedDate) {
      setIsLoadingSlots(true)
      // Simulate API call to check availability
      setTimeout(() => {
        // Mock some unavailable slots for demonstration
        const unavailableSlots = ["10:00", "14:30", "16:00"]
        const available = timeSlots.filter((slot) => !unavailableSlots.includes(slot))
        setAvailableSlots(available)
        setIsLoadingSlots(false)
      }, 500)
    }
  }, [selectedDate])

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      onDateSelect(format(date, "yyyy-MM-dd"))
      // Clear selected time when date changes
      if (selectedTime) {
        onTimeSelect("")
      }
    }
  }

  const isDateDisabled = (date: Date) => {
    return !isAfter(date, startOfDay(today)) || isAfter(date, maxDate)
  }

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Date Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Select Date</h3>
            </div>
            <Calendar
              mode="single"
              selected={selectedDate ? new Date(selectedDate) : undefined}
              onSelect={handleDateSelect}
              disabled={isDateDisabled}
              className="rounded-md border"
            />
            <div className="text-sm text-muted-foreground">
              <p>• Available for booking up to 30 days in advance</p>
              <p>• Same-day bookings subject to availability</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Time Selection */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Select Time</h3>
            </div>

            {!selectedDate ? (
              <div className="text-center py-8 text-muted-foreground">
                <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Please select a date first</p>
              </div>
            ) : isLoadingSlots ? (
              <div className="text-center py-8 text-muted-foreground">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
                <p>Loading available slots...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  Available slots for {format(new Date(selectedDate), "EEEE, MMMM d, yyyy")}
                </div>

                <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto">
                  {timeSlots.map((time) => {
                    const isAvailable = availableSlots.includes(time)
                    const isSelected = selectedTime === time

                    return (
                      <Button
                        key={time}
                        variant={isSelected ? "default" : "outline"}
                        size="sm"
                        disabled={!isAvailable}
                        onClick={() => onTimeSelect(time)}
                        className={`${!isAvailable ? "opacity-50" : ""}`}
                      >
                        {time}
                      </Button>
                    )
                  })}
                </div>

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 border border-muted-foreground rounded"></div>
                    <span>Available</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-muted-foreground/30 rounded"></div>
                    <span>Unavailable</span>
                  </div>
                </div>

                {selectedTime && (
                  <Badge variant="secondary" className="w-fit">
                    Selected: {selectedTime} ({service.duration} minutes)
                  </Badge>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
