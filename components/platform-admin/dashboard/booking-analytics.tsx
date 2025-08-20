"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, TrendingUp } from "lucide-react"

interface BookingAnalyticsProps {
  bookings: any[]
}

export function BookingAnalytics({ bookings }: BookingAnalyticsProps) {
  // Calculate analytics
  const totalBookings = bookings.length
  const completedBookings = bookings.filter((b) => b.status === "completed")
  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

  const totalRevenue = completedBookings.reduce((sum, b) => sum + (b.total_amount || 0), 0)
  const averageBookingValue = completedBookings.length > 0 ? totalRevenue / completedBookings.length : 0

  const thisMonth = bookings.filter((b) => {
    const bookingDate = new Date(b.booking_date)
    const now = new Date()
    return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear()
  })

  const topSalons = bookings.reduce((acc: any, booking) => {
    const salonName = booking.salons?.name || "Unknown"
    acc[salonName] = (acc[salonName] || 0) + 1
    return acc
  }, {})

  const salonStats = Object.entries(topSalons)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "confirmed":
        return "default"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold">Booking Analytics</h2>
        <p className="text-gray-600">Platform-wide booking statistics and trends</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bookings</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalBookings}</div>
            <p className="text-xs text-muted-foreground">all time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonth.length}</div>
            <p className="text-xs text-muted-foreground">bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">from completed bookings</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Booking Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {Math.round(averageBookingValue)}</div>
            <p className="text-xs text-muted-foreground">per booking</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Booking Status Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Booking Status</CardTitle>
            <CardDescription>Current booking distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Completed</span>
                <Badge variant="default">{completedBookings.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Pending</span>
                <Badge variant="secondary">{pendingBookings.length}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cancelled</span>
                <Badge variant="destructive">{cancelledBookings.length}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performing Salons */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Salons</CardTitle>
            <CardDescription>Salons with most bookings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salonStats.map(([salon, count], index) => (
                <div key={salon} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">#{index + 1}</span>
                    <span className="text-sm">{salon}</span>
                  </div>
                  <Badge variant="outline">{count} bookings</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Bookings</CardTitle>
          <CardDescription>Latest booking activity across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bookings.slice(0, 10).map((booking) => (
              <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{booking.customers?.full_name || "Customer"}</p>
                  <p className="text-sm text-gray-600">{booking.services?.name}</p>
                  <p className="text-sm text-gray-600">{booking.salons?.name}</p>
                  <p className="text-xs text-gray-500">
                    {booking.booking_date} at {booking.booking_time}
                  </p>
                </div>
                <div className="text-right">
                  <Badge variant={getStatusColor(booking.status)}>{booking.status}</Badge>
                  <p className="text-sm font-medium mt-1">Rs {booking.total_amount}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
