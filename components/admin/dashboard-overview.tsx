import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, DollarSign, TrendingUp, Clock } from "lucide-react"

interface DashboardOverviewProps {
  bookings: any[]
  services: any[]
  staff: any[]
  customers: any[]
}

export function DashboardOverview({ bookings, services, staff, customers }: DashboardOverviewProps) {
  // Calculate statistics
  const totalBookings = bookings.length
  const pendingBookings = bookings.filter((b) => b.status === "pending").length
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed").length
  const completedBookings = bookings.filter((b) => b.status === "completed").length
  const totalRevenue = bookings.filter((b) => b.status === "completed").reduce((sum, b) => sum + b.total_amount, 0)

  // Today's bookings
  const today = new Date().toISOString().split("T")[0]
  const todayBookings = bookings.filter((b) => b.booking_date === today)

  // Popular services
  const serviceStats = bookings.reduce(
    (acc, booking) => {
      const serviceName = booking.services?.name
      if (serviceName) {
        acc[serviceName] = (acc[serviceName] || 0) + 1
      }
      return acc
    },
    {} as Record<string, number>,
  )

  const popularServices = Object.entries(serviceStats)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Revenue",
      value: `PKR ${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Active Staff",
      value: staff.filter((s) => s.is_available).length,
      icon: Users,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Total Customers",
      value: customers.length,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Booking Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Booking Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Pending</span>
              <div className="flex items-center gap-2">
                <Badge variant="secondary">{pendingBookings}</Badge>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full"
                    style={{ width: `${(pendingBookings / totalBookings) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Confirmed</span>
              <div className="flex items-center gap-2">
                <Badge variant="default">{confirmedBookings}</Badge>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(confirmedBookings / totalBookings) * 100}%` }}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Completed</span>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-green-600">
                  {completedBookings}
                </Badge>
                <div className="w-24 bg-muted rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: `${(completedBookings / totalBookings) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Today's Bookings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today's Appointments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {todayBookings.length === 0 ? (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">No appointments today</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayBookings.slice(0, 4).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium text-sm">{booking.services?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {booking.booking_time} - {booking.customers?.full_name}
                      </p>
                    </div>
                    <Badge variant={booking.status === "confirmed" ? "default" : "secondary"}>{booking.status}</Badge>
                  </div>
                ))}
                {todayBookings.length > 4 && (
                  <p className="text-sm text-muted-foreground text-center">
                    +{todayBookings.length - 4} more appointments
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Popular Services */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Popular Services
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {popularServices.map(([serviceName, count], index) => (
              <div key={serviceName} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-sm font-bold text-primary">
                    {index + 1}
                  </div>
                  <span className="font-medium">{serviceName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">{count} bookings</span>
                  <div className="w-20 bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${(count / Math.max(...Object.values(serviceStats))) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
