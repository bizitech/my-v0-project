"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, MapPin, Home, Phone, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"

interface Booking {
  id: string
  booking_date: string
  booking_time: string
  status: string
  is_home_service: boolean
  total_amount: number
  notes: string
  services: {
    name: string
    duration: number
    category: string
  }
  staff: {
    name: string
    email: string
  }
}

interface BookingsListProps {
  bookings: Booking[]
  title: string
  emptyMessage: string
}

export function BookingsList({ bookings, title, emptyMessage }: BookingsListProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const canCancelOrReschedule = (booking: Booking) => {
    return booking.status === "pending" || booking.status === "confirmed"
  }

  if (bookings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">{emptyMessage}</p>
            <Button asChild>
              <a href="/booking">Book New Appointment</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="border rounded-lg p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{booking.services.name}</h3>
                    <Badge variant={getStatusColor(booking.status)} className="capitalize">
                      {booking.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground capitalize">
                    {booking.services.category} • {booking.services.duration} minutes
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <p className="font-semibold text-primary">PKR {booking.total_amount.toLocaleString()}</p>
                  {canCancelOrReschedule(booking) && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Phone className="h-4 w-4 mr-2" />
                          Contact Salon
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="h-4 w-4 mr-2" />
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Cancel Booking</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{format(new Date(booking.booking_date), "EEEE, MMM d, yyyy")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.booking_time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{booking.staff.name}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm">
                {booking.is_home_service ? (
                  <Home className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                )}
                <span className="text-muted-foreground">{booking.is_home_service ? "Home Service" : "At Salon"}</span>
              </div>

              {booking.notes && (
                <div className="bg-muted/30 p-3 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>Notes:</strong> {booking.notes}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
