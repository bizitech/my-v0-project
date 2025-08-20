"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, Phone, MapPin, Search } from "lucide-react"

interface SalonBookingManagementProps {
  bookings: any[]
}

export function SalonBookingManagement({ bookings }: SalonBookingManagementProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      !searchQuery ||
      booking.customers?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.services?.name?.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesStatus = statusFilter === "all" || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const todayBookings = filteredBookings.filter((b) => {
    const today = new Date().toISOString().split("T")[0]
    return b.booking_date === today
  })

  const upcomingBookings = filteredBookings.filter((b) => {
    const today = new Date().toISOString().split("T")[0]
    return b.booking_date > today
  })

  const pastBookings = filteredBookings.filter((b) => {
    const today = new Date().toISOString().split("T")[0]
    return b.booking_date < today
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "completed":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const BookingCard = ({ booking }: { booking: any }) => (
    <Card key={booking.id} className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-medium">{booking.customers?.full_name || "Customer"}</h3>
              <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
            </div>

            <div className="space-y-1 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{booking.booking_date}</span>
                <Clock className="h-4 w-4 ml-2" />
                <span>{booking.booking_time}</span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>{booking.customers?.phone || "No phone"}</span>
              </div>

              <p className="font-medium text-gray-900">{booking.services?.name}</p>

              {booking.is_home_service && (
                <div className="flex items-center gap-2 text-blue-600">
                  <MapPin className="h-4 w-4" />
                  <span>Home Service: {booking.customer_address}</span>
                </div>
              )}

              {booking.notes && <p className="text-gray-600 italic">Note: {booking.notes}</p>}
            </div>
          </div>

          <div className="text-right">
            <p className="font-bold text-lg">Rs {booking.total_amount}</p>
            <div className="space-y-2 mt-2">
              {booking.status === "pending" && (
                <div className="space-x-2">
                  <Button size="sm" variant="default">
                    Confirm
                  </Button>
                  <Button size="sm" variant="outline">
                    Decline
                  </Button>
                </div>
              )}
              {booking.status === "confirmed" && (
                <Button size="sm" variant="outline">
                  Mark Complete
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by customer name or service..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Bookings</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Booking Tabs */}
      <Tabs defaultValue="today" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="today">Today ({todayBookings.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({pastBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="today">
          <div>
            {todayBookings.length > 0 ? (
              todayBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="font-medium text-gray-900 mb-2">No bookings for today</h3>
                  <p className="text-gray-600">All caught up! No appointments scheduled for today.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="upcoming">
          <div>
            {upcomingBookings.length > 0 ? (
              upcomingBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="font-medium text-gray-900 mb-2">No upcoming bookings</h3>
                  <p className="text-gray-600">No future appointments scheduled yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="past">
          <div>
            {pastBookings.length > 0 ? (
              pastBookings.map((booking) => <BookingCard key={booking.id} booking={booking} />)
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="font-medium text-gray-900 mb-2">No past bookings</h3>
                  <p className="text-gray-600">No completed appointments yet.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
