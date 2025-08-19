"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Star,
  MapPin,
  Clock,
  Eye,
  CheckCircle,
  XCircle,
  MoreHorizontal,
} from "lucide-react"

export function AdminDashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Users",
      value: "2,847",
      change: "+12%",
      icon: Users,
      trend: "up",
    },
    {
      title: "Active Beauticians",
      value: "156",
      change: "+8%",
      icon: UserCheck,
      trend: "up",
    },
    {
      title: "Total Bookings",
      value: "1,234",
      change: "+23%",
      icon: Calendar,
      trend: "up",
    },
    {
      title: "Revenue (PKR)",
      value: "2,45,000",
      change: "+15%",
      icon: DollarSign,
      trend: "up",
    },
  ]

  const pendingBeauticians = [
    {
      id: 1,
      name: "Sana Ahmed",
      businessName: "Elegance Beauty Studio",
      location: "Gulberg, Lahore",
      experience: "5+ years",
      specialties: ["Bridal Makeup", "Hair Styling"],
      appliedDate: "2024-01-18",
      image: "/professional-female-beautician.png",
    },
    {
      id: 2,
      name: "Nida Khan",
      businessName: "Glow Beauty Services",
      location: "DHA, Karachi",
      experience: "3+ years",
      specialties: ["Facial", "Massage"],
      appliedDate: "2024-01-17",
      image: "/professional-female-beautician.png",
    },
    {
      id: 3,
      name: "Rabia Malik",
      businessName: "Royal Beauty Lounge",
      location: "F-8, Islamabad",
      experience: "7+ years",
      specialties: ["Mehndi", "Threading"],
      appliedDate: "2024-01-16",
      image: "/professional-female-beautician.png",
    },
  ]

  const recentBookings = [
    {
      id: 1,
      customer: "Ayesha Ali",
      beautician: "Fatima Ahmed",
      service: "Bridal Makeup",
      date: "2024-01-20",
      time: "10:00 AM",
      amount: "PKR 15,000",
      status: "confirmed",
    },
    {
      id: 2,
      customer: "Sarah Khan",
      beautician: "Zara Malik",
      service: "Party Makeup",
      date: "2024-01-20",
      time: "2:00 PM",
      amount: "PKR 5,000",
      status: "pending",
    },
    {
      id: 3,
      customer: "Maria Ahmed",
      beautician: "Sana Riaz",
      service: "Facial Treatment",
      date: "2024-01-19",
      time: "11:00 AM",
      amount: "PKR 4,000",
      status: "completed",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-blue-100 text-blue-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3" />
                      {stat.change} from last month
                    </p>
                  </div>
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pending Beautician Applications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Pending Applications
            </CardTitle>
            <Badge variant="secondary">{pendingBeauticians.length} pending</Badge>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingBeauticians.map((beautician) => (
              <div key={beautician.id} className="border rounded-lg p-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={beautician.image || "/placeholder.svg"} alt={beautician.name} />
                    <AvatarFallback>
                      {beautician.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm">{beautician.name}</h4>
                    <p className="text-sm text-muted-foreground">{beautician.businessName}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3" />
                      <span>{beautician.location}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Applied {beautician.appliedDate}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {beautician.specialties.map((specialty) => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full bg-transparent">
              View All Applications
            </Button>
          </CardContent>
        </Card>

        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Bookings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentBookings.map((booking) => (
              <div key={booking.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{booking.customer}</h4>
                    <Badge className={getStatusColor(booking.status)}>{booking.status}</Badge>
                  </div>
                  <span className="font-semibold text-sm">{booking.amount}</span>
                </div>

                <div className="text-sm text-muted-foreground space-y-1">
                  <p>
                    <strong>Service:</strong> {booking.service}
                  </p>
                  <p>
                    <strong>Beautician:</strong> {booking.beautician}
                  </p>
                  <p>
                    <strong>Date & Time:</strong> {booking.date} at {booking.time}
                  </p>
                </div>

                <div className="flex justify-end mt-3">
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            <Button variant="outline" className="w-full bg-transparent">
              View All Bookings
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Users className="h-5 w-5" />
              <span className="text-xs">Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <UserCheck className="h-5 w-5" />
              <span className="text-xs">Beauticians</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Calendar className="h-5 w-5" />
              <span className="text-xs">Bookings</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <DollarSign className="h-5 w-5" />
              <span className="text-xs">Payments</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <Star className="h-5 w-5" />
              <span className="text-xs">Reviews</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2 bg-transparent">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status */}
      <Card>
        <CardHeader>
          <CardTitle>System Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-sm">Payment Gateway</p>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-green-500 rounded-full"></div>
              <div>
                <p className="font-medium text-sm">SMS Service</p>
                <p className="text-xs text-muted-foreground">Operational</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-3 w-3 bg-yellow-500 rounded-full"></div>
              <div>
                <p className="font-medium text-sm">Email Service</p>
                <p className="text-xs text-muted-foreground">Degraded Performance</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
