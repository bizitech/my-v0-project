"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, MapPin, Home, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { format } from "date-fns"

interface BookingManagementProps {
  bookings: any[]
}

export function BookingManagement({ bookings }: BookingManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.services?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.customers?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.staff?.name?.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    const matchesDate =
      dateFilter === "all" ||
      (() => {
        const bookingDate = new Date(booking.booking_date)
        const today = new Date()

        switch (dateFilter) {
          case "today":
            return bookingDate.toDateString() === today.toDateString()
          case "upcoming":
            return bookingDate >= today
          case "past":
            return bookingDate < today
          default:
            return true
        }
      })()

    return matchesSearch && matchesStatus && matchesDate
  })

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

  const handleStatusChange = (bookingId: string, newStatus: string) => {
    // In a real app, this would make an API call to update the booking status
    console.log(`Updating booking ${bookingId} to status: ${newStatus}`)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Booking Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search bookings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="past">Past</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Bookings List */}
          <div className="space-y-4">
            {filteredBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No bookings found</p>
              </div>
            ) : (
              filteredBookings.map((booking) => (
                <div key={booking.id} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">{booking.services?.name}</h3>
                        <Badge variant={getStatusColor(booking.status)} className="capitalize">
                          {booking.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">Booking ID: {booking.id.slice(0, 8)}...</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-primary">PKR {booking.total_amount?.toLocaleString()}</p>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleStatusChange(booking.id, "confirmed")}>
                            Confirm Booking
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(booking.id, "completed")}>
                            Mark Complete
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleStatusChange(booking.id, "cancelled")}>
                            Cancel Booking
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div className="space-y-1">
                      <p className="font-medium">Customer</p>
                      <p className="text-muted-foreground">{booking.customers?.full_name || "N/A"}</p>
                      <p className="text-muted-foreground">{booking.customers?.phone || "N/A"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Date & Time</p>
                      <p className="text-muted-foreground">{format(new Date(booking.booking_date), "MMM d, yyyy")}</p>
                      <p className="text-muted-foreground">{booking.booking_time}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium">Staff & Location</p>
                      <p className="text-muted-foreground">{booking.staff?.name}</p>
                      <div className="flex items-center gap-1">
                        {booking.is_home_service ? <Home className="h-3 w-3" /> : <MapPin className="h-3 w-3" />}
                        <span className="text-muted-foreground">
                          {booking.is_home_service ? "Home Service" : "At Salon"}
                        </span>
                      </div>
                    </div>
                  </div>

                  {booking.notes && (
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <p className="text-sm">
                        <strong>Notes:</strong> {booking.notes}
                      </p>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
