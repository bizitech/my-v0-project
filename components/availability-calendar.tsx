"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react"

export function AvailabilityCalendar() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Mock availability data
  const availableSlots = {
    "2024-01-20": ["9:00 AM", "11:00 AM", "2:00 PM", "4:00 PM"],
    "2024-01-21": ["10:00 AM", "1:00 PM", "3:00 PM"],
    "2024-01-22": ["9:00 AM", "12:00 PM", "5:00 PM"],
    "2024-01-23": ["11:00 AM", "2:00 PM"],
    "2024-01-24": ["9:00 AM", "1:00 PM", "4:00 PM", "6:00 PM"],
  }

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  const formatDate = (day: number) => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    return new Date(year, month, day).toISOString().split("T")[0]
  }

  const isDateAvailable = (day: number) => {
    const dateStr = formatDate(day)
    return availableSlots[dateStr as keyof typeof availableSlots]?.length > 0
  }

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev)
      if (direction === "prev") {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const days = getDaysInMonth(currentMonth)
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Select Date & Time
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar Header */}
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("prev")}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="font-semibold">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => navigateMonth("next")}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="p-2 text-sm font-medium text-muted-foreground">
              {day}
            </div>
          ))}

          {days.map((day, index) => (
            <div key={index} className="aspect-square">
              {day && (
                <Button
                  variant={selectedDate === formatDate(day) ? "default" : "ghost"}
                  size="sm"
                  className={`w-full h-full text-sm ${
                    isDateAvailable(day) ? "hover:bg-primary/10" : "opacity-50 cursor-not-allowed"
                  }`}
                  onClick={() => isDateAvailable(day) && setSelectedDate(formatDate(day))}
                  disabled={!isDateAvailable(day)}
                >
                  {day}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Available Time Slots */}
        {selectedDate && (
          <div className="space-y-3">
            <h4 className="font-medium">Available Times</h4>
            <div className="grid grid-cols-2 gap-2">
              {availableSlots[selectedDate as keyof typeof availableSlots]?.map((time) => (
                <Button key={time} variant="outline" size="sm" className="text-sm bg-transparent">
                  {time}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded"></div>
            <span>Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-muted rounded"></div>
            <span>Unavailable</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
