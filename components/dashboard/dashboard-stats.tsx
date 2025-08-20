import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Clock, CreditCard, Star } from "lucide-react"

interface Booking {
  id: string
  status: string
  total_amount: number
  booking_date: string
}

interface DashboardStatsProps {
  bookings: Booking[]
}

export function DashboardStats({ bookings }: DashboardStatsProps) {
  const totalBookings = bookings.length
  const upcomingBookings = bookings.filter(
    (booking) => booking.status === "confirmed" || booking.status === "pending",
  ).length
  const completedBookings = bookings.filter((booking) => booking.status === "completed").length
  const totalSpent = bookings
    .filter((booking) => booking.status === "completed")
    .reduce((sum, booking) => sum + booking.total_amount, 0)

  const stats = [
    {
      title: "Total Bookings",
      value: totalBookings,
      icon: Calendar,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Upcoming",
      value: upcomingBookings,
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Completed",
      value: completedBookings,
      icon: Star,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Spent",
      value: `PKR ${totalSpent.toLocaleString()}`,
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
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
  )
}
