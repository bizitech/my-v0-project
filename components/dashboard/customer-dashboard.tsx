"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookingsList } from "@/components/dashboard/bookings-list"
import { ProfileSettings } from "@/components/dashboard/profile-settings"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { Calendar, Settings, Clock } from "lucide-react"

interface Customer {
  id: string
  full_name: string
  phone: string
  address: string
  city: string
}

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

interface CustomerDashboardProps {
  user: any
  customer: Customer | null
  bookings: Booking[]
}

export function CustomerDashboard({ user, customer, bookings }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  const upcomingBookings = bookings.filter((booking) => booking.status === "confirmed" || booking.status === "pending")

  const completedBookings = bookings.filter((booking) => booking.status === "completed")

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Welcome Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {customer?.full_name || user.email?.split("@")[0]}!
        </h1>
        <p className="text-muted-foreground">Manage your appointments and profile settings</p>
      </div>

      {/* Dashboard Stats */}
      <DashboardStats bookings={bookings} />

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="bookings" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            My Bookings
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            {/* User icon is removed to avoid redeclaration */}
            History
          </TabsTrigger>
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Profile
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upcoming Appointments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Upcoming Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                {upcomingBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground mb-4">No upcoming appointments</p>
                    <Button asChild>
                      <a href="/booking">Book New Appointment</a>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {upcomingBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{booking.services.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {booking.booking_date} at {booking.booking_time}
                          </p>
                          <p className="text-sm text-muted-foreground">with {booking.staff.name}</p>
                        </div>
                        <div className="text-right space-y-2">
                          <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>
                            {booking.status}
                          </Badge>
                          <p className="text-sm font-medium">PKR {booking.total_amount.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                    {upcomingBookings.length > 3 && (
                      <Button variant="outline" onClick={() => setActiveTab("bookings")} className="w-full">
                        View All Bookings
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                {completedBookings.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">No recent activity</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {completedBookings.slice(0, 3).map((booking) => (
                      <div key={booking.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <p className="font-medium">{booking.services.name}</p>
                          <p className="text-sm text-muted-foreground">{booking.booking_date}</p>
                        </div>
                        <Badge variant="outline" className="text-green-600">
                          Completed
                        </Badge>
                      </div>
                    ))}
                    {completedBookings.length > 3 && (
                      <Button variant="outline" onClick={() => setActiveTab("history")} className="w-full">
                        View Full History
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="bookings">
          <BookingsList
            bookings={upcomingBookings}
            title="Upcoming Appointments"
            emptyMessage="No upcoming appointments"
          />
        </TabsContent>

        <TabsContent value="history">
          <BookingsList bookings={completedBookings} title="Booking History" emptyMessage="No completed appointments" />
        </TabsContent>

        <TabsContent value="profile">
          <ProfileSettings user={user} customer={customer} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
