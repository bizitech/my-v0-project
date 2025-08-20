"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Building2, Users, Calendar, Star, TrendingUp, AlertTriangle } from "lucide-react"

interface PlatformOverviewProps {
  salons: any[]
  customers: any[]
  bookings: any[]
  reviews: any[]
  pendingSalons: any[]
  recentRegistrations: any[]
}

export function PlatformOverview({
  salons,
  customers,
  bookings,
  reviews,
  pendingSalons,
  recentRegistrations,
}: PlatformOverviewProps) {
  // Calculate metrics
  const activeSalons = salons.filter((s) => s.is_active && s.is_verified)
  const totalRevenue = bookings
    .filter((b) => b.status === "completed")
    .reduce((sum, b) => sum + (b.total_amount || 0), 0)

  const thisMonthBookings = bookings.filter((b) => {
    const bookingDate = new Date(b.booking_date)
    const now = new Date()
    return bookingDate.getMonth() === now.getMonth() && bookingDate.getFullYear() === now.getFullYear()
  })

  const averageRating = reviews.length > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length : 0

  const topCities = salons.reduce((acc: any, salon) => {
    acc[salon.city] = (acc[salon.city] || 0) + 1
    return acc
  }, {})

  const cityStats = Object.entries(topCities)
    .sort(([, a], [, b]) => (b as number) - (a as number))
    .slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Salons</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeSalons.length}</div>
            <p className="text-xs text-muted-foreground">{pendingSalons.length} pending approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{customers.length}</div>
            <p className="text-xs text-muted-foreground">registered customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{thisMonthBookings.length}</div>
            <p className="text-xs text-muted-foreground">bookings completed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Platform Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">total processed</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Salon Registrations</CardTitle>
            <CardDescription>New salons in the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentRegistrations.slice(0, 5).map((salon) => (
                <div key={salon.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{salon.name}</p>
                    <p className="text-sm text-gray-600">
                      {salon.city}, {salon.area}
                    </p>
                    <p className="text-xs text-gray-500">{new Date(salon.created_at).toLocaleDateString()}</p>
                  </div>
                  <Badge variant={salon.is_active ? "default" : "secondary"}>
                    {salon.is_active ? "Active" : "Pending"}
                  </Badge>
                </div>
              ))}
              {recentRegistrations.length === 0 && (
                <p className="text-center text-gray-500 py-4">No recent registrations</p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Platform Stats */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Statistics</CardTitle>
            <CardDescription>Key performance indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium">Average Rating</span>
                </div>
                <div className="text-right">
                  <div className="font-bold">{averageRating.toFixed(1)}</div>
                  <div className="text-xs text-gray-500">from {reviews.length} reviews</div>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-medium">Top Cities</h4>
                {cityStats.map(([city, count]) => (
                  <div key={city} className="flex items-center justify-between">
                    <span className="text-sm">{city}</span>
                    <Badge variant="outline">{count} salons</Badge>
                  </div>
                ))}
              </div>

              {pendingSalons.length > 0 && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-yellow-800">{pendingSalons.length} salons awaiting approval</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
